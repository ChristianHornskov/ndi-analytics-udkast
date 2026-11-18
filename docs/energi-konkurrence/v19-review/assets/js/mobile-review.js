/* Mobile composition. Figures, risk text and Azure values are not recalculated here. */
(()=>{'use strict';
 const sheet=document.querySelector('link[href*="mobile-review.css"]');if(sheet)document.head.append(sheet);
 const root=new URL('../../',document.currentScript.src),small=matchMedia('(max-width:700px)');
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n};
 const link=(label,path)=>{const a=el('a','',label);a.href=new URL(path,root);return a};
 const paths=[['Afkast','widget/index.html'],['Portefølje','portfolio/index.html'],['Temaer','tech.html']];
 function nav(cls){const n=el('nav',cls);n.setAttribute('aria-label','Porteføljens hovedsider');paths.filter(([label])=>!location.pathname.endsWith('/portfolio/index.html')||label!=='Afkast').forEach(([label,path])=>{const a=link(label==='Temaer'&&location.pathname.endsWith('/portfolio/index.html')?'Investeringstemaer':label,path);if(location.pathname.endsWith('/'+path))a.setAttribute('aria-current','page');n.append(a)});return n}
 if(window!==window.top)document.documentElement.classList.add('ndi-embedded');
 const menu=document.querySelector('.sm-rul');if(menu){
  menu.prepend(nav('mobile-main-links'));
  document.querySelectorAll('.sidemenu>.review-section-nav').forEach(n=>n.remove());
  menu.querySelectorAll('[aria-labelledby="sm-h-fond"] a').forEach(a=>{
   const u=new URL(a.href);if(!['#highs','#preview-risk-summary','#method','#global-disclaimer'].includes(u.hash)){
    const li=a.closest('li');if(li?.querySelector('ul'))a.remove();else li?.remove();
   }
  });
 }
 const entry=document.querySelector('.review-intro .review-paths');if(entry)entry.replaceWith(nav('mobile-main-links'));
 // Instagram does not expose a dependable inline player here. Keep the original source link.
 document.querySelectorAll('button[data-instagram]').forEach(button=>{
  const card=button.closest('article');const a=card?.querySelector('a[href^="https://www.instagram.com/"]');
  if(a){a.classList.add('knap','knap--rolig');a.textContent='Se klippet på Instagram ↗';button.remove()}
 });
 const main=document.querySelector('main');
 if(location.pathname.endsWith('/portfolio/index.html')){
  document.body.classList.add('mobile-portfolio');const polish=document.querySelector('link[href*="mobile-portfolio-v2.css"]');if(polish)document.head.append(polish);const header=el('header','mobile-portfolio-header');const home=el('a','','NewDeal Invest');home.href='https://www.newdealinvest.dk/';home.target='_top';home.setAttribute('aria-label','NewDeal Invest – til forsiden');if(window===window.top)header.append(home);header.append(nav('mobile-main-links'));document.body.prepend(header);
 }
 document.querySelectorAll('.topbar-mobil>a.knap').forEach(a=>{a.classList.add('mobile-kid-link');a.replaceChildren(document.createTextNode('Faktaark'));a.setAttribute('aria-label','Faktaark (KID) og prospekt · åbner i nyt vindue')});
 function fold(node,title){if(!node||node.closest('.mobile-fold'))return;const d=el('details','mobile-fold'),s=el('summary','',title);node.before(d);d.append(s,node);return d}
 document.querySelectorAll('.ftf-bars').forEach(n=>fold(n,'Se alle temaers andele'));
 document.querySelectorAll('.mobile-class-details').forEach(d=>{d.open=!small.matches;small.addEventListener('change',()=>d.open=!small.matches)});
 // Local navigation without squeezing six labels into a horizontal strip.
 const local=document.querySelector('#analysis-nav');
 if(local&&!document.body.classList.contains('mobile-portfolio')){const wrap=el('label','mobile-section-picker','På denne side'),select=el('select');select.setAttribute('aria-label','Vælg afsnit på porteføljesiden');
  local.querySelectorAll('a[href^="#"]').forEach(a=>{const o=el('option','',a.textContent.trim());o.value=a.getAttribute('href');select.append(o)});
  select.addEventListener('change',()=>{const a=[...local.querySelectorAll('a')].find(a=>a.getAttribute('href')===select.value);const target=a&&document.querySelector(a.hash);if(target){target.querySelector(':scope > details')?.setAttribute('open','');const h=document.querySelector('.mobile-portfolio-header')?.getBoundingClientRect().height||0;window.scrollTo({top:target.getBoundingClientRect().top+scrollY-h-16,behavior:'auto'})}});
  new MutationObserver(()=>{const a=local.querySelector('[aria-current]');if(a)select.value=a.getAttribute('href')}).observe(local,{subtree:true,attributes:true,attributeFilter:['aria-current']});wrap.append(select);local.before(wrap);
 }
 if(/\/(?:temaer|selskaber)\//.test(location.pathname)){
  const shortcuts=document.querySelector('.up-shortcuts');if(shortcuts){const d=el('details','mobile-page-index'),s=el('summary','','På denne side');d.append(s);document.querySelectorAll('main section[id]').forEach(sec=>{const h=sec.querySelector('h2');if(h){const a=el('a','',h.textContent.trim());a.href='#'+sec.id;a.addEventListener('click',()=>d.open=false);d.append(a)}});shortcuts.after(d)}
 }
 function foldMap(){const list=document.querySelector('#geography-review .maplayout>div:last-child');if(list&&list.id!=='hq-map')fold(list,'Se fordelingen på lande');document.querySelectorAll('body:not(.mobile-portfolio) .analysis-sector-map').forEach(n=>{if(n.closest('.mobile-map-fold'))return;const d=fold(n,n.id==='hq-map'?'Se landene på kortet':'Se fordelingen som felter');if(d){d.classList.add('mobile-map-fold');d.open=!small.matches}})}foldMap();const geography=document.getElementById('geography-review');if(geography)new MutationObserver(foldMap).observe(geography,{childList:true,subtree:true});
 const sectorText=document.querySelector('#sector .analysis-explain');if(sectorText&&small.matches)sectorText.textContent='Vælg en sektor for at se selskaberne. Procenten og bjælken viser sektorens andel af hele fondens formue.';
 const previous=document.getElementById('tidligere');if(previous){const d=fold(previous,'Tidligere positioner i fonden');if(d)d.classList.add('mobile-previous')}
 // Hide only unavailable history, never a current position or real observations.
 const history=document.querySelector('#historik');if(history?.hidden)document.querySelectorAll('a[href="#historik"]').forEach(a=>a.hidden=true);
 if(location.pathname.endsWith('/selskaber/spacex.html')){
  const current=document.getElementById('aktuel-sektion');const sections=[...document.querySelectorAll('main section[id]')].filter(s=>s.querySelector('h2')&&!s.hidden);
  let queued=false;function spy(){queued=false;let chosen=sections[0];for(const s of sections)if(s.getBoundingClientRect().top<innerHeight*.35&&s.getClientRects().length)chosen=s;const h=chosen?.querySelector('h2');if(current&&h)current.textContent=h.textContent.trim()}
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(spy)}},{passive:true});spy();
 }
 const phases=document.querySelector('#virksomhedsfaser .fg-nr');if(phases){const label=el('p','mobile-phase-label');label.setAttribute('aria-live','polite');phases.before(label);const show=()=>{const b=phases.querySelector('[aria-pressed="true"]');label.textContent=b?.getAttribute('aria-label')||''};new MutationObserver(show).observe(phases,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});show()}
 // Disclosures open on desktop; mobile visitors choose the detail they need.
 const folds=[...document.querySelectorAll('.mobile-fold:not(.mobile-previous)')];const resize=()=>folds.forEach(d=>d.open=!small.matches);resize();small.addEventListener('change',resize);
 document.documentElement.dataset.mobileReview='20261117';
})();
