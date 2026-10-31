 
try{(function(){var R=document.getElementById('cq-kr');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-kr--js');
var TL={'Datacentre':'../datacenter/index.html','Fintech':'../fintech/index.html'};
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function show(btn){var sc=btn.closest('.cq-kr__scope')||R,inf=sc.querySelector('.cq-kr__info');if(!inf)return;inf.textContent='';
inf.appendChild(btn.querySelector('.cq-kr__lg').cloneNode(true));var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
el('p','cq-kr__ig',btn.dataset.g);var h=el('p','cq-kr__ih',btn.querySelector('.cq-kr__nm').textContent);var s=document.createElement('span');s.textContent=btn.querySelector('.cq-kr__cw').textContent+' af fonden';h.appendChild(s);
el('p','cq-kr__id',btn.dataset.d);if(btn.dataset.a){var q=el('p','cq-kr__ia',btn.querySelector('.cq-kr__nm').textContent.trim()+' laver også noget, der hører til temaet '),u=TL[btn.dataset.a],k=document.createElement(u?'a':'span');if(u)k.href=u;k.textContent=btn.dataset.a;q.appendChild(k);q.appendChild(document.createTextNode('. I fondens opdeling tælles selskabet kun med her.'))}inf.appendChild(w)}
R.querySelectorAll('.cq-kr__co').forEach(function(b){b.addEventListener('click',function(){var sc=b.closest('.cq-kr__scope')||R;sc.querySelectorAll('.cq-kr__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
b.addEventListener('focus',function(){show(b)});if(fine)b.addEventListener('mouseenter',function(){show(b)})});
function setAll(a,o){var l=document.getElementById(a.getAttribute('aria-controls'));l.classList.toggle('cq-kr--open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')'}
R.querySelectorAll('.cq-kr__all').forEach(function(a){a.addEventListener('click',function(){var o=a.getAttribute('aria-expanded')!=='true';setAll(a,o);if(o){var l=document.getElementById(a.getAttribute('aria-controls')),f=l.children[window.matchMedia('(max-width:759px)').matches?4:5];if(f)f.querySelector('button').focus()}})});
function setDx(b,o){var t=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',o);t.hidden=!o;
 if(o&&b.dataset.grp)R.querySelectorAll('.cq-kr__dx[data-grp="'+b.dataset.grp+'"]').forEach(function(x){if(x!==b&&x.getAttribute('aria-expanded')==='true')setDx(x,false)});
 R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:o}}))}
R.cqSetDx=setDx;
R.querySelectorAll('.cq-kr__dx').forEach(function(b){setDx(b,b.dataset.open==='1');b.addEventListener('click',function(){setDx(b,b.getAttribute('aria-expanded')!=='true')})});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var n=document.activeElement;
 if(n&&n.getAttribute&&n.getAttribute('aria-expanded')==='true'){e.preventDefault();if(n.classList.contains('cq-kr__all'))setAll(n,false);else setDx(n,false);return}
 while(n&&n!==R){if(n.id){var b=R.querySelector('[aria-controls="'+n.id+'"][aria-expanded="true"]');if(b){e.preventDefault();if(b.classList.contains('cq-kr__all'))setAll(b,false);else setDx(b,false);b.focus();return}}n=n.parentNode}});
})();
(function(){var R=document.getElementById('cq-kr');if(!R||R.dataset.on2)return;R.dataset.on2='1';var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
R.querySelectorAll('.cq-kr__close').forEach(function(c){var f=c.cloneNode(true);f.classList.add('cq-kr__close--foot');document.getElementById(c.dataset.for).appendChild(f)});
R.querySelectorAll('.cq-kr__close').forEach(function(c){c.addEventListener('click',function(){var b=R.querySelector('[aria-controls="'+c.dataset.for+'"]');R.cqSetDx(b,false);b.focus({preventScroll:true});var r=b.getBoundingClientRect();if(r.top<0||r.bottom>window.innerHeight)b.scrollIntoView({block:'center',behavior:rm?'auto':'smooth'})})});
var L=R.querySelector('.cq-kr__ledger'),bk=R.querySelector('.cq-kr__bk'),S=document.createElement('div'),cur=null,home={},cells=[].slice.call(L.querySelectorAll('.cq-kr__cell'));S.className='cq-kr__slot';
R.querySelectorAll('.cq-kr__rb').forEach(function(b){var p=document.getElementById(b.getAttribute('aria-controls'));home[p.id]={par:p.parentNode,nx:p.nextSibling};var t=p.querySelector('.cq-kr__pt');if(t)t.tabIndex=-1});
function reset(){cells.forEach(function(c){c.style.gridRow=''});if(bk)bk.style.gridRow='';S.style.gridRow='';L.classList.remove('cq-kr--slot');if(S.parentNode)S.parentNode.removeChild(S)}
function top(e){return Math.round(e.getBoundingClientRect().top)}
function place(){if(!cur)return;reset();var c0=cur.closest('.cq-kr__cell'),t=top(c0),row=cells.filter(function(c){return Math.abs(top(c)-t)<3}),last=row[row.length-1],n=parseInt(getComputedStyle(last).gridRowStart,10);
L.insertBefore(S,last.nextSibling);L.classList.add('cq-kr--slot');
if(!isNaN(n)){S.style.gridRow=String(n+1);cells.forEach(function(c){var r=parseInt(getComputedStyle(c).gridRowStart,10);if(r>n)c.style.gridRow=String(r+1)});if(bk){var cs=getComputedStyle(bk),a=parseInt(cs.gridRowStart,10),e=parseInt(cs.gridRowEnd,10);if(!isNaN(a)&&!isNaN(e)&&a<=n&&e>n+1)bk.style.gridRow=a+' / '+(n+1)}}}
R.addEventListener('cq:dx',function(e){var b=e.detail.btn;if(!b.classList.contains('cq-kr__rb'))return;var p=document.getElementById(b.getAttribute('aria-controls'));if(e.detail.open){cur=b;S.appendChild(p);place()}else{if(p.parentNode===S){var o=home[p.id];o.par.insertBefore(p,o.nx&&o.nx.parentNode===o.par?o.nx:null)}if(cur===b){cur=null;reset()}}});
R.querySelectorAll('.cq-kr__rb').forEach(function(b){b.addEventListener('click',function(){if(b.getAttribute('aria-expanded')!=='true')return;var p=document.getElementById(b.getAttribute('aria-controls')),t=p.querySelector('.cq-kr__pt');if(t)t.focus({preventScroll:true});var r=p.getBoundingClientRect();if(r.top<0||r.top>window.innerHeight-80)p.scrollIntoView({block:'start',behavior:rm?'auto':'smooth'})})});
window.addEventListener('resize',function(){requestAnimationFrame(place)});
R.querySelectorAll('.cq-kr__rb[aria-expanded="true"]').forEach(function(b){R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:true}}))});
R.querySelectorAll('.vid-ramme[data-cq-kr-yt]').forEach(function(r){var v=r.querySelector('.vid-play');if(!v)return;v.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.getAttribute('data-cq-kr-yt')+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';var g=r.closest('.vid');if(g)g.classList.add('cq-kr--play');r.replaceChild(f,v);f.focus()})});
})();
}catch(e){}
try{(function(){
document.documentElement.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pr=document.querySelector('.prog');
function prog(){if(!pr)return;var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
 
var xl=document.getElementById('x-liste'),xm=document.getElementById('x-mere');
if(xl&&xm){xm.hidden=false;xm.addEventListener('click',function(){var o=xm.getAttribute('aria-expanded')!=='true';xm.setAttribute('aria-expanded',String(o));xl.classList.toggle('alle',o);xm.textContent=o?'Vis færre':'Vis 2 opslag mere';if(o){var f=xl.querySelector('.x-mere');if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
 
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
[].forEach.call(document.querySelectorAll('.xp[data-url]'),function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
 
var R=document.getElementById('cq-kr');
[].forEach.call(document.querySelectorAll('.xp-trin a[data-rolle]'),function(a){a.addEventListener('click',function(e){var b=R&&R.querySelector('.cq-kr__rb[aria-controls="cq-kr-p-'+a.dataset.rolle+'"]');if(!b||!R.cqSetDx)return;e.preventDefault();R.cqSetDx(b,true);b.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});b.focus({preventScroll:true})})});
 
var rk=document.querySelector('.risiko'),rx=document.getElementById('risiko-eks');
if(rk&&rx){rx.hidden=false;rx.addEventListener('click',function(){var o=rx.getAttribute('aria-expanded')!=='true';rx.setAttribute('aria-expanded',String(o));rk.classList.toggle('aaben',o);rx.textContent=o?'Skjul eksempler og kilder':'Se eksempler og kilder'})}
 
var kd=document.getElementById('kilder-d');
[].forEach.call(document.querySelectorAll('a[href="#kilder"]'),function(a){a.addEventListener('click',function(){if(kd)kd.open=true})});
 
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();
}catch(e){}
try{
/* Andele i temaet (#kr-andele): tegnes igen fra datalaget, så tal og rækkefølge følger dagens andele.
   HTML'en indeholder samme liste beregnet ved eksporten, så figuren også virker uden JS. */
(function(){
var fig=document.getElementById('kr-andele');if(!fig)return;
var ROLLE={},KORT={};
[].forEach.call(document.querySelectorAll('#cq-kr .cq-kr__panel'),function(p){var r=p.getAttribute('aria-label')||'';r=r.replace(/ i bogen$/,'').replace(/^Skriver$/,'Skriver i bogen').replace(/^Åbner døren til$/,'Åbner døren til bogen');
 [].forEach.call(p.querySelectorAll('.cq-kr__nm'),function(n){var t=n.textContent.trim();ROLLE[t.split(/\s+/)[0].toLowerCase()]=r;KORT[t.split(/\s+/)[0].toLowerCase()]=t;});});
function dk(x){return x.toFixed(2).replace('.',',')+' %'}
function tegn(d){
 if(!d||!d.selskaber)return;
 var alle=Object.keys(d.selskaber).map(function(k){var s=d.selskaber[k];return{slug:k,navn:s.navn,andel:s.andel,tema:s.tema}}).filter(function(s){return s.tema==='krypto'&&typeof s.andel==='number'});
 if(!alle.length)return;
 alle.sort(function(a,b){return b.andel-a.andel});
 var top=alle.slice(0,8),rest=alle.slice(8),iren=d.selskaber.iren;
 var maks=Math.max(alle[0].andel,iren&&iren.andel||0);maks=Math.ceil(maks*10+.5)/10;
 fig.style.setProperty('--maks',maks);
 var ol=fig.querySelector('.kr-and__liste');ol.textContent='';
 top.forEach(function(s){var f=s.navn.split(/\s+/)[0].toLowerCase();
  var li=document.createElement('li'),a=document.createElement('a'),sm=document.createElement('small'),b=document.createElement('span'),i=document.createElement('i'),v=document.createElement('b');
  a.className='kr-and__n';a.href='../selskaber/'+s.slug+'.html';a.textContent=KORT[f]||s.navn;sm.textContent=ROLLE[f]||'Ejer en beholdning';a.appendChild(sm);
  b.className='kr-and__b';b.setAttribute('aria-hidden','true');i.style.setProperty('--v',s.andel);b.appendChild(i);v.textContent=dk(s.andel);
  li.appendChild(a);li.appendChild(b);li.appendChild(v);ol.appendChild(li);});
 if(rest.length){var sum=rest.reduce(function(t,s){return t+s.andel},0),lo=rest[rest.length-1].andel,hi=rest[0].andel;
  var li=document.createElement('li'),n=document.createElement('span'),t=document.createElement('span');li.className='kr-and__rest';
  n.className='kr-and__n';n.textContent=rest.length+' øvrige';t.className='kr-and__rt';
  t.textContent=lo.toFixed(2).replace('.',',')+' til '+dk(hi)+' hver, tilsammen '+dk(sum);li.appendChild(n);li.appendChild(t);ol.appendChild(li);}
 var h=fig.querySelector('.kr-and__h');if(h)h.textContent='Temaets '+alle.length+' selskaber er hver især små';
 var ir=fig.querySelector('.kr-and__iren');
 if(ir){if(iren&&typeof iren.andel==='number'){ir.hidden=false;ir.style.setProperty('--v',iren.andel);ir.firstChild.textContent='IREN '+dk(iren.andel);}else ir.hidden=true;}
}
if(window.NDI_TAL)tegn(window.NDI_TAL);
document.addEventListener('ndi:tal',function(e){tegn(e.detail)});
})();
}catch(e){}
