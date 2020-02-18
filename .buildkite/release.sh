#!/bin/sh

set -euo pipefail

npm ci
npm run release
