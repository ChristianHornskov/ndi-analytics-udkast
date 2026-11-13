/* Skriv en side i bogen: læg handler i en blok, lås den og prøv at snyde. Bruges af [data-blok]. */
(function(){
  function hex(n){var s='',c='0123456789abcdef';for(var i=0;i<n;i++)s+=c[Math.floor(Math.random()*16)];return s;}
  function init(sec){
    var ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    var vent=[].slice.call(sec.querySelectorAll('.bb-h')),ny=sec.querySelector('.bb-blok--ny'),ind=ny.querySelector('.bb-indhold');
    var oprindelig=sec.querySelector('.bb-kaede').innerHTML;
    function trin(n){
      sec.querySelectorAll('.bb-trinliste li').forEach(function(li){var t=+li.getAttribute('data-trin');li.classList.toggle('er-aktiv',t===n);li.classList.toggle('er-faerdig',t<n);});
      sec.querySelectorAll('.bb-panel').forEach(function(p){p.hidden=+p.getAttribute('data-trin')!==n;});
    }
    function rolle(id,on){var r=sec.querySelector('.bb-rolle[data-rolle="'+id+'"]');if(r)r.classList.toggle('er-taendt',on!==false);}
    function laeg(){
      var h=vent.shift();if(!h)return;
      var li=document.createElement('li');li.textContent=h.textContent;if(!ro)li.className='bb-ind-ny';ind.appendChild(li);
      h.classList.add('er-flyttet');rolle('boers');
      if(!vent.length){sec.querySelector('[data-gor="laeg"]').hidden=true;setTimeout(function(){trin(2);},ro?0:500);}
    }
    function laas(){
      var b=sec.querySelector('[data-gor="laas"]'),f=sec.querySelector('.bb-forsoeg'),tal=sec.querySelector('[data-forsoeg]'),aft=ny.querySelector('[data-aftryk]');
      b.disabled=true;f.hidden=false;ny.classList.add('er-regner');rolle('mining');
      var n=0,slut=48213+Math.floor(Math.random()*9000),t0=null,D=ro?0:1600;
      function step(t){if(!t0)t0=t;var k=D?Math.min(1,(t-t0)/D):1;n=Math.floor(slut*k);tal.textContent=n.toLocaleString('da-DK');aft.textContent=k<1?(hex(2)+hex(4)+'…'):('00'+hex(4)+'…');
        if(k<1)requestAnimationFrame(step);else{ny.classList.remove('er-regner');ny.classList.add('bb-blok--laast','er-ny-laast');
          var l=document.createElement('span');l.className='bb-led';l.setAttribute('aria-hidden','true');ny.appendChild(l);
          rolle('beholdning');rolle('stablecoin');setTimeout(function(){trin(3);},ro?0:600);}}
      requestAnimationFrame(step);
    }
    function snyd(){
      var b2=sec.querySelector('.bb-blok[data-nr="2"]');b2.querySelector('.bb-poster').textContent='5 handler, én er rettet';
      b2.querySelector('[data-aftryk]').textContent='9c41d0…';
      sec.querySelectorAll('.bb-blok').forEach(function(b){if(+b.getAttribute('data-nr')>=2)b.classList.add('er-brudt');});
      sec.querySelector('[data-gor="snyd"]').hidden=true;sec.querySelector('.bb-svar').hidden=false;sec.querySelector('[data-gor="forfra"]').hidden=false;
    }
    function forfra(){
      sec.querySelector('.bb-kaede').innerHTML=oprindelig;ny=sec.querySelector('.bb-blok--ny');ind=ny.querySelector('.bb-indhold');
      vent=[].slice.call(sec.querySelectorAll('.bb-h'));vent.forEach(function(h){h.classList.remove('er-flyttet');});
      sec.querySelectorAll('.bb-rolle').forEach(function(r){r.classList.remove('er-taendt');});
      sec.querySelector('[data-gor="laeg"]').hidden=false;var b=sec.querySelector('[data-gor="laas"]');b.disabled=false;sec.querySelector('.bb-forsoeg').hidden=true;
      sec.querySelector('[data-gor="snyd"]').hidden=false;sec.querySelector('.bb-svar').hidden=true;sec.querySelector('[data-gor="forfra"]').hidden=true;trin(1);
    }
    sec.addEventListener('click',function(e){var b=e.target.closest('[data-gor]');if(!b)return;
      ({laeg:laeg,laas:laas,snyd:snyd,forfra:forfra})[b.getAttribute('data-gor')]();});
  }
  function go(){document.querySelectorAll('[data-blok]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
