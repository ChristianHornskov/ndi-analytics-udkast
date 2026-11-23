/* Portfolio-only composition of the existing homepage's full analysis. */
(() => {
  document.documentElement.classList.add('advanced-view','portfolio-analysis');
  if(!periods.some(([key])=>key==='w1'))periods.splice(1,0,['w1','1 uge']);
  function attachWeek(){}
  // Only phones use collapsible analysis sections; preserve their state on resize.
  const disclosureMobile=matchMedia('(max-width:700px)');
  const mobileDisclosureState=new WeakMap();
  function syncDisclosures(){
    document.querySelectorAll('.portfolio-disclosure').forEach(detail=>{
      if(disclosureMobile.matches)detail.open=mobileDisclosureState.get(detail)??false;
      else {mobileDisclosureState.set(detail,detail.open);detail.open=true;}
    });
    requestAnimationFrame(()=>{window.dispatchEvent(new Event('resize'));notifyHeight();});
  }
  disclosureMobile.addEventListener('change',syncDisclosures);
  const main=document.querySelector('main');
  const intro=document.createElement('section');intro.className='analysis-intro';intro.id='analysis-introduction';
  intro.innerHTML='<div class="analysis-paths"><a href="../widget/index.html">← Fondens afkast</a><a href="../tech.html">Udforsk selskaberne →</a></div><p class="eyebrow">NEWDEAL INVEST · PMINDI</p><h1>Porteføljen under lup</h1><p>Se, hvad fonden ejer, hvordan investeringerne er fordelt, og hvor store udsving porteføljen har haft.</p><p id="analysis-date" class="small muted"></p>';
  main.prepend(intro);
  const menu=document.createElement('nav');menu.id='analysis-nav';menu.setAttribute('aria-label','Porteføljeanalyse');
  menu.innerHTML='<a href="#analysis-introduction">Overblik</a><a href="#preview-risk-summary">Risiko i tal</a><a href="#highs">Afstand til toppen</a><a href="#portfolio">Fordeling & selskaber</a><a href="#risk">Nedture & afkast</a><a href="#method">Datagrundlag</a>';
  intro.after(menu);
  const sectionLinks=[...menu.querySelectorAll('a')];
  function markSection(){
    const threshold=menu.getBoundingClientRect().height+28;
    let current=sectionLinks[0];
    for(const link of sectionLinks){
      const target=document.querySelector(link.hash);
      if(target&&target.getBoundingClientRect().top<=threshold)current=link;
    }
    for(const link of sectionLinks){
      if(link===current)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    }
  }
  let navFrame=0;
  window.addEventListener('scroll',()=>{if(!navFrame)navFrame=requestAnimationFrame(()=>{navFrame=0;markSection();});},{passive:true});
  window.addEventListener('resize',markSection);
  requestAnimationFrame(markSection);
  const dashboard=document.createElement('section');dashboard.id='analysis-dashboard';dashboard.className='analysis-dashboard';menu.after(dashboard);
  const bridge=document.createElement('a');bridge.href='../tech.html';bridge.className='analysis-tech-bridge';
  bridge.innerHTML='<div><span class="eyebrow">FORSTÅ SELSKABERNE BAG TALLENE</span><h2>Teknologi går på tværs af sektorer</h2><p>En chip, et datacenter og elnettet kan ligge i hver sin sektor, men være afhængige af hinanden. Gå på opdagelse i de 12 temaer og se forbindelserne.</p><strong>Gå på opdagelse i tech <span aria-hidden="true">→</span></strong></div><img src="../assets/img/v5-fotos/chips-siliciumwafer.webp" alt="" loading="lazy">';
  function revealHoldings(){
    const heading=document.getElementById('all-holdings-title');
    if(!heading)return;
    for(let el=heading.parentElement;el;el=el.parentElement)if(el.tagName==='DETAILS')el.open=true;
    requestAnimationFrame(()=>heading.scrollIntoView({behavior:'smooth',block:'start'}));
  }
  function sectors(){
    if(!data)return;
    const groups=sumBy(data.funds[0].positions.filter(p=>p.isin&&p.weight>0),p=>p.sector||'Ikke klassificeret');
    const box=document.getElementById('sector');
    const sectorColors=['#8bb8bc','#d4c889','#91af9a','#b49a7a','#929fbc','#9b8caa','#6c9ba5','#b7c89a','#c3a5a0','#7a9b8d','#a6afb8','#b99a72'];
    const themeImages={"software": "assets/img/v5-fotos/software-ai-serverbakke.webp", "chips": "assets/img/v5-fotos/chips-siliciumwafer.webp", "datacenter": "assets/img/v5-fotos/datacentre-serverraekker.webp", "energi": "assets/img/v5-fotos/energi-hoejspaendingsmast.webp", "platforme": "assets/img/v5-fotos/platforme-pakkesortering.webp", "fintech": "assets/img/v5-fotos/fintech-betalingsterminal.webp", "krypto": "assets/img/v5-fotos/krypto-regnecontainer.webp", "fysisk-ai": "assets/img/v5-fotos/robotter-robotarm-kamera.webp", "rumfart": "assets/img/v5-fotos/rumfart-satellit-i-kredsloeb.webp", "kvante": "assets/img/v5-fotos/kvante-fortyndingskryostat.webp", "sundhed": "assets/img/v5-fotos/sundhed-mr-scanner.webp", "raastoffer": "assets/img/v5-fotos/raastoffer-malm-og-silicium.webp"};
    const entries=groups.map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value);
    box.innerHTML='<div class="analysis-sector-key">'+entries.map((t,i)=>'<button type="button" style="--sector-color:'+sectorColors[i%sectorColors.length]+'" data-sector="'+esc(t.name)+'"><span>'+esc(sectorNames[t.name]||t.name)+'</span><strong>'+pct(t.value)+'</strong><span class="sector-weight-track" aria-hidden="true"><i style="width:'+Math.max(0,Math.min(100,t.value))+'%"></i></span></button>').join('')+'</div>';
    const sectorPanel=box.closest('article');
    sectorPanel.classList.add('sector-standard');
    sectorPanel.querySelector('h2').textContent='Morningstars sektorer';
    sectorPanel.querySelector('.eyebrow').textContent='FONDEN EFTER BRANCHE';
    sectorPanel.querySelector('.segmented')?.setAttribute('hidden','');
    let introduction=sectorPanel.querySelector('.sector-introduction');
    if(!introduction){introduction=document.createElement('p');introduction.className='sector-introduction';box.before(introduction);}
    introduction.textContent='Fondens fordeling efter Morningstars sektorstruktur. Tryk på en sektor for at se aktierne.';
    let themes=document.getElementById('sector-themes');
    if(!themes){
      themes=document.createElement('article');themes.id='sector-themes';themes.className='panel sector-themes';sectorPanel.after(themes);
      const links=[['chips','Chips og halvledere'],['energi','Energi og elnet'],['datacenter','Datacentre'],['platforme','Platformsøkonomi'],['fysisk-ai','Robotter og fysisk AI'],['raastoffer','Råstoffer'],['rumfart','Rumfart'],['fintech','Fintech'],['krypto','Krypto'],['software','Software og AI'],['sundhed','Sundhed og biotek'],['kvante','Kvantecomputere']];
      themes.innerHTML='<span class="eyebrow">VORES BLIK PÅ SELSKABERNE</span><h2>Vores investeringstemaer</h2><p>Vi inddeler også fondens selskaber efter den teknologi, de arbejder med. Det viser forbindelser, som sektorinddelingen ikke får med.</p><div class="sector-theme-links">'+links.map(([id,name])=>'<a href="../temaer/'+id+'.html"><img src="../'+themeImages[id]+'" alt="" loading="lazy"><span>'+name+'</span><span aria-hidden="true">↗</span></a>').join('')+'</div><p class="small muted">Et selskab kan være med i flere investeringstemaer.</p><a class="sector-theme-cta" href="../tech.html">Udforsk investeringstemaerne <span aria-hidden="true">→</span></a>';
    }
    box.querySelectorAll('[data-sector]').forEach(b=>{b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();b.click();}};b.onclick=()=>{sectorFilter=b.dataset.sector;countryFilter='';holdings();revealHoldings();};});
    document.getElementById('sectorNote').textContent='Andel af fondens formue. Kontanter er ikke med.';
  }
  function returnFigure(f,id,distributions=false){
    const points=f.data.filter(p=>Number.isFinite(p.total)).map(p=>({d:p.d,v:p.total}));
    if(!points.length)return '<p>Afkastserie mangler.</p>';
    if(f.inception<points[0].d)points.unshift({d:f.inception,v:100});
    const base=points[0].v;points.forEach(p=>p.v=(p.v/base-1)*100);
    const compact=window.matchMedia('(max-width:700px)').matches;
    const host=document.getElementById(id==='hero-return'?'analysis-hero-chart':'analysis-distributions'),hostW=host&&host.clientWidth?Math.round(host.clientWidth):0;
    /* Graf-review 10.11 punkt 2: tegn i rammens egen bredde, så aksetekst står i 14 px. */
    if(compact&&window.NDI_MOBILE_FIGURE)return window.NDI_MOBILE_FIGURE(points,id,distributions?f.dividends.filter(d=>d.status==='confirmed'):[]);
    const W=hostW?Math.max(300,hostW):(compact?360:760),H=compact?260:Math.round(Math.min(340,Math.max(240,W*.45))),L=compact?45:52,R=compact?12:22,T=distributions?70:24,B=42;
    const first=Date.parse(points[0].d),last=Date.parse(points.at(-1).d),lo=Math.min(0,...points.map(p=>p.v)),hi=Math.max(1,...points.map(p=>p.v));
    const x=d=>L+(Date.parse(d)-first)/(last-first||1)*(W-L-R),y=v=>T+(hi-v)/(hi-lo)*(H-T-B);
    const line=points.map((p,i)=>(i?'L':'M')+x(p.d).toFixed(2)+','+y(p.v).toFixed(2)).join(' ');
    const ticks=Array.from({length:Math.floor(hi/50)+1},(_,i)=>i*50).map(v=>{return '<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="#30454e"/><text x="'+(L-9)+'" y="'+(y(v)+5)+'" text-anchor="end" fill="#b5c8ce" font-size="14">'+n(v,0)+' %</text>';}).join('');
    const markers=distributions?f.dividends.filter(d=>d.status==='confirmed'&&d.exDate>=points[0].d&&d.exDate<=points.at(-1).d).map(d=>'<g><title>Ex-dato '+esc(d.exDate)+': '+n(d.amount,2)+' kr. pr. bevis</title><line x1="'+x(d.exDate)+'" x2="'+x(d.exDate)+'" y1="45" y2="'+(H-B)+'" stroke="#eee69b" stroke-dasharray="4 5"/><rect x="'+(x(d.exDate)-45)+'" y="8" width="90" height="30" rx="9" fill="#eee69b"/><text x="'+x(d.exDate)+'" y="29" text-anchor="middle" fill="#102129" font-size="16">'+n(d.amount,2)+' kr.</text><circle cx="'+x(d.exDate)+'" cy="'+(H-B)+'" r="6" fill="#eee69b"/></g>').join(''):'';
    return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="PMINDI totalafkast i procent, '+esc(points[0].d)+' til '+esc(points.at(-1).d)+(distributions?', med dokumenterede udlodninger':'')+'"><defs><linearGradient id="'+id+'-fill" x2="0" y2="1"><stop stop-color="#9bd6de" stop-opacity=".3"/><stop offset="1" stop-color="#9bd6de" stop-opacity="0"/></linearGradient></defs>'+ticks+'<path d="'+line+' L'+(W-R)+','+(H-B)+' L'+L+','+(H-B)+' Z" fill="url(#'+id+'-fill)"/><path d="'+line+'" fill="none" stroke="#9bd6de" stroke-width="3"/>'+markers+'<circle cx="'+(W-R)+'" cy="'+y(points.at(-1).v)+'" r="5" fill="#eee69b"/><text x="'+L+'" y="'+(H-10)+'" fill="#b5c8ce" font-size="14">'+esc(points[0].d)+'</text><text x="'+(W-R)+'" y="'+(H-10)+'" text-anchor="end" fill="#b5c8ce" font-size="14">'+esc(points.at(-1).d)+'</text></svg>';
  }
  function graphicalOverview(f,m){
    if(!document.getElementById('analysis-hero-chart')){
      const copy=document.createElement('div');copy.className='analysis-hero-copy';
      [...intro.children].filter(el=>!el.classList.contains('analysis-paths')).forEach(el=>copy.appendChild(el));intro.appendChild(copy);
      const figure=document.createElement('figure');figure.id='analysis-hero-chart';intro.appendChild(figure);
    }
    const figure=document.getElementById('analysis-hero-chart');
    const content='<figcaption><span>Totalafkast i DKK · med geninvesteret udbytte — '+new Date(f.performanceAsOf+'T12:00:00').toLocaleDateString('da-DK',{day:'numeric',month:'long',year:'numeric'})+'</span></figcaption>'+returnFigure(f,'hero-return');
    if(!figure.querySelector('.analysis-returns')||figure.dataset.chartKey!==content){figure.innerHTML=content;figure.dataset.chartKey=content;}
    const returns=dashboard.querySelector('.analysis-returns');if(returns){figure.querySelector('.analysis-returns')?.remove();figure.prepend(returns);}
    let panel=document.getElementById('analysis-distributions');
    if(!panel){panel=document.createElement('section');panel.id='analysis-distributions';panel.className='panel analysis-distributions';}
    const table='<table><thead><tr><th>Ex-dato</th><th>Betalingsdato</th><th>Kr. pr. bevis</th></tr></thead><tbody>'+f.dividends.filter(d=>d.status==='confirmed').map(d=>'<tr><td>'+esc(d.exDate)+'</td><td>'+esc(d.paymentDate)+'</td><td>'+n(d.amount,2)+'</td></tr>').join('')+'</tbody></table>';
    const html='<span class="eyebrow">KLASSE OG UDLODNINGER</span><h2>Udloddende klasse</h2><p>PMINDI udbetaler udbytte. Kurven viser det samlede afkast, hvis udbyttet blev geninvesteret. De gule markører viser ex-datoen og udbyttet pr. bevis.</p><figure>'+returnFigure(f,'distribution-return',true)+'</figure><div class="analysis-distribution-details"><div>'+table+'</div><p>På ex-datoen fragår udlodningen normalt kursen. Det er ikke i sig selv et investeringstab. Kurven regner allerede udbyttet med, så det skal ikke lægges til igen.</p></div>';
    if(panel.innerHTML!==html)panel.innerHTML=html;
    const oldClass=[...document.querySelectorAll('#method-content .audit-addition')].find(el=>el.querySelector('h2')?.textContent==='Udloddende klasse'); if(oldClass)oldClass.hidden=true;
    const risk=document.getElementById('risk');if(risk.nextElementSibling!==panel)risk.after(panel);
  }
  function arrange(){
    if(!data)return;
    selected=0;
    const f=data.funds[0],m=insights?.funds?.[f.id],ps=f.positions.filter(p=>p.isin&&p.weight>0);
    const val=(v,percent=true)=>Number.isFinite(v)?(percent?pct(v):n(v,2)):'—';
    const markup='<div class="analysis-dashboard-title"><span class="eyebrow">OVERBLIK FØR DETALJERNE</span><h2>Hvad har fonden givet, og hvad ejer den?</h2><p>Begynd med afkastet. Se derefter, hvor meget det har svinget, og hvordan pengene er fordelt. Tallene her gælder fonden. Kursændringerne længere nede gælder de enkelte aktier.</p></div><div class="analysis-returns">'+[['Totalafkast siden start',m?.totalReturn,'Med geninvesteret udbytte'],['Gennemsnitligt årligt afkast',m?.cagr,'Årligt sammensat afkast siden start'],['År til dato',f.reportedYtd,'Fra årets begyndelse']].map(([label,value,note])=>'<div><span>'+label+'</span><strong>'+val(value)+'</strong><small>'+note+'</small></div>').join('')+'</div><div class="analysis-snapshot"><a href="#portfolio"><strong>'+ps.length+'</strong><span>Positioner i fonden</span></a><a href="#portfolio"><strong>'+pct(ps.slice().sort((a,b)=>b.weight-a.weight).slice(0,10).reduce((a,p)=>a+p.weight,0))+'</strong><span>i de ti største positioner</span></a></div>';
    if(dashboard.innerHTML!==markup)dashboard.innerHTML=markup;
    function explain(id,text){const host=document.getElementById(id);if(!host)return;let p=host.querySelector('.analysis-guide');if(!p){p=document.createElement('p');p.className='analysis-guide';const h=host.querySelector('h2');if(h)h.after(p);else host.prepend(p);}if(p.textContent!==text)p.textContent=text;}
    explain('method','Aktiernes ugeændring sammenligner slutkursen med den seneste handelsdag på eller før datoen syv kalenderdage tidligere. Kurserne er i aktiens handelsvaluta. For selskaber med kort historik viser tabellen afstanden til den højeste observerede kurs siden den angivne startdato. De tæller ikke med som fulde to år i fordelingen ovenfor.');
    explain('preview-risk-summary','Afkast fortæller kun en del af historien. Her ser du, hvor store udsving fonden har haft, og hvor dybe nedturene har været. Volatilitet måler udsvingene. Sharpe-ratio viser, hvor meget afkast fonden har givet ud over den risikofrie rente i forhold til udsvingene.');
    const dd=document.getElementById('drawdown');if(dd){let p=document.getElementById('analysis-drawdown-guide');if(!p){p=document.createElement('p');p.id='analysis-drawdown-guide';p.className='analysis-explain';p.textContent='Forestil dig, at du investerede lige før en top. Grafen viser, hvor langt værdien derefter faldt under den hidtidige top. Ved 0 % har fonden indhentet hele faldet. Jo dybere og længere et dyk er, desto større og mere langvarig har nedturen været.';dd.before(p);}}
    document.querySelectorAll('#drawdown > p').forEach(p=>{if(p.textContent.startsWith('Datoerne i grafen'))p.textContent='Fold listen ud for at se dato og størrelse for hver nedtur. En nedtur slutter, når den tidligere top genvindes. Den aktuelle nedturs bund kan ændre sig.';});
    const rolling=document.getElementById('rolling-chart');if(rolling&&!document.getElementById('analysis-rolling-guide')){const p=document.createElement('p');p.id='analysis-rolling-guide';p.className='analysis-explain';p.textContent='Flyt starttidspunktet én dag ad gangen: hvert punkt viser det afkast, en investering havde givet over de foregående 12 måneder. Det gør det tydeligt, hvor meget resultatet afhænger af, hvornår man investerede.';rolling.before(p);}

    const methodHost=document.getElementById('method-content');
    const formulaTitles=new Set(['Totalafkast, ÅTD og CAGR','12 måneder og månedsafkast','Volatilitet og Sharpe','Fald fra top','toårs top','Aktiernes eksterne kursudvikling']);
    if(methodHost)for(const heading of [...methodHost.children].filter(el=>el.tagName==='H3'&&formulaTitles.has(el.textContent))){
      const details=document.createElement('details');details.className='analysis-formula';
      const summary=document.createElement('summary');heading.before(details);details.append(summary);summary.append(heading);
      while(details.nextElementSibling?.tagName==='P')details.append(details.nextElementSibling);
    }
    if(methodHost&&!document.getElementById('analysis-data-path')){
      const path=document.createElement('div');path.id='analysis-data-path';
      path.innerHTML='<p class="analysis-explain">Fra rapport til figur: afkast og beholdninger har hver sin dato. Derfor viser vi begge datoer, så du kan se, hvilket grundlag du undersøger.</p><ol class="analysis-data-path"><li><span>01</span><strong>Fundmarket</strong><p>Rapporter med fondens kurser og beholdninger.</p></li><li><span>02</span><strong>Fælles datagrundlag</strong><p>Kurser, positioner og dokumenterede udlodninger.</p></li><li><span>03</span><strong>Kontrol</strong><p>Datoer og afkast afstemmes med de angivne kilder.</p></li><li><span>04</span><strong>Denne visning</strong><p>Et dateret datagrundlag. Kursdato og beholdningsdato viser, hvilken periode tallene dækker.</p></li></ol>';
      methodHost.prepend(path);
    }
    const da=day=>day.split('-').reverse().join('.');
    document.getElementById('analysis-date').textContent='PMINDI · Afkast til '+da(data.funds[0].performanceAsOf)+' · Beholdning pr. '+da(data.positionsAsOf||data.asOf);
    document.querySelectorAll('#method p').forEach(p=>{if(p.textContent.startsWith('Data kommer fra Fundmarkets rapporter via'))p.textContent='Fondens tal og aktiekurserne kommer fra den seneste kontrollerede udgave af datagrundlaget, og alle sider bruger den samme udgave. Afkastet følger kursdatoen, og beholdningerne følger beholdningsdatoen. Det er ikke kurser i realtid. Opdateringsdatoerne fremgår ved tallene.';});
    let cursor=menu;
    for(const id of ['analysis-dashboard','preview-risk-summary','highs','portfolio','method']){
      const section=document.getElementById(id);
      if(section){if(cursor.nextElementSibling!==section)cursor.after(section);section.hidden=false;cursor=section;}
    }
    const holdingsHeading=document.getElementById('holdings')?.closest('article')?.querySelector('h2');
    if(holdingsHeading)holdingsHeading.id='all-holdings-title';
    const portfolio=document.getElementById('portfolio'),holdingsPanel=document.getElementById('holdings')?.closest('article'),sectorLayout=portfolio.querySelector('.sector-layout');
    if(sectorLayout&&portfolio.firstElementChild!==sectorLayout)portfolio.prepend(sectorLayout);
    if(holdingsPanel&&sectorLayout&&sectorLayout.nextElementSibling!==holdingsPanel)sectorLayout.after(holdingsPanel);
    if(holdingsPanel&&holdingsPanel.nextElementSibling!==bridge)holdingsPanel.after(bridge);
    const geoPanel=document.getElementById('geography-review');
    if(geoPanel&&bridge.nextElementSibling!==geoPanel)bridge.after(geoPanel);
    graphicalOverview(f,m);
    const snapshot=dashboard.querySelector('.analysis-snapshot');
    if(snapshot){
      intro.querySelector('.intro-fund-facts')?.remove();
      snapshot.className='intro-fund-facts';intro.querySelector('.analysis-hero-copy').append(snapshot);
    }
    dashboard.hidden=true;

    function disclosure(node,title){
      if(!node||node.querySelector(':scope > .portfolio-disclosure'))return;
      const detail=document.createElement('details');detail.className='portfolio-disclosure';
      const summary=document.createElement('summary');summary.textContent=title;
      const body=document.createElement('div');body.className='portfolio-disclosure-body';
      while(node.firstChild)body.append(node.firstChild);
      detail.append(summary,body);node.append(detail);
      detail.open=!disclosureMobile.matches;
      summary.addEventListener('click',event=>{if(!disclosureMobile.matches)event.preventDefault();});
      detail.addEventListener('toggle',()=>{notifyHeight();});
    }
    disclosure(document.getElementById('preview-risk-summary'),'Afkast og risiko i tal');
    disclosure(document.getElementById('highs'),'Afstand fra toårs top');
    disclosure(sectorLayout,'Sektorer og investeringstemaer');
    disclosure(geoPanel,'Hvor ligger selskabernes hovedsæder?');
    disclosure(holdingsPanel,'Se alle aktierne');
    for(const [id,title] of [['drawdown','Vejen gennem nedturene'],['calendar','Afkastkalender'],['rolling-chart','Afkast over 12 måneder']])disclosure(document.getElementById(id)?.closest('article'),title);
    const calendarPanel=document.getElementById('calendar')?.closest('article');
    calendarPanel?.querySelectorAll('p').forEach(p=>{if(p.textContent.startsWith('Alle tal er i %. Afkast mellem'))p.textContent='Alle tal er i procent og inkluderer geninvesteret udbytte. Stjernen markerer startmåneden eller en måned, der endnu ikke er afsluttet. Tomme felter er perioder uden afkasttal.';});
    const riskSummary=document.querySelector('#preview-risk-summary > details > .portfolio-disclosure-body');
    const period=document.getElementById('risk-period');
    const audit=period?.nextElementSibling?.classList.contains('audit-addition')?period.nextElementSibling:null;
    if(riskSummary&&period&&!riskSummary.contains(period))riskSummary.append(period);
    if(riskSummary&&audit){audit.textContent='Risikomålene beskriver fondens historiske udsving. De fortæller ikke, hvor store fremtidige fald kan blive.';riskSummary.append(audit);}
    const riskNote=document.querySelector('#risk > .callout'),drawdownBody=document.getElementById('drawdown')?.closest('.portfolio-disclosure-body');if(riskNote)riskNote.remove();
    if(drawdownBody){let note=drawdownBody.querySelector('.drawdown-risk-note');if(!note){note=document.createElement('p');note.className='small muted drawdown-risk-note';note.textContent='Historisk afkast er ikke en retvisende indikator for fremtidigt afkast.';drawdownBody.append(note);}}
    disclosure(document.getElementById('analysis-distributions'),'Udbytte og samlet afkast');
    disclosure(document.getElementById('method'),'Data og omkostninger');
    // Keep all optional analyses together; the company list is opened on demand.
    if(geoPanel&&sectorLayout)sectorLayout.after(geoPanel);
    const risk=document.getElementById('risk');
    if(risk&&geoPanel){risk.hidden=false;if(geoPanel.nextElementSibling!==risk)geoPanel.after(risk);}
    const distribution=document.getElementById('analysis-distributions');
    if(distribution&&risk)risk.after(distribution);
    if(holdingsPanel&&distribution)distribution.after(holdingsPanel);
    if(bridge&&holdingsPanel)holdingsPanel.after(bridge);
    const summaryPanel=document.getElementById('preview-risk-summary'),highPanel=document.getElementById('highs'),drawdownPanel=document.getElementById('drawdown')?.closest('article');
    if(holdingsPanel&&summaryPanel)summaryPanel.append(holdingsPanel);
    if(drawdownPanel&&highPanel)highPanel.append(drawdownPanel);
    intro.querySelectorAll('.intro-fund-facts a[href="#portfolio"]').forEach(a=>a.onclick=event=>{event.preventDefault();revealHoldings();});





  }
  const originalRender=render;
  render=function(){selected=0;attachWeek();originalRender();sectors();arrange();};
  let sortKey='weight',sortDirection=-1;
  const originalMarkup=holdingsMarkup;
  holdingsMarkup=function(ps){
    const value=p=>sortKey==='weight'?p.weight:marketRow(p)?.priceReturns?.[sortKey];
    const ordered=ps.slice().sort((a,b)=>{const av=value(a),bv=value(b);if(!Number.isFinite(av))return Number.isFinite(bv)?1:0;if(!Number.isFinite(bv))return -1;return (av-bv)*sortDirection;});
    return originalMarkup(ordered);
  };
  function renderMobileHoldings(){
    const body=document.getElementById('holdings'),table=body?.closest('table');if(!table)return;
    const wrap=table.closest('.tablewrap')||table;wrap.classList.add('analysis-desktop-holdings');
    let mobile=document.getElementById('analysis-mobile-holdings');
    if(!mobile){mobile=document.createElement('div');mobile.id='analysis-mobile-holdings';mobile.className='analysis-mobile-holdings';wrap.before(mobile);}
    const heads=[...table.querySelectorAll('thead th')].map(h=>h.textContent.replace(/[↕↓↑]/g,'').trim());
    const maxWeight=Math.max(...data.funds[0].positions.map(p=>Number(p.weight)||0),1);
    const options=[['weight','Vægt i fonden'],...periods.map(([key],i)=>[key,heads[4+i]])];
    mobile.innerHTML='<div class="analysis-mobile-sort"><label for="mobile-holdings-sort">Sortér selskaber</label><select id="mobile-holdings-sort">'+options.map(([key,label])=>'<option value="'+key+'"'+(key===sortKey?' selected':'')+'>'+esc(label)+'</option>').join('')+'</select><button type="button" aria-label="Skift sorteringsretning">'+(sortDirection===-1?'Størst først ↓':'Mindst først ↑')+'</button></div><div class="analysis-holding-cards">'+[...body.rows].map(row=>{
      const cells=[...row.cells];if(cells.length<5)return '<p class="analysis-empty">'+esc(row.textContent)+'</p>';
      const value=Number(row.dataset.weight);
      return '<article class="analysis-holding-card"><div class="analysis-holding-title"><div>'+cells[0].innerHTML+'</div><strong>'+cells[3].innerHTML+'<small>af fonden</small></strong></div><div class="analysis-holding-weight" aria-hidden="true"><i style="width:'+(Number.isFinite(value)?Math.max(0,Math.min(100,value/maxWeight*100)):0)+'%"></i></div><p class="analysis-holding-sector">'+cells[1].innerHTML+'</p><dl>'+cells.slice(4).map((cell,i)=>'<div><dt>'+esc(i===cells.length-5?'Under toppen':heads[i+4])+'</dt><dd class="'+(cell.classList.contains('analysis-up')?'analysis-up':cell.classList.contains('analysis-down')?'analysis-down':'')+'">'+cell.innerHTML+'</dd></div>').join('')+'</dl><details><summary>Kurs og handelsdato</summary><p>'+cells[2].innerHTML+'</p></details></article>';
    }).join('')+'</div>';
    mobile.querySelector('select').onchange=e=>{sortKey=e.target.value;holdings();};
    mobile.querySelector('button').onclick=()=>{sortDirection=-sortDirection;holdings();};
  }
  document.addEventListener('ndi-holdings-linked',renderMobileHoldings);
  function decorateHoldings(){
    const body=document.getElementById('holdings'),table=body.closest('table');
    const headers=table.querySelectorAll('thead th');
    headers[headers.length-1].innerHTML='Under toppen<small>to år eller tilgængelig historik</small>';
    const keys={3:'weight'};periods.forEach(([key],i)=>keys[4+i]=key);
    Object.entries(keys).forEach(([index,key])=>{const th=headers[index];if(!th)return;const label=th.textContent;th.setAttribute('aria-sort',key===sortKey?(sortDirection===-1?'descending':'ascending'):'none');th.innerHTML='<button type="button" class="analysis-sort">'+esc(label)+' <span aria-hidden="true">'+(key===sortKey?(sortDirection===-1?'↓':'↑'):'↕')+'</span></button>';th.firstChild.onclick=()=>{sortDirection=sortKey===key?-sortDirection:-1;sortKey=key;holdings();};});
    body.querySelectorAll('tr').forEach(row=>{periods.forEach((_,i)=>{const cell=row.cells[4+i];if(!cell)return;const v=Number(cell.textContent.replace(/[^0-9,.-]/g,'').replace(',','.'));if(cell.textContent.includes('%'))cell.classList.add(v>0?'analysis-up':v<0?'analysis-down':'analysis-flat');});const isin=row.cells[0]?.querySelector('small:last-child')?.textContent;const r=highData?.funds.find(f=>f.short===data.funds[0].short)?.rows.find(r=>r.isin===isin);const last=row.cells[row.cells.length-1],extra=r?.availableHistoryTop;if(r?.status==='short_history'){last.innerHTML=Number.isFinite(extra?.distance)?pct(extra.distance)+'<small>Top siden '+esc(extra.start.split('-').reverse().join('.'))+'</small>':'<span class="analysis-missing">—</span><small>Afventer kurshistorik</small>';}});
  }
  const originalHoldings=holdings;
  holdings=function(){originalHoldings();decorateHoldings();renderMobileHoldings();arrange();};
  document.getElementById('search').oninput=()=>holdings();
  const originalGeography=renderGeography;
  function decorateGeography(){
    if(!data||!geography||geography.asOf!==data.asOf)return;
    const rows=geography.funds[data.funds[0].id]||[];
    const groups=sumBy(rows.filter(r=>r.status==='profile_found'&&r.country&&!/^(unknown|ukendt|n\/a)$/i.test(r.country)),r=>r.country);
    document.querySelectorAll('#geography-review p').forEach(p=>{if(p.textContent.startsWith('Ukendt:'))p.remove();});
    const weights=new Map(groups);
    document.querySelectorAll('#geography-review .country-pick').forEach(button=>{
      const weight=weights.get(button.dataset.hq);
      if(!Number.isFinite(weight))return;
      button.classList.add('analysis-country');
      let track=button.querySelector('.analysis-country-track');
      if(!track){track=document.createElement('i');track.className='analysis-country-track';track.setAttribute('aria-hidden','true');track.appendChild(document.createElement('i'));button.appendChild(track);}
      track.firstChild.style.width=Math.max(0,Math.min(100,weight))+'%';
    });
    const map=document.getElementById('hq-map');
    if(map&&!map.querySelector('.analysis-geo-guide')&&groups.length){
      const lead=document.createElement('p');lead.className='analysis-geo-guide';
      const largest=groups[0];lead.innerHTML='<strong>'+pct(largest[1])+'</strong><span>af fonden er i selskaber med hovedsæde i '+esc(countryLabel(largest[0]))+'.</span>';
      map.prepend(lead);
    }
  }
  renderGeography=function(){originalGeography();decorateGeography();arrange();};
  window.addEventListener('resize',()=>requestAnimationFrame(arrange));
  decorateGeography();
  if(data){attachWeek();holdings();sectors();arrange();}
  new MutationObserver(arrange).observe(main,{childList:true});
  // Same lazy map loader as the existing full view, now on the analysis page.
  window.NDI_FETCH('world.geojson').then(r=>{if(!r.ok)throw Error('Kortdata mangler');return r.json()}).then(w=>{world=w;if(data&&geography)renderGeography();}).catch(()=>{});
})();







