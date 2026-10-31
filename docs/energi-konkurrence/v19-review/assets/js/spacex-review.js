(() => {
  const root=document.querySelector('.sx-system');
  if(root){
    function select(id){
      root.querySelectorAll('[data-sx-panel]').forEach(p=>p.hidden=p.dataset.sxPanel!==id);
      root.querySelectorAll('[data-sx-select]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sxSelect===id)));
      root.querySelectorAll('[data-orbit-part]').forEach(g=>g.classList.toggle('sx-dim',g.dataset.orbitPart!==id));
    }
    root.querySelectorAll('[data-sx-select],[data-orbit-part]').forEach(el=>{
      const id=el.dataset.sxSelect||el.dataset.orbitPart;
      el.addEventListener('click',()=>select(id));
      el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')select(id)});
      el.addEventListener('focus',()=>select(id));
      if(el.hasAttribute('data-orbit-part'))el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(id)}});
    });
    select('launch');
  }
  document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{
    const iframe=document.createElement('iframe');
    iframe.src='https://www.youtube-nocookie.com/embed/'+button.dataset.video+'?autoplay=1&rel=0&start='+(Number(button.dataset.start)||0);
    iframe.title=button.getAttribute('aria-label');
    iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen=true;
    iframe.className='sx-video-player';
    button.replaceWith(iframe);
    iframe.focus();
  }));
})();

(() => {
 const history=document.querySelector('.sx-history');
 if(!history)return;
 history.querySelectorAll('[data-sx-year]').forEach(button=>button.addEventListener('click',()=>{
  const era=button.dataset.sxYear;
  history.dataset.era=era;
  history.querySelectorAll('[data-sx-year]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  history.querySelectorAll('[data-sx-chapter]').forEach(p=>p.hidden=p.dataset.sxChapter!==era);
 }));
})();
document.querySelectorAll('.sx-point-expand').forEach(detail=>{
 const update=()=>{detail.querySelector('summary').textContent=detail.open?'Luk argumentet':'Læs argumentet'};
 detail.addEventListener('toggle',update);update();
});
