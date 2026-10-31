// The intro's copy, shot by shot, from GAME_STORY.md section 4. Cards are one declarative line each.

export const INTRO_CARDS = {
	year: 'YEAR 3812.',
	dying: 'EARTH IS DYING.',
	sun: 'THE SUN HAS BEEN GROWING RELENTLESSLY.',
	burning: 'BURNING EVERYTHING.',
	vote: 'THE EARTH CONFEDERATION CHOSE TO LAUNCH THE HERMES PROJECT.',
	chosen: 'YOU WERE CHOSEN.',
	warning: 'WARNING. WARNING. CRITICAL ERROR.',
}

// The role pick at the door: one starting item each, held in the right hand from then on.
export const INTRO_ROLES = [
	{ key: 'engineer', label: 'ENGINEER', item: 'WRENCH' },
	{ key: 'medic', label: 'MEDIC', item: 'MED-KIT' },
	{ key: 'pilot', label: 'PILOT', item: 'CUTTER' },
]

// Under a walked scene until the player first moves, then whenever the view rests on what can be pushed.
export const INTRO_WALK_HINT = 'WASD TO MOVE, CLICK TO LOOK AROUND'
export const INTRO_PUSH_HINT = 'E TO PUSH'

// The visor's one button: the wake waits on it.
export const INTRO_HUD = {
	respond: 'RESPOND',
}

// The board of ten: one light per ship, yours lit, the rest going out over the crossing.
export const INTRO_BOARD = {
	ships: 10,
	yours: 8,
}

export const INTRO_SKIP = 'SKIP >>'
// straight to act I, past every shot of the intro
export const INTRO_SKIP_INTRO = 'SKIP INTRO >>|'

// The title drop after the crash, and the act it opens on.
export const INTRO_ACT = { lead: 'ACT I', accent: 'THE WRECK', delayMs: 600, charMs: 55 }
export const INTRO_ACT_WORLD = { lead: 'ACT II', accent: 'THE WORLD', delayMs: 600, charMs: 55 }
