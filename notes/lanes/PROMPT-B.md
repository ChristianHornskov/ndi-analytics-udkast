You are Claude Code overnight BUILD lane B for Leo (NDI). Work ONLY in this worktree. Branch: lane-B.

OWN files only:
- docs/js/app.js
- docs/js/data.js (only if needed for themeProposals / safe helpers — no per-stock returns)
- docs/temaer.html, docs/tema.html, docs/selskaber.html, docs/selskab.html
- docs/data/themes.json, docs/data/multi-tags.json, docs/data/unique-metrics.json, docs/data/portfolio.json (themeStatus forslag only)
- notes/MADS-CHECKLIST.md, notes/THEME-FORSLAG.md, notes/STATUS.md (append lane-B)

DO NOT touch: docs/css/ndi.css, docs/vaerdikaeder.html, docs/data/value-chains.json, ideer.html, HANDOFF-CODEX.md

Mission from MADS-CHECKLIST (one item per cycle, then next):
1. Screener/sort UX that is compliance-safe (NO 52u-drawdown/vol/insider sorts — those are deferred). Improve weight/name/theme sorts, empty states, forslag badges.
2. Themes hub polish (quantum/space visibility, forslag banner accuracy).
3. Unique-metrics for more core names (qualitative only).
4. Modenhed UI remains honest (data empty — do not invent).
Skip market-cap/product-category without data.

Commit on lane-B. Continuous cycles to 06:30. Never idle.

HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin lane-X` then tell STATUS the branch is ready to merge — OR commit on lane branch only and do NOT push main. Precheck FAILS if docs/ has internal notes (only docs/notes stub allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done. When cycle finishes: commit on YOUR lane branch, append STATUS "Fra Claude/Grok lane-X", then START THE NEXT checklist item immediately — no idle gaps until 06:30 CEST.


## IDESPEJDER Top5 + PERSONA (23:42)
#2 Multi-tag: synliggør/forbedr filter (allerede multi-tags.json).
#3 NDI-linse som default-perspektiv på selskab/udforsk (ikke P/E).
#4 Unique-metrics: flere Qualtrim-agtige KPI-felter (kvalitative / AI-udkast mærket; ingen opfundne kurser). SoftBank/Broadcom/Tesla først.
#5 Fonden: performance først — nøgletal under grafen tydeligere (ÅOP hvis i fund-meta, drawdown allerede).
PERSONA-privat MUST: "Hvad koster det?"-boks fra KID/fund-meta; møntspil-link på entre; Top 10 før fuld tabel; skjul tom livscyklus offentligt; dansk komma i udbytte.
Read notes/IDESPEJDER.md + PERSONA-privat.md + PERSONA-familyoffice.md each cycle.


## Reviewer MUSTs (lane R)
Every cycle: read notes/CLAUDE-UX-review.md and notes/CLAUDE-compliance-review.md (latest ## section). Fix any MUST that falls in YOUR owned files. Do not edit other lanes' files.
