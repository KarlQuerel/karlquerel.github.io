# CLAUDE.md — karlquerel.github.io

Personal portfolio website. Vue 3 + Vite + Vue Router + Firebase + NES.css (retro pixel aesthetic) + SCSS.
Deployed to GitHub Pages via gh-pages.

---

## Agent mindset

> The best code is the code you never wrote.

Before touching a file, ask: does this already exist? Can a composable, a CSS variable, or a router guard handle it in 3 lines instead of 30? Prefer deletion and simplification over addition. Write the laziest correct solution.

---

## Primary mission

This codebase must be **clean, extensible, and free of dead weight**. Every task — feature or refactor — must leave the code in a better state than it was found.

Non-negotiables:
- No dead code. If it is not used, delete it.
- No hardcoded values. Strings, colors, breakpoints, and magic numbers go into constants or SCSS variables.
- No duplicated logic. If it appears twice, extract it into a composable or utility.
- Every file must pass `npm run clean` before being considered done.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build | Vite 6 |
| Routing | Vue Router 4 |
| Backend/DB | Firebase 11 |
| CSS | NES.css + SCSS (pixel / retro aesthetic) |
| Linting | ESLint 8 (babel-parser, vue plugin, unused-imports) |
| Formatting | Prettier 3 |
| Deploy | gh-pages → GitHub Pages |

---

## Commands

```bash
npm run dev          # local dev server (Vite HMR)
npm run build        # production build → dist/
npm run serve        # preview built dist/
npm run clean        # lint:fix + format (run before every commit)
npm run format       # prettier + eslint fix + checks
npm run lint         # check only, no fix
npm run deploy       # build + copy 404.html + push to gh-pages
```

**Always run `npm run clean` before finishing any task.** Never leave lint or format errors.

The `postbuild` step copies `dist/index.html` → `dist/404.html` automatically — do not touch this manually.

---

## Project layout

```
src/
  assets/
    styles/       # global SCSS variables, mixins, resets
  components/     # reusable Vue components
  composables/    # shared logic (useX.js naming)
  constants/      # all hardcoded values (routes, labels, config keys)
  views/          # route-level page components
  router/         # Vue Router config (index.js)
  firebase/       # Firebase init + data composables
  App.vue
  main.js
```

---

## Code conventions

- Always use `<script setup>` (Composition API). No Options API.
- Props: `defineProps`, emits: `defineEmits`. Always typed.
- Composables in `src/composables/`, prefixed with `use` (e.g. `useFirestore.js`).
- Constants in `src/constants/` — no magic strings or numbers anywhere else.
- SCSS: scoped per component (`<style scoped lang="scss">`). Global tokens in `src/assets/styles/_variables.scss`.
- NES.css classes used directly in templates — do not wrap in custom classes without good reason.
- No inline styles. Ever.
- File names: `PascalCase` for components, `camelCase` for composables and utilities.
- Remove all unused imports, variables, props, and components — ESLint's unused-imports plugin enforces this.

---

## Refactoring rules

When touching existing code, always:
1. **Scan for dead code** — unused imports, unreachable branches, commented-out blocks. Delete them.
2. **Scan for duplication** — if the same logic exists in 2+ places, extract it.
3. **Scan for hardcoded values** — move them to `src/constants/` or SCSS variables.
4. **Check component size** — if a component exceeds ~150 lines, consider splitting it.
5. **Run `npm run clean`** — zero warnings, zero errors before finishing.

---

## Multi-agent orchestration

### Enable Agent Teams
```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

### Orchestrator protocol
1. **Plan first** — read `src/` structure, identify affected files, write a task list before any edits.
2. **Spawn dynamically** — create subagents with purpose-built prompts scoped to their specific concern. Do not assume a fixed agent roster.
3. **One file per agent** — never let two agents touch the same file simultaneously.
4. **Gate on lint** — no task is done until `npm run clean` passes cleanly.
5. **Review diff** — orchestrator reads the full diff and flags anything that breaks the retro aesthetic, introduces new dependencies, or leaves dead code behind.

### Subagent constraints
- Must run `npm run lint:check` before reporting done.
- Must not run `npm run deploy` — only the human does.
- Must not modify `vite.config.js`, `router/index.js`, or Firebase config without explicit orchestrator instruction.

---

## Design constraints

- **Retro pixel aesthetic is non-negotiable.** NES.css is the design system. Do not introduce Tailwind, Bootstrap, Material, or any other CSS framework.
- Animations must feel 8-bit — stepped, not smooth easing.
- Font choices must remain pixel-compatible (no system-ui or sans-serif as primary).
- Firebase: prefer Firestore, keep API keys in `.env` — never hardcode, never commit.

---

## Git discipline

- Push directly to `main` for normal feature work and visual iterations.
- Commit messages: conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`).
- **Branch only** for large or risky changes (restructuring routes, touching Firebase config) — so they can be reverted cleanly.
- `npm run deploy` is the only way to publish.

---

## What NOT to do

- Do not add a test framework unless explicitly asked — the test script is a placeholder.
- Do not switch from Composition API to Options API.
- Do not install new npm dependencies without asking — keep the bundle lean.
- Do not break the `dist/404.html` copy step — it's how GitHub Pages handles SPA routing.
- Do not leave TODO comments — either fix it now or open an issue.
- Do not leave console.log statements in committed code.
