/* Scroll-fortællinger på temasiderne (fintech: telefonen, platforme: torvet).
   Aktivt trin findes ud fra overskriftens placering i vinduet. Scenen får klasserne t0..tN (alle trin til og med det aktive)
   og kN (kun det aktive), så tegningen kan bygges op trin for trin i CSS.
   Er vinduet unormalt højt (fx en ramme, der vokser med indholdet), skifter elementet til en statisk udgave med tryk og automatisk afspilning. */
(function(){
  var stille=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function op(R){
    var trin=[].slice.call(R.querySelectorAll('.fx-trin')),sk=R.querySelectorAll('.fx-skaerm'),pr=R.querySelectorAll('.fx-prikker i'),tlf=R.querySelector('.fx-tlf'),scene=R.querySelector('.fx-scene'),net=R.querySelector('.pl-net');
    var aktiv=-1,statisk=false,timer=null,raf=0,intro=R.querySelector('.fx-intro'),introTekst=intro?intro.textContent:'';
    function taeller(el){var til=+el.dataset.til;if(stille){el.textContent=til.toLocaleString('da-DK');return}var t0=null;function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/900);el.textContent=Math.round(til*(1-Math.pow(1-p,3))).toLocaleString('da-DK');if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
    function vis(i){if(i===aktiv||i<0)return;aktiv=i;
      sk.forEach(function(s,k){s.classList.remove('fx-on','fx-for');if(k===i){void s.offsetWidth;s.classList.add('fx-on')}else if(k<i)s.classList.add('fx-for')});
      trin.forEach(function(t,k){t.classList.toggle('fx-on',k===i);t.setAttribute('aria-current',k===i?'step':'false')});
      pr.forEach(function(p,k){p.classList.toggle('fx-on',k===i)});
      if(net){for(var k=0;k<trin.length;k++){net.classList.toggle('t'+k,k<=i);net.classList.toggle('k'+k,k===i)}}
      var kilde=sk[i]||trin[i],c=getComputedStyle(kilde).getPropertyValue('--c');if(tlf)tlf.style.setProperty('--c',c);if(scene)scene.style.setProperty('--c',c);
      var n=sk[i]&&sk[i].querySelector('[data-til]');if(n)taeller(n)}
    function maal(){var h=window.innerHeight,g=h*(window.innerWidth<860?0.78:0.58),v=0;trin.forEach(function(t,k){if(t.querySelector('h3').getBoundingClientRect().top<g)v=k});vis(v)}
    function paaScroll(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;maal()})}
    function stopAuto(){if(timer){clearInterval(timer);timer=null}}
    function tilstand(){var ny=window.innerHeight>1600;
      if(ny!==statisk){statisk=ny;R.classList.toggle('fx-statisk',statisk);if(intro)intro.textContent=statisk?introTekst.replace(/^Scroll ned( gennem| og se,)?/,'Tryk på et trin og se,').replace('Tryk på et trin og se, de fem','Tryk på en af de fem'):introTekst}
      if(statisk){if(!timer&&!stille)timer=setInterval(function(){vis((aktiv+1)%trin.length)},4500);if(aktiv<0)vis(0)}else{stopAuto();maal()}}
    trin.forEach(function(t,k){t.addEventListener('click',function(e){if(e.target.closest('a'))return;if(statisk){stopAuto();vis(k)}else t.scrollIntoView({behavior:stille?'auto':'smooth',block:'center'})})});
    window.addEventListener('scroll',function(){if(!statisk)paaScroll()},{passive:true});
    window.addEventListener('resize',tilstand);tilstand();if(aktiv<0)vis(0);
  }
  function start(){[].forEach.call(document.querySelectorAll('[data-fx-scrolly]'),op)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
