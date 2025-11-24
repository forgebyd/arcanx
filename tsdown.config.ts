import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  minify: false,
  sourcemap: true,
  publint: true,
  unused: true,
  unbundle: false,

  format: 'esm',
  platform: 'node',
  target: 'es2020',

  outputOptions: {
    dir: 'dist',
    chunkFileNames: 'shared/[name]-[hash].mjs',
    entryFileNames: '[name].mjs',
  },

  workspace: {
    include: ['examples/*', 'packages/*'],
  },
});
