<template>
	<nav class="navbar">
	  <div class="navbar-container">
		<div class="logo">
		  <img src="/assets/Yako_logo_128.png" class="default-img" alt="Logo" />
		  <img src="/assets/Yako_logo_128.png" class="glitch-img" alt="Logo Glitch" />
		</div>
		<ul class="nav-links">
		  <li>
			<router-link to="/" class="scanline-button">
			  <span> Home</span>
			  <div class="scanline"></div>
			</router-link>
		  </li>
		  <li>
			<router-link to="/gametest" class="matrix-button">
			  <span class="matrix-text">🎮 Game Test</span>
			  <div class="matrix-rain"></div>
			</router-link>
		  </li>
		  <li>
			<router-link to="/secret_link" class="glitch-button" data-text="🗝️ Secret">
			  <span>🗝️ Secret</span>
			</router-link>
		  </li>
		</ul>
	  </div>
	</nav>
  </template>
  
  <script setup>
  // No script logic needed for now
  </script>
  
  <style lang="scss" scoped>
  .navbar
{
	background: rgba(0, 0, 0, 0.9);
	border-bottom: 0.1vh solid #00ff00;
	border-left: 0.1vh solid #00ff00;
	border-right: 0.1vh solid #00ff00;

	height: 10vh;
	position: fixed;
	top: 0;
	left: 50%;
	right: 0;
	transform: translate(-50%);
	z-index: 1020;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	width:60%;
}

.navbar-container {
	max-width: 100%;
	margin: 0 auto;
	padding: 0 1rem;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.logo {
	height: 100%;
	display: flex;
	align-items: center;
	position: relative;
	
	img {
	  height: 100%;
	  width: auto;
	  object-fit: contain;
	  position: absolute;
	  top: 0;
	  left: 0;

	}

	.default-img {
	  position: relative;

	}

	.glitch-img {
	  opacity: 0;
	  filter: hue-rotate(70deg);
	  animation: glitch 1s infinite;

	}

	&:hover {
	  .glitch-img {
		opacity: 0.8;
	  }
	}
}

.nav-links {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	gap: 2rem;
	align-items: center;
	opacity: 1;

	li {
	  a {
		font-family: 'Press Start 2P', monospace;
		color: var(--base-green);
		text-decoration: none;
		font-size: 0.8rem;
		transition: all 0.2s ease;
		padding: 0.5rem;
		border: 1px solid transparent;
		position: relative;
		display: block;
		text-align: center;
		opacity: 1;

		&:hover {
		  color: #fff;
		  border-color: var(--base-green);
		  background: rgba(0, 255, 0, 0.1);
		}

		&.router-link-exact-active {
		  color: #fff;
		  border-color: var(--base-green);
		  background: rgba(0, 255, 0, 0.15);
		}
	  }

	  // Scanline Effect for Home
	  .scanline-button {
		overflow: hidden;
		transition: all 0.3s ease;
		
		.scanline {
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background: linear-gradient(
			to bottom,
			transparent 50%,
			rgba(0, 255, 0, 0.1) 50%
		  );
		  background-size: 100% 4px;
		  pointer-events: none;
		  animation: scanline 4s linear infinite;
		  z-index: 1;
		}

		span {
		  position: relative;
		  z-index: 2;
		}

		&:hover {
		  transform: scale(1.05);
		  .scanline {
			animation: scanline 2s linear infinite;
			background: linear-gradient(
			  to bottom,
			  transparent 50%,
			  rgba(0, 255, 0, 0.2) 50%
			);
		  }
		}
	  }

	  // Matrix Effect for Game Test
	  .matrix-button {
		overflow: hidden;
		transition: all 0.3s ease;
		
		.matrix-text {
		  position: relative;
		  z-index: 2;
		}

		.matrix-rain {
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background: linear-gradient(
			to bottom,
			transparent,
			rgba(0, 255, 0, 0.15) 50%,
			transparent
		  );
		  animation: matrix-rain 3s linear infinite;
		  z-index: 1;
		}

		&:hover {
		  transform: scale(1.05);
		  .matrix-rain {
			animation: matrix-rain 1.5s linear infinite;
			background: linear-gradient(
			  to bottom,
			  transparent,
			  rgba(0, 255, 0, 0.3) 50%,
			  transparent
			);
		  }
		}
	  }

	  // Glitch Effect for Secret
	  .glitch-button {
		position: relative;
		transition: all 0.3s ease;
		
		&::before,
		&::after {
		  content: attr(data-text);
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background: var(--base-dark);
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  opacity: 0;
		  transition: opacity 0.3s ease;
		}

		&::before {
		  left: 2px;
		  text-shadow: -2px 0 #f0f;
		  animation: glitch-1 2s infinite linear alternate-reverse;
		}

		&::after {
		  left: -2px;
		  text-shadow: 2px 0 #0ff;
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

@keyframes scanline {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes matrix-rain {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}

@keyframes glitch-1 {
  0% {
    clip-path: inset(20% 0 30% 0);
  }
  20% {
    clip-path: inset(60% 0 10% 0);
  }
  40% {
    clip-path: inset(40% 0 50% 0);
  }
  60% {
    clip-path: inset(80% 0 5% 0);
  }
  80% {
    clip-path: inset(10% 0 70% 0);
  }
  100% {
    clip-path: inset(30% 0 20% 0);
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

@media (max-width: 768px) {
	.navbar-container {
	  flex-direction: column;
	  justify-content: center;
	  gap: 0.5rem;
	}

	.nav-links {
	  gap: 1rem;
	  
	  li a {
		font-size: 0.6rem;
	  }
	}
}
  </style>
  