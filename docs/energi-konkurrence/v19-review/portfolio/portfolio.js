/* Portfolio-only composition of the existing homepage's full analysis. */
(() => {
  document.documentElement.classList.add('advanced-view','portfolio-analysis');
  const supplement=window.NDI_PORTFOLIO_SUPPLEMENT?.rows||{};
  if(!periods.some(([key])=>key==='w1'))periods.splice(1,0,['w1','1 uge']);
  function attachWeek(){if(!highData)return;highData.funds.find(f=>f.short==='PMINDI')?.rows.forEach(r=>{const extra=supplement[r.isin];if(extra?.date===r.returnDate&&Math.abs(extra.close-r.marketClose)<.0001)r.priceReturns.w1=extra.w1;});}
  const main=document.querySelector('main');
  const intro=document.createElement('section');intro.className='analysis-intro';
  intro.innerHTML='<div class="analysis-paths"><a href="../widget/index.html">← Fondens udvikling</a><a href="../tech.html">Gå på opdagelse i tech →</a></div><p class="eyebrow">NEWDEAL INVEST · PMINDI</p><h1>Porteføljen under lup</h1><p>Se, hvad fonden ejer, hvordan investeringerne er fordelt, og hvor store udsving porteføljen har haft.</p><p id="analysis-date" class="small muted"></p>';
  main.prepend(intro);
  const menu=document.createElement('nav');menu.id='analysis-nav';menu.setAttribute('aria-label','Porteføljeanalyse');
  menu.innerHTML='<a href="#analysis-dashboard">Overblik</a><a href="#preview-risk-summary">Risiko i tal</a><a href="#highs">Afstand til toppen</a><a href="#portfolio">Fordeling & selskaber</a><a href="#risk">Nedture & afkast</a><a href="#method">Datagrundlag</a>';
  intro.after(menu);
  const dashboard=document.createElement('section');dashboard.id='analysis-dashboard';dashboard.className='analysis-dashboard';menu.after(dashboard);
  const bridge=document.createElement('a');bridge.href='../tech.html';bridge.className='analysis-tech-bridge';
  bridge.innerHTML='<div><span class="eyebrow">FORSTÅ SELSKABERNE BAG TALLENE</span><h2>Teknologi går på tværs af sektorer</h2><p>En chip, et datacenter og elnettet kan ligge i hver sin sektor — men være afhængige af hinanden. Gå på opdagelse i de 12 temaer og se forbindelserne.</p><strong>Gå på opdagelse i tech <span aria-hidden="true">→</span></strong></div><img src="../assets/img/v5-fotos/chips-siliciumwafer.webp" alt="" loading="lazy">';
  function sectors(){
    if(!data)return;
    const groups=sumBy(data.funds[0].positions.filter(p=>p.isin&&p.weight>0),p=>p.sector||'Ikke klassificeret');
    const box=document.getElementById('sector');
    // A proportional area map, with a readable legend rather than a wall of bars.
    function partition(items,x,y,w,h){
      if(items.length===1)return [{...items[0],x,y,w,h}];
      const total=items.reduce((a,v)=>a+v.value,0);let sum=0,cut=0;
      while(cut<items.length-1&&sum<total/2){sum+=items[cut++].value;}
      const share=sum/total;
      return w>h?[...partition(items.slice(0,cut),x,y,w*share,h),...partition(items.slice(cut),x+w*share,y,w*(1-share),h)]:[...partition(items.slice(0,cut),x,y,w,h*share),...partition(items.slice(cut),x,y+h*share,w,h*(1-share))];
    }
    const colors=['#79b9c0','#d9ce92','#94bba5','#6f94ad','#b6a98f','#86a4a2','#c6d5bc','#789d81','#a6b8c8','#b8a7bf','#8c9aab','#799b9f'];
    const entries=groups.map(([name,value],i)=>({name,value,i}));
    const tiles=partition(entries,0,0,1000,440);
    box.innerHTML='<p class="analysis-explain">Jo større et felt er, desto mere fylder sektoren blandt fondens aktier. Selskaber i forskellige sektorer kan stadig være afhængige af den samme teknologi. Vælg et felt eller et navn for at se selskaberne.</p><div class="analysis-sector-map"><svg viewBox="0 0 1000 440" role="group" aria-label="Sektorer fordelt efter deres vægt blandt aktierne">'+tiles.map(t=>'<g tabindex="0" role="button" data-sector="'+esc(t.name)+'" aria-label="'+esc(sectorNames[t.name]||t.name)+' '+pct(t.value)+'"><title>'+esc(sectorNames[t.name]||t.name)+' · '+pct(t.value)+' af fonden</title><rect x="'+(t.x+3)+'" y="'+(t.y+3)+'" width="'+Math.max(0,t.w-6)+'" height="'+Math.max(0,t.h-6)+'" rx="8" fill="'+colors[t.i%colors.length]+'"/>'+(t.w>105&&t.h>95?'<text x="'+(t.x+18)+'" y="'+(t.y+38)+'" fill="#0b2029" font-size="'+(t.w<160?13:t.w<250?17:23)+'">'+esc(sectorNames[t.name]||t.name)+'</text><text x="'+(t.x+18)+'" y="'+(t.y+72)+'" fill="#0b2029" font-size="30">'+pct(t.value)+'</text>':'')+'</g>').join('')+'</svg></div><div class="analysis-sector-key">'+entries.map(t=>'<button type="button" data-sector="'+esc(t.name)+'"><i style="background:'+colors[t.i%colors.length]+'"></i><span>'+esc(sectorNames[t.name]||t.name)+'</span><strong>'+pct(t.value)+'</strong></button>').join('')+'</div>';
    box.querySelectorAll('[data-sector]').forEach(b=>{b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();b.click();}};b.onclick=()=>{sectorFilter=b.dataset.sector;countryFilter='';holdings();document.getElementById('holdings').closest('article').scrollIntoView({behavior:'smooth',block:'start'});};});
    document.getElementById('sectorNote').textContent='Andel af hele fondens formue. Klik på en sektor for at se selskaberne. Leverandørens sektorinddeling; kontanter er ikke med.';
  }
  function arrange(){
    if(!data)return;
    selected=0;
    const f=data.funds[0],m=insights?.funds?.[f.id],ps=f.positions.filter(p=>p.isin&&p.weight>0);
    const val=(v,percent=true)=>Number.isFinite(v)?(percent?pct(v):n(v,2)):'—';
    const markup='<div class="analysis-dashboard-title"><span class="eyebrow">OVERBLIK FØR DETALJERNE</span><h2>Hvad har fonden givet — og hvad ejer den?</h2><p>Begynd med afkastet. Se derefter, hvor meget det har svinget, og hvordan pengene er fordelt. Tallene beskriver fonden; kursændringerne længere nede beskriver de enkelte aktier.</p></div><div class="analysis-returns">'+[['Totalafkast siden start',m?.totalReturn,'Med geninvesteret udbytte'],['Gennemsnitligt årligt afkast',m?.cagr,'Årligt sammensat afkast siden start'],['År til dato',f.reportedYtd,'Fra årets begyndelse']].map(([label,value,note])=>'<div><span>'+label+'</span><strong>'+val(value)+'</strong><small>'+note+'</small></div>').join('')+'</div><div class="analysis-snapshot"><a href="#portfolio"><strong>'+ps.length+'</strong><span>værdipapirpositioner</span></a><a href="#portfolio"><strong>'+pct(ps.slice().sort((a,b)=>b.weight-a.weight).slice(0,10).reduce((a,p)=>a+p.weight,0))+'</strong><span>i de ti største positioner</span></a><a href="#preview-risk-summary"><strong>'+val(m?.sharpe,false)+'</strong><span>Sharpe-ratio · afkast i forhold til udsving</span></a></div>';
    if(dashboard.innerHTML!==markup)dashboard.innerHTML=markup;
    function explain(id,text){const host=document.getElementById(id);if(!host)return;let p=host.querySelector('.analysis-guide');if(!p){p=document.createElement('p');p.className='analysis-guide';const h=host.querySelector('h2');if(h)h.after(p);else host.prepend(p);}if(p.textContent!==text)p.textContent=text;}
    explain('method','Aktiernes ugeændring sammenligner slutkursen med den seneste handelsdag på eller før datoen syv kalenderdage tidligere. Kurserne er i aktiens handelsvaluta. For selskaber med kort historik viser tabellen afstanden til den højeste observerede kurs siden den angivne startdato; de indgår ikke som fulde 52-ugers observationer i fordelingen ovenfor.');
    explain('preview-risk-summary','Afkast fortæller kun en del af historien. Her ser du, hvor store udsving fonden har haft, og hvor dybe nedturene har været. Volatilitet måler udsvingene; Sharpe-ratio sætter afkast ud over den risikofrie rente i forhold til udsvingene.');
    const dd=document.getElementById('drawdown');if(dd){let p=document.getElementById('analysis-drawdown-guide');if(!p){p=document.createElement('p');p.id='analysis-drawdown-guide';p.className='analysis-explain';p.textContent='Forestil dig, at du investerede lige før en top. Grafen viser, hvor langt værdien derefter faldt under den hidtidige top. Ved 0 % har fonden indhentet hele faldet. Jo dybere og længere et dyk er, desto større og mere langvarig har nedturen været.';dd.before(p);}}
    const rolling=document.getElementById('rolling-chart');if(rolling&&!document.getElementById('analysis-rolling-guide')){const p=document.createElement('p');p.id='analysis-rolling-guide';p.className='analysis-explain';p.textContent='Flyt starttidspunktet én dag ad gangen: hvert punkt viser det afkast, en investering havde givet over de foregående 12 måneder. Det gør det tydeligt, hvor meget resultatet afhænger af, hvornår man investerede.';rolling.before(p);}

    const da=day=>day.split('-').reverse().join('.');
    document.getElementById('analysis-date').textContent='PMINDI · Afkast til '+da(data.funds[0].performanceAsOf)+' · Beholdning pr. '+da(data.positionsAsOf||data.asOf);
    document.querySelectorAll('#method p').forEach(p=>{if(p.textContent.startsWith('Data kommer fra Fundmarkets rapporter via'))p.textContent='Denne testversion bruger et fast udtræk af Fundmarkets rapporter og de kontrollerede datafiler. Afkast følger den officielle kursdato; beholdninger følger rapportdatoen. Siden opdaterer ikke sig selv til en ny dataversion.';});
    let cursor=menu;
    for(const id of ['analysis-dashboard','preview-risk-summary','highs','portfolio','risk','method']){
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
  function decorateHoldings(){
    const body=document.getElementById('holdings'),table=body.closest('table');
    const headers=table.querySelectorAll('thead th');
    headers[headers.length-1].innerHTML='Under toppen<small>52 uger eller tilgængelig historik</small>';
    const keys={3:'weight'};periods.forEach(([key],i)=>keys[4+i]=key);
    Object.entries(keys).forEach(([index,key])=>{const th=headers[index];if(!th)return;const label=th.textContent;th.setAttribute('aria-sort',key===sortKey?(sortDirection===-1?'descending':'ascending'):'none');th.innerHTML='<button type="button" class="analysis-sort">'+esc(label)+' <span aria-hidden="true">'+(key===sortKey?(sortDirection===-1?'↓':'↑'):'↕')+'</span></button>';th.firstChild.onclick=()=>{sortDirection=sortKey===key?-sortDirection:-1;sortKey=key;holdings();};});
    body.querySelectorAll('tr').forEach(row=>{periods.forEach((_,i)=>{const cell=row.cells[4+i];if(!cell)return;const v=Number(cell.textContent.replace(/[^0-9,.-]/g,'').replace(',','.'));if(cell.textContent.includes('%'))cell.classList.add(v>0?'analysis-up':v<0?'analysis-down':'analysis-flat');});const isin=row.cells[0]?.querySelector('small:last-child')?.textContent;const r=highData?.funds.find(f=>f.short===data.funds[0].short)?.rows.find(r=>r.isin===isin);const last=row.cells[row.cells.length-1],extra=supplement[isin];if(r?.status==='short_history'){last.innerHTML=Number.isFinite(extra?.distance)?pct(extra.distance)+'<small>Top siden '+esc(extra.start)+'</small>':'<span class="analysis-missing">Kort historik</span><small>Topkurs mangler i data</small>';}});
  }
  const originalHoldings=holdings;
  holdings=function(){originalHoldings();decorateHoldings();arrange();};
  const originalGeography=renderGeography;
  renderGeography=function(){originalGeography();arrange();};
  if(data){attachWeek();holdings();sectors();arrange();}
  new MutationObserver(arrange).observe(main,{childList:true});
  // Same lazy map loader as the existing full view, now on the analysis page.
  fetch('world.geojson').then(r=>{if(!r.ok)throw Error('Kortdata mangler');return r.json()}).then(w=>{world=w;if(data&&geography)renderGeography();}).catch(()=>{});
})();

