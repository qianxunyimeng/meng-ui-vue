# DEV FAQ

Here are the problems that are easy to encounter in development.

## If you encounter dependency related issues

```bash
pnpm i
```

## Link local dependencies

```bash
# get dist
pnpm build
cd dist/meng-ui-vue
# set cur meng-ui-vue to global `node_modules`
pnpm link --global
# for esm we also need link meng-ui-vue for dist
pnpm link --global meng-ui-vue

# go to your project, link to `meng-ui-vue`
cd your-project
pnpm link --global meng-ui-vue
```

> More info see [pnpm link](https://pnpm.io/cli/link).

## Theme

We should not write Chinese comments in scss files.

It will generate warning `@charset "UTF-8";` in the header of css file when built with vite.

> More info see [#3219](https://github.com/meng-ui-vue/meng-ui-vue/issues/3219).
