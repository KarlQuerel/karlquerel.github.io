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
		<!-- :duration is explicit because the reveal transition lives on a
		     pseudo-element (.site-nav-overlay::before), which Vue can't auto-detect. -->
		<transition name="nav-overlay" :duration="420">
			<SiteNavbar v-if="navOpen" @close="navOpen = false" />
		</transition>
		<main class="app-main">
			<!-- Keep only the heavy landing (HeroIntro) alive across navigation so its
			     canvas + procedural planet build once and are reused, instead of
			     re-initialising every time it's revisited. -->
			<router-view v-slot="{ Component }">
				<keep-alive :include="KEPT_ALIVE_VIEWS">
					<component :is="Component" />
				</keep-alive>
			</router-view>
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
	import { useAmbientAudio } from './composables/useAmbientAudio'

	const SCROLLABLE_PATHS = ['/', '/sport', '/about']

	// Component names (see defineOptions) kept mounted across navigation.
	const KEPT_ALIVE_VIEWS = ['HeroIntro']

	const { init: initAmbientAudio } = useAmbientAudio()
	initAmbientAudio()

	const route = useRoute()
	const normalizedPath = () => route.path.replace(/\/$/, '') || '/'
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(normalizedPath()))

	// The nav is summoned by <NavToggle> as a modal overlay; picking a link emits
	// `close`, so it never lands over the next page. Dismissed on backdrop click /
	// Escape / the star toggle (see SiteNavbar.vue).
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
