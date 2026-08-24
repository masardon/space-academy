# Rust for Kids — Full Curriculum
## Computational Thinking Through Play: 12 Weeks, 45 Minutes Each

**Instructor:** Parent  
**Students:** 2 children, ages 9+  
**Runtime:** 1 class/week, 45 minutes per session  
**Device Stack:** Chromebook (Linux/Crostini), Android tablets, Mini PC  

---

## Part 1: Teaching Philosophy & How to Use This Document

### The Core Belief
We are not teaching Rust. We are teaching **computational thinking** — the ability to break problems apart, spot patterns, build systems, and debug failures — using Rust as our tool of choice. If the kids leave excited and thinking differently about problems, the lesson succeeded regardless of how much syntax they absorbed.

### Gentle Mode = Modified Code
Every activity follows this pattern:
1. **Parent shows** a working program running on the Chromebook screen
2. **Kids predict** what will happen if we change one thing
3. **Parent types** the change while kids watch
4. **Kids observe** the result and discuss why
5. **Repeat** until someone says "my turn to pick what to change"

No one writes code from scratch in the first 8 weeks. By Week 9, at least one child should be volunteering suggestions for code changes.

### The 45-Minute Session Structure

| Time | Segment | What Happens |
|---|---|---|
| 0–5 min | **Story Check-In** | Recap last week's mission, connect to today's |
| 5–15 min | **Demo & Predict** | Parent runs current program; kids guess what happens when X changes |
| 15–30 min | **Hands-On Change** | Kids call out modifications; parent types them; observe results |
| 30–40 min | **Build/Play** | Expand the program together — add one feature of their choosing |
| 40–45 min | **Save & Tease** | Save work, show a sneak peek of next week's mission |

### Documentation You'll Need Per Session
Keep a simple log for each child:
- **Date / Week # / Mission name**
- **What they changed that surprised them**
- **One thing they explained back to you** (this is the comprehension check)
- **One question they asked** (this tells you what's clicking or confusing)

A shared Google Doc or notebook works. Revisit it every 3 weeks to see growth patterns.

---

## Part 2: Hardware & Environment Setup

### The Robot Kit (Worth ~$30–40)
**Recommended: Elegoo UNO R3 Starter Kit** (or any equivalent Arduino UNO clone kit)

This comes with everything needed for Weeks 9–12:
- 1× Arduino UNO R3 board
- 1× USB cable (Type-A to Type-B)
- 1× Breadboard (400-point)
- Assorted LEDs (red, yellow, green, blue) — 10+ pieces
- Resistors pack (220Ω, 1kΩ, 10kΩ)
- Jumper wires (male-male, male-female, female-female)
- 1× Ultrasonic distance sensor (HC-SR04)
- 1× Servo motor (SG90)
- 1× Buzzer module
- Push buttons, potentiometer, temperature sensor (nice-to-have extras)

**Where to buy:** Amazon (~$30–35 for Elegoo), AliExpress (~$25 shipped), or your local electronics store.

**Arduino IDE:** Download from arduino.cc — install on the Mini PC (Windows/Mac/Linux). The Chromebook Linux environment can also run it, but the Mini PC is more reliable for compiling and uploading sketches.

### Chromebook Linux Setup (One-Time, Parent Task)
```bash
# Enable Linux (Crostini) in Chromebook Settings → Developers
# Then open the Terminal app and run:
sudo apt update && sudo apt upgrade -y
sudo apt install rustc cargo git vscode -y
```

After installation, VS Code will appear in your Chromebook app drawer. Open it — you're ready.

### Project Folder Structure
Create this on the Chromebook's Linux filesystem (or synced via Google Drive):
```
/home/[user]/space-academy/
├── week01-character-stats/
│   ├── main.rs
│   └── notes.txt
├── week02-choice-portal/
│   ├── main.rs
│   └── story.txt
├── week03-repeating-door/
│   ├── main.rs
│   └── game_log.txt
├── week04-mission-control/
│   ├── main.rs
│   └── quiz_results.txt
├── week05-character-creator/
│   ├── main.rs
│   └── characters/
├── week06-inventory/
│   ├── main.rs
│   └── inventory.json
├── week07-glitch-protocol/
│   ├── broken_story.rs
│   └── fixed_story.rs
├── week08-equipment-upgrade/
│   └── my_first_cargo_project/
├── week09-lights-sounds/
│   └── arduino_sketch/
├── week10-sensor-eye/
│   └── arduino_sketch/
├── week11-movement-control/
│   └── arduino_sketch/
└── week12-demo-day/
    └── final_robot/
```

Each week, create the folder *before* class so the kids see progress accumulating.

---

## Part 3: Weekly Lesson Plans

### WEEK 1 — Meet Your Robot Sidekick
**Mission:** Design the stats for your Space Academy robot companion.

**Learning Objectives:**
- Variables hold values that can change
- Different types of data (numbers, text, true/false)
- `println!` prints to the screen

**Pre-Written Code (Parent types, kid watches):**

```rust
fn main() {
    // Your robot's stats — change these numbers!
    let robot_name = "Sparky";
    let robot_hp = 100;          // Health points
    let robot_speed = 5;         // Speed level
    let is_active = true;        // Is the robot online?

    println!("Welcome to Space Academy!");
    println!("Your robot sidekick is {}.", robot_name);
    println!("HP: {} | Speed: {} | Active: {}", robot_hp, robot_speed, is_active);
}
```

**Guided Questions (ask before changing anything):**
1. "What happens if I change `robot_speed` from 5 to 10?" → Kids predict, then parent changes it.
2. "What if `is_active` becomes `false`? Would that change what prints?" → Discuss.
3. "Can you think of another stat we should add?" → Take their idea (e.g., `let robot_power = 75;`) and add it live.

**Build-Together Moment (last 10 min):**
Ask each child to suggest one stat to add. Type it in together. Run it. See both robots' stats on screen.

**Takeaway:** Variables are like labeled boxes. You put something in, you can swap it out later, and the label never changes.

**Next Week Tease:** *"Next time, Sparky will face a fork in the road — and YOU get to decide what happens."*

---

### WEEK 2 — The Choice Portal
**Mission:** Help Sparky navigate a maze where every choice changes the story.

**Learning Objectives:**
- `if` / `else` creates branches in logic
- Comparisons (`==`, `>`, `<`) produce true or false
- String matching lets us make text-based decisions

**Pre-Written Code:**

```rust
fn main() {
    let choice = "left";  // Try changing this to "right"

    println!("You approach a choice portal...");
    println!("Left leads to the Crystal Caves. Right leads to the Rocket Hangar.");
    println!("Which way do you go?");

    if choice == "left" {
        println!("You enter the Crystal Caves.");
        println!("Glowing crystals light the path. You find a power cell!");
    } else if choice == "right" {
        println!("You walk to the Rocket Hangar.");
        println!("A spaceship gleams under the lights. It's ready for launch!");
    } else {
        println!("That path is blocked by a wall of code!");
        println!("Try 'left' or 'right'.");
    }
}
```

**Guided Questions:**
1. "What do you think happens if we type `let choice = \"right\";`?" → Predict, then change.
2. "What if we type something neither left nor right, like `choice = \"up\"`?" → Watch the else trigger.
3. "Can you invent a NEW choice and a new outcome?" → Add an `else if` branch live together.

**Build-Together Moment:**
Create a 3-branch story together. Each child picks a branch. Parent types it. Run it. See all three endings.

**Homework (Optional Fun):** Write a real-life "if/else" decision. Example: *"If it's raining, I bring an umbrella. Else, I wear sunglasses."* Share next week.

**Next Week Tease:** *"Next time, Sparky has to repeat actions — and we'll make it do something 10 times without writing 10 lines."*

---

### WEEK 3 — The Repeating Door
**Mission:** Program Sparky to knock on doors automatically until it finds the right one.

**Learning Objectives:**
- Loops repeat code without rewriting it
- `for` loops run a known number of times
- `while` loops run until a condition changes
- Randomness adds surprise

**Pre-Written Code (Option A — Number Guessing Game):**

```rust
use rand::Rng;  // We'll talk about this line later — it's how we get random numbers

fn main() {
    let secret_number = rand::thread_rng().gen_range(1..=10);
    let mut guess = 0;
    let mut attempts = 0;

    println!("🎯 I'm thinking of a number between 1 and 10.");
    println!("Can you guess it?");

    while guess != secret_number {
        println!("Take a guess:");
        // In a real program we'd read keyboard input here
        // For now, we simulate guesses:
        attempts += 1;
        guess = rand::thread_rng().gen_range(1..=10);
        println!("  Guess #{attempts}: {guess}");
    }

    println!("🎉 Found it in {attempts} attempts!");
    println!("The secret number was: {secret_number}");
}
```

**Pre-Written Code (Option B — Emoji Art Generator, simpler for Week 3):**

```rust
fn main() {
    println!("🌟 Emoji Art Generator 🌟\n");

    // Pattern 1: Row of stars
    for i in 1..=5 {
        print!("⭐ ");
    }
    println!("\n");

    // Pattern 2: Counting with emojis
    for number in 1..=10 {
        println!("{number} {emoji_count(number)}");
    }
}

fn emoji_count(n: i32) -> String {
    let mut result = String::new();
    for _ in 0..n {
        result.push_str("🚀");
    }
    result
}
```

**Recommendation:** Start with Option B (the emoji generator). It's visual, immediately satisfying, and the `for` loop concept clicks faster. Option A introduces randomness which is fun but adds a layer of complexity.

**Guided Questions:**
1. "What happens if I change `1..=5` to `1..=10`?" → Run it. Double the stars.
2. "What if I change `1..=10` to `1..=3`?" → Fewer rocket emojis per number.
3. "Can you make it print a different emoji, like 😎 or 🐙?" → Kids suggest, parent changes.

**Build-Together Moment:**
Create a custom pattern. Maybe: 3 rows of 5 stars, then 1 row of 3 moons. Each child contributes one line.

**Takeaway:** A loop is a machine that does the same thing over and over. You tell it HOW MANY times, and it handles the rest.

**Next Week Tease:** *"Next time, we turn our code into a machine that generates infinite quiz questions. Meet functions!"*

---

### WEEK 4 — The Mission Control Panel
**Mission:** Build a quiz generator that Sparky uses to train new cadets.

**Learning Objectives:**
- Functions bundle reusable blocks of code
- Parameters are inputs to functions
- `return` sends a value back
- Naming things well matters

**Pre-Written Code:**

```rust
fn generate_quiz_question() -> String {
    // This function creates a math problem
    let a: u32 = 7;
    let b: u32 = 3;
    format!("What is {a} + {b}?")
}

fn check_answer(question: &str, correct_answer: u32, user_guess: u32) -> String {
    if user_guess == correct_answer {
        format!("✅ Correct! {question} = {correct_answer}")
    } else {
        format!("❌ Wrong! {question} = {correct_answer}, not {user_guess}")
    }
}

fn main() {
    println!("🎖️  Space Academy Quiz Generator\n");

    let question = generate_quiz_question();
    println!("{}", question);
    println!("Answer: 10\n");

    let result = check_answer(&question, 10, 10);
    println!("{}", result);

    println!("\nTry changing the answer to 5 and see what happens!");
}
```

**Guided Questions:**
1. "What happens if I change `let a = 7` to `let a = 12` inside the function?" → New question with bigger numbers.
2. "What if I change `check_answer(&question, 10, 10)` to `check_answer(&question, 10, 5)`?" → Shows the wrong answer message.
3. "Can we make a function that greets the cadet by name?" → Together: `fn greet(cadet_name: &str) -> String { format!("Welcome, Cadet {cadet_name}!") }`

**Build-Together Moment:**
Add a second question function: `generate_addition_question()` and `generate_subtraction_question()`. Call both in `main()`. Kids see two questions printed.

**Takeaway:** A function is a recipe. You give it ingredients (parameters), it follows steps, and gives you back a result. You write it once, use it many times.

**Next Week Tease:** *"Next time, we design our own custom data types. No more plain variables — we're building objects!"*

---

### WEEK 5 — Design Your Character Creator
**Mission:** Build a system where each Space Academy cadet has a full profile.

**Learning Objectives:**
- Structs group related data together
- Methods attach behavior to data
- Multiple instances of the same struct coexist

**Pre-Written Code:**

```rust
struct Cadet {
    name: String,
    hp: u32,
    speed: u32,
    species: String,
}

impl Cadet {
    fn introduce(&self) {
        println!("✨ Cadet {} the {}!", self.name, self.species);
        println!("   HP: {} | Speed: {}", self.hp, self.speed);
    }

    fn is_fresh(&self) -> bool {
        self.hp >= 100
    }
}

fn main() {
    let cadet1 = Cadet {
        name: String::from("Luna"),
        hp: 100,
        speed: 8,
        species: String::from("Human"),
    };

    let cadet2 = Cadet {
        name: String::from("Zyx"),
        hp: 85,
        speed: 12,
        species: String::from("Vexarian"),
    };

    cadet1.introduce();
    println!();
    cadet2.introduce();

    println!("\nIs Luna fresh? {}", cadet1.is_fresh());
    println!("Is Zyx fresh? {}", cadet2.is_fresh());
}
```

**Guided Questions:**
1. "What if I add `let strength: u32 = 10` to the struct? What else would break?" → Good moment to show that adding a field requires updating every place you create a Cadet.
2. "What if I change `self.hp >= 100` to `self.hp > 50`?" → Different threshold for "fresh."
3. "Can you invent a new method?" → Suggested: `fn battle_stats(&self) -> String` that formats a battle-ready message.

**Build-Together Moment:**
Each child creates their own Cadet. Combine all three (including a parent-created one) and have them all introduce themselves. Print who is "fresh."

**Takeaway:** A struct is a blueprint. One blueprint, many copies. Each copy has its own values but shares the same methods.

**Next Week Tease:** *"Next time, we build an inventory system. What good is a character if they can't carry stuff?"*

---

### WEEK 6 — The Inventory System
**Mission:** Create a shared inventory that multiple cadets can access and modify.

**Learning Objectives:**
- Vectors are ordered lists that grow and shrink
- Iterating over collections lets you examine every item
- Ownership means only one thing can "use" a value at a time (introduced gently)

**Pre-Written Code:**

```rust
fn main() {
    let mut inventory: Vec<String> = Vec::new();

    println!("📦 Academy Supply Locker\n");

    // Add items
    inventory.push(String::from("Energy Cell"));
    inventory.push(String::from("Repair Kit"));
    inventory.push(String::from("Data Chip"));

    println!("Items in locker:");
    for (index, item) in inventory.iter().enumerate() {
        println!("  {}. {}", index + 1, item);
    }

    // Remove an item
    println!("\nCadets take the Repair Kit...");
    inventory.remove(1);

    println!("\nRemaining items:");
    for (index, item) in inventory.iter().enumerate() {
        println!("  {}. {}", index + 1, item);
    }
}
```

**Guided Questions:**
1. "What happens if we add 'Shield Generator' after the Data Chip?" → Run it. Watch the list grow.
2. "What if we remove index 0 instead of 1?" → First item goes, others shift up.
3. "Why does it say `mut` inventory? What breaks if we remove it?" → Show the compiler error. Explain: "The computer needs to know this list will change."

**Build-Together Moment:**
Create a second vector: `shared_inventory`. Show that pushing to one doesn't affect the other (intro to ownership — keep it light: "Each vector owns its own copy.").

**Takeaway:** A vector is a numbered shopping list. You can add items to the end, remove items, and look at every item in order.

**Next Week Tease:** *"Next time, we intentionally break code and learn to read error messages like a detective."*

---

### WEEK 7 — The Glitch Protocol
**Mission:** Fix three broken programs. Each one teaches you how to read Rust errors.

**Learning Objectives:**
- Compiler errors are clues, not failures
- Reading the FIRST error is critical (fixing one often reveals the next)
- Common error patterns: missing semicolons, type mismatches, unused variables

**The Three Broken Programs:**

**Glitch #1 — Missing Semicolon:**
```rust
// BROKEN — fix it!
fn main() {
    let greeting = "Hello, Cadet!"
    println!("{}", greeting);
}
```

**Glitch #2 — Type Mismatch:**
```rust
// BROKEN — fix it!
fn main() {
    let age: u32 = "five";
    println!("The cadet is {} years old.", age);
}
```

**Glitch #3 — Unused Variable:**
```rust
// BROKEN — fix it!
fn main() {
    let mission_code = 42;
    println!("Ready for launch!");
}
```

**Parent Script for Debugging Session:**
1. Copy each broken program into VS Code. Run it.
2. Show the kids the error message. Ask: "What does this error SAY it doesn't like?"
3. Point to the line number. Ask: "What's on that line that looks wrong?"
4. Let them suggest the fix. Type it. Run again.
5. Celebrate each fix, even tiny ones.

**Debugging Checklist Poster (make this together):**
```
🔍 RUST DEBUGGING CHECKLIST
□ Read the FIRST error — don't skip ahead
□ Find the line number mentioned
□ Look for: missing ;  /  wrong type  /  typo
□ Fix ONE thing at a time
□ Run again — sometimes fixing one error reveals the next
□ Ask: "What is the compiler TELLING me?"
```

**Takeaway:** Errors are the compiler talking to you. It's not mad — it's helping. Learn to listen.

**Next Week Tease:** *"Next time, we upgrade our equipment! We'll install Rust directly on your tablet and start organizing our projects like real engineers."*

---

### WEEK 8 — Equipment Upgrade Day
**Mission:** Set up your personal development environment and organize all previous work into proper Cargo projects.

**Learning Objectives:**
- Cargo is Rust's project manager (like a toolbox organizer)
- Projects have folders, a `Cargo.toml` config file, and a `src/main.rs`
- Running `cargo run` is the standard way to build and execute

**What Happens This Week:**

This is a transition week. Choose the path based on your setup:

**Path A — Move to Cargo Projects (on Chromebook):**
Create a proper Cargo project for one of the previous weeks' work:
```bash
cargo new space-academy-week1
cd space-academy-week1
# Copy the Week 1 code into src/main.rs
cargo run
```

Show the kids:
- The folder structure Cargo created automatically
- The `Cargo.toml` file (it's like a recipe card for the project)
- How `cargo run` compiles AND runs in one command

**Path B — Termux on Android Tablets (optional adventure):**
On each child's tablet:
```bash
pkg update && pkg upgrade
pkg install rust
rustc --version
echo 'fn main() { println!("Hello from my tablet!"); }' > hello.rs
rustc hello.rs
./hello
```

This is a "cool factor" moment. Even if they don't retain the commands, they'll remember "I ran Rust on my phone."

**Build-Together Moment:**
Each child names their first Cargo project. Run `cargo run` together. See the output. Save the project folder in Google Drive.

**Takeaway:** Real engineers don't just write files — they use tools that organize their work. Cargo is your first engineering tool.

**Next Week Tease:** *"Next week, we leave the screen. Your code will control real lights, sounds, and movement. Welcome to robotics."*

---

### WEEK 9 — Lights and Sounds
**Mission:** Build Sparky's communication system — blinking lights and alarm sounds.

**Hardware Needed:** Arduino UNO, USB cable, breadboard, 2× LEDs, 2× resistors (220Ω), 1× buzzer, jumper wires

**Wiring Diagram:**
```
         Arduino UNO
    ┌─────────────────┐
    │                 │
  [LED1]───[220Ω]────┤ Pin 13  (built-in LED)
    │                 │
  [LED2]───[220Ω]────┤ Pin 12
    │                 │
  [BUZZER+]──────────┤ Pin 11
    [-]──────────────┤ GND
    │                 │
   GND────────────────┴─────────────────
```

**Arduino Code (parent uploads via Mini PC):**
```cpp
// Week 9: Lights and Sounds
void setup() {
  pinMode(13, OUTPUT);  // Built-in LED
  pinMode(12, OUTPUT);  // External LED
  pinMode(11, OUTPUT);  // Buzzer
}

void loop() {
  // Pattern 1: Double blink
  digitalWrite(13, HIGH);
  delay(200);
  digitalWrite(13, LOW);
  delay(200);
  digitalWrite(13, HIGH);
  delay(200);
  digitalWrite(13, LOW);
  delay(300);

  // Pattern 2: Both LEDs + buzz
  digitalWrite(12, HIGH);
  digitalWrite(13, HIGH);
  digitalWrite(11, HIGH);
  delay(500);
  digitalWrite(12, LOW);
  digitalWrite(13, LOW);
  digitalWrite(11, LOW);
  delay(200);
}
```

**Rust Connection (discussion, not code this week):**
Show how the Rust program from Weeks 1–8 is doing the SAME THING — telling things to turn on and off, waiting, repeating. The Arduino code uses `delay()` instead of loops with `Thread::sleep`, but the logic is identical.

**Build-Together Moment:**
Ask each child: "Design a signal. Two flashes then a beep, or a slow pulse, or anything." Parent implements it. Run it. Compare to their mental model.

**Takeaway:** Code controls the physical world. Every blink and beep is a decision your program made.

**Next Week Tease:** *"Next time, Sparky gets eyes. An ultrasonic sensor that lets the robot 'see' how far away things are."*

---

### WEEK 10 — The Sensor Eye
**Mission:** Wire an ultrasonic sensor so Sparky can measure distance and react to obstacles.

**Hardware Needed:** Add HC-SR04 ultrasonic sensor to the Week 9 setup

**Wiring Diagram (HC-SR04):**
```
         Arduino UNO
    ┌─────────────────┐
    │                 │
  [VCC]───────────────┤ 5V
  [TRIG]──────────────┤ Pin 2
  [ECHO]──────────────┤ Pin 3
  [GND]───────────────┤ GND
    │                 │
   GND────────────────┴─────────────────
```

**Arduino Code:**
```cpp
// Week 10: Sensor Eye
const int trigPin = 2;
const int echoPin = 3;
const int ledPin = 13;
const int buzzerPin = 11;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  long duration;
  long distance;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  if (distance < 10) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(buzzerPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
    digitalWrite(buzzerPin, LOW);
  }

  delay(100);
}
```

**Rust Connection:**
Open the serial monitor (Tools → Serial Monitor in Arduino IDE). Watch the distance values change as you move your hand toward the sensor. Ask: "If this were Rust code, what would the `if distance < 10` look like?" Write it together on the board:

```rust
if distance < 10 {
    led.on();
    buzzer.on();
} else {
    led.off();
    buzzer.off();
}
```

**Build-Together Moment:**
Change the threshold from 10 cm to 20 cm. Watch the reaction distance change. Then try 5 cm. Discuss: "What did we just do? We changed a NUMBER and the behavior changed. That's parameterization."

**Takeaway:** Sensors turn the physical world into numbers your code can think about. A feedback loop: sense → decide → act.

**Next Week Tease:** *"Next time, Sparky gets a head that turns. Servos add movement, and your robot starts to feel alive."*

---

### WEEK 11 — Movement and Control
**Mission:** Add a servo motor so Sparky can scan for obstacles and react.

**Hardware Needed:** Add SG90 servo motor to the existing setup

**Wiring Diagram (Servo):**
```
         Arduino UNO
    ┌─────────────────┐
    │                 │
  [Servo Red]─────────┤ 5V
  [Servo Brown]───────┤ GND
  [Servo Orange]──────┤ Pin 9
    │                 │
   GND────────────────┴─────────────────
```

**Full Arduino Code (combining sensor + servo + LED + buzzer):**
```cpp
#include <Servo.h>

Servo scanner;
const int trigPin = 2;
const int echoPin = 3;
const int ledPin = 13;
const int buzzerPin = 11;

void setup() {
  scanner.attach(9);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Scan left to right
  for (int angle = 0; angle <= 180; angle += 5) {
    scanner.write(angle);
    delay(30);
    measureAndReact();
  }
  // Scan right to left
  for (int angle = 180; angle >= 0; angle -= 5) {
    scanner.write(angle);
    delay(30);
    measureAndReact();
  }
}

void measureAndReact() {
  long duration;
  long distance;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  if (distance < 15) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(buzzerPin, HIGH);
    Serial.println("OBSTACLE DETECTED!");
  } else {
    digitalWrite(ledPin, LOW);
    digitalWrite(buzzerPin, LOW);
  }
}
```

**Rust Connection — State Machine Discussion:**
Draw this on paper together:
```
Robot State Machine:
  [SCANNING] ──obstacle detected──→ [ALARM]
       ↑                              │
       └──── obstacle gone ──────────┘
```

Ask: "In Rust, how would we track whether the robot is currently scanning or in alarm mode?" Introduce the concept of `enum` states gently:

```rust
enum RobotState {
    Scanning,
    Alarm,
}

let mut state = RobotState::Scanning;
```

No need to implement it in Rust this week. The goal is connecting the physical behavior to an abstract state diagram.

**Build-Together Moment:**
Kids observe the robot scanning. They describe what they see. Parent asks: "What would you add? A backward function? A different alarm pattern?" Record ideas for the final project.

**Takeaway:** Robots are state machines. They sense, decide, act, and repeat. The code is just a loop that never ends.

**Next Week Tease:** *"Next week is Demo Day. You will present what you built, explain how it works, and show everyone your code."*

---

### WEEK 12 — Demo Day: Present Your Creation
**Mission:** Showcase your Space Academy robot and explain your coding journey.

**Preparation (Parent helps day of):**
1. Set up a demonstration station with the Arduino robot
2. Have each child's best Rust program from Weeks 1–8 printed or displayed on screen
3. Prepare a short "ceremony" — certificates, maybe a small trophy

**Presentation Structure (5 minutes per child):**
```
1. Show the robot in action (30 sec)
2. Explain ONE thing the code does (1 min)
3. Explain ONE bug they fixed or one thing they changed (1 min)
4. Tell the audience what they learned (1 min)
5. Q&A / celebration (1 min)
```

**Certificate Template:**
```
╔══════════════════════════════════════════╗
║                                          ║
║        SPACE ACADEMY GRADUATION          ║
║                                          ║
║   This certifies that                    ║
║   [Child's Name]                         ║
║   has completed the                      ║
║   Rust Computational Thinking            ║
║   Academy — 12 Missions                  ║
║                                          ║
║   Skills Acquired:                       ║
║   ✅ Variables & Data Types              ║
║   ✅ Conditional Logic                   ║
║   ✅ Loops & Repetition                  ║
║   ✅ Functions & Abstraction             ║
║   ✅ Structs & Objects                   ║
║   ✅ Collections & Vectors               ║
║   ✅ Debugging & Error Reading           ║
║   ✅ Hardware-Software Integration       ║
║   ✅ Systematic Problem Solving          ║
║                                          ║
║   Date: ___________                      ║
║   Instructor: ___________:               ║
║                                          ║
╚══════════════════════════════════════════╝
```

**Takeaway:** The goal was never to become a Rust expert. The goal was to think like an engineer — decompose problems, test hypotheses, debug systematically, and build things that work in the real world.

---

## Part 4: Complete Wiring Reference

### Week 9 — Basic LED + Buzzer
```
Component     │ Arduino Pin │ Resistor │ Notes
──────────────┼─────────────┼──────────┼─────────────────
Red LED       │ Pin 13      │ none     │ Built-in LED
              │             │          │ (also works as output)
LED (any)     │ Pin 12      │ 220Ω     │ Long leg (anode) to pin
              │             │          │ Short leg (cathode) to GND
Buzzer (+)    │ Pin 11      │ none     │ Active buzzer (no resistor)
Buzzer (-)    │ GND         │ —        │ 
USB Cable     │ —           │ —        │ Connects to Mini PC for upload
```

### Week 10 — Adding Ultrasonic Sensor (HC-SR04)
```
Component          │ Arduino Pin │ Notes
───────────────────┼─────────────┼──────────────────────────
HC-SR04 VCC        │ 5V          │ Power
HC-SR04 GND        │ GND         │ Ground
HC-SR04 TRIG       │ Pin 2       │ Trigger (output from Arduino)
HC-SR04 ECHO       │ Pin 3       │ Echo (input to Arduino)
(all previous       │ (keep wired)│ LEDs and buzzer stay connected)
```

### Week 11 — Adding Servo Motor (SG90)
```
Component          │ Arduino Pin │ Notes
───────────────────┼─────────────┼──────────────────────────
Servo Red wire     │ 5V          │ Power (draws current from 5V)
Servo Brown wire   │ GND         │ Ground
Servo Orange wire  │ Pin 9       │ Signal control
(all previous       │ (keep wired)│ Everything stays connected)
```

### Common Wiring Mistakes to Watch For
1. **LED backwards** — Long leg goes to the resistor, short leg to GND. If it doesn't light, flip it.
2. **Servo on 5V draws too much** — The Arduino 5V pin can handle one servo. Don't add motors that draw more than 500mA.
3. **Buzzer polarity** — Some buzzers work either way; active buzzers usually need + to pin, - to GND.
4. **Loose breadboard connections** — Push wires in firmly. A wiggly connection causes intermittent failures that are nightmare to debug.

---

## Part 5: Parent Script Template

Use this script template for every week. Fill in the bracketed parts before class.

```
── SESSION PLAN: Week [N] — "[Mission Name]" ──

PREP (Do before class, ~5 min):
  □ Open VS Code on Chromebook
  □ Navigate to this week's project folder
  □ Have the starter code ready to paste
  □ Charge Arduino / verify USB cable works (weeks 9+)

OPENING (0–5 min):
  Parent says: "[Recap last week in 1 sentence. Here's today's mission.]"
  Example: "Last week we made Sparky's inventory system. Today,
  Sparky needs to DEBUG a broken program. Can you read an error?"

DEMO & PREDICT (5–15 min):
  Parent: "Watch this program run. It should [expected behavior].
  Now I'm going to change ONE thing. Before I type it,
  what do YOU think will happen?"
  [Let them predict. Write their prediction on paper if helpful.]
  [Type the change. Run it. Compare to prediction.]

HANDS-ON CHANGES (15–30 min):
  Parent: "Now it's YOUR turn. Tell me what to change."
  [Record each change they suggest. Run each one.]
  [If they struggle to think of changes, offer two options:]
  "Should we try A) making it bigger/faster/different,
  or B) making it quieter/simpler/different?"

BUILD-TOGETHER (30–40 min):
  Parent: "Let's add ONE new thing together.
  What should Sparky [do/say/show] that we haven't done yet?"
  [Implement their suggestion. Make it visible.]

CLOSE (40–45 min):
  Parent: "Great work today. Next week: [tease].
  Let's save everything. [Help them click Save / commit to folder.]"

HOMEWORK (optional, 0–5 min):
  [Give ONE small observation task. Not code — just noticing.]
  Example: "Look around your house. Find three things that repeat
  on a schedule. We'll talk about them next time."
```

---

## Part 6: Troubleshooting Guide

### "The code won't compile"
1. Check for missing semicolons (`;`) at the end of lines
2. Check for mismatched braces (`{` and `}`)
3. Check spelling of variable names — `robot_name` ≠ `robotName`
4. Read the FIRST error message carefully; don't skip to the bottom

### "The Arduino won't upload"
1. Check the USB cable is plugged in firmly
2. In Arduino IDE, select the correct port (Tools → Port)
3. Select the correct board (Tools → Board → Arduino Uno)
4. Try a different USB cable — some cables are charge-only, not data cables

### "The LEDs aren't lighting"
1. Check polarity — long leg to resistor, short leg to GND
2. Check the resistor value — 220Ω is ideal; 1kΩ might be too dim
3. Check the wiring on the breadboard — rows are connected horizontally, columns vertically

### "The kids are frustrated"
1. STOP. Go back to something that worked.
2. Change the subject: "Let's look at what the OTHER kid's program does."
3. Remember: the goal is thinking, not finishing. A partial success with excitement beats a finished project with resentment.
4. End the session early if needed. Better to leave them wanting more.

### "We finished early"
1. Ask: "What's the CRAZIEST thing you could add?"
2. Let them explore without guidance for 5 minutes.
3. Come back together and share what they discovered.

### "We didn't finish"
1. That's okay. Note where you stopped.
2. Start next class by resuming, not restarting.
3. The narrative arc carries them forward even when the code doesn't complete.

---

## Part 7: What Comes After Week 12

This curriculum is a foundation, not a destination. Here are natural extensions:

**If they loved the hardware:**
- Buy a second Arduino — build a dual-robot system
- Add a motor driver (L298N) and build a moving robot
- Explore IoT: send sensor data to a web dashboard

**If they loved the Rust code:**
- Try the official Rust book (rust-lang.org/book) — skip chapters on ownership initially, come back later
- Build a text-based adventure game using everything learned
- Explore `wasm` (WebAssembly) — run Rust in the browser for interactive games

**If they want to keep the habit:**
- Set a recurring weekly "Space Academy" session (even monthly)
- Join online communities: r/rust, Discord servers for young coders
- Enter kid-friendly coding challenges (CodeCombat, Codingame junior)

**The most important metric:** Are they asking to code next time? If yes, you've succeeded. Everything else is bonus.
