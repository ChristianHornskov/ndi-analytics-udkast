# STATUS – NDI Analytics overnight build

**2026-10-15 21:00 CEST — Sole lead. Precheck HARD. NOT DONE / NOT BLOCKED.**

## HARD RULE (every push)
```bash
bash scripts/precheck.sh          # must exit 0
bash scripts/push.sh origin main  # wraps precheck
bash scripts/test-precheck.sh     # after editing precheck
```
Prompt footer: `notes/AGENT-PROMPT-FOOTER.md` · Hook sample: `scripts/git-hooks/pre-push`

Fails on: notes in docs/ (except stub warning+index), raw data.json, holdings >2026-06-01, d1/per-stock returns, JS reading those fields.

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/ · notes → 404

## HEAD
(see git log — updated on push)

## Quality this hour
- Start-date default (VIDENSBOT #5): **første NAV** = `portfolio.funds[].inception` for all afkast/"siden start"/100k/embed. Documented in `notes/DATA-DEFINITIONS.md`. UI copy says "første NAV". `fund-meta.legalInception` = juridisk only.
- Unique-metrics: 9 ISINs, qualitative NDI-linse only; note scrubbed of advice words (smoke 96/96).
- om-data: første-NAV glossary + datakilde bullet; fixed duplicate main id.
- Grok quality2 (375px doors/metrics/sticky): metrics-rettelse landet. Døre og sticky header målt, uændrede.

## Agents
Grok visual polish cycle 2: se Fra Grok. Claude quality2 finished earlier.

## NEXT
- UX-review.md @ 22:00 CEST (MUST items only)
- VIDENSBOT-live-check.md when it arrives (blockers first)
- Keep Claude↔Grok cycles; quality > speed; never report done

## Fra Grok

**2026-10-15 21:05 CEST. Visuel polish ved 375 px. Ikke færdig.**

Entré-døre, sekundære døre, lær-døre og den sticky header er målt i browseren. De står som de var: døre i én kolonne, teksten inden for kortet, headeren fuld bredde og sticky. Ingen vandret scroll.

To brud i nøgletallene er rettet. Ingen nye tal. `portfolio.json` er urørt.

1. Ordliste-mærket "?" faldt ned på sin egen linje i den smalle 2-kolonne, så "+4,0 %" og "5 / 7" ikke startede lige. Labelen er nu et gitter: teksten til venstre, mærket 24×24 til højre. Tallene i samme række starter lige.
2. På PMINDIAKK stod sætningen "Vises efter 12 måneder" i en halv kolonne og brød over. Den står nu i fuld bredde under NAV.

Tjekket igen ved 375 og 1280: ingen sidescroll, ingen konsolfejl på de målte sider, desktop stadig fire kolonner. Døre og header er uændrede.

## Fra Claude quality3 (2026-10-15)
- **Værdikæde** (`docs/vaerdikaede.html`): tema-knapper fremhæver led (aria-pressed, `?tema=`), selskabssøgning lyser alle led op ud fra primært tema + multi-tags (`?isin=`), og hvert led har en sammenklappet liste over de 5 største positioner med vægt (themes.json, beholdning pr. 1. jun. 2026). Compute er koblet til led 3 og energiressourcer til led 1. Andet/uklassificeret vises som antal/vægt i et bånd. Ingen kurser, afkast eller nøgletal. Dobbelt `id="main"` er rettet.
- **Default (Leo):** `physical` forbliver på led 2 "Datacenter & racks" (pædagogisk forenkling). Documented in notes/DATA-DEFINITIONS.md. Kan splits senere af Christian/Mads.
- **VIDENSBOT #13**: selskab.html mærker profiltekst med `AI-udkast`-badge på 4 paneler plus linjen "genereret med AI og tjekket mod kilden [dato]. Afventer NDI's endelige gennemgang." Påstår **ikke**, at NDI har gennemgået teksten, fordi `reviewedAt` ikke dokumenterer det. Ret teksten, hvis NDI faktisk har godkendt profilerne.
- **Datostempler**: det globale stempel på index sagde "Data pr. [beholdningsdato]" på alle visninger, også Fonden. Det siger nu "Afkast pr. 14. okt. 2026 · Beholdning pr. 1. jun. 2026 (forsinket)". om-data har fået ordlisteopslaget `#g-datostempler`. På fonden var stemplerne allerede adskilt.
- multi-tags.json, SoftBank: "primært platforms" er ændret til "primært tema: Platforme".
- Sprunget over: UX-review.md har kun en 22:00-*skabelon* og ingen udfyldt review, så der er ingen MUST-punkter. VIDENSBOT-live-check.md findes ikke.
- Smoke 50/50, cycle3 58/58, quality 96/96 (1280+375, 0 konsolfejl). Precheck OK. Bygger oven på Grok 9f88824 (375-metrics). ndi.css er ikke rørt.

## Fra Claude quality4 (2026-10-15 ~21:20 CEST)
- **risici.html**: Risikolisten fra KID'et vises nu også for PMINDIAKK. Den stod allerede i fund-meta, men blev kun vist for PMINDI. Begge klasser bruger samme visning. "Central Information Dokument" er rettet til "dokument med central information (KID)". "Anbefalet ejertid" er rettet til "Anbefalet investeringsperiode ifølge KID". Overskrifterne har fået (udloddende) og (akkumulerende). USD- og tech-punktet er skrevet om til hele sætninger. Alle advarsler står der stadig.
- **laer/**: Intern jargon er fjernet: "Level 1", "v1", "senere iteration … i UI" og "idiosynkratisk" (det sidste er nu forklaret som selskabsspecifik varians). Hvorfor-mange-aktier har fået en linje om, at spredning ikke fjerner markedsrisikoen. "Temaerne på denne side" pegede på en side uden temaer og linker nu til Temaer og Værdikæde. Krydslinks er tilføjet: sådan-tænker-vi → P/E, spredning og risici; udbytte-vs-akk → risici; faq-mangler-aktie → forsinket beholdning. Lær-forsiden har fået en dør til Risici.
- **HTML-fejl**: `<main id="main" id="main">` (dobbelt attribut) er rettet i 12 filer (laer/*, invester, kort, nyhedsarkiv).
- Ingen ændringer i data, CSS eller JS.
- Sprunget over: VIDENSBOT-live-check.md findes ikke. UX-review.md har kun en 22:00-skabelon og ingen MUST-punkter.
- Smoke 50/50, cycle3 58/58 og quality 96/96 ved 1280 og 375 px, inkl. radiogroup/roving tabindex og dialog-a11y. Precheck OK. Undervejs fik cycle3 2 fejl, fordi FAQ-søgningen efter "varians" ikke ramte noget, da ordet var fjernet fra artiklen. Ordet er sat tilbage.

## Fra Claude quality5 (2026-10-15 ~21:25 CEST)
- **Smoke, værdikæde**: `scripts/smoke-cycle3.mjs` har fået 4 tjek ved 1280 og 375 px. Ved start er kun "Alle led" `aria-pressed="true"`. Et klik på Chips sætter netop den knap til true (og kun den), fremhæver mindst ét led og sætter `?tema=chips`. Et klik på "Alle led" nulstiller. Cycle3 er nu 66/66.
- **Krydslinks**: om-data har nu links til Risici / KID og Sidekort. risici har nu et link til Sidekort ud over Ordliste: SRI. Entré og kort.html linkede allerede til både risici og om-data, så de er ikke ændret.
- **id="main"**: Ingen dubletter under docs/. Hver side har højst én, og ingen tag har attributten to gange. (index.html bruger `<main>` uden id.)
- Ikke rørt: ndi.css og vaerdikaede.html, fordi Grok quality3 måske stadig arbejder i dem.
- Sprunget over: UX-review.md har kun 22:00-skabelonen, så der er ingen MUST-punkter. VIDENSBOT-live-check.md findes ikke.
- Smoke 50/50, cycle3 66/66 og quality 96/96 (1280+375, 0 konsolfejl).

## Fra Grok quality3

**2026-10-15. Værdikæde og SoftBank-badges ved 1280 og 375. Ikke færdig.**

UX-review.md har stadig kun 22:00-skabelonen, så der er ingen MUST-punkter at tage. physical ligger på led 2, og start-datoen står som i DATA-DEFINITIONS.md. Beholdnings-JSON er uændret.

1. Filtrering på værdikæden satte de andre led til 38 % opacitet. Tekst, links og fokusring faldt til omkring 2:1. Opaciteten er fjernet. Det valgte led har gul kant, gul streg inde i kortet og sætningen "Eksponering via …". De andre led kan læses.
2. Statuslinjen bad om at åbne listen, mens listen allerede var foldet ud. Den siger nu, at de største positioner er foldet ud.
3. Søgning på "sof" fremhævede SoFi, før navnet var entydigt. Feltet venter på ét navn. "SoftBank" rammer led 5. "Tesla" rammer led 1 og led 2.
4. På SoftBank gjorde klassen `brand` (logoets flex-række, min-height 36 px på mobil) de to farvede overskrifter til en flex-række, så AI-udkast-badget sad ved siden af titlen. `h2.panel-h.brand` er en almindelig overskrift igen. De fire badges står i linjen ved 375 og 1280. Logoet i headeren er stadig 36 px højt.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll på værdikæden. Ingen konsolfejl på værdikæden eller SoftBank. Tema-overskriften "Plads i værdikæden" er stadig én linje. Cycle3 66/66 og quality-smoke 96/96.

## Lead 21:29 CEST
- HEAD 5f27386; smokes 96/96 + 66/66; Claude quality6 running; waiting UX 22:00 + VIDENSBOT-live-check.

## Fra Claude quality6 (2026-10-15 ~21:35 CEST)
- **NDI-linsen (SPEC D2)** i `docs/data/unique-metrics.json`: Tesla, Nvidia, SoftBank og Meta har nu 4–5 kvalitative felter: NDI-tags, "Hvad ejer man?", plads i værdikæden (link `vaerdikaede.html?isin=…`, som lyser selskabets led op), "Hold øje med" og livscyklus. Teksten er taget fra company-profiles.json (profil + narrative) og multi-tags.json. Intet er opfundet: ingen tal, kurser, afkast, P/E eller P/S. Felter afledt af AI-profiltekst har `"ai": true` og vises med `AI-udkast`-badge.
- **Fejl rettet**: unique-metrics sagde "Livscyklus (udkast): High growth" for Tesla og Nvidia, men portfolio.json har begge som `ikke-klassificeret`. Den klassifikation var gættet, så nu står der "Ikke klassificeret" med link til lær/livscyklus. Jargon er fjernet: "Demo: SoftBank-ISIN / Level 1" og "ingen kursafkast i v1". Tesla-feltet siger udtrykkeligt, at placeringen på led 2 er pædagogisk, og at Tesla ikke bygger datacentre.
- **selskab.html**: Panelet "NDI-perspektiv (udkast)" hedder nu "NDI-linsen (udkast)" og har badges pr. felt, links til værdikæde og livscyklus samt et link til ndi-perspektiv.html. **ndi-perspektiv.html**: data escapes nu (HTML-escaping, så tekst fra JSON vises som tekst og ikke fortolkes som kode; før blev den indsat rå), AI-badges, ny overskrift og links til værdikæde og temaer i nav og tekst. Kort-døren beskriver nu indholdet i stedet for "Placeholders".
- **og:description**: temaer, selskab og selskaber havde en rå JS-skabelon (`${fmtDate(...)}`) i delings-preview. `scripts/og-meta.py` falder nu tilbage til standardteksten, når en lede indeholder `${`. Ved genkørslen fik risici.html også sin og-blok.
- **Smoke-quality**: Kravet om "placeholder" accepterer nu også "AI-udkast". Nye tjek: ingen "High growth" på ndi-perspektiv, samt på selskab Tesla: NDI-linsen-panel, badge, ingen %/P/E/P/S og et link til værdikæden, der fremhæver 2 led. 108/108 (før 96).
- Sprunget over: UX-review.md har kun en 22:00-skabelon og ingen MUST-punkter. VIDENSBOT-live-check.md findes ikke. Dialog-fokus og tabs var allerede grønne i smoke, så de er ikke ændret.
- **Til NDI**: "Hold øje med" og "Hvad ejer man?" er AI-sammenfatninger af profilerne og skal gennemgås. Livscyklus står bevidst tom, indtil NDI sætter modenhed.
- Smoke 50/50, cycle3 66/66 og quality 108/108 (1280+375, 0 konsolfejl). Precheck OK. ndi.css og vaerdikaede.html er ikke rørt.

## Fra Grok quality4

**2026-10-15. Entré, fonden og udforsk ved 1280 og 375. Ikke færdig.**

UX-review.md har stadig kun 22:00-skabelonen, så der er ingen MUST-punkter. physical ligger på led 2, og start-datoen står som i DATA-DEFINITIONS.md. Beholdnings-JSON er uændret. Værdikæden er ikke ændret.

Kontrast på entré, fonden og udforsk holder. Headeren er sticky i fuld bredde. De tre døre står i tre kolonner ved 1280 og i én kolonne ved 375. Ingen sidescroll.

1. Hintet på tabellerne var slået fra i CSS. Kalenderen, årstabellen og screenertabellen klippede kolonner på 375 uden at sige det. Der står nu "Rul til siden for flere kolonner." og "Rul til siden for alle måneder.", kun når indholdet er bredere end feltet. En lys kant til højre viser, at der er mere, og den forsvinder, når man er nået til enden. Feltet kan få fokus, så piletasterne ruller. Ved 1280, hvor tabellen er i fuld bredde, er hintet skjult.
2. Navnekolonnen på 375 har fået en tydeligere kant, så tallene ikke ligner afskårne cifre, når man ruller.
3. AI-udkast-badges på SoftBank og Tesla står i overskriftslinjen ved 375 og 1280. Badget holdes som ét ord. Overskriften er en almindelig blok, også når klassen brand sidder på den. NDI-linsens felter med badge holder sig inden for kortet. Ingen nye tal.

Tjekket i Chromium ved 1280, 375 og 320. Ingen konsolfejl på de målte sider. Smoke 50/50, cycle3 66/66, quality 108/108.

## Lead 21:56 CEST (automation resume)
- HEAD still c3b8507; no claude/grok/executor running — stalled after quality6/Grok quality4. Redispatching sole lead.
- VIDENSBOT-live-check.md arrived 21:53. Leo decisions (do not wake Christian overnight):
  1. Repo stays **public**, no history rewrite (Christian 15/10). Notes stay in `/notes` only; never under `docs/`.
  2. Trim `company-months.json` to **quarter-end snapshots only** (drop intra-quarter months); keep holdings asOf ≤ 2026-06-01.
  3. Remove Nasdaq button/copy from embed + om-data ("Fonden har intet benchmark.").
  4. Keep ÅTD + 100k overnight; morning note only if Fundmarket process needs a call.
  5. Non-blockers (sitemap/robots, "Andet" size, empty maturity) = backlog polish.
- NEXT: quality7 (deeper NDI-linse) + Vidensbot fixes above + UX ## 22:00 MUST when filled. Never claim done.

## Leo-beslutninger 22:00 (efter VIDENSBOT-live-check) – byggelederen SKAL gennemføre
1. Repo forbliver offentligt, ingen historikomskrivning (Christians beslutning 15/10). Ingen ny fortrolig tekst i notes/ – skriv neutralt.
2. Beholdningssnapshot: brug sidste data ≤ 30/6 men mærk det "forsinket snapshot, pr. <dato>". company-months.json trimmes til kvartalsslut (mar/jun/sep/dec) og maks. til 30/6-2026.
3. Nasdaq-knap og "kræver Fundmarkets godkendelse" fjernes overalt (embed, om-data) → "Fonden har intet fast benchmark."
4. PMINDIAKK-afkastserie fjernes fra docs/data/portfolio.json (kun NAV).
5. ÅTD + 100k-eksempel bliver i udkastet med advarsel (markeres "afventer Fundmarket-godkendelse" i en lille note).
6. Fjern tankestreger (–/—) og semikolon i UI-tekst.

## Lead 22:08 CEST — Leo-beslutninger 22:00 gennemført
1. Repo forbliver offentligt. Ingen historikomskrivning. Ingen ny fortrolig tekst tilføjet i notes/.
2. company-months.json trimmet til kvartalsslut (mar/jun/sep/dec), cutoff 2026-06-01. UI: "forsinket snapshot, pr. <dato>".
3. Nasdaq-knap fjernet. Copy: "Fonden har intet fast benchmark." (embed + om-data + fonden).
4. PMINDIAKK: `total` fjernet fra portfolio.json data (kun NAV/price). Gate uændret.
5. ÅTD + 100k beholdt med note "afventer Fundmarket-godkendelse".
6. Tankestreger (–/—) erstattet i UI-tekst. Semikolon i HTML-prosa erstattet med punktum (JS-kode urørt).
Smokes: quality 108/108, cycle3 66/66. Precheck OK.
NEXT: Claude↔Grok til 06:30. Læs UX-review + VIDENSBOT-live-check hver cyklus. Checkpoint mindst hver 30 min. Aldrig "done".

## Fra Claude build N1 (2026-10-15)
Læst UX-review.md (ingen nye MUST-punkter) og VIDENSBOT-live-check.md. Låste Leo-beslutninger er ikke genåbnet.

0. **Regression fra 22:00-scrub rettet.** Erstatningen af `;` og tankestreger var blind: `&amp;` blev til `&amp.` (18 steder, bl.a. værdikæde-led, footer, invest-knap) og flere sætninger fik " . " midt i (fx "ikke tilfældig . den følger", ". vi laver ikke"). Rettet med punktum + stort bogstav, komma eller kolon efter kontekst. og-meta.py indeholdt stadig tankestreger og ville genindføre dem ved næste kørsel. Scriptet er rettet, så output matcher siderne.
1. **Lær: "Hvorfor CAGR er lavere end gennemsnittet"** (laer/variance-drag.html). Tænkt eksempel (+50 % / −50 % giver 0 % i snit, men −25 % i alt, CAGR ca. −13,4 %). Tydeligt mærket som opdigtede tal, ikke om fonden. Linket fra lær-index, FAQ og ordlistens CAGR-opslag.
2. **Portefølje: vægtfordeling.** Note beregnet fra snapshottet, afrundet: PMINDI ca. 9 ud af 10, PMINDIAKK næsten alle positioner mellem ca. 0,05 % og 1 %, kun få over 1 %. "Ikke ligevægtet". Samme kvalitative sætning i "Hvorfor så mange aktier?".
   Samtidig rettet en faktuel fejl: lede sagde "Vægte summerer til ca. 100 %", men aktievægtene i snapshottet summerer til ca. 92 % (PMINDI) og ca. 90 % (AKK). Resten ligger ikke i filen. Teksten viser nu den beregnede sum.
3. **Sitemap fjernet** (VIDENSBOT #9). robots.txt uændret (Disallow: /). precheck fejler nu, hvis docs/sitemap.xml kommer tilbage. test-precheck har fået en assertion for det.
4. Rester efter månedsdata: "månedsrapporter" → "kvartalssnapshots" (selskab.html, FAQ-svaret om beholdninger).

Tjekket i Chromium ved 1280 og 375: ingen sidescroll, 0 konsolfejl. smoke fail 0, quality 108/108, cycle3 66/66, test-precheck OK, precheck PASSED.
Åbent: VIDENSBOT #6 (stort "Andet"-tema), #7 (modenhed tom) og ÅTD/100k-godkendelse hos Fundmarket. Ikke færdig.

### Fra Claude build N1, del 2: UX-review 22:00 MUST
UX-review.md fik 22:00-fund midt i cyklussen. Top 3 MUST er taget:
1. **Mobil-nav:** Fonden, Porteføljen og Udforsk var skjult under 800 px (`.hide-sm`), og nav'en var en usynlig vandret scroll. Nu er de synlige på alle bredder. "Sådan investerer du" (en dialogknap, ikke navigation) er flyttet ud af `<nav>` og står ved logoet på mobil. Header ved 375 er 97 px (2 rækker), ved 320 er den 135 px. Desktop ser ud som før. Kendt: på mobil står knappen visuelt før nav, men kommer efter i tab-rækkefølgen.
2. **Udforsk-søgning:** URL blev skrevet straks, listen 150 ms senere. Nu skrives begge i samme tik, og "Kopiér link"/CSV tømmer en ventende søgning først. Fandt samtidig en værre fejl: repaint genskabte søgefeltet og tabte fokus, så "nvid" tastet med en lille pause blev til "n". Fokus og markør gendannes nu.
3. **Vægt-sparkline:** tegnes nu som små søjler fra nul pr. kvartal (ikke en kurslinje), med synlig forklaring over tabellen: "Søjlerne ved navnet viser vægt i fonden pr. kvartal. Ikke aktiekurs."
Også: "1 resultater" → "1 resultat" (SHOULD 8), "&." (SHOULD 6) rettet i del 1, "ambitionen. her" → "Her".
smoke-cycle3 har fået regressionstjek for alle tre + scrub-artefakter + sitemap (82/82). quality 108/108, smoke fail 0, precheck PASSED.
Ikke taget: MUST 4 (ISIN som navn, Cipher/Coinbase-tags, ~24 % uklassificeret, kræver datakilde/porteføljeholdet), MUST 5 (indre scroll-fælde i tabel på mobil), SHOULD 1–5, 7, COULD. Ikke færdig.

## Lead 22:23 CEST
- HEAD 1af4a2d. Claude N1 finished. UX-review ## 22:00 committed. MUST 1–3 shipped. MUST 4 (data) deferred to Christian/portfolio. MUST 5 + SHOULD next via Grok review then Claude build.
- Rule: one builder + at most one reviewer. No parallel docs/ editors.
- Smokes: quality 108/108. Precheck OK. Not done.

## Fra Grok review R1

**2026-10-15.** Læst UX-review ## 22:00 og VIDENSBOT-live-check. MUST 4 (ISIN som navn, Cipher, Coinbase, Andet) er ikke rørt. Ingen nye tal i beholdningen.

1. **MUST 5, scroll-fælde.** På 375 havde `.table-wrap` `max-height: 70vh` og `overflow: auto`. Beholdningstabellen (80 rækker, ca. 5.600 px) rullede derfor lodret inde i den vandrette scroll, og Tema lå ude af syne. Under 560 px er max-height væk. Siden ruller lodret. Tabellen ruller kun vandret. Navnekolonnen er stadig sticky. Hintet "Rul til siden for flere kolonner." vises, når der er mere. Lodret hjul over tabellen flytter siden, ikke et indre felt. Sidste række klippes ikke.
2. **SHOULD 1.** "Åbn screener" er skjult på Udforsk, hvor man allerede er. Knappen står på Porteføljen. Døren på Entré er uændret.
3. **SHOULD 2.** Tom livscyklus (0 klassificerede, begge klasser) er foldet sammen til overskrift, UDKAST-badge og én sætning med link til lær. Kurven med de fem faser ligger i DOM og vises igen, når nogen er klassificeret. Teksten siger ikke længere, at kurven står på siden. Højden på 375 er ca. 119 px, før ca. 345 px.
4. **SHOULD 4.** "Følg med" og "Risici" havde `font-weight: 300` og lignede disabled. De har nu samme vægt og skriftstørrelse som de andre nav-links. Farven `--muted` (`#aac0c7`) på `#050a0f` er ca. 10,5:1, over kravet 4,5:1.
5. **Claude N1, tjek ved 375 og 320.** Fonden, Porteføljen og Udforsk er synlige i hovednav. Ingen sidescroll på siden. Header er 97 px ved 375 og 135 px ved 320, hvor Risici ombrydes til næste linje og stadig er helt synlig. Vægt-søjlerne er søjler fra nul, med forklaringen over tabellen, og der er ingen polyline. Ingen regression at rette. Kendt tab-rækkefølge for "Sådan investerer du" er uændret.

Smoke: quality 108/108, cycle3 82/82, 0 konsolfejl. Ikke taget: MUST 4, SHOULD 3, 5 og 7, COULD. Ikke færdig.

## Lead 22:45 CEST — Christian-retning (klassifikation + handoff)
- **Temaforslag:** 111 positioner mærket `themeStatus: forslag`. Andet-vægt PMINDI ca. 24 % → ca. 12 %. Alle ISIN-som-navn opløst (Bumble, Arm ADR, Fortinet, Taseko/Trekor, Farfetch, Marley Spoon, Opendoor-warrants, Sony Financial ADR, …). Se notes/THEME-FORSLAG.md.
- **SPEC §M:** Mads-citater (Slack + vision) → features.
- **IDEAS.md** omskrevet (problem/for/værdi/kun NDI/byg/status). Offentlig spejl: docs/ideer.html.
- **HANDOFF-CODEX.md** til næste uges Codex-review.
- Grok R1 allerede landeet (scroll-trap, livscyklus fold). Én builder ad gangen.
- NEXT: Claude build N2 (morgen-wow: temaer-forslag-UI, compare polish, lær-hub). Til 06:30. Aldrig done.

## Fra Claude build N2

**2026-10-15.** Morgen-wow. Leo-locks ikke rørt. Ingen nye tal pr. aktie (ingen afkast, P/E, P/S). Forslagstal tælles fra `themeStatus: forslag` i den forsinkede beholdning. Der er ikke tilføjet noget nyt datafelt.

1. **Temaer-hub: forslag afventer gennemgang.** Ny `themeProposals(fund)` i data.js (kun antal). temaer.html har et banner: "43 selskaber har fået et forslag til NDI-tema". 68 står stadig i Andet, og alle temaer gennemgås af porteføljeholdet. Hvert temakort har et "+N forslag"-mærke, og Andet har "68 venter på et tema". Banneret linker til en ny offentlig note `om-data.html#g-temaforslag` og til Andet. På tema.html er forslagsrækker mærket med en sætning og et "hvorfor"-link. Tallene er for PMINDI, fordi themes.json er bygget på PMINDI. Entré bruger også PMINDI, så tallet bag døren passer.
2. **Sammenlign omskrevet:** "Én portefølje, to måder at få udbyttet på". To neutrale kort, begge med outline-knap, så ingen klasse er fremhævet. Kortene har ISIN, første NAV og seneste NAV. Afkast står som "Vises på Fonden" for PMINDI og "Vises efter 12 måneder (fra 5. dec. 2026)" for AKK. AKK-gaten holder, og der vises ingen procent for AKK. Tidslinjen går fra første NAV for PMINDI til første NAV for AKK til 12-måneders-datoen. Overlap regnes nu over hele beholdningen og ikke over top-20: 320 af 320 AKK-selskaber findes i PMINDI. Siden siger eksplicit, at det ikke er to strategier (VIDENSBOT-pointe). Der er tema-eksponering side om side for begge klasser, med en største forskel på ca. 1,4 pp. Dertil kommer et "afhænger af din situation, ikke rådgivning"-bånd og en KID-footer.
3. **Entré som historie.** "Start her": tre spørgsmål og tre døre (1 Hvordan har fonden klaret sig? 2 Hvad ejer fonden? 3 Hvilke selskaber er det?). "Forstå linsen": Temaer (med forslag-mærke), AI-værdikæden og Lær. Det er de seks døre. Under dem er der et "Hvorfor NDI Analytics?"-kort til ideer.html. Største fald og "Sådan investerer du" er flyttet til "Også i udkastet". "Sådan investerer du" står stadig i headeren. Tjekket ved 375 og 1280.
4. **UX SHOULD 1 rigtigt løst.** Grok R1 skjulte "Åbn screener" på Udforsk med CSS `:has()`. Nu udelades knappen i JS (`fundToolbar({ screener:false })`), og CSS-hacket er fjernet. Knappen står stadig på Porteføljen. SHOULD 4 (nav-kontrast) var allerede løst i R1.
5. ideer.html: ny sektion om temaforslag med links. Et sætningsbrud er rettet ("rapport. Så" → "rapport, så").

smoke-cycle3 har fået 16 N2-regressionstjek og sidescroll-tjek ved 375 for temaer, sammenlign og ideer. Resultat: 113/113. quality 108/108, smoke fail 0, 0 konsolfejl, precheck PASSED. precheck.sh er ikke ændret, så test-precheck er ikke kørt igen.
Ikke taget: MUST 4-rest (68 i Andet, modenhed), SHOULD 3, 5 og 7, COULD. notes/HANDOFF-CODEX.md havde en ucommittet "Morning demo script"-tilføjelse fra en anden. Den er ikke med i dette commit. Ikke færdig.


## Fra Grok (multi-kæde + visual variety) · 2026-10-15 ~22:58 CEST
- **Ship:** `docs/vaerdikaeder.html` + `docs/data/value-chains.json` (allerede) — 3 kæder (AI-compute, physical, energy), treemap-mosaik, tidslinje, filosofi, lodret/vandret toggle.
- **Nav:** entré-dør → vaerdikaeder; kort + klassisk vaerdikaede banner; klassisk side bevares.
- **Visual-variety pass:** `notes/VISUAL-VARIETY.md` + Grok review `notes/VISUAL-VARIETY-REVIEW.md` (godkendt, SHOULD: SVG-treemap/sunburst senere).
- **MADS-CHECKLIST:** værdikæde-blokken [x] (scroll-telling flaskehalse stadig [~]).
- Precheck OK. Ikke done — fortsæt checklist-cyklusser til 06:30.


## Fra Grok (drawdown middel/median) · ~23:00 CEST
- `drawdownEpisodes` / `drawdownSummary` i data.js; drawdown.html: small multiples (max/middel/median), underwater SVG, episode-bars.
- **Bugfix:** maxDrawdown underdrev max (fraction vs %). PMINDI max ca. −35,8 % (peak 18. feb. 2025 → bund 8. apr. 2025), ikke −21 %.
- MADS: drawdown middel/median [x]. Visual variety på drawdown-siden.


## Fra Grok (SVG treemap/sunburst) · ~23:00 CEST
- vaerdikaeder: squarify SVG-treemap + sunburst-toggle, legend, 0 konsolfejl (Playwright).
- Visual-variety SHOULD 1 lukket. Market cap-lag stadig åben (ingen mcap i data).


## Fra Grok (quantum + flaskehalse) · ~23:05 CEST
- Quantum-tema (forslag): IonQ, Rigetti, D-Wave, Quantum Computing Inc. Quantumscape uændret.
- themes.json + treemap opdateret; multi-tags bi-tag compute.
- vaerdikaeder: kap-flaskehalse scroll-telling (energi, wafers, datacenter, optik/folk) + compliance-band.
- MADS: quantum [x], flaskehalse [x]. Market cap/produktkategori stadig blokeret uden data.


## Fra Grok (unique-metrics) · ~23:10 CEST
- +4 quantum + Arm Holdings ADR i unique-metrics.json (kvalitativ, forslag/AI-udkast mærket).
- Eksisterende værdikæde-href peget til vaerdikaeder.html.
- smoke.mjs exit 0 (lokal).


## Checkpoint ~23:04 CEST (Grok sole lead)
HEAD `b35518b`. Visual-variety request shipped + reviewed. MADS værdikæde/quantum/flaskehalse/drawdown/Tesla [x]. Blokeret uden data: market cap, produktkategori, modenhed. Fortsætter til 06:30 — ikke done.


## Fra Grok (Vidensbot værdikæder) · ~23:07 CEST
- `value-chains.json` genopbygget fra `notes/VIDENSBOT-vaerdikaeder.md`: AI-compute 13 led (Mads-rækkefølge), robotik, energi, **rum**, quantum.
- Flodsystem + 5 dæmninger; compliance-band; Musk/SpaceX kun som citat m. kilde.
- Ingen handelsprog (øger eksponering / overvægt i / sikkert køb). Snapshot 2026-06-01.
- Playwright: 5 tabs, 13 AI-led, 3 space-led, 0 konsolfejl. precheck exit 0. Branch `lane-B` klar til merge-review. Næste: linser for resterende kendte navne (Andet/Platforme) eller screener-paritet.
- lær/saadan-taenker-vi: flodsystem-afsnit. Fintech = tema-note, ikke kæde.


## Smoke · ~23:10 CEST
- `scripts/smoke.mjs`: **52/52 fail 0** (inkl. vaerdikaeder). HEAD `37b6d55`.


## Fra Claude lane-B (screener/sort, cyklus 1)
- **app.js:** sortering er nu en whitelist (`SORTS` = navn/vægt/tema) i stedet for blacklist af ps/pe/drawdown; ukendte `sort=` (fx gamle `sort=pe`) normaliseres i URL. Ny **tema-sortering** (dansk temanavn, inden for tema efter vægt; "Andet" altid sidst). Stabil tie-break på navn.
- **Temastatus-filter** i Udforsk: "Uden temaforslag (230)" / "Kun temaforslag (115)" + chip + URL `status=` + i CSV-filnavn og skærmlæser-annoncering. Kun antal selskaber, ingen tal pr. aktie.
- Tom tilstand: nævner statusfilter og "Søgningen alene giver N selskaber - fjern tema-/statusfilter".
- Fokus vender tilbage til kolonneknappen efter sortering (a11y). Lede-copy rettet (multi-tag findes nu).
- **selskaber.html:** nu reel A-Z (før vægt-sorteret trods navnet): sortér Navn/Vægt/Tema, bogstav-/tema-hop, gruppe-rækker, multi-tags + forslag-badge, søgning i tema, HTML-escaping af `q` (XSS), tom tilstand m. FAQ-link.
- Test: smoke.mjs fail 0. **Præ-eksisterende** stale asserts (ikke lane-B-filer): smoke-quality "NDI-linsen → værdikæde" og smoke-cycle3 "entré: linser" forventer `vaerdikaede.html`, men links peger nu på `vaerdikaeder.html` → testen skal opdateres af ejeren af scripts/.
- precheck exit 0. Branch `lane-B` klar til merge-review. Næste: temaer-hub polish (quantum/space-synlighed, forslag-banner).


## Fra Claude lane-B (temaer-hub polish, cyklus 2)
- **Forslag-banner rettet:** sagde "48 selskaber … De lå før i Andet" - forkert: 4 (IonQ, Rigetti, D-Wave, QCI) kom fra **Compute**. Nyt felt `themeFrom` på 93 forslag-positioner i portfolio.json (baseline før `8c355a9`; kun kvalitativ metadata). Banner nu: "44 lå før i Andet. Desuden er 4 flyttet fra Compute til det nye tema Quantum." (AKK: 41 + 4).
- `themeProposals()` returnerer `fromAndet` + `retagged[]`. Ny helper `chainForTheme()` + `chainHref()` i data.js (hjem-kæde pr. tema; Energiressourcer → Energi-kæden, AI-stak → AI-compute).
- **temaer.html:** respekterer nu `?fund=` (PMINDI/PMINDIAKK-switch; tal beregnes fra valgt klasses beholdning, så de matcher tema.html). Søjler sorteret efter vægt, Andet sidst og dæmpet, min. 2 % bredde så Quantum (0,88 %) ses. "nyt tema · forslag"-badge når alle selskaber i temaet er forslag. Ny sektion "Små temaer med egen værdikæde" (SpaceTech, Quantum). Hvert tema-kort linker til sin værdikæde. Link "Se alle forslag i screeneren" (`status=forslag`).
- **tema.html:** kæde-knap peger på temaets egen kæde (Quantum → "Kvantecomputere", Space → #kap-rum) i stedet for altid AI-kæden; forslag-badge-titel "før: Compute"; kildelinje "Før forslaget: 4 i Compute". themes.json: SpaceTech-kæde `Space/Connect` → `SpaceTech/Optik & netværk` (så led bliver klikbare).
- Screener + A-Z: forslag-badge-titel viser "før: X". Entré-badge følger valgt klasse.
- **Til ejere uden for lane-B:** (1) om-data.html#g-temaforslag siger stadig kun "lå i Andet" - bør nævne Compute→Quantum. (2) vaerdikaeder.html mangler deep-link til fane (`?chain=quantum`); vi linker til #kap-kaeder. (3) smoke-quality/cycle3 stale asserts (vaerdikaede vs vaerdikaeder) uændret. (4) Port 8765 bruges af anden worktree - smoke kørt mod lane-B på 8792.
- Test: smoke fail 0; 0 konsolfejl på temaer/tema (begge klasser). precheck exit 0. Branch `lane-B` klar til merge-review. Næste: unique-metrics for flere kernenavne (kvalitativt).


## Fra Claude lane-B (NDI-linse / unique-metrics, cyklus 3)
- **unique-metrics.json: 14 → 35 selskaber**, alle med samme 5 felter: NDI-tag(s) · Hvad ejer man? (AI-udkast) · Plads i værdikæden · Hold øje med (AI-udkast) · Livscyklus = "Ikke klassificeret" (vi gætter ikke modenhed). Kun kvalitativ tekst - ingen kurser, afkast, nøgletal, prognoser eller handelssprog.
- **+21 kernenavne** (de største vægte uden linse): Sea, Carvana, Lumentum, SiTime, Wix, Sivers, MercadoLibre, CoreWeave, SoFi, Soitec, Cipher Mining, Palantir, SK Hynix, Samsung, LPKF, Babcock & Wilcox, Reddit, Robinhood, GlobalFoundries, Tower, AppLovin. Hvor portfolio.json har en profil, er teksten sammenfattet derfra; ellers kun velkendte forretningsbeskrivelser. **Starfighters Space bevidst udeladt** (for usikker viden - ikke opfundet).
- **5 tynde (1-felt) opgraderet:** Poet, Fluence, Apple, AMD, Broadcom.
- **Forældede led-numre rettet** fra den gamle 5-leds-kæde: Meta "Led 5: platforme" → "AI-compute · led 9 og led 12"; Tesla "Led 1 og led 2" → "Energi led 4 + robotik led 3". Led refererer nu til value-chains.json (13 AI-led, energi 5, robotik 3).
- Fintech-/handelsplatforme uden kæde-led (Carvana, SoFi, Robinhood) siger ærligt "Uden for AI-kæden" og linker til Platforme-temaet.
- **selskab.html:** linse-links fik forkert label - tema-links stod som "Om livscyklus". Nu "Se i værdikæden" / "Se temaet" / "Om livscyklus"; tema-links bærer `fund=`.
- **selskaber.html (A-Z):** "NDI-linse"-badge pr. række, filter "Kun med NDI-linse (35)" (URL `linse=1`, bevares i søgning), tom tilstand ("X matcher søgningen, men har ingen NDI-linse endnu" + "Vis alle selskaber"), forklaring i fodnoten.
- **Til ejere uden for lane-B:** (1) vaerdikaeder.html læser ikke `?isin=` - linse-links lander på #kap-kaeder; en deep-link/highlight af selskabets led ville gøre dem skarpere. (2) ndi-perspektiv.html linker stadig til `vaerdikaede.html` (gammel) og lister i JSON-rækkefølge - overvej sortering/gruppering efter tema nu hvor der er 35.
- Test: smoke fail 0 (kørt mod lane-B på 8792); Playwright: 35 badges, filter/tom tilstand ok, 0 konsolfejl på selskaber/selskab/ndi-perspektiv. precheck exit 0. Branch `lane-B` klar til merge-review. Næste: modenhed-UI ærlighed (item 4) / flere linser.


## Fra Claude lane-B (modenhed-UI ærlighed, cyklus 4)
- **Problem:** data har `maturity: 'ikke-klassificeret'` for alle 345/320, men (1) gamle/delte links med `?mat=garp` filtrerede tavst til **0 resultater** med en "GARP"-chip, (2) entré-lede lovede "NDI's egne temaer og modenhedsgrader", (3) Porteføljen-døren sagde "fordelt på NDI-temaer og modenhed", (4) linsens "Livscyklus: Ikke klassificeret" var hårdkodet i unique-metrics.json og ville modsige data, når klassifikation kommer.
- **app.js:** `maturityCounts()` + `sanitizeMaturity()` - `mat=` beholder kun faser, der faktisk findes i data (på tværs af klasser); ellers fjernes de fra URL ved load og popstate (samme mønster som sort/tags). `maturityFilterHtml()`: ingen knapper når 0 er klassificeret - i stedet én linje "ikke klassificeret endnu for nogen af fondens N selskaber … Vi gætter ikke" + link til lær/livscyklus. Når data kommer, dukker filterknapper op automatisk med antal pr. fase og "X af N klassificeret manuelt (udkast, ikke en rating)". Tom tilstand + CSV-filnavn kender modenhedsfilteret.
- **Entré:** lede uden "modenhedsgrader"; Porteføljen-døren siger dynamisk "Modenhed er ikke klassificeret endnu" / "Modenhed: N selskaber klassificeret (udkast)".
- **selskab.html:** nyt "Modenhed"-kort i fakta-gitteret (alle selskaber, ikke kun de 35 med linse) fra `p.maturity`; linsens Livscyklus-felt overskrives fra samme kilde, så siden aldrig siger to ting.
- Ingen nye data/tal pr. aktie. Livscykluskurven på Porteføljen var allerede ærlig (ingen prikker, "Ingen af fondens 345 … klassificeret") - uændret.
- **Til ejere uden for lane-B:** kort.html Porteføljen-dør siger "Forsinket beholdning + livscyklus" - bør nævne at livscyklus ikke er klassificeret; om-data.html "Modenhed: heuristik/udkast hvor vist" er ok men kunne sige "ikke klassificeret endnu".
- Test: smoke fail 0 (8792). Playwright: `?mat=garp,bogus&tags=chips` → URL normaliseret til `tags=chips`, 56 resultater, 0 mat-knapper, chip kun "Chips"; simuleret data (5 klassificeret via route-intercept) → knapper "Præ-profit (2)", "GARP (3)", `mat=garp` bevaret, 3 resultater, entré "5 selskaber klassificeret". 0 konsolfejl. precheck exit 0. Branch `lane-B` klar til merge-review. Næste: flere NDI-linser (kvalitativt) / A-Z-modenhed hvis data kommer.


## Fra Claude lane-B (NDI-linse runde 2 + screener-linse, cyklus 5)
- **unique-metrics.json: 35 → 68 selskaber** (+33), samme 5 kvalitative felter (NDI-tag · Hvad ejer man? (AI-udkast) · Plads i værdikæden · Hold øje med (AI-udkast) · Livscyklus "Ikke klassificeret"). Næste vægt-lag uden linse: Coinbase, Circle, Bumble, ams-OSRAM, T1 Energy, Nebius, IREN, Applied Opto, Cerebras, Roblox, SUSS MicroTec, Coupang, Huber+Suhner, FormFactor, Centrus, Corning, IQE, Uber, NextEra, BWX, Semtech, Ford, Lightwave Logic, Comstock, EQT, Antero, Jacobs, Lemonade, Root, US Antimony, Upstart, Hims & Hers, Opendoor. Tekst fra portfolio.json-profil hvor den findes, ellers kun velkendte forretningsbeskrivelser. Ingen tal/kurser/prognoser.
- **Bevidst udeladt (for usikker viden, ikke opfundet):** Starfighters Space, Power Solutions Intl, Solaris Energy Infrastructure, ProPetro, GHL, Merlin, Figure Technology.
- **Ærlige tag-noter:** Nebius og IREN er tagget *Energi* i data, men forretningen er AI-cloud/datacentre - linsen siger det og placerer dem i led 9/led 2. BWX er tagget *SpaceTech*, men kernen er nuklear (Energi led 2). Naturgasproducenter (EQT, Antero, Comstock) placeres ved Energi led 1 med "producerer gassen, ikke strømmen". → NDI bør se på, om Nebius/IREN-temaet er rigtigt (ikke ændret her).
- **Arm** opgraderet fra tynd legacy-linse ("Chip-laget", link uden isin) til standard 5 felter, AI-compute led 3.
- **Screener (app.js):** siden hed "Screener · NDI-linse", men viste ingen linse. Nu: `NDI-linse`-badge pr. række (linker til `selskab.html#ndi-linse`), filter "Kun med NDI-linse (68/64 pr. klasse)" med `linse=1` (samme param som A-Z), chip, skærmlæser-annoncering, CSV-filnavn, tom tilstand ("et selskab uden linse er ikke vurderet dårligere" + "Vis også uden NDI-linse"). Fokus bliver på knappen efter toggle.
- **selskab.html:** linse-sektionen har `id="ndi-linse"`; band-teksten siger nu ærligt "sammenfattet fra selskabsprofilen eller offentligt kendte forretningsbeskrivelser og afventer NDI-gennemgang".
- Test: smoke fail 0 (kørt mod lane-B på 8792 via kopi med node_modules-symlink). Playwright: 68 badges, filter/URL/chip/fokus ok, tom tilstand ok, AKK 64, Corning/Arm-linser rendrer, A-Z "Kun med NDI-linse (68)", ndi-perspektiv viser nye navne, 0 konsolfejl. precheck exit 0. Branch `lane-B` klar til merge-review. Næste: om nødvendigt flere linser / A-Z+screener paritet.


## Fra Claude lane-B (NDI-linse i tynde temaer + tema-sider, cyklus 6)
- **unique-metrics.json: 68 → 101 selskaber** (+33), prioriteret efter temaer med lav linse-dækning (før: SpaceTech 1/18, Fysisk tech 4/24, Chips 9/53, Energiressourcer 5/25). Samme 5 kvalitative felter; ingen tal/kurser/prognoser. Nye: Firefly, Redwire, Karman, York Space, Rolls-Royce, AST SpaceMobile · Symbotic, Serve Robotics, Mirion, Fluor, Comfort Systems, Cummins · Intel, UMC, Rambus, Advantest, Aixtron, AXT, Ambarella · Oracle, Shift4 · MACOM, Fabrinet, Keysight, Oxford Instruments, Albemarle · Expand Energy, MP Materials, Lynas, Sigma Lithium, Lithium Americas, NioCorp, Critical Metals. Projekter uden produktion (Lithium Americas, NioCorp, Critical Metals) siger det eksplicit.
- **Bevidst udeladt (for usikker viden):** Starfighters Space, Merlin, GHL, Sharonai, Bullish, Webull, MNTN, Chemours (tagget Optik, men placering uklar).
- **Ærlige tag-noter (NDI bør se på temaet, ikke ændret):** Rolls-Royce tagget SpaceTech, men kernen er flymotorer/forsvar (+ SMR). Albemarle tagget Optik & netværk, men kernen er lithium (→ Energiressourcer). Oxford Instruments tagget Optik, men forretningen er bredere instrumenter. AST SpaceMobile (Optik) placeret i Rum-kæden led 2. Rum-linser linker til `vaerdikaeder.html#kap-rum`.
- **tema.html:** nyt kort "Med NDI-linse: X af N"; NDI-linse-badge pr. række (→ `selskab.html#ndi-linse`); kolonnen "Rolle" (kun 30/345 har `role`) hedder nu "Rolle / hvad ejer man?" og falder tilbage til linsens "Hvad ejer man?" mærket "(linse, udkast)", ellers "–". Filter "Kun med NDI-linse (n)" med `linse=1` (samme param som screener/A-Z), bevares i fund-switch og "Åbn i screeneren"; tom tilstand med "Vis alle selskaber". Fodnote forklarer badge.
- **temaer.html:** hvert tema-kort viser "NDI-linse: X af N selskaber" (primært tema, som kortets øvrige tal) med link til temaets linse-filter.
- Test: smoke fail 0 (52/52, 8792); smoke-quality 104/106 - de 2 fejl er den kendte forældede assert `vaerdikaede.html?isin=` (linsen linker til `vaerdikaeder.html`), ikke ny. Playwright: SpaceTech 6/18 linser, filter/URL/fund-switch bevarer `linse=1`, Andet+linse = 3 rækker, Quantum 4/4, temaer-kort viser linse-antal, Firefly-linse rendrer, A-Z + screener "Kun med NDI-linse (101)", 0 konsolfejl. precheck exit 0. Branch `lane-B` klar til merge-review. Næste: linser for resten af Platforme/Software + Andet-navne med kendt forretning.
- **Til ejere uden for lane-B:** ndi-perspektiv.html lister nu 101 linser i JSON-rækkefølge - gruppering/søgning efter tema anbefales. vaerdikaeder.html læser stadig ikke `?isin=`.


## Fra Claude lane-B (NDI-linse kerne-AI + nabolag i led, cyklus 7)
- **unique-metrics.json: 101 → 150 selskaber** (+49), samme 5 kvalitative felter; ingen tal/kurser/prognoser/handelssprog. Prioriteret efter iøjnefaldende huller i AI-stakken: **udstyr** (ASML, Lasertec, Besi, Camtek, Onto, Kokusai, Aehr), **hukommelse/lagring** (Micron, Sandisk, Kioxia, Western Digital, Seagate), **servere/netværk** (Super Micro, Dell, Arista, Celestica, Jabil), **optik** (Ciena, Coherent, Amphenol), **chips** (Renesas → Robotik led 1, Monolithic Power), **energi** (Vistra, Talen, Oklo, Southern, GE Vernova, Quanta, NuScale, Bloom, Generac), **råstoffer** (Freeport, Energy Fuels), **rum** (Rocket Lab, Planet, Intuitive Machines, Howmet), **platforme** (Netflix, DoorDash, Nu, Prosus, Klarna), **software** (Strategy, SoundHound), **køretøjer** (Rivian, GM), **Andet** (Tempus AI → led 10 data, Joby, Newmont).
- Multi-tag fra multi-tags.json bruges automatisk (Bloom, NuScale → "Energi + fysisk tech"; Bloom-hint siger "Primært tema i data: Andet").
- **Ærlige tag-noter (ikke ændret i data):** GE Vernova tagget Fysisk tech, men hører også til Energi. Howmet tagget SpaceTech, men kernen er luftfart ("Uden for rum-kædens led"). Strategy (MicroStrategy) tagget Software, men kernen er en bitcoin-beholdning. Oklo/NuScale/Joby siger eksplicit "ingen i drift / afventer godkendelse".
- **selskab.html:** ny række i NDI-linsen "Andre med NDI-linse i <kæde> · led N" - udledt af linsens "Plads i værdikæden" (håndterer "led 9 og led 12" og "Energi led 4 + robotik led 3"), kun selskaber i valgt klasse, maks 10 + "+ N flere", mærket "nabolag, ikke en sammenligning eller rangering". Ingen vægte vises. Uden-for-kæden-linser får ingen række.
- Test: smoke fail 0 (8792); smoke-quality 104/106 - kun den kendte forældede `vaerdikaede.html?isin=`-assert. Klarna-teksten "køb nu, betal senere" udløste rådgivningsord-vagten → omformuleret til "udskudt betaling". Playwright: ASML → 10 led-4-naboer (AKK: +5 flere), Micron → 7 i led 6, Tesla → Energi led 4 + Robotik led 3, Netflix → ingen række, A-Z + screener "Kun med NDI-linse (150)", 0 konsolfejl. precheck exit 0. Branch `lane-B` klar til merge-review. Næste: linser for resterende kendte navne (Andet/Platforme) eller screener-paritet.
- **Til ejere uden for lane-B:** ndi-perspektiv.html lister nu 150 linser i JSON-rækkefølge - gruppering efter tema/led er nu reelt nødvendig. vaerdikaeder.html læser stadig ikke `?isin=` (linse-links lander på #kap-kaeder).
