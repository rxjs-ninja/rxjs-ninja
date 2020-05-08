#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}

echo "Running Linting"
if [ "$RUN_ALL" == "True" ]; then
  npm run affected:lint -- --all
else
  npm run affected:lint -- --base="origin/master"
fi
echo "Linting Complete"
wait
