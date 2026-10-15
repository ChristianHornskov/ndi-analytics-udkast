# Teknologiske værdikæder i NDI's perspektiv

Indhold til NDI Analytics (værdikæde, temaer og lærsider). Skrevet 15. oktober 2026 til byggeholdet.

## Sådan bruges filen
* Teksten under "Til siden" er skrevet, så den kan bruges direkte. Resten er baggrund og kilder til holdet.
* **[M]** = Mads' eller bogens synspunkt med kilde. **[B]** = generel baggrundsviden, ikke Mads' synspunkt. **[A]** = min tolkning.
* Kilder: BLOG = ugebrev på newdealinvest.dk/blog med dato. BOG = "Den lille guide til investering i teknologiaktier" (2025) med side. UDKAST = strategiudkast 2.0. Alle henvisninger er fra /workspace/mads/blog og /workspace/viden/emner.
* Beholdningseksempler stammer kun fra den forsinkede offentlige beholdning pr. 1. juni 2026 i docs/data. Der er ingen tal fra fortrolige analyser.

## Compliancetekst (skal stå på alle værdikædesider)
> Generel information, ikke en anbefaling eller investeringsrådgivning. Værdikæder og temaer viser, hvad porteføljen er eksponeret mod. De er ikke bevidste overvægte. Fonden er bredt spredt på flere hundrede selskaber med små vægte, tæt på ligevægt. Beholdningen vises med forsinkelse. Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering.

Noter til holdet:
* Mads beskriver i ugebrevene, hvor han ser flaskehalse, og skriver nogle gange, at fonden vil "øge eksponeringen" (BLOG 30. marts 2026). Den slags fremadrettede handelsudsagn må ikke gengives på siden. Brug formuleringen "NDI ser dette led som en mulig flaskehals" i stedet. [A]
* Brug ikke ord som "vindere", "sikker" eller "bedste". Bogen og Mads siger selv, at vinderne ikke kan udpeges (BOG s. 28, BLOG 13. juli 2026). [M]
* Tidslinjer er Mads' forventninger, ikke prognoser fra fonden. Skriv "Mads forventer" eller "NDI's vurdering", aldrig "vil ske". [A]

## Den overordnede tankegang [M]
**Til siden:** NDI ser teknologi som værdikæder, ikke som de klassiske 11 sektorer. Et selskab kan høre til flere led. Vi kan ikke forudsige, hvilket selskab der vinder, men vi kan følge, hvor i kæden efterspørgslen presser på. Derfor ejer fonden mange selskaber på tværs af hele kæden.

* **Flodsystemet:** "Vi ser AI-værdikæden som et flodsystem med en række dæmninger. Vandet repræsenterer efterspørgslen, og dæmningerne repræsenterer flaskehalse." Når en flaskehals løses, flytter presset til næste led (BLOG 30. marts 2026). [M]
* **Knaphed:** "Compute-mangel: vi står i det modsatte af en boble" (BLOG 4. maj 2026). Fysisk mangel på halvledere, datacentre, transformere, køling, transmission "og frem for alt energi" (BLOG 10. august 2026). [M]
* **Retning, ikke vinder:** Retningen kan forudsiges, vinderne kan ikke (BOG s. 28, kap. 5, UDKAST pkt. 4.1 til 4.3). "Vores mål er ikke at finde den ene vinder" (BLOG 13. juli 2026). [M]
* **Teknologi er hele værdikæden:** strategiudkastet regner råstoffer, energi og infrastruktur med til tech (UDKAST pkt. 4.14 til 4.15). [M]
* **Faser:** Fase 1 (2000 til 2020) modning, fase 2 copilots, fase 3 automatisering og robotisering (BLOG 7. oktober 2024). Bogen beskriver EDB revolutionen som tæt på mætning og autonome maskiner som næste skridt (BOG s. 39 til 43). [M]
* **Intelligens bliver en råvare:** "Kunden køber løsningen på opgaven, ikke modellen bag. Men resten af værdikæden bliver det ikke. Chips, energi, datacentre og de mest effektive modeller kan fortsat være differentierede" (BLOG 27. juli 2026). [M]

Forsinket beholdning pr. 1. juni 2026 (data/themes.json, antal selskaber i PMINDI): platforme 40, chips 53, software 51, andet 68, optik og netværk 30, fysisk tech 23, compute 22, energi 15, energiressourcer 25, spacetech 18. Brug antal, ikke vægte, og skriv datoen. [V]

---

## Kæde 1. AI compute

Mads' egen inddeling (BLOG 30. marts 2026): energi og strømfordeling, datacentre, halvledere, cloud og AI modeller, data, software, forbrugerapplikationer, agentisk AI og fysisk AI. Efterspørgslen "kommer i stigende grad fra bunden af værdikæden. Først fra agentic AI og snart fra fysisk AI." [M]

### 1.1 Energi og strømfordeling
**Til siden:** Datacentre bruger enorme mængder strøm. Uden ny elproduktion og stærkere elnet kan der ikke bygges mere compute. Her hører gas, atomkraft, gasturbiner, sol, vind, batterier og modernisering af elnettet til.
* **NDI's syn [M]:** "Første flaskehals: Energi" (BLOG 30. marts 2026). Se kæde 3.
* **Skift og tid [M]:** I USA får datacentre i stigende grad lov til at bygge egen strøm (BLOG 30. marts 2026). Ét års chipproduktion kan potentielt kræve strøm svarende til omkring to tredjedele af USA's installerede kapacitet (BLOG 10. august 2026).

### 1.2 Datacentre og køling
**Til siden:** Datacentret er fabrikken, hvor strøm bliver til compute. Det kræver byggeri, strømfordeling, køling, jord og tilladelser.
* **NDI's syn [M]:** "Anden flaskehals: Datacentre". Mange faktorer kan skabe flaskehalse, "derfor ser vi mange interessante investeringsmuligheder i dette led" (BLOG 30. marts 2026). Holdet har undersøgt væskekøling i forsyningskæden (BLOG 8. juli 2024). "Er datacentret fremtidens fabrik, bliver det strategisk afgørende, om intelligensen produceres i Vesten eller i Kina" (BLOG 27. juli 2026). Overvægt i datacenterinfrastruktur blev omtalt i foråret 2025 (BLOG 9. februar 2026). Brug det ikke på siden. [A]
* **Baggrund [B]:** Moderne AI racks bruger så meget strøm, at luftkøling ikke slår til, og væskekøling bliver standard.

### 1.3 Chipdesign (GPU, XPU og CPU)
**Til siden:** Her designes de processorer, der regner AI modellerne. Mange designere ejer ingen fabrik (fabless) og får chips produceret hos andre.
* **NDI's syn [M]:** Halvledere er "tredje flaskehals". Fokus på AI XPU'er og CPU'er (BLOG 30. marts 2026). Bogen bruger NVIDIA som eksempel på, at selv de største tech aktier har haft fald på 50 til 90 % (BOG s. 75 til 76). Gorilla og "best of breed" logikken kommer herfra (BOG s. 110 til 113).
* **Baggrund [B]:** XPU er en samlebetegnelse for specialiserede AI chips, herunder GPU'er og egne chips fra de store cloudselskaber.

### 1.4 Udstyr og litografi
**Til siden:** Maskiner, der bruges til at fremstille chips. Det mest avancerede er litografi, hvor kredsløb "printes" på siliciumskiver med ekstremt ultraviolet lys.
* **NDI's syn [M]:** ASML har været et fast eksempel siden 2024 (BLOG 21. oktober 2024). Mads advarer mod medier, der kalder ASML et "sikkert køb" uden at forstå casen (BLOG 8. juni 2025). Det er hans pointe om mediehygiejne, ikke en anbefaling.
* **Eksempel i forsinket beholdning:** Tokyo Electron og KLA (1. juni 2026). [V]
* **Baggrund [B]:** Én leverandør dominerer EUV litografi. Udstyrsselskaber afhænger af chipproducenternes investeringsbudgetter og svinger derfor meget.

### 1.5 Foundry (chipfabrikker)
**Til siden:** Fabrikker, der producerer chips for andre. Det kræver meget store investeringer og år at bygge.
* **NDI's syn [M]:** TSMC's regnskaber bruges som indikator for styrken i den teknologiske udvikling (BLOG 19. maj 2024 og 20. januar 2025). Strategisk autonomi og chipfabrikker i Vesten er et tema: "Vi skal bygge kraftværker, elnet, datacentre, chipfabrikker, robotfabrikker, forsvarsindustri og rum-infrastruktur" (BLOG 24. august 2026). Kampen om chipdominans (BLOG 1. december 2025).
* **Baggrund [B]:** Den mest avancerede produktion er koncentreret i Taiwan, hvilket giver geopolitisk risiko.

### 1.6 Hukommelse
**Til siden:** AI modeller skal have data tæt på processoren. Højbåndbreddehukommelse (HBM) stables oven på hinanden og er blevet en af de mest efterspurgte komponenter.
* **NDI's syn [M]:** Mads så HBM som en langsigtet case allerede i 2024, hvor svage kvartaler blev set som købsmulighed (BLOG 16. december 2024). "Nye vækstlommer længere nede i værdikæden" i hukommelse (BLOG 6. oktober 2025). "Særligt hukommelse og optisk connectivity er områder, hvor vi allerede ser begyndende flaskehalse" (BLOG 30. marts 2026).
* **Baggrund [B]:** Hukommelse har historisk været en meget cyklisk branche med store prisudsving.

### 1.7 Optik og netværk
**Til siden:** Data skal flyttes hurtigt mellem tusindvis af chips. Det sker med switches, lasere og glasfiber, og i stigende grad med lys i stedet for kobber.
* **NDI's syn [M]:** Et af de vigtigste fokusområder i 2026 med begyndende flaskehalse (BLOG 30. marts 2026). Compute efterspørgslen understøtter "hele værdikæden omkring AI, fra chips og memory til optiske interconnects, datacentre og energi" (BLOG 29. juni 2026).
* **Baggrund [B]:** Co packaged optics, hvor optikken sidder direkte ved chippen, er en af de teknologier, der skal reducere strømforbruget.

### 1.8 Serverinfrastruktur
**Til siden:** Servere, racks og strømforsyninger, der samler chips, hukommelse og netværk til færdige AI systemer.
* **NDI's syn [M]:** Nævnt som del af halvlederflaskehalsen (BLOG 30. marts 2026). Ingen nærmere beskrivelse fundet.

### 1.9 Cloud, AI modeller og adgang
**Til siden:** Selskaber, der udlejer computerkraft og udvikler de store AI modeller.
* **NDI's syn [M]:** "Cloud-modeller og access er svære at investere i lige nu". Længere ude i kæden er det i højere grad et spørgsmål om, hvem der vinder, og der er endnu ikke tydelige flaskehalse (BLOG 30. marts 2026). Intelligens bliver en råvare, og open weights er "en accelerator for hele AI-økonomien" (BLOG 27. juli 2026). En opbremsning i frontier modeller kan på kort sigt gøre den langsigtede case stærkere (BLOG 21. september 2026). Private investorer bør ikke selv investere i MAG7 segmentet, fordi landskabet skifter hurtigt (BLOG 1. december 2025).
* **Skift [M]:** AI økonomien er begyndt at finansiere sig selv (BLOG 12. oktober 2026).

### 1.10 Data
**Til siden:** Selskaber, der samler, renser og sælger data til at træne og drive AI.
* **NDI's syn [M]:** "Data er interessant, men stadig en ret uafklaret forretningsmodel" (BLOG 30. marts 2026).

### 1.11 Software
**Til siden:** Programmer og abonnementstjenester, som virksomheder og forbrugere bruger. AI kan både styrke og true de eksisterende forretningsmodeller.
* **NDI's syn [M]:** Skeptisk og over tid mere skeptisk. Fonden holdt SaaS positioner små på grund af høje værdiansættelser (BLOG 2. juni 2024). "Jeg har advaret mod softwareaktier i det meste af et år" og frygten for at AI disrupter forretningsmodellerne (BLOG 13. april 2026). Svært at identificere de langsigtede vindere og "relativt højt prissat" (BLOG 30. marts 2026).
* **Ændring over tid [M]:** 2024: små positioner af værdiansættelsesgrunde. 2026: tvivl om selve forretningsmodellen.

### 1.12 Forbrugerapplikationer og agentisk AI
**Til siden:** AI assistenter og agenter, der selv udfører opgaver for mennesker og virksomheder.
* **NDI's syn [M]:** Områder, hvor NDI forventer gradvist at få mere eksponering over tid (BLOG 30. marts 2026). Agentisk AI er der, hvor efterspørgslen efter compute kommer fra nu. Fase 2 "copilots" (BLOG 7. oktober 2024).

### 1.13 Fysisk AI
Se kæde 2.

---

## Kæde 2. Robotik og fysisk AI

**Til siden:** Når AI får krop, bliver det til robotter, selvkørende biler, droner og automatiserede fabrikker. NDI ser det som næste store fase efter chatbots og copilots.

### 2.1 Komponenter (sensorer, motorer, effektelektronik, batterier)
* **NDI's syn [M]:** Bred eksponering i "microchips, software, simulering, automatisering og robotisering" (BLOG 10. juni 2024). Ingen detaljeret komponentanalyse fundet. [A]
### 2.2 Simulering og software til robotter
* **NDI's syn [M]:** Simulering nævnes som del af feltet (BLOG 10. juni 2024 og 23. juni 2025).
### 2.3 Robotter, autonome køretøjer og droner
* **NDI's syn [M]:** Accelerated computing gør computere til selvstændigt agerende maskiner og fører til et kapløb mellem Kina og Vesten om produktion (BOG s. 40 til 43). "Det, som vil ændre måden vi lever på, er den automatisering og robotisering, som vil skabe fase 3" (BLOG 7. oktober 2024). Vesten skal indhente Kinas forspring i robotproduktion, og robotter forstås bredt som "droner, fly, soldater, missiler og andre autonome systemer" (BLOG 17. marts 2025). Teslas robotter er bogens eksempel på, at kvantitative modeller overser langsigtede effekter (BOG s. 118 til 119).
* **Eksempel i forsinket beholdning:** Tesla, tagget både fysisk tech og energi (data/multi-tags.json, 1. juni 2026). [V]
* **Tidslinje [M]:** Fysisk AI forventes at drive compute efterspørgslen "snart" efter agentisk AI (BLOG 30. marts 2026). Ingen præcise årstal fundet.

---

## Kæde 3. Energi og elektrificering

**Til siden:** AI, robotter og elbiler kræver meget mere strøm. NDI ser energi som den første flaskehals i AI udbygningen og som en strategisk kamp mellem Vesten og Kina.

* "På langt sigt skal teknologi og energiinfrastruktur efter vores opfattelse meget op, fordi Vesten er i et kapløb med Kina om teknologisk dominans, en kamp, der udover teknologi også kræver masser af elektroner (strøm)" (BLOG 7. juli 2025). [M]
* Overvægt i "powerland" blev omtalt i september 2025 (BLOG 8. september 2025). Må ikke bruges på siden. [A]

### 3.1 Elproduktion (gas, sol, vind, gasturbiner)
* **NDI's syn [M]:** Gasproducenter, gasleverandører, gasturbiner, energiproducenter tæt på datacentre samt sol og vind (BLOG 30. marts 2026). Energiudbygning via LNG, olie, atomkraft og fission (BLOG 1. september 2025). Mads kritiserer, at Tyskland omlagde til sol og vind og samtidig lukkede kul og atomkraft (BLOG 12. maj 2025).
### 3.2 Atomkraft og SMR
**Til siden:** Små modulære reaktorer (SMR) er mindre atomkraftværker, der kan bygges i serie og placeres tæt på forbrug som datacentre.
* **NDI's syn [M]:** USA forventes at rykke hurtigt på SMR (BLOG 27. januar 2025). "Vi har løbende skrevet om behovet for massiv energiudbygning i Vesten via atomkraft" og atomkraftaktier har høj volatilitet (BLOG 23. juni 2025). Atomenergi har politisk medvind (BLOG 7. juli 2025) og får ikke den værdiansættelse, den måske burde, fordi indtægterne er usikre (BLOG 21. juli 2025).
* **Baggrund [B]:** De fleste SMR projekter har endnu ikke kommercielle anlæg i drift i Vesten. Tidslinjer er usikre og afhænger af godkendelser.
### 3.3 Elnet, transformere og transmission
**Til siden:** Strømmen skal fra kraftværk til datacenter. Det kræver nye ledninger, transformerstationer og styring.
* **NDI's syn [M]:** Virksomheder, der moderniserer elnet (BLOG 30. marts 2026). Mangel på "transformere, køling, transmissionskapacitet og frem for alt energi" (BLOG 10. august 2026). Prispres i el infrastruktur (BLOG 16. februar 2026).
* **Baggrund [B]:** Leveringstiden på store transformere er flere år.
### 3.4 Energilagring og batterier
* **NDI's syn [M]:** "I denne uge er vi begyndt at opbygge vores første positioner i batteriværdikæden" i forbindelse med ny amerikansk told på kinesiske batterikomponenter (BLOG 21. juli 2025). Batterier nævnt under energiflaskehalsen (BLOG 30. marts 2026).
### 3.5 Kritiske råstoffer
**Til siden:** Kobber, sølv, sjældne jordarter og uran er nødvendige for chips, elnet, batterier og robotter.
* **NDI's syn [M]:** Prispres i metaller som kobber og sølv (BLOG 16. februar 2026). Fokus på værdikæder omkring sjældne jordarter (BLOG 1. september 2025). Råstoffer kommer "i første række" i amerikansk udenrigspolitik (BLOG 5. januar 2026). Fonden investerer i "de råvarer, der er nødvendige for at udbygge AI-økonomien" (BLOG 13. juli 2026). En råstofanalyse skal i dag også tage højde for geopolitik, ikke kun udbud og efterspørgsel (BLOG 21. september 2026).
* **Eksempel i forsinket beholdning:** temaet "energiressourcer" med 25 selskaber i PMINDI (1. juni 2026). [V]

---

## Kæde 4. Rumfart og satellitter

**Til siden:** Opsendelser, satellitter og kommunikation fra rummet. Prisen på at komme i kredsløb er faldet kraftigt, og det åbner nye markeder som satellitinternet og på sigt compute i rummet.

### 4.1 Opsendelse
* **NDI's syn [M]:** SpaceX stod for 90 % af årets satellitopsendelser (BLOG 23. juni 2024). SpaceX er børsnoteret (BLOG 22. juni 2026).
### 4.2 Satellitkommunikation
* **NDI's syn [M]:** Starlink beskrives i NDI's selskabsprofil som en løbende tjeneste, ikke blot en opsendelse (data/company-profiles.json, AI udkast). [V]
### 4.3 Rum og compute
* **NDI's syn [M]:** "SpaceX: større end hele jordens økonomi" med henvisning til selskabets fremtidige compute (BLOG 12. oktober 2026). Value metoder giver et "korrekt nej" til SpaceX, men metoden bliver til dogme (BLOG 1. juni 2026). SpaceTech får ikke den værdiansættelse, det måske burde (BLOG 21. juli 2025).
* **Eksempel i forsinket beholdning:** temaet SpaceTech med 18 selskaber (1. juni 2026). [V]
* **Compliance [A]:** Udsagnet om "større end hele jordens økonomi" er Elon Musks påstand gengivet af Mads. Det må kun stå som citat med kilde og aldrig som NDI's forventning.

---

## Kæde 5. Kvantecomputere (kort)

**Til siden:** Computere, der bruger kvantefysik til at løse bestemte typer problemer langt hurtigere. Teknologien er stadig tidlig.
* **NDI's syn [M]:** Kvantecomputere nævnes som et accelererende segment med politisk medvind og høj volatilitet (BLOG 2. juni og 7. juli 2025) og som eksempel på teknologier med usikre indtægter, der ikke passer i et regneark (BLOG 21. juli 2025).
* **Tidslinje:** NVIDIAs direktør sagde i januar 2025, at nyttige kvantecomputere sandsynligvis ligger 20 år ude (gengivet i BLOG 13. januar 2025). Det er hans udsagn, ikke Mads'. [B]
* **Usikkerhed:** Mads har ikke skrevet en egentlig analyse af kvantekæden i det læste materiale. Hold siden kort. [A]

---

## Kæde 6. Digitale betalinger, fintech og digitale aktiver (kort)

**Til siden:** Betalinger, banktjenester og lån via apps samt blockchain og stablecoins.
* **NDI's syn [M]:** "Branchen for digitale betalinger og fintech har i 2025 været i strid modvind og sektoren er faldet næsten 20 %, selvom vi bruger vores kort og telefoner mere end nogensinde" (BLOG 29. december 2025). Stablecoins fik grønt lys i USA (BLOG 23. juni 2025). Blockchainindustrien er under regulering i USA (BLOG 21. juli 2025).
* **Eksempel i forsinket beholdning:** Klarna (1. juni 2026). [V]
* **Usikkerhed:** Mads har ikke beskrevet en værdikæde for fintech. Brug det som tema, ikke som kæde. [A]

---

## Ikke medtaget, fordi kilderne er for tynde
* **Biotek og sundhedsteknologi.** Strategiudkastet regner biotek som tech (UDKAST pkt. 4.14 til 4.15), og bogen nævner Hims & Hers (BOG s. 118). Men ugebrevene behandler kun biotek politisk (Novo Nordisk og Metsera, BLOG 10. november 2025) og som en af USA's strategiske teknologier (BLOG 1. december 2025). Der er ingen beskrivelse af en værdikæde. [A]
* **Forsvar.** Omtalt som del af robotik og europæisk genopbygning (BLOG 17. marts 2025 og 9. februar 2026). Bør behandles under kæde 2, ikke som egen kæde. [A]
* **E-handel og platforme.** Nævnt som diversifikation uden for AI, f.eks. Carvana (BLOG 30. marts 2026). Ikke en værdikæde.

## Forslag til sidestruktur [A]
1. Øverst flodsystemet som grafik med fem dæmninger: energi, datacentre, halvledere, cloud og modeller, applikationer og fysisk AI.
2. Hvert led som et kort med "Hvad er det", "Hvorfor følger NDI det" og "Hvad ændrer sig".
3. Link fra hvert led til screeneren med det tilhørende tag og den forsinkede dato.
4. Compliancetekst fast nederst.
