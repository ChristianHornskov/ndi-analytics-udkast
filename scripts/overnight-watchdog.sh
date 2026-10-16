#!/usr/bin/env bash
# Overnight lane watchdog until 08:30 CEST, polish 08:30–08:45, stop at 08:45.
set -euo pipefail
ROOT=/workspace/ndi-analytics
LOG=$ROOT/logs/overnight-watchdog.out
exec >>"$LOG" 2>&1
echo "==== watchdog start $(date) ===="

# Minutes since local midnight
mins_now() {
  local H M
  H=$(date +%H)
  M=$(date +%M)
  echo $((10#$H * 60 + 10#$M))
}

# Overnight window: from start until 08:45 next morning.
# If now >= 08:45 and now < 20:00, treat as past morning deadline (don't run).
# If now >= 20:00 OR now < 08:45, we are in the overnight shift.
in_overnight_shift() {
  local m
  m=$(mins_now)
  # 08:45 = 525 minutes; 20:00 = 1200
  if [ "$m" -ge 525 ] && [ "$m" -lt 1200 ]; then
    return 1
  fi
  return 0
}

polish_window() {
  local m
  m=$(mins_now)
  # 08:30–08:44
  [ "$m" -ge 510 ] && [ "$m" -lt 525 ]
}

summary_time() {
  local m
  m=$(mins_now)
  # exactly morning after 08:45 and before 09:30 so we don't fire at night
  [ "$m" -ge 525 ] && [ "$m" -lt 570 ]
}

ensure_loops() {
  for L in A B C; do
    if ! pgrep -af "PROMPT-$L.md" | grep -v grep >/dev/null; then
      echo "RESTART Claude lane-$L $(date)"
      nohup bash -c "cd '$ROOT'; while true; do echo \"==== \$(date) start cycle ====\" >> logs/lane-$L-claude.out; claude -p --dangerously-skip-permissions --permission-mode bypassPermissions --output-format text \"\$(cat $ROOT/notes/lanes/PROMPT-$L.md) ADDITIONAL: Continuous overnight loop. One high-impact commit on lane-$L, push origin lane-$L.\" </dev/null >> logs/lane-$L-claude.out 2>&1; echo \"==== \$(date) cycle exit \$? ====\" >> logs/lane-$L-claude.out; sleep 5; done" >/dev/null 2>&1 &
    fi
  done
  for L in D E X; do
    WT=/workspace/ndi-wt-$L
    if ! pgrep -af "ndi-wt-$L" | grep -v grep >/dev/null; then
      echo "RESTART Grok lane-$L $(date)"
      nohup bash -c "cd '$WT'; while true; do echo \"==== \$(date) start cycle ====\" >> $ROOT/logs/lane-$L-grok.out; grok --cwd '$WT' --always-approve --output-format plain --prompt-file $ROOT/notes/lanes/PROMPT-$L.md </dev/null >> $ROOT/logs/lane-$L-grok.out 2>&1; echo \"==== \$(date) cycle exit \$? ====\" >> $ROOT/logs/lane-$L-grok.out; sleep 5; done" >/dev/null 2>&1 &
    fi
  done
  if ! pgrep -af 'PROMPT-R' | grep -v grep >/dev/null; then
    echo "RESTART Reviewer R $(date)"
    nohup bash -c "cd /workspace/ndi-wt-R; while true; do echo \"==== \$(date) start cycle ====\" >> $ROOT/logs/lane-R-claude.out; claude -p --dangerously-skip-permissions --permission-mode bypassPermissions --output-format text \"\$(cat $ROOT/notes/lanes/PROMPT-R.md) ADDITIONAL: One review cycle, commit lane-R, push.\" </dev/null >> $ROOT/logs/lane-R-claude.out 2>&1; echo \"==== \$(date) cycle exit \$? ====\" >> $ROOT/logs/lane-R-claude.out; sleep 75; done" >/dev/null 2>&1 &
  fi
}

merge_ready() {
  # coordinator-loop owns merges — watchdog only keeps lanes alive
  echo "skip merges (coordinator-loop owns merges)"
  return 0
  cd "$ROOT"
  git fetch origin --prune -q || true
  SKIP=""
  [ -f notes/lanes/SKIP-MERGE.txt ] && SKIP=$(tr -d "\r" < notes/lanes/SKIP-MERGE.txt | tr "\n" " ")
  for L in D A E B C X R; do
    if echo " $SKIP " | grep -q " $L "; then echo "skip lane-$L"; continue; fi
    if git rev-parse origin/lane-$L >/dev/null 2>&1; then
      n=$(git rev-list --count origin/main..origin/lane-$L 2>/dev/null || echo 0)
      if [ "$n" -gt 0 ]; then
        echo "MERGE candidate lane-$L ahead=$n $(date)"
        if git merge --no-edit origin/lane-$L; then
          echo "merged lane-$L"
          git push origin main || true
        else
          echo "CONFLICT lane-$L — aborting merge"
          git merge --abort || true
        fi
      fi
    fi
  done
}

if ! in_overnight_shift; then
  echo "Not in overnight shift (mins=$(mins_now)); exiting"
  exit 0
fi

while true; do
  echo "---- tick $(date) mins=$(mins_now) ----"
  if summary_time; then
    echo "SUMMARY WINDOW reached $(date)"
    date > "$ROOT/notes/SUMMARY-WINDOW.md"
    break
  fi
  ensure_loops
  m=$(mins_now)
  # Build until 08:30 (510); polish flag 08:30–08:45
  if [ "$m" -ge 1200 ] || [ "$m" -lt 510 ]; then
    merge_ready || true
  fi
  if polish_window; then
    echo "POLISH WINDOW $(date)" | tee "$ROOT/notes/POLISH-WINDOW.md"
  fi
  sleep 600  # 10 min
done
echo "==== watchdog end $(date) ===="
