/* Anonymous graph navigation counts. No cookies, storage, fingerprint or visitor ID. */
(()=>{
 'use strict';
 if(window.NDI_ANALYTICS_STARTED)return;
 const test=new URLSearchParams(location.search).get('ndiAnalyticsTest')==='1';
 if((navigator.webdriver&&!test)||navigator.doNotTrack==='1'||navigator.globalPrivacyControl)return;
 const match=location.pathname.match(/\/releases\/([a-f0-9]{40})\/(.+)$/);
 if(!match)return;
 window.NDI_ANALYTICS_STARTED=true;
 const endpoint='https://ndi-graph-analytics.yellowriver-6e725476.northeurope.azurecontainerapps.io/event';
 const release=match[1],page=match[2],prefix=location.pathname.slice(0,-page.length);
 const route=url=>{try{const u=new URL(url,location.href);if(u.origin!==location.origin||!u.pathname.startsWith(prefix))return null;const p=u.pathname.slice(prefix.length);return /^(?:widget\/index|portfolio\/index|tech|temaer\/[a-z0-9-]+|selskaber\/[a-z0-9-]+)\.html$/.test(p)?p:null}catch{return null}};
 if(!route(location.href))return;
 let entry='other';try{const r=new URL(document.referrer);if(/^(www\.)?newdealinvest\.dk$/.test(r.hostname))entry=['/','/home'].includes(r.pathname)?'home':r.pathname==='/portefoljer'?'portfolio':['/graf-review','/opdag-portefoljen'].includes(r.pathname)?'explore':'other'}catch{}
 function send(kind,target){
  if(!window.NDI_CONSENT?.allowed('analytics'))return;
  const bytes=crypto.getRandomValues(new Uint8Array(16));
  const event={id:[...bytes].map(x=>x.toString(16).padStart(2,'0')).join(''),kind,page,device:matchMedia('(max-width:700px)').matches?'mobile':'desktop',entry,release};
  if(target)event.target=target;if(test)event.test=true;
  const body=JSON.stringify(event);
  async function attempt(n=0){if(!window.NDI_CONSENT?.allowed('analytics'))return;try{const response=await fetch(endpoint,{method:'POST',body,headers:{'Content-Type':'text/plain;charset=UTF-8'},credentials:'omit',referrerPolicy:'no-referrer',keepalive:true,signal:AbortSignal.timeout(12000)});if(response.status===204)return;if(response.status<500&&response.status!==429)return}catch{}if(n<2)setTimeout(()=>attempt(n+1),2000*(n+1));}
  void attempt();
 }
 let viewed=false;function view(){if(!viewed&&window.NDI_CONSENT?.allowed('analytics')&&document.visibilityState==='visible'){viewed=true;send('view')}}
 window.NDI_CONSENT.subscribe(view);document.addEventListener('visibilitychange',view);
 document.addEventListener('click',e=>{const a=e.target.closest?.('a[href]');const target=a&&route(a.href);if(target&&target!==page)send('click',target)},{passive:true});
})();
