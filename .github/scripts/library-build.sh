#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

PARENT_DIR="$PWD"
BASE="origin/main~1"

AFFECTED=$(node node_modules/.bin/nx affected:libs --plain --base="$BASE")
echo "Will Build: $AFFECTED"

if [[ "$AFFECTED" != "" ]]; then
  cd "$PARENT_DIR"
  npm run affected:build -- --skip-nx-cache --base="$BASE"
  wait
else
  echo "No Libraries to build"
fi
