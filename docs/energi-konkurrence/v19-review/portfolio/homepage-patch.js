window.NDI_NASDAQ=window.NDI_LIVE?.nasdaq||null;
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
      b.innerHTML=accumulating?'<strong>PMINDIAKK, akkumulerende</strong><span>Afkastet bliver i fonden.</span><span class="preview-tax">Relevant til pension, VSO og selskaber, hvis du ønsker afkastet geninvesteret i fonden. Kan også bruges til børneopsparing og frie midler. Ikke til aktiesparekonto.</span>':'<strong>PMINDI, udbyttebetalende</strong><span>Udbytte udbetales til dig.</span><span class="preview-tax">Typisk relevant for private med frie midler eller aktiesparekonto. Kan også bruges til pension, børneopsparing og selskaber. Ikke til VSO.</span>';
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
      if(!disclosure.dataset.previewWatched){disclosure.dataset.previewWatched='true';new MutationObserver(improve).observe(disclosure,{childList:true,subtree:true})}
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
let nasdaqEnabled=true;
function ensureNasdaq(){
 if(!document.getElementById('nasdaq-control')&&document.getElementById('growth-controls')){
  const label=document.createElement('label');label.id='nasdaq-control';
  label.innerHTML='<input type="checkbox" id="nasdaq-toggle" checked> Sammenlign med Nasdaq-100 (totalafkast i DKK)';
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
 document.getElementById('growth-period-result').textContent=points[0].d+' til '+end.d+' · '+fund.short+': '+pct(end.fund-100)+' · Nasdaq-100: '+pct(end.index-100);
 note.innerHTML='<strong style="color:#89aeb4">━ '+esc(fund.short)+'</strong> &nbsp; <span style="color:#9ca4af">┄ Nasdaq-100 Total Return</span><br>Samme start- og slutdato og kun fælles observationsdatoer. Begge med geninvesteret udbytte i DKK. Fonden er efter løbende omkostninger; indekset har ingen fondsomkostninger. Nasdaq-100 er en sammenligning, ikke fondens benchmark. Kilder: <a href="https://indexes.nasdaq.com/Index/Overview/XNDX" target="_blank" rel="noopener">Nasdaq (XNDX, totalafkast)</a> og <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener">USD/DKK via ECB (daglige referencekurser, ikke valutakurser ved USA-børsluk)</a>. Seneste fælles dato: '+end.d+'.'+(end.d<data.asOf?' Sammenligningen slutter før fondens rapportdato, fordi indeks- og valutadata offentliggøres med forsinkelse.':'');
 const svg=box.querySelector('svg'),cursor=box.querySelector('.growth-cursor'),tooltip=box.querySelector('.growth-tooltip');let i=points.length-1;
 function show(j){i=Math.max(0,Math.min(points.length-1,j));const p=points[i];cursor.setAttribute('x1',x(p.d));cursor.setAttribute('x2',x(p.d));cursor.setAttribute('visibility','visible');tooltip.textContent=p.d+' · '+fund.short+': '+n(p.fund,2)+' ('+pct(p.fund-100)+') · Nasdaq-100: '+n(p.index,2)+' ('+pct(p.index-100)+')'}
 function pointer(e){const rect=svg.getBoundingClientRect(),fraction=Math.max(0,Math.min(1,((e.clientX-rect.left)/rect.width*W-L)/(W-L-R))),target=first+fraction*(last-first);let j=0;for(let k=1;k<points.length;k++)if(Math.abs(Date.parse(points[k].d)-target)<Math.abs(Date.parse(points[j].d)-target))j=k;show(j)}
 svg.style.touchAction='none';svg.onpointermove=pointer;svg.onpointerdown=e=>{svg.setPointerCapture(e.pointerId);pointer(e)};svg.onpointerleave=()=>cursor.setAttribute('visibility','hidden');svg.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();show(i+(e.key==='ArrowLeft'?-1:1))}};notifyHeight();
}
// Stable ticker display 2026-10-30

// Stable listing identifiers already supplied by the validated security master.
function ndiListing(p){
 if(p.listingStatus!=='verified'||!p.symbol)return {ticker:'',symbol:'',exchange:''};
 const symbol=String(p.symbol), code=p.listingExchange||'';
 const exchanges={NMS:'Nasdaq',NGM:'Nasdaq',NCM:'Nasdaq',NYQ:'NYSE',ASE:'NYSE American',JPX:'Tokyo',LSE:'London',IOB:'London IOB',GER:'Xetra',FRA:'Frankfurt',STO:'Stockholm',CPH:'Copenhagen',OSL:'Oslo',TOR:'Toronto',VAN:'TSX Venture',ASX:'ASX',PAR:'Paris',AMS:'Amsterdam',EBS:'SIX Swiss',HKG:'Hong Kong',KSC:'Korea',KOE:'KOSDAQ',TAI:'Taiwan',TWO:'Taipei Exchange'};
 const suffixes={JPX:'.T',LSE:'.L',IOB:'.IL',GER:'.DE',FRA:'.F',STO:'.ST',CPH:'.CO',OSL:'.OL',TOR:'.TO',VAN:'.V',ASX:'.AX',PAR:'.PA',AMS:'.AS',EBS:'.SW',HKG:'.HK',KSC:'.KS',KOE:'.KQ',TAI:'.TW',TWO:'.TWO'};
 const suffix=suffixes[code];
 // Only remove a known exchange suffix; never split share-class symbols such as BRK-B.
 const ticker=p.displayTicker||(suffix&&symbol.endsWith(suffix)?symbol.slice(0,-suffix.length):symbol);
 return {ticker,symbol,exchange:exchanges[code]||code};
}
function ndiListingLabel(p){const l=ndiListing(p);return [l.ticker,l.exchange].filter(Boolean).join(' · ')}

holdingsMarkup=function(ps){return ps.map(p=>{const r=marketRow(p);return `<tr><td>${esc(p.name)}${ndiListingLabel(p)?`<small class="ndi-ticker">${esc(ndiListingLabel(p))}</small>`:""}<small>${esc(p.isin)}</small></td><td>${esc(sectorNames[p.sector]||p.sector||'Ikke klassificeret')}</td><td>${r?.marketClose!=null?n(r.marketClose,2)+' '+esc(r.marketCurrency):'—'}<small>${esc(r?.returnDate||'Ingen aktuel markedskurs')}</small></td><td>${n(p.weight,2)} %</td>${returnCells(r)}<td>${r?.status==='ok'?pct(r.distance):'—'}</td></tr>`}).join('');}
holdings=function(){
 const f=data.funds[selected],query=$('search').value.toLowerCase(),geo=geography?.funds[f.id]||[];
 const ps=f.positions.filter(p=>p.isin&&p.weight>0&&(!sectorFilter||(p.sector||'Ikke klassificeret')===sectorFilter)&&(!countryFilter||geo.some(r=>r.isin===p.isin&&r.country===countryFilter&&r.status==='profile_found'))&&`${p.name} ${p.isin} ${ndiListing(p).symbol} ${ndiListingLabel(p)}`.toLowerCase().includes(query));
 $('holdings').closest('table').querySelector('thead').innerHTML=`<tr><th>Selskab</th><th>Sektor</th><th>Markedskurs</th><th>Vægt</th>${periodHeaders()}<th>Under 52-ugers top</th></tr>`;
 $('holdings').innerHTML=holdingsMarkup(ps)||'<tr><td colspan="10">Ingen positioner matcher.</td></tr>';
 $('activefilter').innerHTML=`<p class="small muted">${ps.length} positioner. Kursændring i aktiens noteringsvaluta, uden geninvesteret udbytte. Eksterne markedskurser, uafhængigt af hvor længe fonden har ejet aktien. — betyder utilstrækkelige data.</p>`+((sectorFilter||countryFilter)?`<button id="clearfilter" class="chip">${esc([sectorNames[sectorFilter]||sectorFilter,countryLabel(countryFilter)].filter(Boolean).join(' · '))} × Nulstil filtre</button>`:'');
 ensureHoldingsButton();
 if($('clearfilter'))$('clearfilter').onclick=()=>{sectorFilter='';countryFilter='';holdings()};
};

// Portable OOXML serializer for the website download. No external CDN or local runtime.
// Strings are inline text (never formulas); numbers stay numeric and missing values blank.
function holdingsWorkbook(fund,asOf,market){
 const escXml=v=>String(v??'').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 const cols=['Selskab / post','ISIN','Type','Sektor','Vægt af formue','Rapportkurs','Rapportvaluta','Markedskurs','Markedsvaluta','Markedsdato','1 dag','1 måned','3 måneder','År til dato','1 år','Under 52-ugers top','Ticker','Børs','Leverandørsymbol'];
 const positions=fund.positions.filter(p=>p.isin&&p.weight>0).sort((a,b)=>b.weight-a.weight);
 const rows=[[fund.short+', alle værdipapirpositioner'],['Rapportdato',asOf],['Kilde: Fundmarkets rapporter via dataregisteret. Markedskurser og kursændringer: Yahoo Finance.'],['Vægte er andele af hele formuen. Kursændringer er i noteringsvaluta uden geninvesteret udbytte.'],['Alle positive værdipapirpositioner medtages uanset søgning/filtre. Konti og øvrige balanceposter er udeladt. Tomme celler betyder manglende data.'],cols];
 const numeric=(v,percent=false)=>typeof v==='number'&&Number.isFinite(v)?(percent?v/100:v):null;
 for(const p of positions){const m=market.find(r=>r.isin&&r.isin===p.isin);rows.push([p.name,p.isin||'',p.isin?'Værdipapir':'Konto / øvrig post',p.sector||'',numeric(p.weight,true),numeric(p.price),p.currency||'',numeric(m?.marketClose),m?.marketCurrency||'',m?.returnDate||'',...['d1','m1','m3','ytd','y1'].map(k=>numeric(m?.priceReturns?.[k],true)),m?.status==='ok'?numeric(m.distance,true):null,ndiListing(p).ticker,ndiListing(p).exchange,ndiListing(p).symbol])}
 const column=i=>String.fromCharCode(65+i);
 const sheetRows=rows.map((row,ri)=>'<row r="'+(ri+1)+'">'+row.map((v,ci)=>{const ref=column(ci)+(ri+1);if(v==null)return'<c r="'+ref+'"/>';const style=ri===0?3:ri===5?1:ri>5&&([4,10,11,12,13,14,15].includes(ci))?2:ri>5&&[5,7].includes(ci)?4:0;return typeof v==='number'?'<c r="'+ref+'" s="'+style+'"><v>'+v+'</v></c>':'<c r="'+ref+'" t="inlineStr" s="'+style+'"><is><t xml:space="preserve">'+escXml(v)+'</t></is></c>'}).join('')+'</row>').join('');
 const files={
 '[Content_Types].xml':'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>',
 '_rels/.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
 'xl/workbook.xml':'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Beholdninger" sheetId="1" r:id="rId1"/></sheets></workbook>',
 'xl/_rels/workbook.xml.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
 'xl/styles.xml':'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FF203B44"/><sz val="18"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF203B44"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="10" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>',
 'xl/worksheets/sheet1.xml':'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="6" topLeftCell="A7" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="1" width="35" customWidth="1"/><col min="2" max="2" width="19" customWidth="1"/><col min="3" max="4" width="25" customWidth="1"/><col min="5" max="19" width="18" customWidth="1"/></cols><sheetData>'+sheetRows+'</sheetData><autoFilter ref="A6:S'+rows.length+'"/><mergeCells count="4"><mergeCell ref="A1:S1"/><mergeCell ref="A3:S3"/><mergeCell ref="A4:S4"/><mergeCell ref="A5:S5"/></mergeCells></worksheet>'
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
/* V1 mobile chart width 2026-10-13; presentation only. */
@media(max-width:600px){
 main{padding-left:0!important;padding-right:0!important}
 #overview .primary-chart>.panel{padding:16px 8px!important;border-left:0!important;border-right:0!important;border-radius:0!important;min-width:0}
 #growth{width:100%;min-width:0}
 #growth svg{display:block;width:100%!important;height:auto!important;max-height:none!important;aspect-ratio:auto!important}
 #growth .return-legend{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);gap:10px!important;margin:12px 0!important}
 #growth .return-legend>div{min-width:0!important;padding-left:8px!important}
 #growth .return-legend span{font-size:12px!important;line-height:1.45}
 #growth .return-legend strong{font-size:22px!important}
 #growth-controls{display:flex!important;flex-direction:column;gap:8px!important}
 #growth-controls .segmented{gap:4px!important}
 #growth-controls button{min-height:44px!important;padding:7px 9px!important}
 #growth .growth-tooltip{font-size:12px!important;min-height:40px!important}
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
 const mobile=box.clientWidth<600,W=mobile?Math.max(220,box.clientWidth):1000,H=mobile?Math.round(Math.max(230,Math.min(300,box.clientWidth*.78))):410,L=mobile?43:68,R=mobile?8:92,T=24,B=44;
 // Keep axes, and therefore the fund curve's geometry, identical when toggled.
 const values=points.flatMap(p=>Number.isFinite(p.index)?[p.fund-100,p.index-100]:[p.fund-100]);
 const {low,high,step}=niceScale([...values,0],false),x=d=>L+(Date.parse(d)-firstDate)/(lastDate-firstDate||1)*(W-L-R),y=v=>T+(high-v)/(high-low||1)*(H-T-B);
 const fundColor='#a4d8df',indexColor='#e3bd83',signed=v=>(v>0?'+':'')+n(v,1)+' %';
 const dateLabel=d=>new Date(d+'T12:00:00Z').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'});
 let grid='';for(let v=low;v<=high+step/100;v+=step)grid+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="${Math.abs(v)<1e-8?'#71868d':'#2a3b44'}" stroke-dasharray="${Math.abs(v)<1e-8?'5 5':'0'}"/><text x="${L-10}" y="${y(v)+5}" text-anchor="end" fill="#b3c6cc" font-size="14">${n(v,Number.isInteger(step)?0:1)} %</text>`;
 const count=mobile?3:5;for(let i=0;i<count;i++){const dt=new Date(firstDate+(lastDate-firstDate)*i/(count-1)),xx=L+(W-L-R)*i/(count-1);const label=dt.toLocaleDateString('da-DK',lastDate-firstDate>180*86400000?{month:'short',year:'numeric'}:{day:'numeric',month:'short'});grid+=`<text x="${xx}" y="${H-10}" text-anchor="${i===0?'start':i===count-1?'end':'middle'}" fill="#b3c6cc" font-size="14">${label}</text>`}
 const path=key=>points.filter(p=>Number.isFinite(p[key])).map((p,i)=>`${i?'L':'M'}${x(p.d)},${y(p[key]-100)}`).join(' ');
 const indexEnd=indexPoints.at(-1),indexReturn=indexEnd?indexEnd.index-100:null;
 const commonComparison=compare?'<strong>Samme slutdato: '+dateLabel(indexEnd.d)+': '+esc(fund.short)+' '+signed(indexEnd.fund-100)+' · Nasdaq-100 '+signed(indexReturn)+'.</strong><br>':'';
 let labelY=y(end.fund-100),indexY=indexEnd?y(indexReturn):0;if(compare&&Math.abs(labelY-indexY)<24)indexY=labelY+26;
 const endpoint=(key,color,yy)=>{if(mobile)return '';const p=key==='index'?indexEnd:end;return `<line x1="${x(p.d)}" x2="${W-R+7}" y1="${y(p[key]-100)}" y2="${yy}" stroke="${color}" stroke-dasharray="${key==='index'?'2 3':'0'}"/><text x="${W-R+10}" y="${yy+5}" fill="${color}" font-size="14" font-weight="700">${signed(p[key]-100)}</text>`};
 box.innerHTML=`<div class="return-legend"><div style="--series-color:${fundColor}"><span>${esc(fund.short)}</span><strong>${signed(end.fund-100)}</strong></div>${compare?`<div style="--series-color:${indexColor}"><span>Nasdaq-100 · pr. ${dateLabel(indexEnd.d)}</span><strong>${signed(indexReturn)}</strong></div>`:''}</div><svg viewBox="0 0 ${W} ${H}" role="img" tabindex="0" aria-label="Totalafkast i procent fra periodens start, ${esc(fund.short)}${compare?' og Nasdaq-100':''}">${grid}${compare?`<path d="${path('index')}" stroke="${indexColor}" stroke-width="2" stroke-dasharray="7 5" fill="none"/>`:''}<path d="${path('fund')}" stroke="${fundColor}" stroke-width="3.2" fill="none"/>${endpoint('fund',fundColor,labelY)}${compare?endpoint('index',indexColor,indexY):''}<line class="growth-cursor" y1="${T}" y2="${H-B}" stroke="#dae9ec" visibility="hidden"/><circle class="fund-dot" r="5" fill="${fundColor}" visibility="hidden"/>${compare?`<circle class="index-dot" r="4" fill="${indexColor}" visibility="hidden"/>`:''}</svg><p class="small growth-tooltip" aria-live="polite">Peg på grafen for at se dato og afkast. På mobil: træk en finger hen over kurven.</p>`;
 document.getElementById('growth-period-result').textContent=dateLabel(points[0].d)+' til '+dateLabel(end.d)+' · Totalafkast i DKK · '+(fund.performanceAsOf?'officielle kursdatoer':'rapportdatoer')+' · 0 % ved periodens start';
 const explanation=box.nextElementSibling;if(explanation?.tagName==='P')explanation.firstChild.textContent='Totalafkast er investeringens samlede afkast, inklusive ændringen i andelenes værdi og eventuelle udlodninger, som forudsættes geninvesteret. Afkastet er efter fondens løbende omkostninger, men før skat, egne handelsomkostninger og tillæg ved køb og salg. Grafen viser afkast i procent fra den valgte periodes start. Alle tal er i DKK. ';
 if(note){if(explanation&&note.previousElementSibling!==explanation)explanation.after(note);note.hidden=!nasdaqEnabled;note.innerHTML=compare?'PMINDIs periode og afkast ændres ikke af sammenligningen. Begge serier starter ved 0 % på samme dato og medregner geninvesteret udbytte i DKK. Fondens observationer følger rapportdatoerne, ikke en fuldt afstemt serie af officielle kursdatoer. Fonden er efter løbende omkostninger; indekset har ingen fondsomkostninger. Nasdaq-100 er en sammenligning, ikke fondens benchmark. <a href="https://indexes.nasdaq.com/Index/Overview/XNDX" target="_blank" rel="noopener">Nasdaq (XNDX, totalafkast)</a> · <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener">USD/DKK via ECB (daglige referencekurser, ikke valutakurser ved USA-børsluk)</a>. Nasdaq vises til '+dateLabel(indexEnd.d)+'. Manglende observationer udfyldes ikke; der tegnes ikke videre efter sidste tilgængelige indeksdato.':'Nasdaq-data med samme startdato er ikke tilgængelige; fondens afkast og periode vises uændret.'}
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
})();
