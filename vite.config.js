import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// HERE sport page
/** Map /sport → static public/sport/index.html (dev + preview). Without this, Vue Router's catch-all shows NotFound. */
function sportStaticPathPlugin() {
	const rewrite = (req, _res, next) => {
		const url = req.url ?? ''
		const pathOnly = url.split('?')[0]
		if (pathOnly === '/sport' || pathOnly === '/sport/') {
			const q = url.includes('?') ? '?' + url.split('?').slice(1).join('?') : ''
			req.url = '/sport/index.html' + q
		}
		next()
	}
	return {
		name: 'sport-static-path',
		enforce: 'pre',
		configureServer(server) {
			server.middlewares.use(rewrite)
		},
		configurePreviewServer(server) {
			server.middlewares.use(rewrite)
		},
	}
}

export default defineConfig({
	base: '/',
	plugins: [sportStaticPathPlugin(), vue()],
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
