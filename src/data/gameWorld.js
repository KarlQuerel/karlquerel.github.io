// The world around the intro's cards: in-world captions, instrument readouts, the news crawl and
// the ship's public address. Drafts for Karl to rewrite; his cards stay in gameIntro.js.
// A readout's {v} runs from `from` to `to` over `span` (shot seconds), shown with `digits`.

export const INTRO_WORLD = {
	year: {
		lower: { title: 'EARTH CONFEDERATE ARCHIVE', sub: 'RECORD 0001 · RESTORED' },
	},
	earth: {
		lower: { title: 'EARTH · SOL III', sub: 'ORBITAL SURVEY 3812.041' },
		data: [
			{ text: 'MEAN SURFACE TEMP +{v}°C', from: 29.8, to: 31.4, digits: 1, span: [1, 7] },
			{ text: 'ARABLE LAND {v}%', from: 14.2, to: 9.1, digits: 1, span: [1, 7] },
			{ text: 'POPULATION 10.2 BN' },
		],
	},
	sun: {
		lower: { title: 'SOL · STELLAR MONITOR', sub: 'LEFT THE MAIN SEQUENCE' },
		data: [
			{ text: 'RADIUS {v} R☉', from: 1.0, to: 1.38, digits: 2, span: [0.5, 9] },
			{ text: 'LUMINOSITY {v} L☉', from: 1.0, to: 2.6, digits: 2, span: [0.5, 9] },
			{ text: 'FLARE CLASS X{v}', from: 1, to: 9, digits: 0, span: [2, 8] },
		],
	},
	fields: {
		lower: { title: 'CENTRAL PLAINS · SECTOR 12', sub: 'LAST HARVEST 3806' },
		data: [
			{ text: 'GROUND TEMP {v}°C', from: 58, to: 63, digits: 0, span: [0, 9] },
			{ text: 'SOIL MOISTURE 0.4%' },
			{ text: 'AIR QUALITY: HAZARDOUS' },
		],
		ticker: [
			'HARVEST FAILURE CONFIRMED IN 31 PROVINCES',
			'WATER RATIONING EXTENDED TO THE NORTHERN BELT',
			'SUNSHADE ARRAY OUTPUT FALLS BELOW 20%',
			'CONFEDERATE ASSEMBLY CALLED TO EMERGENCY SESSION',
		],
	},
	chamber: {
		lower: {
			title: 'CONFEDERATE ASSEMBLY',
			sub: 'SESSION 4471 · MOTION 12: THE HERMES PROJECT',
		},
		data: [
			{ text: 'AYES {v}', from: 0, to: 2847, digits: 0, span: [3, 8.5] },
			{ text: 'NAYS {v}', from: 0, to: 312, digits: 0, span: [3.5, 8] },
			{ text: 'ABSTAIN {v}', from: 0, to: 41, digits: 0, span: [4, 8] },
		],
	},
	shipyard: {
		lower: { title: 'ORBITAL YARD L4', sub: 'HERMES 01–10 · FINAL FIT-OUT' },
		data: [
			{ text: 'DAY {v} OF CONSTRUCTION', from: 810, to: 812, digits: 0, span: [0, 10] },
			{ text: 'HULLS COMPLETE 10/10' },
			{ text: 'ENVOYS BOARDING {v}/10', from: 2, to: 9, digits: 0, span: [0, 10] },
		],
	},
	corridor: {
		pa: { at: 4.2, text: 'PA: ENVOYS TO CRYO DECK THREE. LAUNCH WINDOW IN FOURTEEN MINUTES.' },
	},
	cryo: {
		pa: { at: 1.4, text: 'PA: SEAL CHECK COMPLETE. SLEEP WELL, HERMES-8.' },
	},
}
