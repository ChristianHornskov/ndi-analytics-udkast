// Genererer docs/assets/og-card.png (1200×630) til delings-preview.
// Bevidst UDEN afkasttal og uden stigende kurve (kan læses som afkastgraf): et delt billede kan ikke bære historisk-afkast-advarslen ved tallet.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const mark = readFileSync(new URL('../docs/assets/mark.svg', import.meta.url), 'utf8');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#050a0f;color:#e6e8ed;font:400 28px/1.4 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;padding:72px 84px;display:flex;flex-direction:column;position:relative;overflow:hidden}
  .brand{display:flex;align-items:center;gap:18px;font-weight:700;font-size:30px}
  .brand svg{height:44px;width:auto}
  .eyebrow{margin-top:78px;color:#89aeb4;letter-spacing:5px;font-weight:700;font-size:22px}
  h1{font-size:76px;letter-spacing:-2px;line-height:1.05;margin-top:14px;max-width:900px}
  p{color:#aac0c7;margin-top:22px;max-width:820px}
  .foot{margin-top:auto;display:flex;gap:14px;font-size:20px;color:#aac0c7}
  .foot span{border:1.5px solid #89aeb4;border-radius:8px;padding:6px 14px}
  .foot span.y{border-color:#f5ee9e;color:#f5ee9e}
</style></head><body>
  <div class="brand">${mark}<span>NewDeal Invest</span></div>
  <div class="eyebrow">NDI ANALYTICS · UDKAST</div>
  <h1>Gå på opdagelse i porteføljen</h1>
  <p>Fonden, temaerne og selskaberne – set gennem NDI's egen linse. Generel information, ikke rådgivning.</p>
  <div class="foot"><span>Fonden</span><span>Porteføljen</span><span>Udforsk tech</span><span class="y">Udkast</span></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: new URL('../docs/assets/og-card.png', import.meta.url).pathname });
await browser.close();
console.log('docs/assets/og-card.png');
