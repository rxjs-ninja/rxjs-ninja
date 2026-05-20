#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}
WITH_COVERAGE=${2:-"True"}
CODECOV_TOKEN_INPUT=${3:-""}
BASE=${4:-"origin/main"}
RUN_BROWSER=${5:-"True"}

COVERAGE_ARGS=$([[ "$WITH_COVERAGE" == "True" ]] && echo "--coverage" || echo "")

echo "Running unit tests (Vitest)"
if [[ "$RUN_ALL" == "True" ]]; then
  npm run test:cov
else
  AFFECTED=$(node scripts/affected-workspaces.mjs "$BASE")
  echo "Will test: $AFFECTED"
  if [[ "$AFFECTED" != "" ]]; then
    for lib in $AFFECTED; do
      # shellcheck disable=SC2086
      npm exec vitest -- run $COVERAGE_ARGS "libs/${lib/-//}"
    done
  fi
fi
echo "Unit tests complete"

if [[ "$RUN_BROWSER" == "True" ]]; then
  echo "Running browser tests (Playwright / Chrome)"
  npx playwright install chromium
  npm run test:browser
  echo "Browser tests complete"
fi

if [[ "$WITH_COVERAGE" == "True" ]]; then
  CODECOV_TOKEN="$CODECOV_TOKEN_INPUT" npm run coverage
fi
