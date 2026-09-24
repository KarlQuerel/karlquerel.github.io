// The 404 page (NotFound.vue): its words, one per line, and the float that keeps them off the cursor.
export const NOT_FOUND_WORDS = ['Page', 'not', 'found']

// Zero-g float plus cursor-fleeing physics, always easing back toward the layout home.
export const NOT_FOUND_FLOAT = {
	// px: how close the cursor must get to push the title
	repelRadius: 220,
	// px/frame²: peak shove right at the cursor
	repelStrength: 2.6,
	// px/frame²: idle drift force, and how fast (rad/frame) its direction turns
	wanderStrength: 0.12,
	wanderTurn: 0.03,
	// spring constant easing the title home, and the share of velocity kept each frame
	centerPull: 0.004,
	friction: 0.92,
	// share of the half-viewport the title may roam
	maxOffset: 0.42,
	// deg of bank per px/frame of drift, and its cap
	tiltPerSpeed: 1.2,
	maxTilt: 12,
}
