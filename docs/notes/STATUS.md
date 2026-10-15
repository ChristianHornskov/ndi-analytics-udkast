**PAGES LIVE (HTTP 200):** https://christianhornskov.github.io/ndi-analytics-udkast/  · 2026-10-15 ~20:15 CEST

# STATUS – NDI Analytics overnight build

**Build lead:** Grok Bot (executor) · **Rapporterer til:** Leo · **Christian sover.**

## Seneste opdatering
**2026-10-15 20:16 CEST** — v1.1: AI-værdikæde light, team-teaser, kind-label fix. Pages status: building.

**2026-10-15 20:14 CEST** — Første klikbare version er live lokalt + pushet. Playwright 1280/375: 0 console errors.

## Live URL
https://christianhornskov.github.io/ndi-analytics-udkast/
(GitHub Pages: main:/docs — kan tage 1–2 min at opdatere)

## Feature-summary (v1)
- **Entré** med 3 døre (Fonden / Porteføljen / Udforsk) + “Sådan tænker vi” + porteføljehold-teaser + eksponering≠anbefaling-bånd
- **Fonden:** klassevalg, perioder, SVG-graf, CAGR/YTD/12m/total, månedskalender (3 år + fuld historik), drawdown, “Det skete i porteføljen”, kontekstprikker (toppe+dyk), historisk-afkast-advarsel ved tal, Nasdaq deaktiveret med Fundmarket-note
- **Porteføljen / Udforsk:** NDI-temaer, modenhed, P/S (– for præ-revenue), P/E kun value, sortering (inkl. fald fra top), søgning, chips, URL-state
- **Selskabsside:** SoftBank-demo, problem-first, AI-stub-mærkning
- **Embed-graf** `docs/embed/chart.html` til forside-integration
- **Om data**, Kopiér ISIN-dialog, mail-stub (GDPR-tekst)
- **Compliance:** noindex, danske advarsler, delayed snapshot-data, ingen dispositionsforklaringer
- **Vidensbot + UX-krav** indarbejdet i SPEC

## Done
- [x] Kilder + Vidensbot 82 + UX-krav læst
- [x] SPEC / IDEAS / STATUS
- [x] Data snapshot portfolio.json
- [x] Site v1 (HTML/CSS/JS)
- [x] GitHub Pages konfigureret
- [x] Playwright smoke + extended (desktop+mobile)
- [x] Push til main

## In progress / next
- [ ] Claude Code (#2) og Grok Build (embed polish) kører stadig – merge forbedringer når de lander
- [ ] Livscyklus-strip, værdikæde-kort (SHOULD)
- [ ] Kryds-review Claude↔Grok
- [ ] Flere kontekst-events med redaktionel kvalitet
- [ ] Team-billeder når footage findes (Jesper)
- [ ] Iteration ud fra Leo / UX-reviewer / Vidensbot feedback

## Fra Claude
(venter – proces kører, stdout bufferet)

## Fra Grok
(venter på embed-polish)

## Spørgsmål til Christian
Se tidligere liste i STATUS (defaults valgt). Nye:
- Skal SoftBank’s 1-års tal (−77,8 % i snapshot) fremhæves med ekstra kontekst, eller er advarslen nok?
