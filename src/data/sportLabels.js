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

export function muscleLabel(id) {
	return MUSCLE_LABELS[id] ?? id
}

export function badgeLabel(badge) {
	return badge.label ?? MUSCLE_LABELS[badge.class] ?? badge.class
}
