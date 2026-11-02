(()=>{'use strict';

 // Keep all X selections together; preserve original posts and attribution.
 if (location.pathname.includes('/temaer/')) {
  const sections=[...document.querySelectorAll('main section')].filter(s=>s.matches('[data-x-tema], .xs'));
  const cards=[...document.querySelectorAll('.rm-section .rm-x')];
  if(sections.length||cards.length){
   const host=document.createElement('section');host.id='x-samlet';host.className='sektion ndi-x-samlet';
   const heading=document.createElement('h2');heading.textContent='Opslag fra X';host.append(heading);
   const first=sections[0]||cards[0].closest('.rm-section');
   const anchor=first.closest('details')||first;anchor.before(host);
   sections.forEach(s=>{const parent=s.parentElement;host.append(s);s.classList.add('ndi-x-underafsnit');if(parent.tagName==='DETAILS'&&!parent.querySelector('section'))parent.remove()});
   if(cards.length){const grid=document.createElement('div');grid.className='rm-social-grid';cards.forEach(c=>grid.append(c));host.append(grid)}
   const seen=new Set();
   host.querySelectorAll('.xs-liste > li, .rm-x').forEach(card=>{const link=card.querySelector('a[href*="/status/"]');const id=link?.href.match(/status\/(\d+)/)?.[1];if(id&&seen.has(id))card.remove();else if(id)seen.add(id)});
   document.querySelectorAll('.rm-section').forEach(s=>{if(!s.querySelector('[data-youtube],[data-instagram],iframe,.rm-x')){document.querySelectorAll('a[href="#'+s.id+'"]').forEach(a=>a.href='#x-samlet');s.hidden=true}});
  }
 }
 const scripts={};
 function bounded(promise,ms=12000){let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('timeout')),ms)})]).finally(()=>clearTimeout(timer))}
 function load(url){if(scripts[url])return scripts[url];scripts[url]=new Promise((resolve,reject)=>{const existing=[...document.scripts].find(s=>s.src===url);if(url.includes('twitter')&&window.twttr?.widgets)return resolve();if(url.includes('instagram')&&window.instgrm?.Embeds)return resolve();const s=existing||document.createElement('script');const timer=setTimeout(()=>reject(Error('timeout')),12000);s.addEventListener('load',()=>{clearTimeout(timer);resolve()},{once:true});s.addEventListener('error',()=>{clearTimeout(timer);reject(Error('load'))},{once:true});if(!existing){s.src=url;s.async=true;document.head.appendChild(s)}}).catch(e=>{delete scripts[url];throw e});return scripts[url]}
 document.querySelectorAll('[data-youtube]').forEach(button=>button.addEventListener('click',()=>{const f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(button.dataset.youtube)+'?start='+Number(button.dataset.start)+'&autoplay=1';f.title=button.getAttribute('aria-label');f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';f.allowFullscreen=true;f.referrerPolicy='strict-origin-when-cross-origin';button.replaceWith(f)}));
 document.querySelectorAll('[data-instagram]').forEach(button=>button.addEventListener('click',async()=>{const host=button.parentElement.querySelector('.rm-embed');host.replaceChildren();const b=document.createElement('blockquote');b.className='instagram-media';b.dataset.instgrmPermalink=button.dataset.instagram;b.dataset.instgrmVersion='14';host.append(b);button.disabled=true;try{await load('https://www.instagram.com/embed.js');window.instgrm.Embeds.process();button.remove()}catch{host.replaceChildren();button.disabled=false;button.textContent='Prøv igen, eller åbn på Instagram'}}));
 async function tweet(host){if(host.dataset.loading==='true')return;host.dataset.loading='true';delete host.dataset.loaded;host.replaceChildren();const message=document.createElement('p');message.className='rm-embed-message';message.setAttribute('role','status');message.textContent='Henter opslaget fra X…';host.append(message);const mount=document.createElement('div');host.append(mount);try{await bounded((async()=>{await load('https://platform.twitter.com/widgets.js');if(window.twttr.ready)await new Promise(r=>window.twttr.ready(r));const frame=await window.twttr.widgets.createTweet(host.dataset.x,mount,{theme:document.documentElement.dataset.tema==='mørk'?'dark':'light',dnt:true,conversation:'none'});if(!frame)throw Error('unavailable')})());message.remove();host.dataset.loaded='true'}catch{mount.remove();message.textContent='Opslaget kunne ikke vises her. Du kan åbne originalen på X nedenfor.'}finally{delete host.dataset.loading}}
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!e.target.closest('details:not([open])')){observer.unobserve(e.target);tweet(e.target)}}),{rootMargin:'100px'});
 document.querySelectorAll('[data-x]').forEach(node=>observer.observe(node));
 document.addEventListener('ndi:tema',()=>document.querySelectorAll('[data-x][data-loaded]').forEach(tweet));
})();
