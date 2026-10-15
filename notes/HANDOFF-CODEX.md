# Handoff til Codex (næste uge)

Udkast: NDI Analytics · GitHub Pages `main:/docs` · Repo: ChristianHornskov/ndi-analytics-udkast (offentligt, bevidst — ingen historikomskrivning).

Live: https://christianhornskov.github.io/ndi-analytics-udkast/

## Formål
Klikbart dansk udkast af "stedet man researcher tech-aktier i Danmark" (Mads). Statisk SPA under `docs/`. Ingen live Azure, ingen secrets i repo.

## Arkitektur
- **Hosting:** GitHub Pages, source `docs/`.
- **App-shell:** `docs/index.html` + `docs/js/app.js` (views: entre/fonden/portefolje/udforsk) + `docs/css/ndi.css`.
- **Undersider:** HTML-filer (tema, temaer, selskab, selskaber, drawdown, periode, sammenlign, invester, risici, om-data, kort, vaerdikaede, ndi-perspektiv, nyhedsarkiv, laer/*, embed/).
- **Data:** JSON-snapshots i `docs/data/` (ingen pipeline i udkastet).
- **Tests:** Playwright smokes (`scripts/smoke.mjs`, `smoke-quality.mjs`, `smoke-cycle3.mjs`). Precheck: `scripts/precheck.sh` før hvert push.
- **Interne noter:** kun `/notes` (repo root). `docs/notes/` er stub-advarsel.

## Vigtige filer
| Sti | Rolle |
|---|---|
| docs/js/app.js | SPA-views, screener, fonden, a11y |
| docs/js/data.js | loaders, afkast-matematik, tema-labels |
| docs/embed/* | forenklet embed-graf (YTD+all, AKK-gate) |
| docs/data/portfolio.json | fonde, NAV/totalafkast (PMINDI), NAV-only (AKK), positions |
| docs/data/company-months.json | kvartalssnapshots ≤ 2026-06-01 |
| docs/data/themes.json | aggregat pr. tema (genopbygges ved klassifikation) |
| docs/data/unique-metrics.json | NDI-linse placeholders |
| docs/data/multi-tags.json | Tesla m.fl. multi-tema |
| docs/data/fund-meta.json | KID/SRI/legal |
| scripts/precheck.sh | HARD compliance gate |
| notes/SPEC.md | krav ↔ status |
| notes/THEME-FORSLAG.md | overnight temaforslag |
| notes/DATA-DEFINITIONS.md | første NAV, physical→led2, osv. |
| notes/IDEAS.md | produktidéer |
| notes/VIDENSBOT-*.md | compliance reviews |

## Datakilder (udkast)
1. **Afkast:** Fundmarket-baseret snapshot i `portfolio.funds[].data` (PMINDI: price+total; PMINDIAKK: price only indtil 12 mdr.).
2. **Beholdning:** offentlig Fundmarket-rapport, forsinket snapshot pr. 2026-06-01 (kvartalsslut i company-months).
3. **Temaer:** manuel/NDI-linse + overnight forslag (`themeStatus: forslag`).
4. **Profiler:** `company-profiles.json` (AI-assisteret, mærket).
5. **KID:** `fund-meta.json` (SRI, key risks, URL).

## Leo-locks (må ikke genåbnes uden Christian)
- Offentligt repo, ingen force-push/historikomskrivning.
- Notes aldrig under docs/ (undtagen stub).
- Holdings ≤ 2026-06-01; company-months kun mar/jun/sep/dec.
- Ingen d1/per-stock returns/P/S/P/E i docs/.
- PMINDIAKK: ingen afkastgraf før 12 mdr.
- PMINDI: ingen 1m/3m.
- Nasdaq-knap væk; "Fonden har intet fast benchmark."
- Første NAV = performance-start.
- ÅTD + 100k: beholdt med "afventer Fundmarket-godkendelse".

## Før live (checkliste til Codex/Christian)
- [ ] Privat vs offentligt Pages-setup (compliance: notes i historik er synlige mens repo er offentligt).
- [ ] Fundmarket-godkendelse af ÅTD, 100k-eksempel, eventuel benchmark.
- [ ] Gennemgang af alle `themeStatus: forslag` (notes/THEME-FORSLAG.md).
- [ ] Modenhedsklassifikation (alle er "ikke-klassificeret").
- [ ] Erstat AI-profiltekster med NDI-godkendte.
- [ ] Live data-pipeline (Azure) — ikke i udkastet.
- [ ] X/nyhedsresuméer med sanity check.
- [ ] Fjern noindex når klar til indeks.
- [ ] GA4 / tracking efter brand-site beslutning.
- [ ] Juridisk review (KID-links, risikotekst, marketingproces).

## Smokes (seneste overnight)
Se notes/STATUS.md. Forvent: smoke-quality ~108, smoke-cycle3 ~82+, precheck PASS.

## Kontaktpunkter
- Design: Jesper (brand tokens i SPEC).
- Indhold/klassifikation: Mads + porteføljehold.
- Compliance: Vidensbot-noter.
