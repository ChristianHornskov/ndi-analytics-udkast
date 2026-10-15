# IDEAS – NDI Analytics

Hver idé: problem, målgruppe, værdi, hvorfor kun NDI, bygget-af, status.
Offentlige (ikke-fortrolige) idéer spejles evt. på `docs/ideer.html`.

## I1. Stedet man researcher tech-aktier i DK
- **Problem:** Danske investorer mangler et sted, der ser tech-porteføljen gennem NDI's linse (ikke GICS-alene).
- **For:** Nuværende og potentielle unitholdere; nysgerrige tech-investorere.
- **Værdi:** Samler afkast, forsinket beholdning, temaer, selskabssider og lær ét sted.
- **Kun NDI:** Adgang til fondens egne tags, ugebreve-kontekst og porteføljeholdets sprog.
- **Bygges:** Static Pages-udkast nu; senere app/Azure.
- **Status:** building (dette repo).

## I2. NDI-tema & multi-tag (Tesla = energi + fysisk)
- **Problem:** Ét GICS-tag skjuler, at Tesla er flere ting.
- **For:** Brugere der udforsker eksponering.
- **Værdi:** Ærlig mange-til-mange-model.
- **Kun NDI:** NDI's egne tema-definitioner.
- **Bygges:** multi-tags.json + chips i Udforsk + værdikæde-highlight.
- **Status:** building (forslag overnight for tidligere "Andet").

## I3. AI-værdikæden som research-kort
- **Problem:** Svært at se, hvor i AI-stakken fonden er eksponeret.
- **For:** Lærings-orienterede investorer.
- **Værdi:** Pædagogisk kort fra energi → software med links til selskaber.
- **Kun NDI:** Koblet til faktisk forsinket beholdning.
- **Bygges:** vaerdikaede.html.
- **Status:** done (Level 1).

## I4. Variance drag / "hvorfor CAGR ≠ gennemsnit"
- **Problem:** Folk overvurderer simple gennemsnit.
- **For:** Alle der læser afkast.
- **Værdi:** Forventningsafstemning uden rådgivning.
- **Kun NDI:** Tæt på Mads' bogsprog.
- **Bygges:** lær/variance-drag.html.
- **Status:** done (udkast).

## I5. Forsinket snapshot som tillidsfeature
- **Problem:** Live beholdning ville afsløre handler.
- **For:** Compliance + tillid.
- **Værdi:** "Vi viser det offentlige, forsinkede billede."
- **Kun NDI:** Fondmarket-rapporter + NDI-policy.
- **Bygges:** precheck + UI-stempler.
- **Status:** done (policy).

## I6. Kontekstgraf med ugebrev-citater
- **Problem:** Drawdowns uden fortælling.
- **For:** Engagerede følgere.
- **Værdi:** Læring — men cherry-picking-risiko.
- **Kun NDI:** Mads' egne citater.
- **Bygges:** Kun udbytte-prikker i v1; fulde narrativer deferred.
- **Status:** deferred.

## I7. Betalt research-lag / app
- **Problem:** Mads vil investere i "stedet".
- **For:** Power users.
- **Værdi:** Dyb data, alerts, lister.
- **Kun NDI:** Brand + dataprivilegium.
- **Bygges:** Ide-fase.
- **Status:** stub.

## I8. Equal-ish weight forklaring
- **Problem:** Brugere tror fonden er top-tung som et indeks.
- **For:** Screener-brugere.
- **Værdi:** Forstår spredning.
- **Kun NDI:** Faktisk vægtfordeling i snapshot.
- **Bygges:** weightProfileNote i portefølje.
- **Status:** building.

## lane-C 00:40 — til beslutning (Mads/compliance)
- FAQ «Er AI en boble?»: kunne citere Mads (BLOG 4. maj 2026, «compute-mangel … det modsatte af en boble») tydeligt mærket som NDI's vurdering. Ikke lavet: markedsvurdering på en læreside kræver ja fra compliance.

## lane-C ~00:55 — til data-lane (unique-metrics.json, ikke min fil)
- NDI-linsen er ujævn: Tesla/Nvidia/SoftBank/Meta/Quantum×4/Arm har 4–5 felter, mens Poet, Fluence, Apple, AMD og Broadcom kun har ét felt («NDI-linse» eller «Plads i kæden»). På `ndi-perspektiv.html` ser de halvfærdige ud ved siden af. Forslag: enten fem felter til alle (AI-udkast-mærket) eller skjul de tynde rækker til de er gennemgået.
- Feltnavnene varierer («NDI-tag» / «NDI-tags» / «NDI-linse» / «Plads i kæden» / «Plads i værdikæden»). Legenden på siden forklarer fem faste felter — data bør følge dem.

## Til beslutning (lane-C, 00:41 16/10)
- «tags» bruges stadig som fagord (NDI-tags, multi-tag). Dansk alternativ: «mærker». Kræver samme ord i js/ og vaerdikaeder (andre lanes), ellers bliver sproget ujævnt. Ikke ændret.

## lane-C ~01:25 — til data-lane (unique-metrics.json, ikke min fil)
- Synlig tekst på ndi-perspektiv.html bryder Vidensbot pkt. 10: semikolon i Tesla-hint («Placeringen er pædagogisk; Tesla bygger …») og tankestreg i Rigetti-/Quantum-hint («regnekraft — ikke erstatning …») og Arm-hint («økosystem — ikke egen foundry»). Forslag: punktum/komma.
- Ordlisten har ingen post for temaet «Energi» (kun energiressourcer, elnet, SMR, energilagring). Kan tilføjes, hvis Leo vil have alle 11 temaer i ordlisten.

## lane-C ~01:40 — til js-ejer
- `docs/js/faq-search.js` l. 93 og 96: “${q}” → «${q}» så tælleren følger husstilen.
