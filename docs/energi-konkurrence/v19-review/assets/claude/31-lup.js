/* Lup over en elbil: luppen viser delene indeni og hvilket råstof de er lavet af. Bruges af [data-lup]. */
(function(){
  function init(sec){
    var svg=sec.querySelector('.lp-svg'),c=sec.querySelector('.lp-c'),ring=sec.querySelector('.lp-ring'),skaft=sec.querySelector('.lp-skaft');
    var prik=[].slice.call(sec.querySelectorAll('.lp-prik')),fundet={},aktiv=null,tael=sec.querySelector('[data-lp-tael]');
    var ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,R=78,anim=null;
    function flyt(x,y,stille){x=Math.max(60,Math.min(780,x));y=Math.max(90,Math.min(300,y));
      c.setAttribute('cx',x);c.setAttribute('cy',y);ring.setAttribute('cx',x);ring.setAttribute('cy',y);
      skaft.setAttribute('d','M'+(x+55)+' '+(y+55)+' L'+(x+100)+' '+(y+100));
      var bedst=null,bd=62;prik.forEach(function(p){var d=Math.hypot(+p.getAttribute('cx')-x,+p.getAttribute('cy')-y);if(d<bd){bd=d;bedst=p.getAttribute('data-del');}});
      if(bedst&&!stille)vis(bedst);}
    function vis(d){if(d===aktiv)return;aktiv=d;fundet[d]=true;
      sec.querySelectorAll('[data-del]').forEach(function(e){var m=e.getAttribute('data-del');e.classList.toggle('er-aktiv',m===d);if(fundet[m])e.classList.add('er-fundet');
        if(e.classList.contains('lp-panel'))e.hidden=m!==d;if(e.classList.contains('lp-knap'))e.setAttribute('aria-pressed',m===d?'true':'false');});
      sec.querySelector('.lp-panel--start').hidden=true;var n=Object.keys(fundet).length;tael.textContent=n;
      sec.querySelector('.lp-panel--slut').hidden=n<prik.length;}
    function pkt(e){var p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
    var traek=false;
    svg.addEventListener('pointerdown',function(e){traek=true;if(anim)cancelAnimationFrame(anim);var q=pkt(e);flyt(q.x,q.y);});
    svg.addEventListener('pointermove',function(e){if(!traek&&e.pointerType!=='mouse')return;var q=pkt(e);flyt(q.x,q.y);});
    window.addEventListener('pointerup',function(){traek=false;});
    svg.addEventListener('pointercancel',function(){traek=false;});
    sec.querySelectorAll('.lp-knap').forEach(function(b){b.addEventListener('click',function(){
      var p=sec.querySelector('.lp-prik[data-del="'+b.getAttribute('data-del')+'"]'),tx=+p.getAttribute('cx'),ty=+p.getAttribute('cy'),fx=+c.getAttribute('cx'),fy=+c.getAttribute('cy');
      if(ro){flyt(tx,ty);return;}var t0=null;if(anim)cancelAnimationFrame(anim);
      anim=requestAnimationFrame(function st(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/450),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;flyt(fx+(tx-fx)*e,fy+(ty-fy)*e,k<1);if(k<1)anim=requestAnimationFrame(st);});
    });});
  }
  function go(){document.querySelectorAll('[data-lup]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
