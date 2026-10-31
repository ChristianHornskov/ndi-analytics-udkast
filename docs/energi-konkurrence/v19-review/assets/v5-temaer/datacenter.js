 
try{(function(){var R=document.getElementById('cq-dc');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-dc--js');
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function show(btn){var sc=btn.closest('.cq-dc__scope')||R,inf=sc.querySelector('.cq-dc__info');if(!inf)return;inf.textContent='';
inf.appendChild(btn.querySelector('.cq-dc__lg').cloneNode(true));var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
el('p','cq-dc__ig',btn.dataset.g);var h=el('p','cq-dc__ih',btn.querySelector('.cq-dc__nm').textContent);var s=document.createElement('span');s.textContent=btn.querySelector('.cq-dc__cw').textContent+' af fonden';h.appendChild(s);
el('p','cq-dc__id',btn.dataset.d);if(btn.dataset.a)el('p','cq-dc__ia','Hører også til temaet: '+btn.dataset.a);inf.appendChild(w)}
R.querySelectorAll('.cq-dc__co').forEach(function(b){b.addEventListener('click',function(){var sc=b.closest('.cq-dc__scope')||R;sc.querySelectorAll('.cq-dc__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
b.addEventListener('focus',function(){show(b)});if(fine)b.addEventListener('mouseenter',function(){show(b)})});
function setAll(a,o){var l=document.getElementById(a.getAttribute('aria-controls'));l.classList.toggle('cq-dc--open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')'}
R.querySelectorAll('.cq-dc__all').forEach(function(a){a.addEventListener('click',function(){var o=a.getAttribute('aria-expanded')!=='true';setAll(a,o);if(o){var l=document.getElementById(a.getAttribute('aria-controls')),f=l.children[5];if(f)f.querySelector('button').focus()}})});
function setDx(b,o){var t=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',o);t.hidden=!o;
 if(o&&b.dataset.grp)R.querySelectorAll('.cq-dc__dx[data-grp="'+b.dataset.grp+'"]').forEach(function(x){if(x!==b&&x.getAttribute('aria-expanded')==='true')setDx(x,false)});
 R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:o}}))}
R.cqSetDx=setDx;
R.querySelectorAll('.cq-dc__dx').forEach(function(b){setDx(b,b.dataset.open==='1');b.addEventListener('click',function(){setDx(b,b.getAttribute('aria-expanded')!=='true')})});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var n=document.activeElement;
 if(n&&n.getAttribute&&n.getAttribute('aria-expanded')==='true'){e.preventDefault();if(n.classList.contains('cq-dc__all'))setAll(n,false);else setDx(n,false);return}
 while(n&&n!==R){if(n.id){var b=R.querySelector('[aria-controls="'+n.id+'"][aria-expanded="true"]');if(b){e.preventDefault();if(b.classList.contains('cq-dc__all'))setAll(b,false);else setDx(b,false);b.focus();return}}n=n.parentNode}});
})();
(function(){var R=document.getElementById('cq-dc');var rings=[].slice.call(R.querySelectorAll('.cq-dc__ring'));
function hi(){rings.forEach(function(g){var b=R.querySelector('.cq-dc__lagb[data-lag="'+g.dataset.lag+'"]');g.classList.toggle('cq-dc--hi',b.getAttribute('aria-expanded')==='true')})}
R.addEventListener('cq:dx',hi);hi();
rings.forEach(function(g){g.addEventListener('click',function(e){e.stopPropagation();var b=R.querySelector('.cq-dc__lagb[data-lag="'+g.dataset.lag+'"]');R.cqSetDx(b,true);b.focus({preventScroll:true});if(window.innerWidth<900)b.scrollIntoView({block:'nearest'})})});
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!rm&&'IntersectionObserver' in window){var F=R.querySelector('.cq-dc__fig');R.classList.add('cq-dc--arm');var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){setTimeout(function(){R.classList.remove('cq-dc--arm')},150);io.disconnect()}},{threshold:.6});io.observe(F)}
})();}catch(e){}
try{(function(){
document.documentElement.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pr=document.querySelector('.prog');
function prog(){if(!pr)return;var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
 
var fl=document.getElementById('fod-liste'),fb=document.getElementById('fod-alle');
if(fl&&fb){fb.hidden=false;fb.addEventListener('click',function(){var o=fb.getAttribute('aria-expanded')!=='true';fb.setAttribute('aria-expanded',String(o));fl.classList.toggle('alle',o);fb.textContent=o?'Vis færre':'Vis alle (31)';if(o){var f=fl.querySelector('li:nth-child(2)');if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
 
var xl=document.getElementById('x-liste'),xm=document.getElementById('x-mere');
if(xl&&xm){xm.hidden=false;xm.addEventListener('click',function(){var o=xm.getAttribute('aria-expanded')!=='true';xm.setAttribute('aria-expanded',String(o));xl.classList.toggle('alle',o);xm.textContent=o?'Vis færre':'Vis 2 opslag mere';if(o){var f=xl.querySelector('.x-mere');if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
 
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
[].forEach.call(document.querySelectorAll('.xp[data-url]'),function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
 
var R=document.getElementById('cq-dc');
[].forEach.call(document.querySelectorAll('.xp-trin a[data-lag]'),function(a){a.addEventListener('click',function(e){var b=R&&R.querySelector('.cq-dc__lagb[data-lag="'+a.dataset.lag+'"]');if(!b||!R.cqSetDx)return;e.preventDefault();R.cqSetDx(b,true);b.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});b.focus({preventScroll:true})})});
 
var rk=document.querySelector('.risiko'),rx=document.getElementById('risiko-eks');
if(rk&&rx){rx.hidden=false;rx.addEventListener('click',function(){var o=rx.getAttribute('aria-expanded')!=='true';rx.setAttribute('aria-expanded',String(o));rk.classList.toggle('aaben',o);rx.textContent=o?'Skjul eksempler og kilder':'Se eksempler og kilder'})}
 
var kd=document.getElementById('kilder-d');
[].forEach.call(document.querySelectorAll('a[href="#kilder"]'),function(a){a.addEventListener('click',function(){if(kd)kd.open=true})});
 
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();
}catch(e){}