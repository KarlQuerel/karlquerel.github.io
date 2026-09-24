import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	plugins: [vue()],
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				// strip stray logs but keep warn/error — the only prod failure signal
				pure_funcs: ['console.log', 'console.debug', 'console.info'],
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				// vendor only: naming route chunks dragged shared helpers into every route's load
				manualChunks: {
					vendor: ['vue', 'vue-router'],
				},
			},
		},
	},
	resolve: {
		alias: {
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
