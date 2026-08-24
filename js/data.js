// ============================================
// SPACE ACADEMY — Curriculum Data
// ============================================

const ACADEMY = {
  name: "Space Academy",
  tagline: "Learn Computational Thinking Through Rust",
  arcs: [
    { id: "foundations", name: "Arc 1: Foundations", subtitle: "The Code Academy Begins", color: "#7f5af0", weeks: [1,2,3,4] },
    { id: "systems", name: "Arc 2: Systems Thinking", subtitle: "Building Your Tools", color: "#2cb67d", weeks: [5,6,7,8] },
    { id: "capstone", name: "Arc 3: The Final Mission", subtitle: "Build a Robot to Defend the Academy", color: "#ff8906", weeks: [9,10,11,12] },
  ],
  weeks: [
    {
      week: 1,
      title: "Meet Your Robot Sidekick",
      emoji: "🤖",
      arc: "foundations",
      badge: "Variables & Data Types",
      thinking: "Decomposition",
      time: "45 min",
      hero: "You're a junior engineer at Space Academy. Your first mission: design the stats for your robot companion, Sparky.",
      mission: "Sparky needs a profile before the Academy can activate it. You must define every stat — name, health, speed, and more. Each stat is a variable, and you get to choose what goes inside.",
      objectives: [
        { icon: "📦", title: "Variables Hold Values", desc: "A variable is a labeled box. You put something in, you can swap it out later." },
        { icon: "🏷️", title: "Different Data Types", desc: "Numbers, text (strings), and true/false (booleans) are all different kinds of data." },
        { icon: "🖨️", title: "println! Prints to Screen", desc: "The println! macro shows output. You use {} as placeholders to insert values." },
      ],
      code: `fn main() {
    // Your robot's stats — change these numbers!
    let robot_name = "Sparky";
    let robot_hp = 100;          // Health points
    let robot_speed = 5;         // Speed level
    let is_active = true;        // Is the robot online?

    println!("Welcome to Space Academy!");
    println!("Your robot sidekick is {}.", robot_name);
    println!("HP: {} | Speed: {} | Active: {}", robot_hp, robot_speed, is_active);
}`,
      challenges: [
        "Change robot_name to your own name. What prints?",
        "Change robot_hp from 100 to 50. Does anything else change?",
        "Change is_active from true to false. What happens to the output?",
        "Add a new variable: let robot_power = 75;. Print it in the last line.",
      ],
      hint: "Every let statement creates a new box with a label. You can read the label anytime to get the value inside.",
      nextTease: "Next time, Sparky will face a fork in the road — and YOU get to decide what happens.",
    },
    {
      week: 2,
      title: "The Choice Portal",
      emoji: "🔮",
      arc: "foundations",
      badge: "Conditionals",
      thinking: "Conditional Reasoning",
      time: "45 min",
      hero: "Sparky reaches a choice portal in the Space Academy hallway. Two paths branch ahead. Your code decides which path Sparky takes.",
      mission: "Build an interactive story where choices matter. Every if/else is a door that opens only one way — and YOU program which doors open.",
      objectives: [
        { icon: "🔀", title: "if / else Branches Logic", desc: "Code can make decisions: IF this is true, do this. ELSE, do that instead." },
        { icon: "⚖️", title: "Comparisons Make Decisions", desc: "==, >, < check values and produce true or false answers." },
        { icon: "🔤", title: "String Matching", desc: "You can compare words too: if choice == \"left\" then go left." },
      ],
      code: `fn main() {
    let choice = "left";  // Try changing this to "right"

    println!("You approach a choice portal...");
    println!("Left leads to the Crystal Caves.");
    println!("Right leads to the Rocket Hangar.");
    println!("Which way do you go?");

    if choice == "left" {
        println!("You enter the Crystal Caves.");
        println!("Glowing crystals light the path.");
        println!("You find a power cell! 🔋");
    } else if choice == "right" {
        println!("You walk to the Rocket Hangar.");
        println!("A spaceship gleams under the lights.");
        println!("It's ready for launch! 🚀");
    } else {
        println!("That path is blocked by a wall of code!");
        println!("Try 'left' or 'right'.");
    }
}`,
      challenges: [
        "Change choice to \"right\". What happens?",
        "Change choice to \"up\". Watch the else trigger.",
        "Add a third option: else if choice == \"up\" with your own ending.",
        "Create a new story with at least 3 branches. What adventure do YOU want to tell?",
      ],
      hint: "The first matching condition wins. Once one branch runs, the rest are skipped. That's why order matters!",
      nextTease: "Next time, we'll make Sparky repeat actions without writing them over and over.",
    },
    {
      week: 3,
      title: "The Repeating Door",
      emoji: "🔁",
      arc: "foundations",
      badge: "Loops",
      thinking: "Pattern Recognition",
      time: "45 min",
      hero: "Sparky needs to knock on 10 doors to find the secret room. Instead of writing 10 knock commands, you teach Sparky to repeat.",
      mission: "Build programs that do things over and over — an emoji art generator, a counting machine, or a simple guessing game.",
      objectives: [
        { icon: "🔄", title: "for Loops Repeat Known Times", desc: "for i in 1..=10 runs the code inside 10 times, with i going from 1 to 10." },
        { icon: "🔃", title: "while Loops Repeat Until", desc: "while condition keeps going as long as the condition stays true." },
        { icon: "🎲", title: "Randomness Adds Surprise", desc: "rand::thread_rng().gen_range(1..=10) picks a random number each run." },
      ],
      code: `fn main() {
    println!("🌟 Emoji Art Generator 🌟\\n");

    // Pattern 1: Row of stars
    print!("Stars: ");
    for _ in 1..=5 {
        print!("⭐ ");
    }
    println!();

    // Pattern 2: Counting rockets
    for number in 1..=5 {
        print!("{} ", number);
        for _ in 0..number {
            print!("🚀");
        }
        println!();
    }

    println!("\nLoop complete! The robot knocked on {} doors.", 5);
}`,
      challenges: [
        "Change the star loop from 5 to 10. What doubles?",
        "Change the rocket loop to print 😎 instead of 🚀.",
        "Make a pattern that prints 3 rows of 4 hearts each: ❤️❤️❤️❤️",
        "Add a countdown using .rev(): what order do the numbers print in?",
      ],
      hint: "The underscore _ in 'for _ in' means 'I don't need this value.' It's like saying 'do this 5 times, but I don't care WHICH time.'",
      nextTease: "Next time, we bundle code into named packages called functions. Meet Mission Control!",
    },
    {
      week: 4,
      title: "The Mission Control Panel",
      emoji: "🎛️",
      arc: "foundations",
      badge: "Functions",
      thinking: "Abstraction",
      time: "45 min",
      hero: "Space Academy needs a quiz generator to train new cadets. Instead of writing the same questions again and again, you build a function machine.",
      mission: "Create functions that generate quiz questions and check answers. Functions are recipes — you write them once, use them many times.",
      objectives: [
        { icon: "⚗️", title: "Functions Bundle Code", desc: "fn name(params) { ... } packages logic into a reusable block you can call by name." },
        { icon: "📥", title: "Parameters Are Inputs", desc: "Things you pass into a function. They become variables inside the function." },
        { icon: "📤", title: "Return Values Send Results Back", desc: "-> String means the function gives back text. Use format!() to build it." },
      ],
      code: `fn generate_question() -> String {
    let a: u32 = 7;
    let b: u32 = 3;
    format!("What is {a} + {b}?")
}

fn check_answer(question: &str, correct: u32, guess: u32) -> String {
    if guess == correct {
        format!("✅ Correct! {question} = {correct}")
    } else {
        format!("❌ Wrong! {question} = {correct}, not {guess}")
    }
}

fn greet(cadet: &str) -> String {
    format!("Welcome, Cadet {cadet}! Your training begins now.")
}

fn main() {
    println!("🎖️  Space Academy Quiz Generator\\n");

    let welcome = greet("Luna");
    println!("{}", welcome);

    let q = generate_question();
    println!("\\n{}", q);
    println!("{}", check_answer(&q, 10, 10));
    println!("{}", check_answer(&q, 10, 5));
}`,
      challenges: [
        "Change the numbers inside generate_question(). What changes in the output?",
        "Call check_answer with different wrong guesses. See the ❌ message appear.",
        "Write a new function: fn say_emoji(emoji: &str, count: u32) -> String that returns repeated emojis.",
        "Create a second question function: generate_subtraction_question(). Call both from main().",
      ],
      hint: "A function is like a vending machine. You put inputs in the slot (parameters), it does its thing, and a result comes out the other side (return value).",
      nextTease: "Next time, we stop using plain variables and start building our own custom data types with structs!",
    },
    {
      week: 5,
      title: "Design Your Character Creator",
      emoji: "✨",
      arc: "systems",
      badge: "Structs",
      thinking: "Data Modeling",
      time: "45 min",
      hero: "Space Academy is recruiting! You need to define what a 'Cadet' looks like in code — their name, species, HP, speed, and special abilities.",
      mission: "Create a Cadet struct that groups related data together, then write methods that give each cadet superpowers like introducing themselves or checking if they're battle-ready.",
      objectives: [
        { icon: "🏗️", title: "Structs Group Related Data", desc: "struct Cadet { name: String, hp: u32, ... } defines a blueprint for creating cadets." },
        { icon: "⚡", title: "Methods Attach Behavior", desc: "impl Cadet { fn introduce(&self) { ... } } adds actions that cadets can perform." },
        { icon: "👥", title: "Multiple Instances Coexist", desc: "You can create many cadets from the same struct — each has its own values." },
      ],
      code: `struct Cadet {
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

    fn battle_ready(&self) -> String {
        if self.is_fresh() {
            format!("{} is at full health and ready for battle!", self.name)
        } else {
            format!("{} needs repairs! HP is {}.", self.name, self.hp)
        }
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

    println!("\\n--- Battle Status ---");
    println!("{} is fresh: {}", cadet1.name, cadet1.is_fresh());
    println!("{}", cadet2.battle_ready());
}`,
      challenges: [
        "Add a new field: power: u32 to the struct. Update both cadets to include it.",
        "Write a new method: fn damage(&mut self, amount: u32) that decreases HP.",
        "Create a third cadet with your own name and species. Make them introduce themselves.",
        "Change is_fresh to check hp > 50 instead of >= 100. What changes?",
      ],
      hint: "self is a reference to 'this' cadet. When you call cadet1.introduce(), self inside that method becomes cadet1. Each cadet has its own self!",
      nextTease: "Next time, we build an inventory system. What good is a character if they can't carry stuff?",
    },
    {
      week: 6,
      title: "The Inventory System",
      emoji: "📦",
      arc: "systems",
      badge: "Vectors & Collections",
      thinking: "Sequencing",
      time: "45 min",
      hero: "Space Academy's supply locker needs organizing. You'll build a shared inventory that cadets can add to and remove from — a growing list called a Vector.",
      mission: "Create a program that manages a supply locker. Add items, remove items, and print the current inventory. Learn how lists grow and shrink in Rust.",
      objectives: [
        { icon: "📋", title: "Vectors Are Growing Lists", desc: "Vec<T> holds an ordered collection. Use push() to add, remove() to take out." },
        { icon: "🔢", title: "Enumerate Adds Numbers", desc: ".enumerate() pairs each item with its index: (0, \"Apple\"), (1, \"Banana\"), ..." },
        { icon: "🔒", title: "mut Means Changeable", desc: "let mut inventory lets you modify the list. Without mut, the list is frozen." },
      ],
      code: `fn main() {
    let mut inventory: Vec<String> = Vec::new();

    println!("📦 Academy Supply Locker\\n");

    // Add items
    inventory.push(String::from("Energy Cell"));
    inventory.push(String::from("Repair Kit"));
    inventory.push(String::from("Data Chip"));

    println!("Items in locker:");
    for (index, item) in inventory.iter().enumerate() {
        println!("  {}. {}", index + 1, item);
    }

    // Remove an item
    println!("\\nCadet Luna takes the Repair Kit...");
    inventory.remove(1);

    println!("\\nRemaining items:");
    for (index, item) in inventory.iter().enumerate() {
        println!("  {}. {}", index + 1, item);
    }

    println!("\\nTotal items: {}", inventory.len());
}`,
      challenges: [
        "Add three more items to the inventory. What does the numbered list look like?",
        "Remove the FIRST item (index 0). Watch the others shift up.",
        "Create a second vector called 'shared_locker'. Push an item to inventory. Does shared_locker change? (No — each vector owns its own copy!)",
        "Try removing the word 'mut' from let mut inventory. Watch the compiler complain. That's ownership talking!",
      ],
      hint: "A vector is like a shopping list on a whiteboard. You can erase items, cross them out, and add new ones. But 'mut' is the eraser — without it, the list is carved in stone.",
      nextTease: "Next time, we INTENTIONALLY break code and learn to read error messages like detectives!",
    },
    {
      week: 7,
      title: "The Glitch Protocol",
      emoji: "🐛",
      arc: "systems",
      badge: "Debugging",
      thinking: "Diagnostic Reasoning",
      time: "45 min",
      hero: "A glitch has corrupted three Academy programs! Your mission: read the error messages, find the bugs, and restore the systems.",
      mission: "Fix three broken Rust programs. Each error message is a clue. The compiler isn't mad at you — it's trying to help. Learn to read errors like a detective.",
      objectives: [
        { icon: "🔍", title: "Read the First Error", desc: "Fixing the first error often reveals and fixes the next ones. Don't skip ahead!" },
        { icon: "📍", title: "Line Numbers Are Clues", desc: "The compiler tells you exactly which line has trouble. Check there first." },
        { icon: "🧩", title: "Common Bug Patterns", desc: "Missing semicolons, type mismatches, and typos are the usual suspects." },
      ],
      code: `// GLITCH #1 — Missing semicolon
fn main() {
    let greeting = "Hello, Cadet!"
    println!("{}", greeting);
}

// GLITCH #2 — Type mismatch
fn main() {
    let age: u32 = "five";
    println!("The cadet is {} years old.", age);
}

// GLITCH #3 — Unused variable
fn main() {
    let mission_code = 42;
    println!("Ready for launch!");
}`,
      challenges: [
        "Copy each program and try to run it. Read the error carefully.",
        "For Glitch #1: find the missing semicolon. What line does the error point to?",
        "For Glitch #2: the type doesn't match. Fix the value to match u32.",
        "For Glitch #3: the variable isn't used in the output. Add println! to use it.",
      ],
      hint: "Debugging checklist: (1) Read the FIRST error, (2) Find the line number, (3) Look for missing ; / wrong type / typo, (4) Fix ONE thing at a time, (5) Run again.",
      nextTease: "Next time, we upgrade our equipment! Install Rust on your tablet and organize projects like real engineers.",
    },
    {
      week: 8,
      title: "Equipment Upgrade Day",
      emoji: "🔧",
      arc: "systems",
      badge: "Cargo & Projects",
      thinking: "Tool Selection",
      time: "45 min",
      hero: "Real engineers don't just write files — they use tools that organize their work. Today you set up Cargo, Rust's project manager, and give each of your programs a proper home.",
      mission: "Transform your Week 1 program into a proper Cargo project. Learn about Cargo.toml, folder structure, and the cargo run command. This is the bridge to real-world development.",
      objectives: [
        { icon: "📁", title: "Project Structure", desc: "Cargo creates folders automatically: src/main.rs for code, Cargo.toml for config." },
        { icon: "🔑", title: "cargo run Builds & Runs", desc: "One command compiles AND executes. Much cleaner than rustc alone." },
        { icon: "🗂️", title: "Organized = Professional", desc: "Each week's work gets its own folder. Real engineers keep their workspace tidy." },
      ],
      code: `// After running: cargo new space-academy-week1
// Inside src/main.rs:

fn main() {
    println!("🔧 Equipment Upgraded!");
    println!("This project is managed by Cargo.");
    println!("Folder: space-academy-week1/");
    println!("Config: Cargo.toml");
    println!("Code:  src/main.rs");
    println!();
    println!("Run with: cargo run");
}`,
      challenges: [
        "Run these commands on the Chromebook: cargo new week1-stats && cd week1-stats",
        "Open the generated Cargo.toml. What does each section mean? (Discuss with parent)",
        "Put your Week 1 code into src/main.rs. Run cargo run. Same output, professional setup.",
        "Create a second project: cargo new week2-portal. Compare the two folder structures.",
      ],
      hint: "Think of Cargo as a robot assistant. You tell it 'make me a new project called X' and it builds the entire folder structure for you. You never have to think about organization — Cargo handles it.",
      nextTease: "Next week, we leave the screen. Your code will control REAL lights, sounds, and movement. Welcome to robotics!",
    },
    {
      week: 9,
      title: "Lights and Sounds",
      emoji: "💡",
      arc: "capstone",
      badge: "Hardware IO",
      thinking: "System Integration",
      time: "45 min",
      hero: "Sparky needs a communication system — blinking lights and alarm sounds. Today you wire LEDs and a buzzer to an Arduino and control them with code.",
      mission: "Build Sparky's first hardware prototype. Wire two LEDs and a buzzer to the Arduino. Write an Arduino sketch that creates blinking patterns and sound sequences.",
      objectives: [
        { icon: "💡", title: "LEDs Light Up", desc: "Pin 13 has a built-in LED. Pins 12 and others need external LEDs with resistors." },
        { icon: "🔊", title: "Buzzer Makes Sound", desc: "Pin 11 connects to a buzzer. digitalWrite(pin, HIGH) makes it beep." },
        { icon: "⏱️", title: "delay() Creates Timing", desc: "delay(ms) pauses execution. 1000ms = 1 second. Timing is everything in hardware." },
      ],
      code: `// Week 9: Lights and Sounds — Arduino Sketch
// Upload via Arduino IDE on Mini PC

void setup() {
  pinMode(13, OUTPUT);  // Built-in LED
  pinMode(12, OUTPUT);  // External red LED
  pinMode(11, OUTPUT);  // Buzzer
}

void loop() {
  // Pattern 1: Double blink (SOS style)
  digitalWrite(13, HIGH); delay(200); digitalWrite(13, LOW); delay(200);
  digitalWrite(13, HIGH); delay(200); digitalWrite(13, LOW); delay(300);

  // Pattern 2: Both LEDs + buzz
  digitalWrite(12, HIGH); digitalWrite(13, HIGH); digitalWrite(11, HIGH);
  delay(500);
  digitalWrite(12, LOW); digitalWrite(13, LOW); digitalWrite(11, LOW);
  delay(200);
}`,
      challenges: [
        "Change the delay values. Fast delays = frantic energy. Slow delays = dramatic.",
        "Design your OWN signal pattern. Parent implements it. Does it match your mental model?",
        "Compare this to Rust: digitalWrite = function call, delay = Thread::sleep. Same thinking, different language.",
        "What would happen if you removed the LOW statements? (Answer: LEDs stay on forever!)",
      ],
      hint: "Hardware code feels different from Rust because there's no compiler yelling at you. The Arduino language is more forgiving — but the THINKING is identical: tell things when to turn on, wait, then move on.",
      nextTease: "Next time, Sparky gets EYES. An ultrasonic sensor that measures distance and reacts to obstacles.",
    },
    {
      week: 10,
      title: "The Sensor Eye",
      emoji: "👁️",
      arc: "capstone",
      badge: "Sensors & Input",
      thinking: "Feedback Loops",
      time: "45 min",
      hero: "Sparky can see now! The ultrasonic sensor (HC-SR04) measures distance like a bat uses echolocation. When something gets too close, Sparky's LED blinks and the buzzer alarms.",
      mission: "Wire the ultrasonic sensor and read distance values. Create a feedback loop: sense distance → decide if too close → react with light and sound.",
      objectives: [
        { icon: "📡", title: "Ultrasonic Sensors Measure Distance", desc: "TRIG sends a sound pulse. ECHO measures how long it takes to return. Time = distance." },
        { icon: "🔄", title: "Feedback Loop: Sense → Decide → Act", desc: "Read sensor → compare to threshold → trigger response. This loop runs forever." },
        { icon: "📊", title: "Serial Monitor Shows Live Data", desc: "Serial.print() sends values to the computer. Open Serial Monitor to see live readings." },
      ],
      code: `// Week 10: The Sensor Eye — Arduino Sketch
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
}`,
      challenges: [
        "Open the Serial Monitor (Tools → Serial Monitor). Move your hand toward the sensor. What do the numbers do?",
        "Change the threshold from 10 to 20. The alarm triggers from farther away. What changed?",
        "Change it to 5. Now the alarm only triggers when things are VERY close. Discuss: what is a 'good' threshold?",
        "Translate this if/else to Rust: if distance < 10 { led.on(); buzzer.on(); } else { ... }",
      ],
      hint: "The sensor turns the PHYSICAL world into NUMBERS your code can think about. Distance < 10 isn't just a comparison — it's your robot 'feeling' something is near.",
      nextTease: "Next time, Sparky gets a head that TURNS. A servo motor adds movement, and your robot starts to feel alive.",
    },
    {
      week: 11,
      title: "Movement & Control",
      emoji: "🎯",
      arc: "capstone",
      badge: "Servo & State",
      thinking: "Algorithm Design",
      time: "45 min",
      hero: "Sparky's head can now scan left and right! A servo motor rotates to不同角度 while the ultrasonic sensor reads distance at each angle. Your robot is scanning for obstacles.",
      mission: "Add a servo motor to create a scanning robot. Combine sensor + servo + LED + buzzer into one system. Introduce the concept of state machines: scanning vs. alarming.",
      objectives: [
        { icon: "🔄", title: "Servo Motors Rotate", desc: "The SG90 servo turns to any angle (0–180°). servo.write(angle) positions it." },
        { icon: "🧠", title: "State Machines Model Behavior", desc: "The robot is either SCANNING or in ALARM mode. States help track what the robot is doing." },
        { icon: "🔗", title: "Full System Integration", desc: "Sensor + servo + LED + buzzer all working together. This is what engineering looks like." },
      ],
      code: `// Week 11: Movement & Control — Full Arduino Sketch
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
    Serial.println("⚠️ OBSTACLE DETECTED!");
  } else {
    digitalWrite(ledPin, LOW);
    digitalWrite(buzzerPin, LOW);
  }
}`,
      challenges: [
        "Watch the robot scan. At what angle does it detect the obstacle? Can you tell?",
        "Draw the state machine on paper: [SCANNING] → obstacle → [ALARM] → clear → [SCANNING]",
        "How would you translate this to Rust? Think: enum RobotState { Scanning, Alarm } and a while loop.",
        "What would you ADD to make this a real robot? (Extra sensors? Motors for wheels? A battery?)",
      ],
      hint: "Robots are STATE MACHINES. They sense, decide, act, and repeat. The code is just a loop that never ends — and that's okay. The robot is always doing something.",
      nextTease: "Next week is DEMO DAY! Present your robot, explain your code, and celebrate everything you've built.",
    },
    {
      week: 12,
      title: "Demo Day — Present Your Creation",
      emoji: "🏆",
      arc: "capstone",
      badge: "Showcase & Reflection",
      thinking: "Metacognition",
      time: "45 min",
      hero: "You made it! Twelve weeks of missions, code, debugging, and hardware. Now it's time to show everyone what you built at Space Academy — your robot, your code, and your journey.",
      mission: "Present your robot in action. Explain ONE thing your code does, ONE bug you fixed, and ONE thing you learned. Earn your Space Academy graduation certificate.",
      objectives: [
        { icon: "🎤", title: "Explain Your Work", desc: "Presentation isn't just showing — it's explaining YOUR thinking process to others." },
        { icon: "🪞", title: "Reflect on Growth", desc: "Look back at Week 1. What seemed impossible now feels natural? That's learning." },
        { icon: "🚀", title: "Celebrate Completion", desc: "You didn't just learn Rust — you learned HOW TO THINK like an engineer." },
      ],
      code: `// Demo Day — No new code needed!
// Show off what you built:

println!("🏆 Space Academy Graduate 🏆");
println!();
println!("Missions completed: 12/12");
println!("Skills mastered:");
println!("  ✅ Variables & Data Types");
println!("  ✅ Conditional Logic");
println!("  ✅ Loops & Repetition");
println!("  ✅ Functions & Abstraction");
println!("  ✅ Structs & Objects");
println!("  ✅ Collections & Vectors");
println!("  ✅ Debugging & Error Reading");
println!("  ✅ Hardware-Software Integration");
println!("  ✅ Systematic Problem Solving");
println!();
println!("Thank you, Space Academy!");`,
      challenges: [
        "Practice your 3-minute presentation: show the robot, explain one code concept, share one bug you fixed.",
        "Write down the biggest challenge you faced and how you overcame it.",
        "Think about what you'd build NEXT if you had more time. Sketch an idea.",
        "Take a photo of your robot and code for your portfolio.",
      ],
      hint: "The goal was never to become a Rust expert. The goal was to think like an engineer — decompose problems, test hypotheses, debug systematically, and build things that work in the real world. You did that.",
      nextTease: null,
    },
  ],
};

// Helper: get arc for a week
function getWeekArc(weekNum) {
  return ACADEMY.arcs.find(a => a.weeks.includes(weekNum));
}

// Helper: get week color
function getWeekColor(weekNum) {
  const colors = {
    1: "#7f5af0", 2: "#2cb67d", 3: "#ff8906", 4: "#3da9fc",
    5: "#e53170", 6: "#9b5de5", 7: "#f15bb5", 8: "#00bbf9",
    9: "#00f5d4", 10: "#fee440", 11: "#f15bb5", 12: "#ff6b6b",
  };
  return colors[weekNum] || "#7f5af0";
}
