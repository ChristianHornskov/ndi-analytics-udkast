/* Genereret af _kilde/v5_fortaelling.py: v5-temasidens egne scripts, ordret. */
try{document.documentElement.classList.add('js')}catch(e){}
try{(function(){var R=document.getElementById('cq-ft');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-ft--js');
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function show(btn){var sc=btn.closest('.cq-ft__scope')||R,inf=sc.querySelector('.cq-ft__info');if(!inf)return;inf.textContent='';
inf.appendChild(btn.querySelector('.cq-ft__lg').cloneNode(true));var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
el('p','cq-ft__ig',btn.dataset.g);var h=el('p','cq-ft__ih',btn.querySelector('.cq-ft__nm').textContent);var s=document.createElement('span');s.textContent=btn.querySelector('.cq-ft__cw').textContent+' af fonden';h.appendChild(s);
el('p','cq-ft__id',btn.dataset.d);if(btn.dataset.a){var ia=el('p','cq-ft__ia','');var TL={'Software & AI':'../software/index.html','Krypto':'../krypto/index.html','Platformsøkonomi':'../platforme/index.html'};ia.appendChild(document.createTextNode(btn.querySelector('.cq-ft__nm').textContent.trim()+' laver også noget, der hører til temaet '));var tl=TL[btn.dataset.a];var ta=document.createElement(tl?'a':'span');if(tl)ta.href=tl;ta.textContent=btn.dataset.a;ia.appendChild(ta);ia.appendChild(document.createTextNode('. I fondens opdeling tælles selskabet kun med her.'))}inf.appendChild(w)}
R.querySelectorAll('.cq-ft__co').forEach(function(b){b.addEventListener('click',function(){var sc=b.closest('.cq-ft__scope')||R;sc.querySelectorAll('.cq-ft__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
b.addEventListener('focus',function(){show(b)});if(fine)b.addEventListener('mouseenter',function(){show(b)})});
function setAll(a,o){var l=document.getElementById(a.getAttribute('aria-controls'));l.classList.toggle('cq-ft--open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')'}
R.querySelectorAll('.cq-ft__all').forEach(function(a){a.addEventListener('click',function(){var o=a.getAttribute('aria-expanded')!=='true';setAll(a,o);if(o){var l=document.getElementById(a.getAttribute('aria-controls')),f=l.children[5];if(f)f.querySelector('button').focus()}})});
function setDx(b,o){var t=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',o);t.hidden=!o;
 if(o&&b.dataset.grp)R.querySelectorAll('.cq-ft__dx[data-grp="'+b.dataset.grp+'"]').forEach(function(x){if(x!==b&&x.getAttribute('aria-expanded')==='true')setDx(x,false)});
 R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:o}}))}
R.cqSetDx=setDx;
R.querySelectorAll('.cq-ft__dx').forEach(function(b){setDx(b,b.dataset.open==='1');b.addEventListener('click',function(){setDx(b,b.getAttribute('aria-expanded')!=='true')})});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var n=document.activeElement;
 if(n&&n.getAttribute&&n.getAttribute('aria-expanded')==='true'){e.preventDefault();if(n.classList.contains('cq-ft__all'))setAll(n,false);else setDx(n,false);return}
 while(n&&n!==R){if(n.id){var b=R.querySelector('[aria-controls="'+n.id+'"][aria-expanded="true"]');if(b){e.preventDefault();if(b.classList.contains('cq-ft__all'))setAll(b,false);else setDx(b,false);b.focus();return}}n=n.parentNode}});
})();
(function(){var R=document.getElementById('cq-ft');var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
R.querySelectorAll('.cq-ft__close').forEach(function(c){c.addEventListener('click',function(){var b=R.querySelector('[aria-controls="'+c.dataset.for+'"]');R.cqSetDx(b,false);b.focus()})});
R.addEventListener('cq:dx',function(e){if(!e.detail.open)return;var p=document.getElementById(e.detail.btn.getAttribute('aria-controls'));var r=p.getBoundingClientRect();if(r.top>window.innerHeight-80)p.scrollIntoView({block:'nearest',behavior:rm?'auto':'smooth'})});
if(!rm&&'IntersectionObserver' in window){R.classList.add('cq-ft--arm');var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){setTimeout(function(){R.classList.remove('cq-ft--arm')},120);io.disconnect()}},{threshold:.2});io.observe(R.querySelector('.cq-ft__paper'))}})();}catch(e){}
try{
(function(){
var pr=document.querySelector('.prog');
function prog(){var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
/* X-facade: intet hentes fra X før klik; widgets.js indlæses én gang */
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
[].forEach.call(document.querySelectorAll('.xp[data-url]'),function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
/* fold: X ("Vis N opslag mere") og "Også med en fod" ("Vis alle (17)") */
function fold(box,btn,luk,fokus){if(!box||!btn)return;var tx=btn.textContent;btn.hidden=false;btn.addEventListener('click',function(){var o=btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',String(o));box.classList.toggle('alle',o);btn.textContent=o?luk:tx;if(o){var f=box.querySelector(fokus);if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
fold(document.querySelector('.xs'),document.getElementById('x-mere'),'Vis færre','.ekstra .xp-fra b');
fold(document.getElementById('fod-boks'),document.getElementById('fod-mere'),'Vis færre','.ekstra b');
/* video-facade: YouTube (nocookie) hentes først ved klik */
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();

}catch(e){}