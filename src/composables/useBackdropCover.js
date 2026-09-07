import { ref } from 'vue'

// Whether an opaque scene owns the whole frame — the entry veil at full, and the landed dusk that
// follows it.
const covered = ref(false)

export function useBackdropCover() {
	return covered
}
