/* Preserve the notice when older company pages rebuild their main content. */
(()=>{'use strict';const main=document.querySelector('main'),notice=main?.querySelector('.ndi-beta');if(!main||!notice)return;const text=notice.querySelector('p');if(text)text.innerHTML='<strong>Beta</strong> · Siderne vedligeholdes med AI og kan indeholde fejl.';const template=notice.cloneNode(true);
 const ensure=()=>{let current=main.querySelector('.ndi-beta');if(!current)current=template.cloneNode(true);if(main.firstElementChild!==current)main.prepend(current)};
 new MutationObserver(ensure).observe(main,{childList:true});ensure();
})();
