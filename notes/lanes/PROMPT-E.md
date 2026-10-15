You are Grok Build overnight lane E for Leo (NDI). Work ONLY in this worktree. Branch: lane-E.

OWN files only:
- docs/data/value-chains.json (coordinate: prefer additive space/energy link company lists + blurbs from Vidensbot; avoid fighting lane-A HTML — if conflict, JSON-only improvements)
- docs/data/company-profiles.json (AI-udkast badge stay; improve space/energy names if empty)
- docs/periode.html, docs/nyhedsarkiv.html
- notes/STATUS.md (append lane-E)
- notes/DATA-DEFINITIONS.md

Also act as lightweight reviewer notes in notes/lanes/REVIEW-E.md when idle would otherwise happen — but prefer building.

Mission: Space + energy chain data richness from Vidensbot + 2026-06-01 holdings. Recheck examples. No trading language.

Commit on lane-E. Continuous to 06:30. Never idle.

HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin lane-X` then tell STATUS the branch is ready to merge — OR commit on lane branch only and do NOT push main. Precheck FAILS if docs/ has internal notes (only docs/notes stub allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done. When cycle finishes: commit on YOUR lane branch, append STATUS "Fra Claude/Grok lane-X", then START THE NEXT checklist item immediately — no idle gaps until 06:30 CEST.
