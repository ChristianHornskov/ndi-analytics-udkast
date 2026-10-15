import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const base = 'http://127.0.0.1:8765/embed/chart.html';
mkdirSync('/tmp/embed-shots', { recursive: true });

const browser = await chromium.launch();
const errors = [];

function track(page) {
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push('console: ' + msg.text());
  });
  page.on('pageerror', err => errors.push('pageerror: ' + err.message));
}

async function waitChart(page) {
  await page.waitForFunction(() => {
    const loading = document.getElementById('chart-loading');
    const path = document.querySelector('.fund-path');
    return loading?.hidden && path && path.getAttribute('d')?.length > 20;
  }, null, { timeout: 15000 });
}

const parseDa = s => Number(String(s).replace('+', '').replace(' %', '').replace(/\./g, '').replace(',', '.'));

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
track(page);
await page.addInitScript(() => {
  window.__ndiHeights = [];
  const orig = window.postMessage.bind(window);
  window.postMessage = function (data, origin, transfer) {
    if (data && data.type === 'ndi-embed-height') window.__ndiHeights.push({ type: data.type, height: data.height });
    return orig(data, origin, transfer);
  };
});
await page.goto(base, { waitUntil: 'networkidle' });
await waitChart(page);
await page.waitForFunction(() => (window.__ndiHeights || []).length > 0, null, { timeout: 5000 }).catch(() => {});

const snapshot = await page.evaluate(() => ({
  robots: document.querySelector('meta[name="robots"]')?.content,
  lang: document.documentElement.lang,
  warning: document.getElementById('historisk-advarsel')?.textContent.trim(),
  nasdaqDisabled: document.querySelector('.nasdaq-toggle')?.disabled,
  nasdaqNote: document.querySelector('.nasdaq-note')?.textContent.trim(),
  total: document.getElementById('metric-total')?.textContent,
  cagr: document.getElementById('metric-cagr')?.textContent,
  ytd: document.getElementById('metric-ytd')?.textContent,
  fundReturn: document.getElementById('fund-return')?.textContent,
  pointe: document.getElementById('chart-pointe')?.textContent,
  title: document.getElementById('chart-title')?.textContent,
  pathLen: document.querySelector('.fund-path')?.getAttribute('d')?.length || 0,
  heights: window.__ndiHeights.slice()
}));

if (!/noindex/i.test(snapshot.robots || '')) errors.push('missing noindex');
if (snapshot.lang !== 'da') errors.push('lang is ' + snapshot.lang);
if (!snapshot.warning.includes('Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast')) errors.push('warning text mismatch');
if (!snapshot.warning.includes('Du kan tabe en del af eller hele din investering')) errors.push('warning missing loss sentence');
if (!snapshot.nasdaqDisabled) errors.push('nasdaq toggle not disabled');
if (!snapshot.nasdaqNote.includes('Nasdaq-sammenligning kræver Fundmarkets godkendelse')) errors.push('nasdaq note mismatch');
if (!snapshot.total.includes('%')) errors.push('total metric empty: ' + snapshot.total);
if (!snapshot.cagr.includes('%')) errors.push('cagr empty: ' + snapshot.cagr);
if (!snapshot.ytd.includes('%')) errors.push('ytd empty: ' + snapshot.ytd);
if (!snapshot.fundReturn.includes('%')) errors.push('legend return empty');
if (!/PMINDI/.test(snapshot.pointe)) errors.push('pointe missing class: ' + snapshot.pointe);
if (snapshot.title !== 'Totalafkast') errors.push('title ' + snapshot.title);
if (snapshot.pathLen < 50) errors.push('svg path too short');
const totalN = parseDa(snapshot.total);
if (!(totalN > 90 && totalN < 120)) errors.push('PMINDI total unexpected: ' + snapshot.total);
const cagrN = parseDa(snapshot.cagr);
if (!(cagrN > 20 && cagrN < 35)) errors.push('PMINDI CAGR unexpected: ' + snapshot.cagr);
if (!snapshot.heights.length) errors.push('no height postMessage on load');
else if (!(snapshot.heights.at(-1).height > 200)) errors.push('height too small ' + snapshot.heights.at(-1).height);

await page.screenshot({ path: '/tmp/embed-shots/desktop-pmindi-all.png', fullPage: true });

await page.locator('[data-period="1m"]').click();
await page.waitForFunction(() => document.getElementById('fund-return').textContent.includes('-'));
const oneM = await page.locator('#fund-return').innerText();
const oneMPointe = await page.locator('#chart-pointe').innerText();
if (!oneM.includes('-')) errors.push('1m return should be negative, got ' + oneM);
if (!page.url().includes('periode=1m')) errors.push('url missing periode=1m: ' + page.url());
await page.screenshot({ path: '/tmp/embed-shots/desktop-pmindi-1m.png', fullPage: true });

await page.locator('[data-fund="PMINDIAKK"]').click();
await page.waitForFunction(() => document.getElementById('legend-fund').textContent === 'PMINDIAKK');
const akkCagr = await page.locator('#metric-cagr').innerText();
const akkTotal = await page.locator('#metric-total').innerText();
const akkContext = await page.locator('#chart-context').innerText();
if (akkCagr !== 'Under 1 år') errors.push('PMINDIAKK CAGR should be Under 1 år, got ' + akkCagr);
if (!akkContext.toLowerCase().includes('kortere historik')) errors.push('missing short-history note: ' + akkContext);
const akkTotalN = parseDa(akkTotal);
if (!(akkTotalN < 5 && akkTotalN > -10)) errors.push('PMINDIAKK total unexpected: ' + akkTotal);
await page.screenshot({ path: '/tmp/embed-shots/desktop-akk.png', fullPage: true });

await page.locator('[data-period="ytd"]').click();
await page.waitForFunction(() => document.querySelector('[data-period="ytd"]').classList.contains('active'));
const ytdReturn = await page.locator('#fund-return').innerText();
if (!ytdReturn.includes('%')) errors.push('ytd period return empty');

await page.locator('[data-period="ytd"]').focus();
await page.keyboard.press('ArrowRight');
await page.waitForFunction(() => document.querySelector('[data-period="1y"]').classList.contains('active'));

if (!(await page.locator('.nasdaq-toggle').isDisabled())) errors.push('nasdaq enabled after clicks');

const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
track(mobile);
await mobile.goto(base, { waitUntil: 'networkidle' });
await waitChart(mobile);
const overflowX = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
if (overflowX > 8) errors.push('mobile horizontal overflow ' + overflowX);
if ((await mobile.locator('[data-period]').count()) !== 5) errors.push('expected 5 periods');
await mobile.locator('[data-period="3m"]').click();
await mobile.waitForTimeout(250);
await mobile.screenshot({ path: '/tmp/embed-shots/mobile-375.png', fullPage: true });

await mobile.setViewportSize({ width: 320, height: 700 });
await mobile.waitForTimeout(350);
const overflow320 = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
if (overflow320 > 8) errors.push('320 overflow ' + overflow320);
await mobile.screenshot({ path: '/tmp/embed-shots/mobile-320.png', fullPage: true });

await browser.close();

const report = { ...snapshot, oneM, akkCagr, akkTotal, ytdReturn, oneMPointe, akkContext, errors };
writeFileSync('/tmp/embed-shots/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (errors.length) {
  console.error('FAIL\n' + errors.join('\n'));
  process.exit(1);
}
console.log('OK');
