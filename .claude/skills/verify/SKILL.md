---
name: verify
description: Build, serve, and drive this site in headless Chrome over raw CDP to verify runtime behavior (no browser-automation deps installed).
---

# Verify — karlquerel.github.io

No test framework, no Playwright/Puppeteer packages. Verify at the real surface with headless Chrome + raw CDP (Node 22+ has global `WebSocket` and `fetch`).

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
- **rAF activity**: wrap `requestAnimationFrame` via `Page.addScriptToEvaluateOnNewDocument` to count callbacks/sec — detects leaked animation loops (e.g. kept-alive HeroIntro's PixelPlanet).
- **Compositor cost of CSS animations**: sample `getComputedStyle(el).transform` every 100ms; distinct values ≈ frames the drift forced. Star layers use `steps()` — expect ~1 change/sec, not 60.

## Flows worth driving

- Hero: `window.scrollTo(0, document.documentElement.scrollHeight)` rides the crawl to the planet reveal (`.planet` becomes visible, rAF ~60/s).
- Navigation is user-driven only: `.nav-toggle` button → `a.site-chrome-link[href=...]`. `/sport` is only linked from About → LIFE portal (`.portal`) → `a[href="/sport"]`.
- Sport accordion: `.session-head` click opens a card (`.card.is-open`), `.exercise` click reveals `.meta-list`.
- Direct-load `/sport` also works (vite preview SPA fallback).
