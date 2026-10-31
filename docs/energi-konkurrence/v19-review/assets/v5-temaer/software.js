 
try{(function(){var R=document.getElementById('cq-sw');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-sw--js');
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function show(btn){var sc=btn.closest('.cq-sw__scope')||R,inf=sc.querySelector('.cq-sw__info');if(!inf)return;inf.textContent='';
inf.appendChild(btn.querySelector('.cq-sw__lg').cloneNode(true));var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
el('p','cq-sw__ig',btn.dataset.g);var h=el('p','cq-sw__ih',btn.querySelector('.cq-sw__nm').textContent);var s=document.createElement('span');s.textContent=btn.querySelector('.cq-sw__cw').textContent+' af fonden';h.appendChild(s);
el('p','cq-sw__id',btn.dataset.d);if(btn.dataset.a)el('p','cq-sw__ia',btn.querySelector('.cq-sw__nm').textContent+' laver også noget, der hører til temaet '+btn.dataset.a+'. I fondens opdeling tælles selskabet kun med her.');inf.appendChild(w)}
R.querySelectorAll('.cq-sw__co').forEach(function(b){b.addEventListener('click',function(){var sc=b.closest('.cq-sw__scope')||R;sc.querySelectorAll('.cq-sw__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
b.addEventListener('focus',function(){show(b)});if(fine)b.addEventListener('mouseenter',function(){show(b)})});
function setAll(a,o){var l=document.getElementById(a.getAttribute('aria-controls'));l.classList.toggle('cq-sw--open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')'}
R.querySelectorAll('.cq-sw__all').forEach(function(a){a.addEventListener('click',function(){var o=a.getAttribute('aria-expanded')!=='true';setAll(a,o);if(o){var l=document.getElementById(a.getAttribute('aria-controls')),f=l.children[5];if(f)f.querySelector('button').focus()}})});
function setDx(b,o){var t=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',o);t.hidden=!o;
 if(o&&b.dataset.grp)R.querySelectorAll('.cq-sw__dx[data-grp="'+b.dataset.grp+'"]').forEach(function(x){if(x!==b&&x.getAttribute('aria-expanded')==='true')setDx(x,false)});
 R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:o}}))}
R.cqSetDx=setDx;
R.querySelectorAll('.cq-sw__dx').forEach(function(b){setDx(b,b.dataset.open==='1');b.addEventListener('click',function(){setDx(b,b.getAttribute('aria-expanded')!=='true')})});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var n=document.activeElement;
 if(n&&n.getAttribute&&n.getAttribute('aria-expanded')==='true'){e.preventDefault();if(n.classList.contains('cq-sw__all'))setAll(n,false);else setDx(n,false);return}
 while(n&&n!==R){if(n.id){var b=R.querySelector('[aria-controls="'+n.id+'"][aria-expanded="true"]');if(b){e.preventDefault();if(b.classList.contains('cq-sw__all'))setAll(b,false);else setDx(b,false);b.focus();return}}n=n.parentNode}});
})();
(function(){var R=document.getElementById('cq-sw');var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!rm&&'IntersectionObserver' in window){R.classList.add('cq-sw--arm');var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){setTimeout(function(){R.classList.remove('cq-sw--arm')},150);io.disconnect()}},{threshold:.35});io.observe(R.querySelector('.cq-sw__cards'))}})();}catch(e){}
try{(function(){
document.documentElement.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pr=document.querySelector('.prog');
function prog(){if(!pr)return;var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
 
function fold(lid,bid,lab){var l=document.getElementById(lid),b=document.getElementById(bid);if(!l||!b)return;b.hidden=false;b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(o));l.classList.toggle('alle',o);b.textContent=o?'Vis færre':lab;if(o){var f=l.querySelector('.ekstra');if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
fold('fod-liste','fod-alle','Vis alle (11)');fold('x-liste','x-alle','Vis 3 opslag mere');
 
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
[].forEach.call(document.querySelectorAll('.xp[data-url]'),function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
 
var R=document.getElementById('cq-sw');
[].forEach.call(document.querySelectorAll('.xp-trin a[data-k]'),function(a){a.addEventListener('click',function(e){var b=R&&R.querySelector('.cq-sw__dx[aria-controls="cq-sw-p-'+a.dataset.k+'"]');if(!b||!R.cqSetDx)return;e.preventDefault();R.cqSetDx(b,true);(b.closest('li')||b).scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});b.focus({preventScroll:true})})});
 
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();
}catch(e){}