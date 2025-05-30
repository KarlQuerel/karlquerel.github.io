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
			<router-link to="/secret_link" class="glitch-button" data-text="LOG IN">
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
	height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
	gap: 15rem;
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
		border-radius: 15%;


	}

	.glitch-img {
		opacity: 0;
		border-radius: 15%;
		animation: glitch 2s infinite;

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
	gap: 10rem;
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
  