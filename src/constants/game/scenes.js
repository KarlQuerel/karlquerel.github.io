// the intro cinematic's param: its own page, not a walked scene
export const INTRO_SCENE = 'intro'

// The game's three.js scenes, each opened on /game by its param (`?ship`); without one, /game is the title screen.
export const GAME_SCENES = [
	{ param: INTRO_SCENE, label: 'intro cinematic' },
	{ param: 'ship', label: 'HERMES-8 ship' },
	{ param: 'pilot', label: 'corridor pilot' },
]

// where the title screen hands over: the ship on departure day, until the intro comes between them
export const GAME_START = 'ship'

// where the intro hands over, at its end or skipped: the ship on departure day
export const INTRO_END = 'ship'

// Dev server only: the scene menu on /game
export const SCENE_MENU = {
	label: 'Scenes',
	title: 'title screen',
	holding: { to: '/under-construction', label: 'holding screen' },
}
