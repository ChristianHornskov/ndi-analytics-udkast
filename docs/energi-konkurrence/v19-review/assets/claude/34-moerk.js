/* Før og efter strømsvigtet: træk skillelinjen hen over byen. Bruges af [data-moerk]. */
(function(){
  function init(sec){
    var svg=sec.querySelector('.mk-svg'),cv=sec.querySelector('.mk-cv'),ch=sec.querySelector('.mk-ch'),sk=sec.querySelector('.mk-skille'),rng=sec.querySelector('[data-mk-range]');
    var ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,rort=false,traek=false;
    function saet(p){p=Math.max(0,Math.min(100,p));var x=p*8;
      cv.setAttribute('width',x);ch.setAttribute('x',x);ch.setAttribute('width',800-x);
      sk.setAttribute('transform','translate('+(x-400)+' 0)');
      if(+rng.value!==Math.round(p))rng.value=Math.round(p);
      sec.classList.toggle('mk--efter',p<50);}
    function pkt(e){var q=svg.createSVGPoint();q.x=e.clientX;q.y=e.clientY;return q.matrixTransform(svg.getScreenCTM().inverse()).x/8;}
    svg.addEventListener('pointerdown',function(e){traek=true;rort=true;svg.setPointerCapture&&svg.setPointerCapture(e.pointerId);saet(pkt(e));});
    svg.addEventListener('pointermove',function(e){if(traek)saet(pkt(e));});
    svg.addEventListener('pointerup',function(){traek=false;});svg.addEventListener('pointercancel',function(){traek=false;});
    rng.addEventListener('input',function(){rort=true;saet(+rng.value);});
    saet(50);
    if(!ro&&'IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting||rort)return;io.disconnect();
        var t0=null;requestAnimationFrame(function st(t){if(rort)return;if(!t0)t0=t;var k=(t-t0)/1600;if(k>=1){saet(50);return;}
          saet(50-18*Math.sin(k*Math.PI*2));requestAnimationFrame(st);});});},{threshold:.6});
      io.observe(svg);
    }
  }
  function go(){document.querySelectorAll('[data-moerk]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
