#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}
BASE="main"

echo "Running Linting"
if [[ "$RUN_ALL" == "True" ]]; then
  pnpm affected:lint --all
else
  AFFECTED=$(pnpx nx affected:libs --plain --base="$BASE")
  echo "Will Lint: $AFFECTED"
  pnpm affected:lint --base="$BASE"
fi
echo "Linting Complete"
wait
