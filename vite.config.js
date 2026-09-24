import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { paletteScss } from './src/constants/palette.js'

// one palette for canvas and css: stylesheets `@use 'palette:'` instead of copying hexes
const paletteImporter = {
	canonicalize: url => (url === 'palette:' ? new URL(url) : null),
	load: () => ({ contents: paletteScss(), syntax: 'scss' }),
}

export default defineConfig({
	plugins: [vue()],
	build: {
		rolldownOptions: {
			output: {
				// vendor only: naming route chunks dragged shared helpers into every route's load
				codeSplitting: {
					groups: [
						{ name: 'vendor', test: /node_modules[\\/](vue|@vue|vue-router)[\\/]/ },
					],
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname, 'src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@/styles/variables" as *;',
				importers: [paletteImporter],
			},
		},
	},
})
