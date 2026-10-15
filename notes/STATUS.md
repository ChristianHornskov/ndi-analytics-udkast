# STATUS – NDI Analytics overnight build

**Build lead:** Grok Bot (executor) · **Leo** · Christian sover.

## Seneste opdatering
**2026-10-15 20:27 CEST** — Shift-chunk push: compliance-låst v1 + overnight ekspansion (tema/lær/drawdown/invester/…). Pages live. Næste polish-worker kickes.

## Live URL
https://christianhornskov.github.io/ndi-analytics-udkast/ · Pages `built` · HTTP 200

## Done (denne chunk)
- [x] Monitoreret Claude×2 + Grok embed; dual-build `docs/b/` data merged → `docs/data/` (company-profiles, fund-meta); `docs/b` ikke linked
- [x] Notes kanonisk i `/notes` (aldrig under `docs/` – Pages). `docs/notes/` kun stub/redirect
- [x] Compliance urgent: delayed holdings **2026-06-01**; ingen dags-movers; PMINDIAKK uden afkast; PMINDI kun start/YTD/kalenderår; ingen uvurderede aktie-YTD/P/S/P/E/52w
- [x] Site ekspansion: `tema.html`, `laer/*`, `drawdown.html`, `invester.html`, `sammenlign.html`, `selskaber.html`, `periode.html`, `nyhedsarkiv.html`, Grok embed (`embed/chart.css|js|html`)
- [x] Playwright extended: 14 paths × desktop+mobile = OK
- [x] Push til origin/main (dette commit)

## In progress / next
- [ ] Polish-worker: wire `company-profiles.json` på selskabssider; tema deep-pages fra `themes.json`; mobile vs Jesper
- [ ] Cross-review Claude↔Grok (“better not different”)
- [ ] UX-review.md (mangler stadig – ingen live UX-reviewer endnu)
- [ ] Flere dokumenterede kontekst-events (kun udbytte/source)
- [ ] Print-CSS; embed CTA

## Fra Claude
Compliance-first strip af aktietal + AKK-gate; notes flyttet til `/notes`. Ekspansion iht. OVERNIGHT-BACKLOG.

## Fra Grok
Embed polish landet (egen chart.css/js, postMessage height, Nasdaq disabled note).

## Agents after this push
Se `logs/*.pid` / OVERNIGHT-BACKLOG cycle 2+.

## Spørgsmål til Christian
Defaults uændrede. SoftBank 1År-tal ikke vist (compliance strip).
