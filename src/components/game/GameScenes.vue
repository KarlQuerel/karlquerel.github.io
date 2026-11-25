<template>
	<!-- Dev server only: jump to the title screen or any scene. A plain link reloads, so the scene boots fresh. -->
	<details class="scenes">
		<summary class="scenes__toggle">{{ SCENE_MENU.label }}</summary>
		<nav class="scenes__panel">
			<a :href="route.path">{{ SCENE_MENU.title }}</a>
			<a v-for="{ param, label } in GAME_SCENES" :key="param" :href="`?${param}`">
				{{ label }}
			</a>
			<a :href="`?${BOOT_PREVIEW.param}`">{{ BOOT_PREVIEW.label }}</a>
			<RouterLink :to="SCENE_MENU.holding.to">{{ SCENE_MENU.holding.label }}</RouterLink>
		</nav>
	</details>
</template>

<script setup>
	import { RouterLink, useRoute } from 'vue-router'
	import { BOOT_PREVIEW } from '@/constants/game/bootPreview'
	import { GAME_SCENES, SCENE_MENU } from '@/constants/game/scenes'

	const route = useRoute()
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// under the way home
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
