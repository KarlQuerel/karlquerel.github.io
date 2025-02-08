console.log("Particles script is running");

// Configure Particles with TSParticles
tsParticles.load("particles-js", {
	particles: {
	number: {
		value: 200, // Number of particles
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
		random: true,
		anim: {
		enable: true,
		speed: 20,
		size_min: 0.1,
		sync: false
		}
	},
	move: {
		enable: true,
		speed: 3,
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
		mode: "repulse" // Particles will move away from the mouse
		},
		onclick: {
		enable: true,
		mode: "push" // Particles will be pushed out on click
		}
	},
	modes: {
		grab: {
		distance: 400,
		line_linked: {
			opacity: 1
		}
		},
		repulse: {
		distance: 100,
		duration: 0.4
		},
		push: {
		particles_nb: 4
		}
	}
	},
	retina_detect: true
});
