# Final summary draft (update until 08:45)

**Deadline:** 09:00 CEST · Report at 08:45 · Demo vanvittigt

## Infrastructure
- `scripts/coordinator-loop.sh` (nohup) — every 10 min merge D→A→E→B→C→X→R if clean; precheck+smoke; push; on conflict abort + STATUS log
- `overnight-watchdog.sh` — keeps lanes alive; merges delegated to coordinator-loop
- Lanes: Claude A/B/C/R + Grok D/E/X

## MUST done
1. Classifications: Cipher→compute, Opendoor→platforms (forslag); maturity forslag ×345
2. X marker: no rådgiver in post text (complianceNote only)
3. Udforsk `?q=` sync verified
4. Smoke: vaerdikaede.html?isin= + tema fix; smoke 52/52 fail 0
5. ndi-paa-x unblocked (x-feed.js feedHitKind from lane-X) — 21 cards
6. Drawdown dates fixed 2025-02-18→2025-04-08
7. UX top5: takeaway, tabular-nums, transitions, top-10 disclosure, source captions

## Click highlights
1. https://christianhornskov.github.io/ndi-analytics-udkast/ (Fonden — takeaway + X markers)
2. ndi-paa-x.html
3. fakta.html / omkostninger.html / risici.html
4. index.html?view=udforsk&q=Cipher · q=Opendoor
5. selskab SoftBank / Tesla
6. vaerdikaeder.html

## Open for Christian
- Auditor name; official vol/Sharpe vs calculated 32,46%/0,89
- Confirm maturity/theme forslag (345/many)
- Pin X accounts; Pages deploy lag
- Profile coverage vs NDI-linse gap (98 profiles vs 300+ linser)
- KID samlet omkostningseksempel i kr.

## Codex handoff
See notes/HANDOFF-CODEX.md + notes/X-LANE.md + notes/THEME-FORSLAG.md


## Update 2026-10-16 02:17 CEST
- HEAD: see git log. Smoke 52/0. Coordinator-loop nohup (no auto-stash over WIP).
- Leo 02:00 MUSTs landed: dividends 38,9/38,0; Største fald; ÅOP-aften frase væk; AI-udkast kun ved tekst; vaerdikaeder ≥12px mobil.
- SHOULDs: menu 44px; life-strip collapses on mobil; tema wraps.
- FO: andetWeight 6,27 % synket; klasser-forskel; KID-omkostning; Mangler-fra-NDI-boks; HANDOFF AUM/auditor/kurve (ingen Nasdaq).
- Privat 02:07: Sådan tænker vi→Lær; færre forslag-badges; vurder-afkast uden benchmark-kurve.
- Compliance: KID RIY 2,79/2,85; Fulgt konto; kan tabe; chartMarkers uden @MadsC007.
- invester.html steps already 1–5 (Pages may lag).
- Open for Christian: AUM, auditor, comparison curve decision, ÅTD/delår Fundmarket, official vol/Sharpe.


## Lead update 2026-10-16 03:08:38 
- Manual merge wave: A (vaerdikaeder), E (profiles/nyhedsarkiv), X (kept KID/Fulgt konto), D (visual).
- Structural fix: `notes/status-{A–E,R,X}.md` + rebase instruction in all PROMPTs; watchdog reads ROOT prompts.
- Smoke 52 fail 0. Coordinator detached. Report 08:45.


## Vidensbot 03:00 compliance (2026-10-16 03:21 CEST) · HEAD dc59d99
1. Fondsgraf: kun @InvestNewdeal chartMarkers (+ app.js filter + loadXPosts).
2. matchPosts house-only; CHornskov «Begge er også i $PMINDI» fjernet; revealsHoldings.
3. PMINDIAKK: data[] tømt; UI/embed «Ny andelsklasse, kurs vises efter 12 måneder».
4. Nasdaq-sammenligningsnote væk; ÅTD-caveats på periode/drawdown/embed.
5. Markedsføringsmateriale på produktsider; nyhedsarkiv tab-advarsel; modenhed=forslag; HANDOFF Mads.
6. precheck guards for 1–3. Smoke 52/0.


## Pre-08:45 checklist (2026-10-16 04:09:29 )
- Vidensbot blockers 1–5: CONFIRMED on main + precheck guards green.
- Queue: invester 1–5, dividends 38,9/38,0, AI-udkast conditional, FO andet 6,27%, Mangler-boks, Sådan tænker vi→Lær, KID RIY, Markedsføringsmateriale, ÅTD caveats.
- HTML pages under docs/: 39
- Smoke: 52/0 last run. Coordinator+watchdog+monitor detached.
- Open for Christian/Codex: AUM, auditor, comparison curve (no Nasdaq), Mads maturity input, ÅTD Fundmarket approval, official vol/Sharpe, Pages lag.


## Lead update 2026-10-16 05:10 CEST · FO 05:00 + UX 04:00
- HEAD: see git log. Smoke 52/0. Precheck + internal-comment guard green.
- UX 04:00 MUSTs: fonden hist-warn beside big returns; chart cashtags scrubbed; temaer(+all) Markedsføring+KID footer + smoke.
- FO 05:00: explicit no-benchmark/no-curve + kvartalsforsinkelse; AKK inception = Fundmarket 05-12-2025; coverage 91,01 % (antal) vs 96,59 % (ældre vægt, ikke UI); kontantandel ~8,1 % eksplicit; docs/ scrubbet for Vidensbot/Leo; AUM/revisor/benchmark/modenhed → HANDOFF.
- Merges: D/E/X unblocked 04:58; loop auto-commits notes/ before merge; more D/E/X merged 05:03–05:07.
