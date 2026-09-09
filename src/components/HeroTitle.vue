<template>
	<!-- The name and the role, painted once into a sprite and then magnified rather than re-typeset. -->
	<div class="title">
		<div ref="textEl" class="title__text" aria-hidden="true">
			<span class="title__name">
				<span ref="firstEl">{{ firstWords }}</span>
				<span ref="lastEl">{{ lastWord }}</span>
			</span>
			<!-- inline on purpose: their boxes are the text's own, so the sprite lands where the glyphs sit -->
			<span class="title__role"
				><span ref="roleEl">{{ role }}</span></span
			>
			<span class="title__cue"
				><span ref="cueEl">{{ cue }}</span></span
			>
		</div>
		<h1 class="sr-only">{{ name }} — {{ role }}</h1>
		<canvas ref="canvasEl" class="title__plate" aria-hidden="true" />
	</div>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { HERO_FLYBY } from '@/constants/journey'

	const props = defineProps({
		// the whole name, and the two words the camera flies between
		name: { type: String, required: true },
		firstWords: { type: String, required: true },
		lastWord: { type: String, required: true },
		role: { type: String, required: true },
		// the scroll cue, on the plate with the rest so it flies with it
		cue: { type: String, required: true },
		// mid-transit the plate goes bare: the blurred passes magnify into frame-sized washes
		bare: { type: Boolean, default: false },
	})

	const textEl = ref(null)
	const firstEl = ref(null)
	const lastEl = ref(null)
	const roleEl = ref(null)
	const cueEl = ref(null)
	const canvasEl = ref(null)

	// Where the corridor sits from the sprite's centre (px), measured off the real layout.
	const emit = defineEmits(['axis'])

	// getBoundingClientRect reports boxes AFTER ancestor transforms, and the pass scales this lockup.
	function liveScale(el) {
		const laid = el.offsetWidth
		if (!laid) return 1
		const k = el.getBoundingClientRect().width / laid
		// at rest the ratio is 1 bar sub-pixel rounding; snap so the common case is exact
		return Math.abs(k - 1) < 0.01 ? 1 : k
	}

	// Everything comes off the laid-out text, so the stylesheet stays the one place the type is described.
	function measure(el, k, bloom = false) {
		const box = textEl.value.getBoundingClientRect()
		const own = el.getBoundingClientRect()
		const style = getComputedStyle(el)
		return {
			x: (own.left - box.left) / k,
			// canvas draws from the alphabetic baseline; the line box's middle plus half the cap height is close
			mid: (own.top - box.top + own.height / 2) / k,
			size: parseFloat(style.fontSize),
			spacing: parseFloat(style.letterSpacing) || 0,
			family: style.fontFamily,
			colour: style.color,
			text: el.textContent.trim().toUpperCase(),
			// Only the role line carries the bloom: a yellow halo behind white type reads as the glow being the point.
			bloom,
		}
	}

	// Press Start 2P is monospaced, so drawing glyph by glyph reproduces the CSS tracking exactly.
	function drawRun(ctx, run, dpr, colour = run.colour, dx = 0, dy = 0) {
		ctx.font = `${run.size * dpr}px ${run.family}`
		ctx.fillStyle = colour
		const advance = (run.size + run.spacing) * dpr
		for (let i = 0; i < run.text.length; i++) {
			ctx.fillText(run.text[i], run.x * dpr + i * advance + dx, run.mid * dpr + dy)
		}
	}

	// the eight ways round a glyph, for the keyline
	const RING = [
		[-1, -1],
		[0, -1],
		[1, -1],
		[-1, 0],
		[1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
	]

	function paint() {
		const el = canvasEl.value
		if (!el || !textEl.value) return
		const k = liveScale(textEl.value)
		const live = textEl.value.getBoundingClientRect()
		if (!live.width || !live.height) return
		// the box the type actually occupies, with any flight scale taken back out
		const box = { width: live.width / k, height: live.height / k }
		// One texel per device pixel at rest: crisp where it starts, chunky only once the flight magnifies it.
		const dpr = Math.min(window.devicePixelRatio || 1, HERO_FLYBY.plateMaxDpr)
		el.width = Math.round(box.width * dpr)
		el.height = Math.round(box.height * dpr)
		el.style.width = `${box.width}px`
		el.style.height = `${box.height}px`

		const ctx = el.getContext('2d')
		ctx.clearRect(0, 0, el.width, el.height)
		ctx.textBaseline = 'middle'
		ctx.textAlign = 'left'

		const runs = [
			measure(firstEl.value, k),
			measure(lastEl.value, k),
			measure(roleEl.value, k, true),
			measure(cueEl.value, k),
		]

		// The corridor: through the Q's counter — the one glyph with a porthole, and dead on its centre.
		const [first, last, , cue] = runs
		const stacked = Math.abs(first.mid - last.mid) > 1
		const qMid = last.x + last.size / 2 + HERO_FLYBY.qAxis.x * last.size
		const axis = {
			x: stacked ? 0 : qMid - box.width / 2,
			y:
				(first.mid + last.mid) / 2 +
				(stacked ? 0 : HERO_FLYBY.qAxis.y * last.size) -
				box.height / 2,
		}

		// The cue goes on the axis, not the block: the lockup as a whole sits off the frame's centre.
		cue.x =
			box.width / 2 + axis.x - (cue.text.length * (cue.size + cue.spacing) - cue.spacing) / 2
		// Halo and bloom as their own passes; under the per-glyph loop each shadow would smear the next.
		if (!props.bare) {
			for (const [colour, blur, bloomOnly] of [
				[HERO_FLYBY.plateShadow, HERO_FLYBY.plateShadowBlur, false],
				[HERO_FLYBY.plateGlow, HERO_FLYBY.plateGlowBlur, true],
			]) {
				ctx.shadowColor = colour
				ctx.shadowBlur = blur * dpr
				for (const run of runs) if (run.bloom || !bloomOnly) drawRun(ctx, run, dpr)
			}
		}
		ctx.shadowBlur = 0
		ctx.shadowColor = 'transparent'
		for (const run of runs) {
			const off = HERO_FLYBY.plateKeylineEm * run.size * dpr
			for (const [dx, dy] of RING) {
				drawRun(ctx, run, dpr, HERO_FLYBY.plateKeyline, dx * off, dy * off)
			}
		}
		for (const run of runs) drawRun(ctx, run, dpr)

		// The porthole, cut last so nothing silts it up: every pass above spills into it.
		if (!stacked) {
			const port = HERO_FLYBY.qPort * last.size * dpr
			ctx.clearRect(
				(box.width / 2 + axis.x) * dpr - port / 2,
				(box.height / 2 + axis.y) * dpr - port / 2,
				port,
				port
			)
		}

		emit('axis', axis)
	}

	const repaint = useRafThrottle(paint)

	// one repaint per threshold crossing, both directions
	watch(() => props.bare, repaint)

	onMounted(() => {
		paint()
		// a sprite cut before the pixel font arrives is a sprite of the fallback face
		if (document.fonts?.ready) document.fonts.ready.then(paint)
		window.addEventListener('resize', repaint, { passive: true })
	})

	onBeforeUnmount(() => window.removeEventListener('resize', repaint))
</script>

<style scoped lang="scss">
	.title {
		position: relative;
	}

	// Laid out for its metrics and its box, never painted: the sprite is what you see.
	.title__text {
		visibility: hidden;
	}

	.title__name {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		// a real space's advance: the corridor is the gap the name always had
		gap: 1.1em;
		font-family: $font-pixel;
		font-size: inherit;
		line-height: 1.3;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: $white;
	}

	.title__role {
		display: block;
		margin-top: 1.3rem;
		font-family: $font-pixel;
		font-size: px8(2);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: $yellow;
	}

	// Quiet: the smallest step on the grid, widely tracked, dim enough to read as an instruction.
	.title__cue {
		display: block;
		margin-top: 2.4rem;
		font-family: $font-pixel;
		font-size: px8(1);
		letter-spacing: 0.34em;
		text-transform: uppercase;
		color: rgba($white, 0.42);
	}

	// Over the text it was measured from, leaning with the cursor on the shared --mx/--my contract.
	.title__plate {
		position: absolute;
		top: 0;
		left: 0;
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
		image-rendering: pixelated;
	}

	@media (min-width: #{$breakpoint-desktop}) {
		.title__role {
			font-size: px8(5);
		}

		.title__cue {
			font-size: px8(2);
		}
	}
</style>
