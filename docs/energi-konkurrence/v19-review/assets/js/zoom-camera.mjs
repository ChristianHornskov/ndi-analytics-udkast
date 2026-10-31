// Spor zoom (V4 runde 4) · den filmiske, scroll-drevne kameratur gennem seks lag: fra AI på telefonen
// ned til kraftværket. Scroll styrer kameraet kontinuerligt i en sticky scene. Hvert lag zoomes 8^f omkring
// sin portal, mens portalen vandrer ind til midten, og næste lag ligger allerede inde i portalen, før det gamle
// forsvinder. Kun transform, opacity og en radial maske animeres. Selskaber pr. lag tælles fra modellen.
// Ingen farver i JS: alt visuelt ligger i zoom-camera.css og læser temaets CSS-variabler.

export const ZOOM_SCALE=8;
const DIR='assets/review-zoom/';
// Billedmetadata fra Idéspejders zoom-lag.json (portal = andel af bredde/højde, hvor næste lag sidder i 1/8).
// Stierne står fuldt udskrevet, så release-pakken kan se hver fil. Teksterne er redaktionelle, ikke data.
export const ZOOM_LAYERS=[
 {id:'ai-use',label:'Spørgsmålet',copy:'Vi følger et spørgsmål til en AI-tjeneste i skyen — fra skærmen til maskinerne bag svaret.',
  mobile:{dark:'assets/review-zoom/zoom-1-ai-use-mobil-780x1040.webp',light:'assets/review-zoom/zoom-1-ai-use-mobil-780x1040-lys.webp',portal:[.5,.49]},
  desktop:{dark:'assets/review-zoom/zoom-1-ai-use-desktop-1600x900.webp',light:'assets/review-zoom/zoom-1-ai-use-desktop-1600x900-lys.webp',portal:[.5,.49]}},
 {id:'gpu-cloud',label:'Datacentret',copy:'Datacentret samler de computere, der skal beregne svaret.',
  mobile:{dark:'assets/review-zoom/zoom-2-gpu-cloud-mobil-780x1040.webp',light:'assets/review-zoom/zoom-2-gpu-cloud-mobil-780x1040-lys.webp',portal:[.5,.5]},
  desktop:{dark:'assets/review-zoom/zoom-2-gpu-cloud-desktop-1600x900.webp',light:'assets/review-zoom/zoom-2-gpu-cloud-desktop-1600x900-lys.webp',portal:[.5,.5]}},
 {id:'scale-up',label:'Serverne',copy:'Acceleratorer forbindes tæt i ét system, så de kan dele arbejdet og udveksle resultater.',
  mobile:{dark:'assets/review-zoom/zoom-3-scale-up-mobil-780x1040.webp',light:'assets/review-zoom/zoom-3-scale-up-mobil-780x1040-lys.webp',portal:[.51,.49]},
  desktop:{dark:'assets/review-zoom/zoom-3-scale-up-desktop-1600x900.webp',light:'assets/review-zoom/zoom-3-scale-up-desktop-1600x900-lys.webp',portal:[.5,.49]}},
 {id:'accelerator',label:'AI-chippen',copy:'AI-chips udfører mange beregninger samtidig og får deres data fra hukommelsen.',
  mobile:{dark:'assets/review-zoom/zoom-4-accelerator-mobil-780x1040.webp',light:'assets/review-zoom/zoom-4-accelerator-mobil-780x1040-lys.webp',portal:[.49,.51]},
  desktop:{dark:'assets/review-zoom/zoom-4-accelerator-desktop-1600x900.webp',light:'assets/review-zoom/zoom-4-accelerator-desktop-1600x900-lys.webp',portal:[.49,.47]}},
 {id:'foundry',label:'Chipfabrikken',copy:'Chippen fremstilles på en specialiseret fabrik, der omsætter et design til fysisk elektronik.',
  mobile:{dark:'assets/review-zoom/zoom-5-foundry-mobil-780x1040.webp',light:'assets/review-zoom/zoom-5-foundry-mobil-780x1040-lys.webp',portal:[.81,.12]},
  desktop:{dark:'assets/review-zoom/zoom-5-foundry-desktop-1600x900.webp',light:'assets/review-zoom/zoom-5-foundry-desktop-1600x900-lys.webp',portal:[.86,.17]}},
 {id:'generation',label:'Strømmen',copy:'Alt sammen kræver strøm, der skal produceres og føres helt frem.',
  mobile:{dark:'assets/review-zoom/zoom-6-generation-mobil-780x1040.webp',light:'assets/review-zoom/zoom-6-generation-mobil-780x1040-lys.webp',portal:null},
  desktop:{dark:'assets/review-zoom/zoom-6-generation-desktop-1600x900.webp',light:'assets/review-zoom/zoom-6-generation-desktop-1600x900-lys.webp',portal:null}}
];
export const LAYER_EXPLANATIONS={
 'ai-use': ['Dit spørgsmål sætter maskiner i arbejde',
  'Når du sender en besked til en AI-tjeneste i skyen, bliver svaret beregnet på en computer et andet sted. Modellen bruger det, den har lært under træningen; den begynder ikke forfra hver gang.',
  'Vi ser nu på udstyret bag svaret. Første stop er datacentret, hvor computerne står. Mindre modeller kan også køre direkte på din egen enhed.'],
 'gpu-cloud': ['Her står computerne, der leverer svaret',
  'Et datacenter samler servere, netværk, strøm og køling. En AI-udbyder kan eje maskinerne selv eller leje regnekraft hos andre. Den behøver altså ikke selv at bygge alt fra bunden.',
  'Nogle selskaber udlejer bygningen. Andre driver computerne og sælger adgang til dem. Inde i bygningen skal flere chips kunne arbejde sammen.'],
 'scale-up': ['Flere chips deler én stor opgave',
  'En stor AI-model kan kræve flere chips. De fordeler beregningen mellem sig og sender delresultater frem og tilbage. Hurtige forbindelser gør, at de kan arbejde videre uden hele tiden at vente på hinanden.',
  'Den tætte kobling inden for et samlet system kaldes scale-up. Netværket mellem flere systemer kaldes scale-out. Nu går vi tættere på selve chippen.'],
 'accelerator': ['Chippen udfører mange beregninger samtidig',
  'En AI-chip er bygget til store mængder gentagen matematik. Den arbejder på mange tal samtidig, mens hukommelsen leverer de data, beregningen skal bruge.',
  'En hurtig chip hjælper kun, hvis data kan følge med. Herfra følger vi chippen tilbage til fabrikken, der fremstillede den.'],
 'foundry': ['Fra tegnet kredsløb til en fysisk chip',
  'Et chipselskab kan designe en processor uden selv at eje fabrikken. En kontraktproducent bygger kredsløbet i mange tynde lag på en halvlederskive. Bagefter skal chippen testes og forbindes med resten af systemet.',
  'Fabrikken har brug for præcist udstyr, rene materialer og strøm. Nu ser vi på den strømforsyning, som både fabrikken og datacentret er afhængige af.'],
 'generation': ['Uden strøm kommer der intet svar',
  'Både chipfabrikken og datacentret skal have elektricitet. Kraftværker og andre produktionsanlæg leverer energien, mens elnettet får den frem til maskinerne.',
  'Her slutter zoomturen. Fortsæt til forklaringen om strøm: se forskellen på anlæg i drift, nye kraftværker og reaktorer under udvikling — og hvem der arbejder med hvad.']
};
const COMPANY_ROLES={
 'ai-use':{'US4576422053':'Forbereder data, der bruges til at træne AI-modeller.','US8361001071':'Leverer stemmestyring og samtaler med AI.'},
 'gpu-cloud':{'US17253J1060':'Arbejder med datacentre til AI og udvinding af bitcoin.','US21874A1060':'Driver datacentre for AI-kunder og udvinder bitcoin.','US21873S1087':'Udlejer regnekraft fra AI-servere.','NL0009805522':'Driver AI-servere og softwaren til dem.','AU0000185993':'Ejer datacentre og udlejer regnekraft.','US0381692070':'Bygger og udlejer datacenterbygninger.','US84615Q1031':'Udlejer regnekraft gennem sit AI-segment.'},
 'scale-up':{'KYG254571055':'Leverer kabler og chips, der flytter data mellem maskiner.','US67066G1040':'Forbinder AI-chips, så de hurtigt kan udveksle data og dele beregningsarbejdet.','US04626A1034':'Leverer chips, der holder forbindelserne hurtige og stabile.'},
 accelerator:{'US0929151076':'Designer AI-chips til beregninger tæt på brugeren.','US67066G1040':'Designer AI-chips og samlede serversystemer.','US0079031078':'Designer processorer, der udfører mange AI-beregninger samtidig.','US11135F1012':'Udvikler AI-chips til bestemte kunder.','US5738741041':'Udvikler chips til kundernes egne systemer.','US15675D1037':'Bygger AI-processorer på hele halvlederskiver.'},
 foundry:{'IL0010823792':'Fremstiller blandt andet analoge og optiske chips.','US9108734057':'Fremstiller chips med etablerede produktionsmetoder.','US8740391003':'Fremstiller avancerede chips for andre selskaber.','KYG393871085':'Fremstiller chips, blandt andet til optiske kredsløb.','US7960508882':'Fremstiller chips for kunder i sin fabriksforretning.'},
 generation:{'CA0585861085':'Leverer brændselsceller, der bruger brint.','US36828A1016':'Leverer turbiner, der producerer strøm fra gas.','US05614L2097':'Leverer kedler og dampanlæg til kraftværker.','US92840M1027':'Ejer og driver kraftværker.','US0937121079':'Leverer brændselsceller til lokal strømproduktion.','US02156V1098':'Udvikler små reaktorer; de er ikke i kommerciel drift.','US67079K1007':'Udvikler små reaktorer; de er ikke i kommerciel drift.'}
};
export const zoomArticleLink=(id,fund=0)=>({href:'temaer/'+({'ai-use':'software','gpu-cloud':'datacenter','scale-up':'datacenter','gpu':'chips','power-delivery':'energi','generation':'energi'}[id]||'chips')+'.html',label:'Læs om '+({
 'ai-use':'AI-svaret','gpu-cloud':'datacentret','scale-up':'forbindelserne','accelerator':'AI-chippen','foundry':'chipfabrikken','generation':'strømmen'
}[id]||'dette lag')});

const ART={mobile:[780,1040],desktop:[1600,900]};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const pad=i=>String(i+1).padStart(2,'0');

// Lagene med fondens selskaber, beregnet fra modellen ved hvert kald. Selskaber med hovedrolle i leddet først,
// derefter alfabetisk. Et lag uden selskaber får count 0 og vises uden tal (rent forklarende lag).
export function zoomLayerModel(){return ZOOM_LAYERS.map((l,index)=>({...l,index,title:l.label,count:0,companies:[]}));}

const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
export const smoothstep=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
// cubic-bezier(.65,0,.35,1) som i storyboardet (bruges til autoflyvning ved tryk).
export function easeInOut(x){
 x=clamp(x);let lo=0,hi=1,t=x;
 for(let i=0;i<24;i++){t=(lo+hi)/2;const bx=3*.65*t*(1-t)**2+3*.35*t*t*(1-t)+t**3;if(bx<x)lo=t;else hi=t}
 return 3*t*t*(1-t)+t**3;
}

// Scrollprogress p (0-1 over den sticky scene) til kameraets tilstand. Hvert lag har en hvilezone (hold) i begge
// ender af et segment, så kortet kan læses, og så snap har et sted at lande. Rent og testbart.
export function cameraAt(p,count=ZOOM_LAYERS.length,{hold=.14}={}){
 const segments=Math.max(1,count-1),raw=clamp(Number(p)||0)*segments,index=Math.min(segments-1,Math.floor(raw)),u=raw-index;
 const f=clamp((u-hold)/(1-2*hold));
 const current=f<.5?index:index+1,rest=f<=.06||f>=.94;
 return {index,f,current,rest,zoom:ZOOM_SCALE**f,progress:clamp(Number(p)||0)};
}
// Scrollprogress for at stå i hvile i lag k.
export const layerProgress=(k,count=ZOOM_LAYERS.length)=>clamp(k/Math.max(1,count-1));

// Billedets kasse i scenen. Mobil: fyld bredden (portalen øverst til højre i chipfabrikken må ikke beskæres),
// desktop: fyld scenen. Scenens kanter tones blødt ud med en maske i CSS, så der aldrig er en hård kant.
export function artBox(sw,sh,kind){
 const [IW,IH]=ART[kind];
 const scale=kind==='mobile'?Math.min(sw/IW,(sh*.7)/IH):Math.max(sw/IW,sh/IH);
 const iw=IW*scale,ih=IH*scale;
 return {sw,sh,iw,ih,ox:(sw-iw)/2,oy:kind==='mobile'?sh*.42-ih/2:(sh-ih)/2};
}
// Kameraets geometri for ét f i et segment: lag A skaleres 8^f om portalen, mens portalen glider til midten.
// Lag B (næste) ligger i portalen i 1/8 størrelse og vokser til 1. Alt i scenens pixels, transform-origin 0 0.
export function cameraFrame(f,portal,box){
 const s=ZOOM_SCALE**f,k=(s-1)/(ZOOM_SCALE-1),{iw,ih,ox,oy,sw,sh}=box;
 const px=ox+portal[0]*iw,py=oy+portal[1]*ih,cx=px+(sw/2-px)*k,cy=py+(oy+ih/2-py)*k,sb=s/ZOOM_SCALE;
 return {s,c:[cx,cy],
  a:{x:cx-ox-s*portal[0]*iw,y:cy-oy-s*portal[1]*ih,s},
  b:{x:cx-ox-sb*iw/2,y:cy-oy-sb*ih/2,s:sb},
  ring:{x:cx,y:cy,w:sb*iw*1.08,h:sb*ih*.9}};
}

function cardHtml(l,last,first,fund=0){
 const [title,body,bridge]=LAYER_EXPLANATIONS[l.id],link=zoomArticleLink(l.id,fund);
 const people=l.count?`<div class="zc-people"><h4>Eksempler fra fonden</h4><span class="zc-count">${l.count} ${l.count===1?'selskab':'selskaber'} arbejder med denne del</span><span class="zc-avatars zc-names">${l.companies.slice(0,3).map(c=>`<button type="button" class="zc-avatar zc-name" data-exp-company="${esc(c.isin)}"><span class="zc-company-copy"><strong>${esc(c.name)}</strong>${c.description?`<small>${esc(c.description)}</small>`:''}</span><span class="zc-company-arrow" aria-hidden="true">→</span></button>`).join('')}</span></div>`:'';
 return `<article class="zc-card" aria-labelledby="zc-card-${l.id}"><span class="zc-card-kicker">Lag ${pad(l.index)} · ${esc(l.label)}</span><h3 id="zc-card-${l.id}">${esc(title)}</h3><div class="zc-explanation"><p>${esc(body)}</p><p class="zc-bridge">${esc(bridge)}</p></div>${people}<div class="zc-actions"><a class="zc-article-link" href="${esc(link.href)}">${esc(link.label)} <span aria-hidden="true">→</span></a>${last?'':''}</div></article>`;
}

export function zoomCameraHtml(model,{profiles={},fund=0}={}){
 const layers=zoomLayerModel(model,{profiles}),n=layers.length;
 return `<section class="zc" id="exp-zoom" data-zc aria-labelledby="zc-title" style="--zc-steps:${n-1}">
 <div class="zc-track"><div class="zc-view">
  <div class="zc-head"><span class="exp-kicker">FRA SKÆRM TIL STRØM</span><h2 id="zc-title">Ét spørgsmål.<br><em>Seks lag ned.</em></h2></div>
  <p class="zc-hint">Brug + og − til at udforske lagene i dit eget tempo.</p>
  <div class="zc-controls" role="group" aria-label="Udforsk lagene"><button type="button" data-zc-step="-1" aria-label="Forrige lag" disabled>−</button><span data-zc-position aria-live="polite">1 / ${n}</span><button type="button" data-zc-step="1" aria-label="Næste lag">+</button></div><p class="zc-start-cue" aria-hidden="true">Tryk + for at dykke ned</p>
  <div class="zc-stage" data-zc-stage>${layers.map((l,i)=>`<div class="zc-layer${i?'':' is-on'}" data-zc-layer="${i}" style="--i:${i}"><figure class="zc-frame"><img class="zc-img" data-zc-img="${i}" alt="Illustration: ${esc(l.label.toLowerCase())}, lag ${i+1} af ${n}" width="780" height="1040" decoding="async"></figure>${cardHtml(l,i===n-1,i===0,fund)}</div>`).join('')}
   <span class="zc-ring" data-zc-ring aria-hidden="true"></span><button type="button" class="zc-portal" data-zc-portal aria-label="Dyk ned i næste lag"></button>
  </div>
  <a class="zc-electricity-link" data-zc-electricity href="${esc(zoomArticleLink('generation',fund).href)}" hidden aria-label="Læs om strømmen"><span>Læs om strømmen <b aria-hidden="true">→</b></span></a>
  <nav class="zc-rail" aria-label="Lagene fra skærm til strøm"><span class="zc-chain" aria-hidden="true"><i class="zc-chain-fill" data-zc-fill></i><i class="zc-chain-bead" data-zc-bead></i></span><ol>${layers.map((l,i)=>`<li><button type="button" data-zc-go="${i}" aria-label="Lag ${i+1}: ${esc(l.label)}"${i?'':' aria-current="step"'}><i aria-hidden="true"></i><span>${esc(l.label)}</span></button></li>`).join('')}</ol></nav>
 </div><div class="zc-reader" data-zc-reader></div><button type="button" class="zc-skip" data-zc-skip>Til temaerne <span aria-hidden="true">↓</span></button></div>
</section>`;
}

const themeOf=doc=>doc.documentElement.getAttribute('data-tema')==='lys'?'light':'dark';

// Binder kameraturen. Uden IntersectionObserver eller ved reduced motion vises de seks lag som en statisk liste.
export function bindZoomCamera(root,{reducedMotion,assetPrefix=""}={}){
 const el=root?.matches?.('[data-zc]')?root:root?.querySelector?.('[data-zc]');if(!el||el.dataset.zcBound)return null;el.dataset.zcBound='true';
 const doc=el.ownerDocument,win=doc.defaultView,q=s=>el.querySelector(s),qa=s=>[...el.querySelectorAll(s)];
 const track=q('.zc-track'),view=q('.zc-view'),stage=q('[data-zc-stage]'),ring=q('[data-zc-ring]'),fill=q('[data-zc-fill]'),bead=q('[data-zc-bead]'),head=q('.zc-head'),portalBtn=q('[data-zc-portal]');
 const layers=qa('[data-zc-layer]'),imgs=qa('[data-zc-img]'),rail=qa('[data-zc-go]'),n=layers.length;
 const motion=win.matchMedia?.('(prefers-reduced-motion: reduce)');
 // Runde 5 (Leo pkt. 3, Idéspejder): på mobil er turen én fast scene (100svh) uden scroll-stræk. Kameraet styres af et vandret swipe,
 // ringen, skinnen eller piletasterne, og det flyver ét lag ad gangen med samme kamera og easing som før. Desktop beholder den scroll-drevne tur.
 let scene=true,sceneP=0;
 let reduced=reducedMotion??!!motion?.matches,kind='mobile',theme=themeOf(doc),box=null,near=false,raf=0,flight=null,lastP=-1,lastDir=1,snapTimer=0,loaded=false,dead=false,restIndex=0;
 const ctrl=new AbortController(),on=(t,e,f,o={})=>t?.addEventListener(e,f,{...o,signal:ctrl.signal});

 // Integration runde 4: de to første lag hentes, når scenen nærmer sig; resten først når scenen er i syne (sparer ca. 200 KB ved indlæsning).
 function sources(limit=n){for(const [i,img] of imgs.entries()){if(i>=limit)break;const src=assetPrefix+ZOOM_LAYERS[i][kind][theme];if(img.getAttribute('src')!==src){img.src=src;img.width=ART[kind][0];img.height=ART[kind][1]}}if(limit>=n)loaded=true}
 function measure(){
  const w=view.clientWidth||win.innerWidth,h=view.clientHeight||win.innerHeight,next=w/h<1.05?'mobile':'desktop';
  const changed=next!==kind;kind=next;box=artBox(w,h,kind);el.dataset.zcArt=kind;
  for(const img of imgs){img.style.left=box.ox+'px';img.style.top=box.oy+'px';img.style.width=box.iw+'px';img.style.height=box.ih+'px'}
  if(changed&&loaded)sources();
 }
 function progress(){if(scene)return sceneP;const r=track.getBoundingClientRect(),range=track.offsetHeight-view.offsetHeight;return range>0?clamp(-r.top/range):0}
 function paint(p){
  if(!box)measure();
  const cam=cameraAt(p,n),{index,f}=cam,portal=ZOOM_LAYERS[index][kind].portal;
  const fr=portal?cameraFrame(f,portal,box):null;
  for(const [i,layer] of layers.entries()){
   const img=imgs[i],active=i===index||(i===index+1&&f>0);
   layer.classList.toggle('is-on',active);layer.style.zIndex=String(i);
   if(!active)continue;
   if(i===index){const t=fr?fr.a:{x:0,y:0,s:1};img.style.transform=`translate3d(${t.x.toFixed(2)}px,${t.y.toFixed(2)}px,0) scale(${t.s.toFixed(4)})`;img.style.opacity=String(1-smoothstep(.84,.995,f));if(img._zcMask){img.classList.remove('is-entering');layer.classList.remove('is-portal');img._zcMask=''}}
   else{const t=fr.b;img.style.transform=`translate3d(${t.x.toFixed(2)}px,${t.y.toFixed(2)}px,0) scale(${t.s.toFixed(4)})`;img.style.opacity=String(smoothstep(.1,.5,f));
    const r0=Math.round(42+38*smoothstep(.4,.9,f)+40*smoothstep(.9,1,f)),r1=Math.round(r0+28+60*smoothstep(.9,1,f)),mask=f>=.995?'':r0+'/'+r1;
    if(mask!==(img._zcMask||'')){img.classList.toggle('is-entering',!!mask);layer.classList.toggle('is-portal',!!mask);if(mask){img.style.setProperty('--zc-r0',r0+'%');img.style.setProperty('--zc-r1',r1+'%')}img._zcMask=mask}}
  }
  // Kortene: kun i hvile. Under bevægelse ses kun billedet og den gule fokusring.
  const card=cam.rest?(f<.5?index:index+1):-1;
  layers.forEach((layer,i)=>layer.classList.toggle('is-card',i===card));
  // Fokusringen: tændes, mens kameraet kører ind; i hvile markerer den (og et usynligt trykfelt) det aktuelle lags portal.
  const restLayer=cam.rest?(f<.5?index:index+1):-1,restPortal=restLayer>=0?ZOOM_LAYERS[restLayer][kind].portal:null;
  const rf=restPortal?cameraFrame(0,restPortal,box):fr,show=restPortal?true:!!fr&&!cam.rest;
  if(show&&rf){const o=restPortal?1:smoothstep(.02,.16,f)*(1-smoothstep(.5,.72,f));ring.style.transform=`translate3d(${(rf.ring.x-rf.ring.w/2).toFixed(1)}px,${(rf.ring.y-rf.ring.h/2).toFixed(1)}px,0)`;ring.style.width=rf.ring.w.toFixed(1)+'px';ring.style.height=rf.ring.h.toFixed(1)+'px';ring.style.opacity=restPortal?'':o.toFixed(3);ring.classList.toggle('is-rest',!!restPortal);
   portalBtn.hidden=!restPortal;if(restPortal){portalBtn.style.transform=ring.style.transform;portalBtn.style.width=ring.style.width;portalBtn.style.height=ring.style.height}}
  else{ring.style.opacity='0';ring.classList.remove('is-rest');portalBtn.hidden=true}
  const total=index+f,frac=total/(n-1);
  fill.style.transform=`scaleY(${frac.toFixed(4)})`;bead.style.top=(frac*100).toFixed(2)+'%';
  head.style.opacity=String(1-smoothstep(0,.22,total));
  el.classList.toggle('is-moving',!cam.rest);
  if(cam.current!==restIndex){restIndex=cam.current;rail.forEach((b,i)=>{b.toggleAttribute('aria-current',false);if(i===restIndex)b.setAttribute('aria-current','step');b.parentElement.classList.toggle('is-done',i<restIndex)})}
  el.dataset.zcLayer=String(cam.current);el.dataset.zcF=f.toFixed(3);
  const electricity=q('[data-zc-electricity]');if(electricity)electricity.hidden=!(cam.rest&&cam.current===n-1);
  qa('[data-zc-step]').forEach(b=>{b.disabled=Number(b.dataset.zcStep)<0?cam.current===0:cam.current===n-1});
  const position=q('[data-zc-position]');if(position&&cam.rest)position.textContent=`${cam.current+1} / ${n}`;el.classList.toggle('zc-at-start',cam.current===0&&cam.rest);
  const reader=q('[data-zc-reader]');
  if(reader&&cam.rest&&reader.dataset.layer!==String(cam.current)){
   reader.innerHTML=layers[cam.current].querySelector('.zc-card').outerHTML.replace(/ aria-labelledby="[^"]+"| id="zc-card-[^"]+"/g,'');
   reader.dataset.layer=String(cam.current);
  }
 }
 function frame(){raf=0;if(dead||reduced)return;const p=progress();if(p!==lastP){if(lastP>=0&&Math.abs(p-lastP)>1e-5)lastDir=p>lastP?1:-1;lastP=p;paint(p)}}
 function schedule(){if(!raf&&!dead&&!reduced)raf=win.requestAnimationFrame(frame)}
 const range=()=>track.offsetHeight-view.offsetHeight,trackTop=()=>track.getBoundingClientRect().top+win.scrollY;
 // Autoflyvning (tryk på skinne/portal, piletaster): ca. 1,1 s pr. lag med storyboardets easing. Brugerinput afbryder.
 function flyTo(k,{fast=false}={}){
  k=clamp(Math.round(k),0,n-1);
  if(scene){const from=sceneP,to=layerProgress(k,n);cancelFlight();if(reduced||Math.abs(to-from)<1e-4){sceneP=to;paint(sceneP);return}lastDir=to>from?1:-1;
   const dur=fast?1000:Math.min(4200,Math.max(500,Math.abs(to-from)*(n-1)*1100));cancelFlight();flight={from,to,start:performance.now(),dur,id:0};
   const step=now=>{if(!flight)return;const x=clamp((now-flight.start)/flight.dur);sceneP=flight.from+(flight.to-flight.from)*easeInOut(x);paint(sceneP);if(x<1)flight.id=win.requestAnimationFrame(step);else flight=null};
   flight.id=win.requestAnimationFrame(step);return}
  const to=trackTop()+layerProgress(k,n)*range();
  if(reduced){win.scrollTo({top:to,behavior:'instant'});return}
  const from=win.scrollY,dist=Math.abs(to-from)/Math.max(1,range()/(n-1)),dur=Math.min(4200,Math.max(500,dist*1100));
  cancelFlight();flight={from,to,start:performance.now(),dur,id:0};
  const step=now=>{if(!flight)return;const x=clamp((now-flight.start)/flight.dur);win.scrollTo({top:flight.from+(flight.to-flight.from)*easeInOut(x),behavior:'instant'});if(x<1)flight.id=win.requestAnimationFrame(step);else flight=null};
  flight.id=win.requestAnimationFrame(step);
 }
 function cancelFlight(){if(flight){win.cancelAnimationFrame(flight.id);flight=null}}
 // Blød snap til nærmeste hvile, når scroll stopper midt i et skift (med retningsbias, så et påbegyndt dyk fuldføres).
 function snap(){
  if(scene||reduced||flight||!near||el.dataset.zcSnap==='off')return;const p=progress();if(p<=0||p>=1)return;
  const cam=cameraAt(p,n);if(cam.f<=0||cam.f>=1)return;
  const k=lastDir>0?(cam.f>.3?cam.index+1:cam.index):(cam.f<.7?cam.index:cam.index+1);flyTo(k);
 }
 // Runde 6 (spor B, ux-24): retningen sættes ved selve scroll-hændelsen. Før kom snap (ved scrollend) før næste frame og brugte
 // den gamle retning, så ét hjul-tik tilbage blev sendt frem igen.
 let lastY=win.scrollY;
 function onScroll(){const y=win.scrollY;if(!flight&&y!==lastY)lastDir=y>lastY?1:-1;lastY=y;schedule();if(!('onscrollend' in win)){win.clearTimeout(snapTimer);snapTimer=win.setTimeout(snap,180)}}
 let touching=false;
 const io=new IntersectionObserver(es=>{for(const e of es){near=e.isIntersecting;if(near){if(!loaded)sources(2);schedule()}}},{rootMargin:'100% 0px 100% 0px'});
 // A reader must choose the next layer; entering the viewport never advances it.
 let swipe=null;
 on(view,'touchstart',e=>{swipe=null;if(!scene||reduced||e.touches.length!==1||e.target.closest('a,button,input,summary,.zc-card'))return;swipe={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
 on(view,'touchend',e=>{if(!scene||!swipe)return;const start=swipe;swipe=null;const t=e.changedTouches[0];if(!t)return;const dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)<60||Math.abs(dx)<Math.abs(dy)*2)return;flyTo(cameraAt(progress(),n).current+(dx<0?1:-1))},{passive:true});
 on(view,'touchcancel',()=>{swipe=null},{passive:true});
 function setScene(v){scene=v;el.classList.toggle('is-scene',v);cancelFlight();if(v){sceneP=layerProgress(cameraAt(sceneP,n).current,n)}box=null;if(!reduced){measure();lastP=-1;paint(progress())}}
 const seen=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){seen.disconnect();if(!loaded)sources()}});seen.observe(track);

 function setStatic(v){
  reduced=v;el.classList.toggle('is-static',v);cancelFlight();
  if(v){kind=win.innerWidth>=760?'desktop':'mobile';el.dataset.zcArt=kind;for(const img of imgs){img.style.cssText='';img._zcMask='';img.classList.remove('is-entering')}layers.forEach(l=>l.classList.remove('is-portal'));ring.style.cssText='';head.style.opacity='';layers.forEach(l=>{l.classList.add('is-on','is-card');l.style.zIndex=''});portalBtn.hidden=true;sources()}
  else{layers.forEach(l=>l.classList.remove('is-card'));box=null;measure();lastP=-1;schedule()}
 }
 on(win,'scroll',onScroll,{passive:true});
 on(win,'scrollend',()=>{if(!touching)snap()});
 on(win,'touchstart',()=>{touching=true;if(!scene)cancelFlight()},{passive:true});
 on(win,'touchend',()=>{touching=false},{passive:true});
 on(win,'touchcancel',()=>{touching=false;swipe=null},{passive:true});
 on(win,'wheel',()=>{if(!flight)return;cancelFlight();if(scene&&!reduced){sceneP=layerProgress(cameraAt(sceneP,n).current,n);lastP=sceneP;paint(sceneP)}},{passive:true});
 on(win,'resize',()=>{box=null;if(!reduced){measure();lastP=-1;schedule()}});
 on(el,'click',e=>{
  if(e.target.closest('[data-zc-restart]')){if(reduced)layers[0]?.scrollIntoView({block:'start'});else flyTo(0);return}
  const step=e.target.closest('[data-zc-step]');
  if(step){flyTo(cameraAt(progress(),n).current+Number(step.dataset.zcStep));return}
  const go=e.target.closest('[data-zc-go]');
  if(go){const k=Number(go.dataset.zcGo);if(reduced)layers[k]?.scrollIntoView({block:'start'});else flyTo(k,{fast:true});return} // Claude runde 9 (ux-r9-010): skinnen springer hurtigt og direkte
  if(e.target.closest('[data-zc-portal]')){flyTo(cameraAt(progress(),n).current+1);return}
  if(e.target.closest('[data-zc-skip]')){const to=trackTop()+track.offsetHeight;cancelFlight();win.scrollTo({top:to,behavior:reduced?'instant':'smooth'})}
 });
 on(el,'keydown',e=>{const keys=scene?['ArrowRight','ArrowLeft']:['ArrowDown','ArrowUp','PageDown','PageUp'];if(reduced||!near||!keys.includes(e.key))return;const fwd=/Down|Right/.test(e.key),p=progress();if(p<=0&&!fwd||p>=1&&fwd)return;e.preventDefault();const cur=cameraAt(p,n).current;flyTo(cur+(fwd?1:-1))});
 on(motion,'change',()=>setStatic(motion.matches));
 const themeObserver=new MutationObserver(()=>{const t=themeOf(doc);if(t!==theme){theme=t;if(loaded)sources()}});
 themeObserver.observe(doc.documentElement,{attributes:true,attributeFilter:['data-tema']});
 on(win,'ndi-themechange',()=>{const t=themeOf(doc);if(t!==theme){theme=t;if(loaded)sources()}});
 io.observe(el);
 el.classList.toggle('is-scene',scene);
 setStatic(reduced);
 if(!reduced){measure();paint(progress())}
 return {
  destroy(){dead=true;cancelFlight();win.cancelAnimationFrame(raf);win.clearTimeout(snapTimer);ctrl.abort();io.disconnect();seen.disconnect();themeObserver.disconnect()},
  flyTo,getState:()=>({reduced,scene,kind,theme,progress:progress(),...cameraAt(progress(),n)}),paint
 };
}
