<template>
	<div class="game-cinematics">
		<div class="cinematics-container">
			<div class="cinematics-message" style="animation-delay: 4s">
				<span class="letter" v-for="(letter, index) in 'War has bled the kingdom dry'" :key="index" :style="{ animationDelay: `${4 + (index * 0.05)}s` }">
					{{ letter === ' ' ? '\u00A0' : letter }}
				</span>
			</div>
			<div class="cinematics-message" style="animation-delay: 7s">
				<span class="letter" v-for="(letter, index) in 'Famine grips the soil'" :key="index" :style="{ animationDelay: `${7 + (index * 0.05)}s` }">
					{{ letter === ' ' ? '\u00A0' : letter }}
				</span>
			</div>
			<div class="cinematics-message" style="animation-delay: 9s">
				<span class="letter" v-for="(letter, index) in 'Highborns squabble over ruins'" :key="index" :style="{ animationDelay: `${9 + (index * 0.05)}s` }">
					{{ letter === ' ' ? '\u00A0' : letter }}
				</span>
			</div>
			<div class="cinematics-message" style="animation-delay: 11s">
				<span class="letter" v-for="(letter, index) in 'While the people pray to silent gods'" :key="index" :style="{ animationDelay: `${11 + (index * 0.05)}s` }">
					{{ letter === ' ' ? '\u00A0' : letter }}
				</span>
			</div>
			<div class="cinematics-message" style="animation-delay: 13s">
				<span class="letter" v-for="(letter, index) in 'The order of old is but a memory'" :key="index" :style="{ animationDelay: `${13 + (index * 0.05)}s` }">
					{{ letter === ' ' ? '\u00A0' : letter }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
// You can animate this or trigger it with game state
</script>

<style lang="scss" scoped>
.game-cinematics {
	position: relative;
	width: 100%;
	height: 100%;
}

.cinematics-container {
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.cinematics-message {
	position: relative;
	width: 100%;
	color: $yellow;
	font-size: 2rem;
	opacity: 1;
	text-shadow: 0 0 10px $black;
	z-index: 1001;
	text-align: center;
	text-transform: uppercase;
}

.letter {
	display: inline-block;
	opacity: 0;
	animation: fadeIn 1s ease-in forwards;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes messageSlideInLeft {
	from {
		opacity: 0;
		transform: translate(-100%, -50%);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%);
	}
}

@keyframes messageSlideInRight {
	from {
		opacity: 0;
		transform: translate(0%, -50%);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%);
	}
}

.game-cinematics-content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	color: $yellow;
	opacity: 0;
	animation: fadeIn 2s ease-in forwards;
	text-shadow: 0 0 10px $retro-green;
	z-index: 1001;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>