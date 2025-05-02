<template>
	<aside class="side-nav" :class="{ open: open }">
	  <button class="toggle-btn" @click="toggleNav">
		{{ open ? '«' : '»' }}
	  </button>
  
	  <ul>
		<li v-for="(item, i) in items" :key="i">
		  <a :href="item.href" class="nav-link">
			<!-- Use NES CSS icon classes -->
			<i :class="['nes-icon', item.icon, 'is-small']"></i>
			<span class="label" v-if="open">{{ item.label }}</span>
		  </a>
		</li>
	  </ul>
	</aside>
  </template>
  
  <script>
  export default {
	name: 'SideNav',
	data() {
	  return {
		open: true, // expanded by default
		items: [
		  { href: '#about', icon: 'nes-mario', label: 'About Me' },
		  { href: '#projects', icon: 'nes-pokeball', label: 'Projects' },
		  { href: '#contact', icon: 'nes-bulbasaur', label: 'Contact' },
		],
	  };
	},
	methods: {
	  toggleNav() {
		this.open = !this.open;
	  },
	},
  };
  </script>
  
  <style scoped>
  .side-nav {
	position: fixed;
	top: 0;
	left: 0;
	height: 50%;
	background: #111;
	overflow: hidden;
	width: 12rem;
	transition: width 0.2s ease-in-out;
	image-rendering: pixelated;
	display: flex;
	flex-direction: column;
	align-items: start;
	padding-top: 1rem;
  }
  
  .side-nav:not(.open) {
	width: 3vw;
	height: 50%;
  }
  
  .toggle-btn {
	background: none;
	border: none;
	color: #fff;
	font-size: 1rem;
	padding: 0.5rem;
	cursor: pointer;
	align-self: flex-end;
	font-family: 'Press Start 2P', cursive;
  }
  
  .side-nav ul {
	list-style: none;
	padding: 1rem 0;
	margin: 0;
	width: 100%;
  }
  .side-nav li + li {
	margin-top: 1.5rem;
  }
  
  .nav-link {
	display: flex;
	align-items: center;
	color: #fff;
	text-decoration: none;
	font-family: 'Press Start 2P', cursive;
	font-size: 0.75rem;
	white-space: nowrap;
	padding: 0.5rem;
  }
  
  /* NES icon tweaks */
  .nes-icon {
  margin-right: 0.5rem;
  transform: scale(0.4); /* Shrink to 50% size */
  transform-origin: left center;
}
  
  .label {
	margin-left: 0.5rem;
	opacity: 0;
	transition: opacity 0.2s ease-in-out;
  }
  
  .side-nav.open .label {
	opacity: 1;
  }
  </style>
  