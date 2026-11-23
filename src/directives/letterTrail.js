// Lights the letters the mouse crosses, then steps them back to the prose colour.
// The CSS Custom Highlight API paints them, so the text stays one plain node: selection, find and screen readers are untouched.

import { prefersReducedMotion } from '../composables/usePrefersReducedMotion.js'
import { LETTER_TRAIL } from '../constants/letterTrail.js'

const STEP_MS = LETTER_TRAIL.fadeMs / LETTER_TRAIL.steps

const trailed = new WeakSet()
// text node -> offset -> { range, at, step }
const lit = new Map()
let highlights = null
let probe = null
let last = null
let frame = 0

function supported() {
	return (
		'highlights' in CSS &&
		Boolean(document.caretPositionFromPoint || document.caretRangeFromPoint)
	)
}

function caretAt(x, y) {
	if (document.caretPositionFromPoint) {
		const position = document.caretPositionFromPoint(x, y)
		return position && { node: position.offsetNode, offset: position.offset }
	}
	const range = document.caretRangeFromPoint(x, y)
	return range && { node: range.startContainer, offset: range.startOffset }
}

// The caret falls between two letters: keep the one whose box holds the point.
function letterAt(x, y) {
	const caret = caretAt(x, y)
	if (!caret || caret.node.nodeType !== Node.TEXT_NODE || !trailed.has(caret.node.parentElement))
		return null
	const { node, offset } = caret
	for (const at of [offset - 1, offset]) {
		if (at < 0 || at >= node.length || /\s/.test(node.data[at])) continue
		probe.setStart(node, at)
		probe.setEnd(node, at + 1)
		const box = probe.getBoundingClientRect()
		if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom)
			return { node, offset: at }
	}
	return null
}

function repaint() {
	highlights.forEach(highlight => highlight.clear())
	for (const letters of lit.values()) {
		for (const { range, step } of letters.values()) highlights[step - 1].add(range)
	}
}

// Repaints only when a letter changes step, not every frame.
function tick(now) {
	let changed = false
	for (const [node, letters] of lit) {
		for (const [offset, letter] of letters) {
			// the frame clock can trail the event's, so a fresh letter clamps to the top step
			const step = Math.min(
				LETTER_TRAIL.steps,
				LETTER_TRAIL.steps - Math.floor((now - letter.at) / STEP_MS)
			)
			if (step === letter.step) continue
			changed = true
			if (step < 1) letters.delete(offset)
			else letter.step = step
		}
		if (!letters.size) lit.delete(node)
	}
	if (changed) repaint()
	frame = lit.size ? requestAnimationFrame(tick) : 0
}

function light({ node, offset }, at) {
	if (!lit.has(node)) lit.set(node, new Map())
	const letters = lit.get(node)
	const letter = letters.get(offset)
	if (letter) letter.at = at
	else {
		const range = new Range()
		range.setStart(node, offset)
		range.setEnd(node, offset + 1)
		letters.set(offset, { range, at, step: 0 })
	}
	frame ||= requestAnimationFrame(tick)
}

function onMove(event) {
	if (event.pointerType !== 'mouse' || prefersReducedMotion()) return
	const { clientX: x, clientY: y } = event
	const from = last ?? { x, y }
	const samples = Math.max(
		1,
		Math.ceil(Math.hypot(x - from.x, y - from.y) / LETTER_TRAIL.samplePx)
	)
	for (let i = 1; i <= samples; i++) {
		const letter = letterAt(
			from.x + ((x - from.x) * i) / samples,
			from.y + ((y - from.y) * i) / samples
		)
		if (letter) light(letter, event.timeStamp)
	}
	last = { x, y }
}

function onLeave() {
	last = null
}

export const letterTrail = {
	mounted(el) {
		if (!supported()) return
		highlights ??= Array.from({ length: LETTER_TRAIL.steps }, (_, i) => {
			const highlight = new Highlight()
			CSS.highlights.set(`${LETTER_TRAIL.highlight}-${i + 1}`, highlight)
			return highlight
		})
		probe ??= new Range()
		trailed.add(el)
		el.addEventListener('pointermove', onMove)
		el.addEventListener('pointerleave', onLeave)
	},
	unmounted(el) {
		trailed.delete(el)
		el.removeEventListener('pointermove', onMove)
		el.removeEventListener('pointerleave', onLeave)
	},
}
