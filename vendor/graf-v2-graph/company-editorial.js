(()=>{'use strict';
 const isin=new URLSearchParams(location.search).get('isin');
 let profile=COMPANY_DATA.profiles[isin], library=COMPANY_DATA, ready=false;
 const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n};
 const external=url=>{try{return new URL(url).protocol==='https:'}catch{return false}};
 const companyName=()=>profile?.displayName||profile?.name||document.querySelector('#content h1')?.textContent||'selskabet';
 function nameHeadings(){
  if(!ready)return;const name=companyName();if(name==='selskabet')return;
  const set=(selector,text)=>{const e=document.querySelector(selector);if(e&&e.textContent!==text)e.textContent=text};
  set('#content h1',name);
  set('#laes-videre h2','Bliv klogere på '+name);
  set('#forretning .eyebrow','FORSTÅ '+name.toLocaleUpperCase('da-DK')+' PÅ ET MINUT');
  set('#forretning h2','Hvad laver '+name+'?');
  set('.company-accounts h3','Følg '+name+' på X');
  set('#x-insights h2','Fra X om '+name);
 }
 function research(materials){
  let section=document.getElementById('laes-videre');
  if(!materials.length){section?.remove();document.querySelector('.jumpnav a[href="#laes-videre"]')?.remove();return}
  if(!section){section=node('section',null,'panel');section.id='laes-videre';document.getElementById('forretning').after(section)}
  const jump=document.querySelector('.jumpnav a[href="#laes-videre"]');if(jump)jump.textContent='Artikler & videoer · '+materials.length;
  section.replaceChildren(node('h2','Bliv klogere på '+companyName()),node('p','Udgivelser fra vores team og udvalgte eksterne analyser. Læs eller se materialet hos den oprindelige udgiver.','note'));
  const filters=node('div',null,'research-filters'),grid=node('div',null,'research-grid'),more=node('button',null,'button research-more');more.type='button';
  let selection='Alle',expanded=false;
  const isVideo=m=>['Video','Short'].includes(m.kind);
  const choices=['Alle',...(materials.some(isVideo)?['Videoer']:[]),...(materials.some(m=>!isVideo(m))?['Læsning']:[])];
  function draw(){
   filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===selection)));
   const rows=materials.filter(m=>selection==='Alle'||(selection==='Videoer'?isVideo(m):!isVideo(m)));
   grid.replaceChildren();
   for(const m of rows.slice(0,expanded?rows.length:6)){
    const a=node('a',null,'research-card'+(isVideo(m)?' research-video':' research-article'));a.href=m.url;a.target='_blank';a.rel='noopener noreferrer';
    const visual=node('div',null,'research-visual');
    if(m.thumbnail&&external(m.thumbnail)){const img=node('img');img.src=m.thumbnail;img.alt='';img.loading='lazy';img.referrerPolicy='no-referrer';img.onerror=()=>img.remove();visual.prepend(img)}
    const duration=m.seconds?` · ${Math.floor(m.seconds/60)}:${String(m.seconds%60).padStart(2,'0')}`:'';
    const symbol=node('span',isVideo(m)?'▶':'▤','research-symbol');symbol.setAttribute('aria-hidden','true');visual.append(symbol);
    visual.append(node('span',(isVideo(m)?(m.kind==='Short'?'KORT VIDEO':'SE VIDEO'):m.kind.toLocaleUpperCase('da-DK'))+duration,'research-badge'));
    if(!isVideo(m))visual.append(node('span',profile?.name||'Selskabsresearch','research-company'));
    const body=node('div',null,'research-body');body.append(node('span',new Date(m.date+'T12:00:00').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'})+' · '+m.language,'research-meta'),node('h3',m.title),node('p',m.context),node('span',m.author+' · '+m.publisher,'research-meta'),node('strong',isVideo(m)?'Se video på YouTube ↗':'Læs udgivelsen ↗','research-action'));
    const origin=/NewDeal Invest/i.test(m.author+' '+m.publisher)?'Fra NewDeal Invest':/Jesper Bæk|Mads Christiansen|Christian Hornskov|Mattias Khorooshi/i.test(m.author)?'Fra en person i NDI-teamet':'Ekstern udgivelse';
    body.prepend(node('strong',origin,'research-meta'));
    a.append(visual,body);grid.append(a);
   }
   more.hidden=rows.length<=6;more.textContent=expanded?'Vis færre udgivelser':`Se alle ${rows.length} udgivelser`;more.setAttribute('aria-expanded',String(expanded));
  }
  for(const choice of choices){const b=node('button',choice);b.type='button';b.onclick=()=>{selection=choice;expanded=false;draw()};filters.append(b)}
  more.onclick=()=>{expanded=!expanded;draw()};section.append(filters,grid,more,node('p','Udgivelser afspejler oplysninger og vurderinger på udgivelsesdatoen. Eksterne sider kan kræve abonnement.','note'));draw();
 }
 function apply(){
  const content=document.getElementById('content');
  if(!ready||!content.querySelector('.grid')||content.dataset.editorialReady)return;
  content.dataset.editorialReady='true';
  const sectors={'Technology':'Teknologi','Communication Services':'Kommunikation','Consumer Cyclical':'Cyklisk forbrug','Consumer Defensive':'Stabilt forbrug','Financial Services':'Finans','Healthcare':'Sundhed','Industrials':'Industri','Basic Materials':'Materialer','Energy':'Energi','Utilities':'Forsyning','Real Estate':'Ejendomme'};
  content.querySelectorAll('dt').forEach(dt=>{const dd=dt.nextElementSibling;if(dt.textContent==='Sektor'&&dd&&sectors[dd.textContent]){dd.title=dd.textContent;dd.textContent=sectors[dd.textContent]}});
  const materials=library.media.filter(x=>x.isins.includes(isin)&&external(x.url));
  research(materials);
  const business=document.getElementById('forretning');
  if(business&&profile?.narrative){
   business.querySelectorAll('.business-step').forEach(n=>n.remove());
   const prose=document.createElement('div');prose.className='company-story';
   for(const text of profile.narrative){const p=document.createElement('p');p.textContent=text;prose.append(p)}
   business.querySelector('h2').after(prose);
   const sources=business.querySelector('.source');
   if(sources&&profile.reviewedAt){for(const child of sources.childNodes){if(child.nodeType===Node.TEXT_NODE&&child.textContent.includes('Gennemgået'))child.textContent=child.textContent.replace(/Gennemgået [^.]+\. [^.]+\. \d{4}\./,'Gennemgået '+new Date(profile.reviewedAt+'T12:00:00').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'})+'.')}}
   if(sources&&profile.narrativeSources?.length){
    const extra=document.createElement('span');extra.append(document.createTextNode(' Kilder: '));
    profile.narrativeSources.filter(s=>external(s.url)).forEach((s,i)=>{if(i)extra.append(document.createTextNode(' · '));const a=document.createElement('a');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=s.label+' ↗';extra.append(a)});sources.append(extra);
   }
  }
  if(profile?.xAccounts?.length){
   const section=document.createElement('section');section.className='company-accounts';
   const h=document.createElement('h3');h.textContent='Følg selskabet ved kilden';section.append(h);
   for(const account of profile.xAccounts){
    if(!/^[A-Za-z0-9_]{1,15}$/.test(account.handle))continue;
    const a=document.createElement('a');a.className='button company-account';a.href='https://x.com/'+account.handle;a.target='_blank';a.rel='noopener noreferrer';a.textContent='𝕏 '+account.label+' ↗';section.append(a);
   }
   const note=document.createElement('p');note.className='note';note.textContent='Selskabets og ledelsens egne perspektiver. Ikke uafhængige analyser.';section.append(note);
   content.querySelector('aside > .panel').append(section);
  }
 }
 const style=document.createElement('style');style.textContent='.company-story{max-width:66ch;margin-top:20px;color:#d0dfe0;font-size:16px;line-height:1.75}.company-story p{margin:0 0 16px}.company-account{display:flex;justify-content:flex-start;margin:12px 0}.company-story p:last-child{margin-bottom:0}';document.head.append(style);
 style.textContent+=' nav a{display:inline-flex;align-items:center;min-height:44px}summary{min-height:44px;padding:10px 0}.source a{display:inline-flex;align-items:center;min-height:44px;padding:4px 2px}.source{line-height:1.6}';
 style.textContent+=`.research-filters{display:flex;gap:8px;margin:20px 0}.research-filters button{background:transparent;border:1px solid #789fa4;color:#d4e4e5;padding:10px 16px;border-radius:24px;min-height:44px;cursor:pointer}.research-filters button[aria-pressed=true]{background:#a7d8d7;color:#10242b}.research-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.research-card{display:flex;flex-direction:column;overflow:hidden;border:1px solid #36515a;border-radius:16px;text-decoration:none!important;background:#10242c;color:#e6f0f1;transition:border-color .15s}.research-card:hover{border-color:#acd9d7}.research-card:focus-visible,.research-filters button:focus-visible{outline:3px solid #f5d184;outline-offset:3px}.research-visual{aspect-ratio:16/9;position:relative;background:linear-gradient(135deg,#28454e,#162a33);overflow:hidden;display:grid;place-items:center}.research-visual img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}.research-symbol{font-size:40px}.research-badge{position:absolute;bottom:12px;left:12px;background:#08151dea;color:#fff;padding:5px 10px;border-radius:6px;font-size:13px}.research-body{padding:20px;display:flex;flex-direction:column;gap:10px;flex:1}.research-body h3{font-size:20px;line-height:1.35;margin:0;color:#eef7f7}.research-body p{font-size:15px;line-height:1.6;margin:0;color:#c1d3d6}.research-meta{font-size:13px;color:#9dbcc1}.research-action{font-size:14px;color:#a7d8d7;margin-top:auto;padding-top:8px}.research-more{margin-top:18px;cursor:pointer}.research-more[hidden]{display:none}@media(max-width:600px){.research-grid{grid-template-columns:1fr}.research-body{padding:17px}.company-story{font-size:16px}.research-filters{flex-wrap:wrap}}`;
 style.textContent+=`.research-symbol{position:relative;z-index:2;display:grid;place-items:center;width:62px;height:62px;border-radius:50%;background:#f2f7f4;color:#10242c;box-shadow:0 4px 24px #0008;font-size:26px;padding-left:4px}.research-video .research-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 35%,#05111899)}.research-video .research-badge{z-index:3;background:#eff6f3;color:#0b2229;font-weight:700;letter-spacing:.04em}.research-card:hover .research-symbol{background:#a7d8d7}.research-article .research-symbol{position:absolute;top:12px;right:12px;width:38px;height:38px;border-radius:9px;font-size:25px;padding:0;background:#09202bd9;color:#def0f0;box-shadow:none}.research-company{position:absolute;top:12px;left:12px;max-width:70%;padding:5px 10px;background:#09202be8;border:1px solid #abc9cd66;border-radius:6px;font-size:12px;font-weight:600;color:#fff}.research-article .research-badge{border-left:3px solid #a7d8d7}.research-video .research-action{display:flex;align-items:center;gap:8px}.research-video .research-action:before{content:'▶';font-size:11px}`;
 // Keep lower editorial sections independent of the top two-column grid.
 // Idempotent relocation also handles X mounting before or after the catalogue.
 function widen(){
  const content=document.getElementById('content'),grid=content.querySelector(':scope > .grid');if(!grid)return;
  let anchor=grid;
  for(const id of ['company-analytics','laes-videre','x-insights']){const section=document.getElementById(id);if(!section)continue;if(section.parentElement!==content||anchor.nextElementSibling!==section)anchor.after(section);anchor=section;}
 }
 style.textContent+=`#content>.grid{align-items:start}.company-accounts{border-top:1px solid var(--line);margin-top:24px;padding-top:20px}.company-accounts h3{margin-top:0}.company-account{white-space:normal;line-height:1.4}.research-grid{grid-template-columns:repeat(3,minmax(0,1fr))}#x-insights .x-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;align-items:start}#x-insights .x-list>.note{grid-column:1/-1;margin-bottom:0}#x-insights .x-card{margin-top:0;min-width:0}@media(max-width:900px){.research-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){#x-insights .x-list,.research-grid{grid-template-columns:1fr}}`;
 // Variable-height original X embeds pack upwards without equal-height rows.
 // Keep source/tab order, and remeasure when X finishes loading media.
 const packed=new WeakSet();let packFrame=0;
 function packPosts(){
  packFrame=0;
  document.querySelectorAll('#x-insights .x-list>*').forEach(item=>{
   if(!packed.has(item)){packed.add(item);postSizes.observe(item)}
   const span=matchMedia('(min-width:701px)').matches?'span '+Math.ceil(item.getBoundingClientRect().height+20):'auto';
   if(item.style.gridRowEnd!==span)item.style.gridRowEnd=span;
  });
 }
 function schedulePack(){if(!packFrame)packFrame=requestAnimationFrame(packPosts)}
 const postSizes=new ResizeObserver(schedulePack);
 window.addEventListener('resize',schedulePack,{passive:true});
 style.textContent+=`@media(min-width:701px){#x-insights .x-list{grid-auto-rows:1px;row-gap:0}#x-insights .x-list>*{align-self:start;margin-top:0;margin-bottom:0}}`;
 new MutationObserver(()=>{apply();widen();nameHeadings();schedulePack()}).observe(document.getElementById('content'),{childList:true,subtree:true});apply();widen();nameHeadings();schedulePack();
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);
 fetch(new URL('company-library.json',location.href),{cache:'no-store',signal:controller.signal}).then(r=>{if(!r.ok)throw Error('catalogue');return r.json()}).then(data=>{if(data.schemaVersion!==1||!Array.isArray(data.media)||!data.media.every(m=>Array.isArray(m.isins)&&typeof m.url==='string'))throw Error('schema');library=data;profile={...profile,...data.profiles?.[isin]}}).catch(()=>{}).finally(()=>{clearTimeout(timeout);ready=true;apply()});
})();

// Independent company-level context; never changes the fund calculation.
(async()=>{
 const base='https://ndigrafdatab5174313.blob.core.windows.net/graph/';
 const q=new URLSearchParams(location.search),isin=q.get('isin');
 const get=async url=>{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw Error('Company context unavailable');return r.json()};
 const fmt=(v,n=1)=>new Intl.NumberFormat('da-DK',{minimumFractionDigits:n,maximumFractionDigits:n}).format(v);
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
 const dt=d=>new Date(d+'T12:00:00Z').toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'});
 try{
  const pointer=await get(base+'latest.json');if(!pointer.validated) return;
  const [d,h,months]=await Promise.all([get(base+'releases/'+pointer.release+'/data.json'),get(base+'releases/'+pointer.release+'/highs.json'),get(base+'v2-test/company-months.json').catch(()=>null)]);
  const fund=d.funds.find(f=>f.id===q.get('fund'))||d.funds.find(f=>f.positions.some(p=>p.isin===isin));if(!fund)return;
  const monthlyHighs=await get(base+'v2-test/company-high-months.json').catch(()=>null);
  let m=h.funds.find(f=>f.short===fund.short)?.rows.find(r=>r.isin===isin);
  // Reuse V2's cloud-calculated short-history fallback, without executing its code.
  if(m&&!Number.isFinite(m.distance)){
   try{
    const html=await (await fetch(base+'v2-test/preview-module-20260930.html',{cache:'no-store'})).text();
    const match=html.match(/let patch=("(?:\\.|[^"\\])*")/);const patch=JSON.parse(match[1]);
    const start=patch.indexOf('const v2Extra=')+'const v2Extra='.length;let depth=0,quoted=false,escaped=false,end=start;
    for(;end<patch.length;end++){const c=patch[end];if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false}else if(c==='"')quoted=true;else if(c==='{')depth++;else if(c==='}'&&--depth===0){end++;break}}
    const extra=JSON.parse(patch.slice(start,end)),row=extra.positions?.[isin];
    if(extra.release===pointer.release&&row&&row.date===fund.data.at(-1).d)m={...m,...row,currency:m.marketCurrency,highDate:row.highDate||null};
   }catch(e){console.warn('Short-history context unavailable',e.message)}
  }
  const style=document.createElement('style');style.textContent=`.monthly-scroll{overflow-x:auto;padding:10px 0}.monthly-bars{display:flex;align-items:end;gap:14px;min-height:160px}.monthly-item{flex:0 0 64px;text-align:center;font-size:12px}.monthly-item i{display:block;background:#8bbfc0;width:36px;margin:6px auto}.monthly-item time{display:block;color:#afc5cb;font-size:11px}.company-high-value{font-size:36px;color:#eacb94;margin:10px 0}.company-high-track{height:12px;background:#39515a;border-radius:7px;overflow:hidden;margin:18px 0}.company-high-track span{display:block;height:100%;background:#a3d8c9}.company-high-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:18px 0}.company-high-stats strong{display:block;font-size:20px}.company-high-stats span{font-size:12px;color:#afc5cb}`;document.head.append(style);
  function mount(){
   const aside=document.querySelector('#content aside');if(!aside)return false;
   let old=document.getElementById('company-monthly')||[...aside.querySelectorAll('section')].find(e=>e.querySelector('h2')?.textContent==='Positionens størrelse');
   // The build ships an empty history, so the template's section is usually absent; create it.
   if(!old&&months&&(months.funds[fund.id]||[]).some(p=>Number.isFinite(p.weights[isin]))&&aside.firstElementChild){old=document.createElement('section');old.className='panel plain';aside.firstElementChild.after(old)}
   if(old)old.id='company-monthly';
   if(old&&months&&!old.dataset.monthly){
    old.dataset.monthly='true';
    const points=(months.funds[fund.id]||[]).filter(p=>Number.isFinite(p.weights[isin])).slice().sort((a,b)=>a.date.localeCompare(b.date));
    const max=Math.max(.01,...points.map(p=>p.weights[isin]));
    old.innerHTML='<h2>Positionens størrelse måned for måned</h2><p class="note">Andel af '+esc(fund.short)+'s formue på den første tilgængelige rapportdato i hver måned.</p><div class="monthly-scroll" tabindex="0" aria-label="Månedlig positionshistorik. Rul vandret for alle måneder."><div class="monthly-bars">'+points.map(p=>'<div class="monthly-item" title="'+dt(p.date)+'"><strong>'+fmt(p.weights[isin],2)+' %</strong><i style="height:'+Math.max(1,p.weights[isin]/max*90)+'px"></i><time>'+dt(p.date)+'</time></div>').join('')+'</div></div><p class="note">Rul for at se hele historikken. Vægten ændres med kurser, handler og fondens formue. Den viser ikke i sig selv køb og salg. Måneder uden en registreret position vises ikke som nul.</p>';
   }
   if(m&&Number.isFinite(m.distance)&&m.high>0&&m.close>0&&!document.getElementById('company-high')){
    const box=document.createElement('section');box.id='company-high';box.className='panel plain';
    const distance=Math.max(0,m.distance),recovery=(m.high/m.close-1)*100;
    box.innerHTML='<h2>Hvor langt er aktien fra toppen?</h2><div class="company-high-value">'+fmt(distance)+' % under toppen</div><p class="note">Afstand til højeste observerede kurs inden for op til 52 uger. Ved kortere historik bruges den tilgængelige periode.</p><div class="company-high-track" role="img" aria-label="Aktuel kurs er '+fmt(100-distance)+' procent af toppen"><span style="width:'+Math.max(0,Math.min(100,100-distance))+'%"></span></div><div class="company-high-stats"><div><span>Kurs pr. '+dt(m.date)+'</span><strong>'+fmt(m.close,2)+' '+esc(m.currency)+'</strong></div><div><span>Top · '+dt(m.highDate)+'</span><strong>'+fmt(m.high,2)+' '+esc(m.currency)+'</strong></div></div><h3>Tilbage til samme top</h3><p>Fra den viste kurs kræver det en stigning på <strong>'+fmt(Math.max(0,recovery))+' %</strong> at nå samme top igen. Et fald og den efterfølgende stigning regnes fra forskellige kursniveauer, så procenterne er ikke lige store.</p><p class="note">Perioden er '+dt(m.start)+' til '+dt(m.date)+'. Dette er en matematisk afstand, ikke en forventning om, at kursen vender tilbage. En 52-ugers top er ikke nødvendigvis aktiens højeste kurs nogensinde.</p>';
    (old||aside.firstElementChild).after(box);
   }
   const high=document.getElementById('company-high');
   if(high){
    // Keep the dated current value, replace recovery arithmetic with historical context.
    const heading=high.querySelector('h3');if(heading){heading.nextElementSibling?.remove();heading.remove()}
    const last=high.querySelector('p:last-child');if(last)last.textContent='Målingen bruger op til 52 ugers historik. En 52-ugers top er ikke nødvendigvis aktiens højeste kurs nogensinde.';
    const record=monthlyHighs?.positions?.[isin],points=record?.points||[];
    if(points.length){
     const max=Math.max(1,...points.map(x=>x.distance));const history=document.createElement('div');
     history.innerHTML='<h3>Afstand til toppen måned for måned</h3><p class="note">Første børsdag med kursdata i hver måned. Hver søjle måles mod den højeste kurs i de op til 52 uger, der lå før og på den dato.</p><div class="monthly-scroll" tabindex="0" aria-label="Månedlig afstand til toppen"><div class="monthly-bars">'+points.map(x=>'<div class="monthly-item"><strong>'+fmt(x.distance)+' %</strong><i style="height:'+Math.max(1,x.distance/max*90)+'px;background:#dfc08b"></i><time>'+dt(x.date)+'</time></div>').join('')+'</div></div><p class="note">0 % betyder, at kursen er på periodens top. En højere søjle betyder længere under toppen. Nyeste månedspunkt: '+dt(points.at(-1).date)+'.</p>';
     high.append(history);
    }
   }
   if(high&&!m.highDate){const label=high.querySelector('.company-high-stats>div:nth-child(2)>span');if(label)label.textContent='Højeste kurs i perioden'}
   const separate=[...aside.querySelectorAll('section')].find(e=>e.querySelector('h3')?.textContent==='Aktien og fonden er ikke det samme');
   if(separate){const note=document.createElement('p');note.className='note';note.textContent='Aktiekursens udvikling er ikke det samme som bidraget til fondens afkast. Bidraget afhænger også af positionens størrelse, handler, valuta og omkostninger.';(document.getElementById('kurs')||old||aside.firstElementChild).append(note);separate.remove()}
   return true;
  }
  style.textContent+='#company-analytics{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}#company-analytics>.panel{min-width:0}@media(max-width:700px){#company-analytics{grid-template-columns:1fr}}';
  if(!mount()){const observer=new MutationObserver(()=>{if(mount())observer.disconnect()});observer.observe(document.getElementById('content'),{childList:true,subtree:true});setTimeout(()=>observer.disconnect(),30000)}
 }catch(e){console.warn('Company history/high panel not available',e.message)}
})();
