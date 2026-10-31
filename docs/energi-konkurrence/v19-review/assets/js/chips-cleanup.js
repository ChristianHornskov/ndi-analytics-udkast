(()=>{document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)d.querySelectorAll('img[data-deferred-src]').forEach(i=>{i.src=i.dataset.deferredSrc;i.removeAttribute('data-deferred-src')})}));document.querySelectorAll('.cc-explain').forEach(a=>a.addEventListener('click',()=>{const d=document.querySelector('.cc-deep');if(d)d.open=true}));})();
(()=>{
 const finder=document.querySelector('.cf-finder');if(!finder)return;
 const rows=[...finder.querySelectorAll('.cf-results>li')], input=finder.querySelector('input'), more=finder.querySelector('.cf-more'), count=finder.querySelector('.cf-count');
 let sector='all',limit=8;
 function render(){const query=input.value.trim().toLocaleLowerCase('da');const matches=rows.filter(r=>(sector==='all'||r.dataset.stage===sector)&&r.textContent.toLocaleLowerCase('da').includes(query));rows.forEach(r=>r.hidden=true);matches.slice(0,limit).forEach(r=>r.hidden=false);count.textContent=(matches.length===0?'Ingen selskaber matcher – prøv et andet søgeord eller led':matches.length+(matches.length===1?' selskab':' selskaber')+' · største positioner først');more.hidden=matches.length<=limit;more.textContent='Vis flere selskaber ('+(matches.length-limit)+' tilbage)';finder.querySelectorAll('[data-sector]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sector===sector)));}
 finder.querySelectorAll('[data-sector]').forEach(b=>b.addEventListener('click',()=>{sector=b.dataset.sector;limit=8;render()}));input.addEventListener('input',()=>{limit=8;render()});more.addEventListener('click',()=>{limit+=12;render()});
 document.querySelectorAll('[data-find-stage]').forEach(a=>a.addEventListener('click',()=>{sector=a.dataset.findStage;input.value='';limit=8;render()}));render();
})();

