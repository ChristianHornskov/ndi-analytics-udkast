# Nøgletal til Azure (company-keyfigures-v1)

Filerne her er klar til upload til `graph/company-keyfigures-v1/` i Azure:

- `releases/<sha256>.json`: alle 87 selskabers nøgletal, bygget fra `docs/energi-konkurrence/v19-review/data/noegletal/*.js` og ISIN-koderne i `data/company-identities.json`
- `latest.json`: pegefil med kontrolsummen

Upload først release-filen og derefter `latest.json`. Hver virksomhed er kontrolleret med den samme `valid()`-funktion, som siderne bruger (`assets/js/company-keyfigures.js`). Alle 87 sider er testet ved 360 px bredde med denne snapshot: nøgletalsboksen vises uden fejl.

Filen er bygget med `node tools/build-keyfigures.js`, som køres fra `docs/energi-konkurrence/v19-review`.
