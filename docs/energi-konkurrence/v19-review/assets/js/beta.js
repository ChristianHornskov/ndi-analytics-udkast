/* Preserve the notice when older company pages rebuild their main content. */
(()=>{'use strict';const main=document.querySelector('main'),notice=main?.querySelector('.ndi-beta');if(!main||!notice)return;const template=notice.cloneNode(true);
 const ensure=()=>{if(!main.querySelector('.ndi-beta'))main.prepend(template.cloneNode(true))};
 new MutationObserver(ensure).observe(main,{childList:true});ensure();
})();
