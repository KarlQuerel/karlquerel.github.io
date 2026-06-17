<template>
	<section
		class="card"
		:class="{ 'is-open': accordion.isCardOpen(day.id) }"
		:data-accent="day.accent"
	>
		<div
			class="session-head"
			role="button"
			tabindex="0"
			:aria-expanded="String(accordion.isCardOpen(day.id))"
			@click="accordion.toggleCard(day.id)"
			@keydown="accordion.onCardKeydown($event, day.id)"
		>
			<div>
				<div class="day-name">{{ day.day }}</div>
				<div class="session-kind">{{ day.kind }}</div>
			</div>
			<div class="chips">
				<span v-for="chip in day.chips" :key="chip" class="chip" :data-muscle="chip">
					{{ muscleLabel(chip) }}
				</span>
			</div>
		</div>
		<div class="card-body">
			<hr />
			<div class="exercise-list">
				<SportExercise
					v-if="day.includeBaseWarmup"
					:exercise="BASE_WARMUP"
					:is-open="accordion.isExerciseOpen(`${day.id}-warmup`)"
					@toggle="accordion.toggleExercise(day.id, 'warmup', BASE_WARMUP)"
					@keydown="accordion.onExerciseKeydown($event, day.id, 'warmup', BASE_WARMUP)"
				/>
				<template
					v-for="(block, blockIndex) in day.blocks"
					:key="`${day.id}-block-${blockIndex}`"
				>
					<div
						v-if="block.type === 'superset'"
						class="superset"
						:data-muscle="block.muscle"
					>
						<div class="superset-head">Superset</div>
						<SportExercise
							v-for="(exercise, exIndex) in block.exercises"
							:key="`${exercise.name}-${exIndex}`"
							:exercise="exercise"
							:is-open="
								accordion.isExerciseOpen(`${day.id}-${blockIndex}-${exIndex}`)
							"
							@toggle="accordion.toggleExercise(day.id, blockIndex, block)"
							@keydown="
								accordion.onExerciseKeydown($event, day.id, blockIndex, block)
							"
						/>
					</div>
					<SportExercise
						v-else
						:exercise="block"
						:is-open="accordion.isExerciseOpen(`${day.id}-${blockIndex}`)"
						@toggle="accordion.toggleExercise(day.id, blockIndex, block)"
						@keydown="accordion.onExerciseKeydown($event, day.id, blockIndex, block)"
					/>
				</template>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { inject } from 'vue'
	import { BASE_WARMUP } from '@/data/weeklySplit'
	import { muscleLabel } from '@/data/sportLabels'
	import SportExercise from './SportExercise.vue'

	defineProps({
		day: {
			type: Object,
			required: true,
		},
	})

	const accordion = inject('sportAccordion')
</script>
