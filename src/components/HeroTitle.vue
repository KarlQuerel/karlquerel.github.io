<template>
	<!-- The name and the role, painted once into a sprite and then magnified rather
	     than re-typeset. The text itself stays in the DOM, laid out but never painted:
	     it is what the sprite is measured from, what screen readers and crawlers get,
	     and what keeps the type metrics in the stylesheet where the rest of the site's
	     are. Scaling live text meant re-rasterising every glyph on every scrolled
	     frame; a sprite is one texture, and NEAREST magnification is the direction
	     pixel art should break — chunky, not soft. -->
	<div class="title">
		<div ref="textEl" class="title__text" aria-hidden="true">
			<span class="title__name">
				<span ref="firstEl">{{ firstWords }}</span>
				<span ref="lastEl">{{ lastWord }}</span>
			</span>
			<!-- the inner spans are inline on purpose: their boxes are the text's own, so
			     the sprite is drawn where the glyphs actually sit whatever the block
			     around them is aligned to -->
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
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { HERO_FLYBY } from '@/constants/journey'

	defineProps({
		// the whole name, and the two words the camera flies between
		name: { type: String, required: true },
		firstWords: { type: String, required: true },
		lastWord: { type: String, required: true },
		role: { type: String, required: true },
		// the scroll cue, on the plate with the rest so it flies with it
		cue: { type: String, required: true },
	})

	const textEl = ref(null)
	const firstEl = ref(null)
	const lastEl = ref(null)
	const roleEl = ref(null)
	const cueEl = ref(null)
	const canvasEl = ref(null)

	// Where the corridor sits relative to the sprite's own centre, in px, both axes —
	// the point the flight aims at, measured off the real layout rather than estimated
	// from character counts. The title is centred in the lockup, so an offset from one
	// centre is an offset from the other, and the flight scales about it.
	const emit = defineEmits(['axis'])

	// Everything the paint needs comes off the laid-out text, so the stylesheet stays
	// the one place the type is described — including whatever the breakpoints and any
	// wrapping did to it.
	function measure(el, bloom = false) {
		const box = textEl.value.getBoundingClientRect()
		const own = el.getBoundingClientRect()
		const style = getComputedStyle(el)
		return {
			x: own.left - box.left,
			// canvas draws from the alphabetic baseline; the line box's middle plus half
			// the cap height is close enough for a face with no descenders in caps
			mid: own.top - box.top + own.height / 2,
			size: parseFloat(style.fontSize),
			spacing: parseFloat(style.letterSpacing) || 0,
			family: style.fontFamily,
			colour: style.color,
			text: el.textContent.trim().toUpperCase(),
			// the cue is meant to sit quietly under the name, so it takes the shadow
			// that holds it off the sky but not the bloom the display type carries
			bloom,
		}
	}

	// Press Start 2P is monospaced, so a run of caps is just the advance repeated —
	// drawing glyph by glyph reproduces the CSS tracking exactly, on any engine, and
	// lands every letter on a whole texel.
	function drawRun(ctx, run, dpr) {
		ctx.font = `${run.size * dpr}px ${run.family}`
		ctx.fillStyle = run.colour
		const advance = (run.size + run.spacing) * dpr
		for (let i = 0; i < run.text.length; i++) {
			ctx.fillText(run.text[i], run.x * dpr + i * advance, run.mid * dpr)
		}
	}

	function paint() {
		const el = canvasEl.value
		if (!el || !textEl.value) return
		const box = textEl.value.getBoundingClientRect()
		if (!box.width || !box.height) return
		// One texel per device pixel at rest: crisp where it starts, chunky only once
		// the flight has magnified it, which is the whole point of the sprite.
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
			measure(firstEl.value, true),
			measure(lastEl.value, true),
			measure(roleEl.value, true),
			measure(cueEl.value),
		]
		// Shadow and bloom as their own passes, then the letters crisp on top: what the
		// live type got from its text-shadows. Blurring under the per-glyph loop instead
		// would stack each glyph's shadow on the next and smear the lot.
		for (const [colour, blur, bloomOnly] of [
			[HERO_FLYBY.plateShadow, HERO_FLYBY.plateShadowBlur, false],
			[HERO_FLYBY.plateGlow, HERO_FLYBY.plateGlowBlur, true],
		]) {
			ctx.shadowColor = colour
			ctx.shadowBlur = blur * dpr
			for (const run of runs) if (run.bloom || !bloomOnly) drawRun(ctx, run, dpr)
		}
		ctx.shadowBlur = 0
		ctx.shadowColor = 'transparent'
		for (const run of runs) drawRun(ctx, run, dpr)

		// The corridor: the gap between the two words, and vertically the middle of the
		// row they sit on — which is not the sprite's middle, since the role line hangs
		// below them. Stacked into two rows on a narrow frame the corridor becomes a
		// horizontal band instead, so across it is simply the centre and down it is the
		// space between the rows: the same two lines of code either way.
		const [first, last] = runs
		const stacked = Math.abs(first.mid - last.mid) > 1
		const gapFrom = first.x + first.text.length * (first.size + first.spacing) - first.spacing
		emit('axis', {
			x: stacked ? 0 : gapFrom + (last.x - gapFrom) / 2 - box.width / 2,
			y: (first.mid + last.mid) / 2 - box.height / 2,
		})
	}

	const repaint = useRafThrottle(paint)

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

	// Quiet: the smallest step on the grid, widely tracked, and dim enough to read as
	// an instruction rather than as part of the lockup.
	.title__cue {
		display: block;
		margin-top: 2.4rem;
		font-family: $font-pixel;
		font-size: px8(1);
		letter-spacing: 0.34em;
		text-transform: uppercase;
		color: rgba($white, 0.42);
	}

	// Over the text it was measured from, and leaning with the cursor on the shared
	// --mx/--my contract.
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
