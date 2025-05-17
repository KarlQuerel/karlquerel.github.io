<template>
	<nav class="navbar">
	  <div class="navbar-container">
		<div class="logo">
		  <img src="/assets/Yako_logo_128.png" class="default-img" alt="Logo" />
		  <img src="/assets/Yako_logo_128.png" class="glitch-img" alt="Logo Glitch" />
		</div>
		<ul class="nav-links">
		  <li>
			<router-link to="/" class="glitch-button" data-text="HOME">
			  <span>HOME</span>
			</router-link>
		  </li>
		  <li>
			<router-link to="/invalidroute" class="glitch-button" data-text="ERROR">
			  <span>.</span>
			</router-link>
		  </li>
		  <li>
			<router-link to="/secret_link" class="glitch-button" data-text="LOG IN">
			  <span>LOG IN</span>
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
	border: 0.3vh dashed #00ff00;
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
	gap: 5rem;
	align-items: center;


	li {
	  a {
		color: white;
		text-decoration: none;
		transition: all 0.2s ease;
		// padding: 1rem 2rem;
		padding: 1.5rem 2rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 150px;
		min-height: 50px;

		&.router-link-exact-active {
		  color: #fff;
		  border-color: var(--base-green);
		  background: rgba(0, 255, 0, 0.15);
		}

		&[data-text="HOME"] {
		  position: relative;
		  overflow: hidden;
		  border: 2px solid transparent;
		  transition: all 0.3s ease;

		  &::before,
		  &::after {
			content: '';
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: repeating-linear-gradient(
			  90deg,
			  transparent,
			  transparent 2px,
			  #00ff00 2px,
			  #00ff00 4px
			);
			opacity: 0;
			transition: all 0.3s ease;
			pointer-events: none;
		  }

		  &::before {
			left: -100%;
		  }

		  &::after {
			right: -100%;
		  }

		  &:hover {
			transform: scale(1.05);
			border-color: #00ff00;
			box-shadow: 0 0 5px #00ff00, inset 0 0 5px #00ff00;
			text-shadow: 0 0 5px #00ff00;

			&::before {
			  left: 0;
			  opacity: 0.2;
			  animation: pixelScan 1s linear infinite;
			}

			&::after {
			  right: 0;
			  opacity: 0.2;
			  animation: pixelScan 1s linear infinite reverse;
			}
		  }
		}
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
		  text-shadow: -10px 0 #00ff00;
		  animation: glitch-1 2s infinite linear alternate-reverse;
		}

		&::after {
		  left: -2px;
		  text-shadow: 10px 0 #0ff;
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
  