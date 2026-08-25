// ============================================
// SPACE ACADEMY — Lab View
// ============================================

Views.lab = () => {
  const main = document.getElementById("mainContent");
  const t = (x) => I18N.t(x);

  main.innerHTML = `
    <div class="view">
      <div class="section-header">
        <h2>🔬 ${t({ en: "The Lab", id: "Lab" })}</h2>
        <p>${t({ en: "Your workspace — reference materials, wiring diagrams, and tools for every mission.", id: "Ruang kerjamu — referensi, diagram wiring, dan alat untuk setiap misi." })}</p>
      </div>

      <!-- Search -->
      <div class="lab-search" style="margin: 16px 0;">
        <input type="search" id="labSearch" placeholder="${t({ en: "🔍 Search cheat sheets, wiring, debug tips, terms...", id: "🔍 Cari catatan cepat, wiring, debug, istilah..." })}" 
               oninput="Views.filterLab(this.value)" 
               style="width:100%;padding:12px 16px;font-size:0.9375rem;border-radius:var(--radius-md);border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-primary);font-family:var(--font-body);">
      </div>

      <!-- Quick Reference Tabs -->
      <div class="pills">
        <button class="pill active" onclick="Views.showLabSection('cheatsheet', this)">${t({ en: "Cheat Sheet", id: "Catatan Cepat" })}</button>
        <button class="pill" onclick="Views.showLabSection('wiring', this)">${t({ en: "Wiring Guide", id: "Panduan Wiring" })}</button>
        <button class="pill" onclick="Views.showLabSection('debug', this)">${t({ en: "Debug Guide", id: "Panduan Debug" })}</button>
        <button class="pill" onclick="Views.showLabSection('terms', this)">${t({ en: "Rust Terms", id: "Istilah Rust" })}</button>
      </div>

      <!-- Lab Content Area -->
      <div id="labContent"></div>
    </div>
  `;

  Views.showLabSection('cheatsheet');
};

Views.filterLab = (query) => {
  const content = document.getElementById('labContent');
  if (!content) return;
  
  const q = query.toLowerCase().trim();
  const cards = content.querySelectorAll('.card, .lab-section > div, .lab-section > h3, .lab-section > p, .lab-section .code-block, .info-box');
  
  if (!q) {
    cards.forEach(el => el.style.display = '');
    return;
  }
  
  cards.forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.display = text.includes(q) ? '' : 'none';
  });
  
  // Also hide section headers if all their content is hidden
  const sections = content.querySelectorAll('.lab-section');
  sections.forEach(section => {
    const visible = section.querySelector('[style="display: none;"]') === null || 
                    Array.from(section.querySelectorAll('*')).some(el => el.style.display !== 'none' && el.offsetParent !== null);
    // Simpler: just check if any direct content child is visible
    const hasVisible = Array.from(section.children).some(child => 
      child.style.display !== 'none' && child.textContent.trim() && child.offsetParent !== null
    );
  });
};

Views.showLabSection = (section, btn) => {
  const content = document.getElementById("labContent");
  const t = (x) => I18N.t(x);

  if (btn) {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
  }

  // Pre-compute translations to avoid template literal conflicts
  const tr = {
    cheatsheet: {
      varsTypes: t({ en: "📦 Variables & Types", id: "📦 Variabel & Tipe" }),
      string: t({ en: "String (text)", id: "String (teks)" }),
      integer: t({ en: "Integer (whole number)", id: "Integer (bilangan bulat)" }),
      float: t({ en: "Float (decimal)", id: "Float (desimal)" }),
      boolean: t({ en: "Boolean (true/false)", id: "Boolean (benar/salah)" }),
      mutVec: t({ en: "Mutable vector (list)", id: "Vector yang bisa diubah (daftar)" }),
      conditionals: t({ en: "🔀 Conditionals", id: "🔀 Kondisional" }),
      goLeft: t({ en: "Go left!", id: "Ke kiri!" }),
      goRight: t({ en: "Go right!", id: "Ke kanan!" }),
      stay: t({ en: "Stay here.", id: "Tetap di sini." }),
      loops: t({ en: "🔄 Loops", id: "🔄 Loop" }),
      forLoop: t({ en: "For loop \u2014 known times", id: "For loop \u2014 jumlah diketahui" }),
      whileLoop: t({ en: "While loop \u2014 until condition", id: "While loop \u2014 sampai kondisi" }),
      rangeIncl: t({ en: "Range: 1..=5 means 1 to 5 (inclusive)", id: "Range: 1..=5 artinya 1 sampai 5 (inklusif)" }),
      rangeExcl: t({ en: "Range: 1..5 means 1 to 4 (exclusive)", id: "Range: 1..5 artinya 1 sampai 4 (eksklusif)" }),
      functions: t({ en: "\u2697\ufe0f Functions", id: "\u2697\ufe0f Fungsi" }),
      hello: t({ en: "Hello, {}!", id: "Halo, {}!" }),
      callIt: t({ en: "Call it:", id: "Panggil:" }),
      structs: t({ en: "\u1f3d7\ufe0f Structs", id: "\u1f3d7\ufe0f Struct" }),
      iAm: t({ en: "I am {}", id: "Aku {}" }),
    },
    wiring: {
      lab: t({ en: "Lab", id: "Lab" }),
      warningTitle: t({ en: "Always double-check wiring before plugging in USB.", id: "Selalu cek wiring sebelum colok USB." }),
      warningDesc: t({ en: "Wrong connections can damage components.", id: "Koneksi salah bisa rusak komponen." }),
      week9: t({ en: "\U0001f4a1 Week 9 \u2014 LED + Buzzer", id: "\U0001f4a1 Minggu 9 \u2014 LED + Buzzer" }),
      wiringDiagram: t({ en: "Wiring Diagram", id: "Diagram Wiring" }),
      arduino: t({ en: "Arduino UNO", id: "Arduino UNO" }),
      pin13: t({ en: "\u251c\u2500\u2500 Pin 13 \u2500\u2500 [LED built-in] \u2500\u2500\u2500 GND", id: "\u251c\u2500\u2500 Pin 13 \u2500\u2500 [LED bawaan] \u2500\u2500\u2500 GND" }),
      pin12: t({ en: "\u251c\u2500\u2500 Pin 12 \u2500\u2500 [220\u03a9 resistor] \u2500\u2500\u2500 LED \u2500\u2500\u2500 GND", id: "\u251c\u2500\u2500 Pin 12 \u2500\u2500 [220\u03a9 resistor] \u2500\u2500\u2500 LED \u2500\u2500\u2500 GND" }),
      pin11: t({ en: "\u251c\u2500\u2500 Pin 11 \u2500\u2500 [Buzzer +] \u2500\u2500\u2500\u2500 Buzzer - \u2500\u2500\u2500 GND", id: "\u251c\u2500\u2500 Pin 11 \u2500\u2500 [Buzzer +] \u2500\u2500\u2500\u2500 Buzzer - \u2500\u2500\u2500 GND" }),
      usb: t({ en: "\u2514\u2500\u2500\u2500 USB \u2500\u2500\u2500\u2500 to Mini PC", id: "\u2514\u2500\u2500\u2500 USB \u2500\u2500\u2500\u2500 ke Mini PC" }),
      week10: t({ en: "\U0001f441\ufe0f Week 10 \u2014 Add Ultrasonic Sensor", id: "\U0001f441\ufe0f Minggu 10 \u2014 Tambah Sensor Ultrasonik" }),
      hcsr04: t({ en: "HC-SR04 Sensor", id: "Sensor HC-SR04" }),
      vcc: t({ en: "\u251c\u2500\u2500 VCC \u2500\u2500\u2500\u2500\u2500 5V", id: "\u251c\u2500\u2500 VCC \u2500\u2500\u2500\u2500\u2500 5V" }),
      trig: t({ en: "\u251c\u2500\u2500 TRIG \u2500\u2500\u2500\u2500 Pin 2", id: "\u251c\u2500\u2500 TRIG \u2500\u2500\u2500\u2500 Pin 2" }),
      echo: t({ en: "\u251c\u2500\u2500 ECHO \u2500\u2500\u2500\u2500 Pin 3", id: "\u251c\u2500\u2500 ECHO \u2500\u2500\u2500\u2500 Pin 3" }),
      gnd: t({ en: "\u2514\u2500\u2500\u2500 GND \u2500\u2500\u2500\u2500 GND", id: "\u2514\u2500\u2500\u2500 GND \u2500\u2500\u2500 GND" }),
      keepPrev: t({ en: "(Keep previous LEDs/buzzer wired!)", id: "(Tetap simpan LED/buzzer sebelumnya!)" }),
      week11: t({ en: "\U0001f504 Week 11 \u2014 Add Servo Motor", id: "\U0001f504 Minggu 11 \u2014 Tambah Motor Servo" }),
      sg90: t({ en: "SG90 Servo", id: "Servo SG90" }),
      redWire: t({ en: "\u251c\u2500\u2500 Red wire  \u2500\u2500\u2500\u2500 5V", id: "\u251c\u2500\u2500 Kabel Merah  \u2500\u2500\u2500\u2500 5V" }),
      brownWire: t({ en: "\u251c\u2500\u2500 Brown wire \u2500\u2500\u2500\u2500 GND", id: "\u251c\u2500\u2500 Kabel Coklat \u2500\u2500\u2500\u2500 GND" }),
      orangeWire: t({ en: "\u2514\u2500\u2500 Orange wire \u2500\u2500 Pin 9", id: "\u2514\u2500\u2500 Kabel Oranye \u2500\u2500 Pin 9" }),
      keepAll: t({ en: "(Keep ALL previous components wired!)", id: "(Tetap simpan SEMUA komponen sebelumnya!)" }),
      commonMistakes: t({ en: "Common Mistakes:", id: "Kesalahan Umum:" }),
      mistakesDesc: t({ en: "LED backwards (long leg = positive), loose breadboard connections, using charge-only USB cable (need data cable for Arduino).", id: "LED terbalik (kaki panjang = positif), koneksi breadboard longgar, pakai kabel USB charge-only (butuh kabel data untuk Arduino)." }),
    },
    debug: {
      debugChecklist: t({ en: "\U0001f41b Debugging Checklist", id: "\U0001f41b Daftar Periksa Debug" }),
      firstError: t({ en: "Read the <strong>first</strong> error \u2014 don't skip ahead", id: "Baca error <strong>pertama</strong> \u2014 jangan loncat" }),
      lineNum: t({ en: "Find the <strong>line number</strong> mentioned", id: "Temukan <strong>nomor baris</strong> yang disebut" }),
      lookFor: t({ en: "Look for: missing <code>;</code> / wrong <code>type</code> / <code>typo</code>", id: "Cari: <code>;</code> hilang / <code>tipe</code> salah / <code>typo</code>" }),
      oneThing: t({ en: "Fix <strong>one thing at a time</strong>", id: "Perbaiki <strong>satu hal per satu waktu</strong>" }),
      runAgain: t({ en: "Run again \u2014 fixing one error may reveal the next", id: "Jalankan lagi \u2014 perbaiki satu error bisa membuka error berikutnya" }),
      askCompiler: t({ en: "Ask: <em>\"What is the compiler telling me?\"</em>", id: "Tanyakan: <em>\"Apa yang diberitahu compiler?\"</em>" }),
      errorTypes: t({ en: "Common Error Types", id: "Jenis Error Umum" }),
      missingSemi: t({ en: "Missing semicolon", id: "Titik koma hilang" }),
      missingSemiDesc: t({ en: "Add <code>;</code> at the end of the line before the error.", id: "Tambah <code>;</code> di akhir baris sebelum error." }),
      typeMismatch: t({ en: "Type mismatch", id: "Tipe tidak cocok" }),
      typeMismatchDesc: t({ en: "You put text in a number box (or vice versa). Make types match.", id: "Kamu masukkan teks ke kotak angka (atau sebaliknya). Samakan tipenya." }),
      unusedVar: t({ en: "Unused variable", id: "Variabel tak terpakai" }),
      unusedVarDesc: t({ en: "Add <code>println!()</code> to use it, or prefix with underscore: <code>_unused</code>.", id: "Tambah <code>println!()</code> untuk pakai, atau awali underscore: <code>_unused</code>." }),
      mismatchedBraces: t({ en: "Mismatched braces", id: "Kurung kurawal tidak cocok" }),
      mismatchedBracesDesc: t({ en: "Every <code>{</code> needs a matching <code>}</code>. Count them!", id: "Setiap <code>{</code> butuh <code>}</code> pasangan. Hitung!" }),
      remember: t({ en: "Remember:", id: "Ingat:" }),
      rememberDesc: t({ en: "Errors are the compiler HELPING you. It's not mad \u2014 it's giving you clues. Every bug you fix makes you a better thinker.", id: "Error adalah compiler MEMBANTU kamu. Ia tidak marah \u2014 ia memberi petunjuk. Setiap bug yang diperbaiki membuatmu pemikir lebih baik." }),
    },
    terms: {
      glossary: t({ en: "\U0001f4d6 Rust Glossary", id: "\U0001f4d6 Glosarium Rust" }),
    }
  };

  if (btn) {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
  }

  const sections = {
    cheatsheet: `
      <div class="lab-section">
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--accent-light);">${tr.cheatsheet.varsTypes}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>let name = "Sparky";       // ${tr.cheatsheet.string}
let hp = 100;               // ${tr.cheatsheet.integer}
let speed = 5.5;            // ${tr.cheatsheet.float}
let is_active = true;       // ${tr.cheatsheet.boolean}
let mut inventory = vec![]; // ${tr.cheatsheet.mutVec}</code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--success);">${tr.cheatsheet.conditionals}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>if choice == "left" {
    println!("${tr.cheatsheet.goLeft}");
} else if choice == "right" {
    println!("${tr.cheatsheet.goRight}");
} else {
    println!("${tr.cheatsheet.stay}");
}</code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--warning);">${tr.cheatsheet.loops}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>// ${tr.cheatsheet.forLoop}
for i in 1..=5 {
    print!("{} ", i);
}

${tr.cheatsheet.whileLoop}
while health > 0 {
    fight();
}

${tr.cheatsheet.rangeIncl}
${tr.cheatsheet.rangeExcl}</code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--info);">${tr.cheatsheet.functions}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>fn greet(name: &str) -> String {
    format!("${tr.cheatsheet.hello}", name)
}

${tr.cheatsheet.callIt}
let message = greet("Luna");
println!("{}", message);</code></div>
          </div>
        </div>

        <div class="card">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--f15bb5,#f15bb5);">${tr.cheatsheet.structs}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>struct Cadet {
    name: String,
    hp: u32,
}

impl Cadet {
    fn introduce(&self) {
        println!("${tr.cheatsheet.iAm}", self.name);
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
          <div><strong>${tr.wiring.warningTitle}</strong> ${tr.wiring.warningDesc}</div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">${tr.wiring.week9}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">${tr.wiring.wiringDiagram}</span></div>
            <div class="code-body" style="font-family:monospace;font-size:0.8125rem;line-height:1.8;"><code>
 <strong>${tr.wiring.arduino}</strong>
 ${tr.wiring.pin13}
 ${tr.wiring.pin12}
 ${tr.wiring.pin11}
 ${tr.wiring.usb}
            </code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">${tr.wiring.week10}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">${tr.wiring.wiringDiagram}</span></div>
            <div class="code-body" style="font-family:monospace;font-size:0.8125rem;line-height:1.8;"><code>
 <strong>${tr.wiring.hcsr04}</strong>
 ${tr.wiring.vcc}
 ${tr.wiring.trig}
 ${tr.wiring.echo}
 ${tr.wiring.gnd}
 <strong>(${tr.wiring.keepPrev})</strong>
            </code></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">${tr.wiring.week11}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">${tr.wiring.wiringDiagram}</span></div>
            <div class="code-body" style="font-family:monospace;font-size:0.8125rem;line-height:1.8;"><code>
 <strong>${tr.wiring.sg90}</strong>
 ${tr.wiring.redWire}
 ${tr.wiring.brownWire}
 ${tr.wiring.orangeWire}
 <strong>(${tr.wiring.keepAll})</strong>
            </code></div>
          </div>
        </div>

        <div class="info-box danger">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <div><strong>${tr.wiring.commonMistakes}</strong> ${tr.wiring.mistakesDesc}</div>
        </div>
      </div>
    `,

    debug: `
      <div class="lab-section">
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;">${tr.debug.debugChecklist}</h3>
          <ul class="checklist">
            <li><input type="checkbox"> ${tr.debug.firstError}</li>
            <li><input type="checkbox"> ${tr.debug.lineNum}</li>
            <li><input type="checkbox"> ${tr.debug.lookFor}</li>
            <li><input type="checkbox"> ${tr.debug.oneThing}</li>
            <li><input type="checkbox"> ${tr.debug.runAgain}</li>
            <li><input type="checkbox"> ${tr.debug.askCompiler}</li>
          </ul>
        </div>

        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">${tr.debug.errorTypes}</h3>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--error);">
              <strong style="color:var(--error);">${tr.debug.missingSemi}</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${tr.debug.missingSemiDesc}</p>
            </div>
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--warning);">
              <strong style="color:var(--warning);">${tr.debug.typeMismatch}</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${tr.debug.typeMismatchDesc}</p>
            </div>
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--info);">
              <strong style="color:var(--info);">${tr.debug.unusedVar}</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${tr.debug.unusedVarDesc}</p>
            </div>
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--accent);">
              <strong style="color:var(--accent-light);">${tr.debug.mismatchedBraces}</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${tr.debug.mismatchedBracesDesc}</p>
            </div>
          </div>
        </div>

        <div class="info-box tip">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div><strong>${tr.debug.remember}</strong> ${tr.debug.rememberDesc}</div>
        </div>
      </div>
    `,

    terms: `
      <div class="lab-section">
        <div class="card">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;">${tr.terms.glossary}</h3>
          <div style="display:grid;gap:12px;">
            ${[
              { term: "Variable", def: "A named box that holds a value. Created with let.", def_id: "Kotak bernama yang menyimpan nilai. Dibuat dengan let." },
              { term: "Mutable (mut)", def: "Can be changed after creation. Add mut before the name.", def_id: "Bisa diubah setelah dibuat. Tambah mut sebelum nama." },
              { term: "Function (fn)", def: "A reusable block of code. You call it by name.", def_id: "Blok kode yang bisa dipakai ulang. Dipanggil lewat nama." },
              { term: "Parameter", def: "Input values a function accepts. Shown inside parentheses.", def_id: "Nilai masukan fungsi. Ditampilkan di dalam tanda kurung." },
              { term: "Return value", def: "What a function gives back. Shown with -> Type.", def_id: "Apa yang dikembalikan fungsi. Ditampilkan dengan -> Type." },
              { term: "Struct", def: "A custom data type that groups related values together.", def_id: "Tipe data kustom yang mengelompokkan nilai terkait." },
              { term: "Method", def: "A function that belongs to a struct. Uses &self.", def_id: "Fungsi yang milik struct. Pakai &self." },
              { term: "Vector (Vec)", def: "An ordered list that can grow and shrink.", def_id: "Daftar berurutan yang bisa bertambah dan berkurang." },
              { term: "Loop", def: "Repeats code. for = known times, while = until condition.", def_id: "Mengulang kode. for = jumlah diketahui, while = sampai kondisi." },
              { term: "Conditional", def: "if/else lets code make decisions based on true/false.", def_id: "if/else biarkan kode memutuskan berdasarkan true/false." },
              { term: "Compile", def: "Turn code into a program the computer can run.", def_id: "Ubah kode jadi program yang bisa dijalanin komputer." },
              { term: "Borrow Checker", def: "Rust's rule-enforcer. Makes sure data ownership is correct.", def_id: "Penegak aturan Rust. Pastikan kepemilikan data benar." },
              { term: "Cargo", def: "Rust's project manager. Handles building and dependencies.", def_id: "Manajer proyek Rust. Urus build dan dependensi." },
              { term: "println!", def: "Prints text to the screen with placeholders {}.", def_id: "Cetak teks ke layar dengan placeholder {}." },
              { term: "format!", def: "Creates a string from a template (like println but saves it).", def_id: "Bikin string dari template (seperti println tapi disimpan)." },
            ].map(item => `
              <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;">
                <strong style="color:var(--accent-light);">${t({ en: item.term, id: item.term })}</strong>
                <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${t({ en: item.def, id: item.def_id })}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `,
  };

  content.innerHTML = sections[section] || '';
};
