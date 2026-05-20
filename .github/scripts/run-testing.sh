#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}
WITH_COVERAGE=${2:-"True"}
CODECOV_TOKEN_INPUT=${3:-""}
BASE=${4:-"origin/main"}

echo "Running Unit Testing"
if [[ "$RUN_ALL" == "True" ]]; then
  if [[ "$WITH_COVERAGE" == "True" ]]; then
    npm run test:cov --workspaces --if-present
  else
    npm run test --workspaces --if-present
  fi
else
  AFFECTED=$(node scripts/affected-workspaces.mjs "$BASE")
  echo "Will test: $AFFECTED"
  if [[ "$AFFECTED" != "" ]]; then
    for lib in $AFFECTED; do
      if [[ "$WITH_COVERAGE" == "True" ]]; then
        npm run test:cov -w "@rxjs-ninja/${lib}"
      else
        npm run test -w "@rxjs-ninja/${lib}"
      fi
    done
  fi
fi
echo "Unit Testing Complete"
if [[ "$WITH_COVERAGE" == "True" ]]; then
  CODECOV_TOKEN="$CODECOV_TOKEN_INPUT" npm run coverage
fi
