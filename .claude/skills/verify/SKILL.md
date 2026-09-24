---
name: verify
description: Build, serve, and drive this site in headless Chrome to verify runtime behavior beyond the smoke suite.
---

# Verify — karlquerel.github.io

`npm test` is the Playwright smoke suite (one render check per route). For anything it does not cover, drive the real surface: a Node script on `@playwright/test`'s `chromium` with `channel: 'chrome'` (the system Chrome, no browser download), or raw CDP as below (Node 22+ has global `WebSocket` and `fetch`). Stub Firestore (see `tests/smoke.spec.js`) so runs never touch the production counters.

## Build + serve

```bash
npm run build                          # dist/
npx vite preview --port 4173 --strictPort &   # serves dist with SPA fallback
```

## Headless Chrome with CDP

```bash
google-chrome --headless=new --remote-debugging-port=9333 --no-first-run \
  --no-default-browser-check --disable-gpu --user-data-dir=<tmp>/profile about:blank &
```

Driver pattern: `fetch /json/version` → connect `WebSocket` to `webSocketDebuggerUrl` → `Target.createTarget` + `Target.attachToTarget {flatten:true}` → session-scoped `Page.enable`/`Runtime.enable`/`Runtime.evaluate`.

## Gotchas learned the hard way

- **Mobile emulation**: `Emulation.setDeviceMetricsOverride {width:390,height:844,deviceScaleFactor:3,mobile:true}` + `setTouchEmulationEnabled`. The site's mobile branches key off `(max-width: 640px)` (`src/constants/viewport.js`).
- **`hover`/`pointer` media queries can NOT be emulated via CDP** (`Emulation.setEmulatedMedia` features only cover prefers-* etc.). Headless reports coarse/no-hover by default. To test fine-pointer branches, relaunch Chrome with `--blink-settings=primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2`.
- **rAF activity**: wrap `requestAnimationFrame` via `Page.addScriptToEvaluateOnNewDocument` to count callbacks/sec — detects leaked animation loops (e.g. kept-alive HomeJourney's PixelPlanet).
- **Compositor cost of CSS animations**: sample `getComputedStyle(el).transform` every 100ms; distinct values ≈ frames the drift forced. Star layers use `steps()` — expect ~1 change/sec, not 60.
- **Stale screenshots**: this page idles at ZERO rAF, so after a DOM change with no animation (e.g. an IntersectionObserver class flip) `Page.captureScreenshot` can return the previous frame — content that is laid out, hit-testable, and computed-visible shows as unpainted black. Force a frame first (dirty `documentElement.style.filter`, wait two rAFs, clear it), and when pixels and `elementFromPoint` disagree, trust the DOM and fix the capture.

## Flows worth driving

- Hero: `window.scrollTo(0, document.documentElement.scrollHeight)` rides the crawl to the planet reveal (`.planet` becomes visible, rAF ~60/s).
- Navigation is user-driven only, no navbar anywhere. On `/` the journey navigates itself (`.rail__stop` anchors + corner chips, including a `GAME` chip → `/under-construction`, `GAME_LINK` in `src/constants/navigation.js`); `/terminal`, `/under-construction`, `/game` and 404 carry a single `.home-chip` back to `/`. `/game` renders only on the dev server until `GAME_SHIPPED`; builds redirect it. `/lab` and `/sport` are unlinked, reachable by URL only.
- Sport accordion: `.session-head` click opens a card (`.card.is-open`), `.exercise` click reveals `.meta-list`.
- Direct-load `/sport` also works (vite preview SPA fallback).
