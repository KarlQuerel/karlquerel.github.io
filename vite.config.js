import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  root: '.',
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
})
