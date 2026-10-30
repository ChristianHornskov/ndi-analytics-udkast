 
try{(function(){var R=document.getElementById('cq-kaede');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-ch--js');
var T=R.querySelector('.cq-ch__track'),P=[].slice.call(R.querySelectorAll('.cq-ch__p')),B=[].slice.call(R.querySelectorAll('.cq-ch__tab')),S=[].slice.call(R.querySelectorAll('.cq-ch__seg')),
pv=R.querySelector('.cq-ch__pv'),nx=R.querySelector('.cq-ch__nx'),pl=R.querySelector('.cq-ch__pl'),cur=-1,
rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function name(i){return P[i].querySelector('h3').firstChild.nextSibling.nodeValue}
function set(i){if(i===cur)return;cur=i;B.forEach(function(b,k){if(k===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
S.forEach(function(s,k){s.classList.toggle('on',k===i)});pl.innerHTML='';var sp=document.createElement('span');sp.textContent=(i+1)+' / '+P.length;pl.appendChild(sp);pl.appendChild(document.createTextNode(' '+name(i)));
pv.disabled=i===0;nx.disabled=i===P.length-1;fit()}
function fit(){if(cur<0)return;T.style.height=(P[cur].offsetHeight+16)+'px'}
if(window.ResizeObserver){var ro=new ResizeObserver(fit);P.forEach(function(p){ro.observe(p)})}
function go(i){i=Math.max(0,Math.min(P.length-1,i));T.scrollTo({left:P[i].offsetLeft-T.firstElementChild.offsetLeft,behavior:rm?'auto':'smooth'});set(i)}
var tm;T.addEventListener('scroll',function(){clearTimeout(tm);tm=setTimeout(function(){var x=T.scrollLeft,b=0,bd=1e9;P.forEach(function(p,k){var dd=Math.abs(p.offsetLeft-T.firstElementChild.offsetLeft-x);if(dd<bd){bd=dd;b=k}});set(b)},80)},{passive:true});
B.forEach(function(b,k){b.addEventListener('click',function(){go(k)});b.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?k+1:e.key==='ArrowLeft'?k-1:e.key==='Home'?0:e.key==='End'?B.length-1:-1;if(n<0||n>=B.length)return;e.preventDefault();B[n].focus();go(n)})});
pv.addEventListener('click',function(){go(cur-1)});nx.addEventListener('click',function(){go(cur+1)});
R.addEventListener('focusin',function(e){var p=e.target.closest('.cq-ch__p');if(p){var i=+p.dataset.i;if(i!==cur){go(i)}}});
function show(btn,pin){var p=btn.closest('.cq-ch__p'),inf=p.querySelector('.cq-ch__info');inf.textContent='';
var lg=btn.querySelector('.cq-ch__lg').cloneNode(true);inf.appendChild(lg);var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
el('p','cq-ch__ig',btn.dataset.g);var h=el('p','cq-ch__ih',btn.querySelector('.cq-ch__nm').textContent.replace(/\u00ad/g,''));var s=document.createElement('span');s.textContent=btn.querySelector('.cq-ch__cw').textContent+' af fonden';h.appendChild(s);
el('p','cq-ch__id',btn.dataset.d);if(btn.dataset.a)el('p','cq-ch__ia','Hører også til temaet: '+btn.dataset.a);inf.appendChild(w)}
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
R.querySelectorAll('.cq-ch__co').forEach(function(b){
 b.addEventListener('click',function(){var p=b.closest('.cq-ch__p');p.querySelectorAll('.cq-ch__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
 b.addEventListener('focus',function(){show(b)});
 if(fine)b.addEventListener('mouseenter',function(){show(b)});
});
R.querySelectorAll('.cq-ch__all').forEach(function(a){a.addEventListener('click',function(){var l=document.getElementById(a.getAttribute('aria-controls')),o=!l.classList.contains('open');l.classList.toggle('open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')';if(o){var f=l.children[6];if(f)f.querySelector('button').focus()}})});
set(0);
if(!rm&&'IntersectionObserver' in window){var M=R.querySelector('.cq-ch__chip');R.classList.add('cq-ch--arm');var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){setTimeout(function(){R.classList.remove('cq-ch--arm')},350);io.disconnect()}},{threshold:.9});io.observe(M)}
})();
}catch(e){}
try{
(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pr=document.querySelector('.prog');
function prog(){if(!pr)return;var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
 
var hz=document.querySelector('.hero-zoom'),hero=document.querySelector('.hero');
if(!reduce&&hz){var tk=false;function z(){tk=false;var r=hero.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height*.8)));hz.style.setProperty('--z',(1.16-.16*p).toFixed(4))}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(z)}},{passive:true});z();}
 
var R=document.getElementById('cq-kaede');
if(R){var dots=[].slice.call(R.querySelectorAll('.kd-dots i')),pl=R.querySelector('.cq-ch__pl');
function sync(){var m=/(\d+)\s*\/\s*(\d+)/.exec(pl.textContent);if(!m)return;dots.forEach(function(d,i){d.classList.toggle('on',i===m[1]-1)})}
new MutationObserver(sync).observe(pl,{childList:true,subtree:true,characterData:true});sync();
var std={};[].forEach.call(R.querySelectorAll('.cq-ch__p'),function(p){std[p.id]=p.querySelector('.cq-ch__info').innerHTML});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var p=e.target.closest&&e.target.closest('.cq-ch__p');if(!p)return;
 var l=p.querySelector('.cq-ch__cos.open'),a=p.querySelector('.cq-ch__all[aria-expanded="true"]');
 if(l&&a){e.preventDefault();a.focus();a.click();return}
 var on=p.querySelector('.cq-ch__co[aria-pressed="true"]');
 if(on){e.preventDefault();on.setAttribute('aria-pressed','false');p.querySelector('.cq-ch__info').innerHTML=std[p.id]}});
}
 
var xs=[].slice.call(document.querySelectorAll('.xp[data-url]'));
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
xs.forEach(function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
 
[].forEach.call(document.querySelectorAll('.xp-trin a[data-i]'),function(a){a.addEventListener('click',function(e){var t=R&&R.querySelector('.cq-ch__tab[data-i="'+a.dataset.i+'"]');if(!t)return;e.preventDefault();t.click();var p=document.getElementById(a.getAttribute('href').slice(1)),h=p&&p.querySelector('h3');setTimeout(function(){if(!h)return;h.tabIndex=-1;h.focus({preventScroll:true});R.querySelector('.cq-ch__nav').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})},reduce?0:450)})});
 
if(R)[].forEach.call(R.querySelectorAll('.cq-ch__seg'),function(g){g.addEventListener('click',function(){var t=R.querySelector('.cq-ch__tab[data-i="'+g.dataset.i+'"]');if(t)t.click()})});
 
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();
}catch(e){}