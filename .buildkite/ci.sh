#!/bin/bash

set -euo pipefail
git checkout -B ${BUILDKITE_BRANCH}
git reset --hard

docker run --rm -v "$(pwd):/app" -w /app -e CI="true" -e GH_TOKEN -e NPM_TOKEN node:alpine sh -e "npm ci && npm release"