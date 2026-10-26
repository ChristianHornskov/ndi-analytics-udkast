// Spor D · klientvisning af godkendte X-opslag fra v4-build/content-pipeline (publishable.json).
// Læser KUN publishable-filen: den indeholder kun redaktionelt godkendte opslag og ingen interne noter.
// Kortet er fuldt brugbart uden X: afsender, dato og direkte link står i vores egen HTML.
// X' widgets.js indlæses kun efter klik og må aldrig kunne bryde siden.
const FORBIDDEN=new Set(['text','full_text','content','body','html','oembed_html','media','images','video','raw','internal_comment','reviewer','review_status','decided_at','evidence_url','notice']);
const URL_RE=/^https:\/\/(?:x|twitter)\.com\/([A-Za-z0-9_]{1,15})\/status\/([0-9]{1,25})$/;
const KEY_RE=/^(?:[A-Z]{2}[A-Z0-9]{9}[0-9]|NOISIN:[a-z0-9-]{1,60})$/;
const KIND={official:'Selskabets officielle konto',team:'Teammedlem i selskabet',third_party:'Ekstern konto'};
const MONTHS=['jan.','feb.','mar.','apr.','maj','jun.','jul.','aug.','sep.','okt.','nov.','dec.'];
const SNOWFLAKE_EPOCH=1288834974657n,SNOWFLAKE_START=Date.parse('2010-11-04T00:00:00Z');
export const OLD_DAYS=180;
export const X_WIDGETS='https://platform.twitter.com/widgets.js';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Datoen vises i dansk tid: et opslag kl. 23:30Z er fra dagen efter for en dansk læser.
const CPH=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Copenhagen',year:'numeric',month:'numeric',day:'numeric'});
const cphParts=t=>Object.fromEntries(CPH.formatToParts(new Date(t)).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));
const cphIsoDate=t=>{const p=cphParts(t);return `${p.year}-${String(p.month).padStart(2,'0')}-${String(p.day).padStart(2,'0')}`};
const dkDate=t=>{const p=cphParts(t);return `${p.day}. ${MONTHS[p.month-1]} ${p.year}`};

// X' post-id'er (snowflake) indeholder oprettelsestidspunktet. Datoen udledes kun, når den er plausibel:
// efter snowflake-starten og ikke efter, at vi selv observerede opslaget. Ellers vises den som ukendt.
export function postedAt(postId,observedAt){
  if(!/^[0-9]{1,25}$/.test(postId||''))return null;
  const t=Number((BigInt(postId)>>22n)+SNOWFLAKE_EPOCH),seen=Date.parse(observedAt);
  return t>=SNOWFLAKE_START&&Number.isFinite(seen)&&t<=seen?new Date(t).toISOString():null;
}

function hasForbidden(v){if(Array.isArray(v))return v.some(hasForbidden);if(!v||typeof v!=='object')return false;return Object.entries(v).some(([k,x])=>FORBIDDEN.has(k)||hasForbidden(x))}

// Fail closed: en fil med private felter afvises helt; enkeltopslag med ugyldigt link springes over.
export function validatePublishable(pub){
  if(!pub||pub.schema_version!==1||pub.kind!=='ndi.content.publishable'||!Array.isArray(pub.items))return {ok:false,reason:'not_publishable',items:[],skipped:0};
  if(hasForbidden(pub))return {ok:false,reason:'private_fields',items:[],skipped:0};
  const items=pub.items.filter(i=>{const m=URL_RE.exec(i?.url||'');return m&&m[2]===i.post_id&&m[1].toLowerCase()===String(i.author_handle).toLowerCase()&&Object.hasOwn(KIND,i.kind)&&KEY_RE.test(i.company_isin||'')});
  return {ok:true,items,skipped:pub.items.length-items.length};
}

// Kortets top er en <div>, ikke <header>: style.css' globale header-regel (sitets topbjælke) ville ellers ramme hvert kort.
function card(i,asOf){
  const posted=postedAt(i.post_id,i.observed_at),age=posted&&asOf?(Date.parse(asOf+'T00:00:00Z')-Date.parse(posted))/864e5:0,old=age>OLD_DAYS;
  const when=posted?`<time datetime="${cphIsoDate(posted)}">Opslået ${dkDate(posted)}</time>`:'<span>Opslagsdato ikke bekræftet</span>';
  const url=i.url.replace('://twitter.com/','://x.com/');
  return `<article class="x-post${old?' x-post-old':''}" data-post-id="${esc(i.post_id)}"><div class="x-post-head"><strong>@${esc(i.author_handle)}</strong> <span class="small muted">${KIND[i.kind]}${i.kind!=='third_party'&&i.verification!=='verified'?' · konto ikke verificeret':''}</span></div>`
   +`<p class="small">${when}${old?' · <b>Ældre opslag</b>':''}</p><p class="small muted">Senest kontrolleret ${esc(dkDate(i.observed_at))}. Tilgængeligheden kan have ændret sig.</p>`
   +(i.relation?.disclaimer?`<p class="small muted">${esc(i.relation.disclaimer)}</p>`:'')
   +(i.embed_check==='retry'?'<p class="small muted">X kunne ikke bekræfte opslaget ved seneste kontrol. Linket kan være midlertidigt utilgængeligt.</p>':'')
   +`<blockquote class="twitter-tweet" data-dnt="true"><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">Se opslaget fra @${esc(i.author_handle)} på X ↗</a></blockquote></article>`;
}

export function feedHtml(pub,{company,asOf}={}){
  const v=validatePublishable(pub);
  if(!v.ok)return '<section class="x-feed"><h3>Opslag på X</h3><p class="small muted">Opslag kunne ikke vises lige nu.</p></section>';
  const items=v.items.filter(i=>i.company_isin===company);
  if(!items.length)return '<section class="x-feed"><h3>Opslag på X</h3><p class="small muted">Ingen redaktionelt udvalgte opslag for dette selskab endnu.</p></section>';
  return `<section class="x-feed"><h3>Opslag på X</h3><p class="small muted">Udvalgt af redaktionen. Opslagene er afsenderens egne udsagn, ikke NewDeal Invests vurdering.</p>${items.map(i=>card(i,asOf)).join('')}<button type="button" class="button" data-x-load>Vis opslagene fra X</button><p class="small muted" data-x-status role="status"></p></section>`;
}

// Indlæser X' script efter brugerens klik. Løser altid (aldrig reject): 'loaded' | 'failed' | 'timeout'.
// Ved fejl står kortene urørte med afsender, dato og link.
export function loadXWidgets(doc,{timeoutMs=8000,setTimer=setTimeout}={}){
  return new Promise(resolve=>{
    let done=false;const finish=r=>{if(done)return;done=true;const s=doc.querySelector?.('[data-x-status]');if(s)s.textContent=r==='loaded'?'':'X svarede ikke. Brug linkene ovenfor.';resolve(r)};
    try{
      const w=doc.defaultView;if(w?.twttr?.widgets){Promise.resolve(w.twttr.widgets.load()).then(()=>finish('loaded'),()=>finish('failed'));return}
      const s=doc.createElement('script');s.src=X_WIDGETS;s.async=true;s.charset='utf-8';
      s.onload=()=>{try{Promise.resolve(doc.defaultView?.twttr?.widgets?.load()).then(()=>finish('loaded'),()=>finish('failed'))}catch{finish('failed')}};
      s.onerror=()=>finish('failed');setTimer(()=>finish('timeout'),timeoutMs);doc.head.appendChild(s);
    }catch{finish('failed')}
  });
}

export function bindXFeed(root,doc=root.ownerDocument){
  const b=root.querySelector('[data-x-load]');if(!b)return;
  b.addEventListener('click',()=>{b.disabled=true;loadXWidgets(doc).then(r=>{if(r!=='loaded')b.disabled=false;else b.hidden=true})});
}
