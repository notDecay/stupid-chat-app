import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

const HASH_NAME = "[hash:20]"

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
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
    },
  },
})