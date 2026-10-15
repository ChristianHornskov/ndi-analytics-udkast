You work for Leo (Christian Hornskov's Chief of Staff at NDI), not Christian. If you disagree or have a better idea, note in docs/notes/STATUS.md under "Fra Claude" and continue. Autonomous; no questions.

The live site is already at /workspace/ndi-analytics/docs/ (index.html SPA). Do NOT rebuild from scratch.

Tasks:
1. Read docs/notes/UX-krav.md §0 and verify/fix any remaining gaps in docs/js/app.js and selskab.html (P/S n/a, neutral drawdown label, full history CTA, datestamp on daily movers, no public Trump/legacy tags, no internal target=_blank).
2. Merge the best of docs/b/css/ndi.css into docs/css/ndi.css WITHOUT breaking existing class names used by app.js (.panel .door .control .cal .metrics .outline-btn etc). Prefer Jesper tokens.
3. Add SHOULD features: (a) "Kopiér link til denne liste" button on Udforsk that copies location.href; (b) glossary tooltips or links to om-data.html on metric labels; (c) improve company page with fund-meta SRI note if easy.
4. Write docs/notes/CROSS-REVIEW-CLAUDE.md: what you changed and what Grok/main should keep.
5. Update docs/notes/STATUS.md with timestamp Europe/Copenhagen.
6. git commit as Leo (NDI) <leo@ndi.local> and push main (no force).

Do not touch vendor/, forsidegraf, Azure, Wix. Static only.
