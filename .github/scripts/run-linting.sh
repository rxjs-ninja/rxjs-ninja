#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}
BASE="${2:-origin/main}"

echo "Running Linting"
if [[ "$RUN_ALL" == "True" ]]; then
  npm run lint --workspaces --if-present
else
  AFFECTED=$(node scripts/affected-workspaces.mjs "$BASE")
  echo "Will Lint: $AFFECTED"
  if [[ "$AFFECTED" != "" ]]; then
    for lib in $AFFECTED; do
      npm run lint -w "@rxjs-ninja/${lib}"
    done
  fi
fi
echo "Linting Complete"
