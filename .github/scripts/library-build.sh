#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

PARENT_DIR="$PWD"

AFFECTED=$(node node_modules/.bin/nx affected:libs --plain --base=origin/main~1)
echo "Will Build: $AFFECTED"

if [[ "$AFFECTED" != "" ]]; then
  cd "$PARENT_DIR"
  npm run affected:build -- --skip-nx-cache --base=origin/main~1
  wait
else
  echo "No Libraries to build"
fi
