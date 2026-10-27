// Public, validated releases only. Never use a bundled portfolio snapshot.
export const BASE='https://ndigrafdatab5174313.blob.core.windows.net/graph/';
export async function getJSON(url){const r=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error(`HTTP ${r.status}`);return r.json();}
export function validate(pointer,data){
 if(pointer.validated!==true||!(/^[a-f0-9]{64}$/).test(pointer.release)||!/^\d{4}-\d{2}-\d{2}$/.test(pointer.asOf)||pointer.asOf>new Date().toISOString().slice(0,10)||data.asOf!==pointer.asOf)throw Error('Ugyldig eller inkonsistent rapport');
 const funds=['pmindi','pmindiakk'].map(id=>data.funds?.find(f=>f.id===id));
 for(const f of funds){if(!f||!Array.isArray(f.positions)||!f.data?.length)throw Error('Afdelingsdata mangler');let prev='';for(const r of f.data){if(!/^\d{4}-\d{2}-\d{2}$/.test(r.d)||r.d<=prev||r.d>pointer.asOf||!Number.isFinite(r.total)||r.total<=0)throw Error('Ugyldig kurshistorik');prev=r.d;}if(f.positions.some(p=>!Number.isFinite(p.weight)))throw Error('Ugyldig vægt');}
 return {...data,funds};
}
export async function loadAzure(){
 const pointer=await getJSON(BASE+'latest.json');
 if(!/^[a-f0-9]{64}$/.test(pointer.release))throw Error('Ugyldig release');
 const root=BASE+'releases/'+pointer.release+'/';
 const [raw,docs,highs,nasdaq]=await Promise.all([getJSON(root+'data.json'),getJSON(root+'fund-documents.json'),getJSON(root+'highs.json'),getJSON(BASE+'nasdaq/latest.json')]);
 const data=validate(pointer,raw);
 if(highs.asOf!==data.asOf||!Array.isArray(highs.funds)||data.funds.some(f=>!docs.funds?.[f.id]?.costs))throw Error('Ufuldstændig rapport');
 if(nasdaq.validated!==true||!Array.isArray(nasdaq.rows)||nasdaq.rows.some(r=>!Number.isFinite(r.v)||r.v<=0))throw Error('Ugyldig sammenligningsserie');
 return {pointer,data,fundDocuments:docs.funds,highs,nasdaq,checkedAt:new Date().toISOString()};
}
export function marketRow(b,f,p){const r=b.highs.funds.find(x=>x.short===f.short)?.rows.find(x=>x.isin===p.isin);return r&&p.listingIdentitySha256&&r.listingIdentitySha256===p.listingIdentitySha256?r:null;}
export const companies=f=>f.positions.filter(p=>/^[A-Z]{2}[A-Z0-9]{10}$/.test(p.isin||'')&&p.weight>0&&!/etoro/i.test(p.name||''));
export function freshness(b){const age=(Date.now()-Date.parse(b.data.asOf+'T00:00:00Z'))/864e5;return `Azure · rapport ${b.data.asOf} · kontrolleret ${new Date(b.checkedAt).toLocaleTimeString('da-DK',{hour:'2-digit',minute:'2-digit'})}${age>4?' · Rapporten er mere end fire dage gammel.':''}`;}
export function watch(refresh){const run=()=>{if(!document.hidden)void refresh();};const timer=setInterval(run,300000);document.addEventListener('visibilitychange',run);window.addEventListener('online',run);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',run);window.removeEventListener('online',run);};}
