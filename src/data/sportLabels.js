// Page heading, rendered by PageTitle. Trailing space on `lead` separates it from the accent.
export const SPORT_HEADING = {
	lead: 'Weekly ',
	accent: 'split',
}

const MUSCLE_LABELS = {
	chest: 'Chest',
	back: 'Back',
	triceps: 'Triceps',
	biceps: 'Biceps',
	shoulders: 'Shoulders',
	legs: 'Legs',
	abs: 'Abs',
	waist: 'Waist',
	forearms: 'Forearms',
}

// the legend, in the labels' own order
export const MUSCLE_IDS = Object.keys(MUSCLE_LABELS)

export function muscleLabel(id) {
	return MUSCLE_LABELS[id] ?? id
}

export function badgeLabel(badge) {
	return badge.label ?? MUSCLE_LABELS[badge.class] ?? badge.class
}

// Fixed-wording badges; rest and warm-up times carry their own label in the data.
export const BADGE_LABELS = {
	easy: 'Easy',
	medium: 'Medium',
	hard: 'Hard',
	'drop-set': 'Drop Set',
	'warm-up': 'Warm-up',
}

export const SUPERSET_LABEL = 'Superset'
export const SUPERSET_STEPS = ['A', 'B']
