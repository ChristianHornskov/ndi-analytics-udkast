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
