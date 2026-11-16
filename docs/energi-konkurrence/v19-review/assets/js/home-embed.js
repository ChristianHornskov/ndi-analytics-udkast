/* The homepage shows the accepted widget; deeper pages open at a shareable Wix URL. */
(()=>{'use strict';
 if(new URLSearchParams(location.search).get('embed')!=='home'||parent===window)return;
 const wix='https://www.newdealinvest.dk',root=new URL('../../',document.currentScript.src);
 let last=0,queued=false;
 function measure(){queued=false;const height=Math.ceil(document.documentElement.scrollHeight);if(height!==last){last=height;parent.postMessage({type:'ndi-home-height',height},wix)}}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(measure)}}
 new ResizeObserver(schedule).observe(document.documentElement);
 addEventListener('load',schedule);document.fonts.ready.then(schedule);
 addEventListener('message',e=>{if(e.source===parent&&e.origin===wix&&e.data?.type==='ndi-home-measure'){last=0;schedule()}});
 document.addEventListener('click',e=>{
  const a=e.target.closest?.('a[href]');if(!a||a.hasAttribute('download'))return;
  const u=new URL(a.href,location.href);if(u.origin!==root.origin||!u.pathname.startsWith(root.pathname)||u.pathname===location.pathname)return;
  const path=u.pathname.slice(root.pathname.length);
  if(!/^(?:(?:widget|portfolio)\/index|tech|index|alle-selskaber|fondens-udvikling|(?:temaer|selskaber)\/[a-z0-9-]+)\.html$/.test(path))return;
  const url=new URL('/graf-review',wix);if(path!=='widget/index.html')url.searchParams.set('side',path==='portfolio/index.html'?'portfolio':path.replace(/\.html$/,''));url.hash=u.hash;
  a.href=url.href;a.target='_top';
 },true);
 schedule();
})();
