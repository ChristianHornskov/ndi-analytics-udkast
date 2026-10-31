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
    box.querySelectorAll('[data-sector]').forEach(b=>{b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();b.click();}};b.onclick=()=>{sectorFilter=b.dataset.sector;countryFilter='';holdings();document.getElementById('all-holdings-title').scrollIntoView({behavior:'smooth',block:'start'});};});
    document.getElementById('sectorNote').textContent='Andel af hele fondens formue. Klik på en sektor for at se selskaberne. Leverandørens sektorinddeling; kontanter er ikke med.';
  }
  function returnFigure(f,id,distributions=false){
    const points=f.data.filter(p=>Number.isFinite(p.total)).map(p=>({d:p.d,v:p.total}));
    if(!points.length)return '<p>Afkastserie mangler.</p>';
    if(f.inception<points[0].d)points.unshift({d:f.inception,v:100});
    const base=points[0].v;points.forEach(p=>p.v=(p.v/base-1)*100);
    const compact=window.matchMedia('(max-width:700px)').matches;
    const W=compact?360:760,H=compact?260:340,L=compact?45:52,R=compact?12:22,T=distributions?70:24,B=42;
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
    const content='<figcaption><span>Totalafkast i DKK<small>Med geninvesteret udbytte · '+esc(f.performanceAsOf)+'</small></span><strong>'+pct(m?.totalReturn)+'</strong></figcaption>'+returnFigure(f,'hero-return');
    if(figure.innerHTML!==content)figure.innerHTML=content;
    let panel=document.getElementById('analysis-distributions');
    if(!panel){panel=document.createElement('section');panel.id='analysis-distributions';panel.className='panel analysis-distributions';}
    const table='<table><thead><tr><th>Ex-dato</th><th>Betalingsdato</th><th>Kr. pr. bevis</th></tr></thead><tbody>'+f.dividends.filter(d=>d.status==='confirmed').map(d=>'<tr><td>'+esc(d.exDate)+'</td><td>'+esc(d.paymentDate)+'</td><td>'+n(d.amount,2)+'</td></tr>').join('')+'</tbody></table>';
    const html='<span class="eyebrow">KLASSE OG UDLODNINGER</span><h2>Udloddende klasse</h2><p>PMINDI udbetaler udbytte. Kurven viser det samlede afkast, hvis udbyttet blev geninvesteret. De gule markører viser ex-datoen og udbyttet pr. bevis.</p><figure>'+returnFigure(f,'distribution-return',true)+'</figure><div class="analysis-distribution-details"><div>'+table+'</div><p>På ex-datoen fragår udlodningen normalt kursen. Det er ikke i sig selv et investeringstab. Kurven indeholder allerede geninvesteringen; udbyttet skal ikke lægges til igen.</p></div>';
    if(panel.innerHTML!==html)panel.innerHTML=html;
    const oldClass=[...document.querySelectorAll('#method-content .audit-addition')].find(el=>el.querySelector('h2')?.textContent==='Udloddende klasse'); if(oldClass)oldClass.hidden=true;
    const risk=document.getElementById('risk');if(risk.nextElementSibling!==panel)risk.after(panel);
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
    document.querySelectorAll('#drawdown > p').forEach(p=>{if(p.textContent.startsWith('Datoerne i grafen'))p.textContent='Fold listen ud for at se dato og størrelse for hver nedtur. En nedtur slutter, når den tidligere top genvindes. Den aktuelle nedturs bund kan ændre sig.';});
    const rolling=document.getElementById('rolling-chart');if(rolling&&!document.getElementById('analysis-rolling-guide')){const p=document.createElement('p');p.id='analysis-rolling-guide';p.className='analysis-explain';p.textContent='Flyt starttidspunktet én dag ad gangen: hvert punkt viser det afkast, en investering havde givet over de foregående 12 måneder. Det gør det tydeligt, hvor meget resultatet afhænger af, hvornår man investerede.';rolling.before(p);}

    const da=day=>day.split('-').reverse().join('.');
    document.getElementById('analysis-date').textContent='PMINDI · Afkast til '+da(data.funds[0].performanceAsOf)+' · Beholdning pr. '+da(data.positionsAsOf||data.asOf);
    document.querySelectorAll('#method p').forEach(p=>{if(p.textContent.startsWith('Data kommer fra Fundmarkets rapporter via'))p.textContent='Denne testversion bruger et fast udtræk af Fundmarkets rapporter og de kontrollerede datafiler. Afkast følger den officielle kursdato; beholdninger følger rapportdatoen. Siden opdaterer ikke sig selv til en ny dataversion.';});
    let cursor=menu;
    for(const id of ['analysis-dashboard','preview-risk-summary','highs','portfolio','risk','analysis-distributions','method']){
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
      const value=parseFloat(cells[3].textContent.replace(',','.'));
      return '<article class="analysis-holding-card"><div class="analysis-holding-title"><div>'+cells[0].innerHTML+'</div><strong>'+cells[3].innerHTML+'<small>af fonden</small></strong></div><div class="analysis-holding-weight" aria-hidden="true"><i style="width:'+Math.max(0,Math.min(100,value/maxWeight*100))+'%"></i></div><p class="analysis-holding-sector">'+cells[1].innerHTML+'</p><dl>'+cells.slice(4).map((cell,i)=>'<div><dt>'+esc(i===cells.length-5?'Under toppen':heads[i+4])+'</dt><dd class="'+(cell.classList.contains('analysis-up')?'analysis-up':cell.classList.contains('analysis-down')?'analysis-down':'')+'">'+cell.innerHTML+'</dd></div>').join('')+'</dl><details><summary>Kurs og handelsdato</summary><p>'+cells[2].innerHTML+'</p></details></article>';
    }).join('')+'</div>';
    mobile.querySelector('select').onchange=e=>{sortKey=e.target.value;holdings();};
    mobile.querySelector('button').onclick=()=>{sortDirection=-sortDirection;holdings();};
  }
  document.addEventListener('ndi-holdings-linked',renderMobileHoldings);
  function decorateHoldings(){
    const body=document.getElementById('holdings'),table=body.closest('table');
    const headers=table.querySelectorAll('thead th');
    headers[headers.length-1].innerHTML='Under toppen<small>52 uger eller tilgængelig historik</small>';
    const keys={3:'weight'};periods.forEach(([key],i)=>keys[4+i]=key);
    Object.entries(keys).forEach(([index,key])=>{const th=headers[index];if(!th)return;const label=th.textContent;th.setAttribute('aria-sort',key===sortKey?(sortDirection===-1?'descending':'ascending'):'none');th.innerHTML='<button type="button" class="analysis-sort">'+esc(label)+' <span aria-hidden="true">'+(key===sortKey?(sortDirection===-1?'↓':'↑'):'↕')+'</span></button>';th.firstChild.onclick=()=>{sortDirection=sortKey===key?-sortDirection:-1;sortKey=key;holdings();};});
    body.querySelectorAll('tr').forEach(row=>{periods.forEach((_,i)=>{const cell=row.cells[4+i];if(!cell)return;const v=Number(cell.textContent.replace(/[^0-9,.-]/g,'').replace(',','.'));if(cell.textContent.includes('%'))cell.classList.add(v>0?'analysis-up':v<0?'analysis-down':'analysis-flat');});const isin=row.cells[0]?.querySelector('small:last-child')?.textContent;const r=highData?.funds.find(f=>f.short===data.funds[0].short)?.rows.find(r=>r.isin===isin);const last=row.cells[row.cells.length-1],extra=supplement[isin];if(r?.status==='short_history'){last.innerHTML=Number.isFinite(extra?.distance)?pct(extra.distance)+'<small>Top siden '+esc(extra.start)+'</small>':'<span class="analysis-missing">Kort historik</span><small>Topkurs mangler i data</small>';}});
  }
  const originalHoldings=holdings;
  holdings=function(){originalHoldings();decorateHoldings();renderMobileHoldings();arrange();};
  document.getElementById('search').oninput=()=>holdings();
  const originalGeography=renderGeography;
  function decorateGeography(){
    if(!data||!geography||geography.asOf!==data.asOf)return;
    const rows=geography.funds[data.funds[0].id]||[];
    const groups=sumBy(rows.filter(r=>r.status==='profile_found'),r=>r.country);
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
  fetch('world.geojson').then(r=>{if(!r.ok)throw Error('Kortdata mangler');return r.json()}).then(w=>{world=w;if(data&&geography)renderGeography();}).catch(()=>{});
})();







