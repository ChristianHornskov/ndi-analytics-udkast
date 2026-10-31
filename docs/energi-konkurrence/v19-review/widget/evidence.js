// Primary evidence is shown separately; it never silently rewrites graph returns.
let navEvidence=null,annualEvidence=null;
const renderBeforeEvidence=renderReview;
renderReview=function(){
 renderBeforeEvidence();
 if(!data)return;
 document.querySelectorAll('.source-evidence').forEach(e=>e.remove());
 const f=data.funds[selected],nav=navEvidence?.asOf===data.asOf?navEvidence.funds[f.id]:null;
 const annual=annualEvidence?.funds[f.id];
 const balances={bank:0,settlement:0,other:0};
 for(const p of f.positions.filter(p=>!p.isin)){
  const kind=/^Afvikl\./.test(p.name)?'settlement':/^(Valutakonto |Standard bankkonto$)/.test(p.name)?'bank':'other';
  balances[kind]+=p.weight;
 }
 $('concentration').insertAdjacentHTML('beforeend',`<details class="source-evidence"><summary>Konti og øvrige balanceposter</summary><p>Bankkonti: ${n(balances.bank,2)} % · handelsafvikling netto: ${n(balances.settlement,2)} % · øvrige tilgodehavender og gæld netto: ${n(balances.other,2)} %.</p><p class="small muted">Summeret fra rapportens enkelte kontoposter, ikke beregnet som 100 % minus aktier. Afvikling og øvrige poster er ikke det samme som kontanter til rådighed. De afrundede vægte kan afvige fra balancebeløbene.</p></details>`);
 if(nav?.latestOfficial){
  const p=nav.latestOfficial;
  $('overview').insertAdjacentHTML('beforeend',`<article class="panel source-evidence"><span class="eyebrow">OFFICIEL INDRE VÆRDI</span><h2>${n(p.nav,2)} DKK</h2><p>Værdiansættelsesdato ${esc(p.date)} · fundet i Fundmarkets rapport ${esc(p.reportDate)}.</p><p class="small muted">Dette er rapportens felt for officiel NAV, ikke dens indikative aktuelle kurs. Den officielle værdi kan vedrøre en tidligere dato end beholdningerne. Grafens kurser afstemmes dagligt mod Fundmarkets hjemmeside og rapporternes officielle NAV med samme kursdato.</p></article>`);
 }
 if(annual){
  $('method-content').insertAdjacentHTML('beforeend',`<section class="source-evidence sv-annual"><header><div><span class="eyebrow">Kildekontrol</span><h3>Afstemning til årsrapport</h3><p>Afsluttede års afkast er kontrolleret mod årsrapporten.</p></div><a href="${esc(annualEvidence.source)}" target="_blank" rel="noopener">Årsrapport 2025 ↗<small>PDF-side ${annual.pdfPage}</small></a></header><div class="sv-annual-grid"><div><h4>Afkast i afsluttede år</h4><div class="sv-annual-years">${Object.entries(annual.returns).map(([y,v])=>`<div><strong>${esc(y)}</strong><span class="sv-annual-track"><i class="${v<0?'negative':''} ${y===annual.inception.slice(0,4)?'partial':''}" style="width:${Math.min(100,Math.abs(v))}%"></i></span><b>${pct(v)}</b></div>`).join('')}</div><p class="small muted">Startåret er en delperiode. Stribet bjælke markerer startåret.</p></div><div><h4>To forskellige startdatoer</h4><ol class="sv-date-line">${[{date:annual.firstGraphPoint,label:'Første punkt i grafgrundlaget'},{date:annual.inception,label:'Klassen påbegyndte investeringer'}].sort((a,b)=>a.date.localeCompare(b.date)).map(item=>`<li><time datetime="${esc(item.date)}">${esc(item.date)}</time><span>${item.label}</span></li>`).join('')}</ol><p class="small muted">Grafens første dato er ikke nødvendigvis dagen, investeringerne begyndte.</p></div></div>${annual.unresolved?`<p class="callout">Uafklaret kildeforskel: ${esc(annual.unresolved)} Grafen bruger årsrapportens oplyste afkast; dette er ikke en fuld NAV-afstemning.</p>`:''}</section>`);
  const note=Array.from(document.querySelectorAll('.audit-addition p')).find(p=>p.textContent.includes('Årsreferencepunkter i beregningsgrundlaget'));
  if(note)note.textContent='Beregnet fra samme indeks som grafen. Startår og indeværende år er delperioder. Afsluttede års procentafkast er afstemt mod årsrapport 2025; se Data om fonden & metode for kilde og resterende forbehold.';
 }
};
Promise.all(['nav-evidence.json','annual-evidence.json'].map(async path=>{const r=await fetch(path,{cache:'default'});if(!r.ok)throw Error(path);return r.json()})).then(([nav,annual])=>{navEvidence=nav;annualEvidence=annual;if(data)render()}).catch(()=>{
 if($('method-content'))$('method-content').insertAdjacentHTML('beforeend','<p class="callout source-evidence">Supplerende kildekontrol kunne ikke indlæses. Ingen NAV-afstemning bekræftes.</p>');
});
