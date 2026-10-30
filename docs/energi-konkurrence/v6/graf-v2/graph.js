window.NDI_V6_READY.then(()=>{
window.NDI_NASDAQ=window.DAGENS_TAL.grafV2.inline.nasdaq;
window.NDI_HQ_REVIEW={"checkedAt": "2026-10-01", "definition": "Operationelt hovedsæde, hvor dette kan dokumenteres; ellers selskabets oplyste hovedkontor/principal executive office. Ikke børsland, juridisk registreringsland eller omsætningsfordeling.", "positions": {"KYG3323L1005": {"country": "Thailand", "source": "https://www.linkedin.com/company/fabrinet/", "note": "Selskabets egen profil angiver hovedsæde i Kookot, Pathum Thani, Thailand. Operationelt hovedsæde; selskabets SEC-indberetning angiver en principal-executive-office-adresse hos Walkers på Cayman Islands. Kortet anvender det operationelle hovedsæde, ikke registreringsadressen."}, "BE0974310428": {"country": "Germany", "source": "https://www.linkedin.com/company/x-fab", "note": "Selskabets egen profil angiver hovedsæde i Erfurt, Tyskland. Operationelt hovedsæde; holdingselskabets belgiske adresse i imprint anvendes ikke som operationelt hovedsæde."}, "US2960131058": {"country": "United States", "source": "https://ir.erock.com/", "note": "ERock Inc.s investorside angiver Headquarters: 1113 Vine Street, Suite 101, Houston, Texas, USA."}, "US6420451089": {"country": "United States", "source": "https://www.atlas.energy/who-we-are/", "note": "Atlas Energy Solutions angiver hovedsæde i Austin, Texas, USA."}, "US44916Y1064": {"country": "United States", "source": "https://www.sec.gov/Archives/edgar/data/2078856/000119312526045553/0001193125-26-045553-index-headers.html", "note": "Hyperliquid Strategies Inc.s SEC-indberetning angiver virksomhedens kontoradresse som 477 Madison Avenue, 22nd Floor, New York, NY 10022, USA. Vedrører selskabet, ikke Hyperliquid-protokollens geografiske aktivitet."}, "LU2237380790": {"country": "Poland", "source": "https://www.linkedin.com/company/allegro-pl/", "note": "Allegros egen virksomhedsprofil angiver operationelt hovedsæde i Poznań, Polen. Det børsnoterede holdingselskabs registreringsadresse i Luxembourg er ikke brugt som operationelt hovedsæde."}, "US00776X1090": {"country": "United States", "source": "https://www.aeluma.com/investors/company-information", "note": "Aelumas investorside angiver hovedsæde i Goleta, Californien, USA."}, "US5949604038": {"country": "United States", "source": "https://ir.microvision.com/company-information/faq", "note": "MicroVisions investoroplysninger angiver hovedsæde i Redmond, Washington, USA."}, "US9224171002": {"country": "United States", "source": "https://www.sec.gov/Archives/edgar/data/103145/000110465926019711/veco-20251231x10k.htm", "note": "Veecos årsrapport angiver corporate headquarters i Plainview, New York, USA."}}};
/* Presentation only. Loaded exclusively by /forside-preview. No return calculations. */
(() => {
  const style=document.createElement('style');
  style.textContent=`
  :root{--preview-accent:#89aeb4;--preview-yellow:#f5ee9e}
  main{max-width:1200px!important;padding:24px 20px!important}
  .controls{display:block!important;padding:0!important;border:0!important;background:none!important}
  #class-options{background:#14262e;border:1px solid #36515a;border-radius:14px;padding:20px!important;margin:0!important}
  #class-summary{font-size:21px!important;margin:0 0 12px!important}
  #class-choice .segmented{display:grid!important;grid-template-columns:1fr 1fr;gap:12px!important;background:none!important;padding:0!important}
  #class-choice button{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:5px;padding:15px 18px!important;border:1px solid #54747d!important;border-radius:10px!important;background:#0b151b!important;color:#eef4f5!important;min-height:94px}
  #class-choice button strong{font-size:19px}#class-choice button span{font-size:14px;color:#b9ced2;font-weight:400}
  #class-choice button[aria-pressed=true]{background:#213e47!important;border:2px solid #a3c9ce!important;padding:14px 17px!important}
  #class-choice button[aria-pressed=true] strong:before{content:'✓ ';color:#f5ee9e}
  #class-explanation{padding:12px 0 0!important;margin:0!important;line-height:1.6!important;font-size:14px!important}
  #asof{display:block!important;background:none!important;border:0!important;padding:12px 2px!important;margin:0 0 8px!important;font-size:13px!important;color:#b9ced2!important}
  #growth-controls{display:grid!important;grid-template-columns:minmax(200px,.8fr) minmax(340px,1.2fr);gap:20px!important;margin:20px 0 10px!important}
  #growth-controls .segmented{display:flex!important;flex-wrap:wrap!important;align-content:flex-start;gap:6px!important;background:none!important;padding:0!important}
  #growth-controls .segmented:before{display:block;flex-basis:100%;font-size:12px;font-weight:700;letter-spacing:.07em;color:#aabfc4;margin-bottom:4px}
  #growth-controls .segmented:first-child:before{content:'HVAD VIL DU SE?'}
  #growth-controls .segmented:nth-child(2):before{content:'VÆLG PERIODE'}
  #growth-controls button{padding:10px 13px!important;border:1px solid #3e5962!important;border-radius:7px!important;background:#13252d!important;color:#eef4f5!important;min-height:42px}
  #growth-controls [data-growth-view][aria-pressed=true]{background:#89aeb4!important;color:#08161c!important;border-color:#89aeb4!important}
  #growth-controls [data-growth-period][aria-pressed=true]{background:#f5ee9e!important;color:#08161c!important;border-color:#f5ee9e!important}
  #growth-period-result{grid-column:1/-1;margin:0!important;color:#d6e4e6!important;font-size:14px!important}
  button:focus-visible,summary:focus-visible{outline:3px solid #f5ee9e!important;outline-offset:4px}
  .detail-action{background:#183039!important;border:1px solid #537781!important;border-radius:12px;padding:20px!important;margin:24px 0!important}
  .detail-action p{margin:5px 0!important}#detail-toggle{min-height:46px;background:#89aeb4!important;color:#08161c!important;border:0!important;border-radius:8px;padding:13px 18px!important}
  #important-information{display:block!important;margin-top:26px!important;padding:22px!important;background:#14262e!important;border:1px solid #36515a!important;border-radius:12px!important}#important-information>.information-title{font-size:19px!important;line-height:1.5!important;margin:0!important;color:#eaf1f2!important}#important-information #global-disclaimer{padding:0!important;border:0!important;background:none!important}
  #global-disclaimer{font-size:14px!important;line-height:1.65!important}#global-disclaimer p{margin:0 0 16px!important}#global-disclaimer h3{font-size:15px!important;margin:20px 0 0!important;color:#eaf1f2!important}#global-disclaimer h2{margin-bottom:0!important}#global-disclaimer h2+p,#global-disclaimer h3+p{margin-top:0!important}
  #report-note,#report-download,.report-download,[data-action=report]{display:none!important}
  .preview-tax{display:block;padding-top:8px;border-top:1px solid #3c5960;line-height:1.55!important;font-size:13px!important}
  #tax-note{font-size:12px;color:#b9ced2;line-height:1.55;margin:12px 0 0}#tax-note a{color:#b9d8de}
  .simple-view.advanced-view .tab{display:block!important}.simple-view.advanced-view nav{display:none!important}
  .simple-view.advanced-view #portfolio,.simple-view.advanced-view #highs,.simple-view.advanced-view #risk,.simple-view.advanced-view #method{margin-top:32px;scroll-margin-top:20px}
  #holdings tr:nth-child(n+11){display:none}#holdings.preview-all tr{display:table-row}
  #holdings-more,.holdings-summary [data-go=portfolio]{border:1px solid #89aeb4!important;border-radius:8px!important;padding:12px 18px!important;background:#203b44!important;color:#eff6f7!important;cursor:pointer;font-weight:600}
  .simple-view #concentration{display:grid!important;grid-template-columns:1fr 1fr;gap:18px;align-items:center}
  .simple-view #concentration .metric:nth-child(2){margin:0!important;padding:0!important;border:0!important}
  #spread-visual{display:flex;align-items:center;gap:18px;margin:4px 0 24px}#spread-visual svg{width:112px;height:112px;flex-shrink:0}#spread-visual p{font-size:13px;color:#b9ced2;line-height:1.5;margin:0}
  .simple-view #topmini{display:grid!important}.simple-view #concentration .metric:first-child .label{display:block!important}.simple-view #concentration .metric:first-child .value{font-size:32px!important;letter-spacing:0!important}
  .simple-view .grid:has(>#investment-example){align-items:start!important;grid-template-columns:1fr 1fr!important}.simple-view .grid:has(>#investment-example)>article{height:auto!important;min-height:0!important}
  .simple-view .investment-cagr{background:#213e47;padding:18px;border-radius:10px;gap:16px}.simple-view .investment-cagr strong{font-size:36px}.simple-view .investment-footnote{margin-bottom:0!important}
  .holdings-summary>p{display:none!important}.holdings-summary>button{margin:20px 0 0!important}.holdings-summary #topmini>p{grid-column:1/-1;margin:10px 0 0!important}
  #short-period-warning{display:block;color:#f5ee9e;border-left:2px solid #f5ee9e;padding:6px 10px;margin-top:10px;font-size:13px;line-height:1.5}
  .holdings-actions{display:flex;flex-wrap:wrap;gap:12px;margin:16px 0}.holdings-actions button{border:1px solid #89aeb4;border-radius:8px;padding:12px 18px;background:#203b44;color:#eff6f7;cursor:pointer}
  #nasdaq-control{display:flex;gap:10px;align-items:center;margin:12px 0;cursor:pointer}#nasdaq-control input{width:18px;height:18px;accent-color:#89aeb4}#nasdaq-note{font-size:13px;line-height:1.5;color:#b9ced2;margin:8px 0}
  @media(max-width:760px){.simple-view .grid:has(>#investment-example){grid-template-columns:1fr!important}}@media(max-width:480px){#class-choice .segmented{grid-template-columns:1fr!important}}
  @media(max-width:700px){main{padding:16px 10px!important}#growth-controls{grid-template-columns:1fr;gap:14px!important}#class-options{padding:14px!important}#class-choice .segmented{gap:8px!important}#class-choice button{padding:12px!important}#class-choice button[aria-pressed=true]{padding:11px!important}#class-choice button strong{font-size:16px}#class-choice button span{font-size:12px}.detail-action{display:block!important}#detail-toggle{width:100%;margin-top:12px}}
  `;
  document.head.append(style);
  // A base URL resolves assets; in-page links must stay in this document.
  window.addEventListener('click',event=>{
    const anchor=event.target.closest('a[href^="#"]');
    if(!anchor)return;
    const target=document.getElementById(anchor.getAttribute('href').slice(1));
    if(!target)return;
    event.preventDefault();event.stopImmediatePropagation();
    const details=target.closest('details');if(details)details.open=true;
    scrollToSection(target);
  },true);
  function scrollToSection(target){
    if(!target)return;
    notifyHeight();
    setTimeout(()=>{
      const top=target.getBoundingClientRect().top+window.scrollY;
      parent.postMessage({type:'ndi-preview-scroll',top,height:Math.ceil(document.documentElement.scrollHeight)},'*');
    },120);
  }
  function improve(){
    if(typeof data==='undefined'||!data)return;
    document.querySelectorAll('a[href^="https://"],a[href^="http://"]').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer'});
    const copyChanges={'Dit afkast med udbytte':'Afkast med geninvesteret udbytte','Din investering er fordelt på':'Porteføljen er fordelt på','Få mere indsigt i din investering':'Få mere indsigt i porteføljen'};
    document.querySelectorAll('h1,h2,h3,.detail-action strong').forEach(el=>{if(copyChanges[el.textContent])el.textContent=copyChanges[el.textContent]});
    const explanation=document.querySelector('#growth + p');
    if(explanation&&explanation.textContent.startsWith('Totalafkast viser')){
      explanation.firstChild.textContent='Totalafkast er investeringens samlede afkast, inklusive ændringen i andelenes værdi og eventuelle udlodninger, som forudsættes geninvesteret. Afkastet er efter fondens løbende omkostninger, men før skat og dine egne handelsomkostninger samt tillæg ved køb og salg. Grafen viser afkast i procent fra den valgte periodes start, når der er tilstrækkelig historik. Alle tal er i DKK. ';
    }
    document.querySelectorAll('[data-class]').forEach(b=>{
      const accumulating=b.dataset.class==='1';
      b.innerHTML=accumulating?'<strong>PMINDIAKK – akkumulerende</strong><span>Afkastet bliver i fonden.</span><span class="preview-tax">Relevant til pension, VSO og selskaber, hvis du ønsker afkastet geninvesteret i fonden. Kan også bruges til børneopsparing og frie midler. Ikke til aktiesparekonto.</span>':'<strong>PMINDI – udbyttebetalende</strong><span>Udbytte udbetales til dig.</span><span class="preview-tax">Typisk relevant for private med frie midler eller aktiesparekonto. Kan også bruges til pension, børneopsparing og selskaber. Ikke til VSO.</span>';
    });
    if(!document.getElementById('tax-note')){
      const note=document.createElement('p');note.id='tax-note';
      note.innerHTML='Generel information, ikke en personlig anbefaling eller skatterådgivning. Skattebehandlingen afhænger af din individuelle situation og kan ændres. Valget afhænger også af depotudbyderens muligheder. <a id="fundmarket-product" target="_blank" rel="noopener">Se klassen og dokumenterne hos Fundmarket</a>';
      document.getElementById('class-options')?.append(note);
    }
    const f=data.funds[selected],date=d=>new Date(d+'T12:00:00Z').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'});
    const classInfo=document.getElementById('class-explanation');
    if(classInfo){classInfo.textContent='';classInfo.hidden=true;classInfo.style.display='none'}
    const productLink=document.getElementById('fundmarket-product');
    if(productLink)productLink.href=f.id==='pmindi'?'https://fundmarket.dk/newdeal-invest-kl-n/':'https://fundmarket.dk/newdeal-invest-akk-kl-n/';
    document.getElementById('short-period-warning')?.remove();
    if(f.id!=='pmindi'){const warning=document.createElement('small');warning.id='short-period-warning';warning.textContent='Bemærk: En anden og kortere periode end PMINDI. Afkast siden start kan ikke sammenlignes direkte.';document.querySelector('#headline .metric')?.append(warning)}
    const foot=document.querySelector('.investment-footnote');
    if(foot)foot.textContent='Illustrativ beregning på '+f.short+'s totalafkast i DKK fra historikkens start ('+date(f.inception)+') til '+date(f.data.at(-1).d)+', med geninvesteret udbytte. Uafhængig af den valgte grafperiode. Før skat, egne handelsomkostninger samt tillæg ved køb og salg. Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast.';
    const warning=explanation?.querySelector('strong');if(warning)warning.textContent='Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast.';
    const spread=document.querySelector('.holdings-summary');
    if(spread){
      let visual=document.getElementById('spread-visual');if(!visual){visual=document.createElement('div');visual.id='spread-visual';document.getElementById('concentration').after(visual)}
      const top=f.positions.filter(p=>p.isin&&p.weight>0).sort((a,b)=>b.weight-a.weight).slice(0,10).reduce((s,p)=>s+p.weight,0);
      visual.innerHTML='<svg viewBox="0 0 120 120" role="img" aria-label="De 10 største: '+pct(top)+' af formuen"><circle cx="60" cy="60" r="45" fill="none" stroke="#304950" stroke-width="15"/><circle cx="60" cy="60" r="45" pathLength="100" fill="none" stroke="#89aeb4" stroke-width="15" stroke-dasharray="'+top+' '+(100-top)+'" transform="rotate(-90 60 60)"/><text x="60" y="65" text-anchor="middle" fill="#eef4f5" font-size="18">'+pct(top)+'</text></svg><p><strong>De 10 største positioner</strong><br>Den lyse del er deres andel af fondens formue. Resten er øvrige positioner og konti. Mange positioner fjerner ikke markedsrisikoen.</p>';
    }
    ensureHoldingsButton();
    // Keep the information in the requested reading order, independently of tab selection.
    const portfolio=document.getElementById('portfolio'),highs=document.getElementById('highs'),riskSection=document.getElementById('risk');
    if(highs&&riskSection&&portfolio&&(highs.nextElementSibling!==riskSection||riskSection.nextElementSibling!==portfolio)){portfolio.before(highs,riskSection)}
    const riskMetrics=document.getElementById('riskmetrics');
    if(highs&&riskMetrics){let panel=document.getElementById('preview-risk-summary');if(!panel){panel=document.createElement('section');panel.id='preview-risk-summary';panel.className='tab';panel.innerHTML='<h2>Afkast og risiko i tal</h2><p class="small muted">Historiske nøgletal beregnet på klassens rapportbaserede totalafkast i DKK. Se beregningsmetode og begrænsninger under Data om fonden & metode.</p>';highs.before(panel)}if(riskMetrics.parentElement!==panel)panel.append(riskMetrics)}
    const rollingDetails=document.querySelector('.rolling-details');if(rollingDetails){rollingDetails.hidden=true;rollingDetails.style.display='none'}
    refineHighs();
    const highTable=document.querySelector('#highs-content .high-table');
    if(highTable&&highTable.parentElement.tagName!=='DETAILS'){const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Se aktierne bag fordelingen';highTable.before(details);details.append(summary,highTable)}
    // Capture phase prevents the inherited click listener from replacing our all-position view.
    ensureNasdaq();
    const asof=document.getElementById('asof');
    if(asof){
      const official=typeof navEvidence!=='undefined'&&navEvidence?.asOf===data.asOf?navEvidence.funds?.[f.id]?.latestOfficial:null;
      const verified=official&&official.reportDate===data.asOf&&official.date<=data.asOf;
      asof.innerHTML='<strong>'+(verified?'Seneste officielle kursdato: '+date(official.date):'Officiel kursdato afventer verificering')+'</strong><br><span>'+(f.performanceAsOf?'Grafen følger Fundmarkets officielle dagskurser. Beholdningsrapport: ':'Afkastserien bygger på rapporten fra ')+date(data.asOf)+'. Ikke realtidskurser.</span>';
    }
    document.querySelectorAll('#headline .metric .sub').forEach(el=>{if(!f.performanceAsOf&&el.textContent.includes(data.asOf)&&!el.textContent.includes('rapportdato'))el.textContent+=' · rapportdatoer'});
    const disclosure=document.getElementById('global-disclaimer');
    if(disclosure){
      disclosure.querySelectorAll('p').forEach(p=>{
        const technology='Teknologi- og vækstaktier svinger ofte mere end det brede aktiemarked, både op og ned. Investeringen henvender sig til investorer med høj risikovillighed og lang investeringshorisont.';
        if(p.textContent.startsWith('Teknologi- og vækstaktier')&&p.textContent!==technology)p.textContent=technology;
        let text=p.innerHTML.replace(/Afkastscenarier fremgår af PRIIP-KID\. Scenarierne er ikke en prognose, og den fremtidige markedsudvikling kan ikke forudsiges præcist\./g,'');
        if(p.textContent.startsWith('NewDeal Invest yder')&&!p.querySelector('[data-prospectus]'))text+=' Læs også <a data-prospectus href="https://node-api.fundmarket.dk/funds/documents/prospekt_ipm" target="_blank" rel="noopener noreferrer">prospektet for Investeringsforeningen PortfolioManager</a> inden en endelig investeringsbeslutning.';
        if(p.textContent.startsWith('Grafen viser'))text=text.replace('Fundmarkets rapporter','<a href="https://fundmarket.dk/" target="_blank" rel="noopener">Fundmarkets</a> rapporter').replace('Data kan være forsinket.','Data kan være forsinket med op til et par dage.');
        if(text!==p.innerHTML)p.innerHTML=text;
      });
      const labels=[['Grafen viser','Datagrundlag'],['Afkastet er opgjort','Afkast og omkostninger'],['Efter PRIIP-KID','Risiko og investeringshorisont'],['Teknologi- og vækstaktier','Teknologi- og vækstrisiko'],['NewDeal Invest yder','Din investeringsbeslutning']];
      if(!disclosure.querySelector('[data-approved-kid-reference]')){const p=document.createElement('p');p.dataset.approvedKidReference='2026-10-01';p.textContent='PRIIP-KID indeholder et moderat resultatscenarie med de tilhørende beregningsforudsætninger. Scenariet er ikke en prognose eller en garanti for afkast.';disclosure.append(p)}
      disclosure.querySelectorAll('a[href="https://www.newdealinvest.dk#risikofaktorer"]').forEach(a=>a.href='https://www.newdealinvest.dk/risici');
      for(const [prefix,label] of labels){const p=[...disclosure.querySelectorAll('p')].find(p=>p.textContent.startsWith(prefix));if(p&&p.previousElementSibling?.textContent!==label){const h=document.createElement('h3');h.textContent=label;p.before(h)}}
      if(!disclosure.dataset.previewWatched){disclosure.dataset.previewWatched='true';new MutationObserver(()=>improve()).observe(disclosure,{childList:true,subtree:true})}
    }
    const info=document.getElementById('important-information');
    const documentInfo=typeof fundDocuments!=='undefined'?fundDocuments?.funds?.[f.id]:null;
    if(info&&documentInfo?.sha256===f.priip?.sha256&&documentInfo?.costs){
      let costs=document.getElementById('preview-visible-costs');
      if(!costs){costs=document.createElement('div');costs.id='preview-visible-costs';info.append(costs)}
      const c=documentInfo.costs;
      const html='<h3>Fondens omkostninger</h3><p>Forvaltning og drift: <strong>'+n(c.management,2)+' % årligt</strong>. Transaktionsomkostninger: <strong>'+n(c.transactions,2)+' %</strong> (KID-estimat; kan variere). Ved køb: '+n(c.entry,2)+' %. Ved salg: '+n(c.exit,2)+' %. Fondens løbende omkostninger er allerede indregnet i afkastet og skal ikke trækkes fra igen. Egne handelsomkostninger og skat er ikke medregnet. <a href="'+esc(documentInfo.url)+'" target="_blank" rel="noopener noreferrer">Kilde: PRIIP-KID af '+date(documentInfo.production_date)+'</a>. Se det standardiserede omkostningseksempel under Data om fonden & metode.</p>';
      if(costs.innerHTML!==html)costs.innerHTML=html;
    }else document.getElementById('preview-visible-costs')?.remove();
    const risk=document.getElementById('risk-banner');
    // Keep the live risk node outside the re-rendered disclaimer contents.
    if(risk&&info&&disclosure&&disclosure.nextElementSibling!==risk)disclosure.after(risk);
    if(info?.tagName==='DETAILS'){
      const panel=document.createElement('section');panel.id=info.id;panel.className=info.className;panel.setAttribute('aria-labelledby','important-information-title');
      const title=document.createElement('h2');title.id='important-information-title';title.className='information-title';title.textContent='Vigtig information om afkast, omkostninger og risiko';panel.append(title);
      [...info.childNodes].filter(node=>node.nodeName!=='SUMMARY').forEach(node=>panel.append(node));info.replaceWith(panel);
    }
    document.querySelectorAll('[data-growth-period="ytd"]').forEach(b=>b.textContent='År til dato');
    // Do not gate readiness on animation frames: browsers pause them in offscreen iframes.
    if(typeof notifyHeight==='function')notifyHeight();
    parent.postMessage({type:'ndi-preview-ready'},'*');
  }
  const originalRender=render;render=function(){originalRender();improve()};
  const originalGrowth=drawProductionGrowth;drawProductionGrowth=function(){originalGrowth();improve();drawNasdaq()};
  let allHoldings=false;
  function limitHoldings(){const rows=document.querySelectorAll('#holdings tr');document.getElementById('holdings')?.classList.toggle('preview-all',allHoldings);const button=document.getElementById('holdings-more');if(button){button.hidden=rows.length<=10;button.textContent=allHoldings?'Vis kun de første 10':'Se alle '+rows.length+' positioner';button.setAttribute('aria-expanded',String(allHoldings))}if(typeof notifyHeight==='function')notifyHeight()}
  function ensureHoldingsButton(){const table=document.getElementById('holdings')?.closest('.tablewrap');if(table&&!document.getElementById('holdings-more')){const actions=document.createElement('div');actions.className='holdings-actions';const button=document.createElement('button');button.id='holdings-more';button.setAttribute('aria-controls','holdings');button.onclick=()=>{allHoldings=!allHoldings;limitHoldings()};const download=document.createElement('button');download.id='holdings-excel';download.textContent='Download alle beholdninger (Excel)';download.onclick=()=>downloadHoldings();actions.append(button,download);table.after(actions)}limitHoldings()}
  const originalHoldings=holdings;holdings=function(){originalHoldings();ensureHoldingsButton()};
  const originalTab=showTab;showTab=function(name){originalTab(name);improve()};
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-go="portfolio"],[data-go="risk"],#explore-risk,#detail-toggle');if(!button)return;
    event.preventDefault();event.stopImmediatePropagation();
    const toggle=document.getElementById('detail-toggle');
    if(button.id==='detail-toggle'&&toggle.getAttribute('aria-expanded')==='true'){
      document.documentElement.classList.remove('advanced-view');toggle.setAttribute('aria-expanded','false');toggle.textContent='Vil du vide mere? Se analyser og detaljer →';originalTab('overview');improve();
    }else{
      // showTab loads the map and keeps the original lazy-loading behaviour.
      originalTab('portfolio');document.documentElement.classList.add('advanced-view');toggle.setAttribute('aria-expanded','true');toggle.textContent='Tilbage til det enkle overblik ↑';
      if(button.dataset.go==='portfolio'){allHoldings=true;sectorFilter='';countryFilter='';document.getElementById('search').value='';holdings()}
      improve();
      notifyHeight();
      if(button.dataset.go==='portfolio')scrollToSection(document.getElementById('holdings').closest('article'));
      if(button.dataset.go==='risk'||button.id==='explore-risk')scrollToSection(document.getElementById('preview-risk-summary'));
    }
  },true);
  // Preview-only Nasdaq comparison and client-side Excel export.
// All comparisons are rebased on exactly matching dates; never fill missing FX.
let nasdaqEnabled=false;
function ensureNasdaq(){
 if(!document.getElementById('nasdaq-control')&&document.getElementById('growth-controls')){
  const label=document.createElement('label');label.id='nasdaq-control';
  label.innerHTML='<input type="checkbox" id="nasdaq-toggle"> Sammenlign med Nasdaq-100 (totalafkast i DKK)';
  document.getElementById('growth-controls').after(label);
  const note=document.createElement('p');note.id='nasdaq-note';label.after(note);
  label.querySelector('input').onchange=e=>{nasdaqEnabled=e.target.checked;drawProductionGrowth()};
 }
 const control=document.getElementById('nasdaq-control');if(control){control.hidden=growthView!=='total';control.style.display=growthView==='total'?'flex':'none'}
 const note=document.getElementById('nasdaq-note');if(note)note.hidden=growthView!=='total'||!nasdaqEnabled;
}
function comparisonPoints(fund,period,source){
 let points=fund.data.slice();const end=new Date(points.at(-1).d+'T12:00:00Z');let cutoff=null;
 if(period==='ytd')cutoff=String(end.getUTCFullYear()-1)+'-12-31';
 if(['m1','m3','y1'].includes(period)){const m={m1:1,m3:3,y1:12}[period],b=new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth()-m,1,12));b.setUTCDate(Math.min(end.getUTCDate(),new Date(Date.UTC(b.getUTCFullYear(),b.getUTCMonth()+1,0)).getUTCDate()));cutoff=b.toISOString().slice(0,10)}
 if(cutoff){const base=points.filter(p=>p.d<=cutoff).at(-1);if(!base||Date.parse(cutoff)-Date.parse(base.d)>7*86400000)return[];points=points.filter(p=>p.d>=base.d)}
 else if(fund.inception<points[0].d)points.unshift({d:fund.inception,total:100});
 if(points.length<2)return[];
 const byDate=new Map((source?.rows||[]).map(r=>[r.d,r.v]));
 const a=points[0].total,b=byDate.get(points[0].d);
 // Fund dates and base never depend on benchmark coverage. No carried-forward index.
 return points.map(p=>({d:p.d,fund:100*p.total/a,index:b&&byDate.has(p.d)?100*byDate.get(p.d)/b:null}));
}
function drawNasdaq(){
 if(!nasdaqEnabled||growthView!=='total')return;
 const source=window.NDI_NASDAQ,box=document.getElementById('growth'),note=document.getElementById('nasdaq-note');
 if(!source?.validated){note.textContent='Nasdaq-data er ikke tilgængelige. Fondens graf vises uden sammenligning.';return}
 const points=comparisonPoints(data.funds[selected],growthPeriod,source);
 if(points.length<2){note.textContent='Der mangler fælles observationer til sammenligningen i denne periode.';return}
 const W=900,H=290,L=62,R=20,T=24,B=36,first=Date.parse(points[0].d),last=Date.parse(points.at(-1).d);
 const {low,high,step}=niceScale(points.flatMap(p=>[p.fund,p.index]),false);
 const x=d=>L+(Date.parse(d)-first)/(last-first)*(W-L-R),y=v=>T+(high-v)/(high-low)*(H-T-B);
 let ticks='';for(let v=low;v<=high+step/100;v+=step)ticks+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="#2b3e47"/><text x="${L-9}" y="${y(v)+5}" text-anchor="end" fill="#a4b7bd" font-size="14">${n(v,Number.isInteger(step)?0:1)}</text>`;
 const path=key=>points.map((p,i)=>`${i?'L':'M'}${x(p.d)},${y(p[key])}`).join(' ');
 box.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" tabindex="0" aria-label="${esc(data.funds[selected].short)} og Nasdaq-100 totalafkast i DKK. Begge starter ved 100.">${ticks}<path d="${path('index')}" stroke="#9ca4af" stroke-opacity=".8" stroke-width="1.7" stroke-dasharray="6 4" fill="none"/><path d="${path('fund')}" stroke="#89aeb4" stroke-width="3.3" fill="none"/><line class="growth-cursor" y1="24" y2="254" stroke="#c2dadd" visibility="hidden"/><text x="62" y="282" fill="#a4b7bd" font-size="14">${points[0].d}</text><text x="880" y="282" text-anchor="end" fill="#a4b7bd" font-size="14">${points.at(-1).d}</text></svg><p class="small growth-tooltip" aria-live="polite">Træk hen over grafen, eller brug piletasterne, for at se begge værdier.</p>`;
 const end=points.at(-1),fund=data.funds[selected];
 document.getElementById('growth-period-result').textContent=points[0].d+' – '+end.d+' · '+fund.short+': '+pct(end.fund-100)+' · Nasdaq-100: '+pct(end.index-100);
 note.innerHTML='<strong style="color:#89aeb4">━ '+esc(fund.short)+'</strong> &nbsp; <span style="color:#9ca4af">┄ Nasdaq-100 Total Return</span><br>Samme start- og slutdato og kun fælles observationsdatoer. Begge med geninvesteret udbytte i DKK. Fonden er efter løbende omkostninger; indekset har ingen fondsomkostninger. Nasdaq-100 er en sammenligning, ikke fondens benchmark. Kilder: <a href="https://fred.stlouisfed.org/series/NASDAQXNDX" target="_blank" rel="noopener">Nasdaq via FRED</a> og <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener">USD/DKK via ECB (daglige referencekurser, ikke valutakurser ved USA-børsluk)</a>. Seneste fælles dato: '+end.d+'.'+(end.d<data.asOf?' Sammenligningen slutter før fondens rapportdato, fordi indeks- og valutadata offentliggøres med forsinkelse.':'');
 const svg=box.querySelector('svg'),cursor=box.querySelector('.growth-cursor'),tooltip=box.querySelector('.growth-tooltip');let i=points.length-1;
 function show(j){i=Math.max(0,Math.min(points.length-1,j));const p=points[i];cursor.setAttribute('x1',x(p.d));cursor.setAttribute('x2',x(p.d));cursor.setAttribute('visibility','visible');tooltip.textContent=p.d+' · '+fund.short+': '+n(p.fund,2)+' ('+pct(p.fund-100)+') · Nasdaq-100: '+n(p.index,2)+' ('+pct(p.index-100)+')'}
 function pointer(e){const rect=svg.getBoundingClientRect(),fraction=Math.max(0,Math.min(1,((e.clientX-rect.left)/rect.width*W-L)/(W-L-R))),target=first+fraction*(last-first);let j=0;for(let k=1;k<points.length;k++)if(Math.abs(Date.parse(points[k].d)-target)<Math.abs(Date.parse(points[j].d)-target))j=k;show(j)}
 svg.style.touchAction='none';svg.onpointermove=pointer;svg.onpointerdown=e=>{svg.setPointerCapture(e.pointerId);pointer(e)};svg.onpointerleave=()=>cursor.setAttribute('visibility','hidden');svg.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();show(i+(e.key==='ArrowLeft'?-1:1))}};notifyHeight();
}
// Portable OOXML serializer for the website download. No external CDN or local runtime.
// Strings are inline text (never formulas); numbers stay numeric and missing values blank.
function holdingsWorkbook(fund,asOf,market){
 const escXml=v=>String(v??'').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 const cols=['Selskab / post','ISIN','Type','Sektor','Vægt af formue','Rapportkurs','Rapportvaluta','Markedskurs','Markedsvaluta','Markedsdato','1 dag','1 måned','3 måneder','År til dato','1 år','Under top (op til 52 uger)'];
 const positions=fund.positions.filter(p=>p.isin&&p.weight>0).sort((a,b)=>b.weight-a.weight);
 const rows=[[fund.short+' — alle værdipapirpositioner'],['Rapportdato',asOf],['Kilde: Fundmarkets rapporter via dataregisteret. Markedskurser og kursændringer: Yahoo Finance.'],['Vægte er andele af hele formuen. Kursændringer er i noteringsvaluta uden geninvesteret udbytte.'],['Alle positive værdipapirpositioner medtages uanset søgning/filtre. Konti og øvrige balanceposter er udeladt. Tomme celler betyder manglende data.'],cols];
 const numeric=(v,percent=false)=>typeof v==='number'&&Number.isFinite(v)?(percent?v/100:v):null;
 for(const p of positions){const m=market.find(r=>r.isin&&r.isin===p.isin);rows.push([p.name,p.isin||'',p.isin?'Værdipapir':'Konto / øvrig post',p.sector||'',numeric(p.weight,true),numeric(p.price),p.currency||'',numeric(m?.marketClose),m?.marketCurrency||'',m?.returnDate||'',...['d1','m1','m3','ytd','y1'].map(k=>numeric(m?.priceReturns?.[k],true)),m?.status==='ok'?numeric(m.distance,true):null])}
 const column=i=>String.fromCharCode(65+i);
 const sheetRows=rows.map((row,ri)=>'<row r="'+(ri+1)+'">'+row.map((v,ci)=>{const ref=column(ci)+(ri+1);if(v==null)return'<c r="'+ref+'"/>';const style=ri===0?3:ri===5?1:ri>5&&([4,10,11,12,13,14,15].includes(ci))?2:ri>5&&[5,7].includes(ci)?4:0;return typeof v==='number'?'<c r="'+ref+'" s="'+style+'"><v>'+v+'</v></c>':'<c r="'+ref+'" t="inlineStr" s="'+style+'"><is><t xml:space="preserve">'+escXml(v)+'</t></is></c>'}).join('')+'</row>').join('');
 const files={
 '[Content_Types].xml':'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>',
 '_rels/.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
 'xl/workbook.xml':'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Beholdninger" sheetId="1" r:id="rId1"/></sheets></workbook>',
 'xl/_rels/workbook.xml.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
 'xl/styles.xml':'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FF203B44"/><sz val="18"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF203B44"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="10" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>',
 'xl/worksheets/sheet1.xml':'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="6" topLeftCell="A7" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="1" width="35" customWidth="1"/><col min="2" max="2" width="19" customWidth="1"/><col min="3" max="4" width="25" customWidth="1"/><col min="5" max="16" width="18" customWidth="1"/></cols><sheetData>'+sheetRows+'</sheetData><autoFilter ref="A6:P'+rows.length+'"/><mergeCells count="4"><mergeCell ref="A1:P1"/><mergeCell ref="A3:P3"/><mergeCell ref="A4:P4"/><mergeCell ref="A5:P5"/></mergeCells></worksheet>'
 };
 const encoder=new TextEncoder(),chunks=[],central=[];let offset=0;
 const crc=bytes=>{let c=0xffffffff;for(const b of bytes){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0};
 const header=n=>{const b=new Uint8Array(n);return[b,new DataView(b.buffer)]};
 for(const [name,xml] of Object.entries(files)){const nameBytes=encoder.encode(name),body=encoder.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+xml),checksum=crc(body);let[h,v]=header(30);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint32(14,checksum,true);v.setUint32(18,body.length,true);v.setUint32(22,body.length,true);v.setUint16(26,nameBytes.length,true);chunks.push(h,nameBytes,body);let[c,w]=header(46);w.setUint32(0,0x02014b50,true);w.setUint16(4,20,true);w.setUint16(6,20,true);w.setUint32(16,checksum,true);w.setUint32(20,body.length,true);w.setUint32(24,body.length,true);w.setUint16(28,nameBytes.length,true);w.setUint32(42,offset,true);central.push(c,nameBytes);offset+=h.length+nameBytes.length+body.length}
 const size=central.reduce((n,b)=>n+b.length,0);let[e,v]=header(22);v.setUint32(0,0x06054b50,true);v.setUint16(8,Object.keys(files).length,true);v.setUint16(10,Object.keys(files).length,true);v.setUint32(12,size,true);v.setUint32(16,offset,true);
 return new Blob([...chunks,...central,e],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
}
function downloadHoldings(){const fund=data.funds[selected],market=highData?.funds.find(f=>f.short===fund.short)?.rows||[],blob=holdingsWorkbook(fund,data.asOf,market),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=fund.short+'-beholdninger-'+data.asOf+'.xlsx';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}

  // Preview presentation only. Percent scale uses the existing total-return observations.
function refineHighs(){
 const box=document.getElementById('highs-content');if(!box)return;
 const pack=typeof highData==='undefined'?null:highData?.funds?.find(f=>f.short===data.funds[selected].short);
 if(!pack||highData.asOf!==data.asOf)return;
 const missing=pack.rows.filter(r=>r.status!=='ok').length;
 box.querySelectorAll('.highmetrics .metric').forEach(m=>{if(m.querySelector('.label')?.textContent==='Ikke fordelt')m.remove()});
 box.querySelector('#high-unknown')?.remove();
 const caption=box.querySelector('.hist-scroll + p');
 if(caption&&!caption.querySelector('.preview-high-coverage')){const span=document.createElement('span');span.className='preview-high-coverage';span.textContent=' '+missing+' positioner er ikke fordelt på grund af manglende, utilstrækkelig eller for kort valideret kurshistorik.';caption.append(span)}
}
const beforeHighs=renderHighs;renderHighs=function(...args){beforeHighs(...args);refineHighs()};
const readableStyle=document.createElement('style');readableStyle.textContent=`
html{overflow-anchor:none}#preview-risk-summary{display:none!important;margin-top:32px}.advanced-view #preview-risk-summary{display:block!important}
#highs-content .highmetrics{grid-template-columns:repeat(3,minmax(0,1fr))}
#growth{aspect-ratio:auto!important;min-height:0!important}#growth svg{width:100%;height:auto;display:block;overflow:visible}
.return-legend{display:flex;flex-wrap:wrap;gap:24px;margin:16px 0 10px}.return-legend>div{border-left:3px solid var(--series-color);padding-left:12px;min-width:135px}.return-legend span{display:block;color:#b9ced2;font-size:13px}.return-legend strong{display:block;font-size:27px;line-height:1.35;color:var(--series-color)}
#growth .growth-tooltip{min-height:24px;margin:8px 0;color:#eaf1f2;font-variant-numeric:tabular-nums}#nasdaq-note{border-top:1px solid #30434c;padding-top:12px}
@media(max-width:600px){#highs-content .highmetrics{grid-template-columns:1fr}.return-legend{gap:12px}.return-legend strong{font-size:23px}}
/* Explicit tracks prevent grid-auto-flow:column from making implicit columns. */
#topmini{grid-template-columns:repeat(2,minmax(0,1fr))!important}
#topmini>p{grid-column:1/-1!important;width:auto!important;max-width:none!important}
@media(max-width:600px){
 #topmini{grid-template-columns:minmax(0,1fr)!important;grid-template-rows:none!important;grid-auto-flow:row!important;gap:18px!important}
 #topmini>p{grid-row:auto!important}
 #topmini .retail-position{min-width:0;grid-template-columns:minmax(0,1fr) auto!important}
 #topmini .retail-position>span{white-space:normal!important;overflow:visible!important;text-overflow:clip!important}
 #spread-visual{flex-direction:column;align-items:flex-start}
 .investment-cagr{flex-wrap:wrap}
 .holdings-summary [data-go=portfolio]{width:100%;white-space:normal}
}
`;document.head.append(readableStyle);
drawNasdaq=function(){
 const previousSummary=document.getElementById('nasdaq-compact-summary');if(previousSummary)previousSummary.hidden=true;
 if(growthView!=='total')return;
 const fund=data.funds[selected],box=document.getElementById('growth'),note=document.getElementById('nasdaq-note');
 let compare=nasdaqEnabled&&window.NDI_NASDAQ?.validated;
 const source=window.NDI_NASDAQ;
 const points=comparisonPoints(fund,growthPeriod,source);if(points.length<2)return;
 const indexPoints=points.filter(p=>Number.isFinite(p.index));compare=compare&&indexPoints.length>=2;
 const end=points.at(-1),firstDate=Date.parse(points[0].d),lastDate=Date.parse(end.d);
 const mobile=box.clientWidth<600,W=mobile?Math.max(220,box.clientWidth):1000,H=mobile?Math.round(Math.max(230,Math.min(300,box.clientWidth*.78))):410,L=mobile?8:68,R=mobile?8:92,T=24,B=44;
 // Keep axes, and therefore the fund curve's geometry, identical when toggled.
 const values=points.flatMap(p=>Number.isFinite(p.index)?[p.fund-100,p.index-100]:[p.fund-100]);
 const {low,high,step}=niceScale([...values,0],true),x=d=>L+(Date.parse(d)-firstDate)/(lastDate-firstDate||1)*(W-L-R),y=v=>T+(high-v)/(high-low||1)*(H-T-B);
 const fundColor='#a4d8df',indexColor='#e3bd83',signed=v=>(v>0?'+':'')+n(v,1)+' %';
 const dateLabel=d=>new Date(d+'T12:00:00Z').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'});
 let grid='';for(let v=low;v<=high+step/100;v+=step)grid+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="${Math.abs(v)<1e-8?'#71868d':'#2a3b44'}" stroke-dasharray="${Math.abs(v)<1e-8?'5 5':'0'}"/><text x="${mobile?L+3:L-10}" y="${y(v)+5}" text-anchor="${mobile?'start':'end'}" fill="#b3c6cc" font-size="14" style="paint-order:stroke;stroke:#11252c;stroke-width:4px">${n(v,Number.isInteger(step)?0:1)} %</text>`;
 const count=mobile?3:5;for(let i=0;i<count;i++){const dt=new Date(firstDate+(lastDate-firstDate)*i/(count-1)),xx=L+(W-L-R)*i/(count-1);const label=dt.toLocaleDateString('da-DK',lastDate-firstDate>180*86400000?{month:'short',year:'numeric'}:{day:'numeric',month:'short'});grid+=`<text x="${xx}" y="${H-10}" text-anchor="${i===0?'start':i===count-1?'end':'middle'}" fill="#b3c6cc" font-size="14">${label}</text>`}
 const path=key=>points.filter(p=>Number.isFinite(p[key])).map((p,i)=>`${i?'L':'M'}${x(p.d)},${y(p[key]-100)}`).join(' ');
 const indexEnd=indexPoints.at(-1),indexReturn=indexEnd?indexEnd.index-100:null;
 const commonComparison=compare?'<strong>Samme slutdato — '+dateLabel(indexEnd.d)+': '+esc(fund.short)+' '+signed(indexEnd.fund-100)+' · Nasdaq-100 '+signed(indexReturn)+'.</strong><br>':'';
 let labelY=y(end.fund-100),indexY=indexEnd?y(indexReturn):0;if(compare&&Math.abs(labelY-indexY)<24)indexY=labelY+26;
 const endpoint=(key,color,yy)=>{const p=key==='index'?indexEnd:end;if(mobile)return `<text x="${W-R-4}" y="${Math.max(T+14,Math.min(H-B-8,yy))-7}" text-anchor="end" fill="${color}" font-size="13" font-weight="700" style="paint-order:stroke;stroke:#11252c;stroke-width:4px">${signed(p[key]-100)}</text>`;return `<line x1="${x(p.d)}" x2="${W-R+7}" y1="${y(p[key]-100)}" y2="${yy}" stroke="${color}" stroke-dasharray="${key==='index'?'2 3':'0'}"/><text x="${W-R+10}" y="${yy+5}" fill="${color}" font-size="14" font-weight="700">${signed(p[key]-100)}</text>`};
 box.innerHTML=`<div class="return-legend"><div style="--series-color:${fundColor}"><span>${esc(fund.short)}</span><strong>${signed(end.fund-100)}</strong></div>${compare?`<div style="--series-color:${indexColor}"><span>Nasdaq-100 · pr. ${dateLabel(indexEnd.d)}</span><strong>${signed(indexReturn)}</strong></div>`:''}</div><svg viewBox="0 0 ${W} ${H}" role="img" tabindex="0" aria-label="Totalafkast i procent fra periodens start, ${esc(fund.short)}${compare?' og Nasdaq-100':''}">${grid}${compare?`<path d="${path('index')}" stroke="${indexColor}" stroke-width="2" stroke-dasharray="7 5" fill="none"/>`:''}<path d="${path('fund')}" stroke="${fundColor}" stroke-width="3.2" fill="none"/>${endpoint('fund',fundColor,labelY)}${compare?endpoint('index',indexColor,indexY):''}<line class="growth-cursor" y1="${T}" y2="${H-B}" stroke="#dae9ec" visibility="hidden"/><circle class="fund-dot" r="5" fill="${fundColor}" visibility="hidden"/>${compare?`<circle class="index-dot" r="4" fill="${indexColor}" visibility="hidden"/>`:''}</svg><p class="small growth-tooltip" aria-live="polite">Peg på grafen for at se dato og afkast. På mobil: træk en finger hen over kurven.</p>`;
 document.getElementById('growth-period-result').textContent=dateLabel(points[0].d)+' – '+dateLabel(end.d)+' · Totalafkast i DKK · '+(fund.performanceAsOf?'officielle kursdatoer':'rapportdatoer')+' · 0 % ved periodens start';
 const explanation=box.nextElementSibling;if(explanation?.tagName==='P')explanation.firstChild.textContent='Totalafkast er investeringens samlede afkast, inklusive ændringen i andelenes værdi og eventuelle udlodninger, som forudsættes geninvesteret. Afkastet er efter fondens løbende omkostninger, men før skat, egne handelsomkostninger og tillæg ved køb og salg. Grafen viser afkast i procent fra den valgte periodes start. Alle tal er i DKK. ';
 if(note){if(explanation&&note.previousElementSibling!==explanation)explanation.after(note);note.hidden=!nasdaqEnabled;note.innerHTML=compare?'PMINDIs periode og afkast ændres ikke af sammenligningen. Begge serier starter ved 0 % på samme dato og medregner geninvesteret udbytte i DKK. Fondens observationer følger rapportdatoerne, ikke en fuldt afstemt serie af officielle kursdatoer. Fonden er efter løbende omkostninger; indekset har ingen fondsomkostninger. Nasdaq-100 er en sammenligning, ikke fondens benchmark. <a href="https://fred.stlouisfed.org/series/NASDAQXNDX" target="_blank" rel="noopener">Nasdaq via FRED</a> · <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener">USD/DKK via ECB (daglige referencekurser, ikke valutakurser ved USA-børsluk)</a>. Nasdaq vises til '+dateLabel(indexEnd.d)+'. Manglende observationer udfyldes ikke; der tegnes ikke videre efter sidste tilgængelige indeksdato.':'Nasdaq-data med samme startdato er ikke tilgængelige; fondens afkast og periode vises uændret.'}
 if(note&&compare)note.innerHTML=commonComparison+note.innerHTML.replace('PMINDIs periode',esc(fund.short)+'s periode');
 if(note&&fund.performanceAsOf)note.innerHTML=note.innerHTML.replace('Fondens observationer følger rapportdatoerne, ikke en fuldt afstemt serie af officielle kursdatoer.','Fondens observationer følger Fundmarkets officielle kursdatoer.');
 // Keep full methodology and source links in the always-open information box.
 const information=document.getElementById('important-information');
 if(note&&information){
  let section=document.getElementById('nasdaq-information');
  if(!section){section=document.createElement('section');section.id='nasdaq-information';section.innerHTML='<h3>Sammenligning med Nasdaq-100</h3>';information.append(section)}
  section.append(note);section.hidden=!nasdaqEnabled;note.style.borderTop='0';note.style.paddingTop='0';
  let compact=previousSummary;
  if(!compact){compact=document.createElement('p');compact.id='nasdaq-compact-summary';compact.className='small';}
  if(explanation)explanation.after(compact);
  compact.hidden=!nasdaqEnabled;
  compact.innerHTML=compare?commonComparison.replace('<br>',''):'Nasdaq-data for den valgte periode er ikke tilgængelige. Fondens afkast vises uændret.';
 }
 const svg=box.querySelector('svg'),cursor=box.querySelector('.growth-cursor'),tooltip=box.querySelector('.growth-tooltip');let active=points.length-1;
 function show(i){active=Math.max(0,Math.min(points.length-1,i));const p=points[active],xx=x(p.d);cursor.setAttribute('x1',xx);cursor.setAttribute('x2',xx);cursor.setAttribute('visibility','visible');for(const [cls,key] of [['fund-dot','fund'],['index-dot','index']]){const dot=box.querySelector('.'+cls);if(dot){dot.setAttribute('cx',xx);dot.setAttribute('cy',Number.isFinite(p[key])?y(p[key]-100):0);dot.setAttribute('visibility',Number.isFinite(p[key])?'visible':'hidden')}}tooltip.textContent=dateLabel(p.d)+' · '+fund.short+(fund.performanceAsOf?' (kursdato): ':' (rapportdato): ')+signed(p.fund-100)+(compare?' · Nasdaq-100: '+(Number.isFinite(p.index)?signed(p.index-100):'ingen observation'):'')}
 function pointer(e){const r=svg.getBoundingClientRect(),target=firstDate+Math.max(0,Math.min(1,((e.clientX-r.left)/r.width*W-L)/(W-L-R)))*(lastDate-firstDate);let i=0;for(let j=1;j<points.length;j++)if(Math.abs(Date.parse(points[j].d)-target)<Math.abs(Date.parse(points[i].d)-target))i=j;show(i)}
 svg.style.touchAction='pan-y';svg.onpointermove=pointer;svg.onpointerdown=pointer;svg.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();show(e.key==='Home'?0:e.key==='End'?points.length-1:active+(e.key==='ArrowLeft'?-1:1))}};notifyHeight();
};
// Wix changes iframe width after first render; redraw geometry, never the data.
let graphWidth=0,graphResizeTimer;
const graphResizeObserver=new ResizeObserver(entries=>{
 const width=Math.round(entries[0].contentRect.width);
 if(width<100||width===graphWidth)return;
 graphWidth=width;clearTimeout(graphResizeTimer);
 graphResizeTimer=setTimeout(()=>{if(growthView==='total')drawNasdaq();},80);
});
graphResizeObserver.observe(document.getElementById('growth'));

  // Reviewed ISIN-level HQ evidence supplements each new live holdings snapshot.
// No position weights, fund returns or other pages are changed.
const priorPreviewGeography=renderGeography;
renderGeography=function(){
  const evidence=window.NDI_HQ_REVIEW;
  if(geography&&data&&geography.asOf===data.asOf&&evidence){
    for(const rows of Object.values(geography.funds))for(const row of rows){
      const verified=evidence.positions[row.isin];
      if(verified)Object.assign(row,verified,{status:'profile_found',sourceType:'issuer_primary',checkedAt:evidence.checkedAt});
    }
  }
  priorPreviewGeography();
  if(!geography||!data||geography.asOf!==data.asOf)return;
  const rows=geography.funds[data.funds[selected].id]||[],box=document.getElementById('geography-review');
  // Remove the obsolete warning only when all current holdings are allocated.
  // A future genuinely unmapped company remains visible rather than guessed.
  if(box&&rows.length&&rows.every(r=>r.status==='profile_found'&&r.country)){
    for(const p of box.querySelectorAll('p'))if(p.textContent.startsWith('Ukendt:'))p.textContent='Fordelingen viser selskabernes hovedsæder, ikke hvor deres indtjening kommer fra. Konti indgår ikke i landefordelingen.';
  }
  for(const h of document.querySelectorAll('#method-content h3'))if(h.textContent==='Geografi'){
    h.nextElementSibling.textContent='Landene bygger på selskabsprofiler, suppleret med selskabernes egne kontakt- og investorsider, virksomhedsprofiler samt officielle indberetninger. Operationelt hovedsæde anvendes, hvor det kan dokumenteres; ellers selskabets oplyste hovedkontor eller principal executive office. Det er ikke børsland, handelsvaluta, juridisk registreringsland eller omsætningsfordeling. Særlige forhold og kildehenvisninger findes under kortet. Klassifikationen gælder ved opslag, ikke historisk.';
  }
};
renderGeography();

  improve();
const v2DistanceHistory=window.DAGENS_TAL.grafV2.inline.distance;
const v2Extra=window.DAGENS_TAL.grafV2.inline.extra;
// V2 only. Appended to the isolated wrapper; never loaded by production.
const v2Style=document.createElement('style');v2Style.textContent=`
.v2-badge{padding:10px 16px;border:1px solid #587980;border-radius:8px;color:#d8e9ed;margin:0 0 18px;font-size:13px}
#headline{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:16px!important;align-items:stretch}
#headline .v2-cagr{border:1px solid #83b8bd!important;background:linear-gradient(120deg,#264951,#163039);border-radius:12px;padding:18px!important}
#headline .v2-cagr .value{color:#c7f0ed;font-size:38px}.v2-cagr .label{color:#e2f2f1}
#nasdaq-control{display:none!important}#nasdaq-compact-summary{display:none!important}
#v2-compare{color:#c1d4d8;line-height:1.6;font-size:14px;margin:12px 0}
#v2-calendar{margin:24px 0!important;display:block!important}#v2-calendar h2{margin:0 0 8px}
#v2-calendar .tablewrap{overflow:auto}#v2-calendar th,#v2-calendar td{min-width:54px;text-align:center;padding:11px 7px}#v2-calendar th:first-child{position:sticky;left:0;background:#152930;z-index:1}
.detail-action{border:2px solid #91c4c8!important;box-shadow:0 8px 28px #0003;background:linear-gradient(120deg,#254952,#122831)!important}
.detail-action strong{font-size:24px!important}#detail-toggle{font-size:18px!important;padding:17px 24px!important}
.hist-value small{display:block!important;font-size:16px!important;font-weight:750;color:#f5ee9e!important;margin-top:6px}
#hq-map path[role=button]{pointer-events:all!important;stroke:#516970;stroke-width:.6}#hq-map path[role=button]:hover,#hq-map path[role=button]:focus{fill:#f5ee9e!important;stroke:white;stroke-width:1.6;outline:none}
#v2-filterbar{display:flex;align-items:center;flex-wrap:wrap;gap:14px;background:#23454e;border:1px solid #96c9cd;border-radius:9px;padding:14px;margin:16px 0}
#v2-filterbar button,#clearfilter{background:#d9eeee!important;color:#0b2027!important;border:0!important;padding:12px 18px!important;border-radius:8px;font-weight:750;min-height:44px;cursor:pointer}
.v2-recovery-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:18px 0}.v2-recovery-grid>div{background:#152a32;border:1px solid #38565f;border-radius:10px;padding:18px}.v2-recovery-grid strong{font-size:26px;display:block;color:#c5e7e5}
.v2-source-link{color:#b4dde1;text-decoration:underline;text-underline-offset:4px}.v2-source-link:hover{color:#f5ee9e}
.v2-buy{border-top:1px solid #48636b;margin-top:14px;padding-top:12px!important;line-height:1.6!important;color:#d9eeee!important}.v2-buy b{font-family:ui-monospace,monospace;font-size:15px;letter-spacing:.04em}
#v2-history{border-top:1px solid #38565f;margin-top:28px;padding-top:26px}#v2-history svg{display:block;width:100%;height:auto;min-height:240px}#v2-history input{width:100%;accent-color:#98d5cf;min-height:32px}#v2-history-readout{padding:14px;background:#19343d;border-radius:8px;line-height:1.7;font-variant-numeric:tabular-nums}#v2-history .v2-legend{display:flex;gap:20px;flex-wrap:wrap}
.v2-high-note{border-left:3px solid #90bec4;padding-left:12px}.v2-high-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:24px}
@media(max-width:700px){#headline{grid-template-columns:1fr 1fr!important}#headline .value{font-size:28px!important}.v2-recovery-grid,.v2-high-metrics{grid-template-columns:1fr}#v2-calendar th,#v2-calendar td{min-width:48px}.detail-action strong{font-size:21px!important}}
`;document.head.append(v2Style);
nasdaqEnabled=true;
const v2OriginalEnsure=ensureNasdaq;
ensureNasdaq=function(){nasdaqEnabled=true;v2OriginalEnsure();const c=document.getElementById('nasdaq-toggle');if(c){c.checked=true;c.disabled=true}};
const v2OriginalDraw=drawNasdaq;
drawNasdaq=function(){if(typeof data==='undefined'||!data)return;nasdaqEnabled=true;v2OriginalDraw();v2Summary()};
function v2Summary(){
 if(!data)return;const fund=data.funds[selected],m=insights?.funds?.[fund.id];
 const head=document.getElementById('headline');if(head){const total=head.children[0]?.querySelector('.value');if(total&&fund.data.length)total.textContent=pct(Math.round((fund.data.at(-1).total/fund.data[0].total-1)*100*1e10)/1e10);head.querySelector('.v2-cagr')?.remove();const card=document.createElement('div');card.className='metric v2-cagr';card.innerHTML='<div class="label">Gennemsnitligt årligt afkast</div><div class="value">'+(Number.isFinite(m?.cagr)?pct(m.cagr):'Under 1 år')+'</div><div class="sub">CAGR · siden start'+(Number.isFinite(m?.cagr)?' · efter løbende omkostninger':' · vises efter ét års historik')+'</div>';head.children[0]?.after(card)}
 let info=document.getElementById('v2-compare');if(!info){info=document.createElement('p');info.id='v2-compare';document.getElementById('growth-controls')?.after(info)}
 info.textContent=growthView==='total'?'Fonden har ikke et benchmark. Nasdaq-100 vises som en relevant sammenligning med store, ikke-finansielle Nasdaq-selskaber, men har en anden sammensætning og risiko. Begge afkast er i DKK med geninvesteret udbytte.':'Kursvisningen viser andelens værdi uden geninvestering af udbytte. Nasdaq-sammenligningen findes under Totalafkast.';
 document.querySelectorAll('#investment-example p').forEach(p=>{if(p.textContent.includes('geninvesteret udbytte')&&!p.textContent.includes('geninvesteret udbytte (før skat)'))p.textContent=p.textContent.replace('geninvesteret udbytte','geninvesteret udbytte (før skat)')});
 const foot=document.querySelector('.investment-footnote');if(foot&&!foot.textContent.includes('geninvesteret udbytte (før skat)'))foot.textContent=foot.textContent.replace('geninvesteret udbytte','geninvesteret udbytte (før skat)');
}
function v2Recoveries(){
 const el=document.getElementById('drawdown'),fund=data.funds[selected];if(!el)return;
 const article=el.closest('article'),h=article.querySelector('h2');if(h)h.textContent='Nedture, genvinding og nye toppe';
 let intro=document.getElementById('v2-dd-intro');if(!intro){intro=document.createElement('p');intro.id='v2-dd-intro';el.before(intro)}
 intro.innerHTML='<strong>0 % er toppen — ikke et afkast på nul.</strong> Kurven viser, hvor langt investeringen er under sin hidtil højeste værdi med geninvesteret udbytte. Når den vender tilbage til 0 %, er den tidligere top genvundet; fortsatte stigninger sætter nye toppe.';
 const points=fund.data;let peak=points[0],low=null,episodes=[];
 for(const p of points){if(p.total>=peak.total){if(low)episodes.push({peak,low,end:p,recovered:true});peak=p;low=null}else if(!low||p.total<low.total)low=p}
 if(low)episodes.push({peak,low,end:points.at(-1),recovered:false});
 const worst=episodes.slice().sort((a,b)=>a.low.total/a.peak.total-b.low.total/b.peak.total).slice(0,5);
 let box=document.getElementById('v2-recoveries');if(!box){box=document.createElement('section');box.id='v2-recoveries';article.append(box)}
 box.innerHTML='<h3>Hvad skete der efter de dybeste fald?</h3><p>Fald og efterfølgende stigning bruger forskellige udgangspunkter. Et fald på 50 % kræver en stigning på 100 % for at genvinde toppen. Nedenfor ses de fem dybeste observerede forløb — ikke et udvalg af de bedste opture.</p><div class="v2-recovery-grid">'+worst.map(e=>'<div><span>Bund: '+esc(e.low.d)+'</span><strong style="color:#e6aaa2">'+pct((e.low.total/e.peak.total-1)*100)+' fra toppen</strong><strong>+'+n((e.end.total/e.low.total-1)*100,1)+' % fra bunden</strong><p>'+ (e.recovered?'Tidligere top genvundet '+esc(e.end.d):'Til seneste kursdato '+esc(e.end.d)+' · tidligere top endnu ikke genvundet')+'</p></div>').join('')+'</div><p class="small muted">Historisk totalafkast efter løbende omkostninger, før skat. Bunden identificeres efterfølgende og var ikke kendt på tidspunktet. Forløbene er ikke en handelsstrategi eller en forventning til senere afkast.</p>';
}
const v2OriginalGeo=renderGeography;
renderGeography=function(){v2OriginalGeo();v2Map()};
function v2Map(){
 const box=document.getElementById('geography-review');if(!box)return;
 box.querySelectorAll('p').forEach(p=>{if(/positioner kortlagt/.test(p.textContent))p.remove()});
 function pick(country){countryFilter=country;sectorFilter='';document.getElementById('search').value='';holdings();allHoldings=true;limitHoldings();v2Filter();scrollToSection(document.getElementById('holdings').closest('article'))}
 box.querySelectorAll('[data-hq]').forEach(b=>b.onclick=()=>pick(b.dataset.hq));
 box.querySelectorAll('#hq-map path[role=button]').forEach(p=>{const country=p.querySelector('title')?.textContent.split(':')[0];const c=country==='United States of America'?'United States':country;p.onclick=()=>pick(c);p.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(c)}}});
}
function v2Filter(){
 const box=document.getElementById('activefilter');if(!box)return;document.querySelectorAll('#v2-filterbar').forEach(e=>e.remove());
 if(!countryFilter&&!sectorFilter)return;const bar=document.createElement('div');bar.id='v2-filterbar';bar.innerHTML='<strong>Viser: '+esc([countryFilter?countryLabel(countryFilter):'',sectorFilter?sectorNames[sectorFilter]||sectorFilter:''].filter(Boolean).join(' · '))+'</strong><button type="button">Nulstil — vis alle positioner</button>';box.before(bar);bar.querySelector('button').onclick=()=>{countryFilter='';sectorFilter='';document.getElementById('search').value='';holdings()};
}
const v2OriginalHoldings=holdings;
holdings=function(){v2OriginalHoldings();v2Filter();const f=data.funds[selected];document.querySelectorAll('#holdings tr').forEach(row=>{const cell=row.cells[0],isin=cell?.querySelector('small')?.textContent,p=f.positions.find(p=>p.isin===isin),r=p&&marketRow(p);if(p?.symbol&&r&&!['no_mapping','listing_currency_mismatch','not_equity'].includes(r.status)){const small=cell.querySelector('small');cell.innerHTML='<a class="v2-source-link" target="_blank" rel="noopener noreferrer" href="https://finance.yahoo.com/quote/'+encodeURIComponent(p.symbol)+'/" title="Åbn '+esc(p.name)+' hos Yahoo Finance i en ny fane">'+esc(p.name)+' ↗</a>';if(small)cell.append(small)}row.querySelectorAll('td').forEach(td=>{if(td.textContent.trim()==='—'){td.textContent='';td.setAttribute('aria-label','Ingen valideret observation')}})});};
function v2Layout(){
 if(!data)return;v2Summary();
 document.querySelectorAll('#method-content h3').forEach(h=>{if(h.textContent==='52-ugers top'&&h.nextElementSibling){const p=h.nextElementSibling,t='Afstand = (1 − seneste lukkekurs / højeste observerede intradagkurs) × 100. Der bruges op til 364 kalenderdage på samme verificerede notering og i samme valuta. Kortere historik bruger sin tilgængelige periode; Microvision måles efter aktiesplittet 3. august 2026. Supplerende v2-kurser bruges kun på deres kontrollerede rapportdato. Uden verificerede kurser beregnes ingen afstand. Bånd er [0,10), [10,20), … [90,100]. Vægtene er andele af hele formuen. Den historiske figur bruger derimod justerede lukketoppe og datidens beholdninger; se dens særskilte metode.';if(p.textContent!==t)p.textContent=t}});
 document.querySelectorAll('[data-class]').forEach(b=>{const f=data.funds[Number(b.dataset.class)];if(!f||b.querySelector('.v2-buy'))return;const line=document.createElement('span');line.className='v2-buy';line.innerHTML='Find i din bank eller handelsplatform:<br><b>'+esc(f.isin)+'</b> · '+esc(f.short)+'<br>Søg på ISIN, og vælg det relevante depot.';b.append(line)});
 const main=document.querySelector('main');if(main&&!document.querySelector('.v2-badge')){const badge=document.createElement('p');badge.className='v2-badge';badge.textContent='Graf v. 2 · separat testversion · den nuværende hjemmeside er uændret';main.prepend(badge)}
 const cal=document.getElementById('calendar')?.closest('article'),growth=document.getElementById('growth')?.closest('article');if(cal&&growth){cal.id='v2-calendar';if(growth.nextElementSibling!==cal)growth.after(cal)}
 const riskSummary=document.getElementById('preview-risk-summary');if(cal&&riskSummary){cal.querySelectorAll('p').forEach(p=>{if(p.id==='risk-period'||p.textContent.startsWith('Risikotallene dækker'))riskSummary.append(p)})}
 document.querySelectorAll('.preview-high-coverage').forEach(e=>e.remove());
 const sector=document.getElementById('sector')?.closest('article');if(sector){sector.querySelector('h2').textContent='Sektorer · leverandørens klassifikation';if(!document.getElementById('v2-sector-note')){const p=document.createElement('p');p.id='v2-sector-note';p.textContent='Vi forstår teknologi bredere end en enkelt sektor: Teknologi kan være central for selskaber, der klassificeres inden for eksempelvis kommunikation, forbrug eller industri. Denne fordeling bygger på Yahoo Finances sektorinddeling, ikke en verificeret GICS-klassifikation.';sector.querySelector('h2').after(p)}}
 v2Recoveries();v2Map();v2Filter();notifyHeight();
}
const v2OriginalImprove=improve;improve=function(){v2OriginalImprove();v2Layout()};
// Derive a v2-only distribution; never mutate the authoritative release.
renderHighs=function(f,source){
 const box=document.getElementById('highs-content'),pack=source?.funds?.find(p=>p.short===f.short);if(!box||!pack)return;
 const known=pack.rows.map(r=>{const extra=typeof v2Extra!=='undefined'&&v2Extra.asOf===data.asOf?v2Extra.positions[r.isin]:null;return r.status==='ok'?{...r,basis:'52_weeks'}:extra?{...r,...extra}:null}).filter(Boolean);
 const distances=known.map(r=>r.distance).sort((a,b)=>a-b),sum=known.reduce((s,r)=>s+r.weight,0),mean=distances.reduce((s,v)=>s+v,0)/distances.length,mid=Math.floor(distances.length/2),median=distances.length%2?distances[mid]:(distances[mid-1]+distances[mid])/2;
 const bins=Array.from({length:10},(_,i)=>known.filter(r=>Math.min(9,Math.floor(r.distance/10))===i)),max=Math.max(1,...bins.map(b=>b.length));
 const table=(rows)=>'<div class="tablewrap"><table><thead><tr><th>Aktie</th><th>Vægt</th><th>Afstand</th><th>Måleperiode</th></tr></thead><tbody>'+rows.map(r=>'<tr><td>'+esc(r.name)+'</td><td>'+pct(r.weight)+'</td><td>'+pct(r.distance)+'</td><td>'+esc(r.start||'52 uger')+' – '+esc(r.date)+'</td></tr>').join('')+'</tbody></table></div>';
 box.innerHTML='<div class="v2-high-metrics">'+metric('Middelafstand · ligevægtet',Number.isFinite(mean)?pct(mean):'—','Hver målt position tæller lige meget')+metric('Medianafstand',Number.isFinite(median)?pct(median):'—','Halvdelen ligger nærmere toppen')+metric('Vægtet afstand',sum?pct(known.reduce((s,r)=>s+r.distance*r.weight,0)/sum):'—','Vægtet inden for de målte positioner')+'</div><div class="hist-scroll"><div class="histogram">'+bins.map((rows,i)=>'<button class="hist-col" data-v2-bin="'+i+'" aria-label="'+i*10+' til '+(i+1)*10+' procent fra toppen"><span class="hist-value"><strong>'+rows.length+'</strong><small>'+pct(rows.reduce((s,r)=>s+r.weight,0))+'</small></span><span class="hist-track"><span class="hist-bar" style="height:'+rows.length/max*100+'%;background:'+['#8fcac8','#97c7bc','#a4c6af','#b6c5a6','#c6c7a1','#d4c79c','#dfc294','#e3b18e','#db9c89','#d48785'][i]+'"></span></span><span class="hist-label">'+i*10+'–'+(i+1)*10+' %</span></button>').join('')+'</div></div><p class="small">Antal positioner øverst · <strong style="color:#f5ee9e">andel af hele formuen nedenunder</strong>. Klik på en søjle for at se positionerne.</p><p class="small v2-high-note">Afstand til højeste observerede kurs inden for 52 uger. Ved kortere noteringshistorik bruges den observerede top i den tilgængelige periode. Målt på '+known.length+' af '+pack.rows.length+' positioner ('+pct(sum)+' af formuen). Positioner uden en valideret prisserie er ikke tildelt en kunstig top.</p><div id="v2-bin-positions"></div>';
 box.querySelectorAll('[data-v2-bin]').forEach(b=>b.onclick=()=>{box.querySelectorAll('[data-v2-bin]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.getElementById('v2-bin-positions').innerHTML=table(bins[Number(b.dataset.v2Bin)]);notifyHeight()});
 const coverageNote=box.querySelector('.v2-high-note');if(known.length===pack.rows.length)coverageNote.textContent='Alle '+known.length+' værdipapirpositioner er fordelt. Afstand til højeste observerede kurs inden for op til 52 uger; kortere historik bruger den tilgængelige periode. Microvision måles fra 3. august 2026 efter aktiesplit. Vægtene er andele af hele fondens formue, ikke normaliseret til 100 %; kontanter og øvrige poster er ikke aktier.';
 const h=box.closest('section')?.querySelector('h2');if(h)h.textContent='Afstand til toppen · op til 52 uger';
 v2History(f,box);
};
const v2MappedHoldings=holdings;
holdings=function(){v2MappedHoldings();if(typeof v2Extra==='undefined'||v2Extra.asOf!==data.asOf)return;document.querySelectorAll('#holdings tr').forEach(row=>{const cell=row.cells[0],small=cell?.querySelector('small'),isin=small?.textContent,extra=v2Extra.positions[isin];if(!extra?.symbol)return;const p=data.funds[selected].positions.find(p=>p.isin===isin);if(!p)return;cell.innerHTML='<a class="v2-source-link" target="_blank" rel="noopener noreferrer" href="https://finance.yahoo.com/quote/'+encodeURIComponent(extra.symbol)+'/">'+esc(p.name)+' ↗</a>';cell.append(small)})};
function v2History(f,box){
 const points=typeof v2DistanceHistory!=='undefined'?v2DistanceHistory.funds[f.id]:null;if(!points?.length)return;
 const el=document.createElement('section');el.id='v2-history';box.append(el);
 const W=1000,left=64,right=20,width=W-left-right,t0=Date.parse(points[0].d),t1=Date.parse(points.at(-1).d),x=p=>left+(Date.parse(p.d)-t0)/(t1-t0||1)*width;
 const prices=points.map(p=>100*p.price/points[0].price),low=Math.floor(Math.min(...prices)/20)*20,high=Math.ceil(Math.max(...prices)/20)*20;
 const yDistance=v=>54+v/100*175,yPrice=v=>300+170*(high-v)/(high-low||1);
 const line=(key,y)=>points.map((p,i)=>(i?'L':'M')+x(p).toFixed(1)+','+y(key==='price'?prices[i]:p[key]).toFixed(1)).join(' ');
 let grid='';for(const v of [0,25,50,75,100]){const y=yDistance(v);grid+='<path d="M64 '+y+'H980" stroke="#2c4851"/><text x="54" y="'+(y+5)+'" text-anchor="end">'+v+' %</text>'}for(let v=low;v<=high;v+=20){const y=yPrice(v);grid+='<path d="M64 '+y+'H980" stroke="#2c4851"/><text x="54" y="'+(y+5)+'" text-anchor="end">'+v+'</text>'}
 el.innerHTML='<h3>Afstanden til toppen gennem tiden</h3><p>Var det få aktier eller en bred bevægelse? Middel og median giver to vinkler på de aktier, fonden ejede på tidspunktet. Øverst betyder en bevægelse opad, at aktierne nærmer sig deres tidligere top. Fondens kurs vises nedenunder på samme tidsakse.</p><div class="v2-legend"><strong style="color:#a3ddd4">━ Middel · ligevægtet</strong><strong style="color:#edd795">┄ Median</strong><strong style="color:#cad4f4">━ '+esc(f.short)+' · kurs</strong></div><svg viewBox="0 0 1000 510" role="img" aria-label="Historisk middel- og medianafstand til justeret lukketop, med fondens kurs på fælles tidsakse" style="color:#bcd0d6;font-size:14px;fill:currentColor">'+grid+'<text x="64" y="28">Afstand til tidligere top · 0 % øverst</text><text x="64" y="278">Fondens kurs · indeks 100 ved analysens start · uden geninvesteret udbytte</text><path d="'+line('mean',yDistance)+'" fill="none" stroke="#a3ddd4" stroke-width="2.5"/><path d="'+line('median',yDistance)+'" fill="none" stroke="#edd795" stroke-width="2.5" stroke-dasharray="7 5"/><path d="'+line('price',yPrice)+'" fill="none" stroke="#cad4f4" stroke-width="2.5"/><path id="v2-history-crosshair" stroke="#ffffff88" stroke-dasharray="4 4"/><text x="64" y="504">'+points[0].d+'</text><text x="980" y="504" text-anchor="end">'+points.at(-1).d+'</text></svg><label for="v2-history-date">Undersøg en dato</label><input id="v2-history-date" type="range" min="0" max="'+(points.length-1)+'" value="'+(points.length-1)+'"><div id="v2-history-readout" aria-live="polite"></div><details><summary>Datagrundlag og forskel fra søjlerne ovenfor</summary><p>Historisk testanalyse til '+points.at(-1).d+'. Beregnet ud fra datidens Fundmarket-beholdninger og op til 52 ugers daglige Yahoo-lukkekurser, justeret for aktiesplit og udbytte. Søjlerne ovenfor bruger derimod dagens afstand til højeste intradagkurs. De to mål er derfor ikke identiske. Kortere historik bruger den tilgængelige periode. Målingen omfatter kun positioner med verificeret valuta og tilgængelig prisserie; dækningen vises for den valgte dato. Fondskursen kan falde ved udlodning, uden at det er et tilsvarende tab i totalafkast.</p><p>Historiske beholdninger er fra rapporten dagen efter måledatoen; seneste tilgængelige kurser til og med måledatoen bruges. Analysen er ikke en købs- eller salgsvurdering. Denne historiske testserie opdateres ikke af det nuværende produktionsjob.</p></details>';
 const show=i=>{const p=points[i];el.querySelector('#v2-history-crosshair').setAttribute('d','M'+x(p)+' 48V475');el.querySelector('#v2-history-readout').innerHTML='<strong>'+esc(p.d)+'</strong> · Middel '+pct(p.mean)+' · Median '+pct(p.median)+' · Kursindeks '+n(prices[i],1)+'<br><span class="small">Datadækning: '+p.count+' af '+p.total+' daværende positioner · '+pct(p.weight)+' af formuen. Beholdningsrapport '+p.reportDate+'.</span>'};
 el.querySelector('h3+p').textContent='Var det få aktier eller en bred bevægelse? Middel og median giver to vinkler på beholdningerne i de historiske rapporter. Øverst betyder en bevægelse opad, at aktierne nærmer sig deres tidligere top. Fondens kurs vises nedenunder på samme tidsakse.';
 el.querySelector('details p:last-child').textContent='Beholdningerne kommer fra den historiske rapport, hvis dato vises ved målingen. Aktiekurserne er de seneste tilgængelige før rapportdatoen (højst fire kalenderdage før dagen forud). Måledatoen er den nyeste af disse kursdatoer; andre markeder kan have en tidligere lukkedag. Analysen er ikke en købs- eller salgsvurdering. Denne historiske testserie opdateres ikke af det nuværende produktionsjob.';
 const plot=document.createElement('div');plot.style.overflowX='auto';plot.setAttribute('aria-label','Historisk graf — kan rulles vandret på mobil');const svg=el.querySelector('svg');svg.before(plot);plot.append(svg);svg.style.minWidth='700px';
 el.querySelector('input').oninput=e=>show(Number(e.target.value));show(points.length-1);
 el.querySelector('svg').onpointermove=e=>{const rect=e.currentTarget.getBoundingClientRect(),target=t0+Math.max(0,Math.min(1,((e.clientX-rect.left)/rect.width*W-left)/width))*(t1-t0);let best=0;for(let i=1;i<points.length;i++)if(Math.abs(Date.parse(points[i].d)-target)<Math.abs(Date.parse(points[best].d)-target))best=i;el.querySelector('input').value=best;show(best)};
}
// No synthetic PEG: projected earnings inputs would conflict with the requested scope.
if(typeof data!=='undefined'&&data){improve();drawProductionGrowth();holdings();renderHighs(data.funds[selected],highData)}

// Isolated v2, feedback round 2. Presentation only; authoritative fund data unchanged.
const r2Style=document.createElement('style');r2Style.textContent=`
#headline{gap:0!important;border-block:1px solid #38525b;padding:20px 0;margin-block:20px 8px!important}
#headline>.metric,#headline .v2-cagr{background:none!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:4px 20px!important;cursor:default}
#headline>.metric+.metric{border-left:1px solid #38525b!important}#headline .v2-cagr .value{color:#f3dc9c;font-size:36px}
#r2-history-warning{font-size:13px;color:#c3d3d6;margin:6px 0 20px;line-height:1.5}
[data-class]{border-radius:8px!important;padding:16px 18px!important;text-align:left}
[data-class] .v2-buy{display:block!important;font-size:12px!important;line-height:1.5!important;margin-top:8px;padding-top:8px!important}
[data-class] .v2-buy b{font-size:13px;letter-spacing:0}
[data-class]>span{font-size:13px;line-height:1.5}
#growth-controls{display:flex!important;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px!important;margin:12px 0!important}
#growth-controls>div{margin:0!important;gap:5px!important}#growth-controls button{min-height:38px;padding:8px 12px!important;font-size:13px}
#growth-controls>div>span:first-child{display:none!important}#growth-period-result{font-size:12px!important;margin:6px 0!important}
#growth> .return-legend{margin:8px 0!important}#growth svg{max-height:400px}
#v2-compare{font-size:13px;line-height:1.5;margin:8px 0;color:#bdcfd3}
#v2-calendar{padding:20px!important}#v2-calendar h2{font-size:20px}#v2-calendar th,#v2-calendar td{padding:7px 6px!important;font-size:13px}
#v2-calendar .yearbars{max-height:140px}#v2-calendar p{font-size:12px;line-height:1.5;margin:6px 0}
#v2-calendar .audit-addition{padding:8px 0;margin:8px 0;border:0}#v2-calendar .audit-addition h3{font-size:14px;margin:8px 0}#v2-calendar .audit-addition tbody{display:flex;gap:22px;flex-wrap:wrap}#v2-calendar .audit-addition tr{display:flex;gap:8px}#v2-calendar .audit-addition thead{display:none}#v2-calendar .audit-addition td:last-child{display:none}#v2-calendar .audit-addition td,#v2-calendar .audit-addition th{border:0;padding:2px!important}#v2-calendar .audit-addition table{min-width:0}
.r2-method{display:inline-block;color:#bddfe2;border:1px solid #62868d;border-radius:6px;padding:7px 11px;margin:6px 0;text-decoration:none;font-size:13px}
#preview-risk-summary>p{font-size:13px;line-height:1.5;margin:6px 0;color:#b9cdd2}
#r2-freshness{padding:14px 18px;background:#4b2d27;border:1px solid #d6a087;border-radius:8px;color:#ffe1c7;font-size:13px;line-height:1.6;margin:14px 0}
#v2-history svg{min-height:0!important;min-width:0!important;aspect-ratio:auto}
#v2-history-readout{display:flex;gap:22px;flex-wrap:wrap;background:none!important;padding:8px 0!important;min-height:30px}
.r2-recovery{width:100%;border-collapse:collapse}.r2-recovery td,.r2-recovery th{padding:10px;text-align:left;border-bottom:1px solid #34515b;font-size:13px}
.r2-recovery .bars{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:12px;min-width:220px}.r2-recovery i{display:block;height:8px;margin-top:5px;border-radius:2px;background:#d49b91}.r2-recovery i.up{background:#9dd5c9}
@media(max-width:700px){#headline{row-gap:18px!important}#headline>.metric:nth-child(3){border-left:0!important}#headline .value{font-size:27px!important}#growth-controls{align-items:flex-start}#growth-controls button{padding:8px!important}.r2-recovery .bars{min-width:160px}.r2-recovery td{padding:8px 4px}#v2-history-readout{gap:8px;font-size:13px}}
@media(max-width:700px){table.r2-recovery{min-width:0!important}.r2-recovery thead{display:none}.r2-recovery tbody{display:block}.r2-recovery tr{display:grid;grid-template-columns:1fr 1fr;padding:10px 0;border-bottom:1px solid #34515b}.r2-recovery td{border:0;font-size:12px}.r2-recovery td:nth-child(2){grid-column:1/-1;grid-row:2}.r2-recovery td:nth-child(3){grid-column:2;grid-row:1;text-align:right}.r2-recovery .bars{min-width:0}}
`;document.head.append(r2Style);

function r2Freshness(){
 const today=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Copenhagen'}));
 const awaitingDaily=today.getDay()>0&&today.getDay()<6&&(today.getHours()<11||(today.getHours()===11&&today.getMinutes()<30));
 today.setDate(today.getDate()-1);while(today.getDay()===0||today.getDay()===6)today.setDate(today.getDate()-1);
 const expected=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
 const f=data.funds[selected],problems=[],observationDates=[];
 const check=(label,date)=>{observationDates.push(date);if(!date||date<expected)problems.push(label+': '+(date||'dato mangler'))};
 check('Fondens kurs',f.performanceAsOf||f.data.at(-1)?.d);check('Nasdaq',window.NDI_NASDAQ?.asOf);
 const hp=typeof v2DistanceHistory!=='undefined'?v2DistanceHistory.funds?.[f.id]:null;
 if(hp?.length)check('Historisk topafstand (testanalyse)',hp.at(-1).d);
 let box=document.getElementById('r2-freshness');if(!box){box=document.createElement('aside');box.id='r2-freshness';box.setAttribute('role','alert');document.getElementById('headline')?.before(box)}
 box.hidden=!problems.length;box.innerHTML='<strong>DATAKONTROL: Ikke alle viste analyser er ajour.</strong><br>'+problems.map(esc).join(' · ')+'<br>Kontrolgrænse: '+expected+' (foregående hverdag). Helligdage kan kræve særskilt kontrol. De angivne analyser må ikke læses som dagsaktuelle.';
 // Routine waiting before the scheduled delivery is not a public error banner.
 // Genuine overdue data remains visible; monitoring retains every date check.
 const prior=new Date(expected+'T12:00:00Z');prior.setUTCDate(prior.getUTCDate()-1);while([0,6].includes(prior.getUTCDay()))prior.setUTCDate(prior.getUTCDate()-1);
 if(problems.length&&awaitingDaily&&data.asOf>=expected&&observationDates.every(d=>d&&d>=prior.toISOString().slice(0,10)))box.hidden=true;
 window.NDI_V2_FRESHNESS={checkedAt:new Date().toISOString(),expected,passed:!problems.length,problems};
}

const r2Summary=v2Summary;
v2Summary=function(){r2Summary();if(!data)return;
 const h=document.getElementById('headline');let w=document.getElementById('r2-history-warning');if(h&&!w){w=document.createElement('p');w.id='r2-history-warning';h.after(w)}
 if(w)w.textContent='Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering.';
 const chart=document.getElementById('growth')?.closest('article');if(chart){chart.querySelector('h2').textContent=growthView==='total'?'Totalafkast':'Kursudvikling';const explanation=document.getElementById('growth').nextElementSibling,info=document.getElementById('v2-compare');if(info&&explanation&&explanation!==info&&explanation.tagName==='P')explanation.after(info)}
 r2Freshness();
};
const r2Layout=v2Layout;
v2Layout=function(){r2Layout();
 document.querySelectorAll('[data-class]').forEach(b=>{const f=data.funds[Number(b.dataset.class)],buy=b.querySelector('.v2-buy');if(buy&&f)buy.innerHTML='Find i din bank: <b>'+esc(f.isin)+'</b> · '+esc(f.short);b.querySelectorAll('span').forEach(s=>{if(s.classList.contains('v2-buy'))return;const t=s.textContent.replace('Relevant til pension','Typisk relevant for pension');if(t!==s.textContent)s.textContent=t})});
 document.querySelectorAll('[data-go="risk"],#explore-risk,[data-r2-risk]').forEach(b=>{b.textContent='Se væsentlige risikooplysninger og juridiske dokumenter →';b.dataset.r2Risk='true';b.removeAttribute('data-go');if(b.id==='explore-risk')b.id='r2-legal-link'});
 const panel=document.getElementById('preview-risk-summary');if(panel&&!panel.querySelector('.r2-method')){const a=document.createElement('a');a.className='r2-method';a.href='#method-content';a.textContent='Se beregningsmetoder →';a.onclick=e=>{e.preventDefault();r2Methods()};panel.querySelector('h2')?.after(a)}
 if(panel)panel.querySelectorAll('p').forEach(p=>{if(p.textContent.includes('Se beregningsmetode'))p.textContent='Historiske nøgletal beregnet på klassens totalafkast i DKK.'});
 const cal=document.getElementById('v2-calendar');if(cal){const paragraphs=[...cal.querySelectorAll('p')];if(paragraphs.length){paragraphs[0].textContent='Alle tal er i %. Samme totalafkastserie som grafen; afkast mellem månedernes sidste tilgængelige punkter. Startår og indeværende år er delperioder; * betyder uafsluttet måned. Første måned udelades uden et forudgående månedsgrundlag. Manglende måneder udfyldes ikke med nul. Se Data om fonden & metode for årsafstemning og kildegrundlag.';paragraphs.slice(1).forEach(p=>p.remove())}}
 const asof=document.getElementById('asof');if(asof){asof.textContent='Kursdato: '+(data.funds[selected].performanceAsOf||data.funds[selected].data.at(-1).d)+' · daglige data';asof.style.fontSize='12px'}
 r2Summary();
};
function r2Methods(){const el=document.getElementById('method-content');if(!el)return;const details=el.closest('details');if(details)details.open=true;el.closest('.tab')?.classList.add('active');scrollToSection(el);notifyHeight()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-r2-risk]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();scrollToSection(document.getElementById('important-information'))},true);

v2History=function(f,box){
 const points=typeof v2DistanceHistory!=='undefined'?v2DistanceHistory.funds[f.id]:null;if(!points?.length)return;
 const el=document.createElement('section');el.id='v2-history';box.append(el);
 const mobile=box.clientWidth<600,W=mobile?Math.max(260,box.clientWidth):1000,H=mobile?260:310,L=mobile?42:60,R=mobile?12:20,T=24,B=38,t0=Date.parse(points[0].d),t1=Date.parse(points.at(-1).d);
 const max=Math.max(10,Math.ceil(Math.max(...points.flatMap(p=>[p.mean,p.median]))/10)*10),x=p=>L+(Date.parse(p.d)-t0)/(t1-t0||1)*(W-L-R),y=v=>T+v/max*(H-T-B);
 let grid='';for(let v=0;v<=max;v+=10)grid+=`<path d="M${L} ${y(v)}H${W-R}" stroke="#304852"/><text x="${L-10}" y="${y(v)+5}" text-anchor="end">${v} %</text>`;
 const line=k=>points.map((p,i)=>(i?'L':'M')+x(p)+','+y(p[k])).join(' ');
 el.innerHTML='<h3>Hvor tæt var aktierne på deres top?</h3><p>Op mod 0 %: aktierne nærmer sig deres observerede top. Ned: afstanden vokser. Middel og median beskriver datidens beholdninger, ikke fondens samlede afkast.</p><div id="v2-history-readout" aria-live="polite"></div><svg viewBox="0 0 '+W+' '+H+'" role="img" tabindex="0" aria-label="Historisk middel- og medianafstand til tidligere top" style="fill:#bed0d6;font:14px system-ui">'+grid+'<path d="'+line('mean')+'" fill="none" stroke="#a3ddd4" stroke-width="2.5"/><path d="'+line('median')+'" fill="none" stroke="#edd795" stroke-width="2.5" stroke-dasharray="7 5"/><path class="r2-cross" stroke="#fff8" stroke-dasharray="3 4"/><text x="'+L+'" y="'+(H-5)+'">'+points[0].d+'</text><text x="'+(W-R)+'" y="'+(H-5)+'" text-anchor="end">'+points.at(-1).d+'</text></svg><p class="small">Historisk testanalyse til '+points.at(-1).d+'. Daglige justerede lukketoppe; søjlerne ovenfor bruger intradagtoppe. Peg eller træk på grafen; brug piletaster med tastatur. Historik er ikke en pålidelig indikator for fremtidig udvikling.</p><a class="r2-method" href="#method-content">Se beregningsmetoder →</a>';
 let current=points.length-1;const show=i=>{current=i;const p=points[i];el.querySelector('.r2-cross').setAttribute('d','M'+x(p)+' '+T+'V'+(H-B));el.querySelector('#v2-history-readout').innerHTML='<strong>'+esc(p.d)+'</strong><span style="color:#a3ddd4">━ Middel <b>'+pct(p.mean)+'</b></span><span style="color:#edd795">┄ Median <b>'+pct(p.median)+'</b></span>';};
 const svg=el.querySelector('svg');svg.onpointermove=e=>{const r=svg.getBoundingClientRect(),target=t0+Math.max(0,Math.min(1,((e.clientX-r.left)/r.width*W-L)/(W-L-R)))*(t1-t0);let best=0;for(let i=1;i<points.length;i++)if(Math.abs(Date.parse(points[i].d)-target)<Math.abs(Date.parse(points[best].d)-target))best=i;show(best)};
 svg.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();show(Math.max(0,Math.min(points.length-1,current+(e.key==='ArrowRight'?1:-1))))}};
 el.querySelector('a').onclick=e=>{e.preventDefault();r2Methods()};show(current);
};
v2Recoveries=function(){
 const el=document.getElementById('drawdown'),fund=data.funds[selected];if(!el)return;const article=el.closest('article');article.querySelector('h2').textContent='Fald fra toppen — og vejen tilbage';
 let intro=document.getElementById('v2-dd-intro');if(!intro){intro=document.createElement('p');intro.id='v2-dd-intro';el.before(intro)}intro.innerHTML='<strong>0 % betyder, at en tidligere top er nået igen — ikke at afkastet er nul.</strong> Under 0 % viser kurven faldet fra den hidtil højeste værdi med geninvesteret udbytte. Nye toppe ligger også ved 0 %.';
 let peak=fund.data[0],low=null,episodes=[];for(const p of fund.data){if(p.total>=peak.total){if(low)episodes.push({peak,low,end:p,recovered:true});peak=p;low=null}else if(!low||p.total<low.total)low=p}if(low)episodes.push({peak,low,end:fund.data.at(-1),recovered:false});episodes.sort((a,b)=>a.low.total/a.peak.total-b.low.total/b.peak.total);const rows=episodes.slice(0,5),max=Math.max(1,...rows.map(e=>(e.end.total/e.low.total-1)*100));
 let box=document.getElementById('v2-recoveries');if(!box){box=document.createElement('section');box.id='v2-recoveries';article.append(box)}
 box.innerHTML='<h3>De fem dybeste fald og den efterfølgende stigning</h3><p class="small">Fra top til bund (rød) og fra bund til genvundet top eller seneste dato (grøn). Procenterne har forskellige udgangspunkter: −50 % kræver +100 % for at komme tilbage.</p><div class="tablewrap"><table class="r2-recovery"><thead><tr><th>Top → bund</th><th>Fald / efterfølgende stigning</th><th>Status</th></tr></thead><tbody>'+rows.map(e=>{const down=(1-e.low.total/e.peak.total)*100,up=(e.end.total/e.low.total-1)*100;return '<tr><td>'+esc(e.peak.d)+'<br>'+esc(e.low.d)+'</td><td><div class="bars"><span>−'+n(down,1)+' %<i style="width:'+down/max*100+'%"></i></span><span>+'+n(up,1)+' %<i class="up" style="width:'+up/max*100+'%"></i></span></div></td><td>'+(e.recovered?'Top genvundet':'Ikke genvundet')+'<br>'+esc(e.end.d)+'</td></tr>'}).join('')+'</tbody></table></div><p class="small">Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Bunde kendes først bagefter. Alle fem dybeste observerede fald vises; opturene er ikke en strategi eller en prognose. Totalafkast efter løbende omkostninger og før skat.</p>';
};
// Two newly added holdings: primary-source principal executive offices.
const r3Geography=renderGeography;
renderGeography=function(){
 const reviewed={
  US44980X1090:{country:'United States',city:'Marlborough, Massachusetts',source:'https://www.sec.gov/Archives/edgar/data/1111928/000111192826000040/ipgp-20251231.htm'},
  US9255501051:{country:'United States',city:'Chandler, Arizona',source:'https://www.sec.gov/Archives/edgar/data/912093/000162828026056765/viav-20260627.htm'}
 };
 if(geography&&data&&geography.asOf===data.asOf)for(const rows of Object.values(geography.funds))for(const row of rows)if(reviewed[row.isin])Object.assign(row,reviewed[row.isin],{status:'profile_found',sourceType:'issuer_primary',checkedAt:'2026-10-07'});
 r3Geography();
};
if(typeof data!=='undefined'&&data){improve();drawProductionGrowth();renderHighs(data.funds[selected],highData);renderGeography()}

// Investor readability pass. Isolated v2 only; never alter fund return observations.
const r3Style=document.createElement('style');
r3Style.textContent=`
[data-class]>span,[data-class] .v2-buy{font-size:15px!important;line-height:1.55!important}
[data-class] .v2-buy b{font-size:15px!important;font-weight:650;white-space:nowrap}
#class-options .segmented{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:auto auto auto auto;gap:0 12px!important}
#class-options [data-class]{display:grid!important;grid-template-rows:subgrid;grid-row:span 4;row-gap:5px!important;align-content:start;border-width:1px!important;padding:16px 18px!important;box-shadow:none;min-width:0}
#class-options button[data-class][aria-pressed]{border-width:1px!important;padding:16px 18px!important}
#class-options [data-class][aria-pressed=true]{box-shadow:inset 0 0 0 1px #a4c9cf}
#class-options [data-class]>strong,#class-options [data-class]>span{margin:0!important;align-self:stretch}
#class-options [data-class] .v2-buy{margin-top:8px!important;padding-top:8px!important}
#headline .metric>.label{min-height:42px}
#growth-controls{display:flex!important;flex-direction:row;justify-content:space-between;align-items:flex-end!important;gap:16px!important;margin:18px 0!important;border:0;border-top:1px solid #304952;border-bottom:1px solid #304952;padding:14px 0;max-width:none;flex-wrap:wrap}
#growth-controls>div{display:flex!important;align-items:center;justify-content:flex-start;flex-wrap:wrap;gap:6px!important}
#growth-controls>.segmented{display:grid!important;grid-template-columns:repeat(2,max-content)}
#growth-controls>.segmented:nth-child(2){grid-template-columns:repeat(5,max-content)}
#growth-controls .segmented:before{flex-basis:100%!important;width:100%;line-height:1.4;font-size:10px!important;letter-spacing:.08em!important;margin:0 0 4px!important;text-align:left;color:#b2c9cf}
#growth-controls .segmented:before{grid-column:1/-1}
#growth-controls>div>span:first-child{display:block!important;width:100%!important;font-size:11px!important;text-align:left;margin:0 0 4px;letter-spacing:.04em}
.r3-growth-header{display:flex!important;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:0!important}
.r3-growth-header h2{font-size:28px!important;line-height:1.2;margin:4px 0 0!important}.r3-growth-header>.chip{display:none!important}
#asof{font-size:12px!important;line-height:1.5;margin:0!important;text-align:right!important;color:#b7cbd0;max-width:230px;flex-shrink:0}
#growth-period-result{display:none!important}
#v2-calendar #calendar th:first-child{min-width:150px;text-align:left;padding:9px 12px!important;white-space:nowrap}
.r3-year-cell{display:flex;align-items:baseline;justify-content:space-between;gap:14px}
.r3-year-value{display:inline;font-size:14px;font-weight:650;line-height:1.5;margin:0}.r3-year-label{color:#bbccd1;font-size:10px;font-weight:400;margin-left:3px}
#calendar thead th:first-child{font-size:12px}#calendar tbody th:first-child{font-weight:500}
.r3-year-value.pos{color:#9dd5c9;background:none}.r3-year-value.neg{color:#e3aaa2;background:none}
#r3-calendar-note{color:#b9cbd0;font-size:12px!important;margin:12px 0 0!important;line-height:1.6}
.r3-risk-note{border-left:2px solid #657f86;padding:0 0 0 12px!important;margin:14px 0!important;color:#bbccd1;line-height:1.6}
.hist-value{display:block!important;font-size:13px!important;white-space:normal!important;line-height:1.5;min-height:42px}
.hist-value strong{font-weight:600!important;white-space:nowrap}.hist-value small{display:block!important;white-space:nowrap;font-size:13px!important;font-weight:400!important;margin:0!important;color:#f5ee9e!important}
#v2-history{margin-top:30px!important;padding:24px 0 0!important;border-top:1px solid #3a535c!important}
#v2-history h3{font-size:23px;margin:0 0 8px!important;line-height:1.25}#v2-history p{max-width:82ch;line-height:1.6;font-size:14px;margin:8px 0 14px}
.r3-history-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap}
#v2-history-readout{display:flex!important;align-items:flex-end;gap:24px!important;padding:0!important;margin:8px 0 16px!important;min-height:64px}
#v2-history-readout>span{display:grid;gap:2px;font-size:12px;min-width:110px}#v2-history-readout b{font-size:26px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.2}
#v2-history-readout time{font-size:13px;color:#bdd0d5;padding-bottom:4px;margin-left:auto}
.r3-history-plot{width:100%;height:285px;position:relative;overflow:hidden}
#v2-history .r3-history-plot svg{display:block!important;width:100%!important;height:100%!important;max-height:none!important;min-height:0!important;aspect-ratio:auto!important;touch-action:pan-y}
#v2-history .r3-history-plot svg:focus-visible{outline:2px solid #9dd5c9;outline-offset:-2px}
#v2-history .r3-history-help{font-size:12px;color:#abc3c9;margin:8px 0}
#v2-history details{font-size:13px;line-height:1.6;margin-top:10px}#v2-history details p{font-size:13px}#v2-history summary{cursor:pointer;color:#bed6db}
.r3-distinction{padding:12px 16px;border-left:3px solid #8db7bd;background:#152a32;color:#d4e1e3;border-radius:0 6px 6px 0;max-width:none!important}
.r3-distinction strong{color:#eef5f3}.r3-measure-label{display:block;font-size:11px;letter-spacing:.1em;color:#9ebec5;margin-bottom:8px;text-transform:uppercase}
.r2-recovery td:last-child{min-width:105px}.r3-days{display:block;font-size:20px;color:#d7e9e8;font-weight:600;white-space:nowrap}
.r3-days+small{display:block;line-height:1.4;color:#b3c9cf;font-size:11px;max-width:20ch}
@media(max-width:950px){#growth-controls button{padding:7px 9px!important}}
@media(max-width:650px){#class-options .segmented{grid-template-columns:1fr;row-gap:10px!important}#class-options [data-class]{grid-template-rows:auto auto auto auto;grid-row:auto}.r3-growth-header{display:block!important}.r3-growth-header h2{font-size:25px!important}#asof{text-align:left!important;max-width:none;margin-top:8px!important}#growth-controls{align-items:stretch!important;gap:14px!important}#growth-controls>.segmented{display:flex!important;width:100%}#growth-controls button{min-height:40px}.r3-history-plot{height:240px}#v2-history-readout{gap:18px!important;flex-wrap:wrap}#v2-history-readout time{width:100%;margin-left:0}#v2-history-readout b{font-size:24px}.r2-recovery td:nth-child(4){grid-column:2;grid-row:2;text-align:right}.r2-recovery td:nth-child(2){grid-column:1/-1;grid-row:3}#v2-history h3{font-size:21px}}
@media(max-width:650px){#growth-controls .segmented:before{flex-basis:100%!important;width:100%;text-align:left;margin:0 0 4px!important}}
`;
document.head.append(r3Style);
const r3Date=d=>new Date(d+'T12:00:00Z').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'});
const r3Text=(el,text)=>{if(el&&el.textContent!==text)el.textContent=text};

function r3ReadableSummary(){
 if(!data)return;
 const f=data.funds[selected],m=insights?.funds?.[f.id],head=document.getElementById('headline');
 if(head){
  const cards=[...head.children];
  for(const card of cards){const label=card.querySelector('.label')?.textContent,sub=card.querySelector('.sub');
   if(label==='Totalafkast siden start')r3Text(sub,'Fra '+r3Date(f.data[0].d)+' til '+r3Date(f.data.at(-1).d)+' i danske kroner.');
   if(label==='År til dato')r3Text(sub,'Dit samlede afkast fra årets start til '+r3Date(f.data.at(-1).d)+'.');
   if(label==='Seneste 12 måneder')r3Text(sub,Number.isFinite(m?.oneYear)?'Dit samlede afkast over det seneste år.':'Vises, når klassen har ét års historik.');
  }
 }
 const growth=document.getElementById('growth'),chart=growth?.closest('article'),header=chart?.querySelector('.panelhead'),controls=document.getElementById('growth-controls'),asof=document.getElementById('asof');
 if(header&&controls){header.classList.add('r3-growth-header');if(header.nextElementSibling!==controls)header.after(controls);r3Text(header.querySelector('.eyebrow'),f.short+' · UDVIKLING OVER TID');r3Text(header.querySelector('h2'),growthView==='total'?'Totalafkast over tid':'Kursudvikling over tid')}
 if(asof&&header){r3Text(asof,'Senest opdateret pr. '+r3Date(f.performanceAsOf||f.data.at(-1).d));if(asof.parentElement!==header)header.append(asof)}
 document.querySelectorAll('[data-class]').forEach(b=>{const fund=data.funds[Number(b.dataset.class)],buy=b.querySelector('.v2-buy');if(buy&&fund){const html='Find dér, hvor du investerer: Søg på <b>'+esc(fund.short)+'</b> eller ISIN <b>'+esc(fund.isin)+'</b>.';if(buy.innerHTML!==html)buy.innerHTML=html}});
}
const r3OriginalSummary=v2Summary;
v2Summary=function(){r3OriginalSummary();r3ReadableSummary()};

function r3Calendar(){
 const panel=document.getElementById('v2-calendar'),table=document.querySelector('#calendar table');if(!panel||!table)return;
 const f=data.funds[selected],years=new Map();for(const p of f.data)years.set(p.d.slice(0,4),p);
 let baseline=f.data[0].total;const totals=new Map();
 for(const [year,last] of years){totals.set(year,(last.total/baseline-1)*100);baseline=last.total}
 // The first partial year can have an annual return but no complete month.
 for(const year of [...years.keys()].reverse())if(![...table.tBodies[0].rows].some(r=>(r.cells[0].dataset.r3Year||r.cells[0].textContent.trim().slice(0,4))===year)){
  const row=document.createElement('tr');row.innerHTML='<th>'+esc(year)+'</th>'+Array.from({length:12},()=>'<td title="Intet fuldt månedsgrundlag">—</td>').join('');table.tBodies[0].prepend(row);
 }
 r3Text(table.tHead?.rows[0]?.cells[0],'År · samlet afkast');
 for(const row of table.tBodies[0]?.rows||[]){const cell=row.cells[0],year=cell.dataset.r3Year||cell.textContent.trim().slice(0,4),v=totals.get(year);if(!Number.isFinite(v))continue;
  cell.dataset.r3Year=year;const partial=year===f.data.at(-1).d.slice(0,4)?'År til dato':year===f.data[0].d.slice(0,4)?'Fra klassens start':'Hele året';
  const marker=partial==='År til dato'?'¹':partial==='Fra klassens start'?'²':'';
  const html='<span class="r3-year-cell"><span>'+esc(year)+'<sup class="r3-year-label">'+marker+'</sup></span><span class="r3-year-value '+(v>=0?'pos':'neg')+'">'+pct(v)+'</span></span>';if(cell.innerHTML!==html)cell.innerHTML=html;cell.title=year+' · '+partial+' · '+pct(v);
 }
 panel.querySelectorAll('.audit-addition').forEach(x=>x.remove());
 panel.querySelectorAll('p').forEach(x=>{if(x.id!=='r3-calendar-note')x.remove()});
 let note=document.getElementById('r3-calendar-note');if(!note){note=document.createElement('p');note.id='r3-calendar-note';panel.append(note)}
 r3Text(note,'Totalafkast i %, med geninvesteret udbytte, efter løbende omkostninger og før skat. Årets samlede afkast står ved årstallet. ¹ År til dato · ² Fra klassens start · * Uafsluttet måned. Tomme måneder er ikke 0 %. Se beregningsmetoden for datogrundlaget.');
}
function r3Risk(){
 const panel=document.getElementById('preview-risk-summary'),f=data.funds[selected],m=insights?.funds?.[f.id];if(!panel||!m)return;
 panel.querySelectorAll('p').forEach(p=>{if(p.id==='risk-period'){p.hidden=true;p.style.display='none'}else if(p.classList.contains('audit-addition')||p.textContent.startsWith('Risikotallene'))p.remove()});
 let note=document.getElementById('r3-risk-note');if(!note){note=document.createElement('p');note.id='r3-risk-note';note.className='r3-risk-note';panel.append(note)}
 r3Text(note,'Tallene beskriver historiske udsving, ikke hvor meget du kan tabe. '+(m.completedMonths>=12?'Volatilitet og Sharpe bygger på '+m.completedMonths+' hele måneder; den igangværende måned tæller ikke med.':'Volatilitet og Sharpe vises først efter 12 hele måneder; klassen har '+m.completedMonths+'.')+' En kort historik kan udelade store markedsfald. Datoer og beregning findes under beregningsmetoder.');
 const method=document.getElementById('method-content');if(method){let detail=document.getElementById('r3-risk-dates');if(!detail){detail=document.createElement('p');detail.id='r3-risk-dates';const h=[...method.querySelectorAll('h3')].find(x=>x.textContent==='Volatilitet og Sharpe');h?.nextElementSibling?.after(detail)}r3Text(detail,'For '+f.short+': '+m.completedMonths+' hele månedsperioder fra '+r3Date(m.riskPeriod.start)+' til '+r3Date(m.riskPeriod.end)+'. Fald fra tidligere top måles fra '+r3Date(f.data[0].d)+' til '+r3Date(f.data.at(-1).d)+'.')}
}
const r3OriginalLayout=v2Layout;
v2Layout=function(){r3OriginalLayout();r3ReadableSummary();r3Calendar();r3Risk()};

// Same source selection in histogram, on-screen holdings and Excel download.
function r3DistanceRow(row,asOf=data.asOf){
 if(row?.status==='ok'&&Number.isFinite(row.distance))return row;
 const extra=typeof v2Extra!=='undefined'&&v2Extra.asOf===asOf?v2Extra.positions[row?.isin]:null;
 return extra&&Number.isFinite(extra.distance)?{...row,...extra,status:'ok'}:null;
}
function r3DistanceLabel(row){
 if(!row)return 'Ikke tilgængelig';
 if(row.distance<=0.000001)return row.allTimeHighVerified===true?'ATH':'På periodens top';
 return pct(row.distance);
}
const r3OriginalHoldings=holdings;
holdings=function(){r3OriginalHoldings();const f=data.funds[selected],pack=highData?.funds?.find(p=>p.short===f.short);if(!pack)return;
 document.querySelectorAll('#holdings tr').forEach(row=>{const isin=row.cells[0]?.querySelector('small')?.textContent,source=pack.rows.find(r=>r.isin===isin),value=r3DistanceRow(source),cell=row.cells[9];if(!cell||!isin)return;
  r3Text(cell,r3DistanceLabel(value));cell.title=value?'Afstand til højeste observerede kurs. Måleperiode: '+(value.start?r3Date(value.start):'op til 52 uger')+' – '+r3Date(value.date)+'.':'Ingen valideret observation. Manglende data er ikke det samme som en ny top.';
 });
};
const r3OriginalWorkbook=holdingsWorkbook;
holdingsWorkbook=function(fund,asOf,market){return r3OriginalWorkbook(fund,asOf,market.map(r=>r3DistanceRow(r,asOf)||r))};

let r3HistoryObserver=null;
v2History=function(f,box){
 r3HistoryObserver?.disconnect();
 const points=typeof v2DistanceHistory!=='undefined'?v2DistanceHistory.funds?.[f.id]:null;if(!points?.length)return;
 const el=document.createElement('section');el.id='v2-history';box.append(el);
 el.innerHTML='<div class="r3-history-head"><div><span class="r3-measure-label">De enkelte aktier · ligevægtet</span><h3>Hvor langt var aktierne fra deres egne toppe?</h3><p>Hver aktie måles mod sin egen højeste kurs i de foregående 52 uger. Kurverne viser gennemsnittet og medianen for de aktier, fonden ejede på hver dato — ikke fondens samlede afkast.</p></div></div><div id="v2-history-readout"><span style="color:#a3ddd4">━ Middelafstand<b></b></span><span style="color:#edd795">┄ Medianafstand<b></b></span><time></time></div><div class="r3-history-plot"><svg role="img" tabindex="0" aria-label="Aktiernes afstand under deres egne toppe, i procent. Lavere afstand er tættere på toppen. Brug piletaster for at undersøge datoer."></svg></div><p class="r3-history-help">Afstand under egen top i %. Opad = tættere på toppen. Peg eller træk på kurverne for at se en dato.</p><p class="r3-distinction"><strong>Fonden kan godt sætte rekord, uden at alle aktier gør det.</strong> Aktiernes toppe falder på forskellige datoer, og aktierne fylder ikke lige meget i fonden. Derfor behøver disse kurver ikke ramme 0 %, når fondens samlede totalafkast når en ny top i grafen nedenfor.</p><details><summary>Om denne måling</summary><p>Begge kurver bruger datidens beholdninger og op til 52 ugers justerede lukkekurser. Middel er gennemsnittet, hvor hver position tæller lige meget; median deler positionerne i to lige store grupper. Middelafstanden er kun 0 %, hvis alle målte aktier samtidig står på deres egne toppe. Kortere historik bruger den tilgængelige periode. Søjlerne ovenfor måler mod intradagtoppe, så de to visninger er ikke identiske. Fondens graf nedenfor måler derimod samlet totalafkast i DKK mod fondens højeste værdi siden start og medregner geninvesteret udbytte.</p><p class="r3-history-coverage"></p></details><p class="small">Historiske bevægelser er ikke en pålidelig indikator for fremtidig udvikling.</p><a class="r2-method" href="#method-content">Se beregningsmetoder →</a>';
 const svg=el.querySelector('svg'),plot=el.querySelector('.r3-history-plot'),t0=Date.parse(points[0].d),t1=Date.parse(points.at(-1).d);
 let index=points.length-1,width=0,geometry=null;
 const maximum=Math.max(10,Math.ceil(Math.max(...points.flatMap(p=>[p.mean,p.median]))/10)*10);
 const show=i=>{index=i;const p=points[i],numbers=el.querySelectorAll('#v2-history-readout b');r3Text(numbers[0],pct(p.mean));r3Text(numbers[1],pct(p.median));r3Text(el.querySelector('time'),r3Date(p.d));
  r3Text(el.querySelector('.r3-history-coverage'),'Valgt dato: '+r3Date(p.d)+'. Grundlag: '+p.count+' af '+p.total+' daværende positioner, svarende til '+pct(p.weight)+' af formuen. Aktiekurserne er de seneste tilgængelige før beholdningsrapporten '+r3Date(p.reportDate)+'. Denne dækning kan variere fra dato til dato.');
  if(!geometry)return;const {x,y,T,H,B}=geometry,px=x(p.d);svg.querySelector('.r3-cross')?.setAttribute('d','M'+px+' '+T+'V'+(H-B));svg.querySelectorAll('.r3-point').forEach((c,j)=>{c.setAttribute('cx',px);c.setAttribute('cy',y(j?p.median:p.mean))});
 };
 const draw=()=>{
  const next=Math.round(plot.getBoundingClientRect().width);if(next<100||next===width)return;width=next;
  const W=next,H=next<600?240:285,L=46,R=12,T=16,B=34,x=d=>L+(Date.parse(d)-t0)/(t1-t0||1)*(W-L-R),y=v=>T+v/maximum*(H-T-B);geometry={W,H,L,R,T,B,x,y};
  svg.setAttribute('viewBox','0 0 '+W+' '+H);let grid='';
  for(let v=0;v<=maximum;v+=10)grid+='<path d="M'+L+' '+y(v)+'H'+(W-R)+'" stroke="'+(v===0?'#829a9f':'#304852')+'"/><text x="'+(L-9)+'" y="'+(y(v)+4)+'" text-anchor="end">'+v+' %</text>';
  const line=k=>points.map((p,i)=>(i?'L':'M')+x(p.d).toFixed(2)+','+y(p[k]).toFixed(2)).join(' '),ticks=next<600?3:5;
  for(let i=0;i<ticks;i++){const px=L+i/(ticks-1)*(W-L-R),date=new Date(t0+i/(ticks-1)*(t1-t0)).toLocaleDateString('da-DK',{month:'short',year:'2-digit'});grid+='<text x="'+px+'" y="'+(H-5)+'" text-anchor="'+(i===0?'start':i===ticks-1?'end':'middle')+'">'+esc(date)+'</text>'}
  svg.innerHTML='<g fill="#b9cdd3" font-size="11" font-family="system-ui">'+grid+'</g><path d="'+line('mean')+'" fill="none" stroke="#a3ddd4" stroke-width="2"/><path d="'+line('median')+'" fill="none" stroke="#edd795" stroke-width="2" stroke-dasharray="6 4"/><path class="r3-cross" stroke="#c4d6d980" stroke-dasharray="3 4"/><circle class="r3-point" r="4" fill="#a3ddd4"/><circle class="r3-point" r="4" fill="#edd795"/>';show(index);
 };
 svg.onpointermove=e=>{if(!geometry)return;const r=svg.getBoundingClientRect(),{W,L,R}=geometry,target=t0+Math.max(0,Math.min(1,((e.clientX-r.left)/r.width*W-L)/(W-L-R)))*(t1-t0);let best=0;for(let i=1;i<points.length;i++)if(Math.abs(Date.parse(points[i].d)-target)<Math.abs(Date.parse(points[best].d)-target))best=i;show(best)};
 svg.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();show(e.key==='Home'?0:e.key==='End'?points.length-1:Math.max(0,Math.min(points.length-1,index+(e.key==='ArrowRight'?1:-1))))}};
 el.querySelector('a').onclick=e=>{e.preventDefault();r2Methods()};
 r3HistoryObserver=new ResizeObserver(draw);r3HistoryObserver.observe(plot);show(index);draw();
};
const r3OriginalHighs=renderHighs;
renderHighs=function(f,source){r3OriginalHighs(f,source);const box=document.getElementById('highs-content');if(!box)return;
 box.querySelectorAll('.hist-value').forEach(label=>{const count=label.querySelector('strong')?.textContent,weight=label.querySelector('small')?.textContent;if(count&&weight)label.innerHTML='<strong>'+esc(count)+' aktier</strong><small> / '+esc(weight)+'</small>'});
 const legend=box.querySelector('.hist-scroll+p');if(legend)legend.innerHTML='Antal aktier / <span style="color:#f5ee9e">andel af hele formuen</span>. Klik på en søjle for at se aktierne.';
 r3Text(box.querySelector('.v2-high-note'),'Afstand til højeste observerede kurs inden for op til 52 uger; kortere historik bruger den tilgængelige periode.');
};
const r3OriginalRecoveries=v2Recoveries;
v2Recoveries=function(){r3OriginalRecoveries();const box=document.getElementById('v2-recoveries'),table=box?.querySelector('table');if(!table)return;
 const article=box.closest('article');r3Text(article?.querySelector('.eyebrow'),'FONDEN SAMLET · TOTALAFKAST');r3Text(article?.querySelector('h2'),'Fondens fald fra toppen — og vejen tilbage');
 const th=document.createElement('th');th.textContent='Fra bund til top';table.tHead.rows[0].append(th);
 for(const row of table.tBodies[0].rows){const dates=row.cells[0].innerText.match(/\d{4}-\d{2}-\d{2}/g),end=row.cells[2].innerText.match(/\d{4}-\d{2}-\d{2}/)?.[0],recovered=!row.cells[2].textContent.startsWith('Ikke');if(!dates?.[1]||!end)continue;
  const days=Math.round((Date.parse(end)-Date.parse(dates[1]))/86400000),td=document.createElement('td');td.innerHTML='<span class="r3-days">'+days+' dage</span><small>'+(recovered?'Fra bunden til genvundet top':'Forløbet siden bunden; toppen er endnu ikke genvundet')+'</small>';row.append(td);
  row.cells[0].innerHTML=r3Date(dates[0])+'<br>'+r3Date(dates[1]);row.cells[2].innerHTML=(recovered?'Top genvundet':'Ikke genvundet')+'<br>'+r3Date(end);
 }
 const intro=box.querySelector('h3+p');if(intro)intro.textContent+=' Tiden fra bund til top er antal kalenderdage.';
 const warning=box.querySelector('p:last-child');if(warning)warning.textContent+=' Forløbene illustrerer, at volatilitet omfatter både nedture og opture.';
};
if(typeof data!=='undefined'&&data){improve();drawProductionGrowth();holdings();renderHighs(data.funds[selected],highData)}

// V2 presentation only. Fund total-return highs are NOT constituent rolling highs.
function v4FundHighs(rows){
 let peak=0;
 return rows.map(p=>{peak=Math.max(peak,p.total);return {d:p.d,total:p.total,peak,atHigh:p.total>=peak,drawdown:100*(p.total/peak-1)}});
}

const v4HistoryStyle=document.createElement('style');
v4HistoryStyle.textContent=`
#v2-history .v4-intro{margin:0 0 18px!important;max-width:75ch}
.v4-history-date{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:18px 0 20px;flex-wrap:wrap}
.v4-history-date time{font-size:15px;font-weight:600;color:#e9f2f3;font-variant-numeric:tabular-nums}
#v2-history .v4-high-button{background:transparent;color:#d9eeee;border:1px solid #81abb3;border-radius:7px;padding:9px 13px;font-size:13px;cursor:pointer;min-height:40px}
#v2-history .v4-high-button:hover{background:#243e47}#v2-history .v4-high-button:focus-visible{outline:2px solid #edd795;outline-offset:3px}
.v4-history-pane{padding:18px 18px 8px;border:1px solid #324d56;border-radius:10px;background:#0d1d25;margin-top:14px}
.v4-history-pane.v4-fund-pane{background:#132b30;border-color:#537b7c}
.v4-pane-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;min-height:70px}
#v2-history .v4-pane-head h4{font-size:18px;line-height:1.3;margin:0 0 5px!important;color:#eef5f4}
#v2-history .v4-pane-head p{font-size:12px;line-height:1.5;margin:0!important;max-width:42ch;color:#b6cdd1}
.v4-fund-value{font-size:24px;line-height:1.25;font-weight:600;white-space:nowrap;color:#a3ddd4;font-variant-numeric:tabular-nums}
.v4-fund-value small{display:block;font-size:11px;line-height:1.5;font-weight:400;color:#bed0d4}
#v4-history-readout{display:flex;gap:22px;margin:0 0 6px;flex-shrink:0}
#v4-history-readout span{display:grid;gap:3px;font-size:12px;line-height:1.4}
#v4-history-readout b{font-size:23px;line-height:1.25;font-weight:600;font-variant-numeric:tabular-nums}
.v4-fund-plot{height:185px}.v4-stocks-plot{height:265px}.v4-history-plot{width:100%;overflow:hidden}
#v2-history .v4-history-plot svg{display:block;width:100%!important;height:100%!important;min-height:0!important;max-height:none!important;aspect-ratio:auto!important;touch-action:pan-y}
#v2-history .v4-history-plot svg:focus-visible{outline:2px solid #edd795;outline-offset:-2px}
#v2-history .v4-pane-foot{font-size:12px;line-height:1.55;margin:2px 0 8px!important;color:#bed0d4}
#v2-history .v4-meaning{margin:16px 0 10px!important;font-size:14px;line-height:1.6;color:#c3d8da}
.v4-has-paired-history #drawdown,.v4-has-paired-history #v2-dd-intro,.v4-has-paired-history #drawdown+p{display:none!important}
@media(max-width:650px){.v4-history-pane{padding:14px 9px 6px}.v4-pane-head{display:block;min-height:0}.v4-fund-value{margin:12px 0 8px;font-size:23px}#v4-history-readout{margin:14px 0 8px;gap:26px}.v4-fund-plot{height:180px}.v4-stocks-plot{height:235px}.v4-history-date{gap:9px}#v2-history .v4-pane-head h4{font-size:17px}}
`;
document.head.append(v4HistoryStyle);
let v4HistoryObserver=null;
v2History=function(f,box){
 v4HistoryObserver?.disconnect();r3HistoryObserver?.disconnect();
 const stockPoints=typeof v2DistanceHistory!=='undefined'?v2DistanceHistory.funds?.[f.id]:null;
 document.documentElement.classList.toggle('v4-has-paired-history',!!stockPoints?.length);
 if(!stockPoints?.length)return;
 const fundPoints=v4FundHighs(f.data),stocks=new Map(stockPoints.map(p=>[p.d,p]));
 const lastHigh=fundPoints.findLastIndex(p=>p.atHigh),firstDate=fundPoints[0].d,lastDate=fundPoints.at(-1).d;
 const el=document.createElement('section');el.id='v2-history';box.append(el);
 el.innerHTML='<span class="r3-measure-label">To forskellige mål · samme tidsakse</span><h3>Fondens rekorder og aktiernes egne toppe</h3><p class="v4-intro">Øverst ser du, hvornår fonden nåede sit hidtil højeste totalafkast (ATH). Nederst ser du, hvor langt de enkelte aktier var fra deres egne toppe.</p><div class="v4-history-date"><time></time><button type="button" class="v4-high-button">Vis seneste ATH for '+esc(f.short)+' →</button></div><div class="v4-history-pane v4-fund-pane"><div class="v4-pane-head"><div><h4>'+esc(f.short)+' · fonden samlet</h4><p>Afstand til fondens hidtil højeste totalafkast.<br>Med geninvesteret udbytte, efter løbende omkostninger.</p></div><div class="v4-fund-value"><span></span><small></small></div></div><div class="v4-history-plot v4-fund-plot"><svg tabindex="0" role="img" aria-label="Fondens afstand til sin hidtil højeste totalafkastværdi. Gule markeringer på nul-linjen viser ATH. Brug piletaster til at vælge dato."></svg></div><p class="v4-pane-foot"><span style="color:#edd795">●</span> Gule markeringer = fonden på ATH. 0 % betyder rekordniveau — ikke 0 % i afkast.</p></div><div class="v4-history-pane"><div class="v4-pane-head"><div><h4>De enkelte aktier · ligevægtet</h4><p>Afstand til hver akties egen top i op til 52 uger.<br>Dette er ikke fondens afkast eller fondens ATH.</p></div><div id="v4-history-readout"><span style="color:#a3ddd4">━ Middelafstand<b></b></span><span style="color:#edd795">┄ Medianafstand<b></b></span></div></div><div class="v4-history-plot v4-stocks-plot"><svg tabindex="0" role="img" aria-label="De enkelte aktiers gennemsnitlige og mediane afstand til deres egne rullende toppe, ikke fondens ATH. Brug piletaster til at vælge samme dato i begge figurer."></svg></div><p class="v4-pane-foot">Hver aktie har sin egen topdato. Derfor kan afstandene være over 0 %, selv når fonden samlet er på ATH.</p></div><p class="v4-meaning"><strong>Samme dato, forskellige mål.</strong> Fondens afkast afhænger også af positionernes størrelse, handler og geninvesteret udbytte. I aktiemålingen tæller hver position lige meget.</p><details><summary>Om de to målinger</summary><p>Fondens kurve er beregnet på samme totalafkastserie i DKK som grafen øverst. ATH betyder den højeste observerede totalafkastværdi siden klassens start; gentagelser af det hidtidige rekordniveau markeres også. Den første observation er udgangspunktet.</p><p>Aktiekurverne bruger datidens beholdninger og op til 52 ugers justerede lukkekurser. Middel er gennemsnittet; median deler de målte positioner i to lige store grupper. Middelafstanden er kun 0 %, hvis alle målte aktier samtidig står på deres egne toppe. Kortere historik bruger den tilgængelige periode. Søjlerne ovenfor bruger intradagtoppe og er derfor et andet mål. Første aktieobservation: '+r3Date(stockPoints[0].d)+'. Perioder uden observationer udfyldes ikke.</p><p class="v4-history-coverage"></p></details><p class="small">Historiske afkast er ikke en pålidelig indikator for fremtidige afkast. Figurerne viser historiske forløb, ikke en investeringsstrategi eller prognose.</p><a class="r2-method" href="#method-content">Se beregningsmetoder →</a>';
 const svgs=[...el.querySelectorAll('svg')],plots=[...el.querySelectorAll('.v4-history-plot')];
 const t0=Date.parse(firstDate),t1=Date.parse(lastDate),fundMax=Math.max(10,Math.ceil(Math.max(...fundPoints.map(p=>-p.drawdown))/10)*10),stockMax=Math.max(10,Math.ceil(Math.max(...stockPoints.flatMap(p=>[p.mean,p.median]))/10)*10);
 let index=fundPoints.length-1,width=0,geometries=[];
 const show=i=>{
  index=i;const p=fundPoints[i],s=stocks.get(p.d),value=el.querySelector('.v4-fund-value');
  r3Text(el.querySelector('time'),r3Date(p.d));r3Text(value.querySelector('span'),p.atHigh?'På ATH':pct(-p.drawdown)+' under ATH');
  r3Text(value.querySelector('small'),p.atHigh?'Hidtil højeste totalafkastværdi':'Afstand til fondens hidtil højeste værdi');
  el.querySelectorAll('#v4-history-readout b').forEach((b,j)=>r3Text(b,s?pct(j?s.median:s.mean):'—'));
  r3Text(el.querySelector('.v4-history-coverage'),s?'Aktiegrundlag '+r3Date(p.d)+': '+s.count+' af '+s.total+' daværende positioner, svarende til '+pct(s.weight)+' af formuen. Beholdningsrapport: '+r3Date(s.reportDate)+'. Dækningen varierer over tid.':'Ingen aktieobservation på den valgte fondsdag; aktieafstande udfyldes ikke.');
  svgs.forEach((svg,j)=>{const g=geometries[j];if(!g)return;const px=g.x(p.d);svg.querySelector('.v4-cross').setAttribute('d','M'+px+' '+g.T+'V'+(g.H-g.B));svg.querySelectorAll('.v4-point').forEach((c,k)=>{const v=j?(s?(k?s.median:s.mean):null):-p.drawdown;c.setAttribute('visibility',v===null?'hidden':'visible');if(v!==null){c.setAttribute('cx',px);c.setAttribute('cy',g.y(v))}})});
 };
 const draw=()=>{
  const next=Math.round(plots[0].getBoundingClientRect().width);if(next<100||next===width)return;width=next;
  svgs.forEach((svg,j)=>{
   const W=next,H=Math.round(plots[j].getBoundingClientRect().height),L=48,R=12,T=j?18:25,B=28,max=j?stockMax:fundMax,x=d=>L+(Date.parse(d)-t0)/(t1-t0||1)*(W-L-R),y=v=>T+v/max*(H-T-B);
   geometries[j]={W,H,L,R,T,B,x,y};svg.setAttribute('viewBox','0 0 '+W+' '+H);
   let grid='';for(let v=0;v<=max;v+=10)grid+='<path d="M'+L+' '+y(v)+'H'+(W-R)+'" stroke="'+(v===0&&!j?'#96cac3':'#304852')+'"/><text x="'+(L-8)+'" y="'+(y(v)+4)+'" text-anchor="end">'+(v&&!j?'−':'')+v+' %</text>';
   const ticks=W<600?3:5;for(let k=0;k<ticks;k++){const px=L+k/(ticks-1)*(W-L-R),date=new Date(t0+k/(ticks-1)*(t1-t0)).toLocaleDateString('da-DK',{month:'short',year:'2-digit'});grid+='<text x="'+px+'" y="'+(H-3)+'" text-anchor="'+(!k?'start':k===ticks-1?'end':'middle')+'">'+esc(date)+'</text>'}
   const line=(rows,value)=>rows.map((p,k)=>(k?'L':'M')+x(p.d).toFixed(2)+','+y(value(p)).toFixed(2)).join(' ');
   let traces='';if(!j){const path=line(fundPoints,p=>-p.drawdown);traces='<path d="'+path+'L'+x(lastDate)+','+y(0)+'L'+x(firstDate)+','+y(0)+'Z" fill="#91c9c418"/><path d="'+path+'" fill="none" stroke="#a3ddd4" stroke-width="2"/>'+fundPoints.filter(p=>p.atHigh).map(p=>'<circle class="v4-ath-mark" cx="'+x(p.d)+'" cy="'+y(0)+'" r="2.5" fill="#edd795"/>').join('')+'<text x="'+L+'" y="12" fill="#edd795" font-size="11">ATH · fondens rekordniveau</text>'}
   else traces='<path d="'+line(stockPoints,p=>p.mean)+'" fill="none" stroke="#a3ddd4" stroke-width="2"/><path d="'+line(stockPoints,p=>p.median)+'" fill="none" stroke="#edd795" stroke-width="2" stroke-dasharray="6 4"/>';
   svg.innerHTML='<g fill="#b9cdd3" font-size="11" font-family="system-ui">'+grid+'</g>'+traces+'<path class="v4-cross" stroke="#c4d6d990" stroke-dasharray="3 4"/><circle class="v4-point" r="4" fill="#a3ddd4"/>'+(j?'<circle class="v4-point" r="4" fill="#edd795"/>':'');
  });show(index);
 };
 svgs.forEach((svg,j)=>{
  const pointer=e=>{const g=geometries[j];if(!g)return;const r=svg.getBoundingClientRect(),target=t0+Math.max(0,Math.min(1,((e.clientX-r.left)/r.width*g.W-g.L)/(g.W-g.L-g.R)))*(t1-t0);let best=0;for(let k=1;k<fundPoints.length;k++)if(Math.abs(Date.parse(fundPoints[k].d)-target)<Math.abs(Date.parse(fundPoints[best].d)-target))best=k;show(best)};
  svg.onpointermove=pointer;svg.onpointerdown=pointer;svg.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();show(e.key==='Home'?0:e.key==='End'?fundPoints.length-1:Math.max(0,Math.min(fundPoints.length-1,index+(e.key==='ArrowRight'?1:-1))))}};
 });
 el.querySelector('.v4-high-button').onclick=()=>show(lastHigh);
 el.querySelector('a').onclick=e=>{e.preventDefault();r2Methods()};
 v4HistoryObserver=new ResizeObserver(draw);plots.forEach(p=>v4HistoryObserver.observe(p));show(index);draw();
};
const v4PriorRecoveries=v2Recoveries;
v2Recoveries=function(){v4PriorRecoveries();const box=document.getElementById('v2-recoveries');if(!box||!document.documentElement.classList.contains('v4-has-paired-history'))return;const article=box.closest('article');r3Text(article.querySelector('.eyebrow'),'FONDEN SAMLET · HISTORISKE FORLØB');r3Text(article.querySelector('h2'),'Nedture og efterfølgende stigninger');};
if(typeof data!=='undefined'&&data){renderHighs(data.funds[selected],highData);v2Recoveries();notifyHeight()}

// The outer page owns vertical scrolling; this auto-height child must not
// acquire its own scrollbar while its parent's height catches up. Otherwise
// a 15px gutter changes wrapping, triggers a width redraw, removes the gutter
// and repeats. Debouncing height notifications alone cannot break that loop.
// Nested horizontal table scrollers remain independent and usable.
const v2FrameViewportStyle=document.createElement('style');
v2FrameViewportStyle.id='v2-frame-viewport';
v2FrameViewportStyle.textContent=window.parent!==window?'html{overflow-y:hidden!important}':'html{overflow-y:auto!important}';
document.head.append(v2FrameViewportStyle);

// V2 only: changing the parent iframe height is not a chart-width change.
// The inherited simple-view resize listener otherwise redraws the whole
// overview, publishes intermediate heights and triggers another resize.
let v2ViewportWidth=document.documentElement.clientWidth;
window.addEventListener('resize',event=>{
 const width=document.documentElement.clientWidth;
 if(width===v2ViewportWidth){event.stopImmediatePropagation();return;}
 v2ViewportWidth=width;
},true);

// Coalesce height notifications from all synchronous presentation passes.
// Never send the temporary height between removing and recreating a card.
const v2SendSettledHeight=notifyHeight;
let v2HeightTimer;
notifyHeight=function(){
 clearTimeout(v2HeightTimer);
 v2HeightTimer=setTimeout(v2SendSettledHeight,50);
};
notifyHeight();
const r5Profiles={"US7960508882": {"name": "Samsung Electronics", "theme": "compute", "summary": "Udvikler og producerer blandt andet hukommelseschips, processorer og forbrugerelektronik. Halvlederforretningen omfatter både egne chipdesign og produktion for andre.", "watch": "Hukommelsespriser, kapacitetsudnyttelse og produktmix.", "source": "https://semiconductor.samsung.com/about-us/business-area/", "products": "DRAM- og NAND-hukommelse, mobile processorer og chipproduktion for andre selskaber. Koncernen sælger også telefoner, skærme og anden forbrugerelektronik.", "customers": "Både forbrugere og producenter af elektronik. Halvlederdelen leverer til blandt andet servere, mobile enheder og biler.", "role": "Hukommelse og chipproduktion er byggesten i de systemer, der behandler og lagrer data.", "reviewedAt": "2026-10-08"}, "JP3436100006": {"name": "SoftBank Group", "theme": "platforms", "summary": "Investeringskoncern med teknologiinvesteringer gennem egne selskaber og Vision Funds. Koncernen omfatter blandt andet Arm og har også eksponering mod telekommunikation.", "watch": "Værdiansættelse af investeringerne, gæld og koncentration i store ejerandele.", "source": "https://group.softbank/en/ir/financials/segments", "products": "Ejerskab og investeringer i teknologivirksomheder, blandt andet gennem Arm og Vision Funds. Det er en investeringskoncern, ikke én enkelt software- eller chipproducent.", "customers": "De underliggende selskaber betjener forskellige markeder. Investorens eksponering ligger i koncernens ejerandele og finansiering.", "role": "Forbinder kapital med blandt andet chipdesign, digitale platforme og telekommunikation.", "reviewedAt": "2026-10-08"}, "US88160R1014": {"name": "Tesla", "theme": "physical", "summary": "Producerer elbiler, batterilagring og energiprodukter. Software og automatisering er integreret i selskabets produkter og produktion.", "watch": "Bilmarkedets konkurrence, indtjening pr. bil og kapitalbehov.", "source": "https://www.tesla.com/about", "products": "Elbiler, batterilagring og energiløsninger med tilhørende software og service.", "customers": "Bilister, virksomheder og kunder med behov for lagring af elektricitet.", "role": "Kombinerer batterier, effektelektronik, software og fysisk produktion.", "reviewedAt": "2026-10-08"}, "US84615Q1031": {"name": "SpaceX", "theme": "space", "summary": "Arbejder med raketopsendelser, rumfartøjer og satellitkommunikation gennem Starlink. Aktiviteterne forbinder fysisk ruminfrastruktur med kommunikation på jorden.", "watch": "Teknisk gennemførelse, kapitalbehov og myndighedstilladelser.", "source": "https://www.spacex.com/", "products": "Raketopsendelser og rumfartøjer samt satellitbaseret internet gennem Starlink.", "customers": "Private og offentlige kunder med behov for opsendelser; husholdninger, virksomheder og andre brugere af satellitkommunikation.", "role": "Infrastruktur til at bringe materiel i kredsløb og sende data mellem satellitter og jorden.", "reviewedAt": "2026-10-08"}, "SE0003917798": {"name": "Sivers Semiconductors", "theme": "connect", "summary": "Leverer trådløse halvlederløsninger og fotonik. Produkterne omfatter radiokredse og lasere til blandt andet satellitkommunikation og optiske forbindelser i datacentre.", "watch": "Kundekoncentration, produktkvalificering og skalering af produktionen.", "source": "https://www.sivers-semiconductors.com/about-us/", "products": "Radiokredse og antenneløsninger til højfrekvent kommunikation samt lasere og fotonik til optiske forbindelser.", "customers": "Producenter af kommunikationsudstyr og systemer til blandt andet datacentre og satellitkommunikation.", "role": "Forbinder beregningskraften: data skal flyttes både trådløst og gennem optiske fibre.", "reviewedAt": "2026-10-08"}, "US1468691027": {"name": "Carvana", "theme": "platforms", "summary": "Driver en digital platform til køb og salg af brugte biler i USA. Den digitale kunderejse er knyttet til fysisk bilhåndtering, logistik og finansiering.", "watch": "Brugtbilspriser, finansieringsvilkår og omkostninger til lager og logistik.", "source": "https://investors.carvana.com/", "products": "Digital handel med brugte biler, understøttet af inspektion, klargøring, transport og finansieringsløsninger.", "customers": "Amerikanske forbrugere, som køber eller sælger brugte biler.", "role": "En digital handelsplatform koblet til en fysisk og kapitalbindende forsyningskæde.", "reviewedAt": "2026-10-08"}, "US81141R1005": {"name": "Sea", "theme": "platforms", "summary": "Driver tre digitale forretninger: Shopee inden for e-handel, Garena inden for spil og Monee inden for betalinger og finansielle tjenester.", "watch": "Konkurrence i e-handel, kreditrisiko og indtjeningen i de enkelte forretninger.", "source": "https://www.sea.com/investor/home", "products": "Shopee inden for e-handel, Garena inden for digitale spil og Monee inden for digitale finansielle tjenester.", "customers": "Forbrugere, forhandlere, spillere og brugere af betalings- og kreditløsninger.", "role": "Digitale platforme, hvor handel, underholdning og finansielle tjenester mødes.", "reviewedAt": "2026-10-08"}, "US03831W1080": {"name": "AppLovin", "theme": "software", "summary": "Leverer teknologi til digital annoncering. Platformen forbinder annoncører med brugere af apps og spil og hjælper udgivere med at tjene penge på deres indhold.", "watch": "Annoncebudgetter, platformregler, persondata og konkurrerende annonceløsninger.", "source": "https://www.applovin.com/en", "products": "Software til digital annoncering og til at skabe annonceindtægter i apps og spil.", "customers": "Annoncører samt udgivere af apps og spil.", "role": "Data og algoritmer bruges til at forbinde annoncer med målgrupper og måle resultaterne.", "reviewedAt": "2026-10-08"}, "US15675D1037": {"name": "Cerebras", "theme": "compute", "summary": "Udvikler chips og computersystemer til kunstig intelligens. Selskabet leverer også adgang til beregninger til brug af AI-modeller.", "watch": "Kundekoncentration, konkurrence mellem chiparkitekturer og kapitalbehov.", "source": "https://www.cerebras.ai/", "products": "Wafer-scale-chips, computersystemer og adgang til AI-beregninger til træning og anvendelse af modeller.", "customers": "Virksomheder og organisationer, der udvikler eller bruger AI-modeller.", "role": "En specialiseret computerarkitektur til store AI-beregninger.", "reviewedAt": "2026-10-08"}, "JP3452000007": {"name": "Taiyo Yuden", "theme": "connect", "summary": "Producerer elektroniske komponenter, herunder kondensatorer og induktorer. Komponenterne indgår i blandt andet biler, kommunikationsudstyr og forbrugerelektronik.", "watch": "Elektronikbranchens lagercyklus, prispresset på komponenter og produktmix.", "source": "https://www.yuden.co.jp/en/product/", "products": "Kondensatorer, induktorer og andre elektroniske komponenter.", "customers": "Producenter af blandt andet kommunikationsudstyr, biler og forbrugerelektronik.", "role": "Små komponenter, der blandt andet lagrer elektrisk energi og stabiliserer strøm og signaler i elektronik.", "reviewedAt": "2026-10-08"}, "US78392B1070": {"name": "SK Hynix", "theme": "compute", "summary": "Producerer hukommelseschips, herunder DRAM og NAND. Hukommelse bruges både i almindelig elektronik og i servere og AI-systemer.", "watch": "Hukommelsespriser, store produktionsinvesteringer og kundernes lagerbeholdninger.", "source": "https://news.skhynix.com/en/", "products": "DRAM, herunder høj-båndbredde-hukommelse, samt NAND-baseret lagring.", "customers": "Producenter af servere, computere, mobile enheder og andre elektroniske systemer.", "role": "Hukommelsen forsyner processorer med data; lagringen bevarer data mellem beregningerne.", "reviewedAt": "2026-10-08"}, "US05614L2097": {"name": "Babcock & Wilcox", "theme": "energy", "summary": "Leverer teknologi og service til energiproduktion og industrielle anlæg. Forretningen omfatter blandt andet kedler, forbrændingssystemer og emissionsbehandling.", "watch": "Projektgennemførelse, finansiering og efterspørgsel fra energi- og industrikunder.", "source": "https://www.babcock.com/", "products": "Udstyr og service til energiproduktion og industri, blandt andet kedler og systemer til emissionsbehandling.", "customers": "Energi- og industrivirksomheder.", "role": "Den fysiske energi- og anlægsinfrastruktur, som blandt andet databehandling er afhængig af.", "reviewedAt": "2026-10-08"}, "DE0006450000": {"name": "LPKF Laser", "theme": "physical", "summary": "Leverer laserbaserede produktionsprocesser til blandt andet printplader, halvlederindpakning, plastsvejsning og solcellemoduler.", "watch": "Kundernes investeringscyklus, ordrevariation og teknologiens anvendelse i produktion.", "source": "https://www.lpkf.com/en/", "products": "Laserbaserede produktionssystemer til printplader, halvlederindpakning, plastsvejsning og solcellemoduler.", "customers": "Elektronikproducenter og andre industrielle producenter.", "role": "Præcisionsbearbejdning af materialer, der indgår i elektroniske og industrielle produkter.", "reviewedAt": "2026-10-08"}, "JP3236330001": {"name": "Kioxia", "theme": "compute", "summary": "Producerer NAND-flashhukommelse og SSD-lagring. Produkterne anvendes i blandt andet datacentre, computere og mobile enheder.", "watch": "Priser på flashhukommelse, produktionskapacitet og kapitalkrævende fabriksdrift.", "source": "https://www.kioxia.com/en-jp/about.html", "products": "NAND-flashhukommelse og SSD-lagring.", "customers": "Datacentre og producenter af computere, mobile enheder og anden elektronik.", "role": "Permanent datalagring, i modsætning til arbejdshukommelsen tæt på en processor.", "reviewedAt": "2026-10-08"}, "US8361001071": {"name": "SoundHound AI", "theme": "software", "summary": "Leverer AI-baserede samtale- og stemmeløsninger til virksomheder. Anvendelserne omfatter blandt andet kundeservice, restauranter og biler.", "watch": "Kommercialisering, kundernes anvendelse og konkurrence inden for AI-software.", "source": "https://www.soundhound.com/", "products": "AI-baserede tale-, samtale- og assistentløsninger til virksomheder.", "customers": "Blandt andet restauranter, bilproducenter og virksomheder med kundeservice.", "role": "Softwarelaget mellem menneskers tale og virksomheders digitale systemer.", "reviewedAt": "2026-10-08"}, "US35834F1049": {"name": "T1 Energy", "theme": "energy", "summary": "Arbejder med amerikansk produktion af solenergiudstyr. Selskabets aktiviteter omfatter produktion af solcellemoduler og opbygning af forsyningskæder.", "watch": "Kapitalbehov, industripolitik, told og priser på solenergiudstyr.", "source": "https://t1energy.com/manufacturing/", "products": "Solcellemoduler og aktiviteter inden for den amerikanske forsyningskæde til solenergi.", "customers": "Kunder i markedet for solenergianlæg.", "role": "Industriel produktion af udstyr, der omdanner sollys til elektricitet.", "reviewedAt": "2026-10-08"}, "IL0010823792": {"name": "Tower Semiconductor", "theme": "compute", "summary": "Producerer halvledere for andre selskaber med fokus på specialiserede analoge teknologier. Produkterne bruges blandt andet i kommunikation, sensorer og strømstyring.", "watch": "Fabrikkernes kapacitetsudnyttelse, kundernes efterspørgsel og produktionsinvesteringer.", "source": "https://towersemi.com/", "products": "Produktion af specialiserede analoge halvledere for andre selskaber, herunder teknologier til sensorer, kommunikation og strømstyring.", "customers": "Chipdesignere og elektronikvirksomheder, der har brug for ekstern produktion.", "role": "En foundry: kundens chipdesign omsættes til fysiske chips i en fabrik.", "reviewedAt": "2026-10-08"}, "AU0000185993": {"name": "IREN", "theme": "energy", "summary": "Driver datacenteraktiviteter inden for blandt andet AI-cloud og bitcoin-mining. Strømforsyning og fysisk datacenterkapacitet er centrale dele af forretningen.", "watch": "Energipriser, kapitalbehov, kundekoncentration og eksponering mod bitcoin-mining.", "source": "https://iren.com/resources", "products": "Datacenterkapacitet til AI-cloud og bitcoin-mining.", "customers": "Kunder med behov for beregningskapacitet; bitcoin-mining er en særskilt aktivitet med en anden indtjeningsmodel.", "role": "Kombinerer elektricitet, datacentre og computere som fysisk beregningsinfrastruktur.", "reviewedAt": "2026-10-08"}, "VGG320891077": {"name": "eToro Group", "theme": "platforms", "summary": "Driver en digital investerings- og handelsplatform. Denne profil vedrører fondens aktieposition i selskabet — ikke et tilbud om et andet investeringsprodukt.", "watch": "Handelsaktivitet, regulering, konkurrence og drifts- og cybersikkerhed.", "source": "https://www.etoro.com/about/vision/", "products": "En digital platform til investering og handel med finansielle aktiver.", "customers": "Private investorer og handlende på de markeder, hvor platformen opererer.", "role": "Digital distribution af finansielle tjenester. Denne side beskriver selskabsaktien, ikke et alternativt fondsprodukt.", "reviewedAt": "2026-10-08"}, "US03823U1025": {"name": "Applied Optoelectronics", "theme": "connect", "summary": "Udvikler og producerer lasere, optiske transceivere og netværksudstyr. Produkterne bruges til at sende data gennem optiske forbindelser og bredbåndsnet.", "watch": "Kundekoncentration, produktionsudbytte og skift mellem produktgenerationer.", "source": "https://ao-inc.com/", "products": "Lasere, optiske transceivere og netværksudstyr til optiske forbindelser og bredbåndsnet.", "customers": "Datacenter-, telekommunikations- og bredbåndskunder.", "role": "Omsætter elektriske signaler til lys og tilbage igen, så data kan transporteres gennem fibre.", "reviewedAt": "2026-10-08"}, "FR0013227113": {"name": "Soitec", "theme": "compute", "summary": "Producerer specialiserede halvledermaterialer. Materialerne bruges som grundlag for chips til blandt andet kommunikation, biler og andre elektroniske systemer.", "watch": "Kundernes lagre, chipbranchens cyklus og udnyttelse af produktionskapaciteten.", "source": "https://www.soitec.com/en/", "products": "Specialiserede halvledersubstrater, blandt andet silicon-on-insulator-materialer.", "customers": "Halvlederproducenter, som fremstiller chips på disse materialer.", "role": "Materialelaget under chippen: substratets egenskaber har betydning for den færdige komponents funktion.", "reviewedAt": "2026-10-08"}, "US67066G1040": {"name": "NVIDIA", "theme": "compute", "summary": "Udvikler GPU'er, netværksteknologi og software til accelereret databehandling. Produkterne bruges blandt andet til AI, grafik og videnskabelige beregninger.", "products": "GPU'er, computersystemer, netværk og softwareværktøjer som CUDA.", "customers": "Cloududbydere, virksomheder, forskningsmiljøer og producenter og brugere af computere.", "role": "Et sammenhængende hardware- og softwarelag til at udføre store beregninger parallelt.", "watch": "Kundekoncentration, eksportregler, produktionsafhængighed og konkurrence mellem chiparkitekturer.", "source": "https://www.nvidia.com/en-us/about-nvidia/", "reviewedAt": "2026-10-08"}, "US11135F1012": {"name": "Broadcom", "theme": "connect", "summary": "Leverer halvledere og infrastruktursoftware. Chipforretningen omfatter blandt andet netværk, forbindelser og kundetilpassede løsninger.", "products": "Netværks- og kommunikationschips, kundetilpassede chips samt software til virksomheders IT-infrastruktur.", "customers": "Store teknologi- og industrikunder samt virksomheder med kompleks IT-drift.", "role": "Forbinder og understøtter databehandling på tværs af chips, netværk og software.", "watch": "Koncentration hos store kunder, kundernes investeringscyklus og integration af opkøb.", "source": "https://investors.broadcom.com/", "reviewedAt": "2026-10-08"}, "US5951121038": {"name": "Micron Technology", "theme": "compute", "summary": "Producerer hukommelse og datalagring baseret på blandt andet DRAM og NAND.", "products": "Hukommelseschips og lagringsprodukter til datacentre, computere, mobile enheder, biler og industri.", "customers": "Producenter og operatører af elektroniske systemer.", "role": "Leverer både hurtig adgang til data under beregninger og lagring af data.", "watch": "Hukommelsespriser, lagercyklusser, kapitalbehov og produktionskapacitet.", "source": "https://www.micron.com/about", "reviewedAt": "2026-10-08"}, "US55405Y1001": {"name": "MACOM", "theme": "connect", "summary": "Leverer halvlederprodukter til blandt andet radiofrekvenser, mikrobølger og optiske forbindelser.", "products": "Analoge og blandede signalchips samt optiske halvlederløsninger.", "customers": "Kunder inden for telekommunikation, datacentre, industri og forsvar.", "role": "Bearbejder og flytter signaler i kommunikationssystemer.", "watch": "Kundernes investeringscyklus, produktkvalificering, ordrefordeling og teknologiudvikling.", "source": "https://ir.macom.com/", "reviewedAt": "2026-10-08"}, "US8610121027": {"name": "STMicroelectronics", "theme": "compute", "summary": "Producerer halvledere til blandt andet industri, biler og personlig elektronik.", "products": "Mikrocontrollere, sensorer, analoge chips og effekthalvledere.", "customers": "Bilindustrien, industrivirksomheder og producenter af elektronik.", "role": "Chips til at registrere, styre og omsætte signaler og elektrisk effekt i fysiske produkter.", "watch": "Bil- og industrikonjunkturer, kundernes lagre og udnyttelsen af fabrikkerne.", "source": "https://www.st.com/content/st_com/en/about/who-we-are.html", "reviewedAt": "2026-10-08"}, "US19247G1076": {"name": "Coherent", "theme": "connect", "summary": "Leverer fotonik, lasere, optiske komponenter og materialer til kommunikation og industri.", "products": "Optiske transceivere, lasere, optik og specialmaterialer.", "customers": "Datacenter- og kommunikationskunder samt industrielle producenter.", "role": "Lys bruges både til at transportere data og til at bearbejde og måle materialer.", "watch": "Produktmix, kundekoncentration, investeringscyklus og gennemførelse af produktionsændringer.", "source": "https://www.coherent.com/company", "reviewedAt": "2026-10-08"}, "US21873S1087": {"name": "CoreWeave", "theme": "energy", "summary": "Driver en cloudplatform med specialiseret infrastruktur til AI-beregninger.", "products": "GPU-beregning, lagring, netværk og software til at drive AI-arbejdsopgaver.", "customers": "Virksomheder og organisationer, som træner eller anvender AI-modeller.", "role": "Giver kunder adgang til beregningsinfrastruktur uden selv at eje hele datacenterløsningen.", "watch": "Kapitalbehov, gæld, kundekoncentration og udnyttelse af computerkapaciteten.", "source": "https://www.coreweave.com/", "reviewedAt": "2026-10-08"}, "NL0009805522": {"name": "Nebius", "theme": "energy", "summary": "Leverer cloudinfrastruktur og værktøjer til udvikling og brug af AI-modeller.", "products": "GPU-beregning, datacenterinfrastruktur og tilknyttede cloudtjenester.", "customers": "AI-udviklere og virksomheder med behov for beregningskapacitet.", "role": "Infrastrukturlaget mellem AI-modeller og de computere, der kører dem.", "watch": "Store investeringer, kapacitetsudnyttelse, energiforsyning og konkurrence mellem cloududbydere.", "source": "https://nebius.com/", "reviewedAt": "2026-10-08"}, "US0079031078": {"name": "AMD", "theme": "compute", "summary": "Udvikler processorer, GPU'er og tilpasningsbare chips til blandt andet datacentre og personlige computere.", "products": "CPU'er, GPU'er og tilpasningsbare systemchips med tilhørende software.", "customers": "Cloududbydere, computerproducenter og kunder inden for indlejrede systemer.", "role": "Beregningschips til både generelle programmer og specialiserede arbejdsopgaver.", "watch": "Konkurrence, produktgenerationer, eksterne produktionspartnere og kundernes efterspørgsel.", "source": "https://www.amd.com/en/corporate.html", "reviewedAt": "2026-10-08"}, "US69608A1088": {"name": "Palantir", "theme": "software", "summary": "Udvikler softwareplatforme til at samle data og understøtte beslutninger og arbejdsgange i organisationer.", "products": "Dataplatforme og værktøjer til at anvende data og AI i organisationers drift.", "customers": "Offentlige organisationer og private virksomheder.", "role": "Software mellem organisationens data og de personer og processer, som bruger dem.", "watch": "Store kontrakter, offentlige budgetter, konkurrence samt krav til datasikkerhed og ansvarlig anvendelse.", "source": "https://www.palantir.com/platforms/", "reviewedAt": "2026-10-08"}, "US30303M1027": {"name": "Meta Platforms", "theme": "platforms", "summary": "Driver blandt andet Facebook, Instagram, Messenger og WhatsApp. Koncernen arbejder også med enheder og software til virtuelle og udvidede oplevelser.", "products": "Sociale og kommunikative platforme samt digitale annoncer og teknologi til virtuelle oplevelser.", "customers": "Brugere af platformene og annoncører, der køber adgang til målgrupper.", "role": "Digitale platforme med omfattende software-, AI- og datacenterinfrastruktur.", "watch": "Annonceefterspørgsel, konkurrence om opmærksomhed, persondataregler og store infrastrukturinvesteringer.", "source": "https://investor.atmeta.com/", "reviewedAt": "2026-10-08"}, "US75734B1008": {"name": "Reddit", "theme": "platforms", "summary": "Driver en platform med brugeroprettede fællesskaber, samtaler og indhold.", "products": "Digitale fællesskaber, annoncering og adgang til platformens indhold gennem aftaler og tjenester.", "customers": "Brugere og annoncører samt virksomheder med aftaler om adgang til indhold.", "role": "Organiserer menneskeskabt indhold og diskussioner i emnebaserede fællesskaber.", "watch": "Brugeraktivitet, moderation, annonceindtægter, datalicenser og afhængighed af søgetrafik.", "source": "https://investor.redditinc.com/", "reviewedAt": "2026-10-08"}};
// Website-first composition. Presentation only: no mutation of financial data.
const r5Style=document.createElement('style');r5Style.id='v2-website-round5';
r5Style.textContent=`
#r5-intro{display:block;margin:18px 0 28px;max-width:850px}#r5-intro .eyebrow{color:#9dc6c7;letter-spacing:.15em;font-size:11px}#r5-intro h1{font-size:clamp(32px,4vw,52px);line-height:1.12;letter-spacing:-.035em;margin:8px 0 14px;font-weight:600}#r5-intro h1 span{color:#a6d9d2}#r5-intro p:last-child{color:#b9ccd0;max-width:65ch;line-height:1.65;font-size:16px;margin:0}
.v2-badge{border:0!important;border-bottom:1px solid #304750!important;border-radius:0!important;padding:8px 0!important;color:#9ab5bd!important;font-size:11px!important;letter-spacing:.025em}
#headline{margin:26px 0 0!important;gap:0!important;padding:22px 24px!important;background:#10232a;border:1px solid #304952;border-bottom:0;border-radius:14px 14px 0 0;grid-template-columns:1.4fr 1.15fr .85fr .9fr!important}
#headline .metric{padding:0 20px!important;border:0!important;border-left:1px solid #365059!important;border-radius:0!important;background:none!important;box-shadow:none!important}#headline .metric:first-child{padding-left:0!important;border-left:0!important}#headline .metric>.label{min-height:36px;font-size:13px!important;line-height:1.4!important}#headline .value{font-size:34px!important;line-height:1.25!important;font-weight:600!important;letter-spacing:-.025em}#headline .v2-cagr .value{color:#a6d9d2}#headline .metric:nth-child(n+3) .value{font-size:26px!important}#headline .sub{font-size:11px!important;line-height:1.5!important;margin-top:6px!important}#r2-history-warning{margin:0!important;padding:0 24px 20px!important;border:1px solid #304952;border-top:0;border-radius:0 0 14px 14px;background:#10232a;font-size:12px!important;line-height:1.6}
#r5-performance{display:grid;grid-template-columns:minmax(0,2.1fr) minmax(280px,1fr);gap:0;background:#11252c;border:1px solid #304952;border-radius:14px;overflow:hidden;margin:18px 0 0}
#r5-performance>.panel{border:0!important;margin:0!important;border-radius:0!important;padding:24px!important;min-width:0;box-shadow:none!important;background:transparent!important}#r5-performance>#investment-example{background:#183137!important;border-left:1px solid #39545b!important}
#overview>.primary-chart{display:flex!important;flex-direction:column!important;gap:20px!important;margin-top:0!important}
#r5-performance #growth-controls{gap:10px!important;padding:10px 0!important;margin:14px 0!important;align-items:center!important}#r5-performance #growth-controls .segmented:before{display:none!important}#r5-performance #growth-controls>div>span:first-child{display:none!important}#r5-performance #growth-controls button{min-height:36px;padding:7px 10px!important;font-size:12px!important}#r5-performance #growth-controls>.segmented{display:flex!important;gap:3px!important;flex-wrap:wrap}
#r5-performance .r3-growth-header h2{font-size:23px!important}#r5-performance #asof{font-size:11px!important;max-width:170px}#r5-performance #growth svg{min-height:0!important;height:auto!important;max-height:340px;aspect-ratio:1000/410}#r5-performance #growth{min-height:0!important}#r5-performance .return-legend{gap:14px!important;font-size:13px!important;flex-wrap:wrap}#r5-performance .return-legend strong{font-size:22px!important}#r5-performance p{font-size:12px;line-height:1.6}#r5-performance #v2-compare{font-size:12px!important;line-height:1.6;margin:10px 0!important}#r5-performance #r2-legal-link{font-size:12px!important;padding:10px 12px!important}
#investment-example{display:flex!important;flex-direction:column;justify-content:flex-start!important;gap:0!important}#investment-example h2{font-size:21px!important;line-height:1.3;margin:0 0 7px!important}#investment-example .investment-comparison{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:12px!important;margin:22px 0!important}#investment-example .investment-start strong{font-size:23px!important;color:#c2d6d7!important}#investment-example .investment-start span,#investment-example .investment-end span{font-size:12px!important}#investment-example .investment-start small,#investment-example .investment-end>small{font-size:12px!important;margin-top:5px!important}#investment-example .investment-end strong{font-size:clamp(33px,3.3vw,46px)!important;line-height:1.2!important;color:#f2f7f5}#investment-example .investment-end strong small{font-size:19px!important}#investment-example .investment-arrow{font-size:23px!important;transform:rotate(90deg);line-height:1;margin-left:4px;color:#a6d9d2}#investment-example .investment-cagr{display:none!important}#investment-example .investment-net{font-size:13px!important;margin:12px 0!important;padding:9px 0;border-top:1px solid #426066;border-bottom:1px solid #426066;color:#bee4dc}#investment-example .investment-footnote{font-size:11px!important;line-height:1.6!important;margin:10px 0 0!important;padding:0!important;border:0!important;color:#b8cdd0}#r5-value-gain{color:#b6ddd6;margin:14px 0 0!important;font-size:13px!important}#r5-value-gain b{font-weight:600}
#v2-calendar{margin:0!important;padding:22px!important}#v2-calendar .panelhead{margin-bottom:12px!important}#v2-calendar h2{font-size:22px!important}#v2-calendar th,#v2-calendar td{padding:10px 6px!important;font-size:12px!important}#v2-calendar #calendar th:first-child{min-width:150px;padding:10px!important}.r3-year-value{font-size:13px!important}#r3-calendar-note{font-size:11px!important}
#r5-holdings{display:grid!important;grid-template-columns:minmax(235px,.85fr) minmax(0,1.75fr);gap:20px 38px;padding:26px!important}#r5-holdings>h2{grid-column:1/-1;margin:0!important;font-size:24px!important}#r5-holdings #concentration{grid-column:1;grid-row:2;display:grid!important;grid-template-columns:1fr 1fr;gap:14px!important;margin:0!important}#r5-holdings #concentration .value{font-size:28px!important}#r5-holdings #concentration .label{font-size:12px!important;line-height:1.45}#r5-holdings #concentration .sub{font-size:11px!important}#r5-holdings #spread-visual{grid-column:1;grid-row:3;margin:0!important}#r5-holdings #spread-visual p{font-size:12px!important}#r5-holdings #topmini{grid-column:2;grid-row:2/5;margin:0!important;align-self:start}#r5-holdings #topmini .barrow{margin-bottom:14px!important}#r5-holdings #topmini p{font-size:11px!important;grid-column:1/-1!important;width:auto!important;max-width:none!important}#r5-holdings .preview-positions-link{grid-column:1;grid-row:4;align-self:start;width:100%;text-align:center;padding:12px!important;font-size:14px!important}#r5-holdings>p{grid-column:1/-1;margin:0!important;font-size:11px!important}#r5-holdings a.r5-company-link{color:#eaf2f2;text-decoration:none;border-bottom:1px dotted #86b6b9}#r5-holdings a.r5-company-link:hover{color:#a6d9d2}
#r5-themes{margin:22px 0;padding:24px;border:1px solid #39515a;border-radius:12px;background:#10242a}#r5-themes h2{font-size:25px;margin:4px 0 10px}#r5-themes>p{font-size:14px;line-height:1.6;max-width:78ch}#r5-theme-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:18px}.r5-theme{padding:18px;border:1px solid #3b5359;border-radius:10px;background:#152e34}.r5-theme h3{font-size:16px;margin:0 0 6px!important}.r5-theme p{font-size:12px;line-height:1.55;color:#b7cdd0;margin:0 0 12px}.r5-theme a{display:inline-block;color:#c2e5de;text-decoration:underline;text-underline-offset:3px;line-height:1.8;margin-right:12px;font-size:13px}.r5-theme .theme-no{font-size:11px;letter-spacing:.12em;color:#98b9be;display:block;margin-bottom:10px}
@media(max-width:1050px){#r5-performance{grid-template-columns:minmax(0,1.8fr) minmax(260px,1fr)}#r5-performance>.panel{padding:20px!important}#r5-performance #asof{text-align:left!important}.r3-growth-header{flex-wrap:wrap}#headline{grid-template-columns:1.3fr 1.2fr .9fr .9fr!important}#headline .value{font-size:29px!important}#headline .metric{padding:0 12px!important}#r5-holdings{gap:18px!important}}
@media(max-width:820px){#r5-performance{grid-template-columns:1fr}#r5-performance>#investment-example{border-left:0!important;border-top:1px solid #39545b!important}#investment-example .investment-comparison{display:grid!important;grid-template-columns:1fr 28px 1.5fr;align-items:center!important;margin:18px 0!important}#investment-example .investment-arrow{transform:none}#investment-example .investment-end strong{font-size:39px!important}#r5-holdings{grid-template-columns:1fr!important}#r5-holdings>*{grid-column:1!important;grid-row:auto!important}#r5-holdings #topmini{grid-row:auto!important}#r5-theme-grid{grid-template-columns:1fr 1fr}#headline{grid-template-columns:1fr 1fr!important;gap:18px 0!important}#headline .metric:nth-child(3){border-left:0!important;padding-left:0!important}#headline .metric>.label{min-height:0}#headline .value{font-size:32px!important}}
@media(max-width:520px){#r5-intro{margin:12px 0 22px}#r5-intro h1{font-size:35px}#r5-intro p:last-child{font-size:14px}#headline{padding:18px!important}#r2-history-warning{padding:0 18px 18px!important}#headline .value{font-size:29px!important}#headline .metric:nth-child(n+3) .value{font-size:23px!important}#r5-performance>.panel,#r5-holdings,#v2-calendar{padding:18px!important}#investment-example .investment-comparison{grid-template-columns:1fr!important;gap:12px!important}#investment-example .investment-arrow{transform:rotate(90deg)}#r5-holdings #topmini{display:grid!important;grid-template-columns:1fr!important;gap:0!important}#r5-holdings #topmini>*{grid-column:1!important}#r5-theme-grid{grid-template-columns:1fr}#r5-performance #growth-controls button{min-height:40px}#r5-performance #growth svg{aspect-ratio:auto;height:235px!important}#r5-performance .return-legend strong{font-size:19px!important}#r5-themes{padding:18px}.r5-theme{padding:16px}}
`;document.head.append(r5Style);
r5Style.textContent+=`.r5-value-split{margin:20px 0!important;padding:15px 0;border-top:1px solid #426066}.r5-value-split .split-track{display:flex;height:14px;overflow:hidden;border-radius:4px;margin:10px 0}.r5-value-split .split-track i:first-child{background:#729396}.r5-value-split .split-track i:last-child{background:#b4dfd4}.r5-value-split .split-labels{display:flex;justify-content:space-between;gap:16px;font-size:11px;line-height:1.5;color:#c1d6d7}.r5-value-split strong{display:block;font-size:15px;color:#e7f2ef}.r5-value-split>p{font-size:12px!important;margin:0!important}#r5-holdings #topmini .retail-position>span{overflow:visible!important;white-space:normal!important;text-overflow:clip!important;font-size:13px!important}#r5-holdings #topmini .retail-position{min-width:0!important}#r5-holdings #topmini .retail-position strong{white-space:nowrap;font-size:13px!important}`;
const r5CompanyBase='https://ndigrafdatab5174313.blob.core.windows.net/graph/v2-test/selskab.html';
function r5CompanyUrl(isin){return r5CompanyBase+'?isin='+encodeURIComponent(isin)+'&fund='+encodeURIComponent(data.funds[selected].id)}
function r5Composition(){
 if(!data)return;
 const main=document.querySelector('main'),controls=document.querySelector('.controls');
 if(!document.getElementById('r5-intro')&&controls){const intro=document.createElement('section');intro.id='r5-intro';intro.innerHTML='<p class="eyebrow">DIT INDBLIK I NEWDEAL INVEST</p><h1>Se fonden.<br><span>Forstå selskaberne.</span></h1><p>En aktivt forvaltet portefølje af teknologi- og vækstaktier fra hele verden. Begynd med din afdeling, følg udviklingen og se selskaberne bag tallene.</p>';controls.before(intro)}
 const growth=document.getElementById('growth')?.closest('article'),investment=document.getElementById('investment-example'),grid=document.querySelector('#overview .primary-chart'),cal=document.getElementById('v2-calendar');
 if(!growth||!investment||!grid)return;
 let composition=document.getElementById('r5-performance');if(!composition){composition=document.createElement('div');composition.id='r5-performance';grid.prepend(composition)}
 if(growth.parentElement!==composition)composition.prepend(growth);
 if(investment.parentElement!==composition)composition.append(investment);
 if(cal&&cal.parentElement!==grid)grid.append(cal);if(cal&&composition.nextElementSibling!==cal)composition.after(cal);
 const concentration=document.getElementById('concentration')?.closest('article');if(concentration){concentration.id='r5-holdings';if(cal&&cal.nextElementSibling!==concentration)cal.after(concentration);r3Text(concentration.querySelector('h2'),'Mange selskaber. Ingen dominerende enkeltposition.');}
 const f=data.funds[selected],value=100000*f.data.at(-1).total/f.data[0].total;
 let gain=document.getElementById('r5-value-gain');if(!gain){gain=document.createElement('p');gain.id='r5-value-gain';investment.querySelector('.investment-comparison')?.after(gain)}
 const html='<b>'+(value>=100000?'+':'−')+n(Math.abs(value-100000),0)+' kr.</b> i samlet værdiændring siden start.';if(gain.innerHTML!==html)gain.innerHTML=html;
 let split=document.getElementById('r5-value-split');if(!split){split=document.createElement('div');split.id='r5-value-split';split.className='r5-value-split';gain.after(split)}
 const splitHtml=value>=100000?'<p>Slutværdien i eksemplet</p><div class="split-track" aria-hidden="true"><i style="flex:100000"></i><i style="flex:'+(value-100000)+'"></i></div><div class="split-labels"><span>Indskud ved start<strong>100.000 kr.</strong></span><span>Samlet værdiændring<strong>'+n(value-100000,0)+' kr.</strong></span></div>':'';if(split.innerHTML!==splitHtml)split.innerHTML=splitHtml;split.hidden=value<100000;
 r3Text(investment.querySelector('h2'),'Fra 100.000 kr. til …');
 const top=document.getElementById('topmini');if(top){top.querySelectorAll('a.r5-company-link').forEach(a=>a.href=r5CompanyUrl(a.dataset.isin));const rows=[...top.querySelectorAll('.retail-position')];const positions=f.positions.filter(p=>/^[A-Z]{2}[A-Z0-9]{10}$/.test(p.isin||'')&&p.weight>0).sort((a,b)=>b.weight-a.weight).slice(0,10);rows.forEach((row,i)=>{const label=row.querySelector('span');if(!label||!positions[i])return;if(!label.querySelector('a')){const a=document.createElement('a');a.className='r5-company-link';a.dataset.isin=positions[i].isin;a.href=r5CompanyUrl(positions[i].isin);a.target='_blank';a.rel='noopener noreferrer';a.textContent=label.textContent;label.replaceChildren(a)}})}
 const tbody=document.querySelector('#calendar tbody');if(tbody){const rows=[...tbody.rows],ordered=rows.slice().sort((a,b)=>Number(b.cells[0].dataset.r3Year)-Number(a.cells[0].dataset.r3Year));if(rows.some((r,i)=>r!==ordered[i]))tbody.append(...ordered)}
 r5Themes();notifyHeight();
}
function r5Themes(){
 const section=document.getElementById('portfolio');if(!section||!data)return;
 let panel=document.getElementById('r5-themes');if(!panel){panel=document.createElement('article');panel.id='r5-themes';section.prepend(panel)}
 const themes={compute:['Chips & beregning','Processorer, hukommelse og materialerne bag.'],connect:['Data & forbindelser','Komponenter, der flytter information.'],software:['Software & AI','Digitale værktøjer og deres anvendelse.'],physical:['Fysisk teknologi','Produktion, automatisering og elektrificering.'],energy:['Energi & datacentre','Den fysiske infrastruktur bag digitaliseringen.'],space:['Rum & satellitter','Opsendelser og kommunikation fra rummet.'],platforms:['Digitale platforme','Teknologi, der forbinder kunder og markeder.']};
 const positions=data.funds[selected].positions,groups=Object.entries(themes).map(([key,t])=>({key,t,rows:positions.filter(p=>r5Profiles[p.isin]?.theme===key).sort((a,b)=>b.weight-a.weight)})).filter(g=>g.rows.length);
 const count=groups.reduce((s,g)=>s+g.rows.length,0);
 const html='<span class="eyebrow">TEKNOLOGI ER MERE END ÉN SEKTOR</span><h2>Fra chips til det, chipsene gør muligt.</h2><p>Teknologi går på tværs af traditionelle sektorer. Her er '+count+' beskrevne selskaber fra den valgte afdeling, samlet efter deres rolle i værdikæden. Vælg et selskab for at se mere.</p><div id="r5-theme-grid">'+groups.map((g,i)=>'<section class="r5-theme"><span class="theme-no">0'+(i+1)+'</span><h3>'+g.t[0]+'</h3><p>'+g.t[1]+'</p>'+g.rows.map(p=>'<a target="_blank" rel="noopener noreferrer" href="'+r5CompanyUrl(p.isin)+'">'+esc(r5Profiles[p.isin].name)+'</a>').join('')+'</section>').join('')+'</div><p class="small muted">Et udvalg til at forstå forretningerne — ikke en fuld fordeling af fonden eller en GICS-klassifikation. Temaerne bygger på selskabernes beskrivelser og kan overlappe. Hele beholdningslisten og den separate sektorfordeling findes nedenfor.</p>';
 if(panel.innerHTML!==html)panel.innerHTML=html;
}
const r5PriorHoldings=holdings;holdings=function(){r5PriorHoldings();document.querySelectorAll('#holdings tr').forEach(row=>{const cell=row.cells[0],isin=cell?.querySelector('small')?.textContent,p=data.funds[selected].positions.find(p=>p.isin===isin);if(!p||!isin)return;let link=cell.querySelector('a');if(!link){link=document.createElement('a');link.textContent=p.name;cell.childNodes[0]?.remove();cell.prepend(link)}link.href=r5CompanyUrl(isin);link.target='_blank';link.rel='noopener noreferrer';link.className='v2-source-link';link.title='Se selskab og daterede kursoplysninger';})};
const r5PriorHistory=v2History;v2History=function(f,box){r5PriorHistory(f,box);r3Text(box.querySelector('.v4-intro'),'Start med fonden øverst: Når kurven når 0 %, er den samlede investering tilbage på sin hidtil højeste værdi (ATH). De gule prikker viser disse rekordniveauer. Sammenlign derefter med aktierne nedenunder — de har hver deres top og tæller her lige meget, uanset hvor meget fonden ejer.');r3Text(box.querySelector('.v4-meaning'),'En aktie kan være langt fra sin egen top, samtidig med at fonden sætter rekord. Andre aktier kan have løftet det samlede afkast, og både positionernes størrelse, handler og geninvesteret udbytte spiller ind. De to figurer besvarer derfor forskellige spørgsmål, ikke to versioner af det samme.')};
const r5PriorLayout=v2Layout;v2Layout=function(){r5PriorLayout();r5Composition()};
const r5PriorSummary=v2Summary;v2Summary=function(){r5PriorSummary();r5Composition()};
if(typeof data!=='undefined'&&data){r5Composition();holdings();renderHighs(data.funds[selected],highData)}

// A closed market is not missing trading-day data. Rebase only from the last
// verified close before a documented closure. Never alter the fund or source.
// Nasdaq 2026 calendar: https://www.nasdaqtrader.com/Trader.aspx?id=Calendar
const r6NasdaqClosures=new Set(['2026-01-01','2026-01-19','2026-02-16','2026-04-03','2026-05-25','2026-06-19','2026-07-03','2026-09-07','2026-11-26','2026-12-25']);
function r6ClosedDate(d){const day=new Date(d+'T12:00:00Z').getUTCDay();return day===0||day===6||r6NasdaqClosures.has(d)}
const r6OriginalComparison=comparisonPoints;
comparisonPoints=function(fund,period,source){
 const points=r6OriginalComparison(fund,period,source);
 if(points.length<2||Number.isFinite(points[0].index)||!source?.validated)return points;
 const start=points[0].d;if(!r6ClosedDate(start))return points;
 const rows=source.rows||[],base=rows.filter(r=>r.d<start&&Number.isFinite(r.v)&&r.v>0).at(-1);
 if(!base||Date.parse(start)-Date.parse(base.d)>4*86400000)return points;
 for(let t=Date.parse(base.d)+86400000;t<=Date.parse(start);t+=86400000){if(!r6ClosedDate(new Date(t).toISOString().slice(0,10)))return points}
 const byDate=new Map(rows.map(r=>[r.d,r.v]));
 const result=points.map((p,i)=>({...p,index:i===0?100:(byDate.has(p.d)?100*byDate.get(p.d)/base.v:null)}));
 result.r6IndexBaseDate=base.d;return result;
};
const r6OriginalDraw=drawNasdaq;
drawNasdaq=function(){
 r6OriginalDraw();if(growthView!=='total'||!data)return;
 const points=comparisonPoints(data.funds[selected],growthPeriod,window.NDI_NASDAQ),note=document.getElementById('nasdaq-note');
 if(!points.r6IndexBaseDate||!note)return;
 const label=d=>new Date(d+'T12:00:00Z').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'});
 const explanation='Nasdaq var lukket ved periodens start den '+label(points[0].d)+'. Sammenligningen bruger derfor det senest observerede indeksniveau i DKK fra '+label(points.r6IndexBaseDate)+' som startgrundlag (0 %). Det er en reference, ikke en ny kursobservation. Fondens datoer og afkast er uændrede.';
 note.innerHTML=note.innerHTML.replace('Begge serier starter ved 0 % på samme dato og medregner geninvesteret udbytte i DKK.','Begge afkast medregner geninvesteret udbytte i DKK.').replace('Manglende observationer udfyldes ikke;','Efter startgrundlaget udfyldes manglende observationer ikke;');
 const p=document.createElement('p');p.textContent=explanation;note.append(p);
};
// The base app had captured its original four-column renderer in oninput.
// Resolve the current enhanced renderer when typing, preserving company links,
// dated market data, country filters and all ten table columns.
const r6Search=document.getElementById('search');
if(r6Search)r6Search.oninput=()=>{holdings();notifyHeight()};
if(typeof data!=='undefined'&&data)drawProductionGrowth();

// UX review, 11 October: presentation only; no financial-data changes.
const r7Style=document.createElement('style');r7Style.id='v2-round7-ux';
r7Style.textContent=`
#investment-example .investment-comparison{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr)!important;gap:24px!important}#investment-example .investment-arrow{display:none!important}#investment-example .investment-start{grid-column:1!important}#investment-example .investment-end{grid-column:2!important}
@media(max-width:480px){#investment-example .investment-comparison{grid-template-columns:minmax(0,1fr)!important}#investment-example .investment-end{grid-column:1!important}}
#investment-example .investment-start,#investment-example .investment-end{width:100%!important;min-width:0!important;max-width:none!important;flex:none!important}
#investment-example .investment-start>span,#investment-example .investment-end>span,#investment-example .investment-end>small{display:block;width:auto!important;max-width:none!important;white-space:normal!important;word-break:normal!important}
#investment-example h2{overflow:visible!important;text-overflow:clip!important;white-space:normal!important}
#r5-performance #growth-controls button{min-height:44px!important}
.tablewrap{max-width:100%;min-width:0;overflow:auto!important;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}
.r7-holdings-scroll{max-height:580px;scrollbar-gutter:stable;overscroll-behavior-y:auto;border:1px solid #36515a;border-radius:8px}
.r7-holdings-scroll thead th{position:sticky;top:0;z-index:2;background:#152930}
.r7-scroll-hint{color:#b9d2d6;font-size:13px;line-height:1.5;margin:10px 0}
.r7-holdings-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:14px 0}
.r7-holdings-actions button,#holdings-more{min-height:44px;padding:10px 16px;border:1px solid #92bec1;border-radius:8px;background:#203b44;color:#eff6f7;cursor:pointer}
.tablewrap:focus-visible,.r7-focus:focus-visible{outline:2px solid #a6d9d2;outline-offset:4px}
.r7-focus{scroll-margin-top:24px}.r7-arrived{outline:2px solid #a6d9d2;outline-offset:5px}
@media(max-width:1050px){#r5-performance{grid-template-columns:minmax(0,1fr)!important}#r5-performance>#investment-example{border-left:0!important;border-top:1px solid #39545b!important}}
@media(max-width:600px){.tablewrap{width:100%!important}#calendar th:first-child,#calendar td:first-child{position:sticky;left:0;background:#152930;z-index:1;min-width:116px!important}.r7-holdings-scroll{max-height:480px}.r7-holdings-scroll th:first-child,.r7-holdings-scroll td:first-child{position:sticky;left:0;background:#152930;min-width:145px;max-width:180px;white-space:normal;z-index:1}.r7-holdings-scroll thead th:first-child{z-index:3}}
`;document.head.append(r7Style);
const r7Date=s=>s.replace(/\b\d{4}-\d{2}-\d{2}\b/g,d=>{const dt=new Date(d+'T12:00:00Z');return Number.isNaN(dt.getTime())?d:dt.toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'})});
function r7Dates(root){if(!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let t;while(t=w.nextNode()){if(t.parentElement?.closest('script,style,input,textarea'))continue;const next=r7Date(t.nodeValue);if(next!==t.nodeValue)t.nodeValue=next}root.querySelectorAll('[title]').forEach(el=>{const next=r7Date(el.title);if(el.title!==next)el.title=next})}
function r7Tables(){
 const body=document.getElementById('holdings'),wrap=body?.closest('.tablewrap');
 if(wrap){
  wrap.classList.add('r7-holdings-scroll');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Beholdninger. Rul for at se flere rækker og kolonner.');
  let bar=document.getElementById('r7-holdings-actions');
  if(!bar){bar=document.createElement('div');bar.id='r7-holdings-actions';bar.className='r7-holdings-actions';const text=document.createElement('span');text.className='r7-scroll-hint';text.textContent='Rul i tabellen for flere rækker. På små skærme kan du også rulle til siden →';const button=document.createElement('button');button.type='button';button.id='r7-holdings-toggle';button.setAttribute('aria-controls','holdings');button.onclick=()=>{allHoldings=!allHoldings;limitHoldings();wrap.scrollTop=0;wrap.focus({preventScroll:true})};bar.append(text,button);wrap.before(bar)}
  const btn=document.getElementById('r7-holdings-toggle'),count=body.rows.length;btn.hidden=count<=10;btn.textContent=allHoldings?'Vis kun de første 10':'Se alle '+count+' positioner';btn.setAttribute('aria-expanded',String(allHoldings));
  const bottom=document.getElementById('holdings-more');if(bottom){bottom.textContent=btn.textContent;bottom.setAttribute('aria-expanded',String(allHoldings))}
 }
 const calendar=document.getElementById('calendar')?.closest('.tablewrap');
 if(calendar){calendar.tabIndex=0;calendar.setAttribute('role','region');calendar.setAttribute('aria-label','Afkastkalender. Rul vandret for at se alle måneder.');if(!document.getElementById('r7-calendar-hint')){const hint=document.createElement('p');hint.id='r7-calendar-hint';hint.className='r7-scroll-hint';hint.textContent='På små skærme: Rul til siden for at se alle måneder →';calendar.after(hint)}const hint=document.getElementById('r7-calendar-hint');hint.hidden=calendar.scrollWidth<=calendar.clientWidth+2;}
 for(const id of ['holdings','global-disclaimer','calendar','method-content','growth-period-result'])r7Dates(document.getElementById(id));
}
const r7PreviousLimit=limitHoldings;limitHoldings=function(){r7PreviousLimit();r7Tables()};
const r7PreviousHoldings=holdings;holdings=function(){r7PreviousHoldings();r7Tables()};
const r7PreviousLayout=v2Layout;v2Layout=function(){r7PreviousLayout();r7Tables()};
const r7PreviousScroll=scrollToSection;scrollToSection=function(target){if(!target)return;const heading=target.querySelector('h2,h3')||target;heading.tabIndex=-1;heading.classList.add('r7-focus','r7-arrived');heading.focus({preventScroll:true});setTimeout(()=>heading.classList.remove('r7-arrived'),1800);r7PreviousScroll(target)};
if(typeof data!=='undefined'&&data)r7Tables();

// Review round 2: presentation only, preserve all underlying observations.
const r8Style=document.createElement('style');r8Style.id='v2-round8-ux';
r8Style.textContent=`
#holdings-more{display:none!important}
#r2-legal-link,.sector-legend button{min-height:44px!important}
#r5-performance>#investment-example{align-self:start;min-height:0!important;height:auto!important}
#r5-performance{background:linear-gradient(90deg,#11252c 67.74%,#183137 67.74%)}
.r8-jumps{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 24px;padding:16px;border:1px solid #39545b;border-radius:12px;background:#10232a}
.r8-jumps p{flex-basis:100%;margin:0 0 4px;color:#b9d2d6;font-size:13px}
.r8-jumps button{min-height:44px;padding:10px 14px;border:1px solid #72999e;border-radius:7px;background:transparent;color:#eaf2f2;cursor:pointer}
.r8-jumps button:hover,.r8-jumps button:focus-visible{background:#24434b;outline:2px solid #a6d9d2;outline-offset:2px}
#detail-toggle[aria-expanded="false"]+.r8-jumps{display:none}
@media(max-width:1050px){#r5-performance{background:#11252c}}
`;
document.head.append(r8Style);
function r8Refresh(){
 const investment=document.getElementById('investment-example'),value=investment?.querySelector('.investment-end strong')?.textContent;
 if(value)r3Text(investment.querySelector('h2'),'Fra 100.000 kr. til '+value.replace(/\s+/g,' ').trim());
 document.querySelector('nav[aria-label="Fordyb dig i fonden"]')?.remove();
 const anchor=document.getElementById('detail-toggle');
 if(anchor&&!document.getElementById('r8-jumps')){
  const bar=document.createElement('div');bar.id='r8-jumps';bar.className='r8-jumps';bar.setAttribute('role','navigation');bar.setAttribute('aria-label','Genveje i den udvidede visning');
  const title=document.createElement('p');title.textContent='Gå direkte til det, du vil undersøge';bar.append(title);
  for(const [id,label] of [['preview-risk-summary','Afkast og risiko'],['highs','Afstand til toppen'],['risk','Nedture og stigninger'],['portfolio','Selskaber og fordeling'],['holdings','Alle positioner'],['method','Data og metode'],['important-information','Vigtig information']]){
   const button=document.createElement('button');button.type='button';button.textContent=label;button.onclick=()=>{const target=document.getElementById(id);if(target)scrollToSection(target)};bar.append(button);
  }
  anchor.after(bar);
 }
 r7Dates(document.getElementById('growth'));
}
const r8PriorComposition=r5Composition;r5Composition=function(){r8PriorComposition();r8Refresh()};
// Date labels include dynamically replaced SVG axes and pointer tooltips.
const r8Growth=document.getElementById('growth');
if(r8Growth)new MutationObserver(()=>r7Dates(r8Growth)).observe(r8Growth,{subtree:true,childList:true,characterData:true});
// One animation-frame batch, not a resettable timeout: report final synchronous
// layout promptly while preserving the width-only resize safeguard.
let r8HeightFrame=0;
notifyHeight=function(){clearTimeout(v2HeightTimer);if(r8HeightFrame)return;r8HeightFrame=requestAnimationFrame(()=>{r8HeightFrame=0;v2SendSettledHeight()})};
r8Refresh();notifyHeight();


const mobileLayout=document.createElement("style");mobileLayout.id="v2-mobile-layout-20261013";mobileLayout.textContent="/* Mobile-only layout; no financial data or calculations are changed. */\n@media(max-width:600px){\n main{padding-left:0!important;padding-right:0!important}\n #r5-performance{border-left:0!important;border-right:0!important;border-radius:0!important}\n #r5-performance>.panel{padding:16px 8px!important}\n #r5-performance #growth{width:100%;min-width:0}\n #r5-performance #growth svg{display:block;width:100%!important;height:auto!important;aspect-ratio:auto!important;max-height:none!important}\n #r5-performance .return-legend{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);gap:10px!important;margin:12px 0!important}\n #r5-performance .return-legend>div{min-width:0!important;padding-left:8px!important}\n #r5-performance .return-legend span{font-size:12px!important;line-height:1.45}\n #r5-performance .return-legend strong{font-size:22px!important}\n #r5-performance #growth-controls{display:flex!important;flex-direction:column;align-items:stretch!important;gap:8px!important}\n #r5-performance #growth-controls .segmented{gap:4px!important;justify-content:flex-start!important}\n #r5-performance #growth-controls button{min-height:44px!important;padding:7px 9px!important}\n #r5-performance p{font-size:13px;line-height:1.65}\n #r5-performance .growth-tooltip{font-size:12px!important;min-height:40px!important}\n #r5-holdings,#v2-calendar{padding:16px 10px!important}\n #class-options{padding:12px 8px!important}\n #r5-performance #investment-example{padding:20px 12px!important}\n}\n";document.head.append(mobileLayout);
// Investor review 13 October. Presentation only; source observations untouched.
const r9Style=document.createElement('style');r9Style.id='v2-review-20261013';r9Style.textContent=`
#r5-intro{margin:12px 0 18px}#r5-intro h1{font-size:clamp(28px,3vw,40px);margin:6px 0 10px}#r5-intro h1 br{display:none}#r5-intro h1 span:before{content:' '}
#r9-headline-title{font-size:19px;margin:22px 0 6px}#r9-headline-title+p{margin:0;color:#b9ccd0;font-size:13px}
#headline{margin-top:12px!important}.r9-explain{font-size:13px;line-height:1.6;font-weight:400;color:#c3d9dc;margin-top:8px}.r9-explain summary{cursor:pointer;min-height:36px;display:flex;align-items:center;color:#aeddd8}.r9-explain summary:focus-visible{outline:2px solid #aeddd8}.r9-explain p{margin:4px 0 8px!important;font-size:13px!important}
#r9-risk-glance{padding:18px 0;border-top:1px solid #3c555c;margin-top:20px}#r9-risk-glance h3{font-size:17px;margin:0 0 12px}.r9-risk-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.r9-risk-grid strong{font-size:25px;display:block;color:#f0ce99;margin:6px 0}.r9-risk-grid span{font-size:13px;color:#c0d4d7}#r9-risk-glance p{margin:10px 0 0!important}#r2-legal-link{border:1px solid #799fa4!important;border-radius:7px!important;text-decoration:none!important;background:#19343c!important}
@media(max-width:600px){#r5-intro{padding:0 10px}#r5-intro h1{font-size:28px}#r5-intro p:last-child{font-size:14px}#r9-headline-title{padding:0 10px;font-size:18px}#r9-headline-title+p{padding:0 10px}#class-options [data-class]{padding:12px!important}#class-options [data-class]>span,#class-options [data-class] .v2-buy{font-size:14px!important;line-height:1.45!important}#headline .sub{font-size:12px!important}.r9-risk-grid{gap:12px}}
`;document.head.append(r9Style);
const r9Glossary={
 'Gennemsnitligt årligt afkast':'Det årlige afkast, der ville give samme samlede resultat, hvis afkastet var ens hvert år. Det er en omregning af historikken, ikke det afkast fonden har givet hvert år.',
 'Største observerede fald':'Det største fald fra en tidligere top til en efterfølgende bund i fondens samlede totalafkast. Målingen starter ved klassens første observation.',
 'Afstand til højeste top':'Hvor langt fondens samlede totalafkast er under sin hidtil højeste værdi. Ved 0 % er den tidligere top nået eller overgået.',
 'Årlig volatilitet':'Et mål for størrelsen af afkastets udsving, både op og ned. Et højere tal betyder større historiske udsving.',
 'Sharpe-ratio':'Afkast ud over den anvendte risikofri rente, målt i forhold til udsvingene. Her bruges Nationalbankens danske dag-til-dag-rente, DESTR.'
};
function r9Refresh(){
 if(!data)return;
 const f=data.funds[selected],head=document.getElementById('headline');
 if(head&&!document.getElementById('r9-headline-title')){const h=document.createElement('h2');h.id='r9-headline-title';h.textContent='Fondens afkast over forskellige perioder';const p=document.createElement('p');p.textContent='I danske kroner efter løbende omkostninger, før skat.';head.before(h,p)}
 document.querySelectorAll('#headline .metric,#riskmetrics .metric').forEach(card=>{
  const label=card.querySelector('.label')?.textContent.trim();const explanation=r9Glossary[label];
  if(explanation&&!card.querySelector('.r9-explain')){const d=document.createElement('details');d.className='r9-explain';const s=document.createElement('summary');s.textContent='Hvad betyder det?';const p=document.createElement('p');p.textContent=explanation;d.append(s,p);d.addEventListener('toggle',notifyHeight);card.append(d)}
 });
 const chart=document.getElementById('growth')?.closest('article');
 if(chart){let panel=document.getElementById('r9-risk-glance');if(!panel){panel=document.createElement('section');panel.id='r9-risk-glance';chart.append(panel)}
  let peak=f.data[0].total,min=0,last=0;for(const row of f.data){peak=Math.max(peak,row.total);last=(row.total/peak-1)*100;min=Math.min(min,last)}
  const html='<h3>Udsving er en del af historikken</h3><div class="r9-risk-grid"><div><span>Største fald fra top til bund</span><strong>'+pct(min)+'</strong></div><div><span>Afstand til fondens højeste værdi</span><strong>'+pct(last)+'</strong></div></div><p class="small muted">Totalafkast siden klassens start til '+r3Date(f.data.at(-1).d)+'. Historiske fald er ikke en grænse for, hvor meget du kan tabe.</p>';
  if(panel.innerHTML!==html)panel.innerHTML=html;
 }
 document.querySelectorAll('[data-sector]').forEach(b=>{if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',String(b.dataset.sector===sectorFilter))});
}
const r9Composition=r5Composition;r5Composition=function(){r9Composition();r9Refresh()};
const r9Holdings=holdings;holdings=function(){r9Holdings();r9Refresh()};
r9Refresh();notifyHeight();

// Compact daily overview. Fund figures follow the validated graph release.
// Editorial examples are date-locked and never carried into another day.
const dailyBriefStyle=document.createElement('style');dailyBriefStyle.textContent=`
#portfolio-day{margin:24px 0;padding:26px;border:1px solid #395860;border-radius:18px;background:#12282f}#portfolio-day h2{margin:0 0 6px;font-size:25px}#portfolio-day .day-date{color:#b7cdd0;font-size:14px;margin:0 0 22px}.day-grid{display:grid;grid-template-columns:minmax(220px,1fr) 2fr;gap:28px}.day-result{font-size:38px;line-height:1.2;font-weight:650;color:#f2cd96;margin:8px 0}.day-copy{font-size:15px;line-height:1.6;color:#d0dfe0}.day-copy p{margin:0 0 12px}.day-copy a{color:#aee0db;text-underline-offset:3px}.day-events{border-left:1px solid #395860;padding-left:28px}.day-events h3{font-size:17px;margin:0 0 8px}.day-note{font-size:12px;line-height:1.6;color:#b7cdd0;margin:18px 0 0}@media(max-width:650px){#portfolio-day{padding:20px 16px}.day-grid{grid-template-columns:1fr;gap:18px}.day-events{border-left:0;border-top:1px solid #395860;padding:18px 0 0}#portfolio-day h2{font-size:23px}}
`;document.head.append(dailyBriefStyle);
function dailyBrief(){
 if(!data)return;const f=data.funds[selected],rows=f?.data;if(!rows||rows.length<2)return;
 const last=rows.at(-1),previous=rows.at(-2);if(!(last.total>0&&previous.total>0))return;
 const anchor=document.getElementById('v2-calendar');if(!anchor)return;
 let section=document.getElementById('portfolio-day');if(!section){section=document.createElement('section');section.id='portfolio-day'}
 if(anchor.nextElementSibling!==section)anchor.after(section);
 const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);const yesterdayDate=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Copenhagen'}).format(yesterday);
 const title=last.d===yesterdayDate?'Det skete i porteføljen i går':'Seneste dag i porteføljen';
 const change=(last.total/previous.total-1)*100,name=f.short||f.name||'Afdelingen';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let news='';
 if(f.id==='pmindi'&&last.d==='2026-10-12')news=`<div class="day-events day-copy"><h3>To nedslag blandt aktierne</h3><p><a href="https://ndigrafdatab5174313.blob.core.windows.net/graph/v2-test/selskab.html?isin=US12047B1052&fund=pmindi" target="_blank" rel="noopener noreferrer">Bumble</a> steg 49,6 %. Reuters omtalte forhandlinger om et muligt salg. <a href="https://www.investing.com/news/stock-market-news/dating-app-bumble-in-advanced-talks-to-go-private-at-1-billion-valuation-source-says-4945061" target="_blank" rel="noopener noreferrer">Læs nyheden ↗</a></p><p>Cerebras faldt 10,7 %. Der er ikke en dokumenteret forklaring på faldet i de gennemgåede kilder.</p><p class="day-note">Redaktionelt udvalg, ikke dagens fulde vinder- og taberliste. Aktiernes kursændringer er i noteringsvaluta og er ikke deres bidrag til fondens afkast.</p></div>`;
 const html='<h2>'+title+'</h2><p class="day-date">'+esc(r3Date(last.d))+' · '+esc(name)+'</p><div class="'+(news?'day-grid':'')+'"><div class="day-copy"><span>Fondens samlede dagsafkast</span><div class="day-result">'+pct(change)+'</div><p>100.000 kr. ved den foregående kursdato ville være '+new Intl.NumberFormat('da-DK',{maximumFractionDigits:0}).format(100000*(1+change/100))+' kr.</p><p class="day-note">Fra '+esc(r3Date(previous.d))+' til '+esc(r3Date(last.d))+'. Totalafkast i DKK med geninvesteret udbytte, efter løbende omkostninger og før skat og egne handelsomkostninger.</p></div>'+news+'</div><p class="day-note">Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering.</p>';
 const direction=change<0?'faldt':'steg';
 const amount=new Intl.NumberFormat('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2}).format(Math.abs(change));
 let narrative='';
 if(f.id==='pmindi'&&last.d==='2026-10-12')narrative=`<p>Blandt aktierne med store udsving steg <strong>Bumble 49,6 %</strong>, Enovix 5,3 % og Vista Energy 4,8 %. I den anden retning faldt <strong>TMC 14,2 %</strong>, Cerebras 10,7 % og Aeva 10,6 %.</p><p>Dagens selskabsnyt bød blandt andet på <a href="https://www.investing.com/news/stock-market-news/dating-app-bumble-in-advanced-talks-to-go-private-at-1-billion-valuation-source-says-4945061" target="_blank" rel="noopener noreferrer">forhandlinger om et muligt salg af Bumble, ifølge Reuters</a>. Lumentum, Astera Labs og Corning <a href="https://investor.lumentum.com/financial-news-releases/news-details/2026/Lumentum-Astera-Labs-and-Corning-to-Demonstrate-1060-nm-VCSEL-Based-PCIe-over-Optics-for-AI-Rack-Scale-Connectivity-at-the-2026-OCP-Global-Summit/default.aspx" target="_blank" rel="noopener noreferrer">annoncerede en fælles demonstration af optiske forbindelser til AI-servere</a>. Nyhederne er ikke i sig selv en forklaring på dagens kursbevægelser.</p>`;
 const revised='<h2>'+title+'</h2><p class="day-date">'+esc(r3Date(last.d))+' · '+esc(name)+'</p><div class="day-copy"><p><strong>'+(last.d===yesterdayDate?'I går':'På dagen')+' '+direction+' '+esc(name)+' '+amount+' %.</strong> Det er fondens samlede afkast fra den foregående kursdato, inklusive eventuelt geninvesteret udbytte.</p>'+narrative+'</div><p class="day-note">Fondens afkast er i danske kroner, efter løbende omkostninger og før skat og egne handelsomkostninger.'+(narrative?' Aktierne er et udvalg af markante udsving, ikke en fuldstændig rangliste. Deres afkast er i noteringsvaluta og er ikke bidrag til fondens afkast.':'')+' Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering.</p>';
 let finalCopy=revised;
 if(f.id==='pmindi'&&last.d==='2026-10-12'){
  const body=`<p><strong>Mandag faldt PMINDI 2,60 %.</strong> Men ser vi på selskaberne i porteføljen, var det ikke en dag, hvor alle aktier bevægede sig i samme retning. Bumble steg eksempelvis 49,6 %, mens TMC faldt 14,2 %. Det er værd at skelne mellem de enkelte aktiers udsving og fondens resultat: En stor bevægelse i en lille position fylder ikke nødvendigvis ret meget i det samlede afkast.</p><p>Bumble skilte sig særligt ud. <a href="https://www.investing.com/news/stock-market-news/dating-app-bumble-in-advanced-talks-to-go-private-at-1-billion-valuation-source-says-4945061" target="_blank" rel="noopener noreferrer">Reuters beskrev forhandlinger om at tage selskabet af børsen</a>, altså et muligt opkøb, hvor aktien ikke længere skulle handles på børsen. Det var dermed en konkret selskabsnyhed at holde kursstigningen op imod, ikke blot en bevægelse i techaktier generelt. Blandt de øvrige stigninger var Enovix med 5,3 % og Vista Energy med 4,8 %. Omvendt faldt Cerebras 10,7 % og Aeva 10,6 %, ud over faldet i TMC.</p><p>Der var også nyt fra Lumentum, Astera Labs og Corning, som <a href="https://investor.lumentum.com/financial-news-releases/news-details/2026/Lumentum-Astera-Labs-and-Corning-to-Demonstrate-1060-nm-VCSEL-Based-PCIe-over-Optics-for-AI-Rack-Scale-Connectivity-at-the-2026-OCP-Global-Summit/default.aspx" target="_blank" rel="noopener noreferrer">annoncerede en fælles demonstration af optiske forbindelser til AI-servere</a>. Det handler om at flytte data mellem servernes komponenter ved hjælp af lys. Nyheden fortæller dermed noget om den teknologi, selskaberne arbejder med, men forklarer ikke i sig selv, hvorfor deres aktier steg eller faldt netop mandag.</p>`;
  finalCopy=revised.replace(/<div class="day-copy">[\s\S]*?<\/div><p class="day-note">/,'<div class="day-copy">'+body+'</div><p class="day-note">');
 }
 if(f.id==='pmindi'&&last.d==='2026-10-12'){
  const list=(label,rows)=>'<h3>'+label+'</h3><ul>'+rows.map(([n,v])=>'<li><span>'+n+'</span><strong class="'+(v>0?'day-up':'day-down')+'">'+(v>0?'+':'')+new Intl.NumberFormat('da-DK',{minimumFractionDigits:1,maximumFractionDigits:1}).format(v)+' %</strong></li>').join('')+'</ul>';
  const movers='<aside class="day-movers" aria-label="Udvalgte kursudsving">'+list('Fem markante stigninger',[['Bumble',49.61],['Enovix',5.28],['Vista Energy',4.77],['Kaspi.kz',4.50],['Kodiak AI',4.19]])+list('Fem markante fald',[['TMC',-14.16],['Cerebras',-10.69],['Aeva',-10.61],['Semtech',-10.15],['Serve Robotics',-10.00]])+'</aside>';
  finalCopy=finalCopy.replace('<div class="day-copy">','<div class="day-layout"><div class="day-copy">').replace('</div><p class="day-note">','</div>'+movers+'</div><p class="day-note">');
  finalCopy=finalCopy.replace(' Blandt de øvrige stigninger var Enovix med 5,3 % og Vista Energy med 4,8 %. Omvendt faldt Cerebras 10,7 % og Aeva 10,6 %, ud over faldet i TMC.','');
 }
 finalCopy=finalCopy.replace('Fem markante stigninger','De fem største stigninger').replace('Fem markante fald','De fem største fald').replace('aria-label="Udvalgte kursudsving"','aria-label="Største kontrollerede kursudsving"').replace('Aktierne er et udvalg af markante udsving, ikke en fuldstændig rangliste.','Rangeringen omfatter de 343 aktier med kontrollerede dagskurser af fondens 375 positioner. For de øvrige 32 er sammenligningsgrundlaget ikke verificeret.');
 const existingSignup=document.getElementById('portfolio-mail-demo');
 if(section.dataset.copy!==finalCopy){if(existingSignup)existingSignup.remove();section.innerHTML=finalCopy;section.dataset.copy=finalCopy;notifyHeight()}
 let signup=existingSignup||document.getElementById('portfolio-mail-demo');
 if(!signup){
  signup=document.createElement('section');signup.id='portfolio-mail-demo';
  signup.innerHTML='<div><span class="signup-kicker">FØLG MED I DIN INVESTERING</span><h2>Vil du følge med i, hvad der sker i PMINDI?</h2><p>Få fondens udvikling og de vigtigste selskabsnyheder samlet i din indbakke. Vælg et dagligt overblik eller en ugentlig opsamling.</p></div><form><label for="portfolio-demo-email">Din e-mail</label><input id="portfolio-demo-email" type="email" placeholder="din@email.dk" autocomplete="off"><fieldset><legend>Hvor ofte?</legend><label><input type="radio" name="frequency-demo" value="daily" checked> Dagligt</label><label><input type="radio" name="frequency-demo" value="weekly"> Ugentligt</label></fieldset><button type="button" disabled>Tilmelding åbner ved lancering</button><p class="signup-demo-note">Visuel demo. Din e-mail gemmes ikke, og der sendes ingen mails.</p></form>';
  signup.querySelector('form').addEventListener('submit',e=>e.preventDefault());
 }
 if(!signup.dataset.integrated){
 signup.querySelector('.signup-kicker').textContent='SAMME OVERBLIK, DIREKTE I DIN INDBAKKE';
 signup.querySelector('h2').textContent='Vil du have overblikket på mail?';
 signup.querySelector('div > p').textContent='Følg med i PMINDI med et overblik som det, du lige har læst: Hvordan gik det med fonden, hvilke aktier rykkede mest, og hvad skete der i selskaberne? Vælg en daglig opdatering eller en samlet opsamling én gang om ugen.';
 signup.dataset.integrated='true';
 }
 if(signup.parentElement!==section)section.append(signup);
}

dailyBriefStyle.textContent+=`#portfolio-day #portfolio-mail-demo{margin:26px -26px -26px;padding:26px;border:0;border-top:1px solid #8abdb9;border-radius:0 0 18px 18px;background:#1d3e43}#portfolio-day #portfolio-mail-demo h2{font-size:23px}@media(max-width:650px){#portfolio-day #portfolio-mail-demo{margin:22px -16px -20px;padding:22px 16px}}`;
dailyBriefStyle.textContent+=`#portfolio-mail-demo{display:grid;grid-template-columns:1.2fr 1fr;gap:32px;padding:28px;margin:0 0 28px;background:#1d3e43;border:1px solid #8abdb9;border-radius:18px}#portfolio-mail-demo h2{font-size:25px;line-height:1.3;margin:8px 0 12px}#portfolio-mail-demo p{font-size:15px;line-height:1.65;color:#d0e2e2}#portfolio-mail-demo .signup-kicker{font-size:11px;letter-spacing:.12em;color:#d9ce91}#portfolio-mail-demo form>label{display:block;margin-bottom:6px}#portfolio-mail-demo input[type=email]{box-sizing:border-box;width:100%;padding:13px;border:1px solid #8abdb9;border-radius:7px;background:#10282e;color:white;font:inherit}#portfolio-mail-demo fieldset{border:0;padding:12px 0;margin:0;display:flex;gap:20px}#portfolio-mail-demo legend{font-size:13px;padding-top:10px}#portfolio-mail-demo button{width:100%;padding:13px;border:0;border-radius:7px;background:#b3dcd3;color:#173339;font:inherit}#portfolio-mail-demo .signup-demo-note{font-size:12px;margin:8px 0 0}@media(max-width:700px){#portfolio-mail-demo{grid-template-columns:1fr;padding:20px;gap:12px}}`;
dailyBriefStyle.textContent+=`#portfolio-day .day-layout{display:grid;grid-template-columns:minmax(0,1.8fr) minmax(250px,1fr);gap:32px}#portfolio-day .day-copy{font-size:16px;line-height:1.75}#portfolio-day .day-movers{border-left:1px solid #395860;padding-left:24px}#portfolio-day .day-movers h3{font-size:15px;margin:0 0 10px}#portfolio-day .day-movers ul{list-style:none;padding:0;margin:0 0 20px}#portfolio-day .day-movers li{display:flex;justify-content:space-between;gap:12px;padding:5px 0;font-size:14px;border-bottom:1px solid #39586066}#portfolio-day .day-up{color:#a9dcd2}#portfolio-day .day-down{color:#efb1a8}@media(max-width:760px){#portfolio-day .day-layout{grid-template-columns:1fr}#portfolio-day .day-movers{border-left:0;border-top:1px solid #395860;padding:20px 0 0}}`;
const dailyBriefComposition=r5Composition;r5Composition=function(){dailyBriefComposition();dailyBrief()};
dailyBrief();

// Presentation-only review fixes. Financial series and source dates are unchanged.
const ux14Style=document.createElement('style');ux14Style.textContent=`
#r7-holdings-toggle{display:none!important}#holdings-more:not([hidden]){display:inline-block!important}#holdings-more[hidden]{display:none!important}
#holdings tr[hidden]{display:none!important}#growth svg{user-select:none;-webkit-user-select:none;touch-action:pan-y}
.ux14-sort{background:transparent;color:inherit;border:0;font:inherit;font-weight:600;min-height:44px;cursor:pointer;text-align:left;padding:4px}
#ux14-day{padding:12px 16px;margin:12px 0;border:1px solid #56777d;border-radius:9px;background:#18343a;display:flex;flex-wrap:wrap;gap:10px;align-items:center}#ux14-day button{margin-left:auto;min-height:44px;background:none;color:#b9e4dd;border:1px solid #8abdb9;border-radius:6px;padding:8px 12px;cursor:pointer}
#ux14-class-help{display:none}#ux14-calendar-note{font-size:13px;color:#b7cdd0}
.ux14-section-toggle{display:block;min-height:44px;margin:0 0 18px;padding:9px 14px;border:1px solid #789da1;border-radius:7px;background:#19343a;color:#dceeed;cursor:pointer;font:inherit}.ux14-folded>:not(h2):not(.ux14-section-toggle){display:none!important}
@media(max-width:650px){#r5-intro h1{font-size:24px!important}#r5-intro>p:last-child{display:none}#class-options .segmented{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important}#class-options [data-class]{grid-row:auto!important;grid-template-rows:auto!important;padding:10px!important;min-height:70px!important}#class-options [data-class]>strong{font-size:14px!important}#class-options:not(.ux14-guide-open) [data-class]>span{display:none!important}#class-options [data-class] .v2-buy{overflow-wrap:anywhere}#ux14-class-help{display:block;min-height:44px;background:none;color:#b9e4dd;border:0;text-decoration:underline;cursor:pointer}#ux14-day{font-size:14px;margin:8px 0}#ux14-day button{margin-left:0}#tax-note{font-size:12px}}
`;document.head.append(ux14Style);
let ux14Sort={column:1,direction:-1};
function ux14SortRows(){
 const body=document.getElementById('holdings');if(!body)return;
 const rows=[...body.rows],c=ux14Sort.column;
 const value=row=>{const text=row.cells[c]?.textContent.trim()||'';if(c===0)return row.cells[0]?.querySelector('a')?.textContent||text;if(!text||text==='—')return null;const n=Number(text.replace(/\s|%|\./g,'').replace(',','.').replace('−','-'));return Number.isFinite(n)?n:null};
 const sorted=rows.slice().sort((a,b)=>{const x=value(a),y=value(b);if(x===null)return y===null?0:1;if(y===null)return -1;return ux14Sort.direction*(c===0?x.localeCompare(y,'da'):x-y)});
 if(rows.some((r,i)=>r!==sorted[i]))body.append(...sorted);
 [...body.closest('table').querySelectorAll('thead th')].forEach((h,i)=>{if(h.querySelector('.ux14-sort'))h.setAttribute('aria-sort',i===c?(ux14Sort.direction===1?'ascending':'descending'):'none')});
 sorted.forEach((r,i)=>r.hidden=!allHoldings&&i>=10);
 const b=document.getElementById('holdings-more');if(b){b.hidden=rows.length<=10;b.textContent=allHoldings?'Vis kun de første 10':'Se alle '+rows.length+' positioner';b.setAttribute('aria-expanded',String(allHoldings))}
}
function ux14Tables(){
 const body=document.getElementById('holdings');if(!body||!data)return;
 body.querySelectorAll('td[aria-label="Ingen valideret observation"]').forEach(td=>{if(!td.textContent.trim())td.textContent='—'});
 const table=body.closest('table');[...table.querySelectorAll('thead th')].forEach((h,i)=>{
  const label=h.textContent.trim();if(!['Vægt','Selskab','Aktie','1 år'].includes(label)||h.querySelector('button'))return;
  const b=document.createElement('button');b.className='ux14-sort';b.type='button';b.textContent=label+' ↕';b.onclick=()=>{ux14Sort={column:i,direction:ux14Sort.column===i?-ux14Sort.direction:(i===0?1:-1)};ux14SortRows();notifyHeight()};h.replaceChildren(b);
 });
 const button=document.getElementById('holdings-more');if(button)button.onclick=()=>{allHoldings=!allHoldings;limitHoldings()};
 const download=document.getElementById('holdings-excel');if(download){const count=data.funds[selected].positions.filter(p=>p.isin&&p.weight>0).length;const text='Download alle '+count+' aktiepositioner pr. '+r3Date(data.asOf)+' (Excel, .xlsx)';if(download.textContent!==text)download.textContent=text;const bar=document.getElementById('r7-holdings-actions');if(bar&&download.parentElement!==bar)bar.append(download)}
 const scope=table.closest('section');scope?.querySelectorAll('p').forEach(p=>{if(p.textContent.includes('Klik på en sektor for at filtrere'))p.textContent=p.textContent.replace('Klik på en sektor for at filtrere','Filtrér med sektorknapperne i sektorfordelingen')});
 let dates=document.getElementById('ux14-price-dates');if(!dates){dates=document.createElement('p');dates.id='ux14-price-dates';dates.className='small muted';dates.textContent='Kursdatoen gælder seneste viste lukkekurs på aktiens børs. Beholdningsdatoen gælder fondens opgørelse. Børsernes handelsdage kan være forskellige; en ældre dato er ikke en ny kurs.';table.closest('.tablewrap').before(dates)}
 ux14SortRows();
}
function ux14Refresh(){
 if(!data)return;const fund=data.funds[selected],rows=fund.data,last=rows.at(-1),prev=rows.at(-2);
 // The inherited renderer still updates its nav on class changes. Retain a
 // hidden compatibility node instead of letting that renderer throw halfway.
 if(!document.querySelector('nav')){const nav=document.createElement('nav');nav.hidden=true;nav.id='ux14-legacy-nav';document.body.append(nav)}
 const signup=document.getElementById('portfolio-mail-demo');if(signup){const p=signup.querySelector('div>p');const text='Følg med i '+fund.short+' med et overblik som det, du lige har læst: Hvordan gik det med fonden, hvilke aktier rykkede mest, og hvad skete der i selskaberne? Vælg en daglig opdatering eller en samlet opsamling én gang om ugen.';if(p&&p.textContent!==text)p.textContent=text}
 const intro=document.getElementById('r5-intro');if(intro&&prev?.total>0){let panel=document.getElementById('ux14-day');if(!panel){panel=document.createElement('section');panel.id='ux14-day';intro.after(panel)}const html='<span>Seneste kursdag, '+esc(r3Date(last.d))+': <strong>'+esc(fund.short)+' '+pct((last.total/prev.total-1)*100)+'</strong></span><button type="button">Hvad skete der? ↓</button>';if(panel.innerHTML!==html){panel.innerHTML=html;panel.querySelector('button').onclick=()=>scrollToSection(document.getElementById('portfolio-day'))}}
 const classes=document.getElementById('class-options');if(classes&&!document.getElementById('ux14-class-help')){const b=document.createElement('button');b.type='button';b.id='ux14-class-help';b.textContent='Hvad er forskellen, og hvordan finder jeg fonden?';b.setAttribute('aria-expanded','false');b.onclick=()=>{const open=classes.classList.toggle('ux14-guide-open');b.setAttribute('aria-expanded',String(open));notifyHeight()};classes.append(b)}
 const calendar=document.querySelector('#calendar table');if(calendar){let empty=0;[...calendar.tBodies[0]?.rows||[]].forEach(r=>{const cells=[...r.cells].slice(1);const missing=cells.length&&cells.every(c=>!c.textContent.trim()||c.textContent.trim()==='—');r.hidden=!!missing;if(missing)empty++});let note=document.getElementById('ux14-calendar-note');if(!note){note=document.createElement('p');note.id='ux14-calendar-note';calendar.closest('#calendar').after(note)}const text=empty?'Klassen har historik fra '+r3Date(rows[0].d)+'. År uden afsluttede månedsafkast er udeladt.':'';if(note.textContent!==text)note.textContent=text;note.hidden=!empty}
 document.querySelectorAll('a[href^="http"]').forEach(a=>{if(new URL(a.href).origin!==location.origin){a.target='_blank';a.rel='noopener noreferrer'}});
 for(const [id,label] of [['highs','Afstand til toppen'],['risk','Nedture og stigninger'],['portfolio','Selskaber og fordeling'],['method','Data og beregningsmetode']]){const panel=document.getElementById(id);if(!panel||panel.querySelector(':scope>.ux14-section-toggle'))continue;const button=document.createElement('button');button.type='button';button.className='ux14-section-toggle';button.textContent='Vis '+label.toLocaleLowerCase('da-DK');button.setAttribute('aria-expanded','false');button.onclick=()=>{const collapsed=panel.classList.toggle('ux14-folded');button.setAttribute('aria-expanded',String(!collapsed));button.textContent=collapsed?'Vis '+label.toLocaleLowerCase('da-DK'):'Skjul '+label.toLocaleLowerCase('da-DK');notifyHeight()};panel.prepend(button);panel.classList.add('ux14-folded')}
 const legal=document.getElementById('important-information'),riskBanner=document.getElementById('risk-banner');if(legal&&riskBanner&&riskBanner.previousElementSibling?.id!=='important-information-title')legal.querySelector('h2')?.after(riskBanner);
 ux14Tables();ux14CalendarAndCountries();ux14Restore();
}
function ux14CalendarAndCountries(){
 const table=document.querySelector('#calendar table');if(table){const labels=[...table.tHead.rows[0].cells].map(c=>c.textContent);for(const row of table.tBodies[0].rows)[...row.cells].forEach((c,i)=>{if(i)c.dataset.month=labels[i]});}
 const names={'Austria':'Østrig','Brazil':'Brasilien','Bulgaria':'Bulgarien','Norway':'Norge','Cayman Islands':'Caymanøerne','Poland':'Polen','Kazakhstan':'Kasakhstan','Italy':'Italien','Ireland':'Irland'};
 document.querySelectorAll('.country-pick').forEach(b=>{const s=b.querySelector('span'),name=names[b.dataset.hq];if(s&&name&&s.textContent!==name)s.textContent=name});
 const details=document.querySelector('.country-pick')?.parentElement.querySelector('details');if(details){let b=details.parentElement.querySelector('.ux14-countries-more');if(!b){b=document.createElement('button');b.className='ux14-countries-more ux14-section-toggle';b.type='button';details.after(b);b.onclick=()=>{details.open=!details.open;ux14CalendarAndCountries();notifyHeight()}}const n=details.querySelectorAll('.country-pick').length;b.textContent=details.open?'Vis færre lande':'Vis '+n+' øvrige lande';b.setAttribute('aria-expanded',String(details.open));details.querySelector('summary').style.display='none';}
}
ux14Style.textContent+=`
@media(max-width:650px){#calendar{overflow:visible!important}#calendar table,#calendar tbody{display:block;min-width:0!important;width:100%!important}#calendar thead{display:none}#calendar tbody tr:not([hidden]){display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-bottom:16px}#calendar tbody tr[hidden]{display:none!important}#v2-calendar #calendar tbody th:first-child{grid-column:1/-1;position:static!important;min-width:0!important;padding:8px!important}.r3-year-cell{display:flex!important;justify-content:space-between}#calendar tbody td{position:static!important;min-width:0!important;max-width:none!important;display:flex;flex-direction:column;align-items:center;padding:8px 4px!important}#calendar td:before{content:attr(data-month);color:#b9cbd0;font-size:11px;margin-bottom:4px}#r7-calendar-hint{display:none!important}}
`;
const ux14Scroll=scrollToSection;scrollToSection=function(target){if(target){const panel=target.closest('.ux14-folded');if(panel){panel.classList.remove('ux14-folded');const b=panel.querySelector(':scope>.ux14-section-toggle');if(b){b.setAttribute('aria-expanded','true');b.textContent='Skjul denne sektion'}}}ux14Scroll(target)};
const ux14Limit=limitHoldings;limitHoldings=function(){ux14Limit();ux14SortRows()};
const ux14Holdings=holdings;holdings=function(){ux14Holdings();ux14Tables()};
const ux14Composition=r5Composition;r5Composition=function(){ux14Composition();ux14Refresh()};
// Preserve this tab's portfolio context across a company visit. No email or
// personal form values are stored. Failed storage never blocks navigation.
function ux14Restore(){
 if(ux14Restore.done||!data)return;ux14Restore.done=true;
 // Let the inherited initial-render callbacks finish before applying user state.
 setTimeout(ux14RestoreNow,800);
}
function ux14RestoreNow(){
 let saved;try{saved=JSON.parse(sessionStorage.getItem('ndi-v2-return')||'null');sessionStorage.removeItem('ndi-v2-return')}catch{return}
 if(!saved||Date.now()-saved.at>7200000)return;
 const pick=(attr,value)=>{const b=[...document.querySelectorAll('button['+attr+']')].find(x=>x.getAttribute(attr)===value);if(b&&b.getAttribute('aria-pressed')!=='true')b.click()};
 pick('data-class',saved.fund);pick('data-growth-view',saved.view);pick('data-growth-period',saved.period);
 const toggle=document.getElementById('detail-toggle');if(saved.details&&toggle?.getAttribute('aria-expanded')!=='true')toggle.click();
 for(const id of saved.open||[]){const p=document.getElementById(id);if(p?.classList.contains('ux14-folded'))p.querySelector('.ux14-section-toggle')?.click()}
 if(saved.sort&&[0,1,2,3,4,5,6,7,8,9].includes(saved.sort.column)&&[1,-1].includes(saved.sort.direction))ux14Sort=saved.sort;
 allHoldings=!!saved.all;ux14Tables();
 setTimeout(()=>{const a=[...document.querySelectorAll('a[href*="selskab.html?"]')].find(x=>new URL(x.href).searchParams.get('isin')===saved.isin&&x.getClientRects().length);if(a){scrollToSection(a);a.focus({preventScroll:true})}},450);
}
window.addEventListener('click',event=>{
 const a=event.target.closest('a[href]');if(!a||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 const url=new URL(a.href);if(url.origin!==new URL(document.baseURI).origin||!url.pathname.endsWith('/v2-test/selskab.html'))return;
 const active=attr=>document.querySelector('button['+attr+'][aria-pressed="true"]')?.getAttribute(attr);
 const state={at:Date.now(),fund:active('data-class'),view:active('data-growth-view'),period:active('data-growth-period'),details:document.getElementById('detail-toggle')?.getAttribute('aria-expanded')==='true',open:['highs','risk','portfolio','method'].filter(id=>{const p=document.getElementById(id);return p&&!p.classList.contains('ux14-folded')}),all:allHoldings,sort:ux14Sort,isin:url.searchParams.get('isin')};
 try{sessionStorage.setItem('ndi-v2-return',JSON.stringify(state))}catch{}
 a.target='_top';
},true);
ux14Refresh();notifyHeight();

})();
}).catch(()=>{});
