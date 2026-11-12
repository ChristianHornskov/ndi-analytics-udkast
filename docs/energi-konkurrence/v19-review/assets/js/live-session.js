/* One validated Azure release per page. No embedded snapshot is a live fallback. */
(function () {
  'use strict';
  const BASE='https://ndigrafdatab5174313.blob.core.windows.net/graph/review-data-v1/';
  const GRAPH='https://ndigrafdatab5174313.blob.core.windows.net/graph/';
  const ROOT=new URL('../../',document.currentScript.src).href;
  const navigation=document.createElement('script');navigation.src=ROOT+'assets/js/review-navigation.js';document.head.append(navigation);
  const originalFetch=window.fetch.bind(window);
  document.documentElement.classList.add('ndi-live-loading');
  const names=['data.json','highs.json','insights.json','nav-evidence.json','geography.json','fund-documents.json','annual-evidence.json'];
  async function json(url,timeout=15000,expectedHash){
    const c=new AbortController(),t=setTimeout(()=>c.abort(),timeout);
    try{
      const r=await originalFetch(url,{cache:url.includes('/releases/')||url.includes('/holdings-history/')?'default':'no-store',signal:c.signal});
      if(!r.ok)throw Error('Data kunne ikke hentes');
      const raw=await r.arrayBuffer();
      if(expectedHash){
        const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',raw)),b=>b.toString(16).padStart(2,'0')).join('');
        if(digest!==expectedHash)throw Error('Data svarer ikke til den validerede udgave');
      }
      return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw));
    }finally{clearTimeout(t)}
  }
  async function verifiedJson(url,expectedHash,timeout=15000){
    if(!/^[a-f0-9]{64}$/.test(expectedHash||''))throw Error('Filens kontrolsum mangler');
    return json(url,timeout,expectedHash);
  }
  window.NDI_READ_VERIFIED_JSON=verifiedJson;
  const ready=(async()=>{
    const pointer=await json(BASE+'latest.json');
    if(pointer.complete!==true||pointer.validated!==true||!/^[a-f0-9]{64}$/.test(pointer.release)||!/^\d{4}-\d{2}-\d{2}$/.test(pointer.asOf))throw Error('Datagrundlaget er ikke valideret');
    const fundPage=/\/(widget|portfolio)\//.test(location.pathname);
    const required=fundPage?names:['data.json','highs.json','insights.json'];
    const identityTask=json(ROOT+'data/company-identities.json');
    const nasdaqTask=fundPage?json(GRAPH+'nasdaq/latest.json',4000).catch(()=>null):Promise.resolve(null);
    const historyTask=/\/selskaber\/spacex\.html$/.test(location.pathname)?verifiedJson(BASE+'releases/'+pointer.release+'/holdings-history.json',pointer.files?.['holdings-history.json'],4000).catch(()=>null):Promise.resolve(null);
    const fundamentalsTask=/\/selskaber\/(spacex|applovin|babcock-wilcox|carvana|cerebras-systems|sea|soundhound-ai|t1-energy|tesla|tower-semiconductor)\.html$/.test(location.pathname)?(async()=>{const p=await json(GRAPH+'company-fundamentals-v1/latest.json',4000);if(p.validated!==true||!/^[a-f0-9]{64}$/.test(p.release))return null;const d=await verifiedJson(GRAPH+'company-fundamentals-v1/releases/'+p.release+'.json',p.release,4000);return d.schema_version===1&&d.validated===true?d:null})().catch(()=>null):Promise.resolve(null);
    const [values,identities,nasdaqCandidate,historyCandidate,fundamentals]=await Promise.all([Promise.all(required.map(n=>verifiedJson(BASE+'releases/'+pointer.release+'/'+n,pointer.files?.[n]))),identityTask,nasdaqTask,historyTask,fundamentalsTask]);
    const files=Object.fromEntries(required.map((n,i)=>[n,values[i]]));
    if(['data.json','highs.json','insights.json'].some(n=>files[n].asOf!==pointer.asOf))throw Error('Data har forskellige datoer');

    let nasdaq=null;try{const n=nasdaqCandidate;if(n&&n.validated===true&&n.methodVersion==='ecb-daily-reference-v1'&&Array.isArray(n.rows)&&n.rows.every(r=>Number.isFinite(r.v)&&r.v>0))nasdaq=n}catch{}
    let holdingsHistory=null;
    // History is immutable and bound to this exact validated release, never a test archive.
    try {
      const h=historyCandidate;
      if(h.schemaVersion!==1||h.validated!==true||h.sourceRelease!==pointer.sourceRelease||h.asOf!==pointer.asOf)throw Error('Historikken tilhører en anden udgave');
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
    if(required.some(n=>files[n].sourceRelease!==pointer.sourceRelease))throw Error('Data tilhører forskellige udgaver');
    const session={pointer,files,identities,root:ROOT,nasdaq,holdingsHistory,fundamentals,dataBase:BASE};window.NDI_LIVE=session;return session;
  })();
  // The fund chart and portfolio keep their existing renderers, but receive the
  // same immutable release as company and theme pages.
  window.NDI_FETCH=function(input,options){
    const url=new URL(typeof input==='string'?input:input.url,location.href);
    const name=url.pathname.split('/').pop();
    if(url.origin===new URL(ROOT).origin&&names.includes(name))return ready.then(s=>new Response(JSON.stringify(s.files[name]),{headers:{'Content-Type':'application/json'}}));
    return originalFetch(input,options);
  };
  window.NDI_LIVE_READY=ready;ready.catch(()=>{});
  const fmt=x=>Number(x).toLocaleString('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2});
  /* Graf-review 10.11 punkt 5: andele med én decimal. */
  const fmtA=x=>{x=Number(x);return x!==0&&Math.abs(x)<0.05?'under 0,1':x.toLocaleString('da-DK',{minimumFractionDigits:1,maximumFractionDigits:1})};
  function spacexReports(company){
    if(!company||company.currency!=='USD'||company.unit!=='million'||!Array.isArray(company.periods)||company.segments?.length!==3)return null;
    // The surrounding article explicitly discusses these periods. A new report
    // must not silently replace them while leaving the old dates in its prose.
    const q2=company.periods.find(p=>p.id==='2026-Q2'),q3=company.periods.find(p=>p.id==='2026-Q3'),prior=company.periods.find(p=>p.id==='2025-Q3');
    const fields=['revenue','operating_income','capex'];
    if(![q2,q3,prior].every(p=>p&&p.length_months===3&&/^https:\/\/www\.sec\.gov\/Archives\/edgar\/data\/1181412\//.test(p.source_url)))return null;
    if(![q2,q3].every(p=>fields.every(k=>Array.isArray(p[k])&&p[k].length===3&&p[k].every(Number.isFinite)))||prior.revenue?.length!==3||!prior.revenue.every(Number.isFinite))return null;
    const sum=a=>a.reduce((n,v)=>n+v,0),billion=v=>fmt(v/1000),total=sum(q3.revenue),previous=sum(prior.revenue);
    if(total<=0||previous<=0||sum(q3.capex)<=0||[...q2.revenue,...q3.revenue,...prior.revenue,...q2.capex,...q3.capex].some(v=>v<0))return null;
    const ceiling=Math.ceil(Math.max(sum(q2.revenue),sum(q3.revenue),sum(q2.capex),sum(q3.capex))/5000)*5;
    let offset=0;
    const drawing=q3.revenue.map((v,nr)=>{const x={nr,start:offset,bue:v/total};offset+=x.bue;return x});
    const quarters=[q2,q3].map((p,i)=>({id:i?'q3':'q2',kort:i?'3. kvt.':'2. kvt.',navn:(i?'3.':'2.')+' kvt. 2026',periode:i?'juli til september':'april til juni',omsaetning:p.revenue,drift:p.operating_income,anlaeg:p.capex}));
    return {chart:{skema:1,kontrakt:'v18.1',segmenter:company.segments,kvartaler:quarters,kilde:'SpaceX 10-Q, note om segmenter. Mio. USD.'},
      sec:{kpi:{drift:billion(sum(q3.operating_income)),driftForrige:billion(sum(q2.operating_income)),investering:billion(sum(q3.capex)),aiInvestering:billion(q3.capex[2]),aiAndel:Math.round(q3.capex[2]/sum(q3.capex)*100),aiBredde:q3.capex[2]/sum(q3.capex)*100},
        tabel:[q3,q2].map(p=>({drift:[...p.operating_income,sum(p.operating_income)].map(billion),investering:[...p.capex,sum(p.capex)].map(billion)})),
        donut:{total:billion(total),totalSidsteAar:billion(previous),dele:q3.revenue.map((v,i)=>({q3:billion(v),q3sidsteAar:billion(prior.revenue[i])})),tegneorden:drawing},
        kvartaler:[q2,q3].map((p,i)=>({id:i?'q3':'q2',kort:i?'3. kvt.':'2. kvt.',omsaetning:billion(sum(p.revenue)),anlaeg:billion(sum(p.capex)),bredde:{omsaetning:sum(p.revenue)/1000/ceiling,anlaeg:sum(p.capex)/1000/ceiling}})),
        akse:{trin:Array.from({length:5},(_,i)=>ceiling*i/4)}}};
  }
  function comparisonDate(day,period){
    const date=new Date(day+'T12:00:00Z'),wanted=date.getUTCDate();
    date.setUTCDate(1);
    if(period==='m1')date.setUTCMonth(date.getUTCMonth()-1);
    if(period==='y1')date.setUTCFullYear(date.getUTCFullYear()-1);
    const last=new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,0)).getUTCDate();
    date.setUTCDate(Math.min(wanted,last));
    return date.toISOString().slice(0,10);
  }
  function fundView(s,f){
    const i=s.files['insights.json'].funds[f.id],series=f.data.filter(p=>Number.isFinite(p.total)&&p.total>0),last=series.at(-1),first=series[0];
    const before=day=>series.filter(p=>p.d<=day).at(-1);
    const periods=[['m1','1 måned'],['ytd','År til dato'],['y1','1 år'],['all','Siden start']].map(([id,navn])=>{
      const day=id==='ytd'?(Number(last.d.slice(0,4))-1)+'-12-31':comparisonDate(last.d,id);
      const base=id==='all'?first:before(day),rows=base?series.filter(p=>p.d>=base.d):[];
      const p={id,navn,fra:base?.d||null,til:last.d,afkast:base?(last.total/base.total-1)*100:null,vaerdi100000:base?100000*last.total/base.total:null,tilgaengelig:!!base,punkter:rows.map(r=>[r.d,(r.total/base.total-1)*100]),sammenligning:null,sammenligningPunkter:[]};
      if(base&&s.nasdaq){const nq=s.nasdaq.rows.filter(r=>r.d>=base.d&&r.d<=last.d);if(nq[0]?.d===base.d&&nq.at(-1)?.d===last.d){p.sammenligning=(nq.at(-1).v/nq[0].v-1)*100;p.sammenligningPunkter=nq.map(r=>[r.d,(r.v/nq[0].v-1)*100])}}
      return p;
    });
    const years=[...new Set(series.map(p=>Number(p.d.slice(0,4))))].sort((a,b)=>b-a);
    const months=[...new Set(series.map(p=>p.d.slice(0,7)))].map(month=>{const rows=series.filter(p=>p.d.startsWith(month)),end=rows.at(-1),base=series.filter(p=>p.d<month+'-01').at(-1)||first;return {maaned:month,afkast:(end.total/base.total-1)*100,delvis:month===first.d.slice(0,7)||month===last.d.slice(0,7)&&!(i.monthly||[]).find(m=>(m.month||m.maaned)===month)?.complete}});
    const calendar=years.map(y=>{const end=before(y+'-12-31'),base=before((y-1)+'-12-31')||first;return {aar:y,afkast:(end.total/base.total-1)*100,delvis:y===Number(first.d.slice(0,4))||y===Number(last.d.slice(0,4)),maaneder:months.filter(m=>m.maaned.startsWith(String(y)))}});
    return {skema:1,kontrakt:'v18.1',release:{id:s.pointer.release},beregnet:s.pointer.checkedAt,andelsdato:s.files['data.json'].positionsAsOf,andelsdatoTekst:s.files['data.json'].positionsAsOf.split('-').reverse().join('.'),kursdato:last.d,start:first.d,perioder:periods,aarligtSidenStart:(Date.parse(last.d)-Date.parse(first.d))>=365.25*86400000?i.cagr:null,aarTilDato:periods.find(p=>p.id==='ytd').afkast,kursPrBevis:{dato:last.d,kurs:last.price},kursserie:series.map(p=>[p.d,p.price]),udbytte:f.dividends.filter(d=>d.status==='confirmed').map(d=>({exDato:d.exDate,betalingsdato:d.paymentDate,belob:d.amount})),kalender:calendar,kalenderaar:calendar.map(y=>({aar:y.aar,afkast:y.afkast,delvis:y.delvis})),eksempeldata:false};
  }
  function holdingIndex(positions,identities){
    const result={};
    positions.forEach(p=>{
      const slug=identities[p.isin]?.slug;if(!slug)return;
      const old=result[slug];
      const holdings=old?[...old.holdings,p]:[p];
      // Company exposure is summed; price/ISIN stay attached to the largest listing.
      const representative=holdings.reduce((a,b)=>a.weight>=b.weight?a:b);
      result[slug]={...representative,weight:holdings.reduce((n,x)=>n+x.weight,0),holdings};
    });
    return result;
  }
  function companyThemes(meta,identity){
    return [...new Set([meta?.tema||identity?.tema,...(Array.isArray(meta?.temaer)?meta.temaer:[]),...(Array.isArray(identity?.temaer)?identity.temaer:[])].filter(t=>typeof t==='string'&&t&&t!=='ukendt'))];
  }
  function adapt(s){
    window.REVIEW_FUNDS=s.files['data.json'].funds.map(f=>({id:f.short,isin:f.isin,kidUrl:f.kidUrl,u:fundView(s,f)}));
    const d=window.DAGENS_TAL;if(!d)return;
    const fund=s.files['data.json'].funds.find(f=>f.id==='pmindi');
    if(!fund)throw Error('PMINDI mangler');
    const positions=fund.positions.filter(p=>/^[A-Z]{2}[A-Z0-9]{10}$/.test(p.isin||'')&&Number.isFinite(p.weight)&&p.weight>0);
    // A-F03: "tidligere i fonden" kræver positiv dokumentation, ikke blot et manglende identitetsopslag.
    // Dokumenteret: redaktionens liste over tidligere positioner, eller et selskab, som redaktionen havde som aktuelt,
    // og som nu mangler i en beholdning, hvor alle positioner har en kendt identitet.
    const documentedPrevious=new Set((d.tidligere?.alle||[]).map(c=>c.slug).filter(Boolean));
    const documentedCurrent=new Set(Object.entries(d.selskaber).filter(([,c])=>c&&c.tidligere===false).map(([slug])=>slug));
    Object.values(s.identities).forEach(m=>{if(!d.selskaber[m.slug])d.selskaber[m.slug]={navn:m.navn,slug:m.slug,tema:m.tema||'ukendt',andel:null,tidligere:false}});
    const bySlug=holdingIndex(positions,s.identities);s.bySlug=bySlug;s.fund=fund;
    const heldIsin=new Map(positions.map(p=>[p.isin,p]));
    const unidentified=positions.filter(p=>!s.identities[p.isin]).length;
    const statusOf=slug=>bySlug[slug]?'aktuel':documentedPrevious.has(slug)?'tidligere':documentedCurrent.has(slug)&&!unidentified?'tidligere':'ukendt';
    s.holdingStatus=statusOf;
    const date=s.files['data.json'].positionsAsOf||s.pointer.asOf,day=date.split('-').reverse().join('.');
    if(d.spacex){
      const reports=spacexReports(s.fundamentals?.companies?.US84615Q1031);
      delete d.spacex.sec;
      if(window.NDI_DATA)window.NDI_DATA.regnskab=reports?.chart||null;
      if(reports)d.spacex.sec=reports.sec;
      const history=(s.holdingsHistory?.funds.pmindi||[]).filter(r=>Number.isFinite(r.weights['US84615Q1031'])).map(r=>({dato:r.date,datoTekst:r.date.split('-').reverse().join('.'),andel:r.weights['US84615Q1031']}));
      d.spacex.historik=history;d.spacex.antalMaalinger=history.length;d.spacex.antalMaaneder=new Set(history.map(r=>r.dato.slice(0,7))).size;
      d.spacex.fraDatoTekst=history[0]?.datoTekst||null;
      d.spacex.sidsteRapportDatoTekst=history.at(-1)?.datoTekst||null;
      d.spacex.akse={...(d.spacex.akse||{}),maks:Math.max(1,Math.ceil(Math.max(0,...history.map(r=>r.andel))))};
      const previous=history.at(-2),last=history.at(-1);
      d.spacex.spring={fraDato:previous?.dato||null,fra:previous?.andel??null,til:last?.andel??null,retning:previous&&last?(last.andel>=previous.andel?'steget':'faldet'):null};
    }
    if(window.NDI_DATA)window.NDI_DATA.fondsudvikling=fundView(s,fund);
    document.querySelectorAll('.up-data-date').forEach(e=>e.textContent='Afkast til '+fund.performanceAsOf.split('-').reverse().join('.')+' · Beholdning pr. '+day);
    d.andelsdato=date;d.andelsdatoTekst=day;d.beregnet=s.pointer.checkedAt;d.beregnetTekst=s.pointer.asOf.split('-').reverse().join('.');
    d.release={id:s.pointer.release};d.fond.antalPositioner=positions.length;
    const companyPositions=[...Object.values(bySlug),...positions.filter(p=>!s.identities[p.isin]?.slug)];
    const list=companyPositions.map(p=>{const m=s.identities[p.isin],old=m&&d.selskaber[m.slug];return {navn:old?.navn||p.name,slug:m?.slug||null,andel:p.weight,logo:old?.logo,tema:old?.tema||m?.tema||'ukendt',temaer:companyThemes(old,m),temaNavn:old?.temaNavn||'Endnu ikke inddelt'}}).sort((a,b)=>b.andel-a.andel);
    d.fond.antalSelskaber=list.length;
    list.forEach((p,i)=>{p.plads=i+1;p.bar=p.andel/list[0].andel});
    const sum=a=>a.reduce((v,p)=>v+p.andel,0);
    Object.entries(d.selskaber).forEach(([slug,c])=>{const p=bySlug[slug];c.andel=p?p.weight:null;c.status=statusOf(slug);c.tidligere=c.status==='tidligere';c.statusUkendt=c.status==='ukendt';c.fondsPlads=p?list.findIndex(x=>x.slug===slug)+1:null;c.top10Plads=c.fondsPlads&&c.fondsPlads<=10?c.fondsPlads:null;c.pladsITema=null;c.antalITema=null;c.kurs=null});
    d.temaer.forEach(t=>{const limit=t.vist?.length||6;t.selskaber=list.filter(c=>c.temaer.includes(t.id)).map(c=>({...c}));t.selskaber.forEach(c=>c.bar=t.selskaber[0]?.andel?c.andel/t.selskaber[0].andel:0);t.vist=t.selskaber.slice(0,limit);t.oevrige=t.selskaber.slice(limit);t.oevrigeAntal=t.oevrige.length;t.antal=t.selskaber.length;t.andel=sum(t.selskaber);t.stoerste=t.selskaber[0]||null;t.selskaber.forEach((c,i)=>{const x=d.selskaber[c.slug];if(x&&c.tema===t.id){x.pladsITema=i+1;x.antalITema=t.antal}})});
    d.temaer.sort((a,b)=>b.andel-a.andel).forEach((t,i)=>{t.plads=i+1;t.bar=d.temaer[0].andel?t.andel/d.temaer[0].andel:0});
    Object.values(d.grupper).forEach(g=>{g.selskaber=g.selskaber.filter(c=>bySlug[c.slug]).map(c=>({...c,andel:bySlug[c.slug].weight})).sort((a,b)=>b.andel-a.andel);const limit=g.vis?.length||6;g.vis=g.selskaber.slice(0,limit);g.flere=g.selskaber.slice(limit);g.antalFlere=g.flere.length;g.antal=g.selskaber.length;g.andel=sum(g.selskaber);g.selskaber.forEach(c=>c.bar=g.selskaber[0]?.andel?c.andel/g.selskaber[0].andel:0)});
    d.top10={antal:Math.min(10,list.length),sum:sum(list.slice(0,10)),liste:list.slice(0,10)};d.alleSelskaber={antal:list.length,liste:list};
    const previous=Object.entries(d.selskaber).filter(([slug,c])=>c.status==='tidligere').map(([slug,c])=>({navn:c.navn,slug,andel:null})).sort((a,b)=>a.navn.localeCompare(b.navn,'da'));
    d.tidligere={...d.tidligere,alle:previous,alleAntal:previous.length,antal:previous.length,udenTema:previous.filter(c=>!d.selskaber[c.slug].tema||d.selskaber[c.slug].tema==='ukendt')};
    const currentSlug=location.pathname.split('/').pop().replace('.html',''),company=d.selskaber[currentSlug];
    if(company){
      const unknown=company.status==='ukendt';
      document.querySelectorAll('.sidehoved .kicker').forEach(e=>e.textContent=company.tidligere?'Tidligere i fonden':unknown?'Beholdningsstatus opdateres':'Et af fondens selskaber');
      if(company.status!=='aktuel')document.querySelectorAll('.v18s-hoved .kicker').forEach(e=>e.textContent=unknown?'Beholdningsstatus opdateres':'Tidligere i fonden');
      document.querySelectorAll('.cr-stub-status').forEach(e=>e.hidden=!company.tidligere);
      document.querySelectorAll('[data-tal="selskaber.'+currentSlug+'.pladsITema"]').forEach(e=>{if(company.status!=='aktuel'){const parent=e.closest('p');if(parent)parent.hidden=true}});
      if(unknown&&!document.querySelector('.ndi-status-unknown')){
        const note=document.createElement('p');note.className='lille ndi-status-unknown';note.setAttribute('role','status');note.textContent='Selskabets beholdningsstatus kunne ikke bekræftes i dataudgaven pr. '+day+'. Den opdateres, når identiteten er afstemt.';const head=document.querySelector('.sidehoved');if(head)head.after(note);else(document.querySelector('main')||document.body).prepend(note);
      }
      if(company.status==='aktuel'&&document.querySelector('.cr-stub-status')){
        const note=document.createElement('p');note.className='lille';note.textContent='Andel af PMINDI: '+fmtA(company.andel)+' % pr. '+day+'.';document.querySelector('.sidehoved')?.after(note);
      }
    }

    d.rest.iAlt=100-sum(list);d.rest.kontanterOgKonti=fund.positions.filter(p=>!p.isin&&Number.isFinite(p.weight)).reduce((n,p)=>n+p.weight,0);d.rest.afrunding=100-fund.positions.filter(p=>Number.isFinite(p.weight)).reduce((n,p)=>n+p.weight,0);
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
    if(p){p.release=d.release;p.andelsdato=date;p.andelsdatoTekst=day;p.eksempeldata=false;p.kursdato=fund.performanceAsOf;p.beholdning.antalPositioner=positions.length;p.beholdning.top10=d.top10.liste;p.beholdning.top10Sum=d.top10.sum;p.beholdning.positioner=positions.map(x=>({navn:s.identities[x.isin]?.navn||x.name,isin:x.isin,slug:s.identities[x.isin]?.slug,andel:x.weight,valuta:x.listingCurrency,sektor:x.sector}));p.vaerdikaede?.forEach(g=>{g.selskaber=g.selskaber.filter(c=>bySlug[c.slug]).map(c=>({...c,andel:bySlug[c.slug].weight}));g.antal=g.selskaber.length;g.andel=sum(g.selskaber)})}
    // Interactive chain datasets are editorial classifications; weights are live.
    // A-F02: match på ISIN, aldrig på navn. Flere ISIN for samme selskab (aktieklasser) lægges sammen.
    const isinsOf=v=>String(v||'').split(/\s+/).filter(x=>/^[A-Z]{2}[A-Z0-9]{10}$/.test(x));
    const heldWeight=isins=>{const hit=isins.map(i=>heldIsin.get(i)).filter(Boolean);return hit.length?hit.reduce((n,p)=>n+p.weight,0):null};
    const statusForIsins=isins=>{const slugs=[...new Set(isins.map(i=>s.identities[i]?.slug).filter(Boolean))];return slugs.length===1?statusOf(slugs[0]):'ukendt'};
    const absentText=isins=>statusForIsins(isins)==='ukendt'?'Beholdningsstatus opdateres':'Ikke i den aktuelle beholdning';
    const ck=document.getElementById('ck-data');if(ck){const stages=JSON.parse(ck.textContent);stages.forEach(t=>{t.selskaber=t.selskaber.filter(c=>heldWeight(isinsOf(c.isin))!==null);t.selskaber.forEach(c=>{c.andel=heldWeight(isinsOf(c.isin))});t.selskaber.sort((a,b)=>b.andel-a.andel)});ck.textContent=JSON.stringify(stages)}
    document.querySelectorAll('[data-n][data-w]').forEach(e=>{const isins=isinsOf(e.dataset.isin);if(!isins.length){e.dataset.w='Beholdningsstatus opdateres';return}const w=heldWeight(isins);e.dataset.w=w!==null?fmtA(w)+' %':absentText(isins)});
    document.querySelectorAll('.cf-company').forEach(e=>{const slug=e.getAttribute('href')?.split('/').pop().replace('.html','');const p=bySlug[slug];const w=e.querySelector('.cf-weight');if(w)w.textContent=p?fmtA(p.weight)+' %':statusOf(slug)==='ukendt'?'Beholdningsstatus opdateres':'Ikke i den aktuelle beholdning'});
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
  // A-F00: data/x-curated.js er kun X-reserve og er lige så valgfri som X- og videomodulerne.
  function optionalMedia(node){return /\/(?:x-tema|review-media|52-video)\.js(?:\?|$)|(?:^|\/)data\/x-curated\.js(?:\?|$)/.test(node.dataset.ndiSrc||'')}
  async function loadMedia(queue){
    for(const node of queue){
      try{await script(node)}catch{
        // Existing original-post/video links remain usable. A media failure
        // must never turn validated holdings into a whole-page error.
        window.NDI_OPTIONAL_FAILURES=window.NDI_OPTIONAL_FAILURES||[];
        window.NDI_OPTIONAL_FAILURES.push(node.dataset.ndiSrc);
        document.dispatchEvent(new CustomEvent('ndi:media-unavailable',{detail:{src:node.dataset.ndiSrc}}));
      }
    }
  }
  function dataStatus(session){
    const data=session.files['data.json'],q=data.dataQuality;
    const day=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Copenhagen',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
    const valid=q&&q.reportDate===session.pointer.asOf&&q.positionsAsOf===data.positionsAsOf;
    const stale=valid&&/^\d{4}-\d{2}-\d{2}$/.test(q.attentionFrom)&&day>=q.attentionFrom;
    const note=document.createElement('p');note.className='lille ndi-data-status';
    note.textContent='Fondens beholdning pr. '+data.positionsAsOf.split('-').reverse().join('.')+' · Rapportdato '+session.pointer.asOf.split('-').reverse().join('.')+'.';
    const main=document.querySelector('main')||document.body;
    if(stale){note.textContent+=' Der afventes nyere fondsdata.';note.setAttribute('role','status');main.prepend(note)}else main.append(note);
  }
  // A-F05: en renderer, der kaster under kørsel, giver en rolig delvis tilstand i stedet for permanente "…".
  function partialFailure(session){
    document.documentElement.classList.add('ndi-live-partial');
    document.querySelectorAll('[data-tal]').forEach(e=>{const t=e.textContent.trim();if(t===''||t==='…'||t==='...')e.textContent='—'});
    if(document.querySelector('.ndi-live-partial-note'))return;
    const note=document.createElement('p');note.className='lille ndi-live-partial-note';note.setAttribute('role','status');
    note.textContent='En del af siden kunne ikke vises. Tallene, der vises, er fra dataudgaven pr. '+session.pointer.asOf.split('-').reverse().join('.')+'. Genindlæs siden for at prøve igen.';
    (document.querySelector('main')||document.body).prepend(note);
  }
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
    const rendererErrors=[];
    const onRendererError=e=>{if(/\/(?:x-tema|review-media|52-video|x-curated)\.js(?:\?|$)/.test(e.filename||''))return;rendererErrors.push(e.filename||'inline')};
    window.addEventListener('error',onRendererError);
    try{
      const session=await ready;
      const metadata=node=>/(^|\/)data\//.test(node.dataset.ndiSrc||'')||(node.dataset.ndiSrc||'').includes('/valg.js');
      const skip=node=>/market-supplement\.js|data\/review-funds\.js|data\/regnskab\.js|data\/kurs\/|assets\/js\/kursgraf\.js/.test(node.dataset.ndiSrc||'');
      // Fetch classic core scripts concurrently, but execute them in the exact
      // dependency order below. Optional media remains lazy and outside this list.
      const preloaded=new Set();
      for(const node of queue){
        const src=node.dataset.ndiSrc;
        if(!src||node.dataset.ndiType==='module'||skip(node)||optionalMedia(node))continue;
        const href=new URL(src,document.baseURI).href;
        if(preloaded.has(href))continue;
        preloaded.add(href);
        const link=document.createElement('link');link.rel='preload';link.as='script';link.href=href;
        document.head.append(link);
      }
      // Inline diagrams can precede data tags in the document. Load all editorial
      // metadata first and replace its numeric snapshots before any renderer runs.
      for(const node of queue.filter(n=>metadata(n)&&!optionalMedia(n)))if(!skip(node))await script(node);
      adapt(session);
      for(const node of queue.filter(n=>!metadata(n)&&!optionalMedia(n)))if(!skip(node))await script(node);
      await script({dataset:{ndiSrc:ROOT+'assets/js/live-theme-values.js'},textContent:''});
      window.removeEventListener('error',onRendererError);
      if(rendererErrors.length){window.NDI_RENDERER_FAILURES=rendererErrors;partialFailure(session)}
      dataStatus(session);
      loading.remove();document.documentElement.dataset.liveRelease=session.pointer.release;
      document.documentElement.classList.remove('ndi-live-loading');
      document.dispatchEvent(new CustomEvent('ndi:live',{detail:session}));
      // No extra click and no polling: install the existing scroll observers
      // after the core page is visible, retaining media-script order.
      void loadMedia(queue.filter(optionalMedia));
    }catch(error){
      window.removeEventListener('error',onRendererError);
      loading.remove();
      document.documentElement.classList.remove('ndi-live-loading');document.documentElement.classList.add('ndi-live-failed');
      document.querySelectorAll('[data-tal],.cf-weight,[data-w]').forEach(e=>{if(e.hasAttribute('data-w'))e.dataset.w='Data kunne ikke hentes';else e.textContent='—'});
      const note=document.createElement('p');note.className='ndi-live-error';note.setAttribute('role','alert');note.textContent='De aktuelle data kunne ikke hentes. Genindlæs siden for at prøve igen. Der vises ikke gemte kurser som aktuelle tal.';
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
