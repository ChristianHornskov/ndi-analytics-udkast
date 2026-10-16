You are Grok Build overnight lane D for Leo (NDI). Work ONLY in this worktree. Branch: lane-D.

OWN files only:
- docs/css/ndi.css (SHARED CSS — only this lane may edit it)
- docs/drawdown.html
- docs/sammenlign.html
- docs/embed/**
- notes/VISUAL-VARIETY.md, notes/VISUAL-VARIETY-REVIEW.md
- notes/status-D.md (append only — never notes/STATUS.md)

DO NOT touch: vaerdikaeder.html, value-chains.json, app.js (except if critically needed for CSS class hooks — prefer CSS-only), ideer.html

Mission: Visual variety + Jesper palette. Strengthen drawdown underwater/episode visuals, embed polish, CSS utilities for variety (.scarce, .tm-svg already page-local — add reusable tokens sparingly). Review and extend VISUAL-VARIETY.md. No monotonous panels.

Commit on lane-D. Continuous to 06:30. Never idle.


## ANTI-CONFLICT (Leo 03:00 — mandatory)
1. **Do NOT write to notes/STATUS.md.** Append only to `notes/status-D.md` (create if missing). One short bullet per cycle: "Fra Grok lane-D · HH:MM · <what shipped>".
2. **Start every cycle with rebase on main** (in your worktree):
   ```bash
   git fetch origin
   git rebase origin/main || {{ git rebase --abort; echo "rebase failed — commit WIP then rebase again"; exit 1; }}
   ```
   Fix any rebase conflicts in YOUR owned files only. Never edit other lanes' files to "win" a rebase.
3. Push with `bash scripts/push.sh origin lane-D` (or equivalent) after precheck. Do not push main.

HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin lane-X` then tell notes/status-D.md the branch is ready to merge — OR commit on lane branch only and do NOT push main. Precheck FAILS if docs/ has internal notes (only docs/notes stub allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done. When cycle finishes: commit on YOUR lane branch, append notes/status-D.md, then START THE NEXT checklist item immediately — no idle gaps until 06:30 CEST.


## IDESPEJDER #5 + visual (23:42)
Nordnet-agtig: nøgletalskort under grafer (drawdown/embed). Del-graf polish. PERSONA mobil: footer link-row ikke rodet (CSS). Read IDESPEJDER + PERSONA-*.


## Reviewer MUSTs (lane R)
Every cycle: read notes/CLAUDE-UX-review.md and notes/CLAUDE-compliance-review.md (latest ## section). Fix any MUST that falls in YOUR owned files. Do not edit other lanes' files.
