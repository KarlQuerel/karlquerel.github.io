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
      { text: 'What in the—', delay: 1200 },
      { text: 'Hey you!', delay: 1000 },
      { text: 'You’re not supposed\nto be here.', delay: 1800 },
      { text: 'Let’s get you\nout of here.', delay: 1200 },
    ],
      currentBubbleText: '',
      typingSpeed: 75,
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

.not-found-wrapper {
display: flex;
left:0%;
align-items: flex-start;
gap: 1rem;
padding: 1rem;
top:50%;
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
  width: 100%;
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
  color: black;
}


</style>