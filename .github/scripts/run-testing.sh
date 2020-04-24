#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

ROOT_DIR="."
if test -f "$ROOT_DIR/.npmrc"; then
  rm "$ROOT_DIR/.npmrc"
fi

ONLY_AFFECTED=${1:-"False"}
BRANCH=${2:-$(git describe --abbrev=0 --always)}

echo "Running Unit Testing"
if [ "$ONLY_AFFECTED" == "True" ]; then
  npm run affected:test -- --base="$BRANCH" --codeCoverage
else
  npm run test -- --codeCoverage
fi
echo "Unit Testing Complete"
wait
