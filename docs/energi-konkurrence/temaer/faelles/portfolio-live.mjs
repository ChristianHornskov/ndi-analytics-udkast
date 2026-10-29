import {loadAzure,getJSON,marketRow,companies,freshness,watch} from './azure-data.mjs';
const root=new URL('../',import.meta.url),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pct=v=>Number.isFinite(v)?v.toLocaleString('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2})+' %':'—';
const num=v=>Number.isFinite(v)?v.toLocaleString('da-DK',{maximumFractionDigits:2}):'—';
const link=path=>new URL(path,root).href;
let labels={},bundle,busy=false;
const status=typeof document==='undefined'?null:document.querySelector('[data-portfolio-status]');
const holdings=b=>companies(b.data.funds.find(f=>f.id==='pmindi')).sort((a,b)=>b.weight-a.weight||a.isin.localeCompare(b.isin));
export function themeTotals(rows,metadata){const totals={};for(const p of rows){const key=metadata[p.isin]?.themeUrl?.split('/')[0]||'unclassified';totals[key]=(totals[key]||0)+p.weight;}return totals;}
function cards(rows){return rows.map(p=>{const m=labels[p.isin]||{};return `<a class="c20-index-card" href="${esc(link(m.url||'selskaber.html?q='+encodeURIComponent(p.isin)))}">${m.logo?`<img alt="" width="48" height="48" loading="lazy" src="${esc(link(m.logo))}">`:''}<span>${esc(m.theme||'Tema endnu ikke klassificeret')}</span><h2>${esc(m.displayName||p.name)}</h2>${m.teaser?`<p>${esc(m.teaser)}</p>`:''}<strong>${pct(p.weight)} · ${m.url?'Læs om selskabet':'Se positionen'} →</strong></a>`;}).join('');}
const displayDate=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||'')?v.split('-').reverse().join('.'):String(v||'');
export function metrics(b,isin){
 const items=b.data.funds.map(f=>{const p=companies(f).find(p=>p.isin===isin);return {f,p,r:p?marketRow(b,f,p):null};});
 const field=(title,value)=>`<div><small>${esc(title)}</small><strong>${value}</strong></div>`;
 let fields=items.map(({f,p})=>field('Andel af '+f.short,p?pct(p.weight):'Ikke i beholdningen')).join('');
 const quotes=[...new Map(items.filter(x=>Number.isFinite(x.r?.marketClose)).map(x=>[JSON.stringify(x.r),x])).values()];
 let notes=[];
 for(const {f,r} of quotes){
  const suffix=quotes.length>1?' · '+f.short:'';
  fields+=field('Seneste lukkekurs'+suffix,num(r.marketClose)+' '+esc(r.marketCurrency||''));
  if(Number.isFinite(r.priceReturns?.y1))fields+=field('Kursudvikling · 12 måneder'+suffix,pct(r.priceReturns.y1));
  if(Number.isFinite(r.distance))fields+=field('Under 52-ugers top'+suffix,pct(r.distance));
  notes.push(`Kursdato${esc(suffix)}: ${esc(displayDate(r.date))}.${r.source?.startsWith('https://')?` <a href="${esc(r.source)}" target="_blank" rel="noopener">Kurskilde ↗</a>`:''}`);
 }
 if(!quotes.length)notes.push('En afstemt lukkekurs er endnu ikke tilgængelig.');
 return `<div class="ndi-current-grid">${fields}</div><p>${notes.join(' ')}</p><p>Beholdninger ${esc(displayDate(b.data.positionsAsOf||b.data.asOf))}. Kursændring i noteringsvaluta, uden geninvesteret udbytte. Ikke realtidskurser.</p>`;
}

function render(b){
 const rows=holdings(b),totals=themeTotals(rows,labels),date=b.data.positionsAsOf||b.data.asOf;
 document.querySelectorAll('[data-current-theme]').forEach(el=>{const key=el.dataset.currentTheme==='fintech'?'fintech-tekst':el.dataset.currentTheme;el.textContent=pct(totals[key]||0)+(el.dataset.suffix||'');el.closest('[data-map-preview]')?.style.setProperty('--w',totals[key]||0);});
 document.querySelectorAll('[data-current-date]').forEach(el=>el.textContent=`Andel af hele PMINDI · beholdninger ${date}. Temaerne er NewDeal Invests redaktionelle opdeling.${totals.unclassified?` Ikke klassificeret: ${pct(totals.unclassified)}.`:''}`);
 const top=document.querySelector('[data-current-top]');if(top){top.innerHTML=cards(rows.slice(0,20));document.querySelector('.c20-lead').textContent=`De 20 største selskabspositioner i PMINDI · beholdninger ${date}. Forstå teknologien og selskaberne bag.`;}
 document.querySelectorAll('[data-current-company]').forEach(el=>{el.innerHTML=metrics(b,el.dataset.currentCompany);});
 document.querySelectorAll('[data-current-weight]').forEach(el=>{const p=rows.find(p=>p.isin===el.dataset.currentWeight);el.textContent=p?`${pct(p.weight)} af PMINDI · beholdninger ${date}`:`Ikke i PMINDI's seneste beholdningsliste (${date})`;});
 const theme=document.querySelector('[data-current-theme-panel]');if(theme){const key=theme.dataset.currentThemePanel,subset=rows.filter(p=>labels[p.isin]?.themeUrl?.split('/')[0]===key);theme.innerHTML=`<h2>Temaet i fonden nu</h2><p><strong>${pct(totals[key]||0)}</strong> af PMINDI · ${subset.length} selskaber · beholdninger ${esc(date)}.</p><h3>De største positioner i temaet</h3><div class="c20-index">${cards(subset.slice(0,5))}</div><p><a href="${esc(link('selskaber.html?q='+encodeURIComponent(subset.length?labels[subset[0].isin].theme:'')))}">Se positionerne og hent listen →</a></p>`;}
 if(status)status.textContent=freshness(b)+` · Beholdninger ${date}. Opdateres automatisk hvert femte minut. Ikke realtidskurser.`;
}
async function refresh(){if(busy)return;busy=true;try{const next=await loadAzure();if(!Object.keys(labels).length)labels=await getJSON(new URL('./position-labels.json',import.meta.url));bundle=next;render(bundle);}catch{if(!bundle)document.querySelectorAll('[data-current-company],[data-current-theme-panel],[data-current-top],[data-current-weight]').forEach(el=>el.textContent='Aktuelle data er ikke tilgængelige.');if(status)status.textContent=bundle?`Opdatering forsinket. Seneste hentede Azure-rapport ${bundle.data.asOf} vises fortsat.`:'Azure-data kunne ikke hentes. Aktuelle tal vises ikke; prøv igen senere.';}finally{busy=false;}}
if(typeof document!=='undefined'){await refresh();watch(refresh);}
