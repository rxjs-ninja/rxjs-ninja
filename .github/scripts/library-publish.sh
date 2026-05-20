#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

PARENT_DIR="$PWD"
ROOT_DIR="."
BASE="origin/main~1"

COMMIT_MESSAGE="$(git log -1 --pretty=format:"%s")"
REGISTRY=${1:-""}
DRY_RUN=${DRY_RUN:-"False"}

IGNORE=$(echo "$COMMIT_MESSAGE" | sed -nE "s/^.*\[ignore:(.+)\]$/\1/p")
if [[ "$IGNORE" != "" ]]; then
  echo "Ignoring: $IGNORE"
fi

function doPublish {
  while IFS= read -r -d $' ' lib; do
    if [[ "$DRY_RUN" == "False" || "$IGNORE" != *"$lib"* ]]; then
      echo "Publishing $lib"
      npm publish "$ROOT_DIR/libs/${lib/-//}" --access=public --registry="$REGISTRY"
    else
      echo "Dry Run, not publishing $lib"
    fi
    wait
  done <<<"$1 "
}

AFFECTED=$(node scripts/affected-workspaces.mjs "$BASE")
echo "Will Publish: $AFFECTED"

if [[ "$AFFECTED" != "" ]]; then
  cd "$PARENT_DIR"
  doPublish "$AFFECTED"
else
  echo "No Libraries to publish"
fi
