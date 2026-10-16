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

## Lane-C opfølgning 00:41 CEST 16/10 (Claude)
- Punkt 10 (stil): tankestreger/semikolon i synlig tekst fjernet på lane-C-sider (ideer, om-data, kort, invester, risici, ndi-perspektiv, lær). Engelske ord reduceret (snapshot, feature, treemap/sunburst, pipeline, v1).
- Blokering 2: om-data omtalte ikke længere 1. juni 2026 som «kvartalsslut». Selve datavalget (kvartal 31/3 eller 30/6) er stadig Leos beslutning og data-lanes opgave.

## lane-C · ~01:10 16/10 · lær/rebalancering
- Kilder: BOG s. 124, 139, 140, 149, 150 (gevinst ved høj optimisme, hellere lægge til i pessimisme, højst ca. 1 %), TM linje 78 (Mads foretrækker «rebalancering» frem for «trading»). Forskellen bog/fond som Christian beskrev 15. okt 2026 (privat: kurtage, ingen systemer, panik).
- **Bevidst udeladt:** strategiudkastets tærskler (udsving ≥5 %, 5–15 % af positionen, daglig frekvens, reankring) og handelsomfang (17.990 handler). Interne dokumenter, ikke offentlige. Siden siger kun «løbende».
- **Bevidst ikke citeret:** Mads' formulering fra visionsmødet (15:44) om at «gevinsten tages og flyttes» er gengivet uden navn, fordi mødet er internt.
- Ingen påstand om at rebalancering giver merafkast (ingen «volatility harvesting»). Siden siger tværtimod, at den ikke fjerner risiko, ikke er en forudsigelse og ikke er gratis.
- Fondstal kun vægte fra portfolio.json pr. 1. jun 2026 (345, største 2,13 %, 5 over 1 %, ligevægt 91,94/345 ≈ 0,27 % som i ideer.html). Ingen navne.

## lane-C · ~01:30 16/10 · lær/risikoklasse
- Kilde for intervallerne: PRIIPs delegeret forordning (EU) 2017/653, bilag II (markedsrisiko-klasser efter VaR-ækvivalent volatilitet: <0,5 · 0,5–5 · 5–12 · 12–20 · 20–30 · 30–80 · >80 %). Siden siger «forenklet her» og «KID er det, der gælder». **Til review:** bekræft, at ordene i tredje kolonne (laveste … højeste) svarer til fondens danske KID-formuleringer. «middel-høj» er taget direkte fra fund-meta.json.
- Ingen påstand om fondens egen volatilitet eller beregning. Skyderen er tænkte tal («viser reglen, ikke fondens egen beregning»). Klasse 5 → «20–30 %» er en regelgengivelse, ikke en måling.
- «Hvad klassen ikke siger»: ikke garanti, siger ikke hvor dybt det kan gå (→ Fald fra top), fanger ikke koncentration/valuta (→ risici, ordliste), klasse 1 ≠ risikofri. Ingen egnethedsvurdering: «siger ikke noget om, hvorvidt fonden passer til dig. Læs KID».
- Rettelse før commit (~01:05 wall-clock): klasse 6 hedder nu «næsthøjeste» (PRIIPs-standardteksten: «the second-highest risk class»), ikke «høj». Kolonnen hedder «Beskrivelse i KID», og noten siger «følger standardteksten i KID, forenklet». Den uverificerede sætning «Fondens KID siger middel-høj» er fjernet. «Mindst 5 år» er nu bekræftet mod fund-meta.json (`recommended_holding_years: 5`).

## lane-C · ~01:25 16/10 · ordliste 91 + invester
- Nye poster er beskrivende (hvad temaet rummer, opgjort efter branche i portfolio.json PMINDI), ingen vurdering af temaernes udsigter. Platforme er «det største tema målt på vægt» pr. 1. jun 2026, regnet efter for begge klasser (16,0 % / 14,7 %).
- invester.html flodsystem-sætningen genbruger ordlyden fra saadan-taenker-vi.html («når én flaskehals letter, flytter presset videre … i stedet for at gætte»). Ingen forudsigelse.

## lane-C · ~01:15 16/10 · ordliste 95
- Markedsrisiko/selskabsspecifik risiko er formuleret som forklaring af spredning («forsvinder ikke» / «bliver mindre, jo flere selskaber»). Samme ordvalg som hvorfor-mange-aktier.html, ingen påstand om fondens egne tal.
- Median-posten nævner kun den typiske vægt ca. 0,2 % pr. 1. jun 2026 (samme tal som hvorfor-mange-aktier og ideer). Ingen kurser, ingen selskabsnavne.
- PRIIPs: «EU-reglerne bag KID», ingen gengivelse af fondens KID-tekst.

## 2026-10-16 ~01:10 — ideer «Tre ure» (Claude lane-C)
- Ny form forklarer datoerne: PMINDIAKK viser kun NAV indtil 12 måneders historik (ingen afkast, ingen dato lovet i teksten; grænsen er kun tegnet). Beholdning pr. 1. jun 2026 beskrevet som bevidst forsinket. Risikoklasse 5 af 7 henført til KID 14. aug 2026.
- Ingen afkasttal, ingen korte perioder, intet handelsprog. Ordliste: omsætning og indtjening er neutrale definitioner.

## lane-C ~01:40 — ordliste 101 (KID-risici)
- Fire nye poster: vækst- og sektorrisiko, ingen markedsbeskyttelse, boble, anbefalet investeringsperiode. Kilde for de fem nøglerisici og «5 år»: fund-meta.json (priip.key_risks, recommended_holding_years) for begge klasser. Ingen ordrette KID-citater.
- «Boble» er en neutral definition («lettere at udpege bagefter end undervejs, ét nøgletal kan ikke afgøre det»). Ingen NDI-vurdering af, om der er en boble nu. Ugebrevscitatet på ideer er uændret.
- Anbefalet investeringsperiode: «ikke en garanti for et positivt afkast efter 5 år». Ingen afkasttal, intet handelsprog.
- Bed Vidensbot bekræfte: er «ingen markedsbeskyttelse» det ord, KID'et bruger, eller «ingen kapitalbeskyttelse»? Posten har id g-kapitalbeskyttelse og nævner begge ord.

## lane-C · 01:20 16/10 (wall-clock) · ÅOP, før skat, ideer «Hvad står der i tallet?»
- Ordliste 103: «ÅOP» (NDI Analytics regner ikke ÅOP ud, officielle tal i KID) og «Før skat» (beskatning afhænger af din situation og konto, «Siden giver ikke skatterådgivning»). Ingen satser, ingen skatteregler nævnt.
- ideer.html ny form: lagene i et afkasttal (kurser ± valuta ± udbytte + omkostninger − = fondens afkast; derefter kurtage, skat, købstidspunkt = dit eget afkast). Ingen tal, «Skitse uden tal … Ikke rådgivning». Ingen handelsprog.
- Bed Vidensbot tjekke: må «Spørg din bank eller rådgiver» stå i ordlisten, eller skal det være mere neutralt («Se Skattestyrelsen eller din rådgiver»)?

## lane-C · 01:25 16/10 · ideer «To klasser, samme temaer» + Energi/High growth
- Temavægte er aggregater pr. tema (ingen enkeltaktier, ingen kurser, ingen afkast), fra den offentlige beholdning pr. 1. jun 2026. Vægt i % af fonden, som i rapporten (summer 91,9 % / 90,0 %). Teksten forklarer ikke, hvad resten er, fordi det ikke står i datafilen. **Til review:** skal resten (kontanter m.m.) nævnes?
- «Forskellen mellem klasserne ligger derfor især i udbyttet» er en beskrivelse af eksponering, ikke en anbefaling af en klasse. udbytte-vs-akk siger fortsat «afhænger af din situation».
- Energi (tema): NDI kalder energi den første dæmning (samme som elnet-posten og ugebrevets flodsystem). «Temaet viser eksponering, ikke en anbefaling.» Ingen udsigter.

## lane-C · 01:27 16/10 · «Lag på lag» + fire tema-poster
- Stakken er formuleret som «en skitse af en tankegang, ikke en officiel model», og knyttet til flodsystemet med ugebrevets egen pointe (datacenter ↔ strøm). Kun aggregater pr. tema (antal, vægt), ingen enkeltaktier, kurser eller afkast. «Viser eksponering, ikke en anbefaling eller dagens fordeling.»
- Chips-posten: «det tema med flest selskaber, når «Andet» ikke tælles med». Ingen vurdering af temaets udsigter.
- **Til review:** er rækkefølgen energiressourcer → energi → chips → compute → optik → software → platforme i tråd med NDI's eget billede, eller skal optik ligge under compute? Datacentre (NDI's 2. flaskehals) har intet eget tema, hvilket figurteksten siger.

## lane-C · 01:30 16/10 · ideer «Hvor mange selskaber er halvdelen?» + Fundmarket
- Kun aggregater af de offentlige vægte pr. 1. jun 2026 (ingen navne, kurser eller afkast). Tal regnet efter i portfolio.json: PMINDI 345 positioner, sum 91,94 %; kumuleret 26 → 25,3 %, 76 → 50,3 %, 160 → 75,2 % af aktievægten. 76 største = 46,3 % af fonden. PMINDIAKK: 88 af 320 til halvdelen.
- Formuleret som spredning/koncentration («bred, men ikke flad»), ingen vurdering af, om fordelingen er god eller dårlig. «Viser koncentration og spredning, ikke en anbefaling.»
- Fundmarket-posten beskriver kun, hvad der ligger der, og at de officielle dokumenter åbnes der. Ingen omtale af handel via Fundmarket. **Til review:** er «platform» det rigtige ord for Fundmarket i NDI's egen sprogbrug?

## lane-C note 01:32 CEST 16/10 (Claude)
- Ordliste 114: nye poster Delår, Serverinfrastruktur, Elproduktion, Simulering og software. Ingen afkast- eller handelssprog; «Leddet viser eksponering, ikke en anbefaling».
- Åbent (ikke lane-C-fil): tankestreger i value-chains.json «ndi»-felter. Sendt til ejer via IDEAS.

## lane-C · 01:36 16/10 · lær «Indre værdi: hvad en andel er værd»
- Kun tænkte tal (fond på 100 mio. kr., 1 mio. andele). Ingen af fondens NAV-niveauer, ingen afkast, intet handelsprog. Datoer (første NAV 22. sep 2023 / 5. dec 2025) som andre steder på siden.
- «Udstedelse og indløsning» beskrevet generelt: «sker til den indre værdi … Vilkårene står i prospektet». **Bed Vidensbot tjekke:** har fonden emissionstillæg/indløsningsfradrag, der bør nævnes som ord (ikke satser)? Siden nævner bevidst ikke tillæg, kun kurtage og spread.
- «Indre værdi» i ordlisten har nu to betydninger (fond / investeringskoncern). SoftBank-betydningen er uændret i ordlyd.

## 01:55 CEST 16/10 lane-C · laer/laes-grafen.html
- Afsnit 5 «Sådan læser du grafen» (andelsklasser, udbytte, CAGR, maksimalt fald, hvorfor korte perioder misleder): **dækket** af ny side.
- Compliancepunkt 1 (hele perioder, ingen gunstig startdag) og 7 (udbytte/andelskurs): forklaret med tænkt kurve, mærket «ikke fondens tal og ingen prognose». Advarsel + «Generel information» nederst.
- Ingen handelsord, ingen fondstal på siden (kun tænkte tal), ingen semikolon/tankestreg i synlig tekst.

## lane-C · 01:55 16/10 (wall-clock) · risici «Udsving og fald i tal» + Sharpe
- Volatilitet/Sharpe/største fald på risici.html (Leo MUST fra main) er nu mærket «regnet af NDI Analytics … ikke tal fra KID’et» og forklarer, at PRIIPs-klassen har egen metode. Ingen sammenligning med indeks. Historisk-advarslen står på siden.
- Ny ordlistepost Sharpe: «siger intet om fremtiden», ændrer sig med startdagen. **Bed Vidensbot tjekke:** er Sharpe på en fondsside markedsføring af afkast (compliancepunkt 1), og skal den så kun vises sammen med de officielle tal?
- Interne udtryk fjernet fra synlig tekst (udkast, udfyldes af NDI, feltnavne).

## lane-C · 02:35 16/10 · ordliste 124 (EUV, DRAM/NAND, Edge-AI, træning/brug, bitcoin-mining)
- Kun forklaringer af ord, ingen selskabsvurderinger eller udsigter. EUV: «kun én leverandør (ASML)» står allerede i value-chains.json (hint), og leddet kaldes «en mulig flaskehals», som på værdikæden.
- Bitcoin-mining: «Indtjeningen fra mining følger bitcoinprisen og er derfor en anden risiko end AI-hosting. Eksponering, ikke en anbefaling.» **Bed Vidensbot tjekke:** er det ok at nævne bitcoin i ordlisten på en UCITS-fondsside, når ordet kun forklarer, hvad nogle beholdninger laver (unique-metrics.json)?
- Træning/brug: «kan med tiden kræve mere regnekraft samlet end træningen» er en generel beskrivelse, ikke en prognose for selskaber. **Til review:** skal sætningen blødes op eller have kilde (NDI-ugebrev)?
