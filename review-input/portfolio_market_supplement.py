"""Read-only, date-pinned market supplement for this review. Never deploys."""
import json,hashlib,urllib.request,concurrent.futures,datetime,math
from pathlib import Path
ROOT=Path(__file__).parent

def calculate(result,row):
    quotes=result['indicators']['quote'][0]
    cutoff=row['returnDate']; points=[]
    for i,ts in enumerate(result.get('timestamp',[])):
        date=datetime.datetime.fromtimestamp(ts,datetime.timezone.utc).date().isoformat()
        c=quotes['close'][i];h=quotes['high'][i]
        if date<=cutoff and c is not None and c>0:points.append((date,c,h))
    if not points or points[-1][0]!=cutoff:raise ValueError('end date differs')
    if not math.isclose(points[-1][1],row['marketClose'],rel_tol=1e-6,abs_tol=.0001):raise ValueError('end close differs')
    if result['meta'].get('currency')!=row['marketCurrency']:raise ValueError('currency differs')
    last=points[-1];target=(datetime.date.fromisoformat(cutoff)-datetime.timedelta(days=7)).isoformat()
    base=next((p for p in reversed(points) if p[0]<=target),None)
    out={'date':cutoff,'close':last[1],'currency':row['marketCurrency']}
    if base and (datetime.date.fromisoformat(target)-datetime.date.fromisoformat(base[0])).days<=4:
        out.update(w1=(last[1]/base[1]-1)*100,weekBaseDate=base[0])
    if row['status']=='short_history':
        highs=[p for p in points if p[2] is not None and p[2]>0]
        if len(highs)>=2:
            top=max(highs,key=lambda p:p[2]);out.update(distance=max(0,(1-last[1]/top[2])*100),high=top[2],highDate=top[0],start=points[0][0],observations=len(points),scope='available_history')
    return out

def run():
    rows=json.loads((ROOT/'homepage-source/highs.json').read_text())['funds'][0]['rows']
    out={'asOf':'2026-10-30','source':'Yahoo Finance, same symbols and dates as the review snapshot','rows':{},'errors':{}}
    def fetch(row):
        try:
            with urllib.request.urlopen(urllib.request.Request(row['source'],headers={'User-Agent':'Mozilla/5.0'}),timeout=25) as f:body=f.read()
            data=json.loads(body)['chart']['result'][0];record=calculate(data,row)
            record.update(source=row['source'],sourceSha256=hashlib.sha256(body).hexdigest())
            return row['isin'],record,None
        except Exception as e:return row['isin'],None,str(e)
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for i,(isin,record,error) in enumerate(pool.map(fetch,rows),1):
            if error:out['errors'][isin]=error
            else:out['rows'][isin]=record
            if i%75==0:print('Checked',i,flush=True)
    (ROOT/'portfolio-market-supplement.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf8')
    print({'matched':len(out['rows']),'errors':len(out['errors']),'weekly':sum('w1'in r for r in out['rows'].values()),'shortHighs':sum('distance'in r for r in out['rows'].values())})
if __name__=='__main__':run()
