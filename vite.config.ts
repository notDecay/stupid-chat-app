import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
// ...
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
import { stylexPlugin } from 'vite-plugin-stylex-dev'
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules'

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    devtools(),
    solidPlugin(),
    stylexPlugin(),
    optimizeCssModules()
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: fileURLToPath(new URL('./client', import.meta.url))
      },
      {
        find: 'public',
        replacement: fileURLToPath(new URL('./public', import.meta.url))
      }
    ]
  }
})
