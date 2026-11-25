import { INTRO } from './intro.js'
import { PILOT_BOOT } from './pilot.js'
import { SHIP_LAB } from './shipLab.js'
import { MENU } from '../intro/menu.js'

// Dev server only: the game's loader on its own page (`?boot`, GameBootPreview.vue), played again and again on a
// pretend boot. Each screen's real boot weights pace its steps over `loadS` seconds (the slider's range, step and
// start); `restS` of black between runs.
export const BOOT_PREVIEW = {
	param: 'boot',
	label: 'loading screen',
	weights: { title: MENU.boot, intro: INTRO.boot, ship: SHIP_LAB.boot, pilot: PILOT_BOOT },
	loadS: { min: 0.5, max: 20, step: 0.5, start: 4 },
	restS: 1.2,
	words: { screen: 'SCREEN', load: 'LOAD', seconds: 'S', replay: 'REPLAY' },
}
