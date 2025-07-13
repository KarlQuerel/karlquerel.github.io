import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

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
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@/styles/variables" as *;',
			},
		},
	},
})
