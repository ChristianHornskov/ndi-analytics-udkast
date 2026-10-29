import {loadAzure,getJSON,watch} from '../azure-data.mjs';

// Editorial membership only; weights and dates always come from the validated release.
export const members=[
 ['eToro','VGG320891077','brokerage'],['Webull','KYG9572D1034','brokerage'],['Robinhood','US7707001027','brokerage'],['Futu','US36118L1061','brokerage'],
 ['SoFi','US83406F1021','neobank'],['Nu','KYG6683N1034','neobank'],['Chime','US16935C1099','neobank'],['Kaspi.kz','US48581R2058','neobank'],
 ['Klarna','GB00BMHVL512','payments'],['Shift4','US82452J1097','payments'],['Global-e','IL0011741688','payments'],['Affirm','US00827B1061','payments'],['DLocal','KYG290181018','payments'],
 ['Upstart','US91680M1071','lending'],['Figure','US3493811034','lending'],['Pagaya','IL0011858912','lending'],
 ['Root','US77664L2079','insurance'],['Lemonade','US52567D1072','insurance'],['Ategrity','US04681Y1038','insurance']
];
const names={brokerage:'Handelsplatforme og mæglere',neobank:'Banker i en app',payments:'Betalinger',lending:'Lån og kreditteknologi',insurance:'Forsikring'};
const pct=n=>n.toLocaleString('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2})+' %';
const date=s=>s.split('-').reverse().join('.');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sum=rows=>Math.round(rows.reduce((n,r)=>n+r.weight,0)*1e8)/1e8;
export function fintechModel(bundle,labels={}){
 const {data,pointer}=bundle,asOf=data.positionsAsOf||data.asOf;
 if(pointer.validated!==true||pointer.asOf!==data.asOf||!/^\d{4}-\d{2}-\d{2}$/.test(asOf)||asOf>data.asOf)throw Error('Inconsistent dates');
 const positions=data.funds.find(f=>f.id==='pmindi')?.positions;
 if(!Array.isArray(positions))throw Error('Missing fund');
 const byIsin=new Map();
 for(const p of positions){
  if(!p.isin)continue;
  if(byIsin.has(p.isin)||!Number.isFinite(p.weight)||p.weight<0||p.weight>100)throw Error('Invalid holding');
  byIsin.set(p.isin,p);
 }
 const known=new Set(members.map(m=>m[1]));
 if(positions.some(p=>p.weight>0&&labels[p.isin]?.theme==='Fintech'&&!known.has(p.isin)))throw Error('Unmapped fintech member');
 const rows=members.map(([name,isin,group],index)=>({name,isin,group,index,weight:byIsin.get(isin)?.weight||0}));
 const total=sum(rows);if(total>100)throw Error('Invalid total');
 const groups=Object.entries(names).map(([id,name])=>({id,name,weight:sum(rows.filter(r=>r.group===id)),count:rows.filter(r=>r.group===id&&r.weight>0).length})).sort((a,b)=>b.weight-a.weight||a.name.localeCompare(b.name,'da'));
 return {asOf,total,groups,rows,active:rows.filter(r=>r.weight>0).sort((a,b)=>b.weight-a.weight||a.name.localeCompare(b.name,'da'))};
}
function waffle(weight){
 let cells='';for(let i=0;i<100;i++){const x=i%10*22,y=Math.floor(i/10)*22,fill=Math.min(1,Math.max(0,weight-i));cells+=`<rect x="${x}" y="${y}" width="18" height="18" rx="2" fill="var(--linje-2)"/>`;if(fill)cells+=`<rect x="${x}" y="${y}" width="${fill*18}" height="18" fill="var(--accent)"/>`;}
 return `<svg class="pd-waffle" viewBox="0 0 218 218" role="img" aria-label="${pct(weight)} af fonden. Et felt er 1 procent.">${cells}</svg>`;
}
export function renderFintech(root,model){
 const {asOf,total,groups,rows,active}=model,dated=date(asOf);
 root.querySelector('[data-ft-opening]').innerHTML=`<div><strong>${pct(total)}</strong><p>af PMINDI er placeret i fintech.</p><p class="note">Andele pr. ${dated}. Et felt er 1 % af hele fonden. Temaerne er NewDeal Invests redaktionelle opdeling.</p><a href="#fonden">Se fordelingen og datagrundlaget ↓</a></div>${waffle(total)}`;
 root.querySelector('[data-ft-total]').textContent=pct(total);
 root.querySelector('[data-ft-description]').textContent=`af fonden ligger i fintech, fordelt på ${active.length} selskaber.`;
 root.querySelectorAll('[data-ft-date]').forEach(e=>e.textContent=`Fondsandele på siden gælder PMINDI (NewDeal Invest klasse n, den udloddende afdeling) pr. ${dated}. Alle vægte er andele af hele fonden.`);
 const biggest=active[0];
 root.querySelector('[data-ft-spread]').textContent=biggest?`Det største selskab i temaet er ${biggest.name} med ${pct(biggest.weight)} af fonden. ${biggest.weight<=1?'Ingen af selskaberne fylder over 1 % af fonden.':''}`:'Ingen af temaets selskaber indgår i denne opgørelse.';
 root.querySelector('[data-ft-groups-description]').textContent=`Grupperne står efter deres andel af fonden pr. ${dated}. Selskaberne tælles én gang i deres redaktionelle hovedgruppe.`;
 const scale=Math.max(1,...active.map(r=>r.weight));
 root.querySelector('[data-ft-ranked]').innerHTML=`<p>Andel af PMINDI · ${dated}. Højre kant: ${pct(scale)} af fonden.</p>`+active.map(r=>`<div><p>${esc(r.name)} <strong>${pct(r.weight)}</strong></p><svg viewBox="0 0 1000 18" preserveAspectRatio="none" role="img" aria-label="${esc(r.name)}: ${pct(r.weight)}"><rect width="1000" height="18" fill="var(--linje-2)"/><rect width="${r.weight/scale*1000}" height="18" fill="var(--accent)"/><path d="M${1000/scale-1} 0v18" stroke="var(--tekst)" stroke-dasharray="3 3"/></svg></div>`).join('');
 for(const r of rows)root.querySelector(`#pd-fintech-company-${r.index} .cq-ft__cw`).textContent=r.weight?pct(r.weight):'Ikke i beholdningen';
 for(const group of groups){
  const button=root.querySelector(`.cq-ft__lb[data-g="${group.id}"]`),item=button.closest('.cq-ft__ln');
  button.querySelector('.cq-ft__gw').textContent=pct(group.weight);
  button.querySelector('.cq-ft__gs').textContent=`${group.count} selskaber`;
  button.querySelector('.cq-ft__bt i').style.width=(groups[0].weight?100*group.weight/groups[0].weight:0)+'%';
  button.querySelector('.cq-ft__sr').textContent=`${group.name}. ${group.count} selskaber, ${pct(group.weight)} af fonden pr. ${dated}. Vis selskaberne og deres forretning.`;
  item.parentElement.append(item);
 }
 root.querySelector('.cq-ft__sum .cq-ft__gw').textContent=pct(total);
 root.querySelector('.cq-ft__sum .cq-ft__gs').textContent=`${active.length} selskaber`;
 root.querySelectorAll('[data-ft-live]').forEach(e=>e.hidden=false);
}
if(typeof document!=='undefined'&&document.querySelector('[data-ft-opening]')){
 let busy=false,previous;
 const status=document.querySelector('[data-ft-status]');
 const refresh=async()=>{
  if(busy)return;busy=true;
  try{
   const [bundle,labels]=await Promise.all([loadAzure(),getJSON(new URL('../position-labels.json',import.meta.url))]);
   const model=fintechModel(bundle,labels);renderFintech(document,model);previous=model;
   status.textContent='';status.hidden=true;
  }catch{
   status.hidden=false;status.textContent=previous?`Opdateringen er forsinket. Seneste gyldige opgørelse pr. ${date(previous.asOf)} vises fortsat.`:'Fondens opgørelse kunne ikke hentes. Andele og grafer vises, når data er tilgængelige.';
  }finally{busy=false;}
 };
 void refresh();watch(refresh);
}
