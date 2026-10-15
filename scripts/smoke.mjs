import { chromium } from 'playwright';
const BASE = 'http://127.0.0.1:8765';
const pages = [
  '/',
  '/?view=fonden',
  '/?view=portefolje',
  '/?view=udforsk',
  '/tema.html?slug=chips',
  '/laer/index.html',
  '/laer/saadan-taenker-vi.html',
  '/drawdown.html',
  '/sammenlign.html',
  '/invester.html',
  '/nyhedsarkiv.html',
  '/selskaber.html',
  '/periode.html?year=2025',
  '/selskab.html?isin=JP3436100006',
  '/om-data.html',
  '/embed/chart.html',
  '/vaerdikaede.html',
  '/ndi-perspektiv.html',
  '/laer/udbytte-vs-akk.html',
  '/laer/forsinket-beholdning.html',
  '/risici.html',
  '/selskab.html?isin=US88160R1014',
  '/laer/faq.html',
  '/temaer.html',
];
const results = [];
const browser = await chromium.launch({ headless: true });
for (const width of [1280, 375]) {
  const context = await browser.newContext({ viewport: { width, height: width === 1280 ? 800 : 812 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e.message)));
  page.on('console', msg => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });
  for (const path of pages) {
    const url = BASE + path;
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(400);
      const status = resp?.status();
      const body = await page.locator('body').innerText().catch(() => '');
      const hasWarn = /Historisk afkast|ikke en pålidelig/i.test(body) || path.includes('laer') || path.includes('nyheds') || path.includes('invester') || path.includes('vaerdikaede') || path === '/';
      const badAdvice = /køb nu|sælg nu|anbefaler vi at købe/i.test(body);
      const notesLeak = await page.locator('text=STATUS – NDI').count();
      results.push({ width, path, status, err: errors.splice(0).join(' | '), warn: hasWarn, badAdvice, notesLeak, title: await page.title() });
    } catch (e) {
      results.push({ width, path, status: 0, err: String(e), warn: false, badAdvice: false, notesLeak: 0, title: '' });
    }
  }
  await context.close();
}
await browser.close();
const fail = results.filter(r => r.status !== 200 || r.err || r.badAdvice || r.notesLeak);
console.log(JSON.stringify({ total: results.length, fail: fail.length, results }, null, 2));
process.exit(fail.length ? 1 : 0);
