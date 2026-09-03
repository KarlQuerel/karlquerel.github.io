<template>
	<div class="app-root">
		<!-- Teleported outside #app so `page-scrollable` toggles can't re-rasterise the fixed starfield -->
		<Teleport to="body">
			<SpaceBackground v-if="showChrome" />
			<!-- The landing's boot (useBoot): up from the shell's first frame, above the
			     starfield and the chrome, until the departure has cut its ground. Painted
			     the site's black, not the lab's ground. -->
			<div v-if="active" class="app-boot">
				<LabBoot :progress="progress" :ceiling="ceiling" :done="done" />
			</div>
		</Teleport>
		<main class="app-main">
			<!-- keep the heavy landing alive so its canvas + planet build only once -->
			<router-view v-slot="{ Component }">
				<keep-alive :include="KEPT_ALIVE_VIEWS">
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</main>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { useBoot } from './composables/useBoot'
	import LabBoot from './components/lab/LabBoot.vue'
	import SpaceBackground from './components/SpaceBackground.vue'

	const SCROLLABLE_PATHS = ['/', '/sport', '/lab']

	// Unlisted pages with no site chrome at all — no drifting starfield behind the
	// text. Reached by URL, so nothing to navigate from.
	// /lab is here for a different reason than /sport: it paints its own sky in a
	// shader and carries its own chrome, so the site's would only be drawn underneath.
	const BARE_PATHS = ['/sport', '/lab']

	// Component names (see defineOptions) kept mounted across navigation.
	const KEPT_ALIVE_VIEWS = ['HomeJourney']

	const route = useRoute()
	const normalizedPath = () => route.path.replace(/\/$/, '') || '/'

	// The boot runs on a landing load only — the landing itself or a path that redirects
	// to it — decided from the address before the router has resolved anything, since
	// the boot must be up before the starfield is.
	const landingPaths = useRouter()
		.getRoutes()
		.filter(r => r.path === '/' || r.redirect?.path === '/')
		.map(r => r.path)
	const { active, progress, ceiling, done, start } = useBoot()
	if (landingPaths.includes(window.location.pathname.replace(/\/$/, '') || '/')) start()

	// the shell's inline cover (index.html) hands over to the boot once it is painted
	onMounted(() => document.documentElement.classList.remove('booting'))
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(normalizedPath()))
	const showChrome = computed(() => !BARE_PATHS.includes(normalizedPath()))

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

<style scoped lang="scss">
	// above the starfield and every route's chrome: nothing shows through a boot
	.app-boot {
		position: fixed;
		inset: 0;
		z-index: 30;
		pointer-events: none;
		--boot-ground: #{$black};
	}
</style>
