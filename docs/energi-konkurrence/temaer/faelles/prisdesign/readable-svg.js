// SVG labels retain a readable physical size as their diagrams resize.
(()=>{
 const diagrams=[...document.querySelectorAll('svg')].filter(s=>s.querySelector('text'));
 const resize=svg=>{
  const width=svg.getBoundingClientRect().width,view=svg.viewBox.baseVal.width;
  if(!width||!view)return;
  svg.querySelectorAll('text').forEach(text=>{
   if(!text.dataset.originalSize)text.dataset.originalSize=parseFloat(getComputedStyle(text).fontSize)||12;
   text.style.fontSize=Math.max(Number(text.dataset.originalSize),12*view/width)+'px';
   text.style.fill='var(--tekst)';
  });
 };
 const observer=new ResizeObserver(entries=>entries.forEach(e=>resize(e.target)));
 diagrams.forEach(svg=>{observer.observe(svg);resize(svg);});
})();
