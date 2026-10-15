You are Claude Code, working for Leo (Christian Hornskov's Chief of Staff at New Deal Invest / NDI). Christian is asleep. This prompt comes from Leo, not Christian. If you disagree or have a better idea, note it briefly in docs/notes/STATUS.md under "Fra Claude" and continue with your better approach — do not stop to ask. Work autonomously to completion without stopping to ask questions.

## Goal
Build a complete, impressive, clickable static Danish site for "NDI Analytics" at /workspace/ndi-analytics/docs/ (GitHub Pages main:/docs). URL will be https://christianhornskov.github.io/ndi-analytics-udkast/

## Must read first (thoroughly)
- /workspace/ndi-analytics/docs/notes/SPEC.md
- /workspace/ndi-analytics/docs/notes/UX-krav.md
- /workspace/ndi-analytics/docs/notes/VIDENSBOT-krav.md (esp. §4 compliance)
- /workspace/ndi-analytics/docs/notes/IDEAS.md
- /workspace/ndi-analytics/docs/notes/STATUS.md
- Brand reference CSS: /workspace/ndi-analytics/vendor/jesper-mockup/styles.css
- Mockup JS: /workspace/ndi-analytics/vendor/jesper-mockup/app.js
- Data: /workspace/ndi-analytics/docs/data/portfolio.json, latest.json, context-events.json

## Build these files (create all)
1. docs/index.html — Entré (3 doors) + SPA views: Fonden, Porteføljen, Udforsk tech. Danish. noindex.
2. docs/selskab.html — Company page (?isin=&fund=). SoftBank demo works. Problem-first copy.
3. docs/embed/chart.html — Embeddable simplified chart (Jesper style) for future homepage embed. PostMessage height.
4. docs/css/ndi.css — Brand palette: teal #89aeb4, yellow #f5ee9e sparse, bg #050a0f, text #e6e8ed, panels #313a4a / darker teal panels like mockup (#11252c).
5. docs/js/data.js — load portfolio.json + context-events.json
6. docs/js/chart.js — SVG performance chart (total return indexed), period buttons, class toggle, Nasdaq stub line OR omit Nasdaq series if no data but keep toggle disabled with note "Nasdaq-sammenligning kræver Fundmarkets godkendelse"
7. docs/js/app.js — URL state (?fund=&view=&tags=&sort=&dir=&q=), filters, tables, copy ISIN, dialogs
8. docs/om-data.html — short glossary + data sources + dates
9. Update docs/notes/STATUS.md with what you built and timestamp Europe/Copenhagen
10. Update SPEC.md statuses to done/stub where accurate

## Feature checklist (MUST)
- Entré with 3 doors: Fonden / Porteføljen / Udforsk tech
- Header: brand, Sådan investerer du (dialog with both ISINs + Kopiér), Risikoboks link
- Fonden: metrics (total since start, CAGR, YTD, 12m), chart, monthly calendar (show last 36 months by default + button "Se hele historikken"), drawdown summary, daily "Det skete i porteføljen" (top ± movers by d1, facts only, dated), context event markers on chart (peaks AND dips from context-events.json)
- WARNING near EVERY return number/chart/calendar: "Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering."
- After costs note, DKK, asOf date from data
- Portefølje: table name, weight, theme tags, maturity, P/S (or – for prerevenue), P/E only value
- Band: "Segmenter viser eksponering, ikke en anbefaling."
- Udforsk: filters maturity+theme, sort by drawdown52Approx/weight/name/ps, search, chips, reset
- Company page: problem, role, tags, metrics with dates, no advice language
- Email subscribe stub dialog (GDPR text, no real submit — show toast "Udkast: tilmelding ikke aktiv")
- Team teaser section (generic roles, no fake personal bios — "Porteføljeholdet" with placeholders linking to newdealinvest.dk if needed)
- Footer: KID links if in data, compliance, noindex already in head
- Mobile responsive 375px; desktop 1280
- .nojekyll present
- prefers-reduced-motion
- No target=_blank on internal links
- No investment advice wording (køb/sælg/anbefal/undervurderet/mulighed as advice)
- Mark maturity/P/S as "Udkast-klassifikation — ikke officiel NDI-rating" where heuristic

## Design
Follow Jesper mockup closely: outline buttons teal, dark panels, segmented controls, calm calendar colors (not screaming green/red — muted teal/rose), yellow only for sparse accent (selected check, one badge).

## Data notes
- portfolio.json already has themes, maturity heuristics, ps/pe, drawdown52Approx
- Two funds: pmindi (isin DK0062499810), pmindiakk (DK0064642623)
- Compute CAGR and monthly returns client-side from fund.data[].total
- Do NOT call live Azure; only local JSON

## Git
After building a working version:
cd /workspace/ndi-analytics
git add -A
git -c user.name="Leo (NDI)" -c user.email=leo@ndi.local commit -m "Første klikbare NDI Analytics-udkast: entré, fonden, portefølje, udforsk, embed"
git push origin main

(If push fails, note in STATUS — do not force.)

## Quality bar
Something Christian will find genuinely impressive when he wakes: polished, coherent IA, compliance-aware, Danish, works offline from docs/.

Work until the site is clickable end-to-end. Then stop.
