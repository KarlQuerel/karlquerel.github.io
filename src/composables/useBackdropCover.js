import { ref } from 'vue'

// Whether an opaque scene owns the whole frame: the entry veil at full, and the dusk that follows.
const covered = ref(false)

export function useBackdropCover() {
	return covered
}
