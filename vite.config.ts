import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set Project default path
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react()
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src/background.ts'),
        sidepanel: resolve(__dirname, 'index.html'),
        scapler: resolve(__dirname, 'src/scalper.ts')
      },
      output: {
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})