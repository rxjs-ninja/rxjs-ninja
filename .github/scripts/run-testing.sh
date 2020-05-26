#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}
WITH_COVERAGE=${2:-"True"}
CODECOV_TOKEN_INPUT=${3:-""}

COVERAGE_RULE=$([[ "$WITH_COVERAGE" == 'True' ]] && echo "--codeCoverage" || echo "")

echo "Running Unit Testing"
if [[ "$RUN_ALL" == "True" ]]; then
  npm run affected:test -- "$COVERAGE_RULE" --all
else
  npm run affected:test -- --base="origin/master" "$COVERAGE_RULE"
fi
echo "Unit Testing Complete"
if [[ "$WITH_COVERAGE" == "True" ]]; then
  CODECOV_TOKEN="$CODECOV_TOKEN_INPUT" npm run coverage
fi
wait
