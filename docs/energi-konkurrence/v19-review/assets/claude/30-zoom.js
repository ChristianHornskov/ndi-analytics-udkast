/* Zoom ud fra raketten til Månen. Bruges af [data-zoom]. */
(function(){
  var V=[[400,182,4.2],[400,250,2.4],[400,250,1.6],[400,250,1.15],[560,250,0.5]];
  function init(sec){
    var lv=0,g=sec.querySelector('.zm-verden'),ind=sec.querySelector('[data-zm="-1"]'),ud=sec.querySelector('[data-zm="1"]');
    function vis(n){
      lv=Math.max(0,Math.min(V.length-1,n));var v=V[lv],tx=400-v[0]*v[2],ty=250-v[1]*v[2];
      g.style.transform='translate('+tx+'px,'+ty+'px) scale('+v[2]+')';
      for(var i=0;i<V.length;i++)sec.classList.toggle('zm--'+i,i<=lv);
      sec.querySelectorAll('.zm-panel').forEach(function(p){p.hidden=+p.getAttribute('data-lv')!==lv;});
      sec.querySelectorAll('.zm-prikker button').forEach(function(b){var i=+b.getAttribute('data-lv');b.classList.toggle('er-aktiv',i===lv);b.classList.toggle('er-set',i<=lv);b.setAttribute('aria-current',i===lv?'step':'false');});
      ind.disabled=lv===0;ud.disabled=lv===V.length-1;
    }
    sec.addEventListener('click',function(e){
      var k=e.target.closest('[data-zm]');if(k){vis(lv+ +k.getAttribute('data-zm'));return;}
      var p=e.target.closest('.zm-prikker button');if(p)vis(+p.getAttribute('data-lv'));
    });
    vis(0);
  }
  function go(){document.querySelectorAll('[data-zoom]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
