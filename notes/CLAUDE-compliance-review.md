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
