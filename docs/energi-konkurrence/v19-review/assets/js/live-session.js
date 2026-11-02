/* One validated Azure release per page. No embedded snapshot is a live fallback. */
(function () {
  'use strict';
  const BASE='https://ndigrafdatab5174313.blob.core.windows.net/graph/';
  const ROOT=new URL('../../',document.currentScript.src).href;
  const originalFetch=window.fetch.bind(window);
  document.documentElement.classList.add('ndi-live-loading');
  const names=['data.json','highs.json','insights.json','nav-evidence.json','geography.json','fund-documents.json','annual-evidence.json'];
  async function json(url,timeout=15000){const c=new AbortController(),t=setTimeout(()=>c.abort(),timeout);try{const r=await originalFetch(url,{cache:url.includes('/releases/')||url.includes('/holdings-history/')?'default':'no-store',signal:c.signal});if(!r.ok)throw Error('Data kunne ikke hentes');return await r.json()}finally{clearTimeout(t)}}
  const ready=(async()=>{
    const pointer=await json(BASE+'latest.json');
    if(pointer.validated!==true||!/^[a-f0-9]{64}$/.test(pointer.release)||!/^\d{4}-\d{2}-\d{2}$/.test(pointer.asOf))throw Error('Datagrundlaget er ikke valideret');
    const fundPage=/\/(widget|portfolio)\//.test(location.pathname);
    const required=fundPage?names:['data.json','highs.json','insights.json'];
    const identityTask=json(ROOT+'data/company-identities.json');
    const nasdaqTask=fundPage?json(BASE+'nasdaq/latest.json',4000).catch(()=>null):Promise.resolve(null);
    const historyTask=/\/selskaber\/spacex\.html$/.test(location.pathname)?json(BASE+'holdings-history/'+pointer.release+'.json',4000).catch(()=>null):Promise.resolve(null);
    const [values,identities,nasdaqCandidate,historyCandidate]=await Promise.all([Promise.all(required.map(n=>json(BASE+'releases/'+pointer.release+'/'+n))),identityTask,nasdaqTask,historyTask]);
    const files=Object.fromEntries(required.map((n,i)=>[n,values[i]]));
    if(['data.json','highs.json','insights.json'].some(n=>files[n].asOf!==pointer.asOf))throw Error('Data har forskellige datoer');

    let nasdaq=null;try{const n=nasdaqCandidate;if(n&&n.validated===true&&n.methodVersion==='ecb-daily-reference-v1'&&Array.isArray(n.rows)&&n.rows.every(r=>Number.isFinite(r.v)&&r.v>0))nasdaq=n}catch{}
    let holdingsHistory=null;
    // History is immutable and bound to this exact validated release, never a test archive.
    try {
      const h=historyCandidate;
      if(h.schemaVersion!==1||h.validated!==true||h.sourceRelease!==pointer.release||h.asOf!==pointer.asOf)throw Error('Historikken tilhører en anden udgave');
      for(const f of files['data.json'].funds){
        const rows=h.funds?.[f.id];
        if(!Array.isArray(rows)||!rows.length||rows.at(-1).date!==pointer.asOf)throw Error('Historikken mangler seneste dato');
        rows.forEach((r,i)=>{
          if(!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||r.date>pointer.asOf||(i&&rows[i-1].date>=r.date)||!r.weights||Object.values(r.weights).some(w=>!Number.isFinite(w)||w<0||w>100))throw Error('Ugyldig historik');
        });
        f.positions.filter(p=>p.isin&&p.weight>0).forEach(p=>{const w=rows.at(-1).weights[p.isin];if(!Number.isFinite(w)||Math.abs(w-p.weight)>0.0051)throw Error('Historik og aktuel position er forskellige')});
      }
      holdingsHistory=h;
    }catch{}
    const session={pointer,files,identities,root:ROOT,nasdaq,holdingsHistory};window.NDI_LIVE=session;return session;
  })();
  // The fund chart and portfolio keep their existing renderers, but receive the
  // same immutable release as company and theme pages.
  window.fetch=function(input,options){
    const url=new URL(typeof input==='string'?input:input.url,location.href);
    const name=url.pathname.split('/').pop();
    if(url.origin===new URL(ROOT).origin&&names.includes(name))return ready.then(s=>new Response(JSON.stringify(s.files[name]),{headers:{'Content-Type':'application/json'}}));
    return originalFetch(input,options);
  };
  window.NDI_LIVE_READY=ready;ready.catch(()=>{});
  const fmt=x=>Number(x).toLocaleString('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2});
  function fundView(s,f){
    const i=s.files['insights.json'].funds[f.id],series=f.data.filter(p=>Number.isFinite(p.total)&&p.total>0),last=series.at(-1),first=series[0];
    const before=day=>series.filter(p=>p.d<=day).at(-1);
    const periods=[['m1','1 måned'],['ytd','År til dato'],['y1','1 år'],['all','Siden start']].map(([id,navn])=>{
      const target=new Date(last.d+'T12:00:00Z');if(id==='m1')target.setUTCMonth(target.getUTCMonth()-1);if(id==='y1')target.setUTCFullYear(target.getUTCFullYear()-1);
      const day=id==='ytd'?(Number(last.d.slice(0,4))-1)+'-12-31':target.toISOString().slice(0,10);
      const base=id==='all'?first:before(day),rows=base?series.filter(p=>p.d>=base.d):[];
      const p={id,navn,fra:base?.d||null,til:last.d,afkast:base?(last.total/base.total-1)*100:null,vaerdi100000:base?100000*last.total/base.total:null,tilgaengelig:!!base,punkter:rows.map(r=>[r.d,(r.total/base.total-1)*100]),sammenligning:null,sammenligningPunkter:[]};
      if(base&&s.nasdaq){const nq=s.nasdaq.rows.filter(r=>r.d>=base.d&&r.d<=last.d);if(nq[0]?.d===base.d&&nq.at(-1)?.d===last.d){p.sammenligning=(nq.at(-1).v/nq[0].v-1)*100;p.sammenligningPunkter=nq.map(r=>[r.d,(r.v/nq[0].v-1)*100])}}
      return p;
    });
    const years=[...new Set(series.map(p=>Number(p.d.slice(0,4))))].sort((a,b)=>b-a);
    const months=[...new Set(series.map(p=>p.d.slice(0,7)))].map(month=>{const rows=series.filter(p=>p.d.startsWith(month)),end=rows.at(-1),base=series.filter(p=>p.d<month+'-01').at(-1)||first;return {maaned:month,afkast:(end.total/base.total-1)*100,delvis:month===first.d.slice(0,7)||month===s.pointer.asOf.slice(0,7)}});
    const calendar=years.map(y=>{const end=before(y+'-12-31'),base=before((y-1)+'-12-31')||first;return {aar:y,afkast:(end.total/base.total-1)*100,delvis:y===Number(first.d.slice(0,4))||y===Number(last.d.slice(0,4)),maaneder:months.filter(m=>m.maaned.startsWith(String(y)))}});
    return {skema:1,kontrakt:'v18.1',release:{id:s.pointer.release},beregnet:s.pointer.checkedAt,andelsdato:s.files['data.json'].positionsAsOf,andelsdatoTekst:s.files['data.json'].positionsAsOf.split('-').reverse().join('.'),kursdato:last.d,start:first.d,perioder:periods,aarligtSidenStart:(Date.parse(last.d)-Date.parse(first.d))>=365.25*86400000?i.cagr:null,aarTilDato:periods.find(p=>p.id==='ytd').afkast,kursPrBevis:{dato:last.d,kurs:last.price},kursserie:series.map(p=>[p.d,p.price]),udbytte:f.dividends.filter(d=>d.status==='confirmed').map(d=>({exDato:d.exDate,betalingsdato:d.paymentDate,belob:d.amount})),kalender:calendar,kalenderaar:calendar.map(y=>({aar:y.aar,afkast:y.afkast,delvis:y.delvis})),eksempeldata:false};
  }
  function adapt(s){
    window.REVIEW_FUNDS=s.files['data.json'].funds.map(f=>({id:f.short,isin:f.isin,kidUrl:f.kidUrl,u:fundView(s,f)}));
    const d=window.DAGENS_TAL;if(!d)return;
    const fund=s.files['data.json'].funds.find(f=>f.id==='pmindi');
    if(!fund)throw Error('PMINDI mangler');
    const positions=fund.positions.filter(p=>/^[A-Z]{2}[A-Z0-9]{10}$/.test(p.isin||'')&&Number.isFinite(p.weight)&&p.weight>0);
    const bySlug={};positions.forEach(p=>{const m=s.identities[p.isin];if(m)bySlug[m.slug]=p});s.bySlug=bySlug;s.fund=fund;
    const date=s.files['data.json'].positionsAsOf||s.pointer.asOf,day=date.split('-').reverse().join('.');
    if(d.spacex){
      const history=(s.holdingsHistory?.funds.pmindi||[]).filter(r=>Number.isFinite(r.weights['US84615Q1031'])).map(r=>({dato:r.date,datoTekst:r.date.split('-').reverse().join('.'),andel:r.weights['US84615Q1031']}));
      d.spacex.historik=history;d.spacex.antalMaalinger=history.length;d.spacex.antalMaaneder=new Set(history.map(r=>r.dato.slice(0,7))).size;
      d.spacex.fraDatoTekst=history[0]?.datoTekst||null;
      d.spacex.akse={...(d.spacex.akse||{}),maks:Math.max(1,Math.ceil(Math.max(0,...history.map(r=>r.andel))))};
      const previous=history.at(-2),last=history.at(-1);
      d.spacex.spring={fraDato:previous?.dato||null,fra:previous?.andel??null,til:last?.andel??null,retning:previous&&last?(last.andel>=previous.andel?'steget':'faldet'):null};
    }
    if(window.NDI_DATA)window.NDI_DATA.fondsudvikling=fundView(s,fund);
    document.querySelectorAll('.up-data-date').forEach(e=>e.textContent='Afkast til '+fund.performanceAsOf.split('-').reverse().join('.')+' · Beholdning pr. '+day);
    d.andelsdato=date;d.andelsdatoTekst=day;d.beregnet=s.pointer.checkedAt;d.beregnetTekst=s.pointer.asOf.split('-').reverse().join('.');
    d.release={id:s.pointer.release};d.fond.antalSelskaber=positions.length;d.fond.antalPositioner=positions.length;
    const list=positions.map(p=>{const m=s.identities[p.isin],old=m&&d.selskaber[m.slug];return {navn:old?.navn||p.name,slug:m?.slug||null,andel:p.weight,logo:old?.logo,tema:old?.tema||'ukendt',temaNavn:old?.temaNavn||'Endnu ikke inddelt'}}).sort((a,b)=>b.andel-a.andel);
    list.forEach((p,i)=>{p.plads=i+1;p.bar=p.andel/list[0].andel});
    const sum=a=>a.reduce((v,p)=>v+p.andel,0);
    Object.entries(d.selskaber).forEach(([slug,c])=>{const p=bySlug[slug];c.andel=p?p.weight:null;c.tidligere=!p;c.fondsPlads=p?list.findIndex(x=>x.slug===slug)+1:null;c.top10Plads=c.fondsPlads<=10?c.fondsPlads:null;c.kurs=null});
    d.temaer.forEach(t=>{t.selskaber=list.filter(c=>c.tema===t.id);t.antal=t.selskaber.length;t.andel=sum(t.selskaber);t.stoerste=t.selskaber[0]||null;t.selskaber.forEach((c,i)=>{const x=d.selskaber[c.slug];x.pladsITema=i+1;x.antalITema=t.antal})});
    d.temaer.sort((a,b)=>b.andel-a.andel).forEach((t,i)=>{t.plads=i+1;t.bar=d.temaer[0].andel?t.andel/d.temaer[0].andel:0});
    Object.values(d.grupper).forEach(g=>{g.selskaber=g.selskaber.filter(c=>bySlug[c.slug]).map(c=>({...c,andel:bySlug[c.slug].weight})).sort((a,b)=>b.andel-a.andel);g.antal=g.selskaber.length;g.andel=sum(g.selskaber);g.selskaber.forEach(c=>c.bar=g.selskaber[0]?.andel?c.andel/g.selskaber[0].andel:0)});
    d.top10={antal:Math.min(10,list.length),sum:sum(list.slice(0,10)),liste:list.slice(0,10)};d.alleSelskaber={antal:list.length,liste:list};
    d.rest.udenTema=sum(list.filter(p=>p.tema==='ukendt'));d.rest.udenTemaAntal=list.filter(p=>p.tema==='ukendt').length;
    // Recomputed for every validated release; never silently classify a new position.
    const coverage=positions.map(p=>{const m=s.identities[p.isin],c=m&&d.selskaber[m.slug];return {isin:p.isin,name:p.name,slug:m?.slug||null,weight:p.weight,missing:[!m&&'identity',(!m||!window.NDI_DATA?.sider?.[m.slug])&&'page',(!c||c.tema==='ukendt'||!c.tema)&&'theme',!c?.logo&&'logo'].filter(Boolean)}});
    window.NDI_COVERAGE={release:s.pointer.release,asOf:date,companies:coverage,pending:coverage.filter(p=>p.missing.length)};
    document.dispatchEvent(new CustomEvent('ndi:coverage',{detail:window.NDI_COVERAGE}));
    if(d.rest.udenTemaAntal&&document.querySelector('.photo-theme-grid')){
      const note=document.createElement('p');note.className='lille ndi-coverage-note';note.textContent=d.rest.udenTemaAntal+' positioner er endnu ikke fordelt på temaer. De indgår fortsat i positionslisten. ';
      const link=document.createElement('a');link.href=new URL('portfolio/index.html#portfolio',ROOT).href;link.textContent='Se alle positioner';note.append(link);document.querySelector('.photo-theme-grid').after(note);
    }

    const p=window.NDI_DATA?.portefolje;
    if(p){p.release=d.release;p.andelsdato=date;p.andelsdatoTekst=day;p.eksempeldata=false;p.kursdato=fund.performanceAsOf;p.beholdning.antalPositioner=list.length;p.beholdning.top10=d.top10.liste;p.beholdning.top10Sum=d.top10.sum;p.beholdning.positioner=positions.map(x=>({navn:s.identities[x.isin]?.navn||x.name,isin:x.isin,slug:s.identities[x.isin]?.slug,andel:x.weight,valuta:x.listingCurrency,sektor:x.sector}));p.vaerdikaede?.forEach(g=>{g.selskaber=g.selskaber.filter(c=>bySlug[c.slug]).map(c=>({...c,andel:bySlug[c.slug].weight}));g.antal=g.selskaber.length;g.andel=sum(g.selskaber)})}
    // Interactive chain datasets are editorial classifications; weights are live.
    const ck=document.getElementById('ck-data');if(ck){const stages=JSON.parse(ck.textContent);stages.forEach(t=>{t.selskaber=t.selskaber.filter(c=>list.some(p=>p.navn.toLowerCase()===c.navn.toLowerCase()));t.selskaber.forEach(c=>{const p=list.find(p=>p.navn.toLowerCase()===c.navn.toLowerCase());c.andel=p.andel});t.selskaber.sort((a,b)=>b.andel-a.andel)});ck.textContent=JSON.stringify(stages)}
    document.querySelectorAll('[data-n][data-w]').forEach(e=>{const n=e.dataset.n==='Sumitomo Electric'?'Sumitomo Electric Industries':e.dataset.n;const p=list.find(p=>p.navn.toLowerCase()===n.toLowerCase());e.dataset.w=p?fmt(p.andel)+' %':'Ikke i den aktuelle beholdning'});
    document.querySelectorAll('.cf-company').forEach(e=>{const slug=e.getAttribute('href')?.split('/').pop().replace('.html','');const p=bySlug[slug];const w=e.querySelector('.cf-weight');if(w)w.textContent=p?fmt(p.weight)+' %':'Ikke i den aktuelle beholdning'});
    // Keep the company finder in live weight order before its pagination starts.
    document.querySelectorAll('.cf-results').forEach(ul=>{
      const rows=[...ul.children],slugOf=row=>row.querySelector('.cf-company')?.getAttribute('href')?.split('/').pop().replace('.html','');
      rows.sort((a,b)=>(bySlug[slugOf(b)]?.weight||0)-(bySlug[slugOf(a)]?.weight||0));
      rows.forEach(row=>{
        const slug=slugOf(row),logo=d.selskaber[slug]?.logo,box=row.querySelector('.cf-logo');
        if(box&&logo){const img=document.createElement('img');img.src=new URL(logo,ROOT).href;img.alt='';img.width=32;img.height=32;img.loading='lazy';img.style.objectFit='contain';box.replaceChildren(img)}
        ul.appendChild(row);
      });
    });
    // Keep literal date captions in step with their existing data bindings.
    document.querySelectorAll('[data-tal="andelsdatoTekst"]').forEach(e=>e.textContent=day);
  }
  window.NDI_ADAPT_LIVE=adapt;
  let moduleNumber=0;
  function script(node){return new Promise((resolve,reject)=>{
    const e=document.createElement('script'),src=node.dataset.ndiSrc;
    let timer,eventName;
    const done=()=>{clearTimeout(timer);if(eventName)document.removeEventListener(eventName,done);resolve()};
    const fail=()=>{clearTimeout(timer);if(eventName)document.removeEventListener(eventName,done);reject(Error('Siden kunne ikke indlæses'))};
    if(node.dataset.ndiType)e.type=node.dataset.ndiType;
    if(src){e.src=src;e.onload=done;e.onerror=fail;timer=setTimeout(fail,20000)}
    else {e.textContent=node.textContent;if(e.type==='module'){
      eventName='ndi-inline-module-'+(++moduleNumber);document.addEventListener(eventName,done,{once:true});
      e.textContent+='\ndocument.dispatchEvent(new Event('+JSON.stringify(eventName)+'));';e.onerror=fail;timer=setTimeout(fail,20000);
    }}
    document.body.append(e);if(!src&&e.type!=='module')done();
  })}
  async function start(){
    const queue=[...document.querySelectorAll('script[type="application/ndi-script"]')];
    const loading=document.createElement('p');loading.className='ndi-loading-status';loading.setAttribute('role','status');loading.textContent='Henter fondens opdaterede data …';document.body.prepend(loading);
    try{
      const session=await ready;
      const metadata=node=>/(^|\/)data\//.test(node.dataset.ndiSrc||'')||(node.dataset.ndiSrc||'').includes('/valg.js');
      const skip=node=>/market-supplement\.js|data\/review-funds\.js|data\/kurs\/|assets\/js\/kursgraf\.js/.test(node.dataset.ndiSrc||'');
      // Inline diagrams can precede data tags in the document. Load all editorial
      // metadata first and replace its numeric snapshots before any renderer runs.
      for(const node of queue.filter(metadata))if(!skip(node))await script(node);
      adapt(session);
      for(const node of queue.filter(n=>!metadata(n)))if(!skip(node))await script(node);
      await script({dataset:{ndiSrc:ROOT+'assets/js/live-theme-values.js'},textContent:''});
      loading.remove();document.documentElement.dataset.liveRelease=session.pointer.release;
      document.documentElement.classList.remove('ndi-live-loading');
      document.dispatchEvent(new CustomEvent('ndi:live',{detail:session}));
      setInterval(async()=>{if(document.hidden)return;try{const p=await json(BASE+'latest.json');if(p.validated&&p.release!==session.pointer.release){location.reload();return}if(!session.holdingsHistory&&document.getElementById('andel-historie')){const h=await json(BASE+'holdings-history/'+session.pointer.release+'.json');if(h.validated===true&&h.sourceRelease===session.pointer.release&&h.asOf===session.pointer.asOf)location.reload()}}catch{}},300000);
    }catch(error){
      loading.remove();
      document.documentElement.classList.remove('ndi-live-loading');document.documentElement.classList.add('ndi-live-failed');
      document.querySelectorAll('[data-tal],.cf-weight,[data-w]').forEach(e=>{if(e.hasAttribute('data-w'))e.dataset.w='Data kunne ikke hentes';else e.textContent='—'});
      const note=document.createElement('p');note.className='ndi-live-error';note.setAttribute('role','alert');note.textContent='De aktuelle data kunne ikke hentes fra Azure. Genindlæs siden for at prøve igen. Der vises ikke gemte kurser som aktuelle tal.';
      const retry=document.createElement('button');retry.type='button';retry.className='knap';retry.textContent='Prøv igen';retry.addEventListener('click',()=>location.reload());note.append(document.createElement('br'),retry);
      const main=document.querySelector('main')||document.body;main.prepend(note);
      // On company pages, retain only the editorial explanation and its sources.
      // No snapshot charts, holdings or cached numeric cards are revealed.
      if(/\/selskaber\//.test(location.pathname)){
        const fallback=document.createElement('section');fallback.className='ndi-live-error ndi-editorial-fallback';
        const intro=document.querySelector('#hvad .v18s-tekst'),sources=document.querySelector('#kilder .kildeblok-liste');
        const heading=document.createElement('h1');heading.textContent=document.title.split('·')[0].trim();fallback.append(heading);
        [intro,sources].filter(Boolean).forEach(source=>{const copy=source.cloneNode(true);copy.querySelectorAll('[data-tal]').forEach(e=>e.textContent='—');copy.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));copy.querySelectorAll('a[href="#kilder"]').forEach(e=>e.href='#ndi-error-sources');if(source===sources)copy.id='ndi-error-sources';fallback.append(copy)});
        if(intro)main.append(fallback);
      }
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
