/***	useSplitFlap		***/
// Drives a Solari split-flap (departure-board) settle for a hero line. Given a
// reactive array of text segments (each { text, accent? }), it flattens the line
// into per-character cells and, whenever the line changes, replays a stepped
// glyph-cycling animation that locks characters left -> right.
//
// Timestamp-based (performance.now via requestAnimationFrame) so the effect is
// framerate-independent. Honors prefers-reduced-motion by settling instantly.
// Cancels its RAF on every re-trigger and on unmount, so nothing leaks.

import { ref, watch, onBeforeUnmount } from 'vue'
import { SPLIT_FLAP_CONFIG } from '../data/splitFlapConfig.js'
import { prefersReducedMotion } from './usePrefersReducedMotion.js'

const { FRAME_MS, FLIPS_PER_CHAR, STAGGER_MS, GLYPH_POOL } = SPLIT_FLAP_CONFIG

function randomGlyph() {
	return GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)]
}

// Flatten segments -> per-character cells, preserving each char's accent flag.
function flattenLine(segments) {
	const cells = []
	for (const segment of segments ?? []) {
		const accent = Boolean(segment.accent)
		for (const char of [...(segment.text ?? '')]) {
			cells.push({ final: char, accent, isSpace: char === ' ' })
		}
	}
	return cells
}

export function useSplitFlap(lineRef) {
	// Reactive render model: one entry per character { glyph, accent, settled }.
	const cells = ref([])

	let rafId = 0
	let startTime = 0
	let plan = []

	function stop() {
		if (rafId) {
			cancelAnimationFrame(rafId)
			rafId = 0
		}
	}

	function tick(now) {
		const elapsed = now - startTime
		let allSettled = true

		cells.value = plan.map((cell, index) => {
			// Spaces lock instantly and never cycle, but still occupy an index so the
			// left -> right timing stays spatially coherent across gaps.
			if (cell.isSpace) {
				return { glyph: cell.final, accent: cell.accent, settled: true, frame: -1 }
			}

			const local = elapsed - index * STAGGER_MS
			const frame = Math.floor(local / FRAME_MS)

			if (frame >= FLIPS_PER_CHAR) {
				return { glyph: cell.final, accent: cell.accent, settled: true, frame }
			}

			allSettled = false
			// Hold the random glyph for the whole FRAME_MS window so the swap reads
			// stepped rather than blurred across the ~3 RAFs inside one frame.
			const prev = cells.value[index]
			const held = prev && prev.frame === frame && !prev.settled
			return {
				glyph: held ? prev.glyph : randomGlyph(),
				accent: cell.accent,
				settled: false,
				frame,
			}
		})

		if (allSettled) {
			stop()
			return
		}
		rafId = requestAnimationFrame(tick)
	}

	function start() {
		stop()
		plan = flattenLine(lineRef.value)

		if (prefersReducedMotion()) {
			cells.value = plan.map(cell => ({
				glyph: cell.final,
				accent: cell.accent,
				settled: true,
			}))
			return
		}

		// Seed with cycling glyphs synchronously so the first paint never flashes the
		// final text, then drive frames from a single timestamp origin.
		cells.value = plan.map(cell => ({
			glyph: cell.isSpace ? cell.final : randomGlyph(),
			accent: cell.accent,
			settled: cell.isSpace,
			frame: -1,
		}))
		startTime = performance.now()
		rafId = requestAnimationFrame(tick)
	}

	watch(lineRef, start, { immediate: true })
	onBeforeUnmount(stop)

	return { cells }
}
