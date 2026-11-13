/* Fintech: fem måder at tjene penge på. Tal fra fondens data (DAGENS_TAL). */
(function(){
  function fmt(v){if(v==null)return'';if(v>0&&v<0.005)return'under 0,01 %';return v.toFixed(2).replace('.',',')+' %'}
  function tegn(){
    var R=document.getElementById('tjener'),D=window.DAGENS_TAL;if(!R||!D||!D.temaer)return;
    var t=null;D.temaer.forEach(function(x){if(x.id==='fintech')t=x});if(!t||!t.selskaber)return;
    var A={};t.selskaber.forEach(function(s){if(s.slug)A[s.slug]=s.andel});
    /* Selskaber i fondens data, som endnu ikke står i en gruppe, vises i en grå række til sidst. */
    var kendte={};R.querySelectorAll('.ft5-sel li').forEach(function(li){kendte[li.dataset.slug]=1});
    var nye=t.selskaber.filter(function(s){return s.slug&&!kendte[s.slug]&&!R.querySelector('[data-andre-slug="'+s.slug+'"]')});
    if(nye.length){var g=R.querySelector('.ft5-g--andre');if(!g){g=document.createElement('li');g.className='ft5-g ft5-g--andre';g.dataset.g='andre';
      g.innerHTML='<div class="ft5-hoved"><svg class="ft5-ik" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg><h3>Endnu ikke i en gruppe</h3><p class="ft5-andel"><b data-ft5-g="andre">…</b><span>af fonden</span></p></div><dl class="ft5-flow"><div><dt>Kunden</dt><dd>Beskrivelsen er på vej.</dd></div></dl><ul class="ft5-sel"></ul>';
      R.querySelector('.ft5-liste').appendChild(g);var seg=document.createElement('span');seg.className='ft5-seg';seg.dataset.g='andre';seg.style.setProperty('--c','#6b7785');R.querySelector('.ft5-stak').appendChild(seg)}
      nye.forEach(function(s){var li=document.createElement('li');li.dataset.slug=s.slug;li.setAttribute('data-andre-slug',s.slug);var a=document.createElement('a');a.href='../selskaber/'+s.slug+'.html';
        var n=document.createElement('span');n.className='ft5-n';n.textContent=s.navn||s.slug;var im=document.createElement('span');a.appendChild(im);a.appendChild(n);a.appendChild(document.createElement('b'));li.appendChild(a);g.querySelector('.ft5-sel').appendChild(li)})}
    var sum=0,antal=0,grp=[];
    R.querySelectorAll('.ft5-g').forEach(function(g){
      var gs=0;
      g.querySelectorAll('.ft5-sel li').forEach(function(li){var v=A[li.dataset.slug];var b=li.querySelector('b');
        if(v==null){li.classList.add('ft5-uden');b.textContent=''}else{li.classList.remove('ft5-uden');b.textContent=fmt(v);gs+=v;antal++}});
      /* sortér selskaberne efter andel */
      var ul=g.querySelector('.ft5-sel');Array.prototype.slice.call(ul.children).sort(function(a,b){return (A[b.dataset.slug]||-1)-(A[a.dataset.slug]||-1)}).forEach(function(li){ul.appendChild(li)});
      g.querySelector('[data-ft5-g]').textContent=fmt(gs);sum+=gs;grp.push([g,gs]);
    });
    var L=R.querySelector('.ft5-liste');grp.sort(function(a,b){return b[1]-a[1]}).forEach(function(x){L.appendChild(x[0])});
    var stak=R.querySelector('.ft5-stak');
    grp.forEach(function(x){var s=stak.querySelector('[data-g="'+x[0].dataset.g+'"]');s.style.width=(sum?x[1]/sum*100:20)+'%';stak.appendChild(s)});
    R.querySelector('[data-ft5="sum"]').textContent=fmt(sum);
    R.querySelector('[data-ft5="antal"]').textContent=antal;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tegn);else tegn();
  document.addEventListener('ndi:live',tegn);window.addEventListener('load',tegn);
})();
