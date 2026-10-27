import {bindXFeed} from './content-feed.mjs';
export const FEED_URL='https://ndigrafdatab5174313.blob.core.windows.net/x-curated/latest.json';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=s=>new Date(s).toLocaleDateString('da-DK');
let saved,loadedAt=0;
export function renderFeed(feed,isin,now=Date.now()){
 if(feed?.schema_version!==1||feed?.kind!=='ndi.x.curated')return '';
 const row=feed.companies?.[isin];
 const posts=(Array.isArray(row?.posts)?row.posts:[]).filter(p=>{if(!p||typeof p.author_handle!=='string')return false;const match=/^https:\/\/x\.com\/([\w]{1,15})\/status\/(\d{1,25})$/.exec(p.url||'');const age=now-Date.parse(p.published_at);return match&&match[2]===p.post_id&&match[1].toLowerCase()===p.author_handle.toLowerCase()&&age>=0&&age<=365*864e5;}).slice(0,4);
 if(!posts.length)return '';
 const stale=row.status==='retry'||now-Date.parse(row.checked_at)>48*36e5;
 return `<section class="section live-x"><span class="eyebrow">FRA SELSKABERNES KANALER</span><h2>Udvalgte opslag fra X</h2><p>Udvalgt automatisk efter relevans for selskabets teknologi og forretning. Opslagene er afsendernes egne udsagn.</p><p class="small">Senest gennemgået ${escape(date(row.checked_at))}.${stale?' Opdateringen er forsinket; her vises det seneste udvalg.':''}</p><div class="live-x-grid">${posts.map(p=>`<article class="live-x-card"><div><b>@${escape(p.author_handle)}</b><small>${escape(({official:'Selskabets konto',employee:'Person i selskabet',independent:'Ekstern kilde'})[p.source_type]||'Ekstern kilde')} · ${escape(date(p.published_at))}</small></div><p>${escape(p.reason)}</p><blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><a href="${escape(p.url)}" target="_blank" rel="noopener noreferrer">Læs opslaget på X ↗</a></blockquote></article>`).join('')}</div><button type="button" class="button secondary" data-x-load>Vis opslagene her på siden</button><p class="small">Når du viser opslagene, oprettes forbindelse til X.</p><p data-x-status role="status"></p></section>`;
}
export async function mountLiveX(root){
 const host=root.querySelector('[data-live-x]');if(!host)return;
 host.hidden=true;host.innerHTML='';
 const show=()=>{host.innerHTML=renderFeed(saved,host.dataset.liveX);host.hidden=!host.innerHTML;bindXFeed(host);};
 try{
  if(!saved||Date.now()-loadedAt>300000){const response=await fetch(FEED_URL,{signal:AbortSignal.timeout(8000),cache:'no-cache'});if(!response.ok)throw Error('Feed unavailable');const candidate=await response.json();if(candidate.kind!=='ndi.x.curated'||candidate.schema_version!==1)throw Error('Invalid feed');saved=candidate;loadedAt=Date.now();}
  if(host.isConnected)show();
 }catch{if(host.isConnected&&saved)show();}
}
