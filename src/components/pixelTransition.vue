<template>
	<div class="pixel-transition-page">
		<header class="test-page-header">
			<img
				:key="headerGifCycleKey"
				class="test-page-header-gif"
				:style="headerGifStyle"
				:src="activeHeaderGif"
				alt="Yako animation walking across the screen"
				@animationend="onHeaderGifAnimationEnd"
			/>
		</header>
		<nav class="test-page-navbar" aria-label="Test page navigation">
			<div class="test-page-navbar-links">
				<router-link to="/" class="test-page-nav-link">Home</router-link>
				<router-link to="/game" class="test-page-nav-link">Game</router-link>
				<router-link to="/under_construction" class="test-page-nav-link">Coming Soon</router-link>
				<a class="test-page-nav-link" href="mailto:karlquerel@gmail.com">Email</a>
				<a
					class="test-page-nav-link"
					href="https://github.com/KarlQuerel"
					target="_blank"
					rel="noopener noreferrer"
					>GitHub</a
				>
				<a
					class="test-page-nav-link"
					href="https://www.linkedin.com/in/karlquerel"
					target="_blank"
					rel="noopener noreferrer"
					>LinkedIn</a
				>
			</div>
		</nav>

		<section
			ref="pinWrapperRef"
			class="pin-wrapper"
			:style="{ height: `${pinWrapperHeightVh}vh` }"
			aria-label="Pixel reveal demo"
		>
			<div class="pin-inner">
				<div class="stage-layout">
					<div class="copy-block copy-block-left">
						<p class="about-heading">ABOUT<br />ME</p>
					</div>

					<div class="art-stage">
						<div ref="stageRef" class="art-stage-canvas-wrap">
							<canvas ref="canvasRef" class="reveal-canvas" />
						</div>
					</div>

					<div class="copy-block copy-block-right">
						<div
							class="pixel-caption-wrap"
							:class="{ 'pixel-caption-wrap--locked': captionDecodeProgress < 0.999 }"
							aria-hidden="true"
						>
							<p class="pixel-caption">{{ liveCaption }}</p>
						</div>
					</div>
				</div>

				<div class="progress-rail" aria-hidden="true">
					<div class="progress-bar" :style="{ transform: `scaleX(${scrollProgress})` }" />
				</div>
			</div>
		</section>

		<section class="outro">
			<p>Scroll back up to reverse the transition.</p>
			<router-link to="/" class="back-link nes-btn is-primary">Home</router-link>
		</section>

		<template v-for="(src, index) in IMAGE_CHAIN" :key="`pixel-chain-${index}`">
			<img
				v-if="src"
				class="sr-only-preload"
				alt=""
				:src="src"
				:ref="el => setImageSlotRef(index, el)"
				@load="onImgSlotLoadOrError"
				@error="onImgSlotLoadOrError"
			/>
		</template>
	</div>
</template>

<script setup>
	import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

	const STAGE_CLEAR_COLOR = '#000000'

	const BLOCK_SIZE_CSS = 16
	const MAX_DEVICE_PIXEL_RATIO = BLOCK_SIZE_CSS <= 1 ? 1 : 2
	const STAGE_IMAGE_SCALE = 0.72
	const STAGE_PADDING_RATIO = 0.14
	const SHRED_VERTICAL_BIAS = 0.42
	const HEADER_GIF_SEQUENCE = [
		{ src: '/assets/img/yako-running.gif', direction: 'ltr' },
		{ src: '/assets/img/yako-walking.gif', direction: 'rtl' },
	]
	const RUNNING_TO_WALKING_PAUSE_MS = 1200
	const WALKING_TO_RUNNING_PAUSE_MS = 1200
	const RUNNING_SPEED_PX_PER_SEC = 196
	const WALKING_SPEED_PX_PER_SEC = 156

	const IMAGE_CHAIN = ['/assets/test/1.png', '/assets/test/2.png', '/assets/test/3.png', '', '']

	const IMAGE_CAPTIONS = [
		'First frame: quiet signal before the dissolve begins.',
		'Second frame: texture stacks and the grid wakes up.',
		'Third frame: color finds its footing in the noise.',
		'',
		'',
	]

	const SCRAMBLE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789#%&*+=?/@'

	const ACTIVE_IMAGE_INDICES = IMAGE_CHAIN.map((src, i) => (src ? i : -1)).filter(i => i >= 0)
	const EXPECTED_IMAGE_LOADS = ACTIVE_IMAGE_INDICES.length
	const PIN_WRAPPER_BASE_VH = 280
	const PIN_WRAPPER_PER_TRANSITION_VH = 240
	const pinWrapperHeightVh =
		PIN_WRAPPER_BASE_VH + Math.max(0, EXPECTED_IMAGE_LOADS - 1) * PIN_WRAPPER_PER_TRANSITION_VH

	const pinWrapperRef = ref(null)
	const stageRef = ref(null)
	const canvasRef = ref(null)
	const scrollProgress = ref(0)
	const imagesReady = ref(false)
	const liveCaption = ref('')
	const captionDecodeProgress = ref(0)
	const activeHeaderGif = ref(HEADER_GIF_SEQUENCE[0].src)
	const activeHeaderGifDirection = ref(HEADER_GIF_SEQUENCE[0].direction)
	const activeHeaderGifDurationMs = ref(11000)
	const headerGifCycleKey = ref(0)
	const viewportWidthPx = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)
	const headerGifStyle = computed(() => {
		const isRightToLeft = activeHeaderGifDirection.value === 'rtl'
		const isWalkingGif = activeHeaderGif.value.includes('walking')
		return {
			'--header-gif-duration': `${activeHeaderGifDurationMs.value}ms`,
			'--header-gif-from': isRightToLeft ? 'calc(50vw + 260%)' : 'calc(-50vw - 260%)',
			'--header-gif-to': isRightToLeft ? 'calc(-50vw - 260%)' : 'calc(50vw + 260%)',
			'--header-gif-flip': isRightToLeft ? '-1' : '1',
			'--header-gif-size-scale': isWalkingGif ? '0.84' : '1',
			'--header-gif-y-offset': isWalkingGif ? '-15px' : '0px',
		}
	})

	const imageSlotRefs = []
	function setImageSlotRef(index, el) {
		imageSlotRefs[index] = el ?? null
	}

	function createCanvas(w, h) {
		const canvas = document.createElement('canvas')
		canvas.width = w
		canvas.height = h
		return canvas
	}

	let imageSlotLoadsReported = 0

	function onImgSlotLoadOrError() {
		imageSlotLoadsReported += 1
		if (imageSlotLoadsReported >= EXPECTED_IMAGE_LOADS) imagesReady.value = true
	}

	function createSeededRng(seedBase) {
		let seed = (seedBase * 2654435761) >>> 0
		return () => {
			seed = (seed * 1664525 + 1013904223) >>> 0
			return seed / 4294967296
		}
	}

	function buildScrambledCaption(text, legibility01, seedBase) {
		if (!text) return ''
		const leg = Math.min(1, Math.max(0, legibility01))
		const next = createSeededRng(seedBase)
		let out = ''
		const poolLen = SCRAMBLE_ALPHABET.length
		for (let i = 0; i < text.length; i += 1) {
			const ch = text[i]
			if (/\s/.test(ch)) {
				out += ch
				continue
			}
			const revealThreshold = next()
			const pick = next()
			if (leg >= revealThreshold) {
				out += ch
			} else {
				out += SCRAMBLE_ALPHABET[Math.floor(pick * poolLen) % poolLen] ?? '?'
			}
		}
		return out
	}

	function updateLiveCaption() {
		if (!imagesReady.value || EXPECTED_IMAGE_LOADS === 0) {
			liveCaption.value = ''
			captionDecodeProgress.value = 0
			return
		}
		if (EXPECTED_IMAGE_LOADS < 2) {
			const idx = ACTIVE_IMAGE_INDICES[0]
			liveCaption.value = idx !== undefined ? (IMAGE_CAPTIONS[idx] ?? '') : ''
			captionDecodeProgress.value = 1
			return
		}
		if (totalBlocks <= 0) {
			liveCaption.value = ''
			captionDecodeProgress.value = 0
			return
		}

		const progress01 = scrollProgress.value
		const n = ACTIVE_IMAGE_INDICES.length
		const u = Math.min(1, Math.max(0, progress01)) * (n - 1)

		let fromPos
		let toIdx
		let revealCount
		if (u < 1e-6) {
			fromPos = 0
			toIdx = ACTIVE_IMAGE_INDICES[1]
			revealCount = 0
		} else {
			fromPos = Math.min(Math.floor(u), n - 2)
			const localT = u - fromPos
			toIdx = ACTIVE_IMAGE_INDICES[fromPos + 1]
			revealCount = Math.min(totalBlocks, Math.floor(localT * totalBlocks + 1e-9))
		}

		const raw = toIdx !== undefined ? (IMAGE_CAPTIONS[toIdx] ?? '') : ''
		if (!raw) {
			liveCaption.value = ''
			captionDecodeProgress.value = 0
			return
		}

		const legibility = revealCount / totalBlocks
		captionDecodeProgress.value = legibility
		const seedBase = fromPos * 50261 + (toIdx ?? 0) * 30011 + raw.length * 1301
		liveCaption.value = buildScrambledCaption(raw, legibility, seedBase)
	}

	function buildShredRevealOrder(eligibleBlockIndices, cols, blockSize, canvasHeight) {
		if (eligibleBlockIndices.length === 0) return []
		const next = createSeededRng(eligibleBlockIndices.length + cols * 7919 + canvasHeight * 193)
		const band = Math.max(1, canvasHeight)
		const entries = eligibleBlockIndices.map((gridIndex, order) => {
			const row = Math.floor(gridIndex / cols)
			const y = row * blockSize
			const midY = y + blockSize * 0.5
			const depth = midY / band
			const noise = next()
			const sortKey = noise * (1 - SHRED_VERTICAL_BIAS) - depth * SHRED_VERTICAL_BIAS
			const tie = next()
			return { gridIndex, sortKey, tie, order }
		})
		entries.sort((a, b) => {
			if (a.sortKey !== b.sortKey) return a.sortKey - b.sortKey
			if (a.tie !== b.tie) return a.tie - b.tie
			return a.order - b.order
		})
		return entries.map(e => e.gridIndex)
	}

	let width = 0
	let height = 0
	let blockSize = 1
	let cols = 0
	let rows = 0
	let totalBlocks = 0
	let blockOrder = []
	let lastRevealCount = 0
	let lastFromPos = -1
	let rafScroll = 0
	let rafResize = 0
	let resizeObserver = null
	let bufferA = null
	let bufferB = null
	/** @type {(HTMLCanvasElement | null)[]} */
	let chainBuffers = []
	let savedHistoryScrollRestoration = 'auto'
	let headerGifSequenceIndex = 0
	let headerGifPauseTimeout = 0

	const PIN_SCROLL_LEAD_PX = 8

	function getScrollProgress() {
		const wrapper = pinWrapperRef.value
		if (!wrapper) return 0
		const rect = wrapper.getBoundingClientRect()
		const range = wrapper.offsetHeight - window.innerHeight
		if (range <= 1) return 0
		if (rect.top > 1) return 0
		const scrolled = -rect.top
		const freezePx = Math.min(
			Math.max(
				PIN_SCROLL_LEAD_PX,
				Math.min(Math.floor(range * 0.14), Math.floor(window.innerHeight * 1.75))
			),
			range - 2
		)
		if (scrolled <= freezePx) return 0
		const usable = Math.max(range - freezePx, 1)
		const progress = (scrolled - freezePx) / usable
		return Math.min(1, Math.max(0, progress))
	}

	function refreshScrollAndCaption() {
		scrollProgress.value = getScrollProgress()
		updateLiveCaption()
	}

	function resolveScrollTransition(progress01) {
		const n = ACTIVE_IMAGE_INDICES.length
		if (n < 2 || totalBlocks <= 0) return null
		const u = Math.min(1, Math.max(0, progress01)) * (n - 1)
		if (u < 1e-6) {
			return {
				fromPos: 0,
				fromIdx: ACTIVE_IMAGE_INDICES[0],
				toIdx: ACTIVE_IMAGE_INDICES[1],
				revealCount: 0,
			}
		}
		const fromPos = Math.min(Math.floor(u), n - 2)
		const localT = u - fromPos
		const fromIdx = ACTIVE_IMAGE_INDICES[fromPos]
		const toIdx = ACTIVE_IMAGE_INDICES[fromPos + 1]
		return {
			fromPos,
			fromIdx,
			toIdx,
			revealCount: Math.min(totalBlocks, Math.floor(localT * totalBlocks + 1e-9)),
		}
	}

	function renderImageBuffer(img) {
		const buffer = createCanvas(width, height)
		const ctx = buffer.getContext('2d')
		if (!ctx) return buffer
		ctx.imageSmoothingEnabled = false
		ctx.fillStyle = STAGE_CLEAR_COLOR
		ctx.fillRect(0, 0, width, height)

		const imageWidth = width * STAGE_IMAGE_SCALE
		const imageHeight = height * STAGE_IMAGE_SCALE
		const innerWidth = imageWidth * (1 - STAGE_PADDING_RATIO)
		const innerHeight = imageHeight * (1 - STAGE_PADDING_RATIO)
		const ratio = Math.min(
			innerWidth / (img.naturalWidth || img.width || 1),
			innerHeight / (img.naturalHeight || img.height || 1)
		)
		const drawWidth = (img.naturalWidth || img.width || 1) * ratio
		const drawHeight = (img.naturalHeight || img.height || 1) * ratio
		const dx = (width - drawWidth) / 2
		const dy = (height - drawHeight) / 2
		ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
		return buffer
	}

	function drawGridBlock(ctx, sourceCanvas, gridIndex) {
		ctx.imageSmoothingEnabled = false
		const x = (gridIndex % cols) * blockSize
		const y = Math.floor(gridIndex / cols) * blockSize
		if (x + blockSize > width || y + blockSize > height) return
		ctx.drawImage(sourceCanvas, x, y, blockSize, blockSize, x, y, blockSize, blockSize)
	}

	function paintEntireBufferAsTileGrid(ctx, sourceCanvas) {
		if (!sourceCanvas) return
		ctx.imageSmoothingEnabled = false
		for (let gridIndex = 0; gridIndex < cols * rows; gridIndex += 1) {
			const x = (gridIndex % cols) * blockSize
			const y = Math.floor(gridIndex / cols) * blockSize
			if (x + blockSize > width || y + blockSize > height) continue
			drawGridBlock(ctx, sourceCanvas, gridIndex)
		}
	}

	function drawStaticFringes(ctx) {
		if (!bufferA) return
		ctx.imageSmoothingEnabled = false
		const coreW = cols * blockSize
		const coreH = rows * blockSize
		if (coreW < width) {
			ctx.drawImage(bufferA, coreW, 0, width - coreW, height, coreW, 0, width - coreW, height)
		}
		if (coreH < height) {
			ctx.drawImage(bufferA, 0, coreH, coreW, height - coreH, 0, coreH, coreW, height - coreH)
		}
	}

	function applyRevealDelta(ctx, oldCount, newCount) {
		if (!bufferA || !bufferB) return
		ctx.imageSmoothingEnabled = false
		if (newCount > oldCount) {
			for (let i = oldCount; i < newCount; i += 1) drawGridBlock(ctx, bufferB, blockOrder[i])
			return
		}
		for (let i = oldCount - 1; i >= newCount; i -= 1) drawGridBlock(ctx, bufferA, blockOrder[i])
	}

	function layoutCanvas() {
		const canvas = canvasRef.value
		const stageWrap = stageRef.value
		if (!canvas || !stageWrap) return false

		const rect = stageWrap.getBoundingClientRect()
		const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)
		width = Math.max(1, Math.floor(rect.width * dpr))
		height = Math.max(1, Math.floor(rect.height * dpr))
		blockSize = Math.max(1, Math.round(BLOCK_SIZE_CSS * dpr))
		cols = Math.max(1, Math.floor(width / blockSize))
		rows = Math.max(1, Math.floor(height / blockSize))

		const eligibleIndices = []
		for (let gridIndex = 0; gridIndex < cols * rows; gridIndex += 1) {
			const x = (gridIndex % cols) * blockSize
			const y = Math.floor(gridIndex / cols) * blockSize
			if (x + blockSize > width || y + blockSize > height) continue
			eligibleIndices.push(gridIndex)
		}

		totalBlocks = eligibleIndices.length
		blockOrder = buildShredRevealOrder(eligibleIndices, cols, blockSize, height)

		canvas.width = width
		canvas.height = height
		canvas.style.width = `${rect.width}px`
		canvas.style.height = `${rect.height}px`
		return true
	}

	function rebuildChainBuffers() {
		chainBuffers = IMAGE_CHAIN.map(() => null)
		for (const i of ACTIVE_IMAGE_INDICES) {
			const el = imageSlotRefs[i]
			if (el && (el.naturalWidth || el.width)) chainBuffers[i] = renderImageBuffer(el)
		}
	}

	function redrawFromScratch() {
		const canvas = canvasRef.value
		if (!canvas || !layoutCanvas()) {
			refreshScrollAndCaption()
			return
		}

		rebuildChainBuffers()

		const ctx = canvas.getContext('2d')
		if (!ctx) {
			refreshScrollAndCaption()
			return
		}

		ctx.imageSmoothingEnabled = false
		ctx.clearRect(0, 0, width, height)
		lastFromPos = -1
		lastRevealCount = 0

		if (EXPECTED_IMAGE_LOADS < 1) {
			refreshScrollAndCaption()
			return
		}

		const buffersReady = ACTIVE_IMAGE_INDICES.every(i => chainBuffers[i])
		if (!buffersReady) {
			refreshScrollAndCaption()
			ctx.fillStyle = STAGE_CLEAR_COLOR
			ctx.fillRect(0, 0, width, height)
			return
		}

		refreshScrollAndCaption()
		const transition = resolveScrollTransition(scrollProgress.value)

		if (EXPECTED_IMAGE_LOADS < 2 || !transition) {
			const onlyIdx = ACTIVE_IMAGE_INDICES[0]
			const sole = onlyIdx !== undefined ? chainBuffers[onlyIdx] : null
			if (sole) paintEntireBufferAsTileGrid(ctx, sole)
			drawStaticFringes(ctx)
			bufferA = sole
			bufferB = sole
			return
		}

		bufferA = chainBuffers[transition.fromIdx]
		bufferB = chainBuffers[transition.toIdx]
		if (!bufferA || !bufferB) return

		paintEntireBufferAsTileGrid(ctx, bufferA)
		applyRevealDelta(ctx, 0, transition.revealCount)
		drawStaticFringes(ctx)
		lastRevealCount = transition.revealCount
		lastFromPos = transition.fromPos
	}

	function syncFromScroll() {
		scrollProgress.value = getScrollProgress()
		updateLiveCaption()

		const canvas = canvasRef.value
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		if (EXPECTED_IMAGE_LOADS < 2 || !totalBlocks) return

		const transition = resolveScrollTransition(scrollProgress.value)
		if (!transition) return

		bufferA = chainBuffers[transition.fromIdx]
		bufferB = chainBuffers[transition.toIdx]
		if (!bufferA || !bufferB) return

		if (transition.revealCount === 0) {
			ctx.imageSmoothingEnabled = false
			paintEntireBufferAsTileGrid(ctx, bufferA)
			drawStaticFringes(ctx)
			lastRevealCount = 0
			lastFromPos = transition.fromPos
			return
		}

		if (transition.fromPos !== lastFromPos) {
			ctx.imageSmoothingEnabled = false
			paintEntireBufferAsTileGrid(ctx, bufferA)
			drawStaticFringes(ctx)
			lastRevealCount = 0
			lastFromPos = transition.fromPos
		}

		applyRevealDelta(ctx, lastRevealCount, transition.revealCount)
		lastRevealCount = transition.revealCount
	}

	function onScroll() {
		if (rafScroll) return
		rafScroll = requestAnimationFrame(() => {
			rafScroll = 0
			syncFromScroll()
		})
	}

	function bindScrollTargets() {
		window.addEventListener('scroll', onScroll, { passive: true })
		document.addEventListener('scroll', onScroll, { passive: true, capture: true })
		if (typeof window !== 'undefined' && window.visualViewport) {
			window.visualViewport.addEventListener('scroll', onScroll, { passive: true })
		}
	}

	function unbindScrollTargets() {
		window.removeEventListener('scroll', onScroll)
		document.removeEventListener('scroll', onScroll, { capture: true })
		if (typeof window !== 'undefined' && window.visualViewport) {
			window.visualViewport.removeEventListener('scroll', onScroll)
		}
	}

	function onResize() {
		if (rafResize) return
		rafResize = requestAnimationFrame(() => {
			rafResize = 0
			viewportWidthPx.value = window.innerWidth
			if (imagesReady.value || EXPECTED_IMAGE_LOADS === 0) redrawFromScratch()
		})
	}

	function clamp(min, preferred, max) {
		return Math.min(max, Math.max(min, preferred))
	}

	function getHeaderGifBaseWidthPx() {
		if (viewportWidthPx.value <= 640) {
			return clamp(96, viewportWidthPx.value * 0.3, 150)
		}
		return clamp(120, viewportWidthPx.value * 0.2, 220)
	}

	function getHeaderGifTravelDistancePx(scale) {
		const baseWidth = getHeaderGifBaseWidthPx()
		const scaledWidth = baseWidth * scale
		return viewportWidthPx.value + scaledWidth * 5.2
	}

	function getHeaderGifDurationMs(src) {
		const isWalking = src.includes('walking')
		const scale = isWalking ? 0.84 : 1
		const speedPxPerSec = isWalking ? WALKING_SPEED_PX_PER_SEC : RUNNING_SPEED_PX_PER_SEC
		const distancePx = getHeaderGifTravelDistancePx(scale)
		return Math.round((distancePx / speedPxPerSec) * 1000)
	}

	function startHeaderGifCycle() {
		const sequenceItem = HEADER_GIF_SEQUENCE[headerGifSequenceIndex] ?? HEADER_GIF_SEQUENCE[0]
		activeHeaderGif.value = sequenceItem.src
		activeHeaderGifDirection.value = sequenceItem.direction
		activeHeaderGifDurationMs.value = getHeaderGifDurationMs(sequenceItem.src)
		headerGifCycleKey.value += 1
	}

	function scheduleNextHeaderGifCycle() {
		if (headerGifPauseTimeout) {
			window.clearTimeout(headerGifPauseTimeout)
			headerGifPauseTimeout = 0
		}
		const pauseMs = activeHeaderGif.value.includes('walking')
			? WALKING_TO_RUNNING_PAUSE_MS
			: RUNNING_TO_WALKING_PAUSE_MS
		headerGifPauseTimeout = window.setTimeout(() => {
			headerGifPauseTimeout = 0
			startHeaderGifCycle()
		}, pauseMs)
	}

	function onHeaderGifAnimationEnd() {
		headerGifSequenceIndex = (headerGifSequenceIndex + 1) % HEADER_GIF_SEQUENCE.length
		scheduleNextHeaderGifCycle()
	}

	onMounted(() => {
		savedHistoryScrollRestoration = history.scrollRestoration
		history.scrollRestoration = 'manual'
		window.scrollTo(0, 0)
		viewportWidthPx.value = window.innerWidth
		headerGifSequenceIndex = 0
		startHeaderGifCycle()

		bindScrollTargets()
		window.addEventListener('resize', onResize, { passive: true })

		const wrapper = pinWrapperRef.value
		if (wrapper && typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => onResize())
			resizeObserver.observe(wrapper)
		}

		if (EXPECTED_IMAGE_LOADS === 0) {
			imagesReady.value = true
		} else {
			let already = 0
			for (const i of ACTIVE_IMAGE_INDICES) {
				const el = imageSlotRefs[i]
				if (el?.complete) already += 1
			}
			if (already >= EXPECTED_IMAGE_LOADS) {
				imageSlotLoadsReported = EXPECTED_IMAGE_LOADS
				imagesReady.value = true
			}
		}

		requestAnimationFrame(() => {
			window.scrollTo(0, 0)
			if (imagesReady.value) {
				redrawFromScratch()
				syncFromScroll()
			}
		})
	})

	onBeforeUnmount(() => {
		history.scrollRestoration = savedHistoryScrollRestoration
		unbindScrollTargets()
		window.removeEventListener('resize', onResize)
		if (headerGifPauseTimeout) window.clearTimeout(headerGifPauseTimeout)
		if (resizeObserver) resizeObserver.disconnect()
		if (rafScroll) cancelAnimationFrame(rafScroll)
		if (rafResize) cancelAnimationFrame(rafResize)
	})

	watch(imagesReady, ready => {
		if (!ready) return
		nextTick(() => {
			requestAnimationFrame(() => {
				window.scrollTo(0, 0)
				redrawFromScratch()
				syncFromScroll()
			})
		})
	})
</script>

<style lang="scss" scoped>
	.test-page-header {
		position: relative;
		width: 100%;
		min-height: clamp(72px, 10vw, 104px);
		overflow: hidden;
	}

	.test-page-header-gif {
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		width: clamp(120px, 20vw, 220px);
		height: auto;
		image-rendering: pixelated;
		transform: translateY(var(--header-gif-y-offset, 0px)) translateX(var(--header-gif-from))
			scaleX(var(--header-gif-flip, 1))
			scale(var(--header-gif-size-scale, 1));
		animation: testPageGifWalkAcross var(--header-gif-duration, 18000ms) linear 1 both;
		pointer-events: none;
		z-index: 2;
	}

	@keyframes testPageGifWalkAcross {
		0% {
			transform: translateY(var(--header-gif-y-offset, 0px)) translateX(var(--header-gif-from))
				scaleX(var(--header-gif-flip, 1))
				scale(var(--header-gif-size-scale, 1));
		}
		100% {
			transform: translateY(var(--header-gif-y-offset, 0px)) translateX(var(--header-gif-to))
				scaleX(var(--header-gif-flip, 1))
				scale(var(--header-gif-size-scale, 1));
		}
	}

	.test-page-navbar {
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 40;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 1rem 0.35rem;
		min-height: 3rem;
		background: rgba(0, 0, 0, 0.94);
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		overflow: hidden;
	}

	.test-page-navbar-links {
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		justify-content: center;
		align-items: center;
		column-gap: clamp(0.8rem, 2vw, 1.5rem);
		row-gap: 0.35rem;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: none;
		position: relative;
		z-index: 3;
	}

	.test-page-navbar-links::-webkit-scrollbar {
		display: none;
	}

	.test-page-nav-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.88);
		font-size: clamp(0.52rem, 1.15vw, 0.64rem);
		line-height: 1.2;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		padding: 0.35rem 0.2rem;
		transition:
			color 0.2s ease,
			opacity 0.2s ease;
	}

	.test-page-nav-link::after {
		content: '';
		position: absolute;
		left: 0.2rem;
		right: 0.2rem;
		bottom: 0.15rem;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 0.2s ease;
	}

	.test-page-nav-link:hover,
	.test-page-nav-link:focus-visible,
	.test-page-nav-link.router-link-active {
		color: #ffffff;
		opacity: 1;
	}

	.test-page-nav-link:hover::after,
	.test-page-nav-link:focus-visible::after,
	.test-page-nav-link.router-link-active::after {
		transform: scaleX(1);
	}

	.test-page-nav-link:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.8);
		outline-offset: 2px;
	}

	/* Scroll “track”: tall section so window scroll maps to dissolve progress (see pinWrapperHeightVh). */
	.pin-wrapper {
		position: relative;
		width: 100%;
	}

	/* Sticky viewport: stays on screen while you scroll through .pin-wrapper; stage stays centered. */
	.pixel-transition-page {
		--test-page-nav-height: 3rem;
		width: 100%;
		align-self: stretch;
		flex: none;
		padding-top: 0;
		color: inherit;
	}

	.pin-inner {
		position: sticky;
		top: var(--test-page-nav-height);
		min-height: calc(100vh - var(--test-page-nav-height));
		display: grid;
		align-items: center;
		padding: 1.5rem;
	}

	.about-heading {
		margin: 0;
		font-weight: 400;
		font-size: clamp(1.35rem, 3.5vw, 2rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
		text-align: left;
	}

	.stage-layout {
		display: grid;
		grid-template-columns: minmax(10rem, 1fr) minmax(18rem, 34rem) minmax(10rem, 1fr);
		align-items: center;
		gap: clamp(1.5rem, 4vw, 4rem);
		width: min(100%, 84rem);
		margin: 0 auto;
	}

	.copy-block-left {
		justify-self: start;
	}

	.copy-block-right {
		justify-self: end;
		text-align: left;
	}

	.art-stage {
		position: relative;
		width: min(54vw, 30rem);
		margin: 0 auto;
	}

	.art-stage-canvas-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
	}

	.reveal-canvas {
		display: block;
		width: 100%;
		height: 100%;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}

	.pixel-caption-wrap {
		position: relative;
		max-width: min(32ch, 100%);
		min-height: 7.5rem;
		padding: 0.65rem 0.5rem;
		border: 2px solid rgba(255, 255, 255, 0.18);
		background: rgba(255, 255, 255, 0.04);
		box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.25);
		overflow: hidden;
	}

	.pixel-caption-wrap::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(255, 255, 255, 0.05) 2px,
			rgba(255, 255, 255, 0.05) 3px
		);
	}

	.pixel-caption {
		position: relative;
		z-index: 1;
		margin: 0;
		font-family: 'Press Start 2P', ui-monospace, monospace;
		font-size: clamp(0.42rem, 1.05vw, 0.58rem);
		line-height: 1.85;
		letter-spacing: 0.04em;
		text-align: left;
		color: rgba(255, 255, 255, 0.82);
		font-variant-numeric: tabular-nums;
		text-shadow: 1px 0 0 rgba(0, 0, 0, 0.35);
	}

	.pixel-caption-wrap:not(.pixel-caption-wrap--locked) .pixel-caption {
		text-shadow: none;
		animation: pixelCaptionLockSnap 0.35s ease-out 1;
	}

	@keyframes pixelCaptionScanlines {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(6px);
		}
	}

	@keyframes pixelCaptionPanelJitter {
		0%,
		100% {
			opacity: 1;
			transform: translate(0, 0);
		}
		50% {
			opacity: 0.97;
			transform: translate(0.5px, -0.5px);
		}
	}

	@keyframes pixelCaptionLockSnap {
		0% {
			opacity: 0.65;
			transform: scale(0.99);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.progress-rail {
		position: absolute;
		left: 1.5rem;
		right: 1.5rem;
		bottom: 1.5rem;
		height: 1px;
		background: rgba(255, 255, 255, 0.15);
		overflow: hidden;
	}

	.progress-bar {
		width: 100%;
		height: 100%;
		transform-origin: left center;
		background: rgba(255, 255, 255, 0.45);
	}

	.outro {
		min-height: 52vh;
		display: grid;
		place-items: center;
		gap: 1.25rem;
		padding: 2rem 1.5rem 5rem;
		text-align: center;
	}

	.back-link {
		font-size: 0.7rem;
	}

	.sr-only-preload {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 960px) {
		.stage-layout {
			grid-template-columns: 1fr;
			justify-items: center;
			text-align: center;
		}

		.copy-block-left,
		.copy-block-right {
			justify-self: center;
		}

		.about-heading {
			text-align: center;
		}

		.copy-block-right {
			max-width: 32rem;
		}

		.art-stage {
			width: min(72vw, 24rem);
		}
	}

	@media (max-width: 640px) {
		.test-page-header {
			min-height: clamp(58px, 18vw, 84px);
		}

		.test-page-header-gif {
			width: clamp(96px, 30vw, 150px);
		}

		.test-page-navbar-links {
			padding: 0.35rem 0.75rem;
		}

		.test-page-nav-link {
			font-size: clamp(0.5rem, 2.4vw, 0.58rem);
			padding: 0.3rem 0.12rem;
		}

		.pin-inner {
			padding: 1rem;
		}

		.progress-rail {
			left: 1rem;
			right: 1rem;
			bottom: 1rem;
		}

		.art-stage {
			width: min(82vw, 20rem);
		}

		.pixel-caption {
			font-size: clamp(0.48rem, 2.8vw, 0.58rem);
		}

		.pixel-caption-wrap {
			min-height: 6.5rem;
		}
	}
</style>
