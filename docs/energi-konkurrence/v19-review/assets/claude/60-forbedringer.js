/* Nye forklaringer på temasiderne, november 2026. Hver boks har data-cf og virker uden fondsdata. */
(function(){
  const kr=v=>Math.round(v).toLocaleString('da-DK');
  function pris(el){
    const s=el.querySelector('input'),o=el.querySelector('output'),r=[...el.querySelectorAll('[data-omk]')];
    const tegn=()=>{const p=+s.value;o.textContent=p+' kr.';
      r.forEach(x=>{const m=p-(+x.dataset.omk),i=x.querySelector('i'),v=x.querySelector('.cf-v'),w=Math.min(50,Math.abs(m)/2);
        i.style.width=w+'%';i.style.left=m>=0?'50%':(50-w)+'%';i.classList.toggle('neg',m<0);v.classList.toggle('neg',m<0);
        v.textContent=(m>=0?'+':'−')+kr(Math.abs(m))+' kr.'})};
    s.addEventListener('input',tegn);tegn()}
  const typer={pris};
  const start=()=>document.querySelectorAll('[data-cf]').forEach(el=>{const f=typer[el.dataset.cf];if(f&&!el.dataset.cfKlar){el.dataset.cfKlar=1;f(el)}});
  window.CF_TYPER=typer;window.CF_START=start;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
