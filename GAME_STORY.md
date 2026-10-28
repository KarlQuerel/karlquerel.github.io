# HERMES — story bible & storyboard

Living document for the /game build. Wording, names and numbers are all up for grabs; the
decisions in section 1 are recommendations to confirm, not law.

---

## 0. Verdict: is it doable?

Yes, at /lab quality, with one honest caveat.

/lab's look comes from three things the repo already has: a low art grid (`ART_TARGET` cells,
whole device pixels per cell), a hard-banded palette (`PALETTE`), and procedural geometry drawn
in GLSL or on a canvas. That pipeline is excellent at **space, planets, suns, terrain, glass,
metal, light**. It is bad at **people and hands**. Those have to be hand-drawn as legend grids
(the `#` masks of `GAME_WORDMARK` and the boot `K_GRID` are the existing examples) and they are the expensive
part of this game. The storyboard below stages every human moment as **silhouettes or POV
fragments** so the character art stays at a handful of small grids.

Ballpark, if built as specified here (S = an evening, M = a weekend, L = a week of evenings):

| Piece | Size | Why |
|---|---|---|
| Scene runtime (data-driven scene graph, state, choices, save) | M | plain Vue + a JS scene table, no new deps |
| HUD (visor frame, readouts, two hands x 3 states, held item) | M | hand sprites are the only real drawing |
| Intro, 10 shots | L | 4 shader/canvas shots reuse /lab and PixelPlanet, 3 need new grids |
| One act of play after the wake (6-8 scenes) | L | mostly writing + layered canvases |
| Endings x 4 | M | title cards over existing art |

---

## 1. Decisions to confirm

### Name: HERMES, for the game and the ship (decided)

HERMES is the messenger, the mission is the Hermes Project, and the spine is one message getting
home. The game is **HERMES**, the ship is **HERMES-8**, the player calls the ship's voice
"Hermes". ARGUS is dropped. `/game` stays as the path.

### Class system or inventory: inventory of flags, plus a role that is only a starting item

(Inventory of flags: decided. The role pick is deferred until the intro is done.)

- **Inventory: yes, trivially.** It is a `Set` of item keys on the game state. A choice can
  require a flag (`when: s => s.has('wrench')`) and grant one (`then: s => s.take('wrench')`).
  The HUD renders the held item in the right hand. Three to five slots is plenty.
- **Class system: not as classes.** Real classes multiply content: every scene needs a variant
  per class and the hands need per-class art. Instead, at THE ROOM (shot 6) the player picks a
  **role** — ENGINEER / MEDIC / PILOT — which is one starting item and one role-only line per
  act. It feels like a class, costs one item each.
- **Meters: three.** `O2`, `HULL`, `SIGNAL`. They make the spine mechanical: every hard choice
  trades one for another, and the endings are read off them.

### HUD with the astronaut's hands: yes

- Visor frame: a scoped SCSS overlay (vignette, two glass reflections, a scanline every few
  cells). No image.
- Readouts in `$font-terminal` (Departure Mono), top corners. The copy already exists in git
  history as `HERO_WAKE` (`886a840^:src/data/heroLines.js`): DAY 141,209, CREW 1/2, the alarm
  list. It was right the first time.
- Hands: two legend grids, about 40 x 48 cells, bottom-left and bottom-right, drawn as
  legend grids (palette letters, `K` outline). Three states each: grip, reach, hold. The held item is
  its own small grid composited into the right hand. Steps between states with `steps(3, end)`.
- The hands lean with the pointer via the existing `--mx/--my/--depth` contract, at a shallow
  depth, so the head turns and the hands lag. That alone sells the POV.

### Phones: blocked (decided)

The game is walked with a keyboard and mouse (WASD read as physical keys so ZQSD works on
AZERTY, the mouse to look), and touch controls for free movement would be a second game's worth of work. `/game`'s
route guard sends any device without a fine pointer (`FINE_POINTER_QUERY`) to the holding screen.
What phones get instead is open: a game of their own is one idea. The rest of the site stays
phone-first; that is what recruiters see.

### Pixel art: one grid, one palette (decided)

Every scene takes the contact scene's look: cells at `ENTRY.ridgeCellPx`, every colour snapped to
`PALETTE` with the Bayer checker only in the seam between two colours (`ENTRY.ridgeSeam`). A GLSL
scene gets it from `js/intro/paletteSnap.js`, generated from `PALETTE` so no hex is copied.

- **3D for the space you walk in** (walls, deck, the ground near you), **2D for the rest**: people
  and items as sprites facing the camera, the hands and HUD on the screen, far landscape as the
  contact scene's ridge layers.
- **One cell size and one palette for 2D and 3D alike.** A sprite at another pixel size than the
  3D around it reads as cheap.
- **Flat sprites only for what you never walk around.** Anything you circle (pods, consoles) is 3D.
- A light source must land on the palette's lit end: dimmer, it snaps to tan and stops reading as
  light.

---

## 2. Premise

**Year 3812.** The sun is dying the way stars actually die: not fading, but swelling — red,
relentless, eating the sky. The harvests went first. Earth has decades, not centuries.

The last telescopes flagged a handful of candidate worlds. A telescope cannot taste air or touch
water; someone has to stand on the ground and confirm it. So the Earth Confederate voted the
**Hermes Project** into existence: ten ships, one envoy each, one per candidate world. Each ship
carries just enough fuel to arrive, two cryo pods (the envoy, and a second sleeper in case the
first never wakes), and one tight-beam transmitter aimed at Earth.

Ten launched. **HERMES-8 is the only one that survived, at least that anyone knows of**: the board
in shot 8 watches the other nine go dark over the crossing.

**Hermes does not come back. Hermes calls back.** When an envoy confirms a living world, they
send one signal: **green**. Earth builds the arks only when a green arrives. One bit saves ten
billion people. The no-return is arithmetic, not cruelty: fuel to come home would double every
ship's mass, so half as many worlds checked. Every volunteer did that math themselves.

### The spine

The crash breaks the transmitter. Every choice bends around one question:

> **Survive long enough to send the word — and when survival and the signal conflict, which do
> you choose?**

`O2` and `HULL` are survival. `SIGNAL` is the word. The game is the tension between the meters.

---

## 3. Gameplay

**POV choice game, one scene at a time, some of them walked.** A walkable scene is a bounded
space the player moves through (`js/intro/walk.js`); its choices come up when they reach the spot
that holds them, as the role pick does at the corridor's lockers. Every scene is one picture drawn in the site's
language, with the HUD over it, the ship's voice in a strip, and two to four choices. Some
choices are directions (LEFT / RIGHT), some are verbs on a hotspot (TAKE THE WRENCH, READ THE
TERMINAL), some are moral. Choices can be gated by an item, a meter, or a flag.

**Scenes are data, not components.** One table in `src/data/game/`, shaped like `LAB_BEATS`:

```js
{
  key: 'wreck-bay',
  art: { kind: 'layers', layers: [...] },        // or 'shader' | 'grid' | 'planet'
  hud: { alarms: ['HULL 34%'], hand: 'grip' },
  voice: ['Hull breach aft. I have sealed what I can.'],
  choices: [
    { label: 'TAKE THE WRENCH', when: s => !s.has('wrench'), then: s => s.take('wrench'), to: 'wreck-bay' },
    { label: 'GO AFT', to: 'aft-corridor', cost: { o2: 1 } },
    { label: 'READ THE TERMINAL', to: 'terminal-1' },
  ],
}
```

Three or four art kinds cover the whole game:

| `art.kind` | What it is | Already in the repo |
|---|---|---|
| `shader` | one GLSL fragment on the art grid | `useArtCanvas` (one GL context on the art grid, `js/gl.js` helpers); /lab's `useFlyby` is the worked example |
| `planet` | the procedural globe | `PixelPlanet` with `palette` override (`EARTH_PALETTE` exists) |
| `layers` | 2 to 4 canvases at different `--depth`, ridge bands + sprites | `drawMoon`, `cutRidge` + `lightRidge`, `drawDepartureSky`, `usePointerParallax` |
| `grid` | a hand-drawn legend grid, `wide` and `narrow` cuts | none yet: the grid renderer is new work (`BootMark` and `js/wordmark.js` read the same `#` mask format) |

**Motion rules** are the site's: self-running motion steps (`steps(n, end)`), pointer-driven
motion is continuous, the retro comes from the grid. The pointer moves the scene through the
`--mx/--my` contract; touch devices get a still frame.

**State** is one object: `has` (items), `flags` (story bits), `o2/hull/signal` (0-100), `scene`.
Persist it to `localStorage` so a refresh resumes. No backend for now (decided): the game is
static, and nothing in the intro needs one.

**Terminals** reuse the /terminal look through `TerminalWindow` (chrome only, content in its slot): a `grid` scene with a text pane you scroll,
and READ is the choice. Cheapest scene type, so it is where most of the lore lives.

---

## 4. Intro storyboard

POV rule: shots 1 to 5 are omniscient title cards over animation. From shot 6 the story is first
person and never breaks POV again. The moment it becomes yours is the moment you walk down the
corridor.

Cadence: one short declarative line per card, crawl timing, Press Start 2P. Every shot is
skippable (`SKIP >>` bottom-right from shot 1), the whole intro is one `SKIP`, and reduced
motion jumps straight to shot 9.

| # | Card | Picture | Recipe | Interaction | Size |
|---|---|---|---|---|---|
| 1 | **YEAR 3812.** | Black, then a sparse starfield fading in behind the text. | `SpaceBackground`, text only. | none | S |
| 2 | **EARTH IS DYING.** | The Earth, small and centred, slow spin. Blue-green ramp already sick: browner land, thinner cloud. | `PixelPlanet` with a dried-out `EARTH_PALETTE` variant, `cloudThin` high, `lightYaw` so the sun side is over-lit. | none | S |
| 3 | **THE SUN HAS BEEN GROWING RELENTLESSLY.** | Cut to the sun. It swells over the card, ramp sliding from `glow` through `ember` to `rust`, limb boiling. | New fragment shader on the art grid: banded disc + `fbm` limb, one uniform for age drives radius and ramp offset. Same pipeline as /lab's scene program. | none | M |
| 4 | **BURNING EVERYTHING.** | Cracked flatland to the horizon, crop rows stubbled, red sky, the swollen sun sitting on the horizon behind heat bands. | `layers`: `drawDepartureSky` in a warm ramp, two `cutRidge`/`lightRidge` bands in the rock ramp for the dry ground, one small crop-row grid repeated, stepped crumble (3 frames). | pointer parallax | M |
| 5 | **THE EARTH CONFEDERATE CHOSE TO LAUNCH THE HERMES PROJECT.** | A chamber in silhouette: tiers of seats, tall windows behind, the red sun the only light. Hands rise in stepped waves along the tiers. A tally board flips: `10 SHIPS · APPROVED`. | `layers`: window wall (sun shader or a gradient with the sun disc), seat tiers as 3 silhouette grids at increasing depth, hands as 1-cell nubs toggling on a `steps(4)` clock, board as DOM text. Silhouettes only, no faces: that is what keeps it at one weekend. | pointer parallax | M |
| 6 | **A TEAM OF HIGHLY TRAINED SCIENTISTS, DESTINED TO SCOUT DISTANT AND HABITABLE WORLDS.** | POV begins. The player walks a corridor toward a lit door, past side bays where other envoys suit up in silence, backlit. Looking down shows their own suit and boots. | Raymarched corridor on the contact scene's grid and palette, a sealed hatch behind the start. The role pick comes up when the player reaches the door: three lockers, ENGINEER / MEDIC / PILOT. | **walk** (WASD, mouse look), then **first choice**: pick a role (a starting item in the right hand) | L |
| 7 | **YOU WERE CHOSEN.** | Into the tube. The hands reach forward and grip the rails (state: reach → grip). The lid closes over the lens, glass fogs from the edges in, `CRYOSTASIS ENGAGED`, the frame blinks shut like an eyelid. Black. | Tube interior as a `grid` with the lid as a layer sliding down; frost is a canvas alpha layer growing from the edges. Eyelid = two black bars closing with `steps(3)`. | none | M |
| 8 | *(no card)* | Across the black, a board of ten lights, one per ship. Yours is lit: `HERMES-8`. The lights go out one by one over the crossing until yours is the last: `HERMES-4: SIGNAL LOST` · `HERMES-7: SIGNAL LOST`. A day counter runs up to DAY 141,209. | DOM: ten lights in a row, stepped blink, counter text. Cheapest shot in the intro, and the one that makes the title land. You wake alone because everyone is alone. | none | S |
| 9 | **WARNING. WARNING. CRITICAL ERROR.** | Eyes open on the inside of a frosted lid. The HUD reboots: readouts stutter in like `BootCover`, then the `HERO_WAKE` alarms in red: HULL INTEGRITY 34%, O2 RESERVE LOW, NAV ARRAY OFFLINE, GRAVITY WELL DETECTED. The frost is everywhere; only light and a shape move behind it. | Frost is a full-frame canvas painted from `PALETTE.frost/rime` with dithered alpha over the scene behind it (the planet filling the glass: `PixelPlanet`, or the wreck). The alarm strip pulses with `steps(2)`. | none | M |
| 10 | *(no card)* | **The player wipes the glass.** Wherever the pointer drags, the frost clears in chunky cells and the hand follows in `reach` state. Behind it: the planet, too close, filling the view. When enough glass is clear, the HUD reads PROXIMITY ALERT and the first in-game choice appears. | Pointer events erase cells from the frost canvas (`destination-out` at cell size). A cleared-fraction threshold triggers the alert. Works with touch as-is. | drag to wipe (the first thing the player *does*) | S |
| 11 | *(no card)* | Crash. The frame shakes on a stepped offset, alarms saturate, cut to black. Fade up on the wreck bay. | CSS only. | none | S |

Shot 8 (the board of ten) is kept (decided). It costs nothing, covers the centuries in one
image, and it is what makes "HERMES-8" mean something before the player ever hears it.

On shot 5: the parliament works if the room is lit by the sun and nothing else. Faces and
podiums make it a bureaucracy; silhouettes against a red wall make it civilization's last vote.

---

## 5. After the wake (sketch)

Three acts, each ending on a choice that moves a meter hard. Scenes per act: 6 to 8, half of
them terminals or corridors.

1. **THE WRECK.** Opens in the broken corridor, in zero-g (section 6). Get out of the pod, stop the bleeding of the ship. Learn the transmitter is
   broken. Meet the ship's voice. Items: wrench, med-kit, cutter. First moral beat: seal the aft section
   with the second pod still in it (it failed mid-crossing; one wordless scene, the readout says CREW 1/2).
2. **THE WORLD.** Outside, POV on the surface, in low gravity. Is this world green? Air (open the
   helmet), water (the seabed walk), ground (the scan). Every test costs O2. the ship's voice degrades (speech glitches, memory gaps) as the ship's power goes.
3. **THE WORD.** Rebuild the transmitter from what is left. The signal needs power the life
   support is using. The player's last choice is the spine, stated plainly.

## 6. Movement and verbs

The rule: **every move spends a meter.** A move that costs O2, HULL or SIGNAL is a choice on the
spine; a free one is only a feature. No combat: the planet and the dying ship are the obstacles.

| Verb | How | What it spends |
|---|---|---|
| **Walk** (built) | WASD, mouse look, boots planted under you (`js/intro/gait.js`) | nothing |
| **Sprint** | hold Shift. The suit's servos make running possible, the lungs are the limit: audible breathing, the visor fogging in from the edges, shorter quicker steps and a bigger bob (`GAIT` tuning) | O2, fast |
| **Wrist readout** | hold Tab: the left forearm comes up into view with O2, HULL and SIGNAL on its display. It replaces the visor HUD: the meters live on the suit, nowhere else | nothing |
| **Low gravity** | the candidate world is smaller than Earth, about 0.6 g. Space jumps high and slow, and the walk becomes the Apollo lope: longer steps, higher lift, slower bob, all `GAIT` tuning | nothing |
| **Zero-g** | the wreck's gravity fails after the crash. Mag boots for most of it (walls and ceiling become floors, the corridor turns under you); short stretches of free float on suit thruster puffs | propellant |
| **Seabed walk** | no swimming: a heavy suit sinks. The water test is a walk along the bottom, the surface seen from below. Something waits down there: a sample, another Hermes ship, a life sign | HULL with depth, O2 with time |
| **Scan** | hold the right mouse button: a pixel scanline sweeps what you aim at (plants, air, water, rock). Act II's core verb: it is how the world is judged green | SIGNAL power |
| **Helmet lamp** | a light cone from your head in the dark wreck | its battery |
| **Open the helmet** | the air test's one-way moment: the alien air saves O2 if it is good, ends the game if not | everything, once |
| **High ground** | the tight beam needs Earth above the horizon and a clear sky: climbing a ridge at the right hour of the night is act II's navigation goal (`js/sun.js` already runs a day and a night) | O2 on the climb |
| **Talk** (parked with the characters) | E near someone: radio lines typed in, they turn their head to you | nothing |

The three tests of act II map onto the verbs: **air** is opening the helmet, **water** the seabed
walk, **ground** the scan.

Build order: the wrist readout with sprint on O2 (the meters become real, everything after leans on
them), then the low-gravity lope, the broken corridor, the seabed walk, the scanner.

### The broken corridor (act I opener)

Act I opens in the corridor the player walked in the intro, wrecked: dark, in zero-g, ribs bent,
panels torn, lamps dead or flickering on a stepped clock, debris turning in the air, emergency red
the only light. The player knows the place, and that is the point.

One wrinkle to settle: the intro corridor is the orbital yard's boarding deck (ten envoys suit
up there, Earth in its window), while the wreck is HERMES-8. Recommendation: **the ten ships were
built in that yard from the same modules**, so HERMES-8's spine is the same corridor make (ribs,
pipes, stencils, CRYO chevrons, lockers, door), shorter, its bays holding cargo and labs. The bays
the envoys filled in the intro are empty here: the loneliness lands without a word.

**Where the wreck is (to confirm).** Zero-g needs the ship in orbit, but the storyboard's crash
(shots 10 and 11) lands it. Recommendation: **HERMES-8 is wrecked in orbit round the world**: the
PROXIMITY ALERT is the world's moon or a debris ring, the crash breaks the ship open, and act I is
aboard the tumbling wreck in a decaying orbit, the world turning in the breach. Act I ends with the
descent (the pod ridden down), so act II starts on the ground. A clock for act I comes free with it.

**One source, two states (built).** `corridor.frag.glsl` is compiled twice: as the intro corridor,
and with `#define WRECK` as the wreck (`js/intro/wreck.js`). The intro-only parts (the people, the
lockers' suits, the lit door and beacons, the yard in the window) sit under `#ifndef WRECK`; the
damage (the breach, the drift, the debris, the red emergency lamps, the head lamp, the dead strips)
under `#ifdef WRECK`. Everything else is shared, so a fix to the corridor lands in both.

**The prototype.** The wreck is the shot after the title, `act: true`: **SKIP INTRO** (under SKIP,
from any intro shot) lands there, and so does SKIP on the title card; `/game?shot=wreck` on the
dev server. Walk it on mag boots, push the pod aside with E, look up under the breach at the world.
Not yet: bent ribs and torn wall panels, free float with thrusters, an end to it (the far door is
dead), the moral beat of sealing the aft section with the pod in it.

**What drifts in it: one body, in its pod (decided).** One body in an empty corridor is lonelier
and worse than many, and a whole figure in the open reads as a mannequin under the head lamp
(tried: five drifting bodies, all of them looked wrong). So the only body aboard stays in its pod.
The second pod tore loose in the crash and drifts across the corridor, too long to slip past: the
player has to push it aside to go on. Its sleeper never woke. The window is frosted from inside,
their shape under it, and **one hand pressed flat to the glass**, the frost melted round it and
smeared where it slid: the one sharp thing. A crack in the lid seeps frozen blood, dark red beads
that catch the head lamp. It mirrors the wake (shot 10), where the player wipes their own glass
clear. No severed limbs: the sleeper died of cold, and the game's tone is loneliness, not splatter.

**No physics engine.** The pod is one rigid capsule along its length: a position, a velocity and a
slow tumble (`js/intro/drift.js`). It knocks off the corridor's box end by end, so a wall met with
one end sets it turning. It is far heavier than the player: walking into it stops you against it
and moves it only as fast as you lean in; E pushes it where your view meets it, and a push near an
end turns it. On mag boots you stay put; free-floating, a push would send you back the other way.
The shader draws it from a uniform pair (centre and quaternion), behind a bounding sphere; the
window's silhouette, hand, smear and crack are painted on the glass in the pod's own frame.

## 7. Endings

Read off the meters at the end of act 3:

- **Green.** Signal sent, you don't survive it. Earth builds the arks.
- **Green, alive.** Signal sent, you live — alone, on the world you saved.
- **Silence.** You live, but the word never leaves. `HERMES-8: SIGNAL LOST` on the board.
- **The lie.** You send green to a world that isn't. Ten billion people are coming.

Each ending is a title card over one existing picture (the board, the planet, the sun) and a
final HUD state. Cheap on purpose.

## 8. The ship's voice

The ship, a voice, not a person. A choice game needs someone to phrase choices against; the
voice is always present, costs no character art, and degrades through the story so the dialogue
partner's arc mirrors the broken transmitter. It watches everything and can do nothing.

---

## 9. Practical notes

- `/game` is dev-only until `GAME_SHIPPED` flips (`src/constants/game.js`); a build redirects to
  `/under-construction`. Ship the intro alone behind the flag first: it is a complete thing.
- Add the route to `ROUTES` in `scripts/prerender.mjs` only when it ships, and extend
  `tests/smoke.spec.js` with one render check.
- Intro must be skippable and reduced-motion-safe (jump to shot 9, no frost animation, one
  click clears the glass).
- Do not name a real star: Kepler-442b is 1,200 light-years out and breaks the timeline. "A
  world the last telescopes flagged green" is stronger. Replace `DEST: KEPLER-442B` in the old
  readouts with `DEST: CANDIDATE 09`.
- The single-scene shader shots (3, 9's backdrop) use `useArtCanvas`: one GL context on the art
  grid (resize, rungs, boot, context loss) with a `build` + `frame` pair; `useFlyby` shows the shape.
- Every asset stays procedural or a legend grid. No PNG sprites: the palette is the design
  system, and a bitmap cannot be re-banded.

## 10. Decided / deferred

- HERMES for the game and the ship. ARGUS dropped.
- Shot 8 stays.
- Role pick at the door: decide after the intro exists.
- No backend. `localStorage` only, if progress needs to survive a refresh.
- Desktop only: phones and tablets land on the holding screen until they get something of their own.
- Pixel art everywhere on the contact scene's grid and palette (section 1). The corridor is the
  first scene on it; the other intro shots still use the finer grid and `finish()`.
- The corridor is walked, not watched: WASD moves and strafes, a click takes the mouse to look
  around (Esc gives it back, a choice releases it), the side arrows turn for keyboard-only players.
  Looking down shows your own suit, legs and boots (`js/intro/gait.js`): each boot stays where it
  lands, small head turns leave both planted, a bigger turn or a step away makes them step one at
  a time, sideways for a strafe.
- The visor overlay (`IntroHud`) is removed for now: it looked wrong over the pixel art. Cards
  still read high in first-person shots (`pov`), clear of the hands. A HUD comes back redesigned,
  or not at all.
- **Next: build the intro.** Meanwhile `/under-construction` shows HERMES discovered plate by plate,
  once, then held with a glint (`PlatingWordmark.vue`, letters derived from the masks in
  `GAME_WORDMARK` by `js/wordmark.js`). No scene, no progress tracking: a neat animation.
