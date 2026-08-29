<template>
	<!-- The route: the journey's own line, drawn in the page rather than the chrome.
	     It runs in above the WORK station, threads the timeline as its spine, zigzags
	     the whole frame between the LIFE chapters, and dives for the arrival. Only
	     the flown stretch is drawn; the tip diamond is the camera, mid-viewport. -->
	<svg
		v-if="geo"
		class="route"
		:width="geo.w"
		:height="geo.h"
		:viewBox="`0 0 ${geo.w} ${geo.h}`"
		:style="{ opacity: fade, '--depth': JOURNEY.parallax.body }"
		aria-hidden="true"
	>
		<defs>
			<!-- The flown stretch, revealed by dash arithmetic in real units. One mask
			     path per subpath: Chromium restarts the dash phase at every moveto, so
			     a single offset cannot reveal a path with gaps in it. -->
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
		<polygon
			v-if="tip"
			class="route__tip"
			:points="TIP_DART"
			:transform="`translate(${tip[0]} ${tip[1]}) rotate(${heading})`"
		/>
	</svg>
</template>

<script setup>
	import { onActivated, onBeforeUnmount, onMounted, ref } from 'vue'
	import { JOURNEY, ROUTE } from '@/constants/journey'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { smoothstep } from '@/js/math'

	const props = defineProps({
		// The camera sampled at an arbitrary scroll (HomeJourney owns the track). The
		// route aims its dive at where the planet will be when the tip arrives, which
		// is not the scroll being drawn - so a value would not do, it needs the curve.
		camAt: { type: Function, required: true },
	})

	const geo = ref(null)
	const flownLen = ref(0)
	const tip = ref(null)
	// which way the tip is pointing, in degrees - the tangent of the path under it
	const heading = ref(90)
	// the line leaves as the orbit begins: once the planet owns the frame, the
	// chart has done its job
	const fade = ref(1)

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

	// painted segments in order, with cumulative length; gaps carry no length, so a
	// tip inside one parks at the previous segment's end - the dock diamond
	let segs = []
	let total = 1
	let span = [0, 1]
	let orbit = [0, 1]
	let vh = 0

	// Where the planet's centre sits across the frame at the moment the tip reaches a
	// given point on the page - the same placement PlanetStage makes, an offset from
	// the frame's middle in vw. The camera is sampled at the scroll that puts the tip
	// on `y`, not at the scroll being drawn: the dive has to aim where the world will
	// be, not where it is.
	function planetXAt(y, w, h) {
		const cam = props.camAt(clamp(y - vh * ROUTE.tipFrac, 0, Math.max(0, h - vh)))
		return w / 2 + (cam.x / 100) * window.innerWidth
	}

	// The geometry is measured, not authored: x follows the timeline's own rail, y
	// follows the real section layout, and everything is rebuilt on reshape.
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

		// Where the line begins: a fixed stretch above the WORK station, entering on
		// one 45-degree run-in sized to whatever room the heading leaves it.
		const yG = Math.round(box(work).top - vh * ROUTE.startAboveVh)
		const headBox = box(workHead)
		const dock1 = Math.round(headBox.top - m)
		const runIn = Math.max(0, Math.min(Math.abs(xMid - xS), dock1 - m - yG))
		const xG = xS + runIn
		const resume1 = Math.round(headBox.bottom + m)
		// The heading only needs skirting when the rail would actually cross its
		// letters. The face is monospaced, so the widest the glyphs can reach is
		// exact arithmetic - and a heading wrapped to two lines only overestimates,
		// which errs toward keeping the skirt. Clear of the letters, the line runs
		// straight through and the timeline reads whole.
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
		// LIFE reads in a wider column than WORK, so its stretch runs in the left
		// gutter, clear of the prose - the trace jogs out after the timeline and
		// jogs back for the dive. Headings only ever meet it across empty padding.
		const lifeSlots = [...track.querySelectorAll('#life .life-slot')]
		const xL = Math.max(
			20,
			Math.round(box(lifeSlot).left - track.getBoundingClientRect().left - ROUTE.gutterPx)
		)
		const dxL = Math.abs(xS - xL)
		const yJ3 = Math.round(ztlBox.bottom + 60)
		const arrivalBox = box(arrival)
		const runway = arrivalBox.bottom - arrivalBox.top - vh
		orbit = [arrivalBox.top, runway]
		const yEnd = Math.round(arrivalBox.top + vh * 0.5 + runway * ROUTE.endRunFrac)

		// The zigzag: a flank beside each life chapter - left of the cards, then right
		// of them, alternating - crossing the whole frame in the whitespace between
		// chapters. A screen-wide 45 cannot fit that whitespace, so each crossing is
		// elbow / horizontal run / elbow, centred on the slot boundary and pushed off
		// the real card boxes; a crossing that cannot clear both cards is skipped and
		// the flank simply continues.
		// The four vertices carry their own turn radius: 45s and orthogonals are the
		// pixel vocabulary and the shape is deliberate, but on legs this long the
		// route's usual 36px corner reads as a hard edge. A crossing was briefly one
		// flown S instead - smoother, and wrong: it read as a vector swoosh with
		// nothing 8-bit left in it.
		const xR = w - xL
		const elbow = ROUTE.crossElbowPx
		const pad = ROUTE.crossPadPx
		const weave = []
		let reach = yJ3 + dxL + m
		let lane = xL
		for (let k = 1; k < lifeSlots.length; k++) {
			const target = k % 2 ? xR : xL
			if (target === lane) continue
			const card = q => box(lifeSlots[q].firstElementChild ?? lifeSlots[q])
			const gapTop = Math.max(card(k - 1).bottom + pad, reach)
			const gapBot = card(k).top - pad
			// take the whitespace that exists: a taller crossing is a slower one
			const elbowK = Math.min(elbow, Math.floor((gapBot - gapTop) / 2))
			if (elbowK < 40) continue
			const yH = Math.round(
				Math.min(Math.max(box(lifeSlots[k]).top, gapTop + elbowK), gapBot - elbowK)
			)
			const step = lane < target ? elbowK : -elbowK
			const r = ROUTE.crossTurnPx
			weave.push(
				[lane, yH - elbowK, r],
				[lane + step, yH, r],
				[target - step, yH, r],
				[target, yH + elbowK, r]
			)
			lane = target
			reach = yH + elbowK
		}
		// The dive aims at the world, not at the frame: the last leg is steered onto
		// where the planet's centre will be when the tip lands, so the two arrive
		// together by construction rather than by coincidence.
		// On the camera as tuned today that is the frame's middle and nothing moves -
		// every arrival keyframe holds x at 0 (see CAMERA.approach / .entry / .gone) -
		// so this reads the same number the hardcoded centre did. It is here so the
		// line still lands on the planet the day a keyframe brings it in off-axis.
		// Same reason it is safe that a first measure can run before HomeJourney has
		// built its track: the resting camera is centred too, and the observer on the
		// track re-cuts the line as soon as there is one.
		// Clamped well inside the frame - a dive that leaves the page is worse than
		// one that is a little off.
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
		const subpaths = headClear
			? [[...head, ...trunk]]
			: [
					[...head, [xS, dock1]],
					[[xS, resume1], ...trunk],
				]

		segs = []
		total = 0
		const subs = []
		// Corners are flown, not cornered: every interior vertex becomes a small arc
		// (a quadratic with the vertex as its control), entered turnPx short of the
		// corner - or the vertex's own radius, where it carries one - and clamped so
		// short legs stay sane. The arc is walked in steps rather than chorded, so the
		// reveal masks ride the distances the browser really dashes and the tip's
		// heading turns through the corner instead of holding one averaged angle.
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
		// The tip crosses a turn at constant path speed. Scroll maps 1:1 to y on the
		// straight verticals, but through a turn group - diagonals, arcs, and the
		// horizontal run between them - the group's real y-extent is dealt out by
		// arc length instead, so a screen-wide run costs the scroll it deserves
		// rather than teleporting past in the horizontal's zero height.
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
		span = [yG, yEnd]

		geo.value = {
			w,
			h,
			subs,
			d: subs.map(sub => sub.d).join(' '),
			// The gate and the entry point carry the waypoint glyph, lit when the flown
			// stretch reaches them; a skirted heading gets its two line-ends capped
			// too. Nothing else: a diamond floating mid-line reads as a second cursor.
			nodes: headClear
				? [
						[xG, yG],
						[xAim, yEnd],
					]
				: [
						[xG, yG],
						[xS, dock1],
						[xS, resume1],
						[xAim, yEnd],
					],
		}
		update()
	}

	// flown fraction, tip position and tip heading for the current scroll - a walk
	// over a handful of segments, all monotone in y
	function update() {
		if (!segs.length) return
		const yT = window.scrollY + vh * ROUTE.tipFrac
		let fr = total
		let pos = [segs.at(-1).x2, segs.at(-1).y2]
		// the segment under the tip, or the last one it cleared: parked in a gap, the
		// dart keeps the heading it docked on rather than snapping to a default
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
		// over the fixed stage (later in the DOM), under the station bodies at z 1
		// and the landscape headings at z -1... which sit below the stage anyway
		z-index: 0;
		pointer-events: none;
		shape-rendering: crispEdges;
		// The cursor's lean, on the shared --mx/--my contract - at the station
		// bodies' own depth, not a flavour of its own: the line threads the
		// timeline's emblems, and any other depth shears it off them the moment
		// the pointer moves.
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
	}

	// The pattern rules stay scoped to the visible group: a bare `.route path` would
	// also match the mask paths, and CSS outranks the dash attributes their reveal
	// arithmetic lives in - the first version of this line lit end to end for
	// exactly that reason.
	// Only the stretch already flown exists - there is no preview of the route
	// ahead, and the track is one flat gold from the gate to the tip.
	.route__flown path {
		fill: none;
		// the WORK spine's own cadence, so docking into it reads as one line
		stroke-dasharray: 6 6;
	}

	.route__flown .route__ink {
		stroke-width: 2px;
		stroke: rgba($yellow, 0.8);
	}

	// A dark casing under the gold, the trick every chart drawn over terrain uses:
	// the planet is the brightest thing on the page, and a bare 2px line at half
	// alpha simply disappears into its lit limb. On the gold's own 12px period but
	// a step longer at each end, so every dash carries its own outline and the line
	// still reads as dashed rather than as a solid dark trace with gold on top.
	// Both rules need the group in the selector: `.route__flown path` above would
	// otherwise outrank a bare class and take the dash pattern back.
	.route__flown .route__casing {
		// exactly one pixel of halo each side of the gold, and lighter than it: a
		// casing that outweighs its line stops reading as gold-over-terrain and
		// starts reading as a black line with a gold core
		stroke-width: 4px;
		stroke: rgba($black, 0.6);
		stroke-dasharray: 8 4;
		stroke-dashoffset: -1;
	}

	.route__flown .route__node {
		fill: rgba($yellow, 0.9);
	}

	// Mask ink: a wide solid stroke of the same path, drawn to the flown length by
	// dash arithmetic in real user units, set as attributes in the template. No dash
	// property may appear here: CSS would override those attributes.
	.route__draw {
		fill: none;
		stroke: #fff;
		stroke-width: 12px;
	}

	// You are here. The reserved gold at full strength - the current milestone - with
	// the one self-running motion on the line, stepped as the house rules ask. A dart
	// rather than a diamond: it is turned onto the path's own tangent every frame, and
	// a square would show nothing for it - four-fold symmetry hides every quarter turn.
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
