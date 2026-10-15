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


## Parallel lanes · ~23:39 CEST (Grok coordinator)
Worktrees: `/workspace/ndi-wt-{A..E}` branches `lane-A`…`lane-E`.
- **Claude A** (wt-A): vaerdikaeder / value-chains / space polish
- **Claude B** (wt-B): MADS screener/themes/unique-metrics
- **Claude C** (wt-C): ideer / lær / HANDOFF / UX checkpoints
- **Grok D** (wt-D): visual variety + css + drawdown/embed
- **Grok E** (wt-E): space/energy JSON + profiles
Continuous wrappers in `logs/lane-*-{claude,grok}.{out,pid}`. Merge→precheck→smoke→push via coordinator only to main.

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

## Fra Claude lane-B (screener/sort, cyklus 1)
- **app.js:** sortering er nu en whitelist (`SORTS` = navn/vægt/tema) i stedet for blacklist af ps/pe/drawdown; ukendte `sort=` (fx gamle `sort=pe`) normaliseres i URL. Ny **tema-sortering** (dansk temanavn, inden for tema efter vægt; "Andet" altid sidst). Stabil tie-break på navn.
- **Temastatus-filter** i Udforsk: "Uden temaforslag (230)" / "Kun temaforslag (115)" + chip + URL `status=` + i CSV-filnavn og skærmlæser-annoncering. Kun antal selskaber, ingen tal pr. aktie.
- Tom tilstand: nævner statusfilter og "Søgningen alene giver N selskaber - fjern tema-/statusfilter".
- Fokus vender tilbage til kolonneknappen efter sortering (a11y). Lede-copy rettet (multi-tag findes nu).
- **selskaber.html:** nu reel A-Z (før vægt-sorteret trods navnet): sortér Navn/Vægt/Tema, bogstav-/tema-hop, gruppe-rækker, multi-tags + forslag-badge, søgning i tema, HTML-escaping af `q` (XSS), tom tilstand m. FAQ-link.
- Test: smoke.mjs fail 0. **Præ-eksisterende** stale asserts (ikke lane-B-filer): smoke-quality "NDI-linsen → værdikæde" og smoke-cycle3 "entré: linser" forventer `vaerdikaede.html`, men links peger nu på `vaerdikaeder.html` → testen skal opdateres af ejeren af scripts/.
- precheck exit 0. Branch `lane-B` klar til merge-review. Næste: temaer-hub polish (quantum/space-synlighed, forslag-banner).

## Fra Claude lane-C (ordliste) · ~23:40 CEST
- `docs/om-data.html`: ordliste 26 → **55 begreber**, grupperet i 4 paneler (Afkast og risiko · Fonden og andelsklasser · Portefølje, temaer og modenhed · Værdikæder og flodsystemet) + «Spring til»-links. Alle eksisterende `#g-*`-ankre bevaret.
- Nye: månedsafkast, 100k-eksempel, benchmark, udsving, variance drag, underwater, andelsklasse, løbende omkostninger, vægt («ikke kurs» → adresserer UX MUST 3 i tekst), spredning, multi-tag (Tesla, verificeret mod multi-tags.json), Andet, AI-udkast, GICS, præ-revenue/præ-profit, value, markedsværdi, led, dæmning/flaskehals (5 dæmninger fra value-chains.json), NDI-blik, compute, hyperscaler, foundry, litografi, optik/fotonik, agentisk AI, fysisk AI, SMR, SpaceTech (Musk kun citat).
- AI-værdikæde-definitionen rettet til 13-leds-kæden (var 5 led). P/E-definition har nu Mads' «høj = forventning / lav = bekymring».
- `laer/faq.html`: «Sådan tænker NDI»-svar nævnte 4 af 5 principper → alle 5.
- Test: Playwright 375 px, 55 dt / 6 paneler, 0 konsolfejl; FAQ-søg «dæmning» rammer ordlisten. precheck PASSED.
- Branch `lane-C` klar til merge. Næste: UX-review 00:00 + ideer.html visual variety.


## Fra Claude lane-C (idéer + sidekort) · ~23:45 CEST
- `docs/ideer.html`: +4 visuelle former — flodsystem-SVG (5 dæmninger, 3 nummererede i gult, citat 30. mar 2026), «Én kasse eller flere tags» (Tesla GICS vs multi-tag), «Vægt er ikke kurs» (to mini-linjer), 3 citatkort med ugebrevsdato. Reduced-motion respekteret.
- `docs/kort.html`: dør-gitter var brudt af løse links; nu 6 grupper + alle 10 lær-sider.
- Notes: UX-review lane-C checkpoint, VIDENSBOT-live-check (ordscan ren), HANDOFF demo-trin 7 opdateret.
- Test: Playwright 375/1280, 0 konsolfejl, 0 døde interne links, ingen h-overflow. precheck PASSED.
- Branch `lane-C` klar til merge. Næste: UX-review 00:00 + FAQ/ordliste mobil-længde.


## Fra Claude lane-C (mobil-længde) · ~23:50 CEST
- `laer/faq.html`: standardvisning = 10 korte svar + type-filter + «Prøv»-chips → 10.700 → ~1.950 px på 375. Søgning skifter til alle typer. JS-filen urørt.
- `om-data.html`: ordlistegrupper som `<details>` (foldet < 700 px, åbne på desktop/uden JS), dybe `#g-*`-links åbner rigtig gruppe → 8.500 → ~1.500 px.
- `ideer.html`: lodret flod-SVG under 660 px (alle 5 dæmninger uden rul).
- HANDOFF demo-trin 7–8 opdateret. smoke 52/52, precheck PASSED.
- Branch `lane-C` klar til merge. Næste: UX-review 00:00 (wall-clock) + Vidensbot-copy på invester/risici/ndi-perspektiv.

## Fra Claude lane-A · 2026-10-15 ~23:55 CEST
Branch `lane-A` er klar til merge. Kun egne filer er rørt: vaerdikaede.html, vaerdikaeder.html, value-chains.json og notes.
1. **vaerdikaede.html er bygget om.** Den gamle side havde 6 hårdkodede led, der modsagde AI-kæden med 13 led. Nu læser siden `value-chains.json` og viser de 13 AI-led i Mads' rækkefølge. Leddene er grupperet under de 5 dæmninger med en flod-gradient fra fysisk til digital. Hvert led har ikon med nummer, blurb, antal og vægt (forsinket, 1. juni 2026) og top 5. Hvert led linker også til `vaerdikaeder.html?kaede=ai-compute#lk-<led>`. Selskabssøgningen bruger nu den ægte led-tilordning i stedet for temaer og viser også, hvilke andre kæder selskabet står i. Temaknapperne viser, hvor mange af leddets selskaber der har temaet. Kontrakter er bevaret: `#theme-btns` (data-k, aria-pressed), `?tema=`, `?isin=` og `.chain .node.hit`.
2. **Deep-link til ét led virker nu.** `vaerdikaeder.html?kaede=X#lk-Y` åbner og scroller til leddet ved load. Før virkede det kun ved klik på siden.
3. **Tesla er tilføjet AI-leddet "Energi og strømfordeling"** (energilagring, det samme som i energikædens lagringsled, og multi-tag energi). Leddet har nu 21 selskaber.
4. **Energikæden:** "hvad ændrer sig" er skrevet om for elproduktion (datacentre bygger egen strøm), elnet (2/3 af USA's kapacitet, BLOG 10/8-26), lagring (told-anledningen, BLOG 21/7-25) og råstoffer (geopolitik, BLOG 21/9-26). Kædens "hvorfor" har fået "masser af elektroner"-citatet med kilde.
Tjek: Playwright på 1280 og 375 med 0 konsolfejl og ingen sidescroll. Tesla `?isin` giver 2 led, chips-filter 4 led, og deep-link `#lk-memory` åbner leddet. Precheck PASSED. smoke-cycle3 111/113: de 2 fejl ("entré: linser … værdikæde") skyldes, at `app.js` linker til vaerdikaeder.html, mens testen forventer vaerdikaede.html. Det er ikke lane-A-fil og var allerede rødt før. smoke-quality 104/106: de 2 fejl ("NDI-linsen → værdikæde") skyldes, at selskab.html ikke har noget `vaerdikaede.html?isin=`-link. Det er heller ikke lane-A-fil og var allerede rødt før. `vaerdikaede.html?isin=` virker selv. Handelssprog: grep giver 0 hits.
Næste: rum-pædagogik (ordliste/kredsløbshøjder), krydslinks for kvante og ét led pr. kæde i vaerdikaede.html. Ikke færdig.

- Lane-R: UX + compliance review cycle 1 landed (notes/CLAUDE-*-review.md).
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

## Fra Grok lane-E

**2026-10-15 ~23:55 CEST. Energi- og rumeksempler efter forretning. Ikke færdig.**

Beholdning pr. 1. juni 2026. Ingen nye kurser, afkast, P/E eller P/S. HTML på værdikædesiden er ikke rørt.

1. `value-chains.json`: energikædens fem led og rumkædens tre led lister selskaber efter forretning. Før stod de samme topvægte på hvert led, så CoreWeave også stod under atomkraft. Nu: elproduktion 16 selskaber (5,41 %), SMR 7 (1,43 %), elnet 5 (1,39 %), batterier 4 (1,95 %), råstoffer 21 (3,81 %). Rum: opsendelse 6 (1,74 %), satellitter 7 (1,31 %), rum og compute 4 (0,85 %). `weightSum` er summen af eksemplerne, ikke temaets samlede vægt.
2. Udeladt med vilje og skrevet i teksten: CoreWeave, Nebius og IREN (datacentre), ProPetro (boreservice), Merlin, Archer og Airo (luftfart i SpaceTech-temaet). SpaceX er ikke i snapshottet. Rum og compute siger, at ingen af eksemplerne er et datacenter i kredsløb. Musk-citatet er stadig kun citat.
3. `company-profiles.json`: 65 nye profiler for tomme rum- og energinavne, plus de fysiske og uklassificerede navne, kæden linker til. Ingen `reviewedAt`, så AI-udkast-badget bliver, uden dato for gennemgang. Kilde er selskabets egen side.
4. `periode.html`: "Siden start" hedder "Siden første NAV", med datoen fra seriens første punkt. `nyhedsarkiv.html`: to konceptkort om energi og rum. Arkivet indeholder stadig ikke ugebrevene.
5. Tjekket i Chromium ved 1280 og 375: energifanen viser Fluence, Oklo og Quanta og linker ikke CoreWeave. Rumfanen linker Rocket Lab og Planet og linker ikke Archer. Fluence og Oklo har AI-udkast. Periode 2025 og siden første NAV renderer. Ingen konsolfejl. Ingen vandret scroll på energikæden ved 375.

AI-compute-leddet "Energi og strømfordeling" er ikke rettet, så det ikke støder sammen med lane A.

**Push:** `lane-E` @ `8082b22` er pushet efter precheck. Branchen kan merges.

**Samme bane, næste punkt:** ÅTD på `periode.html` viste 1. januar, mens tallet regnes fra sidste punkt året før. For PMINDI er det 31. dec. 2025 → 14. okt. 2026 og +4,0 %. Kalenderåret 2025 viser 31. dec. 2024 → 31. dec. 2025. Tjekket i Chromium ved 1280 og 375. Ingen konsolfejl. Ingen vandret scroll. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:05 CEST. Kort fortalt på fem usikre navne. Ikke færdig.**

`company-profiles.json` har nu `narrative` og `narrativeSources` på Starfighters Space, Oklo, Northern Dynasty (Pebble), Terra Innovatum (SOLO) og The Metals Company. Ingen `reviewedAt`. Siden siger derfor stadig AI-udkast, uden "tjekket mod kilden".

Teksten siger, hvad selskabet laver, og hvad der ikke er i drift: orbital opsendelse er ikke en rutetjeneste, Oklo og SOLO har ikke et kommercielt værk i drift, Pebble er ikke en mine, nodulerne er ikke i produktion. Kilden er selskabets egen side. Ingen kurser, afkast, P/E eller P/S i de nye afsnit.

Tjekket i Chromium på `selskab.html` for de fem ISIN. "Kort fortalt" viser første afsnit. "Læs hele forklaringen" åbner resten. AI-udkast er med. Ingen konsolfejl. Ingen vandret scroll ved 375 px på Starfighters-siden. P/E i sidefoden er den faste disclaimer om, at tallene ikke vises.

**Push:** forrige tip på `lane-E` er `0907706`. Dette commit kan merges, når det er pushet. Branchen er `lane-E`. Ikke main.

## Fra Grok lane-E

**2026-10-16 ~00:15 CEST. Kort fortalt på syv navne i kæden. Ikke færdig.**

`company-profiles.json` har `narrative` uden `reviewedAt` på Fluence, NextEra, Rocket Lab, Planet, NuScale, Quanta og GE Vernova. AI-udkast bliver. Ingen "tjekket mod kilden".

Grænser i teksten: Fluence er ikke et kraftværk. NextEra har atomkraft i drift og er ikke en SMR-udvikler. Forsiden skriver, at NextEra og Dominion skal lægges sammen, og teksten siger ikke, at det er sket. Rocket Lab flyver Electron. Neutron er ikke fløjet i beskrivelsen. Planet sælger billeder og opsender ikke selv. NuScale gengiver selskabets tal på 77 MW pr. modul, og godkendelsen er ikke et værk i drift. Quanta bygger nettet og ejer ikke strømmen. GE Vernova leverer udstyr og driver ikke værkerne. NextEra og Quanta står som temaforslag i snapshottet.

Fluence-siden svarede 403 til opslaget. Der er ikke lagt nye produktnavne ind. De andre tekster er holdt til selskabets egen side den 16. oktober 2026.

Tjekket i Chromium på de syv `selskab.html`. "Kort fortalt" og AI-udkast er med. Ingen konsolfejl. Ingen vandret scroll ved 375 px.

**Push:** `lane-E` @ `acbac20` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

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

## Fra Claude lane-C (risici · invester · NDI-perspektiv · ordliste) · ~23:58 CEST
- `risici.html`: SRI-skala 1–7 pr. klasse, 6 risikokort i Vidensbot-sprog (flodsystem som risiko, ikke som købsargument), fast «Sådan bruges NDI Analytics»-boks.
- `invester.html`: «Tre spørgsmål før du investerer» + ISIN/KID-tabel for begge klasser; ulukket `<p>` rettet.
- `ndi-perspektiv.html`: tabellen var ulæselig på mobil (arvet nowrap) → sidelokal fix + kort-layout < 700 px; hints/links fra unique-metrics vises; «Hvad linsen spørger om».
- `om-data.html`: ordliste 55 → 61 (valutarisiko, glidende gennemsnit, prospekt, UCITS, likviditet, stokastisk proces); KID-navn rettet. kort.html-tæller opdateret.
- Notes: UX-review 00:00, VIDENSBOT-live-check, HANDOFF demo-trin 8.
- Test: Playwright 375/1280 på 5 sider: 0 konsolfejl, 0 døde links, ingen h-overflow. smoke 52/52 fail 0. precheck PASSED.
- Branch `lane-C` klar til merge. Næste: lær-sider copy-gennemgang mod Vidensbot (saadan-taenker-vi, livscyklus, pe-forklaring) + UX-review 02:00.


## Fra Claude lane-C (lær-sider mod Vidensbot) · ~00:20 CEST 16/10
- `laer/saadan-taenker-vi.html`: tre udgangspunkter som kæde (BOG s. 27–28), fem principper hver med «Derfor:» + link, citat «Vores mål er ikke at finde den ene vinder» (ugebrev 13. jul 2026), «Markedet har som udgangspunkt ret», flodsystem uddybet, boks «Bogen og fonden er to forskellige ting» (TM §0).
- `laer/livscyklus.html`: SVG-kurve (omsætning + overskudsgrad, 5 faser) med sidens 5 modenhedsgrupper; lodret variant < 660 px. Gruppekort, «rigtigt værktøj» (skrue/hammer, Amazon reinvesterer), ordlistelinks.
- `laer/pe-forklaring.html`: hvad P/E er, høj/lav som forventning/bekymring, «Samme selskab, to valg» (opdigtet A/B: P/E 100 vs 25), P/E finder ikke bobler. Ingen P/E-tal pr. aktie.
- `om-data.html`: ordliste 61 → 63 (tre udgangspunkter, livscyklus). kort.html-tæller + laer/index-tekst opdateret.
- Fundet og rettet under test: lodret SVG blev også vist på desktop (CSS-specificitet); P/E-siden mistede sin media query.
- Test: Playwright 375/1280: 0 konsolfejl, 0 døde links, ingen h-overflow. smoke 52/52 fail 0. precheck PASSED.
- Branch `lane-C` klar til merge. Næste: forsinket-beholdning / udbytte-vs-akk / hvorfor-mange-aktier mod Vidensbot + UX-review 02:00.


## Fra Claude lane-C (tynde lær-sider mod Vidensbot) · ~00:45 CEST 16/10
- `laer/hvorfor-mange-aktier.html`: «vi kan ikke pege på vinderen» + citat (ugebrev 13. jul 2026); stablede søjler for variance drag ved 1/10/30/100/300 aktier (tænkt eksempel, markedsdel vs selskabsspecifik); vægtfordeling fra snapshot 1. jun 2026 (PMINDI 345 pos.: 55 / 247 / 38 / 5; top 10 = 11,9 %); «gør / gør ikke»-kort; bog≠fond-link til `saadan-taenker-vi.html#tv-bog`.
- `laer/udbytte-vs-akk.html`: ex-dato-visual (opdigtet 100 kr → 90 + 10), «Derfor viser vi totalafkast», sammenligningstabel (kort-layout < 640 px). Titel → «Udbytte eller akkumulerende?» (index, kort, FAQ-svar fulgt med).
- `laer/forsinket-beholdning.html`: tidslinje «to datoer, to formål», hvorfor-sektion, «viser vi / viser vi ikke».
- Faktarettelse: ordliste «Andelsklasse» sagde «samme portefølje». Snapshot: PMINDI 345, PMINDIAKK 320 (alle 320 også i PMINDI) → «samme strategi, beholdninger ligner meget, ikke identiske». **Ikke min fil:** `sammenlign.html:96` siger stadig «Samme portefølje» — til den lane, der ejer den.
- Test: Playwright 375/1280 på 7 sider: 0 konsolfejl, 0 døde links, ingen h-overflow. precheck PASSED.
- Branch `lane-C` klar til merge. Næste: variance-drag + faq-mangler-aktie visuelt + UX-review 02:00.


## Fra Claude lane-C (variance drag + mangler aktie X) · ~00:10 CEST 16/10
- `laer/variance-drag.html`: Møntspillet fra bogen (s. 133–136, +50/−40 → 10.000 kr. bliver til 5.905 mod 16.289) som SVG over 10 år; skyder «Prøv selv» (±udsving → slutbeløb, CAGR, σ²/2) med fallback uden JS; søjler «et fald kræver en større stigning»; NDI-afsnit (vi viser CAGR, derfor spreder fonden bredt).
- `laer/faq-mangler-aktie.html`: søgeformular → `selskaber.html?q=` (testet: «tsm» giver 1 træf); tre tjek (navn/ticker, dato 1. jun 2026, andelsklasse); tragt marked → portefølje (345); fire grundkort; «fravær er ikke en vurdering». Eksemplet var Alphabet, men Alphabet er **ikke** i snapshottet → skiftet til Meta/TSMC (verificeret i portfolio.json).
- Bevidst ingen fast markedsværdigrænse: tese 2023 (gældende) siger ≥1 mia. USD, udkast 2.0 siger intet minimum. Siden siger kun «for lille eller handles for lidt» (MC, VB 24:50).
- Ordliste 63 → 66 (ticker, ADR, møntspillet). FAQ-kortsvar + laer/index + kort-tæller fulgt med.
- Test: Playwright 375/1280 på 6 sider: 0 konsolfejl, ingen h-overflow, skyder ±30 → 91 kr./−4,6 %. precheck se nedenfor.
- Branch `lane-C` klar til merge. Næste: UX-review 02:00 (wall-clock) + ideer.html visuel variation + HANDOFF demo-check.
- **Fra Claude lane-R (00:18, cyklus 5, main `60cebcc`):** drawdown 375-overflow + korrekte DD-datoer på drawdown.html ✅, omkostninger kr.-eksempel ✅. Nye MUST: risici/fakta viser stadig DD-top 2. jun. 2026 (inkonsistent med drawdown.html), "MADS FØLGER"-badge på tredjeparts X-opslag, ndi-paa-x kalder NDI-konti "ikke NDI's holdning". Stadig åbne: ingen markedsføringsmærkning, AKK-NAV, "afventer Fundmarket", "udfyldes af NDI"/"kl n" på omkostninger. Se notes/CLAUDE-*-review.md.
- **Fra Claude lane-R (00:25, cyklus 6, main `60cebcc` uændret):** Ingen nye docs-ændringer. Alle MUST fra cyklus 5 er stadig åbne: markedsføringsmærkning (0 hits), "Mads følger" (`js/x-feed.js:279`), DD-peak 2026-06-02 i risk-stats.json, AKK-NAV. Se notes/CLAUDE-*-review.md.
