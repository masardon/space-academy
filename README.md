# 🚀 Space Academy — Rust for Kids

A beautiful, tablet-friendly web elearning platform for teaching computational thinking to children through Rust.

## What This Is

A **12-week curriculum** delivered as a progressive web app that runs directly in any browser — no server, no build step, no install required. Designed for Android tablets and Chromebooks.

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

## Project Structure

```
space-academy/
├── index.html              # App shell (entry point)
├── manifest.json           # PWA manifest (with icons — installable)
├── sw.js                   # Service worker (offline support)
├── icons/                  # App icons (SVG + PNG, incl. maskable)
│   ├── icon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-maskable-512.png
├── css/
│   └── styles.css          # Complete design system (~1800 lines)
└── js/
    ├── data.js             # Full 12-week curriculum content
    ├── progress.js         # localStorage progress tracking
    ├── router.js           # Client-side hash router
    ├── app.js              # App initialization
    ├── sw-register.js      # Service worker registration
    ├── i18n.js             # Bilingual (EN/ID) helpers
    ├── content/            # Guided lesson content (12 weeks)
    │   ├── week01.js … week12.js
    └── views/
        ├── welcome.js      # Landing screen
        ├── pilot-select.js # Choose/create pilot
        ├── missions.js     # Week selection grid
        ├── week-detail.js  # Individual week guided lesson
        ├── lab.js          # Reference materials (cheat sheets, wiring diagrams)
        ├── profile.js      # Pilot stats, Quiz Stars, Flight Log
        └── settings.js     # Export/import/reset data, language toggle
```

## Features

- **12 complete weeks** of Rust curriculum covering variables → structs → hardware
- **Guided Lesson System** — 11-section lessons per week: Big Idea, Word Wall, Thinking Skill, Code Walkthrough, Predictions, Challenges, Bug Hunt, Quiz, Reflection, Parent Corner
- **Interactive Quizzes** — instant feedback, stars awarded for improvement, bilingual (EN/ID)
- **Reflection Journal ("Flight Log")** — kids save written reflections per week
- **Quiz Stars display** — visual 0-3 star rating per completed quiz
- **Bilingual** — full English + Bahasa Indonesia content, UI language toggle
- **Space Academy narrative** — each week is a mission story
- **Progress tracking** — per-pilot completion, stars, ranks, checkpoint
- **Multi-pilot support** — each child gets their own saved profile
- **Copy-to-clipboard** for all code examples
- **Syntax highlighting** for Rust code blocks
- **Lab reference section** with cheat sheets, wiring diagrams, and debugging guides
- **Glossary** of Rust terms
- **Export/Import** progress as JSON
- **Offline-ready** via service worker (v3 caches all lesson files)
- **Installable PWA** — add to home screen on Android tablets (icons included)
- **Tablet-optimized** — large touch targets (44px+), responsive layout, safe-area support
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

Free for personal and educational use. Build something awesome! 🚀
