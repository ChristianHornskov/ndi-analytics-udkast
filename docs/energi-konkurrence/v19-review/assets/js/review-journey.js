import {zoomCameraHtml,bindZoomCamera} from './zoom-camera.mjs';
const host=document.querySelector('#ai-rejsen');
if(host){
  host.innerHTML='<h2>Hvad sker der, når du spørger AI?</h2><p class="review-lead">Tryk på ringen i billedet og følg dit spørgsmål fra telefonen til teknologien bag svaret. Du kan også bruge + og − eller vælge et led direkte.</p>'+zoomCameraHtml();
  host.querySelector('[data-zc-skip]')?.remove();
  host.querySelector('.zc-start-cue').textContent='Tryk på ringen og kig indenfor';
  bindZoomCamera(host);
}
