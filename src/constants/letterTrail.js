// The v-letter-trail directive (directives/letterTrail.js); `highlight` and `steps` match the ::highlight() rules in AboutLife.vue.
export const LETTER_TRAIL = {
	highlight: 'letter-trail',
	steps: 4,
	fadeMs: 700,
	// spacing of the points sampled between two pointer events, so a fast flick lights every letter it crosses
	samplePx: 6,
}
