/* Portfolio-only composition of the existing homepage's full analysis. */
(() => {
  document.documentElement.classList.add('advanced-view','portfolio-analysis');
  const main=document.querySelector('main');
  const intro=document.createElement('section');intro.className='analysis-intro';
  intro.innerHTML='<div class="analysis-paths"><a href="../widget/index.html">← Fondens udvikling</a><a href="../tech.html">Gå på opdagelse i tech →</a></div><p class="eyebrow">NEWDEAL INVEST · PMINDI</p><h1>Porteføljen under lup</h1><p>Se, hvad fonden ejer, hvordan investeringerne er fordelt, og hvor store udsving porteføljen har haft.</p><p id="analysis-date" class="small muted"></p>';
  main.prepend(intro);
  const menu=document.createElement('nav');menu.id='analysis-nav';menu.setAttribute('aria-label','Porteføljeanalyse');
  menu.innerHTML='<a href="#portfolio">Beholdninger & spredning</a><a href="#highs">52-ugers top</a><a href="#preview-risk-summary">Nøgletal & risiko</a><a href="#risk">Historiske udsving</a><a href="#method">Datagrundlag</a>';
  intro.after(menu);
  const bridge=document.createElement('a');bridge.href='../tech.html';bridge.className='analysis-tech-bridge';
  bridge.innerHTML='<div><span class="eyebrow">FORSTÅ SELSKABERNE BAG TALLENE</span><h2>Teknologi går på tværs af sektorer</h2><p>En chip, et datacenter og elnettet kan ligge i hver sin sektor — men være afhængige af hinanden. Gå på opdagelse i de 12 temaer og se forbindelserne.</p><strong>Gå på opdagelse i tech <span aria-hidden="true">→</span></strong></div><img src="../assets/img/v5-fotos/chips-siliciumwafer.webp" alt="" loading="lazy">';
  function sectors(){
    if(!data)return;
    const groups=sumBy(data.funds[0].positions.filter(p=>p.isin&&p.weight>0),p=>p.sector||'Ikke klassificeret');
    const box=document.getElementById('sector');
    box.innerHTML='<div class="analysis-sector-bars">'+groups.map(([name,value],i)=>'<button type="button" data-sector="'+esc(name)+'"><span class="analysis-sector-label"><span>'+esc(sectorNames[name]||name)+'</span><strong>'+pct(value)+'</strong></span><span class="analysis-sector-track"><i style="width:'+Math.min(100,value)+'%;background:'+palette[i%palette.length]+'"></i></span></button>').join('')+'</div>';
    box.querySelectorAll('button').forEach(b=>b.onclick=()=>{sectorFilter=b.dataset.sector;countryFilter='';holdings();document.getElementById('holdings').closest('article').scrollIntoView({behavior:'smooth',block:'start'});});
    document.getElementById('sectorNote').textContent='Andel af hele fondens formue. Klik på en sektor for at se selskaberne. Leverandørens sektorinddeling; kontanter er ikke med.';
  }
  function arrange(){
    if(!data)return;
    selected=0;
    document.getElementById('analysis-date').textContent='PMINDI · beholdningsrapport '+data.asOf+' · officielle kursdata til '+data.funds[0].performanceAsOf;
    let cursor=menu;
    for(const id of ['portfolio','highs','preview-risk-summary','risk','method']){
      const section=document.getElementById(id);
      if(section){if(cursor.nextElementSibling!==section)cursor.after(section);section.hidden=false;cursor=section;}
    }
    const holdingsHeading=document.getElementById('holdings')?.closest('article')?.querySelector('h2');
    if(holdingsHeading)holdingsHeading.id='all-holdings-title';
    const portfolio=document.getElementById('portfolio'),holdingsPanel=document.getElementById('holdings')?.closest('article'),sectorLayout=portfolio.querySelector('.sector-layout');
    if(holdingsPanel&&portfolio.firstElementChild!==holdingsPanel)portfolio.prepend(holdingsPanel);
    if(holdingsPanel&&sectorLayout&&holdingsPanel.nextElementSibling!==sectorLayout)holdingsPanel.after(sectorLayout);
    if(sectorLayout&&sectorLayout.nextElementSibling!==bridge)sectorLayout.after(bridge);
    const geoPanel=document.getElementById('geography-review');
    if(geoPanel&&bridge.nextElementSibling!==geoPanel)bridge.after(geoPanel);




  }
  const originalRender=render;
  render=function(){selected=0;originalRender();sectors();arrange();};
  const originalHoldings=holdings;
  holdings=function(){originalHoldings();arrange();};
  const originalGeography=renderGeography;
  renderGeography=function(){originalGeography();arrange();};
  if(data){sectors();arrange();}
  new MutationObserver(arrange).observe(main,{childList:true});
  // Same lazy map loader as the existing full view, now on the analysis page.
  fetch('world.geojson').then(r=>{if(!r.ok)throw Error('Kortdata mangler');return r.json()}).then(w=>{world=w;if(data&&geography)renderGeography();}).catch(()=>{});
})();

