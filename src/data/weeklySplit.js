export const MUSCLE_LEGEND = [
	'chest',
	'back',
	'triceps',
	'biceps',
	'shoulders',
	'legs',
	'abs',
	'waist',
	'forearms',
]

export const BASE_WARMUP = {
	name: 'Base Warm-up',
	muscle: 'shoulders',
	badges: [
		{
			class: 'warm-up',
			label: 'Warm-up',
		},
		{
			class: 'easy',
			label: 'Easy',
		},
		{
			class: 'warmup-time',
			label: '5 min',
		},
	],
	meta: [
		{
			strong: 'Joint Circles',
			text: 'Wrists, neck, and elbows \u2014 smooth circles in both directions',
		},
		{
			strong: 'Shoulders',
			text: 'Goalpost rotations and band pulleys \u2014 light tension, full range',
		},
	],
}

export const WEEKLY_SPLIT = [
	{
		id: 'monday',
		day: 'MONDAY',
		kind: 'Push',
		accent: 'chest',
		chips: ['chest', 'shoulders', 'triceps', 'legs', 'abs'],
		includeBaseWarmup: true,
		blocks: [
			{
				type: 'exercise',
				name: 'Hack Squat Calf Raises',
				muscle: 'legs',
				badges: [
					{
						class: 'legs',
					},
					{
						class: 'hard',
						label: 'Hard',
					},
					{
						class: 'rest',
						label: '1.5 min',
					},
				],
				meta: [
					{
						strong: 'Setup',
						text: 'Face outward on the hack squat; legs straight with soft knees',
					},
					{
						strong: 'Form',
						text: 'Rise onto your toes; pause at the bottom for a deep calf stretch',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Seated Calf Raises',
				muscle: 'legs',
				badges: [
					{
						class: 'legs',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'rest',
						label: '1 min',
					},
				],
				meta: [
					{
						strong: 'Focus',
						text: 'Lighter weight, higher reps \u2014 chase the pump, not max load',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Specific',
				muscle: 'shoulders',
				badges: [
					{
						class: 'warm-up',
						label: 'Warm-up',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'warmup-time',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Drill',
						text: 'Scapular push-ups \u2014 12 slow reps, protract and retract fully',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Cable Flyes',
				muscle: 'chest',
				badges: [
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'chest',
					},
					{
						class: 'rest',
						label: '1 min',
					},
				],
				meta: [
					{
						strong: 'Setup',
						text: 'Arms wide; cables at chest height',
					},
					{
						strong: 'Tempo',
						text: '2-second pause at the deepest stretch',
					},
					{
						strong: 'Focus',
						text: 'Squeeze your chest at the top \u2014 not your hands',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Incline Bench Press',
				muscle: 'chest',
				badges: [
					{
						class: 'hard',
						label: 'Hard',
					},
					{
						class: 'chest',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Setup',
						text: 'Bench at setting 2 with a weight plate under the back',
					},
					{
						strong: 'Form',
						text: 'Pin shoulder blades to the bench throughout the set',
					},
					{
						strong: 'Cue',
						text: 'Drive feet into the floor for stability on heavy sets',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Weighted Dips',
				muscle: 'chest',
				badges: [
					{
						class: 'hard',
						label: 'Hard',
					},
					{
						class: 'chest',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Form',
						text: 'Lean forward slightly; flare elbows to target the chest',
					},
					{
						strong: 'Range',
						text: 'Lower until shoulders sit just below elbows \u2014 no bouncing',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Skullcrushers',
				muscle: 'triceps',
				badges: [
					{
						class: 'triceps',
					},
					{
						class: 'medium',
						label: 'Medium',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '2 min',
					},
				],
				meta: [
					{
						strong: 'Form',
						text: 'Lower dumbbells to ear level behind the head',
					},
					{
						strong: 'Grip',
						text: 'Neutral (palms facing) to protect wrists and elbows',
					},
					{
						strong: 'Cue',
						text: 'Keep elbows tucked and fixed in place',
					},
				],
			},
			{
				type: 'superset',
				muscle: 'shoulders',
				exercises: [
					{
						name: 'Lateral Raises',
						muscle: 'shoulders',
						badges: [
							{
								class: 'shoulders',
							},
							{
								class: 'easy',
								label: 'Easy',
							},
							{
								class: 'rest',
								label: '10s',
							},
						],
						meta: [
							{
								strong: 'Form',
								text: 'Lead with elbows \u2014 hands stay below elbow height',
							},
							{
								strong: 'Tempo',
								text: 'Slow on the way down; no swinging or momentum',
							},
						],
						step: 'A',
					},
					{
						name: 'Incline Rear Delt Fly',
						muscle: 'shoulders',
						badges: [
							{
								class: 'shoulders',
							},
							{
								class: 'easy',
								label: 'Easy',
							},
							{
								class: 'rest',
								label: '2 min',
							},
						],
						meta: [
							{
								strong: 'Setup',
								text: 'Incline bench at setting 2; chest on the pad',
							},
							{
								strong: 'Cue',
								text: 'Pinky finger is the highest point of each hand',
							},
						],
						step: 'B',
					},
				],
			},
		],
	},
	{
		id: 'tuesday',
		day: 'TUESDAY',
		kind: 'Pull',
		accent: 'back',
		chips: ['back', 'biceps', 'forearms', 'shoulders', 'abs'],
		includeBaseWarmup: true,
		blocks: [
			{
				type: 'exercise',
				name: 'Specific',
				muscle: 'back',
				badges: [
					{
						class: 'warm-up',
						label: 'Warm-up',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'warmup-time',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Drill',
						text: 'Dead hangs \u2014 2 sets \u00d7 45 seconds; relax the shoulders',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Bodyweight Pull-ups',
				muscle: 'back',
				badges: [
					{
						class: 'back',
					},
					{
						class: 'medium',
						label: 'Medium',
					},
					{
						class: 'rest',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Volume',
						text: '3 sets \u00d7 ~12 clean reps; full range, no kipping',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Single-Arm Machine Row',
				muscle: 'back',
				badges: [
					{
						class: 'back',
					},
					{
						class: 'hard',
						label: 'Hard',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Form',
						text: 'Start with the left arm; match reps on the right for symmetry',
					},
					{
						strong: 'Cue',
						text: 'Sternum glued to the pad \u2014 pull elbow to hip, hands are just hooks',
					},
					{
						strong: 'Setup',
						text: 'Grip the machine frame with your free hand for stability',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Neutral-Grip Lat Pulldown',
				muscle: 'back',
				badges: [
					{
						class: 'back',
					},
					{
						class: 'medium',
						label: 'Medium',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '2 min',
					},
				],
				meta: [
					{
						strong: 'Focus',
						text: 'Pull with elbows; avoid leaning back excessively',
					},
					{
						strong: 'Form',
						text: 'Squeeze shoulder blades down at the bottom of each rep',
					},
				],
			},
			{
				type: 'superset',
				muscle: 'back',
				exercises: [
					{
						name: 'Straight Arm Pulldown',
						muscle: 'back',
						badges: [
							{
								class: 'back',
							},
							{
								class: 'easy',
								label: 'Easy',
							},
							{
								class: 'rest',
								label: '10s',
							},
						],
						meta: [
							{
								strong: 'Form',
								text: "Flat back, abs braced \u2014 don't arch or stick hips out",
							},
							{
								strong: 'Cue',
								text: 'Slight bend in elbows; pull with lats, not arms',
							},
						],
						step: 'A',
					},
					{
						name: 'Bayesian Curl',
						muscle: 'biceps',
						badges: [
							{
								class: 'biceps',
							},
							{
								class: 'easy',
								label: 'Easy',
							},
							{
								class: 'rest',
								label: '2 min',
							},
						],
						meta: [
							{
								strong: 'Setup',
								text: 'Step forward from the pulley for constant tension',
							},
							{
								strong: 'Form',
								text: 'Full stretch behind the body at the bottom of each rep',
							},
						],
						step: 'B',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Hammer Curl',
				muscle: 'biceps',
				badges: [
					{
						class: 'forearm',
						label: 'Forearm',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '1 min',
					},
				],
				meta: [
					{
						strong: 'Cue',
						text: 'Crush the handles hard for forearm activation',
					},
					{
						strong: 'Tempo',
						text: 'Controlled negatives \u2014 no swinging at the shoulder',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Dumbbell Shrugs',
				muscle: 'shoulders',
				badges: [
					{
						class: 'shoulders',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'rest',
						label: '2 min',
					},
				],
				meta: [
					{
						strong: 'Volume',
						text: '3 sets \u00d7 12\u201315 reps',
					},
					{
						strong: 'Tempo',
						text: '2-second hold at the top of each shrug',
					},
				],
			},
		],
	},
	{
		id: 'thursday',
		day: 'THURSDAY',
		kind: 'Legs + Shoulders',
		accent: 'legs',
		chips: ['legs', 'shoulders', 'abs'],
		includeBaseWarmup: true,
		blocks: [
			{
				type: 'exercise',
				name: 'Specific',
				muscle: 'legs',
				badges: [
					{
						class: 'warm-up',
						label: 'Warm-up',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'warmup-time',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Drill',
						text: 'Leg swings \u2014 15 reps per leg, front-to-back and side-to-side',
					},
					{
						strong: 'Drill',
						text: 'Deep goblet squat hold \u2014 45 seconds, elbows push knees out',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Seated Calf Raises',
				muscle: 'legs',
				badges: [
					{
						class: 'legs',
					},
					{
						class: 'hard',
						label: 'Hard',
					},
					{
						class: 'rest',
						label: '1.5 min',
					},
				],
				meta: [
					{
						strong: 'Tempo',
						text: '2-second pause at the bottom; explosive up, 3-second eccentric',
					},
					{
						strong: 'Form',
						text: 'Squeeze hard at the top; drive through the big toe',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Hack Squat Calf Raises',
				muscle: 'legs',
				badges: [
					{
						class: 'legs',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'rest',
						label: '1 min',
					},
				],
				meta: [
					{
						strong: 'Focus',
						text: 'Lighter weight, high reps \u2014 flush the muscle with blood',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Hack Squat',
				muscle: 'legs',
				badges: [
					{
						class: 'legs',
					},
					{
						class: 'hard',
						label: 'Hard',
					},
					{
						class: 'rest',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Form',
						text: 'Full depth \u2014 ass to ground without rounding the lower back',
					},
					{
						strong: 'Cue',
						text: 'Feet mid-platform; push through heels on the way up',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Leg Extension',
				muscle: 'legs',
				badges: [
					{
						class: 'legs',
					},
					{
						class: 'medium',
						label: 'Medium',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '2 min',
					},
				],
				meta: [
					{
						strong: 'Tempo',
						text: '1-second hold at the top; slow controlled eccentric',
					},
					{
						strong: 'Focus',
						text: 'Point toes up at the top to fully contract the quads',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Leg Curl',
				muscle: 'legs',
				badges: [
					{
						class: 'legs',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '1 min',
					},
				],
				meta: [
					{
						strong: 'Focus',
						text: "Feel the hamstrings working \u2014 don't lean forward into the pad",
					},
					{
						strong: 'Tempo',
						text: 'Pause briefly at the top; control the weight on the way down',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Hip Abduction',
				muscle: 'legs',
				badges: [
					{
						class: 'legs',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'rest',
						label: '1 min',
					},
				],
				meta: [
					{
						strong: 'Focus',
						text: 'Outer hip and glute medius \u2014 press knees out against the pads',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Overhead Press',
				muscle: 'shoulders',
				badges: [
					{
						class: 'shoulders',
					},
					{
						class: 'medium',
						label: 'Medium',
					},
					{
						class: 'rest',
						label: '2 min',
					},
				],
				meta: [
					{
						strong: 'Setup',
						text: 'Seated on bench at setting 3; dumbbells at shoulder height',
					},
					{
						strong: 'Form',
						text: "Press straight up; don't flare elbows excessively",
					},
				],
			},
		],
	},
	{
		id: 'friday',
		day: 'FRIDAY',
		kind: 'Upper Body',
		accent: 'triceps',
		chips: ['chest', 'back', 'biceps', 'triceps', 'forearms'],
		includeBaseWarmup: true,
		blocks: [
			{
				type: 'exercise',
				name: 'Specific',
				muscle: 'chest',
				badges: [
					{
						class: 'warm-up',
						label: 'Warm-up',
					},
					{
						class: 'easy',
						label: 'Easy',
					},
					{
						class: 'warmup-time',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Drill',
						text: 'Push-ups \u2014 15 reps, full range, controlled tempo',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Bench Press',
				muscle: 'chest',
				badges: [
					{
						class: 'chest',
					},
					{
						class: 'hard',
						label: 'Hard',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Form',
						text: 'Pin shoulder blades back and down before each rep',
					},
					{
						strong: 'Cue',
						text: 'Drive feet into the floor; touch chest to the bar',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Bodyweight Pull-ups',
				muscle: 'back',
				badges: [
					{
						class: 'back',
					},
					{
						class: 'hard',
						label: 'Hard',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '3 min',
					},
				],
				meta: [
					{
						strong: 'Volume',
						text: 'Work to failure \u2014 every rep counts',
					},
					{
						strong: 'Form',
						text: 'Full hang at the bottom; chin clears the bar at the top',
					},
				],
			},
			{
				type: 'exercise',
				name: 'Pec Flyes',
				muscle: 'chest',
				badges: [
					{
						class: 'chest',
					},
					{
						class: 'medium',
						label: 'Medium',
					},
					{
						class: 'drop-set',
						label: 'Drop Set',
					},
					{
						class: 'rest',
						label: '2 min',
					},
				],
				meta: [
					{
						strong: 'Setup',
						text: 'Machine or cable \u2014 whichever gives the best stretch',
					},
					{
						strong: 'Focus',
						text: "Squeeze chest at the top; don't let shoulders roll forward",
					},
				],
			},
			{
				type: 'superset',
				muscle: 'triceps',
				exercises: [
					{
						name: 'Overhead Cable Triceps Extension',
						muscle: 'triceps',
						badges: [
							{
								class: 'triceps',
							},
							{
								class: 'medium',
								label: 'Medium',
							},
							{
								class: 'rest',
								label: '15s',
							},
						],
						meta: [
							{
								strong: 'Setup',
								text: 'Low pulley; rope or bar behind the head',
							},
							{
								strong: 'Focus',
								text: 'Deep stretch at the bottom of each rep',
							},
						],
						step: 'A',
					},
					{
						name: 'Cable Rope Pushdowns',
						muscle: 'triceps',
						badges: [
							{
								class: 'triceps',
							},
							{
								class: 'medium',
								label: 'Medium',
							},
							{
								class: 'rest',
								label: '1.5 min',
							},
						],
						meta: [
							{
								strong: 'Setup',
								text: 'High pulley with rope attachment',
							},
							{
								strong: 'Form',
								text: 'Split the rope apart at full extension',
							},
						],
						step: 'B',
					},
				],
			},
			{
				type: 'superset',
				muscle: 'biceps',
				exercises: [
					{
						name: 'Seated Bicep Curl',
						muscle: 'biceps',
						badges: [
							{
								class: 'biceps',
							},
							{
								class: 'easy',
								label: 'Easy',
							},
							{
								class: 'rest',
								label: '15s',
							},
						],
						meta: [
							{
								strong: 'Form',
								text: 'Clean reps with controlled negatives \u2014 no body English',
							},
						],
						step: 'A',
					},
					{
						name: 'High Plank',
						muscle: 'waist',
						badges: [
							{
								class: 'waist',
							},
							{
								class: 'medium',
								label: 'Medium',
							},
							{
								class: 'rest',
								label: '1.5 min',
							},
						],
						meta: [
							{
								strong: 'Volume',
								text: 'Hold until failure',
							},
							{
								strong: 'Cue',
								text: 'Pull belly button in; maintain a straight line head to heels',
							},
						],
						step: 'B',
					},
				],
			},
		],
	},
]
