/* Byg en chip lag på lag: hold knappen nede, og skiven går gennem de fire trin igen og igen. Bruges af [data-lag]. */
(function(){
  var NS='http://www.w3.org/2000/svg',LAG=5,TRIN=4,MS=650,Y0=250,H=34;
  function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
  function segs(i){var r=[],x=56;while(x<540){var w=24+((i*37+x*13)%46);if(x+w>548)w=548-x;if(w>12)r.push([x,w]);x+=w+18+((i*17+x*7)%34);}return r;}
  function init(sec){
    var svg=sec.querySelector('.lg-svg'),g=svg.querySelector('.lg-dyn'),knap=sec.querySelector('.lg-knap'),ring=sec.querySelector('.lg-ring-p');
    var nu=sec.querySelector('.lg-nu'),trin=[].slice.call(sec.querySelectorAll('.lg-trin')),taeller=sec.querySelector('[data-lg-n]'),slut=sec.querySelector('.lg-slut'),start=sec.querySelector('.lg-start');
    var ro=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    var t=0,holder=false,sidst=0,TOT=LAG*TRIN;
    function tegn(){
      while(g.firstChild)g.removeChild(g.firstChild);
      var n=Math.min(LAG,Math.floor(t/TRIN)),s=Math.floor(t%TRIN),p=t%1,faerdig=t>=TOT;
      for(var i=0;i<n;i++){var y=Y0-(i+1)*H;g.appendChild(el('rect',{x:40,y:y,width:520,height:H-2,fill:i%2?'#33465f':'#2c3e55'}));
        segs(i).forEach(function(q){g.appendChild(el('rect',{x:q[0],y:y+7,width:q[1],height:H-14,rx:2,fill:i%2?'#e08a5a':'#d9a400'}));});}
      if(!faerdig){var y=Y0-(n+1)*H,S=segs(n);
        if(s===0){var hh=(H-2)*p;g.appendChild(el('rect',{x:40,y:y+(H-2)-hh,width:520,height:hh,fill:'#8fb3d9'}));}
        else{g.appendChild(el('rect',{x:40,y:y,width:520,height:H-2,fill:'#8fb3d9'}));}
        if(s===1){g.appendChild(el('rect',{x:40,y:36,width:520,height:14,fill:'#1b2533'}));
          S.forEach(function(q){g.appendChild(el('rect',{x:q[0],y:36,width:q[1],height:14,fill:'#0b1220'}));
            g.appendChild(el('polygon',{points:q[0]+',50 '+(q[0]+q[1])+',50 '+(q[0]+q[1])+','+y+' '+q[0]+','+y,fill:'#ffe08a',opacity:(.15+.35*p).toFixed(2)}));
            g.appendChild(el('rect',{x:q[0],y:y,width:q[1],height:H-2,fill:'#ffe08a',opacity:p.toFixed(2)}));});
          g.appendChild(el('rect',{x:40,y:20,width:520,height:10,rx:3,fill:'#ffe08a',opacity:.8}));}
        if(s===2){S.forEach(function(q){g.appendChild(el('rect',{x:q[0],y:y,width:q[1],height:H-2,fill:'#ffe08a',opacity:(1-p).toFixed(2)}));
            g.appendChild(el('rect',{x:q[0],y:y,width:q[1],height:(H-2)*p,fill:'#0e1622'}));});}
        if(s===3){var sx=40+520*p;S.forEach(function(q){g.appendChild(el('rect',{x:q[0],y:y,width:q[1],height:H-2,fill:'#0e1622'}));
            var w=Math.max(0,Math.min(q[1],sx-q[0]));if(w>0)g.appendChild(el('rect',{x:q[0],y:y+7,width:w,height:H-14,rx:2,fill:n%2?'#e08a5a':'#d9a400'}));});
          g.appendChild(el('rect',{x:sx-2,y:y-14,width:4,height:H+14,fill:'#4fc79c'}));}
      }
      taeller.textContent=Math.min(LAG,n+(faerdig?0:1));
      trin.forEach(function(li,k){var a=!faerdig&&k===s&&(t>0||holder);li.classList.toggle('er-aktiv',a);li.style.setProperty('--p',a?p.toFixed(3):0);});
      var aktivt=trin[s];nu.textContent=faerdig?'Skiven er færdig.':(t>0||holder?'Trin '+(s+1)+' af 4: '+aktivt.querySelector('b').textContent:'Tryk og hold på knappen.');
      ring.style.strokeDashoffset=(1-t/TOT)*100;
      slut.hidden=!faerdig;start.hidden=t>0;
      knap.querySelector('.lg-knap-t').textContent=faerdig?'Byg igen':(ro?'Tryk for næste trin':(t>0?'Hold nede for at bygge videre':'Hold nede for at bygge'));
      sec.classList.toggle('lg--faerdig',faerdig);
    }
    function loop(ts){if(!holder)return;var dt=sidst?ts-sidst:0;sidst=ts;t=Math.min(TOT,t+dt/MS);tegn();if(t<TOT)requestAnimationFrame(loop);else holder=false;}
    function ned(e){if(e)e.preventDefault();if(t>=TOT){t=0;tegn();return;}
      if(ro){t=Math.min(TOT,Math.floor(t)+1);tegn();return;}
      if(holder)return;holder=true;sidst=0;knap.classList.add('er-holdt');requestAnimationFrame(loop);}
    function op(){holder=false;knap.classList.remove('er-holdt');tegn();}
    knap.addEventListener('pointerdown',function(e){try{knap.setPointerCapture(e.pointerId);}catch(x){}ned(e);});
    knap.addEventListener('pointerup',op);knap.addEventListener('pointercancel',op);knap.addEventListener('lostpointercapture',op);
    knap.addEventListener('keydown',function(e){if((e.key===' '||e.key==='Enter')&&!e.repeat)ned(e);});
    knap.addEventListener('keyup',function(e){if(e.key===' '||e.key==='Enter')op();});
    knap.addEventListener('contextmenu',function(e){e.preventDefault();});
    tegn();
  }
  function go(){document.querySelectorAll('[data-lag]').forEach(init);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
