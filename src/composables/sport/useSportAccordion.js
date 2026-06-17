import { ref, computed } from 'vue'
import { WEEKLY_SPLIT } from '@/data/weeklySplit'

const TOGGLE_KEYS = new Set(['Enter', ' '])

function buildAllExerciseKeys() {
	const keys = []
	for (const day of WEEKLY_SPLIT) {
		if (day.includeBaseWarmup) {
			keys.push(`${day.id}-warmup`)
		}
		day.blocks.forEach((block, blockIndex) => {
			if (block.type === 'exercise') {
				keys.push(`${day.id}-${blockIndex}`)
			} else if (block.type === 'superset') {
				block.exercises.forEach((_, exIndex) => {
					keys.push(`${day.id}-${blockIndex}-${exIndex}`)
				})
			}
		})
	}
	return keys
}

const ALL_CARD_IDS = WEEKLY_SPLIT.map(day => day.id)
const ALL_EXERCISE_KEYS = buildAllExerciseKeys()

function areAllOpen(cardIds, exerciseKeys) {
	return (
		ALL_CARD_IDS.every(id => cardIds.has(id)) &&
		ALL_EXERCISE_KEYS.every(key => exerciseKeys.has(key))
	)
}

export function useSportAccordion() {
	const openCardIds = ref(new Set())
	const openExerciseKeys = ref(new Set())

	const showAllLabel = computed(() =>
		areAllOpen(openCardIds.value, openExerciseKeys.value) ? 'Hide all' : 'Show all'
	)

	function isCardOpen(dayId) {
		return openCardIds.value.has(dayId)
	}

	function isExerciseOpen(key) {
		return openExerciseKeys.value.has(key)
	}

	function toggleCard(dayId) {
		openCardIds.value = openCardIds.value.has(dayId) ? new Set() : new Set([dayId])
	}

	function toggleExercise(dayId, blockIndex, block) {
		if (blockIndex === 'warmup') {
			const key = `${dayId}-warmup`
			openExerciseKeys.value = openExerciseKeys.value.has(key) ? new Set() : new Set([key])
			return
		}

		if (block.type === 'superset') {
			const keys = block.exercises.map((_, exIndex) => `${dayId}-${blockIndex}-${exIndex}`)
			const allOpen = keys.every(key => openExerciseKeys.value.has(key))
			const shouldOpen = keys.length > 1 ? !allOpen : !openExerciseKeys.value.has(keys[0])
			openExerciseKeys.value = shouldOpen ? new Set(keys) : new Set()
			return
		}

		const key = `${dayId}-${blockIndex}`
		openExerciseKeys.value = openExerciseKeys.value.has(key) ? new Set() : new Set([key])
	}

	function onCardKeydown(event, dayId) {
		if (!TOGGLE_KEYS.has(event.key)) return
		event.preventDefault()
		toggleCard(dayId)
	}

	function onExerciseKeydown(event, dayId, blockIndex, block) {
		if (!TOGGLE_KEYS.has(event.key)) return
		event.preventDefault()
		toggleExercise(dayId, blockIndex, block)
	}

	function toggleShowAll() {
		if (areAllOpen(openCardIds.value, openExerciseKeys.value)) {
			openCardIds.value = new Set()
			openExerciseKeys.value = new Set()
		} else {
			openCardIds.value = new Set(ALL_CARD_IDS)
			openExerciseKeys.value = new Set(ALL_EXERCISE_KEYS)
		}
	}

	return {
		isCardOpen,
		isExerciseOpen,
		toggleCard,
		toggleExercise,
		onCardKeydown,
		onExerciseKeydown,
		toggleShowAll,
		showAllLabel,
	}
}
