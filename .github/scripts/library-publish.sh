#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

# This script uses the parent version as the version to publish a library with

function getBuildType {
  local release_type="minor"
  if [[ "$1" == *"(major)"* ]]; then
    release_type="major"
  elif [[ "$1" == *"(patch)"* ]]; then
    release_type="patch"
  fi
  echo "$release_type"
}

PARENT_DIR="$PWD"
ROOT_DIR="."
BASE="origin/main~1"

COMMIT_MESSAGE="$(git log -1 --pretty=format:"%s")"
RELEASE_TYPE=${1:-$(getBuildType "$COMMIT_MESSAGE")}
DRY_RUN=${DRY_RUN:-"False"}

IGNORE=$(echo "$COMMIT_MESSAGE" | sed -nE "s/^.*\[ignore:(.+)\]$/\1/p")
if [[ "$IGNORE" != "" ]]; then
  echo "Ignoring: $IGNORE"
fi

function doPublish {
  while IFS= read -r -d $' ' lib; do
    if [[ "$DRY_RUN" == "False" || "$IGNORE" != *"$lib"* ]]; then
      echo "Publishing $lib"
      npm publish "$ROOT_DIR/dist/libs/${lib/-//}" --access=public
    else
      echo "Dry Run, not publishing $lib"
    fi
    wait
  done <<<"$1 " # leave space on end to generate correct output
}

AFFECTED=$(node node_modules/.bin/nx affected:libs --plain --base="$BASE")
echo "Will Publish: $AFFECTED"

if [[ "$AFFECTED" != "" ]]; then
  cd "$PARENT_DIR"
  doPublish "$AFFECTED"
  wait
else
  echo "No Libraries to publish"
fi
