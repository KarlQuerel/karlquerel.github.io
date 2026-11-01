<template>
	<!-- Dev server only: jump to any shot. A plain link reloads, so the shot boots as `?shot=` opens it. -->
	<details class="scenes">
		<summary class="scenes__toggle">{{ SCENE_MENU.label }}</summary>
		<nav class="scenes__panel">
			<section v-for="group in groups" :key="group.label">
				<h2>{{ group.label }}</h2>
				<a v-for="key in group.keys" :key="key" :href="`?shot=${key}`">{{ key }}</a>
			</section>
			<section>
				<h2>{{ SCENE_MENU.pilot.group }}</h2>
				<a :href="`?${SCENE_MENU.pilot.param}`">{{ SCENE_MENU.pilot.label }}</a>
			</section>
			<RouterLink :to="SCENE_MENU.holding.to">{{ SCENE_MENU.holding.label }}</RouterLink>
		</nav>
	</details>
</template>

<script setup>
	import { RouterLink } from 'vue-router'
	import { INTRO_SHOTS } from '@/js/intro/index.js'
	import { SCENE_MENU } from '@/constants/intro/timeline'

	const actAt = INTRO_SHOTS.findIndex(s => s.act)
	const { intro, acts, endings } = SCENE_MENU.groups
	const keys = pick => INTRO_SHOTS.filter(pick).map(s => s.key)
	const groups = [
		{ label: intro, keys: keys((_, i) => i < actAt) },
		{ label: acts, keys: keys((s, i) => i >= actAt && !s.end) },
		{ label: endings, keys: keys(s => s.end) },
	]
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// under the way home, clear of the skip chips on the right
	.scenes__toggle {
		@include pinned-chip;

		& {
			top: 3rem;
			left: 0.6rem;
			right: auto;
			bottom: auto;
			list-style: none;
			cursor: pointer;
		}
	}

	.scenes__panel {
		position: fixed;
		top: 5.6rem;
		left: 0.6rem;
		z-index: $z-index-chrome;
		max-height: calc(100vh - 6.6rem);
		overflow-y: auto;
		padding: 0.6rem 0.9rem;
		text-align: left;
		font-family: $font-terminal;
		font-size: $type-prose-md;
		@include void-panel;

		h2 {
			margin: 0.4rem 0 0.2rem;
			font-family: $font-pixel;
			font-size: $type-prose-sm;
			color: $yellow;
		}

		a {
			display: block;
			color: $light-gray;
			text-decoration: none;

			&:hover,
			&:focus-visible {
				color: $yellow;
			}
		}
	}
</style>
