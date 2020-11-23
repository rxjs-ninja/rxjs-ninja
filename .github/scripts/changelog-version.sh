#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

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

DATE=$(date +'%Y-%m-%d')
echo "$DATE"

IGNORE=$(echo "$COMMIT_MESSAGE" | sed -nE "s/^.*\[ignore:(.+)\]$/\1/p")
if [[ "$IGNORE" != "" ]]; then
  echo "Ignoring: $IGNORE"
fi

function doChangelog {
  while IFS= read -r -d $' ' lib; do
    cd "$PARENT_DIR"
    if [[ "$DRY_RUN" == "False" || "$IGNORE" != *"$lib"* ]]; then
      echo "Updating Changelog: $lib"
      cd "$ROOT_DIR/libs/${lib/-//}"
      local CURRENT_VERSION=$(jq -r '.version' package.json)
      local CHANGELOG_UPDATE=$(echo ["$CURRENT_VERSION"] - "$DATE")

      sed -i "s/\[Unreleased\]/${CHANGELOG_UPDATE}/" CHANGELOG.md
    else
      echo "Dry Run, not publishing $lib"
    fi
    wait
  done <<<"$1 " # leave space on end to generate correct output
}

AFFECTED=$(node node_modules/.bin/nx affected:libs --plain --base="$BASE")
echo "Will Update Changelog: $AFFECTED"

if [[ "$AFFECTED" != "" ]]; then
  cd "$PARENT_DIR"
  doChangelog "$AFFECTED"
  wait
else
  echo "No Libraries to publish"
fi
