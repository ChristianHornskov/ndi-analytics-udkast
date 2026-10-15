# Lane X: NDI på X og FO-fakta

**Snapshot:** 2026-10-16  
**Branch:** lane-X  
**Deadline:** keep until 08:30, polish, report 08:45, demo 09:00.

## Denne nat (2026-10-16) · andet pas

Ingen nye X-kald. `callCountNote` beholder 30/min og 1000/day, noten om ét søgekald 2026-10-15, og at der ikke er kaldt 2026-10-16. Tilføjet: andet poleringspas, stadig ingen kald. 21 opslag uændret. Browseren kalder ikke X. Ingen embed. Ingen secrets. NewDeal Invest i ét ord. Tal kun fra `fund-facts.json` og `risk-stats.json`.

- `docs/js/x-feed.js` og `docs/ndi-paa-x.html`: et aktivt spor gør dørene kompakte og skjuler tomme filtre. Lead-kortet er et citat med navnet i gul. På desktop lander SoftBank-søgningen med dørene hele og FundaAI-citatet i første skærm. På mobil (390) scroller resultatet op, så citatet står under headeren; filtrene ligger over og er ikke sticky i det spor. Tom tilstand siger 0 og navngiver filtrene («Aktivt: Quantum · konti Mads følger»). Spor-logikken fra første pas er uændret: direkte før tema, temakurv reserverer ét tema-kort, selskabssider reserverer ikke.
- `docs/fakta.html`: risikotallet står nu lige under de fire blik-kort, før andelsklasserne. 32,46 %, Sharpe 0,89, max drawdown −35,82 %. Bund 8. apr. 2025. Topfeltet 2. jun. 2026 er stadig stiplet og er ikke tegnet som start på faldet. Søjlen er stadig 0–100 % og ikke forstørret. Officielt vol/Sharpe og revisor er «udfyldes af NDI».
- `docs/omkostninger.html`: heroen er stadig 0,64 % / 0,72 % / 80 kr. Skalaen 0–2 % er uændret og lille med vilje. Under den ligger et udsnit 0,48–0,88 %, mærket forstørret, så de to markører kan skelnes (40 % og 60 % på udsnittet). Noten siger, at forskellen stadig er 0,08 procentpoint og ikke et ÅOP. Kvitteringerne er uændret: 1.490 kr., 640 kr. / 720 kr., 250 kr. Ingen sum.

## Første pas (2026-10-16)

- `docs/js/x-feed.js`: panelet deler udsnittet i to spor. Direkte træf (score ≥ 2) står først, tema under. Rangeringen inden for hvert spor er uændret. På en temakurv (flere end to tickers) reserveres ét tema-kort, så NVDA eller SoftBank ikke fylder hele grænsen. Selskabssider (ticker + navn) reserverer ikke: SoftBank viser de tre opslag, der nævner navnet, og siger at rene tema-opslag er udeladt. Space er kun tema. Lead-kort spænder begge kolonner. Label med punktum før «Snapshot».
- `docs/ndi-paa-x.html`: tre døre. SoftBank og Nvidia er direkte og viser seneste opslag (FundaAI 15. okt., Melvin 14. okt.). Chips / AI er tema og et eksempel (Mads 14. okt.), fordi det nyeste chips-opslag er SoftBank-døren. Søgning og Chips / AI deler feedet i de samme to spor. Tom tilstand viser 0 og de aktive filtre. `?f=&q=&who=` som før.
- `docs/fakta.html`: fire blik-kort. SRI 5 af 7, horisont 5 år og øvrige løbende 1,49 % er ens. Porteføljetransaktion er 0,64 % mod 0,72 %, 0,08 procentpoint, med gul kant. Linket «Se søjlerne →» peger på omkostninger. Risikotal: 32,46 %, Sharpe 0,89, max drawdown −35,82 %. Bund 8. apr. 2025. Topfeltet 2. jun. 2026 står i et stiplet kort og er ikke tegnet som start på faldet. Officielt vol/Sharpe og revisor er «udfyldes af NDI».
- `docs/omkostninger.html`: satser kun fra `fund-facts.json`. Heroen er den ene forskel: 0,64 % / 0,72 %, 80 kr. på 100.000 kr., markører på skalaen 0–2 %. Afstanden er lille med vilje. Kvitteringer: 1.490 kr., 640 kr. / 720 kr., 250 kr. ind og ud. Gul kant kun på porteføljetransaktion. Ingen sum. Ikke et ÅOP.

`docs/css/ndi.css` har ucommittede linjer, som ikke er denne lanes. De er ikke med i commit.

## Label

«Udvalgte offentlige opslag — ikke NDI's holdning»

## Verifikation

Headless Chrome mod denne worktree (port 8899), 1280 og 390: overflow 0 på NDI på X, SoftBank-søgning, Nvidia-søgning, Chips / AI, tom tilstand (quantum + konti Mads følger), fakta, omkostninger, SoftBank, Nvidia og temaerne chips, platforme, compute, quantum og space. SoftBank-panelet: «Viser 3 direkte · 6 i alt», lead i fuld bredde, «Direkte træf», SoftBank markeret. Chips: «3 direkte og 1 tema». Space: «1 tema» og noten om, at ingen opslag nævner tickeren. Fakta viser 32,46 / 0,89 / −35,82, bund 8. apr. 2025 og topfelt 2. jun. 2026, og blokken står før ISIN. Omkostninger viser 1,49 %, 0,64 %, 0,72 %, 80 kr. og udsnittet 0,48–0,88 % med markører 40 % / 60 %. Panelbåndet læser «…holdning. Snapshot 15. okt. 2026.» SoftBank-søgning: lead-citatet er i første skærm på 1280 og på 390, og ordet SoftBank er markeret.

## Limits

x MCP: 30/min, 1000/day. Browser does not call X. Ingen nye kald i denne cyklus.

## Open for Christian

- Auditor name (fællesprospekt).
- Confirm calculated vol/Sharpe vs any internal factsheet. Siden viser kun `risk-stats.json` (32,46 / 0,89 / −35,82 pr. 2026-10-14) og siger, at det ikke er et officielt Fundmarket-tal.
- `maxDdPeak` i `risk-stats.json` er 2026-06-02, efter `maxDdTrough` 2025-04-08. Et tjek af PMINDI-totalserien i `portfolio.json` giver samme −35,82 % med top 2025-02-18 og bund 2025-04-08. Siden finder ikke på 2025-02-18. `risk-stats.json` ejes ikke af lane X.
- Which X accounts/themes to pin permanently.
