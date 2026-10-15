# Lane X — NDI på X + FO fakta

**Snapshot:** 2026-10-15 ~23:48 CEST  
**Deadline:** keep until 08:30, polish, report 08:45, demo 09:00.

## Shipped (main)
- `docs/data/x-posts.json` — 19 curated public posts, no secrets; accounts InvestNewdeal, MadsC007, jesper_baek, CHornskov + mads_following picks (FundaAI, MilkRoadAI, MelvinInvests, BullTheoryio).
- `docs/ndi-paa-x.html` — filterable feed, own cards, no embed.
- `docs/js/x-feed.js` — shared cards + `xSaysPanel` for selskab/tema.
- Chart cyan X markers (click → x.com), nearest trading-day snap.
- `docs/fakta.html` + `docs/omkostninger.html` from Fundmarket `fund-facts.json`.
- `docs/risici.html` + `risk-stats.json` — vol ~32,5 %, Sharpe ~0,89 (rf=0, calculated), max DD −35,8 %; official vol/Sharpe = udfyldes af NDI.

## Label
«Udvalgte offentlige opslag — ikke NDI's holdning»

## Limits
x MCP: 30/min, 1000/day; max 25 results/call. Browser does not call X.

## Open for Christian
- Auditor name (fællesprospekt).
- Confirm calculated vol/Sharpe vs any internal factsheet.
- Which X accounts/themes to pin permanently.
