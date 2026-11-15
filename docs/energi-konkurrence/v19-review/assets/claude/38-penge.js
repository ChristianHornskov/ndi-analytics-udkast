/* Hvem får pengene: vælg en platform, træk i årene, og se den samlede handel vokse og platformens bid af 100 kr. Bruges af [data-penge]. */
(function(){
  var NS='http://www.w3.org/2000/svg',AAR=[2021,2022,2023,2024,2025],MAX=200,H=300,B0=258,TOP=34;
  function el(t,a,txt){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;return e;}
  function kr(x){return x.toFixed(1).replace('.',',');}
  function init(sec){
    var data;try{data=JSON.parse(sec.querySelector('.pg-data').textContent);}catch(e){return;}
    var svg=sec.querySelector('.pg-svg'),g=svg.querySelector('.pg-dyn'),slider=sec.querySelector('.pg-aar'),aarTxt=sec.querySelector('[data-pg-aar]');
    var stort=sec.querySelector('.pg-stort'),under=sec.querySelector('.pg-under'),vaekst=sec.querySelector('.pg-vaekst');
    var del=sec.querySelector('.pg-del-p'),delTal=sec.querySelector('.pg-del-tal'),restTal=sec.querySelector('.pg-rest-tal'),delTxt=sec.querySelector('.pg-del-txt'),note=sec.querySelector('.pg-note');
    var knapper=[].slice.call(sec.querySelectorAll('.pg-valg')),spil=sec.querySelector('.pg-spil');
    var ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cur=data[0],idx=4,timer=null;
    var W=600,bw=70,gap=0;
    function maal(){W=svg.clientWidth&&svg.clientWidth<420?400:600;svg.setAttribute('viewBox','0 0 '+W+' '+H);bw=W<500?52:70;gap=(W-80-5*bw)/4;}
    function x(i){return 60+i*(bw+gap);}
    function tegn(){
      maal();
      while(g.firstChild)g.removeChild(g.firstChild);
      [50,100,150,200].forEach(function(v){var y=B0-(B0-TOP)*v/MAX;g.appendChild(el('line',{x1:40,x2:W-10,y1:y,y2:y,stroke:'rgba(255,255,255,.08)'}));g.appendChild(el('text',{x:34,y:y+4,'text-anchor':'end','class':'pg-akse'},v));});
      AAR.forEach(function(a,i){
        var v=cur.v[i],h=(B0-TOP)*v/MAX,y=B0-h,vis=i<=idx;
        if(vis){
          var andel=i===idx&&i===4?cur.bar/100:0;
          g.appendChild(el('rect',{x:x(i),y:y,width:bw,height:h,rx:4,'class':i===idx?'pg-bar pg-bar--nu':'pg-bar'}));
          if(andel){var hp=h*andel;g.appendChild(el('rect',{x:x(i),y:y,width:bw,height:hp,rx:4,'class':'pg-bar-p'}));}
          g.appendChild(el('text',{x:x(i)+bw/2,y:y-8,'text-anchor':'middle','class':i===idx?'pg-vt pg-vt--nu':'pg-vt'},kr(v)));
        }else{
          g.appendChild(el('rect',{x:x(i)+.5,y:y,width:bw-1,height:h,rx:4,fill:'none',stroke:'rgba(255,255,255,.16)','stroke-dasharray':'5 5'}));
        }
        g.appendChild(el('text',{x:x(i)+bw/2,y:B0+22,'text-anchor':'middle','class':i===idx?'pg-at pg-at--nu':'pg-at'},a));
      });
      g.appendChild(el('line',{x1:40,x2:W-10,y1:B0,y2:B0,stroke:'rgba(255,255,255,.3)'}));
      var v=cur.v[idx];
      stort.textContent=kr(v)+' mia. dollar';
      under.textContent=cur.hvad+' i '+AAR[idx];
      vaekst.textContent=idx===0?'Startåret. Træk i årene for at se væksten.':'Det er '+kr(v/cur.v[0])+' gange så meget som i 2021.'+(idx<4?' Fordelingen af hver 100 kr. nedenfor gælder 2025.':'');
      slider.value=idx;slider.setAttribute('aria-valuetext',AAR[idx]+': '+kr(v)+' mia. dollar');aarTxt.textContent=AAR[idx];
    }
    function vaelg(p,anim){
      cur=p;knapper.forEach(function(k){k.setAttribute('aria-pressed',k.getAttribute('data-p')===p.id?'true':'false');});
      del.style.width='0%';
      setTimeout(function(){del.style.width=p.andel+'%';},ro?0:60);
      var pk=Math.round(p.andel);delTal.textContent=pk>=15?pk+' kr.':'';restTal.textContent=(100-pk)+' kr.';sec.querySelector('.pg-p-lab').textContent='Platformen i 2025, ca. '+pk+' kr.';
      delTxt.innerHTML=p.txt;note.textContent=p.note;
      sec.querySelector('.pg-rest-lab').textContent=p.rest+', ca. '+(100-pk)+' kr.';
      if(anim&&!ro)afspil();else{idx=4;tegn();}
    }
    function stop(){if(timer){clearInterval(timer);timer=null;}spil.classList.remove('er-i-gang');}
    function afspil(){stop();idx=0;tegn();spil.classList.add('er-i-gang');timer=setInterval(function(){if(idx>=4){stop();return;}idx++;tegn();},650);}
    knapper.forEach(function(k){k.addEventListener('click',function(){var id=k.getAttribute('data-p');for(var i=0;i<data.length;i++)if(data[i].id===id)vaelg(data[i],true);});});
    slider.addEventListener('input',function(){stop();idx=+slider.value;tegn();});
    spil.addEventListener('click',afspil);
    vaelg(data[0],false);
    var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(tegn,150);});
    if(!ro&&'IntersectionObserver' in window){var set=false,io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!set){set=true;io.disconnect();afspil();}});},{threshold:.45});io.observe(svg);}
  }
  function start(){[].forEach.call(document.querySelectorAll('[data-penge]'),function(s){try{init(s);}catch(e){}});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
