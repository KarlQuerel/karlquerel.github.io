import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	base: '/',
	plugins: [vue()],
	build: {
		outDir: 'dist',
		chunkSizeWarningLimit: 1000,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['vue', 'vue-router'],
					game: ['./src/components/game/Game.vue'],
					styles: ['./src/styles/main.scss'],
				},
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash].[ext]',
			},
		},
		assetsInlineLimit: 4096,
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
