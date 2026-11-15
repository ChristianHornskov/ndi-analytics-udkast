/* Mål en qubit: hver måling giver 0 eller 1 efter den valgte blanding, og prikkerne stables op. Bruges af [data-maal]. */
(function(){
  function init(sec){
    var p=0.5,n0=0,n1=0,MAX=60,ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,koer=false;
    var s0=sec.querySelector('.mq-s0'),s1=sec.querySelector('.mq-s1'),res=sec.querySelector('[data-mq-res]'),NS='http://www.w3.org/2000/svg';
    var skala=1,gen=0;
    function tegnPrik(v,n,ny){
      var rk=Math.floor((n-1)/6),c=document.createElementNS(NS,'circle'),x=(v?190:60)+((n-1)%6)*14,y=180-rk*14;
      c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',5.5);c.setAttribute('class','mq-p mq-p'+v+(ro||!ny?'':' mq-ny'));
      (v?s1:s0).appendChild(c);
    }
    function prik(v){
      var ny=Math.max(1,Math.ceil(Math.max(n0,n1)/MAX));
      if(ny!==skala){skala=ny;s0.innerHTML='';s1.innerHTML='';for(var i=1;i<=Math.floor(n0/skala);i++)tegnPrik(0,i,false);for(var j=1;j<=Math.floor(n1/skala);j++)tegnPrik(1,j,false);return;}
      var n=v?n1:n0;if(n%skala===0)tegnPrik(v,n/skala,true);
    }
    function skriv(){
      var t=n0+n1;if(!t){res.textContent='Ingen målinger endnu.';return;}
      res.textContent=t===1?('Du målte '+(n1?'1':'0')+'. En enkelt måling viser ikke blandingen.'):('Du har målt '+t+' gange: 0 kom '+n0+' gange og 1 kom '+n1+' gange.'+(skala>1?' Hver prik er nu '+skala+' målinger.':''));
    }
    function maal(){var v=Math.random()<p?1:0;if(v)n1++;else n0++;prik(v);skriv();}
    function nul(){gen++;koer=false;skala=1;n0=n1=0;s0.innerHTML='';s1.innerHTML='';skriv();}
    sec.querySelectorAll('.mq-maal').forEach(function(b){b.addEventListener('click',function(){
      var n=+(b.getAttribute('data-n')||1);if(koer)return;
      if(n===1||ro){for(var i=0;i<n;i++)maal();return;}
      koer=true;var i=0,g=gen;(function t(){if(g!==gen)return;maal();if(++i<n)setTimeout(t,40);else koer=false;})();
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
