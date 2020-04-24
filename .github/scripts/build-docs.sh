#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

ROOT_DIR="."
if test -f "$ROOT_DIR/.npmrc"; then
  rm "$ROOT_DIR/.npmrc"
fi

DEPLOY_PATH=${1:-""}
DOCUMENTATION_DIR=${2:-"documentation"}
AWS_ACL=${3:-"public-read"}
DRY_RUN=${DRY_RUN:-"True"}

echo "Generating docs (Dry Run: $DRY_RUN)"
rm -rf "${ROOT_DIR:?}/${DOCUMENTATION_DIR:?}"
wait
npm run docs:generate -- -c "$ROOT_DIR/.compodocrc.json"
wait
if [[ "$DEPLOY_PATH" != "" && "$DRY_RUN" == "False" ]]; then
  echo "Deploying Documentation to S3 $DEPLOY_PATH"
  aws s3 sync "$ROOT_DIR/$DOCUMENTATION_DIR" "s3://$DEPLOY_PATH" --delete --acl="$AWS_ACL"
  wait
else
  echo "Build Successful, you must pass a deployment path to deploy to S3"
fi

