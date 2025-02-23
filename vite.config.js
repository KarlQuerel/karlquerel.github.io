import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/', // Ensure the base path is set to '/'
  plugins: [vue()],
  root: '.', // This is fine for the root of your repo
  build: {
    outDir: 'dist', // Output folder for build
  },
  publicDir: 'public', // Static assets folder
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // Ensuring Vue is resolved correctly
    },
  },
});
