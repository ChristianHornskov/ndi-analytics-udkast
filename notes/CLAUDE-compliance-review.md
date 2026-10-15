# Claude compliance review (overnight lane R)

Marketing/udkast check — not legal advice. Build lanes fix **MUST** items.
Scope: DK/EU fund marketing tone, PRIIP/KID visibility, warnings, advice-like wording, data delay.

## 2026-10-15 23:55 CEST · cyklus 1
Grundlag: live Pages (≈ `a341c99`) + lokal `docs/` på `origin/main` `b9e81ee`. Ikke juridisk rådgivning; markedsføringstjek for DK/EU (LIFAA-/UCITS-markedsføring, ESMA-retningslinjer for markedsføringsmateriale, PRIIP). Endelig vurdering: Fundmarket (IFS) compliance.

### MUST (blokerer for at vise siden eksternt)
1. **X-opslag fra tredjeparter med tickers på fondssider.** `x-posts.json` har 19 opslag: InvestNewdeal 6, MadsC007 4, jesper_baek 2, CHornskov 2 **og 5 tredjepartskonti** (MilkRoadAI 2, FundaAI, MelvinInvests, BullTheoryio). De vises på **Fonden** (under afkastgrafen, med cyan markører *i* performancegrafen), på **selskabssider** ("Hvad siger X") og på ndi-paa-x.html. Eksempler: "People are forgetting how important companies like $CRWV and $NBIS are…" (MelvinInvests), "$ORCL and $CRWV face a repricing…" (FundaAI) på SoftBank-siden, "$NVDA $SE $HIMS" (InvestNewdeal), "…de lavede den bedste bil" (Jesper om Tesla) på Tesla-siden og på Fonden. Risiko: (a) NDI kuraterer opslagene, så "ikke NDI's holdning" fjerner ikke, at udvælgelsen kan blive tilregnet NDI (vedtaget indhold i markedsføring). (b) Hype fra tredjeparter og nævnte tickers ved siden af fondens beholdning og vægt ligner investeringsanbefalinger (MAR art. 3(1)(35)) og strider mod "ingen holdning til enkeltaktier" (UX-krav #17/#24/#34). (c) Markører i performancegrafen antyder en årsagssammenhæng mellem opslag og afkast. **Forslag:** fjern X fra Fonden og fra afkastgrafen. Vis på selskab/tema kun NDI-egne konti eller ingen. Tredjepartsopslag kun på ndi-paa-x.html, hvis Leo/Fundmarket godkender det, ellers fjern dem.
2. **PMINDIAKK: indirekte afkast før 12 mdr.** sammenlign.html viser "Første NAV 5. dec. 2025" og "Seneste NAV 98,40 (14. okt. 2026)". Data starter i 100,00, så siden afslører −1,6 % for en klasse med mindre end 12 måneders historik. Fjern "Seneste NAV" for AKK (eller for begge) indtil 5. dec. 2026 (`docs/sammenlign.html:85`).
3. **Forkert risikotal-dato.** `risk-stats.json` maxDdPeak 2026-06-02 > trough 2025-04-08. Det vises på risici.html og fakta.html og modsiger drawdown.html (18. feb. 2025). Ukorrekt risikoinformation i markedsføring. Ret det.
4. **Tekst, der afventer godkendelse, er offentlig.** Fonden: "ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse." Enten er det godkendt, eller også skal det skjules. Ikke-godkendt markedsføring må ikke vises med en note om, at den ikke er godkendt. Det er Leos beslutning (jf. VIDENSBOT-live-check "Leo skal beslutte" 3).

### SHOULD
- **Omkostninger:** tallene findes nu (omkostninger.html, kilde Fundmarket, intet ÅOP opfundet). Det er godt. Tilføj KID'ets omkostningspræsentation (samlede omkostninger / årlig omkostningseffekt pr. holdeperiode), så tallene matcher PRIIP-dokumentet. Link fra invester.html trin 4. Bemærk: "Øvrige løbende 1,49 %" + "Porteføljetransaktion" er ikke ÅOP. Lad være med at kalde summen ÅOP.
- **Beregnet vol/Sharpe** (32,46 % / 0,89) er mærket "beregnet i udkastet". Godt. Angiv periode og frekvens (dagligt, annualiseret fra 22. sep. 2023 til 14. okt. 2026). Overvej at undlade Sharpe med rf=0. Det kan virke flatterende i en periode, hvor den risikofrie rente var > 0.
- **Månedsafkast:** okt. 2026 er en delmåned (−9,2). Marker den. Gitteret er ikke en 1m-fremhævning, men en umarkeret delmåned kan læses som 1m-afkast.
- Fakta "Juridisk start 2023-09-25" vs første NAV 22. sep. 2023. Afstem det, ellers er grundlaget for "siden start" uklart.
- CHornskov-opslag (8. maj 2025): "Begge er også i $PMINDI" (kvantetitler). Det oplyser om beholdning via sociale medier uden for snapshot-politikken. Fjern det fra feedet.
- Footer "Central Information Dokument". Brug den officielle betegnelse "Dokument med central information".
- Intern sprogbrug ("ugebreve / Vidensbot" som kilde på vaerdikaeder) kan læses, som om tekst fra ugebrevene er genbrugt. Ugebrevene indeholder handelsprog. Skriv "NDI's offentlige formidling" eller fjern kildeangivelsen.

### Tjekliste (status)
| Punkt | Status |
|---|---|
| Ikke-rådgivning / generel info | ✅ Entré, alle undersider, footer |
| Tab af kapital synligt | ✅ ved hvert afkasttal + risici |
| Historisk afkast ≠ fremtid | ✅ ved graf, kalenderår, måned, 100k, embed |
| KID-links + SRI 5/7 (KID 14. aug. 2026) | ✅ footer, risici, fakta, selskab |
| Rådgivende ordlyd (køb/sælg/anbefal/sikker/garanteret/bedste) | ⚠️ kun i X-opslag ("bedste bil"). Egen copy er ren ("ikke købsanbefaling", "kan ikke udpeges sikkert") |
| Handelssprog fra ugebreve ("øger eksponering", "overvægt") | ✅ 0 forekomster (kun "ikke bevidste overvægte") |
| Beholdning forsinket, asOf ≤ 2026-06-01 | ✅ company-months kvartalsvis, max 2026-06-01. themes/value-chains/multi-tags ≤ 2026-06-01. ⚠️ X-opslag kan afsløre senere beholdning |
| PMINDIAKK ingen afkast < 12 mdr. | ⚠️ gaten holder i fonden og embed. NAV-lækage på sammenlign (MUST 2) |
| Ingen 1m/3m på PMINDI | ✅ embed ignorerer `?periode=1m/3m`. ⚠️ delmåned i gitter |
| Nasdaq ikke som benchmark | ✅ "Fonden har intet fast benchmark". Nasdaq kun som noteringssted (X-opslag) |
| AI-tekst mærket | ✅ selskabssider pr. felt. ⚠️ ndi-perspektiv/unique-metrics "forslag": tjek næste cyklus |
| Omkostninger (ÅOP/OCF) | ⚠️ tal findes nu. KID-omkostningseffekt og link fra invester mangler |

Næste cyklus: gentjek MUST 1–4 på Pages, ndi-perspektiv AI-mærkning, lane-B "compliance-safe screener sorts" (sorteringer må ikke fremhæve vindere/fald).

## 2026-10-16 00:00 CEST · cyklus 2
Grundlag: `origin/main` `8b30c48`. Pages-tekst er identisk med lokal main. Ikke juridisk rådgivning.

### MUST (alle 4 fra cyklus 1 er stadig åbne, og ét er skærpet)
1. **X-tredjepartsopslag** står uændret i `x-posts.json` (19 opslag). Fonden-view viser stadig X-feed med opslag fra 3. til 14. okt. 2026 (@MilkRoadAI, @MadsC007, @jesper_baek, @InvestNewdeal).
2. **PMINDIAKK: NAV-lækage før 12 mdr. er skærpet.** Det står ikke kun på sammenlign. **Fonden-view for AKK** (`index.html?view=fonden&fund=pmindiakk`) har som første KPI "Seneste NAV **98,40**, pr. 14. okt. 2026" lige over "Afkast vises efter 12 måneder". Sammen med "Første NAV 5. dec. 2025" (100,00) på sammenlign kan man selv regne −1,6 % ud. Fjern NAV fra AKK-visningerne indtil 5. dec. 2026, eller vis kun ISIN og handelsinfo.
3. **risk-stats maxDdPeak 2026-06-02 > trough 2025-04-08** er uændret (risici + fakta).
4. **"ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse"** er stadig offentligt på Fonden (`js/app.js:411`).

### SHOULD (nyt)
- **vaerdikaede.html / value-chains.json:** ingen handelsprog. Grep giver 0 hits på øger/overvægt/køb/sælg/kursmål. "Bevidst overvægt" forekommer kun i negationer. Disclaimer, forsinkelse (asOf 2026-06-01) og "ingen kurser/afkast pr. aktie" er til stede. Kun to ting:
  - "Ifølge Mads kommer efterspørgslen i stigende grad nedefra, først fra agentisk AI og snart fra fysisk AI" er et fremadrettet markedssynspunkt i fondsmarkedsføring. Det er acceptabelt som tilskrevet holdning, men tilføj "NDI's vurdering, kan vise sig forkert", som andre steder på siden ("tidligt og usikkert").
  - `value-chains.json` note: "Tekst inspireret af NDI ugebreve / Vidensbot". Fjern kildehenvisningen til ugebreve fra offentlige data (gentaget fra cyklus 1). Ugebrevene indeholder handelsprog.
- **Lednumre i NDI-linsen** (`unique-metrics.json` "Led 3: chips" og andre) passer ikke til 13-leds kæden. Det er forkert faktainformation, men lav risiko. Ret med UX-punktet.
- Uændret fra cyklus 1: KID-omkostningseffekt/link fra invester, Sharpe rf=0, delmåned okt. 2026, "Juridisk start" vs første NAV, CHornskov "Begge er også i $PMINDI", "Central Information Dokument".

### Tjekliste (delta mod cyklus 1)
| Punkt | Status |
|---|---|
| Ikke-rådgivning / tab af kapital / historisk ≠ fremtid | ✅ uændret, også på ny vaerdikaede |
| KID/SRI | ✅ (betegnelse ⚠️) |
| Rådgivende ordlyd | ✅ egen copy. ⚠️ X-opslag |
| Handelssprog | ✅ 0 hits, også i ny value-chains.json |
| asOf ≤ 2026-06-01 | ✅ value-chains asOf 2026-06-01 |
| PMINDIAKK < 12 mdr. | ❌ NAV 98,40 på Fonden-AKK + sammenlign (MUST 2) |
| 1m/3m PMINDI | ✅ (⚠️ delmåned) |
| Nasdaq som benchmark | ✅ "intet fast benchmark" |
| AI-mærkning | ✅ ndi-perspektiv 9 mærker og "afventer NDI-gennemgang", selskab 13 |
| Omkostninger | ⚠️ tal findes. KID-omkostningseffekt og invester-link mangler |
| Screener-sortering (lane-B) | ✅ portefølje sorterer kun på vægt/navn/tema. `?sort=ret` ignoreres, ingen afkastkolonne |

## 2026-10-16 00:20 CEST · cyklus 3
Grundlag: `origin/main` `820f116`. `docs/` er uændret siden `8b30c48`, og Pages svarer til main. Ikke juridisk rådgivning. Endelig vurdering: Fundmarket (IFS) compliance. Cyklussen gentjekker MUST 1–4 og tilføjer (artikel-/afsnitshenvisninger er orienterende og skal verificeres) en gennemgang mod ESMA's retningslinjer for markedsføringsmateriale (ESMA34-45-1272) og CBDF-forordningen (EU) 2019/1156 art. 4.

### MUST
1. **Ny: siden er ikke mærket som markedsføringsmateriale.** "Markedsføringsmateriale" og "marketing communication" giver 0 hits i `docs/`. Footeren siger "Udkast / noindex … Ingen investeringsrådgivning". CBDF art. 4(1) og ESMA-retningslinjerne afsnit 4.1 kræver, at materialet tydeligt kan identificeres som markedsføring, og at der henvises til prospekt og KID ("Læs prospektet og KID, før du træffer en endelig investeringsbeslutning"). Tilføj det i footeren på alle sider og i embed. Prospektlinket findes kun på fakta.html. Læg det også i footeren og på invester trin 1.
2. **(cyklus 1, MUST 1) X-tredjepartsopslag** på Fonden, i afkastgrafen og på selskabssider er uændret. SoftBank-siden viser stadig @FundaAI "$ORCL and $CRWV face a repricing of credit risk, along with SoftBank…".
3. **(cyklus 1, MUST 2) PMINDIAKK "Seneste NAV 98,40"** står stadig på AKK-view + sammenlign. **Skærpet:** AKK-view skriver også "Klassen følger samme overordnede strategi som PMINDI" lige ved siden af PMINDI-fanen med +104,8 %. Det kan læses som et indirekte afkastudsagn for en klasse med mindre end 12 måneders historik. Fjern sætningen eller tilføj "PMINDI's afkast kan ikke overføres til PMINDIAKK".
4. **(cyklus 1, MUST 3) risk-stats peak > trough** er uændret.
5. **(cyklus 1, MUST 4) "afventer Fundmarket-godkendelse"** står stadig offentligt på Fonden.
6. **Ny: "SpaceX: større end hele jordens økonomi"** er en rubrik på vaerdikaeder.html. Citatet er tilskrevet ("Elon Musks påstand … ikke NDI's forventning"), og det er godt. Men en rubrik i fondsmarkedsføring om et selskab med ekstremt fremadrettet påstand er ikke "fair, clear and not misleading" (ESMA afsnit 4.2–4.3: balance mellem fordele og risici, fair/klar/ikke vildledende). Det gælder især, fordi kilden er ugebrevet 12. okt. 2026. Brug en neutral rubrik og lad påstanden stå i brødteksten med forbeholdet. Alternativt fjern den.

### SHOULD (nyt)
- **SpaceX-profil med ISIN uden for snapshot.** `company-profiles.json` har `US84615Q1031` (SpaceX) med 4 videoer/artikler dateret 15. jun. til 8. okt. 2026. ISIN'en findes ikke i `portfolio.json` eller `company-months.json` (pr. 1. jun. 2026). Siden viser korrekt "indgår ikke i den forsinkede beholdning". Men en offentlig profil med ISIN, X-konti og NDI-indhold om et selskab uden for snapshottet kan afsløre en position, fonden har taget efter cutoff, hvis den har. Fjern ISIN-nøglen/profilen, indtil selskabet optræder i et offentliggjort snapshot. Ellers skal Leo bekræfte, at der ikke er nogen position.
- **Perioder under 12 måneder for PMINDI:** ÅTD +4,0 % (KPI-kort), "2023 delår +16,7 %" (ca. 3 mdr.), 2026 delår og månedsgitteret (36 enkeltmåneder = 1m-afkast pr. måned, okt. 2026 = delmåned −9,2) står alle synligt. Reglen "ingen 1m/3m" overholdes for perioden-vælgeren, men gitteret og delårene viser i praksis korte perioder. KID'ets søjlediagram viser kun hele kalenderår. Lad Fundmarket afgøre det sammen med den udestående ÅTD-godkendelse (MUST 5). Indtil da: fjern delår og månedsgitter fra Fonden-hero, eller marker dem tydeligt.
- **Historisk afkast er det mest fremhævede element** i Fonden-hero (+104,8 %, +26,4 % CAGR øverst, SRI til sidst). Tidligere resultater må ikke være det mest fremtrædende element (jf. MiFID II DR 2017/565 art. 44(4)(a), og ESMA-retningslinjerne afsnit 4.5 om afkastinformation). Giv risiko/SRI samme vægt i første række.
- **Investorrettigheder/klageadgang:** 0 hits på "investorrettigheder" og "klage". Ved markedsføring på tværs af grænser forventes en henvisning til et resumé af investorrettigheder (Fundmarket har typisk et). Artikelhenvisningen skal Fundmarket bekræfte. Tilføj det på fakta.html. Lav prioritet, hvis siden kun markedsføres i DK.
- **SFDR-klassifikation** (art. 6/8) står ingen steder. Siden indeholder ingen bæredygtighedsclaims (0 hits på "bæredygtig"). Det er OK, men FO-personaen spørger. Vis klassifikationen fra prospektet på fakta.html.
- `company-profiles.json`-titel "Q2 Regnskaber fra Hims & Hers, Sea LTD og kæmpe NVIDIA nyheder - Mads giver sit take" (YouTube) står i data. Den er ikke fundet i crawlet tekst, men hvis den bliver vist: hype-sprog og enkeltaktier. Vis kun `context`-feltet.
- Uændret: CHornskov "Begge er også i $PMINDI", "Central Information Dokument", Sharpe rf=0, "Juridisk start" vs første NAV, ugebrev-kildeangivelse i value-chains.json.

### Tjekliste (delta mod cyklus 2)
| Punkt | Status |
|---|---|
| Ikke-rådgivning / generel info | ✅ (invester: "Ikke rådgivning om, om du bør investere") |
| Mærket som markedsføringsmateriale + henvisning til prospekt/KID | ❌ **ny MUST 1** |
| Tab af kapital / historisk ≠ fremtid | ✅ uændret |
| KID/SRI | ✅ (betegnelse ⚠️) |
| Rådgivende ordlyd / hype | ⚠️ X-opslag + "SpaceX: større end hele jordens økonomi" (MUST 6) |
| Handelssprog | ✅ 0 hits på "øger eksponering"/"overvægt"/kursmål |
| asOf ≤ 2026-06-01 | ✅ portfolio/company-months. ⚠️ SpaceX-profil uden for snapshot |
| PMINDIAKK < 12 mdr. | ❌ NAV 98,40 + "samme strategi" (MUST 3) |
| 1m/3m PMINDI | ⚠️ månedsgitter/delår (SHOULD, Fundmarket) |
| Nasdaq som benchmark | ✅ |
| AI-mærkning | ✅ (UX: for mange mærker pr. side) |
| Omkostninger | ⚠️ tal findes, "efter løbende omkostninger" er angivet ved afkast ✅. KID-omkostningseffekt og invester-link mangler |

## 2026-10-16 00:40 CEST · cyklus 4
Grundlag: `origin/main` `820f116` (uændret). `docs/` er uændret siden `8b30c48`, og Pages = main. Ikke juridisk rådgivning. Endelig vurdering: Fundmarket (IFS) compliance. Alle MUST fra cyklus 3 (1–6) står **uændret åbne**, fordi der ikke er nye docs-commits. Denne cyklus gennemgår de sider, der ikke var dækket før: `laer/*`, tema, temaer, ndi-paa-x, nyhedsarkiv, om-data, omkostninger, ideer og embed.

### MUST (nyt)
1. **ndi-paa-x.html: forbeholdet "Ikke NDI's holdning" bruges på NDI's egne konti.** Introen siger "Udvalgte offentlige opslag fra NDI-relaterede konti … Ikke NDI's holdning". Listen indeholder **@InvestNewdeal** (7 opslag, selskabets egen konto, bl.a. "Performance opdatering efter Q2 2026" og "$PMINDI betaler udbytte") og **@MadsC007** (5 opslag, fondens forvalter ifølge @InvestNewdeal: "Fund manager Mads Christiansen"). I `x-posts.json` har 19 opslag `label: "Udvalgte offentlige opslag — ikke NDI's holdning"`. Det er vildledende: selskabets og forvalterens egne udsagn er markedsføring fra NDI og kan ikke frasiges med et forbehold (ESMA34-45-1272 afsnit 4.2–4.3, fair/klar/ikke vildledende). Del siden i "Fra NDI" (@InvestNewdeal, @MadsC007, @CHornskov), som er omfattet af markedsføringsreglerne og skal godkendes, og "Tredjepart", hvor forbeholdet er OK. Ellers fjern NDI-konti. Det forstærker cyklus 1 MUST 1 (X-opslag), som nu også gælder **tema.html**.
2. **Forvalterens opslag om enkeltaktier og hype i fondsmarkedsføring.** Mads: "Listening to Bloomberg about AI is like asking a BWM sales rep for facts about Tesla cars" (ticker TSLA, som er i beholdningen). jesper_baek: "…fordi de lavede den bedste bil" (TSLA). @InvestNewdeal: "$NVDA $SE $HIMS". Opslagene er dateret 13.–15. okt. 2026, efter beholdnings-cutoff 1. jun. 2026. Det er ikke handelssprog, men forvalterens aktuelle syn på navngivne beholdningsselskaber, vist ved siden af fonden. Det kan læses som et aktuelt signal om porteføljen (jf. reglen om forsinkede beholdninger) og som ubalanceret fremhævning. Fjern ticker-chips på NDI-konti-opslag, eller begræns ndi-paa-x til opslag uden enkeltaktier.

### SHOULD (nyt)
- **omkostninger.html: ingen samlet sats og ingen RIY/"omkostningernes virkning over tid".** Delposterne står (løbende 1,49 %, transaktion 0,64/0,72 %, emission/indløsning 0,25 %, intet resultathonorar ✅). Men PRIIP-KID'ets totalomkostning og kr.-tabel (fx 10.000 kr. over 1 år / anbefalet periode) gengives ikke. ÅOP er bevidst ikke vist ("ikke et inventeret ÅOP", stavefejl). Det er OK, hvis der henvises til KID, og det gør siden ✅. FO-MUST om én sammenlignelig omkostning er stadig ikke opfyldt. Gengiv KID'ets "samlede omkostninger" og "årlig omkostningseffekt" med kilde og dato.
- **"Tomme felter = udfyldes af NDI"** (omkostninger) og udviklerteksten på om-data ("Ingen live Azure-kald … (se precheck)") er intern tekst på offentlige sider. Det er ikke et compliance-brud, men det undergraver indtrykket af et godkendt materiale.
- **nyhedsarkiv.html** er offentlig, men indeholder kun placeholder. Det er ikke et problem i sig selv. Når siden fyldes, gælder MUST 1 (NDI-kommunikation = markedsføring).
- **@InvestNewdeal "fonde NewDeal Invest rådgiver"**: rollen som rådgiver (ikke forvalter) står korrekt her. Men @InvestNewdeal kalder Mads "Fund manager". Rollebetegnelsen bør være den samme overalt og stemme med prospektet (forvalter = Fundmarket/IFS? rådgiver = NDI). Leo bør bekræfte.

### Positivt
- Alle 10 `laer/*`-sider har standardforbeholdet "Historisk afkast … Du kan tabe en del af eller hele din investering". Der er 0 rådgivende formuleringer: "Fravær er ikke en anbefaling", "Ikke bevidste temaovervægte eller anbefalinger" og "Afkast for PMINDIAKK vises først, når klassen har 12 måneders historik" ✅. Ordet "overvægt" optræder kun i negationer ("ikke en bevidst overvægt"). Det er acceptabelt, men "ikke en anbefaling" alene er renere.
- embed/chart.html: korrekt udbytte/akk-tekst pr. klasse, forbehold, "efter løbende omkostninger, før skat", "intet fast benchmark" ✅. Embed mangler stadig mærkningen "markedsføringsmateriale" + prospekt/KID-henvisning (cyklus 3 MUST 1).
- om-data: "100.000 kr.-eksemplet … et regneeksempel på historik, ikke en forventning. Handelsomkostninger og skat er ikke medregnet" ✅. "Fonden har intet fast benchmark" ✅.

### Tjekliste (delta mod cyklus 3)
| Punkt | Status |
|---|---|
| Mærket som markedsføring + prospekt/KID | ❌ uændret (cyklus 3 MUST 1) |
| Forbehold "ikke NDI's holdning" | ❌ **ny MUST 1**: dækker NDI's egne konti |
| Enkeltaktier / aktuelle syn efter cutoff | ❌ **ny MUST 2**: forvalter-opslag okt. 2026 med tickers |
| Lær-sider | ✅ |
| Omkostninger | ⚠️ delposter ✅, samlet/RIY mangler |
| Øvrige MUST cyklus 3 (2–6) | ❌ uændret |

## 2026-10-16 00:18 CEST · cyklus 5
Grundlag: `origin/main` `60cebcc` (41 `docs/`-filer er ændret siden `820f116`). Pages = main (22:11 UTC). Ikke juridisk rådgivning. Endelig vurdering: Fundmarket (IFS) compliance. Henvisninger er orienterende.

### MUST (status)
1. **Ikke mærket som markedsføringsmateriale (cyklus 3 MUST 1):** ❌ uændret. "markedsføringsmateriale" giver 0 hits i `docs/`. Footer og embed mangler "Markedsføringsmateriale. Læs prospekt og KID før en endelig investeringsbeslutning".
2. **"Ikke NDI's holdning" på NDI's egne konti (cyklus 4 MUST 1):** ❌ **skærpet.** ndi-paa-x skriver nu direkte "NDI-relaterede konti: @InvestNewdeal · @MadsC007 · @jesper_baek · @CHornskov" og har filteret "NDI / fond (14)", i samme afsnit som "ikke NDI's holdning". Alle 21 opslag i `x-posts.json` har stadig label "ikke NDI's holdning". Teksten modsiger nu sig selv på siden.
3. **Ny: "MADS FØLGER"-badge på tredjepartsopslag.** 7 opslag fra konti, som forvalteren følger, har badgen, bl.a. @FundaAI ("$ORCL and $CRWV face a repricing of credit risk, along with SoftBank") og @MelvinInvests ("People are forgetting how important companies like $CRWV and $NBIS are … $NVDA"). Badgen knytter forvalteren til tredjeparts udsagn om navngivne aktier (SoftBank og NVDA er i beholdningen) dateret oktober 2026, efter cutoff. Det kan læses som en indirekte anbefaling eller et aktuelt porteføljesignal, og forbeholdet "ikke NDI's holdning" afbøder det ikke, når NDI selv fremhæver forbindelsen. Fjern badgen og ticker-chips på tredjepartsopslag, eller fjern tredjepartsopslag fra sitet.
4. **Forvalterens opslag om beholdningsselskaber (cyklus 4 MUST 2):** ❌ uændret. Mads "BWM sales rep … Tesla" og jesper_baek "den bedste bil" med TSLA-chip vises på ndi-paa-x og på Fonden.
5. **PMINDIAKK "Seneste NAV" før 12 mdr.:** ❌ uændret på Fonden-AKK (`js/app.js:312`) og sammenlign. "Klassen følger samme overordnede strategi som PMINDI" står nu **også på drawdown.html** (AKK-tilstand), ikke kun på Fonden-AKK. Tilføj "PMINDI's afkast kan ikke overføres til PMINDIAKK" eller fjern sætningen begge steder.
6. **Drawdown-datoer:** ⚠️ delvist lukket. drawdown.html beregner nu korrekt 18. feb. 2025 → 8. apr. 2025. `risk-stats.json` (risici, fakta) viser stadig peak 2. jun. 2026 → trough 8. apr. 2025. To sider viser nu hver sin dato for samme nøgletal, og det er ikke "fair, clear and not misleading". Ret datakilden.
7. **"ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse"** står stadig offentligt (`js/app.js:411`). ❌ uændret.
8. **"SpaceX: større end hele jordens økonomi"** står stadig som rubrik (`value-chains.json:2358`), og SpaceX-profilen (`US84615Q1031`, 7 forekomster) er stadig i `company-profiles.json`. ❌ uændret.

### SHOULD
- **Omkostninger:** ✅ forbedret. kr.-eksempel pr. post, "ikke et beregnet ÅOP", "Kurtage og depot kommer oveni", "Afkasttal … efter løbende omkostninger" og KID-link pr. klasse. Stadig mangler en samlet løbende omkostning og KID'ets "omkostningernes virkning over tid" (RIY), som privat- og FO-personaen begge kræver. Gengiv KID-tallet med kilde og dato. Hvis "Øvrige løbende 1,49 %" ikke svarer til KID'ets "løbende omkostninger" i alt, skal det stå tydeligt.
- **Intern tekst på offentlige sider:** "Tomme felter = udfyldes af NDI" (omkostninger, fakta), "udfyldes af NDI" som pille ved revision og officiel vol/Sharpe (fakta, risici), "kl n" (fondsnavn), om-data "Ingen live Azure-kald … (se precheck)". Det gør det tydeligt, at materialet ikke er færdigt og ikke er godkendt. Det er OK for et udkast, men det skal ryddes, før siden vises til investorer.
- **Revisor "udfyldes af NDI":** fakta.html viser revisor som manglende. Revisor står i prospekt og årsrapport. Udfyld det, før FO-personaen ser siden.
- **Handelssprog:** ✅ 0 hits på "øger eksponering", kursmål og køb/sælg-opfordringer i egen copy. "Overvægt" forekommer kun i negationer ("ikke bevidste overvægte"). "købsanbefaling" forekommer kun i "ikke som købsanbefaling" (ASML).
- **AI-mærkning:** ✅ ndi-perspektiv 74 mærker + "afventer NDI-gennemgang". Mærkningen er tilstrækkelig, og UX foreslår færre mærker uden at fjerne den.
- **Ugebrev-kilde** i `value-chains.json` note, synlig på vaerdikaeder ("Tekst inspireret af NDI ugebreve / Vidensbot"): uændret. Gentaget fra cyklus 1.
- Uændret: Sharpe rf=0, "Central Information Dokument" (brug "Central information (KID)" / "Dokument med central information"), PMINDI-delår og månedsgitter (afventer Fundmarket), investorrettigheder/klage, SFDR-klassifikation på fakta, rollebetegnelser forvalter (Fundmarket/IFS) vs rådgiver (NDIIR ApS, korrekt på fakta ✅) vs "Fund manager Mads".

### Tjekliste (delta mod cyklus 4)
| Punkt | Status |
|---|---|
| Ikke-rådgivning / generel info | ✅ (Fonden: "Ingen anbefaling om at købe eller sælge") |
| Mærket som markedsføring + prospekt/KID | ❌ uændret |
| Tab af kapital / historisk ≠ fremtid | ✅ alle 27 crawlede sider |
| KID/SRI | ✅ SRI 5/7 i Fonden-hero, KID-links på invester/omkostninger/footer |
| Rådgivende ordlyd | ✅ egen copy. ❌ X: "Mads følger" (ny MUST 3) |
| Handelssprog | ✅ |
| asOf ≤ 2026-06-01 | ✅ beholdning. ⚠️ X-opslag oktober 2026 om beholdningsnavne, SpaceX-profil |
| PMINDIAKK < 12 mdr. | ❌ NAV + "samme strategi" (nu også drawdown) |
| 1m/3m PMINDI | ⚠️ uændret (ÅTD/delår/gitter afventer Fundmarket) |
| Nasdaq som benchmark | ✅ "Fonden har intet fast benchmark" |
| AI-mærkning | ✅ |
| Omkostninger | ⚠️ kr. pr. post ✅, samlet/RIY mangler |
| Konsistens af nøgletal | ❌ **ny**: max-drawdown-datoer er forskellige på drawdown og risici/fakta |

## 2026-10-16 00:25 CEST · cyklus 6 (delta)
Grundlag: `origin/main` `60cebcc`, uændret siden cyklus 5. Pages = main (22:11 UTC). Ikke juridisk rådgivning. Endelig vurdering: Fundmarket (IFS).

### Genverificeret (grep i `docs/`)
- "markedsføringsmateriale": **0 hits**. MUST 1 er stadig åben (blocker).
- `js/x-feed.js:279` renderer stadig "Mads følger" for `curatedFrom === 'mads_following'`. MUST 3 er åben. Nyeste X-opslag har `created_at` 2026-10-15 og ligger altså efter holdings-cutoff 2026-06-01. Tredjeparts ticker-udsagn om beholdningsnavne + forvalter-badge = mulig indirekte anbefaling.
- `risk-stats.json` maxDdPeak 2026-06-02 / trough 2025-04-08: MUST 6 er åben (vildledende nøgletal på tværs af sider).
- Rådgivende ordlyd: ✅ alle hits er negationer ("uden anbefaling", "ikke … anbefaling") eller KID-termen "anbefalet investeringsperiode/ejertid". Det er OK.
- Handelssprog ("øger eksponering", "overvægt", kursmål): ✅ 0 hits i egen copy.
- Omkostninger: ÅOP/løbende omkostninger nævnes på index, omkostninger, om-data og embed. Samlet sats og RIY mangler stadig (SHOULD, FO-MUST).

### Uændret fra cyklus 5
MUST 2 (NDI-konti "ikke NDI's holdning"), 4 (forvalter-opslag om TSLA), 5 (AKK NAV + "samme strategi"), 7 ("afventer Fundmarket-godkendelse" offentligt), 8 (SpaceX-rubrik/profil). SHOULD-listen er uændret.

**Blocker-rækkefølge foreslået:** 1 markedsføringsmærkning → 3 "Mads følger" → 6 DD-datoer → 5 AKK → 2/4 X-konti.

## 2026-10-16 00:23 CEST · cyklus 7 (delta)
Grundlag: `origin/main` `60cebcc`, uændret. Pages = main (22:11 UTC, md5 drawdown identisk). Ikke juridisk rådgivning. Endelig vurdering: Fundmarket (IFS).

### Nyt verificeret i denne cyklus
- **1m/3m på PMINDI:** ✅ ingen UI-eksponering. `slicePeriod()` i `js/data.js:56-59` kan stadig beregne '1m'/'3m', men ingen knap eller kald bruger dem. Fonden-segmentet er kun "Siden start / ÅTD / kalenderår" (`js/app.js:350-356`), og embed kun "ÅTD / Hele perioden". Det er død kode, men en latent risiko: fjern grenene, så ingen senere lane genaktiverer dem ved et uheld.
- **PMINDIAKK < 12 mdr. i embed:** ✅ `embed/chart.js:167-171` viser "-" og "Vises efter 12 måneder". (MUST 5 om AKK-NAV/"samme strategi" på andre sider er stadig åben.)
- **Nasdaq som benchmark:** ✅ 0 hits på "nasdaq" i html/js.
- **Garanti/"sikker"/"bedste"-ordlyd:** ✅ 0 hits.

### Genbekræftet åbne MUST
1. Markedsføringsmærkning: "markedsføringsmateriale" 0 hits (blocker).
3. "Mads følger"-badge: `js/x-feed.js` (1 forekomst).
6. DD-datoer: `risk-stats.json` maxDdPeak 2026-06-02.
2/4/5/7/8 uændret fra cyklus 5.

**Blocker-rækkefølge (uændret):** 1 markedsføringsmærkning → 3 "Mads følger" → 6 DD-datoer → 5 AKK → 2/4 X-konti.

## 2026-10-16 00:45 CEST · cyklus 8 (main `1bc0d43`, fuld runde)

Ikke juridisk rådgivning. Tjekket med Playwright på renderet tekst (16 sider ved 375 og 1280) og med grep i `docs/`.

### MUST (blokerer før offentlig brug)
1. **Ingen markedsføringsmærkning.** 0 hits på "markedsføringsmateriale/-meddelelse" i nogen HTML-fil. Det er stadig åbent siden cyklus 1.
2. **"Mads følger" på tredjeparts X-opslag** (`js/x-feed.js:339`, `ndi-paa-x.html:86,109,163`, selskabssider). Det kan læses som en anbefaling fra en medarbejder. Samtidig kalder ndi-paa-x NDI's egne konti for "ikke NDI's holdning", hvilket er selvmodsigende for opslag fra NDI selv.
3. **Toppunktet for drawdown ligger efter bunden** (`risk-stats.json:9 maxDdPeak 2026-06-02`). Fakta viser datoen, og forkerte risikotal er et problem for, om informationen er retvisende.
4. **ndi-paa-x mangler en tabsadvarsel** (renderet tekst indeholder hverken "tab"/"tabe" eller "historisk afkast"). Siden viser Nasdaq-noteringsopslaget og performanceopslag ("Performance opdatering efter Q2 2026"). Siden skal have den samme risikolinje som de øvrige sider.

### SHOULD
- **Omkostninger:** OCF/løbende omkostninger vises, og siden siger tydeligt, at det "ikke er et beregnet ÅOP". Det er ærligt. Siden har dog ingen tabsadvarsel (renderet tekst indeholder ikke "tab"). Den bør have standard-risikolinjen og et link til KID'et for den samlede omkostning.
- **"udfyldes"/"afventer Fundmarket-godkendelse"** står synligt på fonden, fakta, omkostninger og risici. Det skal ikke stå på et offentligt site.
- **Nasdaq:** de eneste hits er "børsnoteret hos Nasdaq Copenhagen" (en noteringsfakta), og Nasdaq bruges ikke som benchmark ✅.
- **Rådgivningsagtige ord:** gennemgang af nye tekster (værdikæder, idéer, valuta, NDI-linse) viser kun negationer ("ikke som købsanbefaling", "ikke en prognose eller en anbefaling", "ikke bevidste overvægte") ✅. Der er ikke fundet "øger eksponering" eller "overvægt" som handelssprog. `laer/hvorfor-mange-aktier.html:99` bruger "overvægt" generisk og pædagogisk, så det er OK.
- **AI-mærkning:** "AI-udkast" er mærket pr. sektion på selskab ✅, og risici og om-data forklarer mærket ✅.

### OK (uændret ✅)
- Ikke-rådgivning, risikoindikator og KID-link på entré, fonden, portefølje, udforsk, risici, invester og fakta.
- Beholdningerne er forsinkede: der står "pr. 1. jun. 2026" på selskab, temaer, valuta og idéer, og der står ikke noget om løbende handler.
- PMINDIAKK: embed og drawdown viser teksten om 12 måneder uden procenter ✅. 1m/3m er ikke eksponeret ✅.

## 2026-10-16 00:31 CEST · cyklus 9 (main `1bc0d43` uændret, delta)

Ikke juridisk rådgivning. Tjekket med Playwright på renderet tekst fra live-sitet (18 sider ved 375 og 1280) og med grep i `docs/`. Pages er lig med main.

### MUST (alle åbne, uændret)
1. **Ingen markedsføringsmærkning.** Renderet tekst indeholder "markedsføring" på 0 af 18 sider. Ordet findes kun i `data/fund-facts.json`.
2. **"Mads følger"** renderes på selskab (SoftBank) og ndi-paa-x.
3. **DD-top efter bund** (`risk-stats.json:9`).
4. **ndi-paa-x mangler en risikolinje.** Der er hverken "tab" eller "historisk afkast" i renderet tekst.

### SHOULD
- **Omkostninger mangler stadig en tabsadvarsel.** Siden har "historisk afkast …", men ikke "du kan tabe".
- **Nyhedsarkiv (nyt i denne runde)** har hverken tab-linje eller KID-link, men har "historisk afkast". Det er OK, så længe siden kun er placeholder. Siden skal dog have standard-risikolinjen, før der kommer indhold om tema-eksponering.
- **KID-link mangler i renderet tekst** på værdikæder, drawdown, temaer og idéer. Risikolinjen står der. Footer-KID-linket bør med på alle sider, der viser fondsvægte.
- **"afventer Fundmarket-godkendelse"** er synligt på fonden.

### Rådgivningsord (gennemgået i kontekst) ✅
- Værdikæder: "overvægt" bruges kun i negationer ("ikke bevidste overvægte", "ikke anbefaling eller bevidst overvægt").
- Invester: "KID'et anbefaler mindst 5 års investeringsperiode" er KID-terminologi og OK.
- Fakta/risici: "Anbefalet horisont/investeringsperiode ifølge KID" er OK.
- Der er 0 hits på køb nu/sælg nu/garanteret/sikker investering/øger eksponering.

### OK (uændret ✅)
- Beholdningerne er forsinkede: der står "pr. 1. jun. 2026 … Ikke dagsaktuel" på porteføljen.
- PMINDIAKK 12m-gate holder. 1m/3m er ikke eksponeret. Nasdaq er kun nævnt som noteringsfakta.
- AI-mærkningen er der på udforsk, værdikæder, selskab, temaer og idéer.
- Risikoindikator 5/7 og KID står på entré, fonden, portefølje, udforsk, risici, invester og fakta.

## 2026-10-16 00:36 CEST · cyklus 10 (main `1bc0d43` uændret, delta)

Ikke juridisk rådgivning. Tjekket med Playwright på renderet tekst fra live-sitet (25 sider ved 375 og 1280) og med grep i `docs/`. Pages er lig med main.

### MUST (åbne)
1. **Ingen markedsføringsmærkning.** Renderet tekst indeholder "markedsføring" på 0 af 25 sider.
2. **"Mads følger"** renderes stadig på SoftBank og ndi-paa-x.
3. **DD-top efter bund** (`risk-stats.json:9`).
4. **ndi-paa-x mangler en tabsadvarsel** (0 hits på "kan tabe" og 0 på "historisk afkast").
5. **Genåbnet: PMINDIAKK-NAV før 12 mdr.** Cyklus 9 havde den under "OK", men den er **stadig synlig**. Fonden-AKK viser som første KPI "Seneste NAV", og sammenlign viser "Seneste NAV 98,40 (14. okt. 2026)" ved siden af "Første NAV 5. dec. 2025". Det giver et implicit afkast på −1,6 %. Fonden-AKK siger også stadig "Klassen følger samme overordnede strategi som PMINDI" uden "PMINDI's afkast kan ikke overføres". (`js/app.js` Fonden-AKK, `sammenlign.html:85`.)
6. **ÅTD/100.000 kr. vises, selvom teksten siger, at de afventer Fundmarket-godkendelse.** Det står uændret på fonden. **Nyt:** periode.html spreder tallet videre ("YTD: +4,0 %", ÅTD-dyb-side, og linket "YTD dyb side" fra fonden). Det skal afgøres samlet: enten er tallene godkendt, og noten fjernes, eller også skjules ÅTD overalt (fonden-KPI, segment, periode, embed).

### SHOULD
- **Tredjeparts X-opslag på fonden** (fra cyklus 1, stadig åbent). Opslagene står under afkastgrafen, bl.a. @BullTheoryio "SoftBank is seeking to raise up to $100 billion…", @MilkRoadAI om Nvidia og @InvestNewdeal "$NVDA $SE $HIMS" (13. aug. 2026, dvs. *efter* beholdningssnapshottet 1. jun.). Sammen med "Fund manager Mads Christiansen comments on $SE earnings" kan opslag med tickers dateret efter snapshottet læses som en indikation af aktuelle positioner. Det er i strid med "ingen live trades" og med den forsinkede beholdning. Fjern feedet fra fonden, eller begræns det til opslag uden tickers.
- **Delårsafkast for PMINDI** (2023 delår, ca. 3 mdr., og 2026 ÅTD) og månedsgitteret er uændret. Fundmarket skal afgøre det sammen med MUST 6.
- **KID-link mangler** i renderet tekst på værdikæder, vaerdikaede, drawdown, temaer, idéer, ndi-perspektiv, selskaber A–Z, periode og nyhedsarkiv. Risikolinjen er der på alle sider undtagen ndi-paa-x og nyhedsarkiv (som kun har "historisk afkast").
- **Omkostninger mangler stadig "Du kan tabe …"** (0 hits).
- **Invester, trin 4** nævner ikke fondens løbende omkostninger (1,49 %) eller KID'ets samlede omkostninger. Tilføj et link til omkostninger.html eller KID'et (FO/privat MUST: omkostninger synlige før køb).

### Rådgivningsord (gennemgået i kontekst) ✅
- "køb/sælg/anbefal/overvægt/eksponering" står kun i negationer ("ikke hvilke aktier man bør købe", "Ingen anbefaling om at købe eller sælge", "ikke bevidste overvægte") eller beskrivende ("Annoncører køber adgang", "sælger dem videre").
- "bedste bil" (Jesper om Tesla, X-citat på fonden og ndi-paa-x) er tredjeparts-/medarbejdertone ved siden af en beholdning. Det dækkes af SHOULD om X ovenfor.
- Der er 0 hits på garanteret, sikker investering, outperform, slå markedet og "øger eksponering".
- Nasdaq er kun nævnt som noteringsfakta. "Fonden har intet fast benchmark" står på fonden, om-data og periode ✅.

### OK ✅
- PMINDIAKK: periode.html AKK-gate og embed viser ingen afkast før 12 mdr. 1m/3m er ikke eksponeret.
- Beholdningerne er forsinkede ("pr. 1. jun. 2026 … Ikke dagsaktuel"), og fonden siger "aldrig afslører fondens aktuelle handler".
- AI-mærkningen er der (ndi-perspektiv 139, SoftBank 9). Mængden er et UX-problem, ikke et compliance-problem.
- Omkostningssiden er ærlig: "Det er ikke et beregnet ÅOP", satserne lægges ikke sammen, og der er en kr.-kvittering.

## 2026-10-16 00:41 CEST · cyklus 11 (main `fb68cd0`, delta)

Ikke juridisk rådgivning. Tjekket med Playwright på renderet tekst fra live-sitet (27 sider ved 375 og 1280) og med grep/diff i `docs/` (`1bc0d43..fb68cd0`). Pages er lig med main.

### Lukket ✅
- **MUST 3 (DD-top efter bund) er lukket.** `risk-stats.json` har nu `maxDdPeak` 2025-02-18 før `maxDdTrough` 2025-04-08.
- **X-tekst "fonde NewDeal Invest rådgiver"** er omskrevet til "offentlige totalafkasttal … (Fundmarket)" ✅. "$PMINDI betaler udbytte" og "Begge er også i $PMINDI" (@CHornskov) er fjernet fra nyhedsfeedet ✅.
- **Invester trin 4** linker til omkostningstal ✅ (SHOULD fra cyklus 10).

### MUST (åbne)
1. **Ingen markedsføringsmærkning.** "markedsføring" står på 0 af 27 renderede sider (findes kun i `data/fund-facts.json`).
2. **"Mads følger"** renderes stadig på SoftBank og ndi-paa-x (`js/x-feed.js:339`, `ndi-paa-x.html:86,109,163`).
3. **ndi-paa-x mangler en tabsadvarsel** (0 hits på "tab" og 0 på "historisk afkast").
4. **PMINDIAKK-NAV før 12 mdr.:** fonden-AKK viser stadig "Seneste NAV 98,40 · 14. okt. 2026" og "samme overordnede strategi som PMINDI" (`js/app.js:333,336`). Sammenlign er uændret.
5. **ÅTD/100.000 kr. "afventer Fundmarket-godkendelse"** står stadig på fonden, mens tallene vises. **Nyt:** den nye graf-takeaway (`js/app.js` `#chart-takeaway`) gentager afkastet som prosa ("Fonden steg +104,8 % …"). Når der vælges ÅTD eller delår 2023, gentager den også de tal, der afventer godkendelse. Takeaway'en skal følge samme gate som ÅTD.

### SHOULD
- **Graf-takeaway uden advarsel lige ved siden af.** Advarslen "Historisk afkast er ikke en pålidelig indikator …" står i KPI-blokken over grafen, men ikke ved selve takeaway-sætningen. En sætning som "Fonden steg X %" bør have advarslen i samme blok. Det er nemt: tilføj den til `.src`-linjen.
- **Tredjeparts X-markører på fondens graf/feed** er stadig til stede ("Udvalgte X-markører er offentlige opslag — ikke NDI's holdning" er nu skrevet under grafen ✅, men indholdet er uændret). Nyt opslag 2026-07-27 @BullTheoryio "BREAKING: Nvidia is in talks to backstop $250 BILLION…". Tekster er nu klippet midt i et ord ("Europe nee", "Jensen Huang says this is an eng"). Det er ikke et compliance-problem i sig selv, men det ser uredigeret ud, og "BREAKING" er hype-tone ved siden af en fond. Fjern det eller klip ved et ordskift.
- **Livscyklus-forslag for alle 345:** de er tydeligt mærket "forslag … afventer NDI" ✅. "Growth/GARP/Value" kan dog læses som en stilkategori for fonden. Sørg for, at fondens officielle strategi ikke modsiges.
- **KID-link mangler** stadig i renderet tekst på værdikæder, vaerdikaede, drawdown, temaer, tema, idéer, ndi-perspektiv, selskaber A–Z, periode og nyhedsarkiv.
- **Omkostninger mangler stadig "Du kan tabe …"** (0 hits på "tab").

### Rådgivningsord (gennemgået i kontekst) ✅
- "overvægt" (værdikæder ×2, tema) står kun i negationer ("ikke bevidste overvægte", "ikke anbefaling eller bevidst overvægt").
- "anbefaler" (FAQ, invester) bruges kun som "KID'et anbefaler mindst 5 år". Det er OK.
- Der er 0 hits på garanteret, sikker investering, "køb nu" og "øger eksponering". Klarna-teksten er omformuleret til "udskudt betaling" (lane-B) ✅.

### OK ✅
- Beholdningerne er forsinkede (pr. 1. jun. 2026) på portefølje, tema og udforsk. Der er ingen live trades.
- PMINDIAKK viser intet afkast før 12 mdr. ("Vises efter 12 måneder"). Der er ingen 1m/3m ("Ingen 1- eller 3-måneders fremhævning"). "Fonden har intet fast benchmark".
- AI-mærkning er til stede (ndi-perspektiv 303, tema-linse "(linse, udkast)").

## 2026-10-16 00:55 CEST · cyklus 12 (main `822db42`, delta)

Ikke juridisk rådgivning. Tjekket med Playwright på 25 live-sider (375 og 1280) og grep på renderet tekst. Siden cyklus 11 er der kun ændret i docs: `docs/tema.html` (rettelse af JS-binding). Der er ingen ændringer i indhold eller data.

### MUST (åbne, uændret)
1. **Ingen markedsføringsmærkning.** "markedsføring" står på 0 af 25 renderede sider.
2. **"Mads følger" + tickers.** Det står nu også på **tema.html?slug=chips**, med 4 X-kort med "MADS FØLGER" og NVDA/CRWV/NBIS. Det svarer til fonden: tredjepartsopslag med tickers dateret efter snapshottet 1. jun. kan læses som en indikation af aktuelle positioner. Kilden er `js/x-feed.js:339`.
3. **ndi-paa-x mangler en tabsadvarsel.** Der er 0 hits på "kan tabe". ndi-paa-x er sammen med nyhedsarkiv de eneste af de 25 sider uden "kan tabe".
4. **PMINDIAKK-NAV før 12 mdr.** Sammenlign viser stadig "Seneste NAV".
5. **ÅTD "afventer Fundmarket-godkendelse"** vises stadig sammen med tallene, og graf-takeaway'en ("Fonden steg +104,8 % …") er stadig uden gate.

### SHOULD (uændret)
- KID-link mangler stadig i renderet tekst på værdikæder, vaerdikaede, drawdown, temaer, idéer, ndi-perspektiv, selskaber, periode, ndi-paa-x, nyhedsarkiv og lær/valuta (kid:0 i crawl).
- Omkostninger mangler stadig "Du kan tabe …".
- "BREAKING:"-opslag fra tredjepart står ved siden af fonden og et tema.

### Rådgivningsord ✅
- "anbefal" og "overvægt" står kun i negationer ("ikke en anbefaling eller en bevidst overvægt") og i KID-terminologi ("anbefalet investeringshorisont på 5 år"). Der er 0 hits på garanteret, "øger eksponering" og "køb nu".

### OK ✅
- Beholdningerne er forsinkede (pr. 1. jun. 2026). PMINDIAKK har en 12m-gate på periode/embed, og der er ingen 1m/3m. Der er intet benchmark-claim. AI-mærkning er til stede. Omkostningssiden siger ærligt "ikke et beregnet ÅOP".

## 2026-10-16 00:51 CEST · cyklus 13 (main `883e616`, delta)

Ikke juridisk rådgivning. Det eneste ændrede indhold er `unique-metrics.json`, hvor der er +67 linser. Jeg har grep'et dem alle og crawlet 28 live-sider/selskabssider ved 375 og 1280.

### De nye linser ✅ (ingen blokering)
- Der er 0 hits på køb/sælg-opfordring, garanteret, kursmål, procenter, "forvent", "potentiale", "overvægt" og "øger eksponering". "anbefal" står kun i Spotify-hintet ("anbefalinger bygger på data", om produktet). Affirm ("Lån ved køb") handler om produktet. Begge er OK.
- Alle 67 har `ai: true` på "Hvad ejer man?" og "Hold øje med". Hvert hint siger "Eksponering, ikke rating" eller "Forhold, ikke en prognose".
- SHOULD: der er ukilderede superlativer: TSMC "Verdens største chipfabrik på kontrakt" og Alibaba "en af Kinas største cloud-udbydere". De er faktuelt rimelige, men tilføj en kilde/dato eller blødgør dem ("en af de største").

### MUST (åbne, uændret, men "Mads følger" er bredere end antaget)
1. **Ingen markedsføringsmærkning.** "markedsføring" står på 0 af de crawlede sider.
2. **"Mads følger" + tickers står på selskabssider generelt, ikke kun på SoftBank.** Det står også på TSMC (2), Affirm (2) og Spotify (2), fordi "Hvad siger X" vælger opslag efter tema ("Vist fordi: chips"). På TSMC-siden står fx FundaAI "$ORCL and $CRWV face a repricing of credit risk … pressure on neoclouds' purchasing power" med chips ORCL/CRWV/SoftBank og "MADS FØLGER", dateret 15. okt. 2026. Det er efter snapshottet 1. jun. og står ved siden af "Vægt i PMINDI 0,13 %". Rettelsen er stadig ét sted: `js/x-feed.js:339`. Overvej også at fjerne "Hvad siger X" fra selskabssider.
3. ndi-paa-x og nyhedsarkiv mangler tabsadvarsel ("kan tabe": 0). Det samme gælder omkostninger (0).
4. PMINDIAKK-NAV før 12 mdr. på sammenlign. 5. ÅTD "afventer" + ugatet graf-takeaway. Ingen af dem er re-verificeret som lukket i denne cyklus.

### SHOULD
- **Vægt over tid på selskabssider:** TSMC "3,94 % (1. dec. 2023) → 0,13 % (1. jun. 2026)". Det er forsinket og historisk og derfor OK efter reglen om forsinkelse. Men sammen med de aktuelle X-opslag ovenfor kan det læses som en fortælling om "salg". Hold X væk fra de sider, der viser vægthistorik.
- Uændret: KID-link mangler i renderet tekst på værdikæder, vaerdikaede, drawdown, temaer, idéer, ndi-perspektiv, selskaber, periode og nyhedsarkiv. "Central Information Dokument" står stadig i footer (brug "Dokument med central information"). "BREAKING:"-opslag står på SoftBank, Affirm, Spotify og ndi-paa-x.

### OK ✅
- Beholdning pr. 1. jun. 2026 er tydelig. SRI 5/7 og KID-links står i footer på selskabssider. Der er 0 hits på garanteret/"køb nu"/"øger eksponering" i renderet tekst. Omkostningssiden siger ærligt, at det ikke er et beregnet ÅOP.

## 2026-10-16 01:05 CEST · cyklus 14 (main `6592e79`, delta)

Ikke juridisk rådgivning. Jeg har crawlet 28 live-sider (375/1280) og grep'et renderet tekst. Pages er lig med main.

### MUST (åbne)
1. **Ingen markedsføringsmærkning.** "markedsføring" står på 0 af 28 sider. Uændret.
2. **"Mads følger" + tickers** på fonden, selskabssider og tema.html?slug=chips (SoftBank 3, chips 4). Kilden er stadig `js/x-feed.js:339`. Nyt: ndi-paa-x (lane-X) har nu et filter med teksten "konti Mads følger" og et spor "SELSKAB · DIREKTE" for SoftBank/NVDA. Det er lige så meget en tilknytning mellem en person i NDI og navngivne tickers. Siden er i øjeblikket tom (se UX MUST), så det er ikke synligt live, men det kommer tilbage, når x-feed.js merges.
3. **ndi-paa-x, nyhedsarkiv og omkostninger mangler "kan tabe"** (0 hits). Omkostninger er nu den mest besøgte FO-side (lane-X "fakta/omkostninger"). Tilføj standardlinjen.
4. PMINDIAKK: sammenlign viser stadig "Seneste NAV" for PMINDIAKK (inden 12 mdr.?). Ikke re-verificeret om NAV tæller som afkast. Bør afklares af NDI.
5. ÅTD + "Fonden steg +104,8 %" står stadig sammen med "afventer Fundmarket-godkendelse". Uændret.

### SHOULD
- **Rebalancering (ny):** "Bogen siger det samme for privatinvestorer: tag løbende lidt gevinst, når optimismen er høj … læg hellere til end tag fra, når stemningen er dårlig" og "Bogen råder privatinvestorer til …" er generelle adfærdsråd til læseren på en side for fonden. De er kilde-angivne og ikke produktspecifikke, så de er ikke en blokering. Skriv dog "bogen skriver", ikke "råder", og tilføj "Generel viden, ikke personlig rådgivning" ved citaterne. "Fonden rebalancerer løbende" er en påstand om fondens proces. Den skal stemme med prospekt/investeringspolitik og bør have en kilde.
- **Fakta: beregnede risikotal** (vol 32,46 %, Sharpe 0,89, max DD −35,82 %) er tydeligt mærket "Beregnet · ikke Fundmarket" ✅. Sharpe er afkast-afledt: hold "Historisk afkast er ikke en pålidelig indikator…" i samme boks (står nu kun i footer).
- **Omkostninger:** stadig ikke et ÅOP. Det er ærligt, men en FO-læser mangler "samlede omkostninger i alt". Når NDI har tallet fra KID, skal det stå først. 1,49 % + 0,64 % må ikke lægges sammen i UI (det gør siden heller ikke ✅).
- Uændret: KID-link mangler i renderet tekst på værdikæder, vaerdikaede, drawdown, temaer, idéer, ndi-perspektiv, selskaber, periode, nyhedsarkiv, lær/valuta og nu også lær/rebalancering (kid:0). "Central Information Dokument" i footer (brug "Dokument med central information"). "BREAKING:" på fonden og SoftBank.

### Rådgivningsord ✅
- "anbefal" og "overvægt" står kun i negationer ("ikke anbefaling eller bevidst overvægt") og i KID-sprog. 0 hits på garanteret, "køb nu", "øger eksponering", kursmål og "bedste".
- Invester trin 4 "Køb og omkostninger" er proces-beskrivelse (kurtage/platform), ikke en opfordring ✅.

### OK ✅
- Beholdning pr. 1. jun. 2026 er tydelig (også i risici, der nu skriver "beholdning pr." i stedet for "snapshot"). Ingen live trades. Ingen 1m/3m. Intet benchmark-claim (fakta: "Benchmark: Nej"). AI-mærkning er til stede. Temaforslag er mærket "forslag … afventer NDI-gennemgang".
