/* Fintech: telefonen skifter skærm, når man scroller gennem de fem trin. */
(function(){
  var R=document.getElementById('telefonen');if(!R)return;
  var trin=R.querySelectorAll('.fx-trin'),sk=R.querySelectorAll('.fx-skaerm'),pr=R.querySelectorAll('.fx-prikker i'),tlf=R.querySelector('.fx-tlf'),scene=R.querySelector('.fx-scene');
  var aktiv=-1;
  function taeller(el){var til=+el.dataset.til,t0=null;function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/900);el.textContent=Math.round(til*(1-Math.pow(1-p,3))).toLocaleString('da-DK');if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
  function vis(i){if(i===aktiv)return;var gl=aktiv;aktiv=i;
    sk.forEach(function(s,k){s.classList.remove('fx-on','fx-for');if(k===i){void s.offsetWidth;s.classList.add('fx-on')}else if(k<i)s.classList.add('fx-for')});
    trin.forEach(function(t,k){t.classList.toggle('fx-on',k===i)});pr.forEach(function(p,k){p.classList.toggle('fx-on',k===i)});
    var c=getComputedStyle(sk[i]).getPropertyValue('--c');tlf.style.setProperty('--c',c);scene.style.setProperty('--c',c);
    var n=sk[i].querySelector('[data-til]');if(n)taeller(n)}
  if(!('IntersectionObserver' in window)){vis(0);return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)vis(+e.target.dataset.fx)})},{rootMargin:(innerWidth<860?'-62% 0px -30% 0px':'-45% 0px -45% 0px')});
  trin.forEach(function(t){io.observe(t)});vis(0);
})();
