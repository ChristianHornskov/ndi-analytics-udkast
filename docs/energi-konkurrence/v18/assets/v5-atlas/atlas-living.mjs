






import {CLUSTER_NAMES} from './atlas-data.mjs';
import {layoutAtlas} from './atlas-canvas.mjs';

export const GATHER_MS=1600;
export const REST_THREADS=14;
const FLIGHT_MS=900,STAGGER_MS=GATHER_MS-FLIGHT_MS-120,LIFE_FPS=24,IDLE_MS=22000,SETTLE_MS=2400,BREATH_MS=6000,PULSE_MS=1500,PULSE_GAP=2600;

const NAMES=CLUSTER_NAMES;
export const clusterName=c=>c.displayName||NAMES[c.id]||c.name;


export function seeded(key,salt=0){let h=2166136261^salt;for(const ch of String(key)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}h^=h>>>13;h=Math.imul(h,1274126177);return ((h^(h>>>16))>>>0)/4294967296}
export const easeOutCubic=t=>1-(1-Math.min(1,Math.max(0,t)))**3;


export function atlasThreads(layout){
 const by=new Map(layout.clusters.map(c=>[c.id,c])),pairs=new Map();
 for(const d of layout.dots)for(const id of d.also||[]){if(id===d.line||!by.has(id)||!by.has(d.line))continue;const key=[d.line,id].sort().join('|');pairs.set(key,(pairs.get(key)||0)+1)}
 return [...pairs].map(([key,count])=>{const [a,b]=key.split('|').map(id=>by.get(id)),mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,bow=Math.min(60,len*.18)*(seeded(key)>.5?1:-1);
  return {a:a.id,b:b.id,count,x1:a.x,y1:a.y,x2:b.x,y2:b.y,cx:mx-dy/len*bow,cy:my+dx/len*bow}}).sort((p,q)=>q.count-p.count||(p.a+p.b).localeCompare(q.a+q.b));
}



export const ATLAS_TECHNOLOGY_RELATIONS=[
 {a:'kvante',b:'chips',kind:'technology',label:'Klassisk styring',explanation:'Kvantesystemer bruger klassiske chips til styring og til at bearbejde måleresultater.'},
 {a:'kvante',b:'software',kind:'technology',label:'Programmer og algoritmer',explanation:'Software forbereder kvanteberegninger og forbinder dem med klassiske beregninger.'},
 {a:'kvante',b:'sundhed',kind:'research',label:'Molekyler · forskning',explanation:'Molekylesimulering undersøges som en mulig kvanteanvendelse i sundhed. Praktisk brug kræver mere præcise og stabile kvantecomputere.'}
];
export function atlasTechnologyThreads(layout){
 const by=new Map(layout.clusters.map(c=>[c.id,c]));
 return ATLAS_TECHNOLOGY_RELATIONS.filter(r=>by.has(r.a)&&by.has(r.b)).map(r=>{
  const a=by.get(r.a),b=by.get(r.b),dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,bow=Math.min(82,len*.24);
  return {...r,x1:a.x,y1:a.y,x2:b.x,y2:b.y,cx:(a.x+b.x)/2-dy/len*bow,cy:(a.y+b.y)/2+dx/len*bow};
 });
}


export function threadLabelSpot(th,width,labels,height=21){
 const at=t=>{const u=1-t;return [u*u*th.x1+2*u*t*th.cx+t*t*th.x2,u*u*th.y1+2*u*t*th.cy+t*t*th.y2]};
 const free=([x,y])=>!labels.some(r=>x-width/2<r.x+r.w&&x+width/2>r.x&&y-17<r.y+r.h&&y-17+height>r.y);
 for(const t of [.48,.4,.56,.32,.64,.25,.72]){const p=at(t);if(free(p))return p}
 return at(.48);
}
export function technologyNeighbours(threads,focus){
 return new Set(threads.filter(t=>t.a===focus||t.b===focus).flatMap(t=>[t.a,t.b]));
}


export function gatherPlan(layout){
 return layout.dots.map(d=>({sx:seeded(d.isin,1)*layout.width,sy:seeded(d.isin,2)*layout.height,delay:seeded(d.isin,3)*STAGGER_MS,dur:FLIGHT_MS+seeded(d.isin,4)*120}));
}

export function gatherPosition(d,plan,t){const k=easeOutCubic((t-plan.delay)/plan.dur);return {x:plan.sx+(d.x-plan.sx)*k,y:plan.sy+(d.y-plan.sy)*k,k}}


function parseColour(v){
 v=String(v||'').trim();let m=/^#([0-9a-f]{3,8})$/i.exec(v);
 if(m){let h=m[1];if(h.length<6)h=[...h].map(c=>c+c).join('');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}
 m=/^rgba?\(([^)]+)\)$/i.exec(v);if(m){const p=m[1].split(/[\s,/]+/).filter(Boolean).slice(0,3).map(Number);if(p.every(Number.isFinite))return p}
 return null;
}
export function readPalette(el){
 const cs=el.ownerDocument.defaultView.getComputedStyle(el),get=(n,fb)=>parseColour(cs.getPropertyValue(n))||fb;
 const ink=get('--text',parseColour(cs.color)||[128,128,128]);
 const p={ink,teal:get('--teal',ink),gold:get('--gold',ink),bg:get('--bg',null),line:get('--line',ink)};
 
 p.glow=p.bg&&(p.bg[0]*.299+p.bg[1]*.587+p.bg[2]*.114)>140?.45:1;p.key=JSON.stringify(p);return p;
}
const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${Math.max(0,Math.min(1,a)).toFixed(3)})`;

export function createLivingAtlas(host,{model,onLine,reducedMotion=false,counter=null,dotStyle=null,simpleConnections=false}={}){
 const doc=host.ownerDocument,win=doc.defaultView;host.classList.add('ac','al');
 const canvas=doc.createElement('canvas');canvas.setAttribute('aria-hidden','true');host.replaceChildren(canvas);const ctx=canvas.getContext('2d');
 const legend=doc.createElement('div');legend.className='al-technology-legend';legend.style.cssText='position:relative;padding:10px 4px 0;font-size:13px;line-height:1.5;color:var(--text);';host.append(legend);legend.hidden=simpleConnections;
 const relationStatus=doc.createElement('p');relationStatus.className='al-relation-status';relationStatus.setAttribute('aria-live','polite');relationStatus.style.cssText='margin:6px 0 0;min-height:3em';
 let layout,threads=[],technologyThreads=[],plan=[],labels=[],palette=readPalette(host),dpr=1,backKey='';const back=doc.createElement('canvas');
 let visible=false,dead=false,filter='all',selection=null,hover=null,highlight=null,ripple=null,gatherStart=null,gathered=false,lifeUntil=0,timer=0,raf=0,frames=0,lastDraw=0,pulse=null,nextPulse=0;
 const now=()=>win.performance.now();
 
 
 
 let lastWidth=0,drawRaf=0,backIdle=0;
 const keyNow=()=>`${layout.width}|${layout.height}|${dpr}|${selection}|${hover}|${palette.key}`;
 const idle=f=>win.requestIdleCallback?win.requestIdleCallback(f,{timeout:400}):win.setTimeout(f,60);
 function drawSoon(){if(!drawRaf)drawRaf=win.requestAnimationFrame(()=>{drawRaf=0;if(!dead)draw(now())})}
 function resize(){
  const width=host.clientWidth||360;lastWidth=width;const height=width<600?540:560;layout=layoutAtlas(model,{width,height});for(const c of layout.clusters)c.phase=seeded(c.id,9)*Math.PI*2;threads=atlasThreads(layout);technologyThreads=atlasTechnologyThreads(layout);plan=gatherPlan(layout);
  dpr=Math.min(3,win.devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(layout.height*dpr);canvas.style.width=width+'px';canvas.style.height=layout.height+'px';host.style.height='auto';host.style.minHeight=layout.height+'px';
  const sample=(dash,color,w=2)=>`<svg width="30" height="10" viewBox="0 0 30 10" aria-hidden="true" focusable="false" style="vertical-align:middle;margin-right:6px"><line x1="2" y1="5" x2="28" y2="5" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash?` stroke-dasharray="${dash}"`:''}/></svg>`;
  
  legend.innerHTML=`<span style="margin-right:16px;white-space:nowrap">${sample('','var(--teal)')}Fælles selskaber</span><span style="margin-right:16px;white-space:nowrap">${sample('6 4','var(--teal)')}Teknologisk samspil</span><span style="white-space:nowrap">${sample('0.5 5','var(--gold)',3)}Mulig anvendelse · forskning</span>`;legend.append(relationStatus);
  relationStatus.textContent=technologyThreads.length?'Kvante er forbundet med chips og software. Den gule, prikkede forbindelse til sundhed er en mulig fremtidig anvendelse: forskning i molekylesimulering.':'';ctx.setTransform(dpr,0,0,dpr,0,0);
  host.querySelectorAll('button').forEach(b=>b.remove());
  ctx.font='600 13px system-ui,sans-serif';
  labels=layout.clusters.map(c=>{const w=Math.max(ctx.measureText(clusterName(c)).width,ctx.measureText(`${c.count} selskaber`).width)+14;return {x:c.x-w/2,y:c.labelY-3,w,h:39}});
  for(const c of layout.clusters){const b=doc.createElement('button');b.type='button';b.className='ac-cluster';b.dataset.acLine=c.id;const hitR=Math.max(22,c.r),top=c.y-hitR-4;
   b.style.cssText=`left:${c.x}px;top:${top}px;width:${Math.max(72,Math.min(110,layout.width/layout.cols))}px;height:${hitR*2+55+(c.id==='ikke-klassificeret'?31:0)}px;--label-top:${c.labelY-top}px`;
   b.setAttribute('aria-label',`${clusterName(c)}, ${c.count} ${c.count===1?'selskab':'selskaber'}`);b.setAttribute('aria-description',technologyThreads.filter(t=>t.a===c.id||t.b===c.id).map(t=>t.explanation).join(' '));b.innerHTML='<span></span><small></small>';b.firstChild.textContent=clusterName(c);b.lastChild.textContent=`${c.count} ${c.count===1?'selskab':'selskaber'}`;
   b.addEventListener('click',()=>{ripple={x:c.x,y:c.y,start:now()};selection=c.id;hover=null;wake(4000);onLine?.(c.id,b)});
   
   b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&hover!==c.id){hover=c.id;draw(now())}});b.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&hover===c.id){hover=null;draw(now())}});
   b.addEventListener('focus',()=>{hover=c.id;draw(now())});b.addEventListener('blur',()=>{if(hover===c.id){hover=null;draw(now())}});
   host.append(b)}
  drawSoon();

 }
 
 function breathAmp(t){if(reducedMotion||!gathered)return 0;const left=lifeUntil-t;return left<=0?0:Math.min(1,left/SETTLE_MS)}
 function pos(d,i,t,amp,centre){
  let x=d.x,y=d.y;
  if(gatherStart!==null&&!gathered){const g=gatherPosition(d,plan[i],t-gatherStart);x=g.x;y=g.y;return {x,y,k:g.k}}
  if(amp){const c=centre.get(d.line);if(c){const dx=d.x-c.x,dy=d.y-c.y,r=Math.max(8,c.r),s=Math.sin((t/BREATH_MS)*Math.PI*2+c.phase)*2*amp*Math.min(1,Math.hypot(dx,dy)/r);const len=Math.hypot(dx,dy)||1;x+=dx/len*s;y+=dy/len*s}}
  if(ripple){const rt=(t-ripple.start)/900,dist=Math.hypot(x-ripple.x,y-ripple.y);if(rt<1){const a=Math.sin(rt*12-dist*.05)*Math.exp(-rt*4)*8;x+=(x-ripple.x)/(dist||1)*a;y+=(y-ripple.y)/(dist||1)*a}}
  return {x,y,k:1};
 }
 function buildBackdrop(key){
  backKey=key;const W=layout.width,H=layout.height,P=palette,b=back.getContext('2d'),maxCount=threads[0]?.count||1;
  back.width=canvas.width;back.height=canvas.height;b.setTransform(dpr,0,0,dpr,0,0);b.clearRect(0,0,W,H);b.lineCap='round';
  const focus=hover||selection;
  for(const [ti,th] of threads.entries()){const on=focus&&(th.a===focus||th.b===focus),dim=focus&&!on;if(!on&&ti>=REST_THREADS)continue;
   const w=.6+1.9*Math.sqrt(th.count/maxCount),a=on?.75:dim?.08:(.16+.22*Math.sqrt(th.count/maxCount))*(P.glow<1?1.8:1);

   b.strokeStyle=rgba(on?P.gold:P.teal,a);b.lineWidth=on?w+.6:w;b.beginPath();b.moveTo(th.x1,th.y1);b.quadraticCurveTo(th.cx,th.cy,th.x2,th.y2);b.stroke()}

  
  for(const th of technologyThreads){
   const on=focus&&(th.a===focus||th.b===focus),dim=focus&&!on;
   const research=th.kind==='research';b.setLineDash(simpleConnections?[]:research?[0.5,6]:[8,5]);b.lineCap=research?'round':'butt';b.strokeStyle=rgba(research&&!simpleConnections?P.gold:P.teal,dim?.18:on?1:research?.9:.65);b.lineWidth=research?(on?3.4:2.8):(on?2.6:1.7);
   b.beginPath();b.moveTo(th.x1,th.y1);b.quadraticCurveTo(th.cx,th.cy,th.x2,th.y2);b.stroke();b.setLineDash([]);
   b.lineCap='butt';
   if(on||(research&&!dim)){b.font='600 12px system-ui,sans-serif';b.textAlign='center';const w=b.measureText(th.label).width+12,[x,y]=threadLabelSpot(th,w,labels);
    if(P.bg){b.fillStyle=rgba(P.bg,.96);b.fillRect(x-w/2,y-17,w,21)}b.fillStyle=rgba(P.ink,1);b.fillText(th.label,x,y-2);}
  }
  const neighbours=technologyNeighbours(technologyThreads,focus);
  for(const button of host.querySelectorAll('[data-ac-line]')){button.classList.toggle('is-technology-related',neighbours.has(button.dataset.acLine));}
  const relevant=technologyThreads.filter(th=>th.a===focus||th.b===focus),status=relevant.length?relevant.map(th=>th.explanation).join(' '):technologyThreads.length?'Kvante er forbundet med chips og software. Den gule, prikkede forbindelse til sundhed er en mulig fremtidig anvendelse: forskning i molekylesimulering.':'';
  if(relationStatus.textContent!==status)relationStatus.textContent=status;
  
  if(selection){const th=threads.find(th=>th.a===selection||th.b===selection);if(th){b.font='600 12px system-ui,sans-serif';b.textAlign='center';const text=`${th.count} fælles`,w=b.measureText(text).width+12,[x,y]=threadLabelSpot(th,w,labels);if(P.bg){b.fillStyle=rgba(P.bg,.96);b.fillRect(x-w/2,y-17,w,21)}b.fillStyle=rgba(P.gold,1);b.fillText(text,x,y-2)}}
  
  b.globalCompositeOperation='destination-out';b.fillStyle=rgba(P.ink,1);
  for(const r of labels){b.beginPath();b.roundRect?b.roundRect(r.x,r.y,r.w,r.h,8):b.rect(r.x,r.y,r.w,r.h);b.fill()}
  
  b.globalCompositeOperation='destination-over';
  for(const c of layout.clusters){const R=Math.max(35,c.r*2.4),sel=focus===c.id||neighbours.has(c.id),g=b.createRadialGradient(c.x,c.y,0,c.x,c.y,R);g.addColorStop(0,rgba(sel?P.gold:P.teal,(sel?.2:.11)*P.glow));g.addColorStop(.45,rgba(P.line,.27*P.glow));g.addColorStop(1,rgba(P.line,0));b.fillStyle=g;b.fillRect(c.x-R,c.y-R,R*2,R*2)}
  b.globalCompositeOperation='source-over';
 }
 function quad(th,t){const u=1-t;return [u*u*th.x1+2*u*t*th.cx+t*t*th.x2,u*u*th.y1+2*u*t*th.cy+t*t*th.y2]}
 function draw(t){
  if(!layout)return;lastDraw=t;frames++;
  const W=layout.width,H=layout.height,P=palette,amp=breathAmp(t),gatherK=gatherStart===null||gathered?1:Math.min(1,(t-gatherStart)/GATHER_MS);
  if(ripple&&t-ripple.start>900)ripple=null;
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.clearRect(0,0,W,H);
  
  const key=keyNow();if(backKey!==key){if(!gathered&&!reducedMotion&&!backKey){if(!backIdle)backIdle=idle(()=>{backIdle=0;if(!dead&&layout&&backKey!==keyNow()){buildBackdrop(keyNow());if(!raf)draw(now())}})}else buildBackdrop(key)}
  if(backKey===key){ctx.globalAlpha=gatherK;ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(back,0,0);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalAlpha=1}

  const threadIn=gathered?1:Math.max(0,(gatherK-.7)/.3);
  if(threadIn>0&&!reducedMotion){
   
   const runs=selection?threads.filter(th=>th.a===selection||th.b===selection).slice(0,4).map((th,i)=>({th,u:((t/PULSE_MS)+i*.27)%1})):pulse&&t<pulse.start+PULSE_MS?[{th:pulse.th,u:(t-pulse.start)/PULSE_MS}]:[];
   for(const {th,u} of runs)for(let k=0;k<6;k++){const uu=u-k*.025;if(uu<0)break;const [x,y]=quad(th,uu);if(labels.some(r=>x>r.x&&x<r.x+r.w&&y>r.y&&y<r.y+r.h))continue;ctx.fillStyle=rgba(selection?P.gold:P.ink,(.85-k*.14)*threadIn);ctx.beginPath();ctx.arc(x,y,2.4-k*.25,0,Math.PI*2);ctx.fill()}
  }
  
  ctx.globalCompositeOperation='source-over';
  const centre=new Map(layout.clusters.map(c=>[c.id,c])),r=layout.dotR,relatedThemes=technologyNeighbours(technologyThreads,hover||selection);
  for(const [i,d] of layout.dots.entries()){
   const focus=hover||selection,active=focus===d.line||relatedThemes.has(d.line),multi=d.also?.length,p=pos(d,i,t,amp,centre),hit=highlight?.has(d.isin);
   let a=filter==='multi'&&!multi?.13:focus&&!active?.4:.92;if(highlight)a=hit?1:.12;if(p.k<1)a*=.35+.65*p.k;
   const custom=dotStyle?.(d);const radius=custom?.radius??r;const col=custom?.color?parseColour(custom.color)||P.teal:hit||active?P.gold:multi?P.ink:P.teal;
   if(p.k<1&&p.k>0){const pl=plan[i],back=gatherPosition(d,pl,t-gatherStart-90);ctx.strokeStyle=rgba(col,.35*(1-p.k));ctx.lineWidth=r*.9;ctx.beginPath();ctx.moveTo(back.x,back.y);ctx.lineTo(p.x,p.y);ctx.stroke()}
   ctx.fillStyle=rgba(col,a);ctx.beginPath();ctx.arc(p.x,p.y,p.k<1?radius*(.6+.4*p.k):hit?radius*1.7:radius,0,Math.PI*2);ctx.fill();
  }
  ctx.globalAlpha=1;
  
 }
 
 function busy(t){return (gatherStart!==null&&!gathered)||!!ripple}
 function alive(t){return !reducedMotion&&(busy(t)||t<lifeUntil||!!selection&&t<lifeUntil)}
 function stop(){win.cancelAnimationFrame(raf);raf=0;win.clearTimeout(timer);timer=0}
 function loop(){
  raf=0;timer=0;if(dead||!visible||doc.hidden)return;const t=now();
  if(gatherStart!==null&&!gathered&&t-gatherStart>=GATHER_MS){gathered=true;host.classList.add('is-gathered');if(counter)counter.textContent=String(layout.dots.length)}
  if(gathered&&!selection&&!reducedMotion&&t>=nextPulse&&t<lifeUntil-SETTLE_MS){const pick=threads[Math.floor(seeded(String(Math.floor(t)),5)*Math.min(threads.length,10))];if(pick)pulse={th:pick,start:t};nextPulse=t+PULSE_MS+PULSE_GAP}
  draw(t);
  if(!alive(t)){draw(t);return}
  if(busy(t))raf=win.requestAnimationFrame(loop);else timer=win.setTimeout(()=>{raf=win.requestAnimationFrame(loop)},Math.max(0,1000/LIFE_FPS-(now()-t)));
 }
 function start(){if(!raf&&!timer&&!dead&&visible&&!doc.hidden&&!reducedMotion)raf=win.requestAnimationFrame(loop)}
 function wake(ms=IDLE_MS){if(reducedMotion){draw(now());return}lifeUntil=Math.max(lifeUntil,now()+ms);if(!gathered&&gatherStart===null)return;start()}
 function beginGather(){if(gatherStart!==null)return;if(reducedMotion){gathered=true;host.classList.add('is-gathered');draw(now());return}gatherStart=now();lifeUntil=gatherStart+GATHER_MS+IDLE_MS;nextPulse=gatherStart+GATHER_MS+400;start()}
 const motion=win.matchMedia?.('(prefers-reduced-motion: reduce)'),motionChanged=()=>{reducedMotion=motion.matches;if(reducedMotion){stop();gathered=true;if(counter&&layout)counter.textContent=String(layout.dots.length)}draw(now());if(!reducedMotion)wake()};motion?.addEventListener('change',motionChanged);
 const ro=new ResizeObserver(()=>{const w=host.clientWidth||360;if(w!==lastWidth)resize()});ro.observe(host);
 const io=new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible){if(gatherStart===null)beginGather();else wake()}else stop()},{threshold:.15});io.observe(host);
 const visibility=()=>{if(doc.hidden)stop();else if(visible)wake()};doc.addEventListener('visibilitychange',visibility);
 const poke=()=>wake();host.addEventListener('pointermove',poke,{passive:true});host.addEventListener('pointerdown',poke,{passive:true});
 const retheme=()=>{palette=readPalette(host);draw(now())};
 const themeObserver=new MutationObserver(retheme);themeObserver.observe(doc.documentElement,{attributes:true,attributeFilter:['data-theme','class','style']});win.addEventListener('ndi-themechange',retheme);
 resize();
 return {
  destroy(){dead=true;stop();win.cancelAnimationFrame(drawRaf);ro.disconnect();io.disconnect();themeObserver.disconnect();motion?.removeEventListener('change',motionChanged);doc.removeEventListener('visibilitychange',visibility);win.removeEventListener('ndi-themechange',retheme);host.removeEventListener('pointermove',poke);host.removeEventListener('pointerdown',poke);host.replaceChildren()},
  setFilter(v){filter=v;draw(now());wake(4000)},
  
  setHighlight(isins){highlight=isins&&isins.size?isins:null;draw(now())},setSelection(v){selection=v;draw(now());if(v)wake(6000)},getLayout:()=>layout,
  getState:()=>({filter,selection,hover,highlighted:highlight?.size||0,reducedMotion,gathered,animating:!!(raf||timer),frames,threads:threads.length,technologyThreads:technologyThreads.map(t=>({a:t.a,b:t.b,kind:t.kind})),dpr})

 };
}
