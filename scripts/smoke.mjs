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
  '/vaerdikaeder.html',
  '/embed/chart.html?periode=1m',
  '/ndi-perspektiv.html',
  '/laer/udbytte-vs-akk.html',
  '/laer/forsinket-beholdning.html',
  '/risici.html',
  '/selskab.html?isin=US88160R1014',
  '/laer/faq.html',
  '/temaer.html',
  '/?view=fonden&cmp=nasdaq',
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
      const html = await page.content();
      const hasMarketing = /Markedsføringsmateriale|MARKEDSFØRINGSMATERIALE/.test(html + body);
      const hasKid = /KID|Central Information|priip_ipm/i.test(html + body);
      // Lær-undersider may inherit via SPA; product pages must have both
      const needsFooter = !path.includes('/laer/') && path !== '/embed/chart.html?periode=1m';
      const footerOk = !needsFooter || (hasMarketing && hasKid);
      results.push({ width, path, status, err: errors.splice(0).join(' | '), warn: hasWarn, badAdvice, notesLeak, hasMarketing, hasKid, footerOk, title: await page.title() });
    } catch (e) {
      results.push({ width, path, status: 0, err: String(e), warn: false, badAdvice: false, notesLeak: 0, hasMarketing: false, hasKid: false, footerOk: false, title: '' });
    }
  }
  await context.close();
}
// Nasdaq-sammenligning: tilladt KUN som valgfri linje med præcis label, og slået fra som standard
const NQ_LABEL = 'Nasdaq vises kun som sammenligning, ikke som fondens benchmark. Historisk afkast er ingen garanti.';
for (const width of [1280, 375]) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  const pg = await ctx.newPage();
  await pg.goto(BASE + '/?view=fonden', { waitUntil: 'networkidle' });
  const offCmp = await pg.locator('#perf-chart path.cmp').count();
  await pg.goto(BASE + '/?view=fonden&cmp=nasdaq', { waitUntil: 'networkidle' });
  await pg.waitForSelector('#perf-chart path.cmp', { timeout: 5000 }).catch(() => {});
  const onCmp = await pg.locator('#perf-chart path.cmp').count();
  const label = (await pg.locator('#cmp-label').textContent().catch(() => '')) || '';
  const labelVisible = await pg.locator('#cmp-label').isVisible().catch(() => false);
  const ok = offCmp === 0 && onCmp === 1 && label.trim() === NQ_LABEL && labelVisible;
  await pg.goto(BASE + '/?view=fonden', { waitUntil: 'networkidle' });
  const ddN = await pg.locator('#rullende-og-nedture tbody tr').count();
  const r12 = await pg.locator('#rullende-og-nedture .r12 path.fund').count();
  results.push({ width, path: 'rolling12+top5dd', status: 200, err: (ddN === 5 && r12 === 1) ? '' : `dd rows=${ddN} r12=${r12}`, footerOk: true });
  results.push({ width, path: 'nasdaq-compare', status: 200, err: ok ? '' : `nasdaq: off=${offCmp} on=${onCmp} labelVisible=${labelVisible} label="${label.trim()}"`, footerOk: true });
  await ctx.close();
}
await browser.close();
const fail = results.filter(r => r.status !== 200 || r.err || r.badAdvice || r.notesLeak || r.footerOk === false);
console.log(JSON.stringify({ total: results.length, fail: fail.length, results }, null, 2));
process.exit(fail.length ? 1 : 0);
