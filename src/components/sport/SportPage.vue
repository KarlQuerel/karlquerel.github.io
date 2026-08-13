<template>
	<div class="sport-page">
		<PageTitle class="page-title" :lead="SPORT_HEADING.lead" :accent="SPORT_HEADING.accent" />

		<div class="legend">
			<span v-for="muscle in MUSCLE_LEGEND" :key="muscle">
				<span class="dot" :data-muscle="muscle" aria-hidden="true" />
				{{ muscleLabel(muscle) }}
			</span>
		</div>

		<div class="grid">
			<SportDayCard v-for="day in WEEKLY_SPLIT" :key="day.id" :day="day" />
		</div>
	</div>
</template>

<script setup>
	import { MUSCLE_LEGEND, WEEKLY_SPLIT } from '@/data/weeklySplit'
	import { muscleLabel, SPORT_HEADING } from '@/data/sportLabels'
	import PageTitle from '@/components/PageTitle.vue'
	import SportDayCard from './SportDayCard.vue'
</script>

<!-- unscoped on purpose: page styles shared by the sport child components,
     bundled here so the CSS ships with this route's chunk only -->
<style lang="scss">
	@use '@/styles/sport';
</style>
