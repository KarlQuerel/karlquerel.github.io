<template>
  <div>
    <!-- Background Animation (Particles) -->
    <div id="particles-js"></div>

    <!-- Under Construction Message -->
    <div>
      <h1>Under Construction</h1>
      <p>This site is currently being built. Stay tuned for more!</p>
    </div>

    <!-- Social Buttons Section -->
    <div class="social-buttons">
      <div class="share">
        <a href="mailto:karlquerel@gmail.com" target="_blank">
          <i class="nes-icon gmail is-large"></i>
        </a>
        <a href="https://github.com/KarlQuerel" target="_blank">
          <i class="nes-icon github is-large"></i>
        </a>
        <a href="https://www.linkedin.com/in/karlquerel" target="_blank">
          <i class="nes-icon linkedin is-large"></i>
        </a>
      </div>
    </div>

    <!-- Button to Trigger Click Count -->
    <button id="clicker" class="nes-btn is-error" @click="incrementCounter">
      CLICK ME
    </button>
    <p>How many brave souls have summoned their mighty index finger?</p>
    <p><span>{{ counter }}</span></p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    incrementCounter() {
      this.counter += 1;
    }
  }
};
</script>

<style scoped>
/* You can add custom styles for this component here */
</style>
