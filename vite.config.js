import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  root: '.', // Ensure Vite looks in the correct place
  build: {
    outDir: 'dist', // Output directory
  },
  publicDir: 'public', // Define where public assets are stored
})
