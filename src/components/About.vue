<template>
	<div class="content about">
		<header class="about-head">
			<p v-if="activeTab" :key="activeTab" class="about-intro about-lead">
				<!-- segments carry their own spacing — between-tag whitespace is stripped -->
				<template v-for="(seg, i) in ABOUT_INTRO[activeTab]" :key="i"
					><br v-if="seg.br" /><span v-else-if="seg.hl" class="about-intro__hl">{{
						seg.text
					}}</span
					><template v-else>{{ seg.text }}</template></template
				>
			</p>
			<p v-else class="about-intro about-lead about-greeting">
				<span class="about-greeting__line">{{ ABOUT_INTRO.greetingLine1 }}</span>
				<span class="about-greeting__line">
					{{ ABOUT_INTRO.greetingLead
					}}<span class="about-name">{{ ABOUT_INTRO.greetingName }}</span>
				</span>
			</p>
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

		<template v-else>
			<!-- order: -1 hoists it above the intro; sticky keeps "back" reachable while a panel scrolls -->
			<button class="about-back" type="button" @click="goToHub">
				<span class="about-back__icon" aria-hidden="true"><i /><i /></span>
				Back
			</button>

			<component :is="activeComponent" :key="activeTab" class="about-panel" />
		</template>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { ABOUT_INTRO } from '@/data/about'
	import AboutWork from './AboutWork.vue'
	import AboutLife from './AboutLife.vue'
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
		min-height: 100dvh;
		gap: 2rem;
		padding: 3.6rem 1rem 4rem;
	}

	.about-head {
		max-width: min(46rem, 94vw);
		margin: 0 auto;
		padding: 1.75rem 1.5rem 2rem;
		background: radial-gradient(
			120% 130% at 50% 50%,
			rgba(0, 0, 0, 0.72) 0%,
			rgba(0, 0, 0, 0.45) 55%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.about-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.75;
		text-align: center;
		// even out the centered rag so the block reads as one deliberate shape
		text-wrap: balance;
		color: $white;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}

	.about-intro:first-child {
		margin-top: 0;
	}

	.about-name,
	.about-intro__hl {
		color: $yellow;
		text-shadow: 0 0 12px rgba($yellow, 0.45);
	}

	// Bigger two-line hub greeting; each line is a block so they stack without a <br>.
	.about-greeting {
		font-size: $heading-pixel-size;
		line-height: 1.5;
		text-transform: uppercase;
	}

	.about-greeting__line {
		display: block;
	}

	.about-lead {
		color: $white;
		animation: intro-swap 0.35s steps(4, end) both;
	}

	@keyframes intro-swap {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.about-hub {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2.25rem;
		// 100% (not 94vw): vw ignores the page padding and pins the overflowing row
		// to the left edge, nudging every tile off-centre on phones
		width: min(42rem, 100%);
		// Extra top margin (on top of the row gap) opens up the greeting → portals gap.
		margin: 2.5rem auto 0;
		padding: 0.5rem;
	}

	// top 7rem clears the star toggle + MENU hint; z 30 stays under the nav overlay (40) and star (50)
	.about-back {
		order: -1;
		align-self: center;
		position: sticky;
		top: 7rem;
		z-index: 30;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 1rem);
		letter-spacing: 1px;
		text-transform: uppercase;
		padding: 0.5rem 0.9rem;
		// Keep it legible over whatever panel content scrolls behind it.
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
		// void frame over a more solid fill so it reads as a tappable chip against the panel
		@include void-button($lift: -2px, $bg: rgba(0, 0, 0, 0.55));
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

	@media (max-width: $breakpoint-mobile) {
		.about-hub {
			flex-direction: column;
			align-items: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.about-lead {
			animation: none;
		}
	}
</style>
