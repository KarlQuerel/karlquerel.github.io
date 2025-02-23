import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/', 
  plugins: [vue()],
  root: '.',
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  resolve: {
    alias: {
      // Ensure Vue is correctly resolved
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
});
