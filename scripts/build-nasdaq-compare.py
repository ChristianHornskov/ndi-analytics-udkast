#!/usr/bin/env python3
"""Regenerér docs/data/nasdaq-compare.json: Nasdaq-100 kursindeks (^NDX) × DKK=X på fondens handelsdage."""
import json, datetime, urllib.request
def ser(sym):
    u=f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?period1=1690000000&period2={int(datetime.datetime.now().timestamp())}&interval=1d"
    r=json.load(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'})))['chart']['result'][0]
    return {datetime.datetime.fromtimestamp(t,datetime.UTC).strftime('%Y-%m-%d'):c for t,c in zip(r['timestamp'],r['indicators']['quote'][0]['close']) if c}
n,fx=ser('%5ENDX'),ser('DKK=X')
f=[x for x in json.load(open('docs/data/portfolio.json'))['funds'] if x['id']=='pmindi'][0]
fd=[r['d'] for r in f['data']];pts=[];ln=lf=None
for d in sorted(set(n)|set(fx)|set(fd)):
    ln=n.get(d,ln);lf=fx.get(d,lf)
    if d in fd and ln and lf: pts.append([d,round(ln*lf,2)])
json.dump({"name":"Nasdaq-100","kind":"kursindeks (uden udbytte), omregnet fra USD til DKK","source":"Yahoo Finance ^NDX og DKK=X, dagslukkekurser","asOf":pts[-1][0],"label":"Nasdaq vises kun som sammenligning, ikke som fondens benchmark. Historisk afkast er ingen garanti.","data":pts},open('docs/data/nasdaq-compare.json','w'),separators=(',',':'))
print(len(pts),pts[0],pts[-1])
