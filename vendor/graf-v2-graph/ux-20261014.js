// Presentation-only review fixes. Financial series and source dates are unchanged.
const ux14Style=document.createElement('style');ux14Style.textContent=`
#r7-holdings-toggle{display:none!important}#holdings-more:not([hidden]){display:inline-block!important}#holdings-more[hidden]{display:none!important}
#holdings tr[hidden]{display:none!important}#growth svg{user-select:none;-webkit-user-select:none;touch-action:pan-y}
.ux14-sort{background:transparent;color:inherit;border:0;font:inherit;font-weight:600;min-height:44px;cursor:pointer;text-align:left;padding:4px}
#ux14-day{padding:12px 16px;margin:12px 0;border:1px solid #56777d;border-radius:9px;background:#18343a;display:flex;flex-wrap:wrap;gap:10px;align-items:center}#ux14-day button{margin-left:auto;min-height:44px;background:none;color:#b9e4dd;border:1px solid #8abdb9;border-radius:6px;padding:8px 12px;cursor:pointer}
#ux14-class-help{display:none}#ux14-calendar-note{font-size:13px;color:#b7cdd0}
.ux14-section-toggle{display:block;min-height:44px;margin:0 0 18px;padding:9px 14px;border:1px solid #789da1;border-radius:7px;background:#19343a;color:#dceeed;cursor:pointer;font:inherit}.ux14-folded>:not(h2):not(.ux14-section-toggle){display:none!important}
@media(max-width:650px){#r5-intro h1{font-size:24px!important}#r5-intro>p:last-child{display:none}#class-options .segmented{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important}#class-options [data-class]{grid-row:auto!important;grid-template-rows:auto!important;padding:10px!important;min-height:70px!important}#class-options [data-class]>strong{font-size:14px!important}#class-options:not(.ux14-guide-open) [data-class]>span{display:none!important}#class-options [data-class] .v2-buy{overflow-wrap:anywhere}#ux14-class-help{display:block;min-height:44px;background:none;color:#b9e4dd;border:0;text-decoration:underline;cursor:pointer}#ux14-day{font-size:14px;margin:8px 0}#ux14-day button{margin-left:0}#tax-note{font-size:12px}}
`;document.head.append(ux14Style);
let ux14Sort={column:1,direction:-1};
function ux14SortRows(){
 const body=document.getElementById('holdings');if(!body)return;
 const rows=[...body.rows],c=ux14Sort.column;
 const value=row=>{const text=row.cells[c]?.textContent.trim()||'';if(c===0)return row.cells[0]?.querySelector('a')?.textContent||text;if(!text||text==='—')return null;const n=Number(text.replace(/\s|%|\./g,'').replace(',','.').replace('−','-'));return Number.isFinite(n)?n:null};
 const sorted=rows.slice().sort((a,b)=>{const x=value(a),y=value(b);if(x===null)return y===null?0:1;if(y===null)return -1;return ux14Sort.direction*(c===0?x.localeCompare(y,'da'):x-y)});
 if(rows.some((r,i)=>r!==sorted[i]))body.append(...sorted);
 [...body.closest('table').querySelectorAll('thead th')].forEach((h,i)=>{if(h.querySelector('.ux14-sort'))h.setAttribute('aria-sort',i===c?(ux14Sort.direction===1?'ascending':'descending'):'none')});
 sorted.forEach((r,i)=>r.hidden=!allHoldings&&i>=10);
 const b=document.getElementById('holdings-more');if(b){b.hidden=rows.length<=10;b.textContent=allHoldings?'Vis kun de første 10':'Se alle '+rows.length+' positioner';b.setAttribute('aria-expanded',String(allHoldings))}
}
function ux14Tables(){
 const body=document.getElementById('holdings');if(!body||!data)return;
 body.querySelectorAll('td[aria-label="Ingen valideret observation"]').forEach(td=>{if(!td.textContent.trim())td.textContent='—'});
 const table=body.closest('table');[...table.querySelectorAll('thead th')].forEach((h,i)=>{
  const label=h.textContent.trim();if(!['Vægt','Selskab','Aktie','1 år'].includes(label)||h.querySelector('button'))return;
  const b=document.createElement('button');b.className='ux14-sort';b.type='button';b.textContent=label+' ↕';b.onclick=()=>{ux14Sort={column:i,direction:ux14Sort.column===i?-ux14Sort.direction:(i===0?1:-1)};ux14SortRows();notifyHeight()};h.replaceChildren(b);
 });
 const button=document.getElementById('holdings-more');if(button)button.onclick=()=>{allHoldings=!allHoldings;limitHoldings()};
 const download=document.getElementById('holdings-excel');if(download){const count=data.funds[selected].positions.filter(p=>p.isin&&p.weight>0).length;const text='Download alle '+count+' aktiepositioner pr. '+r3Date(data.asOf)+' (Excel, .xlsx)';if(download.textContent!==text)download.textContent=text;const bar=document.getElementById('r7-holdings-actions');if(bar&&download.parentElement!==bar)bar.append(download)}
 const scope=table.closest('section');scope?.querySelectorAll('p').forEach(p=>{if(p.textContent.includes('Klik på en sektor for at filtrere'))p.textContent=p.textContent.replace('Klik på en sektor for at filtrere','Filtrér med sektorknapperne i sektorfordelingen')});
 let dates=document.getElementById('ux14-price-dates');if(!dates){dates=document.createElement('p');dates.id='ux14-price-dates';dates.className='small muted';dates.textContent='Kursdatoen gælder seneste viste lukkekurs på aktiens børs. Beholdningsdatoen gælder fondens opgørelse. Børsernes handelsdage kan være forskellige; en ældre dato er ikke en ny kurs.';table.closest('.tablewrap').before(dates)}
 ux14SortRows();
}
function ux14Refresh(){
 if(!data)return;const fund=data.funds[selected],rows=fund.data,last=rows.at(-1),prev=rows.at(-2);
 // The inherited renderer still updates its nav on class changes. Retain a
 // hidden compatibility node instead of letting that renderer throw halfway.
 if(!document.querySelector('nav')){const nav=document.createElement('nav');nav.hidden=true;nav.id='ux14-legacy-nav';document.body.append(nav)}
 const signup=document.getElementById('portfolio-mail-demo');if(signup){const p=signup.querySelector('div>p');const text='Følg med i '+fund.short+' med et overblik som det, du lige har læst: Hvordan gik det med fonden, hvilke aktier rykkede mest, og hvad skete der i selskaberne? Vælg en daglig opdatering eller en samlet opsamling én gang om ugen.';if(p&&p.textContent!==text)p.textContent=text}
 const intro=document.getElementById('r5-intro');if(intro&&prev?.total>0){let panel=document.getElementById('ux14-day');if(!panel){panel=document.createElement('section');panel.id='ux14-day';intro.after(panel)}const html='<span>Seneste kursdag, '+esc(r3Date(last.d))+': <strong>'+esc(fund.short)+' '+pct((last.total/prev.total-1)*100)+'</strong></span><button type="button">Hvad skete der? ↓</button>';if(panel.innerHTML!==html){panel.innerHTML=html;panel.querySelector('button').onclick=()=>scrollToSection(document.getElementById('portfolio-day'))}}
 const classes=document.getElementById('class-options');if(classes&&!document.getElementById('ux14-class-help')){const b=document.createElement('button');b.type='button';b.id='ux14-class-help';b.textContent='Hvad er forskellen, og hvordan finder jeg fonden?';b.setAttribute('aria-expanded','false');b.onclick=()=>{const open=classes.classList.toggle('ux14-guide-open');b.setAttribute('aria-expanded',String(open));notifyHeight()};classes.append(b)}
 const calendar=document.querySelector('#calendar table');if(calendar){let empty=0;[...calendar.tBodies[0]?.rows||[]].forEach(r=>{const cells=[...r.cells].slice(1);const missing=cells.length&&cells.every(c=>!c.textContent.trim()||c.textContent.trim()==='—');r.hidden=!!missing;if(missing)empty++});let note=document.getElementById('ux14-calendar-note');if(!note){note=document.createElement('p');note.id='ux14-calendar-note';calendar.closest('#calendar').after(note)}const text=empty?'Klassen har historik fra '+r3Date(rows[0].d)+'. År uden afsluttede månedsafkast er udeladt.':'';if(note.textContent!==text)note.textContent=text;note.hidden=!empty}
 document.querySelectorAll('a[href^="http"]').forEach(a=>{if(new URL(a.href).origin!==location.origin){a.target='_blank';a.rel='noopener noreferrer'}});
 for(const [id,label] of [['highs','Afstand til toppen'],['risk','Nedture og stigninger'],['portfolio','Selskaber og fordeling'],['method','Data og beregningsmetode']]){const panel=document.getElementById(id);if(!panel||panel.querySelector(':scope>.ux14-section-toggle'))continue;const button=document.createElement('button');button.type='button';button.className='ux14-section-toggle';button.textContent='Vis '+label.toLocaleLowerCase('da-DK');button.setAttribute('aria-expanded','false');button.onclick=()=>{const collapsed=panel.classList.toggle('ux14-folded');button.setAttribute('aria-expanded',String(!collapsed));button.textContent=collapsed?'Vis '+label.toLocaleLowerCase('da-DK'):'Skjul '+label.toLocaleLowerCase('da-DK');notifyHeight()};panel.prepend(button);panel.classList.add('ux14-folded')}
 const legal=document.getElementById('important-information'),riskBanner=document.getElementById('risk-banner');if(legal&&riskBanner&&riskBanner.previousElementSibling?.id!=='important-information-title')legal.querySelector('h2')?.after(riskBanner);
 ux14Tables();ux14CalendarAndCountries();ux14Restore();
}
function ux14CalendarAndCountries(){
 const table=document.querySelector('#calendar table');if(table){const labels=[...table.tHead.rows[0].cells].map(c=>c.textContent);for(const row of table.tBodies[0].rows)[...row.cells].forEach((c,i)=>{if(i)c.dataset.month=labels[i]});}
 const names={'Austria':'Østrig','Brazil':'Brasilien','Bulgaria':'Bulgarien','Norway':'Norge','Cayman Islands':'Caymanøerne','Poland':'Polen','Kazakhstan':'Kasakhstan','Italy':'Italien','Ireland':'Irland'};
 document.querySelectorAll('.country-pick').forEach(b=>{const s=b.querySelector('span'),name=names[b.dataset.hq];if(s&&name&&s.textContent!==name)s.textContent=name});
 const details=document.querySelector('.country-pick')?.parentElement.querySelector('details');if(details){let b=details.parentElement.querySelector('.ux14-countries-more');if(!b){b=document.createElement('button');b.className='ux14-countries-more ux14-section-toggle';b.type='button';details.after(b);b.onclick=()=>{details.open=!details.open;ux14CalendarAndCountries();notifyHeight()}}const n=details.querySelectorAll('.country-pick').length;b.textContent=details.open?'Vis færre lande':'Vis '+n+' øvrige lande';b.setAttribute('aria-expanded',String(details.open));details.querySelector('summary').style.display='none';}
}
ux14Style.textContent+=`
@media(max-width:650px){#calendar{overflow:visible!important}#calendar table,#calendar tbody{display:block;min-width:0!important;width:100%!important}#calendar thead{display:none}#calendar tbody tr:not([hidden]){display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-bottom:16px}#calendar tbody tr[hidden]{display:none!important}#v2-calendar #calendar tbody th:first-child{grid-column:1/-1;position:static!important;min-width:0!important;padding:8px!important}.r3-year-cell{display:flex!important;justify-content:space-between}#calendar tbody td{position:static!important;min-width:0!important;max-width:none!important;display:flex;flex-direction:column;align-items:center;padding:8px 4px!important}#calendar td:before{content:attr(data-month);color:#b9cbd0;font-size:11px;margin-bottom:4px}#r7-calendar-hint{display:none!important}}
`;
const ux14Scroll=scrollToSection;scrollToSection=function(target){if(target){const panel=target.closest('.ux14-folded');if(panel){panel.classList.remove('ux14-folded');const b=panel.querySelector(':scope>.ux14-section-toggle');if(b){b.setAttribute('aria-expanded','true');b.textContent='Skjul denne sektion'}}}ux14Scroll(target)};
const ux14Limit=limitHoldings;limitHoldings=function(){ux14Limit();ux14SortRows()};
const ux14Holdings=holdings;holdings=function(){ux14Holdings();ux14Tables()};
const ux14Composition=r5Composition;r5Composition=function(){ux14Composition();ux14Refresh()};
// Preserve this tab's portfolio context across a company visit. No email or
// personal form values are stored. Failed storage never blocks navigation.
function ux14Restore(){
 if(ux14Restore.done||!data)return;ux14Restore.done=true;
 // Let the inherited initial-render callbacks finish before applying user state.
 setTimeout(ux14RestoreNow,800);
}
function ux14RestoreNow(){
 let saved;try{saved=JSON.parse(sessionStorage.getItem('ndi-v2-return')||'null');sessionStorage.removeItem('ndi-v2-return')}catch{return}
 if(!saved||Date.now()-saved.at>7200000)return;
 const pick=(attr,value)=>{const b=[...document.querySelectorAll('button['+attr+']')].find(x=>x.getAttribute(attr)===value);if(b&&b.getAttribute('aria-pressed')!=='true')b.click()};
 pick('data-class',saved.fund);pick('data-growth-view',saved.view);pick('data-growth-period',saved.period);
 const toggle=document.getElementById('detail-toggle');if(saved.details&&toggle?.getAttribute('aria-expanded')!=='true')toggle.click();
 for(const id of saved.open||[]){const p=document.getElementById(id);if(p?.classList.contains('ux14-folded'))p.querySelector('.ux14-section-toggle')?.click()}
 if(saved.sort&&[0,1,2,3,4,5,6,7,8,9].includes(saved.sort.column)&&[1,-1].includes(saved.sort.direction))ux14Sort=saved.sort;
 allHoldings=!!saved.all;ux14Tables();
 setTimeout(()=>{const a=[...document.querySelectorAll('a[href*="selskab.html?"]')].find(x=>new URL(x.href).searchParams.get('isin')===saved.isin&&x.getClientRects().length);if(a){scrollToSection(a);a.focus({preventScroll:true})}},450);
}
window.addEventListener('click',event=>{
 const a=event.target.closest('a[href]');if(!a||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 const url=new URL(a.href);if(url.origin!==new URL(document.baseURI).origin||!url.pathname.endsWith('/v2-test/selskab.html'))return;
 const active=attr=>document.querySelector('button['+attr+'][aria-pressed="true"]')?.getAttribute(attr);
 const state={at:Date.now(),fund:active('data-class'),view:active('data-growth-view'),period:active('data-growth-period'),details:document.getElementById('detail-toggle')?.getAttribute('aria-expanded')==='true',open:['highs','risk','portfolio','method'].filter(id=>{const p=document.getElementById(id);return p&&!p.classList.contains('ux14-folded')}),all:allHoldings,sort:ux14Sort,isin:url.searchParams.get('isin')};
 try{sessionStorage.setItem('ndi-v2-return',JSON.stringify(state))}catch{}
 a.target='_top';
},true);
ux14Refresh();notifyHeight();
