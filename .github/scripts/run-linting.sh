#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

echo "Running Linting"
npm run affected:lint -- --base="origin/master"
echo "Linting Complete"
wait
