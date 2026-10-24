<template>
	<!-- the arrival's sky traffic: a few stars breathing, and the odd meteor crossing -->
	<div class="entry__sky-life" :style="lifeStyle">
		<span
			v-for="(tw, i) in twinklers"
			:key="i"
			class="entry__twinkle"
			:style="twinkleStyle(tw)"
		/>
		<span
			v-for="m in meteors"
			:key="`m${m.id}`"
			class="entry__meteor"
			:style="m.style"
			@animationend="removeMeteor(m.id)"
		/>
	</div>
	<!-- the gulls, a slab of depth a layer: each leans with the ranges either side of it and draws
	     over the ones it has passed (js/gulls.js) -->
	<div
		v-for="tier in ENTRY.flock.tiers"
		:key="tier.over"
		class="entry__flight"
		:style="flightStyle(tier)"
	>
		<template v-for="fl in flocks" :key="fl.id">
			<template v-if="fl.flock.tier.over === tier.over">
				<span
					v-for="(b, i) in fl.flock.birds"
					:key="i"
					:ref="el => perch(fl, i, el)"
					class="entry__bird"
				/>
			</template>
		</template>
	</div>
</template>

<script setup>
	import {
		computed,
		markRaw,
		onActivated,
		onBeforeUnmount,
		onDeactivated,
		onMounted,
		ref,
		watch,
	} from 'vue'
	import { useSkySpawner } from '@/composables/useSkySpawner'
	import { ENTRY } from '@/constants/journey'
	import { PALETTE, paletteRgb } from '@/constants/palette'
	import { seedTwinklers } from '@/js/entrySprites'
	import { drawGullSheet } from '@/js/gullArt'
	import { flyFlock, spawnFlock } from '@/js/gulls'
	import { randIn, randInt } from '@/js/math'
	import { windAt } from '@/js/wind'

	const props = defineProps({
		// the first stars' opacity: the whole layer shows, and spawns, only while it is up
		fade: { type: Number, default: 0 },
		// the deck has cleared: only then do gulls fly, or they would cross the whiteout
		clear: { type: Boolean, default: false },
		// how far the sun has gone behind the ranges, 0 by day to 1 by night: the gulls' tone walks with it
		dusk: { type: Number, default: 0 },
		// the visit's weather seed, shared with the rest of the arrival
		seed: { type: Number, required: true },
	})

	const twinklers = ref([])

	const lifeStyle = computed(() => ({
		opacity: props.fade.toFixed(3),
		display: props.fade > 0 ? null : 'none',
	}))

	const tint = names => paletteRgb(names[Math.floor(Math.random() * names.length)])

	// Both streams roll every value per spawn. The spawner owns the gap, tab skip and self-removal.
	const { items: meteors, remove: removeMeteor } = useSkySpawner({
		gapMs: ENTRY.meteor.gapMs,
		active: () => props.fade > 0,
		make: () => {
			const m = ENTRY.meteor
			return {
				style: {
					'--y': `${randIn(m.y).toFixed(1)}%`,
					'--x': `${randIn(m.x).toFixed(1)}%`,
					'--angle': `${randIn(m.angle).toFixed(1)}deg`,
					'--len': `${Math.round(randIn(m.len))}px`,
					'--travel': `${randIn(m.travelVw).toFixed(1)}vw`,
					'--dur': `${Math.round(randIn(m.durMs))}ms`,
					'--peak': randIn(m.peak).toFixed(2),
					'--tint': tint(m.tints),
				},
			}
		},
	})

	// A flock (js/gulls.js): its line through the air and its birds, flown by the loop below. Raw, so
	// a frame's arithmetic on it never asks the template to render.
	const {
		items: flocks,
		remove: removeFlock,
		spawn: callUp,
	} = useSkySpawner({
		gapMs: ENTRY.flock.gapMs,
		// over a clear sky, and a few at a time at most
		active: () => props.clear && flocks.value.length < ENTRY.flock.atOnce,
		make: plan => ({ flock: markRaw(spawnFlock(plan)) }),
	})

	// Reaching the scene, the sky is alive at once: a flock a slab, one each way, from a rolled slab
	// on; and again when the visitor comes back to a cleared sky with none up.
	watch(
		() => props.clear,
		clear => {
			if (!clear) return
			const { tiers, arrive } = ENTRY.flock
			const from = randInt([0, tiers.length - 1])
			for (let k = 0; k < arrive; k++) {
				callUp({ tier: tiers[(from + k) % tiers.length], rightward: k % 2 === 0 })
			}
		},
		{ immediate: true }
	)

	const flightStyle = tier => ({
		display: props.clear ? null : 'none',
		'--depth': tier.depth,
		'--layer': tier.over * ENTRY.stacking.range + ENTRY.stacking.flight,
	})

	// one sheet a slab, in its night tone and seen from its pitch, drawn the first time it asks
	const birdSheets = {}
	const sheetFor = tier =>
		(birdSheets[tier.over] ??= drawGullSheet(ENTRY.bird, tier.tone.night, tier.pitch))

	// The sheet dimmed to the hour: down to the day tone's light while the sun is up, by luminance,
	// walking back to the night tone as the dusk comes on.
	const lum = name =>
		PALETTE[name].reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0)
	function shade(tier, dusk) {
		const day = lum(tier.tone.day) / lum(tier.tone.night)
		return `brightness(${(day + (1 - day) * dusk).toFixed(3)})`
	}

	// A bird's span as it mounts, dressed once: the sheet for its slab shaded to the hour, its
	// flock's density, and the mirror when the viewer is on its left, as it is for every bird flying
	// left. The flight paints the rest, so the template never renders a frame.
	const birdEls = new Map()
	function perch(item, i, el) {
		const key = `${item.id}:${i}`
		if (!el) return void birdEls.delete(key)
		if (birdEls.has(key)) return
		birdEls.set(key, { el, tier: item.flock.tier })
		el.style.backgroundImage = `url(${sheetFor(item.flock.tier)})`
		el.style.filter = shade(item.flock.tier, props.dusk)
		el.style.opacity = item.flock.peak.toFixed(2)
		if (!item.flock.rightward) el.style.transform = 'scaleX(-1)'
	}
	// the dusk walks a step: every bird up shades with it
	watch(
		() => props.dusk,
		dusk => {
			for (const { el, tier } of birdEls.values()) el.style.filter = shade(tier, dusk)
		}
	)

	// The gulls fly on a loop of their own while a flock is up: the wind is read once a frame, on the
	// arrival's seed so it is the gust the chimney smoke leans to, and a flock that has left is let go.
	let flying = 0
	let last = 0
	function fly(now) {
		flying = flocks.value.length ? requestAnimationFrame(fly) : 0
		const dt = last ? now - last : 0
		last = now
		const strength = windAt(now, props.seed)
		const frame = { w: window.innerWidth, h: window.innerHeight }
		for (const item of [...flocks.value]) {
			const paint = (i, style) => {
				const el = birdEls.get(`${item.id}:${i}`)?.el
				if (el) Object.assign(el.style, style)
				return !!el
			}
			if (flyFlock(item.flock, strength, dt, now, frame, paint)) removeFlock(item.id)
		}
	}
	const takeOff = () => {
		if (!flocks.value.length || flying) return
		last = 0
		flying = requestAnimationFrame(fly)
	}
	const ground = () => {
		cancelAnimationFrame(flying)
		flying = 0
	}
	watch(() => flocks.value.length, takeOff)
	onActivated(takeOff)
	onDeactivated(ground)

	// Negative delays, so they are already mid-cycle rather than all lighting together.
	function twinkleStyle(tw) {
		return {
			left: `${tw.left.toFixed(2)}%`,
			top: `${tw.top.toFixed(2)}vh`,
			background: tw.colour,
			animationDuration: `${ENTRY.stars.twinkle.periodMs}ms`,
			animationDelay: `-${Math.round(tw.delay)}ms`,
		}
	}

	// cut a frame after mount, with the rest of the arrival's sprites
	let deferred = 0
	onMounted(() => {
		deferred = requestAnimationFrame(() => {
			twinklers.value = seedTwinklers(props.seed)
		})
	})

	onBeforeUnmount(() => {
		cancelAnimationFrame(deferred)
		ground()
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.entry__sky-life {
		position: absolute;
		inset: 0;
	}

	// Meteor: pixel head plus a fading streak, rotated onto its travel angle.
	.entry__meteor {
		position: absolute;
		top: var(--y);
		left: var(--x);
		width: var(--len);
		height: 2px;
		color: var(--tint);
		background: linear-gradient(to left, currentColor, transparent);
		opacity: 0;
		transform: rotate(var(--angle));
		transform-origin: center;
		image-rendering: pixelated;
		animation: entry-meteor var(--dur) linear forwards;
	}

	.entry__meteor::after {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		width: 3px;
		height: 3px;
		margin-top: -1px;
		background: currentColor;
	}

	@keyframes entry-meteor {
		0% {
			transform: rotate(var(--angle)) translateX(0);
			opacity: 0;
		}
		14% {
			opacity: var(--peak);
		}
		82% {
			opacity: var(--peak);
		}
		100% {
			transform: rotate(var(--angle)) translateX(var(--travel));
			opacity: 0;
		}
	}

	// Self-running motion, so it is stepped; three steps reads as a blink rather than a fade.
	.entry__twinkle {
		position: absolute;
		width: 2px;
		height: 2px;
		animation-name: entry-twinkle;
		animation-timing-function: steps(3, end);
		animation-iteration-count: infinite;
	}

	@keyframes entry-twinkle {
		0%,
		55% {
			opacity: 1;
		}
		70%,
		100% {
			opacity: 0.2;
		}
	}

	// A slab of the gulls' depth: it leans with the ranges either side of it and stacks over the ones
	// it has passed; the birds inside are placed, sized and stepped through their sheet by the flight.
	.entry__flight {
		position: absolute;
		inset: 0;
		z-index: var(--layer);
		pointer-events: none;
		@include lean;
	}

	.entry__bird {
		position: absolute;
		top: 0;
		left: 0;
		background-repeat: no-repeat;
		image-rendering: pixelated;
	}

	@media (prefers-reduced-motion: reduce) {
		.entry__twinkle,
		.entry__meteor {
			animation: none;
		}
	}
</style>
