import {loadAzure,getJSON,marketRow,companies,freshness,watch} from './azure-data.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pct=v=>Number.isFinite(v)?v.toLocaleString('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2})+' %':'—';
const table=document.querySelector('tbody'),status=document.querySelector('#positions-status'),controls=document.querySelector('#positions-controls'),input=document.querySelector('#find');
let bundle,selected='pmindi',busy=false,labels={};
try{labels=await getJSON(new URL('./position-labels.json',import.meta.url));}catch{}
const filter=()=>{const q=input.value.toLocaleLowerCase('da-DK');for(const row of table.rows)row.hidden=!row.textContent.toLocaleLowerCase('da-DK').includes(q)&&!row.dataset.isin.toLowerCase().includes(q);};
input.addEventListener('input',filter);input.value=new URLSearchParams(location.search).get('q')||'';
function render(){
 const f=bundle.data.funds.find(f=>f.id===selected),rows=companies(f).sort((a,b)=>b.weight-a.weight);
 status.textContent=freshness(bundle)+` · ${rows.length} selskabspositioner · beholdninger ${bundle.data.positionsAsOf||bundle.data.asOf}. Kursændring i noteringens valuta, uden udbytte. Opdateres hvert femte minut.`;
 controls.innerHTML=bundle.data.funds.map(f=>`<button class="ndi-profile-link" data-fund="${esc(f.id)}" aria-pressed="${f.id===selected}">${esc(f.short)}</button>`).join(' ')+' <button class="ndi-profile-link" id="download-current">Download den aktuelle liste (CSV) ↓</button>';
 table.innerHTML=rows.map(p=>{const m=labels[p.isin]||{},r=marketRow(bundle,f,p);return `<tr data-isin="${esc(p.isin)}"><td>${m.logo?`<img loading="lazy" alt="" width="28" height="28" src="${esc(m.logo)}">`:'<span class="company-monogram" aria-hidden="true">'+esc(p.name?.slice(0,2))+'</span>'}${m.url?`<a href="${esc(m.url)}">${esc(p.name)} →</a>`:esc(p.name)}</td><td>${m.themeUrl?`<a href="${esc(m.themeUrl)}">${esc(m.theme)}</a>`:'Ikke klassificeret'}</td><td>${pct(p.weight)}</td><td>${pct(r?.priceReturns?.y1)}</td><td>${pct(r?.distance)}</td><td>${esc(r?.date||'—')}</td></tr>`;}).join('');filter();
 controls.querySelectorAll('[data-fund]').forEach(b=>b.onclick=()=>{selected=b.dataset.fund;render();});
 controls.querySelector('#download-current').onclick=()=>{const cell=v=>'"'+String(v??'').replace(/^[=+@-]/,"'").replaceAll('"','""')+'"';const csv=[['Selskab','ISIN','Afdeling','Andel procent','12 måneder procent','Under 52-ugers top procent','Kursdato','Beholdningsdato'],...rows.map(p=>{const r=marketRow(bundle,f,p);return [p.name,p.isin,f.short,p.weight,r?.priceReturns?.y1,r?.distance,r?.date,bundle.data.positionsAsOf||bundle.data.asOf];})].map(r=>r.map(cell).join(';')).join('\r\n');const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=f.id+'-'+bundle.data.asOf+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
}
async function refresh(){if(busy)return;busy=true;try{const next=await loadAzure();const changed=!bundle||bundle.pointer.release!==next.pointer.release;bundle=next;if(changed)render();else status.textContent=freshness(bundle)+` · Beholdninger ${bundle.data.positionsAsOf||bundle.data.asOf}. Opdateres hvert femte minut.`;}catch{status.textContent=bundle?'Opdateringen er forsinket. Seneste gyldige rapport '+bundle.data.asOf+' vises fortsat.':'Azure-data kunne ikke hentes. Ingen gemte tal vises som erstatning.';}finally{busy=false;}}
await refresh();watch(refresh);
