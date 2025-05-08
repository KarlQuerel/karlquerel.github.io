<template>
	<div class="not-found-wrapper">
	<div class="character-container">
		<img src="/assets/pagenotfound.gif" alt="custom character" />
	</div>
	<div class="message-bubbles">
		<div class="nes-balloon from-left is-dark">
		<p>{{ currentBubbleText }}</p>
		</div>
	</div>
	</div>
</template>



<!-- HERE -->
<script>
export default {
  name: 'NotFound',
  data() {
    return {
		messages: [
  { text: 'What in the...\n...\n...', delay: 1000 },
  { text: 'Hey you!\nKindly refrain\nfrom breaking my website', delay: 1000 },
],

      currentBubbleText: '',
      typingSpeed: 150,
      bubbleDelay: 1500,
      isTyping: false,
    };
  },
  mounted() {
    this.typeNextMessage(0);
  },
  methods: {
    typeNextMessage(index) {
  if (index >= this.messages.length) return;

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

      // Use custom delay before next message
      setTimeout(() => this.typeNextMessage(index + 1), delay);
    }
  }, this.typingSpeed);
},

  },
};

</script>



<style scoped>
p {
	color: black;
	white-space:pre-wrap;
}
.not-found-wrapper {
display: flex;
align-items: flex-start;
gap: 1rem;
padding: 1rem;
}

.character-container {
flex-shrink: 0;
}

.character-container img {
width: 20%;
position:absolute;
left:0%;
}

.message-bubbles {
display: flex;
flex-direction: column;
gap: 0.5rem;
flex-grow: 1;
width:20%;
}

.nes-balloon {
  width: 100%;
  background: #ffffff94;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>