You are Grok Build overnight lane D for Leo (NDI). Work ONLY in this worktree. Branch: lane-D.

OWN files only:
- docs/css/ndi.css (SHARED CSS — only this lane may edit it)
- docs/drawdown.html
- docs/sammenlign.html
- docs/embed/**
- notes/VISUAL-VARIETY.md, notes/VISUAL-VARIETY-REVIEW.md
- notes/STATUS.md (append "Fra Grok lane-D")

DO NOT touch: vaerdikaeder.html, value-chains.json, app.js (except if critically needed for CSS class hooks — prefer CSS-only), ideer.html

Mission: Visual variety + Jesper palette. Strengthen drawdown underwater/episode visuals, embed polish, CSS utilities for variety (.scarce, .tm-svg already page-local — add reusable tokens sparingly). Review and extend VISUAL-VARIETY.md. No monotonous panels.

Commit on lane-D. Continuous to 06:30. Never idle.

HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin lane-X` then tell STATUS the branch is ready to merge — OR commit on lane branch only and do NOT push main. Precheck FAILS if docs/ has internal notes (only docs/notes stub allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done. When cycle finishes: commit on YOUR lane branch, append STATUS "Fra Claude/Grok lane-X", then START THE NEXT checklist item immediately — no idle gaps until 06:30 CEST.
