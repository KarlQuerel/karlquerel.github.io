<template>
	<div class="sport-page">
		<div class="page-title">
			<span class="page-title__icon-slot page-title__icon-slot--left">
				<img
					class="page-title__icon"
					src="/assets/img/dumbbell.png"
					alt=""
					width="494"
					height="246"
					decoding="async"
				/>
			</span>
			<h1>WEEKLY SPLIT</h1>
			<span class="page-title__icon-slot page-title__icon-slot--right">
				<img
					class="page-title__icon"
					src="/assets/img/dumbbell.png"
					alt=""
					width="494"
					height="246"
					decoding="async"
				/>
			</span>
		</div>

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
	import { muscleLabel } from '@/data/sportLabels'
	import { useSportAccordion } from '@/composables/sport/useSportAccordion'
	import SportDayCard from './SportDayCard.vue'

	const accordion = useSportAccordion()
	const { toggleShowAll, showAllLabel } = accordion
	provide('sportAccordion', accordion)
</script>
