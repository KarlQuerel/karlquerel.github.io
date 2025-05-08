import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
});
