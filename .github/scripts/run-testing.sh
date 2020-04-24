#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

echo "Running Unit Testing"
npm run affected:test -- --base="origin/master" --codeCoverage
echo "Unit Testing Complete"
wait
