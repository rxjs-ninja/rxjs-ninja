#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

ROOT_DIR="."
if test -f "$ROOT_DIR/.npmrc"; then
  rm "$ROOT_DIR/.npmrc"
fi

APP_NAME=${1:-"unknown"}
DEPLOY_PATH=${2:-""}
AWS_ACL=${3:-"public-read"}
DRY_RUN=${DRY_RUN:-"True"}

if [ "$APP_NAME" == 'unknown' ]; then
  echo "App name must be passed"
  exit 1
fi

echo "Generating Demo (Dry Run: $DRY_RUN)"
rm -rf "$ROOT_DIR/dist/apps/demo/$APP_NAME"
wait
npm run build "$APP_NAME" -- --prod
wait
if [[ "$DEPLOY_PATH" != "" && "$DRY_RUN" == "False" ]]; then
  echo "Deploying Demo to S3 $DEPLOY_PATH"
  aws s3 sync "$ROOT_DIR/dist/apps/$APP_NAME" "s3://$DEPLOY_PATH" --delete --acl="$AWS_ACL"
  wait
else
  echo "Build Successful, you must pass a deployment path to deploy to S3"
fi
