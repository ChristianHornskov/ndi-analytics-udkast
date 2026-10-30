 
try{(function(){var R=document.getElementById('cq-rum');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-rum--js');
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function show(btn){var sc=btn.closest('.cq-rum__scope')||R,inf=sc.querySelector('.cq-rum__info');if(!inf)return;inf.textContent='';
inf.appendChild(btn.querySelector('.cq-rum__lg').cloneNode(true));var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
el('p','cq-rum__ig',btn.dataset.g);var h=el('p','cq-rum__ih',btn.querySelector('.cq-rum__nm').textContent);var s=document.createElement('span');s.textContent=btn.querySelector('.cq-rum__cw').textContent+' af fonden';h.appendChild(s);
el('p','cq-rum__id',btn.dataset.d);if(btn.dataset.a)el('p','cq-rum__ia',btn.querySelector('.cq-rum__nm').textContent+' laver også noget, der hører til temaet '+btn.dataset.a+'. I fondens opdeling tælles selskabet kun med her.');inf.appendChild(w)}
R.querySelectorAll('.cq-rum__co').forEach(function(b){b.addEventListener('click',function(){var sc=b.closest('.cq-rum__scope')||R;sc.querySelectorAll('.cq-rum__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
b.addEventListener('focus',function(){show(b)});if(fine)b.addEventListener('mouseenter',function(){show(b)})});
function setAll(a,o){var l=document.getElementById(a.getAttribute('aria-controls'));l.classList.toggle('cq-rum--open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')'}
R.querySelectorAll('.cq-rum__all').forEach(function(a){a.addEventListener('click',function(){var o=a.getAttribute('aria-expanded')!=='true';setAll(a,o);if(o){var l=document.getElementById(a.getAttribute('aria-controls')),f=l.children[5];if(f)f.querySelector('button').focus()}})});
function setDx(b,o){var t=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',o);t.hidden=!o;
 if(o&&b.dataset.grp)R.querySelectorAll('.cq-rum__dx[data-grp="'+b.dataset.grp+'"]').forEach(function(x){if(x!==b&&x.getAttribute('aria-expanded')==='true')setDx(x,false)});
 R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:o}}))}
R.cqSetDx=setDx;
R.querySelectorAll('.cq-rum__dx').forEach(function(b){setDx(b,b.dataset.open==='1');b.addEventListener('click',function(){setDx(b,b.getAttribute('aria-expanded')!=='true')})});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var n=document.activeElement;
 if(n&&n.getAttribute&&n.getAttribute('aria-expanded')==='true'){e.preventDefault();if(n.classList.contains('cq-rum__all'))setAll(n,false);else setDx(n,false);return}
 while(n&&n!==R){if(n.id){var b=R.querySelector('[aria-controls="'+n.id+'"][aria-expanded="true"]');if(b){e.preventDefault();if(b.classList.contains('cq-rum__all'))setAll(b,false);else setDx(b,false);b.focus();return}}n=n.parentNode}});
})();
(function(){var R=document.getElementById('cq-rum');var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
R.querySelectorAll('.cq-rum__close').forEach(function(c){c.addEventListener('click',function(){var b=R.querySelector('[aria-controls="'+c.dataset.for+'"]');R.cqSetDx(b,false);b.focus()})});
R.querySelectorAll('svg [data-g]').forEach(function(el){el.addEventListener('click',function(){R.querySelector('.cq-rum__gb[data-g="'+el.dataset.g+'"]').click()})});
function sync(){var o=R.querySelector('.cq-rum__gb[aria-expanded="true"]');var id=o?o.dataset.g:'';if(id)R.setAttribute('data-sel',id);else R.removeAttribute('data-sel');
R.querySelectorAll('svg .cq-rum__band').forEach(function(el){el.classList.toggle('cq-rum--on',el.dataset.g===id)})}
R.addEventListener('cq:dx',function(e){sync();if(!e.detail.open||!e.detail.btn.classList.contains('cq-rum__gb'))return;var p=document.getElementById(e.detail.btn.getAttribute('aria-controls'));var r=p.getBoundingClientRect();if(r.top>window.innerHeight-80)p.scrollIntoView({block:'nearest',behavior:rm?'auto':'smooth'})});
if(!rm&&'IntersectionObserver' in window){R.classList.add('cq-rum--arm');var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){setTimeout(function(){R.classList.remove('cq-rum--arm')},150);io.disconnect()}},{threshold:.35});io.observe(R.querySelector('.cq-rum__svg'))}})();}catch(e){}
try{(function(){
document.documentElement.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pr=document.querySelector('.prog');
function prog(){if(!pr)return;var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
 
var xl=document.getElementById('x-liste'),xm=document.getElementById('x-mere');
if(xl&&xm){xm.hidden=false;xm.addEventListener('click',function(){var o=xm.getAttribute('aria-expanded')!=='true';xm.setAttribute('aria-expanded',String(o));xl.classList.toggle('alle',o);xm.textContent=o?'Vis færre':'Vis 3 opslag mere';if(o){var f=xl.querySelector('.x-mere');if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
 
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
[].forEach.call(document.querySelectorAll('.xp[data-url]'),function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
 
var R=document.getElementById('cq-rum');
function gaaTil(e,a){if(!R)return;var b=null;
 if(a.dataset.g){b=R.querySelector('.cq-rum__gb[data-g="'+a.dataset.g+'"]');if(b&&R.cqSetDx)R.cqSetDx(b,true)}
 else if(a.dataset.dir){b=R.querySelector('.cq-rum__dir[data-dir="'+a.dataset.dir+'"] .cq-rum__gb')}
 if(!b)return;e.preventDefault();var k=b.closest('.cq-rum__dir')||b;k.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});b.focus({preventScroll:true})}
[].forEach.call(document.querySelectorAll('.ret a[data-dir],.xp-trin a[data-g],.xp-trin a[data-dir]'),function(a){a.addEventListener('click',function(e){gaaTil(e,a)})});
 
var rk=document.querySelector('.risiko'),rx=document.getElementById('risiko-eks');
if(rk&&rx){rx.hidden=false;rx.addEventListener('click',function(){var o=rx.getAttribute('aria-expanded')!=='true';rx.setAttribute('aria-expanded',String(o));rk.classList.toggle('aaben',o);rx.textContent=o?'Skjul forklaring og kilder':'Se forklaring og kilder'})}
 
var kd=document.getElementById('kilder-d');
[].forEach.call(document.querySelectorAll('a[href="#kilder"]'),function(a){a.addEventListener('click',function(){if(kd)kd.open=true})});
 
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();
}catch(e){}