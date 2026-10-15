// Quality-pass smoke (1280 + 375): risici, ndi-perspektiv, tema kopiér-link, embed AKK-gate/perioder,
// dialog-a11y (aria-modal, inert, fokus retur), segmenterede vælgere (radiogroup + roving tabindex).
// Kør: node scripts/smoke-quality.mjs  (kræver lokal server på :8765 med docs/ som rod)
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://127.0.0.1:8765';
const results = [];
const check = (name, ok, info = '') => results.push({ name, ok: !!ok, info: String(info).slice(0, 160) });
const ADVICE = /\b(køb nu|sælg nu|anbefaler vi|bør købe|bør sælge|undervurderet|kursmål|oplagt mulighed)\b/i;
const WARN = /Historisk afkast er ikke en pålidelig indikator/;

const browser = await chromium.launch({ headless: true });
for (const width of [1280, 375]) {
  const ctx = await browser.newContext({ viewport: { width, height: width === 1280 ? 800 : 812 } });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: BASE });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  const W = `@${width}`;
  const text = () => page.locator('body').innerText();

  // Risici
  await page.goto(BASE + '/risici.html', { waitUntil: 'networkidle' });
  let body = await text();
  check('risici: h1 ' + W, /Risici ved fonden/.test(body));
  check('risici: begge klasser ' + W, /PMINDI\b/.test(body) && /PMINDIAKK/.test(body));
  check('risici: risikoklasse fra KID ' + W, /Risikoklasse \d \/ 7/.test(body), body.slice(0, 120));
  check('risici: KID-link ' + W, (await page.locator('a[href*="fundmarket"]').count()) >= 1);
  check('risici: tab-advarsel ' + W, /tabe en del af eller hele/.test(body));
  check('risici: historisk-advarsel ' + W, WARN.test(body));
  check('risici: ingen rådgivningsord ' + W, !ADVICE.test(body) && !/Hvad du bør/.test(body));

  // NDI-perspektiv
  await page.goto(BASE + '/ndi-perspektiv.html', { waitUntil: 'networkidle' });
  body = await text();
  const rows = await page.locator('table.data tbody tr').count();
  check('ndi-perspektiv: rækker ' + W, rows >= 3, rows);
  check('ndi-perspektiv: mærket udkast/AI-udkast ' + W, /UDKAST/i.test(body) && /AI-udkast|placeholder|illustrativ/i.test(body));
  check('ndi-perspektiv: ingen opfundet livscyklus ' + W, !/High growth/i.test(await page.locator('table.data').innerText()));
  check('ndi-perspektiv: eksponering ≠ anbefaling ' + W, /ikke anbefaling/i.test(body));
  check('ndi-perspektiv: ingen procenttal pr. aktie ' + W, !/[+-]?\d+[,.]\d+\s?%/.test(await page.locator('table.data').innerText()));
  const firstHref = await page.locator('table.data tbody a').first().getAttribute('href');
  check('ndi-perspektiv: link til selskab ' + W, /^selskab\.html\?isin=/.test(firstHref || ''), firstHref);
  check('ndi-perspektiv: ingen rådgivningsord ' + W, !ADVICE.test(body));

  // Selskab: NDI-linsen (kvalitativ, AI-udkast-mærket, link til værdikæden)
  await page.goto(BASE + '/selskab.html?isin=US88160R1014&fund=pmindi', { waitUntil: 'networkidle' });
  const lens = page.locator('section.panel', { has: page.locator('h2', { hasText: 'NDI-linsen' }) });
  check('selskab: NDI-linsen panel ' + W, (await lens.count()) === 1);
  const lensText = (await lens.count()) ? await lens.innerText() : '';
  check('selskab: NDI-linsen AI-udkast-mærket ' + W, (await lens.locator('.badge').count()) >= 1);
  check('selskab: NDI-linsen ingen tal/afkast ' + W, !/\d+[,.]\d+\s?%|P\/E|P\/S|High growth/i.test(lensText), lensText.slice(0, 120));
  const chainHref = (await lens.count()) ? await lens.locator('a[href^="vaerdikaede.html?isin="]').first().getAttribute('href').catch(() => null) : null;
  check('selskab: NDI-linsen → værdikæde ' + W, chainHref === 'vaerdikaede.html?isin=US88160R1014', chainHref);
  if (chainHref) {
    await page.goto(BASE + '/' + chainHref, { waitUntil: 'networkidle' });
    check('værdikæde ?isin Tesla: 2 led ' + W, (await page.locator('.chain .node.hit').count()) === 2);
  }

  // Tema: kopiér-link-knap virker på en rigtig temaside
  await page.goto(BASE + '/tema.html?slug=chips&fund=pmindi', { waitUntil: 'networkidle' });
  const copy = page.locator('#copy-tema');
  check('tema: kopiér-knap findes ' + W, (await copy.count()) === 1);
  await page.evaluate(() => navigator.clipboard.writeText('SENTINEL'));
  await copy.click();
  await page.waitForTimeout(150);
  const clip = await page.evaluate(() => navigator.clipboard.readText()).catch((e) => 'ERR ' + e.message);
  check('tema: link i udklipsholder ' + W, clip.includes('tema.html') && clip.includes('slug=chips') && clip.includes('fund=pmindi'), clip);
  check('tema: synlig kvittering ' + W, /Kopieret|adresselinjen/.test(await copy.innerText()));
  check('tema: skærmlæser-kvittering ' + W, /kopieret|adresse/i.test(await page.locator('#copy-tema-status').innerText()));
  check('tema: historisk-advarsel ' + W, WARN.test(await text()));

  // Embed: kun ÅTD + hele perioden; AKK uden afkast
  await page.goto(BASE + '/embed/chart.html', { waitUntil: 'networkidle' });
  const periods = await page.locator('[data-period]').evaluateAll((els) => els.map((e) => e.dataset.period));
  check('embed: kun ytd+all ' + W, periods.sort().join(',') === 'all,ytd', periods.join(','));
  check('embed: PMINDI viser afkast ' + W, /%/.test(await page.locator('#fund-return').innerText()));
  await page.goto(BASE + '/embed/chart.html?periode=1m', { waitUntil: 'networkidle' });
  check('embed: ?periode=1m → hele perioden ' + W, /periode=all/.test(page.url()), page.url());
  for (const how of ['url', 'klik']) {
    if (how === 'url') await page.goto(BASE + '/embed/chart.html?klasse=PMINDIAKK', { waitUntil: 'networkidle' });
    else {
      await page.goto(BASE + '/embed/chart.html', { waitUntil: 'networkidle' });
      await page.click('[data-fund="PMINDIAKK"]');
      await page.waitForTimeout(100);
    }
    const panel = await page.locator('main').innerText();
    check(`embed AKK (${how}): ingen %-tal ` + W, !/\d\s?%/.test(panel), panel.match(/.{0,30}\d\s?%.{0,10}/)?.[0]);
    check(`embed AKK (${how}): graf skjult ` + W, !(await page.locator('#chart-container').isVisible()));
    check(`embed AKK (${how}): forklaring ` + W, /12 måneder/.test(panel));
  }
  await page.click('[data-fund="PMINDI"]');
  await page.waitForTimeout(100);
  check('embed: tilbage til PMINDI viser graf ' + W, await page.locator('#chart-container').isVisible() && /%/.test(await page.locator('#fund-return').innerText()));

  // App: AKK via store bogstaver i URL rammer AKK-gaten
  await page.goto(BASE + '/?view=fonden&fund=PMINDIAKK', { waitUntil: 'networkidle' });
  const app = await page.locator('#app').innerText();
  check('fonden: ?fund=PMINDIAKK → AKK-gate ' + W, /Vises efter 12 måneder/.test(app) && !/CAGR/.test(app));
  check('fonden AKK: ingen periodevælger ' + W, (await page.locator('[data-period]').count()) === 0);

  // Segmenterede vælgere: radiogroup, ét tabstop pr. gruppe
  await page.goto(BASE + '/?view=fonden', { waitUntil: 'networkidle' });
  const groups = page.locator('#app .seg[role="radiogroup"]');
  check('fonden: 2 radiogroups ' + W, (await groups.count()) === 2);
  const tabstops = await groups.evaluateAll((gs) => gs.map((g) => g.querySelectorAll('[role="radio"][tabindex="0"]').length));
  check('fonden: ét tabstop pr. gruppe ' + W, tabstops.every((n) => n === 1), tabstops.join(','));
  check('fonden: ingen 1/3 md ' + W, !/\b(1|3) md\b|1 måned|3 måneder/.test(await page.locator('#app .toolbar').innerText()));
  await page.locator('[data-period="all"]').focus();
  await page.keyboard.press('ArrowDown');
  check('pil ned → ÅTD (aria-checked) ' + W, await page.locator('[data-period="ytd"]').getAttribute('aria-checked') === 'true');
  check('fokus fulgte valget ' + W, await page.evaluate(() => document.activeElement?.dataset.period) === 'ytd');

  // Udforsk: temafiltre er toggle-knapper
  await page.goto(BASE + '/?view=udforsk&tags=chips', { waitUntil: 'networkidle' });
  check('udforsk: aria-pressed på tema ' + W, await page.locator('[data-tag="chips"]').getAttribute('aria-pressed') === 'true');
  const chipX = await page.locator('#chips button').first().getAttribute('aria-label');
  check('udforsk: chip-knap har navn ' + W, /Fjern filter .+/.test(chipX || ''), chipX);

  // Dialog: aria-modal, inert baggrund, ét eksemplar, fokus retur
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const opener = page.locator('.site-header [data-open="dlg-risk"]');
  if (await opener.isVisible()) {
    await opener.focus();
    await page.keyboard.press('Enter');
    check('dialog: aria-modal ' + W, await page.locator('.dialog-backdrop [role="dialog"]').getAttribute('aria-modal') === 'true');
    check('dialog: baggrund inert ' + W, await page.evaluate(() => document.querySelector('main').inert && document.querySelector('header').inert));
    check('dialog: fokus i dialog ' + W, await page.evaluate(() => !!document.activeElement?.closest('.dialog')));
    for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
    check('dialog: Tab bliver i dialog ' + W, await page.evaluate(() => !!document.activeElement?.closest('.dialog')));
    await page.keyboard.press('Escape');
    check('dialog: lukket ' + W, (await page.locator('.dialog-backdrop').count()) === 0);
    check('dialog: baggrund aktiv igen ' + W, await page.evaluate(() => !document.querySelector('main').inert));
    check('dialog: fokus retur ' + W, await opener.evaluate((el) => el === document.activeElement));
  }
  await page.locator('.site-header [data-open="dlg-follow"]').click().catch(() => {});
  if (await page.locator('.dialog-backdrop').count()) {
    check('følg-dialog: e-mail har label ' + W, (await page.getByLabel('E-mail').count()) === 1);
    await page.keyboard.press('Escape');
  }
  await page.locator('.site-header [data-open="dlg-invest"]').click();
  await page.evaluate(() => document.querySelector('.site-header [data-open="dlg-invest"]').click());
  check('dialog: kun én ad gangen ' + W, (await page.locator('.dialog-backdrop').count()) === 1);
  check('invest-dialog: ingen "kl. n." ' + W, !/kl\. n\./.test(await page.locator('.dialog').innerText()));
  await page.keyboard.press('Escape');

  check('0 konsolfejl ' + W, errors.length === 0, errors.join(' | '));
  await ctx.close();
}
await browser.close();
const fail = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.ok ? '' : '  → ' + r.info}`);
console.log(`\n${results.length - fail.length}/${results.length} ok`);
process.exit(fail.length ? 1 : 0);
