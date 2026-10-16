import { chromium } from 'playwright';
import fs from 'fs';
const pages = fs.readdirSync('docs').filter(f=>f.endsWith('.html')).map(f=>'/'+f)
  .concat(fs.readdirSync('docs/laer').filter(f=>f.endsWith('.html')).map(f=>'/laer/'+f))
  .concat(['/?view=fonden','/?view=portefolje','/?view=udforsk']);
const terms = /\b(stub|Level 1|multi-tag|Mailchimp|Flodsystem|kl n|beslutningsliste|usikkert \d|Vidensbot|lane-[A-Z]|TODO|placeholder|Placeholder|udfyldes af NDI|screener|heuristik|docs\/|Azure|Jesper-palette|interne noter|data\.json)\b/g;
const b = await chromium.launch(); const p = await b.newPage();
for (const path of pages) {
  if (path.includes('notes')) continue;
  try { await p.goto('http://127.0.0.1:8765'+path,{waitUntil:'networkidle',timeout:15000}); await p.waitForTimeout(300);
    const t = await p.locator('body').innerText();
    const hits = {}; for (const m of t.matchAll(terms)) hits[m[0]]=(hits[m[0]]||0)+1;
    if (Object.keys(hits).length) console.log(path, JSON.stringify(hits));
  } catch(e){ console.log(path,'ERR',String(e).slice(0,80)); }
}
await b.close();
