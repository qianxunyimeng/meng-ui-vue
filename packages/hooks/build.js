const { build, context } = require('esbuild');
console.log("env:",process.env.NODE_ENV)
async function bundle(format) {
  const ext = format === 'esm' ? '.mjs' : '.js';
  const outfile = `dist/index.${format}${ext}`;
  const finish = () => console.log('Build finished:', outfile);

  const options = {
    format,
    bundle: true,
    target: ['chrome53'],
    outfile,
    // preserve Chinese character
    charset: 'utf8',
    external: ['vue', 'vant'],
    entryPoints: ['./src/index.ts'],
    minify: process.env.NODE_ENV == "production" ? true : false,
  };

  if (process.argv.includes('-w')) {
    const loggerPlugin = {
      name: 'loggerPlugin',
      setup(build) {
        build.onEnd(finish);
      },
    };

    const ctx = await context({
      ...options,
      plugins: [loggerPlugin],
    });

    await ctx.watch();
  } else {
    await build(options);
    finish();
  }
}

bundle('esm');
bundle('cjs');
