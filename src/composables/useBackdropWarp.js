import { ref } from 'vue'

// How far the hero pass has carried the camera into the sky, 0 -> 1: the star planes zoom by it.
const warp = ref(0)

export function useBackdropWarp() {
	return warp
}
