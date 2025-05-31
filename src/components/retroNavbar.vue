<template>
	<nav class="navbar" :class="{ 'menu-active': isMenuOpen }">
	  <div class="navbar-container">
		<router-link to="/" class="logo" @click="closeMenu">
  <img src="/assets/Yako_logo_128.png" class="default-img" alt="Logo" />
  <img src="/assets/Yako_logo_128.png" class="glitch-img" alt="Logo Glitch" />
</router-link>
		<div class="menu-toggle" @click="toggleMenu">
		  <div class="bar"></div>
		  <div class="bar"></div>
		  <div class="bar"></div>
		</div>
		<ul class="nav-links" :class="{ 'active': isMenuOpen }">
		  <li>
			<router-link to="/under_construction" class="glitch-button" data-text="COMING SOON" @click="closeMenu">
			  <span>COMING SOON</span>
			</router-link>
		  </li>
		  <li>
			<router-link to="/secret_link" class="glitch-button" data-text="LOG IN" @click="closeMenu">
			  <span>LOG IN</span>
			</router-link>
		  </li>
		  <div class="share">
			<a href="mailto:karlquerel@gmail.com" target="_blank">
				<i class="nes-icon gmail is-medium"></i>
			</a>
			<a href="https://github.com/KarlQuerel" target="_blank">
				<i class="nes-icon github is-medium"></i>
			</a>
			<a href="https://www.linkedin.com/in/karlquerel" target="_blank">
				<i class="nes-icon linkedin is-medium"></i>
			</a>
		  </div>
		</ul>
	  </div>
	</nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style lang="scss" scoped>
.navbar {
	background: rgba(0, 0, 0, 0.9);
	border: 0.3vh dashed $retro-green;
	border-top:0;
	border-radius: 0 0 20px 20px;
	height: 10vh;
	position: fixed;
	top: 0;
	left: 50%;
	right: 0;
	transform: translate(-50%);
	z-index: 1020;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	width: 60%;
	min-height: 60px;
	transition: all 0.3s ease;

	&.menu-active {
		border: 0;
		background: transparent;
		box-shadow: none;
	}
}

.navbar-container {
	max-width: 100%;
	margin: 0 auto;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 2rem;
}

.logo {
	height: 100%;
	display: flex;
	align-items: center;
	position: relative;
	max-width: 20%;
	min-width: 40px;
	
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		position: relative;
	}

	.default-img {
		position: relative;
		border-radius: 15%;
	}

	.glitch-img {
		opacity: 0;
		border-radius: 15%;
		animation: glitch 2s infinite;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	&:hover {
		.default-img {
			opacity: 0;
		}

		.glitch-img {
			opacity: 1;
		}
	}
}

.nav-links {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	gap: 5rem;
	align-items: center;


	li {
	  a {
		color: white;
		text-decoration: none;
		transition: all 0.2s ease;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 50px;
		min-height: 50px;
	  }

	  // Glitch Effect for Secret
	  .glitch-button {
		position: relative;
		transition: all 0.1s ease;
		
		&::before,
		&::after {
		  content: attr(data-text);
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background: dark;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  opacity: 0;
		  transition: opacity 0.3s ease;
		}

		&::before {
		  left: 2px;
		  text-shadow: -5px 0 #fffb00;
		  animation: glitch-1 2s infinite linear alternate-reverse;
		}

		&::after {
		  left: -2px;
		  text-shadow: 5px 0 rgb(255, 0, 0);
		  animation: glitch-2 3s infinite linear alternate-reverse;
		}

		span {
		  position: relative;
		  z-index: 1;
		}

		&:hover {
		  transform: scale(1.05);
		  &::before,
		  &::after {
			opacity: 1;
		  }
		}
	  }
	}
}

@keyframes glitch-1 {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

@keyframes glitch-2 {
  0% {
    clip-path: inset(15% 0 35% 0);
  }
  20% {
    clip-path: inset(55% 0 15% 0);
  }
  40% {
    clip-path: inset(45% 0 45% 0);
  }
  60% {
    clip-path: inset(75% 0 10% 0);
  }
  80% {
    clip-path: inset(15% 0 65% 0);
  }
  100% {
    clip-path: inset(25% 0 25% 0);
  }
}

@keyframes glitch {
  0% {
    transform: translate(0) scale(1) rotate(0deg);
  }
  15% {
    transform: translate(-3px, 3px) scale(1.02) rotate(-1deg);
  }
  30% {
    transform: translate(3px, -3px) scale(0.98) rotate(1deg);
  }
  45% {
    transform: translate(-2px, -2px) scale(1.01) rotate(-2deg);
  }
  60% {
    transform: translate(2px, 2px) scale(1.03) rotate(2deg);
  }
  75% {
    transform: translate(-1px, 1px) scale(0.99) rotate(-1deg);
  }
  100% {
    transform: translate(0) scale(1) rotate(0deg);
  }
}


@keyframes pixelScan {
  0% {
    opacity: 0.2;
    filter: brightness(1.2);
  }
  50% {
    opacity: 0.4;
    filter: brightness(2);
  }
  100% {
    opacity: 0.2;
    filter: brightness(1.2);
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 35px;
  height: 21px;
  z-index: 1030;
  position: relative;
  padding: 2px;
  border: 2px solid $retro-green;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 3px 3px 0 $retro-green;


  &:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  .bar {
    width: 100%;
    height: 3px;
    background-color: $retro-green;
    transition: all 0.3s ease;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: $retro-green;
      opacity: 0;
    }

  }
}

@media (max-width: 1024px) {
	.navbar {
		width: 80%;
	}

	.navbar-container {
		padding: 0 1.5rem;
	}

	.nav-links {
		gap: 5rem;
	}
}

@media (max-width: 768px) {
	.navbar {
		width: 95%;
	}

	.navbar-container {
		padding: 0 1rem;
		justify-content: space-between;
		padding: 0 1rem;
		gap: 0;
	}

	.menu-toggle {
		display: flex;
	}

	.nav-links {
		position: fixed;
		top: 0;
		left: 85%;
		width: 20%;
		height: 90vh;
		background: rgba(0, 0, 0, 0.95);
		flex-direction: column;
		justify-content: flex-end;
		gap: 2rem;
		transition: right 0.3s ease;
		border-left: 0.3vh dashed $retro-green;
		border-bottom: 0.3vh dashed $retro-green;
		border-bottom-left-radius: 20px;
		padding: 2rem;
		opacity: 0;
		visibility: hidden;

		&.active {
			right: 0;
			opacity: 1;
			visibility: visible;
		}

		.share {
			margin-top: 2rem;
			margin-right: 2vh;
			display: flex;
			flex-direction: column;
			gap: 2rem;
			align-items: center;

			a {
				transform: scale(1.2);
				transition: transform 0.3s ease;

				&:hover {
					transform: scale(1.4);
				}
			}
		}
	}

	.logo {
		max-width: 25%;
		height: 100%;
		padding: 0.3rem;
		
		img {
			height: 100%;
		}
	}
}

@media (max-width: 480px) {
	.navbar {
		width: 100%;
		border-radius: 0;
	}

	.navbar-container {
		padding: 0 0.5rem;
		justify-content: space-between;
	}

	.logo {
		max-width: 20%;
		height: 100%;
		padding: 0.2rem;
		
		img {
			height: 90%;
		}
	}

	.menu-toggle {
		display: flex;
		width: 25px;
		height: 18px;
		padding: 1px;
		border: 1px solid $retro-green;
		box-shadow: 2px 2px 0 $retro-green;

		.bar {
			height: 2px;
		}
	}

	.nav-links {
		width: 50%;
		left: 50%;

		&.active {
			left: 50%;
		}
	}
}
</style>
  