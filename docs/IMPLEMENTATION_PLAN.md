# Implementation Plan: Home-Use Enhancements

## Overview
Target: Single-day delivery for home-use optimizations, WASM playground, expanded quizzes.

## Phase 1: Expanded Quiz Banks (120 questions)
- Add 6 new questions per week (10 total/week)
- Each question: bilingual EN/ID, 4 options, explanation
- Topics: prediction recall, code tracing, concept application, debugging, extension
- Files: `js/content/week01.js` through `week12.js`

## Phase 2: WASM Rust Playground (Precompiled Approach)
- Create minimal Rust crate (`playground-evaluator`) with `wasm-bindgen`
- Compile to WASM (~20-50KB gzipped)
- Load in `js/views/playground.js` (new view)
- Features:
  - Monaco Editor (CDN) for syntax highlighting
  - Predefined snippets per week
  - Run button → WASM compiles + executes → shows output
  - Fallback to official Rust Playground for complex code

## Phase 3: Home-Use UX Improvements
- **Keyboard nav**: ←/→ arrows in week-detail view
- **Micro-celebrations**: confetti toast on challenge complete
- **Lab search**: filter cheat sheets/glossary
- **Copy feedback**: toast "Copied!" + checkmark
- **Progress persistence**: auto-save draft reflections

## Technical Details

### WASM Evaluator Crate Structure
```
playground-evaluator/
├── Cargo.toml
├── src/
│   ├── lib.rs          # wasm-bindgen exports
│   └── evaluator.rs    # Uses rustc_driver or simple eval
```

### Integration Points
- New view: `js/views/playground.js`
- New route in `router.js`: `#playground` or `#playground?week=3`
- CDN: Monaco Editor from `cdnjs.cloudflare.com`
- WASM binary served from `js/wasm/playground_evaluator_bg.wasm`

## File Changes
- 12 content files: expand quiz arrays
- New: `js/views/playground.js`
- New: `js/wasm/` directory with WASM binary
- Modified: `js/router.js`, `index.html`, `js/app.js`
- Modified: `js/views/week-detail.js` (keyboard nav, micro-celebrations)
- Modified: `js/views/lab.js` (search)
- Modified: `css/styles.css` (playground styles, confetti)