#!/usr/bin/env bash
set -u
ROOT=/workspace/ndi-analytics
LOG=$ROOT/logs/overnight-monitor.out
mkdir -p "$ROOT/logs"
exec >>"$LOG" 2>&1
echo "==== monitor start $(date) ===="
mins(){ H=$(date +%H); M=$(date +%M); echo $((10#$H*60+10#$M)); }
while true; do
  m=$(mins)
  # stop after 09:00
  if [ "$m" -ge 540 ] && [ "$m" -lt 1200 ]; then
    echo "past 09:00 — monitor exit $(date)"
    break
  fi
  # ensure coordinator
  if ! pgrep -f 'scripts/coordinator-loop.sh' >/dev/null; then
    echo "restarting coordinator $(date)"
    nohup bash "$ROOT/scripts/coordinator-loop.sh" >/dev/null 2>&1 &
  fi
  # ensure http
  if ! pgrep -f 'http.server 8765' >/dev/null; then
    python3 -m http.server 8765 --bind 127.0.0.1 --directory "$ROOT/docs" >/tmp/ndi-http.log 2>&1 &
  fi
  # polish cue
  if [ "$m" -ge 510 ] && [ "$m" -lt 525 ]; then
    echo "POLISH $(date)" | tee "$ROOT/notes/POLISH-WINDOW.md"
  fi
  if [ "$m" -ge 525 ] && [ "$m" -lt 540 ]; then
    echo "SUMMARY $(date)" | tee "$ROOT/notes/SUMMARY-WINDOW.md"
    # refresh draft stamp
    echo "- Monitor cue $(date '+%Y-%m-%d %H:%M:%S %Z'): SUMMARY WINDOW" >> "$ROOT/notes/STATUS.md"
  fi
  echo "tick $(date) mins=$m coord=$(pgrep -c -f coordinator-loop.sh || echo 0)"
  sleep 300
done
echo "==== monitor end $(date) ===="
