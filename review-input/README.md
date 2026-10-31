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

## Review status, 31 October

The review includes the animation integration, SpaceX refinements, curated media,
chip-chain component and searchable company directory. The latest pass is limited
to Christian's items 2, 3, 4 and 6: journeys, weaker layouts, media and mobile QA.
See UX-JOURNEY-REVIEW-20261031.md for coverage and limitations.

The independent Grok/Claude reviews, data pipeline work, compliance review and
Wix publication remain deferred. This branch is not approval for production.
