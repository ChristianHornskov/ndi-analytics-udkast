 
try{document.documentElement.classList.add('js')}catch(e){}
try{(function(){var R=document.getElementById('cq-fa');if(!R||R.dataset.on)return;R.dataset.on='1';R.classList.add('cq-fa--js');
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function show(btn){var sc=btn.closest('.cq-fa__scope')||R,inf=sc.querySelector('.cq-fa__info');if(!inf)return;inf.textContent='';
inf.appendChild(btn.querySelector('.cq-fa__lg').cloneNode(true));var w=document.createElement('div');
function el(t,c,x){var e=document.createElement(t);e.className=c;e.textContent=x;w.appendChild(e);return e}
var g=btn.dataset.g,h3=sc.querySelector('.cq-fa__h3');if(h3&&g.indexOf(h3.textContent+' · ')===0)g=g.slice(h3.textContent.length+3);el('p','cq-fa__ig',g);var h=el('p','cq-fa__ih',btn.querySelector('.cq-fa__nm').textContent);var s=document.createElement('span');var cw=btn.querySelector('.cq-fa__cw'),dt=window.NDI_TAL&&window.NDI_TAL.andelsdatoTekst;s.textContent=cw?cw.textContent+' af fonden'+(dt?' pr. '+dt:''):'';h.appendChild(s);
el('p','cq-fa__id',btn.dataset.d);if(btn.dataset.a){var ia=el('p','cq-fa__ia','');var TL={'Chips og halvledere':'../chips/index.html','Rumfart':'../space/index.html','Software & AI':'../software/index.html'};ia.appendChild(document.createTextNode(btn.querySelector('.cq-fa__nm').textContent+' laver også noget, der hører til temaet '));var tl=TL[btn.dataset.a];var ta=document.createElement(tl?'a':'span');if(tl)ta.href=tl;ta.textContent=btn.dataset.a;ia.appendChild(ta);ia.appendChild(document.createTextNode('. I fondens opdeling tælles selskabet kun med her.'))}inf.appendChild(w)}
R.querySelectorAll('.cq-fa__co').forEach(function(b){b.addEventListener('click',function(){var sc=b.closest('.cq-fa__scope')||R;sc.querySelectorAll('.cq-fa__co[aria-pressed=true]').forEach(function(o){if(o!==b)o.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');show(b)});
b.addEventListener('focus',function(){show(b)});if(fine)b.addEventListener('mouseenter',function(){show(b)})});
function setAll(a,o){var l=document.getElementById(a.getAttribute('aria-controls'));l.classList.toggle('cq-fa--open',o);a.setAttribute('aria-expanded',o);a.textContent=o?'Vis færre':'Vis alle ('+a.dataset.n+')'}
R.querySelectorAll('.cq-fa__all').forEach(function(a){a.addEventListener('click',function(){var o=a.getAttribute('aria-expanded')!=='true';setAll(a,o);if(o){var l=document.getElementById(a.getAttribute('aria-controls')),f=l.children[5];if(f)f.querySelector('button').focus()}})});
function setDx(b,o){var t=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded',o);t.hidden=!o;
 if(o&&b.dataset.grp)R.querySelectorAll('.cq-fa__dx[data-grp="'+b.dataset.grp+'"]').forEach(function(x){if(x!==b&&x.getAttribute('aria-expanded')==='true')setDx(x,false)});
 R.dispatchEvent(new CustomEvent('cq:dx',{detail:{btn:b,open:o}}))}
R.cqSetDx=setDx;
R.querySelectorAll('.cq-fa__dx').forEach(function(b){setDx(b,b.dataset.open==='1');b.addEventListener('click',function(){setDx(b,b.getAttribute('aria-expanded')!=='true')})});
R.addEventListener('keydown',function(e){if(e.key!=='Escape'&&e.key!=='Esc')return;var n=document.activeElement;
 if(n&&n.getAttribute&&n.getAttribute('aria-expanded')==='true'){e.preventDefault();if(n.classList.contains('cq-fa__all'))setAll(n,false);else setDx(n,false);return}
 while(n&&n!==R){if(n.id){var b=R.querySelector('[aria-controls="'+n.id+'"][aria-expanded="true"]');if(b){e.preventDefault();if(b.classList.contains('cq-fa__all'))setAll(b,false);else setDx(b,false);b.focus();return}}n=n.parentNode}});
})();
(function(){var R=document.getElementById('cq-fa');var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
R.querySelectorAll('.cq-fa__close').forEach(function(c){c.addEventListener('click',function(){var b=R.querySelector('[aria-controls="'+c.dataset.for+'"]');R.cqSetDx(b,false);b.focus()})});
R.querySelectorAll('svg [data-part]').forEach(function(el){el.addEventListener('click',function(){R.querySelector('.cq-fa__part[data-part="'+el.dataset.part+'"]').click()})});
function sync(){var o=R.querySelector('.cq-fa__part[aria-expanded="true"]');var id=o?o.dataset.part:'';if(id)R.setAttribute('data-sel',id);else R.removeAttribute('data-sel');
R.querySelectorAll('svg [data-part],.fa-tm__g').forEach(function(el){el.classList.toggle('cq-fa--on',el.dataset.part===id)})}
R.addEventListener('cq:dx',function(e){sync();if(!e.detail.open||!e.detail.btn.classList.contains('cq-fa__part'))return;var p=document.getElementById(e.detail.btn.getAttribute('aria-controls'));var r=p.getBoundingClientRect();if(r.top>window.innerHeight-80)p.scrollIntoView({block:'nearest',behavior:rm?'auto':'smooth'});var h=p.querySelector('.cq-fa__h3');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}});
if(!rm&&'IntersectionObserver' in window){R.classList.add('cq-fa--arm');var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){setTimeout(function(){R.classList.remove('cq-fa--arm')},150);io.disconnect()}},{threshold:.35});var mal=R.querySelector('.fa-tm__flade')||R.querySelector('.cq-fa__svg');if(mal)io.observe(mal);else R.classList.remove('cq-fa--arm')}})();}catch(e){}
try{
(function(){
var pr=document.querySelector('.prog');
function prog(){if(!pr)return;var h=document.documentElement,m=h.scrollHeight-innerHeight;pr&&pr.style.setProperty('--p',m>0?(scrollY/m).toFixed(3):0)}
addEventListener('scroll',prog,{passive:true});prog();
 
function twl(){if(window.twttr&&window.twttr.widgets)return;window.twttr=(function(d){var t=window.twttr||{};if(t._e)return t;t._e=[];t.ready=function(f){t._e.push(f)};var j=d.createElement('script');j.id='twitter-wjs';j.async=true;j.src='https://platform.twitter.com/widgets.js';j.charset='utf-8';d.body.appendChild(j);return t})(document)}
[].forEach.call(document.querySelectorAll('.xp[data-url]'),function(li){var b=li.querySelector('.xp-vis'),em=li.querySelector('.xp-embed');b.hidden=false;
 b.addEventListener('click',function(){if(em.firstChild)return;var q=document.createElement('blockquote');q.className='twitter-tweet';q.setAttribute('data-theme','dark');q.setAttribute('data-dnt','true');q.setAttribute('data-conversation','none');q.setAttribute('data-lang','da');
 var a=document.createElement('a');a.href=li.dataset.url;a.textContent='Opslaget hentes fra X …';q.appendChild(a);em.appendChild(q);b.hidden=true;em.focus({preventScroll:true});
 twl();window.twttr.ready(function(t){t.widgets.load(em)})})});
 
function fold(box,btn,luk,fokus){if(!box||!btn)return;var tx=btn.textContent;btn.hidden=false;btn.addEventListener('click',function(){var o=btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',String(o));box.classList.toggle('alle',o);btn.textContent=o?luk:tx;if(o){var f=box.querySelector(fokus);if(f){f.tabIndex=-1;f.focus({preventScroll:true})}}})}
fold(document.querySelector('.xs'),document.getElementById('x-mere'),'Vis færre','.ekstra .xp-fra b');
fold(document.getElementById('fod-boks'),document.getElementById('fod-mere'),'Vis færre','.ekstra b');
 
[].forEach.call(document.querySelectorAll('.vid-ramme[data-yt]'),function(r){var b=r.querySelector('.vid-play');b.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+r.dataset.yt+'?autoplay=1&rel=0&playsinline=1';f.title=r.dataset.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';r.replaceChild(f,b);f.focus()})});
})();

 
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var t=document.getElementById(a.getAttribute('href').slice(1));if(!t)return;var d=t.closest('details')||(t.querySelector&&t.querySelector('details'));if(d&&!d.open){d.open=true;}});

}catch(e){}
try{
/* Treemap i #cq-fa: felterne lægges ud efter dagens andele og den bredde, der er til rådighed.
   Gruppernes knapper er de samme .cq-fa__part-knapper som før, så panelerne åbnes af koden ovenfor. */
(function(){
var R=document.getElementById('cq-fa'),T=document.getElementById('fa-tm');if(!R||!T)return;
var flade=T.querySelector('.fa-tm__flade'),tip=T.querySelector('.fa-tm__tip');
var G=[].slice.call(flade.querySelectorAll('.fa-tm__g'));
var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
var SMAL=640,HOVED=64,MIN_FLISE=2400;
function dk(v){return v.toFixed(2).replace('.',',')+' %'}
function andel(slug){var d=window.NDI_TAL;var s=d&&d.selskaber&&d.selskaber[slug];return s&&typeof s.andel==='number'?s.andel:null}
function squarify(vals,x,y,w,h){var out=[],tot=vals.reduce(function(a,b){return a+b},0)||1,sc=w*h/tot,r=vals.map(function(v){return v*sc}),i=0;
 function worst(row,side){var s=row.reduce(function(a,b){return a+b},0),m=0;row.forEach(function(v){m=Math.max(m,side*side*v/(s*s),(s*s)/(side*side*v))});return m}
 while(i<r.length){var side=Math.min(w,h),row=[r[i]],j=i+1;while(j<r.length&&worst(row.concat(r[j]),side)<=worst(row,side)){row.push(r[j]);j++}
  var rs=row.reduce(function(a,b){return a+b},0),k;
  if(w>=h){var cw=rs/h,yy=y;for(k=0;k<row.length;k++){out.push([x,yy,cw,row[k]/cw]);yy+=row[k]/cw}x+=cw;w-=cw}
  else{var ch=rs/w,xx=x;for(k=0;k<row.length;k++){out.push([xx,y,row[k]/ch,ch]);xx+=row[k]/ch}y+=ch;h-=ch}
  i=j}
 return out}
function pc(v){return(Math.max(0,v)).toFixed(3)+'%'}
function data(){
 return G.map(function(g){var cs=[].slice.call(g.querySelectorAll('.fa-tm__c')).map(function(c){var a=andel(c.dataset.slug);if(a==null)a=parseFloat((c.querySelector('.fa-tm__cp').textContent||'0').replace(',','.'))||0;return{el:c,a:a}});
  cs.sort(function(a,b){return b.a-a.a});return{g:g,cs:cs,a:cs.reduce(function(t,c){return t+c.a},0)}}).sort(function(a,b){return b.a-a.a});
}
function layout(){
 var W=flade.clientWidth;if(!W)return;var smal=W<SMAL;T.classList.toggle('fa-tm--smal',smal);
 var H=smal?Math.round(Math.max(520,W*1.55)):Math.round(Math.min(560,Math.max(440,W*.44)));flade.style.height=H+'px';
 var dd=data();
 squarify(dd.map(function(d){return d.a}),0,0,W,H).forEach(function(r,i){var d=dd[i],g=d.g;
  g.style.left=pc(r[0]/W*100);g.style.top=pc(r[1]/H*100);g.style.width=pc(r[2]/W*100);g.style.height=pc(r[3]/H*100);g.style.order=i;
  var gp=g.querySelector('.fa-tm__gp');if(gp)gp.textContent=dk(d.a);
  var gb=g.querySelector('.fa-tm__gb'),n=d.cs.length;if(gb)gb.setAttribute('aria-label',g.querySelector('.fa-tm__gn').textContent+', '+dk(d.a).replace(' ',' ')+' af fonden, '+n+' selskaber. Vis selskaberne.');
  g.classList.toggle('fa-tm__g--lille',r[2]<230||r[3]<150);
  var csH=r[3]-HOVED,cs=g.querySelector('.fa-tm__cs'),tjek=[];
  if(smal||csH<44||r[2]<90){cs.hidden=true;return}cs.hidden=false;
  /* selskaber, der bliver for små at læse, samles ikke, men vises uden tekst */
  squarify(d.cs.map(function(c){return c.a}),0,0,r[2],csH).forEach(function(cr,k){var c=d.cs[k].el;
   c.style.left=pc(cr[0]/r[2]*100);c.style.top=pc(cr[1]/csH*100);c.style.width=pc(cr[2]/r[2]*100);c.style.height=pc(cr[3]/csH*100);
   var cp=c.querySelector('.fa-tm__cp'),cn=c.querySelector('.fa-tm__cn'),a=andel(c.dataset.slug);if(cp&&a!=null)cp.textContent=dk(a);
   var navn=cn?cn.textContent:'',lbl=navn+', '+(cp?cp.textContent.replace('\u00a0',' '):'');c.title=lbl;c.setAttribute('aria-label',lbl);
   c.classList.remove('fa-tm__c--mini','fa-tm__c--pct');
   if(cr[2]*cr[3]<MIN_FLISE||cr[2]<40||cr[3]<26){c.classList.add('fa-tm__c--mini');return}
   tjek.push(c);});
 });
 /* Navne, der ikke kan stå hele i flisen, vises ikke. Så står kun procenten, eller ingenting.
    Navn og andel står altid i title og aria-label og vises ved peg og fokus. */
 [].forEach.call(flade.querySelectorAll('.fa-tm__cs:not([hidden]) .fa-tm__c:not(.fa-tm__c--mini)'),function(c){
  var cn=c.querySelector('.fa-tm__cn'),cp=c.querySelector('.fa-tm__cp');
  function flyder(){return c.scrollHeight>c.clientHeight+1||(cn&&cn.offsetParent&&(cn.scrollWidth>cn.clientWidth+1||cn.scrollHeight>cn.clientHeight+1))||(cp&&cp.scrollWidth>cp.clientWidth+1)}
  if(flyder())c.classList.add('fa-tm__c--pct');
  if(flyder()){c.classList.remove('fa-tm__c--pct');c.classList.add('fa-tm__c--mini')}
 });
}
function panelKnap(slug){return R.querySelector('.cq-fa__panel .cq-fa__co[data-slug="'+slug+'"]')}
function visTip(c){if(!tip)return;var pk=panelKnap(c.dataset.slug),a=andel(c.dataset.slug);
 tip.textContent='';var h=document.createElement('p');h.className='fa-tm__th';h.textContent=c.querySelector('.fa-tm__cn').textContent;
 var v=document.createElement('span');v.textContent=a!=null?dk(a):c.querySelector('.fa-tm__cp').textContent;h.appendChild(v);tip.appendChild(h);
 if(pk&&pk.dataset.d){var p=document.createElement('p');p.className='fa-tm__td';p.textContent=pk.dataset.d;tip.appendChild(p)}
 var q=document.createElement('p');q.className='fa-tm__tq';q.textContent='Klik for at se hele delen';tip.appendChild(q);
 tip.hidden=false;var fr=T.getBoundingClientRect(),cr=c.getBoundingClientRect(),tw=tip.offsetWidth,th=tip.offsetHeight;
 var x=cr.left-fr.left+cr.width/2-tw/2,y=cr.top-fr.top-th-8;if(y<0)y=cr.bottom-fr.top+8;x=Math.max(0,Math.min(x,fr.width-tw));
 tip.style.left=x+'px';tip.style.top=y+'px'}
function skjulTip(){if(tip)tip.hidden=true}
[].forEach.call(flade.querySelectorAll('.fa-tm__c'),function(c){
 if(fine){c.addEventListener('mouseenter',function(){visTip(c)});c.addEventListener('mouseleave',skjulTip)}
 c.addEventListener('focus',function(){visTip(c)});c.addEventListener('blur',skjulTip);
 c.addEventListener('click',function(){skjulTip();var gb=R.querySelector('.fa-tm__gb[data-part="'+c.dataset.part+'"]');
  if(gb&&gb.getAttribute('aria-expanded')!=='true')gb.click();var pk=panelKnap(c.dataset.slug);if(pk)pk.click()});
});
flade.addEventListener('mouseleave',skjulTip);
layout();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(layout,function(){});
if(window.ResizeObserver)new ResizeObserver(function(){layout()}).observe(flade);else window.addEventListener('resize',layout);
document.addEventListener('ndi:tal',layout);
})();
}catch(e){}
