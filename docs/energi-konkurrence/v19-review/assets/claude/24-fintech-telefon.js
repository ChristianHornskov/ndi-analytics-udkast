/* Fintech: telefonen skifter skærm, når man scroller gennem de fem trin.
   Aktivt trin findes ud fra overskriftens placering i vinduet, så skærm og tekst altid følges ad.
   Er vinduet unormalt højt (fx en ramme, der vokser med indholdet), virker scroll ikke som styring.
   Så skifter siden til en statisk udgave, hvor man trykker på trinene, og telefonen kører af sig selv. */
(function(){
  var R=document.getElementById('telefonen');if(!R)return;
  var trin=[].slice.call(R.querySelectorAll('.fx-trin')),sk=R.querySelectorAll('.fx-skaerm'),pr=R.querySelectorAll('.fx-prikker i'),tlf=R.querySelector('.fx-tlf'),scene=R.querySelector('.fx-scene');
  var aktiv=-1,statisk=false,timer=null,raf=0;
  var stille=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function taeller(el){var til=+el.dataset.til;if(stille){el.textContent=til.toLocaleString('da-DK');return}var t0=null;function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/900);el.textContent=Math.round(til*(1-Math.pow(1-p,3))).toLocaleString('da-DK');if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
  function vis(i){if(i===aktiv||i<0)return;aktiv=i;
    sk.forEach(function(s,k){s.classList.remove('fx-on','fx-for');if(k===i){void s.offsetWidth;s.classList.add('fx-on')}else if(k<i)s.classList.add('fx-for')});
    trin.forEach(function(t,k){t.classList.toggle('fx-on',k===i);t.setAttribute('aria-current',k===i?'step':'false')});
    pr.forEach(function(p,k){p.classList.toggle('fx-on',k===i)});
    var c=getComputedStyle(sk[i]).getPropertyValue('--c');tlf.style.setProperty('--c',c);scene.style.setProperty('--c',c);
    var n=sk[i].querySelector('[data-til]');if(n)taeller(n)}
  function maal(){
    var h=window.innerHeight,graense=h*(window.innerWidth<860?0.78:0.58),valgt=0;
    trin.forEach(function(t,k){if(t.querySelector('h3').getBoundingClientRect().top<graense)valgt=k});
    vis(valgt)}
  function paaScroll(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;maal()})}
  function stopAuto(){if(timer){clearInterval(timer);timer=null}}
  function saetTilstand(){
    var nyStatisk=window.innerHeight>1600;
    if(nyStatisk!==statisk){statisk=nyStatisk;R.classList.toggle('fx-statisk',statisk);var ip=R.querySelector('.fx-intro');if(ip)ip.textContent=statisk?'Tryk på en af de fem slags tjenester, som temaets selskaber laver.':'Scroll ned gennem de fem slags tjenester, som temaets selskaber laver.'}
    if(statisk){if(!timer&&!stille)timer=setInterval(function(){vis((aktiv+1)%trin.length)},4500);if(aktiv<0)vis(0)}
    else{stopAuto();maal()}}
  trin.forEach(function(t,k){t.addEventListener('click',function(e){if(e.target.closest('a'))return;if(statisk){stopAuto();vis(k)}else t.scrollIntoView({behavior:stille?'auto':'smooth',block:'center'})})});
  window.addEventListener('scroll',function(){if(!statisk)paaScroll()},{passive:true});
  window.addEventListener('resize',saetTilstand);
  saetTilstand();if(aktiv<0)vis(0);
})();
