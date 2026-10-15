import { chromium } from 'playwright';
const base = process.env.BASE_URL || 'http://127.0.0.1:8765';
const pages = ['/', '/selskab.html?isin=JP3436100006&fund=pmindi', '/embed/chart.html', '/om-data.html'];
const viewports = [{w:1280,h:800,name:'desktop'},{w:375,h:812,name:'mobile'}];
const browser = await chromium.launch();
let errors = [];
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  page.on('console', msg => { if (msg.type()==='error') errors.push(`${vp.name} console: ${msg.text()}`); });
  page.on('pageerror', err => errors.push(`${vp.name} pageerror: ${err.message}`));
  for (const path of pages) {
    const url = base + path;
    try {
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      if (!res || !res.ok()) errors.push(`${vp.name} HTTP ${res?.status()} ${url}`);
      await page.waitForTimeout(800);
      await page.screenshot({ path: `logs/pw-${vp.name}${path.replace(/\W+/g,'-')||'-home'}.png`, fullPage: true });
    } catch (e) {
      errors.push(`${vp.name} ${url}: ${e.message}`);
    }
  }
  await page.close();
}
await browser.close();
if (errors.length) { console.error('FAIL\n'+errors.join('\n')); process.exit(1); }
console.log('OK smoke');
