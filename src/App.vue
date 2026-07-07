<template>
	<div class="app-root">
		<!-- Teleported to <body> so it lives OUTSIDE #app. The `page-scrollable`
		     class toggles overflow/height on #app and .app-root as you move between
		     scrolling and fixed pages; while the fixed starfield was a descendant of
		     those, every such toggle invalidated and fully re-rasterised it (~2s of
		     GPU raster on entering /about). Out here nothing restyles its ancestors,
		     so the toggle no longer touches it. Stays position:fixed; z-index:-1. -->
		<Teleport to="body">
			<SpaceBackground />
		</Teleport>
		<!-- Every page is immersive: no persistent header or navbar. The centred
		     star (NavToggle) summons a floating navbar on demand, so nothing boxes
		     the content in on any route.

		     The Yako "dog" run/walk header animation is PRESERVED but not mounted —
		     the component still lives at src/components/SiteHeaderAnimation.vue. To
		     bring the header strip back, re-import it and drop <SiteHeaderAnimation />
		     in here (and restore the --site-header-height offsets it needs). -->
		<transition name="nav-slide">
			<SiteNavbar v-if="navOpen" />
		</transition>
		<main class="app-main">
			<router-view />
		</main>
		<NavToggle :open="navOpen" @toggle="navOpen = !navOpen" />
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import SpaceBackground from './components/SpaceBackground.vue'
	import SiteNavbar from './components/SiteNavbar.vue'
	import NavToggle from './components/NavToggle.vue'
	import { useClickSpark } from './composables/useClickSpark'
	import { useAmbientAudio } from './composables/useAmbientAudio'

	const SCROLLABLE_PATHS = ['/', '/sport', '/about']

	useClickSpark()

	const { init: initAmbientAudio } = useAmbientAudio()
	initAmbientAudio()

	const route = useRoute()
	const normalizedPath = () => route.path.replace(/\/$/, '') || '/'
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(normalizedPath()))

	// The nav is summoned by <NavToggle>, and its open/closed state persists across
	// navigation (App.vue never unmounts): open it, click a link, and it stays open
	// on the next page — now with that page's link highlighted. Not reset on route
	// change, so the bar you left open follows you around the site.
	const navOpen = ref(false)

	watch(
		isPageScrollable,
		scrollable => {
			document.documentElement.classList.toggle('page-scrollable', scrollable)
			if (!scrollable) {
				window.scrollTo(0, 0)
			}
		},
		{ immediate: true }
	)

	onBeforeUnmount(() => {
		document.documentElement.classList.remove('page-scrollable')
	})
</script>
