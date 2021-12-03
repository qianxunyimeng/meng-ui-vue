#!/bin/sh

set -e

pnpm i --frozen-lockfile
pnpm update:version

pnpm build

find dist/meng-ui-vue/packages -type d -name node_modules -print0 | xargs -0 -I {} rm -rf {}

cd dist/meng-ui-vue
npm publish --access public
cd -

echo "Publish completed"
