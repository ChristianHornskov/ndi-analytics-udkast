/* Regnskabstal leveres af dagens-tal, inklusive JSON-reserven. */
(function(){function set(d){window.NDI_DATA=d.regnskab;}if(window.NDI_TAL)set(window.NDI_TAL);document.addEventListener("ndi:tal",function(e){set(e.detail);});})();
