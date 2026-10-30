(function(){
 const base=new URL('../',document.currentScript.src);const original=window.fetch.bind(window);
 const valid=d=>d && d.skema===1 && d.grafV2?.pointer?.validated;
 const ready=valid(window.DAGENS_TAL)?Promise.resolve(window.DAGENS_TAL):original(new URL('data/dagens-tal.json',base),{cache:'no-cache',signal:AbortSignal.timeout(15000)}).then(r=>{if(!r.ok)throw Error('data');return r.json()});
 window.NDI_V6_READY=ready.then(d=>{if(!valid(d))throw Error('Ugyldig grafleverance');window.DAGENS_TAL=d;return d;});
 window.fetch=async(input,options)=>{const u=new URL(typeof input==='string'?input:input.url,location.href);if(u.origin===location.origin&&u.pathname.endsWith('.json')){const d=await window.NDI_V6_READY;const name=u.pathname.split('/').pop();if(!Object.hasOwn(d.grafV2.files,name))throw Error('Datakilde mangler: '+name);return new Response(JSON.stringify(d.grafV2.files[name]),{headers:{'Content-Type':'application/json'}});}return original(input,options);};
 window.NDI_V6_READY.catch(()=>{const show=()=>{document.body.innerHTML='<main style="padding:3rem;max-width:60rem;margin:auto"><h1>Grafen er ikke tilgængelig lige nu</h1><p role="alert">Grafens tal kunne ikke hentes. Prøv at genindlæse siden.</p><a href="fordeling.html" target="_top">Gå til dashboardet</a></main>';};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',show);else show();});
})();
