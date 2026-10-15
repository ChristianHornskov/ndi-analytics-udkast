(()=>{'use strict';
 const scriptUrl=document.currentScript.src;
 const feedUrl='https://ndigrafdatab5174313.blob.core.windows.net/graph/v2-test/x-feed.json';
 const isin=new URLSearchParams(location.search).get('isin');
 if(!/^[A-Z]{2}[A-Z0-9]{9}\d$/.test(isin||''))return;
 let section,request=0,widgetLoader,demoMode=false;
 const accounts=typeof COMPANY_DATA!=='undefined'?(COMPANY_DATA.profiles[isin]?.xAccounts||[]):[];
 const accountFor=p=>accounts.find(a=>a.handle.toLowerCase()===p.author_handle.toLowerCase());
 const priority=p=>accountFor(p)?3:(p.team_engagements?.length?2:1);
 function loadWidgets(){
  if(window.twttr?.widgets)return Promise.resolve(window.twttr.widgets);
  if(widgetLoader)return widgetLoader;
  widgetLoader=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://platform.twitter.com/widgets.js';script.async=true;const timer=setTimeout(()=>reject(Error('timeout')),15000);script.onload=()=>{clearTimeout(timer);window.twttr?.widgets?resolve(window.twttr.widgets):reject(Error('unavailable'))};script.onerror=()=>{clearTimeout(timer);reject(Error('unavailable'))};document.head.append(script)}).catch(e=>{widgetLoader=null;throw e});return widgetLoader;
 }
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n};
 const visibilityStyle=el('style');visibilityStyle.textContent='[hidden]{display:none!important}.x-card{min-width:0}.x-actions .button{white-space:normal;text-align:center}.x-widget iframe{max-width:100%!important}';document.head.append(visibilityStyle);
 const style=el('style');style.textContent='.x-card{border-top:1px solid var(--line);padding:20px 0}.x-card:last-child{padding-bottom:0}.x-meta{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--muted);margin-bottom:10px}.x-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}.x-editorial{font-size:14px;color:#c3d6d9}.x-widget{max-width:100%;overflow:hidden;margin-top:14px}.x-widget:empty{margin:0}.x-state{font-size:13px;color:var(--muted)}';document.head.append(style);
 style.textContent+=' a.x-card{display:block;color:inherit;text-decoration:none;border:1px solid var(--line);border-radius:14px;padding:20px;margin-top:16px;background:#0b1419;transition:border-color .15s}a.x-card:last-child{padding-bottom:20px}a.x-card:hover{border-color:#9dcfd0}a.x-card:focus-visible{outline:3px solid #9dcfd0;outline-offset:4px}.x-brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:16px;color:#fff;margin-bottom:16px}.x-logo{font-size:30px;line-height:1}.x-link-label{display:inline-block;margin-top:14px;color:#a8dedc;font-weight:600}.x-editorial{margin-bottom:0}';
 const fresh=p=>p.review_status==='approved'&&p.availability_status==='available'&&(demoMode||Date.parse(p.expires_at)>Date.now())&&Date.parse(p.checked_at)<=Date.now()+300000;
 style.textContent+='.x-card{border:1px solid #38444d;border-radius:16px;background:#15202b;padding:16px;margin-top:18px;overflow:hidden}.x-card:last-child{padding-bottom:16px}.x-brand{justify-content:space-between;margin-bottom:12px}.x-meta{align-items:center}.x-widget{margin:0 auto;max-width:550px}.x-widget .twitter-tweet{margin:0!important}.x-editorial{border-top:1px solid #38444d;padding-top:14px;margin-top:16px;font-size:13px;line-height:1.6}.x-editorial strong{display:block;color:#a3d8c9;margin-bottom:4px}.x-actions .button{border-radius:24px;min-height:44px}.x-state:empty{display:none}.x-card.is-embedded>.x-brand,.x-card.is-embedded>.x-meta{display:none}.x-permission{margin:16px 0}.x-team{font-size:13px;color:#a3d8c9}@media(max-width:540px){#x-insights{padding:16px 10px}.x-card{padding:12px 8px}.x-card:last-child{padding-bottom:12px}.x-actions{gap:8px}.x-actions .button{flex:1 1 140px}}';
 function valid(p){return p.company_isin===isin&&/^\d{10,25}$/.test(p.post_id)&&/^[A-Za-z0-9_]{1,15}$/.test(p.author_handle)&&p.post_url===`https://x.com/${p.author_handle}/status/${p.post_id}`&&fresh(p)}
 function card(p){
  const box=el('article',null,'x-card');if(!demoMode)box.dataset.expires=p.expires_at;
  const brand=el('div',null,'x-brand');const logo=el('span','𝕏','x-logo');logo.setAttribute('aria-hidden','true');brand.append(logo,el('span','Opslag på X'));box.append(brand);
  for(const e of p.team_engagements||[]){const verbs={posted:'Opslået af',reposted:'Delt af',quoted:'Citeret af',replied:'Kommenteret af'};if(verbs[e.kind])box.append(el('p',verbs[e.kind]+' '+e.actor_name,'x-team'))}
  const meta=el('div',null,'x-meta');meta.append(el('strong',(p.author_name?p.author_name+' · ':'')+'@'+p.author_handle),el('span',new Date(p.published_at).toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'})));box.append(meta);
  const account=accountFor(p);if(account)meta.append(el('span',account.role==='executive'?'Fra selskabets ledelse':'Fra selskabet'));
  const actions=el('div',null,'x-actions'),link=el('a','Åbn originalopslaget på X ↗','button');link.href=p.post_url;link.target='_blank';link.rel='noopener noreferrer';
  const show=el('button','Vis originalen her','button');show.type='button';show.dataset.xLoad='true';const widget=el('div',null,'x-widget'),state=el('p',null,'x-state');state.setAttribute('aria-live','polite');
  show.addEventListener('click',async()=>{if(!fresh(p)){refresh();return}show.disabled=true;state.textContent='Henter originalopslaget fra X …';try{const widgets=await loadWidgets();if(!box.isConnected||!fresh(p))return;const result=await Promise.race([widgets.createTweet(p.post_id,widget,{theme:'dark',dnt:true,conversation:'none',align:'center'}),new Promise((_,reject)=>setTimeout(()=>reject(Error('timeout')),15000))]);if(!box.isConnected||!fresh(p)){widget.replaceChildren();return}if(!result)throw Error('unavailable');show.hidden=true;state.textContent='Originalopslag indlejret fra X. Vores begrundelse ovenfor er ikke en del af opslaget.'}catch(e){widget.replaceChildren();state.textContent='X-visningen kunne ikke indlæses. Brug linket til originalopslaget.';show.disabled=false;show.textContent='Prøv X-visningen igen'}});
  new MutationObserver(()=>{if(show.hidden){box.classList.add('is-embedded');state.textContent=''}}).observe(show,{attributes:true,attributeFilter:['hidden']});
  actions.append(link,show);box.append(widget,state,actions);setTimeout(()=>{if(box.isConnected)show.click()},0);return box;
 }
 async function refresh(){
  const token=++request,list=section.querySelector('.x-list');
  try{const response=await fetch(feedUrl,{cache:'no-store',signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error();const data=await response.json();if(token!==request)return;if(data.schema_version!==1||!Array.isArray(data.posts))throw Error();
   demoMode=data.demo_mode===true&&new URL(feedUrl).pathname.startsWith('/graph/v2-test/');
   const posts=data.posts.filter(valid).sort((a,b)=>priority(b)-priority(a)||Date.parse(b.published_at)-Date.parse(a.published_at)).slice(0,5);list.replaceChildren(...posts.map(card));if(demoMode)list.prepend(el('p','Visningseksempler · Her viser vi også ældre, udvalgte opslag, så du kan vurdere layoutet. Se datoen på hvert opslag. Dette er ikke et løbende opdateret nyhedsfeed.','note'));section.hidden=!posts.length;document.querySelector('.jumpnav a[href="#x-insights"]')?.toggleAttribute('hidden',!posts.length);
  }catch(e){if(token===request)list.replaceChildren(el('p','Opslagene kunne ikke hentes lige nu. Fondens og selskabets øvrige oplysninger er ikke påvirket.','note'))}
 }
 function mount(){
  const reading=document.getElementById('laes-videre')||document.getElementById('forretning');if(!reading||document.getElementById('x-insights'))return;
  section=el('section',null,'panel');section.id='x-insights';section.append(el('p','UDVALGTE OPSLAG FRA X','eyebrow'),el('h2','Fra X om selskabet'),el('p','Udvalgte originalopslag om selskabet. Udvælgelse er ikke en tilslutning til alle udsagn.','note'));
  section.append(el('p','Opslagene indlæses direkte fra X, som modtager tekniske oplysninger om dit besøg.','note'),el('div','Henter udvalgte opslag …','x-list'));reading.after(section);
  const jump=el('a','Udvalgt fra X');jump.href='#x-insights';document.querySelector('.jumpnav')?.append(jump);refresh();
 }
 const observer=new MutationObserver(mount);observer.observe(document.getElementById('content'),{childList:true});mount();
 // Remove expired cards without claiming that the original was deleted.
 setInterval(()=>{if(!section?.isConnected)return;const expired=[...section.querySelectorAll('[data-expires]')].filter(n=>Date.parse(n.dataset.expires)<=Date.now());expired.forEach(n=>n.remove());if(expired.length)refresh()},60000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&section?.isConnected)refresh()});
})();
