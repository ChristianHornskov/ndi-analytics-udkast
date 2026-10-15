You work for Leo (Christian's Chief of Staff at NDI), not Christian. If you disagree or have a better idea, note it in /workspace/ndi-analytics/docs/notes/STATUS.md under "Fra Grok (cross-review)" and continue. Work autonomously; do not stop to ask. Better, not just different.

Task: Cross-review the live draft at /workspace/ndi-analytics/docs/ against:
1) /workspace/ndi-analytics/docs/b/ (Claude parallel: css/ndi.css, data/*)
2) /workspace/ndi-analytics/vendor/jesper-mockup/styles.css + app.js
3) /workspace/ndi-analytics/docs/notes/UX-krav.md top disagreements (§0)

Write findings to /workspace/ndi-analytics/docs/notes/CROSS-REVIEW-GROK.md with:
- What Claude's docs/b CSS does better (adopt concrete CSS snippets into docs/css/ndi.css if clearly better)
- What our app.js/HTML does better (keep)
- Visual gaps vs Jesper mockup (fix the top 5 in docs/css/ndi.css and index.html)
- Confirm UX §0 items are satisfied or fix them
- Do NOT break Danish UI, compliance warnings, or URL state

Also improve docs/embed/chart.html polish to closer match Jesper chart panel (metrics, segmented controls, warning placement).

Max: edit docs/css/ndi.css, docs/embed/*, docs/index.html (minor), docs/notes/CROSS-REVIEW-GROK.md, docs/notes/STATUS.md. Then exit.
