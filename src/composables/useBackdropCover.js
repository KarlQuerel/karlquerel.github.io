import { ref } from 'vue'

// Whether an opaque scene owns the whole frame — the entry veil at full, and the
// landed dusk that follows it. One shared flag: the journey writes it, the starfield
// (SpaceBackground) reads it to stop paying for drift and comets nobody can see.
const covered = ref(false)

export function useBackdropCover() {
	return covered
}
