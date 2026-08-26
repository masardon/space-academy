// ============================================
// SPACE ACADEMY — Playground View (Code Evaluator)
// ============================================

window.Views = window.Views || {};
Views.playground = (params) => {
  const main = document.getElementById("mainContent");
  const weekParam = params?.week;
  const t = (x) => I18N.t(x);

  main.innerHTML = `
    <div class="view">
      <div class="section-header">
        <h2>${t({ en: "🧪 Code Playground", id: "🧪 Taman Kode" })}</h2>
        <p>${t({ en: "Write, run, and experiment with Rust code — right here in your browser.", id: "Tulis, jalankan, dan bereksperimen dengan kode Rust — langsung di browser." })}</p>
      </div>

      <div class="pills" style="margin-bottom:16px;">
        ${[1,2,3,4,5,6,7,8].map(w => `
          <button class="pill ${weekParam == w ? 'active' : ''}" 
                  onclick="Router.navigate('playground',{week:'${w}'})"
                  aria-label="${t({ en: "Week", id: "Minggu" })} ${w} ${t({ en: "starter", id: "starter" })}">${w}</button>
        `).join('')}
        <button class="pill ${!weekParam ? 'active' : ''}" 
                onclick="Router.navigate('playground',{})"
                aria-label="${t({ en: "Blank slate", id: "Kosong" })}">${t({ en: "Blank", id: "Kosong" })}</button>
      </div>

      <div class="playground-split">
        <!-- Editor Panel -->
        <div class="playground-panel editor-panel">
          <div class="panel-header">
            <span>${t({ en: "📝 Editor", id: "📝 Editor" })}</span>
            <div class="editor-toolbar">
              <button class="btn-icon" id="btnFormat" title="${t({ en: "Format", id: "Format" })}" aria-label="${t({ en: "Format code", id: "Format kode" })}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="19" x2="10" y2="5"/><line x1="14" y1="19" x2="14" y2="5"/><line x1="18" y1="19" x2="18" y2="5"/></svg>
              </button>
              <button class="btn-icon" id="btnClear" title="${t({ en: "Clear", id: "Bersihkan" })}" aria-label="${t({ en: "Clear editor", id: "Bersihkan editor" })}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
          <div class="editor-wrapper">
            <textarea id="codeEditor" class="code-editor" spellcheck="false" placeholder="${t({ en: "// Type Rust code here...", id: "// Tulis kode Rust di sini..." })}\nfn main() {\n    println!(\"${t({ en: "Hello, Space Academy!", id: "Halo, Space Academy!" })}\");\n}"></textarea>
          </div>
        </div>

        <!-- Output Panel -->
        <div class="playground-panel output-panel">
          <div class="panel-header">
            <span>${t({ en: "📤 Output", id: "📤 Keluaran" })}</span>
            <div class="output-toolbar">
              <button class="btn-icon" id="btnCopyOutput" title="${t({ en: "Copy output", id: "Salin keluaran" })}" aria-label="${t({ en: "Copy output", id: "Salin keluaran" })}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
              <button class="btn-icon" id="btnClearOutput" title="${t({ en: "Clear output", id: "Bersihkan keluaran" })}" aria-label="${t({ en: "Clear output", id: "Bersihkan keluaran" })}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
          <div class="output-wrapper">
            <pre id="codeOutput" class="code-output"><span class="output-hint">${t({ en: "Click ▶ Run to see output...", id: "Klik ▶ Jalankan untuk lihat keluaran..." })}</span></pre>
          </div>
        </div>
      </div>

      <!-- Run Button -->
      <div style="text-align:center;margin-top:16px;">
        <button class="btn btn-primary btn-large" id="btnRun" onclick="Views.runPlaygroundCode()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          ${t({ en: "Run Code", id: "Jalankan Kode" })}
        </button>
        <span id="runStatus" style="margin-left:12px;font-size:0.875rem;color:var(--text-muted);"></span>
      </div>

      <!-- Starter Templates -->
      <details class="starter-templates" style="margin-top:24px;">
        <summary style="cursor:pointer;font-weight:600;color:var(--accent-light);">${t({ en: "📚 Starter Templates (click to load)", id: "📚 Template Starter (klik untuk muat)" })}</summary>
        <div class="template-grid" style="margin-top:12px;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));">
          ${PLAYGROUND_TEMPLATES.map(tmpl => `
            <button class="card template-card" onclick="Views.loadTemplate('${tmpl.id}')" style="text-align:left;">
              <strong>${t({ en: tmpl.title, id: tmpl.title })}</strong>
              <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:4px;">${t({ en: tmpl.desc, id: tmpl.desc })}</p>
            </button>
          `).join('')}
        </div>
      </details>
    </div>
  `;

  // Load starter code if week param provided
  if (weekParam) {
    setTimeout(() => Views.loadWeekStarter(parseInt(weekParam)), 100);
  }

  // Setup editor keyboard shortcuts
  const editor = document.getElementById('codeEditor');
  if (editor) {
    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // Auto-indent
        const cursorPos = editor.selectionStart;
        const lineStart = editor.value.lastIndexOf('\n', cursorPos - 1) + 1;
        const currentLine = editor.value.slice(lineStart, cursorPos);
        const indentMatch = currentLine.match(/^(\s*)/);
        if (indentMatch) {
          e.preventDefault();
          const indent = indentMatch[1];
          const newIndent = indent + (currentLine.trim().endsWith('{') ? '  ' : '');
          document.execCommand('insertText', false, '\n' + newIndent);
        }
      }
      // Ctrl/Cmd + Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        Views.runPlaygroundCode();
      }
    });
  }

  // Attach toolbar button handlers
  const btnFormat = document.getElementById('btnFormat');
  if (btnFormat) {
    btnFormat.addEventListener('click', function() {
      const editor = document.getElementById('codeEditor');
      if (editor) {
        // Basic formatting: just ensure consistent indentation
        const lines = editor.value.split('\n');
        let indent = 0;
        const formatted = lines.map(function(line) {
          var trimmed = line.trim();
          if (trimmed.startsWith('}') || trimmed.startsWith('} else') || trimmed.startsWith('else')) {
            indent = Math.max(0, indent - 2);
          }
          var result = ' '.repeat(indent) + trimmed;
          if (trimmed.endsWith('{') || trimmed.endsWith('{ ')) {
            indent += 2;
          }
          return result;
        });
        editor.value = formatted.join('\n');
        Views.updateRunStatus(t({ en: "Formatted", id: "Diformat" }));
      }
    });
  }

  var btnClear = document.getElementById('btnClear');
  if (btnClear) btnClear.addEventListener('click', Views.clearEditor);

  var btnCopyOutput = document.getElementById('btnCopyOutput');
  if (btnCopyOutput) btnCopyOutput.addEventListener('click', Views.copyOutput);

  var btnClearOutput = document.getElementById('btnClearOutput');
  if (btnClearOutput) btnClearOutput.addEventListener('click', Views.clearOutput);
};

// Playground starter templates
const PLAYGROUND_TEMPLATES = [
  { id: 'hello', title: 'Hello World', desc: 'Your first Rust program' },
  { id: 'variables', title: 'Variables & Types', desc: 'Strings, numbers, booleans' },
  { id: 'conditionals', title: 'If / Else', desc: 'Making decisions' },
  { id: 'loops', title: 'For & While Loops', desc: 'Repeating code' },
  { id: 'functions', title: 'Functions', desc: 'Reusable code blocks' },
  { id: 'structs', title: 'Structs & Methods', desc: 'Custom data types' },
  { id: 'vectors', title: 'Vectors', desc: 'Growing lists' },
];

// Week-specific starter code
const WEEK_STARTERS = {
  1: `fn main() {
    // Your robot's stats — change these numbers!
    let robot_name = "Sparky";
    let robot_hp = 100;
    let robot_speed = 5;
    let is_active = true;

    println!("Welcome to Space Academy!");
    println!("Your robot sidekick is {}.", robot_name);
    println!("HP: {} | Speed: {} | Active: {}", robot_hp, robot_speed, is_active);
}`,
  2: `fn main() {
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
  3: `fn main() {
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

    println!("\\nLoop complete! The robot knocked on {} doors.", 5);
}`,
  4: `fn generate_question() -> String {
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
  5: `struct Cadet {
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
  6: `fn main() {
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
  7: `// GLITCH #1 — Missing semicolon
fn main() {
    let greeting = "Hello, Cadet!";
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
}
`,
  8: `// After running: cargo new space-academy-week1
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
};

// Template code snippets
const TEMPLATE_CODE = {
  hello: `fn main() {
    println!("Hello, Space Academy! 🚀");
}`,
  variables: `fn main() {
    let name = "Sparky";      // String (text)
    let hp = 100;             // Integer (whole number)
    let speed = 5.5;          // Float (decimal)
    let is_active = true;     // Boolean (true/false)

    println!("Name: {}", name);
    println!("HP: {}", hp);
    println!("Speed: {}", speed);
    println!("Active: {}", is_active);
}`,
  conditionals: `fn main() {
    let choice = "left";  // Try: "right", "up"

    if choice == "left" {
        println!("You go left! 🌟");
    } else if choice == "right" {
        println!("You go right! 🚀");
    } else {
        println!("That path is blocked! 🚧");
    }
}`,
  loops: `fn main() {
    // For loop
    println!("Counting up:");
    for i in 1..=5 {
        println!("{}", i);
    }

    // While loop
    println!("\\nCounting down:");
    let mut count = 5;
    while count > 0 {
        println!("{}...", count);
        count -= 1;
    }
    println!("Blastoff! 🚀");
}`,
  functions: `fn greet(name: &str) -> String {
    format!("Hello, {}! 👋", name)
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    println!("{}", greet("Cadet"));
    println!("5 + 3 = {}", add(5, 3));
}`,
  structs: `struct Robot {
    name: String,
    hp: u32,
    speed: u32,
}

impl Robot {
    fn status(&self) {
        println!("{} | HP: {} | Speed: {}", self.name, self.hp, self.speed);
    }
}

fn main() {
    let sparky = Robot {
        name: String::from("Sparky"),
        hp: 100,
        speed: 10,
    };
    sparky.status();
}`,
  vectors: `fn main() {
    let mut items = Vec::new();
    
    items.push("Energy Cell");
    items.push("Repair Kit");
    items.push("Data Chip");
    
    println!("Inventory:");
    for (i, item) in items.iter().enumerate() {
        println!("{}. {}", i + 1, item);
    }
    
    println!("\\nTotal: {}", items.len());
}`,
};

// Evaluator state
let evaluatorReady = false;

Views.loadWeekStarter = (week) => {
  const code = WEEK_STARTERS[week];
  if (code) {
    const editor = document.getElementById('codeEditor');
    if (editor) {
      editor.value = code;
      Views.updateRunStatus(I18N.t({ en: I18N.ui.en.pg_loaded_week, id: I18N.ui.id.pg_loaded_week }).replace('{num}', week));
    }
  }
};

Views.loadTemplate = (id) => {
  const code = TEMPLATE_CODE[id];
  if (code) {
    const editor = document.getElementById('codeEditor');
    if (editor) {
      editor.value = code;
      Views.updateRunStatus(I18N.t({ en: I18N.ui.en.pg_loaded_template, id: I18N.ui.id.pg_loaded_template }).replace('{id}', id));
    }
  }
};

Views.updateRunStatus = (msg) => {
  const el = document.getElementById('runStatus');
  if (el) el.textContent = msg;
};

Views.clearEditor = () => {
  const editor = document.getElementById('codeEditor');
  if (editor) editor.value = '';
  Views.updateRunStatus(I18N.t({ en: I18N.ui.en.pg_editor_cleared, id: I18N.ui.id.pg_editor_cleared }));
};

Views.clearOutput = () => {
  const output = document.getElementById('codeOutput');
  const t = (x) => I18N.t(x);
  if (output) output.innerHTML = `<span class="output-hint">${t({ en: "Click ▶ Run to see output...", id: "Klik ▶ Jalankan untuk lihat keluaran..." })}</span>`;
  Views.updateRunStatus(t({ en: "Output cleared", id: "Keluaran dibersihkan" }));
};

Views.copyOutput = () => {
  const output = document.getElementById('codeOutput');
  const t = (x) => I18N.t(x);
  if (output) {
    navigator.clipboard.writeText(output.textContent).then(() => {
      Views.updateRunStatus(t({ en: "Output copied!", id: "Keluaran disalin!" }));
    });
  }
};

// Simple Rust code evaluator (simulates execution for lesson patterns)
Views.runPlaygroundCode = async () => {
  const editor = document.getElementById('codeEditor');
  const output = document.getElementById('codeOutput');
  const runBtn = document.getElementById('btnRun');
  const t = (x) => I18N.t(x);
  
  if (!editor || !output) return;
  
  const code = editor.value.trim();
  if (!code) {
    Views.updateRunStatus(t({ en: "Editor is empty", id: "Editor kosong" }));
    return;
  }

  runBtn.disabled = true;
  runBtn.innerHTML = `<svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg> ${t({ en: "Running...", id: "Menjalankan..." })}`;
  Views.updateRunStatus(t({ en: "Evaluating...", id: "Mengevaluasi..." }));

  // Simulate async execution
  await new Promise(r => setTimeout(r, 300));

  try {
    const result = Views.evaluateRustLike(code);
    output.innerHTML = result.output;
    Views.updateRunStatus(result.status);
  } catch (err) {
    output.innerHTML = `<span class="output-error">Error: ${escapeHtml(err.message)}</span>`;
    Views.updateRunStatus(t({ en: "Evaluation failed", id: "Evaluasi gagal" }));
  }

  runBtn.disabled = false;
  runBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;"><polygon points="5 3 19 12 5 21 5 3"/></svg> ${t({ en: "Run Code", id: "Jalankan Kode" })}`;
};

// Rust-like evaluator for lesson patterns
Views.evaluateRustLike = (code) => {
  let output = '';
  const t = (x) => I18N.t(x);
  let status = t({ en: "Completed", id: "Selesai" });
  let vars = {}; // variable store
  let structs = {}; // struct definitions
  let functions = {}; // function definitions

  // Helper to capture println!/print! output
  const capturePrint = (fmt, ...args) => {
    let str = fmt;
    args.forEach(arg => {
      str = str.replace('{}', arg);
    });
    output += str + '\n';
  };

  // Simple parser for basic patterns
  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

  // Pre-define common functions
  functions['println!'] = (...args) => {
    let fmt = args[0];
    const vals = args.slice(1);
    vals.forEach(v => fmt = fmt.replace('{}', v));
    output += fmt + '\n';
  };
  functions['print!'] = (...args) => {
    let fmt = args[0];
    const vals = args.slice(1);
    vals.forEach(v => fmt = fmt.replace('{}', v));
    output += fmt;
  };
  functions['format!'] = (...args) => {
    let fmt = args[0];
    const vals = args.slice(1);
    vals.forEach(v => fmt = fmt.replace('{}', v));
    return fmt;
  };

  // Execute line by line (simplified)
  let inMain = false;
  let braceDepth = 0;

  for (const line of lines) {
    if (line.includes('fn main')) { inMain = true; continue; }
    if (line === '{') { braceDepth++; continue; }
    if (line === '}') { braceDepth--; continue; }
    if (!inMain) continue;

    // let statements
    const letMatch = line.match(/^let\s+(?:mut\s+)?(\w+)\s*=\s*(.+);?$/);
    if (letMatch) {
      const [, name, value] = letMatch;
      vars[name] = Views.evalExpression(value.trim(), vars);
      continue;
    }

    // println! / print!
    const printMatch = line.match(/^(print!|println!)\s*\((.*)\)\s*;?$/);
    if (printMatch) {
      const [, fnName, argsStr] = printMatch;
      const args = Views.parseArgs(argsStr, vars);
      if (args.length > 0) {
        let fmt = args[0];
        const vals = args.slice(1);
        vals.forEach(v => fmt = fmt.replace('{}', v));
        output += fmt + (fnName === 'println!' ? '\n' : '');
      }
      continue;
    }

    // format! assignment
    const formatMatch = line.match(/^let\s+(\w+)\s*=\s*format!\s*\((.*)\)\s*;?$/);
    if (formatMatch) {
      const [, name, argsStr] = formatMatch;
      const args = Views.parseArgs(argsStr, vars);
      let fmt = args[0];
      const vals = args.slice(1);
      vals.forEach(v => fmt = fmt.replace('{}', v));
      vars[name] = fmt;
      continue;
    }

    // if/else (simplified - evaluate condition)
    const ifMatch = line.match(/^if\s+(.+)\s*\{?$/);
    if (ifMatch) {
      const condition = ifMatch[1];
      // Very simplified - just skip for now
      continue;
    }

    // for loop
    const forMatch = line.match(/^for\s+(\w+)\s+in\s+(.+)\s*\{?$/);
    if (forMatch) {
      // Simplified - just note it
      continue;
    }
  }

  // If no output, show that it ran silently
  if (!output.trim()) {
    const t = (x) => I18N.t(x);
    output = `<span class="output-success">✓ ${t({ en: "Program ran successfully (no output)", id: "Program berjalan sukses (tanpa keluaran)" })}</span>`;
    status = t({ en: "Completed silently", id: "Selesai tanpa output" });
  }

  return { output: escapeHtml(output).replace(/\n/g, '<br>'), status };
};

Views.evalExpression = (expr, vars) => {
  expr = expr.trim();
  
  // String literal
  if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1);
  if (expr.startsWith("'") && expr.endsWith("'")) return expr.slice(1, -1);
  
  // Number
  if (/^\d+$/.test(expr)) return parseInt(expr);
  if (/^\d+\.\d+$/.test(expr)) return parseFloat(expr);
  
  // Boolean
  if (expr === 'true') return true;
  if (expr === 'false') return false;
  
  // Variable reference
  if (vars[expr] !== undefined) return vars[expr];
  
  // format! macro
  if (expr.startsWith('format!')) {
    const argsStr = expr.match(/format!\s*\((.*)\)/)?.[1] || '';
    const args = Views.parseArgs(argsStr, vars);
    let fmt = args[0];
    args.slice(1).forEach(v => fmt = fmt.replace('{}', v));
    return fmt;
  }
  
  // Binary operations (very basic)
  const opMatch = expr.match(/^(.+)\s*([+\-*/])\s*(.+)$/);
  if (opMatch) {
    const [, left, op, right] = opMatch;
    const a = Views.evalExpression(left.trim(), vars);
    const b = Views.evalExpression(right.trim(), vars);
    if (typeof a === 'number' && typeof b === 'number') {
      switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return Math.floor(a / b);
      }
    }
  }
  
  return expr; // Return as-is if can't evaluate
};

Views.parseArgs = (str, vars) => {
  // Simple argument parser for macros
  const args = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let parenDepth = 0;
  
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    
    if (!inString && (ch === '"' || ch === "'")) {
      inString = true;
      stringChar = ch;
      current += ch;
    } else if (inString && ch === stringChar && str[i-1] !== '\\') {
      inString = false;
      current += ch;
    } else if (!inString && ch === '(') {
      parenDepth++;
      current += ch;
    } else if (!inString && ch === ')') {
      parenDepth--;
      current += ch;
    } else if (!inString && ch === ',' && parenDepth === 0) {
      args.push(Views.evalExpression(current.trim(), vars));
      current = '';
    } else {
      current += ch;
    }
  }
  
  if (current.trim()) args.push(Views.evalExpression(current.trim(), vars));
  return args;
};