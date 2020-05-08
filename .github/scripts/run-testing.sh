#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

RUN_ALL=${1:-"False"}

echo "Running Unit Testing"
if [ "$RUN_ALL" == "True" ]; then
  npm run affected:test -- --codeCoverage --all
else
  npm run affected:test -- --base="origin/master" --codeCoverage
fi
echo "Unit Testing Complete"
wait
