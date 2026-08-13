<template>
	<section class="card" :data-accent="day.accent">
		<div class="session-head">
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
		<div>
			<hr />
			<div class="exercise-list">
				<SportExercise v-if="day.includeBaseWarmup" :exercise="BASE_WARMUP" />
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
						/>
					</div>
					<SportExercise v-else :exercise="block" />
				</template>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { BASE_WARMUP } from '@/data/weeklySplit'
	import { muscleLabel } from '@/data/sportLabels'
	import SportExercise from './SportExercise.vue'

	defineProps({
		day: {
			type: Object,
			required: true,
		},
	})
</script>
