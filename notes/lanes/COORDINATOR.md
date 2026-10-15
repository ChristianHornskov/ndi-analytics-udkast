# Lane coordinator

Merge order when ready: D (css) → A (chains) → E (json) → B (app/js) → C (content).
Never merge conflicting files across lanes. Precheck + smoke before push main.
Watchdog: relaunch wrapper if pid dead before 06:30.


## Reviewer lane R
Read-only. Writes CLAUDE-UX-review.md + CLAUDE-compliance-review.md every ~70–90 min. Merge lane-R notes to main freely.
