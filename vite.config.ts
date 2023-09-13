import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin({
      babel: {
        plugins: [
          "@babel/plugin-syntax-import-assertions"
        ],
      }
    }),
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    // sourcemap: true,
    outDir: './server/dist'
  },
  resolve: {
    alias: [
      path('@utils', './src/utils'),
      path('@screen', './src/screen'),
      path('@lib', './src/lib'),
      path('@api', './src/api'),
      path('@components', './src/components'),
      path('@styles', './src/styles'),
      path('@assets', './src/assets'),
      path('types', './types'),
      path('index', './src/index'),
    ]
  },
})

function path (alias: string, replacementPath: string) {
  return {
    find: alias, 
    replacement: fileURLToPath(new URL(replacementPath, import.meta.url))
  }
}