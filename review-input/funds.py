"""Compile the accumulating class from the public validated total-return snapshot.
Nasdaq comes from the existing, dated export and is rebased, never refreshed here.
"""
import json
from datetime import date

def compile_funds(source, dest):
    snapshot=json.loads((__import__('pathlib').Path(__file__).with_name('funds-snapshot.json')).read_text(encoding='utf-8-sig'))
    original=json.loads((source/'data/fondsudvikling.json').read_text(encoding='utf-8'))
    result=[]
    for fund in snapshot['funds']:
        rows=fund['data']; first,last=rows[0],rows[-1]
        u=json.loads(json.dumps(original))
        if fund['isin'] != 'DK0062499810':
            u['start']=first['d'];u['kursdato']=last['d']
            days=(date.fromisoformat(last['d'])-date.fromisoformat(first['d'])).days
            u['aarligtSidenStart']=(last['total']/first['total'])**(365.25/days)*100-100 if days>=365 else None
            for p in u['perioder']:
                start=first['d'] if p['id']=='all' else p['fra']
                p['tilgaengelig']=start>=first['d']
                eligible=[r for r in rows if r['d']<=start]
                base=eligible[-1] if eligible else first
                selected=[r for r in rows if r['d']>=base['d']]
                p.update(fra=base['d'],til=last['d'],afkast=(last['total']/base['total']-1)*100,vaerdi100000=round(last['total']/base['total']*100000),punkter=[[r['d'],(r['total']/base['total']-1)*100] for r in selected])
                reference=next(x for x in original['perioder'] if x['id']=='all')['sammenligningPunkter']
                reference=[r for r in reference if base['d']<=r[0]<=last['d']]
                # Never silently start the comparison on a different day.
                if reference and reference[0][0]==base['d'] and reference[-1][0]==last['d']:
                    v=100+reference[0][1]
                    p['sammenligningPunkter']=[[d,((100+x)/v-1)*100] for d,x in reference]
                    p['sammenligning']=p['sammenligningPunkter'][-1][1]
                else: p['sammenligningPunkter']=[];p['sammenligning']=None
            u['kalender']=[]
            for year in sorted({r['d'][:4] for r in rows},reverse=True):
                yr=[r for r in rows if r['d'].startswith(year)]
                before=[r for r in rows if r['d']<year+'-01-01']
                base=before[-1] if before else yr[0]
                item={'aar':int(year),'afkast':(yr[-1]['total']/base['total']-1)*100,'delvis':not before or year==last['d'][:4],'maaneder':[]}
                for month in sorted({r['d'][:7] for r in yr}):
                    mr=[r for r in yr if r['d'].startswith(month)]
                    prev=[r for r in rows if r['d']<month+'-01']
                    b=prev[-1] if prev else mr[0]
                    item['maaneder'].append({'maaned':month,'afkast':(mr[-1]['total']/b['total']-1)*100,'delvis':not prev or month==last['d'][:7]})
                u['kalender'].append(item)
        result.append({'id':fund['short'],'isin':fund['isin'],'kidUrl':fund['kidUrl'],'u':u})
    (dest/'data/review-funds.js').write_text('window.REVIEW_FUNDS='+json.dumps(result,ensure_ascii=False)+';',encoding='utf-8')
