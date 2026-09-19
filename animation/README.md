# Animated profile source

The entire visible GitHub profile is authored as React/Remotion compositions. GitHub does not execute React or JavaScript inside a README, so the compositions are rendered into optimized, infinitely looping GIF reels under `assets/`.

## Reels

| Composition | Source canvas | Duration | README export | Purpose |
|---|---:|---:|---:|---|
| `ProfileLoop` | 960 × 400 | 8s | 960px · 10 FPS | Opening Shoya/Peter exposure |
| `IdentityLoop` | 960 × 560 | 10s | 800px · 6 FPS | Identity, repair, and responsibility |
| `ProjectsLoop` | 960 × 620 | 12s | 800px · 6 FPS | Five-project evidence reel |
| `FieldManualLoop` | 960 × 560 | 10s | 800px · 6 FPS | Tools, principles, development route, and contact |

The information reels render at a lower delivery frame rate because their animation is deliberately slow. This keeps text crisp while reducing the combined README payload substantially.

## Commands

Install the exact locked dependencies:

```powershell
npm install
```

Open the interactive editor:

```powershell
npm run animation:studio
```

Render every README reel:

```powershell
npm run animation:render
```

List and validate registered compositions:

```powershell
npm run animation:compositions
```

## Structure

- `ProfileLoop.jsx` — opening cinematic.
- `sections/IdentityLoop.jsx` — personal and character philosophy reel.
- `sections/ProjectsLoop.jsx` — repository evidence reel.
- `sections/FieldManualLoop.jsx` — stack, principles, workflow, and contact reel.
- `shared/FilmShell.jsx` — shared visual grammar and animation helpers.
- `profileData.js` — project, tool, and principle content.
- `render-all.mjs` — cross-platform deterministic GIF export.

Source artwork is loaded directly from `assets/`. Keep animation localized where possible: full-frame photographic movement makes GIFs disproportionately large.
