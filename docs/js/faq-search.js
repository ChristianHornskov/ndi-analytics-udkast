/** FAQ-søgning på tværs af lær-artikler + ordliste (klient-side, ingen server).
 *  Indekset bygges ved at hente de statiske lær-sider og læse <main>-teksten.
 *  Advarsels-/båndtekster udelades af indekset, så de ikke giver støjtræf. */

// Artikellisten læses fra lær-indekset, så nye artikler automatisk kommer med i søgningen
const HUB = 'index.html';
const FALLBACK_ARTICLES = ['saadan-taenker-vi.html', 'hvorfor-mange-aktier.html', 'pe-forklaring.html', 'livscyklus.html', 'faq-mangler-aktie.html'];
const GLOSSARY_URL = '../om-data.html';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

async function fetchDoc(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(url);
  return new DOMParser().parseFromString(await r.text(), 'text/html');
}

async function buildIndex(curated) {
  const docs = [];
  for (const c of curated) docs.push({ kind: 'Spørgsmål', title: c.q, text: c.a, href: c.href });
  let articles = FALLBACK_ARTICLES;
  try {
    const hub = await fetchDoc(HUB);
    const found = [...hub.querySelectorAll('main a[href]')].map((a) => a.getAttribute('href'))
      .filter((h) => /^[a-z0-9-]+\.html$/.test(h) && h !== 'faq.html' && h !== HUB);
    if (found.length) articles = [...new Set(found)];
  } catch { /* fallback-listen bruges */ }
  const settled = await Promise.allSettled(articles.map(async (href) => {
    const d = await fetchDoc(href);
    const main = d.querySelector('main');
    main.querySelectorAll('.warn,.band,.eyebrow,script').forEach((n) => n.remove());
    const title = main.querySelector('h1')?.textContent.trim() || href;
    main.querySelector('h1')?.remove();
    return { kind: 'Artikel', title, text: main.textContent.replace(/\s+/g, ' ').trim(), href };
  }));
  for (const s of settled) if (s.status === 'fulfilled') docs.push(s.value);
  try {
    const g = await fetchDoc(GLOSSARY_URL);
    g.querySelectorAll('[id^="g-"]').forEach((el) => {
      docs.push({
        kind: 'Ordliste',
        title: el.querySelector('dt')?.textContent.trim() || el.id,
        text: el.querySelector('dd')?.textContent.trim() || '',
        href: `${GLOSSARY_URL}#${el.id}`,
      });
    });
  } catch { /* ordliste er valgfri i indekset */ }
  return docs.map((d) => ({ ...d, nTitle: norm(d.title), nText: norm(d.text) }));
}

/** Træf = alle ord skal findes (titel eller tekst). Titeltræf vægtes højest. */
function search(index, query) {
  const terms = norm(query).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return index.map((d) => ({ d, score: 0, pos: -1 }));
  const out = [];
  for (const d of index) {
    let score = 0, pos = -1, ok = true;
    for (const t of terms) {
      const inTitle = d.nTitle.includes(t);
      const i = d.nText.indexOf(t);
      if (!inTitle && i < 0) { ok = false; break; }
      score += (inTitle ? 5 : 0) + (i >= 0 ? 1 : 0);
      if (pos < 0 && i >= 0) pos = i;
    }
    if (ok) out.push({ d, score, pos });
  }
  return out.sort((a, b) => b.score - a.score);
}

function snippet(text, pos, terms) {
  const from = Math.max(0, pos < 0 ? 0 : pos - 60);
  let s = (from ? '…' : '') + text.slice(from, from + 180) + (text.length > from + 180 ? '…' : '');
  s = esc(s);
  // Markér træf; NFKD-normalisering ændrer ikke længden for danske bogstaver, så simpel case-insensitiv match er nok
  for (const t of terms) {
    if (!t) continue;
    s = s.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>');
  }
  return s;
}

export async function initFaq({ input, list, count, curated }) {
  list.innerHTML = '<p class="muted">Bygger søgeindeks…</p>';
  const index = await buildIndex(curated);
  const url = new URL(location.href);
  input.value = url.searchParams.get('q') || '';

  function paint() {
    const q = input.value.trim();
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    const hits = search(index, q);
    count.textContent = q ? `${hits.length} træf for “${q}”` : `${index.length} spørgsmål, artikler og ordlisteopslag`;
    if (!hits.length) {
      list.innerHTML = `<div class="empty-state" role="status">
        <strong>Ingen træf for “${esc(q)}”</strong>
        <span>Prøv et kortere ord (fx “udbytte”, “spredning”, “P/E”) eller se alle <a href="index.html">lær-artikler</a> og <a href="../om-data.html">ordlisten</a>.</span>
        <button type="button" class="outline-btn small" data-clear>Ryd søgning</button>
      </div>`;
      return;
    }
    list.innerHTML = hits.map(({ d, pos }) => `<a class="faq-hit" href="${esc(d.href)}">
        <span class="faq-kind">${d.kind}</span>
        <strong>${esc(d.title)}</strong>
        <span class="faq-snip">${snippet(d.text, pos, terms)}</span>
      </a>`).join('');
  }
  input.addEventListener('input', () => {
    const u = new URL(location.href);
    if (input.value.trim()) u.searchParams.set('q', input.value.trim()); else u.searchParams.delete('q');
    history.replaceState(null, '', u);
    paint();
  });
  list.addEventListener('click', (e) => {
    if (e.target.closest('[data-clear]')) { input.value = ''; input.dispatchEvent(new Event('input')); input.focus(); }
  });
  paint();
}
