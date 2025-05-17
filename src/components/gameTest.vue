<template>
	<div class="character-creator p-4 max-w-xl mx-auto">
	  <h1 class="text-2xl font-bold mb-4">🧙 Character Creation</h1>
  
	  <div class="mb-3">
		<label class="block font-semibold mb-1">Name</label>
		<input v-model="name" class="border p-2 w-full rounded" />
	  </div>
  
	  <div class="mb-3">
		<label class="block font-semibold mb-1">Race</label>
		<select v-model="race" class="border p-2 w-full rounded">
		  <option disabled value="">Select a race</option>
		  <option>Human</option>
		  <option>Elf</option>
		  <option>Dwarf</option>
		</select>
	  </div>
  
	  <div class="mb-3">
		<label class="block font-semibold mb-1">Class</label>
		<select v-model="charClass" class="border p-2 w-full rounded">
		  <option disabled value="">Select a class</option>
		  <option>Fighter</option>
		  <option>Wizard</option>
		  <option>Rogue</option>
		</select>
	  </div>
  
	  <div class="mb-3">
		<button @click="generateStats" class="bg-blue-600 text-white px-4 py-2 rounded">
		  🎲 Generate Ability Scores
		</button>
	  </div>
  
	  <div v-if="Object.keys(stats).length" class="mb-4">
		<h2 class="font-bold mb-2">Ability Scores</h2>
		<ul>
		  <li v-for="(val, key) in stats" :key="key">{{ key }}: {{ val }}</li>
		</ul>
	  </div>
  
	  <div>
		<button @click="submit" class="bg-green-600 text-white px-4 py-2 rounded" :disabled="!canSubmit">
		  ✅ Create Character
		</button>
	  </div>
  
	  <div v-if="characterCreated" class="mt-6 p-4 border rounded bg-green-100">
		<h2 class="font-bold mb-2">Character Created!</h2>
		<p><strong>Name:</strong> {{ name }}</p>
		<p><strong>Race:</strong> {{ race }}</p>
		<p><strong>Class:</strong> {{ charClass }}</p>
		<ul>
		  <li v-for="(val, key) in stats" :key="key">{{ key }}: {{ val }}</li>
		</ul>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { reactive, ref, computed } from 'vue';
  
  const name = ref('');
  const race = ref('');
  const charClass = ref('');
  const stats = reactive({});
  
  const abilityNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
  
  function rollStat() {
	// D&D-style: roll 4d6 and drop the lowest
	const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
	rolls.sort((a, b) => a - b);
	return rolls.slice(1).reduce((sum, val) => sum + val, 0);
  }
  
  function generateStats() {
	for (const ability of abilityNames) {
	  stats[ability] = rollStat();
	}
  }
  
  const canSubmit = computed(() => {
	return name.value && race.value && charClass.value && Object.keys(stats).length;
  });
  
  const characterCreated = ref(false);
  function submit() {
	characterCreated.value = true;
  }
  </script>
  
  <style scoped>
  label {
	display: block;
  }
  </style>
  