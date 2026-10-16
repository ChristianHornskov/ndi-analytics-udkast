You are Claude Code overnight BUILD lane A for Leo (NDI). Work ONLY in this worktree (cwd). Branch: lane-A.

OWN files only (do not edit others):
- docs/vaerdikaeder.html
- docs/vaerdikaede.html
- docs/data/value-chains.json
- notes/VIDENSBOT-vaerdikaeder.md (read-only source)
- notes/VISUAL-VARIETY.md (append only)
- notes/status-A.md (append only — never notes/STATUS.md)
- notes/MADS-CHECKLIST.md (tick value-chain related only)

DO NOT touch: docs/css/ndi.css, docs/js/app.js, docs/js/data.js, temaer.html, ideer.html, HANDOFF-CODEX.md

Mission: Polish Vidensbot flodsystem on vaerdikaeder. Space chain must be excellent. AI-compute has 13 links in Mads order. No trading language ("øger eksponering", "overvægt i"). Musk/SpaceX quote ONLY as quote with source. Holdings asOf 2026-06-01. Visual variety within YOUR pages (icons, annotated links) without changing shared CSS.

Commit on lane-A. Loop until 06:30 CEST — when one polish cycle ends, start the next (space pedagogy, energy link blurbs, quantum short page cross-links). Never idle.


## ANTI-CONFLICT (Leo 03:00 — mandatory)
1. **Do NOT write to notes/STATUS.md.** Append only to `notes/status-A.md` (create if missing). One short bullet per cycle: "Fra Claude lane-A · HH:MM · <what shipped>".
2. **Start every cycle with rebase on main** (in your worktree):
   ```bash
   git fetch origin
   git rebase origin/main || {{ git rebase --abort; echo "rebase failed — commit WIP then rebase again"; exit 1; }}
   ```
   Fix any rebase conflicts in YOUR owned files only. Never edit other lanes' files to "win" a rebase.
3. Push with `bash scripts/push.sh origin lane-A` (or equivalent) after precheck. Do not push main.

HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin lane-X` then tell notes/status-A.md the branch is ready to merge — OR commit on lane branch only and do NOT push main. Precheck FAILS if docs/ has internal notes (only docs/notes stub allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done. When cycle finishes: commit on YOUR lane branch, append notes/status-A.md, then START THE NEXT checklist item immediately — no idle gaps until 06:30 CEST.


## IDESPEJDER Top5 assignment (23:42)
#1 AI-værdikædekort Convequity-stil: gør vaerdikaeder endnu mere kort-agtig (led→NDI selskaber, forklaring, klik). Flodsystem allerede startet — skærp.
Also read notes/IDESPEJDER.md + PERSONA-*.md each cycle.
Privat persona: forklar flaskehalse i almindeligt dansk; undgå jargonsprog i blurbs.


## Reviewer MUSTs (lane R)
Every cycle: read notes/CLAUDE-UX-review.md and notes/CLAUDE-compliance-review.md (latest ## section). Fix any MUST that falls in YOUR owned files. Do not edit other lanes' files.


## LEO FREEZE 08:00
From 08:00 CEST: no new features. Only bug fixes, tests, footer/warning checks in owned files. Stop committing at 08:30.
