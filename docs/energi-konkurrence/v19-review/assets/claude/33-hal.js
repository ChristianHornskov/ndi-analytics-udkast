/* Byg dit eget datacenter: vælg rack-type og antal, og se strøm, elforbrug og leverandører. Bruges af [data-hal]. */
(function(){
  var MAKS=100,TIMER=8760,FAM=4500;
  function fmt(x,d){return x.toLocaleString('da-DK',{minimumFractionDigits:d,maximumFractionDigits:d});}
  function init(sec){
    var kw=120,n=1,gulv=sec.querySelector('[data-hl-gulv]'),celler=[];
    var ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    for(var i=0;i<MAKS;i++){var c=document.createElement('span');c.className='hl-c';gulv.appendChild(c);celler.push(c);}
    var tp=[].slice.call(sec.querySelectorAll('.hl-tp')),pm=[].slice.call(sec.querySelectorAll('.hl-pm'));
    var tjek=[].slice.call(sec.querySelectorAll('.hl-tjek')),ud={n:sec.querySelector('[data-hl-n]'),mw:sec.querySelector('[data-hl-mw]'),gwh:sec.querySelector('[data-hl-gwh]'),fam:sec.querySelector('[data-hl-fam]')};
    var famVist=0,anim=null;
    function taelOp(til){if(anim)cancelAnimationFrame(anim);if(ro){famVist=til;ud.fam.textContent=fmt(til,0);return;}
      var fra=famVist,t0=null;anim=requestAnimationFrame(function st(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/380),v=Math.round(fra+(til-fra)*(1-Math.pow(1-k,3)));famVist=v;ud.fam.textContent=fmt(v,0);if(k<1)anim=requestAnimationFrame(st);});}
    function tegn(){
      var kwh=n*kw*TIMER,mw=n*kw/1000,gwh=kwh/1e6;
      ud.n.textContent=n;if(ud.n.nextElementSibling)ud.n.nextElementSibling.textContent=n===1?'rack':'racks';
      ud.mw.textContent=fmt(mw,mw<1?2:(mw<10?1:0));
      ud.gwh.textContent=fmt(gwh,gwh<10?1:0);
      taelOp(Math.round(kwh/FAM));
      sec.classList.toggle('hl--ai',kw===120);
      celler.forEach(function(c,i){c.classList.toggle('er-pa',i<n);});
      tjek.forEach(function(li){var pa=n>=+li.getAttribute('data-fra');if(pa&&!li.classList.contains('er-pa')&&!ro){li.classList.add('er-ny');setTimeout(function(){li.classList.remove('er-ny');},900);}li.classList.toggle('er-pa',pa);});
      pm.forEach(function(b){var d=+b.getAttribute('data-d');b.disabled=(d<0&&n<=1)||(d>0&&n>=MAKS);});
    }
    tp.forEach(function(b){b.addEventListener('click',function(){kw=+b.getAttribute('data-kw');tp.forEach(function(x){x.setAttribute('aria-checked',x===b?'true':'false');});tegn();});});
    pm.forEach(function(b){b.addEventListener('click',function(){var d=+b.getAttribute('data-d');n=Math.max(1,Math.min(MAKS,n+d));tegn();});});
    tegn();
  }
  function go(){document.querySelectorAll('[data-hal]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
