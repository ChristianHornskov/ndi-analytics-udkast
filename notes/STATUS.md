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


## Fra Claude lane-A · 2026-10-16 ~00:30 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, value-chains.json og notes.
1. **Ægte led-tilordning.** Før delte leddene selskabslister. For eksempel havde chipdesign, udstyr, foundry og hukommelse de samme 6 chipselskaber, Coreweave stod under energi, og Ford stod under datacentre. Nu har hvert led sin egen kuraterede liste fra den forsinkede PMINDI-beholdning pr. 1. juni 2026. Antal og vægt regnes kun på de selskaber, der er tilordnet leddet. Siden viser en note om, at tilordningen er et redaktionelt udkast og ikke NDI's officielle klassifikation. Multi-rolle er tilladt (Intel, Samsung, GE Vernova, Redwire m.fl.).
2. **Rumkæden er bygget om** til 7 led fra jorden og op plus et nabo-led for luftfart: dele og motorer, opsendelse, satellitter, kommunikation, jordobservation, månen og stationer, og rum og compute. Rum og compute har 0 selskaber og siger det. Iridium, AST SpaceMobile, Spire og BlackSky er hentet ind fra andre temaer og mærket med deres tema. Der er en orbit-trappe (SVG), fire kildekort (BLOG 24/8-26, 21/7-25, 1/6-26 og 22/6-26: SpaceX er børsnoteret efter beholdningsdatoen) og fire trin.
3. **Musk-citatet** står nu kun som `<q>` med kilde ("Elon Musks påstand, gengivet i NDI's ugebrev 12. oktober 2026") og en tydelig ikke-prognose-note. Tidslinjen er rettet tilsvarende.
4. **Alle led har tre dele:** hvad det er, hvorfor NDI følger det (med kilde og mærket NDI eller baggrund efter Vidensbot [M]/[B]) og hvad der ændrer sig. AI-compute har stadig 13 led i Mads' rækkefølge.
5. Deep-links `?kaede=space|quantum|…` og `#lk-<led>`. Dæmningerne åbner AI-leddet, og der er tastaturnavigation (piletaster) i fanerne. Kvante-fanen har en kort-med-vilje-callout med krydslinks.
Ingen handelssprog (grep: "øge eksponering", "overvægt i" og "sikkert køb" giver 0 hits). Ingen nye per-aktie-felter.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll, smoke 52/52 og precheck PASSED.
Næste: blurbs for energiled, flere krydslinks for kvante og vaerdikaede.html. Ikke færdig.


## Fra Claude lane-A · 2026-10-15 ~23:55 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaede.html, vaerdikaeder.html, value-chains.json og notes.
1. **vaerdikaede.html er bygget om.** Den gamle side havde 6 hårdkodede led, der modsagde AI-kæden med 13 led. Nu læser siden `value-chains.json` og viser de 13 AI-led i Mads' rækkefølge. Leddene er grupperet under de 5 dæmninger med en flod-gradient fra fysisk til digital. Hvert led har ikon med nummer, blurb, antal og vægt (forsinket, 1. juni 2026) og top 5. Hvert led linker også til `vaerdikaeder.html?kaede=ai-compute#lk-<led>`. Selskabssøgningen bruger nu den ægte led-tilordning i stedet for temaer og viser også, hvilke andre kæder selskabet står i. Temaknapperne viser, hvor mange af leddets selskaber der har temaet. Kontrakter er bevaret: `#theme-btns` (data-k, aria-pressed), `?tema=`, `?isin=` og `.chain .node.hit`.
2. **Deep-link til ét led virker nu.** `vaerdikaeder.html?kaede=X#lk-Y` åbner og scroller til leddet ved load. Før virkede det kun ved klik på siden.
3. **Tesla er tilføjet AI-leddet "Energi og strømfordeling"** (energilagring, det samme som i energikædens lagringsled, og multi-tag energi). Leddet har nu 21 selskaber.
4. **Energikæden:** "hvad ændrer sig" er skrevet om for elproduktion (datacentre bygger egen strøm), elnet (2/3 af USA's kapacitet, BLOG 10/8-26), lagring (told-anledningen, BLOG 21/7-25) og råstoffer (geopolitik, BLOG 21/9-26). Kædens "hvorfor" har fået "masser af elektroner"-citatet med kilde.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Tesla `?isin` giver 2 led, chips-filter 4 led, og deep-link `#lk-memory` åbner leddet. Precheck PASSED. smoke-cycle3 111/113: de 2 fejl ("entré: linser … værdikæde") skyldes, at `app.js` linker til vaerdikaeder.html, mens testen forventer vaerdikaede.html. Det er ikke lane-A-fil og var allerede rødt før. smoke-quality 104/106: de 2 fejl ("NDI-linsen → værdikæde") skyldes, at selskab.html ikke har noget `vaerdikaede.html?isin=`-link. Det er heller ikke lane-A-fil og var allerede rødt før. `vaerdikaede.html?isin=` virker selv. Handelssprog: grep giver 0 hits.
Næste: rum-pædagogik (ordliste/kredsløbshøjder), krydslinks for kvante og ét led pr. kæde i vaerdikaede.html. Ikke færdig.


## Fra Claude lane-A · 2026-10-15 ~23:58 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, value-chains.json og notes.
1. **Rum-pædagogik på rum-fanen.** Der er en ny lodret, logaritmisk højdeskala (SVG) fra "rummets grænse ≈ 100 km" til Månen (384.400 km). Den viser ISS (400), Starlink (550), Iridium (780), GPS (20.200) og geostationær (35.786) samt LEO- og MEO-bånd. Hvert navn åbner det relevante led. Der er også en latens-note om, hvorfor satellitinternet er rykket ned i lavt kredsløb, og en rum-ordbog med 10 ord (LEO/MEO/GEO, konstellation, nyttelast, genbrugelig raket, satellitbus, direkte til mobilen og SAR), hvor hvert ord linker til et led. Alt er mærket som baggrundsviden og ikke NDI's synspunkter. Data ligger i `value-chains.json` (`space.glossary`, `altitudes`, `latency`).
2. **Orbit-trappen** er rettet til "LEO, op til ca. 2.000 km". Den gamle tekst sagde "500–2.000 km".
3. **Energiled:** nye "hvad er det"-blurbs for elproduktion, lagring og råstoffer, som før var stikordslister.
4. **Tankestreger er fjernet** fra 8 brødtekster i value-chains.json (ingen "—" tilbage).
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Et klik på Månen i skalaen åbner `#lk-orbit`. smoke.mjs fail 0, precheck PASSED og grep efter handelssprog giver 0 hits.
Næste: krydslinks for kvante (q-pane til AI-led og energi), "hvad ændrer sig" for robotikled og ét led pr. kæde i vaerdikaede.html. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~00:05 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Broer mellem kæder (ny, beregnet).** Under hver fane på vaerdikaeder står nu "Broer til andre kæder" med op til 6 led-par, hvor kæden deler selskaber med andre kæder. Kortet viser antal og 3 navne, og et klik åbner leddet i den anden kæde (`data-hop`). Et eksempel: AI-kædens energiled deler 11 selskaber med energikædens elproduktion, og robotikkens komponenter deler 7 med lagring. Alt beregnes fra value-chains.json (1. juni 2026), så der er ingen nye felter.
2. **Robotik-fanen** har nu Mads' tre faser (modning, copilots og automatisering/robotisering) som trin, citatet fra BLOG 7. oktober 2024 med kilde og "ingen præcise årstal". Robotleddet nævner nu forsvar (hører under robotik, BLOG 17. marts 2025) og Tesla-eksemplet (BOG s. 118–119). "Hvad ændrer sig" er skrevet om for komponenter og robotter.
3. **Kvante-fanen:** Det vage link "Hvor kvante møder AI-compute" er fjernet. I stedet er der 4 faglige bro-kort: cloud, chipdesign og udstyr (mærket baggrund) og Sådan tænker vi (NDI, BLOG 21. juli 2025). Det fremgår, at ingen kvanteselskaber står i andre kæder.
4. **vaerdikaede.html** har fået "Fire andre kæder" med ikon, første sætning af "hvorfor", antal led og selskaber og et "Start ved første led"-deep-link.
5. De sidste to tankestreger på vaerdikaeder er fjernet.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Bro-klik fører fra robotik til `energy#lk-storage` (åbent), og kvante-cloud fører til `ai-compute#lk-cloud`. smoke.mjs 52/52 fail 0, precheck PASSED og grep efter handelssprog giver 0 hits.
Næste: rum-fanen kan få en "hvad koster det at komme op"-forklaring (kun med kilde) og robotik en lille ordbog (fx aktuator, lidar og simulering), som rum-ordbogen. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~00:25 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, value-chains.json og notes.
1. **Rum: "Hvorfor er det blevet billigere at komme op?"** Ny boks på rum-fanen med en før/nu-tegning (inline SVG: raket brugt én gang mod første trin, der lander igen) og en årsagskæde i fire kort: genbrug, flere ture, satellitter i serie og tjenester. Hvert kort åbner sit led. Teksten er mærket som baggrund, og der står ingen priser pr. kilo, fordi NDI ikke har opgjort dem. Det eneste tal er NDI's (SpaceX stod for 90 % af satellitopsendelserne, BLOG 23. juni 2024), og det står med NDI-mærke og kilde. Data ligger i `space.costStory`.
2. **Robot-ordbog** på robotik-fanen med 9 ord (aktuator, sensor, lidar, effektelektronik, simulering, digital tvilling, humanoid, autonomi og edge-AI). Hvert ord linker til et led, og "Edge-AI" hopper til AI-kædens led for fysisk AI. Ordbogen er mærket som baggrund. Data ligger i `physical.glossary`. Rendering af ordbøgerne er samlet i én funktion, der deles af rum og robotik.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Klik på "Satellitter i serie" åbner `#lk-sats`, og Edge-AI skifter til ai-compute. smoke.mjs 52/52 fail 0 (kørt mod lane-A's egen server; port 8765 var optaget af en anden worktree). Precheck PASSED. Grep efter handelssprog og tankestreger giver 0 hits.
Næste: energiled mangler en lille ordbog eller "flaskehals"-markering pr. led, vaerdikaede.html kan vise rum-forklaringen i kort form, og kvante kan få en tidslinje-note (NVIDIA-udsagnet som citat med kilde). Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~00:55 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Energi-fanen: "Fra råstof til regnekraft".** Ny strømvej med 5 stationer: råstoffer, elproduktion (+ atomkraft/SMR), elnet, lagring og datacentre (hopper til AI-kæden). Hver station viser antal selskaber pr. 1. juni 2026. Stationer, hvor NDI har skrevet om pres, har et gult "NDI · pres"-mærke med kilde: kobber/sølv (BLOG 16/2-26), første flaskehals energi (30/3-26), transformere og transmission (10/8-26) og anden flaskehals datacentre (30/3-26). Lagring har et dæmpet "nævnt"-mærke. Under står NDI-tallet om ét års chipproduktion og to tredjedele af USA's kapacitet (BLOG 10/8-26). En note siger, at mærkerne ikke er prognose eller anbefaling. Data ligger i `energy.flow`.
2. **Energi-ordbog** med 13 ord (GW, installeret kapacitet, grundlast, gasturbine, LNG, fission, SMR, transmission, transformer, batterilager, sjældne jordarter, kobber og væskekøling), mærket som baggrund. Hvert ord linker til et led. Data ligger i `energy.glossary`.
3. **Kvante: "Hvor langt er der?".** Lille SVG-tidsakse (2025 til ca. 2045) med NVIDIA-direktørens udsagn gengivet med navn, dato og kilde (BLOG 13/1-25). Det står ikke i citationstegn, fordi vi ikke har ordlyden. Mads' egen formulering står i en separat NDI-linje. Noten siger, at det ikke er Mads' eller NDI's prognose. Data ligger i `quantum.horizon`.
4. **vaerdikaede.html:** Hvert af de fire kæde-kort har fået et lær-link (🚀 ⚡ ⚙ ⏳), der åbner fanens forklaring direkte. vaerdikaeder.html understøtter nu deep-link til en sektion i en fane (`?kaede=energy#e-pane`, `#sp-cost`, `#p-pane`, `#q-hz`).
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Energi-hop fra datacenter-stationen åbner `ai-compute#lk-datacenter`, og alle 4 lær-links lander på sektionen. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger giver 0 hits.
Næste: AI-kædens 13 led kan få pres-mærker på samme måde (kun med NDI-kilde), og rum-fanen kan få en lille "hvem bygger hvad"-oversigt pr. højdebånd fra beholdningen. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~00:23 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **AI-fanen: "Floden gennem 13 led".** Nyt flodkort (inline SVG) med de 13 led i Mads' rækkefølge som stationer på en flod. Energi, datacentre og chipdesign har gule dæmninger ("1./2./3. flaskehals"), hukommelse og optik er mærket "begyndende flaskehals", og halvlederne står i en fælles boks. Cloud, data og software har stiplet ring ("ingen tydelig flaskehals"), og agenter og fysisk AI er cyan ("efterspørgslen starter her"). Alle mærker har kilden BLOG 30. marts 2026. Udstyr og foundry er mærket "(vores tolkning)", fordi NDI ikke har skrevet om pres netop dér. Kortet er vandret på desktop og lodret på mobil, og hver station åbner sit led. Data ligger i `press`, `short` og `riverMap` på ai-compute.
2. **Pres-mærke på hvert AI-led-kort** (vaerdikaeder) og på hver node i vaerdikaede.html. Legenden på vaerdikaede.html siger ikke længere, at alle fem grupper er flaskehalse, og dæmning 4 står nu som "ifølge NDI endnu ingen tydelig flaskehals".
3. **Handelssprog fjernet:** Agentisk AI sagde "NDI forventer, at dette led over tid fylder mere i porteføljen". Det er skrevet om til efterspørgsel og copilots.
4. Deep-link `?kaede=ai-compute#a-pane`. Der er et link fra "Fem dæmninger" og fra vaerdikaede.html, og sektioner i faner har fået scroll-margin, så overskriften ikke gemmer sig under menuen.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. 13 stationer, og klik på 6 åbner `#lk-memory`. smoke.mjs fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger giver 0 hits.
Næste: rum-fanen kan få "hvem bygger hvad" pr. højdebånd fra beholdningen (antal pr. led, ingen nøgletal), og kvante kan få krydslinks fra AI-flodkortet. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~01:20 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Rum: "Følg én satellit fra fabrik til tjeneste".** Ny trinvis fortælling på rum-fanen (`#sp-trip`) med seks trin: delene bygges, satellitten samles, den sendes op, den finder sin plads (ca. 550 km), den leverer en tjeneste, og den udskiftes. En SVG-scene viser stationerne fra jorden op i kredsløb med en gul markør, der glider mellem trinene, og en stiplet pil viser, at udskiftning får kæden til at starte forfra. Hvert trin har et kort med leddets antal selskaber pr. 1. juni 2026, tre eksempelnavne (links til selskabssiden) og "Se leddet →". Trinknapperne kan styres med piletaster og Home/End, og markøren flytter sig ikke med animation ved reduced motion. Al tekst er mærket som baggrund, og noten siger, at navnene er eksempler og ikke en rangering eller anbefaling. Data ligger i `space.trip`. Der er også et link til rejsen fra rum-fanens fire trin.
2. **AI-flodkortet** har fået et "sidespor: kvante"-kort, som forklarer, at kvante står uden for floden og kun rører cloud og chipdesign (baggrund). Det linker til kvante-fanens broer (`?kaede=quantum#q-br`).
3. **vaerdikaede.html:** Rum-kortets lær-link fører nu til satellit-rejsen.
4. **Handelssprog:** Robotikkens komponentled sagde "Bred eksponering i microchips …". Det er nu "Mads peger på en bred vifte af områder: …".
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Next×5 giver "↺ Forfra", Home vælger trin 1, "Se leddet" åbner `#lk-parts`, og sidesporet lander på `#q-br` i kvante-fanen. Alle fire lær-links på vaerdikaede lander på deres sektion. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger giver 0 hits.
Næste: energiled kan få en kort "hvad ændrer sig" pr. station i strømvejen, og kvante-fanen kan få en lille ordbog (qubit, fejlkorrektion, kryostat) mærket som baggrund. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~01:45 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, value-chains.json og notes.
1. **Energi-strømvejen: "Det ændrer sig" pr. station.** Hver af de fem stationer har fået en kort linje om, hvad der flytter sig. Råstoffer: geopolitik i råstofanalysen (BLOG 5/1 og 21/9-26). Elproduktion: datacentre må bygge egen strøm (BLOG 30/3-26). Lagring: amerikansk told på kinesiske batterikomponenter (BLOG 21/7-25, uden ordet positioner). Datacentre: "fremtidens fabrik", Vesten eller Kina (BLOG 27/7-26). Elnet er mærket baggrund (leveringstid på transformere), fordi NDI ikke har skrevet det. Data ligger i `energy.flow.steps[].shift`.
2. **Kvante-ordbog** med 10 ord (qubit, superposition, sammenfiltring, dekohærens, kryostat, fejlkorrektion, logisk qubit, kvanteudglødning, kvantefordel og kvante i skyen), mærket som generel baggrund. Fejlkorrektion hopper til chipdesign og kvante i skyen til cloud i AI-kæden. Der er et link fra kvante-callouten, og deep-link `?kaede=quantum#q-gl` åbner ordbogen (også på mobil, hvor den ellers er lukket). Data ligger i `quantum.glossary`.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Deep-link lander på ordbogen og åbner den, og 5 af 5 stationer viser skiftet. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 hits.
Næste: vaerdikaede.html kan få en kort linje "Det ændrer sig" på energi-kortet og et ordbogs-link pr. kæde, og rum-fanen kan få "hvem bygger hvad" pr. højdebånd (antal pr. led, ingen nøgletal). Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~00:55 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Rum: "Hvordan tjener rumkæden penge?"** Ny sektion på rum-fanen (`#sp-money`) med tre spor. "Betales én gang" dækker dele, opsendelse og satellitter. "Betales løbende" dækker kommunikation og jordobservation. "Endnu tidligt" dækker måne og stationer samt rum og compute. Hvert spor har en lille SVG-skitse af betalinger over tid (mærket "skitse, ikke tal") og led-knapper med antal selskaber pr. 1. juni 2026, der åbner leddet. Det løbende spor har NDI-linjen om Starlink som løbende tjeneste med kilde (selskabsprofil, AI-udkast). Resten er mærket som vores forenkling og baggrund. En "⇄"-boks forklarer, at den samme satellit hører til begge spor, og linker til satellit-rejsen. Musk-udsagnet bruges ikke her. Data ligger i `space.money`. Der er et link fra rum-fanens fire trin, og deep-link `?kaede=space#sp-money` virker.
2. **vaerdikaede.html:** Hvert af de fire kæde-kort har fået et "◇ Ordbog: N ord →"-link, der åbner kædens ordbog direkte (også på mobil, hvor den ellers er lukket).
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Opsendelse-knappen åbner `#lk-launch`, og "Rum og compute 0" åbner `#lk-space-compute`. "Følg satellitten" lander på `#sp-trip`, og alle 4 ordbogs-links lander åbne. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 hits.
Næste: energi-ledkortene kan få en kort blurb-gennemgang (sprog og kilder), og kvante-fanen kan få krydslinks til AI-flodkortets cloud og chipdesign fra horisont-sektionen. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~00:45 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, value-chains.json og notes.
1. **Rum: "Hvad kan gå galt i rumkæden?"** Ny sektion på rum-fanen (`#sp-risk`) med seks kort: en opsendelse kan fejle, én aktør fylder meget, trængsel og rumskrot, tilladelser og frekvenser, staten er en stor kunde, og indtægter, der ikke passer i et regneark. Hvert kort har en lille kæde-strimmel med de syv led, hvor de led, der især rammes, lyser gult. Hvert led i strimlen åbner leddet. To kort har en NDI-linje med kilde (90 % af opsendelserne, BLOG 23/6-24, og værdiansættelse, BLOG 21/7-25). Resten er mærket baggrund og vores udvalg, og noten siger, at det ikke er NDI's vurdering af enkelte selskaber, ikke en rangering og ikke en anbefaling. Data ligger i `space.risks`.
2. **Rum: læse-rute "Rum i syv stop"** øverst i rum-fanen (Kæden, Billigere, Én satellit, Penge, Kan gå galt, Hvor højt, Ordbog). Den ruller vandret på mobil. Nye ankre `#sp-map` og `#sp-alt`, og deep-link virker for dem alle. Data ligger i `space.route`.
3. **Kvante → AI-floden:** Horisont-sektionen har fået en stiplet cyan linje: kvante står uden for floden og rører den kun ved cloud og chipdesign, med hop til de to led og til flodkortet (`quantum.horizon.river`).
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. 6 kort og 13 ramte led. Alle 7 stop lander under menuen. Strimlens opsendelse åbner `#lk-launch`, og kvante-hop åbner AI-fanen. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 hits.
Næste: energi-ledkortenes blurbs (sprog og kilder) og en "hvad kan gå galt" i samme form for energi. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~00:51 CEST (energi-usikkerheder)
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Energi: "Hvad kan gå galt i energikæden?"** Ny sektion på energi-fanen (`#e-risk`) i samme form som rum, med seks kort: elnettet halter efter, råstoffer kommer fra få steder, metalpriser svinger, godkendelser tager tid, politikken kan skifte kurs, og behovet kan blive et andet end ventet. Strimlen følger strømmens vej (Råstoffer › Elproduktion › Atomkraft › Elnet › Lagring → datacenter), og hvert led åbner leddet. Fire kort har en NDI-linje med kilde (BLOG 10/8-26, 21/9-26, 16/2-26 og 12/5-25), og resten er mærket baggrund og vores udvalg. Data ligger i `energy.risks`, og der er et link fra toppen af energi-fanen. `renderRisks` er nu fælles for rum og energi.
2. **Energi-ledkort, tekst:** SMR-leddet sagde "aktierne svinger meget". Det er skrevet om til godkendelser (baggrund) og NDI's linje om usikre indtægter (BLOG 21/7-25). Råstoffer nævner nu også naturgas og uran, fordi beholdningens energiressourcer tæller gasproducenter (Comstock, Antero, EQT og Expand). Elproduktion henviser selve gassen til råstoffer. Lagring siger "NDI skrev om batteriværdikæden, da USA indførte told …". De fem energiled har fået korte navne (Råstoffer, Elproduktion, Atomkraft, Elnet, Lagring) i strømvejen.
3. **vaerdikaede.html:** Rum- og energikortet har fået linket "⚠ Hvad kan gå galt? 6 usikkerheder →".
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. 6 kort og 16 ramte led. Deep-link, toplink og linket fra vaerdikaede lander på `#e-risk`, og strimmel-klik åbner `#lk-gen` og `#lk-materials`. Rum har stadig 6 kort. smoke.mjs 52/52 fail 0. Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 hits.
Næste: rum "hvem bygger hvad" pr. højdebånd (antal pr. led), og kvante-fanen kan få et hop fra broerne til energi (kryostater og strøm). Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~01:40 CEST (rum: højdebånd og tjek dig selv)
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Rum: "Hvem arbejder hvor højt?"** Ny sektion ved højdeskalaen (`#sp-bands`) med fem bånd: på jorden, lavt kredsløb, mellemhøjt kredsløb, geostationær bane og Månen. Hvert bånd har en kort forklaring og led-knapper med antal selskaber pr. 1. juni 2026, der åbner leddet. Hover eller fokus på et bånd fremhæver LEO, MEO eller GEO på skalaen. Alt er mærket baggrund, og noten siger, at et led og et selskab kan høre til flere højder, og at det ikke er en rangering eller en anbefaling. Data ligger i `space.bands`.
2. **Rum: "Tjek dig selv".** Fem spørgsmål (`#sp-quiz`) om genbrug af raketter, løbende betaling, signaltid, NDI's tal om 90 % af opsendelserne (BLOG 23. juni 2024) og rum og compute. Hvert svar giver "Rigtigt." eller "Ikke helt.", en kort forklaring og et link til det sted på siden, hvor det står. Musk nævnes kun som hans påstand og ikke som NDI's forventning. Intet gemmes. Data ligger i `space.quiz`. Læse-ruten hedder nu "Rum i otte stop", og der er et link fra rum-fanens fire trin.
3. **vaerdikaede.html:** Rum-kortet har fået linket "✓ Tjek dig selv: 5 spørgsmål →".
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. 5 bånd, 9 led-knapper og 8 stop. Pointtallet stemmer (2 af 5 i testen), svaret "Se leddet" åbner `#lk-space-compute`, og linket fra vaerdikaede lander på `#sp-quiz`. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 hits.
Næste: energi-ledkortenes blurbs kan få samme "tjek dig selv"-form (3 spørgsmål), og kvante-fanens korte side kan få krydslinks fra ordbogen til energi (kryostater og strøm). Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~01:25 CEST (energi: tjek dig selv)
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Energi: "Tjek dig selv".** Fem spørgsmål (`#e-quiz`) om første flaskehals (BLOG 30. marts 2026), elnet og transformere (BLOG 10. august 2026 og baggrund), lagring (baggrund), råstoffer og geopolitik (BLOG 21. september 2026) og SMR (baggrund og BLOG 21. juli 2025). Hvert svar giver en kort forklaring og et link, der åbner leddet eller sektionen. Intet gemmes. Data ligger i `energy.quiz`. Der er et link fra toppen af energi-fanen.
2. **Kode:** `renderQuiz` er nu fælles for rum og energi (id-præfiks pr. kæde). `#sp-bands`, `#sp-quiz` og `#e-quiz` har fået scroll-margin, så de lander under menuen.
3. **vaerdikaede.html:** Energikortet har fået "✓ Tjek dig selv: 5 spørgsmål →".
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Deep-link lander på `#e-quiz`, pointtal stemmer, "Se leddet elnet" åbner `#lk-grid`, og SMR-svaret åbner `#lk-smr`. Rum-quizzen virker stadig. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 hits.
Næste: energi-ledkortenes blurbs (sprog og kilder) og kvante-fanen med krydslinks fra broerne til energi. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~02:10 CEST (kvante: kulde, energi-bro og tjek dig selv)
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Kvante: "Hvorfor skal en kvantechip være så kold?"** Ny sektion (`#q-cold`) med et lodret termometer på logaritmisk skala: stuetemperatur, Antarktis, flydende kvælstof, flydende helium, det tomme rum og en kryostat på ca. 0,01 K. Ved siden af står en årsagskæde i fire trin (varme, dekohærens, fejl, kulde og fejlkorrektion) med links til ordbogen, og en note om, at ikke alle typer qubits skal være så kolde. En strøm-boks hopper til energi (elnet) og chipdesign. Alt er mærket baggrund og "ikke en vurdering af enkelte selskaber og ikke en anbefaling". Data ligger i `quantum.cold`.
2. **Kvante-broer:** Der er en ny bro "⚡ Elnet · Energi & elektrificering" (baggrund), så kvante nu peger på energikæden og ikke kun på AI.
3. **Kvante: "Tjek dig selv".** Fire spørgsmål (`#q-quiz`) om kulde, NVIDIA-udsagnet (det er hans udsagn, ikke Mads' og ikke NDI's prognose, BLOG 13. januar 2025), cloud og usikre indtægter (BLOG 21. juli 2025). Quizzen bruger den fælles `renderQuiz`, og intet gemmes. Kvante-callout har fået links til "Hvorfor så koldt?" og "Tjek dig selv".
4. **Adresselinjen:** Hop mellem led og afsnit opdaterer nu adressen (`#lk-…` eller `#sektion`). Før stod der fx `?kaede=ai-compute#q-hz` efter et hop, og et delt link pegede derfor forkert.
5. **vaerdikaede.html:** Kvantekortet har fået "✓ Tjek dig selv: 4 spørgsmål →".
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Der er 6 temperaturpunkter, 5 broer og 4 spørgsmål. Deep-link til `#q-hz`, `#q-cold`, `#q-br` og `#q-quiz` lander under menuen. Svaret "Se leddet" åbner `#lk-q-core`, og Elnet-hop giver `?kaede=energy#lk-grid`. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 reelle hits.
Næste: energi-ledkortenes blurbs kan få en "hvor i strømvejen"-mini-strimmel, og robotik-fanen kan få "Tjek dig selv". Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~01:30 CEST (robotik: løkke, usikkerheder og tjek dig selv)
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **Robotik: "Sanse, tænke, handle".** Ny sektion (`#p-loop`) med en cirkulær løkke i fire trin: sanse (komponenter), tænke (hop til fysisk AI i AI-compute), handle (komponenter) og lære (simulering). Hvert trin har et kort med link til leddet og til ordet i robot-ordbogen. Hover eller fokus fremhæver trinnet i både løkke og liste. Alt er mærket baggrund og "ikke NDI's analyse, ikke en vurdering af enkelte selskaber og ikke en anbefaling". Data ligger i `physical.loop`.
2. **Robotik: "Hvad kan gå galt i robotkæden?"** (`#p-risk`). Seks kort: simulation mod virkelighed, Kinas forspring i produktionen, regler og ansvar, batteriet, prisen og tiden. To har en NDI-linje med kilde (BLOG 17. marts 2025 og 30. marts 2026, sidstnævnte med "der står ingen årstal"). Resten er mærket baggrund og vores udvalg. Bruger den fælles `renderRisks`.
3. **Robotik: "Tjek dig selv"** (`#p-quiz`). Fire spørgsmål: fase 3 (BLOG 7. oktober 2024), hvad NDI tæller som robotter (BLOG 17. marts 2025), simulering og edge-AI (baggrund). Bruger den fælles `renderQuiz`, og intet gemmes.
4. **Genveje** øverst i robotik-fanen (faser, løkke, usikkerheder, tjek dig selv, ordbog), og de vises kun, hvis sektionen findes. Robotleddene har fået korte navne (Komponenter, Simulering, Robotter).
5. **vaerdikaede.html:** Robotkortet har fået "⚠ Hvad kan gå galt? 6 usikkerheder →" og "✓ Tjek dig selv: 4 spørgsmål →".
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. 4 knuder, 6 kort, 11 ramte led og 4 spørgsmål. Deep-link til `#p-risk`, `#p-quiz`, `#p-loop` og `#phases` lander under menuen, quiz-svaret "Se de tre faser" lander også der, "Tænke" giver `?kaede=ai-compute#lk-physical-ai`, og "Lære" i løkken åbner `#lk-sim`. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 hits.
Næste: energi-ledkortene kan få en lille "hvor i strømvejen"-strimmel, og vaerdikaede.html's læringslink for robotik kan pege på løkken. Ikke færdig.


## Fra Claude lane-A · 2026-10-16 ~01:35 CEST (AI-floden: usikkerheder, tjek dig selv og ordbog)
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, vaerdikaede.html, value-chains.json og notes.
1. **AI: "Hvad kan gå galt i AI-floden?"** (`#a-risk`) under flodkortet. Seks kort: strømmen slår ikke til, chips laves få steder, nogle led går i cykler, presset flytter sig, AI kan ændre forretningsmodeller, og efterspørgslen kan komme senere. Hvert kort har en mini-flod med alle 13 led i Mads' rækkefølge (energi til fysisk AI), hvor de ramte led lyser gult og åbner leddet. Fem kort har en NDI-linje med kilde (BLOG 10/8-26, 24/8-26, 30/3-26 to gange og 27/7-26). Kortet om cykler er mærket baggrund. Noten siger, at kortene ikke er NDI's vurdering af enkelte selskaber, ikke en rangering og ikke en anbefaling. Data ligger i `ai-compute.risks`, og `renderRisks` tager nu en ekstra klasse (`river`), så 13 prikker kan stå på én linje på 375 px.
2. **AI: "Tjek dig selv"** (`#a-quiz`). Fem spørgsmål, alle med NDI-kilde: hvad vandet er, første flaskehals, hvor efterspørgslen kommer fra, begyndende pres i hukommelse og optik og hvad der sker, når en dæmning letter. Svar-linket åbner leddet eller sektionen. Intet gemmes.
3. **AI-ordbog** (`#a-gloss-wrap`) med 12 ord (compute, flaskehals, GPU/XPU/CPU, fabless, foundry, EUV, HBM, optisk forbindelse, væskekøling, træning og inferens, open weights og agent). Baggrund, bortset fra open weights med kilde. Hvert ord åbner sit led.
4. **Genveje** øverst i flodkortet (Flodkortet, Hvad kan gå galt?, Tjek dig selv, AI-ordbog).
5. **vaerdikaede.html:** Linkrækken under flodet har fået links til usikkerheder, spørgsmål og ordbog.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. 6 kort, 78 prikker og 17 ramte led, og strimlen overløber ikke. Deep-link og genveje lander under menuen (194 og 222 px som de andre faner). Fem rigtige svar giver 5 af 5, og "Se leddet energi" åbner `#lk-energi`. Linket fra vaerdikaede åbner ordbogen. smoke.mjs 52/52 fail 0. Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 reelle hits.
Næste: energi-ledkortene kan få en "hvor i strømvejen"-mini-strimmel, og rum-fanens læse-rute kan få et stop til AI-floden via rum og compute. Ikke færdig.

## Fra Claude lane-A · 2026-10-16 ~02:05 CEST (energi: hvor i strømvejen og genveje)
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaeder.html, value-chains.json og notes.
1. **Energi-ledkort: "Hvor i strømvejen".** Hvert af de fem ledkort har fået en lille strimmel med strømmens vej i fem trin (råstof, elproduktion, elnet, lagring og datacenter), hvor leddet selv er fremhævet. Under strimlen står "Trin N af 5" og én sætning om, hvad der sker på trinnet. Atomkraft står på samme trin som elproduktion. Lagring siger, at næste trin er datacentret i AI-floden. De andre trin kan klikkes: energi-led åbner leddet, og datacentret hopper til `?kaede=ai-compute#lk-datacenter`. Strimlen er mærket baggrund. Teksterne ligger i `energy.flow.steps[].where`.
2. **Energi-led i strømmens rækkefølge.** Leddene står nu som Råstoffer, Elproduktion, Atomkraft, Elnet og Lagring, så "Led 1" svarer til trin 1 i "Fra råstof til regnekraft". På vaerdikaede.html starter energikortet derfor ved Råstoffer.
3. **Genveje i energi-fanen** (`#e-links`): Strømmens vej, Hvad kan gå galt? (6), Tjek dig selv (5) og Energi-ordbog. De erstatter de to løse links. Ordbogen åbner, når man hopper til den.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. 5 strimler med 5 trin, klik på Elnet i atomkraft-kortet åbner `#lk-grid`, og datacenter-hop giver `?kaede=ai-compute#lk-datacenter`. Genvejen til quizzen lander på 194 og 222 px som de andre faner. smoke.mjs 52/52 fail 0 (egen server på 8817). Precheck PASSED. Grep efter handelssprog og tankestreger i diff giver 0 hits.
Næste: kvante-fanen kan få genveje og et "Hvad kan gå galt?", og rum-fanens læse-rute kan få et stop til AI-floden. Ikke færdig.
