# Isolated review build, 31 October 2026

Source: V18 export 5 (`8e7de82`). Output: `docs/energi-konkurrence/v19-review/`.
This builder never uploads anything, calls Azure, or modifies V18.

Run with Python 3 and lxml:

```
python review-input/build.py
python review-input/test_review.py
node --check docs/energi-konkurrence/v19-review/assets/js/review-widget.js
```

The entry point is `widget/index.html`. Its two buttons lead to `portfolio/index.html`
(portfolio) and `tech.html` (technology). Only the widget loads both share classes.
All deeper pages retain the original PMINDI portfolio dataset.

## Data

`funds-snapshot.json` is a subset of publicly published Azure release
`93111a1f2383de6f0f234a290818f02781f6e914a1dc8940b6c1f7b5f6480b4a`:
`https://ndigrafdatab5174313.blob.core.windows.net/graph/releases/93111a1f2383de6f0f234a290818f02781f6e914a1dc8940b6c1f7b5f6480b4a/data.json`.
Report date: 30 October; latest NAV: 29 October. The preview is a dated snapshot,
not an automatic daily feed. Nasdaq retains export 5's total-return DKK series;
for the accumulating class it is rebased only if both dates match exactly.
No market-data requests or cloud deployments happen during a build.

## Work still in progress

- Integrate and review Claude's separately delivered mobile animation fixes.
- Integrate verified video and X inventories from Grok; flagged videos remain excluded.
- Phone/AI journey restored from V5 illustrations with direct navigation; finish visual review.
- Finish SpaceX history layout and the interactive business illustration.
- Complete mobile, desktop and light-theme review before any Wix release.

This is an integration checkpoint, not approval for production deployment.
