const PHASE_EXPLANATIONS = Object.freeze({
 'pre-revenue': {
  business:'En lovende prototype er først begyndelsen. Selskabet skal vise, at løsningen kan produceres, bruges og leveres til en pris, kunderne vil betale. Et teknisk gennembrud og en holdbar forretning er to forskellige milepæle.',
  watch:'Følg vejen fra forsøg til produkt: testresultater, godkendelser hvor de kræves, og betalende kunder. Sammenhold kontantbeholdningen med kontantforbruget: hvor længe kan arbejdet finansieres?',
  risk:'Forsinkelser kan tvinge selskabet til at hente mere kapital, før produktet tjener penge. Nye aktier kan reducere den enkelte ejers andel. P/E sammenholder aktiekursen med overskuddet pr. aktie. Uden overskud giver tallet ingen brugbar målestok.'
 },
 'pre-profit': {
  business:'Omsætningen viser, at nogen vil betale. Næste prøve er, om selskabet kan beholde nok af betalingen til at dække udvikling, salg og drift. Salgsvækst kan både hjælpe og øge behovet for finansiering.',
  watch:'Se på bruttomarginen: hvor meget er tilbage efter de direkte omkostninger? Følg også driftsomkostninger og kontantforbrug. En voksende kundebase er stærkere, hvis kunderne bliver og koster mindre at betjene.',
  risk:'Et underskud kan skyldes investering i vækst eller en forretning, der ikke hænger sammen. Hvis udgifterne vokser lige så hurtigt som salget, er mere omsætning ikke i sig selv vejen til overskud.'
 },
 growth: {
  business:'Her kombineres høj omsætningsvækst med overskud. Opgaven er at udvide forretningen uden at miste kvalitet, kunder eller prisstyrke. Konkurrenter vil ofte forsøge at tage del i et hurtigt voksende marked.',
  watch:'Undersøg, om væksten kommer fra flere kunder, større køb eller højere priser. Følg marginerne og de investeringer, der skal understøtte næste væksttrin. Højere salg er mest værdifuldt, når økonomien følger med.',
  risk:'En høj aktiepris kan allerede forudsætte mange års fremgang. Selv et godt selskab kan skuffe, hvis væksten bremser. Se derfor både på forretningens udvikling og de forventninger, prisen kræver.'
 },
 profitable: {
  business:'Forretningen tjener penge og vokser i et mere moderat tempo. Det centrale spørgsmål er, hvad den næste investerede krone skaber: mere indtjening, et stærkere produkt eller blot mere omsætning.',
  watch:'Sammenhold overskud med pengestrømme og kapitalbehov. Nye fabrikker, opkøb og produktudvikling kan kræve kontanter længe før indtjeningen kommer. Kapitalafkastet hjælper med at vurdere, om udbygningen betaler sig.',
  risk:'Vækst gennem dyre opkøb eller stadigt større investeringer kan gøre regnskabet større uden at gøre ejerens andel mere værd. Gæld og svagere marginer kan begrænse handlefriheden.'
 },
 mature: {
  business:'En etableret forretning behøver ikke vokse hurtigt for at skabe værdi. Den kan levere pengestrømme, nedbringe gæld eller udbetale kapital til ejerne. Men modenhed er en økonomisk position, ikke en garanti for stabilitet.',
  watch:'Undersøg, hvor meget fri pengestrøm der er tilbage efter nødvendige investeringer. Vurdér gæld og konkurrencefordel. Indtjeningen bør ses over en hel konjunkturcyklus, hvis branchen svinger meget.',
  risk:'Lav vækst kan være et bevidst valg eller tegn på et marked i tilbagegang. Et lavt P/E-tal er ikke automatisk billigt, hvis overskuddet er midlertidigt højt eller forretningen er ved at blive fortrængt.'
 }
});
const CURVE = Object.freeze({
 w: 1000, h: 360, zero: 250,
 rev: 'M0 249 C 110 249 170 248 215 240 S 400 160 540 110 S 850 52 1000 46',
 profit: 'M0 262 C 90 268 170 298 270 306 S 410 284 470 250 S 760 172 1000 160',
 notes: [{k: 'rev', x: 215, y: 240, text: 'Første omsætning'}, {k: 'profit', x: 470, y: 250, text: 'Første overskud'}]
});
const ids=['pre-revenue','pre-profit','growth','profitable','mature'];
const names=['Idé og udvikling','De første kunder','En forretning i vækst','Vækst med overskud','En etableret forretning'];
const art=['fase-1-foer-omsaetning','fase-2-foer-overskud','fase-3-hoej-vaekst','fase-4-vaekst-med-overskud','fase-5-moden-forretning'];
const host=document.querySelector('#phase-review');
host.innerHTML=`<div class="phase-legend"><span>━ Omsætning</span><span>┄ Overskud</span></div><svg class="phase-visual" viewBox="0 0 1000 360" role="img" aria-label="Principskitse over omsætning og overskud, ikke konkrete tal eller en prognose">${ids.map((id,i)=>`<rect data-stage-area="${i}" x="${i*200}" y="0" width="200" height="360"/>`).join('')}<line x1="0" x2="1000" y1="250" y2="250" stroke="#76919b" stroke-dasharray="3 6"/><text x="12" y="239" class="phase-axis">Nul</text><path d="${CURVE.rev}"/><path class="profit" d="${CURVE.profit}"/><g class="phase-milestone"><circle cx="215" cy="240" r="6" fill="#89aeb4"/><rect x="95" y="190" width="235" height="32" rx="10"/><text x="212" y="213" text-anchor="middle">Første omsætning</text><path d="M215 222V234"/></g><g class="phase-milestone"><circle cx="470" cy="250" r="6" fill="#f5ee9e"/><rect x="365" y="275" width="220" height="32" rx="10"/><text x="475" y="298" text-anchor="middle">Første overskud</text><path d="M470 256V275"/></g><text x="990" y="345" text-anchor="end" class="phase-axis">Virksomhedens udvikling →</text></svg><p>Principskitse — ikke konkrete selskabstal eller en prognose. Faserne er spørgsmål til forretningen, ikke en vurdering af aktiens attraktivitet. Et selskab kan have forretninger i flere faser og bevæge sig tilbage.</p><div class="phase-tabs">${ids.map((id,i)=>`<button type="button" data-stage="${i}" aria-pressed="${i===0}"><img src="faelles/faser/${art[i]}-480x480-aktiv.webp" alt="">${names[i]}</button>`).join('')}</div><div class="phase-copy" aria-live="polite"></div><p><a href="selskaber.html">Find et selskab, og undersøg dets forretning →</a></p>`;
const tabs=host.querySelector('.phase-tabs');host.querySelector('.phase-visual').before(tabs);
function choose(i){const p=PHASE_EXPLANATIONS[ids[i]];host.querySelector('.phase-copy').innerHTML=`<h3>${names[i]}</h3><p>${p.business}</p><h4>Hvad skal du undersøge?</h4><p>${p.watch}</p><details><summary>Hvad kan udfordre forretningen?</summary><p>${p.risk}</p></details>`;host.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.stage===i)));host.querySelectorAll('[data-stage-area]').forEach(b=>b.classList.toggle('active',+b.dataset.stageArea===i))}
host.querySelectorAll('[data-stage]').forEach(b=>{b.onclick=()=>choose(+b.dataset.stage);b.onpointerenter=()=>choose(+b.dataset.stage);b.onfocus=()=>choose(+b.dataset.stage)});host.querySelectorAll('[data-stage-area]').forEach(b=>b.onpointerenter=()=>choose(+b.dataset.stageArea));choose(0);
