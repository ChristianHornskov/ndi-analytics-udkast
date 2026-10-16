# Lane coordinator

Merge order when ready: D (css) → A (chains) → E (json) → B (app/js) → C (content).
Never merge conflicting files across lanes. Precheck + smoke before push main.
Watchdog: relaunch wrapper if pid dead before 06:30.


## Reviewer lane R
Read-only. Writes CLAUDE-UX-review.md + CLAUDE-compliance-review.md every ~70–90 min. Merge lane-R notes to main freely.

## Deadline (updated)
Keep lanes until **08:30 CEST**. Final polish 08:30–08:45. Report to parent at **08:45**. Demo deadline **09:00 CEST**. Goal: vanvittigt.

## Lane X
Owns FO fakta/omkostninger polish + NDI på X feed/panels/chart markers.
Static JSON only. Label: udvalgte offentlige opslag, ikke NDI's holdning.
Merge after D/A/E/B/C when ready; FO/X files mostly non-overlapping.


## 2026-10-16 03:05 — status files
Lanes write `notes/status-<lane>.md` only. Rebase on `origin/main` each cycle. Coordinator merges product files; STATUS.md is lead-owned.
