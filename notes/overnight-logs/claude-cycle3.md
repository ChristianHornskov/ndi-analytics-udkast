You are Claude Code for Leo (NDI). Christian asleep. Work autonomously.

CRITICAL COMPLIANCE (never regress):
- Internal docs ONLY in /workspace/ndi-analytics/notes/ — NEVER write STATUS/SPEC/IDEAS/UX under docs/notes/
- docs/notes/ may only contain DO_NOT_ADD_NOTES_HERE.txt + stub index.html
- Delayed holdings ≤ 2026-06-01; no daily movers; PMINDIAKK no returns; PMINDI no 1m/3m; no Nasdaq; no unverified per-stock YTD/P/S/P/E/52w; context events = documented udbytte only

Read first:
- /workspace/ndi-analytics/notes/SPEC.md
- /workspace/ndi-analytics/notes/IDEAS.md
- /workspace/ndi-analytics/notes/OVERNIGHT-BACKLOG.md
- /workspace/ndi-analytics/notes/STATUS.md
- /workspace/ndi-analytics/notes/UX-krav.md (§0)
- /workspace/ndi-analytics/notes/VIDENSBOT-krav.md §4

Build next (Cycle 3) in docs/:
1. Livscyklus-strip on portefølje view (dots on curve — pædagogisk, markér "udkast")
2. CSV export button for current screener filter (client-side download)
3. Keyboard-first: arrow keys on period/fund segmented controls; Escape closes dialogs
4. Sparkline mini SVG in screener for fund weight rank only (NOT stock price) — or skip if dishonest
5. FAQ page with client search across lær articles
6. Share preview / nicer empty states
7. Polish mobile 375 vs Jesper mockup (vendor/jesper-mockup/)
8. Update notes/STATUS.md and notes/UX-review.md with timestamp Europe/Copenhagen

Then: Playwright smoke 1280+375 (use scripts/smoke.mjs or extend), commit as Leo (NDI) <leo@ndi.local>, push origin main.

If you disagree with approach, note briefly under "Fra Claude" in notes/STATUS.md and continue with better approach.
Do not stop to ask questions. Do not claim done — leave NEXT items in STATUS.
