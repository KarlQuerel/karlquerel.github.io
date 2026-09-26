<template>
	<!-- The route: the journey's own line, drawn in the page rather than the chrome. -->
	<svg v-if="geo" v-bind="frame" class="route" :style="frameStyle" aria-hidden="true">
		<defs>
			<!-- One mask path per subpath: Chromium restarts the dash phase at every moveto. -->
			<mask
				id="route-flown"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				:width="geo.w"
				:height="geo.h"
			>
				<path
					v-for="(sub, i) in geo.subs"
					:key="i"
					class="route__draw"
					:d="sub.d"
					:stroke-dasharray="`${reveal(sub).toFixed(1)} ${(sub.len + ROUTE.dashTailPx).toFixed(1)}`"
				/>
			</mask>
		</defs>
		<g class="route__flown" mask="url(#route-flown)">
			<path class="route__casing" :d="geo.d" />
			<path class="route__ink" :d="geo.d" />
			<rect
				v-for="(n, i) in geo.nodes"
				:key="i"
				class="route__node"
				:x="n[0] - ROUTE.nodePx / 2"
				:y="n[1] - ROUTE.nodePx / 2"
				:width="ROUTE.nodePx"
				:height="ROUTE.nodePx"
				:transform="`rotate(45 ${n[0]} ${n[1]})`"
			/>
		</g>
	</svg>
	<!-- The cursor rides its own layer above the reading matter: at the trace's own depth it sat behind
	     the station bodies at 66 of 88 sampled scroll positions, on desktop and phone alike. -->
	<svg
		v-if="geo && tip"
		v-bind="frame"
		class="route route--cursor"
		:style="frameStyle"
		aria-hidden="true"
	>
		<polygon
			class="route__tip"
			:points="TIP_DART"
			:transform="`translate(${tip[0]} ${tip[1]}) rotate(${heading})`"
		/>
	</svg>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { JOURNEY, ROUTE } from '@/constants/journey'
	import { MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { clamp, smoothstep } from '@/js/math'
	import { flyCorners, walkRoute } from '@/js/routeGeometry'

	const props = defineProps({
		// The camera sampled at an arbitrary scroll (HomeJourney owns the track).
		camAt: { type: Function, required: true },
	})

	const geo = ref(null)
	const flownLen = ref(0)
	const tip = ref(null)
	// which way the tip is pointing, in degrees - the tangent of the path under it
	const heading = ref(90)
	// the line leaves as the orbit begins: once the planet owns the frame, the chart has done its job
	const fade = ref(1)

	// Both layers are the same box over the same track, so the cursor lines up without a second measure.
	const frame = computed(() =>
		geo.value
			? {
					width: geo.value.w,
					height: geo.value.h,
					viewBox: `0 0 ${geo.value.w} ${geo.value.h}`,
				}
			: null
	)
	const frameStyle = computed(() => ({
		opacity: fade.value,
		'--depth': JOURNEY.parallax.body,
	}))

	// nose, shoulder, tail, shoulder - a dart in local space, pointing along +x
	const TIP_DART = [
		[ROUTE.tipNosePx, 0],
		[-ROUTE.tipShoulderPx, ROUTE.tipHalfPx],
		[-ROUTE.tipTailPx, 0],
		[-ROUTE.tipShoulderPx, -ROUTE.tipHalfPx],
	]
		.map(p => p.join(','))
		.join(' ')

	// how much of one subpath the flown length reaches
	const reveal = sub => clamp(flownLen.value - sub.start, 0, sub.len)

	// painted segments in order with cumulative length
	let segs = []
	let total = 1
	let span = [0, 1]
	let orbit = [0, 1]
	let vh = 0

	// Where the planet's centre sits when the tip reaches a given point — the placement PlanetStage makes.
	function planetXAt(y, w, h) {
		const cam = props.camAt(clamp(y - vh * ROUTE.tipFrac, 0, Math.max(0, h - vh)))
		return w / 2 + (cam.x / 100) * window.innerWidth
	}

	// The heading only matters when the rail would actually cross its letters.
	function clearsHeading(workHead, xS, w) {
		const headText = workHead.querySelector('.page-heading')
		if (!headText) return false
		const hs = getComputedStyle(headText)
		const size = parseFloat(hs.fontSize) || 0
		const tracking = parseFloat(hs.letterSpacing) || 0
		const chars = headText.textContent.trim().length
		const glyphHalf = (chars * (size + tracking) - tracking) / 2
		return Math.abs(xS - w / 2) > glyphHalf + ROUTE.headClearPx
	}

	// The geometry is measured, not authored: HomeJourney calls this once its camera is measured.
	function measure(track) {
		const work = track?.querySelector('#work')
		const workHead = track?.querySelector('#work .journey__station-head')
		const ztl = track?.querySelector('#work .ztl')
		const lifeSlots = [...(track?.querySelectorAll('#life .life-slot') ?? [])]
		const arrival = track?.querySelector('.journey__arrival')
		if (!track || !work || !workHead || !ztl || !lifeSlots.length || !arrival) return

		vh = window.innerHeight
		const trackRect = track.getBoundingClientRect()
		const trackTop = trackRect.top + window.scrollY
		const box = el => {
			const r = el.getBoundingClientRect()
			return {
				top: r.top + window.scrollY - trackTop,
				bottom: r.bottom + window.scrollY - trackTop,
				left: r.left,
			}
		}
		const rem =
			parseFloat(getComputedStyle(document.documentElement).fontSize) || ROUTE.remFallbackPx
		const railCenter =
			(parseFloat(getComputedStyle(ztl).getPropertyValue('--rail-center')) ||
				ROUTE.railCenterRem) * rem

		const w = track.clientWidth
		const h = track.offsetHeight
		const xMid = Math.round(w / 2)
		const ztlBox = box(ztl)
		const xS = Math.round(ztlBox.left - trackRect.left + railCenter)
		const m = ROUTE.headMarginPx

		// Where the line begins: a fixed stretch above WORK, entering on one 45 sized to the heading's room.
		const yG = Math.round(box(work).top - vh * ROUTE.startAboveVh)
		const headBox = box(workHead)
		const dock1 = Math.round(headBox.top - m)
		const runIn = Math.max(0, Math.min(Math.abs(xMid - xS), dock1 - m - yG))
		const xG = xS + runIn
		const resume1 = Math.round(headBox.bottom + m)
		const headClear = clearsHeading(workHead, xS, w)
		// LIFE reads in a wider column, so its stretch runs in the left gutter, clear of the prose.
		let xL = Math.max(
			ROUTE.laneMinPx,
			Math.round(box(lifeSlots[0]).left - trackRect.left - ROUTE.gutterPx)
		)
		// A lane change shorter than its own two corners is a wobble, not a jog, so the line stays in lane.
		if (Math.abs(xS - xL) < ROUTE.turnPx * 2) xL = xS
		const dxL = Math.abs(xS - xL)
		const yJ3 = Math.round(ztlBox.bottom + ROUTE.exitDropPx)
		const arrivalBox = box(arrival)
		const runway = arrivalBox.bottom - arrivalBox.top - vh
		orbit = [arrivalBox.top, runway]
		const yEnd = Math.round(arrivalBox.top + vh * ROUTE.endAtVh + runway * ROUTE.endRunFrac)

		// The zigzag: a flank beside each life chapter, crossing in the gap on a hexagonal jog.
		// On a phone the column spans the frame, so the far flank runs off the frame's edge instead.
		const narrow = window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
		const xR = narrow ? w - ROUTE.edgeLanePx : w - xL
		const pad = narrow ? ROUTE.crossPadNarrowPx : ROUTE.crossPadPx
		const weave = []
		let reach = yJ3 + dxL + m
		let lane = xL
		for (let k = 1; k < lifeSlots.length; k++) {
			const target = k % 2 ? xR : xL
			if (target === lane) continue
			// the slot, not the card: the card rides the reveal's translate until it has been seen once
			const slot = q => box(lifeSlots[q])
			const gapTop = Math.max(slot(k - 1).bottom + pad, reach)
			const gapBot = slot(k).top - pad
			const cham = Math.min(
				narrow ? ROUTE.crossChamferNarrowPx : ROUTE.crossChamferPx,
				Math.floor((Math.abs(target - lane) - ROUTE.crossMinRunPx) / 2)
			)
			if (cham < ROUTE.chamferMinPx || gapBot - gapTop < cham * 2) continue
			const yJog = Math.round((gapTop + gapBot) / 2)
			const jog = lane < target ? cham : -cham
			// crisp like a hexagon's vertex, just eased off the raw point
			const rc = Math.round(cham * ROUTE.jogRoundShare)
			weave.push(
				[lane, yJog - cham, rc],
				[lane + jog, yJog, rc],
				[target - jog, yJog, rc],
				[target, yJog + cham, rc]
			)
			lane = target
			reach = yJog + cham
		}
		// The dive aims at the world, not the frame, so the two arrive together by construction.
		const xAim = Math.round(
			clamp(planetXAt(yEnd, w, h), w * ROUTE.diveAimBand, w * (1 - ROUTE.diveAimBand))
		)
		const dxDive = Math.abs(xAim - lane)
		const lead = narrow ? ROUTE.endLeadNarrowVh : ROUTE.endLeadVh
		const yJ2 = Math.max(
			reach + m,
			// the near flank has no margin on a phone, so the turn waits for the last chapter to clear
			narrow ? Math.round(box(lifeSlots.at(-1)).bottom + pad) : 0,
			Math.round(arrivalBox.top - vh * lead) - dxDive
		)

		const trunk = [
			[xS, yJ3],
			[xL, yJ3 + dxL],
			...weave,
			[lane, yJ2],
			[xAim, yJ2 + dxDive],
			[xAim, yEnd],
		]
		const head =
			runIn >= 2
				? [
						[xG, yG],
						[xS, yG + runIn],
					]
				: [[xS, yG]]
		// A heading the rail would cross is no longer skirted: the stranded run read as the line breaking off.
		const start = headClear ? [xG, yG] : [xS, resume1]
		const subpaths = headClear ? [[...head, ...trunk]] : [[start, ...trunk]]

		const flown = flyCorners(subpaths)
		segs = flown.segs
		total = flown.total
		span = [start[1], yEnd]

		geo.value = {
			w,
			h,
			subs: flown.subs,
			d: flown.subs.map(sub => sub.d).join(' '),
			// The gate and the entry point carry the waypoint glyph, lit when the flown stretch reaches them.
			nodes: [start, [xAim, yEnd]],
		}
		update()
	}

	// flown fraction, tip position, heading and fade for this scroll
	function update() {
		if (!segs.length) return
		const yT = window.scrollY + vh * ROUTE.tipFrac
		const { flown, pos, on } = walkRoute(segs, total, yT)
		heading.value = +((Math.atan2(on.y2 - on.y1, on.x2 - on.x1) * 180) / Math.PI).toFixed(1)
		flownLen.value = flown
		const orbited = smoothstep(
			clamp(
				(window.scrollY - orbit[0]) / orbit[1] - ROUTE.orbitOutAt,
				0,
				ROUTE.orbitOutSpan
			) / ROUTE.orbitOutSpan
		)
		fade.value = +(1 - orbited).toFixed(3)
		tip.value = yT >= span[0] && yT <= span[1] ? [pos[0].toFixed(1), pos[1].toFixed(1)] : null
	}

	useWindowListener('scroll', useRafThrottle(update))

	defineExpose({ measure })
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.route {
		position: absolute;
		top: 0;
		left: 0;
		// The trace: over the fixed stage, under the station heads and bodies at z 1.
		z-index: 0;
		pointer-events: none;
		shape-rendering: crispEdges;
		// The lean at the station bodies' own depth: any other depth shears the line off the emblems.
		@include lean;
	}

	// Only the cursor is lifted, clear of the bodies and the flight but under the rail and chrome.
	// WORK's body is lifted over it in turn (HomeJourney), so the dart threads behind that timeline's
	// emblems and year ticks instead of across them.
	.route--cursor {
		z-index: 3;
	}

	// Scoped to the visible group: a bare `.route path` would match the mask paths and outrank their dashes.
	.route__flown path {
		fill: none;
		// the WORK spine's own cadence, so docking into it reads as one line
		stroke-dasharray: 6 6;
	}

	.route__flown .route__ink {
		stroke-width: 2px;
		stroke: rgba($yellow, 0.8);
	}

	// A dark casing under the gold: a bare 2px line at half alpha disappears into the planet's lit limb.
	.route__flown .route__casing {
		// one pixel of halo each side and lighter than the gold, or it reads as black with a gold core
		stroke-width: 4px;
		stroke: rgba($black, 0.6);
		stroke-dasharray: 8 4;
		stroke-dashoffset: -1;
	}

	.route__flown .route__node {
		fill: rgba($yellow, 0.9);
	}

	// Mask ink: a wide stroke of the same path, drawn to the flown length by dash arithmetic.
	.route__draw {
		fill: none;
		stroke: #fff;
		stroke-width: 12px;
	}

	// You are here: reserved gold at full strength, with the one self-running motion on the line, stepped.
	.route__tip {
		fill: $yellow;
		filter: drop-shadow(0 0 4px rgba($yellow, 0.6));
		animation: route-tip 1.1s steps(2, end) infinite;
	}

	@keyframes route-tip {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.55;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.route__tip {
			animation: none;
		}
	}
</style>
