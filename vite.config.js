import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { GAME_SHIPPED } from './src/constants/game.js'
import { paletteScss } from './src/constants/palette.js'
import { breakpointsScss } from './src/constants/viewport.js'

// One source for canvas, script and css: stylesheets `@use 'palette:'` / `@use 'breakpoints:'`
// instead of copying hexes and pixel widths.
const VIRTUAL_SCSS = { 'palette:': paletteScss, 'breakpoints:': breakpointsScss }
const virtualImporter = {
	canonicalize: url => (url in VIRTUAL_SCSS ? new URL(url) : null),
	load: url => ({ contents: VIRTUAL_SCSS[url.href](), syntax: 'scss' }),
}

export default defineConfig({
	plugins: [vue()],
	// The ship flag as a literal: only a literal folds the game's imports out of a build.
	define: { 'import.meta.env.GAME_SHIPPED': GAME_SHIPPED },
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
				importers: [virtualImporter],
			},
		},
	},
})
