# 🚀 Space Academy — Rust for Kids

A beautiful, tablet-friendly web elearning platform for teaching computational thinking to children through Rust.

## What This Is

A **12-week curriculum** delivered as a progressive web app that runs directly in any browser — no build step, no install required. Designed for Android tablets and Chromebooks.

## Quick Start

### Option 1: Open Directly (Simplest)
```bash
# Clone or copy the folder, then open in browser:
open space-academy/index.html
# Or on Android: copy the folder to the tablet and open index.html in Chrome
```
Note: opening via `file://` works for browsing lessons, but the service
worker (offline caching) and PWA install require serving over `http://`
or `https://` — use Option 2 or 3 for those.

### Option 2: Local Server (Recommended)
```bash
cd space-academy
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

### Option 3: Deploy Anywhere
Upload the entire `space-academy/` folder to any static host:
- **GitHub Pages**: push to a repo, enable Pages
- **Netlify Drop**: drag-and-drop deploy at netlify.com/drop
- **Cloudflare Pages**: connect repo or upload directly
- **Any web server**: Nginx, Apache, etc.

The app is fully offline-capable once loaded (service worker caches all assets).

## License System

Space Academy uses a **per-pilot license tier system**. Each pilot has their own license key that determines access to content.

| Feature | Explorer (Free) | Engineer | Commander |
|---------|:---:|:---:|:---:|
| Weeks | 1–2 | 1–8 | 1–12 |
| Lab: Cheat Sheet & Terms | ✅ | ✅ | ✅ |
| Lab: Wiring, Debug, Analogies, Mistakes | 🔒 | ✅ | ✅ |
| Playground | 🔒 | 🔒 | ✅ |

- **Explorer** — Free tier, limited to weeks 1–2 and basic Lab content
- **Engineer** — Full Lab access, weeks 1–8
- **Commander** — Full access to everything including Playground

### License Server

A headless Express API for license validation. Deploy to [Zeabur](https://zeabur.com) or any Node.js host.

```bash
cd server
npm install
ADMIN_API_KEY=your-secret-key PORT=3000 node index.js
```

Set `LICENSE_SERVER_URL` in `index.html` to your deployed server URL.

### License CLI Tool

Generate, list, revoke, and validate licenses. Zero npm dependencies.

```bash
# Generate a license
node tools/license.js generate --name Luna --tier engineer

# List all licenses
node tools/license.js list

# Revoke a license
node tools/license.js revoke --key SA-EN-xxxx-xxxx

# Validate a license
node tools/license.js validate --key SA-EN-xxxx-xxxx --name Luna
```

### Key Format
```
SA-{tier_code}-{name_base64}-{hmac_truncated}
Example: SA-EN-RGVtbw-1721550a6afa9077
```

## Project Structure

```
space-academy/
├── index.html                  # App shell (entry point)
├── manifest.json               # PWA manifest (with icons — installable)
├── sw.js                       # Service worker (offline support)
├── icons/                      # App icons (SVG + PNG, incl. maskable)
├── css/
│   └── styles.css              # Complete design system
├── server/                     # License validation server
│   ├── index.js                # Express API (validate, generate, revoke)
│   ├── licenses.json           # License database
│   ├── package.json
│   └── .gitignore
├── tools/
│   └── license.js              # CLI tool for license management
└── js/
    ├── data.js                 # Full 12-week curriculum content
    ├── progress.js             # localStorage progress tracking
    ├── license.js              # Client-side license validation & gating
    ├── router.js               # Client-side hash router
    ├── app.js                  # App initialization
    ├── sw-register.js          # Service worker registration
    ├── i18n.js                 # Bilingual (EN/ID) helpers
    ├── content/                # Guided lesson content (12 weeks)
    │   └── week01.js … week12.js
    └── views/
        ├── welcome.js          # Landing screen
        ├── pilot-select.js     # Choose/create pilot (with license key input)
        ├── missions.js         # Week selection grid
        ├── week-detail.js      # Individual week guided lesson
        ├── lab.js              # Reference materials (tier-gated tabs)
        ├── playground.js       # Code Playground (Commander tier)
        ├── profile.js          # Pilot stats, Quiz Stars, Flight Log
        ├── settings.js         # Pilot management, license, export/import
        └── about.js            # About & How to Use tabs
```

## Features

### Content
- **12 complete weeks** of Rust curriculum covering variables → structs → hardware
- **Guided Lesson System** — 11-section lessons per week
- **Interactive Quizzes** — instant feedback, stars awarded for improvement
- **Reflection Journal ("Flight Log")** — kids save written reflections per week
- **Quiz Stars display** — visual 0–3 star rating per completed quiz
- **Space Academy narrative** — each week is a mission story
- **Copy-to-clipboard** for all code examples
- **Syntax highlighting** for Rust code blocks

### Lab & Playground
- **Lab Reference** — cheat sheets, wiring diagrams, debug tips, glossary, analogies, common mistakes
- **Tier-gated tabs** — Explorer gets Cheat Sheet & Terms, Engineer+ gets all tabs
- **Code Playground** — write and run Rust in browser (Commander tier only)
- **Starter templates** — pre-loaded code for each week

### License & Access Control
- **Per-pilot licensing** — each pilot has their own tier
- **Online validation** — licenses verified against server on pilot selection
- **Tier-based content gating** — weeks, Lab tabs, and Playground locked by tier
- **Upgrade prompts** — clear notifications when accessing locked content
- **License management** — change license from Settings per pilot
- **Downgrade prevention** — cannot lower a pilot's tier
- **Name uniqueness** — case-insensitive pilot name check

### Multi-Pilot & Progress
- **Multi-pilot support** — each child gets their own saved profile
- **Progress tracking** — per-pilot completion, stars, ranks, checkpoint
- **Export/Import** — backup and restore progress as JSON
- **Bilingual** — full English + Bahasa Indonesia content, UI language toggle

### Technical
- **Zero dependencies** — vanilla JavaScript, no frameworks, no build step
- **Offline-ready** via service worker
- **Installable PWA** — add to home screen on Android tablets
- **Tablet-optimized** — large touch targets (44px+), responsive layout
- **Dark space theme** — easy on the eyes, no glare on tablets

## Design System

- **Font**: Inter (body) + JetBrains Mono (code)
- **Accent**: Purple (#7f5af0) with 12 unique week colors
- **Spacing**: 4px grid, generous whitespace
- **Touch targets**: Minimum 44×44px
- **Animations**: 150–300ms ease transitions, no infinite animations
- **Status states**: skeleton loading, empty states, error handling

## Curriculum Overview

| Arc | Weeks | Theme |
|-----|-------|-------|
| Foundations | 1–4 | Variables, conditionals, loops, functions |
| Systems Thinking | 5–8 | Structs, vectors, debugging, Cargo |
| Final Mission | 9–12 | Arduino robotics (LEDs → sensors → servo → demo day) |

### Thinking-Skill Arc (one per week)
1. **Decomposition** — break problems into steps
2. **Conditional Reasoning** — if/else logic
3. **Pattern Recognition** — find and name repetition
4. **Abstraction** — hide detail behind names
5. **Data Modeling** — structs & vectors as labeled pockets
6. **Sequencing** — order matters in state
7. **Diagnostic Reasoning** — read compiler clues
8. **Tool Selection** — pick the right Cargo command
9. **System Integration** — hardware + code together
10. **Feedback Loops** — sense → decide → act, forever
11. **Algorithm Design** — write the recipe
12. **Metacognition** — teach it to own it

Each week's guided lesson includes:
- **Big Idea** — one-sentence anchor + short story
- **Word Wall** — 4–6 kid-friendly definitions (EN/ID)
- **Thinking Skill** — hook, real-life analogy, code link, try-it activity
- **Code Walkthrough** — annotated lines from `data.js` code
- **Predictions** — 3 "what if" questions with answers
- **Challenges** — 4 tasks matching `data.js` checkboxes
- **Bug Hunt** — 3 common failures with fixes
- **Quiz** — 4–5 questions, instant feedback, stars for improvement
- **Reflection** — 2 prompts saved to Flight Log
- **Parent Corner** — prep checklist, talking points, stuck helpers

## Parent Notes

This app is designed to be used **alongside** the physical curriculum. The web guidebook supplements — not replaces — the hands-on parent-child coding sessions described in `docs/curriculum-rust-for-kids.md`.

For the best experience:
1. Set up the Chromebook Linux environment (one-time)
2. Order the Elegoo UNO R3 Starter Kit (~$30-40)
3. Open this app on the Android tablets for on-the-go reference
4. Follow the weekly lesson plans in the curriculum document

## License

Per-pilot license tiers. Explorer tier is free for personal and educational use. Engineer and Commander tiers unlock additional content. Contact your administrator for a license key.
