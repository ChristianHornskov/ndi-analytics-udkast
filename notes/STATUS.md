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

## Fra Grok lane-E

**2026-10-16 ~00:20 CEST. Kort fortalt på tolv navne, med grænse for hvad der er i drift. Ikke færdig.**

`narrative` uden `reviewedAt` på Southern Company, Vistra, Talen, Bloom, Centrus, BWX Technologies, Rolls-Royce, Firefly, Voyager, Karman, Plug Power og Nano Nuclear. AI-udkast bliver.

Tjekket mod sider, der svarede: Southern skriver, at Vogtle leverer strøm til mere end 1 million hjem og virksomheder i Georgia. Vistra skriver om 20-årige aftaler med Meta. Mere end 2.600 MW, heraf 2.176 MW i drift og 433 MW som øget effekt. Ikke en ny reaktor. Centrus udvider berigning, herunder HALEU, og er ikke et kraftværk. Rolls-Royce skrev i juni 2026, at SMR-programmet er valgt til et projekt i Sverige. Valget er ikke et værk i drift. Flymotorer er stadig hovedforretningen. Firefly skriver, at Blue Ghost er landet på Månen. Eclipse er ikke fløjet i teksten. Nano Nuclear omtaler en forberedende dialog om byggetilladelse til KRONOS. Dialogen er ikke en tilladelse.

Siderne for Talen, Bloom, BWX Technologies, Voyager, Karman og Plug Power svarede 403. Der er ikke lagt nye tal eller produktnavne ind. Teksten gentager den profil, der allerede stod, og grænsen for drift.

Tjekket i Chromium på de tolv sider. AI-udkast er med. "Tjekket mod kilden" er ikke med. Ingen konsolfejl. Ingen vandret scroll ved 375 px.

**Push:** `lane-E` @ `c4d39e0` er pushet efter precheck. Første forsøg blev afvist, andet gik igennem. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:25 CEST. Kort fortalt på projekter, der ikke er miner, og på rum-navne, der ikke er datacentre. Ikke færdig.**

Atten profiler fik `narrative` uden `reviewedAt`. AI-udkast bliver.

Nye grænser fra sider, der svarede: Lithium Americas skriver, at Thacker Pass er under opførelse, med mål sent i 2027. Ikke fuld drift. Standard Lithium skriver, at et demonstrationsanlæg kører. Projekterne i Arkansas og Texas er ikke en stor mine. Trilogy kalder Arctic og Bornite efterforskning og udvikling. Ivanhoe Electric udvikler Santa Cruz. Eos skriver, at zinkbatterierne fremstilles i USA. De er lagring, ikke en mine. Satellogic kalder satellitterne NewSat og opsender ikke selv. MDA omtaler Chorus, før det er sendt op. QuantumScape omtaler QSE-5 og ikke masseproduktion.

NioCorp, Critical Metals, USA Rare Earth og Hawkeye 360 gav ikke en læsbar side. Intuitive Machines omdirigerer i ring. De tekster holder sig til den profil, der allerede stod. Tesla og T1 Energy har gennemgangsdato og er ikke ændret. Kursen på Standard Lithiums side er ikke taget med.

Tjekket i Chromium på de atten sider. AI-udkast er med. Ingen gennemgangsdato. Ingen konsolfejl. Ingen vandret scroll ved 375 px.

**Push:** `lane-E` @ `d4c8d57` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:30 CEST. Gas, netbyggere og miner i drift har Kort fortalt. Ikke færdig.**

Nitten profiler uden `reviewedAt`. AI-udkast bliver.

Gas: Comstock i Haynesville, Antero med Marcellus, EQT og Expand Energy. De står på elproduktion som brændsel, ikke som metalminer. Cummins og Generac laver motorer og generatorer og er ikke elselskaber. Primoris og MYR Group bygger nettet og ejer ikke strømmen.

Miner: MP Materials ved Mountain Pass, United States Antimony, Energy Fuels (uran, ikke et kraftværk), Almonty (Panasqueira og Los Santos som miner, Valtreixal som projekt), Taseko/Gibraltar, siden bruger også navnet Trekor Metals, Freeport, Ero med Caraíba og Tucumã som kobber og Furnas som projekt. Lynas, Capstone og Southern Copper holdt sig til den gamle profil, fordi siden ikke gav en læsbar tekst. Kurser på Expand Energy og Taseko er ikke taget med.

Sigma Lithium: `sigmalithium.com` beskrev anoder, ikke koncentrat i Brasilien. Kilden er nu `https://sigmalithiumcorp.com/`. Teksten siger lithiumkoncentrat, ikke et batteriselskab.

Babcock & Wilcox, T1 Energy og Tesla har gennemgangsdato og er urørt. Af de unikke navne i energi- og rumkæden mangler kun de tre en "Kort fortalt".

Tjekket i Chromium ved 375 px på de nitten sider, Sigma med. AI-udkast er med. Ingen gennemgangsdato. Ingen konsolfejl. Ingen vandret scroll. Ingen kurstegn i de nye afsnit.

**Push:** `lane-E` @ `23415ee` er pushet efter precheck. Første forsøg blev afvist, andet gik igennem. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:35 CEST. Blurbs på kæden skelner drift fra projekt. Ikke færdig.**

`value-chains.json`, kun energi og rum. HTML er ikke rørt. AI-compute-leddet er ikke rørt. Det hedder stadig Coreweave øverst på "Energi og strømfordeling".

SMR-teksten siger, at ingen af navnene er et anlæg i kommerciel drift. BWX Technologies leverer komponenter. Rolls-Royce er en motorkoncern med et reaktorprogram ved siden af. Råstoffer siger, at nogle navne er projekter, og at andre driver miner, blandt andet Mountain Pass og Gibraltar. Opsendelse siger, at Neutron og Eclipse ikke er fløjet i beskrivelserne, og at Firefly skriver, at Blue Ghost er landet. Taseko vises som i beholdningen, Taseko Mines (Trekor Metals).

Tjekket i Chromium på energi- og rumfanen. Teksterne står i kæden. Ingen konsolfejl. Ingen vandret scroll ved 375 px på rumfanen.

**Push:** `lane-E` @ `b1070f2` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:40 CEST. Konceptkortene i nyhedsarkivet følger kædens grænser. Ikke færdig.**

`nyhedsarkiv.html`. To konceptkort, ikke ugebreve. Energikortet siger, at gas står som brændsel, at små reaktorer ikke er beskrevet som værker i drift, og at nogle råstoffer er projekter, mens andre er miner. Rumkortet siger, at Neutron og Eclipse ikke er fløjet i beskrivelserne, og at ingen af eksemplerne under rum og compute er et datacenter i kredsløb. SpaceX er stadig ikke i beholdningen. Musk-citatet er stadig kun citat.

Tjekket i Chromium. Teksterne står på siden. Linket til værdikædesiden åbner `vaerdikaeder.html`. Ingen konsolfejl. Ingen vandret scroll ved 375 px.

**Push:** `lane-E` @ `ea822fe` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:45 CEST. Indledningen på kæderne siger grænsen, før leddene. Ikke færdig.**

Energikædens `why` siger, at gas på elproduktion er brændsel, ikke en metalmine, og at navnene under atomkraft og SMR ikke er værker i kommerciel drift. Rumkædens `why` siger, at rum og compute er infrastruktur, ikke et datacenter i kredsløb. Merlin i den udeladte liste er rettet til luftfart. Listen vises ikke på siden.

Tjekket i Chromium ved 375 px. Indledningerne står. Klik fra elproduktion til NextEra og fra opsendelse til Rocket Lab åbner selskabssiden med AI-udkast og uden gennemgangsdato. NextEras afsnit om Dominion ligger bag "Læs hele forklaringen". Periodesiden viser stadig 31. dec. 2025 og +4,0 %, og chippen "Siden første NAV". Ingen konsolfejl. Ingen vandret scroll ved 375 px på periodesiden.

`forslag` på energi- og rum-leddene matcher `themeStatus` i beholdningen. Ingen afvigelser.

**Push:** `lane-E` @ `9127b17` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:50 CEST. Periodesiden siger, at 2026 og år til dato er ens. Ikke færdig.**

`periode.html`. Kalenderåret 2026 og år til dato bruger begge 31. dec. 2025 som udgangspunkt og 14. okt. 2026 som sidste punkt. Begge viser +4,0 %. Siden siger det i kontekstafsnittet. 2023 er stadig delår, 22. sep. 2023 til 31. dec. 2023. 2024 er 31. dec. 2023 til 31. dec. 2024. 2025 er 31. dec. 2024 til 31. dec. 2025. Siden første NAV er 22. sep. 2023 til 14. okt. 2026 og +104,8 %.

Tjekket i Chromium ved 1280 og 375. Sætningen står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `392c712` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:55 CEST. Råstoffer og batterier siger, hvad Centrus og QuantumScape ikke er. Ikke færdig.**

På energikæden siger råstof-leddet, at Centrus beriger uran til brændsel og ikke er et kraftværk. Batteri-leddet siger, at QuantumScape er et batteridesign til køretøjer og ikke masseproduktion. Vægtene er ikke ændret.

Tjekket i Chromium ved 375 px på energifanen. Begge sætninger står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `341d09d` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 ~00:32 CEST. Opsendelse siger, at Starfighters ikke er en orbital rute. Ikke færdig.**

På rumkæden siger opsendelses-leddet, at Starfighters skriver, at STARLAUNCH 1 er et suborbitalt udviklingsfartøj og ikke en orbital rute. Howmet leverer metaldele og sender ikke selv op. Profilen på Starfighters gengiver selskabets meddelelse af 13. oktober 2026: den planlagte flyvning i december er med raketten under vingen, og den er ikke gennemført. Ingen `reviewedAt`. Markedsformuleringen om at være det eneste selskab er ikke kopieret. Kurser fra investorksiden er ikke kopieret.

Vægte og antal på de otte energi- og rum-led matcher stadig listen. Hver listet vægt matcher PMINDI pr. 1. juni 2026. Porteføljens leverandørnavne er ikke byttet ind som visningsnavne.

Tjekket i Chromium. Rumfanen viser begge sætninger. Nyhedsarkivets rumkort siger det samme. Selskabssiden har AI-udkast, ikke "tjekket mod kilden". Andet afsnit ligger bag "Læs hele forklaringen". Ingen konsolfejl. Ingen vandret scroll ved 375 px.

**Push:** `lane-E` @ `cd57b51` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:34 CEST. Råstoffer siger, at noduler, Pebble og Thacker Pass ikke er drift. Ikke færdig.**

På energikæden siger råstof-leddet, at The Metals Company skriver, at prøvekørsel ventes at begynde i fjerde kvartal 2027, og at aftalen og ansøgningen ikke er produktion. Northern Dynasty skriver, at Pebble er i føderal tilladelsesbehandling. Lithium Americas skriver, at Thacker Pass bygges, med mål om industriel skala sent i 2027. Ingen af de to er i fuld drift. Mountain Pass og Gibraltar står stadig som miner. Vægtene er ikke ændret.

Profilen på The Metals Company gengiver meddelelsen fra maj 2026 om Allseas og offentliggørelsen i august 2026. Ansøgningen er ikke en tilladelse. Kapacitetstal og formuleringer om verdens største ressource er ikke kopieret. Ingen `reviewedAt`.

Tjekket i Chromium på energifanen, nyhedsarkivet og selskabssiden. AI-udkast er med. "tjekket mod kilden" er ikke med. Andet afsnit ligger bag "Læs hele forklaringen". Ingen konsolfejl. Ingen vandret scroll ved 375 px.

**Push:** `lane-E` @ `454278f` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:36 CEST. Elnet siger, hvem der bygger, og hvem der leverer strøm. Ikke færdig.**

På energikæden siger elnet-leddet, at Quanta, Primoris og MYR Group bygger nettet og ikke producerer strømmen. GE Vernova leverer udstyr og driver ikke værkerne. Solaris leverer strøm tæt på store forbrugere. Vægtene er ikke ændret.

Solaris' forside omtaler 16. oktober 2026 købet af Omega, dateret 6. juli 2026. Det ligger efter beholdningen pr. 1. juni 2026 og er ikke skrevet ind. Quanta-siden siger, at selskabet bygger og vedligeholder nettet. Formuleringen om den største arbejdsstyrke er ikke kopieret. MYR Group kalder sig entreprenør.

Tjekket i Chromium ved 375 px på energifanen og i nyhedsarkivet. Sætningerne står. Omega står ikke. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `c37e9c0` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:37 CEST. Elproduktion skelner brændsel, moduler og udstyr. Ikke færdig.**

På energikæden siger elproduktions-leddet, at Comstock, Antero, EQT og Expand leverer gas som brændsel. T1 Energy laver solcellemoduler. Cummins og Generac laver motorer og reservegeneratorer og er ikke elselskaber. Babcock & Wilcox leverer kedler og service. GE Vernova leverer udstyr og driver ikke værkerne. Bloom leverer brændselsceller hos kunden. Plug leverer brændselsceller og brintudstyr. Teksten siger ikke, at hvert anlæg kører. Vægtene er ikke ændret. T1 og Babcock har `reviewedAt` og er ikke rørt i profilen.

Bloom og Plug gav 403 i nat. Sætningerne er derfor de grænser, profilerne allerede havde. Cummins, Generac og Babcock svarede 200.

`1efc064` indeholder elnet-teksten. Emnelinjen gentog den forrige, fordi beskedfilen ikke var skrevet om, da commit kørte. Indholdet er elnettet. Historikken er ikke omskrevet.

Tjekket i Chromium ved 375 px på energifanen og i nyhedsarkivet. Sætningerne står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `1efc064` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:39 CEST. Batterier og satellitter siger, hvad Fluence, Eos, Redwire og Chorus ikke er. Ikke færdig.**

På energikæden siger batteri-leddet, at Fluence leverer batterisystemer og software til nettet, ikke et kraftværk, og at teksten ikke siger, at selskabet selv laver cellerne. Eos laver zinkbatterier og er ikke en mine. QuantumScape er stadig ikke masseproduktion.

På rumkæden siger satellit-leddet, at Redwire leverer dele og ikke selv sender op, at York bygger platforme til kunden, og at MDA omtaler Chorus, før konstellationen er sendt op. MDA's forside sagde det samme 16. oktober 2026. Fluence gav 403, så der er ingen nye produktnavne. Eos-siden kalder selskabet en leder og nævner et lån. Det er ikke kopieret. Vægtene er ikke ændret.

Tjekket i Chromium ved 375 px på begge faner og i nyhedsarkivet. Sætningerne står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `7896363` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:42 CEST. Sangdong er efter beholdningen, og Standard Lithium er et demonstrationsanlæg. Ikke færdig.**

På energikæden siger råstof-leddet, at Standard Lithium skriver, at et demonstrationsanlæg i Arkansas behandler saltvand, og at det ikke er de store projekter. Almonty skrev 23. september 2026, at Sangdong i Sydkorea har produceret wolfram for første gang siden 1993. Valtreixal er et projekt. Meddelelsen ligger efter beholdningen pr. 1. juni 2026. Kurser på Standard Lithiums forside er ikke kopieret. Ingen `reviewedAt`.

Tjekket i Chromium ved 375 px på råstof-leddet, i nyhedsarkivet og på de to selskabssider. AI-udkast er med. "tjekket mod kilden" er ikke med. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `760d781` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:43 CEST. Opsendelse siger månelander, og rum-compute siger Starlab ikke er i drift. Ikke færdig.**

På rumkæden siger opsendelses-leddet, at Intuitive Machines leverer til Månen og ikke er en satellit, der tager billeder af Jorden. Rum og compute siger, at Voyager omtaler Starlab som et stationsprojekt, og at det ikke er en station i drift. Sætningerne er de grænser, profilerne allerede havde. Intuitive Machines' side sendte i ring. Voyager gav 403. Der er ingen nye produktnavne derfra. Vægtene er ikke ændret.

Tjekket i Chromium ved 375 px på rumfanen og i nyhedsarkivet. Sætningerne står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `8b6b48c` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:45 CEST. Florence Copper er kommerciel produktion efter beholdningen. Ikke færdig.**

På energikæden siger råstof-leddet, at Taseko skrev 9. oktober 2026, at Florence Copper er gået i kommerciel produktion, og at meddelelsen ligger efter beholdningen pr. 1. juni 2026. Yellowhead, Aley og New Prosperity er ikke miner i drift i teksten. Gibraltar er stadig en mine. Kurser på Tasekos side er ikke kopieret. Formuleringen om at være den første nye amerikanske kobberkilde er ikke kopieret. Ingen `reviewedAt`.

Vistra har fået kilden til aftalen med Meta af 9. januar 2026. Tallene er de samme: mere end 2.600 MW, heraf 2.176 MW i drift og 433 MW øget effekt. Det er ikke en ny reaktor. "Largest" er ikke kopieret.

Tjekket i Chromium ved 375 px på råstof-leddet og på Taseko-siden. AI-udkast er med. "tjekket mod kilden" er ikke med. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `7b42c4a` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:46 CEST. NuScales 6 GW er et program, ikke et værk i drift. Ikke færdig.**

På energikæden siger SMR-leddet, at NuScale skriver, at et program sammen med TVA kan blive op til 6 GW, og at det er udvikling, ikke et værk i drift. Ingen af navnene er stadig beskrevet som kommerciel drift. Formuleringerne historic, largest og proven er ikke kopieret. Profilen har kilden til programsiden. Ingen `reviewedAt`.

Oklo, Nano Nuclear og Terrestrial er tjekket samme nat. Forsiderne beskriver projekter og udvikling, ikke et værk i drift. Rolls-Royce-adressen for SMR landede på koncernsiden, så der er ingen ny sætning derfra.

Tjekket i Chromium ved 375 px på SMR-leddet og på NuScale-siden. AI-udkast er med. "tjekket mod kilden" er ikke med. 77 MW står stadig. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `10f22ce` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:48 CEST. Nyhedsarkivets konceptkort er delt i korte afsnit. Ikke færdig.**

Energikortet er fem afsnit. Rumkortet er tre. Ordene er de samme som i kæden. Linket til værdikædesiden er der.

Tjekket i Chromium ved 375 og 1280 px. Sætningerne står. Ingen konsolfejl. Ingen vandret scroll.

Neutron-siden sagde samme nat stadig, at første flyvning ligger foran. Teksten om, at Neutron ikke er fløjet, er derfor ikke ændret.

**Push:** `lane-E` @ `42f5f27` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:49 CEST. MP Materials skriver, at magneterne laves i Independence i Texas. Ikke færdig.**

Profilen siger, at udvindingen er ved Mountain Pass i Californien, og at selskabet skriver, at magneter fremstilles på anlægget Independence i Texas. Det er en mine med videre forarbejdning, ikke et chipværk. Formuleringerne om verdens rigeste forekomst og verdens stærkeste magnet er ikke kopieret. Ingen `reviewedAt`.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Independence står i det første afsnit. Ingen konsolfejl. Ingen vandret scroll.

Firefly gav 403. Eclipse-sætningen er ikke ændret.

**Push:** `lane-E` @ `71bd8a8` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:50 CEST. United States Antimony skriver, at de også forarbejder zeolit. Ikke færdig.**

Profilen sagde kun antimon. Forsiden siger, at selskabet udvinder og forarbejder to materialer, antimon og zeolit. Teksten siger det, og at det ikke er et kraftværk. Formuleringen om hele kæden og om at fjerne afhængighed er ikke kopieret. Ingen `reviewedAt`. Rollen i JSON nævner zeolit. Den vises ikke på siden.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Zeolit står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `a5c1301` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:51 CEST. Capstone nævner minerne, og Santo Domingo er et projekt. Ikke færdig.**

Profilen siger, at selskabet skriver, at produktionen i 2025 var 225.000 ton kobber. Siden nævner Mantos Blancos, Cozamin, Pinto Valley og Mantoverde. Santo Domingo er beskrevet som et projekt, ikke som en mine i drift. Tallet på siden stod som 225 k tonnes. Formuleringerne om verdens behov og om at være den eneste er ikke kopieret. Ingen `reviewedAt`.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. 225.000 ton står i det første afsnit. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `53f64d1` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:51 CEST. Freeport nævner Cerro Verde, El Abra og Grasberg. Ikke færdig.**

Profilen siger, at siden nævner Cerro Verde og El Abra i Sydamerika og Grasberg i Indonesien. Det er miner, ikke et elselskab. En ældre webcast-titel om Lone Star er ikke brugt som bevis på drift. Ingen `reviewedAt`.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Grasberg står i det første afsnit. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `b22dc26` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:55 CEST. Southern Copper skriver, at produkterne er kobber, molybdæn, sølv og zink. Ikke færdig.**

Forsiden skriver "Productos Principales: Cobre, Molibdeno, Plata y Zinc" og at selskabet er en del af Grupo México. Profilen siger det. Peru og Mexico stod i forvejen. Navngivne miner stod ikke på den hentede side og er ikke tilføjet. En advarsel om falske profiler er ikke kopieret. Ingen `reviewedAt`. Rollen i JSON nævner de fire produkter. Den vises ikke på kædesiden.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Molybdæn og Grupo México står i det første afsnit. "Ikke et kraftværk" står efter "Læs hele forklaringen". Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `4e60350` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 00:58 CEST. Ivanhoe Electric skriver, at Tintic er et projekt i Utah, og at studiet af Santa Cruz er efter beholdningen. Ikke færdig.**

Forsiden nævner Santa Cruz som kobberprojekt i Arizona og Tintic som kobber- og guldprojekt i Utah. Selskabet bruger målesystemet Typhoon til efterforskning. Nyheden om studiet er dateret 23. september 2026, efter beholdningen pr. 1. juni 2026. Studiet er ikke en mine i drift. Ord om høj lødighed, lave omkostninger og nutidsværdi er ikke taget med. Ingen `reviewedAt`. Rollen i JSON nævner begge projekter. Den vises ikke på kædesiden. Blurben og arkivkortet siger det samme.

Tjekket i Chromium. Selskabssiden ved 375 px viser AI-udkast, Tintic og Typhoon. "tjekket mod kilden" er ikke med. Datoen står efter "Læs hele forklaringen". Kæden viser sætningen under Kritiske råstoffer. Arkivet har et nyt kort afsnit. Ingen konsolfejl. Ingen vandret scroll ved 375 eller 1280 px.

**Push:** `lane-E` @ `9a62de0` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:00 CEST. Energy Fuels nævner White Mesa Mill og siger, at isotoper først er på vej. Ikke færdig.**

Forsiden skriver, at selskabet fremstiller oxider af sjældne jordarter på et anlæg i USA, og at White Mesa Mill producerer uran, sjældne jordarter og vanadium. Titan, zirkonmineraler og medicinske isotoper står som produkter, selskabet er i gang med at tilføje. Ordene largest, leading og "10 of the 50" er ikke taget med. En bundtekst om miner i Colorado, Utah og Wyoming er ikke brugt. Ingen `reviewedAt`. Rollen i JSON nævner White Mesa. Den vises ikke på kædesiden.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. White Mesa står i det første afsnit. Isotoper står efter "Læs hele forklaringen". Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `7d0a138` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:01 CEST. USA Rare Earth daterer Serra Verde til 4. september 2026, efter beholdningen. Ikke færdig.**

Forsiden skriver, at aktiviteterne spænder over USA, Storbritannien og Brasilien, og at et anlæg i Frankrig er planlagt. Selskabet vil udvinde og forarbejde i Texas og i Brasilien. Magneter nævnes i Oklahoma. South Carolina står som planlagt. Overskriften om en gennemført sammenlægning med Serra Verde Group er dateret 4. september 2026, efter beholdningen pr. 1. juni 2026. Selve meddelelsen gav 403, så beløb og prisgulve er ikke taget med. Texas er ikke beskrevet som en mine i drift. Ingen `reviewedAt`.

Tjekket i Chromium. Selskabssiden ved 375 px viser AI-udkast, Texas, Brasilien og Serra Verde. "tjekket mod kilden" er ikke med. Ingen beløb. Kæden og arkivet siger datoen. Ingen konsolfejl. Ingen vandret scroll ved 375 eller 1280 px.

**Push:** `lane-E` @ `3511830` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:03 CEST. Generac skriver, at det også har bærbare generatorer, sol, batterier og ladere. Ikke færdig.**

Forsiden skriver, at en hjemmegenerator giver strøm under et udfald, og at selskabet har bærbare generatorer, sol, batterilagring og ladere til elbiler. Det er udstyr hos kunden, ikke et elselskab og ikke en mine. Ord om at være mest betroet og citater fra kunder er ikke taget med. Ingen `reviewedAt`. Blurben under elproduktion siger det samme. Rollen i JSON er ikke vist på kædesiden.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Bærbare generatorer og ladere står. Kæden viser sætningen. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `529103c` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:04 CEST. EQT skriver, at købet af Equitrans blev gennemført 22. juli 2024. Ikke færdig.**

Meddelelsen er dateret 22. juli 2024, før beholdningen pr. 1. juni 2026. Equitrans er beskrevet som midstream-aktiver. EQT producerer naturgas i Appalachia. Gassen står som brændsel, ikke som en metalmine. Ordet only, breakeven-pris og synergibeløb er ikke taget med. Ingen `reviewedAt`. Blurben under elproduktion siger datoen.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. 22. juli 2024 står. Ingen beløb. Kæden viser sætningen. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `20f9d68` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:06 CEST. Satellogic sætter fuld drift af Merlin til andet halvår 2027. Ikke færdig.**

Satellitterne hedder NewSat. Forsiden sætter fuld drift af Merlin til andet halvår 2027, efter beholdningen pr. 1. juni 2026. Merlin er ikke beskrevet som en tjeneste i fuld drift. Selskabet opsender ikke selv raketterne. Ord om bedste opløsning og realtid er ikke taget med. Ingen `reviewedAt`. Blurben under satellitkommunikation og arkivkortet siger det samme.

Tjekket i Chromium. Selskabssiden ved 375 px viser AI-udkast, NewSat og Merlin. "tjekket mod kilden" er ikke med. Kæden og arkivet viser 2027. Ingen konsolfejl. Ingen vandret scroll ved 375 eller 1280 px.

**Push:** `lane-E` @ `ad828d7` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:07 CEST. MDA præsenterede Aurora Black 10. september 2026. Ikke færdig.**

Meddelelsen er dateret 10. september 2026, efter beholdningen pr. 1. juni 2026. Aurora Black er en softwaredefineret satellit til forsvarskommunikation. Præsentationen er ikke en konstellation i drift. Chorus er stadig omtalt, før den er sendt op. Det er ikke et datacenter. Ord om høj volumen og tickerkurser er ikke taget med. Ingen `reviewedAt`. Blurben og arkivet siger det samme.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Aurora Black står. Kæden og arkivet viser datoen. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `a4aff5e` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:08 CEST. York koordinerer opsendelseslogistik og sender ikke selv raketten op. Ikke færdig.**

Forsiden skriver, at selskabet designer og fremstiller satellitplatforme, og at det koordinerer opsendelseslogistik fra design til levering. Det er ikke det samme som selv at sende raketten op. Selskabet driver ikke et datacenter i rummet. Et tal om tusindvis af satellitter i kredsløb er ikke taget med, fordi siden ikke siger, at York ejer dem. Et tæller-tal for kapacitet er heller ikke taget med. Ingen `reviewedAt`. Blurben og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Opsendelseslogistik står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `dbf15e9` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:10 CEST. Critical Metals: planer for Tanbreez er godkendt, og byggeriet er ikke gået i gang. Ikke færdig.**

Meddelelsen er dateret 5. oktober 2026, efter beholdningen pr. 1. juni 2026. Grønland har godkendt mineplanen og lukningsplanen frem til september 2050. Selskabet skriver, at de sidste driftstilladelser mangler, før byggeriet kan gå i gang. Det er ikke en mine i drift. Wolfsberg i Kärnten er et lithiumprojekt. Et studie, en aftale med BMW og et planlagt raffinaderi i Saudi-Arabien er ikke drift. Kursen på siden og ordene om verdens største er ikke taget med. Ingen `reviewedAt`. Blurben og arkivet siger grænsen.

Tjekket i Chromium. Selskabssiden ved 375 px viser AI-udkast, Tanbreez og Wolfsberg. "tjekket mod kilden" er ikke med. Ingen kurs. Kæden og arkivet viser datoen. Ingen konsolfejl. Ingen vandret scroll ved 375 eller 1280 px.

**Push:** `lane-E` @ `d433eca` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:11 CEST. Karman beskytter nyttelast og sender ikke selv satellitter op. Ikke færdig.**

Forsiden skriver, at selskabet beskytter nyttelast, har udstyr til at skille den fra fartøjet, laver aerodynamiske mellemtrin og samler raketmotorer. Siden nævner også affyringsudstyr. Det er dele. Selskabet sender ikke selv satellitter op. Ord om at sprænge grænsen og om overlegenhed er ikke taget med. Ingen `reviewedAt`. NioCorp og Lynas gav stadig tomme svar. Blurben under opsendelse og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Nyttelast og raketmotorer står. Kæden og arkivet viser sætningen. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `edf8e7e` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:12 CEST. Sigma Lithium nævner Jequitinhonha-dalen, og produktionen startede i 2023. Ikke færdig.**

Forsiden nævner Jequitinhonha-dalen. Selskabet skrev 17. april 2023, at produktionen af lithium var gået i gang. Datoen ligger før beholdningen pr. 1. juni 2026. Det er råstof til batterier, ikke et batteriselskab og ikke et kraftværk. Ordet only og de fem nul-løfter er ikke taget med. Ingen `reviewedAt`. Rollen i JSON nævner dalen. Den vises ikke på kædesiden.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Jequitinhonha står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `ee131c0` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:13 CEST. Antero skriver, at det leverer naturgas og LPG til eksport. Ikke færdig.**

Forsiden siger, at selskabet er et gasselskab i Appalachia, og at det leverer naturgas og LPG til eksport. Marcellus stod i forvejen. Gassen er brændsel, ikke en metalmine. Formuleringen om at være blandt de største er ikke taget med. Ingen `reviewedAt`. Blurben under elproduktion siger eksporten.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. LPG og eksport står. Kæden viser sætningen. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `a234654` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:14 CEST. Expand Energy gennemførte handlen med Twin Eagle 16. september 2026. Ikke færdig.**

Meddelelsen er dateret 16. september 2026, efter beholdningen pr. 1. juni 2026. Twin Eagle bliver et datterselskab og er beskrevet som et marketingselskab. Expand er stadig dannet af Chesapeake og Southwestern. Gassen er brændsel, ikke en metalmine. Kursen på siden, mængder i Bcf og ordene leading og largest er ikke taget med. Ingen `reviewedAt`. Blurben og arkivet siger datoen.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Twin Eagle står. Ingen kurs. Kæden og arkivet viser datoen. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `1a8a43f` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:18 CEST. Planet nævner også Pelican, Tanager og Owl. Ikke færdig.**

Forsiden nævner satellitterne SuperDove, SkySat, Pelican, Tanager og Owl. Owl er omtalt som næste generation. Teksten kalder den ikke en særskilt flåde i drift. Selskabet opsender ikke selv raketterne. Opløsningstal og ord om at sprænge grænser er ikke taget med. Ingen `reviewedAt`. Blurben og arkivet siger navnene.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Owl og Pelican står. Kæden og arkivet viser navnene. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `9b635f4` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:20 CEST. Redwire skrev 1. april 2026, at kameraer skal med på Artemis II. Ikke færdig.**

Meddelelsen siger, at udstyret skal med, ikke at flyvningen er gennemført. Selskabet skriver, at det fremstiller og tester kamerasystemet til Orion på Artemis I til V, og at Artemis II har 11 kameraer. Datoen ligger før beholdningen pr. 1. juni 2026. Et kort på forsiden siger "launched", men artiklen siger "will launch", så flyvningen ikke er skrevet som gennemført. Selskabet sender ikke selv raketten op og driver ikke et datacenter. Ord om historic og et ordrebeløb er ikke taget med. Ingen `reviewedAt`. Blurben og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. 11 kameraer står efter "Læs hele forklaringen". Kæden og arkivet viser datoen. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `150c5f1` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:21 CEST. MYR Group skriver, at arbejdet også dækker industri og vedvarende energi. Ikke færdig.**

Forsiden skriver, at selskabet leverer elektrisk byggeri i USA og Canada, og at projekterne dækker transmission, kommercielle og industrielle anlæg og vedvarende energi. Selskabet ejer ikke strømmen. Ordene leader, largest og 130 år er ikke taget med. Ingen `reviewedAt`. Blurben under elnet og arkivet siger det samme.

Tjekket i Chromium ved 375 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Vedvarende energi står. Kæden og arkivet viser sætningen. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `bdd1213` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:26 CEST. Solaris skrev 6. juli 2026, at det har købt GESA. Ikke færdig.**

Meddelelsen siger, at Solaris har købt Global Energy Services Alliance, GESA. GESA er service til kraftværker, sammensat af Baseload Power og Pro-Per Energy Services. Datoen ligger efter beholdningen pr. 1. juni 2026. Det er service, ikke et kraftværk i drift. Forsidens banner siger Omega og peger på samme meddelelse. Meddelelsen nævner ikke Omega, så teksten følger meddelelsen. Selskabet skriver, at det er stiftet i 2014, og at kunderne er datacentre, energi, erhverv og industri. Ordene leading og unmatched er ikke taget med. Ingen `reviewedAt`. Blurben under elproduktion og elnet og arkivet siger grænsen. Overskriften på selskabssiden er beholdningens afkortede navn. Profilnavnet er det fulde. AI-compute-listen er ikke ændret.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. GESA, Baseload og Pro-Per står. Omega står ikke. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `afc0b25` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:30 CEST. Ero skriver, at Xavantina er en guldmine, og at Vale ejer Furnas. Ikke færdig.**

Caraíba i Bahia er et kobberkompleks. Tucumã i Pará er en kobbermine, og kommerciel produktion blev nået 1. juli 2025, før beholdningen. Xavantina i Mato Grosso er en underjordisk guldmine med eget anlæg. Furnas er et kobber- og guldprojekt. Siden skriver, at Vale Base Metals ejer det, og at Ero har en ret til at optjene en andel på 60 % efter en aftale fra juli 2024. Det er ikke en mine i drift. Et forstudie fra februar 2026 ligger før beholdningen og er foreløbigt. Siden kalder det ikke en reserve. High-grade, ounces og dollar pr. ounce er ikke taget med. Ingen `reviewedAt`. Blurben under råstoffer og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Guldminen, 60 % og forstudiet står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `962c850` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:33 CEST. BWX Technologies skriver, at Lynchburg fremstiller flådereaktorer, og at salget af medicinforretningen ikke er gennemført. Ikke færdig.**

Fabrikken i Lynchburg fremstiller reaktorer til ubåde og hangarskibe. Siden nævner Ohio, Virginia, Seawolf, Los Angeles, Nimitz og Ford. Columbia-klassen er under bygning. Teksten siger komponenter, ikke at båden er i tjeneste. TRISO er brændsel, ikke et kraftværk. Project Pele er et design, ikke et værk i drift. Selskabet skrev 3. august 2026, at det har aftalt at sælge medicinforretningen til Nordic Capital. Aftalen afventer myndighedsgodkendelse og ventes afsluttet inden udgangen af 2026. Datoen ligger efter beholdningen. Salget er ikke gennemført. Beløbet i overskriften og ordet leading er ikke taget med. Ingen `reviewedAt`. Blurben under atomkraft og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Lynchburg, Pele og 3. august 2026 står. Beløbet står ikke. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `772de94` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:34 CEST. Talen skriver, at flåden også har kul, naturgas og olie, og at Brandon Shores kører videre. Ikke færdig.**

Susquehanna er atomkraftværket. Siden nævner også kul, naturgas og olie. Selskabet skriver, at det leverer strøm til Amazon ved Susquehanna. Brandon Shores var planlagt lukket 1. juni 2025 og kører videre til 31. maj 2031 efter en pålidelighedsaftale. Brunner Island kan bruge både kul og naturgas. Kul skal stoppe inden udgangen af 2028, og det er ikke sket i teksten. Det er ikke en udvikler af små reaktorer. Leading, sixth largest og megawatt er ikke taget med. Ingen `reviewedAt`. Blurben under elproduktion og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Brandon Shores og Amazon står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `ea2595e` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:37 CEST. Nano Nuclear skriver, at KRONOS-ansøgningen er til behandling og ikke givet. Ikke færdig.**

University of Illinois indsendte ansøgningen 31. marts 2026. Tilsynet tog den til behandling 18. maj 2026. Formel behandling begyndte 23. juni 2026, efter beholdningen. De to første datoer ligger før. Ansøgningen er ikke en byggetilladelse, og byggeriet er ikke gået i gang. En offentlig tidsplan peger på september 2027. Selskabet ser en mulighed for byggeri i andet halvår 2027. Det er en forventning. Forsiden siger stadig forberedende dialog. Meddelelsen af 13. oktober 2026 er mere præcis, og teksten følger meddelelsen. ZEUS og LOKI er design. Ingen `reviewedAt`. Blurben under atomkraft og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. 23. juni 2026 og "ikke givet" står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `bc2e228` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:39 CEST. Howmet skriver, at det også laver smedede hjul til lastbiler og busser. Ikke færdig.**

Selskabet skriver, at det laver dele til flyskrog og flymotorer og også smedede hjul og chassis til lastbiler og busser. Det sender ikke raketter op. Formuleringerne om de mest avancerede fly og om Model T er ikke taget med. Udbytte og kvartalsregnskab er ikke taget med. Ingen `reviewedAt`. Blurben under opsendelse og arkivet siger grænsen. Overskriften på selskabssiden er beholdningens afkortede navn. Profilnavnet er det fulde.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Smedede hjul står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `8366cb6` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:40 CEST. Cummins skriver, at forretningen har fem dele, og at det ikke er et elselskab. Ikke færdig.**

De fem dele er komponenter, motorer, distribution, kraftsystemer og Accelera. Distribution er selskabets egen del, ikke et elnet. Hovedsædet ligger i Columbus i Indiana. Selskabet er stiftet i 1919. Generatorerne kan lave strøm. Det er ikke et elselskab. Ordet leader og et 52-ugers-felt på investorskabelonen er ikke taget med. Ingen `reviewedAt`. Blurben under elproduktion og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Accelera står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `4359117` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:42 CEST. ProPetro skriver, at arbejdet er trykpumpning i Permian-bassinet. Ikke færdig.**

Det er service til selskaber, der leder efter og udvinder olie og gas. Det er ikke et kraftværk og ikke en mine. Selskabet står ikke på elproduktion. Leading, premier og largest er ikke taget med. Ingen `reviewedAt`. NDI-blikket under elproduktion og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Permian står. Selskabet står ikke i selskabslisten. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `02c86a0` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:43 CEST. Terra Innovatum skriver, at konceptet SOLO er fra 2018. Ikke færdig.**

Det er en mikroreaktor under udvikling. Teksten beskriver ikke et værk i drift. Forsiden viser to forskellige tal for effekt. Ingen af dem er taget med. Leader og capital-efficient er ikke taget med. Ingen `reviewedAt`. Blurben under atomkraft og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. 2018 står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `6a491f2` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:46 CEST. Airo nævner RQ-35 Heidrun, RQ-70, JC250 og JX250. Ikke færdig.**

Selskabet skriver, at kunderne er militære, offentlige og kommercielle. Platformene står på siden. Teksten kalder dem ikke en flåde i drift og ikke satellitter. Selskabet står ikke som eksempel på opsendelse. Ingen `reviewedAt`. NDI-blikket under opsendelse og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. RQ-35 står. Selskabet står ikke i selskabslisten. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `27dccea` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:55 CEST. United States Antimony skriver, at zeolit kommer fra Preston. Ikke færdig.**

Smelteværket for antimonoxid ligger i Thompson Falls i Montana. Siden skriver, at en ny tilladelse til minen dér var usikker, og at udvindingen blev lagt tilbage til Mexico. Det første gravearbejde i Alaska er ikke skrevet som en mine i drift. Areal-tal på siden er ikke ens og er ikke taget med. Ingen `reviewedAt`. Blurben under råstoffer og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Preston står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `d602d78` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:55 CEST. Merlin skriver, at Merlin Pilot er software til eksisterende fly. Ikke færdig.**

Samarbejdet om C-130J har længere rækkevidde som mål. Det er ikke en flåde, der allerede flyver med softwaren. Navnet er ikke Satellogics satellit. Beløb og timetal på forsiden er ikke taget med. Ingen `reviewedAt`. NDI-blikket under opsendelse og arkivet siger grænsen. Selskabet står ikke i selskabslisten.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Merlin Pilot står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `114d9a6` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.

## Fra Grok lane-E

**2026-10-16 01:57 CEST. Lithium Americas skriver, at centret i Reno er et laboratorium. Ikke færdig.**

Byggeriet på Thacker Pass begyndte i begyndelsen af 2023, før beholdningen. Målet sent i 2027 er ikke en mine i fuld drift. Centret afprøver processen og er ikke minen. World's largest er ikke taget med. Ingen `reviewedAt`. NDI-blikket under råstoffer og arkivet siger grænsen.

Tjekket i Chromium ved 375 px. Kæden er også tjekket ved 1280 px. AI-udkast er med. "tjekket mod kilden" er ikke med. Reno står. Ingen konsolfejl. Ingen vandret scroll.

**Push:** `lane-E` @ `af67076` er pushet efter precheck. Dette commit kan merges bagefter. Ikke main. Ikke færdig.
