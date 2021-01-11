#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}
WITH_COVERAGE=${2:-"True"}
CODECOV_TOKEN_INPUT=${3:-""}
BASE=${4:-"origin/main"}


COVERAGE_RULE=$([[ "$WITH_COVERAGE" == 'True' ]] && echo "--codeCoverage" || echo "")

echo "Running Unit Testing"
if [[ "$RUN_ALL" == "True" ]]; then
  npm run affected:test -- "$COVERAGE_RULE" --all --parallel --maxParallel=2
else
  AFFECTED=$(node node_modules/.bin/nx affected:libs --plain --base="$BASE")
  echo "Will test: $AFFECTED"
  npm run affected:test -- --base="$BASE" "$COVERAGE_RULE" --parallel --maxParallel=2
fi
echo "Unit Testing Complete"
if [[ "$WITH_COVERAGE" == "True" ]]; then
  CODECOV_TOKEN="$CODECOV_TOKEN_INPUT" npm run coverage
fi
wait
