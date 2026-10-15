/** Shared X card renderer — own UI, no embed script. Static snapshot only. */
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export async function loadXPosts() {
  try {
    const r = await fetch('data/x-posts.json');
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export function fmtXDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('da-DK', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return iso.slice(0, 10); }
}

export function xCard(p) {
  return `<article class="x-card panel" style="margin:0">
  <header style="display:flex;justify-content:space-between;gap:10px;align-items:baseline;margin-bottom:8px;flex-wrap:wrap">
    <strong style="font-size:14px">@${esc(p.username)}</strong>
    <time style="font-size:12px;color:var(--muted)" datetime="${esc(p.created_at)}">${esc(fmtXDate(p.created_at))}</time>
  </header>
  <p style="color:var(--text);line-height:1.55;font-size:14px;margin:0 0 10px;white-space:pre-wrap">${esc(p.text)}</p>
  <p style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0">
    <a class="outline-btn small" href="${esc(p.url)}" rel="noopener" target="_blank">Åbn på X ↗</a>
    ${(p.tickers || []).slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
    ${(p.tags || []).slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
  </p>
</article>`;
}

/** Panel for company/theme pages. Match by ticker symbols and/or theme slugs/tags. */
export function xSaysPanel(pack, { tickers = [], themes = [], limit = 4, title = 'Hvad siger X' } = {}) {
  if (!pack?.posts?.length) return '';
  const wantT = new Set((tickers || []).map((t) => String(t).toUpperCase()).filter(Boolean));
  const wantTh = new Set((themes || []).map((t) => String(t).toLowerCase()).filter(Boolean));
  const nameHints = [...wantT].flatMap((t) => t.split(/[^A-Z0-9]+/)).filter((t) => t.length > 3);
  // Also keep full multi-word hints
  for (const t of wantT) if (t.length > 3 && !nameHints.includes(t)) nameHints.push(t);
  const hits = pack.posts.filter((p) => {
    const ts = (p.tickers || []).map((t) => String(t).toUpperCase());
    const th = (p.tags || []).map((t) => String(t).toLowerCase());
    const text = String(p.text || '').toUpperCase();
    const byTicker = ts.some((t) => wantT.has(t));
    const byTheme = th.some((t) => wantTh.has(t));
    const byName = nameHints.some((h) => text.includes(h) || ts.includes(h));
    return byTicker || byTheme || byName;
  }).sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  if (!hits.length) return '';
  const cards = hits.slice(0, limit).map(xCard).join('');
  return `<section class="panel x-says">
  <h2 class="panel-h">${esc(title)}</h2>
  <p class="band">Udvalgte offentlige opslag — ikke NDI's holdning. Statisk snapshot (${esc((pack.snapshotAt || '').slice(0, 10))}). Egne kort — ingen X-embed.</p>
  <div style="display:grid;gap:12px;margin-top:12px">${cards}</div>
  <p class="link-row" style="margin-top:12px"><a class="outline-btn small" href="ndi-paa-x.html">Hele NDI på X-feedet →</a></p>
</section>`;
}
