/* Genereret af _kilde/v5_fortaelling.py: v5-temasidens egne scripts, ordret. */
try{(function(){var R=document.getElementById('cq-kv');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-kv--js');
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function show(btn){var sc=btn.closest('.cq-kv__scope')||R,inf=sc.querySelector('.cq-kv__info');if(!inf)return;inf.textContent='';
inf.appendChild(btn.querySelector('.cq-kv__lg').cloneNode(true));var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
el('p','cq-kv__ig',btn.dataset.g);var h=el('p','cq-kv__ih','');[].forEach.call(btn.querySelector('.cq-kv__nm').childNodes,function(n){h.appendChild(n.cloneNode(true))});var s=document.createElement('span');s.textContent=btn.querySelector('.cq-kv__cw').textContent+' af afdelingen PMINDI pr. 16.10.2026';h.appendChild(s);
el('p','cq-kv__id',btn.dataset.d);if(btn.dataset.a)el('p','cq-kv__ia',btn.querySelector('.cq-kv__nm').textContent+' laver også noget, der hører til temaet '+btn.dataset.a+'. I fondens opdeling tælles selskabet kun med her.');inf.appendChild(w)}
R.querySelectorAll('.cq-kv__co').forEach(function(b){b.addEventListener('click',function(){var sc=b.closest('.cq-kv__scope')||R;sc.querySelectorAll('.cq-kv__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
b.addEventListener('focus',function(){show(b)});if(fine)b.addEventListener('mouseenter',function(){show(b)})});
function setAll(a,o){var l=document.getElementById(a.getAttribute('aria-controls'));l.classList.toggle('cq-kv--open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')'}
R.querySelectorAll('.cq-kv__all').forEach(function(a){a.addEventListener('click',function(){var o=a.getAttribute('aria-expanded')!=='true';setAll(a,o);if(o){var l=document.getElementById(a.getAttribute('aria-controls')),f=l.children[5];if(f)f.querySelector('button').focus()}})});
function setDx(b,o){var t=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',o);t.hidden=!o;
 if(o&&b.dataset.grp)R.querySelectorAll('.cq-kv__dx[data-grp="'+b.dataset.grp+'"]').forEach(function(x){if(x!==b&&x.getAttribute('aria-expanded')==='true')setDx(x,false)});
 R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:o}}))}
R.cqSetDx=setDx;
R.querySelectorAll('.cq-kv__dx').forEach(function(b){setDx(b,b.dataset.open==='1');b.addEventListener('click',function(){setDx(b,b.getAttribute('aria-expanded')!=='true')})});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var n=document.activeElement;
 if(n&&n.getAttribute&&n.getAttribute('aria-expanded')==='true'){e.preventDefault();if(n.classList.contains('cq-kv__all'))setAll(n,false);else setDx(n,false);return}
 while(n&&n!==R){if(n.id){var b=R.querySelector('[aria-controls="'+n.id+'"][aria-expanded="true"]');if(b){e.preventDefault();if(b.classList.contains('cq-kv__all'))setAll(b,false);else setDx(b,false);b.focus();return}}n=n.parentNode}});
})();
(function(){var R=document.getElementById('cq-kv');var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
R.querySelectorAll('.cq-kv__close,.cq-kv__qc').forEach(function(c){c.addEventListener('click',function(){var b=R.querySelector('[aria-controls="'+c.dataset.for+'"]');R.cqSetDx(b,false);b.focus()})});
R.querySelectorAll('svg [data-tr]').forEach(function(el){el.addEventListener('click',function(){R.querySelector('.cq-kv__trb[data-tr="'+el.dataset.tr+'"]').click()})});
function sync(){var o=R.querySelector('.cq-kv__trb[aria-expanded="true"]');var id=o?o.dataset.tr:'';if(id)R.setAttribute('data-sel',id);else R.removeAttribute('data-sel');
R.querySelectorAll('svg [data-tr]').forEach(function(el){el.classList.toggle('cq-kv--on',el.dataset.tr===id)})}
R.addEventListener('cq:dx',function(e){sync();if(!e.detail.open||!e.detail.btn.classList.contains('cq-kv__trb'))return;var p=document.getElementById(e.detail.btn.getAttribute('aria-controls'));var r=p.getBoundingClientRect();if(r.top>window.innerHeight-80)p.scrollIntoView({block:'nearest',behavior:rm?'auto':'smooth'})});
if(!rm&&'IntersectionObserver' in window){R.classList.add('cq-kv--arm');var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){setTimeout(function(){R.classList.remove('cq-kv--arm')},150);io.disconnect()}},{threshold:.35});io.observe(R.querySelector('.cq-kv__svg'))}})();}catch(e){}
try{(function(){
document.documentElement.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pr=document.querySelector('.prog');
function prog(){if(!pr)return;var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
/* fold-liste: X-opslag */
function fold(lid,bid,lab){var l=document.getElementById(lid),b=document.getElementById(bid);if(!l||!b)return;b.hidden=false;b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(o));l.classList.toggle('alle',o);b.textContent=o?'Vis færre':lab;if(o){var f=l.querySelector('.ekstra');if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
fold('x-liste','x-alle','Vis 2 opslag mere');
/* X-facade: intet hentes fra X før klik; widgets.js indlæses én gang */
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
[].forEach.call(document.querySelectorAll('.xp[data-url]'),function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
/* "Hører til": åbn sporet i sporskiftet */
var R=document.getElementById('cq-kv');
[].forEach.call(document.querySelectorAll('.xp-trin a[data-k]'),function(a){a.addEventListener('click',function(e){var b=R&&R.querySelector('.cq-kv__trb[aria-controls="cq-kv-p-'+a.dataset.k+'"]');if(!b||!R.cqSetDx)return;e.preventDefault();R.cqSetDx(b,true);var p=document.getElementById(b.getAttribute('aria-controls'));p.tabIndex=-1;p.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});p.focus({preventScroll:true})})});
/* video-facade: YouTube (nocookie) hentes først ved klik */
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();
}catch(e){}