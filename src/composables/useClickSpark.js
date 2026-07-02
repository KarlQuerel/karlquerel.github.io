// Spawns a short "spark" burst from the pointer on every left click — a
// reproduction of the click animation on eduardbodak.com.
// Call once from a component that lives for the whole app lifetime (App.vue).

import { onMounted, onBeforeUnmount } from 'vue'
import { CLICK_SPARK } from '../constants/clickSpark'

export function useClickSpark() {
	let cooling = false
	let pointerMedia = null

	// Skip the burst when the click started inside an opted-out subtree.
	function isOptedOut(target) {
		for (let el = target; el && el !== document.body; el = el.parentElement) {
			if (el.hasAttribute(CLICK_SPARK.IGNORE_ATTRIBUTE)) return true
		}
		return false
	}

	function makeSpark(x, y, angle) {
		const spark = document.createElement('div')
		spark.className = CLICK_SPARK.CLASS_NAME
		spark.style.left = `${x}px`
		spark.style.top = `${y}px`
		spark.style.setProperty(CLICK_SPARK.ANGLE_VAR, `${angle}deg`)
		spark.setAttribute('aria-hidden', 'true')
		document.body.append(spark)
		setTimeout(() => spark.remove(), CLICK_SPARK.LIFETIME_MS)
	}

	function onPointerDown(event) {
		// Left button only, no modifier-click (those carry their own intent).
		if (
			event.button !== 0 ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey ||
			event.metaKey
		) {
			return
		}
		if (cooling || isOptedOut(event.target)) return

		for (let i = 1; i <= CLICK_SPARK.SPARK_COUNT; i++) {
			makeSpark(event.pageX, event.pageY, CLICK_SPARK.ANGLE_STEP_DEG * i)
		}

		cooling = true
		setTimeout(() => {
			cooling = false
		}, CLICK_SPARK.COOLDOWN_MS)
	}

	// Bind only while a precise pointer is present; re-evaluate if that changes.
	function syncBinding() {
		if (pointerMedia.matches) {
			document.body.addEventListener('pointerdown', onPointerDown)
		} else {
			document.body.removeEventListener('pointerdown', onPointerDown)
		}
	}

	onMounted(() => {
		pointerMedia = window.matchMedia(CLICK_SPARK.POINTER_QUERY)
		pointerMedia.addEventListener('change', syncBinding)
		syncBinding()
	})

	onBeforeUnmount(() => {
		document.body.removeEventListener('pointerdown', onPointerDown)
		pointerMedia?.removeEventListener('change', syncBinding)
	})
}
