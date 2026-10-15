// Cycle 3 interaktions-smoke (1280 + 375): livscyklus, CSV, tastatur, FAQ-søgning, tom-tilstand, OG, compliance-data.
// Kør: node scripts/smoke-cycle3.mjs  (kræver lokal server på :8765 med docs/ som rod)
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';

const BASE = process.env.BASE || 'http://127.0.0.1:8765';
const ROOT = new URL('../docs/', import.meta.url).pathname;
const SHOTS = new URL('../logs/', import.meta.url).pathname;
const results = [];
const check = (name, ok, info = '') => results.push({ name, ok: !!ok, info: String(info).slice(0, 160) });

// --- Statisk compliance på data/filer ---
check('data.json ikke på Pages', !existsSync(ROOT + 'data/data.json'));
const cm = JSON.parse(readFileSync(ROOT + 'data/company-months.json', 'utf8'));
const lastDates = Object.values(cm.funds).map((r) => r.at(-1)?.date);
check('company-months ≤ 2026-06-01', lastDates.every((d) => d <= '2026-06-01'), lastDates.join(','));
const notesDir = (await import('node:fs')).readdirSync(ROOT + 'notes').sort().join(',');
check('docs/notes kun stub', notesDir === 'DO_NOT_ADD_NOTES_HERE.txt,index.html', notesDir);

const browser = await chromium.launch({ headless: true });
for (const width of [1280, 375]) {
  const ctx = await browser.newContext({ viewport: { width, height: width === 1280 ? 800 : 812 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  const W = `@${width}`;

  // Livscyklus
  await page.goto(BASE + '/?view=portefolje', { waitUntil: 'networkidle' });
  const life = page.locator('.life-strip');
  check('livscyklus synlig ' + W, await life.isVisible());
  check('livscyklus markeret UDKAST ' + W, /UDKAST/.test(await life.innerText()));
  check('livscyklus 5 faser ' + W, (await page.locator('.life-node').count()) === 5);
  check('livscyklus ingen gættede prikker ' + W, (await page.locator('.life-co').count()) === 0);
  await page.screenshot({ path: `${SHOTS}c3-portefolje-${width}.png`, fullPage: false });
  await life.screenshot({ path: `${SHOTS}c3-livscyklus-${width}.png` });

  // Sparkline = vægt, ikke kurs
  const sparkLabel = await page.locator('svg.spark').first().getAttribute('aria-label').catch(() => '');
  check('sparkline mærket vægt ' + W, /Vægt i fonden/.test(sparkLabel || '') && /Ikke aktiekurs/.test(sparkLabel || ''), sparkLabel);

  // CSV
  await page.goto(BASE + '/?view=udforsk&tags=chips', { waitUntil: 'networkidle' });
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#csv-export')]);
  const csv = readFileSync(await dl.path(), 'utf8');
  const lines = csv.trim().split(/\r?\n/);
  const visible = await page.locator('table.data tbody tr').count();
  check('CSV BOM + semikolon ' + W, csv.charCodeAt(0) === 0xfeff && lines[1].includes(';'), lines[1]);
  check('CSV rækker = synlige ' + W, lines.length - 2 === visible, `${lines.length - 2} vs ${visible}`);
  check('CSV ingen kursfelter ' + W, !/ytd|d1|y1|kurs|P\/E|P\/S/i.test(lines[1]), lines[1]);
  check('CSV filnavn ' + W, /^ndi-pmindi-2026-06-01-chips\.csv$/.test(dl.suggestedFilename()), dl.suggestedFilename());

  // Tom tilstand
  await page.goto(BASE + '/?view=udforsk&q=zzzzqqq', { waitUntil: 'networkidle' });
  check('tom tilstand ' + W, await page.locator('.empty-state').isVisible());
  await page.click('[data-clear-q]');
  check('ryd søgning virker ' + W, (await page.locator('table.data tbody tr').count()) > 10);

  // Tastatur: pile på fond-/periodeknapper, fokus bevares
  await page.goto(BASE + '/?view=fonden', { waitUntil: 'networkidle' });
  await page.locator('[data-period="all"]').focus();
  await page.keyboard.press('ArrowRight');
  check('pil → ÅTD ' + W, page.url().includes('periode=ytd'), page.url());
  await page.keyboard.press('ArrowRight');
  const focusedPeriod = await page.evaluate(() => document.activeElement?.getAttribute('data-period'));
  check('fokus bevaret efter gentegning ' + W, focusedPeriod && focusedPeriod.startsWith('year:'), focusedPeriod);
  await page.keyboard.press('Home');
  check('Home → Siden start ' + W, !page.url().includes('periode='), page.url());
  await page.locator('[data-fund="pmindi"]').first().focus();
  await page.keyboard.press('ArrowRight');
  check('pil skifter klasse ' + W, page.url().includes('fund=pmindiakk'), page.url());
  check('AKK: ingen afkasttal ' + W, !/Totalafkast siden start|CAGR/.test(await page.locator('#app').innerText()));

  // Escape lukker dialog og giver fokus tilbage
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const opener = page.locator('.site-header [data-open="dlg-invest"]');
  await opener.focus();
  await page.keyboard.press('Enter');
  check('dialog åbner ' + W, await page.locator('.dialog-backdrop').isVisible());
  await page.keyboard.press('Escape');
  check('Escape lukker dialog ' + W, (await page.locator('.dialog-backdrop').count()) === 0);
  check('fokus retur til knap ' + W, await opener.evaluate((el) => el === document.activeElement));

  // FAQ-søgning på tværs af lær-artikler
  await page.goto(BASE + '/laer/faq.html', { waitUntil: 'networkidle' });
  await page.waitForSelector('.faq-hit');
  const all = await page.locator('.faq-hit').count();
  check('FAQ indeks bygget ' + W, all >= 20, all);
  await page.fill('#faq-q', 'varians');
  const kinds = await page.locator('.faq-hit .faq-kind').allInnerTexts();
  check('FAQ finder artikeltekst ' + W, kinds.some((k) => /artikel/i.test(k)), kinds.join(','));
  check('FAQ markerer træf ' + W, (await page.locator('.faq-hit mark').count()) > 0);
  await page.fill('#faq-q', 'xyzxyz');
  check('FAQ tom tilstand ' + W, await page.locator('.faq-list .empty-state').isVisible());
  await page.fill('#faq-q', 'udbytte');
  await page.screenshot({ path: `${SHOTS}c3-faq-${width}.png` });

  // OG preview
  const og = await page.locator('meta[property="og:image"]').getAttribute('content');
  check('og:image absolut ' + W, /^https:\/\/.+og-card\.png$/.test(og || ''), og);

  // Ingen vandret scroll på 375 (bortset fra bevidste scroll-containere)
  if (width === 375) {
    for (const path of ['/', '/?view=fonden', '/?view=portefolje', '/?view=udforsk', '/laer/faq.html']) {
      await page.goto(BASE + path, { waitUntil: 'networkidle' });
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check(`ingen sidescroll 375 ${path}`, over <= 1, over);
      await page.screenshot({ path: `${SHOTS}c3-m${path.replace(/[^a-z]/gi, '-')}.png`, fullPage: true });
    }
  }
  check('0 konsolfejl ' + W, errors.length === 0, errors.join(' | '));
  await ctx.close();
}
await browser.close();
const fail = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.ok ? '' : '  → ' + r.info}`);
console.log(`\n${results.length - fail.length}/${results.length} ok`);
process.exit(fail.length ? 1 : 0);
