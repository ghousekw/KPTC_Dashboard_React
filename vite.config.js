import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create separate chunks for large dependencies
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      },
      input: {
        main: resolve(__dirname, 'index.html')
      },
      // Exclude MP4 files and their containing directories from the build
      external: [
        /\.mp4$/,
        /assets\/help\/.*\.mp4$/,
        /public\/assets\/help\/.*\.mp4$/
      ]
    },
    // Exclude specific file patterns from the build
    assetsInclude: ['**/*.png', '**/*.svg', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
    // Copy only specific assets to the dist folder
    copyPublicDir: true,
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
