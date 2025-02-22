console.log("Particles script is running");

// Configure Particles with TSParticles
tsParticles.load("particles-js", {
	particles: {
	number: {
		value: 600, // Number of particles
		density: {
		enable: true,
		value_area: 1800 // Density of the particles
		}
	},
	shape: {
		type: "image", // Shape of particles
		image: [
		{ src: "assets/favicon.png", width: 50, height: 50 }
		]
	},
	opacity: {
		value: 0.5,
		random: true,
		anim: {
		enable: true,
		speed: 1,
		opacity_min: 0.1,
		sync: false
		}
	},
	size: {
		value: 25,
		random: false,
		anim: {
		enable: true,
		speed: 20,
		size_min: 1,
		sync: false
		}
	},
	move: {
		enable: true,
		speed: 1,
		direction: "random",
		random: true,
		straight: false,
		out_mode: "out",
		attract: {
		enable: false
		}
	}
	},
	interactivity: {
	detect_on: "window",
	events: {
		onhover: {
		enable: true,
		mode: "repulse"
		},
		onclick: {
		enable: true,
		mode: "push"
		}
	},
	modes: {
		repulse: {
		distance: 75,
		duration: 0.5
		},
		push: {
		particles_nb: 1
		}
	}
	},
	retina_detect: true
});
