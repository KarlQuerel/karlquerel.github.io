// The acts after the intro: the ship's voice and the choices, one table per scene. DRAFT wording,
// written to be replaced: Karl owns the words. Every line is one short typed sentence.

export const ACT_WRECK = {
	voice: {
		wake: 'YOU ARE UP. THE HULL IS OPEN AFT. I HAVE SEALED WHAT I CAN.',
		pod: 'THE SECOND POD TORE LOOSE IN THE CRASH. THEY NEVER WOKE.',
		vent: 'AFT SEALED. HULL HOLDING. CREW: ONE.',
		keep: 'UNDERSTOOD. THEY STAY WITH US.',
		log: 'DAY 141,209. ORBIT DECAYING. NINE SHIPS DARK. HERMES-8 ALONE.',
		tx: 'TRANSMITTER: NO CARRIER. THE DISH WENT WITH THE AFT SECTION.',
		descend: 'THE POD CAN MAKE THE DROP ONCE. WE GO DOWN WITH WHAT WE HAVE.',
	},
	hints: {
		suit: 'TAB FOR THE SUIT, SHIFT TO RUN',
		log: 'E TO READ',
		tx: 'E TO CHECK',
	},
	choices: {
		pod: [
			{ key: 'vent', label: 'VENT THE POD' },
			{ key: 'keep', label: 'LEAVE THEM' },
		],
		descend: [
			{ key: 'go', label: 'RIDE THE POD DOWN' },
			{ key: 'wait', label: 'NOT YET' },
		],
	},
}

export const ACT_SURFACE = {
	voice: {
		land: 'DOWN. THE POD WILL NOT FLY AGAIN. THE DISH IS IN THE WRECKAGE.',
		dish: 'DISH TAKEN. IT NEEDS HIGH GROUND AND A CLEAR SKY.',
		air: 'THE AIR READS CLOSE TO EARTH. I CANNOT PROMISE IT.',
		airOk: 'YOU BREATHE. IT HOLDS. THE TANK IS FILLING.',
		airBad: 'IT DOES NOT HOLD.',
		water: 'WATER. THE SAMPLE IS AT THE BOTTOM.',
		waterOk: 'WATER: CLEAN. IT WOULD DRINK.',
		waterBad: 'WATER: ACID. THE SUIT IS BURNING. GET OUT.',
		scan: 'THE SCANNER DRAWS ON THE TRANSMITTER. USE IT WHERE IT COUNTS.',
		groundOk: 'LIFE. THE FRONDS ARE ALIVE.',
		groundBad: 'NO LIFE. THE FRONDS ARE MINERAL.',
		ridge: "HIGH GROUND. EARTH IS UP. THE SEND TAKES THE SUIT'S AIR.",
		noDish: 'HIGH GROUND, AND NOTHING TO RAISE. THE DISH IS BACK AT THE POD.',
		unsure: 'YOU HAVE NOT FINISHED LOOKING. A GREEN IS A PROMISE.',
		o2Low: 'AIR AT A QUARTER.',
	},
	hints: {
		dish: 'E TO TAKE THE DISH',
		sample: 'E TO TAKE THE SAMPLE',
		scan: 'HOLD THE RIGHT BUTTON TO SCAN',
	},
	choices: {
		air: [
			{ key: 'open', label: 'OPEN THE HELMET' },
			{ key: 'sealed', label: 'KEEP IT SEALED' },
		],
		send: [
			{ key: 'green', label: 'SEND GREEN' },
			{ key: 'silent', label: 'STAY SILENT' },
		],
	},
}

// after an ending: the one choice, to go again from the wreck
export const ENDING_AGAIN = [{ key: 'again', label: 'AGAIN' }]

// The endings, read off the meters: a title over the world, or black, and the voice's last line.
export const ENDINGS = {
	green: {
		lead: 'GREEN',
		accent: 'EARTH BUILDS THE ARKS',
		line: 'THE WORD IS OUT. THE AIR IS NOT.',
	},
	'green-alive': {
		lead: 'GREEN',
		accent: 'ALIVE',
		line: 'THE WORD IS OUT. YOU ARE ALONE ON THE WORLD YOU SAVED.',
	},
	silence: { lead: 'HERMES-8', accent: 'SIGNAL LOST', line: 'YOU LIVE. THE WORD NEVER LEAVES.' },
	lie: {
		lead: 'GREEN',
		accent: 'TEN BILLION ARE COMING',
		line: 'IT IS NOT A LIVING WORLD. THEY DO NOT KNOW THAT.',
	},
	dead: { lead: 'HERMES-8', accent: 'SIGNAL LOST', line: 'DAY 141,211. THE SUIT GOES QUIET.' },
}
