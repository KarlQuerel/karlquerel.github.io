import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/karlquerel.github.io/', // ✅ Correct base path for GitHub Pages
  plugins: [vue()],
  build: {
    outDir: 'dist', // ✅ Ensure build output is in dist/
  },
  publicDir: 'public', // ✅ Keep static assets in public/
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // ✅ Ensuring Vue is resolved correctly
    },
  },
});
