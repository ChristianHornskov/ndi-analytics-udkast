/* Tryk-tegning: rum, der tændes ét ad gangen og forbindes med skyen. Bruges af [data-rum]. */
(function(){
  function fmt(v){return v.toFixed(2).replace('.',',')+' %';}
  function andele(){
    var D=window.DAGENS_TAL;if(!D||!D.temaer)return;
    var m={};D.temaer.forEach(function(t){(t.selskaber||[]).forEach(function(s){m[s.slug]=s.andel;});});
    document.querySelectorAll('[data-rum-andel]').forEach(function(b){
      var sum=0,n=0;b.getAttribute('data-rum-andel').split(',').forEach(function(s){if(m[s]!=null){sum+=m[s];n++;}});
      if(n)b.textContent=fmt(sum);
    });
  }
  function init(sec){
    var ids=[],taendt={},laast=false;
    sec.querySelectorAll('.ru-knap').forEach(function(k){ids.push(k.getAttribute('data-rum-id'));});
    var tael=sec.querySelector('[data-ru-tael]'),start=sec.querySelector('.ru-kort--start'),slut=sec.querySelector('.ru-kort--slut');
    var ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    function vis(id,fokus){
      taendt[id]=true;
      sec.querySelectorAll('[data-rum-id]').forEach(function(e){
        var mid=e.getAttribute('data-rum-id');
        e.classList.toggle('er-aktiv',mid===id);
        if(taendt[mid])e.classList.add('er-taendt');
        if(e.classList.contains('ru-kort'))e.hidden=mid!==id;
        if(e.classList.contains('ru-knap'))e.setAttribute('aria-pressed',mid===id?'true':'false');
      });
      start.hidden=true;slut.hidden=true;
      var n=Object.keys(taendt).length;tael.textContent=n;
      sec.classList.toggle('ru--alle',n===ids.length);
      if(fokus&&innerWidth<860){var k=sec.querySelector('.ru-kort[data-rum-id="'+id+'"]');if(k&&k.getBoundingClientRect().top>innerHeight*.8)k.scrollIntoView({behavior:ro?'auto':'smooth',block:'nearest'});}
    }
    sec.addEventListener('click',function(e){
      var t=e.target.closest('[data-rum-id]');
      if(t&&(t.classList.contains('ru-rum')||t.classList.contains('ru-knap'))){vis(t.getAttribute('data-rum-id'),true);}
    });
    sec.addEventListener('keydown',function(e){
      var t=e.target.closest('.ru-rum');if(t&&(e.key==='Enter'||e.key===' ')){e.preventDefault();vis(t.getAttribute('data-rum-id'),true);}
    });
    sec.querySelector('.ru-alle').addEventListener('click',function(){
      if(laast)return;laast=true;var i=0;
      (function naeste(){
        if(i<ids.length){vis(ids[i++],false);setTimeout(naeste,ro?0:420);}
        else{laast=false;sec.querySelectorAll('.ru-kort[data-rum-id]').forEach(function(k){k.hidden=true;});
          sec.querySelectorAll('.er-aktiv').forEach(function(e){e.classList.remove('er-aktiv');});slut.hidden=false;}
      })();
    });
  }
  function go(){document.querySelectorAll('[data-rum]').forEach(init);andele();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
  window.addEventListener('ndi:live',andele);
})();
