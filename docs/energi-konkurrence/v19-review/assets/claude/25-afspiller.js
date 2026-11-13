/* Afspiller til temasidernes tegninger (platforme: torvet).
   Tegningen bygges op trin for trin. Den starter af sig selv, når den kommer ind i billedet, og stopper efter sidste trin.
   Man kan trykke på et trin eller på knappen. Uden "reducer bevægelse" går den videre hvert femte sekund. */
(function(){
  var stille=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var VARIGHED=5200;
  function op(R){
    var caps=R.querySelectorAll('.ps-cap'),knap=R.querySelectorAll('.ps-trin'),net=R.querySelector('.pl-net'),scene=R.querySelector('.ps-scene'),afspil=R.querySelector('.ps-afspil');
    var n=caps.length,aktiv=-1,timer=null,koerer=false,set=false;
    function vis(i){aktiv=i;
      caps.forEach(function(c,k){c.classList.toggle('ps-on',k===i)});
      knap.forEach(function(b,k){b.classList.toggle('ps-on',k===i);b.classList.toggle('ps-faerdig',k<i);b.setAttribute('aria-pressed',k===i?'true':'false')});
      for(var k=0;k<n;k++){net.classList.toggle('t'+k,k<=i);net.classList.toggle('k'+k,k===i)}
      var c=getComputedStyle(caps[i]).getPropertyValue('--c');scene.style.setProperty('--c',c);R.style.setProperty('--c',c);
      R.style.setProperty('--varighed',(koerer?VARIGHED:0)+'ms')}
    function stop(){koerer=false;clearTimeout(timer);R.classList.remove('ps-koerer')}
    function naeste(){if(aktiv>=n-1){stop();return}vis(aktiv+1);timer=setTimeout(naeste,VARIGHED)}
    function start(fra){stop();if(stille){vis(n-1);return}koerer=true;R.classList.add('ps-koerer');vis(fra);timer=setTimeout(naeste,VARIGHED)}
    knap.forEach(function(b,k){b.addEventListener('click',function(){stop();vis(k)})});
    afspil.addEventListener('click',function(){if(koerer)stop();else start(aktiv>=n-1||aktiv<0?0:aktiv)});
    vis(0);
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!set){set=true;start(0)}else if(!e.isIntersecting&&koerer){stop()}})},{threshold:.45});io.observe(R.querySelector('.ps-ramme'))}
    else start(0);
  }
  function go(){[].forEach.call(document.querySelectorAll('.ps'),op)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
