# PERSONA: Family office — NDI Analytics udkast

**Agent:** Testinvestor Family Office  
**Live URL:** https://christianhornskov.github.io/ndi-analytics-udkast/  
**Første runde:** 2026-10-15 ~23:40–23:55 CEST  
**Screenshots:** `notes/ux-screens/fo-01-*.png` … `fo-08-mobile-fonden.png`

## Opgave (Leo / Christian)
Vurdér udkastet med et family office-blik: due diligence før allokering. Læs NDI-investeringslogik (Vidensbot) og offentlig peer-materiale fra andre forvaltere; bedøm derefter, hvad en professionel manager normalt stiller til rådighed.

---

## 1. NDI-linse (læst før review)

Kilder (interne Vidensbot-noter, læst 15. okt. 2026):
- `/workspace/viden/emner/investeringsfilosofi_bog.md` — *Den lille guide til investering i teknologiaktier* (Christiansen/Bæk, 2025)
- `/workspace/viden/emner/mads_tankemodel.md` — Mads-simulator / fond vs. privat

**Hvad FO bør kunne aflæse på siden (kerne):**
1. Retning frem for vinder; hele værdikæden, ikke stockpicking.
2. Variansdrag → bred spredning, små positioner (typisk 0,05–1 %).
3. Tech værdisættes ikke med P/E/nutidsindtjening; kursfald ≠ risiko for langsigtet.
4. Skarp skelnen bog (privat) vs. fond (daglig rebalancering) — offentlig side må ikke blande dem.
5. Ingen køb/sælg-holdninger; AI-tekst tydeligt mærket; 100 % vidensdeling.

---

## 2. Peer-benchmark (offentligt materiale, intet login)

Hvad professionelle managers typisk har på ét faktaark / investor resources:

| Element | ARK (ARKX factsheet, as of 30.09.2025) | Baillie Gifford / Scottish Mortgage | Danske Invest Teknologi Indeks KL | C WorldWide Nordic | Maj Invest Value Aktier |
|---|---|---|---|---|---|
| ISIN / ticker / AUM | Ja | Ja | Ja (formue, NAV) | Ja | Ja |
| Omkostninger (OCF/ÅOP) | Net expense 0,75 % | Fees fremhævet | Løbende 0,50 % + emission/indløsning | (GIPS-komposit; fees i literature) | Løbende + emission/indløsning |
| Performance vs. indeks | S&P 500, MSCI World | Benchmark/NAV | Benchmark + tracking error | MSCI Nordic + relativ | MSCI World NR DKK |
| Risiko (vol, Sharpe, SRI) | Risikoafsnit | Target market / KID | Vol, Sharpe, TE, IR, SRI | Std.dev., beta | SRI / PRIIP |
| Top-10 + sektorer/geo | Ja | Ja | Top-10 (1 md forsinket) | Top-10 + bidrag | Typisk |
| Holdings-forsinkelse eksplicit | Holdings CSV på site | — | «forsinket med 1 måned» | — | — |
| Filosofi / investment case | Investment case PDF + Big Ideas | Distinctive DNA-præsentation | Kort politik | Filosofi på 2-pager | Kort value-filosofi |
| Governance / docs | Prospectus, ADV | KID, literature library | Prospekt, KID, årsrapport | GIPS-rapport på forespørgsel | Prospekt, KID |

**Kilder (URL’er, hentet 15. okt. 2026):**
1. ARK Investor Resources — https://www.ark-invest.com/investor-resources  
2. ARK Investment Case (Disruptive Innovation) — https://research.ark-invest.com/hubfs/1_Download_Files_ETF_Website/Investment_Case/Investment%20Case%20For%20Disruptive%20Innovation.pdf  
3. ARKX Factsheet (30.09.2025) — https://etfs.ark-funds.com/hubfs/1_Download_Files_ETF_Website/Fact_Sheets/ARKX_Factsheet.pdf  
4. Scottish Mortgage Factsheet (sep. 2026) — https://media.bailliegifford.com/mws/o3qhlmis/20261008090014-scottish-mortgage-factsheet-september-2026-uk.pdf  
5. Scottish Mortgage documents — https://www.scottishmortgage.com/en/uk/individual-investors/documents  
6. Danske Invest Teknologi Indeks KL faktaark (15.10.2026) — https://www.danskeinvest.se/docs/FACTSHEET_1031_75_da.pdf  
7. C WorldWide Nordic two-pager (31.08.2026) — https://cworldwide.com/media/pdf/twopager/nordic-composite-two-pager-6042-dkk-en-GB-31-aug-2026.pdf  
8. Maj Invest Value Aktier faktaark — https://www.majinvest.dk/data/docs/factsheet/F0GBR064VU.pdf  

**FO-forventning udledt af peers:** ét downloadbart faktaark med AUM, omkostninger, afkast vs. reference, risikotal, top-10, sektorer/geo, forsinket beholdning med dato, plus KID/prospekt og en kort filosofi der matcher forvaltningen.

---

## 3. Samlet vurdering (runde 1)

**Verdict:** Stærk **transparens- og undervisningslag** (disclaimer-disciplin, datostempler, ærlige drawdowns, klar klasseforskel). **Ikke nok til due diligence** endnu. Mangler tre ting peers altid har: governance/fund facts, omkostningstal, benchmark/risikostatistik + eksport.

Tonungen er rigtig: information, ikke rådgivning; ikke retail-hype. NDI-kernen (retning ≠ vinder, bredde, forsinket beholdning) er til stede, men filosofien er mest i *Lær* — peers lægger investment case på forsiden af factsheetet.

---

## 4. Top 3 MUST (family office due diligence)

1. **Ingen governance-/fund-facts-blok.** Kun «NewDeal Invest forvaltes af et porteføljehold … Læs mere på newdealinvest.dk.» Mangler AUM, juridisk struktur, administrationsselskab, depositar, revisor, Finanstilsynet-status, navngivet team, likviditet/handel og fondsdokumenter ud over KID.
2. **Omkostninger beskrives, men uden tal.** Fonden: «Afkasttal er efter fondens løbende omkostninger… Se KID…» Ingen ÅOP/OCF %, ingen transaktionsomkostninger, ingen performance fee ja/nej. Skattebehandling af klasserne (lager, aktie- vs. kapitalindkomst, selskab/holding) er ikke dækket; sammenlign siger kun «afhænger af din egen situation, fx skat».
3. **Ingen reference + beholdning under FO-standard.**
   - «Fonden har intet fast benchmark» og ingen sammenligningskurve / vol / Sharpe → +104,8 % / CAGR +26,4 % kan ikke bedømmes.
   - Beholdning «pr. 1. jun. 2026» vs. afkast «14. okt. 2026» (~4,5 md gap).
   - «Ingen af fondens 345 selskaber er klassificeret endnu»; mange «forslag»; ~11,6 % «Andet». Tagfejl (fx Cipher Mining = Software). Selskabstekster = AI-udkast → IC vil nedvægte.

---

## 5. SHOULD
- Formelt factsheet-PDF + NAV/afkast-CSV + beholdningseksport med datostempel i filen.
- Top-10-vægt, valuta-/lande-/market-cap-split; cash eksplicit (aktievægt «ca. 92 %»).
- Kort «hvorfor hele værdikæden / variansdrag»-boks på Fonden/Entré (ikke kun i Lær).
- Drawdown: recovery-varighed, rolling 12m, volatilitet.
- Ret små inkonsistenser (AKK-dato «december» vs «5. dec.»; 100k-eksempel «afventer Fundmarket-godkendelse»; stubs).
- Fjern intern jargon fra offentlige sider (`docs/`, Azure, Vidensbot, Jesper-palette, «interne noter»).

---

## 6. Det der allerede virker (behold)
- Compliance-copy konsekvent; «eksponering, ikke anbefaling».
- To-delt datostempel (afkast vs. forsinket beholdning).
- Præcis afkastdefinition; første NAV 22. sep. 2023; røde måneder synlige med vilje; ingen 1m/3m-cherry-pick.
- Udbytte ex-datoer dokumenteret; AKK-gate «efter 12 måneder».
- Klasse-sammenligning klar (overlap 320/320).
- KID i footer med SRI; vægt ≠ kurs forklaret; AI-udkast mærket på selskabssider.
- Mobil 375 holder (periodeknapper wrapping OK).

---

## 7. Sektion for sektion (live)
- **Entré:** 3 døre + «Sådan tænker vi» rigtigt signal; mangler AUM/team/governance.
- **Fonden PMINDI:** +104,8 % / CAGR +26,4 % / max DD −35,8 % / SRI 5/7; omkostninger uden tal.
- **PMINDIAKK:** gate OK; ISIN-kopi OK.
- **Portefølje:** 345 navne; Sea 2,13 % / SoftBank 1,51 % / Carvana 1,28 %; klassifikation tom.
- **Udforsk:** filtre + CSV; udkast-klassifikation.
- **Drawdown:** max −35,8 %, 41 episoder, underwater — ærlig; mangler vol.
- **Risici:** KID-resume; let for FO (ingen likviditet/koncentration/modpart).
- **Invester:** retail-neutral; intet om institutionel tegning/depositar.

---

## 8. Plan for runde 02:00 og 05:00
Genbesøg live-URL; tjek om MUST 1–3 er rørt; opdater denne fil med tidsstemplet afsnit; kort top 3 til Leo.

---

*Ikke færdig. Quality > speed. Notes kun under `/notes`, aldrig under `docs/`.*
