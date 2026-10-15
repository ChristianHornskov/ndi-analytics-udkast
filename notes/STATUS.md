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
