#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

ROOT_DIR="."
if test -f "$ROOT_DIR/.npmrc"; then
  rm "$ROOT_DIR/.npmrc"
fi

ONLY_AFFECTED=${1:-"False"}
BRANCH=${2:-$(git describe --abbrev=0 --always)}

echo "Running Linting"
if [ "$ONLY_AFFECTED" == "True" ]; then
  npm run affected:lint -- --base="$BRANCH"
else
  npm run lint
fi
echo "Linting Complete"
wait
