/* Genereret af _kilde/v5_fortaelling.py: v5-temasidens egne scripts, ordret. */
try{document.documentElement.classList.add('js')}catch(e){}
try{(function(){var R=document.getElementById('cq-rs');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-rs--js');
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function show(btn){var sc=btn.closest('.cq-rs__scope')||R,inf=sc.querySelector('.cq-rs__info');if(!inf)return;inf.textContent='';
inf.appendChild(btn.querySelector('.cq-rs__lg').cloneNode(true));var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
el('p','cq-rs__ig',btn.dataset.g);var h=el('p','cq-rs__ih',btn.querySelector('.cq-rs__nm').textContent);var s=document.createElement('span');s.textContent=btn.querySelector('.cq-rs__cw').textContent+' af afdelingen PMINDI pr. 16.10.2026';h.appendChild(s);
el('p','cq-rs__id',btn.dataset.d);if(btn.dataset.a){var ia=el('p','cq-rs__ia','');var nn=btn.querySelector('.cq-rs__nm').childNodes[1].textContent;var TL={'Datacentre':'../datacenter/index.html','Chips og halvledere':'../chips/index.html','Robotter & fysisk AI':'../fysisk-ai/index.html'};ia.appendChild(document.createTextNode(nn+' laver også noget, der hører til temaet '));var tl=TL[btn.dataset.a];var ta=document.createElement(tl?'a':'span');if(tl)ta.href=tl;ta.textContent=btn.dataset.a;ia.appendChild(ta);ia.appendChild(document.createTextNode('. I fondens opdeling tælles selskabet kun med her.'))}inf.appendChild(w)}
R.querySelectorAll('.cq-rs__co').forEach(function(b){b.addEventListener('click',function(){var sc=b.closest('.cq-rs__scope')||R;sc.querySelectorAll('.cq-rs__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
b.addEventListener('focus',function(){show(b)});if(fine)b.addEventListener('mouseenter',function(){show(b)})});
function setAll(a,o){var l=document.getElementById(a.getAttribute('aria-controls'));l.classList.toggle('cq-rs--open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')'}
R.querySelectorAll('.cq-rs__all').forEach(function(a){a.addEventListener('click',function(){var o=a.getAttribute('aria-expanded')!=='true';setAll(a,o);if(o){var l=document.getElementById(a.getAttribute('aria-controls')),f=l.children[5];if(f)f.querySelector('button').focus()}})});
function setDx(b,o){var t=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',o);t.hidden=!o;
 if(o&&b.dataset.grp)R.querySelectorAll('.cq-rs__dx[data-grp="'+b.dataset.grp+'"]').forEach(function(x){if(x!==b&&x.getAttribute('aria-expanded')==='true')setDx(x,false)});
 R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:o}}))}
R.cqSetDx=setDx;
R.querySelectorAll('.cq-rs__dx').forEach(function(b){setDx(b,b.dataset.open==='1');b.addEventListener('click',function(){setDx(b,b.getAttribute('aria-expanded')!=='true')})});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var n=document.activeElement;
 if(n&&n.getAttribute&&n.getAttribute('aria-expanded')==='true'){e.preventDefault();if(n.classList.contains('cq-rs__all'))setAll(n,false);else setDx(n,false);return}
 while(n&&n!==R){if(n.id){var b=R.querySelector('[aria-controls="'+n.id+'"][aria-expanded="true"]');if(b){e.preventDefault();if(b.classList.contains('cq-rs__all'))setAll(b,false);else setDx(b,false);b.focus();return}}n=n.parentNode}});
})();
(function(){var R=document.getElementById('cq-rs');var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
R.querySelectorAll('.cq-rs__close').forEach(function(c){c.addEventListener('click',function(){var b=R.querySelector('[aria-controls="'+c.dataset.for+'"]');R.cqSetDx(b,false);b.focus()})});
var U=R.querySelector('.cq-rs__tiles'),S=document.createElement('li'),cur=null,home={};S.className='cq-rs__slot';S.setAttribute('role','none');R.querySelectorAll('.cq-rs__tile').forEach(function(b){var p=document.getElementById(b.getAttribute('aria-controls'));home[p.id]={par:p.parentNode,nx:p.nextSibling};var h=p.querySelector('.cq-rs__h3');if(h)h.tabIndex=-1});function cols(){return getComputedStyle(U).gridTemplateColumns.split(' ').filter(Boolean).length||1}function place(){if(!cur)return;var li=[].slice.call(U.children).filter(function(x){return x!==S}),k=li.indexOf(cur.closest('li')),c=cols(),e=Math.min(li.length-1,Math.floor(k/c)*c+c-1);if(S.previousSibling!==li[e])U.insertBefore(S,li[e].nextSibling)}R.addEventListener('cq:dx',function(e){var b=e.detail.btn;if(!b.classList.contains('cq-rs__tile'))return;var p=document.getElementById(b.getAttribute('aria-controls'));if(e.detail.open){cur=b;S.appendChild(p);place()}else{if(p.parentNode===S){var o=home[p.id];o.par.insertBefore(p,o.nx&&o.nx.parentNode===o.par?o.nx:null)}if(cur===b){cur=null;if(S.parentNode)S.parentNode.removeChild(S)}}});R.querySelectorAll('.cq-rs__tile').forEach(function(b){b.addEventListener('click',function(){if(b.getAttribute('aria-expanded')!=='true')return;var p=document.getElementById(b.getAttribute('aria-controls')),h=p.querySelector('.cq-rs__h3')||p;h.focus({preventScroll:true});var r=p.getBoundingClientRect();if(r.top<0||r.top>window.innerHeight-120)p.scrollIntoView({block:'start',behavior:rm?'auto':'smooth'})})});var rz;window.addEventListener('resize',function(){cancelAnimationFrame(rz);rz=requestAnimationFrame(place)});R.querySelectorAll('.cq-rs__dx[aria-expanded="true"]').forEach(function(b){if(b.classList.contains('cq-rs__tile'))R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:true}}))});
if(!rm&&'IntersectionObserver' in window){R.classList.add('cq-rs--arm');var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){setTimeout(function(){R.classList.remove('cq-rs--arm')},150);io.disconnect()}},{threshold:.35});io.observe(R.querySelector('.cq-rs__tiles'))}})();}catch(e){}
try{
(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pr=document.querySelector('.prog');
function prog(){if(!pr)return;var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
/* X-facade: intet hentes fra X før klik; widgets.js indlæses én gang */
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
[].forEach.call(document.querySelectorAll('.xp[data-url]'),function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
/* "Hører til": åbn feltet i grundstofkortet */
var R=document.getElementById('cq-rs');
[].forEach.call(document.querySelectorAll('.xp-trin a[data-felt]'),function(a){a.addEventListener('click',function(e){var t=R&&R.querySelector('[aria-controls="cq-rs-p-'+a.dataset.felt+'"]');if(!t||!R.cqSetDx)return;e.preventDefault();R.cqSetDx(t,true);var p=document.getElementById('cq-rs-p-'+a.dataset.felt),h=p&&p.querySelector('h3');if(h){h.tabIndex=-1;p.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});h.focus({preventScroll:true})}})});
/* X: ét opslag synligt, resten bag knappen "Vis N opslag mere" */
var xs=document.querySelector('.xs'),xm=document.getElementById('x-mere');
if(xs&&xm){var tx=xm.textContent;xm.hidden=false;xm.addEventListener('click',function(){var o=xm.getAttribute('aria-expanded')!=='true';xm.setAttribute('aria-expanded',String(o));xs.classList.toggle('alle',o);xm.textContent=o?'Vis færre':tx;if(o){var f=xs.querySelector('.ekstra .xp-fra b');if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
/* video-facade: YouTube (nocookie) hentes først ved klik */
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();

/* Anker ind i en lukket <details> (fx risiko -> Kilder): fold op og hop */
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var t=document.getElementById(a.getAttribute('href').slice(1));if(!t)return;var d=t.closest('details');if(d&&!d.open){d.open=true;}});

}catch(e){}