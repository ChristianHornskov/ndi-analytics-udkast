# NDI graf-v2 — reproducible presentation build

See **[BUILD.md](BUILD.md)** for the current build, test and deployment process.
Canonical source inventory:

- `src/wrapper.html` and `src/graph.js`: editable wrapper and graph source.
- `graph-v2/ux-20261014.js`: UX layer, inserted exactly once.
- `src/company.html`, `src/company-data.json`: company template and approved
  public profiles/media, without private reports or holdings snapshots.
- `graph-v2/company-editorial.js`, `src/x-insights.js`: company/X presentation.
- `src/company-library.json`: approved public editorial catalogue.
- `graph-v2/wix-resize.html`: V2-only Wix bridge; `tools/wix_check.mjs` checks it locally.
- `tools/build.py`, `tools/deploy.py`, `tests/`: offline build, scoped deployment,
  and tests. Git push never publishes to Azure or Wix.

Generated `dist/` is ignored. The old candidate, partial V1 sources and one-off
publishers have been removed. No V1 operational scripts are dependencies.

## Må ikke røres i V2-arbejdet
V1 (forside, /portefoljer, /portefolje-model), Azure `graph/latest.json`, `releases/`, basic.html/full.html, job-newdeal-daily, beregninger, SharePoint, mailjob, rettigheder, fælles Wix-header/footer, X-feedets data. Brug altid betinget upload, aldrig blind overskrivning.

## Wix-fejlen (tomt element)
Diagnose og løsning: se REVIEW-CLAUDE.md. Wix' HTML-element server-renderes ikke og monteres
sent; `graph-v2/wix-resize.html` reserverer højde og har en reserve-iframe. Ikke indsat i Wix endnu.
