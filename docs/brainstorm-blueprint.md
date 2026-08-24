# Blueprint: Rust for Kids — Computational Thinking Through Play

**Goal:** Teach 9+ year olds computational thinking (logic, structure, problem-solving) through Rust, using mini games, interactive stories, and a final robotics capstone — all within 10–12 weekly 45-minute sessions.

---

## Context

- **Learners:** 2 children, ages 9+, zero coding experience
- **Cadence:** 1 class/week, 45 minutes per session (mini fun activities only — no lectures)
- **Devices:** Android tablets (primary), 1 Chromebook with Linux/Crostini (Rust environment), 1 Mini PC (parent/demo machine)
- **Pedagogy:** Gentle mode — modify existing code, predict outcomes, break & fix. Never write from scratch. Focus on thinking skills, not syntax mastery.
- **Build types:** Simple games → Interactive stories → Robotics capstone
- **Hardware budget:** Minimal — recommend cheapest viable robotics kit (~$25-40 USD)
- **Language:** English (adjust if needed for home context)
- **Out of scope:** Professional Rust skills, competitive programming, advanced systems concepts, heavy hardware setup by kids

---

## Hardware & Environment Setup

### Recommended Robotics Kit (cheapest viable)
- **Arduino Starter Kit** (official or reputable clone like Elegoo UNO R3) — ~$30-40 on Amazon
- Includes: Arduino board, LEDs, resistors, breadboard, jumper wires, ultrasonic sensor, servo motor, push buttons, buzzer
- Alternative: **ESP32 DevKit** (~$6) + separate sensors — more flexible but slightly more complex wiring
- **Why Arduino over Raspberry Pi Pico for beginners?** Visual wiring on breadboard, enormous tutorial ecosystem, C-like syntax closer to Rust learning curve

### Device Roles Per Week
| Week | Primary Device | Why |
|---|---|---|
| 1–6 | Chromebook (Linux) / Web IDE fallback | Learn Rust fundamentals in gentle, guided environment |
| 7–8 | Chromebook + Android tablet side-by-side | Transition toTermux-style independence; tablets show output |
| 9–12 | Chromebook + Arduino hardware | Real projects, real outputs, real debugging |

### Environment Prep (Parent does once, takes ~1 hour)
1. Enable Linux on Chromebook (Crostini) — `sudo apt install rustc cargo`
2. Install VS Code or CodeAnywhere on Chromebook for kid-friendly editor
3. Set up Termux on Android tablets as backup: `pkg install rust`
4. Create shared Google Drive folder for saving project files between sessions
5. Pin browser bookmarks: rustpad.io (fallback), local VS Code instance

---

## Curriculum Structure (12 Weeks)

### Arc 1: Foundations — "The Code Academy Begins" (Weeks 1–4)
*Theme: You're a junior engineer at Space Academy. Each week, receive a new mission.*

- **Week 1 — Meet Your Robot Sidekick**
  - Activity: Modify a character stat program (change HP, speed, name)
  - Concepts: Variables, data types, println!
  - Thinking skill: Decomposition (break a character into attributes)
  - Output: A printable character card

- **Week 2 — The Choice Portal**
  - Activity: Interactive story where choices branch (if/else)
  - Concepts: Booleans, if/elif/else, string matching
  - Thinking skill: Conditional reasoning (if this, then that)
  - Output: A choose-your-own-adventure story

- **Week 3 — The Repeating Door**
  - Activity: Number-guessing game or emoji art generator
  - Concepts: Loops (loop, while, for), random numbers
  - Thinking skill: Pattern recognition (what repeats?)
  - Output: A playable mini-game

- **Week 4 — The Mission Control Panel**
  - Activity: Math quiz generator with scoring
  - Concepts: Functions, parameters, return values
  - Thinking skill: Abstraction (bundle repeated logic into a named block)
  - Output: A quiz that generates infinite problems

### Arc 2: Systems Thinking — "Building Your Tools" (Weeks 5–8)
*Theme: The Academy needs you to build equipment. Each tool solves a problem.*

- **Week 5 — Design Your Character Creator**
  - Activity: Define custom structs, instantiate multiple characters
  - Concepts: Structs, fields, methods (gentle introduction)
  - Thinking skill: Data modeling (what does this thing *have*?)
  - Output: A character builder that prints stats

- **Week 6 — The Inventory System**
  - Activity: Build a simple inventory/shop list with vectors
  - Concepts: Vectors, iterating over collections
  - Thinking skill: Sequencing (ordered collections, add/remove)
  - Output: A shopping list app with add/delete

- **Week 7 — The Glitch Protocol**
  - Activity: Debug a broken story program (intentional errors planted)
  - Concepts: Error reading, common compiler messages, debugging mindset
  - Thinking skill: Diagnostic reasoning (isolate the cause)
  - Output: Fixed programs + a "debugging checklist" poster

- **Week 8 — Equipment Upgrade Day**
  - Activity: Install Rust on Android via Termux OR move fully to Chromebook/Linux
  - Concepts: Project structure, Cargo basics (parent-led demo)
  - Thinking skill: Tool selection (why different tools for different jobs)
  - Output: Each kid has their own saved project folder

### Arc 3: Capstone — "The Final Mission" (Weeks 9–12)
*Theme: The Academy has been attacked. Build a robot to defend it.*

- **Week 9 — Lights and Sounds**
  - Activity: Wire LED + buzzer to Arduino, control with Rust (or Python as bridge)
  - Concepts: Hardware-software connection, input/output
  - Thinking skill: System integration (code ↔ physical world)
  - Output: Blinking light sequence + sound pattern

- **Week 10 — The Sensor Eye**
  - Activity: Ultrasonic sensor — robot "sees" distance
  - Concepts: Reading inputs, conditional hardware response
  - Thinking skill: Feedback loops (sensor → decision → action)
  - Output: Distance alarm (beep faster as object approaches)

- **Week 11 — Movement & Control**
  - Activity: Servo motor — robot head turns, obstacle avoidance logic
  - Concepts: State management, sequential actions
  - Thinking skill: Algorithm design (step-by-step procedures)
  - Output: A robot that reacts to obstacles

- **Week 12 — Demo Day: Present Your Creation**
  - Activity: Families/friends watch each kid demonstrate their robot + explain their code
  - Concepts: Communication, reflection, celebrating work
  - Thinking skill: Metacognition (explain your thinking process)
  - Output: Public demonstration + certificate of completion

---

## Key Decisions

1. **Gentle mode over zero-to-hero:** Kids modify working code first. Syntax comes from doing, not memorizing. Rationale: at 9 years old, frustration kills curiosity. We want them excited, not defeated by the borrow checker.

2. **Rust as the vehicle, not the destination:** Computational thinking is the goal. If a concept is easier in Python, we teach it in Python then map it back to Rust. Rationale: we're building thinkers, not junior Rust engineers.

3. **Narrative arc across all 12 weeks:** A single continuous story ("Space Academy") gives context, anticipation, and emotional investment. Rationale: abstract concepts stick when attached to meaning.

4. **Chromebook/Linux as primary runtime, Android as companion:** Full Rust env on Chromebook; tablets show outputs or run Termux later. Rationale: web IDEs can't save files reliably; Termux is too fiddly for week 1.

5. **Arduino for capstone, not robotics platform:** Use Arduino for sensors/actuators controlled by simple code (Python or Rust via serial). Rationale: full ROS/ROS2 is overkill; microcontrollers teach physical computing without drowning in abstraction.

6. **Parent demos, kid modifies:** For the first 8 weeks, parent runs the program; kid suggests changes, parent types them, kid predicts outcome. Rationale: typing is tedious for 9-year-olds; focus stays on thinking, not motor skills.

---

## Open Questions

- Does the family have access to an Arduino starter kit or similar hardware already?
- Is the Chromebook's Linux environment enabled, or does that need to be set up?
- Do the kids have any prior exposure to Scratch, Blockly, or other visual programming?
- Should Week 8's "Equipment Upgrade" be mandatory Termux install, or optional exploration?
- Is there a planned audience for Demo Day (other parents, siblings, recorded)?

---

## Hand-off

Paste this to the cloud model: "Expand docs/brainstorm-blueprint.md into a
full curriculum document with detailed weekly lesson plans, specific code
examples for each activity, Arduino wiring diagrams, and parent scripts.
Keep the decisions and structure; write the prose."
