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
  # Never let a dirty tree block merges: auto-commit notes/ WIP, stash the rest.
  if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    echo "dirty tree — auto-commit notes/ then stash remainder"
    git add notes/ 2>/dev/null || true
    if ! git diff --cached --quiet; then
      git commit -m "notes: coordinator auto-commit before merge $(date +%H:%M)" 2>/dev/null || true
    fi
    if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
      git stash push -u -m "coordinator-loop auto-stash $(date +%s)" || true
    fi
  fi

  # Record tip before merge for revert
  local before
  before=$(git rev-parse HEAD)

  if ! git merge --no-edit "origin/$branch"; then
    # If the only conflicts are notes/STATUS.md (and optionally other notes/* logs),
    # keep ours for STATUS and take theirs for other note files when safe.
    conf=$(git diff --name-only --diff-filter=U 2>/dev/null || true)
    echo "conflict files: $conf"
    only_status=1
    while IFS= read -r f; do
      [ -z "$f" ] && continue
      case "$f" in
        notes/STATUS.md) ;;
        notes/CLAUDE-*.md|notes/VISUAL-VARIETY.md|notes/MADS-CHECKLIST.md|notes/THEME-FORSLAG.md|notes/X-LANE.md|notes/HANDOFF-CODEX.md|notes/UX-review.md)
          git checkout --theirs -- "$f" 2>/dev/null || only_status=0
          git add -- "$f" 2>/dev/null || only_status=0
          ;;
        *) only_status=0 ;;
      esac
    done <<< "$conf"
    if [ "$only_status" = "1" ]; then
      git checkout --ours -- notes/STATUS.md 2>/dev/null || true
      git add notes/STATUS.md 2>/dev/null || true
      if git diff --name-only --diff-filter=U | grep -q .; then
        echo "still conflicted — aborting"
        git merge --abort 2>/dev/null || true
        git reset --hard HEAD 2>/dev/null || true
        log_status "CONFLICT merge origin/$branch (ahead $ahead) — aborted, not pushed"
        return 1
      fi
      git commit --no-edit -m "merge origin/$branch (STATUS ours; notes theirs where safe)" || {
        git merge --abort 2>/dev/null || true
        log_status "CONFLICT merge origin/$branch — commit failed, aborted"
        return 1
      }
      echo "resolved STATUS-only conflict for $branch"
      log_status "MERGED origin/$branch with STATUS-ours resolution (ahead was $ahead) — pending precheck"
    else
      echo "CONFLICT $branch — aborting (non-STATUS files)"
      git merge --abort 2>/dev/null || true
      git reset --hard HEAD 2>/dev/null || true
      log_status "CONFLICT merge origin/$branch (ahead $ahead) — aborted, not pushed"
      return 1
    fi
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
