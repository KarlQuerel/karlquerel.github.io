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
					:stroke-dasharray="`${reveal(sub).toFixed(1)} ${(sub.len + 10).toFixed(1)}`"
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
	import { computed, onActivated, onBeforeUnmount, onMounted, ref } from 'vue'
	import { JOURNEY, ROUTE } from '@/constants/journey'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { smoothstep } from '@/js/math'

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
	const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

	// painted segments in order with cumulative length; a tip inside a gap parks at the previous end
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

	// The geometry is measured, not authored, and rebuilt on reshape.
	function measure() {
		const track = document.querySelector('.journey')
		const work = track?.querySelector('#work')
		const workHead = track?.querySelector('#work .journey__station-head')
		const ztl = track?.querySelector('#work .ztl')
		const lifeSlot = track?.querySelector('#life .life-slot')
		const arrival = track?.querySelector('.journey__arrival')
		if (!track || !work || !workHead || !ztl || !lifeSlot || !arrival) return

		vh = window.innerHeight
		const trackTop = track.getBoundingClientRect().top + window.scrollY
		const box = el => {
			const r = el.getBoundingClientRect()
			return {
				top: r.top + window.scrollY - trackTop,
				bottom: r.bottom + window.scrollY - trackTop,
				left: r.left,
			}
		}
		const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
		const railCenter =
			(parseFloat(getComputedStyle(ztl).getPropertyValue('--rail-center')) || 2) * rem

		const w = track.clientWidth
		const h = track.offsetHeight
		const xMid = Math.round(w / 2)
		const ztlBox = box(ztl)
		const xS = Math.round(ztlBox.left - track.getBoundingClientRect().left + railCenter)
		const m = ROUTE.headMarginPx

		// Where the line begins: a fixed stretch above WORK, entering on one 45 sized to the heading's room.
		const yG = Math.round(box(work).top - vh * ROUTE.startAboveVh)
		const headBox = box(workHead)
		const dock1 = Math.round(headBox.top - m)
		const runIn = Math.max(0, Math.min(Math.abs(xMid - xS), dock1 - m - yG))
		const xG = xS + runIn
		const resume1 = Math.round(headBox.bottom + m)
		// The heading only matters when the rail would actually cross its letters.
		const headText = workHead.querySelector('.page-heading')
		let headClear = false
		if (headText) {
			const hs = getComputedStyle(headText)
			const size = parseFloat(hs.fontSize) || 0
			const tracking = parseFloat(hs.letterSpacing) || 0
			const chars = headText.textContent.trim().length
			const glyphHalf = (chars * (size + tracking) - tracking) / 2
			headClear = Math.abs(xS - w / 2) > glyphHalf + 24
		}
		// LIFE reads in a wider column, so its stretch runs in the left gutter, clear of the prose.
		const lifeSlots = [...track.querySelectorAll('#life .life-slot')]
		let xL = Math.max(
			20,
			Math.round(box(lifeSlot).left - track.getBoundingClientRect().left - ROUTE.gutterPx)
		)
		// A lane change shorter than its own two corners is a wobble, not a jog, so the line stays in lane.
		if (Math.abs(xS - xL) < ROUTE.turnPx * 2) xL = xS
		const dxL = Math.abs(xS - xL)
		const yJ3 = Math.round(ztlBox.bottom + 60)
		const arrivalBox = box(arrival)
		const runway = arrivalBox.bottom - arrivalBox.top - vh
		orbit = [arrivalBox.top, runway]
		const yEnd = Math.round(arrivalBox.top + vh * 0.5 + runway * ROUTE.endRunFrac)

		// The zigzag: a flank beside each life chapter, crossing in the gap on a hexagonal jog.
		const xR = w - xL
		const pad = ROUTE.crossPadPx
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
				ROUTE.crossChamferPx,
				Math.floor((Math.abs(target - lane) - ROUTE.crossMinRunPx) / 2)
			)
			if (cham < 24 || gapBot - gapTop < cham * 2) continue
			const yJog = Math.round((gapTop + gapBot) / 2)
			const jog = lane < target ? cham : -cham
			// crisp like a hexagon's vertex, just eased off the raw point
			const rc = Math.round(cham / 4)
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
		const yJ2 = Math.max(reach + m, Math.round(arrivalBox.top - vh * ROUTE.endLeadVh) - dxDive)

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
		const subpaths = headClear ? [[...head, ...trunk]] : [[[xS, resume1], ...trunk]]

		segs = []
		total = 0
		const subs = []
		// Corners are flown: each interior vertex becomes a small arc entered turnPx short of the corner.
		const quadAt = (a, c, b, t) => {
			const u = 1 - t
			return [
				u * u * a[0] + 2 * u * t * c[0] + t * t * b[0],
				u * u * a[1] + 2 * u * t * c[1] + t * t * b[1],
			]
		}
		const pushSeg = (x1, y1, x2, y2, len) => {
			if (len < 0.5) return
			segs.push({ x1, y1, x2, y2, len, cum: total, ya: y1, yb: y2 })
			total += len
		}
		for (const pts of subpaths) {
			const start = total
			let d = `M${pts[0][0]} ${pts[0][1]}`
			let cur = pts[0]
			for (let i = 1; i < pts.length; i++) {
				const corner = pts[i]
				const inLen = Math.hypot(corner[0] - cur[0], corner[1] - cur[1])
				const next = i < pts.length - 1 ? pts[i + 1] : null
				const outLen = next ? Math.hypot(next[0] - corner[0], next[1] - corner[1]) : 0
				// a vertex may carry its own radius; the crossings ask for a wider one
				const turn = corner[2] ?? ROUTE.turnPx
				const t = next ? Math.min(turn, inLen * 0.45, outLen * 0.45) : 0
				if (!next || t < 2) {
					d += ` L${corner[0]} ${corner[1]}`
					pushSeg(cur[0], cur[1], corner[0], corner[1], inLen)
					cur = corner
					continue
				}
				const ax = corner[0] - ((corner[0] - cur[0]) / inLen) * t
				const ay = corner[1] - ((corner[1] - cur[1]) / inLen) * t
				const bx = corner[0] + ((next[0] - corner[0]) / outLen) * t
				const by = corner[1] + ((next[1] - corner[1]) / outLen) * t
				d += ` L${ax} ${ay} Q${corner[0]} ${corner[1]} ${bx} ${by}`
				pushSeg(cur[0], cur[1], ax, ay, Math.hypot(ax - cur[0], ay - cur[1]))
				// steps in proportion to the arc: a tight corner is still one chord
				const steps = clamp(Math.round(t / 6), 1, ROUTE.curveSteps)
				let prev = [ax, ay]
				for (let k = 1; k <= steps; k++) {
					const q = quadAt([ax, ay], corner, [bx, by], k / steps)
					pushSeg(
						prev[0],
						prev[1],
						q[0],
						q[1],
						Math.hypot(q[0] - prev[0], q[1] - prev[1])
					)
					prev = q
				}
				cur = [bx, by]
			}
			subs.push({ d, start, len: total - start })
		}
		// The tip crosses a turn at constant path speed: a turn group's y-extent is dealt out by arc length.
		let gi = 0
		while (gi < segs.length) {
			if (segs[gi].y2 - segs[gi].y1 >= segs[gi].len * 0.92) {
				gi++
				continue
			}
			let gj = gi
			let dy = 0
			let len = 0
			while (gj < segs.length && segs[gj].y2 - segs[gj].y1 < segs[gj].len * 0.92) {
				dy += segs[gj].y2 - segs[gj].y1
				len += segs[gj].len
				gj++
			}
			let y = segs[gi].y1
			for (let k = gi; k < gj; k++) {
				segs[k].ya = y
				y += (dy * segs[k].len) / len
				segs[k].yb = y
			}
			gi = gj
		}
		span = [headClear ? yG : resume1, yEnd]

		geo.value = {
			w,
			h,
			subs,
			d: subs.map(sub => sub.d).join(' '),
			// The gate and the entry point carry the waypoint glyph, lit when the flown stretch reaches them.
			nodes: headClear
				? [
						[xG, yG],
						[xAim, yEnd],
					]
				: [
						[xS, resume1],
						[xAim, yEnd],
					],
		}
		update()
	}

	// flown fraction, tip position and heading for this scroll — a walk over segments monotone in y
	function update() {
		if (!segs.length) return
		const yT = window.scrollY + vh * ROUTE.tipFrac
		let fr = total
		let pos = [segs.at(-1).x2, segs.at(-1).y2]
		// the segment under the tip, or the last it cleared, so a parked dart keeps its docked heading
		let on = segs.at(-1)
		for (const s of segs) {
			if (yT >= s.yb) {
				pos = [s.x2, s.y2]
				on = s
				continue
			}
			if (yT <= s.ya) {
				fr = s.cum
				break
			}
			const t = (yT - s.ya) / (s.yb - s.ya)
			fr = s.cum + t * s.len
			pos = [s.x1 + (s.x2 - s.x1) * t, s.y1 + (s.y2 - s.y1) * t]
			on = s
			break
		}
		heading.value = +((Math.atan2(on.y2 - on.y1, on.x2 - on.x1) * 180) / Math.PI).toFixed(1)
		if (yT >= segs.at(-1).yb) fr = total
		flownLen.value = fr
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

	const onScroll = useRafThrottle(update)
	const onResize = useRafThrottle(measure)
	let watcher = null

	onMounted(() => {
		measure()
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', onResize, { passive: true })
		// content shifting under us (fonts, images, reveals) re-cuts the line
		if (typeof ResizeObserver !== 'undefined') {
			watcher = new ResizeObserver(onResize)
			const track = document.querySelector('.journey')
			if (track) watcher.observe(track)
		}
	})

	// the page is kept alive across navigation; coming back, the layout may differ
	onActivated(measure)

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', onScroll)
		window.removeEventListener('resize', onResize)
		watcher?.disconnect()
	})
</script>

<style scoped lang="scss">
	.route {
		position: absolute;
		top: 0;
		left: 0;
		// The trace: over the fixed stage, under the station bodies at z 1 and the headings at z -1.
		z-index: 0;
		pointer-events: none;
		shape-rendering: crispEdges;
		// The lean at the station bodies' own depth: any other depth shears the line off the emblems.
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
	}

	// Only the cursor is lifted, clear of the bodies and the flight but under the rail and chrome.
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
