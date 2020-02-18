#!/bin/bash

set -euo pipefail
git checkout -B ${BUILDKITE_BRANCH}
git reset --hard

docker run --rm -v "$(pwd):/app" -w /app -e CI="true" -e GH_TOKEN -e NPM_TOKEN timbru31/node-alpine-git:12 sh .buildkite/release.sh