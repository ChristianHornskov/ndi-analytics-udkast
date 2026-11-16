const fs=require('fs'),crypto=require('crypto'),vm=require('vm');
const dir='data/noegletal/',ids=JSON.parse(fs.readFileSync('data/company-identities.json'));
const isins={};for(const [i,v] of Object.entries(ids)){(isins[v.slug]=isins[v.slug]||[]).push(i)}
const ctx={window:{}};vm.createContext(ctx);
for(const f of fs.readdirSync(dir).sort())vm.runInContext(fs.readFileSync(dir+f,'utf8'),ctx);
const N=ctx.window.NDI_NOEGLETAL;
// validator copied from company-keyfigures.js
const src=fs.readFileSync('assets/js/company-keyfigures.js','utf8');
const vsrc=src.slice(src.indexOf('function valid'),src.indexOf('window.NDI_KEYFIGURES_READY'));
const valid=new Function(vsrc+';return valid')();
const companies={},bad=[];
for(const slug of Object.keys(N).sort()){
  const i=(isins[slug]||[]).filter(x=>/^[A-Z]{2}[A-Z0-9]{10}$/.test(x));
  if(!i.length){bad.push(slug+': ingen ISIN');continue}
  if(!valid(N[slug])){bad.push(slug+': ugyldige tal');continue}
  companies[slug]={isins:i.sort(),figures:N[slug]};
}
const body=Buffer.from(JSON.stringify({schemaVersion:1,companies},null,0),'utf8');
const h=crypto.createHash('sha256').update(body).digest('hex');
const out=require('path').resolve(__dirname,'../azure-staging/company-keyfigures-v1')+'/';
fs.writeFileSync(out+'releases/'+h+'.json',body);
fs.writeFileSync(out+'latest.json',JSON.stringify({schemaVersion:1,complete:true,release:h,companies:Object.keys(companies).length}));
console.log('ok',Object.keys(companies).length,h,bad);
