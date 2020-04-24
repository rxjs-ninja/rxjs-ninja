#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

rm -rf "docs"
wait
echo "Generating Documentation"
npm run docs
wait
