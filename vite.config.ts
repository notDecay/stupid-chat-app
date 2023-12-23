import { defineConfig } from 'vite'
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules'
import solidPlugin from 'vite-plugin-solid'
import stylexPlugin from '@stylexjs/rollup-plugin'

const HASH_NAME = "[hash:20]"

const _stylexPlugin = stylexPlugin({
  // fileName: "./build/assets/style.css",
})

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    optimizeCssModules()
  ],
  server: {
    port: 3000,
  },
  cacheDir: './build/cache',
  build: {
    target: 'esnext',
    outDir: './build/dist/client',
    rollupOptions: {
      output: {
        assetFileNames: `${HASH_NAME}.[ext]`,
        chunkFileNames: `${HASH_NAME}.js`,
        entryFileNames: `${HASH_NAME}.js`,
      },
      plugins: [_stylexPlugin]
    },
  },
})