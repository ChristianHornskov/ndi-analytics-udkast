/* Skift sans: kamera, lidar og hjerne, dag og nat. Bruges af [data-sanser]. */
(function(){
  function init(sec){
    var nat=sec.querySelector('.sa-natcheck'),note=sec.querySelector('.sa-natnote'),sans='kamera';
    function tegn(){
      sec.setAttribute('data-sans-aktiv',sans);sec.classList.toggle('sa--nat',nat.checked);
      sec.querySelectorAll('.sa-fane').forEach(function(f){f.setAttribute('aria-selected',f.getAttribute('data-sans')===sans?'true':'false');});
      sec.querySelectorAll('.sa-panel').forEach(function(p){p.hidden=p.getAttribute('data-sans')!==sans;});
      note.hidden=!(nat.checked&&sans!=='hjerne');
    }
    sec.addEventListener('click',function(e){var f=e.target.closest('.sa-fane');if(f){sans=f.getAttribute('data-sans');tegn();}});
    sec.querySelector('.sa-faner').addEventListener('keydown',function(e){if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;var F=[].slice.call(sec.querySelectorAll('.sa-fane')),i=F.findIndex(function(f){return f.getAttribute('data-sans')===sans;});i=(i+(e.key==='ArrowRight'?1:F.length-1))%F.length;sans=F[i].getAttribute('data-sans');tegn();F[i].focus();});
    nat.addEventListener('change',tegn);tegn();
  }
  function go(){document.querySelectorAll('[data-sanser]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
