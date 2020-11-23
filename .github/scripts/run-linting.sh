#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}
BASE="origin/main~1"


echo "Running Linting"
if [[ "$RUN_ALL" == "True" ]]; then
  npm run affected:lint -- --all
else
  AFFECTED=$(npm run affected:libs -- --plain --base="$BASE")
  echo "Will Lint: $AFFECTED"
  npm run affected:lint -- --base="$BASE"
fi
echo "Linting Complete"
wait
