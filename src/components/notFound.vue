<template>
	<div class="not-found-wrapper">
		<div class="character-bubble-group">
			<div class="character-container">
				<img src="/assets/img/pagenotfound.gif" alt="custom character" />
			</div>
			<div class="message-bubbles">
				<div class="nes-balloon from-left is-dark">
					<p>{{ currentBubbleText }}</p>
				</div>
			</div>
			<transition name="fade">
				<div v-if="show404MenuButtons" class="not-found-buttons">
					<button class="nes-btn is-success" @click="goHome">Get me to the homepage</button>
					<button class="nes-btn is-warning" @click="stayHere">No thanks, I'll stay here</button>
					<button class="nes-btn is-disabled" >Requires Level 99 Admin Rights</button>
				</div>
			</transition>
			<transition name="fade">
				<div v-if="breakWebsiteButton" class="single-button-center">
					<button class="nes-btn is-error" @click="breakWebsite">Break it</button>
				</div>
			</transition>
		</div>
	</div>
</template>



<script>
export default {
	name: 'NotFound',
	data() {
		return {
				messages: [
			{ text: 'What in the—', delay: 1200 },
			{ text: 'Hey you!', delay: 1000 },
			{ text: 'You’re not supposed\nto be here.', delay: 1500 },
			{ text: 'Let’s get you\nout of here.', delay: 1200 },
		],
			currentBubbleText: '',
			typingSpeed: 60,
			isTyping: false,
			show404MenuButtons: false,
			breakWebsiteButton: false,
			initialSequenceDone: false
		};
	},
	mounted() {
		this.typeNextMessage(0);
	},
	methods: {
		typeNextMessage(index) {
			if (index >= this.messages.length) {
	if (!this.initialSequenceDone) {
	this.show404MenuButtons = true;
	this.initialSequenceDone = true;
	}
	return;
}

	const { text: fullText, delay } = this.messages[index];
	let i = 0;
	this.currentBubbleText = '';
	this.isTyping = true;

	const interval = setInterval(() => {
		this.currentBubbleText += fullText[i];
		i++;

		if (i >= fullText.length) {
	clearInterval(interval);
	this.isTyping = false;

	if (fullText.includes("Suit yourself")) {
	this.breakWebsiteButton = true;
	}

	setTimeout(() => {
	this.typeNextMessage(index + 1);
	}, delay);
}

	}, this.typingSpeed);
},

	goHome() {
		this.$router.push('/');
	},

	stayHere() {
	this.show404MenuButtons = false;
	this.breakWebsiteButton = false;
	this.currentBubbleText = '';

	this.messages.push(
	{ text: 'Suit yourself. Just don’t break my website.', delay: 8000 },
	{ text: 'I see you...', delay: 8000 },
	{ text: 'Don’t do it.', delay: 1500 }
	);

	this.typeNextMessage(this.messages.length - 3);
},
breakWebsite() {
	this.$router.push('/secret_link');
}

}
};

</script>


<style lang="scss" scoped>

.not-found-wrapper {
	position: relative;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	padding-bottom: 2rem;
}

.character-bubble-group {
	position: relative;
	display: inline-block;
}

.character-container img {
	width: 25vw;
	height: 50vh;
	position:relative;
	right:100%;
	bottom: 10vh;
	display:block;
}

.message-bubbles {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex-grow: 1;
	width:20%;
	position:fixed;
	top: 30vh;
	left: 45vw;
	transform: translate(-50%, -50%);
}

.nes-balloon.from-left::before {
	background-color: #ffffff94;
}

.nes-balloon.from-left::after {
	bottom: -18px;
	width: 18px;
	height: 4px;
	margin-right: 8px;
	color: #212529;
	background-color: #ffffff94;
	box-shadow: -4px 0, 4px 0, -4px 4px #ffffff94, 0 4px, -8px 4px, -4px 8px, -8px 8px;
}

.nes-balloon {
	width: 150%;
	background: #ffffff94;
	box-shadow: none;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.nes-balloon p {
	margin: 0;
	white-space: pre-wrap;
	color: $black;
}

.not-found-buttons {
	bottom:30vh;
	display: flex;
	flex-wrap: nowrap;
	align-content: center;
	justify-content: center;
	align-items: stretch;
	flex-direction: column;
	position:absolute;
	gap: 1vh;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
	opacity: 0;
}

.is-success {
	color: $black;
}
.is-warning:hover {
	color: $white;
}

.is-error {
	color: $white;
	width: 20vh;
}

.single-button-center {
	position: absolute;
	bottom: 30vh;
	left: 50%;
	transform: translateX(-50%);
}


/* HERE - to finish */
@media (max-width: 768px) {
	/* Styles for phones and small tablets */
	.message-bubbles {
	width: 10%;
	}

	.character-container img {
	width: 50vw;
	height: auto;
	}
}

</style>