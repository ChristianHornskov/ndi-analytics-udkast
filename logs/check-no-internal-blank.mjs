import fs from 'fs';
import path from 'path';
const root='docs';
const bad=[];
function walk(d){
  for(const f of fs.readdirSync(d)){
    const p=path.join(d,f);
    if(f==='notes'||f==='b'||f==='data') continue;
    if(fs.statSync(p).isDirectory()) walk(p);
    else if(/\.(html|js)$/.test(f)){
      const t=fs.readFileSync(p,'utf8');
      // flag target=_blank on relative/internal hrefs
      const re=/<a[^>]+>/g; let m;
      while((m=re.exec(t))){
        const tag=m[0];
        if(!/target=["']_blank["']/.test(tag)) continue;
        const href=(tag.match(/href=["']([^"']+)["']/)||[])[1]||'';
        if(!/^https?:\/\//i.test(href) || /christianhornskov\.github\.io\/ndi-analytics/.test(href)){
          bad.push(`${p}: internal-ish blank -> ${href}`);
        }
      }
    }
  }
}
walk(root);
if(bad.length){console.error(bad.join('\n')); process.exit(1)}
console.log('OK no internal target=_blank in docs');
