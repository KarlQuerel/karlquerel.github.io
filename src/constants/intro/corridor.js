// Shot 6, the corridor: every second of the walk to the door, and what the visor does on the way.
export const CORRIDOR = {
	cardAt: 1,
	// the visor comes up here
	hudAt: 2.2,
	// the hands rise into frame with the picked tool
	handsRise: 0.8,
	// the walk ends short of the door at `arrival`: an unhurried pace past five bays, the bob a
	// stride and a quarter a second
	arrival: 15.5,
	bobHz: 1.25,
	// how much of the walk is eased out (1) rather than walked at an even pace (0)
	walkEase: 0.3,
	// the door's light comes up over the last stretch; the lockers light once we stop
	glowFrom: 3,
	glowRest: 0.35,
	lockersRise: 1.2,
	// a beat after the hands are up before the cut
	pickBeat: 0.8,
}
