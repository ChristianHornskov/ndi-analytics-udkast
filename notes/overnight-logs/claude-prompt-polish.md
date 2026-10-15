You are Claude Code for Leo (NDI). Christian is asleep. Work autonomously; note disagreements under notes/STATUS.md "Fra Claude" and continue. Never put notes under docs/.

## Goal
Polish pass on /workspace/ndi-analytics so the draft feels impressive and coherent. GitHub Pages: main:/docs.

## Must read
notes/SPEC.md, notes/UX-krav.md, notes/VIDENSBOT-krav.md, notes/STATUS.md, notes/OVERNIGHT-BACKLOG.md
vendor/jesper-mockup/styles.css

## Compliance locks (do not regress)
- Notes only in /notes
- Holdings delayed ≤2026-06-01
- No daily movers
- PMINDIAKK: no returns UI
- PMINDI: no 1m/3m; year/YTD/start only
- No unverified per-stock YTD/1Y/P/S/P/E/52w drawdown
- No Nasdaq series; no invented context narratives
- Danish UI; historisk-afkast warning near returns; no investment advice wording

## Do this pass
1. Wire docs/data/company-profiles.json into selskab.html (problem/watch/source when ISIN matches; SoftBank demo rich). Fallback to position.summary.
2. Make tema.html?slug= drive from docs/data/themes.json + delayed positions; link from Udforsk chips/vaerdikaede.
3. Entré: surface lær-hub, tema, invester, drawdown as calm secondary doors/links (not clutter).
4. Mobile 375 polish: sticky header, doors, tables scroll, embed.
5. Ensure KID links from fund-meta in footer on index + selskab.
6. Update notes/STATUS.md with Europe/Copenhagen timestamp.
7. When clickable and better: git add -A (not logs/*.png), commit as Leo (NDI) <leo@ndi.local>, push origin main. No force.

Do not touch live newdealinvest.dk, Wix, Azure, graf-v2. Local JSON only.
