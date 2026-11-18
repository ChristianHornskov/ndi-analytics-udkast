import {ZOOM_LAYERS} from './zoom-camera.mjs?v=20261102-company';

// A separate phone layout: no camera coordinates, nested zoom or scroll capture.
// Reuse the editorial cards and company-data binding from the desktop journey.
export function bindMobileJourney(host){
 const mobile=document.createElement('section');
 mobile.className='mobile-ai-journey';
 mobile.setAttribute('aria-label','Fra spørgsmål til strøm');
 const cards=[...host.querySelectorAll('[data-zc-layer] .zc-card')];
 mobile.innerHTML=`<div class="mobile-ai-heading"><span>FRA SPØRGSMÅL TIL STRØM</span><span data-mobile-ai-count aria-live="polite" aria-atomic="true"></span></div><div class="mobile-ai-progress" aria-hidden="true">${ZOOM_LAYERS.map(()=>'<i></i>').join('')}</div><div class="mobile-ai-picture"><img width="780" height="1040" alt="" data-mobile-ai-image></div><nav class="mobile-ai-controls" aria-label="Skift led"><button type="button" data-mobile-ai-prev aria-label="Forrige led">←</button><strong data-mobile-ai-label></strong><button type="button" data-mobile-ai-next aria-label="Næste led">→</button></nav><div class="mobile-ai-cards"></div>`;
 cards.forEach(original=>{
  const card=original.cloneNode(true);
  card.removeAttribute('aria-labelledby');
  card.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
  card.hidden=true;
  mobile.querySelector('.mobile-ai-cards').append(card);
 });
 host.append(mobile);
 let current=0;
 const image=mobile.querySelector('img');
 function paint(){
  const layer=ZOOM_LAYERS[current];
  const light=document.documentElement.getAttribute('data-tema')==='lys'||document.documentElement.dataset.theme==='light'||document.body.dataset.theme==='light'||document.documentElement.classList.contains('light');
  image.src=layer.mobile[light?'light':'dark'];
  image.alt='Illustration: '+layer.label;
  mobile.querySelector('[data-mobile-ai-label]').textContent=layer.label;
  mobile.querySelector('[data-mobile-ai-count]').textContent=`${current+1} af 6`;
  mobile.querySelectorAll('.mobile-ai-progress i').forEach((el,i)=>el.classList.toggle('is-current',i<=current));
  mobile.querySelectorAll('.mobile-ai-cards>.zc-card').forEach((el,i)=>el.hidden=i!==current);
  mobile.querySelector('[data-mobile-ai-prev]').disabled=current===0;
  mobile.querySelector('[data-mobile-ai-next]').disabled=current===5;
 }
 mobile.addEventListener('click',event=>{
  const direction=event.target.closest('[data-mobile-ai-prev]')?-1:event.target.closest('[data-mobile-ai-next]')?1:0;
  if(!direction)return;
  current=Math.max(0,Math.min(5,current+direction));paint();
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)image.animate([{opacity:.3,transform:'scale(1.035)'},{opacity:1,transform:'scale(1)'}],{duration:280,easing:'ease-out'});
 });
 new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['data-tema','data-theme','class']});
 paint();
}
