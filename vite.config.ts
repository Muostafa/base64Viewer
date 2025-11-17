import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdfjs-dist']
  },
  build: {
    rollupOptions: {
      output: {
        // Copy PDF.js worker to output directory
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.includes('pdf.worker')) {
            return 'assets/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  resolve: {
    alias: {
      // Ensure pdfjs worker can be resolved
      'pdfjs-dist/build/pdf.worker.mjs': resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.mjs')
    }
  }
})
