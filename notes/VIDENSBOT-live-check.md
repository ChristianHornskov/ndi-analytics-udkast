# Live check af NDI Analytics udkast

Fil til løbende live checks. Nye checks tilføjes nederst under eget tidsstempel.

## Live check 15. oktober 2026 kl. 21.55 (CEST)

Gennemgået: https://christianhornskov.github.io/ndi-analytics-udkast/ (live app.js er identisk med lokal docs/js/app.js, seneste commit c3b8507), alle sider i docs/ og alle datafiler. Der er ikke skrevet noget under docs/. [V] = verificeret. [A] = min vurdering.

### Samlet vurdering
Leos fem beslutninger er i det væsentlige gennemført på Pages siden, og siden er markant bedre end v1. Der er dog stadig én alvorlig blokering: GitHub repoet er offentligt, så de interne noter (herunder fortrolige tal) kan læses direkte på GitHub, både i den nuværende /notes mappe og i historikken. Derudover følger beholdningsdata ikke helt beslutningen om kvartalssnapshots. [A]

### Blokerende
1. **Repoet er offentligt, og interne noter kan læses.** api.github.com/repos/christianhornskov/ndi-analytics-udkast svarer 200 uden login. raw.githubusercontent.com/christianhornskov/ndi-analytics-udkast/main/notes/VIDENSBOT-review.md svarer 200, og den gamle fil docs/notes/STATUS.md i commit f752f0e svarer også 200 [V]. Det betyder, at /notes/VIDENSBOT-krav.md med tal fra en fortrolig investeringsanalyse (28,07 % halvledere, 79,54 % USD), interne reviews, STATUS og mødenavne er offentlige, selv om Pages ikke viser dem. **Løsning:** gør repoet privat (GitHub Pages fra et privat repo kræver et betalt abonnement, ellers skal Pages flyttes til et separat offentligt repo, der kun indeholder docs/). Når repoet er privat, er historikken ikke længere offentlig. Hvis repoet skal forblive offentligt, skal historikken omskrives, og det er et destruktivt skridt, som kræver Christians godkendelse.
2. **Beholdning er månedlig, ikke kvartalsvis.** portfolio.json har positionsAsOf 1. juni 2026 ("første tilgængelige Fundmarket rapport i kalendermåneden"). Det er ældre end 30. juni, men ikke et kvartalsskæringstidspunkt. Desuden ligger data/company-months.json offentligt med månedlige vægte for alle selskaber fra november 2023 til juni 2026 (2. januar, 2. februar, 2. marts, 1. april, 1. maj og 1. juni 2026) [V]. Det giver mere detaljeret handelshistorik, end beslutningen tillader. **Løsning:** brug én kvartalsrapport (31. marts eller 30. juni 2026), og reducer company-months.json til kvartalsskæringer eller fjern den.

### Kontrol af Leos beslutninger
| Beslutning | Status | Dokumentation |
|---|---|---|
| notes/ ude af docs/ og footerlink fjernet | Delvist OK. Pages svarer 404 på notes/VIDENSBOT-krav.md, notes/STATUS.md, notes/SPEC.md, notes/UX-krav.md, notes/IDEAS.md, notes/VIDENSBOT-review.md og b/README-ARCHIVE.md. docs/notes/ indeholder kun en advarselsfil og en stub index.html "Interne noter er ikke en del af det offentlige udkast" (svarer 200, harmløs). Footerlinket til STATUS er væk. **Men** se blokering 1 om GitHub | [V] |
| Kun dateret kvartalssnapshot (30/6 eller ældre) | Delvist. Dateret og forsinket (1. juni 2026, "Forsinket offentlig beholdning"). Daglige kursbevægelser og "movers" er fjernet. Ikke kvartal, og månedshistorik er offentlig (blokering 2) | [V] |
| PMINDIAKK ingen afkast før 12 måneder | OK på siden. Fonden, periode, drawdown, sammenlign, embed og lær siderne viser "Vises efter 12 måneder". Kun seneste NAV vises (ikke et afkast). Den rå afkastserie for Akk (210 punkter) ligger dog stadig i portfolio.json og kan hentes direkte | [V] |
| PMINDI ingen 1 eller 3 måneder | OK. Periodeknapper er "Siden start", "ÅTD" og afsluttede kalenderår (2023 mærket delår). URL med ?periode=1m falder tilbage til "Siden start". Funktionerne for 1m og 3m findes stadig i data.js, men bruges ikke | [V] |
| Forkerte aktietal rettet eller mærket | OK. ÅTD, 1 år, daglige tal og "fald fra top" er fjernet for alle selskaber (null i data). Modenhed er sat til "ikke-klassificeret" for alle i stedet for gæt. NDI linsen er kvalitativ og mærket "AI-udkast" | [V] |

### Bør rettes
3. **Nasdaq tekst er stadig upræcis.** embed/chart.html viser stadig en deaktiveret "Nasdaq-100" knap og teksten "Nasdaq-sammenligning kræver Fundmarkets godkendelse". om-data.html: "Nasdaq-sammenligning: deaktiveret indtil Fundmarkets godkendelse". Forretningsgangen forbyder Nasdaq QQQ som sammenligning (viden/00_overblik.md). **Ændring:** fjern knappen og skriv kun "Fonden har intet benchmark." Fonden siden gør det allerede rigtigt.
4. **ÅTD er en periode under 12 måneder.** Leo har kun fravalgt 1 og 3 måneder, men ÅTD for PMINDI (ca. 4 % pr. 14. oktober) er også en kort periode, som forretningsgangen ikke har godkendt. Leo bør tage stilling.
5. **100.000 kr. eksemplet** ("Hvis du havde investeret 100.000 kr. ved første NAV ...") er markedsføring af historisk afkast. Teksten er fair (start ved første NAV, med advarsel), men den skal godkendes i markedsføringsprocessen.
6. **Tema "Andet" er stadig stort:** 111 af 345 (32 %) i PMINDI og 103 af 320 i Akk. Multi tags findes kun for udvalgte selskaber (data/multi-tags.json).
7. **Modenhed er tom.** Alle selskaber står som "ikke-klassificeret". Det er ærligt, men livscyklusvisningen giver derfor ingen værdi endnu. Mads ønskede modenhed som en kernefunktion (vision 28:38).
8. **Rå data ligger offentligt** i portfolio.json (Akk afkastserie) og fund-meta.json (henvisning til notes/DATA-DEFINITIONS.md). Ikke kritisk, men Akk serien bør fjernes fra den offentlige fil, indtil december 2026.
9. **Sitemap.xml lister sider, mens robots.txt blokerer alt.** Det er modstridende, men harmløst. Fjern sitemap, mens siden er et udkast.
10. **Stil:** sidens tekster bruger fortsat tankestreger og semikolon (f.eks. på siden "Sådan tænker vi" efter "Retningen kan skimtes") og engelske ord.

### OK [V]
* Kontekstprikker er nu kun dokumenterede udbyttehændelser. De illustrative dyk og toppe er fjernet.
* Risikoindikator 5 af 7, anbefalet ejertid 5 år og direkte KID links vises (risici.html og Fonden).
* "Sådan investerer du" (invester.html) er neutral og nævner ikke længere pension eller VSO som anbefaling. "NewDeal Invest yder ikke individuel investeringsrådgivning på denne side."
* Ingen superlativer, ingen navne på personer, ingen investoroplysninger på siden.
* Fakta som i review: ISIN, klassenavne, NAV og årsafkast stemmer. Startdato er nu defineret som første NAV med forklaring.
* robots.txt Disallow og noindex på alle sider.

### Sammenhæng med Mads' tankegang [A]
* Godt: nye lærsider "Hvorfor så mange aktier?" (selskabsspecifik varians, temaer er "ikke bevidste temaovervægte"), "Hvad P/E fortæller" og "Sådan tænker vi" rammer bogens førsteprincipper og "vi kan ikke finde den ene vinder". "Spredning mindsker selskabsspecifik risiko, men fjerner ikke markedsrisikoen" er både Mads tro og compliant.
* Godt: daglige movers er væk, hvilket passer med hans lange horisont.
* Mangler stadig: variance drag (hvorfor CAGR er lavere end gennemsnitsafkast), en kort forklaring af at fonden er tæt på ligevægt (ca. 0,05 til 1 % pr. position), og modenhed som funktion.
* Sammenlign siden siger "Forskellen er udbyttepolitik, ikke investeringsuniverset". Det er rigtigt, men overlap i top 20 bør ikke præsenteres som forskel i strategi.

### Nye fund
* Repoet er offentligt (blokering 1). Det var ikke synligt i første review.
* Månedlig beholdningshistorik i company-months.json (blokering 2).
* Nasdaq knappen i embed er ikke fjernet trods review.
* Nye sider siden v1: temaer, tema, kort, periode, drawdown, sammenlign, selskaber, invester, risici, nyhedsarkiv (placeholder), ndi-perspektiv og lærsektionen med ni sider. Ingen af dem viser Akk afkast eller korte perioder for PMINDI.

### Leo skal beslutte
1. Privat repo (og evt. separat offentligt Pages repo) eller omskrivning af git historikken.
2. Kvartalssnapshot: 31. marts eller 30. juni 2026, og om månedshistorikken skal fjernes.
3. Om ÅTD og 100.000 kr. eksemplet skal blive, før Fundmarket har set dem.


## 2026-10-15 ~23:10 — værdikæder (Grok)
Indhold fra `VIDENSBOT-vaerdikaeder.md` landet i `vaerdikaeder.html` + `value-chains.json`.
- Compliance-band på siden.
- Ingen "øger eksponering" / "overvægt i" / "sikkert køb".
- Musk/SpaceX kun som citat med kilde (BLOG 12. okt 2026).
- Holdings-eksempler bundet til asOf 2026-06-01 (recheck ved snapshot-skift).
- Fintech = tema-note, ikke kæde.


## 2026-10-15 ~23:45 — lane-C indholdssider (Claude)
Sider: ideer, kort, om-data, invester, risici, ndi-perspektiv, laer/*.
- Ordscan (`øge eksponering|overvægt|sikkert køb|vinder|bedste|købsmulighed|kursmål|vil stige|anbefal`): alle træf er negationer eller lovpligtig tekst («vinderne kan ikke udpeges», «ikke bevidste temaovervægte», «anbefalet investeringsperiode ifølge KID»). Ingen handelsprog.
- `ideer.html` nye citater er ordrette fra Vidensbot-filen med ugebrevsdato (13. jul, 4. maj, 27. jul, 30. mar 2026). «Modsatte af en boble» står med «NDI's vurdering, ikke en prognose».
- Flodsystem-SVG nummererer kun de tre flaskehalse, NDI selv nummererer (energi, datacentre, halvledere); cloud/apps vist neutralt.
- Tesla-eksempel: GICS forbrugsgoder vs. tags fysisk tech + energi (multi-tags.json, 1. jun 2026). Teksten siger «tags beskriver eksponering — ikke et syn på aktien».


## 2026-10-15 ~23:55 — risici / invester / ndi-perspektiv (Claude lane-C)
- Ny copy bruger flodsystem/dæmninger som **risikoforklaring** («når en flaskehals løsner sig, kan selskaberne i det led falde samtidig»), ikke som købsargument.
- «Værdikæder, temaer og vægte viser eksponering … ikke bevidste overvægte og ikke anbefalinger» står nu også på risici (VIDENSBOT-krav §3 spænding).
- Stokastisk proces / odds mod pris i ordlisten (TM afsnit 10), formuleret som NDI's beskrivelse, ikke som garanti.
- Ordscan på de 4 sider: alle træf er negationer, KID-ordlyd («anbefaler mindst 5 års») eller falske positiver («kommunikation»). Ingen tal fra interne IA/PA-rapporter er sat på siden.


## 2026-10-16 ~00:20 — lær: saadan-taenker-vi / livscyklus / pe-forklaring (Claude lane-C)
- Kilder: BOG (s. 22–27, 64, 70–71, 139–152) og offentlige ugebreve (BLOG 27. okt 2025, 16. feb 2026, 30. mar 2026, 1. jun 2026, 13. jul 2026). **Ingen** citater fra visionsmødet, Slack, UDKAST, IA/PA eller ordrearknotater på siderne.
- TM §0 respekteret: ny boks «Bogen og fonden er to forskellige ting» — bogens privatråd (køb og hold, ≤1 %, største selskaber, ikke time) adskilt fra fonden (løbende rebalancering, mange små positioner, modne + unge). Ingen tal for handelsomfang.
- TM §1.8 «markedet har som udgangspunkt ret» → nyt afsnit; høj/lav P/E = forventning/bekymring (vision #22).
- P/E-eksempel er opdigtet (A/B, samme markedsværdi) og markeret. Formuleret «målt på P/E ser A dyrere ud … selv om A bygger næste produkt» — ikke «A er bedst».
- Amazon (bog s. 24) bruges kun som begrebseksempel med «ikke et syn på aktien».
- Ordscan: træf er negationer («vinderne kan ikke forudsiges», «ikke automatisk billig») og KID-ordlyd. Ingen handelsprog.

## lane-C · 00:10 16/10 · variance-drag + mangler aktie X
- Variance drag: bruger bogens eget møntspil (s. 133–136) i stedet for opdigtet ±50. σ²/2 ved 60 % ≈ 18 pp matcher udkast pkt. 4.4.
- Mangler aktie: ingen tærskel for markedsværdi nævnt, fordi tese 2023 og udkast 2.0 er uenige. Ingen købs-/sælg-holdning; «fravær er ikke en vurdering» + «med betyder ikke godt/billigt».
- Ordscan: ingen «køb nu», «billig», «undervurderet», «anbefaler» på de to sider.

## lane-C · ~00:40 16/10 · ordliste 74 + ideer «fald fra top»
- Nye ordlistebegreber bygger på «Til siden»- og [B]-linjerne i VIDENSBOT-vaerdikaeder (1.2, 1.3, 1.6, elnet, råstoffer). Flaskehalsnumre (energi 1, datacentre 2, halvledere 3) fra BLOG 30. mar 2026.
- Bevidst udeladt: HBM-«købsmulighed» (BLOG 16. dec 2024) og «overvægt i datacenterinfrastruktur» ([A], må ikke på siden).
- Koncentrationsrisiko uden IA/PA-tal (28,07 % / 79,54 % er interne rapporter) — kun «næsten alle i tech og mange noteret i USD».
- Ordscan (køb/sælg/anbefal/kursmål/undervurder/gevinst) på ideer, om-data, risici, invester: træf er negationer, KID-ordlyd og «køb- og salgskurs» i kurtage-forklaringen. Ingen handelssprog.

## lane-C · ~00:25 16/10 · lær/valuta
- Alle tal på siden er enten opdigtede (mærket «tænkt eksempel») eller talt fra `portfolio.json` (PMINDI 1. jun 2026: 345 positioner, 253 med US-ISIN = 67,57 % af fonden, sum af viste vægte 91,94 %).
- Bevidst forsigtigt: ISIN-landekode ≠ handelsvaluta. Siden siger «mindst to tredjedele i dollar», ikke et præcist dollartal.
- Afdækning: ingen kilde i notes/data om valutaafdækning → siden nævner det ikke. Kun KID-flaget `valutarisiko: true`.
- Intet om hvor dollaren går hen. «Det viser vi ikke: gæt på, hvor dollaren går hen.» Ingen handelssprog.
- FAQ-kortsvar «Hvorfor så mange aktier?» havde jargon («idiosynkratisk varians») → omskrevet til almindeligt dansk.

## ~00:40 CEST lane-C (Claude) — FAQ + risici
- Flodsystem-svaret i FAQ bruger [M]-formuleringen fra VIDENSBOT-vaerdikaeder (vand = efterspørgsel, dæmninger = flaskehalse, presset flytter; BLOG 30. marts 2026). Ingen «øge eksponeringen»/købsmulighed.
- **Bevidst udeladt:** et FAQ-svar «Er AI en boble?» med Mads' «vi står i det modsatte af en boble» (BLOG 4. maj 2026). Det er en markedsvurdering, ikke en forklaring — kræver Mads/compliance-ja før det kommer på siden. Lagt i IDEAS.
- Omkostningssvaret nævner ingen satser; peger på KID (gældende dokument).

## ~00:35 CEST lane-C (Claude)
- Ordliste «Cloud og AI-modeller» bruger value-chains.json-formuleringen «sværere at investere i lige nu» som NDI-vurdering — ingen anbefaling. «Robotik» = Vidensbot fase 3 (automatisering og robotisering), robotter forstået bredt.
- Sprogscan af lane-C-sider (købsmulighed, kursmål, timing, billig/dyr, undervurderet, trading): ingen træffere ud over negationer («ikke automatisk billig», «ikke en anbefaling»).

## ~00:55 CEST lane-C (Claude) — ordliste 87 + sprogscan
- Sprogscan (købsmulighed, kursmål, timing, billig/dyr, undervurderet, vinder, boble, trading, anbefal*) på alle lane-C-sider: 60 træffere, alle negationer eller ansvarsfraskrivelser («ikke en opfordring til at købe eller sælge», «ikke automatisk billig», «ikke at finde den ene vinder»). Intet at rette.
- Nye begreber er beskrivende: «Hold øje med» = «hvad man kan følge, ikke en prognose». «Eksportregler»: «ikke en vurdering af, hvordan reglerne ændrer sig». «Indre værdi»: forskel til børsværdi «kan være stor i begge retninger» — ingen rabat/præmie-påstand om SoftBank.
- «Neocloud» nævner CoreWeave som eksempel (findes i snapshot 1. jun 2026, og NDI-blogindlæg «The economy of a neocloud» er kilde i company-profiles). Ingen vurdering af selskabet.
