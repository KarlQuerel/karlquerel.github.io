// Shot 5, the chamber: the vote, in silhouette against the window wall.
export const CHAMBER = {
	duration: 12,
	cardAt: 1,
	// The hands: the first goes up at `from`, the last wave is done by `to`, on a clock of `steps`/s.
	hands: { from: 3, to: 8, steps: 4 },
	// the speaker calls the vote: the arm comes up in two stepped stages from `at`
	speaker: { at: 2.2, steps: 4 },
	// the dust in the beams drifts on its own stepped clock
	dustSteps: 6,
	// the push down the aisle ends here and holds on the emblem
	pushEnd: 8.2,
}
