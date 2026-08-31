# SIGNAL LOST — story bible

Living document for the /game rebuild. Everything here is scaffolding — wording,
names, and numbers are all up for grabs.

---

## Premise

**Year 3812.** The sun is dying the way stars actually die: not fading, but
swelling — red, relentless, eating the sky. The harvests went first. Earth has
decades, not centuries.

## The Hermes Initiative

The last telescopes flagged a handful of candidate worlds. But a telescope
cannot taste air or touch water — someone has to stand on the ground and
confirm it.

So the Earth Confederate built the **Hermes fleet: sixty ships, one envoy
each, one per candidate world.** Each ship carries just enough fuel to arrive,
a cryo pod, and one tight-beam transmitter aimed at Earth.

**Hermes does not come back. Hermes calls back.**

When an envoy confirms a living world, they send one signal: **green**. Earth
builds the arks only when a green arrives. That is how a scout saves ten
billion people — with one bit of information.

The no-return is not cruelty, it is arithmetic: fuel to come home would double
every ship's mass — half as many worlds checked. One-way is the price of
coverage, and every volunteer did that math themselves. Centuries pass in
transit anyway; there was never a home to return to.

## The spine

The crash breaks the transmitter. *Signal Lost* is not just the title — it is
the quest:

> **Survive long enough to send the word — and when survival and the signal
> conflict, which do you choose?**

Every choice in the game bends around that tension. It is the moral axis the
branching hangs from, and it makes the endings design themselves (see below).

---

## Intro storybook

POV rule: beats 1–3 are omniscient (title cards over animation). From beat 4
onward the story is first person and **never breaks POV again** — the moment
it becomes yours is the moment you climb into the tube.

1. **THE SUN** — *title cards over a palette-banded swelling sun.*
   Year 3812. Earth is dying. Short declarative lines, crawl cadence.

2. **THE FLEET** — *orbital shipyard silhouetted against the red sun, sixty
   identical ships in cradles.* The Earth Confederate's answer — civilization's
   last industrial act. (Deliberately not a government building: the image
   should say desperation at scale, not bureaucracy.)

3. **THE SIXTY** — *a wall of sixty lights, one per ship, one per world.* Your
   light blinks on: HERMES-9. This board is a recurring motif.

4. **THE ROOM** — *POV begins.* Other envoys suiting up in silence — not your
   crew, your siblings, each bound for a different star. Into the tube. Glass
   fogs. Eyes close.

5. **THE CROSSING** — *the board of sixty again, across the black.* Over the
   centuries the lights go out one by one: `HERMES-4: SIGNAL LOST` ·
   `HERMES-31: SIGNAL LOST`. The title does its work before the game starts.
   You wake alone because everyone is alone.
   (Cheaper and colder than killing shipmates on-screen — the sister ships die
   instead.)

6. **THE WAKE** — *eyes open on the cockpit, POV, alarms.* Hull integrity
   failing, nav offline, gravity well detected (the old HERO_WAKE HUD copy —
   in git history at `886a840^` — was already right; day counter DAY 141,209,
   CREW 1/1). The planet fills the glass. Crash. Cut to black. The first
   choice of the game follows.

---

## The companion

The ship — a voice, not a person. A choice game needs someone to phrase
choices against; the ship AI is always present, costs no character art, and
can degrade through the story (glitching speech, failing memory) so the
dialogue partner's arc mirrors the broken transmitter.

Optional single gut-punch of human loneliness: a second cryo pod that failed
mid-crossing. Wordless, one scene. Crew count stays 1/1.

## Endings (sketch)

The spine generates them:

- **Green.** Signal sent, you don't survive it. Earth builds the arks.
- **Green, alive.** Signal sent, you live — alone, on the world you saved.
- **Silence.** You live, but the word never leaves. HERMES-9: SIGNAL LOST.
- **The lie.** You send green to a world that isn't. Ten billion people are
  coming.

## Practical notes

- Intro must be skippable (`SKIP >>`) and reduced-motion-safe (GamePage
  already wakes straight in the wreck under reduced motion).
- Don't name a real star — Kepler-442b is 1,200 ly and breaks the timeline.
  "A world the last telescopes flagged green" is stronger anyway.
- Ship name from the old lore, if wanted: ESV Meridian.
- Every beat renders in the site's existing language: banded sun, silhouette
  shipyard, light-board, CrashIntro/HyperspaceWarp slot, /lab-style flyby for
  the approach.
