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
- Playwright: 5 tabs, 13 AI-led, 3 space-led, 0 konsolfejl.
- lær/saadan-taenker-vi: flodsystem-afsnit. Fintech = tema-note, ikke kæde.


## Smoke · ~23:10 CEST
- `scripts/smoke.mjs`: **52/52 fail 0** (inkl. vaerdikaeder). HEAD `37b6d55`.

## Fra Grok lane-D

**2026-10-15 23:56 CEST. Drawdown-former, sammenlign, embed. Ikke færdig.**

Drawdown er ikke længere fire ens kort og to mørke kasser. Hero-tal for det dybeste fald (−35,8 %, 18. feb. 2025 til 8. apr. 2025, tilbage 26. aug. 2025). Gul linje om at serien pr. 14. okt. 2026 stadig ligger −23,4 % under toppen fra 2. jun. 2026. Underwater-figur, prikfordeling (middel −5,2 %, median −2,8 %, 41 episoder), liste over de fire fald dybere end 10 %, årssøjler med link til periode. 2025 sluttede i plus og rummede alligevel det dybeste fald.

Sammenlign: tidslinje og overlap står uden panel. Temasøjlerne er det ene panel. Krydslinks til drawdown, værdikæder og udbytte-siden bliver stående efter load.

Embed: CTA i CSS, link til største fald (AKK siger at drawdown vises efter 12 måneder). "Fonden har intet fast benchmark." Nasdaq-klasser er væk fra embed-CSS.

Fælles tokens, sparsomt: `--ink`, `.figure`, `.anno`, `.hero-stat`, `.ep-ledger`, `.year-rail`. `.scarce` og `.tm-svg` er stadig page-local.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl. AKK-kortet har ingen afkastprocent. Review i `notes/VISUAL-VARIETY-REVIEW.md`. Næste: skrub på underwater, så en dag kan læses uden hover som eneste vej. Ikke færdig.

`lane-D` er pushet (`d1b1419`) og klar til merge. Ikke main.

## Fra Grok lane-D

**2026-10-15 23:59 CEST. Underwater kan skrubbes. Ikke færdig.**

Slideren under grafen er synlig. Den starter på seneste dag: 14. okt. 2026, −23,4 % under den løbende top. Home går til 22. sep. 2023 (0,0 %). Et klik i venstre side af kurven sætter 22. dec. 2023. Udlæsningen står i teksten og i `aria-valuetext`. En lys lodret streg følger dagen. Gul prik og gul ring bliver stående som bund og seneste dag.

Tjekket i Chromium ved 1280 og 375. Ingen sidescroll, ingen konsolfejl. `lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:01 CEST. Episode hopper til bunden på kurven. Ikke færdig.**

De fire dybe episoder er knapper. Klik på −35,8 % sætter udlæsningen til 8. apr. 2025, −35,8 % under den løbende top. Enter gør det samme. Én række er markeret. På 375 står tallet over teksten, og den åbne episode er stadig den gule bjælke. Ingen sidescroll, ingen konsolfejl.

`lane-D` (`671eb03` og dette commit) er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:06 CEST. Embed-fyld til nul. Ikke færdig.**

Grafens areal slutter ved 0 %. Over linjen er cyan. Under linjen er dæmpet rosa (`#c98a94`), samme tone som de negative tal. År til dato viser dykket i starten af 2026 som rosa. Hele perioden er stadig +104,8 %. PMINDIAKK viser fortsat "Vises efter 12 måneder", og svg'en er tom. Ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:17 CEST. Året med det dybeste fald er markeret. Ikke færdig.**

2025 har gul overkant og teksten "Dybeste fald". Søjlen er stadig årets afkast, +15,2 %. Sætningen under søjlerne er den samme: året sluttede i plus og rummede alligevel det dybeste fald.

På prikfordelingen står median (−2,8 %) og middel (−5,2 %) under aksen. Stregerne har en mørk kant, så de kan læses i bunken. Ingen overlap mellem tallene ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:20 CEST. Valgt dag får en prik på kurven. Ikke færdig.**

Slideren til 13. feb. 2024 sætter en cyan prik på kurven ved −3,0 %. Klik på −16,7 % sætter prikken på 7. aug. 2024. Klik på −35,8 % lader den gule bund stå, og stregen står på 8. apr. 2025. Seneste dag er stadig den gule ring, uden en ekstra prik oveni. Ingen sidescroll ved 375. Ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:22 CEST. En dag under nul er rosa i embed. Ikke færdig.**

På år til dato er 4. feb. 2026 −2,0 %. Prikken på kurven, udlæsningen og tooltip er rosa. Sluttallet på grafen er stadig +4,0 % i cyan. Hele perioden er +104,8 % i cyan. PMINDIAKK viser fortsat teksten om 12 måneder, og svg'en er tom. Tooltip ved 375 bliver inden for skærmen. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:23 CEST. Årssøjlerne deler bundlinje. Ikke færdig.**

Teksten "Dybeste fald" står over 2025-søjlen. De fire søjler ender på samme linje ved 1280. I to kolonner ved 375 og 320 ender de to søjler i samme række på samme linje. Søjlen er stadig årets afkast, +15,2 %. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:27 CEST. Toppen i den åbne episode står på kurven. Ikke færdig.**

En tynd gul streg markerer 2. jun. 2026, med ordet "top". Det er toppen, den åbne episode startede fra. Stregen rammer ikke "nu −23 %" og ikke årstallene, ved 1280 og 375. Gul prik på −36 % bliver stående. Ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:29 CEST. AKK-datoen brækker ikke længere. Ikke færdig.**

På sammenlign stod "fra 5. dec. 2026" delt, så "dec. 2026)" hang alene på 320. Datoen står nu på sin egen linje under "Vises efter 12 måneder". Ingen afkastprocent på AKK-kortet. Ét panel. Ingen sidescroll ved 320, 375 og 1280. Ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:31 CEST. Sluttallet på embed kan læses på mobil. Ikke færdig.**

Tallet ved grafens ende var 9 px. Det er nu 12 px. "+104,8 %" står inden for svg'en ved 375 og 320, uden at ramme aksetallene. Højre margen på mobil er gjort lidt bredere, så tallet ikke står helt ude i kanten. Hele perioden er stadig +104,8 %. PMINDIAKK har stadig tom svg. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 00:51 CEST. Episoder står på kurven. Ikke færdig.**

De fire fald dybere end 10 % er søjler mellem kurven og årstallene. De lukkede er brand. Den åbne er gul. Seneste dag, 14. okt. 2026, ligger i den åbne, så den søjle har en lys kant og rækken er valgt.

Klik på −35,8 % flytter kanten til søjlen fra 18. feb. 2025 til 26. aug. 2025. Udlæsningen er 8. apr. 2025, −35,8 %. En dag uden for de fire, 17. nov. 2023, slukker både kant og række.

Ordet tilbage står over 26. aug. 2025. Det er dagen, det dybeste fald igen nåede sin top. Det rammer ikke "top" eller "nu −23 %", ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:00 CEST. Embed-prikken matcher udlæsningen. Ikke færdig.**

En dag under nul havde en mørkere prik (`#c98a94`) end tallet i udlæsning og tooltip (`#e5b3ba`). Prikken er nu samme rosa. 4. feb. 2026 er −2,0 %. År til dato slutter stadig på +4,0 %. Hele perioden er +104,8 %.

På 320 dækkede tooltip sluttallet. Det holder nu 8 px afstand, også når tallet er +104,8 %, ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl. PMINDIAKK har stadig tom svg.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:02 CEST. Største temaforskel er markeret. Ikke færdig.**

Sammenlign sagde, at den største forskel er ca. 1,5 procentpoint, men ikke i hvilket tema. Det er Andet / uklassificeret (11,6 % og 13,2 %). Rækken har en gul kant. Stadig ét panel. AKK-kortet har ingen afkastprocent, og datoen står på sin egen linje. Linket til drawdown er der. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:05 CEST. Totalafkast er det store tal i embed. Ikke færdig.**

De tre tal under grafen var lige store. Totalafkast er 36 px på desktop og 32 px under 640. CAGR og år til dato er 22 px. Tallene er uændrede: +104,8 %, +26,4 % og +4,0 %. PMINDIAKK viser stadig en streg, og svg'en er tom. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:15 CEST. Søjlehøjden er dybden. Ikke færdig.**

Søjlerne under underwater-kurven var lige høje. Højden følger nu dybden, bredden er tiden. −16,7 % er lavest. −35,8 % er højest. −26,6 % og −26,8 % ligger tæt, fordi faldene gør. Stregen ved 10 % under nul er brand, og tallet −10 har samme farve. Et klik på søjlen hopper til bunden, samme sted som rækken.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl, ingen tekst uden for svg'en. AKK siger stadig 12 måneder og har ingen procent.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:22 CEST. Udbyttet er tegnet på kortene. Ikke færdig.**

Sammenlign-kortene er stadig et par. PMINDI har en pil ud af kassen. PMINDIAKK har et loop tilbage i kassen. Ingen tredje kasse. Ét panel. AKK har ingen afkastprocent, og datoen står på sin egen linje. Gul kant på Andet. Link til drawdown er der.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:28 CEST. Nøgle under underwater. Ikke færdig.**

Forklaringen under kurven var ét afsnit. Den er nu en linje, en nøgle og en kort sætning. Nøglen viser dybeste bund, seneste dag, valgt dag, stregen ved 10 % under nul, og at søjlens højde er dybden. Svg-beskrivelsen har stadig den fulde tekst. Et klik på søjlen for −35,8 % sætter udlæsningen til 8. apr. 2025.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:34 CEST. Embed-kortene viser udbyttet. Ikke færdig.**

Klasse-kortene havde tom plads til højre. PMINDI har pilen ud. PMINDIAKK har loopet tilbage. Samme mærke som på sammenlign. Teksten rammer ikke mærket. Sætningen under grafen sagde slutdatoen to gange. Den siger den én gang. Tallene er uændrede: +104,8 %, +26,4 % og +4,0 %. PMINDIAKK har stadig tom svg og ingen procent.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:40 CEST. Samme grænse i prikkerne. Ikke færdig.**

Prikfordelingen havde ingen grænse. En brand-streg står nu ved 10 % under nul, samme grænse som på kurven. Tallet −10 har samme farve. 4 af 41 prikker ligger til højre. Den gule prik er blandt dem. Median og middel er uændrede.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl, ingen tekst uden for svg'en.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:32 CEST. 2026 er mærket under vand. Ikke færdig.**

Årssøjlen for 2026 viste +4,0 % og "til dato", uden at sige at serien stadig ligger under vand i det år. Den har nu cyan kant og teksten "Under vand". 2025 har stadig gul kant, "Dybeste fald" og +15,2 %. Søjlen er årets afkast. Søjlerne i samme række deler bundlinje.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:44 CEST. Tallene på kurven skæres ikke. Ikke færdig.**

Den gule streg for toppen gik gennem "nu -23 %". Streken ned til bunden gik gennem "-36 %". Begge tal står på en plade i baggrundens farve, så stregerne stopper bag tallet. Tallene er uændrede. Ringen og den gule prik er fri. Et klik på søjlen for 8. apr. 2025 sætter stadig udlæsningen til −35,8 %.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl. AKK siger stadig 12 måneder.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:51 CEST. 0 % i embed er brand. Ikke færdig.**

0 %-linjen var en tynd stiplet streg. Den er nu brand og 2 px, og tallet 0 % har samme farve. Tallene er uændrede: +104,8 %, +26,4 % og +4,0 %. En dag under nul, 5. feb. 2026, er stadig rosa i prik, udlæsning og tooltip. PMINDIAKK har tom svg og ingen procent.

Tjekket i Chromium ved 1100, 375 og 320. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:53 CEST. Årstal tæt på søjlerne. Ikke færdig.**

Der var et tomt bånd mellem søjlerne under kurven og årstallene. Årstallene står nu tæt under den højeste søjle. Kurven og tallene er uændrede. Et klik på søjlen for 8. apr. 2025 sætter stadig udlæsningen til −35,8 %.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl. AKK siger stadig 12 måneder.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 01:55 CEST. Temasøjler fylder rækken. Ikke færdig.**

På bred skærm stoppede temasøjlerne ved 560 px, med et tomt felt til højre i panelet. De fylder nu rækken og deler skala. Tallene er uændrede. Andet / uklassificeret har stadig gul kant. Ét panel.

Tjekket i Chromium ved 1280, 800, 375 og 320. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 02:06 CEST. Lys kant på den gule søjle. Ikke færdig.**

Den åbne søjle er gul og valgt fra start. Kanten var for tynd til at ses mod det gule. Den er nu 3 px og lys, så den ses mod baggrunden. En valgt søjle i brand er stadig 1,25 px. Et klik på 8. apr. 2025 sætter stadig udlæsningen til −35,8 %.

Tjekket i Chromium. Ingen sidescroll ved 320. Ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 02:15 CEST. Stregen ved nul er lys. Ikke færdig.**

Nul-linjen under vand var stiplet og svag, især hvor kurven lå dybt. Den er nu lys og hel, og tallet 0 har samme farve. Grænsen ved 10 % under nul er stadig brand. Tallene på kurven er uændrede.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl. AKK siger stadig 12 måneder.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 02:31 CEST. Valgt episode er gul på kurven. Ikke færdig.**

Kurven var cyan hele vejen, så episoden kun kunne ses som søjle under den. Den episode, den valgte dag ligger i, er nu gul oven på cyan. Ved start er det den åbne episode. Et klik på −35,8 % gør april 2025 gul. En dag uden for de fire slukker den gule del. "nu" og "−23 %" står til højre for ringen, så stregen ved toppen ikke skærer dem.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 02:40 CEST. Rosa under nul i embed. Ikke færdig.**

På år til dato lignede feltet under nul en grå plet. Det er nu samme rosa som prik, udlæsning og tooltip, og stærkest i bunden af faldet. Tallene er uændrede: +104,8 %, +26,4 % og +4,0 %. 20. feb. 2026 er −2,5 %. PMINDIAKK har stadig tom svg og ingen procent.

Tjekket i Chromium ved 1100, 375 og 320. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.

## Fra Grok lane-D

**2026-10-16 02:45 CEST. Tal på de dybe prikker. Ikke færdig.**

Prikfordelingen viste de fire fald dybere end 10 % uden tal, så −26,6 % og −26,8 % ikke kunne skelnes. Tallet står nu over prikken. Bunken til venstre er uden tal. Median og middel er uændrede.

Tjekket i Chromium ved 1280, 375 og 320. Ingen sidescroll, ingen konsolfejl.

`lane-D` er klar til merge. Ikke main. Ikke færdig.
