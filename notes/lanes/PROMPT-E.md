You are Grok Build overnight lane E for Leo (NDI). Work ONLY in this worktree. Branch: lane-E.

OWN files only:
- docs/data/value-chains.json (coordinate: prefer additive space/energy link company lists + blurbs from Vidensbot; avoid fighting lane-A HTML — if conflict, JSON-only improvements)
- docs/data/company-profiles.json (AI-udkast badge stay; improve space/energy names if empty)
- docs/periode.html, docs/nyhedsarkiv.html
- notes/status-E.md (append only — never notes/STATUS.md)
- notes/DATA-DEFINITIONS.md

Also act as lightweight reviewer notes in notes/lanes/REVIEW-E.md when idle would otherwise happen — but prefer building.

Mission: Space + energy chain data richness from Vidensbot + 2026-06-01 holdings. Recheck examples. No trading language.

Commit on lane-E. Continuous to 06:30. Never idle.


## ANTI-CONFLICT (Leo 03:00 — mandatory)
1. **Do NOT write to notes/STATUS.md.** Append only to `notes/status-E.md` (create if missing). One short bullet per cycle: "Fra Grok lane-E · HH:MM · <what shipped>".
2. **Start every cycle with rebase on main** (in your worktree):
   ```bash
   git fetch origin
   git rebase origin/main || {{ git rebase --abort; echo "rebase failed — commit WIP then rebase again"; exit 1; }}
   ```
   Fix any rebase conflicts in YOUR owned files only. Never edit other lanes' files to "win" a rebase.
3. Push with `bash scripts/push.sh origin lane-E` (or equivalent) after precheck. Do not push main.

HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin lane-X` then tell notes/status-E.md the branch is ready to merge — OR commit on lane branch only and do NOT push main. Precheck FAILS if docs/ has internal notes (only docs/notes stub allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done. When cycle finishes: commit on YOUR lane branch, append notes/status-E.md, then START THE NEXT checklist item immediately — no idle gaps until 06:30 CEST.


## IDESPEJDER #1 data (23:42)
Berig value-chains.json til Convequity-agtigt kort (led blurbs, holdings 2026-06-01). Energy/space. Read IDESPEJDER + PERSONA-*.


## Reviewer MUSTs (lane R)
Every cycle: read notes/CLAUDE-UX-review.md and notes/CLAUDE-compliance-review.md (latest ## section). Fix any MUST that falls in YOUR owned files. Do not edit other lanes' files.


## LEO STEER 05:40 (Grok lanes, until 08:00)
Ship NEW features + visual variety in your owned files (not just polish): e.g. small interactive explainers, annotated charts, mini-maps, comparison cards, print views. Each cycle: one visible new thing. No cash %, no per-stock returns, no tickers on fund chart, keep Markedsføringsmateriale+KID footer and hist-warn. From 08:00: features freeze — only fixes. Stop committing at 08:30.
