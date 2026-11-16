/* One verified Azure snapshot per page load. Historical figures are independent of the page release. */
(function () {
  'use strict';
  const BASE='https://ndigrafdatab5174313.blob.core.windows.net/graph/company-keyfigures-v1/';
  async function bytes(url,cache){
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);
    try{const r=await fetch(url,{cache,signal:controller.signal,credentials:'omit',redirect:'error'});
      if(!r.ok)throw new Error('Company figures unavailable');
      const b=await r.arrayBuffer();if(b.byteLength>2000000)throw new Error('Oversized company figures');return b;
    }finally{clearTimeout(timer)}
  }
  const decode=b=>JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(b));
  function valid(n){
    const number=v=>typeof v==='number'&&Number.isFinite(v);
    const date=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v))&&v<=new Date().toISOString().slice(0,10);
    const clean=v=>typeof v==='string'?!/[<>]/.test(v):v&&typeof v==='object'?Object.values(v).every(clean):true;
    if(!n||n.skema!==2||!clean(n)||!date(n.hentet)||!Array.isArray(n.aar)||!n.aar.length||!n.aktie||!n.ttm||!n.kvartal)return false;
    if(!/^[A-Z]{3}$/.test(n.valuta)||typeof n.kilde!=='string'||typeof n.navn!=='string')return false;
    try{const u=new URL(n.kildeUrl);if(u.protocol!=='https:'||u.username||u.password)return false}catch(e){return false}
    if(!n.aar.concat([n.ttm]).every(r=>date(r.til)&&number(r.omsaetning)&&r.omsaetning>=0&&number(r.resultat)))return false;
    const k=n.kvartal;
    return date(k.til)&&number(k.omsaetning)&&number(k.sammeKvartalAaretFoer)&&k.sammeKvartalAaretFoer>=0&&
      (n.adsForhold==null||(number(n.adsForhold)&&n.adsForhold>0));
  }
  window.NDI_KEYFIGURES_READY=(async()=>{
    const p=decode(await bytes(BASE+'latest.json','no-store'));
    if(p.schemaVersion!==1||p.complete!==true||!(/^[a-f0-9]{64}$/).test(p.release))throw new Error('Invalid figures pointer');
    const raw=await bytes(BASE+'releases/'+p.release+'.json','default');
    const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',raw)),x=>x.toString(16).padStart(2,'0')).join('');
    if(hash!==p.release)throw new Error('Figures hash mismatch');
    const d=decode(raw);if(d.schemaVersion!==1||!d.companies||Object.keys(d.companies).length!==p.companies)throw new Error('Incomplete figures');
    const result=Object.create(null);
    for(const [slug,c] of Object.entries(d.companies)){
      if(!/^[a-z0-9-]+$/.test(slug)||!Array.isArray(c.isins)||!c.isins.length||!c.isins.every(i=>/^[A-Z]{2}[A-Z0-9]{10}$/.test(i))||!valid(c.figures))throw new Error('Invalid company figures');
      result[slug]=c.figures;
    }
    return result;
  })().catch(()=>null);
})();
