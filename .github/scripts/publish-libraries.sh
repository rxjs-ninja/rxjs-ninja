#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

# This script uses the parent version as the version to publish a library with
# TODO: Improve this script to only publish releases needed
# TODO: Improve error handing to ensure rollback of bad release


getBuildType() {
  local release_type="minor"
  if [[ "$1" == *"feat"* ]]; then
    release_type="major"
  elif [[ "$1" == *"fix"* ]]; then
    release_type="patch"
   elif [[ "$1" == *"fix"* ]]; then
    release_type="patch"
  fi
  echo "$release_type"
}


PARENT_DIR="$PWD"
ROOT_DIR="."
echo "Removing Dist"
rm -rf "${ROOT_DIR:?}/dist"

COMMIT_MESSAGE="$(git log -1 --pretty=format:"%s")"

RELEASE_TYPE=${1:-$(getBuildType "$COMMIT_MESSAGE")}
BRANCH=${2:-master}
ONLY_AFFECTED=${3:-"False"}
BUILD_NUMBER=${BUILD_NUMBER:-0}
DRY_RUN=${DRY_RUN:-"True"}
LAST_RELEASE="$(git describe --abbrev=0 --always)"
echo "$LAST_RELEASE:$BUILD_NUMBER:$RELEASE_TYPE"

# Version the parent library
npm --no-git-tag-version version "$RELEASE_TYPE" -f -m "RxJS Primitives $RELEASE_TYPE"
# Get the version to set on sub-libraries
VERSION="$(awk '/version/{gsub(/("|",)/,"",$2);print $2}' "$ROOT_DIR/package.json")"
echo "RxJS Primitives $RELEASE_TYPE - $VERSION."

AFFECTED_RULE=$([ "$ONLY_AFFECTED" == 'False' ] && echo "--all" || echo "--base=$LAST_RELEASE")

AFFECTED=$(node node_modules/.bin/nx affected:libs --plain "$AFFECTED_RULE")
if [ "$AFFECTED" != "" ]; then
  cd "$PARENT_DIR"
  echo "Copy Environment Files"

  while IFS= read -r -d $' ' lib; do
    echo "Setting version for $lib"
    cd "$PARENT_DIR"
    cd "$ROOT_DIR/libs/${lib/-//}"
    npm --no-git-tag-version version "$RELEASE_TYPE" -f -m "RxJS Primitives $RELEASE_TYPE"
    echo "Building $lib"
    cd "$PARENT_DIR"
    npm run build "$lib" -- --prod
    wait
  done <<<"$AFFECTED " # leave space on end to generate correct output

  cd "$PARENT_DIR"
  while IFS= read -r -d $' ' lib; do
    if [ "$DRY_RUN" == "False" ]; then
      echo "Publishing $lib"
      npm publish "$ROOT_DIR/dist/libs/${lib/-//}"
    else
      echo "Dry Run, not publishing $lib"
    fi
    wait
  done <<<"$AFFECTED " # leave space on end to generate correct output
else
  echo "No Libraries to publish"
fi

# Commit back to repo with changes
cd "$PARENT_DIR"
if [ "$DRY_RUN" == "False" ]; then
  echo "Committing version back to repo"
  git add .
  git commit -m "RxJS Primitives $RELEASE_TYPE - $VERSION"
  git tag "$VERSION" -m "$RELEASE_TYPE-$VERSION"
  echo "Release done and submitted to repository"
else
  echo "Dry Run, not committing back to repository"
fi
wait
