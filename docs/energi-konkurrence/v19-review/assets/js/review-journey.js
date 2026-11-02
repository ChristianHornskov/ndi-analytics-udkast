import {zoomCameraHtml,bindZoomCamera} from './zoom-camera.mjs?v=20261102-company';
const host=document.querySelector('#ai-rejsen');
if(host){
  host.innerHTML='<h2>Hvad sker der, når du spørger AI?</h2><p class="review-lead">Følg dit spørgsmål fra telefonen til teknologien bag svaret, og mød de selskaber i fonden, der arbejder i hvert led. Tryk på ringen i billedet. Du kan også bruge + og − eller vælge et led direkte.</p>'+zoomCameraHtml();
  host.querySelector('[data-zc-skip]')?.remove();
  host.querySelector('.zc-start-cue').textContent='Tryk på ringen og kig indenfor';
  const caption=document.createElement('p');caption.className='ndi-figure-note';caption.textContent='AI-genereret, forenklet illustration. Viser udvalgte led og sammenhænge.';host.querySelector('.zc-reader').before(caption);
  bindZoomCamera(host);
}

import {bindJourneyCompanies} from './journey-companies.mjs?v=20261102-disclosure';
if(host)bindJourneyCompanies(host);
