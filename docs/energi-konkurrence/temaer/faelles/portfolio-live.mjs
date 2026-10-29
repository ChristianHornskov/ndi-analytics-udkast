import {loadAzure,getJSON,companies,freshness,watch} from './azure-data.mjs';
const root=new URL('../',import.meta.url),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pct=v=>Number.isFinite(v)?v.toLocaleString('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2})+' %':'—';
const link=path=>new URL(path,root).href;
let labels={},bundle,busy=false;
const status=typeof document==='undefined'?null:document.querySelector('[data-portfolio-status]');
const holdings=b=>companies(b.data.funds.find(f=>f.id==='pmindi')).sort((a,b)=>b.weight-a.weight||a.isin.localeCompare(b.isin));
export function themeTotals(rows,metadata){const totals={};for(const p of rows){const key=metadata[p.isin]?.themeUrl?.split('/')[0]||'unclassified';totals[key]=(totals[key]||0)+p.weight;}return totals;}
function cards(rows){return rows.map(p=>{const m=labels[p.isin]||{};return `<a class="c20-index-card" href="${esc(link(m.url||'selskaber.html?q='+encodeURIComponent(p.isin)))}">${m.logo?`<img alt="" width="48" height="48" loading="lazy" src="${esc(link(m.logo))}">`:''}<span>${esc(m.theme||'Tema endnu ikke klassificeret')}</span><h2>${esc(m.displayName||p.name)}</h2>${m.teaser?`<p>${esc(m.teaser)}</p>`:''}<strong>${pct(p.weight)} · ${m.url?'Læs om selskabet':'Se selskabet'} →</strong></a>`;}).join('');}
const displayDate=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||'')?v.split('-').reverse().join('.'):String(v||'');
export function weightFigure(weight){
 if(!Number.isFinite(weight)||weight<0||weight>100)return '';
 const cells=Array.from({length:100},(_,i)=>{const fill=Math.max(0,Math.min(1,weight-i));const x=(i%10)*22,y=Math.floor(i/10)*22;return `<rect x="${x}" y="${y}" width="18" height="18" rx="2" fill="var(--linje-2)"/>${fill?`<rect x="${x}" y="${y}" width="${18*fill}" height="18" rx="1" fill="var(--accent)"/>`:''}`;}).join('');
 return `<svg class="pd-waffle" viewBox="0 0 218 218" role="img" aria-label="${pct(weight)} af 100 procent. Et felt svarer til 1 procent af fonden.">${cells}</svg>`;
}
export function metrics(b,isin){
 const items=b.data.funds.map(f=>({f,p:companies(f).find(p=>p.isin===isin)}));
 if(!items.some(x=>x.p))return '';
 const fields=items.map(({f,p})=>`<div><small>Andel af ${esc(f.short)}</small><strong class="${p?'': 'pd-not-held'}">${p?pct(p.weight):'Ikke i beholdningen'}</strong></div>`).join('');
 return `<div class="ndi-current-grid">${fields}</div><p>Beholdninger ${esc(displayDate(b.data.positionsAsOf||b.data.asOf))}.</p><p>Fondens risiko: 5 af 7. Investering indebærer risiko for tab. Fonden har en økonomisk interesse i selskabet gennem den oplyste andel. Ikke en personlig anbefaling.</p><a href="https://fundmarket.dk/newdeal-invest-kl-n/">PMINDI: KID og prospekt ↗</a> <a href="https://fundmarket.dk/newdeal-invest-akk-kl-n/">PMINDIAKK: KID og prospekt ↗</a>`;
}

function render(b){
 const rows=holdings(b),totals=themeTotals(rows,labels),date=b.data.positionsAsOf||b.data.asOf;
 document.querySelectorAll('[data-current-theme]').forEach(el=>{const key=el.dataset.currentTheme==='fintech'?'fintech-tekst':el.dataset.currentTheme;el.textContent=pct(totals[key]||0)+(el.dataset.suffix||'');el.closest('[data-map-preview]')?.style.setProperty('--w',totals[key]||0);});
 document.querySelectorAll('[data-current-date]').forEach(el=>el.textContent=`Andel af hele PMINDI · beholdninger ${displayDate(date)}. Temaerne er NewDeal Invests redaktionelle opdeling.${totals.unclassified?` Ikke klassificeret: ${pct(totals.unclassified)}.`:''}`);

 document.querySelectorAll('[data-design-opening]').forEach(el=>{const p=rows.find(p=>p.isin===el.dataset.designOpening);el.hidden=!p;if(!p){el.replaceChildren();return;}el.innerHTML=`<div><strong>${pct(p.weight)}</strong><p>af PMINDI er placeret i selskabet.</p><p class="c20-note">Beholdninger ${esc(displayDate(date))}. Hvert felt svarer til 1 % af fonden.</p></div>${weightFigure(p.weight)}`;});
 const top=document.querySelector('[data-current-top]');if(top){top.hidden=false;top.innerHTML=cards(rows.slice(0,20));document.querySelector('.c20-lead').textContent=`De 20 største selskabspositioner i PMINDI · beholdninger ${displayDate(date)}. Forstå teknologien og selskaberne bag.`;}
 document.querySelectorAll('[data-current-company]').forEach(el=>{el.innerHTML=metrics(b,el.dataset.currentCompany);el.hidden=!el.innerHTML;});
 document.querySelectorAll('[data-current-weight]').forEach(el=>{el.hidden=false;const p=rows.find(p=>p.isin===el.dataset.currentWeight);el.textContent=p?`${pct(p.weight)} af PMINDI · beholdninger ${displayDate(date)}`:`Ikke i PMINDI's seneste beholdningsliste (${displayDate(date)})`;});
 const theme=document.querySelector('[data-current-theme-panel]');if(theme){theme.hidden=false;const key=theme.dataset.currentThemePanel,subset=rows.filter(p=>labels[p.isin]?.themeUrl?.split('/')[0]===key);theme.innerHTML=`<h2>Temaet i fonden nu</h2><p><strong>${pct(totals[key]||0)}</strong> af PMINDI · ${subset.length} selskaber · beholdninger ${esc(displayDate(date))}.</p><h3>De største selskaber i temaet</h3><div class="c20-index">${cards(subset.slice(0,5))}</div><p><a href="${esc(link('selskaber.html?q='+encodeURIComponent(subset.length?labels[subset[0].isin].theme:'')))}">Se selskaberne og hent listen →</a></p>`;}
 if(status)status.textContent=freshness(b)+` · Beholdninger ${displayDate(date)}. Opdateres automatisk hvert femte minut. Ikke realtidskurser.`;
}
async function refresh(){if(busy)return;busy=true;try{const next=await loadAzure();if(!Object.keys(labels).length)labels=await getJSON(new URL('./position-labels.json',import.meta.url));bundle=next;render(bundle);}catch{if(!bundle)document.querySelectorAll('[data-current-company],[data-current-theme-panel],[data-current-top],[data-current-weight]').forEach(el=>{el.replaceChildren();el.hidden=true;});if(status)status.textContent=bundle?`Opdatering forsinket. Seneste hentede Azure-rapport ${bundle.data.asOf} vises fortsat.`:'Azure-data kunne ikke hentes. Aktuelle tal vises ikke; prøv igen senere.';}finally{busy=false;}}
if(typeof document!=='undefined'){await refresh();watch(refresh);}
