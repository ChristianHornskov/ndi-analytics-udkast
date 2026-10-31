(()=>{'use strict';
 // Small, predictable image loading and in-page navigation across the review.
 document.querySelectorAll('img').forEach(img=>{img.decoding='async';if(!img.loading&&img.getBoundingClientRect().top>innerHeight*1.3)img.loading='lazy'});
 document.querySelectorAll('iframe').forEach(frame=>{if(!frame.loading)frame.loading='lazy'});
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const id=decodeURIComponent(a.hash.slice(1));const target=document.getElementById(id);if(!target)return;let p=target.parentElement;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement}}));
 const nav=[...document.querySelectorAll('.up-shortcuts a')];
 if(nav.length&&'IntersectionObserver'in window){let visible=new Set;const io=new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?visible.add(e.target.id):visible.delete(e.target.id));let active=nav.find(a=>visible.has(a.hash.slice(1)));nav.forEach(a=>{a.classList.toggle('up-contents-active',a===active);if(a===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})},{rootMargin:'-75px 0px -50% 0px'});nav.forEach(a=>{let el=document.getElementById(a.hash.slice(1));if(el)io.observe(el)})}
 if(document.documentElement.classList.contains('portfolio-analysis')){
  fetch('../data/company-routes.json').then(r=>r.json()).then(routes=>{
   function link(){document.querySelectorAll('#holdings tr').forEach(row=>{const cell=row.cells[0];if(!cell||cell.querySelector('.up-company-link'))return;const node=[...cell.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());if(!node)return;const name=node.textContent.trim();if(!routes[name])return;const a=document.createElement('a');a.href=routes[name];a.className='up-company-link';a.textContent=name;node.replaceWith(a)})}
   link();const host=document.getElementById('holdings');if(host)new MutationObserver(link).observe(host,{childList:true,subtree:true});
  }).catch(()=>{});
 }
 // Review-only measurements. No reporting, analytics service or network transmission.
 if(new URLSearchParams(location.search).has('qa')){
  const stats={longTasks:0,longTaskMs:0,lcpMs:0};
  try{new PerformanceObserver(l=>l.getEntries().forEach(e=>{stats.longTasks++;stats.longTaskMs+=e.duration})).observe({type:'longtask',buffered:true})}catch{}
  try{new PerformanceObserver(l=>{stats.lcpMs=l.getEntries().at(-1).startTime}).observe({type:'largest-contentful-paint',buffered:true})}catch{}
  setTimeout(()=>{const n=performance.getEntriesByType('navigation')[0];const resources=performance.getEntriesByType('resource');document.documentElement.dataset.reviewPerformance=JSON.stringify({...stats,domMs:n?.domContentLoadedEventEnd,loadMs:n?.loadEventEnd,requests:resources.length,transferBytes:resources.reduce((s,r)=>s+r.transferSize,0),images:document.images.length,frames:document.querySelectorAll('iframe').length})},4000);
 }
})();
