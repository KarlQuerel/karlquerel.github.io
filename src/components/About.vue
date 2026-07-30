<template>
	<div class="content about">
		<header class="about-head" :class="{ 'about-head--tab': activeTab }">
			<!-- pinned chrome rather than a breadcrumb: the star menu only reaches global
			     nav, never the hub, so Back has to survive the header scrolling off -->
			<button v-if="activeTab" class="about-back" type="button" @click="goToHub">
				<span class="about-back__icon" aria-hidden="true"><i /><i /></span>
				Back
			</button>
			<PageTitle
				:key="activeTab ?? 'hub'"
				:line1="heading.line1"
				:lead="heading.lead"
				:accent="heading.accent"
			/>
		</header>

		<div v-if="!activeTab" class="about-hub" role="group" aria-label="Choose a section">
			<PixelPortal
				v-for="tab in TABS"
				:key="tab.id"
				:label="tab.label"
				:image="tab.image"
				@click="selectTab(tab.id)"
			/>
		</div>

		<component :is="activeComponent" v-else :key="activeTab" class="about-panel" />
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { ABOUT_HEADINGS } from '@/data/about'
	import AboutWork from './AboutWork.vue'
	import AboutLife from './AboutLife.vue'
	import PageTitle from './PageTitle.vue'
	import PixelPortal from './PixelPortal.vue'

	// tab state lives in the URL (?tab=work|life) so it survives refresh and is shareable
	const TABS = [
		{ id: 'work', label: 'WORK', image: '/assets/about/briefcase.png', component: AboutWork },
		{
			id: 'life',
			label: 'LIFE',
			image: '/assets/about/ps1-controller.png',
			component: AboutLife,
		},
	]

	const route = useRoute()
	const router = useRouter()

	const activeTab = computed(() => {
		const tab = route.query.tab
		return TABS.some(t => t.id === tab) ? tab : null
	})
	const activeComponent = computed(
		() => TABS.find(tab => tab.id === activeTab.value)?.component ?? null
	)

	// hub greeting, or the active tab's heading
	const heading = computed(() => ABOUT_HEADINGS[activeTab.value ?? 'hub'])

	function selectTab(id) {
		if (id === activeTab.value) return
		router.push({ query: { tab: id } })
	}

	// Clear the tab query to return to the hub (greeting + section portals).
	function goToHub() {
		router.push({ query: {} })
	}
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.about {
		// clears the fixed star toggle + MENU hint
		--pad-top: 3.6rem;
		// shared reading column for the intro + timeline (AboutWork reads these too)
		--about-column: #{$about-column};
		--about-gutter: #{$about-gutter};
		min-height: 100dvh;
		gap: 2rem;
		// bottom clears the pinned Back button
		padding: var(--pad-top) 1rem 5rem;
	}

	// On short mobile viewports the column overflows and starts at the padding, so the
	// greeting must clear the star + MENU hint on its own.
	@media (max-width: $breakpoint-mobile) {
		.about {
			--pad-top: #{$chrome-clearance-mobile};
			// tighter gutter for the smaller mobile badge
			--about-gutter: #{$about-gutter-mobile};
		}
	}

	.about-head {
		@include void-scrim($size: 120% 130%);
		max-width: min(46rem, 94vw);
		margin: 0 auto;
		padding: 1.75rem 1.5rem 2rem;
	}

	// tab mode: the panel below carries its own framing, so the header is bare. Back is
	// pinned chrome, so the title is the only thing left in here.
	.about-head--tab {
		width: 100%;
		// same measure as the timeline panel
		max-width: var(--about-column);
		padding: 5.1rem 0 2rem;
		background: none;

		> * {
			margin-top: 0;
		}
	}

	.about-hub {
		@include portal-row;
	}

	// pinned chrome, not a breadcrumb: it stays reachable once the header scrolls off, since
	// the star menu only reaches global nav and never the hub
	.about-back {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		// under the star toggle (50) and the nav overlay
		z-index: 20;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 1rem);
		letter-spacing: 1px;
		text-transform: uppercase;
		padding: 0.5rem 0.9rem;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
		@include void-button($lift: -2px, $bg: rgba(0, 0, 0, 0.55));

		// borderless chip: drop the void frame and its hover/active inset ring, keep the glow
		& {
			border: 0;
		}

		&:hover,
		&:focus-visible {
			box-shadow: 0 0 28px rgba($yellow, 0.18);
		}

		&:active {
			box-shadow: 0 0 16px rgba($yellow, 0.12);
		}
	}

	// twin "rewind" triangles, em-sized so they scale with the label
	.about-back__icon {
		display: inline-flex;
		gap: 0.15em;
		flex: none;
		transition: transform 0.2s steps(3, end);
	}

	.about-back__icon i {
		width: 0;
		height: 0;
		border-top: 0.42em solid transparent;
		border-bottom: 0.42em solid transparent;
		border-right: 0.42em solid currentColor;
	}

	// mobile carries the star clearance on --pad-top instead, but the header still needs
	// enough of its own to keep the title off the MENU hint
	@media (max-width: $breakpoint-mobile) {
		.about-head--tab {
			padding-top: 3rem;
		}
	}

	.about-back:hover .about-back__icon,
	.about-back:focus-visible .about-back__icon {
		transform: translateX(-3px);
	}
</style>
