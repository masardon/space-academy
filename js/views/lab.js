// ============================================
// SPACE ACADEMY — Lab View
// ============================================

Views.lab = () => {
  const main = document.getElementById("mainContent");
  const progress_data = progress.getProgress();

  main.innerHTML = `
    <div class="view">
      <div class="section-header">
        <h2>🔬 The Lab</h2>
        <p>Your workspace — reference materials, wiring diagrams, and tools for every mission.</p>
      </div>

      <!-- Quick Reference Tabs -->
      <div class="pills">
        <button class="pill active" onclick="Views.showLabSection('cheatsheet', this)">Cheat Sheet</button>
        <button class="pill" onclick="Views.showLabSection('wiring', this)">Wiring Guide</button>
        <button class="pill" onclick="Views.showLabSection('debug', this)">Debug Guide</button>
        <button class="pill" onclick="Views.showLabSection('terms', this)">Rust Terms</button>
      </div>

      <!-- Lab Content Area -->
      <div id="labContent"></div>
    </div>
  `;

  Views.showLabSection('cheatsheet');
};

Views.showLabSection = (section, btn) => {
  const content = document.getElementById("labContent");

  if (btn) {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
  }

  const sections = {
    cheatsheet: `
      <div class="lab-section">
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--accent-light);">📦 Variables & Types</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>let name = "Sparky";       // String (text)
let hp = 100;               // Integer (whole number)
let speed = 5.5;            // Float (decimal)
let is_active = true;       // Boolean (true/false)
let mut inventory = vec![]; // Mutable vector (list)</code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--success);">🔀 Conditionals</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>if choice == "left" {
    println!("Go left!");
} else if choice == "right" {
    println!("Go right!");
} else {
    println!("Stay here.");
}</code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--warning);">🔄 Loops</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>// For loop — known times
for i in 1..=5 {
    print!("{} ", i);
}

// While loop — until condition
while health > 0 {
    fight();
}

// Range: 1..=5 means 1 to 5 (inclusive)
// Range: 1..5 means 1 to 4 (exclusive)</code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--info);">⚗️ Functions</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

// Call it:
let message = greet("Luna");
println!("{}", message);</code></div>
          </div>
        </div>

        <div class="card">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--f15bb5,#f15bb5);">🏗️ Structs</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>struct Cadet {
    name: String,
    hp: u32,
}

impl Cadet {
    fn introduce(&self) {
        println!("I am {}", self.name);
    }
}

let cadet = Cadet {
    name: String::from("Zyx"),
    hp: 100,
};
cadet.introduce();</code></div>
          </div>
        </div>
      </div>
    `,

    wiring: `
      <div class="lab-section">
        <div class="info-box warning" style="margin-bottom:20px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div><strong>Always double-check wiring before plugging in USB.</strong> Wrong connections can damage components.</div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">💡 Week 9 — LED + Buzzer</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Wiring Diagram</span></div>
            <div class="code-body" style="font-family:monospace;font-size:0.8125rem;line-height:1.8;"><code>
<strong>Arduino UNO</strong>
├── Pin 13 ──── [LED built-in] ─── GND
├── Pin 12 ──── [220Ω resistor] ── LED ─── GND
├── Pin 11 ──── [Buzzer +] ─────── Buzzer - ─── GND
└── USB ──────── to Mini PC
            </code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">👁️ Week 10 — Add Ultrasonic Sensor</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Wiring Diagram</span></div>
            <div class="code-body" style="font-family:monospace;font-size:0.8125rem;line-height:1.8;"><code>
<strong>HC-SR04 Sensor</strong>
├── VCC ──────── 5V
├── TRIG ─────── Pin 2
├── ECHO ─────── Pin 3
└── GND ──────── GND
<strong>(Keep previous LEDs/buzzer wired!)</strong>
            </code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">🔄 Week 11 — Add Servo Motor</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Wiring Diagram</span></div>
            <div class="code-body" style="font-family:monospace;font-size:0.8125rem;line-height:1.8;"><code>
<strong>SG90 Servo</strong>
├── Red wire  ─── 5V
├── Brown wire ─── GND
└── Orange wire ── Pin 9
<strong>(Keep ALL previous components wired!)</strong>
            </code></div>
          </div>
        </div>

        <div class="info-box danger">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <div><strong>Common Mistakes:</strong> LED backwards (long leg = positive), loose breadboard connections, using charge-only USB cable (need data cable for Arduino).</div>
        </div>
      </div>
    `,

    debug: `
      <div class="lab-section">
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;">🐛 Debugging Checklist</h3>
          <ul class="checklist">
            <li><input type="checkbox"> Read the <strong>first</strong> error — don't skip ahead</li>
            <li><input type="checkbox"> Find the <strong>line number</strong> mentioned</li>
            <li><input type="checkbox"> Look for: missing <code>;</code> / wrong <code>type</code> / <code>typo</code></li>
            <li><input type="checkbox"> Fix <strong>one thing at a time</strong></li>
            <li><input type="checkbox"> Run again — fixing one error may reveal the next</li>
            <li><input type="checkbox"> Ask: <em>"What is the compiler telling me?"</em></li>
          </ul>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">Common Error Types</h3>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--error);">
              <strong style="color:var(--error);">Missing semicolon</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">Add <code>;</code> at the end of the line before the error.</p>
            </div>
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--warning);">
              <strong style="color:var(--warning);">Type mismatch</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">You put text in a number box (or vice versa). Make types match.</p>
            </div>
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--info);">
              <strong style="color:var(--info);">Unused variable</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">Add <code>println!()</code> to use it, or prefix with underscore: <code>_unused</code>.</p>
            </div>
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--accent);">
              <strong style="color:var(--accent-light);">Mismatched braces</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">Every <code>{</code> needs a matching <code>}</code>. Count them!</p>
            </div>
          </div>
        </div>

        <div class="info-box tip">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div><strong>Remember:</strong> Errors are the compiler HELPING you. It's not mad — it's giving you clues. Every bug you fix makes you a better thinker.</div>
        </div>
      </div>
    `,

    terms: `
      <div class="lab-section">
        <div class="card">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;">📖 Rust Glossary</h3>
          <div style="display:grid;gap:12px;">
            ${[
              { term: "Variable", def: "A named box that holds a value. Created with let." },
              { term: "Mutable (mut)", def: "Can be changed after creation. Add mut before the name." },
              { term: "Function (fn)", def: "A reusable block of code. You call it by name." },
              { term: "Parameter", def: "Input values a function accepts. Shown inside parentheses." },
              { term: "Return value", def: "What a function gives back. Shown with -> Type." },
              { term: "Struct", def: "A custom data type that groups related values together." },
              { term: "Method", def: "A function that belongs to a struct. Uses &self." },
              { term: "Vector (Vec)", def: "An ordered list that can grow and shrink." },
              { term: "Loop", def: "Repeats code. for = known times, while = until condition." },
              { term: "Conditional", def: "if/else lets code make decisions based on true/false." },
              { term: "Compile", def: "Turn code into a program the computer can run." },
              { term: "Borrow Checker", def: "Rust's rule-enforcer. Makes sure data ownership is correct." },
              { term: "Cargo", def: "Rust's project manager. Handles building and dependencies." },
              { term: " println!", def: "Prints text to the screen with placeholders {}." },
              { term: "format!", def: "Creates a string from a template (like println but saves it)." },
            ].map(t => `
              <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;">
                <strong style="color:var(--accent-light);">${t.term}</strong>
                <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${t.def}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `,
  };

  content.innerHTML = sections[section] || '';
};
