# STATUS – NDI Analytics overnight build

**2026-10-15 20:37 CEST — NOT DONE. HEAD aa5eac3. Cycles 1–9a. Agents still running.**

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/  
Home/tema/faq/kort **200** · notes/STATUS.md **404** ✓

## Compliance locked
Notes `/notes` only · holdings ≤2026-06-01 · no daily movers · AKK no returns · PMINDI no 1m/3m · no Nasdaq · no fake stock figures · context = udbytte only

## Depth now
25+ HTML surfaces · multi-tag · weight sparklines · CSV · livscyklus · 100k eksempel · kontekstgraf · tema-vægtbars · risici/KID · lær 8 artikler+FAQ · SoftBank profiles · Playwright 40/40

## NEXT (continue immediately)
- UX-review @ 22:00 CEST (checklist in notes/UX-review.md)
- More company unique-metrics
- Never report done

## Fra Claude — Cycle 6 (20:44 CEST, landet i HEAD)
Mine ændringer blev fejet med ind i andre agenters commits (6a/7a/8b/9b) fordi flere agenter deler working tree. Indhold verificeret i HEAD:
- **Aria-live:** vedvarende `#sr-status` (role=status) uden for `#app` i index.html; `announceFilters()` i app.js læser "PMINDI: 111 af 345 selskaber · tema … · søgning … · sorteret efter …" op ved filter/søg/sort/fond-skift (ikke ved første visning). Fjernede aria-live fra `#filter-status`, der genskabes ved hver paint (blev ikke læst op).
- **Reduced motion:** sparklines har ingen animation (verificeret: animationName=none); global regel fandtes. Tilføjet eksplicit `.spark`-guard til fremtidige animationer.
- **Nyhedsarkiv:** 6a-dublet (hvorfor-mange-aktier ×2) + tastefejl fjernet; nye stubs → `laer/udbytte-vs-akk`, `laer/livscyklus`, `laer/pe-forklaring`, `laer/faq-mangler-aktie`.
- **Senest opdateret-stempel** på entré: afkast-snapshot `performanceAsOf` (14.10.2026) + forsinket beholdning `portfolio.asOf` (1.6.2026), `<time datetime>`.
- **Blødere ordlyd:** "Du skal kunne holde investeringen i mindst 5 år" → KID-horisont som fakta; "Vælg udviklingen…" (imperativ) → "Udviklingen frem for den enkelte vinder"; "ikke det samme som langsigtet risiko" (beroligende påstand) → "Fald kan være store og vare længe"; invester.html trin uden "Vælg/Tjek/Brug"-imperativer.
- Smoke (scripts-smoke.mjs) 34/34, 0 console-fejl, 1280+375; reduced-motion-kørsel OK. Skærmbilleder: `logs/claude-shots/c6-*.png`.

**Uenighed / risiko:** flere agenter committer `git add -A` på samme tree → andres halvfærdige filer kommer med i forkerte commits. Forslag: hver agent `git add <egne filer>` eller kører i egen worktree.

## NEXT (Cycle 6-opfølgning)
- Annoncér også periode-skift på Fonden-view (kalender/graf) via `#sr-status`
- Ordlyd-pass på tema.html / selskab.html / periode.html / drawdown.html (kun index/lær/invester gennemgået)
- "Anbefalet ejertid" → KID's term "anbefalet investeringshorisont" konsekvent
- Live region på selskaber.html A–Z-søgning (har egen søgning, ingen announce)
- Never report done
