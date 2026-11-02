(function(){
 'use strict';
 const s=window.NDI_LIVE;if(!s)return;
 const slug=location.pathname.split('/').pop().replace(/\.html$/,'');
 const identity=Object.entries(s.identities).find(([,m])=>m.slug===slug);if(!identity)return;
 const isin=identity[0],fund=s.files['data.json'].funds.find(f=>f.id==='pmindi');
 const p=fund.positions.find(p=>p.isin===isin);
 const rows=s.files['highs.json'].funds.find(f=>f.short==='PMINDI')?.rows||[];
 const r=rows.find(r=>r.isin===isin);
 const host=document.getElementById('aktien')||document.getElementById('kurs');if(!host)return;
 if(host.id==='kurs')host.replaceChildren();
 const box=document.createElement('section');box.className='ndi-market';box.id='aktiekurs';
 const h=document.createElement('h2');h.textContent='Aktiens kursudvikling';box.append(h);
 host.append(box);
 const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
 const number=(v,d=2)=>Number(v).toLocaleString('da-DK',{minimumFractionDigits:d,maximumFractionDigits:d});
 const date=d=>d?d.slice(0,10).split('-').reverse().join('.'):'—';
 const valid=p&&r&&['ok','short_history'].includes(r.status)&&p.listingStatus==='verified'&&r.completedSessionsOnly===true&&p.listingIdentitySha256&&p.listingIdentitySha256===r.listingIdentitySha256&&p.listingCurrency===r.marketCurrency&&Number.isFinite(r.marketClose)&&r.marketClose>0;
 if(!valid){box.append(el('p','lille',p?'Der er endnu ikke tilstrækkeligt validerede kursdata for dette værdipapir.':'Selskabet findes ikke i den aktuelle beholdning. Der vises ingen gemte kurser som aktuelle data.'));return}
 const currency=r.marketCurrency,close=r.marketClose,priceDate=r.returnDate||r.date;
 const grid=el('div','ndi-market-grid');
 function metric(label,value,detail){const c=el('div','ndi-market-metric');c.append(el('span',null,label),el('strong',null,value),el('small',null,detail));grid.append(c)}
 metric('Seneste lukkekurs',number(close)+' '+currency,date(priceDate)+' · '+r.ticker);
 const y=r.priceReturns?.y1,from=r.returnBaseDates?.y1;
 metric('Kursændring · 12 måneder',Number.isFinite(y)&&from?(y>0?'+':'')+number(y)+' %':'—',from?date(from)+' – '+date(priceDate):'Ikke tilstrækkelig kurshistorik');
 const distance=Number.isFinite(r.distance)?r.distance:null;
 metric(r.status==='ok'?'Under 52-ugers top':'Under toppen i tilgængelig historik',distance===null?'—':number(distance)+' %',r.status==='ok'?'Højeste dagskurs i perioden':r.start?'Historik fra '+date(r.start):'Kortere end 52 uger');
 box.append(grid);
 // Show only dated observations supported by the validated return data. Do not
 // draw an invented daily line between sparse observations.
 const points=[{date:priceDate,value:close}];
 Object.entries(r.priceReturns||{}).forEach(([key,v])=>{const d=r.returnBaseDates?.[key];if(['d1','m1','m3','ytd','y1'].includes(key)&&Number.isFinite(v)&&v>-100&&d&&d<priceDate&&!points.some(p=>p.date===d))points.push({date:d,value:close/(1+v/100)})});
 points.sort((a,b)=>a.date.localeCompare(b.date));
 if(points.length>1){
  box.append(el('h3',null,'Kurs på udvalgte handelsdage'));
  const chart=el('div','ndi-market-chart');const min=Math.min(...points.map(p=>p.value)),max=Math.max(...points.map(p=>p.value)),span=max-min||1;
  points.forEach(p=>{const item=el('div','ndi-market-point');item.style.setProperty('--level',String((p.value-min)/span));item.append(el('strong',null,number(p.value)),el('span','ndi-market-dot','●'),el('small',null,date(p.date)));chart.append(item)});
  box.append(chart,el('p','lille','Udvalgte kursdatoer i '+currency+', beregnet ud fra de validerede kursændringer. Punkterne viser ikke kursforløbet mellem datoerne.'));
 }
 const note=el('p','lille');note.textContent='Kursændringer i aktiens noteringsvaluta, uden geninvesteret udbytte. Det er ikke fondens afkast på positionen. Kurser kan være forsinkede. Datagrundlag: '+s.pointer.asOf+'. ';
 if(/^https:\/\/query1\.finance\.yahoo\.com\//.test(r.source||'')){const a=el('a','tekstlink','Kurskilde');a.href=r.source;a.target='_blank';a.rel='noopener noreferrer';note.append(a)}
 box.append(note);
})();
