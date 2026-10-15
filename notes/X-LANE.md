# Lane X: NDI på X og FO-fakta

**Snapshot:** 2026-10-15  
**Deadline:** keep until 08:30, polish, report 08:45, demo 09:00.

## This cycle (lane-X)

X-feedet og de to FO-sider er poleret til morgen-demoen. Browseren kalder ikke X. Ingen embed-script. Ingen secrets.

- `docs/js/x-feed.js`: egne kort (avatar, dato, tags, link til X), filterlogik, tom tilstand, og `xSaysPanel` til selskab/tema. SoftBank (`9984.T` / SoftBank) og NVDA rangeres foran rene tema-træf. Label på panelet: «Udvalgte offentlige opslag — ikke NDI's holdning».
- `docs/ndi-paa-x.html`: genveje til SoftBank, Nvidia og chips, søgning, temafiltre med antal, afsender (NDI-konti / konti Mads følger), tom tilstand med nulstil, URL `?f=&q=&who=`.
- `docs/data/x-posts.json`: 21 opslag. To nye fra @BullTheoryio (konto i `mads_following.txt`), id `2108845669687640090` (10. okt. 2026, SoftBank/OpenAI) og `2081548645808402539` (27. jul. 2026, Nvidia/SoftBank, uddrag med ellipse). `callCountNote` beholder limits 30/min og 1000/day og nævner ét ekstra søgekald.
- `docs/fakta.html`: to klassekort (ISIN, kopiér, SRI 5/7, horisont, ESG, benchmark), organisation, hold, skat, risikotal kun fra `risk-stats.json`. Revision og officielt vol/Sharpe står som «udfyldes af NDI».
- `docs/omkostninger.html`: satser kun fra `fund-facts.json`. Fælles søjleskala 0 til 2 %. Regneeksempel er satsen ganget med 100.000 kr. og er mærket som ikke-ÅOP.

Tjekket i headless Chromium ved 1280 og 390: SoftBank-panel, NVDA-panel, tema chips/platforme/quantum/space, filter + tom søgning + nulstil, ingen vandret overflow, ingen pageerror. Ingen opfundne Fundmarket-tal.

## Label

«Udvalgte offentlige opslag — ikke NDI's holdning»

## Limits

x MCP: 30/min, 1000/day. Browser does not call X.

## Open for Christian

- Auditor name (fællesprospekt).
- Confirm calculated vol/Sharpe vs any internal factsheet.
- Which X accounts/themes to pin permanently.
