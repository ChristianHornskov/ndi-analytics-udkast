// Stable entry point + immutable release assets prevent mixed-day displays.
let sentHeight=0;
let growthView='total',growthPeriod='all';
// Geography geometry is not needed to display returns. Fetch it only on demand.
let worldLoading=null;
const showTabBeforeMap=showTab;
showTab=function(name){
 showTabBeforeMap(name);
 if(name==='portfolio'&&!world&&!worldLoading){
  worldLoading=fetch('world.geojson').then(r=>{if(!r.ok)throw Error('Kortdata mangler');return r.json()})
   .then(w=>{world=w;if(data&&geography)renderGeography();notifyHeight()})
   .catch(()=>{worldLoading=null;});
 }
};
function drawProductionGrowth(){
 const fund=data.funds[selected],all=fund.data;
 if(!document.getElementById('growth-controls')){
  const controls=document.createElement('div');controls.id='growth-controls';controls.className='growth-controls';
  controls.innerHTML='<div class="segmented" aria-label="Afkast eller kurs"><button data-growth-view="total">Totalafkast</button><button data-growth-view="price">Kurs</button></div><div class="segmented" aria-label="Grafperiode">'+[['m1','1 md.'],['m3','3 mdr.'],['ytd','ÅTD'],['y1','1 år'],['all','Siden start']].map(([key,label])=>'<button data-growth-period="'+key+'">'+label+'</button>').join('')+'</div><p id="growth-period-result" class="small muted"></p>';
  $('growth').before(controls);
  controls.querySelectorAll('[data-growth-view]').forEach(b=>b.onclick=()=>{growthView=b.dataset.growthView;drawProductionGrowth()});
  controls.querySelectorAll('[data-growth-period]').forEach(b=>b.onclick=()=>{growthPeriod=b.dataset.growthPeriod;drawProductionGrowth()});
 }
 document.querySelectorAll('[data-growth-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.growthView===growthView)));
 document.querySelectorAll('[data-growth-period]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.growthPeriod===growthPeriod)));
 const article=$('growth').closest('article');
 article.querySelector('.eyebrow').textContent='UDVIKLING OVER TID';
 article.querySelector('h2').textContent=growthView==='total'?'Dit afkast med udbytte':'Kurs pr. bevis';
 article.querySelector('.chip').hidden=true;
 article.querySelector('.chart + p').textContent=growthView==='total'?'Totalafkast viser kursudvikling og udbytte, som om udbyttet blev investeret igen. Grafen starter ved 100: En værdi på 120 svarer til et afkast på 20 % i den valgte periode. Alle tal er i DKK.':'Kurs viser værdien af ét bevis i DKK, uden at medregne udbetalt udbytte. U markerer den dag, hvor retten til udbytte fragår beviset. Kursen falder derfor normalt, uden at faldet i sig selv er et investeringstab. Vælg Totalafkast for også at medregne udbyttet.';
 article.querySelector('.chart + p').insertAdjacentHTML('beforeend',' <strong>Historisk afkast er ingen garanti for fremtidigt afkast.</strong> <a href="#global-disclaimer">Se yderligere risikoinformation under Vigtig information nedenfor.</a>');
 if(activeReviewTab==='overview')$('global-disclaimer').querySelector('.context-risk').textContent=growthView==='total'?'Totalafkastet vises i DKK med geninvesteret udbytte.':'Kursvisningen medregner ikke udlodninger. Kursen er Fundmarkets officielle indre værdi på den viste kursdato, ikke en handlet børskurs. Se Totalafkast for udviklingen med geninvesteret udbytte.';
 let points=all.slice(),cutoff=null;
 const end=new Date(all.at(-1).d+'T12:00:00Z');
 if(growthPeriod==='ytd')cutoff=String(end.getUTCFullYear()-1)+'-12-31';
 if(growthPeriod==='y1'||growthPeriod==='m1'||growthPeriod==='m3'){
  const months=growthPeriod==='y1'?12:growthPeriod==='m1'?1:3;
  const boundary=new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth()-months,1,12));
  const lastDay=new Date(Date.UTC(boundary.getUTCFullYear(),boundary.getUTCMonth()+1,0)).getUTCDate();
  boundary.setUTCDate(Math.min(end.getUTCDate(),lastDay));cutoff=boundary.toISOString().slice(0,10);
 }
 if(cutoff){
  const base=all.filter(p=>p.d<=cutoff).at(-1);
  if(!base||Date.parse(cutoff)-Date.parse(base.d)>7*86400000){
   $('growth').innerHTML='<p class="callout">Der er ikke tilstrækkelig historik til den valgte periode.</p>';
   $('growth-period-result').textContent='Intet periodeafkast beregnes uden et dækkende startpunkt.';notifyHeight();return;
  }
  points=all.filter(p=>p.d>=base.d);
 }
 if(growthPeriod==='all'&&growthView==='total'&&fund.inception<points[0].d){
  // Index 100 is the documented inception base, not an invented market quote.
  points=[{d:fund.inception,total:100},...points];
 }
 const key=growthView,base=points[0][key];
 const plotted=points.map(p=>({d:p.d,v:key==='total'?100*p.total/base:p.price}));
 chart('growth',plotted,false);
 $('growth-period-result').textContent=points[0].d+' – '+points.at(-1).d+' · '+(key==='total'?'Totalafkast: ':'Kursændring uden udbytte: ')+pct((points.at(-1)[key]/base-1)*100);
 const svg=$('growth').querySelector('svg');
 svg.setAttribute('tabindex','0');svg.setAttribute('aria-label',(key==='total'?'Totalafkast':'Kurs')+'. Brug piletaster eller træk for at se dato og værdi.');
 svg.style.touchAction='none';svg.style.userSelect='none';
 const tooltip=document.createElement('p');tooltip.className='growth-tooltip small';tooltip.setAttribute('aria-live','polite');tooltip.textContent='Træk hen over grafen, eller brug piletasterne, for at se værdier.';$('growth').appendChild(tooltip);
 const W=svg.viewBox.baseVal.width,L=62,R=20,start=Date.parse(plotted[0].d),stop=Date.parse(plotted.at(-1).d);
 if(key==='price')for(const dividend of fund.dividends.filter(d=>d.exDate>=plotted[0].d&&d.exDate<=plotted.at(-1).d)){
  const xx=L+(Date.parse(dividend.exDate)-start)/(stop-start||1)*(W-L-R);
  svg.insertAdjacentHTML('beforeend',`<g><title>Udbytte ${esc(dividend.exDate)}: ${n(dividend.amount,2)} kr. pr. bevis. Kursfaldet er ikke i sig selv et tab.</title><line x1="${xx}" x2="${xx}" y1="24" y2="254" stroke="#f5ee9e" stroke-dasharray="4 4"/><circle cx="${xx}" cy="28" r="10" fill="#f5ee9e"/><text x="${xx}" y="32" text-anchor="middle" fill="#0b151b" font-size="11">U</text></g>`);
 }
 const cursor=document.createElementNS('http://www.w3.org/2000/svg','line');
 cursor.setAttribute('class','growth-cursor');cursor.setAttribute('y1','24');cursor.setAttribute('y2','254');
 cursor.setAttribute('stroke','#c2dadd');cursor.setAttribute('stroke-width','1.5');cursor.setAttribute('vector-effect','non-scaling-stroke');
 cursor.setAttribute('pointer-events','none');cursor.setAttribute('aria-hidden','true');cursor.style.visibility='hidden';svg.appendChild(cursor);
 let index=plotted.length-1;
 const show=i=>{index=Math.max(0,Math.min(plotted.length-1,i));const p=plotted[index],x=L+(Date.parse(p.d)-start)/(stop-start||1)*(W-L-R);cursor.setAttribute('x1',String(x));cursor.setAttribute('x2',String(x));cursor.style.visibility='visible';tooltip.textContent=p.d+' · '+(key==='price'?n(p.v,2)+' DKK':n(p.v,2)+' · '+pct(p.v-100)+' fra periodens start')};
 const point=e=>{const rect=svg.getBoundingClientRect(),fraction=Math.max(0,Math.min(1,((e.clientX-rect.left)/rect.width*W-L)/(W-L-R))),target=start+fraction*(stop-start);let closest=0;for(let i=1;i<plotted.length;i++)if(Math.abs(Date.parse(plotted[i].d)-target)<Math.abs(Date.parse(plotted[closest].d)-target))closest=i;show(closest)};
 svg.onpointerdown=e=>{svg.setPointerCapture(e.pointerId);point(e)};svg.onpointermove=point;
 svg.onpointerleave=e=>{if(e.pointerType==='mouse'&&!svg.hasPointerCapture(e.pointerId))cursor.style.visibility='hidden'};
 svg.onblur=()=>{cursor.style.visibility='hidden'};
 svg.onkeydown=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(index+(e.key==='ArrowLeft'?-1:1))}};
 notifyHeight();
}
function notifyHeight(){
 const height=Math.ceil(document.querySelector('main').getBoundingClientRect().height);
 if(height===sentHeight||height<100||height>100000)return;
 sentHeight=height;
 if(parent!==window){
  parent.postMessage({type:'newdeal-performance-height',height},'*');
  parent.postMessage({type:'newdeal:resize',version:1,height},'*');
 }
}
new ResizeObserver(()=>requestAnimationFrame(notifyHeight)).observe(document.querySelector('main'));
window.addEventListener('load',notifyHeight);
const productionRender=render;
function simplifyOverview(){
 const f=data.funds[selected],positions=f.positions.filter(p=>p.isin&&p.weight>0),top=positions.slice().sort((a,b)=>b.weight-a.weight).slice(0,10);
 const performance=insights?.funds[f.id];
 if(!$('fund-introduction')){
  const intro=document.createElement('section');intro.id='fund-introduction';intro.className='fund-introduction';
  intro.innerHTML='<h1>NewDeal Invest</h1><p>Fonden er aktivt forvaltet og investerer i teknologi- og vækstaktier fra hele verden.</p>';
  document.querySelector('.controls').before(intro);
 }
 if(!$('risk-explained')){
  const risk=document.createElement('aside');risk.id='risk-explained';risk.className='risk-explained';$('growth').closest('article').appendChild(risk);
 }
 $('risk-explained').innerHTML='<button class="textbutton" id="explore-risk">Se afkast og risiko →</button>';
 if(!$('active-management-disclaimer'))$('global-disclaimer').insertAdjacentHTML('beforeend','<p id="active-management-disclaimer">Investeringen kan give store udsving. Aktiv forvaltning er ikke en garanti for merafkast.</p>');
 if($('explore-risk'))$('explore-risk').onclick=()=>document.querySelector('nav [data-tab="risk"]').click();
 if(!$('investment-example')){
  const example=document.createElement('article');example.id='investment-example';example.className='investment-example panel';$('topmini').closest('article').before(example);
 }
 const endingValue=100000*f.data.at(-1).total/100;
 const dateLabel=d=>new Date(d+'T12:00:00Z').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
 $('investment-example').innerHTML=`<div><h2>Hvis du investerede 100.000 kr.</h2><p class="small muted">Ved klassens start · med geninvesteret udbytte</p><div class="investment-comparison"><div class="investment-start"><span>Ved start</span><strong>100.000 kr.</strong><small>${esc(dateLabel(f.inception))}</small></div><span class="investment-arrow" aria-hidden="true">→</span><div class="investment-end"><span>Værdi på seneste rapportdato</span><strong>${n(endingValue,0)} <small>kr.</small></strong><small>${esc(dateLabel(data.asOf))}</small></div></div><p class="investment-net">Efter fondens løbende omkostninger</p></div><div class="investment-cagr"><div><p>Gennemsnitligt årligt afkast</p><p class="small muted">CAGR · siden start${performance?.cagr==null?' · kræver mindst ét års historik':''}</p></div><strong>${performance?.cagr==null?'—':pct(performance.cagr)}</strong></div><p class="investment-footnote small muted">Illustrativ beregning på grafens totalafkastserie i DKK. Før skat, egne handelsomkostninger samt tillæg ved køb og salg. Historisk afkast er ingen garanti for fremtidigt afkast.</p>`;
 if(f.performanceAsOf){
  const period=$('headline').querySelector('.metric .sub');
  if(period)period.textContent=f.inception+' – '+f.performanceAsOf+' · DKK · officielle kursdatoer';
  const example=$('investment-example');
  example.querySelector('.investment-end>span').textContent='Værdi på seneste officielle kursdato';
  example.querySelector('.investment-end>small').textContent=dateLabel(f.performanceAsOf);
  example.querySelector('.investment-footnote').textContent='Illustrativ beregning på '+f.short+'s totalafkast i DKK fra '+dateLabel(f.inception)+' til '+dateLabel(f.performanceAsOf)+', med geninvesteret udbytte. Uafhængig af den valgte grafperiode. Før skat, egne handelsomkostninger samt tillæg ved køb og salg. Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast.';
 }
 // CAGR follows the investment example; do not repeat it in the smaller cards.
 Array.from($('headline').children).find(e=>e.textContent.includes('Årligt afkast siden start'))?.remove();
 // Keep the full disclosures on every tab, below the primary working surface.
 $('global-disclaimer').before($('risk-banner'));
 $('overview').querySelectorAll(':scope > p.audit-addition').forEach(p=>{
  if(p.textContent.includes('over tre kalenderdage'))p.textContent='Datagrundlaget er over tre kalenderdage gammelt. Se rapportdatoen ovenfor.';
  else p.remove();
 });
 $('overview').querySelectorAll(':scope > article.audit-addition, :scope > article.source-evidence').forEach(a=>$('method-content').appendChild(a));
 const balance=$('concentration').querySelector('details');
 if(balance)$('method-content').appendChild(balance);
 const holdingsCard=$('topmini').closest('article'),spreadCard=$('concentration').closest('article');
 if(spreadCard!==holdingsCard){
  holdingsCard.querySelector('h2').after($('concentration'));
  const note=spreadCard.querySelector(':scope > p');if(note)holdingsCard.appendChild(note);
  spreadCard.remove();
  holdingsCard.classList.add('holdings-summary');
 }
 $('concentration').innerHTML=metric('Antal værdipapirpositioner',n(positions.length,0),'Positioner med en positiv vægt')+metric('De 10 største tilsammen',pct(top.reduce((s,p)=>s+p.weight,0)),'Andel af fondens formue');
 holdingsCard.querySelector('h2').textContent='Spredning og de 10 største positioner';
 const max=top[0]?.weight||1;
 $('topmini').innerHTML=top.map(p=>`<div class="retail-position"><span>${esc(p.name)}</span><strong>${n(p.weight,2)} %</strong><div class="retail-track"><i style="width:${p.weight/max*100}%"></i></div></div>`).join('')+'<p class="small muted">Vægtene er andele af fondens formue. Søjlerne er skaleret efter den største position.</p>';
 if(!$('class-choice')){
  const choice=document.createElement('div');choice.id='class-choice';choice.className='class-choice';
  $('fund').closest('label').after(choice);$('fund').closest('label').hidden=true;
  choice.innerHTML='<div class="segmented" aria-label="Vælg klasse"><button data-class="0">Med udbytte · PMINDI</button><button data-class="1">Akkumulerende · PMINDIAKK</button></div><p class="small muted" id="class-explanation"></p>';
  choice.querySelectorAll('button').forEach(b=>b.onclick=()=>{$('fund').value=b.dataset.class;$('fund').dispatchEvent(new Event('change',{bubbles:true}))});
 }
 $('class-choice').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.class)===Number(selected))));
 if(!$('class-options')){
  const options=document.createElement('section');options.id='class-options';options.setAttribute('aria-label','Vælg din klasse');
  options.innerHTML='<h2 id="class-summary">Vælg din klasse</h2>';
  $('class-choice').before(options);options.appendChild($('class-choice'));
 }
 $('class-explanation').textContent=f.id==='pmindi'?'Denne klasse udbetaler udbytte. Totalafkastet nedenfor forudsætter, at udbyttet investeres igen.':'Denne klasse udbetaler ikke udbytte; afkastet bliver i klassen. Klasserne følger samme strategi, men har forskellig historik.';
}
render=function(){
 productionRender();
 if(!data)return;
 drawProductionGrowth();
 simplifyOverview();
 $('asof').textContent='Rapportdata: '+data.asOf+' · daglige rapporter, ikke realtidskurser';
 const heading=Array.from($('method-content').querySelectorAll('h3')).find(h=>h.textContent==='Dagligt datagrundlag');
 if(heading?.nextElementSibling)heading.nextElementSibling.textContent='Data kommer fra Fundmarkets rapporter via det fælles dataregister. Nye rapporter behandles i den daglige opdateringskørsel. Datoer, afkast, beholdninger, kildedækning og PRIIP-KID kontrolleres, før en samlet version frigives. Ved fejl beholdes seneste validerede version. Rapportdatoen ovenfor viser, hvilket datagrundlag du ser; den er ikke en kurs i realtid. En åben side søger efter en ny version hvert femte minut.';
 const doc=fundDocuments?.funds[data.funds[selected].id];
 if(!doc){$('risk-banner').textContent='Dokumentoplysninger indlæses. Se det officielle PRIIP-KID før en investeringsbeslutning.';}
 notifyHeight();
};
// Preview: pinned to the documented release.

if(data)render();
