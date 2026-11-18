// The game's three.js scenes, each opened on /game by its param (`?ship`); without one, /game is the title screen.
export const GAME_SCENES = [
	{ param: 'ship', label: 'HERMES-8 ship' },
	{ param: 'pilot', label: 'corridor pilot' },
]

// where the title screen hands over: the ship on departure day, until the intro comes between them
export const GAME_START = 'ship'

// Dev server only: the scene menu on /game
export const SCENE_MENU = {
	label: 'Scenes',
	title: 'title screen',
	holding: { to: '/under-construction', label: 'holding screen' },
}
