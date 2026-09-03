// The landing's boot, shared between the shell that shows it (App.vue) and the scene
// that fills it (HomeJourney → DepartureRidge). It lives in the shell rather than in
// the landing because the landing is a lazy chunk: anything inside it arrives after
// the starfield, and the whole point of the boot is that nothing arrives before it.
// One module-level state, since there is one boot per page load.

import { computed, ref } from 'vue'
import { LANDING_BOOT } from '@/constants/journey'

const active = ref(false)
const progress = ref(0)
const ceiling = ref(0)
const cut = ref(false)
const fonts = ref(false)
const timedOut = ref(false)
const done = computed(() => (cut.value && fonts.value) || timedOut.value)

export function useBoot() {
	return {
		active,
		progress,
		ceiling,
		done,
		// the shell starts it on a landing load; the font is the title's face
		start() {
			active.value = true
			if (document.fonts) document.fonts.ready.then(() => (fonts.value = true))
			else fonts.value = true
			window.setTimeout(() => (timedOut.value = true), LANDING_BOOT.maxWaitMs)
		},
		// the departure reports each canvas as it lands, and the whole cut when done
		report(done, next) {
			progress.value = done
			ceiling.value = Math.min(1, next)
		},
		finish() {
			cut.value = true
		},
	}
}
