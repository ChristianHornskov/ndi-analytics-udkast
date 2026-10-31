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



  }
  const originalRender=render;
  render=function(){selected=0;originalRender();arrange();};
  const originalHoldings=holdings;
  holdings=function(){originalHoldings();arrange();};
  if(data)arrange();
  new MutationObserver(arrange).observe(main,{childList:true});
  // Same lazy map loader as the existing full view, now on the analysis page.
  fetch('world.geojson').then(r=>{if(!r.ok)throw Error('Kortdata mangler');return r.json()}).then(w=>{world=w;if(data&&geography)renderGeography();}).catch(()=>{});
})();

