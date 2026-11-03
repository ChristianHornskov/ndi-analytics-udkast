 
try{
(function(){var s=document.getElementById('cq-ventetider');if(!s||!('IntersectionObserver' in window))return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
s.classList.add('cq-vt--armed');new IntersectionObserver(function(e,o){e.forEach(function(x){if(x.isIntersecting){s.classList.add('cq-vt--go');o.disconnect();}})},{threshold:.35}).observe(s);})();
}catch(e){}
try{
 
}catch(e){}