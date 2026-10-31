'use strict';
let highMode='count',highBucket=null,highFund=null;
const highReasons={no_mapping:'Intet sikkert symbolmatch',fetch_error:'Kursdata kunne ikke hentes',short_history:'Under 52 ugers valideret kurshistorik',incomplete_history:'Ufuldstændig kurshistorik',stale:'For gammel seneste kurs',not_equity:'Ikke klassificeret som aktie',timezone_unavailable:'Børskalender ikke afstemt',no_prices:'Ingen kurser',invalid_ohlc:'Kurskontrol fejlede',invalid_distance:'Beregning afvist'};
function renderHighs(fund,source){
  const box=document.getElementById('highs-content');
  if(!source||source.asOf!==data.asOf){box.innerHTML='<p class="callout">52-ugers data mangler eller matcher ikke porteføljedatoen. Ingen aktier er placeret i intervaller uden et gyldigt grundlag.</p>';return}
  if(highFund!==fund.short){highFund=fund.short;highBucket=null}
  const pack=source.funds.find(f=>f.short===fund.short),rows=pack?.rows||[],known=rows.filter(r=>r.status==='ok'),unknown=rows.filter(r=>r.status!=='ok');
  const weight=known.reduce((s,r)=>s+r.weight,0),average=weight?known.reduce((s,r)=>s+r.weight*r.distance,0)/weight:null;
  const max=Math.max(1,...pack.buckets.map(b=>b[highMode]));
  const colors=['#89aeb4','#91b5b5','#9bbbaf','#aac2ad','#bac8ad','#cbd0aa','#ddd8a6','#f5ee9e','#d9b38d','#d38f88'];
  const label=i=>`${i*10}–${(i+1)*10} %`;
  const caption=highBucket===null?'Alle positive værdipapirpositioner':highBucket==='unknown'?'Ikke fordelt':label(highBucket)+' under 52-ugers høj';
  const visible=(highBucket===null?rows:highBucket==='unknown'?unknown:known.filter(r=>r.bucket===highBucket)).slice().sort((a,b)=>(a.distance??Infinity)-(b.distance??Infinity));
  box.innerHTML=`<div class="metrics highmetrics">${metric('Med tilstrækkelig historik',`${known.length} / ${rows.length}`,`${pct(weight)} af porteføljens formue`)}${metric('Vægtet afstand til toppen',average===null?'—':pct(average),'Kun positioner med gyldige data')}${metric('Inden for 10 % af toppen',pack.buckets[0].count+' aktier',pct(pack.buckets[0].weight)+' af formuen')}${metric('Ikke fordelt',unknown.length+' positioner','Manglende eller for kort historik')}</div>
  <div class="panelhead"><div class="segmented"><button data-highmode="count" aria-pressed="${highMode==='count'}">Antal aktier</button><button data-highmode="weight" aria-pressed="${highMode==='weight'}">Porteføljevægt</button></div><span class="small muted">${highMode==='count'?'Antal positioner':'Procent af hele formuen'}</span></div>
  <div class="hist-scroll"><div class="histogram" aria-label="Fordeling efter afstand til 52-ugers højeste kurs">${pack.buckets.map((b,i)=>`<button class="hist-col" data-highbucket="${i}" aria-pressed="${highBucket===i}" aria-label="${label(i)} under toppen: ${b.count} aktier, ${pct(b.weight)} af formuen"><span class="hist-value">${highMode==='count'?b.count:pct(b.weight)}</span><span class="hist-track"><span class="hist-bar" style="height:${b[highMode]/max*100}%;background:${colors[i]}"></span></span><span class="hist-label">${i*10}–${(i+1)*10}</span></button>`).join('')}</div></div>
  <p class="small muted">Afstand under 52-ugers højeste kurs (%) · Klik på en søjle for at se aktierne. Intervaller inkluderer nedre grænse, men ikke øvre; sidste interval inkluderer 100 %.</p>
  <div class="panelhead"><h3>${esc(caption)}</h3><div><button class="chip" id="high-all">Vis alle</button> <button class="chip warning" id="high-unknown">Ikke fordelt (${unknown.length})</button></div></div>
  <div class="tablewrap high-table"><table><thead><tr><th>Aktie</th><th>Vægt</th><th>Seneste luk</th><th>52-ugers høj</th><th>Under toppen</th><th>Kursdato / status</th></tr></thead><tbody>${visible.map(r=>`<tr><td>${esc(r.name)}<small>${esc(r.ticker||r.isin)}</small></td><td>${pct(r.weight)}</td><td>${r.status==='ok'?n(r.close,2)+' '+esc(r.currency):'—'}</td><td>${r.status==='ok'?n(r.high,2)+' '+esc(r.currency):'—'}</td><td>${r.status==='ok'?pct(r.distance):'—'}</td><td>${r.status==='ok'?esc(r.date):esc(highReasons[r.status]||r.status)}${r.listingReview&&r.status!=='ok'?`<small>${esc(r.listingReview.note)} <a href="${esc(r.listingReview.source)}" target="_blank" rel="noopener">Kilde ↗</a></small>`:''}</td></tr>`).join('')||'<tr><td colspan="6">Ingen aktier i dette interval.</td></tr>'}</tbody></table></div>`;
  box.querySelectorAll('[data-highmode]').forEach(b=>b.onclick=()=>{highMode=b.dataset.highmode;renderHighs(fund,source)});
  box.querySelectorAll('[data-highbucket]').forEach(b=>b.onclick=()=>{highBucket=Number(b.dataset.highbucket);renderHighs(fund,source)});
  document.getElementById('high-all').onclick=()=>{highBucket=null;renderHighs(fund,source)};
  document.getElementById('high-unknown').onclick=()=>{highBucket='unknown';renderHighs(fund,source)};
}
