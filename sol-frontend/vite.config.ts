import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
        NodeModulesPolyfillPlugin()
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [ rollupNodePolyFill() ],
    },
  },
})
