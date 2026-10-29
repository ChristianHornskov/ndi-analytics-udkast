import {loadXWidgets} from './content-feed.mjs';
export const FEED_URL='https://ndigrafdatab5174313.blob.core.windows.net/x-curated/latest.json';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=s=>new Date(s).toLocaleDateString('da-DK');
let saved,loadedAt=0,pending;
const mounted=new WeakMap();
export const REFRESH_MS=300000;
async function refreshFeed(){
 if(pending)return pending;
 if(saved&&Date.now()-loadedAt<REFRESH_MS)return;
 pending=(async()=>{
  const response=await fetch(FEED_URL,{signal:AbortSignal.timeout(8000),cache:'no-cache'});
  if(!response.ok)throw Error('Feed unavailable');
  const candidate=await response.json();
  if(candidate?.kind!=='ndi.x.curated'||candidate.schema_version!==1||!candidate.companies||Array.isArray(candidate.companies)||typeof candidate.companies!=='object')throw Error('Invalid feed');
  saved=candidate;loadedAt=Date.now();
 })();
 try{await pending;}finally{pending=undefined;}
}
export function renderFeed(feed,isin,now=Date.now()){
 if(feed?.schema_version!==1||feed?.kind!=='ndi.x.curated')return '';
 const row=feed.companies?.[isin];
 const posts=(Array.isArray(row?.posts)?row.posts:[]).filter(p=>{if(!p||typeof p.author_handle!=='string')return false;const match=/^https:\/\/x\.com\/([\w]{1,15})\/status\/(\d{1,25})$/.exec(p.url||'');const age=now-Date.parse(p.published_at);return match&&match[2]===p.post_id&&match[1].toLowerCase()===p.author_handle.toLowerCase()&&age>=0&&age<=365*864e5;}).slice(0,4);
 if(!posts.length)return '';
 const stale=row.status==='retry'||now-Date.parse(row.checked_at)>48*36e5;
 return `<section class="section live-x"><span class="eyebrow">FRA SELSKABERNES KANALER</span><h2>Udvalgte opslag fra X</h2><p>Nyheder om teknologien og forretningen, udvalgt automatisk. Selve opslagene kommer fra X; forklaringen under hvert opslag er vores automatiske resumé.</p><p class="small">Senest gennemgået ${escape(date(row.checked_at))}.${stale?' Opdateringen er forsinket; her vises det seneste udvalg.':''}</p><div class="live-x-grid">${posts.map((p,i)=>`${i===2?'<details class="live-x-more"><summary>Vis flere opslag fra X</summary><div class="live-x-grid">':''}<article class="live-x-card"><div class="live-x-original"><div class="live-x-author"><span class="live-x-avatar" aria-hidden="true">${escape(p.author_handle.slice(0,1).toUpperCase())}</span><div><b>@${escape(p.author_handle)}</b><small>${escape(({official:'Selskabets konto',employee:'Person i selskabet',independent:'Ekstern kilde'})[p.source_type]||'Ekstern kilde')} · ${escape(date(p.published_at))}</small></div><span class="live-x-brand" aria-label="X">𝕏</span></div><blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><a href="${escape(p.url)}" target="_blank" rel="noopener noreferrer">Åbn originalopslaget på X ↗</a></blockquote></div><div class="live-x-context"><span>HVORFOR ER DET MED?</span><p>${escape(p.reason)}</p></div></article>${i===posts.length-1&&i>=2?'</div></details>':''}`).join('')}</div><button type="button" class="button secondary" data-x-load hidden>Prøv at hente opslagene igen</button><p class="small">Opslagene indlæses fra X. De er afsendernes egne udsagn.</p><p data-x-status role="status"></p></section>`;
}
function embedWhenVisible(host){
 const doc=host.ownerDocument,win=doc?.defaultView;
 if(!win||!host.querySelector('[data-x-load]'))return;
 const button=host.querySelector('[data-x-load]'),status=host.querySelector('[data-x-status]');
 let loading=false;
 const load=async()=>{
  if(loading||!host.isConnected)return;loading=true;button.hidden=true;
  status.textContent='Henter opslag fra X…';
  const result=await loadXWidgets(doc);
  if(!host.isConnected)return;
  // Script loading alone does not prove that X could render a particular post.
  win.setTimeout(()=>{
   if(!status.isConnected)return;
   const cards=[...host.querySelectorAll('.live-x-original')].filter(c=>!c.closest('.live-x-more')||c.closest('.live-x-more').open);
   const complete=cards.every(c=>c.querySelector('iframe'));
   status.textContent=complete?'':'X kunne ikke vise alle opslag her. Du kan stadig åbne originalerne via linkene.';
   button.hidden=complete;loading=false;
  },result==='loaded'?8000:0);
 };
 button.addEventListener('click',load);
 host.querySelector('.live-x-more')?.addEventListener('toggle',e=>{if(e.currentTarget.open)void load();});
 if(win.IntersectionObserver){const observer=new win.IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();void load();}},{rootMargin:'300px'});observer.observe(host);}
 else void load();
}
export async function mountLiveX(root){
 const host=root.querySelector('[data-live-x]');if(!host)return;
 if(mounted.has(host))return mounted.get(host).refresh();
 host.hidden=true;host.innerHTML='';
 let previous='',timer;
 const doc=host.ownerDocument,win=doc?.defaultView;
 const cleanup=()=>{if(timer)clearInterval(timer);doc?.removeEventListener('visibilitychange',wake);win?.removeEventListener('online',wake);mounted.delete(host);};
 const refresh=async()=>{
  if(!host.isConnected){cleanup();return;}
  if(doc?.visibilityState==='hidden')return;
  try{await refreshFeed();}catch{/* Keep the last valid selection during a temporary outage. */}
  if(!host.isConnected){cleanup();return;}
  const html=renderFeed(saved,host.dataset.liveX);
  // Do not reset an opened X embed when the selection has not changed.
  if(html!==previous){host.innerHTML=html;previous=html;host.hidden=!html;if(html)embedWhenVisible(host);}
 };
 const wake=()=>{void refresh();};
 mounted.set(host,{refresh});
 if(doc){timer=setInterval(wake,REFRESH_MS);doc.addEventListener('visibilitychange',wake);win?.addEventListener('online',wake);}
 await refresh();
}
