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

## 2026-10-16 01:08 CEST · cyklus 15 (main `6592e79`, re-verifikation)

Ikke juridisk rådgivning. Main og Pages er uændrede siden cyklus 14. Jeg har grep'et renderet tekst på 22 live-sider plus SoftBank- og NVIDIA-selskabssiden (efter scroll).

### MUST (alle åbne, re-verificeret)
1. **Ingen markedsføringsmærkning.** "markedsføring" står på 0 af 24 sider.
2. **"Mads følger" + tickers:** 3 på SoftBank (`JP3436100006`), 3 på NVIDIA (`US67066G1040`) og 4 på tema chips. Eksempel på NVIDIA: Milk Road AI, 11. okt. 2026, "$CRWV and $NBIS … especially $NVDA" + "MADS FØLGER". På fonden ved 1280 var der 0 i denne crawl (stadig "BREAKING" ×2). **Kommende risiko:** lane-X's `x-feed.js:419` har stadig `<span class="x-curated">Mads følger</span>`. Når filen merges for at reparere ndi-paa-x (se UX MUST), kommer mærket med. Fjern det eller omdøb det til en neutral kildeangivelse ("udvalgt af NDI's redaktion" eller ingen personnavn) i samme commit.
3. **"kan tabe" mangler** på omkostninger (0), nyhedsarkiv (0) og ndi-paa-x (siden er tom).
4. PMINDIAKK "Seneste NAV" på sammenlign. NDI bør afklare, om det er OK før 12 mdr.
5. ÅTD/"Fonden steg +104,8 %" står ved siden af "afventer Fundmarket-godkendelse". Uændret.

### SHOULD (uændret)
- KID-link: 0 i renderet tekst på værdikæder, drawdown, temaer, nyhedsarkiv, periode, idéer og ndi-perspektiv.
- Omkostninger: der er intet ÅOP/samlede omkostninger fra KID. Siden er ærlig ("ikke et ÅOP" ×7), men det er stadig et FO/persona-MUST, når tallet findes.
- "Bogen råder privatinvestorer" (rebalancering) bør skrives om til "bogen skriver" og have en linje om, at det ikke er rådgivning.

### OK ✅
- Beholdning pr. 1. jun. 2026. Ingen live trades. Ingen 1m/3m. Intet benchmark-claim. AI-mærkning er til stede (ndi-perspektiv, værdikæder, temaer). "Historisk afkast …" står på alle sider undtagen ndi-paa-x.

## 2026-10-16 01:15 CEST · cyklus 16 (main `7b7734a`, delta)

Ikke juridisk rådgivning. Jeg har grep'et renderet tekst på 34 live-sider ved 375 (Pages = main `7b7734a`).

### MUST (åbne)
1. **Ingen markedsføringsmærkning:** "markedsføring" står på 0 af 34 sider. Uændret.
2. **"MADS FØLGER" + tickers:** 10 hits på 3 sider (NVIDIA, SoftBank, tema chips), fx "MADS FØLGER · NVDA · CRWV · NBIS". Kilden er stadig `js/x-feed.js`. Fjern det eller gør det neutralt, når x-feed.js repareres.
3. **"kan tabe" mangler** på omkostninger, nyhedsarkiv og ndi-paa-x (tom). Alle andre 31 sider har linjen ✅.
4. PMINDIAKK: sammenlign viser "Seneste NAV 98,40 (14. okt. 2026)". Med første NAV synlig kan afkastet før 12 mdr. regnes ud. Teksten "Afkast vises efter 12 måneder" er god, men NDI bør afklare, om NAV må vises.
5. ÅTD/"+104,8 %" står ved siden af "afventer Fundmarket-godkendelse". Uændret.
6. **NY · SRI-forklaringen kan læses som uærlig.** `laer/risikoklasse.html` og ordlisten (`g-sri`) siger "Klasse 5 svarer til udsving på ca. 20 til 30 % om året", men risici og fakta viser "Volatilitet (ann.) 32,46 %" (beregnet) med link til siden. Efter sidens egen tabel ville det give klasse 6. Det skyldes sandsynligvis, at KID bruger VaR-ækvivalent volatilitet (VEV) over en anden periode og metode end den simple historiske std. Men siden siger det ikke, og en læser kan tro, at SRI er sat for lavt. Ret: (a) tilføj en sætning på risikoklasse og ved 32,46 % om, at KID's tal er VaR-baseret efter PRIIPs og over en anden periode, så den simple volatilitet ikke kan bruges til at slå klassen op; eller (b) skriv "klasse 5 dækker VEV 20–30 %" og drop "udsving pr. år" som synonym. Lad NDI/Fundmarket bekræfte, hvilket tal KID bygger på. Tabellens intervaller (0,5/5/12/20/30/80) og KID-ordene (lav … næsthøjeste) stemmer med PRIIPs bilag II ✅.

### SHOULD
- Risikoklasse: "Fondens KID anbefaler en investeringsperiode på mindst 5 år". Risici siger "Anbefalet investeringsperiode ifølge KID: 5 år". Brug KID's ordlyd ét sted (mindst/anbefalet), så de to ikke afviger.
- Rum-quiz: Q4 (SpaceX ~90 % af opsendelser, NDI 2024) er kilde-angivet og mærket "ikke som anbefaling" ✅. Ingen selskabs-ticker i svarene ✅.
- KID-link mangler stadig i renderet tekst på værdikæder, drawdown, temaer, idéer, nyhedsarkiv, periode, ndi-perspektiv, selskaber, vaerdikaede, lær/valuta, rebalancering og de 3 lær-FAQ-sider. "Central Information Dokument" står på 10 sider (brug "Dokument med central information").
- Omkostninger: der er stadig intet ÅOP/samlede omkostninger fra KID (FO/persona MUST, når tallet findes). "Bogen råder" på rebalancering er uændret.

### Rådgivningsord ✅
- 0 hits på garanter, "køb nu", "øger eksponering" og "bedste". "overvægt" står kun i negationer ("ikke … bevidste overvægte"). "anbefal" står i negationer og KID-sprog. "sikkert" står kun i "vinderne kan ikke udpeges sikkert" ✅.

### OK ✅
- Beholdning pr. 1. jun. 2026 (også i den nye ordliste-median). Ingen live trades. Ingen 1m/3m. "Fonden har intet fast benchmark". AI-udkast-mærket står 557 gange på 4 sider. Den nye PRIIPs-ordlistepost er korrekt og neutral.

## 2026-10-16 01:25 CEST · cyklus 17 (main `7b7734a`, re-verifikation)

Ikke juridisk rådgivning. Main og Pages er uændrede siden cyklus 16. Jeg har grep'et renderet tekst på 23 live-sider ved 375 og 1280 (efter scroll).

### MUST (alle åbne, re-verificeret)
1. **Ingen markedsføringsmærkning:** "markedsføring" står på 0 af 23 sider.
2. **"MADS FØLGER" + tickers: 12 hits på 4 sider** (SoftBank 3, NVIDIA 3, chips 4, **TSMC 2**, sidstnævnte ikke set i cyklus 16). docs/ er uændret, så forskellen skyldes sandsynligvis, hvilke kort der vælges ved rendering. TSMC viser fx "MADS FØLGER · ORCL · CRWV · SoftBank · 9984.T" lige før et kort fra @MadsC007. Når et kort med forvalterens navn står ved siden af tickers, ligner det endnu mere en anbefaling.
3. **"kan tabe" mangler** stadig på omkostninger, nyhedsarkiv og ndi-paa-x (siden er tom). Det står på alle andre 20 sider ✅.
4. PMINDIAKK: "Seneste NAV" vises på sammenlign før 12 mdr. NDI skal afklare det.
5. ÅTD/"+104,8 %" står ved siden af "afventer Fundmarket-godkendelse".
6. Forklaringen på SRI 5 kontra Vol 32,46 % mangler (risikoklasse, ordliste, risici, fakta).
7. (Fra cyklus 4, stadig åben) Alle opslag i `x-posts.json`, også de 4 fra @MadsC007 (forvalter), har label "ikke NDI's holdning". `chartMarkers` lægger stadig to @MadsC007-opslag (13. og 14. okt.) som markører i fondens afkastgraf (`docs/js/app.js:469`). Se cyklus 1 og 4.

### SHOULD (uændret)
- KID-link mangler i renderet tekst på værdikæder, drawdown, temaer, idéer, nyhedsarkiv, ndi-perspektiv og selskaber. Der er intet ÅOP fra KID på omkostninger. Siden er ærlig ("ikke et ÅOP" ×7), men det er stadig et FO/persona-MUST. "Bogen råder" på rebalancering er uændret.

### Rådgivningsord ✅
- Garanter, "køb nu", "øger eksponering" og "bedste tip": 0 hits. "overvægt" står kun i negationer ("ikke bevidste overvægte") på værdikæder, risici, temaer og chips.

### OK ✅
- Beholdning pr. 1. jun. 2026. Ingen 1m/3m. Intet benchmark-claim. "Historisk afkast" står på alle sider undtagen ndi-paa-x. Der er AI-mærkning.

## 2026-10-16 01:48 CEST · cyklus 18 (main `299e7a2`, delta)

Ikke juridisk rådgivning. Pages = `299e7a2`. Jeg har grep'et renderet tekst på 26 live-sider ved 375 og 1280 (efter scroll) og gennemgået diff'en `7b7734a..299e7a2` under docs/ (20 filer).

### MUST (åbne)
1. **Ingen markedsføringsmærkning:** "markedsføring" står 0 gange som mærkning. Det ene hit på ndi-perspektiv er "spilmarkedsføring" i en selskabsbeskrivelse. Uændret.
2. **"MADS FØLGER" + tickers: 14 hits på 5 sider** (SoftBank 3, NVIDIA 3, TSMC 2, tema chips 4, **tema energi 2 (ny)**). Fx "MADS FØLGER · NVDA · CRWV · NBIS". Kilden er stadig `js/x-feed.js`. Antallet stiger, fordi kortene vælges ved rendering. Fjern personnavnet eller gør det neutralt.
3. **"kan tabe" mangler** på omkostninger, nyhedsarkiv og ndi-paa-x (tom). Det står på alle andre 23 sider ✅.
4. PMINDIAKK: sammenlign viser "Seneste NAV 98,40 (14. okt. 2026)" sammen med "Første NAV 5. dec. 2025". Et afkast før 12 mdr. kan regnes ud (ca. −1,6 %, hvis start-NAV var 100). Den nye tidslinje på Idéer («Tre ure») siger korrekt, at der kun vises seneste kurs og intet afkast. NDI skal stadig afklare, om NAV må stå.
5. ÅTD og "Fonden steg +104,8 %" står på fonden ved siden af "ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse". Uændret.
6. **SRI 5 kontra vol 32,46 %:** uændret. Risikoklasse siger stadig "Udsving på 25 % … Klassen dækker udsving fra 20 til 30 % pr. år. Det er fondens klasse", mens risici og fakta viser 32,46 %. Forklar VEV/PRIIPs-metoden, eller drop "udsving pr. år" som synonym.
7. `chartMarkers` med @MadsC007-opslag i fondens afkastgraf og label "ikke NDI's holdning" på forvalterens egne opslag. Uændret (se cyklus 1, 4 og 17).

### SHOULD
- **Omkostninger: delvist bedre.** Ordlisten har nu `g-aaop` ("NDI Analytics regner ikke ÅOP ud. Fondens officielle omkostningstal står i KID") og `g-skat` ("Siden giver ikke skatterådgivning") ✅. Invester trin 4 og FAQ siger "før skat" ✅. Men det samlede omkostningstal fra KID står stadig ikke nogen steder. Det er stadig et persona/FO-MUST, når NDI har tallet.
- **Ny ordlistepost "Anbefalet investeringsperiode":** "Det er ikke en garanti for et positivt afkast efter 5 år" ✅. "Ingen markedsbeskyttelse: … kan tabe en del af eller hele din investering" ✅. Det er en god risikotekst.
- Idéer «Hvad står der i tallet?» er uden tal og slutter med "Ikke rådgivning" og "Officielle omkostningstal står i KID" ✅.
- `unique-metrics.json` +41 linse-selskaber: grep efter køb/sælg/anbefal/kursmål/upside/billig/undervurderet giver 0 rådgivningshits. Alle hints er "Eksponering, ikke rating" eller "Forhold, ikke en prognose" ✅. Krypto-selskaber (ether/solana-beholdning) og eToro-hintet ("mulighed for at kopiere andre brugeres porteføljer") er beskrivende, ikke en opfordring ✅. Temaforslag er mærket "Afventer NDI-gennemgang" ✅.
- Uændret: KID-link mangler i renderet tekst på værdikæder, drawdown, temaer, nyhedsarkiv, ndi-perspektiv og selskaber (kid:0). "Bogen råder privatinvestorer" står stadig på rebalancering (l. 72). "BREAKING:" ×2 på fonden og SoftBank.

### Rådgivningsord ✅
- Garanter, "køb nu", "øger eksponering" og "bedste tip": 0 hits. "overvægt" står kun i negationer ("ikke bevidste overvægte") på værdikæder, risici, temaer og tema-sider. Værdikæde-tilføjelserne (Expand, Tanbreez, York, Karman, Redwire, MDA, Planet) er daterede, efter beholdningen og afgrænsede ("ikke en mine i drift", "sender ikke selv") ✅.

### OK ✅
- Beholdning pr. 1. jun. 2026 (også i «Tre ure»). Ingen live trades. Ingen 1m/3m. "Fonden har intet fast benchmark". AI-mærkning er til stede. "Historisk afkast …" står på alle sider undtagen ndi-paa-x.

## 2026-10-16 01:40 CEST · cyklus 19 (main `3103bf8`, delta)

Ikke juridisk rådgivning. Pages = `3103bf8`. Jeg har grep'et renderet tekst på 23 live-sider ved 375 og 1280 (efter scroll) og gennemgået `299e7a2..3103bf8` under docs/ (ideer, kort, laer/udbytte-vs-akk, ndi-paa-x, ndi-perspektiv, om-data).

### MUST (åbne)
1. **Ingen markedsføringsmærkning:** "markedsføring" står 0 gange som mærkning. Uændret.
2. **"MADS FØLGER" + tickers:** nu **ndi-paa-x ×10** (siden virker igen), SoftBank 3, TSMC 2 og tema energi 2. Fx "MADS FØLGER · @FundaAI … $CRWV and $NBIS … especially $NVDA". Tredjepartsopslag om porteføljeselskaber med forvalterens navn ved siden af kan læses som forvalterens synspunkt. Gør mærket neutralt ("Fulgt konto"), eller fjern det.
3. **"kan tabe" mangler** stadig på **ndi-paa-x**, omkostninger og nyhedsarkiv (0 hits). ndi-paa-x har heller ikke "Historisk afkast …". Siden har "Ikke investeringsrådgivning" og "ikke NDI's holdning" ✅, men den nævner $PMINDI og udbytte 38,00 kr. Tilføj den faste risikolinje.
4. PMINDIAKK "Seneste NAV 98,40" på sammenlign før 12 mdr. Uændret. NDI skal afklare.
5. ÅTD og "+104,8 %" ved siden af "afventer Fundmarket-godkendelse". Uændret.
6. **SRI 5 kontra vol 32,46 %:** uændret. Tallet står stadig på risici og fakta, mens laer/risikoklasse siger "klasse 5 dækker udsving fra 20 til 30 % pr. år".
7. `chartMarkers` med @MadsC007 i fondens afkastgraf, og label "ikke NDI's holdning" på forvalterens egne opslag. Uændret.

### Nyt i denne cyklus
- **ndi-paa-x er live igen:** "Udvalgte offentlige opslag — ikke NDI's holdning" øverst og nederst, og "erstatter ikke KID eller prospekt" ✅. Men @CHornskov-opslaget fra 8. maj 2025 ("Begge er også i $PMINDI", IONQ/QBTS) viser beholdning uden for den forsinkede beholdningsramme. Det er offentligt og gammelt, men datér det tydeligt ("opslag fra maj 2025, ikke nuværende beholdning"), så det ikke undergraver "beholdning pr. 1. jun. 2026". SHOULD.
- **Idéer «To klasser, samme temaer»:** "Viser eksponering, ikke en anbefaling og ikke dagens fordeling" og "pr. 1. jun 2026" ✅. Der er intet afkast for PMINDIAKK ✅. Men "Forskellen mellem klasserne ligger derfor især i udbyttet" udelader forskellen i porteføljetransaktionsomkostninger (0,64 % mod 0,72 % på omkostninger). Det er en omkostningsudeladelse i en sammenligning af produkter. Skriv "udbyttet og en lille forskel i omkostninger". SHOULD+. 345 mod 320 selskaber skal forklares (se UX).
- Ordliste 105 (Energi, High growth): neutral, ingen rådgivningsord ✅.

### SHOULD (uændret)
- Intet samlet omkostningstal fra KID (persona/FO-MUST, når NDI har tallet). Omkostninger siger ærligt "ikke et ÅOP" ✅.
- KID-link mangler i renderet tekst på nyhedsarkiv (KID 0), værdikæder, drawdown, temaer, ndi-perspektiv og selskaber. "BREAKING:" ×2 på fonden, SoftBank og ndi-paa-x. "Bogen råder" på rebalancering.

### Rådgivningsord ✅
- Garanter, "køb nu", "øger eksponering" og "bedste tip": 0 hits. "overvægt" står kun i negationer ("ikke … bevidst overvægt") på værdikæder, temaer, tema energi og risici. "køb" ×2 på invester er proces ("køb via din bank"), ikke en opfordring.

### OK ✅
- Beholdning pr. 1. jun. 2026 overalt (top-10: "Eksponering, ikke anbefaling"). Ingen 1m/3m på PMINDI. Intet benchmark-claim. PMINDIAKK: "Afkast vises først med 12 måneders historik" på udbytte-vs-akk ✅. AI-udkast er mærket. Drawdown har "Historisk afkast …" og "kan tabe" ✅.

## 2026-10-16 01:35 CEST · cyklus 20 (main `a664f4f`, delta)

Ikke juridisk rådgivning. Pages = `75a87c2`. Jeg har grep'et renderet tekst på 21 live-sider ×2 og 3 selskabssider. Det eneste docs-delta er `docs/selskab.html` (summary-empty-state).

### MUST (åbne, uændrede tal)
1. Ingen "markedsføring"-mærkning (0 hits som mærkning; ndi-perspektiv har 1 hit i brødtekst).
2. "MADS FØLGER": ndi-paa-x ×10, SoftBank ×3, TSMC ×2. Gør mærket neutralt eller fjern det.
3. "kan tabe" er stadig 0 på **ndi-paa-x, omkostninger og nyhedsarkiv**. ndi-paa-x har også 0 "Historisk afkast".
4. PMINDIAKK NAV 98,40 på sammenlign før 12 mdr. NDI skal afklare.
5. ÅTD / +104,8 % ved siden af "afventer Fundmarket-godkendelse".
6. SRI 5 mod vol 32,46 % (risici og fakta) mod laer/risikoklasse "20–30 %".
7. `chartMarkers` @MadsC007 i afkastgrafen.

### Nyt i denne cyklus
- **Selskab-empty-state:** "Beskrivelse mangler" er erstattet med en neutral tekst ✅, og "Generel information. Ikke en anbefaling." står der stadig ✅. **Men AI-mærkningen er nu forkert den anden vej:** "AI-udkast" og "kort beskrivelse genereret med AI" vises over et felt *uden* AI-tekst (TSMC, Lumentum). Mærkningen skal følge indholdet. SHOULD+, fordi det undergraver troværdigheden af AI-mærkningen, som er et krav.
- Hvis linsens "Hvad ejer man?"-tekst bruges som fallback (se UX), skal den beholde sit eget AI-udkast-mærke og sin kilde.

### SHOULD (uændret)
- Intet samlet KID-omkostningstal (persona/FO-MUST, når NDI har tallet). Omkostninger siger ærligt "ikke et ÅOP" ✅.
- KID-link mangler i renderet tekst (0 hits) på drawdown, værdikæder, temaer, nyhedsarkiv, selskaber, ndi-perspektiv og periode. "BREAKING:" ×2 på ndi-paa-x og SoftBank. Det gamle @CHornskov-opslag ("Begge er også i $PMINDI") bør dateres. Idéer «To klasser» udelader omkostningsforskellen.

### Rådgivningsord ✅
- Garanter, "køb nu", "øger eksponering", "bedste tip" og "sikker gevinst": 0. "anbefal…" står kun i negationer ("ikke en anbefaling") på invester og om-data. "overvægt" står kun i negationer (værdikæder ×2, temaer, risici).

### OK ✅
- Beholdning pr. 1. jun. 2026 (forsinket) på selskab og top-10. Ingen 1m/3m på PMINDI. Intet benchmark-claim. Drawdown og fakta har "Historisk afkast …" + "kan tabe". AI-udkast er mærket (se dog ovenfor).

## 2026-10-16 01:40 CEST · cyklus 21 (main `a664f4f`, intet docs-delta)

Ikke juridisk rådgivning. Pages = `75a87c2` (docs er identiske med main). Jeg har grep'et renderet tekst live på 24 sider ×2 (375/1280), inkl. `?view=fonden` med PMINDIAKK-toggle.

### MUST (åbne, re-verificeret)
1. Ingen "markedsføring"-mærkning (0 hits som mærkning; 1 hit i brødtekst på ndi-perspektiv).
2. "MADS FØLGER": ndi-paa-x ×7 (roterer, var 10) og SoftBank ×3. Gør mærket neutralt.
3. "kan tabe" er 0 på **ndi-paa-x, omkostninger og nyhedsarkiv**. ndi-paa-x har også 0 "Historisk afkast".
4. **PMINDIAKK NAV 98,40 står nu to steder:** sammenlign og fonden (PMINDIAKK-toggle, som stort KPI-tal "Seneste NAV 98,40"). Toggle-teksten "Afkast vises efter 12 måneder" er korrekt ✅. Men NAV-tallet sammen med "første NAV 5. dec. 2025" gør et afkast før 12 mdr. let at regne ud. NDI skal afklare, om NAV må stå.
5. ÅTD (+4,0 % som KPI) og +104,8 % står ved siden af "ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse". Enten er det godkendt, og så skal teksten væk, eller også skal tallene skjules.
6. SRI 5 mod vol 32,46 % mod laer/risikoklasse "20–30 %".
7. `chartMarkers` @MadsC007 i afkastgrafen.

### SHOULD (nyt)
- **Invester har tre "trin 4"** (merge-rest, se UX). To af dem siger "Køb og omkostninger". Det er ikke en opfordring (procestekst), men gentagelsen af "Køb" lige over KID-tabellen ser presset ud. Behold én.
- **"Central Information Dokument"** i fodnoten (index ×2, data.js) er ikke PRIIP-forordningens danske titel ("Dokument med central information"). Brug den officielle titel, så linket svarer til dokumentet.

### SHOULD (uændret)
- Intet samlet KID-omkostningstal (persona/FO-MUST, når NDI har tallet). Invester trin 4 linker til "officielle omkostningstal" ✅. Omkostninger siger "ikke et ÅOP" ✅.
- KID-link mangler (0 i renderet tekst) på vaerdikaeder, drawdown, temaer, nyhedsarkiv, ndi-perspektiv, periode og selskaber. "BREAKING:" ×2 på fonden og ndi-paa-x. @CHornskov-opslaget "Begge er også i $PMINDI" skal dateres. Idéer «To klasser» udelader omkostningsforskellen. "AI-udkast" står over et tomt felt på selskab.

### Rådgivningsord ✅
- "garanter…", "køb nu", "øger eksponering" og "bedste tip": 0. "anbefal…" står kun i negationer/KID-citat ("KID'et anbefaler mindst 5 års investeringsperiode", "ikke en anbefaling"). "overvægt" står kun i negationer. "Nasdaq" står kun som "børsnoteret hos Nasdaq Copenhagen" (handelssted), ikke som benchmark ✅.

### OK ✅
- Beholdning pr. 1. jun. 2026 er tydelig i topbaren på fonden ("forsinket snapshot"). Ingen live trades. Ingen 1m/3m. "Fonden har intet fast benchmark" står på fonden og fakta. Invester har "Ikke rådgivning", "kan tabe" og "Historisk afkast …" og KID-tabel for begge klasser ✅.

## 2026-10-16 01:43 CEST · cyklus 22 (main `a664f4f`, intet docs-delta)

Ikke juridisk rådgivning. Pages = `75a87c2`. Jeg har grep'et renderet tekst live på 17 sider ved 375 efter scroll. Alle tal er identiske med cyklus 21.

### MUST (åbne, re-verificeret)
1. Ingen "markedsføring"-mærkning (0 på alle 17 sider).
2. "MADS FØLGER": ndi-paa-x ×7 og SoftBank ×3.
3. "kan tabe" er 0 på **ndi-paa-x, omkostninger og nyhedsarkiv**. ndi-paa-x har også 0 "Historisk afkast".
4. PMINDIAKK NAV 98,40 står på sammenlign og fonden-toggle før 12 mdr. NDI skal afklare.
5. ÅTD og +104,8 % står ved siden af "afventer Fundmarket-godkendelse".
6. SRI 5 mod vol 32,46 % mod laer/risikoklasse "20–30 %".
7. `chartMarkers` @MadsC007 i afkastgrafen.

### Nyt tjek i denne cyklus
- **Fremadskuende udsagn:** jeg har søgt efter "vil stige/vokse/give", "forventer afkast", "potentiale for", "kursmål" og "upside" på 17 sider: 0 hits ✅.
- **"anbefal…/overvægt" i kontekst:** temaer siger "Ikke anbefalinger eller bevidste overvægte", risici "ikke bevidste overvægte og ikke anbefalinger" og vaerdikaeder "ikke bevidste overvægte". SoftBank har "anbefalet investeringshorisont på 5 år ifølge KID". Alt er negationer eller KID-citat ✅.
- **KID-link i renderet tekst** er stadig 0 på vaerdikaeder, drawdown, temaer og nyhedsarkiv (SHOULD).

### SHOULD (uændret)
- Intet samlet KID-omkostningstal (persona/FO-MUST, når NDI har tallet). Omkostninger siger "ikke et ÅOP" ✅. Invester har tre "trin 4" (to af dem "Køb og omkostninger"). Fodnoten skal bruge den officielle KID-titel. "BREAKING:" ×2. @CHornskov-opslaget "Begge er også i $PMINDI" skal dateres. Idéer «To klasser» udelader omkostningsforskellen. "AI-udkast" står over et tomt felt på selskab.

### OK ✅
- Beholdning pr. 1. jun. 2026, ingen live trades, ingen 1m/3m på PMINDI og intet benchmark-claim. "kan tabe" og "Historisk afkast" står på entré, fonden, invester, fakta, drawdown, risici og sammenlign. AI-udkast er mærket på selskab (×10 på SoftBank).

## 2026-10-16 01:50 CEST · cyklus 23 (main `ff29ec5`, intet docs-delta)

Ikke juridisk rådgivning. Pages er samme build som i cyklus 22. Nyt i denne cyklus: jeg har hentet og læst begge KID-PDF'er (produktionsdato 2026-08-14), tjekket alle eksterne links og repo/data-eksponering, og kørt Playwright ved 1280 på 20 sider.

### MUST (nyt / skærpet)
8. **Repoet er stadig offentligt (re-verificeret 01:47).** api.github.com svarer 200 uden login, og `raw.githubusercontent.com/.../main/notes/VIDENSBOT-krav.md` svarer 200. Det er VIDENSBOT-live-checkens blokering 1 fra 21:55, og den er uændret. Alle interne noter er offentlige, også disse reviews, persona-filerne og STATUS. Det er en fortroligheds- og governancesag snarere end markedsføringsret, men det er en blocker før et udkast deles. Beslutningen ligger hos Christian (privat repo eller separat Pages-repo, og evt. omskrivning af historikken, som er destruktiv).
9. **Omkostninger: KID'ets PRIIP-omkostningsindikator gengives ikke.** KID'et viser en årlig omkostningsmæssig konsekvens på **2,79 % (PMINDI) / 2,85 % (PMINDIAKK)** ved 5 år og 2,63 %/2,71 % ved 1 år. Siden viser postsatser (1,49 / 0,64 / 0,72 / 0,25 / 0,25) uden noget samlet tal. Marketingmateriale må ikke give et mere gunstigt indtryk af omkostningerne end KID'et. Når kun postsatser vises og 1,49 % står mest fremtrædende, er der risiko for netop det. Gengiv KID-tallet med kilde, dato og "før kurtage/depot". Dette erstatter det tidligere SHOULD "intet samlet KID-omkostningstal": nu er tallet kendt, og det er en MUST.

### MUST (åbne, uændrede fra cyklus 22)
1. Ingen "markedsføring"-mærkning. (Hittet på ndi-perspektiv er "spilmarkedsføring" i en selskabsbeskrivelse, altså et falsk positiv.)
2. "MADS FØLGER" står på ndi-paa-x ×7 og SoftBank ×3.
3. "kan tabe" er 0 på ndi-paa-x, omkostninger og nyhedsarkiv (re-verificeret ved 1280). ndi-paa-x har også 0 "Historisk afkast".
4. PMINDIAKK NAV 98,40 står før 12 mdr. (sammenlign, fonden-toggle).
5. ÅTD og +104,8 % står ved siden af "afventer Fundmarket-godkendelse".
6. SRI 5 mod vol 32,46 %. KID'et klassificerer selv 5/7 ("middel-høj"), og scenarierne bruger et teknologiindeks som proxy før startdatoen. Siden gengiver KID'ets 5 ærligt ✅. Problemet er stadig, at laer/risikoklasse-teksten "20–30 %" står ved siden af en vist vol over 30 %. Forklar, at KID'ets SRI er beregnet efter PRIIP-metoden på en anden periode.
7. `chartMarkers` @MadsC007 i afkastgrafen.

### Lukket ✅
- **Kvartalsbeholdning:** `data/company-months.json` er nu kun kvartalsslut (Mar/Jun/Sep/Dec) med cutoff 2026-06-01 og note "Forsinket snapshot". Det er live på Pages. VIDENSBOT-live-checkens blokering 2 er dermed løst. positionsAsOf = 2026-06-01 ✅.

### OK ✅
- KID-links: begge PRIIP-PDF'er svarer 200 (application/pdf). Det gør de to Fundmarket-produktsider og fællesprospektet (opdateret 24.10.2025) også. KID-ISIN DK0062499810/DK0064642623 stemmer med siden.
- KID'ets scenarie-afkast (fx "25,42 % før omkostninger") gengives ikke på siden ✅. Det skal blive sådan.
- Ingen fremadskuende udsagn og ingen rådgivningsord, som i cyklus 22.

## 2026-10-16 02:00 CEST · cyklus 24 (main `90e7de8`, intet docs-delta)

Ikke juridisk rådgivning. Docs er samme build som i cyklus 22–23. Nyt i denne cyklus: embed, periode, laer (5 sider), kort, selskaber, tema og vaerdikaede ved 320 px live. Alle 1.007 interne links svarer 200.

### MUST (nyt)
10. **Afkast for perioder under 12 måneder vises som kalenderår.** Periode viser "2023: +16,7 %", men serien starter 22. sep. 2023, så tallet dækker 3 måneder. "2026: +4,0 %" og "YTD: +4,0 %" er heller ikke hele år. Embed og fonden viser også "År til dato +4,0 %". ESMA's retningslinjer om markedsføringsmateriale (ESMA34-45-1272, afsnit om tidligere resultater) henviser til MiFID-delegeret forordning 2017/565 art. 44(4). Ifølge den skal historiske resultater vises for **komplette 12-månedersperioder**. Mit forslag er at fjerne 2023 som selvstændigt år (eller mærke det "delperiode, 22.9.–31.12.2023, ikke et helt år") og at fjerne ÅTD fra embed og periode. Det skærper MUST 5 (ÅTD ved "afventer Fundmarket-godkendelse"). Jurist/NDI skal bekræfte, om ÅTD kan beholdes som "seneste kurs"-information.
11. **Embed-grafen er materiale, der kan stå alene, men den mangler KID-reference.** `embed/chart.html` linkes fra footeren ("Embed-graf") og fra kort. Den viser +104,8 %, CAGR +26,4 % og ÅTD med "Historisk afkast …" og "kan tabe" ✅. Men den har **0 KID-links, ingen SRI, ingen henvisning til prospekt og ingen "markedsføringsmateriale"-mærkning**. Hvis den embeddes andre steder, er den en selvstændig markedsføringsmeddelelse. Tilføj en linje med "SRI 5/7 · KID · Prospekt · Markedsføringsmateriale" under grafen, eller fjern embed-linket fra footeren, indtil det er på plads.

### SHOULD (nyt)
- **CAGR +26,4 % ved siden af "3,1 år siden start"** (embed og periode). CAGR over en kort periode med stærk start (2024 +46,4 %) giver let et for gunstigt indtryk. Vis kalenderårs-tabellen først og CAGR sekundært, eller skriv "Gns. pr. år i perioden 22.9.2023–14.10.2026 · ikke en forventning".
- **Laer/udbytte-vs-akk og laer/forsinket-beholdning har 0 KID-links**, men har risikolinjen ✅.

### MUST (åbne, uændrede)
1. Ingen "markedsføring"-mærkning (generelt, nu også #11).
2. "MADS FØLGER" står på ndi-paa-x ×7 og SoftBank ×3.
3. "kan tabe" er 0 på omkostninger (re-verificeret i denne cyklus), ndi-paa-x og nyhedsarkiv.
4. PMINDIAKK NAV 98,40 står før 12 mdr.
5. ÅTD og +104,8 % står ved siden af "afventer Fundmarket-godkendelse" (se #10).
6. SRI 5 mod laer-teksten "20–30 %" og vol 32,46 %.
7. `chartMarkers` @MadsC007.
8. Repoet er offentligt, så noterne er offentlige. Christian skal tage beslutningen.
9. KID'ets omkostningstal 2,79 %/2,85 % gengives ikke.

### OK ✅
- Embed ignorerer `?periode=1m`, så der vises ingen 1m på PMINDI ✅. Periode viser "Fonden har intet fast benchmark" ✅. Beholdning pr. 1. jun. 2026 er uændret ✅. AI-mærkning er uændret (selskab, tema, vaerdikaede).
- Risikolinjen "Historisk afkast … kan tabe" står på alle 5 laer-sider, periode, kort, selskaber, tema, embed og invester.

## 2026-10-16 01:57 CEST · cyklus 25 (main `90e7de8`, intet docs-delta)

Ikke juridisk rådgivning. main/docs og Pages er samme build som i cyklus 22–24 (Last-Modified 23:49 GMT). Live ved 375 (16 sider, inkl. `?view=fonden/portefolje/udforsk`): 0 pageerrors, 0 overflow, én h1 pr. side. Nyt i denne cyklus: **for-merge-tjek af de seks lane-grene** (A, B, C, D, E, X), så compliance-problemer kan fanges før merge.

### Lane-grene før merge
- **lane-C: lukker delvist MUST 6 (SRI mod udsving).** `laer/risikoklasse.html` får "Den er ikke det samme som et simpelt udsvingstal. KID'et regner udsvinget efter EU's egen metode og periode …", og risici får "Hvorfor passer tallet ikke med risikoklassen?" ✅. Skyderteksten "Klassen dækker udsving fra 20 til 30 % pr. år" står stadig. Når lane-C er merget, betragter jeg MUST 6 som lukket, hvis forklaringen står på samme skærm som 32,46 %. Ny `laer/indre-vaerdi.html` og `laer/laes-grafen.html` har "Historisk afkast … kan tabe" ✅ og "Tænkte tal, ikke fondens" ✅. Ingen rådgivningsord.
- **lane-X: halvt fremskridt på MUST 2, intet på MUST 9.** Overskriften "MADS FØLGER" bliver til sporet "Konti Mads følger · Udvalgte offentlige opslag — ikke NDI's holdning" ✅. Badgen `<span class="x-curated">Mads følger</span>` (`x-feed.js:506`) står stadig på hvert opslag, og den ender i versaler, hvis CSS'en uppercaser den. Foreslået tekst: "Fra en konto, Mads følger · ikke NDI's holdning". Ny fodnote: "ikke investeringsrådgivning og erstatter ikke KID eller prospekt" ✅. ndi-paa-x har dog stadig **0 "kan tabe"**. **Omkostninger på lane-X** gentager "Ikke et ÅOP" ×8 og udbygger blokken om forskellen på 0,08 pp. KID'ets **2,79 %/2,85 %** står stadig ikke på siden (0 hits på grenen), og "kan tabe" er stadig 0. Det er altså i den modsatte retning af MUST 9. Siden siger meget om, hvad tallet *ikke* er, men aldrig hvad KID'et siger, at det koster.
- **lane-D (embed):** kun graf og akser. **MUST 11 er uændret på grenen** (ingen KID, SRI eller mærkning).
- **lane-A (vaerdikaeder kvante/råstoffer):** Mads-udsagn har BLOG-dato som kilde. Prognoser fra tredjepart er mærket "ikke Mads' og ikke NDI's prognose" ✅. "ikke en rangering og ikke en anbefaling" ✅. Ingen handelssprog.
- **lane-B / lane-E:** selskabsbeskrivelser. Hændelser efter 1. jun. 2026 (GESA 6. jul., salg af medicinforretningen 3. aug.) er eksplicit mærket "efter beholdningen" ✅. "Eksponering, ikke anbefaling" ✅.

### MUST (åbne på main, uændrede)
1. Ingen "markedsføringsmateriale"-mærkning (0 på 16 sider live).
2. "MADS FØLGER" ×7 på ndi-paa-x (lane-X forbedrer det delvist).
3. "kan tabe" er 0 på omkostninger og ndi-paa-x live (re-verificeret ved 375).
4. PMINDIAKK NAV 98,40 står før 12 mdr.
5. ÅTD ved "afventer Fundmarket-godkendelse": fonden ×4, periode ×3, embed ×2, drawdown ×1.
6. SRI 5 mod laer "20–30 %" og vol 32,46 % (lukkes sandsynligvis af lane-C).
7. `chartMarkers` @MadsC007.
8. Repoet er offentligt (Christians beslutning).
9. KID-omkostningstallet 2,79 %/2,85 % gengives ikke (0 hits live og 0 på lane-X).
10. Delperioder vises som år (2023, ÅTD).
11. Embed-grafen mangler KID, SRI og mærkning (også på lane-D).

### OK ✅
- KID-links: risici ×11, invester ×8, sammenlign ×4. "Historisk afkast" står på alle 16 sider undtagen ndi-paa-x. Beholdning pr. 1. jun. 2026. Ingen 1m/3m på PMINDI. Intet benchmark-claim.

## 2026-10-16 02:05 CEST · cyklus 26 (main `90e7de8`, intet docs-delta)

Ikke juridisk rådgivning. main/docs og Pages er uændrede siden cyklus 22. Jeg har kun lavet et for-merge-tjek af lane-commits efter 01:57 (grep af `+`-linjer for rådgivnings- og handelsord, benchmark, 1m/3m, AI-mærkning og omkostninger).

### Lane-grene før merge
- **lane-X (`b58126a`): MUST 9 er stadig åben.** omkostninger: 2,79 = 0, "kan tabe" = 0, "Ikke et ÅOP" ×8. fakta: 2,79 = 0, "Ikke et ÅOP" ×4, og den nye strip viser "Øvrige løbende 1,49 %" som eneste omkostningstal. Risikoen er, at en læser opfatter 1,49 % som den samlede løbende omkostning, når KID'et siger 2,79 %/2,85 %. Det er værre end i cyklus 25, fordi tallet nu også står på fakta. ndi-paa-x: "kan tabe" er stadig 0 (MUST 3). Badgen `x-curated` "Mads følger" er uændret (`x-feed.js:538`) (MUST 2, delvis).
- **lane-C (`74e42c4`):** ideer har "Historisk afkast er ikke en pålidelig indikator … kan tabe" (×2) ✅. "Fonden har intet fast benchmark, så grafen står alene" ✅. "AI-udkast og mærket sådan" ✅. Møntspillet er "tænkte tal" og ikke fondens ✅. Ingen rådgivningsord.
- **lane-A (`2e5fe11`):** Musk-udsagnet er gengivet som "Musks udsagn, ikke NDI's forventning og ikke en prognose", med kilde ✅. Alle nye noter har "ikke en anbefaling/rangering" ✅.
- **lane-B (`28190f5`):** "Eksponering, ikke anbefaling" står ved temalisten ✅. asOf kommer fra `fund.positionsAsOf` ✅.
- **lane-D / lane-E:** der er ingen compliance-relevante tekstændringer. MUST 11 (embed uden KID/SRI) er uændret på lane-D.
- Grep over alle seks grene: **0** "køb/sælg", "sikker/garanti", "bedste", "overvægt", "øger eksponering", "1m/3m", "Nasdaq" og "BREAKING" i nye linjer ✅.

### MUST (åbne på main, uændrede: 1–11 som i cyklus 25)
Prioritet før merge af lane-X: **9** (KID-tal 2,79 %/2,85 % ved siden af hver postsats, også i fakta-strip) og **3** ("kan tabe" på omkostninger + ndi-paa-x).

## 2026-10-16 02:02 CEST · cyklus 27 (main `69c9033`, intet docs-delta)

Ikke juridisk rådgivning. main/docs er uændrede siden `90e7de8`. Pages blev genudrullet 00:00 GMT og er byte-ens med main på index/invester/omkostninger/selskab. Jeg har lavet et for-merge-tjek af lane-C `c7dae02` og lane-E `1972434`.

### Lane-grene før merge
- **lane-C (`c7dae02`): lukker MUST 6 (SRI mod simpelt udsving)** ✅. risikoklasse, faq og ordliste siger nu "målt efter KID-metoden" og "et simpelt tal over 30 % betyder ikke i sig selv, at klassen er forkert". Klasse 5 = 20–30 % passer til PRIIPs MRM-intervallet ✅. "Giver ekstra vægt til store fald" er en forenklet, men forsvarlig beskrivelse af Cornish-Fisher-VEV.
- **lane-C invester «hvem gør hvad»:** fortæller ærligt, at man ejer en andel og ikke aktierne. Den peger på prospektet som "det gældende dokument" ✅. **SHOULD:** at Fundmarket A/S er IFS og Danske Bank A/S er depotbank, er faktuelle påstande om fondens organisation. Verificér mod det gældende prospekt eller KID, før det merges (kilden er angivet som Fundmarkets produktside, 15. okt. 2026). "Holdet bag rådgiver om, hvilke selskaber fonden ejer" er korrekt formuleret som rådgiver, ikke forvalter ✅.
- **lane-C invester trin 4:** omkostningslinket og "efter løbende omkostninger, før skat" står nu i det samme trin ✅. KID-tallet 2,79 %/2,85 % mangler stadig (MUST 9).
- **lane-E (`1972434`) Oklo:** begivenheder efter asOf er dateret og markeret "efter beholdningen pr. 1. juni 2026" ✅. Der er kilde-URL'er til tre pressemeddelelser ✅. "ikke en vurdering af aktien" ✅.
- Grep af `+`-linjer på C og E: alle hits for køb/sælg/anbefal/garanti/sikker står i nægtende eller faktuel sammenhæng ("ikke en anbefaling", "aftalt at sælge medicinforretningen", "sikkerhedsvurdering") ✅. 0 hits for "overvægt", "øger eksponering", 1m/3m og Nasdaq ✅.

### MUST (åbne på main)
Uændret: 1–11 som i cyklus 25. Efter merge af lane-C forventes **6** lukket. Prioritet: **9** (KID-total 2,79 %/2,85 % på omkostninger, fakta-strip og invester trin 4), **3** ("kan tabe" på omkostninger og ndi-paa-x) og **11** (embed uden KID/SRI).

## 2026-10-16 02:15 CEST · cyklus 28 (main `69c9033`, intet docs-delta)

Ikke juridisk rådgivning. main/docs og Pages er uændrede (Pages 00:00 GMT). Jeg har lavet et for-merge-tjek af lane-E `4ecafbd`/`00c3c32` og lane-D `549158a`.

### Lane-grene før merge
- **lane-E:** begivenheder efter asOf er dateret og markeret "efter beholdningen" (Solaris/GESA 6. jul., BWXT 3. aug., Oklo 6. aug., Nano Nuclear 23. jun.) ✅. Kilde-URL'er til Tía María og HASTE ✅. Grep af `+`-linjer: "købt GESA", "aftalt at sælge medicinforretningen", "sikkerhedsanalyse" og "sikkerhedsvurdering" er faktuelle virksomhedshandlinger og ikke rådgivning ✅. 0 hits for "overvægt", "øger eksponering", 1m/3m og Nasdaq ✅.
- **SHOULD (lane-E):** de mange nægtelser ("ikke en mine i drift", "ikke et kraftværk") er ikke et compliance-problem i sig selv. Men gentagne afgrænsninger på en markedsføringsside kan læses som svar på påstande, der aldrig er fremsat. Hold det faktuelt og kortfattet. Et udsagn som "Tilladelser til byggeri er ikke en mine i drift" er korrekt, men skal kunne kildebelægges ordret ("Siden skriver …") ✅.
- **lane-E nyhedsarkiv:** nye linjer om selskabsbegivenheder efter 1. juni 2026 er nyheder om selskaberne og ikke om fondens handler ✅. Der står intet om, at fonden har købt eller solgt.
- **lane-D `549158a`:** kun CSS, ingen tekst. MUST 11 (embed uden KID/SRI) er uændret.

### MUST (åbne på main)
Uændret: 1–11 som i cyklus 25. **6** lukkes ved merge af lane-C. Prioritet: **9** (KID-total 2,79 %/2,85 % på omkostninger, fakta-strip og invester trin 4), **3** ("kan tabe" på omkostninger og ndi-paa-x) og **11** (embed uden KID/SRI).

## 2026-10-16 02:13 CEST · cyklus 29 (main `a34a733`, docs-delta: lane A–E + X merget)

Ikke juridisk rådgivning. Pages (00:09:59 GMT) svarer til main `a34a733`. Jeg har kørt Playwright live ved 375 px (37 URL'er) og grep i docs/ efter merge.

### Status pr. MUST
1. **Mærkning "markedsføringsmateriale":** 0 hits i docs/. **Åben.**
2. **"Mads følger" / tredjepartsopslag: skærpet.** X-panelet står nu også på `tema.html` (alle temaer) og `selskab.html`. Det er ikke længere kun ndi-paa-x. SoftBank viser to @BullTheoryio-opslag med "BREAKING:" (kapitalrejsning på 100 mia. $, garanti på 250 mia. $) og badgen "MADS FØLGER". tema energi/chips viser @FundaAI om "repricing of credit risk" for ORCL/CRWV/SoftBank, der er "Vist fordi: CRWV". "Ikke NDI's holdning" står der ✅. Men tredjepartsrygter om navngivne beholdninger ved siden af fondens vægt, med en badge der knytter dem til forvalterens rådgiver, kan læses som kurateret markedskommentar. Det gælder særligt i lyset af reglerne om markedsmisbrug/investeringsanbefalinger (MAR art. 20). **Anbefaling før næste demo:** fjern X-panelet fra tema/selskab, eller fold det sammen, fjern "MADS FØLGER"-badgen og filtrér "BREAKING"-opslag fra. Cyklus 26 talte "BREAKING" = 0 på grenene, men det er kommet med i merge `a34a733`/`688dc82`.
3. **"kan tabe":** omkostninger 0, ndi-paa-x 0. **Åben.** omkostninger har "historisk afkast"-linjen (1) men ikke tabsrisikoen. ndi-paa-x har ingen af dem.
4. **PMINDIAKK før 12 mdr.:** ingen afkasttal ✅ ("Vises efter 12 måneder fra 5. dec. 2026"). NAV 98,40 står på `?view=fonden&fund=PMINDIAKK` og sammenlign. Et NAV-niveau er ikke et afkast, men en læser kan regne −1,6 % ud. **Christians beslutning.** Jeg anbefaler at beholde NAV med "første NAV" og datoen ved siden af, eller fjerne det til 12 mdr.
5. **ÅTD "afventer Fundmarket-godkendelse":** står stadig på `?view=fonden` (ÅTD +4,0 % og 100.000 kr.-eksempel). **Åben.** Vis ikke tal, der ikke er godkendt.
6. **SRI mod udsving:** lukket med lane-C ✅ (risikoklasse: "målt efter KID-metoden").
7. **`chartMarkers` med @MadsC007:** "Udvalgte X-markører er offentl…" står stadig i grafen på fonden. **Åben** (som cyklus 25).
8. **Offentligt repo:** Christians beslutning, uændret.
9. **KID-omkostningstotal 2,79 %/2,85 %:** 0 hits i docs/ og live. **Åben, højeste prioritet** for persona familiekontor. Omkostninger har "ÅOP"/"løbende omkostninger" ×9, men intet samlet KID-tal.
10. **Delperioder som år:** delvis lukket ✅. Årstabellen siger "2023 delår" (22. sep.–31. dec. 2023), og chippen er "2023*". ÅTD 2026 står stadig som "2026"-chip uden "delår". **SHOULD**, ikke længere MUST.
11. **Embed uden KID/SRI:** `embed/chart.html` har "kan tabe" ✅ og "historisk" ✅, men KID-link = 0 og SRI = 0. **Åben.** Et embed, der deles ud af konteksten, er det stykke markedsføring, der mest har brug for KID-henvisningen.

### Nyt på main efter merge: OK ✅
- `laer/indre-vaerdi.html` og `laer/laes-grafen.html`: tænkte tal, "historisk afkast er ikke en pålidelig indikator", "intet fast benchmark", "efter løbende omkostninger, før skat og dine egne handelsomkostninger". Ingen rådgivningsord.
- "overvægt" ×5 står alle i nægtende/forklarende form ("ikke bevidste overvægte og ikke anbefalinger") ✅. Ingen "øger eksponering".
- 0 hits for "Nasdaq", "garanter", "bedste", "sælg " og "købe nu" i docs/ ✅. Ingen 1m/3m på PMINDI (embed/chart.js siger eksplicit "Aldrig 1 md / 3 md") ✅.
- Beholdning pr. 1. jun. 2026 "(forsinket)" står på tema, portefølje og fonden ✅. Hændelser efter asOf er daterede (lane-E) ✅.
- AI-mærkning: SoftBank ×10, ndi-perspektiv ×667, risici ×1 ✅.
- invester «hvem gør hvad» er merget. Verifikation af IFS/depotbank mod prospektet står stadig som SHOULD (cyklus 27).

### Prioritet
**2** (X-panel på produktsider, ny flade) → **9** (KID-total) → **5** (ÅTD uden godkendelse) → **3** ("kan tabe" på omkostninger/ndi-paa-x) → **11** (embed KID/SRI) → **1** (mærkning).

## 2026-10-16 02:17 CEST · cyklus 30 (main `e402f15`, docs-delta)

Ikke juridisk rådgivning. Pages (00:15:49 GMT) = main `e402f15`. Jeg har kørt Playwright live ved 375 på 24 URL'er med tekst-tælling og grep i docs/.

### Status pr. MUST
1. **"Markedsføringsmateriale"-mærkning:** 0 hits på alle 24 sider. **Åben.**
2. **Tredjepartsopslag / "MADS FØLGER": uændret på tema/selskab og nu også på fonden.** SoftBank-selskabssiden har "MADS FØLGER" ×3 + 2× "BREAKING" (@BullTheoryio). tema energi har "MADS FØLGER" ×2. ndi-paa-x har ×10. **Nyt:** `chartMarkers` i `x-posts.json` er skiftet fra @MadsC007 til bl.a. @BullTheoryio-opslag med "BREAKING". De vises under fondens hovedgraf på `?view=fonden` (BREAKING ×2). Det betyder, at tredjepartsrygter om navngivne beholdninger (SoftBank-kapitalrejsning, Nvidia-garanti) nu står direkte ved fondens afkastgraf. **Højeste prioritet.** Begræns grafmarkører til NDI's egne konti, og fjern "BREAKING"/"MADS FØLGER" fra produktsider.
3. **"kan tabe":** omkostninger 0, ndi-paa-x 0 (live re-verificeret). **Åben.** Entré-kortet lover "du kan tabe penge" på omkostninger, men siden har det ikke.
4. **PMINDIAKK før 12 mdr.:** ingen afkasttal ✅. NAV-niveau er uændret og afventer Christians beslutning.
5. **ÅTD +4,0 % og 100.000 kr.-eksempel "afventer Fundmarket-godkendelse"** står stadig på fonden (ÅTD ×4). **Åben.**
6. SRI mod udsving: lukket ✅.
7. **`chartMarkers` @MadsC007:** fjernet ✅, men erstattet af et værre problem (se 2).
8. Offentligt repo: Christians beslutning.
9. **KID-omkostningstal: regression i præsentation.** fakta viser nu "KID'ets årlige omkostningsmæssige konsekvens er **ikke oplyst** for PMINDI og **ikke oplyst** for PMINDIAKK ved 5 år", fordi `costs.kidRiy5y` mangler i `fund-facts.json`. Det er faktuelt forkert (KID'et oplyser 2,79 %/2,85 %) og kan læses som manglende PRIIP-oplysning. omkostninger.html er uændret: 0 hits for 2,79/2,85, og ankret `#kid-omkostning` findes ikke. `HANDOFF-CODEX.md` påstår, at "KID RIY på omkostninger" er landet. **Det er ikke sandt på main.** Ret data og omkostningssektion, eller fjern fakta-boksen, indtil tallet er der.
10. Delperioder: "2023*" med "delår" ✅. "2026"-chip og ÅTD er stadig delår uden mærkning (SHOULD).
11. **Embed uden KID/SRI:** KID-links 0. **Åben.**

### Nyt OK ✅
- "Største fald" i stedet for "Max drawdown" på fonden og fakta. AI-badge vises kun ved tekst (selskab). Der er ikke længere en tom "AI-udkast" ✅.
- Benchmark: "Fonden har intet fast benchmark. Vi tegner ikke en sammenligningskurve (fx Nasdaq)" ✅ (ingen benchmark-claim). **SHOULD:** "det er en compliance-beslutning" er intern begrundelse på en kundeside. Fjern halvdelen.
- "Sådan kan du selv vurdere afkastet +104,8 %" henviser til største fald, risici og horisont. Der er intet rådgivningssprog ✅.
- 0 hits for "overvægt" i handelsbetydning, "øger eksponering", 1m/3m på PMINDI, "garanteret", "bedste" og "sælg nu" ✅. Beholdning pr. 1. jun. 2026 (forsinket) står på selskab, portefølje og fonden ✅.

### Prioritet
**2** (X-tredjepart ved fondens graf + produktsider) → **9** (fakta "ikke oplyst" + manglende KID-tal på omkostninger) → **5** (ÅTD uden godkendelse) → **3** → **11** → **1**.

## 2026-10-16 02:24 CEST · cyklus 31 (main `3e4ec15`, docs-delta `5843694`)

Ikke juridisk rådgivning. Pages (00:15:49 GMT) = `e402f15`, og `5843694` er ikke live endnu. Status nedenfor gælder **main** (lokal Playwright ved 375 + grep). Jeg har krydstjekket KID-tal mod Fundmarket-PDF'erne.

### Status pr. MUST
1. **"Markedsføringsmateriale"-mærkning:** kun ndi-paa-x ("NDI-konti er markedsføring/udkast"). Fonden, fakta og omkostninger har 0. **Åben.**
2. **Tredjepartsopslag på produktsider: delvis.** "MADS FØLGER" → "Fulgt konto"/"Konti NDI følger" ✅ (fjerner koblingen til forvalterens rådgiver). Men `chartMarkers` viser stadig @BullTheoryio "BREAKING: SoftBank … $100 billion" og @MilkRoadAI under fondens afkastgraf. SoftBank-selskabssiden har 2 × "BREAKING" og @FundaAI "repricing of credit risk" ved siden af fondens beholdning. **Åben, højeste prioritet.** Grafmarkører kun fra @InvestNewdeal. Ingen tredjepartsrygter om navngivne beholdninger på selskab/tema (MAR art. 20-hensyn, som i cyklus 29).
3. **"kan tabe":** omkostninger (lede, footer, warn) ✅ og ndi-paa-x (snap-bånd, footwarn, footer) ✅. **Lukket på main** (live efter Pages).
4. PMINDIAKK før 12 mdr.: ingen afkast ✅. NAV-niveau afventer Christians beslutning.
5. **ÅTD +4,0 % og 100.000 kr.-eksempel "afventer Fundmarket-godkendelse"** står stadig på fonden (sætningen er synlig for kunden). **Åben.** Vis ikke tal, der eksplicit afventer godkendelse. Skjul dem, eller få godkendelsen.
6. SRI mod udsving: lukket ✅.
7. @MadsC007-chartMarkers: lukket ✅ (se 2 for erstatningen).
8. Offentligt repo: Christians beslutning.
9. **KID-omkostningsindikator: lukket ✅.** omkostninger `#kid-omkostning` og fakta viser 2,79 %/2,85 % (5 år) og 2,63 %/2,71 % (1 år). Det stemmer med KID-PDF'erne (priip_ipm140b og priip_ipm145b, "Årlig omkostningsmæssig konsekvens"), og der er link til begge KID'er. Det står eksplicit, at postsatser ≠ ÅOP og ikke er et billigere alternativ. **SHOULD:** sætningen "det tal, marketingmateriale skal gengive ærligt" er intern compliance-begrundelse på en kundeside. Fjern den. **SHOULD:** fakta-opsummeringen øverst nævner kun 1,49 % (postsats). Sæt KID-tallet først for konsistens (ESMA-retningslinjerne for markedsføring: omkostninger må ikke fremstilles lavere end i KID).
10. Delperioder: "2023 delår" ✅. "2026"/ÅTD er delår uden mærkning (SHOULD).
11. **Embed (`embed/chart.html`):** "kan tabe" ✅ og "historisk" ✅, men KID-link 0 og SRI 0. **Åben.**

### Nyt
- **SHOULD:** `x-posts.json` har et opslag med `complianceNote: "Omskrevet i snapshot"`. Et omskrevet opslag, der vises som opslagets tekst med "Åbn på X ↗", er ikke en tro gengivelse. Marker "omskrevet/resumé" i UI'et, eller brug originalteksten.
- **SHOULD:** fonden siger "seneste offentlige kvartalsrapport" om beholdningen, men om-data siger, at 1. juni ikke er et kvartalsskifte. Hold forsinkelsesformuleringen ens ("forsinket snapshot pr. 1. jun. 2026").
- Beholdning asOf: alle beholdningsfiler har 2026-06-01 ✅. Afkast er pr. 14./15. okt. 2026 ✅. Ingen live-handler.
- 0 hits for "øger eksponering", "garanteret", "sikker investering", "køb nu"/"sælg nu" og "bedste". "overvægt" står kun i nægtende form ✅. "anbefal…" står kun som "ikke en anbefaling" eller "KID anbefaler 5 år" ✅. Ingen 1m/3m på PMINDI ✅. Nasdaq nævnes kun som "vi tegner ikke en sammenligningskurve (fx Nasdaq)" og i @InvestNewdeal-børsnoteringsopslaget ✅.
- AI-mærkning: uændret ✅ (ndi-perspektiv og selskab "AI-udkast" kun ved tekst).

### Prioritet
**2** (tredjeparts-"BREAKING" ved fondens graf + SoftBank) → **5** (ÅTD "afventer godkendelse" vist) → **11** (embed KID/SRI) → **1** (mærkning) → SHOULD: intern "marketingmateriale"-sætning, fakta-opsummering med KID først.

## 2026-10-16 02:40 CEST · cyklus 32 (main `3e4ec15`, live = main)

Ikke juridisk rådgivning. Jeg har kørt live ved 375 på 22 sider og grep efter rådgivnings-/handelsord. Alle hits på "anbefal*", "sælg", "overvægt" og "Anbefalet" er negationer ("ikke en anbefaling", "ikke bevidste overvægte", "ingen anbefaling om at købe eller sælge"), KID-termer ("Anbefalet ejertid/investeringsperiode 5 år") eller forretningsbeskrivelser ("sælger telefoner"). Ingen "øger eksponering", "garanteret", "sikkert" eller "bedste tip" ✅.

### MUST (blocker)
1. **Tredjeparts-X-opslag med "BREAKING" på fondens produktside og SoftBank-siden** (åben fra cyklus 30/31). @BullTheoryio og @MilkRoadAI vises under fondens hovedgraf. Ved markedsføring af en konkret fond kan kuraterede tredjepartsnyheder om porteføljeselskaber læses som markedsføringsbudskab, som NDI står inde for. Overskriften "ikke NDI's holdning" ændrer ikke på, at NDI har valgt dem. **Ret:** kun NDI-egne konti i `chartMarkers`. På selskab/tema skal panelet foldes sammen og "BREAKING" filtreres fra.
2. **Nyhedsarkiv mangler tabsadvarsel** (0 hits på "tabe"/"kan falde"). Siden har "Historisk afkast er ikke en pålidelig indikator" og "Ikke rådgivning", men ikke "Du kan tabe en del af eller hele din investering". Alle andre 21 testede sider har den nu ✅. Tilføj standardlinjen i footeren.

### SHOULD
- Fonden: "det er en compliance-beslutning, ikke et datamangel" (`js/app.js:414`). Internt sprog, og det fremhæver Nasdaq som det implicitte sammenligningsgrundlag. Skriv: "Fonden har intet fast benchmark, så vi tegner ingen sammenligningskurve."
- Fonden: "seneste offentlige kvartalsrapport" passer ikke med om-data (snapshot pr. 1. jun. 2026 er ikke kvartalsskifte). Det er en præcisionsfejl i beholdningsforsinkelses-oplysningen.
- Omkostninger: "marketingmateriale skal gengive ærligt" og "Tomme felter = udfyldes af NDI" er interne compliance-noter på en kundeside.

### Tjekliste (live)
- Ikke-rådgivning / generel information: ✅ på alle 22 sider.
- Tabsadvarsel synlig: ✅ 21/22 (nyhedsarkiv ✗).
- Historisk afkast ≠ fremtid: ✅ 22/22.
- KID/PRIIP-links + SRI 5/7 (KID 14. aug. 2026) ✅. Omkostningsindikator (RIY) 2,79/2,85 % ved 5 år er vist og matcher KID (verificeret i cyklus 31) ✅. ÅOP er bevidst ikke vist, og det er forklaret ("ikke et ÅOP") ✅.
- Beholdning forsinket: `portfolio.json`, `value-chains.json` og `multi-tags.json` asOf 2026-06-01 ✅ (≤ 2026-06-01). Ingen live handler.
- PMINDI: ingen 1m/3m-chips ✅. PMINDIAKK: "Afkast vises efter 12 måneder" (cyklus 29) ✅. Nasdaq nævnes kun negativt ("vi tegner ikke … fx Nasdaq") ✅. Se SHOULD om formulering.
- AI-mærkning: "AI-udkast"-badge på selskabs-/perspektivtekster ✅. Risici har "Tekst markeret AI-…" ✅.
- Ingen trading-sprog fra Mads-ugebreve ✅.

## 2026-10-16 02:31 CEST · cyklus 33 (main `3e4ec15`, live = main, intet docs-delta)

Ikke juridisk rådgivning. Live ved 375 på 21 URL'er plus kontekst-grep af alle hits på rådgivnings- og handelsord. Alle "anbefal*/overvægt/køb/sælg/eksponering" er negationer ("ikke en anbefaling", "ikke bevidste overvægte", "ikke som købsanbefaling") eller procesbeskrivelser (invester: "hvordan man typisk køber andele … Ikke rådgivning om, om du bør"). Ingen "øger eksponering", "garanteret" eller "bedste tip". "sikkert" står kun som "vinderne kan ikke udpeges sikkert" ✅.

### MUST (blocker)
1. **Tredjeparts-"BREAKING" ved fondens afkastgraf og på SoftBank** (åben siden cyklus 30). Der er nu 2 × @BullTheoryio under fondens graf: SoftBank-kapitalrejsning på $100 mia. og Nvidia-backstop på $250 mia. for OpenAI. SoftBank-siden mærker Nvidia/OpenAI-opslaget "DIREKTE TRÆF · Vist fordi: SoftBank", så NDI aktivt kobler et rygte til en beholdning. **Ret:** `chartMarkers` → kun NDI-egne konti. Fjern eller fold tredjepartspanelet på selskab/tema (MAR art. 20-hensyn, jf. cyklus 29).
2. **Nyhedsarkiv mangler tabsadvarsel** (åben fra cyklus 32). Tilføj "Du kan tabe en del af eller hele din investering".
3. **ÅTD +4,0 % "afventer Fundmarket-godkendelse"** står stadig synligt på fonden. **Nyt:** periode og embed viser det samme ÅTD **uden** forbeholdet. Enten er tallet godkendt, og så skal forbeholdet væk, eller også er det ikke, og så skal det væk alle tre steder.

### SHOULD
4. **Delperioder på `periode.html`:** "2023: +16,7 %" (22.9.–31.12.2023) står som helt kalenderår uden "delår", selvom fonden er rettet (cyklus 29). "2026"/"YTD" er også delår. Jf. MiFID-delegeret forordning 2017/565 art. 44(4): historiske resultater for hele 12-månedersperioder. Mærk "delår" som på fonden.
5. **Embed (`embed/chart.html`)** har stadig 0 KID-links, ingen SRI og ingen "markedsføringsmateriale". Den viser CAGR +26,4 % over 3,1 år (åben siden cyklus 24).
6. **Periode** mangler KID-link, SRI og "ikke rådgivning". Den har kun den korte tabslinje. Siden kan nås direkte (fra kort), så den er en selvstændig side med afkasttal.
7. Fra cyklus 32: "compliance-beslutning, ikke et datamangel" (fonden, Nasdaq). "kvartalsrapport" vs. snapshot pr. 1. jun. 2026. Interne noter på omkostninger.
8. "Markedsføringsmateriale"-mærkning: kun på ndi-paa-x (uændret).

### Tjekliste (live)
- Ikke-rådgivning: ✅ på alle produktsider (periode/drawdown/embed har kun tabs- og historiklinjen).
- Tabsadvarsel: ✅ 20/21 (nyhedsarkiv ✗).
- Historisk afkast ≠ fremtid: ✅ 21/21.
- KID/SRI 5/7: ✅ fonden, portefølje, risici, fakta, omkostninger, sammenlign, selskab, tema. ✗ embed, periode, drawdown.
- Omkostninger: KID-RIY 2,79 %/2,85 % (5 år) live på fakta og omkostninger ✅. ÅOP er forklaret som ikke-ÅOP ✅. Persona- og FO-MUST er dækket.
- Beholdning forsinket pr. 1. jun. 2026 ✅ (portefølje, SoftBank, vaerdikaeder, temaer). Ingen live-handler.
- PMINDIAKK (`?fund=PMINDIAKK`): ingen afkasttal, "kan tabe" ×3 ✅. PMINDI: ingen 1m/3m ✅ (udforsk-hit på "3m" er et ISIN-fragment). Nasdaq kun som "vi tegner ikke …" og Nasdaq Copenhagen-notering ✅.
- AI-mærkning: SoftBank "AI-udkast" ×9 ✅. vaerdikaeder "Tekst inspireret af NDI ugebreve / Vidensbot" ✅.
- Ingen Mads-trading-sprog ✅.

### Prioritet
**1** (BREAKING + "Vist fordi: SoftBank") → **3** (ÅTD-forbehold inkonsistent på 3 sider) → **2** (nyhedsarkiv-tab) → **4/5/6** (periode/embed delår + KID).

## 2026-10-16 02:36 CEST · cyklus 34 (main `65b1947`, live = main)

Ikke juridisk rådgivning. Kørt live ved 375 på 27 URL'er, med kontekst-grep af alle hits på rådgivnings- og handelsord. Alle "anbefal*/overvægt/køb/sælg/eksponering" er negationer ("ikke anbefalinger eller bevidste overvægte", "ikke en opfordring til at købe eller sælge") eller procesbeskrivelser. Det gælder også risici: "Fonden må ikke aktivt købe unoterede aktier". FAQ: "Hvorfor sælger fonden noget, der er steget? For at holde spredningen" er en generel rebalanceringsforklaring, ikke en konkret handel ✅. "garanti" står kun som "Den er ikke en garanti" (risikoklasse) ✅. "sikker" står kun som "usikkert" og "sikkerhedsanalyse" ✅.

### MUST (blocker)
1. **Tredjeparts-"BREAKING" ved fondens afkastgraf og på SoftBank** (åben siden cyklus 30, uændret). @BullTheoryio "SoftBank … $100 billion" og "Nvidia … backstop $250 BILLION … OpenAI" vises under fondens graf. På SoftBank står "DIREKTE TRÆF · Vist fordi: SoftBank". **Ret:** `chartMarkers` → kun NDI-egne konti. Fold/filtrér tredjepartspanelet på selskab/tema.
2. **"Markedsføringsmateriale" + prospekt-henvisning er kun delvist rullet ud.** Fremskridt: lane-C (`fb525dd`) har sat footeren "Markedsføringsmateriale. Læs prospektet og KID … før du træffer en endelig investeringsbeslutning" på risici, invester, om-data, kort, ideer, ndi-perspektiv, ndi-paa-x og alle lær-sider ✅. Den formulering matcher ESMA-retningslinjerne for markedsføringsmateriale (forordning 2019/1156 art. 4) godt. **Mangler** på netop produktsiderne med afkasttal: fonden (`/` og `?view=fonden`), portefølje, udforsk, fakta, omkostninger, sammenlign, selskab, tema, temaer, vaerdikaeder, drawdown, periode og embed. Footeren på fakta/omkostninger/sammenlign er kortere og har hverken "markedsføringsmateriale" eller prospektlink. **Ret:** genbrug lane-C-footeren på app-/produktsiderne.
3. **ÅTD +4,0 % "afventer Fundmarket-godkendelse"** står synligt på fonden, mens periode ("YTD: +4,0 %", "2026: +4,0 %") og embed ("År til dato +4,0 %") viser tallet uden forbehold (uændret).
4. **Nyhedsarkiv:** 0 × "tabe" og 8 × "Placeholder" (uændret).

### SHOULD
5. **Periode:** "2023: +16,7 %" uden "delår", "YTD" og "CAGR". Den mangler også KID, SRI og ikke-rådgivning (uændret). Det samme gælder **drawdown**: 0 × KID.
6. **Embed:** 0 × KID, 0 × SRI og 0 × "markedsføringsmateriale". CAGR +26,4 % over 3,1 år (åben siden cyklus 24).
7. **Risici `#prospekt` (nyt):** godt indhold, og "prospektets ordlyd gælder" står der ✅. Jeg har ikke tjekket ordlyden mod prospekt-PDF'en i denne cyklus. NDI/Fundmarket bør bekræfte de konkrete faktapåstande før lancering ("markedsværdi på mindst 500 mio. kr.", depotselskab Danske Bank A/S, market maker Jyske Bank A/S, "ingen derivater/udlån", artikel 6). Fejl i rammer fra prospektet er et vildledningsspørgsmål, ikke kun redaktionelt.
8. **Livscyklus-forslag (ideer `#h-lc`):** "FORSLAG, IKKE NDI'S VURDERING", "maskinelt forslag ud fra offentlige branchekoder" og "du kan tabe penge" er korrekt mærket ✅. ndi-perspektiv siger samtidig "Vi gætter ikke". Det er ikke compliance-kritisk, men det bør ensrettes (se UX).
9. **Fra cyklus 32/33, stadig åbne:** "compliance-beslutning, ikke et datamangel" (Nasdaq, fonden). "seneste offentlige kvartalsrapport" vs. snapshot 1. jun. 2026 (fonden). "det tal, marketingmateriale skal gengive ærligt" og "Tomme felter = udfyldes af NDI" (omkostninger). Fakta-opsummeringen nævner 1,49 % før KID-tallet. `x-posts.json` har "Omskrevet i snapshot" uden UI-mærkning.

### Tjekliste (live)
- Ikke-rådgivning: ✅ på alle produktsider. Periode, drawdown og embed har kun tabs- og historiklinjen.
- Tabsadvarsel: ✅ 26/27 (nyhedsarkiv ✗).
- Historisk afkast ≠ fremtid: ✅ 27/27.
- KID/SRI 5/7 (KID 14. aug. 2026): ✅ fonden, portefølje, udforsk, risici, fakta, omkostninger, sammenlign, selskab, tema og alle lær-sider. ✗ embed, periode, drawdown.
- Omkostninger: KID-RIY 2,79/2,85 % (5 år) på fakta, omkostninger, invester og FAQ ✅. Det er forklaret, at det ikke er ÅOP ✅. Persona- og FO-MUST er dækket.
- Beholdning forsinket pr. 1. jun. 2026 ✅ (portefølje, ideer, vaerdikaeder, temaer, SoftBank). Ingen live-handler.
- PMINDIAKK: ingen afkast før 12 mdr. ✅ (uændret siden cyklus 29). PMINDI: ingen 1m/3m ✅. "3m" i udforsk er et ISIN-fragment. Nasdaq står kun som "vi tegner ikke …" og Nasdaq Copenhagen-notering ✅.
- AI-mærkning: ndi-perspektiv "Felter markeret AI-udkast … afventer NDI-gennemgang" ✅, SoftBank "AI-udkast" ✅, ideer-livscyklus "maskinelt forslag" ✅.
- Ingen Mads-trading-sprog ✅.

### Prioritet
**1** (BREAKING) → **2** (footer med markedsføringsmateriale/prospekt på produktsiderne, så den matcher lær-siderne) → **3** (ÅTD-forbehold på 3 sider) → **4** (nyhedsarkiv) → **5/6** (periode/drawdown/embed KID + delår) → **7** (verificér prospekt-fakta).

## 2026-10-16 02:40 CEST · cyklus 35 (main `04e1c9a`, intet docs-delta siden `65b1947`, live = main)

Ikke juridisk rådgivning. Live ved 375 på 28 URL'er, med regex-flag pr. side (tab, historik, rådgivning, KID, SRI, markedsføringsmateriale, AI, BREAKING, omkostninger) og kontekst-grep. "overvægt"-hits er alle negationer ("ikke … bevidst overvægt"). "afventer" står som "afventer NDI-gennemgang" (AI-udkast) og som ÅTD-forbeholdet. Ingen "øger eksponering", "garanteret", "køb/sælg nu" eller "bedste tip". Ingen 1m/3m på PMINDI. ndi-paa-x: 0 handelssprog i opslag fra NDI-medarbejderkonti ✅.

### MUST (blocker, uændret)
1. **Tredjeparts-"BREAKING" ved fondens afkastgraf og på SoftBank** (6. cyklus). Det skal rettes i `docs/js/app.js:479` (filtrer `chartMarkers` til @InvestNewdeal) og i selskabspanelets "Vist fordi"-match.
2. **ÅTD +4,0 % / 100.000 kr.-eksemplet "afventer Fundmarket-godkendelse"** står kun på fonden. Periode og embed viser samme ÅTD uden forbehold.
3. **Nyhedsarkiv mangler "Du kan tabe …"** (ét footer-tekststykke).
4. **"Markedsføringsmateriale"-mærkning** mangler på produktsiderne (fonden, portefølje, fakta, omkostninger, selskab, periode, drawdown, embed). Den findes på risici, invester, om-data, ideer, kort, ndi-perspektiv og lær.

### SHOULD
5. **Omkostningstal på fondens produktside:** "Omkostninger (kort)" henviser kun videre. Ved markedsføring af en konkret fond med afkasttal bør de samlede omkostninger (KID 2,79 %/2,85 % ved 5 år) stå på samme side som afkastet, ikke ét klik væk. Tallet findes og er verificeret (cyklus 31), så det er kun en placeringsfejl.
6. **Embed / periode / drawdown:** ingen KID-link eller SRI (uændret). Embed viser CAGR +26,4 %.
7. **Beholdningsforsinkelse, ordvalg:** "seneste offentlige kvartalsrapport" (fonden) og "vægt pr. kvartal" (portefølje/udforsk) passer ikke med om-data ("snapshot pr. 1. jun. 2026, ikke kvartalsskifte"). Selve datoen er korrekt ✅.
8. **Interne noter på kundeside** (omkostninger: "Tomme felter = udfyldes af NDI", "marketingmateriale skal gengive ærligt"). Fonden: "compliance-beslutning, ikke et datamangel".
9. **NDI-medarbejderkonti som markedsføring:** ndi-paa-x erklærer @MadsC007/@jesper_baek/@CHornskov for "markedsføring … kan være NDI's holdning". Det er ærligt, men det betyder, at fremtidige private opslag (fx positionskommentarer) automatisk bliver fondsmarkedsføring på sitet. Indfør et manuelt godkendelsesflag pr. opslag, før det vises.

### Tjekliste (live)
- Ikke-rådgivning: ✅ alle produktsider (fonden: "Ingen investeringsrådgivning" i footer + "Ingen anbefaling om at købe eller sælge"). Periode/drawdown/embed kun tab+historik.
- Tabsadvarsel: ✅ 27/28 (nyhedsarkiv ✗).
- Historisk afkast ≠ fremtid: ✅ 28/28.
- KID/PRIIP + SRI 5/7 (KID 14. aug. 2026): ✅ fonden, PMINDIAKK, portefølje, risici, fakta, sammenlign, selskab, tema, invester, lær. ✗ embed, periode, drawdown, selskaber, vaerdikaeder.
- Omkostninger: KID-RIY 2,79/2,85 % på invester, fakta og omkostninger ✅. Fonden uden tal (SHOULD 5). Persona-/FO-MUST er dækket på sitet.
- Beholdning asOf 2026-06-01 ✅ (portefølje, selskaber "345 positioner pr. 1. jun. 2026", tema, SoftBank). Ingen live-handler.
- PMINDIAKK: ingen afkasttal, "kan tabe" ✅. Nasdaq: kun negativ omtale ✅.
- AI-mærkning: "AI-udkast … afventer NDI-gennemgang" på selskab/tema/ndi-perspektiv/ideer ✅. Livscyklus = "maskinelt forslag" ✅.
- Mads-handelssprog: 0 ✅.

### Prioritet
**1** (BREAKING, ét filter) → **2** (ÅTD-forbehold ens på 3 sider eller fjern) → **4** (markedsføringsmateriale-footer på produktsider) → **3** (nyhedsarkiv) → **5** (omkostningstal på fonden).

## 2026-10-16 02:47 CEST · cyklus 36 (main `04e1c9a`, intet docs-delta, live = main)

Ikke juridisk rådgivning. Main er uændret, så fokus er nyt: **dokumentlinks virker**, **indeksering af udkastet** og **fremhævning af afkast vs. risiko på desktop 1280** (ESMA-retningslinjer for markedsføringsmateriale, 2021, afsnit 4.2–4.3: risiko skal stå mindst lige så fremtrædende som fordele, og afkasttal skal stå med periode).

### Verificeret ✅
- **KID-links virker:** `node-api.fundmarket.dk/.../priip_ipm140b` og `priip_ipm145b` → 200 application/pdf. Fællesprospektet (opdateret 24.10.2025) → 200 pdf. Fundmarket-produktsiderne → 200.
- **Udkastet indekseres ikke:** `noindex` på alle 35 sider og `robots.txt` `Disallow: /`. Det er vigtigt, så et uafklaret udkast med afkasttal ikke kan findes som "markedsføring" via søgning.
- **Fonden 1280:** "Historisk afkast er ikke en pålidelig indikator … Du kan tabe en del af eller hele din investering" står i første skærmbillede (y≈676 ved 800 px højde) ✅. Totalafkast har periode ("Fra første NAV 22. sep. 2023") ✅.
- Øvrige punkter er uændret fra cyklus 35: ingen 1m/3m på PMINDI, intet PMINDIAKK-afkast, ingen Nasdaq-benchmark, beholdning pr. 1. jun. 2026, AI-udkast mærket, 0 Mads-handelssprog.

### MUST (uændret)
1. Tredjeparts-"BREAKING" ved fondens afkastgraf og på SoftBank (7. cyklus). Fix: `docs/js/app.js:479`.
2. ÅTD +4,0 % "afventer Fundmarket-godkendelse" står kun på fonden. Periode og embed viser tallet uden forbehold.
3. "Markedsføringsmateriale"/prospekt-footer mangler på produktsiderne.
4. Nyhedsarkiv mangler "Du kan tabe …".

### SHOULD (nyt)
5. **Afkast fylder mere end risiko og omkostninger på desktop.** Fonden viser fire afkast-KPI'er i stor skrift (+104,8 %, +26,4 %, +4,0 %, −35,8 %). SRI 5/7 står alene på anden række, og omkostningerne står slet ikke i KPI-blokken. ESMA lægger vægt på, at risiko og omkostninger skal være "lige så fremtrædende". **Ret:** SRI og "Omkostninger ca. 2,79 %/år (KID, 5 år)" ind som række 2, i samme kortstørrelse (se UX cyklus 36).
6. **"Gns. årligt afkast (CAGR) +26,4 %"** har som underlabel kun "Efter løbende omkostninger" og ingen periode. Periode og antal år skal stå ved hvert afkasttal. Skriv "22. sep. 2023 – 14. okt. 2026 (3,1 år)". Det samme gælder embed og periode.
7. **Entré "Modenhed: 345 selskaber klassificeret (udkast)"** (`app.js:266`) kan læses som NDI's egen vurdering af alle beholdninger. Andre steder mærkes det som "maskinelt forslag, ikke NDI's vurdering". Ensret mærkningen af AI-/maskinelt indhold.
8. Fra cyklus 34/35, stadig åbne: embed, periode og drawdown mangler KID/SRI. Interne noter på omkostninger og fonden ("Tomme felter = udfyldes af NDI", "compliance-beslutning, ikke et datamangel"). "kvartalsrapport"/"pr. kvartal" vs. snapshot. Godkendelsesflag pr. opslag for NDI-medarbejderkonti. Prospekt-fakta på risici `#prospekt` skal verificeres af NDI.

### Prioritet
**1** (BREAKING) → **2** (ÅTD-forbehold) → **3** (footer) → **5/6** (SRI + omkostninger i KPI-rækken, periode ved CAGR) → **4** (nyhedsarkiv) → **7**.

## 2026-10-16 02:49 CEST · cyklus 37 (main `3e25f16`, docs-delta: ideer, drawdown, lær-fagord, tre drivkræfter; live = main)

Ikke juridisk rådgivning. Live ved 375 på 28 URL'er med regex-flag og kontekst-grep. "overvægt"-hits er fortsat negationer. Ingen "øger eksponering", "garanteret", "køb/sælg nu" eller "bedste tip". Ingen 1m/3m på PMINDI. PMINDIAKK har ingen afkasttal ✅.

### Nyt indhold gennemgået ✅
- **Tre drivkræfter (ideer `#h-dr`, lær/Sådan tænker vi `#tv-dr`):** kilden er angivet (NDI ugebrev uge 3, 19. jan 2026). Teksten siger "Mads' syn på retningen, ikke en prognose", "siger ikke, hvilke selskaber der klarer sig godt, og du kan tabe penge". Placeringen er mærket "NDI Analytics' skitse, ikke NDI's egen opdeling". Vægtene er "pr. 1. jun 2026, offentlig, forsinket beholdning". Ingen handelssprog ✅. "Fonden ejer udviklingen bredt i stedet for at satse på, hvem der vinder" er en strategibeskrivelse, ikke rådgivning ✅.
- **ASML "mulig flaskehals":** står sammen med "lille position … ikke en karakter, et kursmål eller en anbefaling" ✅.
- **Ordliste "Årlig omkostningsmæssig konsekvens (KID)" ca. 2,79 % ved 5 år:** svarer til KID-tallet fra cyklus 31 ✅. Det er et godt opslag at linke til fra fondens KPI'er.
- **Drawdown kalenderår:** 2023 "delår", 2026 "til dato" ✅ (lukker delvist cyklus 24 MUST 10 på denne side).

### MUST (uændret)
1. **Tredjeparts-"BREAKING" ved fondens afkastgraf og på SoftBank** (8. cyklus): "BREAKING: SoftBank is seeking to raise up to $100 billion …" og "BREAKING: Nvidia … backstop $250 BILLION" fra @BullTheoryio, vist sammen med fondens afkast. Fix: `docs/js/app.js:479` (filtrer `chartMarkers` til @InvestNewdeal) og selskabspanelets match.
2. **ÅTD +4,0 % uden forbehold:** fonden har "afventer Fundmarket-godkendelse". Periode ("YTD: +4,0 %"), embed og nu **drawdown kalenderår "2026 +4,0 % til dato"** har ikke forbeholdet. Gør det ens på alle 4 eller fjern det overalt.
3. "Markedsføringsmateriale"/prospekt-footer mangler på produktsiderne (fonden, portefølje, udforsk, fakta, omkostninger, selskab, periode, drawdown, embed, selskaber, sammenlign).
4. Nyhedsarkiv: 0 × "kan tabe" og "Placeholder".

### SHOULD
5. **Drawdown, periode og embed: ingen KID-link og ingen SRI** (flag kid=0/sri=0 live). Drawdown viser −35,8 % og kalenderårsafkast. Tilføj den samme KID/SRI 5/7-linje, som risici har.
6. Fonden: CAGR +26,4 % uden periode i underlabel, og omkostningstallet står ikke i KPI-rækken (cyklus 36 SHOULD 5/6).
7. Interne noter på kundeside: fonden "compliance-beslutning, ikke et datamangel" (stadig live) og omkostninger "Tomme felter = udfyldes af NDI".
8. "kl n" i produktnavn på fakta/omkostninger. Det er ikke compliance, men produktnavnet bør matche KID'et ("NewDeal Invest", andelsklasse PMINDI).
9. Uændret: godkendelsesflag pr. opslag for NDI-medarbejderkonti (ndi-paa-x). Modenhed "klassificeret" vs. "maskinelt forslag". Prospekt-fakta på risici `#prospekt` skal verificeres af NDI.

### Tjekliste (live)
- Ikke-rådgivning ✅ (fonden i footer). Tabsadvarsel 27/28 (nyhedsarkiv ✗). Historisk afkast ≠ fremtid 28/28 ✅.
- KID/SRI ✅ på fonden, PMINDIAKK, portefølje, udforsk, risici, fakta, sammenlign, selskab, tema, invester, lær. ✗ drawdown, periode, embed, selskaber, vaerdikaeder, temaer.
- Omkostninger: KID-RIY 2,79/2,85 % på invester, fakta, omkostninger og nu ordlisten ✅. Fonden ✗ (SHOULD 6).
- Beholdning asOf 2026-06-01 ✅. Ingen live-handler. Nasdaq kun negativt ✅. AI-udkast mærket ✅. Mads-handelssprog 0 ✅.

### Prioritet
**1** (BREAKING) → **2** (ÅTD-forbehold, nu 4 steder) → **3** (footer) → **5** (KID/SRI på drawdown/periode/embed) → **6** → **4**.

## 2026-10-16 02:55 CEST · cyklus 38 (main `3e25f16`, intet docs-delta; live = main)

Ikke juridisk rådgivning. Live stikprøve ved 375: 8 selskabssider, 11 temasider, sammenlign, kort og 404-sider, med regex-flag og kontekst. Rådgivningsord kun i negationer ("Ikke en anbefaling eller en bevidst overvægt", "anbefalet investeringshorisont 5 år ifølge KID") ✅. "køb" kun i Carvana-profilen ("køb og salg af brugte biler") ✅. Ingen kursmål, "garanteret" eller "sikkert afkast". Tabsadvarsel, KID og SRI 23/23 (undtagelse: sidekort uden SRI, OK) ✅.

### MUST
1. **Tredjeparts-indhold ved fondens produkter er mere udbredt end rapporteret i 32–37.** `matchPosts` (`docs/js/x-feed.js:365`) knytter fulgte konti til **alle** selskaber i et tema:
   - @BullTheoryio "BREAKING … $100 billion … stake would be worth $260 billion" står på alle 44 platforme-sider (bekræftet på Carvana og Opendoor A/Z) + temasiden.
   - @FundaAI "repricing of credit risk … pressure on neoclouds" og @MelvinInvests står på chips, energi og compute (bekræftet på SUESS MicroTec og 3 temasider).
   - Mærket "ikke NDI's holdning" står der. Men værdi- og spekulationsudsagn om tredjeparter, placeret ved siden af fondens SRI- og KID-blok, kan opfattes som NDI-kurateret markedsføring. Det er kurateret af sitet ("Udvalgte opslag").
   - **Fix:** tema-træf kun for husets konti (`isHouse`). Ticker-træf fra fulgte konti kun hvis NDI har godkendt opslaget. Dette sammen med `app.js:479` lukker MUST 1 fra cyklus 30–37.
2–4. Uændret fra cyklus 37: ÅTD +4,0 % uden ens forbehold (fonden/periode/embed/drawdown), "Markedsføringsmateriale"-footer på produktsider og nyhedsarkiv "Placeholder"/ingen tabsadvarsel.

### SHOULD (nyt)
5. **AI- og maskinel mærkning er forkert på selskabssiderne:** `selskab.html:106` siger "Manuel klassifikation i udkastet", men alle 345 er `maturityStatus: "forslag"` (maskinelt fra GICS, afventer NDI). Et maskinelt forslag præsenteret som manuelt er det modsatte af korrekt mærkning. Ret til "Maskinelt forslag, afventer NDI-gennemgang".
6. **Sammenlign (PMINDI vs. PMINDIAKK) viser ingen omkostninger.** Når to andelsklasser sammenlignes, bør KID-omkostningerne (2,79 % / 2,85 %, 5 år) stå side om side. Siden har "giver ikke rådgivning" og KID-henvisning ✅.
7. Uændret: KID/SRI på drawdown, periode og embed. CAGR uden periode og ingen omkostnings-KPI på fonden. Interne noter på kundesider. "kl n". Godkendelsesflag for medarbejderopslag.

### Tjekliste (stikprøve)
Ikke-rådgivning ✅ · tabsadvarsel ✅ · historisk afkast ≠ fremtid ✅ · KID/SRI ✅ (SRI "gælder fonden som helhed") · beholdning 1. jun. 2026 forsinket ✅ · ingen live-handler ✅ · Mads-handelssprog 0 ✅ · AI/maskinel mærkning ✗ selskab (SHOULD 5) · omkostninger ✗ sammenlign (SHOULD 6).

### Prioritet
**1** (X-tematræf + chartMarkers, ét samlet fix) → ÅTD-forbehold → footer → **5** → KID/SRI-huller → **6**.

## 2026-10-16 06:15 CEST · cyklus 39 (main `e9ea004`, docs-delta 251 commits; live = main)

Ikke juridisk rådgivning. Live sweep ved 375 på 32 sider med regex-flag og kontekstudtræk.

### Lukket siden cyklus 38 ✅
- **MUST 1 (tredjeparts-X ved fondens produkter) er LUKKET.** `docs/js/x-feed.js:522` `matchPosts(houseOnly = true)`. Tema-træf gælder kun `isHouse`. Selskabs- og temapaneler viser kun NDI-konti, og grafmarkører kun @InvestNewdeal (`x-feed.js:448`, `app.js:490`). Fulgte konti står kun på `ndi-paa-x.html` med mærket "ikke NDI's holdning" og "Du kan tabe penge" ✅.
- **ÅTD-forbehold er nu ens overalt:** fonden, drawdown, periode og embed siger "delår, afventer Fundmarket-godkendelse" ✅.
- **"Markedsføringsmateriale"** står i footer/overskrift på alle 32 sider ✅.
- **Nyhedsarkiv:** "Placeholder" er væk, og der er tabsadvarsel ✅.
- **Maskinel mærkning på selskab** er rettet til "Maskinelt forslag … afventer NDI-gennemgang" ✅.
- **Omkostninger:** KID-RIY 2,79/2,85 % (5 år) og 2,63/2,71 % (1 år) står på fonden, sammenlign, omkostninger og entré. "Ikke et ÅOP" er tydeligt ✅.

### Tjekliste
Ikke-rådgivning ✅ (alle footere; "Ingen anbefaling om at købe eller sælge" på fonden) · tabsadvarsel 32/32 ✅ · historisk afkast ≠ fremtid 32/32 ✅ · KID-links 32/32 ✅ · SRI 5/7 på fonden/risici/selskab/tema/embed/periode/drawdown ✅ · beholdning pr. 1. jun. 2026 forsinket ✅ · ingen live-handler ✅ · PMINDIAKK ingen kurs før 5. dec. 2026 ✅ · ingen 1m/3m ("Ingen 1- eller 3-måneders fremhævning") ✅ · intet benchmark ("intet fast benchmark; ingen sammenligningskurve") ✅ · "overvægt" kun i negationer ("ikke bevidste overvægte") ✅ · ingen "garanteret/sikker/køb nu/bedste tip" ✅ · AI-mærkning: udkast/forslag mærket på selskab/tema/ideer/perspektiv ✅, men ✗ værdikæder (se SHOULD 2) · omkostninger ✅.

### MUST
- **Ingen åbne MUST-blokere i denne cyklus.**

### SHOULD
1. **Footerens dokumentnavn:** "Central Information Dokument" (bl.a. PMINDIAKK-visningen) er ikke PRIIP-forordningens danske betegnelse. Brug "Dokument med central information (KID)" overalt, som fakta/omkostninger/ndi-på-x allerede gør.
2. **Værdikæder er ikke AI-mærket:** `vaerdikaeder.html` siger "Tekst inspireret af NDI ugebreve", men nævner ikke, at teksten er AI-/udkastsammenfattet (kæde-teksterne er rettet i mange enkeltcommits). Tilføj "AI-assisteret udkast, gennemgås af NDI", som på selskab/ideer.
3. **Intern compliance-tekst til kunden** (`omkostninger.html`): "Det er det tal, marketingmateriale skal gengive ærligt". Det er en intern note og bør omformuleres (se UX SHOULD 5).
4. **"Gns. årligt afkast +26,4 %"** på fonden står uden periode i selve KPI'en. Perioden står kun i nabo-KPI'en. Tilføj "siden start 22. sep. 2023" (afkasttal skal angive periode).
5. Uændret: KID-link er der, men SRI-tal mangler på omkostninger, sammenlign, temaer og værdikæder. Det er OK for ikke-afkastsider, så det er lav prioritet.

### Prioritet
Ingen blokere. **2** (AI-mærkning værdikæder) → **4** (periode på CAGR) → **1** (KID-betegnelse) → **3**.

## 2026-10-16 06:10 CEST · cyklus 40 (main `5bdb064`, docs-delta 15 filer siden `e9ea004`; live = main)

Ikke juridisk rådgivning. Live sweep ved 375 på 32 URL'er med regex-flag og kontekst, plus Python-scan af `docs/**` (html/js/json) for handels- og rådgivningssprog.

### Tjekliste
Ikke-rådgivning ✅ (alle footere) · tabsadvarsel 32/32 ✅ · historisk afkast ≠ fremtid 32/32 ✅ · KID-links ✅ · SRI 5/7 på produkt- og afkastsider ✅ · beholdning `asOf 2026-06-01` (forsinket) ✅. `fund-meta` 2026-10-15 og `risk-stats` 2026-10-14 er NAV/meta, ikke beholdning ✅ · ingen live-handler ✅ · PMINDIAKK: "Afkast vises efter 12 måneder", ingen kurs og ingen periodebjælke ✅ · 1m/3m: kode findes i `data.js:57`, men vises ikke ("Ingen 1- eller 3-måneders fremhævning") ✅ · Nasdaq kun som noteringssted i profiler, intet benchmark-krav ✅ · "overvægt" kun i negationer og i lær ("en stor overvægt i én branche øger variansen", pædagogisk, OK) ✅ · ingen "garanteret/sikkert afkast/køb nu/bedste tip/øger eksponering" ✅ · omkostninger (KID-RIY 2,79/2,85 %, "ikke et ÅOP") ✅ · AI-mærkning: selskab ✅ ("genereret med AI og tjekket mod kilden 8. okt. 2026"), værdikæder ✗ (uændret).

### Nyt i delta ✅
- Warrants mærkes som "tegningsret på moderselskab - ikke et selvstændigt selskab". Det fjerner risikoen for, at en 0,00 %-position fremstår som en investering i et selskab ✅.
- `displayName` bevarer "Beholdningsnavn: …" ved siden af visningsnavnet. Sporbarheden til Fundmarket-beholdningen er intakt ✅.
- Værdikæder: "En dato efter 1. juni 2026 er ikke beholdningens tal. Noterne er selskabernes egne ord. De er ikke en anbefaling." Det er et godt forbehold mod at blande nyere selskabsdata med beholdningsdatoen ✅.

### MUST
- **Ingen åbne MUST-blokere.**

### SHOULD
1. **Værdikæder er stadig ikke AI-mærket** (cyklus 39 SHOULD 2). Selskabssiderne har "genereret med AI og tjekket mod kilden". Værdikædeteksterne bliver rettet commit for commit (Primoris, Cummins, NextEra i dette delta) uden noget mærke. Tilføj én linje: "Teksten er et AI-assisteret udkast ud fra selskabernes egne kilder og gennemgås af NDI."
2. **Afkast uden periode, nu to steder:** fonden "Gns. årligt afkast +26,4 %" (uændret) og nyt på `periode.html` (ÅTD-visning): "Gennemsnitligt årligt afkast +26,4 %" står direkte under "År til dato +4,0 %" og "31. dec. 2025 → 14. okt. 2026". Læseren kan tro, at 26,4 % gælder perioden. Afkasttal skal angive den periode, de dækker. Skriv "Gns. årligt afkast siden start (22. sep. 2023)", eller skjul KPI'en på år/ÅTD-visninger.
3. **KID-betegnelse:** "Central Information Dokument" står stadig i footeren på mindst 9 sider (entré, fonden-AKK, portefølje, drawdown, periode, sammenlign, selskab, tema, temaer). Den danske PRIIP-betegnelse er "Dokument med central information". Fakta/omkostninger bruger den allerede.
4. **"Kvartalssnapshot"** (fonden: "Beholdningen er et forsinket kvartalssnapshot (seneste offentlige Fundmarket-rapport)") modsiger om-data (1. jun. er ikke et kvartalsskifte). Ret til "forsinket snapshot pr. 1. jun. 2026", så datogrundlaget er korrekt beskrevet.
5. Uændret: intern sætning på omkostninger ("Det er det tal, marketingmateriale skal gengive ærligt").

### Prioritet
Ingen blokere. **2** (periode på gns. årligt afkast, nu også periode-siden) → **1** (AI-mærke værdikæder) → **3** → **4** → **5**.

## 2026-10-16 06:25 CEST · cyklus 41 (main `6c06c90`, docs-delta 4 filer siden `5bdb064`; live = main)

Ikke juridisk rådgivning. Live sweep ved 375 på 32 URL'er med flag-tælling, plus grep i `docs/**`.

### Tjekliste
Ikke-rådgivning ✅ · tabsadvarsel 32/32 ✅ · historisk afkast ≠ fremtid 32/32 ✅ · KID-links 32/32 ✅ · SRI på produkt- og afkastsider ✅ · beholdning pr. 1. jun. 2026 forsinket ✅ · ingen live-handler ✅ · PMINDIAKK uden afkast før 12 mdr. ✅ · ingen 1m/3m ✅ · intet benchmark og Nasdaq kun som noteringssted ✅ · "overvægt" kun i negationer/pædagogisk ✅ · ingen "garanteret/sikkert afkast/køb nu/bedste tip/øger eksponering" ✅ · omkostninger (KID-RIY, "ikke et ÅOP") ✅ · "BREAKING:" står kun i tredjepartsopslag på `ndi-paa-x.html` under "FULGT KONTO" og "ikke NDI's holdning". Det er uændret siden cyklus 39 og OK ✅.

### Nyt i delta
- **Form 19 (Amazon/AWS):** Amazon står ikke i beholdningen, og det siges eksplicit. Teksten siger "ikke en vurdering af aktien", og kilden (10-K) adskilles fra NDI's egen beregning. Der er ingen opfordring og intet kursudsagn. OK ✅. Tallene er kontrolleret mod 10-K for 2024 (omsætning 638,0/AWS 107,6 mia. USD, driftsresultat 68,6/AWS 39,8 mia. USD) ✅.
- **Ordliste-warrant:** "Vægten er typisk tæt på 0 %" og "samme selskab" er korrekte og ikke vildledende ✅.

### MUST
- **Ingen åbne MUST-blokere.**

### SHOULD (alle åbne fra cyklus 40, uændret)
1. **Afkast uden periode:** "Gns. årligt afkast" på fonden/embed og "Gennemsnitligt årligt afkast" på `periode.html:113` (YTD-visningen) mangler "siden start 22. sep. 2023". Det er størst på periode-YTD, hvor tallet står under "År til dato".
2. **Værdikæder er ikke AI-mærket** (`vaerdikaeder.html`, `vaerdikaede.html`). Tilføj: "AI-assisteret udkast ud fra selskabernes egne kilder, gennemgås af NDI."
3. **KID-betegnelse:** "Central Information Dokument" kommer fra `js/data.js` og `index.html` og ses på 13 af 32 URL'er. Brug "Dokument med central information (KID)".
4. **"Forsinket kvartalssnapshot"** (`js/app.js:359` og `:428`) beskriver datogrundlaget forkert (1. jun. 2026 er ikke et kvartalsskifte). Skriv "forsinket snapshot pr. 1. jun. 2026".
5. **Intern sætning** `omkostninger.html:370`: "Det er det tal, marketingmateriale skal gengive ærligt."

### Prioritet
Ingen blokere. **1** → **2** → **3** + **4** (begge tekstrettelser i `data.js`/`app.js`, kan tages i ét commit) → **5**.

## 2026-10-16 06:20 CEST · cyklus 42 (main `6c06c90`, ingen docs-delta siden cyklus 41; live = main)

Ikke juridisk rådgivning. Sweepet er udvidet til 50 URL'er ved 375 (32 basis plus 8 selskaber og 10 temaer), med flag-tælling. Basis-URL'erne er byte-identiske med cyklus 41.

### Tjekliste (50/50)
Tabsadvarsel ✅ · historisk afkast ≠ fremtid ✅ · KID-link ✅ · ikke-rådgivning ✅ ("Ingen investeringsrådgivning"/"Ikke en anbefaling"; regex-misset på 8 sider skyldes ordformen, ikke manglende tekst) · SRI 5/7 på alle selskabs- og temasider med "gælder fonden som helhed - ikke [selskab] alene" ✅ · beholdning pr. 1. jun. 2026 (forsinket) ✅ · "overvægt" kun som negation ✅ · ingen køb/sælg-, garanti- eller tipsprog ✅ · AI-mærke ("AI-udkast", "Maskinelt forslag … afventer NDI-gennemgang") på alle 10 selskabssider ✅.

### Nyt i den udvidede dækning
- **Selskabssider uden profil** siger åbent "Profiltekst mangler endnu". Der er ingen opfundet tekst, og det er compliance-mæssigt korrekt ✅. Se UX SHOULD 1 for prioritering.
- **"Vægt over tid"** (fx Lumentum 0,46 % → 1,17 %) viser historiske og forsinkede vægte og stopper 1. jun. 2026. Det afslører ingen aktuelle handler ✅. Teksten er neutral ("Kun måneder hvor ISIN indgår"). Pas på, hvis der senere tilføjes ord som "øget/øger", for så nærmer det sig ugebrevets handelssprog.
- **Afkortede navne** ("Macom Technology Solutions H") er ikke et compliance-problem i sig selv. Men et korrekt selskabsnavn er en del af "klar og ikke vildledende" information. SHOULD (lav).

### MUST
- **Ingen åbne MUST-blokere.**

### SHOULD (åbne, uændret fra cyklus 40/41)
1. "Gns. årligt afkast" uden "siden start 22. sep. 2023" (fonden/embed, `periode.html:113`).
2. Værdikæder er ikke AI-mærket (`vaerdikaeder.html`, `vaerdikaede.html`).
3. "Central Information Dokument" → "Dokument med central information (KID)" (`js/data.js`, `index.html`).
4. "Forsinket kvartalssnapshot" (`js/app.js:359`, `:428`) og nu også "Vægt over tid (kvartalssnapshots)" på selskabssiden → "snapshot pr. 1. jun. 2026".
5. Intern sætning `omkostninger.html:370`.

### Prioritet
Uændret: **1** → **2** → **3** + **4** → **5**.

## 2026-10-16 06:27 CEST · cyklus 43 (main `24e1fce`, docs-delta 24 filer siden `6c06c90`; live = main)

Ikke juridisk rådgivning. 50 URL'er ved 375. Basis-tjeklisten er som i cyklus 42: tabsadvarsel, historisk ≠ fremtid, KID-link, ikke-rådgivning, SRI 5/7 med "gælder fonden som helhed", beholdning pr. 1. jun. 2026 (forsinket), "overvægt" kun som negation (13 sider) og intet køb/sælg-, garanti- eller tipsprog ✅.

### Delta gennemgået
- **`js/app.js` livscyklus:** "maskinelt ud fra offentlig branche og tema, afventer NDI-gennemgang" plus "ikke en officiel NDI-rating og ikke en anbefaling". Det er tydelig AI/maskin-mærkning ✅.
- **Top-10-sum** ("udgør tilsammen 11,9 %"): et faktuelt, forsinket tal med "Eksponering, ikke anbefaling" ✅.
- **Ordliste "Resultathonorar"** og omkostninger "Ingen af klasserne betaler resultathonorar, ifølge Fundmarket". Det har kilde og stemmer med KID-teksten "Resultathonorar: Nej" ✅.
- **Ideer #h-cs:** "Derfor kigger vi efter" er blevet til "værd at se på". NDI tilskrives ikke længere en arbejdsgang, og det er bedre ✅.
- **NDI på X, datolinje:** "Udvalgte offentlige opslag — ikke NDI's holdning … Du kan tabe penge" står over linjen ✅. De to "BREAKING:"-opslag fra @BullTheoryio (tredjepart) er uændrede og mærket "FULGT KONTO". Det er acceptabelt, fordi de er tydeligt tredjepart. Der er ingen nye X-kald (`callCountNote`).
- **Drawdown PMINDIAKK:** "vises efter 12 måneders historik. Ingen NAV eller graf før 5. december 2026" ✅. Der er ingen 1m/3m på PMINDI og ingen Nasdaq-benchmark ✅.

### MUST
- **Ingen åbne MUST-blokere.**

### SHOULD (åbne, uændret, verificeret i kode på `24e1fce`)
1. "Gns. årligt afkast" uden "siden start 22. sep. 2023": `js/app.js:420` og `periode.html:113` ("Gennemsnitligt årligt afkast" under YTD).
2. Værdikæder er ikke AI-mærket (`vaerdikaeder.html`, `vaerdikaede.html`). Der er stadig 0 forekomster af "AI-udkast"/"maskinel" i sidernes tekst.
3. "Central Information Dokument" står i `js/data.js:283` → "Dokument med central information (KID)".
4. "kvartalssnapshot": `js/app.js:359`, `:428`, `:758` og `selskab.html:202` → "snapshot pr. 1. jun. 2026".
5. Intern sætning, nu på `omkostninger.html:372`: "Det er det tal, marketingmateriale skal gengive ærligt".

### Ny SHOULD (lav)
6. Selskabsnavne i rå form ("Iqe Plc", "Sitime Corp") og den afkortede "Power Solutions Internationa" på `vaerdikaeder.html` (se UX SHOULD 1–2). Korrekte navne hører til "klar og ikke vildledende".

### Prioritet
**1** → **2** → **3** + **4** + **5** (rene tekstrettelser, ét commit) → **6**.

## 2026-10-16 06:33 CEST · cyklus 44 (main `24e1fce`, ingen docs-delta siden cyklus 43; live = main)

Ikke juridisk rådgivning. Denne cyklus var en dybere kontrol i kilden (`docs/**` html/js/json) ud over live-sweepet på 50 URL'er.

### Kildescan
- **Rådgivningsagtigt sprog** (køb nu/sælg/anbefal*/garanter*/sikker afkast/bedste tip/kursmål/upside/risikofri/øger eksponering/overvægt/undervægt): alle hits er beskrivende ("selskabet sælger …"), KID-terminologi ("anbefalet investeringsperiode") eller negationer ("ikke en anbefaling", "ikke bevidste overvægte"). Undtagelsen er `laer/hvorfor-mange-aktier.html`: "en stor overvægt i én branche øger variansen". Det er generel pædagogik om spredning, ikke trading-sprog ✅.
- **Benchmark/Nasdaq:** "Nasdaq" står kun som noteringssted i selskabsprofiler. Overalt står "intet fast benchmark" (`fund-facts.json` "benchmark": "Nej") ✅.
- **asOf:** beholdningsdatoer (`asOf`/`positionsAsOf`/`holdingsAsOf`) er alle 2026-06-01. 2026-10-14/15 i `fund-meta`, `latest` og `risk-stats` er NAV-/afkastserier, ikke beholdning ✅.
- **Meta-beskrivelser:** alle HTML-sider er `noindex`. Ingen description lover afkast eller "vindere" ✅.

### MUST
- **Ingen åbne MUST-blokere.**

### Ny SHOULD
7. **Ikke-rådgivning mangler i footeren på `drawdown.html`, `embed/chart.html` og `periode.html`.** De tre sider har "Markedsføringsmateriale", prospekt- og KID-links, "Historisk afkast er ikke en pålidelig indikator" og tabsadvarslen, men ingen synlig "Generel information, ikke investeringsrådgivning". Det samme gælder live (tekst-længde uændret siden cyklus 41). Det blev noteret som et faktum i cyklus 26–28 ("kun tab+historik"), men blev aldrig rejst som et punkt. Det er vigtigst for **embed**, fordi grafen er beregnet til at blive delt og indlejret uden for sitet. Dens eneste "ikke rådgivning" står i `og:description`, som brugeren ikke ser. Rettelse: tilføj "Generel information, ikke investeringsrådgivning." til footerens anden linje på de tre sider. Det er den samme formulering som på fonden og om-data.

### SHOULD (åbne, uændret fra cyklus 43)
1. "Gns. årligt afkast" står uden periode ("siden start 22. sep. 2023"): `js/app.js:420`, `periode.html:113`.
2. Værdikæder er ikke AI-mærket (`vaerdikaeder.html`, `vaerdikaede.html`).
3. "Central Information Dokument" står i `js/data.js:283` og er synlig i KID-footeren på bl.a. drawdown → "Dokument med central information (KID)".
4. "kvartalssnapshot": `js/app.js:359/428/758` og `selskab.html:202`.
5. Intern sætning på `omkostninger.html:372`: "Det er det tal, marketingmateriale skal gengive ærligt".
6. Rå eller afkortede selskabsnavne (UX SHOULD 1–2).

### Prioritet
**7** (tre footere, én linje hver) + **3** + **4** + **5** samlet i ét tekst-commit → **1** → **2** → **6**.

### Addendum 06:38: main `cfb03ab` (docs-delta 10 filer siden `24e1fce`, live har AI-mærket på værdikæder = opdateret)
- **Lukket SHOULD 2 ✅:** `vaerdikaeder.html` og `vaerdikaede.html` har nu "AI-udkast. Teksterne er sammenfattet med AI ud fra NDI's ugebreve … afventer NDI-gennemgang" med link til `om-data#g-ai-udkast`.
- **SHOULD 1 halvt lukket:** `periode.html:113` siger nu "Gennemsnitligt årligt afkast siden {første NAV}" ✅. `js/app.js:420` ("Gns. årligt afkast" på fonden) står stadig uden periode.
- **SHOULD 4 delvist:** værdikæder siger nu "forsinket beholdning pr. 1. juni 2026" i stedet for "snapshot" ✅. `selskab.html:202` "Vægt over tid (kvartalssnapshots)" er uændret.
- **SHOULD 3 udvidet:** "Central Information Dokument" står også i `index.html:89` ("Se Central Information Dokument før du investerer"), ud over `js/data.js:283`.
- **Ny tekst er OK:** "Hvad ændrer sig" (`l.shift`) og plan-markering ("er en plan", "ikke fløjet" fremhævet) gør tydeligere, hvad der er fakta, og hvad der er planer ✅. Livscyklus-labels på dansk i `data.js`. X-posts er reduceret (−34 linjer, opslag/markør fra 13. aug. fjernet). Der er ingen nye købs-, sælg- eller garantiord i delta.
- **SHOULD 7 (footere på drawdown/embed/periode) er stadig åben.** Ingen af de tre footere er rørt.
- **Prioritet nu:** 7 + 3 (to steder) + 4 (selskab h2) + 5 + rest af 1 (`app.js:420`), alt sammen tekst-rettelser i ét commit → 6.

## 2026-10-16 06:40 CEST · cyklus 45 (main `b6dfcba`; live = `cfb03ab`)

Ikke juridisk rådgivning. Delta siden addendum c44: `cfb03ab` er nu live, og lane-D (`44a551a`, `b0e7cd2`) er merget på main: embed "N år siden start {dato}" og et span i drawdown.

### Korrektion
- **SHOULD 7 gælder kun `drawdown.html` og `embed/chart.html`.** `periode.html` har allerede "Ikke den officielle side og ingen investeringsrådgivning" i footeren (live og kilde, også i c44). Sweepets `radg`-flag fangede ikke formuleringen, og det blev ikke kontrolleret mod teksten. drawdown har 0 forekomster af "rådgivning" i kilden. I embed står ordet kun i `og:description`, som ikke er synlig.

### MUST
- **Ingen åbne MUST-blokere.** Fonden, portefølje, risici og invester har "ikke rådgivning/anbefaling", tabsadvarsel, historik-advarsel, KID-links og SRI 5/7. Beholdning pr. 1. juni 2026. Ingen nye købs-, sælg-, garanti- eller trading-ord i delta.

### Ny SHOULD
8. **Udforsk på mobil: mærket for maskinel klassifikation er flyttet bag en lukket `<details>`** (følger af 7a5b111). Tema- og modenhedssøjlerne vises stadig pr. række, men forbeholdet "alle som forslag (maskinelt …, afventer NDI)" kræver nu et klik. Kun "udkast-klassifikation" er synligt. Kravet om AI- og maskinmærkning taler for, at forbeholdet står synligt ved det indhold, det gælder. Rettelse: én synlig linje uden for `<details>`.

### SHOULD (åbne)
1. Rest: `js/app.js:420` "Gns. årligt afkast" på fonden står uden periode. Embed siger nu "år siden start {dato}" ✅ (`44a551a`).
3. **Næsten lukket ✅ (lane-B, `b6dfcba`):** `data.js` KID-footeren siger nu "Dokument med central information (KID, …)". Rest: `index.html:89` "Se Central Information Dokument".
4. **Lukket ✅ (lane-B):** "kvartalssnapshot" er fjernet fra synlig tekst. Fonden siger "forsinket snapshot pr. {dato}", og selskab-h2 er nu "Vægt i fonden over tid … ikke aktiekurs". Det nye warrant-afsnit på moderselskabets side ("Beholdningen har også N warrants …") er beskrivende og OK.
5. Intern sætning på `omkostninger.html:372`: "Det er det tal, marketingmateriale skal gengive ærligt".
6. Rå eller afkortede selskabsnavne (UX).
7. Footer uden ikke-rådgivning på drawdown og embed (se korrektion).

### Prioritet
**8** + **7** (to footer-linjer) + **3/4/5** og resten af **1** samlet i ét tekst-commit. Det er bugfix/tekst og falder inden for freeze-reglen efter 08:00.

## 2026-10-16 06:42 CEST · cyklus 46 (main `ffed556`; live = main)

Ikke juridisk rådgivning. Delta: ideer TOC (+1 link), livscyklus (danske modenhedsnavne), ndi-perspektiv (`displayName`), om-data (screener-ordliste). Den sidste beskriver Udforsk som "viser, hvad fonden ejer, og sorterer ikke efter, hvad der er godt at købe". Det er en god ikke-rådgivningsformulering ✅. Ingen nye købs-, sælg-, garanti-, trading-, Nasdaq- eller 1m/3m-ord i delta eller i sweepet (50 URL'er, `hits` tomme).

### MUST
- **Ingen åbne MUST-blokere.** ndi-perspektiv har fortsat ikke-rådgivning, KID-links for begge klasser, historik- og tabsadvarsel samt AI-udkast-mærker. Livscyklus siger "pædagogisk model, ikke en officiel rating" ✅.

### SHOULD (åbne, uændret i kilden pr. `ffed556`)
1. `js/app.js:420` "Gns. årligt afkast" uden periode i labelen.
3. `index.html:89` "Se Central Information Dokument" (resten af footeren er rettet).
5. `omkostninger.html:372` intern sætning "Det er det tal, marketingmateriale skal gengive ærligt".
6. Rå selskabsnavne (UX SHOULD 3/4).
7. `drawdown.html` (0× "rådgivning") og `embed/chart.html` (kun i `og:description`) mangler en synlig ikke-rådgivningslinje.
8. Udforsk på mobil: forbeholdet om maskinel klassifikation står bag en lukket `<details>`.

### Prioritet før freeze (08:00)
7 + 8 + 3 + 5 er rene tekstrettelser i ét commit, og 1 er én label. Alt falder inden for "footer/warning checks" efter 08:00.

## 2026-10-16 06:49 CEST · cyklus 47 (main `4f52bd6`; live = main)

Ikke juridisk rådgivning. Delta: 9 filer, heraf value-chains.json +2.151 linjer. Jeg har scannet alle tilføjede linjer for købs-, sælg-, anbefal-, garanti-, sikker-, bedste-, overvægt-, eksponering-, Nasdaq-, benchmark-, 1m/3m-, kursmål- og upside-ord. Alle hits er beskrivende ("sælger forbindelse", "billigere og mere sikkert end at øve med en rigtig robot", "den bedste rute") eller negationer ("ikke en rangering og ikke en anbefaling", "Det er ikke et ÅOP"). Sweep 2× 50 URL'er: `hits` uændret, "overvægt" kun som negation på temasider ✅. ndi-paa-x: "BREAKING:" står fortsat kun i opslag fra konti, NDI følger, under "ikke NDI's holdning" ✅. Karman-faktaen om købet af Walker 28. aug. 2026 er markeret "efter beholdningen" ✅.

### MUST
- **Ingen åbne MUST-blokere.**

### Lukket / forbedret ✅
- **Omkostninger:** KID-RIY 2,79/2,85 % i kroner står nu øverst på omkostninger og på fakta, gentaget med "ikke et ÅOP" og "kurtage og depot kommer oveni". Kravet om ÅOP/OCF-gennemsigtighed er opfyldt for PMINDI.
- **Periode:** gennemsnit pr. år er tydeligt adskilt fra periodeafkastet, og teksten siger "siger ikke noget om det næste år" ✅ (supplerer SHOULD 1).

### SHOULD (åbne)
1. `js/app.js:420` "Gns. årligt afkast" uden periode i labelen (fonden).
3. `index.html:89` "Se Central Information Dokument".
5. `omkostninger.html` "Det er det tal, marketingmateriale skal gengive ærligt" (intern formulering, nu omkring linje 458).
6. Rå selskabsnavne.
7. `drawdown.html` (0× "rådgivning") og `embed/chart.html` (kun `og:description`) har ingen synlig ikke-rådgivningslinje.
8. Udforsk mobil: forbeholdet om maskinel klassifikation står bag en lukket `<details>`.
9. **Ny: PMINDIAKK-visningen af fonden viser ingen omkostningsoplysning** (`app.js:346–367`). Risiko og KID-link er med, men ikke 2,85 %. Sammen med PMINDIAKK-KID'et er det ikke vildledende, men produktsiden for klassen bør vise klassens omkostningsindikator ligesom PMINDI.

### Prioritet før freeze (08:00)
9 + 7 + 3 + 5 + 1 er små tekst- og blokrettelser og falder alle under "bug fixes/footer/warning checks".

## 2026-10-16 06:57 CEST · cyklus 48 (main `83c64d0`; live = main)

Ikke juridisk rådgivning. Delta siden `4f52bd6` er 17 filer: lane-A/C kildeangivelser (ugebrev/BLOG/BOG → "NDI-indlæg <dato>", "NDI's bog"), invester (IFS-forkortelse fjernet), fonden CAGR-label, udforsk maskinel-note, `displayName`, profil-fallback og unique-metrics (+132 linjer, nye felter "Forretningsmodel"/"Svært at kopiere" med `ai: true`). Sweep 2× 50 URL'er: `hits` uændret, "overvægt" kun som negation, intet nyt købs-, sælg-, garanti-, trading-, Nasdaq- eller 1m/3m-sprog. 0 forekomster af "NDI ugebrev|BLOG" i docs/.

### MUST
- **Ingen åbne MUST-blokere.**

### Lukket ✅
- **SHOULD 1:** "Gns. årligt afkast siden start" med periode `<første NAV> - <asOf>` og "efter løbende omkostninger".
- **SHOULD 6:** Rå selskabsnavne er rettet (WORD_FIX).
- **SHOULD 8:** Maskinel-forbeholdet på udforsk er synligt uden klik.
- **Kildeangivelse (lane-A's MUST):** Det er konsistent på tværs af siderne nu (ideer, om-data, laer/tidslinje, laer/saadan-taenker-vi og værdikæder).
- **Profil-fallback:** Teksten er tydeligt mærket "AI-udkast" og "Kort udkast fra NDI-linsen (AI, afventer NDI-gennemgang)" ✅. "Svært at kopiere" har "Beskrivelse, ikke en vurdering" (Tesla). Moat-sprog kan læses som en kvalitetsvurdering, så **hold øje med**, at negationen står på alle nye `Svært at kopiere`-felter (stikprøve: Tesla ✅).

### SHOULD (åbne, uændret i kilden pr. `83c64d0`)
3. `index.html:89` "Se Central Information Dokument" (bør være "Central Information" / "KID" konsekvent).
5. `omkostninger.html:458` "Det er det tal, marketingmateriale skal gengive ærligt" (intern formulering).
7. `drawdown.html` (0× "rådgivning") og `embed/chart.html` (kun `og:description`) har ingen synlig ikke-rådgivningslinje.
9. PMINDIAKK-visningen af fonden viser ingen omkostningsindikator (2,85 %).

### Prioritet før freeze (08:00)
9 + 7 + 3 + 5 er fortsat fire små tekst- og blokrettelser. De falder alle under "bug fixes/footer/warning checks" efter 08:00.

## 2026-10-16 07:01 CEST · cyklus 49 (main `83c64d0` uændret; live = main)

Ikke juridisk rådgivning. Der er ingen docs-delta siden c48. Sweep 50 URL'er (c49): hits og flags er identiske med c48b. Intet nyt købs-, sælg-, garanti-, trading-, Nasdaq-benchmark- eller 1m/3m-sprog. PMINDIAKK viser stadig ingen NAV/kurs før 5. dec. 2026 ✅.

### MUST
- **Ingen åbne MUST-blokere.**

### SHOULD (åbne, verificeret i kilden pr. `83c64d0`)
3. `index.html:89` "Se Central Information Dokument" → "Se KID'et (Central Information) før du investerer".
5. `omkostninger.html:458` "Det er det tal, marketingmateriale skal gengive ærligt" (intern formulering, fjern eller omskriv).
7. `drawdown.html` (0× "rådgivning") og `embed/chart.html` (kun `og:description`) mangler en synlig ikke-rådgivningslinje.
9. PMINDIAKK-fondsvisningen mangler omkostningsindikatoren (2,85 %).

### Prioritet før freeze (08:00)
Rækkefølge: 9 → 7 → 3 → 5. Alle fire er små rettelser af tekst eller advarsler og må laves efter 08:00 som fejlrettelser. Stop-commit er 08:30.

## 2026-10-16 07:03 CEST · cyklus 50 (main `83c64d0` uændret; live = main)

Ikke juridisk rådgivning. Der er ingen docs-delta siden c48/c49. Live md5 = lokal for index, drawdown, omkostninger, embed/chart og js/app.js. Nøglesider (/, selskab SoftBank, temaer, invester, om-data, risici, værdikæder) svarer 200. Fonden er en `?view=`-rute og ikke en fil, så `fonden.html` 404 er forventet. Ordsweep i docs/: "overvægt" findes kun som negation ("Ikke en anbefaling eller en bevidst overvægt", temaer:152 og tema:179), og "anbefaling" kun i "Ikke en anbefaling". Der er 0 forekomster af garanti, "øger eksponering", 1 md/3 md eller Nasdaq-benchmark. PMINDIAKK-grenen (`js/app.js:346`) viser stadig ingen NAV/kurs før 5. dec. 2026 ✅.

### MUST
- **Ingen åbne MUST-blokere.**

### SHOULD (åbne, genverificeret i kilden pr. `83c64d0`)
9. `js/app.js:346–367` PMINDIAKK-visningen mangler omkostningsindikatoren (2,85 %, grep 0 hits i app.js).
7. `drawdown.html` har 0× "rådgivning", og `embed/chart.html` har den kun i `og:description`. Begge mangler en synlig ikke-rådgivningslinje.
3. `index.html:89` "Se Central Information Dokument" → "Se KID'et (Central Information) før du investerer".
5. `omkostninger.html:458` "Det er det tal, marketingmateriale skal gengive ærligt" er en intern formulering.

### Freeze-note
Alle fire er tekst- og advarselsrettelser og må laves efter 08:00 som fejlrettelser. Stop-commit er 08:30. Lane-R retter dem ikke (read-only), så de skal tages af ejer-lanerne.
