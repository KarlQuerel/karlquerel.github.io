<template>
	<!-- the poster holds until the art is seen, then the clip plays once and rests on its last frame;
	     a click plays it again. `loading` goes before `src`: a src set first fetches eagerly -->
	<button ref="el" type="button" class="once" :aria-label="media.replayLabel" @click="play">
		<img
			loading="lazy"
			decoding="async"
			:src="src"
			:alt="media.alt"
			:width="media.width"
			:height="media.height"
			@load="still || prefetch()"
		/>
	</button>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { ART_PLAY_THRESHOLD } from '@/constants/aboutLife'

	const props = defineProps({
		// { src: play-once clip, poster: its first frame, still: its last frame, alt, replayLabel, width, height }
		media: { type: Object, required: true },
	})

	// reduced motion never autoplays or prefetches; it starts on the frame the clip would end on
	const still = prefersReducedMotion()
	const src = ref(still ? props.media.still : props.media.poster)
	const el = ref(null)
	let clip = null
	let url = ''
	let observer = null

	// the poster's lazy load means the card is near: fetch the clip then, so it's ready when seen
	function prefetch() {
		clip ??= fetch(props.media.src)
			.then(response => (response.ok ? response.blob() : null))
			.catch(() => null)
	}

	// a fresh blob URL per play: an <img> won't restart a finished one-shot clip on the same URL
	async function play() {
		prefetch()
		const blob = await clip
		if (!blob) {
			clip = null
			return
		}
		if (url) URL.revokeObjectURL(url)
		url = URL.createObjectURL(blob)
		src.value = url
	}

	onMounted(() => {
		if (still) return
		if (!('IntersectionObserver' in window)) return play()
		observer = new IntersectionObserver(
			entries => {
				if (!entries.at(-1).isIntersecting) return
				observer.disconnect()
				play()
			},
			{ threshold: ART_PLAY_THRESHOLD }
		)
		observer.observe(el.value)
	})

	onBeforeUnmount(() => {
		observer?.disconnect()
		if (url) URL.revokeObjectURL(url)
	})
</script>

<style scoped lang="scss">
	// no chrome: the hardware is its own frame
	.once {
		display: block;
		padding: 0;
		border: 0;
		background: none;

		&:focus-visible {
			outline: 2px solid $light-blue;
			outline-offset: 4px;
		}
	}

	.once img {
		display: block;
		width: 100%;
		height: auto;
		// pixel art: never let the browser smooth it when it scales
		image-rendering: pixelated;
	}
</style>
