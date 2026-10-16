# NDI Analytics – final summary (overnight 15→16 Oct 2026)
_Status: DRAFT kept current by Leo/lead. Last update: see bottom timestamp._

Live: https://christianhornskov.github.io/ndi-analytics-udkast/ (udkast, noindex)

## What was built
Static Danish site (`docs/`, GitHub Pages) for NewDeal Invest PMINDI / PMINDIAKK:
- **Entré** (3 doors, "Sådan tænker vi" incl. coin game 100→+50→−40 = 90 kr., team named).
- **Fonden**: total return/CAGR with hist-warning right beside the figures, chart with @InvestNewdeal-only markers (no tickers), calendar years + monthly grid (2023 now complete), 100k example, "intet fast benchmark" + **optional Nasdaq-100 comparison line (off by default, `?view=fonden&cmp=nasdaq`) with the label "Nasdaq vises kun som sammenligning, ikke som fondens benchmark. Historisk afkast er ingen garanti."**, Kurs/Totalafkast toggle, dividend "U" ex-date markers, touch/keyboard tooltip, delayed quarterly snapshot policy. PMINDIAKK: no NAV/series until 5 Dec 2026.
- **Porteføljen / Udforsk**: 345 holdings, top 10, Danish lifecycle (Før omsætning → Moden, marked forslag), themes, search incl. NDI-perspective text, CSV, filters folded on mobile.
- **Omkostninger / Fakta / Risici**: KID RIY 2,79/2,85 % in kroner first; Fundmarket post rates folded; org chain; prospectus risk factors; "Mangler fra NDI" single box.
- **Værdikæder** (AI-compute, physical, energy, space, quantum) with ~100 company profiles, dated, "not in operation" honesty.
- **NDI på X**, nyhedsarkiv, temaer/tema, selskab pages, drawdown, sammenlign, periode, embed chart, 17 Lær pages + glossary (~130 terms).
- Compliance: Markedsføringsmateriale + KID + prospekt footer on every page; no per-stock returns; holdings ≤ 1 Jun 2026; no cashtags on fund chart; no holdings-revealing posts.

## 5 pages to show Christian
1. Fonden (with Nasdaq comparison) – https://christianhornskov.github.io/ndi-analytics-udkast/?view=fonden&cmp=nasdaq
2. Værdikæder – https://christianhornskov.github.io/ndi-analytics-udkast/vaerdikaeder.html
3. Omkostninger – https://christianhornskov.github.io/ndi-analytics-udkast/omkostninger.html
4. Sådan tænker vi – https://christianhornskov.github.io/ndi-analytics-udkast/laer/saadan-taenker-vi.html
5. NDI på X – https://christianhornskov.github.io/ndi-analytics-udkast/ndi-paa-x.html
(Bonus: Risici – …/risici.html)

## Page count
39 HTML pages in docs/ (incl. 17 under laer/) + SPA views (Entré, Fonden, Porteføljen, Udforsk). ~1.280 commits since 15 Oct 18:00 across 7 lanes + coordinator.

## Tests
- `scripts/precheck.sh` (run before every push): data cutoffs, no per-stock fields, X compliance (house-only, @InvestNewdeal markers, no $PMINDI holdings, no 13 Aug ticker post), AKK no series, Danish maturity labels, no internal agent comments in docs/.
- `scripts/smoke.mjs`: 27 URLs × 1280/375 + Nasdaq on/off and rolling/top-5 checks at both widths = 58 checks — HTTP 200, no JS errors, no advice wording, no notes leak, Markedsføring+KID footer. Last: 59/0 (08:20). Precheck now allows Nasdaq only with the exact label, off by default, and never called a benchmark.
- `scripts/jargon-sweep.mjs`: rendered-text scan for internal jargon. Clean (only glossary/NDI's own "Flodsystem").

## Open questions – Christian
- AUM (not in Fundmarket snapshot).
- Auditor name (fællesprospekt).
- Nasdaq comparison is back per Christian (07:35). Questions: should it be Nasdaq-100 **TR** instead of the price index ^NDX in DKK? Is Yahoo Finance acceptable as the source? Does Fundmarket need to approve it for marketing? Should 1 md/3 mdr periods (graf-v2 has them) and the "100.000 kr." illustration come back?
- Cash: Fundmarket pages (16 Oct ~05:40) show Kontanter **24,18 % PMINDIAKK**, **0,75 % PMINDI**, undated "historiske beholdninger". Our calculated 8 % removed. Which date, and may we show it with source?
- Fundmarket approval of ÅTD and 100k example; official vol/Sharpe (we show calculated 32,5 % / 0,89).
- Public repo vs Pages; GitHub Pages lag 1–2 min.

## Open questions – Mads
- Maturity: all 345 are forslag (heuristic). Review/approve before shown as more than forslag.
- ~116 theme suggestions + those "til gennemgang"; "Andet" 31 companies / 6,27 %.
- Which X accounts to pin; Musk/SpaceX quote use.

## Codex handoff
`notes/HANDOFF-CODEX.md` (architecture, data files, compliance rules, open items) · `notes/X-LANE.md` · `notes/THEME-FORSLAG.md` · `notes/DATA-DEFINITIONS.md` · `notes/MADS-CHECKLIST.md`. Infra: `scripts/coordinator-loop.sh` (10-min merge w/ precheck+smoke, notes auto-commit), worktrees `/workspace/ndi-wt-{A..E,R,X}`, lane prompts `notes/lanes/PROMPT-*.md`.
_Updated 2026-10-16 07:21 CEST — HEAD 160de10_

## graf-v2 review (07:35, read-only) → `notes/GRAF-V2-GAP.md`
- The public graf-v2 page currently renders no chart iframe (Wix v516: only the head script for `ndi-v2-*` postMessage). The feature list is therefore based on the shared chart release on the same Azure host (`graph/latest.json` → release 59bd88d8…, asOf 2026-10-15) plus the original graf-v2 spec. Nothing on graf-v2 or the live site was touched.
- Added, one at a time: (1) Nasdaq-100 comparison line with label [76b0e7d]; (2) Kurs/Totalafkast toggle; (3) dividend U markers; (4) touch, arrow-key and Home/End tooltip with cursor line [d24c675].
- 07:53 (Leo 07:50): (5) rolling 12-month total return, (6) table of the 5 deepest drawdowns (peak/trough/recovered), (7) staleness warning when return data is >3 days old [4b67fa6]. Generator: `scripts/build-nasdaq-compare.py`. HANDOFF-CODEX updated.
- Deliberately left out (needs a decision): 1 md/3 mdr, the "100.000 kr." illustration, 52-week highs.
- Show URL: https://christianhornskov.github.io/ndi-analytics-udkast/?view=fonden&cmp=nasdaq

## UX 08:00 fixes (allowed despite freeze) [dce1a0e]
- MUST 1 Udforsk mobile: the intro, info box and copy/CSV buttons moved into "Om listen" below the list. The first result ends at 763 px on a 375×812 screen.
- MUST 2 Fonden mobile chart: the viewBox now matches the real width, so the chart is 305×240 px with 11 px axis text. The Nasdaq line is stronger (orange #f0b45a, 2,6 px, dashed). End labels read "Fonden +104,8 %" / "Nasdaq +94,5 %" (desktop: "Nasdaq-100").
- SHOULD: cmp/visning only go into the URL on Fonden, so the Entré link stays clean. "Dyb →" is now "Se året i detaljer".
- Smoke regression added (ux-0800-mobile). Freeze from 08:20.

## Final check 08:32 CEST
HEAD 1d89d6f+ · precheck PASSED · smoke 59/0 · jargon clean (accepted: Flodsystem, screener in glossary) · Pages: the top 5 + nasdaq-compare.json return 200, and the live chart.js has the end labels. Lanes stopped committing at 08:30.
