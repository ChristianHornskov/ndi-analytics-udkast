# STATUS – NDI Analytics overnight build

**Build lead:** Grok Bot (executor) · **Rapporterer til:** Leo (Chief of Staff) · **Christian sover.**

## Seneste opdatering
2026-10-15 20:08 CEST — Kilder læst (vision.txt, Slack, bog, Mads-tankemodel, Vidensbot 82 krav, UX-krav). Data snapshot'et. SPEC/IDEAS skrives nu. Første Claude-build lanceres herefter.

## Done
- [x] Læst vision.txt (1t1m45s) end-to-end
- [x] Læst slack_ny_graf_2026-10-15.md
- [x] Læst investeringsfilosofi_bog.md + mads_tankemodel.md (kerne)
- [x] Læst VIDENSBOT-krav.md (82 krav + 12 compliancefælder)
- [x] Læst UX-krav.md (MUST/SHOULD/COULD + IA)
- [x] Snapshot live data → docs/data/latest.json + data.json + portfolio.json (asOf 2026-10-15)
- [x] Kopieret graf-v2 + Jesper-mockup CSS/JS til vendor/ (kun COPY, ingen commits i kilderepo)
- [x] Repo struktur: docs/ til GitHub Pages, notes under docs/notes/

## In progress
- [ ] SPEC.md med alle features + timestamps + status + placering
- [ ] IDEAS.md
- [ ] Første klikbare site (entré + fonden + portefølje + udforsk + selskab + embed)
- [ ] GitHub Pages main:/docs
- [ ] Playwright 1280/375

## Next
1. Færdiggør SPEC + IDEAS
2. Claude Code: bulk site build (Leo-prompt)
3. Grok Build: review + embed-chart polish
4. Push + Pages + Playwright
5. Rapportér URL til Leo, fortsæt iteration

## Spørgsmål til Christian
*(fra UX §4 + Vidensbot + proces)*
1. Præcis ordlyd/placering for historisk-afkast-advarsel ved hvert tal inkl. kalender?
2. Må forside-kalender begrænses til 3 år når fuld historik er ét klik væk? **Default:** ja, 3 år på forside/entré-teaser, fuld historik på Fonden.
3. Tags "legacy" / "Trump-vinder/-taber" offentligt? **Default:** skjulte/interne i udkastet (UX §0.2).
4. Screener med drawdown-sort = markedsføring/rådgivning? **Default:** neutral label + disclaimer R7.
5. Level 2 (ikke-portefølje)? **Default:** kun portefølje (level 1).
6. Valuation-klasse (value/GARP/…)? **Default:** vis som beskrivende badge med metode+dato-note.
7. AI-resuméer pr. selskab? **Default:** kun stub med AI-mærkning; ingen live AI.
8. Må "Sådan investerer du" nævne konkrete banker? **Default:** generisk "dér hvor du investerer" + ISIN/kopi.
9. Nasdaq-sammenligning: **Default:** vis med note "kræver Fundmarkets godkendelse" (Vidensbot).
10. Mail-abonnement: **Default:** UI-stub (samtykke-tekst), ingen rigtig Mailchimp.

## Blokeringer
Ingen blokerende. Defaults valgt; fortsætter.
