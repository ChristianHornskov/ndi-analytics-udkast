#!/usr/bin/env bash
# Detached overnight merge loop. Survives agent interruptions.
# Every ~10 min: fetch lanes → merge if clean → precheck + smoke → push main.
# On conflict: abort, append notes/STATUS.md. Never force-push.
set -u
ROOT=/workspace/ndi-analytics
cd "$ROOT" || exit 1
LOG=$ROOT/logs/coordinator-loop.out
STATUS=$ROOT/notes/STATUS.md
mkdir -p "$ROOT/logs"
exec >>"$LOG" 2>&1

echo "==== coordinator-loop start $(date) ===="

mins_now() {
  local H M
  H=$(date +%H); M=$(date +%M)
  echo $((10#$H * 60 + 10#$M))
}

should_run() {
  local m; m=$(mins_now)
  if [ "$m" -ge 525 ] && [ "$m" -lt 1200 ]; then
    return 1
  fi
  return 0
}

ensure_http() {
  if ! pgrep -f 'http.server 8765' >/dev/null 2>&1; then
    python3 -m http.server 8765 --bind 127.0.0.1 --directory "$ROOT/docs" \
      >/tmp/ndi-http-coord.log 2>&1 &
    sleep 1
    echo "started http.server 8765 pid $!"
  fi
}

log_status() {
  local msg="$1"
  {
    echo ""
    echo "- Coordinator-loop $(date '+%Y-%m-%d %H:%M:%S %Z'): $msg"
  } >> "$STATUS"
  # Keep tree clean so later lanes in the same tick are not skipped
  if ! git diff --quiet -- notes/STATUS.md 2>/dev/null; then
    git add notes/STATUS.md 2>/dev/null || true
    git commit -m "notes: coordinator-loop $(date +%H:%M) — ${msg:0:60}" 2>/dev/null || true
  fi
}

LANES=(D A E B C X R)

merge_lane() {
  local L="$1"
  local branch="lane-$L"
  if ! git rev-parse "origin/$branch" >/dev/null 2>&1; then
    echo "skip $branch (missing remote)"
    return 0
  fi
  local ahead
  ahead=$(git rev-list --count "origin/main..origin/$branch" 2>/dev/null || echo 0)
  if [ "$ahead" = "0" ]; then
    echo "skip $branch (up to date)"
    return 0
  fi

  echo "---- try merge $branch ahead=$ahead $(date) ----"
  if [ -f "$ROOT/notes/COORD-HOLD" ]; then
    echo "COORD-HOLD present — skip merge $branch"
    return 0
  fi
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "dirty tree — skip merge $branch (will not stash over WIP)"
    log_status "SKIP origin/$branch — dirty working tree (no auto-stash)"
    return 0
  fi

  # Record tip before merge for revert
  local before
  before=$(git rev-parse HEAD)

  if ! git merge --no-edit "origin/$branch"; then
    echo "CONFLICT $branch — aborting"
    git merge --abort 2>/dev/null || true
    git reset --hard HEAD 2>/dev/null || true
    log_status "CONFLICT merge origin/$branch (ahead $ahead) — aborted, not pushed"
    return 1
  fi

  echo "merged $branch — running precheck"
  if ! bash scripts/precheck.sh; then
    echo "PRECHECK FAIL after $branch — reverting merge"
    git reset --hard "$before"
    log_status "PRECHECK FAIL after merge origin/$branch — reverted"
    return 1
  fi

  ensure_http
  echo "running smoke.mjs"
  if ! node scripts/smoke.mjs >/tmp/coord-smoke.out 2>&1; then
    local fail
    fail=$(python3 -c "import json;d=json.load(open('/tmp/coord-smoke.out'));print(d.get('fail','?'))" 2>/dev/null || echo '?')
    echo "SMOKE FAIL after $branch (fail=$fail) — reverting"
    git reset --hard "$before"
    log_status "SMOKE FAIL after merge origin/$branch (fail=$fail) — reverted"
    return 1
  fi
  local failc
  failc=$(python3 -c "import json;d=json.load(open('/tmp/coord-smoke.out'));print(int(d.get('fail',0)))" 2>/dev/null || echo 1)
  if [ "$failc" != "0" ]; then
    echo "SMOKE fail count $failc — reverting"
    git reset --hard "$before"
    log_status "SMOKE FAIL count=$failc after merge origin/$branch — reverted"
    return 1
  fi

  echo "pushing main after $branch"
  if git push origin main; then
    log_status "MERGED origin/$branch (ahead was $ahead) — precheck+smoke OK, pushed"
    echo "OK pushed $branch"
  else
    log_status "PUSH FAIL after merge origin/$branch — left on local main"
    echo "PUSH FAIL"
    return 1
  fi
  return 0
}

tick() {
  echo "==== tick $(date) mins=$(mins_now) ===="
  git fetch origin --prune -q || true
  git checkout main -q 2>/dev/null || true
  git pull --ff-only origin main -q 2>/dev/null || true

  for L in "${LANES[@]}"; do
    merge_lane "$L" || true
  done
}

if ! should_run; then
  echo "Outside overnight window (mins=$(mins_now)); exiting"
  exit 0
fi

while should_run; do
  tick
  m=$(mins_now)
  if [ "$m" -ge 525 ] && [ "$m" -lt 570 ]; then
    echo "SUMMARY WINDOW $(date)" | tee "$ROOT/notes/SUMMARY-WINDOW.md"
    log_status "SUMMARY WINDOW reached — coordinator-loop stopping"
    break
  fi
  if [ "$m" -ge 510 ] && [ "$m" -lt 525 ]; then
    echo "POLISH WINDOW $(date)" | tee "$ROOT/notes/POLISH-WINDOW.md"
  fi
  echo "sleep 600s"
  sleep 600
done

echo "==== coordinator-loop end $(date) ===="
