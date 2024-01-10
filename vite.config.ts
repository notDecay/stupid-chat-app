import {  
  defineConfig, 
} from 'vite'
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules'
import solidPlugin from 'vite-plugin-solid'
import {
  stylexPlugin
} from "vite-plugin-stylex-dev"

const HASH_NAME = "[hash:20]"

export default defineConfig({
  plugins: [
    solidPlugin(),
    optimizeCssModules(),
    stylexPlugin()
  ],
  server: {
    port: 3000,
  },
  cacheDir: './build/dist/cache',
  build: {
    target: 'esnext',
    outDir: './build/dist/client',
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: `${HASH_NAME}.[ext]`,
        chunkFileNames: `${HASH_NAME}.js`,
        entryFileNames: `${HASH_NAME}.js`,
      },
    },
  },
})