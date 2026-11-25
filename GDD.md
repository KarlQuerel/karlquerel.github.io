# HERMES: Game Design Document

Updated 2026-11-25 · ✅ decided · 🟡 leaning or prototyped · ❓ open · 💭 proposed, no pick yet

The one home of the game's design. Karl's Notion page is only the inbox: ideas land there, and each session folds
them in here when asked. When something changes, move it and add one line on why.

---

## Pitch

✅ Year 2137. Wars have scourged Earth. Humanity depleted all its resources in the great water nuclear war. Famine
and nuclear winter have wiped out much of humanity, and Earth is no longer habitable. The survivors made peace and
launched the Hermes Project: ten ships to scout distant planets for a habitable world.

You are one of the five aboard HERMES-8. You fall asleep in Earth orbit with the whole crew and wake in orbit of an
alien world, aboard a barely working ship.

A space survival game with heavy choices, first person, pixel art, in the browser, highly immersive.

## The spine 🟡

- ✅ HERMES-8 sets out for Yavis 667, a viable world, on a trip planned to take 19 years (2026-11-23)
- ✅ The crew sleep 163 years and 7 months instead of 19 (2026-11-23; replaces 471, then ~1,486: a shorter sleep keeps
  Earth's messages personal and the low-power wake believable)
- ✅ The pods wake the crew because the power is running out: the last-resort wake, while there is still enough to
  revive them. The power left is the game's first clock
- ✅ The crew learn it from Earth's messages, each worse than the last
- ✅ What kills Earth: the slow drought. No new war: water runs out city by city, and fewer and fewer places
  broadcast. Then a single automated message, and Hermes says it is the last one received, 22 years ago (2026-11-23)
- ✅ Timeline, in years after departure: arrival due at 19; last human voice received at 117; last automated message
  received at 141; wake at 163 years 7 months. Yavis 667 lies 23.6 light years from Earth, so each message is
  23.6 years old when it arrives
- ❓ The departure month: June 2137 or later, or the wake lands in 2300, a round year (2026-11-25)
- 💭 Hermes kept logging Earth's broadcasts while the crew slept, so 141 years of messages wait in the ship's memory
- ✅ Why the ship did not wake the crew at year 19 (2026-11-23): at 18 years 9 months, three months before arrival, a
  grain of interstellar dust cut the one cable between Hermes and the pods. The ship arrived and entered orbit on
  autopilot, but the wake command never reached the pods. Each pod has a hardwired failsafe, no computer, that wakes
  its sleeper when its power runs too low. Hermes: "I could see you. I could not reach you."
- ✅ The crew do not wake together (2026-11-23). ❓ Whether the others woke before you, are still asleep, or both.
  💭 Each failsafe runs on its own pod's battery, so the wakes are staggered by years
- ❓ What the player is ultimately after, once they know

GREEN was dropped on 2026-11-13: no message goes back to Earth, they only come in.

## Pillars 🟡

1. Survival: every move spends a meter
2. Heavy choices: every choice costs something
3. Immersion: nothing on screen the astronaut couldn't see

---

## World

- ✅ 2137 (2026-11-25; replaces 2150, too round, which replaced 3812 and the swelling Sun)
- ✅ The great water nuclear war depleted the planet; famine and nuclear winter followed; Earth can no longer keep us
- ✅ The war's sides belong to the intro only, not to the story
- ✅ The Hermes Project: ten ships, each sent to scout a candidate world; HERMES-8 is yours
- 🟡 More than one planet: the ship carries you on to another world later in the game
- ❓ The fleet: if, when and how we learn what happened to the other ships
- ❓ The candidate world: what it is like (the 2D prototype had a lake, fronds and a ridge)
- ✅ Its name: Yavis 667 (2026-11-23)

## Characters

Five aboard HERMES-8, one team, each in their own role suit.

| Who | Role | Notes |
|---|---|---|
| ✅ Henrik | Captain, also security | Male, ex-soldier. Deep, aged voice |
| ✅ Elena | Medic | Female, lost her son Sam in the war. Not killed right away (2026-11-17): when she dies is open |
| ✅ Ekko | Engineer | Male |
| ✅ Noor | Scientist | Young, just graduated |
| ✅ You | Pilot, lander and ship (2026-11-23) | Will have a voice (decide later). Name ❓ ("Four" was floated) |

- 💭 Noor's thesis flagged the world they were sent to
- ❓ Whether the crew ever take their helmets off (a take-off routine exists on G in the ship lab; it looked weird
  and would need real motion capture; "always helmets on" is the other option, 2026-11-18)

## Structure

1. ✅ Title screen: HERMES-8 over the Earth from orbit (kept from the 2D intro, 2026-11-18)
2. ✅ Intro cinematic, in three.js and the game's pixel look: the water war and why Earth can't keep us. The title's
   Earth and Moon carry into it as one continuous picture. ✅ Orbit and ground intercut, a cut every few seconds,
   something close to the lens in every shot (2026-11-25; replaces one long shot on the Earth, which felt empty).
   🟡 The shots, a text card each, a card held across its shots:

   | Card | Where | Shot |
   |---|---|---|
   | 2137. | Orbit | The title frame; the camera drifts through dead satellites and war debris, close past the lens |
   | The water war went nuclear. | Ground | A dry reservoir at dusk: cracked bed, a stranded boat, the two sides' searchlights on the dam; the horizon flashes white, dust rolls in |
   | | Orbit | Flashes bloom on the night side |
   | Famine and nuclear winter followed. | Ground | Ash falls like snow on a line at a water truck, silhouettes under one floodlight |
   | | Orbit | The seas pull back, smoke spreads, city lights go out |
   | Earth can no longer keep us. | Inside | A frosted shelter window; a gloved hand wipes it: grey, nothing moves (rhymes with the pod's frost at the wake) |
   | The survivors made peace, and spent what was left on leaving. | Ground | A salt-flat launch pad at night, a crowd behind a fence; liftoff, the camera tilts up with the column of light |
   | The Hermes Project: ten ships, ten worlds that might keep us. | Orbit | The shipyard: ten ships in scaffolds, numbers on the hulls, tugs and weld sparks; a dolly down the line as HERMES-7 pulls out |
   | ❓ Last card ("You fly HERMES-8." is a stand-in) | Orbit | Stop on 8, the five suits at the airlock window, cut to black, Hermes: "Good morning." |

   - 🟡 The war through light (flashes, searchlights, ash), never gore; people as silhouettes against one light
   - 🟡 About a minute, still skippable
   - 🟡 Earth's radio scraps under the cards, no narrator: the same broadcasts become the clock after the wake
3. ✅ Departure day, aboard HERMES-8 in Earth orbit: you wake in your bed in your own cabin (cabin 4), meet the crew,
   see Earth from the ship, prepare for the journey, enter your cryo pod. The safe tutorial
4. ✅ The wake: you went under in Earth orbit and wake in orbit of the alien world (2026-11-23). The ship is barely
   working, things have turned bad. ❓ Whether the crew are there: reopened 2026-11-23, with or without them is open
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
- ✅ No distance blur and only a light haze: what's far away must stay readable (2026-11-24)
- ✅ A light must land on the palette's lit end, or it reads as tan
- ✅ Modern sci-fi, minimal premium product design: no greebles, chrome reads cartoonish
- ✅ One crew helmet for everyone, in the suits' slate and oxblood; each role's colour on the suit panels and the
  visor (medic cream, scientist rime, engineer brass, captain oxblood)
- ✅ The baked darker nebula is the alien world's sky, not Earth's (2026-11-25). ❓ Earth orbit's sky (the intro and
  departure day; the ship lab and the intro use the nebula for now). 💭 The real Milky Way, so the sky itself tells
  the player how far they went when the nebula replaces it at the wake
- ✅ Intro skippable, safe under reduced motion
- Tone: loneliness, not splatter
- ✅ No rounded numbers for dates or durations: they read like real records (2026-11-23)
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
- [ ] Intro cinematic in three.js, about eight sessions, each shot replacing its slate in the animatic
      (`/game?intro`, done 2026-11-25): the frost window; the shipyard and the ships (on the home computer, which has
      the ship GLBs); the Earth on the GPU and dying; the launch pad; the dam; the water-truck line; the hand-offs
      and the radio
- [ ] The wake and Act I in three.js
- [ ] Put the Zvezda credit on the site
- [ ] Hermes's final voice, Elena's voice
- [ ] Lively Earth from the ship: satellites, other ships
- [ ] Moodboard
- [ ] Check Blender for landscape composition
