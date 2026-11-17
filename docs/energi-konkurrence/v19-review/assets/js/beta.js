/* Preserve the notice when older company pages rebuild their main content. */
(()=>{'use strict';const main=document.querySelector('main'),notice=main?.querySelector('.ndi-beta');if(!main||!notice)return;const template=notice.cloneNode(true);
 const mobil=matchMedia('(max-width:700px)').matches,saet=n=>mobil?main.append(n):main.prepend(n);if(mobil)main.append(notice);
 const ensure=()=>{if(!main.querySelector('.ndi-beta'))saet(template.cloneNode(true))};
 new MutationObserver(ensure).observe(main,{childList:true});ensure();
})();
