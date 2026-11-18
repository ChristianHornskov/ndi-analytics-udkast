import {ZOOM_LAYERS} from './zoom-camera.mjs?v=20261102-company';

// A separate phone layout: no desktop camera or scroll capture.
// Reuse the editorial cards and company-data binding from the desktop journey.
export function bindMobileJourney(host){
 const mobile=document.createElement('section');
 mobile.className='mobile-ai-journey';
 mobile.setAttribute('aria-label','Fra spørgsmål til strøm');
 const cards=[...host.querySelectorAll('[data-zc-layer] .zc-card')];
 mobile.innerHTML=`<div class="mobile-ai-heading"><span>FRA SPØRGSMÅL TIL STRØM</span><span data-mobile-ai-count aria-live="polite" aria-atomic="true"></span></div><div class="mobile-ai-progress" aria-hidden="true">${ZOOM_LAYERS.map(()=>'<i></i>').join('')}</div><div class="mobile-ai-picture"><img width="780" height="1040" alt="" data-mobile-ai-image><button type="button" class="mobile-ai-portal" data-mobile-ai-portal aria-label="Zoom ind til næste led"><span aria-hidden="true">+</span></button></div><nav class="mobile-ai-controls" aria-label="Skift led"><button type="button" data-mobile-ai-prev aria-label="Forrige led">←</button><strong data-mobile-ai-label></strong><button type="button" data-mobile-ai-next aria-label="Næste led">→</button></nav><div class="mobile-ai-cards"></div>`;
 cards.forEach(original=>{
  const card=original.cloneNode(true);
  card.removeAttribute('aria-labelledby');
  card.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
  card.hidden=true;
  mobile.querySelector('.mobile-ai-cards').append(card);
 });
 host.append(mobile);
 let current=0,busy=false;
 const picture=mobile.querySelector('.mobile-ai-picture');
 const portal=mobile.querySelector('[data-mobile-ai-portal]');
 function placePortal(){
  const point=ZOOM_LAYERS[current].mobile.portal;
  portal.hidden=!point;
  if(!point)return;
  const w=picture.clientWidth,h=w*.75,scale=Math.max(w/780,h/1040);
  const position=current===4?0:.51;
  image.style.objectPosition=`center ${position*100}%`;
  const x=(w-780*scale)/2+point[0]*780*scale;
  const y=(h-1040*scale)*position+point[1]*1040*scale;
  portal.style.left=`${x}px`;portal.style.top=`${y}px`;
  image.style.transformOrigin=`${x}px ${y}px`;
  portal.setAttribute('aria-label','Zoom ind til '+ZOOM_LAYERS[current+1].label.toLowerCase());
 }
 new ResizeObserver(placePortal).observe(picture);
 const image=mobile.querySelector('img');
 function paint(){
  const layer=ZOOM_LAYERS[current];
  const light=document.documentElement.getAttribute('data-tema')==='lys'||document.documentElement.dataset.theme==='light'||document.body.dataset.theme==='light'||document.documentElement.classList.contains('light');
  image.src=layer.mobile[light?'light':'dark'];
  image.alt='Illustration: '+layer.label;
  image.style.objectPosition=current===4?'center top':'center 51%';
  placePortal();
  mobile.querySelector('[data-mobile-ai-label]').textContent=layer.label;
  mobile.querySelector('[data-mobile-ai-count]').textContent=`${current+1} af 6`;
  mobile.querySelectorAll('.mobile-ai-progress i').forEach((el,i)=>el.classList.toggle('is-current',i<=current));
  mobile.querySelectorAll('.mobile-ai-cards>.zc-card').forEach((el,i)=>el.hidden=i!==current);
  mobile.querySelector('[data-mobile-ai-prev]').disabled=current===0;
  mobile.querySelector('[data-mobile-ai-next]').disabled=current===5;
 }
 mobile.addEventListener('click',async event=>{
  const zoom=event.target.closest('[data-mobile-ai-portal]');
  const direction=event.target.closest('[data-mobile-ai-prev]')?-1:(zoom||event.target.closest('[data-mobile-ai-next]'))?1:0;
  if(!direction||busy||current+direction<0||current+direction>5)return;
  busy=true;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  try{
   if(zoom&&!reduced)await image.animate([{transform:'scale(1)',opacity:1},{transform:'scale(3.2)',opacity:0}],{duration:380,easing:'ease-in',fill:'forwards'}).finished;
   current+=direction;paint();
   image.getAnimations().forEach(animation=>animation.cancel());
   if(!reduced)await image.animate([{opacity:.2,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{duration:220,easing:'ease-out'}).finished;
   if(zoom&&current===5)mobile.querySelector('[data-mobile-ai-prev]').focus({preventScroll:true});
  }finally{busy=false;}
 });
 new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['data-tema','data-theme','class']});
 paint();
}
