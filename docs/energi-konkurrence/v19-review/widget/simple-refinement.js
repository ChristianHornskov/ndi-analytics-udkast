'use strict';
let countryFilter='',fundDocuments=null;
const periods=[['d1','1 dag'],['m1','1 md.'],['m3','3 mdr.'],['ytd','ÅTD'],['y1','1 år']];
const marketRow=p=>highData?.funds.find(f=>f.short===data.funds[selected].short)?.rows.find(r=>r.isin===p.isin);
const returnCells=r=>periods.map(([key])=>`<td>${r?.priceReturns?.[key]==null?'—':pct(r.priceReturns[key])}</td>`).join('');
const periodHeaders=()=>periods.map(([,label])=>`<th>${label}</th>`).join('');
const countryLabel=c=>({'United States':'USA','United Kingdom':'Storbritannien','South Korea':'Sydkorea','Sweden':'Sverige','China':'Kina','Japan':'Japan','Germany':'Tyskland','Netherlands':'Nederlandene','Switzerland':'Schweiz','France':'Frankrig','Australia':'Australien'}[c]||c);
function niceScale(values,zero){
 let low=Math.min(...values,zero?0:100),high=Math.max(...values,zero?0:100),raw=(high-low||1)/4,power=10**Math.floor(Math.log10(raw));
 let step=[1,2,2.5,5,10].map(x=>x*power).find(x=>x>=raw)||10*power;
 low=Math.floor(low/step)*step;high=Math.ceil(high/step)*step;if(high===low)high+=step;
 return {low,high,step};
}
chart=function(id,points,percentage=false){
 if(!points.length)return;
 const W=id==='growth'?Math.max(320,Math.min(900,$(id).clientWidth)):900,H=id==='drawdown'?340:290,L=62,R=20,T=id==='drawdown'?70:24,B=36;
 const {low,high,step}=niceScale(points.map(p=>p.v),percentage),first=Date.parse(points[0].d),last=Date.parse(points.at(-1).d);
 const x=p=>L+(Date.parse(p.d)-first)/(last-first||1)*(W-L-R),y=v=>T+(high-v)/(high-low)*(H-T-B);
 const line=points.map((p,i)=>`${i?'L':'M'}${x(p)},${y(p.v)}`).join(' ');
 let ticks='';for(let v=low;v<=high+step/100;v+=step)ticks+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="${Math.abs(v)<1e-8?'#89aeb4':'#2b3e47'}"/><text x="${L-9}" y="${y(v)+5}" text-anchor="end" fill="#a4b7bd" font-size="14">${n(v,Number.isInteger(step)?0:1)}${percentage?' %':''}</text>`;
 let annotations='';
 if(id==='drawdown'){
  const lows=drawdownBottoms(points).sort((a,b)=>a.v-b.v).slice(0,5).sort((a,b)=>a.d.localeCompare(b.d));
  let right=-Infinity;
  lows.forEach((p,i)=>{const label=new Date(p.d+'T12:00:00Z').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'}),xx=x(p),yy=y(p.v),tx=Math.max(115,Math.min(W-110,xx));const lane=tx-100<right?1:0;right=tx+100;const ty=24+lane*24;
   annotations+=`<line x1="${xx}" x2="${tx}" y1="${yy}" y2="${ty+5}" stroke="#d38f88" stroke-opacity=".5" stroke-dasharray="3 4"/><circle cx="${xx}" cy="${yy}" r="4" fill="#d38f88"/><text x="${tx}" y="${ty}" text-anchor="middle" fill="#eef4f3" font-size="14">${label} · ${pct(p.v)}</text>`;
  });
 }
 const aria=id==='drawdown'?'Fald fra tidligere top med bunddatoer':id==='rolling-chart'?'Totalafkast over de foregående 12 måneder':'Totalafkastindeks';
 $(id).innerHTML=`<svg role="img" aria-label="${aria}" viewBox="0 0 ${W} ${H}">${ticks}<path d="${line}" fill="none" stroke="${id==='drawdown'?'#d38f88':'#89aeb4'}" stroke-width="2.6"/>${annotations}<text x="${L}" y="${H-8}" fill="#a4b7bd" font-size="14">${points[0].d}</text><text x="${W-R}" y="${H-8}" text-anchor="end" fill="#a4b7bd" font-size="14">${points.at(-1).d}</text></svg>`;
};
labelDrawdownBottoms=function(points){
 const lows=drawdownBottoms(points);$('drawdown').insertAdjacentHTML('beforeend',`<details><summary>Alle ${lows.length} nedtures bunde</summary><div class="tablewrap"><table><thead><tr><th>Dato</th><th>Fald fra top</th><th>Efterfølgende genvundet?</th></tr></thead><tbody>${lows.map(p=>`<tr><td>${esc(p.d)}</td><td>${pct(p.v)}</td><td>${p.recovered?'Ja':'Ikke endnu'}</td></tr>`).join('')}</tbody></table></div></details><p class="small muted">Datoerne i grafen markerer de fem dybeste nedture. En nedtur slutter, når den tidligere top genvindes. Første laveste rapportobservation anvendes; den aktuelle nedturs bund kan ændre sig.</p>`);
};
function holdingsMarkup(ps){return ps.map(p=>{const r=marketRow(p);return `<tr><td>${esc(p.name)}<small>${esc(p.isin)}</small></td><td>${esc(sectorNames[p.sector]||p.sector||'Ikke klassificeret')}</td><td>${r?.marketClose!=null?n(r.marketClose,2)+' '+esc(r.marketCurrency):'—'}<small>${esc(r?.returnDate||'Ingen aktuel markedskurs')}</small></td><td>${n(p.weight,2)} %</td>${returnCells(r)}<td>${r?.status==='ok'?pct(r.distance):'—'}</td></tr>`}).join('');}
holdings=function(){
 const f=data.funds[selected],query=$('search').value.toLowerCase(),geo=geography?.funds[f.id]||[];
 const ps=f.positions.filter(p=>p.isin&&p.weight>0&&(!sectorFilter||(p.sector||'Ikke klassificeret')===sectorFilter)&&(!countryFilter||geo.some(r=>r.isin===p.isin&&r.country===countryFilter&&r.status==='profile_found'))&&`${p.name} ${p.isin}`.toLowerCase().includes(query));
 $('holdings').closest('table').querySelector('thead').innerHTML=`<tr><th>Selskab</th><th>Sektor</th><th>Markedskurs</th><th>Vægt</th>${periodHeaders()}<th>Under 52-ugers top</th></tr>`;
 $('holdings').innerHTML=holdingsMarkup(ps)||'<tr><td colspan="10">Ingen positioner matcher.</td></tr>';
 $('activefilter').innerHTML=`<p class="small muted">${ps.length} positioner. Kursændring i aktiens noteringsvaluta, uden geninvesteret udbytte. Eksterne markedskurser, uafhængigt af hvor længe fonden har ejet aktien. — betyder utilstrækkelige data.</p>`+((sectorFilter||countryFilter)?`<button id="clearfilter" class="chip">${esc([sectorNames[sectorFilter]||sectorFilter,countryLabel(countryFilter)].filter(Boolean).join(' · '))} × Nulstil filtre</button>`:'');
 if($('clearfilter'))$('clearfilter').onclick=()=>{sectorFilter='';countryFilter='';holdings()};
};
const previousGeography=renderGeography;
renderGeography=function(){
 previousGeography();if(!geography||!data)return;
 const box=$('geography-review');if(!box)return;
 box.querySelector('#hq-map svg')?.setAttribute('role','group');
 const groups=sumBy(geography.funds[data.funds[selected].id].filter(r=>r.status==='profile_found'),r=>r.country);
 const button=([c,w])=>`<button class="country-pick" data-hq="${esc(c)}"><span>${esc(countryLabel(c))}</span><strong>${pct(w)}</strong></button>`;
 const list=box.querySelector('.maplayout>div:last-child');list.innerHTML=groups.slice(0,6).map(button).join('')+(groups.length>6?`<details><summary>Vis ${groups.length-6} øvrige lande</summary>${groups.slice(6).map(button).join('')}</details>`:'');
 function pick(country){countryFilter=country;sectorFilter='';$('search').value='';holdings();$('holdings').closest('article').scrollIntoView({behavior:'smooth',block:'start'});}
 list.querySelectorAll('[data-hq]').forEach(b=>b.onclick=()=>pick(b.dataset.hq));
 box.querySelectorAll('#hq-map path').forEach(p=>{const name=p.querySelector('title')?.textContent.split(':')[0];const country=name==='United States of America'?'United States':name;if(!groups.some(([c])=>c===country))return;p.setAttribute('role','button');p.setAttribute('tabindex','0');p.setAttribute('aria-label','Se positioner i '+countryLabel(country));p.style.cursor='pointer';p.onclick=()=>pick(country);p.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(country)}};});
};
const previousHighs=renderHighs;
highReasons.listing_currency_mismatch='Noteringens valuta matcher ikke beholdningen; tal tilbageholdt';
renderHighs=function(f,source){
 highMode='count';previousHighs(f,source);const pack=source?.funds.find(x=>x.short===f.short);if(!pack)return;
 const box=$('highs-content');box.querySelector('.segmented')?.remove();
 box.querySelectorAll('.hist-col').forEach((col,i)=>{col.querySelector('.hist-value').innerHTML=`<strong>${pack.buckets[i].count}</strong><small>${pct(pack.buckets[i].weight)}</small>`;});
 const caption=box.querySelector('.panelhead .small');if(caption)caption.textContent='Søjlehøjde: antal positioner · under antallet: andel af formuen';
 const rows=(highBucket===null?pack.rows:highBucket==='unknown'?pack.rows.filter(r=>r.status!=='ok'):pack.rows.filter(r=>r.status==='ok'&&r.bucket===highBucket)).slice().sort((a,b)=>(a.distance??Infinity)-(b.distance??Infinity));
 const table=box.querySelector('table');table.querySelector('thead tr').insertAdjacentHTML('beforeend',periodHeaders());
 table.querySelectorAll('tbody tr').forEach((tr,i)=>{if(rows[i])tr.insertAdjacentHTML('beforeend',returnCells(rows[i]));});
 table.querySelectorAll('tbody tr').forEach((tr,i)=>{const r=rows[i];if(r?.missingLatestClose)tr.children[5].insertAdjacentHTML('beforeend',`<small>Seneste session mangler luk. Højder til ${esc(r.highThroughDate)}.</small>`);if(r?.listingReview&&r.status==='ok')tr.children[0].insertAdjacentHTML('beforeend',`<small>${esc(r.listingReview.note)}</small>`);});
 table.querySelector('[colspan]')?.setAttribute('colspan','11');
 box.insertAdjacentHTML('beforeend','<p class="small muted">Kursændringerne er beregnet på eksterne lukkekurser i noteringsvaluta uden geninvesteret udbytte, ikke på fondens ejertid.</p>');
};
renderFundCosts=function(f){
 const doc=fundDocuments?.funds[f.id];if(!doc||doc.sha256!==f.priip?.sha256)return '<section class="fund-costs"><h3>Fondens omkostninger</h3><p>Afventer match med det kontrollerede PRIIP-KID. Se dokumentet via linket nedenfor.</p></section>';
 const c=doc.costs;
 const example=`<details open><summary>KID’s samlede omkostningseksempel</summary><p>Ved 100.000 kr. investeret: ${n(c.impact1,2)} % årlig omkostningsmæssig konsekvens ved exit efter ét år og ${n(c.impact5,2)} % pr. år ved exit efter fem år. Eksemplet forudsætter 0 % afkast første år og KID’s moderate scenarie for den længere periode. Det er ikke en fast årlig gebyrsats eller en afkastprognose. Tallene skal ikke lægges oven i de øvrige omkostninger. Carried interest: ${n(c.carried,2)} %.</p></details>`;
 return `<section class="fund-costs"><span class="eyebrow">OMKOSTNINGER I PRIIP-KID</span><h3>Hvad koster fonden?</h3><div class="metrics">${metric('Forvaltning og drift',n(c.management,2)+' %','Årlig post i KID')}${metric('Transaktionsomkostninger',n(c.transactions,2)+' %','KID-estimat; kan variere')}${metric('Ved køb / emission',n(c.entry,2)+' %','KID’s entry-omkostning')}${metric('Ved salg / indløsning',n(c.exit,2)+' %','KID’s exit-omkostning')}</div><p>Forvaltning og transaktioner summerer til ${n(c.management+c.transactions,2)} %. Det er ikke KID’s samlede omkostningseksempel. Resultatgebyr: ${n(c.performance,2)} %.</p><p><strong>Fondens løbende omkostninger er allerede indregnet i afkastet og skal ikke trækkes fra igen.</strong> Investorens entry/exit, egne handelsomkostninger og skat er ikke medregnet.</p><p class="small muted">Kilde: <a href="${esc(doc.url)}" target="_blank" rel="noopener">PRIIP-KID ${esc(doc.production_date)} ↗</a>. Seneste dokumentkontrol: ${esc(fundDocuments.checkedAt.slice(0,10))}. Dokumentets indhold kontrolleres ved dagskørslen, også hvis adressen er uændret.</p></section>`;
};
const previousReview=renderReview;
// Restore the standardised example from the same hash-validated document.
const itemisedFundCosts=renderFundCosts;
renderFundCosts=function(f){
 const html=itemisedFundCosts(f),doc=fundDocuments?.funds[f.id];
 if(!doc||doc.sha256!==f.priip?.sha256)return html;
 const c=doc.costs;
 return html.replace('</section>',`<details open><summary>KID’s samlede omkostningseksempel</summary><p>Ved 100.000 kr. investeret: ${n(c.impact1,2)} % årlig omkostningsmæssig konsekvens ved exit efter ét år og ${n(c.impact5,2)} % pr. år ved exit efter fem år. Forudsætninger: 0 % afkast første år og KID’s moderate scenarie for den længere periode. Ikke en fast årlig gebyrsats eller afkastprognose. Skal ikke lægges oven i de øvrige omkostninger. Carried interest: ${n(c.carried,2)} %.</p></details></section>`);
};
const previousDisclaimer=renderDisclaimer;
renderDisclaimer=function(){
 previousDisclaimer();
 const f=data.funds[selected],doc=fundDocuments?.funds[f.id];
 const basis=Array.from($('global-disclaimer').querySelectorAll('p')).find(p=>p.textContent.startsWith('Grafen viser'));
 if(basis)basis.innerHTML=`Grafen viser et rapportbaseret totalafkastindeks for ${esc(f.short)}, ${esc(f.legalName)}, ISIN ${esc(f.isin)}. Kurserne er hentet fra Fundmarkets offentliggjorte historik og afstemt mod rapporternes officielle NAV. Rapportens indikative Aktuel IV bruges ikke som afsluttet dagskurs. Rapportgrundlag: ${esc(data.asOf)}. Data kan være forsinket. Afkast- og risikomål er derfor indikative, ikke realtidskurser eller officielt godkendte fondsnøgletal.`;
 const p=Array.from($('global-disclaimer').querySelectorAll('p')).find(p=>p.textContent.includes('Emissions- og indløsningstillæg'));
 if(p)p.textContent=p.textContent.replace('Emissions- og indløsningstillæg på 0,25 % ved henholdsvis køb og salg',doc&&doc.sha256===f.priip?.sha256?`Emissions- og indløsningstillæg på henholdsvis ${n(doc.costs.entry,2)} % og ${n(doc.costs.exit,2)} % ved køb og salg`:'Emissions- og indløsningstillæg ved køb og salg (se gældende PRIIP-KID)');
};
renderReview=function(){
 previousReview();const f=data.funds[selected],m=insights?.funds[f.id];if(!m)return;
 document.querySelectorAll('.audit-addition').forEach(e=>e.remove());
 const age=Math.floor((Date.now()-Date.parse(data.asOf+'T12:00:00Z'))/86400000);
 const notice=`<p class="callout audit-addition">Totalafkast i DKK beregnet på Fundmarkets officielle dagskurser med udbyttekorrektion.${age>3?' Datagrundlaget er over tre kalenderdage gammelt; kontrollér datoen før brug.':''}</p>`;
 $('overview').insertAdjacentHTML('afterbegin',notice);
 const years=new Map();for(const p of f.data)years.set(p.d.slice(0,4),p);
 let baseline=100;
 const annual=Array.from(years,([year,p])=>{const value=(p.total/baseline-1)*100;baseline=p.total;const current=year===data.asOf.slice(0,4),stub=year===f.inception.slice(0,4)&&!f.inception.endsWith('01-01');return `<tr><th>${year}${current?' · ÅTD':stub?' · fra klassens start':''}</th><td>${pct(value)}</td><td>${esc(p.d)}</td></tr>`}).join('');
 $('calendar').insertAdjacentHTML('afterend',`<section class="audit-addition"><h3>Afkast pr. kalenderår</h3><div class="tablewrap"><table><thead><tr><th>Periode</th><th>Totalafkast · DKK</th><th>Slutpunkt</th></tr></thead><tbody>${annual}</tbody></table></div><p class="small muted">Beregnet fra samme indeks som grafen. Startår og indeværende år er delperioder. Årsreferencepunkter i beregningsgrundlaget er ikke her dokumenteret ved en selvstændig afstemning mod alle originale årsrapporter.</p></section>`);
 $('overview').insertAdjacentHTML('beforeend',`<article class="panel audit-addition"><span class="eyebrow">KLASSE OG UDLODNINGER</span><h2>${f.id==='pmindi'?'Udloddende klasse':'Akkumulerende klasse'}</h2><p>Samme investeringsstrategi, men særskilt klassehistorik. Strategien kombinerer langsigtede aktiepositioner med aktiv handel, der søger at udnytte kursudsving. Det er en metode, ikke dokumentation for et merafkast fra handlerne.</p><p>Start: ${esc(f.inception)}. Anbefalet investeringsperiode: ${esc(f.priip.recommended_holding_years)} år. Produktet kan være uegnet, hvis pengene skal bruges tidligere. Høj risikovillighed og evne til at bære tab er nødvendige.</p>${f.dividends.length?`<table><thead><tr><th>Ex-dato</th><th>Betalingsdato</th><th>Kr. pr. bevis</th></tr></thead><tbody>${f.dividends.map(d=>`<tr><td>${esc(d.exDate)}</td><td>${esc(d.paymentDate)}</td><td>${n(d.amount,2)}</td></tr>`).join('')}</tbody></table><p class="small muted">På ex-datoen fragår udlodningen normalt kursen. Det er ikke i sig selv et investeringstab. Grafens totalafkast forudsætter geninvestering og skal ikke tillægges udbyttet igen.</p>`:'<p>Afkast opsamles i klassen. Ingen kontante klasseudlodninger er registreret i datagrundlaget.</p>'}</article>`);
 $('risk-period').insertAdjacentHTML('afterend',`<p class="callout audit-addition">Risikotallene dækker kun ${esc(f.inception)}–${esc(f.performanceAsOf||data.asOf)}. Kortere historik kan give et mindre observeret fald uden lavere fremtidig risiko. Sharpe bygger på ${m.completedMonths} hele månedsperioder og er et usikkert historisk estimat, ikke bevis for forvalterdygtighed.</p>`);
 $('method-content').insertAdjacentHTML('beforeend',`<section class="audit-addition"><h3>Datakvalitet og udeladte observationer</h3><p>Afkastserien bruger Fundmarkets offentliggjorte officielle NAV-historik. Indikativ Aktuel IV anvendes kun til en særskilt kontrol mod Fundmarkets samtidige ÅTD, aldrig som grafens dagskurs. Manglende rapportdage erstattes ikke af fiktive observationer.</p><p>Følgende observationer er udeladt på grund af inkonsistent afkastgrundlag ved årsskiftet: ${esc((f.excludedReturnDates||[]).join(', ')||'Ingen')}. Ingen er erstattet med et estimeret afkast. De originale data er bevaret. Måneds- og nøgletal genberegnes på det tilbageværende grundlag.</p><p>Aktier med forskellig valuta i beholdningsregister og kursnotering får ikke vist kursafkast eller 52-ugersmål, før noteringen er afklaret. Identisk valuta er ikke alene bevis for korrekt instrumentmatch. GBP og GBp er henholdsvis pund og pence. Kort kursserie kan godt understøtte 1 måneds afkast uden at understøtte 52-ugersmålet. Warrants vises ikke som aktieafkast.</p><p>52-ugersmaksimum medtager gyldige intradagtoppe fra afsluttede handelssessioner, også når samme sessions lukkekurs mangler. I så fald bruges seneste gyldige lukkekurs, og datoafvigelsen markeres. Hovedsæder fra leverandørprofiler kan være juridisk eller operationelt hjemsted; kortet er derfor ikke en ensartet opgørelse over økonomisk eksponering.</p></section>`);
 const groups=sumBy(f.positions.filter(p=>p.isin&&p.weight>0),p=>p.sector||'Ikke klassificeret'),total=groups.reduce((s,[,v])=>s+v,0);let offset=0;
 const arcs=groups.map(([name,v],i)=>{const fraction=v/total*100,s=`<circle cx="120" cy="120" r="85" pathLength="100" fill="none" stroke="${palette[i%palette.length]}" stroke-width="32" stroke-dasharray="${fraction} ${100-fraction}" stroke-dashoffset="${-offset}" transform="rotate(-90 120 120)"><title>${esc(sectorNames[name]||name)}: ${pct(v)} af formuen</title></circle>`;offset+=fraction;return s;}).join('');
 $('sector').innerHTML=`<div class="sector-ring"><svg viewBox="0 0 240 240" role="img" aria-label="Sektorfordeling efter vægt">${arcs}<text x="120" y="115" text-anchor="middle" fill="#eef4f3" font-size="24">${pct(total)}</text><text x="120" y="139" text-anchor="middle" fill="#a4b7bd" font-size="12">værdipapirer</text></svg></div><div class="sector-legend">${groups.map(([name,v],i)=>`<button data-sector="${esc(name)}"><i style="background:${palette[i%palette.length]}"></i><span>${esc(sectorNames[name]||name)}</span><strong>${pct(v)}</strong></button>`).join('')}</div>`;
 $('sector').querySelectorAll('button').forEach(b=>b.onclick=()=>{sectorFilter=b.dataset.sector;countryFilter='';holdings();$('holdings').closest('article').scrollIntoView({behavior:'smooth'})});
 $('sectorNote').textContent=`Ringen viser fordelingen inden for værdipapirerne; procenterne er af hele fondens formue. Kontanter er udenfor. Klik på en sektor for at se positionerne. ${pct(f.classificationCoverage)} af formuen er klassificeret efter leverandørens sektorinddeling, ikke GICS.`;
 const rolling=$('rolling-chart').nextElementSibling;
 if(rolling&&m.rolling.length){const first=m.rolling[0];rolling.textContent=`Hvert punkt svarer på: Hvad gav en investering de foregående 12 måneder? Det første punkt, ${first.d}, viser ${pct(first.v)} fra ${first.baseDate} — ikke afkast fra grafens venstre kant. Derfor begynder linjen ikke ved 0 %. Seneste punkt svarer til overblikkets seneste 12 måneder. Overlappende perioder er ikke uafhængige.`;}
 $('method-content').insertAdjacentHTML('beforeend','<h3>Aktiernes eksterne kursudvikling</h3><p>Kursændring = (sidste lukkekurs / basiskurs − 1) × 100 i noteringsvaluta, uden geninvesteret udbytte. Kilde: Yahoo Finance chart-serien, samme symbol som 52-ugersmålet. 1 dag bruger forrige observation; 1 og 3 måneder samt 1 år bruger kalenderdatoen samme dag i den tidligere måned. ÅTD bruger sidste observation på eller før 31. december. Basispunktet må højst være 7 dage før skæringsdatoen, seneste kurs højst 5 dage før rapportdatoen. Manglende grundlag vises som —. Leverandørens splitbehandling og symbolhistorik kan påvirke sammenligneligheden. Uafklarede noteringer får ikke vist beregnede kursændringer.</p>');
 holdings();
};
// Layout changes preserve the original data flow and leave the public Wix module untouched.
const overview=$('overview'),concentration=$('concentration').closest('article'),overviewTop=$('topmini').closest('article');
overview.querySelector('.grid:has(.wide)').classList.add('primary-chart');
overviewTop.parentElement.appendChild(concentration);
Array.from(overview.querySelectorAll('article')).find(a=>a.querySelector('h2')?.textContent==='To forskellige typer indsigt')?.remove();
overviewTop.querySelector('button').textContent='Se alle positionerne →';
$('sectorbars').parentElement.hidden=true;
const rollingPanel=$('rolling-chart').closest('article'),rollingDetails=document.createElement('details');rollingDetails.className='panel rolling-details';rollingDetails.innerHTML='<summary>Supplerende analyse: afkast over de seneste 12 måneder</summary>';rollingPanel.replaceWith(rollingDetails);rollingDetails.appendChild(rollingPanel);rollingPanel.classList.remove('panel');
const oldFundChange=$('fund').onchange;$('fund').onchange=e=>{countryFilter='';oldFundChange(e)};
fetch('fund-documents.json',{cache:'default'}).then(r=>{if(!r.ok)throw Error('KID-data mangler');return r.json()}).then(d=>{fundDocuments=d;if(data)render()}).catch(()=>{});
