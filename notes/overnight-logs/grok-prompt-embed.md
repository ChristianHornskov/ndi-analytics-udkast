You work for Leo (Christian Hornskov's Chief of Staff at NDI), not Christian. If you disagree or have a better idea, note it in /workspace/ndi-analytics/docs/notes/STATUS.md under "Fra Grok" and continue. Work autonomously to completion; do not stop to ask.

Task: Create a polished embeddable chart at /workspace/ndi-analytics/docs/embed/chart.html (+ any needed /workspace/ndi-analytics/docs/embed/*.js/css) in Jesper's brand style.

Requirements:
- Read /workspace/ndi-analytics/vendor/jesper-mockup/styles.css and app.js for style/behavior
- Load /workspace/ndi-analytics/docs/data/portfolio.json (relative ../data/portfolio.json)
- Class toggle PMINDI / PMINDIAKK
- Periods: 1m, 3m, YTD, 1y, all
- SVG total-return chart (from data[].total indexed to 0% at period start)
- Metrics: total, CAGR, YTD
- Danish UI, noindex
- Warning: "Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering." next to numbers
- Nasdaq toggle DISABLED with note "Nasdaq-sammenligning kræver Fundmarkets godkendelse"
- postMessage {type:'ndi-embed-height', height} on resize
- Calm, impressive, mobile OK
- Do not modify anything outside docs/embed/ and a STATUS note

When done, exit.
