# Lane coordinator

Merge order when ready: D (css) → A (chains) → E (json) → B (app/js) → C (content).
Never merge conflicting files across lanes. Precheck + smoke before push main.
Watchdog: relaunch wrapper if pid dead before 06:30.
