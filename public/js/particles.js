console.log("Particles script is running");

const matrixChars = [
	// Numbers
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	// Uppercase letters
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
	"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	// Lowercase letters
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
	// Special characters
	"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+",
	"=", "{", "}", "[", "]", "|", "\\", ":", ";", "'", "\"", "<", ">",
	",", ".", "?", "/", "~", "`"
];

tsParticles.load("particles-js", {
	particles: {
		number: {
			value: 350,
			density: {
				enable: true,
				value_area: 800
			}
		},
		color: {
			value: "#00ff00"
		},
		shape: {
			type: "character",
			character: {
				value: matrixChars,
				font: "Press Start 2P",
				style: "normal",
				weight: "400"
			}
		},
		opacity: {
			value: 0.8,
			random: true,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0.1,
				sync: false
			}
		},
		size: {
			value: 16,
			random: {
				enable: true,
				value_min: 12,
				value_max: 20
			}
		},
		move: {
			enable: true,
			speed: 15,
			direction: "bottom",
			straight: true,
			out_mode: "out",
			attract: {
				enable: false
			},
			random: true,
			randomSpeed: true,
			minSpeed: 5,
			maxSpeed: 50
		},
		line_linked: {
			enable: false
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
