<template>
  <div class="terminal-container">
    <div class="terminal-window" :class="{ 'shake': isShaking }">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="btn red"></div>
          <div class="btn yellow"></div>
          <div class="btn green"></div>
        </div>
        <div class="terminal-title">BARELY_WORKING_TERMINAL_V0.3</div>
      </div>
      
      <div class="terminal-body" ref="terminalBody" @click="focusInput">
        <div class="terminal-line">
          <span class="prompt">></span>
          <span class="welcome-text">Welcome to my website !</span>
        </div>
        
        <div class="terminal-line">
          <span class="prompt">></span>
          <span class="help-text">Type 'help' for available commands or just type anything!</span>
        </div>
        
        <div v-for="(line, index) in terminalHistory" :key="index" class="terminal-line">
          <span v-if="line.type === 'command'" class="prompt">></span>
          <span v-if="!line.link && !line.image" :class="line.type">{{ line.content }}</span>
          <span v-else-if="line.link" :class="line.type">
            {{ line.prefix }}
            <a :href="line.link" target="_blank" class="terminal-link">{{ line.linkText }}</a>
          </span>
          <div v-else-if="line.image" class="terminal-image-container" :class="{ 'animated-runner': line.animated }">
            <img :src="line.image" :alt="line.alt || 'Terminal image'" class="terminal-image" :class="{ 'running-yako': line.animated }" />
          </div>
        </div>
        
        <div class="terminal-line current-line">
          <span class="prompt">></span>
          <div class="input-container">
            <input 
              ref="terminalInput"
              v-model="currentInput"
              @keydown.enter="executeCommand"
              @keydown.up="navigateHistory(-1)"
              @keydown.down="navigateHistory(1)"
              class="terminal-input"
              autocomplete="off"
              spellcheck="false"
            >
            <span class="custom-cursor">_</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';

const terminalBody = ref(null);
const terminalInput = ref(null);
const currentInput = ref('');
const terminalHistory = ref([]);
const commandHistory = ref([]);
const historyIndex = ref(-1);
const isShaking = ref(false);

watch(currentInput, (newValue) => {
  nextTick(() => {
    if (terminalInput.value) {
      const cursorPosition = newValue.length;
      document.documentElement.style.setProperty('--cursor-position', cursorPosition.toString());
    }
  });
});
// HERE - commands
const commands = {
  help: () => [
    { type: 'output', content: '(Some of the) Available commands:' },
    { type: 'output', content: '  help     - Show this help message' },
    { type: 'output', content: '  about    - Learn about Karl' },
    { type: 'output', content: '  contact  - Get contact information' },
    { type: 'output', content: '  clear    - Clear the terminal' },
    { type: 'output', content: '  yako     - Just a happy dog' },
    { type: 'output', content: '' },
  ],
  
  about: () => [
    { type: 'output', content: '🧑‍💻 Karl Querel - Student at 42 Paris' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Passionate software developer currently studying at 42 Paris.' },
    { type: 'output', content: 'Building creative projects and learning new technologies every day.' },
    { type: 'output', content: 'Welcome to my digital playground!' }
  ],
  

  
  contact: () => [
    { type: 'output', content: '📫 Contact Information:' },
    { type: 'output', content: '' },
    { 
      type: 'output', 
      prefix: '• Email:    ',
      link: 'mailto:karlquerel@gmail.com',
      linkText: 'karlquerel@gmail.com'
    },
    { 
      type: 'output', 
      prefix: '• GitHub:   ',
      link: 'https://github.com/KarlQuerel',
      linkText: 'github.com/KarlQuerel'
    },
    { 
      type: 'output', 
      prefix: '• LinkedIn: ',
      link: 'https://linkedin.com/in/karlquerel',
      linkText: 'linkedin.com/in/karlquerel'
    },
    { type: 'output', content: '-> You can also click on the buttons in the navigation bar' }
  ],
  
  
  // HERE - pour le fun
  alban: () => [
    { type: 'output', content: 'On est là, tu connais' }
  ],

  jess: () => [
    { type: 'output', content: 'Joyeux anniversaire Jess' }
  ],

  roberto: () => [
    { type: 'output', content: 'I told you Roberto, I told you' }
  ],

  yako: () => [
    { 
      type: 'output', 
      // image: '/assets/yako-walking.gif',
      image: '/assets/yako-running.gif',
      animated: true
    }
  ],

  clear: () => {
    terminalHistory.value = [];
    return [];
  }
};

const executeCommand = () => {
  const input = currentInput.value.trim();
  if (!input) return;
  
  // Add command to history
  terminalHistory.value.push({ type: 'command', content: input });
  commandHistory.value.unshift(input);
  historyIndex.value = -1;
  
  // Execute command
  const command = input.toLowerCase();
  if (commands[command]) {
    const output = commands[command]();
    if (Array.isArray(output)) {
      terminalHistory.value.push(...output);
    }
  } else {
    // Trigger shake effect
    isShaking.value = true;
    setTimeout(() => {
      isShaking.value = false;
    }, 600);
    
    // Custom response for unknown commands
    const responses = [
	  `"I have no idea what you mean by "${input}", ask Karl to code me better!`,
	  `I do not know "${input}", did you try asking ChatGPT?`,
	`"${input}" is not a command. But I admire the chaos.`,
	`Premium command "${input}" requires a blood sacrifice or valid credit card.`,
	`"${input}" triggered my imposter syndrome.`,
	`I'm 98% sure "${input}" was made up.`,

    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    terminalHistory.value.push({ type: 'output', content: randomResponse });
  }
  
  currentInput.value = '';
  
  // Scroll to bottom
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
    }
  });
};

const navigateHistory = (direction) => {
  if (commandHistory.value.length === 0) return;
  
  historyIndex.value += direction;
  
  if (historyIndex.value < 0) {
    historyIndex.value = -1;
    currentInput.value = '';
  } else if (historyIndex.value >= commandHistory.value.length) {
    historyIndex.value = commandHistory.value.length - 1;
  }
  
  if (historyIndex.value >= 0) {
    currentInput.value = commandHistory.value[historyIndex.value];
  }
};

const focusInput = () => {
  if (terminalInput.value) {
    terminalInput.value.focus();
  }
};

onMounted(() => {
  focusInput();
});
</script>

<style lang="scss" scoped>
.terminal-container {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-top: 5rem;
}

.terminal-window {
  width: 100%;
  max-width: 1100px;
  height: 80vh;
  background: $black;
  border: 3px dashed $retro-green;
  border-radius: 10px;
  box-shadow:
    0 0 100px $retro-green,
    inset 0 0 20px rgba(0, 255, 0, 0.1);
  overflow: hidden;
}

.terminal-header {
  background: linear-gradient(90deg, #1a1a1a, #2a2a2a);
  border-bottom: 2px solid $retro-green;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
  
  .btn {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #444;
    
    &.red { background: $light-red; }
    &.yellow { background: #ffbd2e; }
    &.green { background: #27ca3f; }
  }
}

.terminal-title {
  color: $retro-green;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.terminal-body {
  height: calc(100% - 60px);
  padding: 1rem;
  overflow-y: auto;
  background: 
    linear-gradient(rgba(0, 255, 0, 0.03) 50%, transparent 50%),
    linear-gradient(90deg, rgba(0, 255, 0, 0.03) 50%, transparent 50%);
  background-size: 2px 2px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #111;
  }
  
  &::-webkit-scrollbar-thumb {
    background: $retro-green;
    border-radius: 4px;
  }
}

.terminal-line {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.4;
  text-align: start;
  
  &.current-line {
    margin-bottom: 0;
  }
}

.prompt {
  color: $retro-green;
  margin-right: 0.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.welcome-text, .help-text {
  color: $light-blue;
}

.command {
  color: white;
}

.output {
  color: #cccccc;
  white-space: pre-wrap;
}

.terminal-link {
  color: $retro-green;
  text-decoration: none;
  border-bottom: 1px dotted $retro-green;
  transition: all 0.3s ease;
  
  &:hover {
    color: $light-blue;
    border-bottom-color: $light-blue;
    text-shadow: 0 0 5px currentColor;
  }
  
  &:active {
    color: $light-red;
  }
}

.input-container {
  position: relative;
  display: flex;
  flex: 1;
}

.terminal-input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-family: inherit;
  font-size: inherit;
  flex: 1;
  caret-color: transparent;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.custom-cursor {
  position: absolute;
  left: 0;
  top: 0;
  color: $retro-green;
  font-weight: bold;
  pointer-events: none;
  animation: blink 1s infinite;
  transform: translateX(calc(1ch * var(--cursor-position, 0)));
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (max-width: 768px) {
  .terminal-container {
    padding: 1rem;
  }
  
  .terminal-window {
    width: 95%;
    height: 85vh;
  }
  
  .terminal-body {
    font-size: 0.7rem;
  }
  
  .terminal-title {
    font-size: 0.6rem;
  }
}

.shake {
  animation: glitch-shake 0.6s ease-in-out;
}

@keyframes glitch-shake {
  0%, 100% { 
    transform: translate(0);

  }
  10% { 
    transform: translate(-1px, 1px) rotate(0.2deg);

  }
  20% { 
    transform: translate(1px, -1px) rotate(-0.2deg);

  }
  30% { 
    transform: translate(-1px, 1px) rotate(0.2deg);
    box-shadow: 0 0 100px $light-red, inset 0 0 20px rgba(255, 95, 86, 0.3);


  }
  40% { 
    transform: translate(1px, -1px) rotate(-0.2deg);
    box-shadow: 0 0 100px $light-red, inset 0 0 20px rgba(255, 95, 86, 0.3);

  }
  50% { 
    transform: translate(-1px, 1px) rotate(0.2deg);

    box-shadow: 0 0 100px $light-red, inset 0 0 20px rgba(255, 95, 86, 0.3);
  }
  60% { 
    transform: translate(1px, -1px) rotate(-0.2deg);
    box-shadow: 0 0 100px $light-red, inset 0 0 20px rgba(255, 95, 86, 0.3);
  }
  70% { 
    transform: translate(-1px, 1px) rotate(0.2deg);
    box-shadow: 0 0 100px $light-red, inset 0 0 20px rgba(255, 95, 86, 0.3);


  }
  80% { 
    transform: translate(1px, -1px) rotate(-0.2deg);

  }
  90% { 
    transform: translate(-1px, 1px) rotate(0.2deg);
  }
}

.terminal-image-container {
  margin: 1rem 0;
  text-align: center;

  &.animated-runner {
    position: relative;
    height: 70px;
    width: 100%;
    overflow: hidden;
    text-align: left;
    margin: 2rem 0;
  }
}

.terminal-image {
  max-width: 100%;
  max-height: 300px;
  
  &.running-yako {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 80px;
    width: auto;
    max-width: none;
    border: none;
    box-shadow: none;
    animation: yakoBackAndForth 10s linear infinite;
  
  }
}


@keyframes yakoBackAndForth {
  0% {
    left: -150px;
    transform: translateY(-50%) rotateY(0deg);
  }
  
  25% {
    left: calc(100% - 10px);
    transform: translateY(-50%) rotateY(0deg);
  }
  
  25.1% {
    transform: translateY(-50%) rotateY(180deg);
  }
  
  50% {
    left: calc(100% - 10px);
    transform: translateY(-50%) rotateY(180deg);
  }
  
  75% {
    left: -150px;
    transform: translateY(-50%) rotateY(180deg);
  }
  
  75.1% {
    transform: translateY(-50%) rotateY(0deg);
  }
  
  100% {
    left: -150px;
    transform: translateY(-50%) rotateY(0deg);
  }
}



@media (max-width: 768px) {
  .terminal-image {
    max-height: 200px;
    
  }
}
</style>