# HERMES: Game Design Document

Updated 2026-11-18 · ✅ decided · 🟡 leaning or prototyped · ❓ open · 💭 proposed, no pick yet

The one home of the game's design. Karl's Notion page is only the inbox: ideas land there, and each session folds
them in here when asked. When something changes, move it and add one line on why.

---

## Pitch

✅ Year 2150. Wars have scourged Earth. Humanity depleted all its resources in the great water nuclear war. Famine
and nuclear winter have wiped out much of humanity, and Earth is no longer habitable. The survivors made peace and
launched the Hermes Project: ten ships to scout distant planets for a habitable world.

You are one of the five aboard HERMES-8. You fall asleep in Earth orbit with the whole crew and wake to a deserted,
barely working ship.

A space survival game with heavy choices, first person, pixel art, in the browser, highly immersive.

## The spine ❓

Open since GREEN was dropped (2026-11-13: no message goes back to Earth). The old spine, "survive long enough to
send the word", no longer holds. What the player is ultimately trying to do needs deciding before the acts can be
built.

## Pillars 🟡

1. Survival: every move spends a meter
2. Heavy choices: every choice costs something
3. Immersion: nothing on screen the astronaut couldn't see

---

## World

- ✅ 2150 (settled 2026-11-18; replaces 3812 and the swelling Sun)
- ✅ The great water nuclear war depleted the planet; famine and nuclear winter followed; Earth can no longer keep us
- ✅ The war's sides belong to the intro only, not to the story
- ✅ The Hermes Project: ten ships, each sent to scout a candidate world; HERMES-8 is yours
- 🟡 More than one planet: the ship carries you on to another world later in the game
- ❓ The fleet: if, when and how we learn what happened to the other ships
- ❓ The candidate world: what it is like (the 2D prototype had a lake, fronds and a ridge)

## Characters

Five aboard HERMES-8, one team, each in their own role suit.

| Who | Role | Notes |
|---|---|---|
| ✅ Henrik | Captain, also security | Male, ex-soldier. Deep, aged voice |
| ✅ Elena | Medic | Female, lost her son Sam in the war. Not killed right away (2026-11-17): when she dies is open |
| ✅ Ekko | Engineer | Male |
| ✅ Noor | Scientist | Young, just graduated |
| ✅ You | | Will have a voice (decide later). Name ❓ ("Four" was floated) |

- 💭 Noor's thesis flagged the world they were sent to
- ❓ Whether the crew ever take their helmets off (a take-off routine exists on G in the ship lab; it looked weird
  and would need real motion capture; "always helmets on" is the other option, 2026-11-18)

## Structure

1. ✅ Title screen: HERMES-8 over the Earth from orbit (kept from the 2D intro, 2026-11-18)
2. ✅ Intro cinematic, in three.js: the water war and why Earth can't keep us. The title's Earth and Moon carry into
   it as one continuous picture. Its scenes are ❓ (Karl decides later)
3. ✅ Departure day, aboard HERMES-8 in Earth orbit: you wake in your bed in your own cabin (cabin 4), meet the crew,
   see Earth from the ship, prepare for the journey, enter your cryo pod. The safe tutorial
4. ✅ The wake: the ship is deserted and barely working, things have turned bad, the crew are not there. "Go from
   there"
5. ❓ The acts after the wake

Around the wake:

- ✅ You wipe the frost off the pod's glass with the mouse
- 🟡 Low gravity in the wrecked ship, if possible
- ❓ What went wrong: 💭 the crew went down without you, a strike vented a flank, or something came aboard
- ❓ Whether HERMES-8 ever comes down, or Act I stays in orbit and the lander goes down
- 💭 The missing crew each leave a trail: the captain's marks, the engineer's half-finished repairs and voice on the
  radio, the scientist's airlock and footprints
- 💭 Two wakes that rhyme: the same room, the same Hermes line, wiping a fogged mirror on departure morning like
  the pod's frost later
- 💭 HERMES-7 seen leaving from a window on departure day, so the player learns how the ships move

## The ship: HERMES-8

- ✅ Exterior final (2026-11-15): "Spaceship PAK DA (K) TU-1600 Zvezda" by Ilya Shevchuk, CC BY 4.0, modified (no
  markings, no missiles), scaled to 75 m, with an open halo drive ring and HERMES-8 lettered on one flank
- ✅ A ship that works in orbit, with a small landing module docked under its belly (2026-11-14)
- ✅ One glass area only: the canopy over the mess ("too many holes" for anything more, 2026-11-16)
- ✅ One main deck. Aft: engineering, dock & suits. Mid: cryo bay, med bay, lab, a flank hall on each side to five
  cabins (cabin 4 is yours). Fore: mess under the canopy, fore hall, ops, bow passage, cockpit
- ✅ Act I opens only what the story needs: engineering, the lab and the crew's cabins stay locked for later acts
- ✅ Departure day (built in the ship lab): the four crew stand one per room (Henrik in ops, Elena in the med bay,
  Ekko in the dock, Noor in the mess) and talk when you come near

## Gameplay

Every move spends a meter. A move that spends nothing is a feature, not a choice.

- ✅ First person throughout; walk with WASD, look with the mouse, E to use
- ✅ The suit's gauge (shipped 2026-11-18): low on the left of the view, air on its left arc and suit power on its
  right, ten cells each, a bubble and a bolt sign; no helmet frame on screen
- ✅ No class system, no hunger or thirst, no combat: the world and the dying ship are the obstacles
- ✅ No backend: progress is saved in the browser
- 🟡 Helmet lamp battery as a resource (the gauge's power)
- 🟡 Visor fogs when you run
- 🟡 Checkpoint at each act; acts as chapters whose title cards hide the loading
- ❓ Inventory: what you carry and how you see it
- ❓ Readable text at the game's pixel density

### Ideas from the 2D prototype (deleted 2026-11-18, not decided)

Built and played in the old 2D engine; kept here so nothing is lost. Look back at commit 6c2ef72.

- The wreck: dark, zero-g on mag boots, debris, emergency red; a pod whose sleeper never woke, one hand on the glass;
  vent the pod (aft sealed, hull +20) or leave them; a log (orbit decaying, comms down)
- The world: lighter gravity, longer steps. Three tests, one of which gives a dead world away: air (open the helmet
  or keep it sealed), water (walk the seabed for a sample; acid burns the suit), ground (scan the fronds: alive or
  mineral)
- Endings: a title card over the world, then one choice: AGAIN, from the wreck
- Meters O2 / hull / signal (100 / 34 / 60): signal belonged to GREEN, which is dropped

## Voices

- ✅ Hermes, the ship, speaks through the suit wherever you are, never over the helmet radio
- ✅ Humans are always heard through the helmet radio, never clean (a lighter, future radio)
- ✅ Henrik: Brian (B17). Ekko: Chris (B16). Noor: Lily (B19)
- 🟡 Hermes: Kokoro Heart with the ship sweep in the game today; Karl loved J7 (calm British male) and asked for a
  female version: ❓ which one
- ❓ Elena: an older voice (stand-in: Matilda)
- 🟡 Hermes's lines degrade as the power goes
- ❓ Final wording of every line (all lines so far are drafts)

## Look and feel

- ✅ Browser, desktop only: phones land on the holding screen
- ✅ Whole game in three.js; the 2D title screen is the only 2D piece left
- ✅ 3D through a pixel pass: one cell size and one palette for every scene; quality from edges, not from more cells
- ✅ A light must land on the palette's lit end, or it reads as tan
- ✅ Modern sci-fi, minimal premium product design: no greebles, chrome reads cartoonish
- ✅ One crew helmet for everyone, in the suits' slate and oxblood; each role's colour on the suit panels and the
  visor (medic cream, scientist rime, engineer brass, captain oxblood)
- ✅ Space sky: the baked darker nebula
- ✅ Intro skippable, safe under reduced motion
- Tone: loneliness, not splatter
- Far away, glow and clean two-tone masses read; facets don't

## Production notes

- Credits that must ship with the game: the Zvezda ship (Ilya Shevchuk, CC BY 4.0, modified), the crew helmet
  (Ethanmr2, CC BY 4.0), the nebula (in public/assets/CREDITS.txt), the Chakra Petch font (OFL). The ship and its
  credit are local only until the credit is on the site
- Characters and motions from Mixamo (fine in a game; raw files never redistributed)
- Voices from the ElevenLabs free plan are personal use: a paid plan is needed if the game is ever sold
- Props modelled in Blender by script (scripts/blender/), materials named for the game's paints

## Backlog (not design)

- [ ] Decide the spine
- [ ] Intro cinematic in three.js (scenes: Karl)
- [ ] The wake and Act I in three.js
- [ ] Put the Zvezda credit on the site
- [ ] Hermes's final voice, Elena's voice
- [ ] Lively Earth from the ship: satellites, other ships
- [ ] Moodboard
- [ ] Check Blender for landscape composition
