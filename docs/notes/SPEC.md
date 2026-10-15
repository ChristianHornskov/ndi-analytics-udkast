# SPEC – NDI Analytics (klikbart udkast)

**Formål:** Dedikeret NDI Analytics-site + forenklet embed-graf (Jespers stil). Statisk, dansk UI, noindex, GitHub Pages `main:/docs`.
**URL:** https://christianhornskov.github.io/ndi-analytics-udkast/
**Data:** Snapshot `docs/data/` (asOf 2026-10-15). Ingen live pipeline, ingen secrets.
**Design:** Jesper beslutter. Palet: `#89aeb4` teal, `#f5ee9e` gul (sparsom), `#050a0f` bg, `#e6e8ed` tekst, `#313a4a` flader.
**Kilder:** vision.txt, slack_ny_graf_2026-10-15.md, VIDENSBOT-krav.md, UX-krav.md, bog, mads_tankemodel.md, Jesper-mockup, graf-v2 vendor.

**Statusforklaring:** `todo` · `building` · `done` · `stub` · `deferred` · `n/a-process`

---

## A. Struktur og IA (huset)

| ID | Krav | Kilde | Status | Placering |
|---|---|---|---|---|
| A1 | Forenklet graf som embed + fuld Analytics-side | VB#1 0:26 JB | building | `docs/embed/` + `docs/index.html` |
| A2 | Start småt underside; app senere | VB#2 0:26 JB | done (princip) | dette udkast = level 1 |
| A3 | Selvstændig side (ikke kun forside-køkken) | VB#51 33:32 MC | building | Pages-site |
| A4 | Forenkl forside; go big på underside; link "Undersøg porteføljen mere" | VB#52–53 34:05/35:05 | stub | CTA på entré; V1-forside røres ikke |
| A5 | Entré med vejvisning (hus): 3 døre Fonden / Porteføljen / Udforsk | VB#59–65, UX §1.1 | building | `index.html` entré |
| A6 | Performance først for nye besøgende | VB#55–56 37:35 | building | Fonden-view |
| A7 | To andelsklasser valg (PMINDI / PMINDIAKK) | VB#57 38:18 CH | building | `?fund=` |
| A8 | CAGR meget tydelig | VB#62 42:50 CH | building | Fonden metrics |
| A9 | URL-state: fund/view/tags/sort/q (U1–U5) | UX §1.3 | building | `app.js` |
| A10 | Ingen interne `target="_blank"` | UX U7 | building | alle sider |
| A11 | noindex på alle sider | brief | building | `<meta name="robots">` |

---

## B. Performance / Fonden

| ID | Krav | Kilde | Status | Placering |
|---|---|---|---|---|
| B1 | Jespers chart-integration (embedbar, forenklet) | mockup + Slack 23:09 | building | `docs/embed/chart.html` + Fonden |
| B2 | Totalafkast-graf, perioder, klasse | mockup | building | Fonden |
| B3 | Nasdaq-100 sammenligning – fair, samme periode; **marker "kræver Fundmarkets godkendelse"**; fonden har intet fast benchmark | VB compliance #2, Leo | building | Fonden + disclaimer |
| B4 | Månedlig afkastkalender – beroligende men ærlig (røde måneder synlige) | VB#69 51:30, Slack, UX R4 | building | Fonden; teaser maks 3 år |
| B5 | Maks 3 år kalender på teaser; fuld historik ét klik væk | Slack Jesper, UX §0.3 | building | Fonden |
| B6 | Historisk-afkast-advarsel **ved hvert** afkasttal/graf/kalender | VB compliance #1, UX R1, Leo | building | komponent `warn-historisk` |
| B7 | Tal efter omkostninger; valuta DKK; fuld periode siden start | VB compliance #1 | building | metrics + note |
| B8 | Drawdown / største fald + genopretning | VB#72–73, UX F5 | building | Fonden |
| B9 | Eksempel 100.000 kr. – med periode, omkostninger, advarsel, ikke gunstigt startpunkt | VB compliance #8 | stub | Fonden (valgfri) |
| B10 | Vis totalafkast inkl. udbytte (eller forklar forskel) – undgå "uden udbytte" som default | VB compliance #7 | building | default = total |
| B11 | KID/prospekt-links begge klasser | VB compliance #6 | building | footer + Sådan investerer du |
| B12 | Risikoboks (SRI/KID, tech/USD-koncentration, tab) lige så synlig som afkast | VB compliance #5 | building | Fonden + footer |
| B13 | Omkostningsboks – bevar eksisterende tilgang, ingen nye ÅOP-beregninger | UX R9 | stub | Fonden note |

---

## C. Portefølje og klassifikationer (NDI-linse)

| ID | Krav | Kilde | Status | Placering |
|---|---|---|---|---|
| C1 | Gå på opdagelse i porteføljen | VB#18 11:45 | building | Portefølje-view |
| C2 | Ikke GICS som hovedinddeling; tags (Tesla = flere) | VB#5,#43 2:48/27:36 | building | themes i portfolio.json |
| C3 | GICS må vises sekundært | VB#42 27:17 | building | detalje |
| C4 | Modenhed: præ-revenue / præ-profit / highgrowth / GARP / value | VB#44, Slack Mads 17:01 | building | badges (heuristik + note) |
| C5 | Livscyklus fra bogen | VB#45 29:18 | stub | strip SHOULD |
| C6 | Vis også modne selskaber med formål i porteføljen | VB#47 29:53 | building | value-badge |
| C7 | Segment/tema-klik → selskaber; **eksponering, ikke anbefaling** | VB#37, Leo, VB §3 spænding | building | Udforsk + bånd |
| C8 | Level 1 = kun porteføljeaktier | VB#39,#41, UX | building | data filter |
| C9 | Sortering: drawdown fra 52u top (neutral label), vægt, navn, P/S | Slack, VB#72, UX I5 | building | Udforsk (52u stub hvis data mangler → brug y1 som proxy + label) |
| C10 | Ingen P/E undtagen value; P/S for alle undtagen præ-revenue ("–") | Slack, UX I7 §0.1 | building | tabel |
| C11 | Selskabsbeskrivelse: hvilket problem løses | Slack, UX F1/C1 | building | selskab.html |
| C12 | Trump/legacy-tags: **skjulte** i udkast | UX §0.2 | deferred | – |
| C13 | Beholdning pr. [dato] | UX 2.2 | building | caption |
| C14 | Ingen forklaring af daglige dispositioner | Slack 12/10, UX R5 | done (princip) | copy |

---

## D. Selskabsside og unikke metrics

| ID | Krav | Kilde | Status | Placering |
|---|---|---|---|---|
| D1 | Opslag pr. aktie uden klassisk PE/EBIT-fokus; NDI-vinkel først | VB#29 17:57 | building | `selskab.html` |
| D2 | Unikke NDI-nøgletal pr. selskab (ikke alle) | VB#8–9 | stub | 3–5 placeholders |
| D3 | SoftBank som demo-ISIN | UX C6 | building | link fra entré |
| D4 | Ingen kursmål/prognoser/"take" | UX C5/R2–R3 | building | copy review |
| D5 | X/nyheder: AI-mærket "Automatisk resumé, ikke NDI's vurdering" | UX R6, VB#19 | stub | sektion |
| D6 | PDF/print af visning | VB#80 59:18 | stub | print CSS |

---

## E. Kontekst, dagligt, mail

| ID | Krav | Kilde | Status | Placering |
|---|---|---|---|---|
| E1 | Kontekstgraf: narrativer for **dyk OG toppe** | Slack Mattias/Christian | stub | Fonden annotation-lag (fakta stubs) |
| E2 | Dagligt "det skete i porteføljen" – fakta, dato, forældes | Slack 12/10, UX §0.8 | building | Fonden widget |
| E3 | Email-abonnement pr. selskab/tema – UI stub, GDPR-tekst, ingen live send | VB#10, UX F8 | stub | dialog |
| E4 | AI-tekst ikke hovedsag; holdninger fra mennesker | VB#28,#34 | done (princip) | – |
| E5 | Slack→Mads holdnings-eksperiment | VB#23,#26 | deferred | internt |

---

## F. "Sådan investerer du" / CTA

| ID | Krav | Kilde | Status | Placering |
|---|---|---|---|---|
| F1 | Knappen "Sådan investerer du" + Kopiér ISIN | Slack Jesper 23:09, UX F4 | building | header dialog |
| F2 | Begge ISIN: DK0062499810 / DK0064642623 | data | building | dialog |
| F3 | Generisk "find dér hvor du investerer" – ingen konkrete banker uden godkendelse | UX Q8 default | building | copy |

---

## G. Filosofi-indhold / unikhed

| ID | Krav | Kilde | Status | Placering |
|---|---|---|---|---|
| G1 | Univers der skildrer NDI's måde at tænke tech-investering | VB#4 2:48 | building | "Sådan tænker vi" |
| G2 | Værdikædefortælling / AI-kort light | VB#6,#32,#66 | stub | tema-kort |
| G3 | Kun 0→1 unikke ting først | VB#82 1:00:21 | done (princip) | prioritetsfilter |
| G4 | Ikke nørdeplatform som default | VB#14 10:03 | done | IA |
| G5 | Tryghed for 60+ / 45 sek. besøgende | VB#70–71,#76 | building | forenklet copy |
| G6 | Undgå udokumenterede superlativer i UI | VB compliance #4 | building | copy |
| G7 | Segment = eksponering ≠ anbefaling | Leo, VB §3 | building | bånd |
| G8 | Opinion/AI: generel info, AI-mærket, kun forsinkede offentlige beholdninger | Leo | building | disclaimers |

---

## H. Compliance (12 fælder – Vidensbot §4)

| ID | Fælde | Status | Placering |
|---|---|---|---|
| H1 | Historisk afkast-advarsel, fulde perioder, efter omkostninger | building | warn-komponent |
| H2 | Nasdaq fair + Fundmarket-godkendelse-note | building | Fonden |
| H3 | Holdninger/AI = generel info, mærket, delayed holdings | building | copy |
| H4 | Ingen udokumenterede superlativer | building | copy |
| H5 | Risiko synlig | building | risikoboks |
| H6 | KID/prospekt-links | building | footer |
| H7 | Udbytte/total klarhed | building | B10 |
| H8 | 100k-eksempel forsigtigt | stub | |
| H9 | GDPR mail-stub | stub | dialog |
| H10 | Ingen persondata/investor-navne | done | |
| H11 | Ingen kopi af 3.-parts indhold | done | inspiration only |
| H12 | Bog ≠ fond (dip finder ≠ købsanbefaling) | building | labels |

---

## I. Tekniske krav

| ID | Krav | Status | Placering |
|---|---|---|---|
| I1 | Static only, docs/index.html | building | |
| I2 | Commit as Leo (NDI) / leo@ndi.local; push often | building | |
| I3 | Pages: main:/docs | todo | gh api |
| I4 | Playwright 1280 + 375, 0 console errors | todo | logs/ |
| I5 | Aldrig commit/push/modify forsidegraf eller Azure/Wix | done | vendor copy only |
| I6 | Dansk UI | building | |

---

## J. Feature-map (filer)

| Fil | Indhold |
|---|---|
| `docs/index.html` | Entré + SPA views (Fonden, Portefølje, Udforsk) |
| `docs/selskab.html` | Selskabsside |
| `docs/embed/chart.html` | Embedbar forenklet graf |
| `docs/css/ndi.css` | Brand (Jesper-palet) |
| `docs/js/app.js` | Routing, filtre, state |
| `docs/js/chart.js` | Chart rendering |
| `docs/js/data.js` | Loader for portfolio.json |
| `docs/data/*.json` | Snapshot |
| `docs/notes/SPEC.md` | denne fil |
| `docs/notes/STATUS.md` | Leo-log |
| `docs/notes/IDEAS.md` | ekstra |
| `docs/notes/VIDENSBOT-krav.md` | 82 krav |
| `docs/notes/UX-krav.md` | UX MUST/SHOULD |

---

## Opdateringslog SPEC
- 2026-10-15 20:08 CEST: Første SPEC. Indarbejdet alle 82 VB-punkter + 12 compliance + UX MUST + Leo-styring (Nasdaq Fundmarket-note, AI-mærkning, eksponering≠anbefaling, historisk advarsel overalt).
