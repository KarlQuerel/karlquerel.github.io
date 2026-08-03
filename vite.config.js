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
				// strip stray logs but keep warn/error — the only prod failure signal
				pure_funcs: ['console.log', 'console.debug', 'console.info'],
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				// no sport/styles entries: forcing SportPage into a named chunk dragged the
				// shared _export_sfc helper with it, making EVERY route statically load the
				// sport chunk + its render-blocking CSS. Vite's route-based splitting is enough.
				manualChunks: {
					vendor: ['vue', 'vue-router'],
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
