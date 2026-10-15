# Lane X: NDI på X og FO-fakta

**Snapshot:** 2026-10-15 (uændret 2026-10-16)  
**Branch:** lane-X  
**Deadline:** keep until 08:30, polish, report 08:45, demo 09:00.

## Denne nat (2026-10-16)

Ét poleringspas. Ingen nye X-kald. `docs/data/x-posts.json` og `callCountNote` er urørt (21 opslag, limits 30/min og 1000/day, ét søgekald 2026-10-15 efter SoftBank hos BullTheoryio). Browseren kalder ikke X. Ingen embed. Ingen secrets. NewDeal Invest i ét ord.

- `docs/js/x-feed.js`: lead-kort spænder begge kolonner i både selskab/tema-panelet og i feedet, når der er søgning eller et temafilter. Initialer: to ord = første + sidste ord; ét langt ord = første + sidste bogstav (FUNDA → FA, ikke FU). Panelbåndet slutter labelen med punktum før «Snapshot». Direkte træf (score ≥ 2) vs. tema er uændret i rangeringen. SoftBank (`9984.T`) og NVDA ligger foran rene tema-træf.
- `docs/ndi-paa-x.html`: tre døre med tre forskellige opslag. SoftBank = seneste (FundaAI, 15. okt.). Nvidia = seneste (Melvin, 14. okt.). Chips/AI = eksempel (Mads, 14. okt.), fordi det nyeste chips-opslag er det samme som SoftBank-døren. Filtre, tællinger, tom tilstand og `?f=&q=&who=` som før. Label i advarslen og i footeren.
- `docs/fakta.html`: blikket siger samme SRI, horisont og øvrige løbende, og at porteføljetransaktion er 0,64 % mod 0,72 %. Linket er «Se søjlerne →». Risikotal kun fra `risk-stats.json`: 32,46 %, Sharpe 0,89, max drawdown −35,82 %. Bunddato 8. apr. 2025 vises. Feltet `maxDdPeak` står som 2. jun. 2026, altså efter bunden, og er ikke tegnet som start på faldet. Officielt vol/Sharpe og revisor står som «udfyldes af NDI».
- `docs/omkostninger.html`: satser kun fra `fund-facts.json`. Fælles skala 0–2 %. Gul kant kun på porteføljetransaktion (0,08 procentpoint, 80 kr. på 100.000 kr.). Kvitteringer: 1.490 kr., 640 kr. / 720 kr., 250 kr. ind og ud. Ingen sum. Ikke et ÅOP.

`docs/css/ndi.css` har ucommittede linjer, som ikke er denne lanes. De er ikke med i commit.

## Label

«Udvalgte offentlige opslag — ikke NDI's holdning»

## Verifikation

Headless Chrome mod denne worktree (port 8899), 1280 og 390: overflow 0 på NDI på X, fakta, omkostninger, SoftBank, Nvidia og temaerne chips, platforme, compute, quantum og space. SoftBank- og NVDA-paneler viser «Direkte træf». Space er kun tema, som ventet. Dump af fakta viser risikoteksten og tallene ovenfor. Sidste tjek: SoftBank-søgning giver et lead-kort i fuld bredde, og panelbåndet læser «…holdning. Snapshot 15. okt. 2026.»

## Limits

x MCP: 30/min, 1000/day. Browser does not call X. Ingen nye kald i denne cyklus.

## Open for Christian

- Auditor name (fællesprospekt).
- Confirm calculated vol/Sharpe vs any internal factsheet. Siden viser kun `risk-stats.json` (32,46 / 0,89 / −35,82 pr. 2026-10-14) og siger, at det ikke er et officielt Fundmarket-tal.
- `maxDdPeak` i `risk-stats.json` er 2026-06-02, efter `maxDdTrough` 2025-04-08. Et tjek af PMINDI-totalserien i `portfolio.json` giver samme −35,82 % med top 2025-02-18 og bund 2025-04-08. Siden finder ikke på 2025-02-18. `risk-stats.json` ejes ikke af lane X.
- Which X accounts/themes to pin permanently.
