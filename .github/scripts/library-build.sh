#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

PARENT_DIR="$PWD"
BASE="${1:-origin/main~1}"

AFFECTED=$(node scripts/affected-workspaces.mjs "$BASE")
echo "Will Build: $AFFECTED"

if [[ "$AFFECTED" != "" ]]; then
  cd "$PARENT_DIR"
  for lib in $AFFECTED; do
    npm run build -w "@rxjs-ninja/${lib}"
  done
else
  echo "No Libraries to build"
fi
