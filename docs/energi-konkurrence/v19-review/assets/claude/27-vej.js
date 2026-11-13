/* Skyder: 100 lægemidler trækkes gennem forsøgsfaserne. Bruges af [data-vej]. */
(function(){
  var TILBAGE=[100,47,13,7,7],NAVN=['Fase 1','Fase 2','Fase 3','Ansøgning','Godkendt'];
  // fast, blandet rækkefølge, så prikkerne ikke forsvinder række for række
  function orden(n){var a=[],i,s=7;for(i=0;i<n;i++)a.push(i);for(i=n-1;i>0;i--){s=(s*9301+49297)%233280;var j=Math.floor(s/233280*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
  function init(sec){
    var r=sec.querySelector('.lv-r'),tael=sec.querySelector('[data-lv-tael]'),O=orden(100),sidst=-1;
    var ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    function tegn(p){
      var st=Math.min(4,Math.floor(p+1e-6));
      // lægemidler, der er faldet fra: dem, der ikke klarede de trin, der er passeret
      var med=TILBAGE[Math.min(4,Math.floor(p+0.0001))];
      if(p>=st+0.5&&st<4)med=TILBAGE[st+1];
      sec.querySelectorAll('.lv-svg').forEach(function(svg){
        var pr=svg.querySelectorAll('.lv-p');
        for(var k=0;k<pr.length;k++){pr[O[k]].classList.toggle('er-ude',k>=med);pr[O[k]].classList.toggle('er-godkendt',st===4&&k<med);}
        svg.querySelectorAll('.lv-st').forEach(function(g){var i=+g.getAttribute('data-st');g.classList.toggle('er-naaet',i<=st);g.classList.toggle('er-aktiv',i===st);});
        var f=svg.querySelector('.lv-fyld');if(f)f.style.strokeDashoffset=String(1-p/4);
      });
      tael.textContent=med;
      if(st!==sidst){sidst=st;
        sec.querySelectorAll('.lv-panel').forEach(function(pa){pa.hidden=+pa.getAttribute('data-st')!==st;});
        r.setAttribute('aria-valuetext',NAVN[st]);}
    }
    r.addEventListener('input',function(){tegn(+r.value);});
    function snap(){var m=Math.round(+r.value),fra=+r.value;if(ro||Math.abs(m-fra)<.01){r.value=m;tegn(m);return;}
      var t0=null;requestAnimationFrame(function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/220),v=fra+(m-fra)*k;r.value=v;tegn(v);if(k<1)requestAnimationFrame(step);});}
    r.addEventListener('change',snap);
    sec.querySelectorAll('.lv-st').forEach(function(g){g.addEventListener('click',function(){r.value=g.getAttribute('data-st');tegn(+r.value);});});
    tegn(0);
  }
  function go(){document.querySelectorAll('[data-vej]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
