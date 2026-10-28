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
home. The game is **HERMES**, the ship is **HERMES-9**, the player calls the ship's voice
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
  history as `HERO_WAKE` (`886a840^:src/data/heroLines.js`): DAY 141,209, CREW 1/1, the alarm
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
**Hermes Project** into existence: sixty ships, one envoy each, one per candidate world. Each ship
carries just enough fuel to arrive, a cryo pod, and one tight-beam transmitter aimed at Earth.

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
| 5 | **THE EARTH CONFEDERATE CHOSE TO LAUNCH THE HERMES PROJECT.** | A chamber in silhouette: tiers of seats, tall windows behind, the red sun the only light. Hands rise in stepped waves along the tiers. A tally board flips: `60 SHIPS · APPROVED`. | `layers`: window wall (sun shader or a gradient with the sun disc), seat tiers as 3 silhouette grids at increasing depth, hands as 1-cell nubs toggling on a `steps(4)` clock, board as DOM text. Silhouettes only, no faces: that is what keeps it at one weekend. | pointer parallax | M |
| 6 | **A TEAM OF HIGHLY TRAINED SCIENTISTS, DESTINED TO SCOUT DISTANT AND HABITABLE WORLDS.** | POV begins. The player walks a corridor toward a lit door, past side bays where other envoys suit up in silence, backlit. Looking down shows their own suit and boots. | Raymarched corridor on the contact scene's grid and palette, a sealed hatch behind the start. The role pick comes up when the player reaches the door: three lockers, ENGINEER / MEDIC / PILOT. | **walk** (WASD, mouse look), then **first choice**: pick a role (a starting item in the right hand) | L |
| 7 | **YOU WERE CHOSEN.** | Into the tube. The hands reach forward and grip the rails (state: reach → grip). The lid closes over the lens, glass fogs from the edges in, `CRYOSTASIS ENGAGED`, the frame blinks shut like an eyelid. Black. | Tube interior as a `grid` with the lid as a layer sliding down; frost is a canvas alpha layer growing from the edges. Eyelid = two black bars closing with `steps(3)`. | none | M |
| 8 | *(no card)* | Across the black, a board of sixty lights, one per ship. Yours is lit: `HERMES-9`. The lights go out one by one over the crossing: `HERMES-4: SIGNAL LOST` · `HERMES-31: SIGNAL LOST`. A day counter runs up to DAY 141,209. | DOM: a 6 x 10 grid of spans, stepped blink, counter text. Cheapest shot in the intro, and the one that makes the title land. You wake alone because everyone is alone. | none | S |
| 9 | **WARNING. WARNING. CRITICAL ERROR.** | Eyes open on the inside of a frosted lid. The HUD reboots: readouts stutter in like `BootCover`, then the `HERO_WAKE` alarms in red: HULL INTEGRITY 34%, O2 RESERVE LOW, NAV ARRAY OFFLINE, GRAVITY WELL DETECTED. The frost is everywhere; only light and a shape move behind it. | Frost is a full-frame canvas painted from `PALETTE.frost/rime` with dithered alpha over the scene behind it (the planet filling the glass: `PixelPlanet`, or the wreck). The alarm strip pulses with `steps(2)`. | none | M |
| 10 | *(no card)* | **The player wipes the glass.** Wherever the pointer drags, the frost clears in chunky cells and the hand follows in `reach` state. Behind it: the planet, too close, filling the view. When enough glass is clear, the HUD reads PROXIMITY ALERT and the first in-game choice appears. | Pointer events erase cells from the frost canvas (`destination-out` at cell size). A cleared-fraction threshold triggers the alert. Works with touch as-is. | drag to wipe (the first thing the player *does*) | S |
| 11 | *(no card)* | Crash. The frame shakes on a stepped offset, alarms saturate, cut to black. Fade up on the wreck bay. | CSS only. | none | S |

Shot 8 (the board of sixty) is kept (decided). It costs nothing, covers the centuries in one
image, and it is what makes "HERMES-9" mean something before the player ever hears it.

On shot 5: the parliament works if the room is lit by the sun and nothing else. Faces and
podiums make it a bureaucracy; silhouettes against a red wall make it civilization's last vote.

---

## 5. After the wake (sketch)

Three acts, each ending on a choice that moves a meter hard. Scenes per act: 6 to 8, half of
them terminals or corridors.

1. **THE WRECK.** Get out of the pod, stop the bleeding of the ship. Learn the transmitter is
   broken. Meet the ship's voice. Items: wrench, med-kit, cutter. First moral beat: seal the aft section
   with the second pod still in it (it failed mid-crossing; one wordless scene, crew stays 1/1).
2. **THE WORLD.** Outside, POV on the surface. Is this world green? Air, water, ground. Every
   test costs O2. the ship's voice degrades (speech glitches, memory gaps) as the ship's power goes.
3. **THE WORD.** Rebuild the transmitter from what is left. The signal needs power the life
   support is using. The player's last choice is the spine, stated plainly.

## 6. Endings

Read off the meters at the end of act 3:

- **Green.** Signal sent, you don't survive it. Earth builds the arks.
- **Green, alive.** Signal sent, you live — alone, on the world you saved.
- **Silence.** You live, but the word never leaves. `HERMES-9: SIGNAL LOST` on the board.
- **The lie.** You send green to a world that isn't. Ten billion people are coming.

Each ending is a title card over one existing picture (the board, the planet, the sun) and a
final HUD state. Cheap on purpose.

## 7. The ship's voice

The ship, a voice, not a person. A choice game needs someone to phrase choices against; the
voice is always present, costs no character art, and degrades through the story so the dialogue
partner's arc mirrors the broken transmitter. It watches everything and can do nothing.

---

## 8. Practical notes

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

## 9. Decided / deferred

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
