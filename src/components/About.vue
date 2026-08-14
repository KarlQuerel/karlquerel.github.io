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

		<component :is="activeComponent" v-else :key="activeTab" />
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
		// shared reading column for the intro + timeline (AboutWork reads these too)
		--about-column: #{$about-column};
		--about-gutter: #{$about-gutter};
		// bottom clears the pinned Back button
		@include page-shell($pad-bottom: 5rem);
	}

	@media (max-width: $breakpoint-mobile) {
		.about {
			// tighter gutter for the smaller mobile badge
			--about-gutter: #{$about-gutter-mobile};
		}
	}

	.about-head {
		@include page-head;
	}

	// tab mode: the panel below carries its own framing, so the header is bare. Back is
	// pinned chrome, so the title is the only thing left in here.
	.about-head--tab {
		width: 100%;
		// same measure as the timeline panel
		max-width: var(--about-column);
		// same title y as the hub/contact heads (their margin is zeroed below)
		padding: $page-head-title-offset 0 2rem;
		background: none;

		> * {
			margin-top: 0;
		}
	}

	.about-hub {
		@include portal-row;

		// centre in the space left under the pinned heading
		& {
			margin-block: auto;
		}
	}

	// pinned chrome, not a breadcrumb: it stays reachable once the header scrolls off, since
	// the star menu only reaches global nav and never the hub
	.about-back {
		@include pinned-chip;
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

	.about-back:hover .about-back__icon,
	.about-back:focus-visible .about-back__icon {
		transform: translateX(-3px);
	}
</style>
