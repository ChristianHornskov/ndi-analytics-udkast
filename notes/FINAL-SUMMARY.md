# NDI Analytics – final summary (overnight 15→16 Oct 2026)
_Status: DRAFT kept current by Leo/lead. Last update: see bottom timestamp._

Live: https://christianhornskov.github.io/ndi-analytics-udkast/ (udkast, noindex)

## What was built
Static Danish site (`docs/`, GitHub Pages) for NewDeal Invest PMINDI / PMINDIAKK:
- **Entré** (3 doors, "Sådan tænker vi" incl. coin game 100→+50→−40 = 90 kr., team named).
- **Fonden**: total return/CAGR with hist-warning right beside the figures, chart with @InvestNewdeal-only markers (no tickers), calendar years + monthly grid (2023 now complete), 100k example, explicit "intet fast benchmark; ingen sammenligningskurve", delayed quarterly snapshot policy. PMINDIAKK: no NAV/series until 5 Dec 2026.
- **Porteføljen / Udforsk**: 345 holdings, top 10, Danish lifecycle (Før omsætning → Moden, marked forslag), themes, search incl. NDI-perspective text, CSV, filters folded on mobile.
- **Omkostninger / Fakta / Risici**: KID RIY 2,79/2,85 % in kroner first; Fundmarket post rates folded; org chain; prospectus risk factors; "Mangler fra NDI" single box.
- **Værdikæder** (AI-compute, physical, energy, space, quantum) with ~100 company profiles, dated, "not in operation" honesty.
- **NDI på X**, nyhedsarkiv, temaer/tema, selskab pages, drawdown, sammenlign, periode, embed chart, 17 Lær pages + glossary (~130 terms).
- Compliance: Markedsføringsmateriale + KID + prospekt footer on every page; no per-stock returns; holdings ≤ 1 Jun 2026; no cashtags on fund chart; no holdings-revealing posts.

## 5 pages to show Christian
1. Fonden – https://christianhornskov.github.io/ndi-analytics-udkast/?view=fonden
2. Værdikæder – https://christianhornskov.github.io/ndi-analytics-udkast/vaerdikaeder.html
3. Omkostninger – https://christianhornskov.github.io/ndi-analytics-udkast/omkostninger.html
4. Sådan tænker vi – https://christianhornskov.github.io/ndi-analytics-udkast/laer/saadan-taenker-vi.html
5. NDI på X – https://christianhornskov.github.io/ndi-analytics-udkast/ndi-paa-x.html
(Bonus: Risici – …/risici.html)

## Page count
38 public HTML pages (incl. 17 under laer/) + SPA views (Entré, Fonden, Porteføljen, Udforsk). ~1.000 commits overnight across 7 lanes.

## Tests
- `scripts/precheck.sh` (run before every push): data cutoffs, no per-stock fields, X compliance (house-only, @InvestNewdeal markers, no $PMINDI holdings, no 13 Aug ticker post), AKK no series, Danish maturity labels, no internal agent comments in docs/.
- `scripts/smoke.mjs`: 26 URLs × 1280/375 = 52 checks — HTTP 200, no JS errors, no advice wording, no notes leak, Markedsføring+KID footer. Last: 52/0.
- `scripts/jargon-sweep.mjs`: rendered-text scan for internal jargon. Clean (only glossary/NDI's own "Flodsystem").

## Open questions – Christian
- AUM (not in Fundmarket snapshot).
- Auditor name (fællesprospekt).
- Confirm policy: no benchmark/comparison curve.
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
