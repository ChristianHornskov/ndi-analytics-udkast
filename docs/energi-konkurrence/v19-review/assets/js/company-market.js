(function(){
 'use strict';
 const s=window.NDI_LIVE;if(!s)return;
 const slug=location.pathname.split('/').pop().replace(/\.html$/,'');
 const identity=Object.entries(s.identities).find(([isin,m])=>m.slug===slug&&s.files['data.json'].funds.find(f=>f.id==='pmindi').positions.some(p=>p.isin===isin&&p.weight>0))||Object.entries(s.identities).find(([,m])=>m.slug===slug);if(!identity)return;
 const isin=identity[0],fund=s.files['data.json'].funds.find(f=>f.id==='pmindi');
 const p=fund.positions.find(p=>p.isin===isin);
 const rows=s.files['highs.json'].funds.find(f=>f.short==='PMINDI')?.rows||[];
 const r=rows.find(r=>r.isin===isin);
 const host=document.getElementById('aktien')||document.getElementById('kurs');if(!host)return;
 if(host.id==='kurs'){host.replaceChildren();host.hidden=false;}
 const box=document.createElement('section');box.className='ndi-market';box.id='aktiekurs';
 const h=document.createElement('h2');h.id='h-kurs';h.textContent='Aktiens kursudvikling';box.append(h);
 host.append(box);
 const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
 const number=(v,d=2)=>Number(v).toLocaleString('da-DK',{minimumFractionDigits:d,maximumFractionDigits:d});
 const date=d=>d?d.slice(0,10).split('-').reverse().join('.'):'—';
 const valid=p&&r&&['ok','short_history'].includes(r.status)&&p.listingStatus==='verified'&&r.completedSessionsOnly===true&&p.listingIdentitySha256&&p.listingIdentitySha256===r.listingIdentitySha256&&p.listingCurrency===r.marketCurrency&&Number.isFinite(r.marketClose)&&r.marketClose>0;
 if(!valid){box.append(el('p','lille',p?'Der er endnu ikke tilstrækkeligt validerede kursdata for dette værdipapir.':s.holdingStatus?.(slug)==='ukendt'?'Selskabets beholdningsstatus opdateres. Der vises ingen gemte kurser som aktuelle data.':'Selskabet findes ikke i den aktuelle beholdning. Der vises ingen gemte kurser som aktuelle data.'));return}
 const currency=r.marketCurrency,currencyLabel=currency==='GBp'?'pence (GBX)':currency,close=r.marketClose,priceDate=r.returnDate||r.date;
 const grid=el('div','ndi-market-grid');
 function metric(label,value,detail){const c=el('div','ndi-market-metric');c.append(el('span',null,label),el('strong',null,value),el('small',null,detail));grid.append(c)}
 metric('Seneste lukkekurs',number(close)+' '+currencyLabel,date(priceDate)+' · '+r.ticker);
 const y=r.priceReturns?.y1,from=r.returnBaseDates?.y1;
 metric('Kursændring · 12 måneder',Number.isFinite(y)&&from?(y>0?'+':'')+number(y)+' %':'—',from?date(from)+' – '+date(priceDate):'Ikke tilstrækkelig kurshistorik');
 const shortTop=r.status==='short_history'?r.availableHistoryTop:null;
 const distance=Number.isFinite(r.distance)?r.distance:Number.isFinite(shortTop?.distance)?shortTop.distance:null;
 const topStart=shortTop?.start||r.start;
 metric(r.status==='ok'?'Under 52-ugers top':'Under toppen i tilgængelig historik',distance===null?'—':number(distance)+' %',r.status==='ok'?'Højeste dagskurs i perioden':topStart?'Historik fra '+date(topStart):'Kortere end 52 uger');
 box.append(grid);
 const daily=el('div','ndi-daily-history');box.append(daily);
 daily.append(el('p','lille','Henter daglige lukkekurser …'));
 const historyURL=s.dataBase+'releases/'+s.pointer.release+'/prices/'+encodeURIComponent(isin)+'.json';
 async function showDaily(){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch(historyURL,{signal:controller.signal,cache:'default'});if(!response.ok)throw Error('unavailable');
   const pack=await response.json(),c=pack.companies?.[isin];
   if(pack.validated!==true||pack.schemaVersion!==1||pack.sourceRelease!==s.pointer.sourceRelease||pack.asOf!==s.pointer.asOf||c?.status!=='ok'||c.listingIdentitySha256!==p.listingIdentitySha256||c.currency!==currency||c.date!==priceDate||!Array.isArray(c.points)||c.points.length<2)throw Error('invalid');
   c.points.forEach((v,i)=>{if(!Array.isArray(v)||!/^\d{4}-\d{2}-\d{2}$/.test(v[0])||!Number.isFinite(v[1])||v[1]<=0||v[0]>priceDate||(i&&c.points[i-1][0]>=v[0]))throw Error('invalid point')});
   if(c.points.at(-1)[0]!==priceDate||Math.abs(c.points.at(-1)[1]-close)>Math.max(1e-6,close*1e-7))throw Error('close mismatch');
   daily.replaceChildren();daily.append(el('h3',null,'Daglige lukkekurser'));
   const controls=el('div','ndi-price-periods'),canvas=el('div','ndi-price-canvas'),caption=el('p','lille');caption.setAttribute('aria-live','polite');
   const NS='http://www.w3.org/2000/svg',buttons=[];let points=c.points,selected=points.length-1;
   function node(tag,attrs,text){const n=document.createElementNS(NS,tag);Object.entries(attrs||{}).forEach(([k,v])=>n.setAttribute(k,String(v)));if(text)n.textContent=text;return n}
   function draw(){
    canvas.replaceChildren();const W=Math.max(320,Math.min(640,canvas.getBoundingClientRect().width||640)),H=280,left=W<480?56:68,right=W<480?70:88,top=24,bottom=40;
    const min=Math.min(...points.map(v=>v[1])),max=Math.max(...points.map(v=>v[1])),spread=max-min||max*.02||1,low=Math.max(0,min-spread*.08),high=max+spread*.08;
    const first=Date.parse(points[0][0]),last=Date.parse(points.at(-1)[0]),x=d=>left+(Date.parse(d)-first)/(last-first||1)*(W-left-right),y=v=>top+(high-v)/(high-low)*(H-top-bottom);
    const svg=node('svg',{viewBox:'0 0 '+W+' '+H,role:'img',tabindex:0,'aria-label':'Daglige lukkekurser i '+currencyLabel+'. Brug venstre og højre piletast til at læse datoer.'});svg.style.cssText='max-width:640px;width:100%;height:auto;display:block;touch-action:pan-y';
    for(let i=0;i<3;i++){const v=low+(high-low)*i/2,cy=y(v);svg.append(node('line',{x1:left,x2:W-right,y1:cy,y2:cy,stroke:'currentColor',opacity:.15}),node('text',{x:left-8,y:cy+4,'text-anchor':'end','font-size':12,fill:'currentColor'},number(v)))}
    let path='';points.forEach((v,i)=>{const gap=i&&(c.missingDates||[]).some(d=>d>points[i-1][0]&&d<v[0]);path+=(i&&!gap?' L':' M')+x(v[0])+','+y(v[1])});
    svg.append(node('path',{d:path,fill:'none',stroke:'var(--c-accent, #70a9b4)','stroke-width':2,'stroke-linejoin':'round'}));
    (W<480?[0,points.length-1]:[0,Math.floor((points.length-1)/2),points.length-1]).forEach((i,j)=>svg.append(node('text',{x:x(points[i][0]),y:H-12,'text-anchor':j===0?'start':i===points.length-1?'end':'middle','font-size':12,fill:'currentColor'},date(points[i][0]))));
    const end=points.at(-1);svg.append(node('text',{x:W-right+8,y:y(end[1])+4,'font-size':13,fill:'currentColor'},number(end[1])));
    const marker=node('circle',{r:4,fill:'var(--c-accent, #70a9b4)',stroke:'currentColor','stroke-width':1});svg.append(marker);
    function inspect(i){selected=Math.max(0,Math.min(points.length-1,i));const v=points[selected];marker.setAttribute('cx',x(v[0]));marker.setAttribute('cy',y(v[1]));caption.textContent=date(v[0])+' · '+number(v[1])+' '+currencyLabel+' · '+points.length+' handelsdage i den viste periode'}
    svg.addEventListener('pointermove',event=>{const rect=svg.getBoundingClientRect(),px=(event.clientX-rect.left)*W/rect.width;let i=0;points.forEach((v,j)=>{if(Math.abs(x(v[0])-px)<Math.abs(x(points[i][0])-px))i=j});inspect(i)});
    svg.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();inspect(event.key==='Home'?0:event.key==='End'?points.length-1:selected+(event.key==='ArrowRight'?1:-1))}});
    canvas.append(svg);inspect(selected);
   }
   [['m1','1 måned',1],['m3','3 måneder',3],['all','Tilgængelig historik',null]].forEach(([id,label,months])=>{const button=el('button','knap knap--rolig',label);button.type='button';button.style.minHeight='44px';button.setAttribute('aria-pressed',String(id==='all'));buttons.push(button);button.addEventListener('click',()=>{const cutoff=new Date(priceDate+'T12:00:00Z');if(months){const day=cutoff.getUTCDate();cutoff.setUTCDate(1);cutoff.setUTCMonth(cutoff.getUTCMonth()-months);const end=new Date(cutoff);end.setUTCMonth(end.getUTCMonth()+1);end.setUTCDate(0);cutoff.setUTCDate(Math.min(day,end.getUTCDate()))}const day=r.returnBaseDates?.[id]||cutoff.toISOString().slice(0,10);const base=c.points.filter(v=>v[0]<=day).at(-1);const filtered=months?c.points.filter(v=>v[0]>=(base?.[0]||day)):c.points;if(filtered.length<2)return;points=filtered;selected=points.length-1;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));draw()});controls.append(button)});
   controls.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin:12px 0';daily.append(controls,canvas,caption,el('p','lille','Daglige lukkekurser i '+currencyLabel+' fra samme validerede Azure-udgave som nøgletallene. Grafen forbinder de registrerede handelsdages lukkekurser.'));draw();
   if(window.ResizeObserver){let width=canvas.clientWidth,frame;const resize=new ResizeObserver(()=>{const next=canvas.clientWidth;if(Math.abs(next-width)<1)return;width=next;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(canvas.isConnected)draw();else resize.disconnect()})});resize.observe(canvas)}
  }catch{daily.replaceChildren(el('p','lille','Den daglige kurshistorik kan ikke vises for denne dataudgave lige nu. De validerede nøgletal ovenfor er fortsat tilgængelige.'));const retry=el('button','knap','Prøv igen');retry.type='button';retry.addEventListener('click',()=>{retry.disabled=true;showDaily()},{once:true});daily.append(retry)}finally{clearTimeout(timer)}
 }
 showDaily();
 const note=el('p','lille');note.textContent='Kursændringer i aktiens noteringsvaluta, uden geninvesteret udbytte. Det er ikke fondens afkast på positionen. Kurser kan være forsinkede. Kursdato: '+date(priceDate)+'. ';
 if(/^https:\/\/query1\.finance\.yahoo\.com\//.test(r.source||'')){const a=el('a','tekstlink','Kurskilde');a.href='https://finance.yahoo.com/quote/'+encodeURIComponent(r.ticker)+'/history/';a.target='_blank';a.rel='noopener noreferrer';note.append(a)}
 box.append(note);
})();
