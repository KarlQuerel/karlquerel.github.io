<template>
	<div class="sport-page">
		<PageTitle class="page-title" :lead="SPORT_HEADING.lead" :accent="SPORT_HEADING.accent">
			<template #left>
				<img
					class="page-title__icon"
					src="/assets/img/dumbbell.png"
					alt=""
					width="494"
					height="246"
					decoding="async"
				/>
			</template>
			<template #right>
				<img
					class="page-title__icon"
					src="/assets/img/dumbbell.png"
					alt=""
					width="494"
					height="246"
					decoding="async"
				/>
			</template>
		</PageTitle>

		<div class="legend">
			<span v-for="muscle in MUSCLE_LEGEND" :key="muscle">
				<span class="dot" :data-muscle="muscle" aria-hidden="true" />
				{{ muscleLabel(muscle) }}
			</span>
		</div>

		<div class="grid">
			<SportDayCard v-for="day in WEEKLY_SPLIT" :key="day.id" :day="day" />
		</div>

		<div class="page-footer">
			<img
				class="page-footer__icon"
				src="/assets/img/weight-plate.png"
				alt=""
				width="494"
				height="246"
				decoding="async"
			/>
		</div>

		<button type="button" class="show-all-btn" @click="toggleShowAll">
			{{ showAllLabel }}
		</button>
	</div>
</template>

<script setup>
	import { provide } from 'vue'
	import { MUSCLE_LEGEND, WEEKLY_SPLIT } from '@/data/weeklySplit'
	import { muscleLabel, SPORT_HEADING } from '@/data/sportLabels'
	import { useSportAccordion } from '@/composables/sport/useSportAccordion'
	import PageTitle from '@/components/PageTitle.vue'
	import SportDayCard from './SportDayCard.vue'

	const accordion = useSportAccordion()
	const { toggleShowAll, showAllLabel } = accordion
	provide('sportAccordion', accordion)
</script>

<!-- unscoped on purpose: page styles shared by the sport child components,
     bundled here so the CSS ships with this route's chunk only -->
<style lang="scss">
	@use '@/styles/sport';
</style>
