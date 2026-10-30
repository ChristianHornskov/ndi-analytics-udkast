 
try{
(function(){var s=document.getElementById('cq-ventetider');if(!s||!('IntersectionObserver' in window))return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
s.classList.add('cq-vt--armed');new IntersectionObserver(function(e,o){e.forEach(function(x){if(x.isIntersecting){s.classList.add('cq-vt--go');o.disconnect();}})},{threshold:.35}).observe(s);})();
}catch(e){}
try{
 
document.querySelectorAll('.vid-ramme[data-yt]').forEach(function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title='Video: How Electricity Gets To You (Manitoba Hydro)';f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus();});});
}catch(e){}