/* Mål en qubit: hver måling giver 0 eller 1 efter den valgte blanding, og prikkerne stables op. Bruges af [data-maal]. */
(function(){
  function init(sec){
    var p=0.5,n0=0,n1=0,MAX=60,ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,koer=false;
    var s0=sec.querySelector('.mq-s0'),s1=sec.querySelector('.mq-s1'),res=sec.querySelector('[data-mq-res]'),NS='http://www.w3.org/2000/svg';
    function prik(v){
      var n=v?n1:n0;if(n>MAX)return;var kol=n%6,rk=Math.floor((n-1)/6);
      var c=document.createElementNS(NS,'circle'),x=(v?190:60)+((n-1)%6)*14,y=180-rk*14;
      c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',5.5);c.setAttribute('class','mq-p mq-p'+v+(ro?'':' mq-ny'));
      (v?s1:s0).appendChild(c);
    }
    function skriv(){
      var t=n0+n1;if(!t){res.textContent='Ingen målinger endnu.';return;}
      res.textContent=t===1?('Du målte '+(n1?'1':'0')+'. En enkelt måling viser ikke blandingen.'):('Du har målt '+t+' gange: 0 kom '+n0+' gange og 1 kom '+n1+' gange.');
    }
    function maal(){var v=Math.random()<p?1:0;if(v)n1++;else n0++;prik(v);skriv();}
    function nul(){n0=n1=0;s0.innerHTML='';s1.innerHTML='';skriv();}
    sec.querySelectorAll('.mq-maal').forEach(function(b){b.addEventListener('click',function(){
      var n=+(b.getAttribute('data-n')||1);if(koer)return;
      if(n===1||ro){for(var i=0;i<n;i++)maal();return;}
      koer=true;var i=0;(function t(){maal();if(++i<n)setTimeout(t,40);else koer=false;})();
    });});
    sec.querySelector('.mq-nul').addEventListener('click',nul);
    sec.querySelectorAll('.mq-bl').forEach(function(b){b.addEventListener('click',function(){
      p=+b.getAttribute('data-p');sec.querySelectorAll('.mq-bl').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});nul();
    });});
    sec.querySelectorAll('.mq-bit').forEach(function(b){b.addEventListener('click',function(){
      sec.querySelectorAll('.mq-bit').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      sec.querySelector('[data-mq-bit]').textContent='Du får '+b.getAttribute('data-v')+' hver gang.';
    });});
  }
  function go(){document.querySelectorAll('[data-maal]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
