// ============================================
// SPACE ACADEMY — Lab View
// ============================================

window.Views = window.Views || {};
Views.lab = () => {
  const main = document.getElementById("mainContent");
  const t = (x) => I18N.t(x);
  const lang = I18N.lang();
  const uiEn = I18N.ui.en;
  const ui = I18N.ui[lang];

  // Data-driven tabs with tier requirements
  const labTabs = [
    { id: "cheatsheet", label_en: "Cheat Sheet", label_id: "Catatan Cepat", minTier: "explorer" },
    { id: "wiring", label_en: "Wiring Guide", label_id: "Panduan Wiring", minTier: "engineer" },
    { id: "debug", label_en: "Debug Guide", label_id: "Panduan Debug", minTier: "engineer" },
    { id: "terms", label_en: "Rust Terms", label_id: "Istilah Rust", minTier: "explorer" },
    { id: "analogies", label_en: "Analogies", label_id: "Analogi", minTier: "engineer" },
    { id: "mistakes", label_en: "Common Mistakes", label_id: "Kesalahan Umum", minTier: "engineer" },
  ];

  const tierOrder = { explorer: 0, engineer: 1, commander: 2 };
  const currentTier = (typeof License !== "undefined") ? License.tier() : "explorer";

  main.innerHTML = `
    <div class="view">
      <div class="section-header">
        <h2>🔬 ${t({ en: "The Lab", id: "Lab" })}</h2>
        <p>${t({ en: "Your workspace — reference materials, wiring diagrams, analogies, and tools for every mission.", id: "Ruang kerjamu — referensi, diagram wiring, analogi, dan alat untuk setiap misi." })}</p>
      </div>

      <!-- Search -->
      <div class="lab-search" style="margin: 16px 0;">
        <input type="search" id="labSearch" placeholder="${t({ en: "🔍 Search cheat sheets, wiring, debug tips, terms...", id: "🔍 Cari catatan cepat, wiring, debug, istilah..." })}" 
               oninput="Views.filterLab(this.value)" 
               style="width:100%;padding:12px 16px;font-size:0.9375rem;border-radius:var(--radius-md);border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-primary);font-family:var(--font-body);">
      </div>

      <!-- Quick Reference Tabs -->
      <div class="pills">
        ${labTabs.map(tab => {
          const locked = tierOrder[currentTier] < tierOrder[tab.minTier];
          const label = t({ en: tab.label_en, id: tab.label_id });
          if (locked) {
            return `<button class="pill pill-locked" onclick="Views.upgradeRequired('lab')" title="${t({ en: uiEn.settings_license_tier, id: ui.settings_license_tier })}">${label} 🔒</button>`;
          }
          return `<button class="pill${tab.id === 'cheatsheet' ? ' active' : ''}" onclick="Views.showLabSection('${tab.id}', this)">${label}</button>`;
        }).join("")}
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
  const cards = content.querySelectorAll('.card, .lab-section > div, .lab-section > h3, .lab-section > p, .lab-section .code-block, .info-box, .lab-analogy, .lab-mistake, .lab-component, .lab-diagram');
  
  if (!q) {
    cards.forEach(el => el.style.display = '');
    return;
  }
  
  cards.forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.display = text.includes(q) ? '' : 'none';
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
      forLoop: t({ en: "For loop — known times", id: "For loop — jumlah diketahui" }),
      whileLoop: t({ en: "While loop — until condition", id: "While loop — sampai kondisi" }),
      rangeIncl: t({ en: "Range: 1..=5 means 1 to 5 (inclusive)", id: "Range: 1..=5 artinya 1 sampai 5 (inklusif)" }),
      rangeExcl: t({ en: "Range: 1..5 means 1 to 4 (exclusive)", id: "Range: 1..5 artinya 1 sampai 4 (eksklusif)" }),
      functions: t({ en: "⚗️ Functions", id: "⚗️ Fungsi" }),
      hello: t({ en: "Hello, {}!", id: "Halo, {}!" }),
      callIt: t({ en: "Call it:", id: "Panggil:" }),
      structs: t({ en: "🏗️ Structs", id: "🏗️ Struct" }),
      iAm: t({ en: "I am {}", id: "Aku {}" }),
      vectors: t({ en: "📋 Vectors (Lists)", id: "📋 Vector (Daftar)" }),
      methods: t({ en: "⚡ Methods", id: "⚡ Method" }),
      cargo: t({ en: "🔧 Cargo Commands", id: "🔧 Perintah Cargo" }),
      memoryTitle: t({ en: "🧠 How Memory Works", id: "🧠 Bagaimana Memori Bekerja" }),
      memoryDesc: t({ en: "Each variable is a labeled box in memory. The name is the label, the value is inside.", id: "Setiap variabel adalah kotak berlabel di memori. Nama adalah label, nilai ada di dalam." }),
      dataFlowTitle: t({ en: "➡️ Data Flow: Input → Process → Output", id: "➡️ Alur Data: Masukan → Proses → Keluaran" }),
    },
    wiring: {
      warningTitle: t({ en: "Always double-check wiring before plugging in USB.", id: "Selalu cek wiring sebelum colok USB." }),
      warningDesc: t({ en: "Wrong connections can damage components.", id: "Koneksi salah bisa rusak komponen." }),
      week9: t({ en: "💡 Week 9 — LED + Buzzer", id: "💡 Minggu 9 — LED + Buzzer" }),
      wiringDiagram: t({ en: "Wiring Diagram", id: "Diagram Wiring" }),
      arduino: t({ en: "Arduino UNO", id: "Arduino UNO" }),
      pin13: t({ en: "├── Pin 13 ── [LED built-in] ─── GND", id: "├── Pin 13 ── [LED bawaan] ─── GND" }),
      pin12: t({ en: "├── Pin 12 ── [220Ω resistor] ─── LED ─── GND", id: "├── Pin 12 ── [220Ω resistor] ─── LED ─── GND" }),
      pin11: t({ en: "├── Pin 11 ── [Buzzer +] ──── Buzzer - ─── GND", id: "├── Pin 11 ── [Buzzer +] ──── Buzzer - ─── GND" }),
      usb: t({ en: "└─── USB ──── to Mini PC", id: "└─── USB ──── ke Mini PC" }),
      week10: t({ en: "👁️ Week 10 — Add Ultrasonic Sensor", id: "👁️ Minggu 10 — Tambah Sensor Ultrasonik" }),
      hcsr04: t({ en: "HC-SR04 Sensor", id: "Sensor HC-SR04" }),
      vcc: t({ en: "├── VCC ───── 5V", id: "├── VCC ───── 5V" }),
      trig: t({ en: "├── TRIG ──── Pin 2", id: "├── TRIG ──── Pin 2" }),
      echo: t({ en: "├── ECHO ──── Pin 3", id: "├── ECHO ──── Pin 3" }),
      gnd: t({ en: "└─── GND ──── GND", id: "└─── GND ──── GND" }),
      keepPrev: t({ en: "(Keep previous LEDs/buzzer wired!)", id: "(Tetap simpan LED/buzzer sebelumnya!)" }),
      week11: t({ en: "🔄 Week 11 — Add Servo Motor", id: "🔄 Minggu 11 — Tambah Motor Servo" }),
      sg90: t({ en: "SG90 Servo", id: "Servo SG90" }),
      redWire: t({ en: "├── Red wire  ──── 5V", id: "├── Kabel Merah  ──── 5V" }),
      brownWire: t({ en: "├── Brown wire ──── GND", id: "├── Kabel Coklat ──── GND" }),
      orangeWire: t({ en: "└── Orange wire ─── Pin 9", id: "└── Kabel Oranye ─── Pin 9" }),
      keepAll: t({ en: "(Keep ALL previous components wired!)", id: "(Tetap simpan SEMUA komponen sebelumnya!)" }),
      commonMistakes: t({ en: "Common Mistakes:", id: "Kesalahan Umum:" }),
      mistakesDesc: t({ en: "LED backwards (long leg = positive), loose breadboard connections, using charge-only USB cable (need data cable for Arduino).", id: "LED terbalik (kaki panjang = positif), koneksi breadboard longgar, pakai kabel USB charge-only (butuh kabel data untuk Arduino)." }),
      componentsTitle: t({ en: "📦 What Each Component Does", id: "📦 Apa Fungsi Setiap Komponen" }),
      wireLegendTitle: t({ en: "🎨 Wire Color Guide", id: "🎨 Panduan Warna Kabel" }),
      wirePower: t({ en: "Power (5V)", id: "Daya (5V)" }),
      wireGround: t({ en: "Ground (GND)", id: "Ground (GND)" }),
      wireSignal: t({ en: "Signal / Data", id: "Sinyal / Data" }),
      ledDesc: t({ en: "Light Emitting Diode — glows when electricity flows through it. Long leg = positive (+), short leg = negative (−).", id: "Light Emitting Diode — menyala saat listrik mengalir. Kaki panjang = positif (+), kaki pendek = negatif (−)." }),
      resistorDesc: t({ en: "Limits current flow. Without it, the LED burns out! The 220Ω resistor is like a traffic cop — it slows down the electricity.", id: "Membatasi aliran listrik. Tanpa itu, LED terbakar! Resistor 220Ω seperti polisi lalu lintas — memperlambat listrik." }),
      buzzerDesc: t({ en: "Makes sound when electricity reaches it. Pin HIGH = sound, Pin LOW = silent.", id: "Mengeluarkan suara saat listrik mencapainya. Pin HIGH = bunyi, Pin LOW = senyap." }),
      sensorDesc: t({ en: "Sends a sound pulse and measures how long it takes to bounce back. Short time = close object, long time = far away.", id: "Mengirim pulsa suara dan mengukur waktu pantulan. Waktu singkat = objek dekat, waktu lama = jauh." }),
      servoDesc: t({ en: "A motor that turns to a specific angle (0–180°). Like a clock hand you can control with code.", id: "Motor yang berputar ke sudut tertentu (0–180°). Seperti jarum jam yang bisa dikontrol dengan kode." }),
      boardTitle: t({ en: "🔌 Arduino UNO Board", id: "🔌 Papan Arduino UNO" }),
      boardDesc: t({ en: "The Arduino UNO is a tiny computer that reads sensors and controls things like LEDs, motors, and buzzers. It has 14 digital pins and 6 analog pins.", id: "Arduino UNO adalah komputer kecil yang membaca sensor dan mengontrol hal seperti LED, motor, dan buzzer. Punya 14 pin digital dan 6 pin analog." }),
      coreFunctionsTitle: t({ en: "⚡ Arduino Core Functions", id: "⚡ Fungsi Inti Arduino" }),
      coreFunctionsDesc: t({ en: "These are the building blocks of every Arduino program. Learn these and you can build anything!", id: "Ini adalah blok bangunan setiap program Arduino. Pelajari ini dan kamu bisa membuat apa pun!" }),
      pinTypesTitle: t({ en: "📌 Pin Types & Signals", id: "📌 Tipe Pin & Sinyal" }),
      pinTypesDesc: t({ en: "Every pin on the Arduino is either INPUT (listens) or OUTPUT (speaks). Understanding this is the key to hardware.", id: "Setiap pin di Arduino adalah INPUT (mendengar) atau OUTPUT (berbicara). Memahami ini adalah kunci hardware." }),
      senseDecideActTitle: t({ en: "🔄 Sense → Decide → Act", id: "🔄 Rasa → Pikir → Bertindak" }),
      senseDecideActDesc: t({ en: "The fundamental pattern in robotics. Every robot — from a blinking LED to a self-driving car — follows this loop.", id: "Pola dasar dalam robotika. Setiap robot — dari LED berkedip hingga mobil self-driving — mengikuti loop ini." }),
      arduinoVsRustTitle: t({ en: "🔀 Arduino vs Rust — Side by Side", id: "🔀 Arduino vs Rust — Berdampingan" }),
      arduinoVsRustDesc: t({ en: "The thinking is identical — only the syntax changes. You already know the patterns from weeks 1–8!", id: "Polanya identik — hanya sintaks yang berubah. Kamu sudah tahu polanya dari minggu 1–8!" }),
      arduinoDebugTitle: t({ en: "🔧 Arduino Debugging", id: "🔧 Debug Arduino" }),
      arduinoDebugDesc: t({ en: "Hardware bugs are different from code bugs — you can't always see the error. Here's how to track them down.", id: "Bug hardware berbeda dari bug kode — kamu tidak selalu bisa melihat error-nya. Ini cara menemukannya." }),
      // Arduino core functions
      fnSetup: t({ en: "setup()", id: "setup()" }),
      fnSetupDesc: t({ en: "Runs ONCE when the board powers on. Put all your pin declarations here.", id: "Berjalan SEKALI saat papan dinyalakan. Taruh semua deklarasi pin di sini." }),
      fnLoop: t({ en: "loop()", id: "loop()" }),
      fnLoopDesc: t({ en: "Runs FOREVER after setup. This is where your robot lives — it repeats everything inside.", id: "Berjalan SELAMANYA setelah setup. Di sinilah robot hidup — mengulang semua di dalamnya." }),
      fnPinMode: t({ en: "pinMode(pin, mode)", id: "pinMode(pin, mode)" }),
      fnPinModeDesc: t({ en: "Declares a pin as OUTPUT (speaks) or INPUT (listens). Do this in setup().", id: "Menyatakan pin sebagai OUTPUT (berbicara) atau INPUT (mendengar). Lakukan di setup()." }),
      fnDigitalWrite: t({ en: "digitalWrite(pin, HIGH/LOW)", id: "digitalWrite(pin, HIGH/LOW)" }),
      fnDigitalWriteDesc: t({ en: "Switches a pin ON (HIGH = 5V) or OFF (LOW = 0V). Like flipping a light switch.", id: "Mengaktifkan pin (HIGH = 5V) atau mematikan (LOW = 0V). Seperti membalik saklar lampu." }),
      fnDigitalRead: t({ en: "digitalRead(pin)", id: "digitalRead(pin)" }),
      fnDigitalReadDesc: t({ en: "Reads a pin: returns HIGH or LOW. Use with buttons and switches.", id: "Membaca pin: mengembalikan HIGH atau LOW. Dipakai untuk tombol dan saklar." }),
      fnAnalogRead: t({ en: "analogRead(pin)", id: "analogRead(pin)" }),
      fnAnalogReadDesc: t({ en: "Reads a pin between 0–5V as a number 0–1023. Use with sensors like potentiometers.", id: "Membaca pin 0–5V sebagai angka 0–1023. Dipakai untuk sensor seperti potentiometer." }),
      fnDelay: t({ en: "delay(ms)", id: "delay(ms)" }),
      fnDelayDesc: t({ en: "Pauses the program. 1000 ms = 1 second. WARNING: the robot can't do anything while waiting!", id: "Menghentikan program sejenak. 1000 ms = 1 detik. PERINGATAN: robot tidak bisa melakukan apa pun saat menunggu!" }),
      fnPulseIn: t({ en: "pulseIn(pin, HIGH)", id: "pulseIn(pin, HIGH)" }),
      fnPulseInDesc: t({ en: "Measures how long a pin stays HIGH in microseconds. Used by ultrasonic sensors.", id: "Mengukur berapa lama pin bertahan HIGH dalam mikrodetik. Dipakai sensor ultrasonik." }),
      fnSerialBegin: t({ en: "Serial.begin(9600)", id: "Serial.begin(9600)" }),
      fnSerialBeginDesc: t({ en: "Opens communication with the computer. The Serial Monitor shows what you print.", id: "Membuka komunikasi dengan komputer. Serial Monitor menampilkan apa yang kamu cetak." }),
      fnSerialPrint: t({ en: "Serial.println(data)", id: "Serial.println(data)" }),
      fnSerialPrintDesc: t({ en: "Sends text or numbers to the Serial Monitor. Your debugging eye into the robot's brain.", id: "Mengirim teks atau angka ke Serial Monitor. Mata debugging ke otak robot." }),
      // Pin types
      pinOutput: t({ en: "OUTPUT — The pin SPEAKS (sends electricity out)", id: "OUTPUT — Pin BERBICARA (mengirim listrik keluar)" }),
      pinInput: t({ en: "INPUT — The pin LISTENS (reads electricity in)", id: "INPUT — Pin MENDENGAR (membaca listrik masuk)" }),
      pinHigh: t({ en: "HIGH = ON = 5 volts flowing", id: "HIGH = NYALA = 5 volt mengalir" }),
      pinLow: t({ en: "LOW = OFF = 0 volts (ground)", id: "LOW = MATI = 0 volt (ground)" }),
      pinDigital: t({ en: "Digital pins (0–13)", id: "Pin digital (0–13)" }),
      pinAnalog: t({ en: "Analog pins (A0–A5)", id: "Pin analog (A0–A5)" }),
      pinDigitalDesc: t({ en: "Read or write HIGH/LOW only. Perfect for LEDs, buttons, buzzers.", id: "Hanya membaca atau menulis HIGH/LOW. Cocok untuk LED, tombol, buzzer." }),
      pinAnalogDesc: t({ en: "Read a range of values (0–1023). Perfect for sensors that give smooth numbers.", id: "Membaca rentang nilai (0–1023). Cocok untuk sensor yang memberikan angka halus." }),
      // Sense-Decide-Act
      sdaSense: t({ en: "SENSE — Read a sensor (ultrasonic, button, light)", id: "RASA — Baca sensor (ultrasonik, tombol, cahaya)" }),
      sdaDecide: t({ en: "DECIDE — Compare the reading to a threshold (if/else)", id: "PIKIR — Bandingkan pembacaan dengan ambang batas (if/else)" }),
      sdaAct: t({ en: "ACT — Turn on LEDs, buzzers, or motors", id: "BERTINDAK — Nyalakan LED, buzzer, atau motor" }),
      sdaRepeat: t({ en: "REPEAT — loop() sends you back to SENSE forever", id: "ULANGI — loop() mengembalikanmu ke RASA selamanya" }),
      // Arduino vs Rust
      avrVar: t({ en: "Variables", id: "Variabel" }),
      avrIf: t({ en: "Conditionals", id: "Kondisional" }),
      avrLoop: t({ en: "Loops", id: "Loop" }),
      avrFn: t({ en: "Functions", id: "Fungsi" }),
      // Arduino debug
      debugUpload: t({ en: "Upload failed", id: "Unggah gagal" }),
      debugUploadDesc: t({ en: "Check: Tools → Board = Arduino Uno, Tools → Port = correct COM port. Still fails? You might need a DATA cable, not a charge-only cable.", id: "Periksa: Tools → Board = Arduino Uno, Tools → Port = port COM yang benar. Masih gagal? Mungkin butuh kabel DATA, bukan kabel cas-only." }),
      debugNoSerial: t({ en: "Serial Monitor shows nothing", id: "Serial Monitor tidak menampilkan apa pun" }),
      debugNoSerialDesc: t({ en: "Make sure Serial.begin(9600) is in setup() AND the baud rate in Serial Monitor matches (9600). Also check the USB cable is data-capable.", id: "Pastikan Serial.begin(9600) ada di setup() DAN baud rate di Serial Monitor cocok (9600). Juga periksa kabel USB mendukung data." }),
      debugLedOff: t({ en: "LED doesn't light up", id: "LED tidak menyala" }),
      debugLedOffDesc: t({ en: "Check polarity: long leg goes toward the pin (positive), short leg to GND. Also check the LED is in the right breadboard row and the resistor is connected.", id: "Cek polaritas: kaki panjang ke arah pin (positif), kaki pendek ke GND. Juga periksa LED di baris breadboard yang benar dan resistor tersambung." }),
      debugServoJitter: t({ en: "Servo twitches or won't move", id: "Servo bergetar atau tidak bergerak" }),
      debugServoJitterDesc: t({ en: "Servos need their OWN power. If it jitters, it's probably not getting enough current from the Arduino alone. Use external 5V power for the servo's red wire.", id: "Servo butuh DAYANYA SENDIRI. Kalau bergetar, mungkin tidak mendapat arus cukup dari Arduino saja. Pakai daya 5V eksternal untuk kabel merah servo." }),
    },
    debug: {
      debugChecklist: t({ en: "🐛 Debugging Checklist", id: "🐛 Daftar Periksa Debug" }),
      firstError: t({ en: "Read the <strong>first</strong> error — don't skip ahead", id: "Baca error <strong>pertama</strong> — jangan loncat" }),
      lineNum: t({ en: "Find the <strong>line number</strong> mentioned", id: "Temukan <strong>nomor baris</strong> yang disebut" }),
      lookFor: t({ en: "Look for: missing <code>;</code> / wrong <code>type</code> / <code>typo</code>", id: "Cari: <code>;</code> hilang / <code>tipe</code> salah / <code>typo</code>" }),
      oneThing: t({ en: "Fix <strong>one thing at a time</strong>", id: "Perbaiki <strong>satu hal per satu waktu</strong>" }),
      runAgain: t({ en: "Run again — fixing one error may reveal the next", id: "Jalankan lagi — perbaiki satu error bisa membuka error berikutnya" }),
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
      rememberDesc: t({ en: "Errors are the compiler HELPING you. It's not mad — it's giving you clues. Every bug you fix makes you a better thinker.", id: "Error adalah compiler MEMBANTU kamu. Ia tidak marah — ia memberi petunjuk. Setiap bug yang diperbaiki membuatmu pemikir lebih baik." }),
      beforeAfter: t({ en: "Before & After", id: "Sebelum & Sesudah" }),
      fixed: t({ en: "✅ Fixed", id: "✅ Diperbaiki" }),
      wrong: t({ en: "❌ Wrong", id: "❌ Salah" }),
      whyBroke: t({ en: "Why it broke:", id: "Kenapa rusak:" }),
      spotBug: t({ en: "🔍 Spot the Bug", id: "🔍 Temukan Bug" }),
      spotBugDesc: t({ en: "Can you find the error in each snippet? Think before scrolling to the answer!", id: "Bisa temukan error di setiap potongan kode? Pikirkan sebelum scroll ke jawaban!" }),
    },
    terms: {
      glossary: t({ en: "📖 Rust Glossary", id: "📖 Glosarium Rust" }),
      exampleLabel: t({ en: "Example:", id: "Contoh:" }),
    },
    analogies: {
      title: t({ en: "🌍 Real-World Analogies", id: "🌍 Analogi Dunia Nyata" }),
      desc: t({ en: "Programming concepts explained through things you already know.", id: "Konsep pemrograman dijelaskan melalui hal-hal yang sudah kamu ketahui." }),
    },
    mistakes: {
      title: t({ en: "⚠️ Common Mistakes Gallery", id: "⚠️ Galeri Kesalahan Umum" }),
      desc: t({ en: "Learn from mistakes others have made. Click any mistake to see why it happens and how to fix it.", id: "Belajar dari kesalahan orang lain. Klik kesalahan untuk melihat kenapa terjadi dan cara memperbaikinya." }),
      wrong: t({ en: "❌ Wrong", id: "❌ Salah" }),
      fixed: t({ en: "✅ Fixed", id: "✅ Diperbaiki" }),
    }
  };

  const sections = {
    cheatsheet: `
      <div class="lab-section">
        <!-- Visual: How Memory Works -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--info);">${tr.cheatsheet.memoryTitle}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:12px;">${tr.cheatsheet.memoryDesc}</p>
          <div class="lab-diagram"><strong>let</strong> robot_hp <strong>=</strong> 100;
<span class="dim">┌─────────────────────────────────┐</span>
<span class="dim">│</span>  <span class="highlight">robot_hp</span>  <span class="dim">│</span>  <strong>100</strong>            <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">(label)</span>   <span class="dim">│</span>  <span class="highlight">(value)</span>        <span class="dim">│</span>
<span class="dim">└─────────────────────────────────┘</span>

<span class="dim">let</span> name <span class="dim">=</span> <span class="highlight">"Sparky"</span>;
<span class="dim">┌─────────────────────────────────┐</span>
<span class="dim">│</span>  <span class="highlight">name</span>      <span class="dim">│</span>  <strong>"Sparky"</strong>      <span class="dim">│</span>
<span class="dim">└─────────────────────────────────┘</span>

<span class="dim">let</span> is_active <span class="dim">=</span> <span class="highlight">true</span>;
<span class="dim">┌─────────────────────────────────┐</span>
<span class="dim">│</span>  <span class="highlight">is_active</span> <span class="dim">│</span>  <strong>true</strong>           <span class="dim">│</span>
<span class="dim">└─────────────────────────────────┘</span></div>
        </div>

        <!-- Variables & Types -->
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

        <!-- Conditionals -->
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

        <!-- Loops -->
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
          <div class="lab-diagram" style="margin-top:12px;"><strong>for</strong> loop flow:
<span class="dim">┌──────┐</span>    <span class="dim">┌──────────┐</span>    <span class="dim">┌──────┐</span>
<span class="dim">│</span> <strong>start</strong> <span class="dim">│───▶│</span> <span class="highlight">run code</span> <span class="dim">│───▶│</span> <strong>next</strong> <span class="dim">│</span>
<span class="dim">└──────┘</span>    <span class="dim">└──────────┘</span>    <span class="dim">└──┬───┘</span>
                         <span class="dim">│</span>
                    <span class="dim">more? ──▶</span> <strong>yes</strong> → back to run code
                         <span class="dim">│</span>
                         <span class="dim">└──</span> <strong>no</strong> → <span class="highlight">done!</span></div>
        </div>

        <!-- Functions -->
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
          <div class="lab-diagram" style="margin-top:12px;"><strong>Function = Vending Machine</strong>
<span class="dim">┌──────────────────────────────────┐</span>
<span class="dim">│</span>  <span class="highlight">INPUT</span>      <span class="dim">│</span>  <strong>PROCESS</strong>       <span class="dim">│</span>  <span class="highlight">OUTPUT</span>    <span class="dim">│</span>
<span class="dim">│</span>  <strong>"Luna"</strong>    <span class="dim">│</span>  greet() runs   <span class="dim">│</span>  <strong>"Halo,   </span> <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">(param)</span>    <span class="dim">│</span>  <span class="dim">format!()</span>      <span class="dim">│</span>  <strong> Luna!"</strong>  <span class="dim">│</span>
<span class="dim">│</span>             <span class="dim">│</span>                  <span class="dim">│</span>  <span class="dim">(return)</span> <span class="dim">│</span>
<span class="dim">└──────────────────────────────────┘</span></div>
        </div>

        <!-- Structs -->
        <div class="card" style="margin-bottom:16px;">
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
          <div class="lab-diagram" style="margin-top:12px;"><strong>Struct = Character Sheet</strong>
<span class="dim">┌─────────────────────┐</span>
<span class="dim">│</span>  <strong>Cadet</strong>              <span class="dim">│</span>
<span class="dim">│</span>  ─────────────────  <span class="dim">│</span>
<span class="dim">│</span>  name: <span class="highlight">"Zyx"</span>        <span class="dim">│</span>
<span class="dim">│</span>  hp:   <span class="highlight">100</span>          <span class="dim">│</span>
<span class="dim">│</span>  ─────────────────  <span class="dim">│</span>
<span class="dim">│</span>  <strong>Methods:</strong>           <span class="dim">│</span>
<span class="dim">│</span>  introduce()         <span class="dim">│</span>
<span class="dim">│</span>  is_fresh()          <span class="dim">│</span>
<span class="dim">└─────────────────────┘</span></div>
        </div>

        <!-- Vectors -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--success);">${tr.cheatsheet.vectors}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>let mut items = vec![];
items.push(String::from("Energy Cell"));  // add
items.push(String::from("Repair Kit"));
items.remove(0);                          // remove first
println!("Count: {}", items.len());       // size

for (i, item) in items.iter().enumerate() {
    println!("{}. {}", i + 1, item);
}</code></div>
          </div>
          <div class="lab-diagram" style="margin-top:12px;"><strong>Vector = Shopping List</strong>
<span class="dim">┌───┬──────────────────┐</span>
<span class="dim">│</span> <strong>0</strong> <span class="dim">│</span> <span class="highlight">"Energy Cell"</span>    <span class="dim">│</span>  ← push() adds here
<span class="dim">├───┼──────────────────┤</span>
<span class="dim">│</span> <strong>1</strong> <span class="dim">│</span> <span class="highlight">"Repair Kit"</span>     <span class="dim">│</span>
<span class="dim">├───┼──────────────────┤</span>
<span class="dim">│</span> <strong>2</strong> <span class="dim">│</span> <span class="highlight">"Data Chip"</span>      <span class="dim">│</span>  ← remove(0) deletes index 0
<span class="dim">└───┴──────────────────┘</span>
<span class="dim">len()</span> = <strong>3</strong> items total</div>
        </div>

        <!-- Methods -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--warning);">${tr.cheatsheet.methods}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
            <div class="code-body"><code>impl Cadet {
    // &self = reference to THIS cadet
    fn introduce(&self) {
        println!("I am {}", self.name);
    }

    // &mut self = can change this cadet
    fn damage(&mut self, amount: u32) {
        self.hp -= amount;
    }
}

let mut zyx = Cad { name: "Zyx", hp: 100 };
zyx.damage(20);  // hp is now 80</code></div>
          </div>
        </div>

        <!-- Cargo Commands -->
        <div class="card">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;color:var(--info);">${tr.cheatsheet.cargo}</h3>
          <div class="code-block" style="margin:0;">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Terminal</span></div>
            <div class="code-body"><code>cargo new my-project     # create new project
cargo run                # build + run
cargo check              # check for errors (faster)
cargo build              # build without running</code></div>
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

        <!-- Arduino Board Overview -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--info);">${tr.wiring.boardTitle}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:12px;">${tr.wiring.boardDesc}</p>
          <div class="lab-diagram"><strong>Arduino UNO — Top View</strong>
<span class="dim">┌──────────────────────────────────────┐</span>
<span class="dim">│</span>  <strong>DIGITAL</strong> (PWM~)                    <span class="dim">│</span>
<span class="dim">│</span>  <span class="highlight">~13  ~12  ~11  ~10  ~9   8   7   6</span>   <span class="dim">│</span>
<span class="dim">│</span>  <span class="highlight"> 5    4    3    2   1   0</span>            <span class="dim">│</span>
<span class="dim">│</span>                                      <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">┌──────────┐</span>    <span class="dim">┌────────────────┐</span> <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span> <strong>USB</strong>      <span class="dim">│</span>    <span class="dim">│</span>  <strong>ANALOG</strong>        <span class="dim">│</span> <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span> <span class="dim">(power +</span> <span class="dim">│</span>    <span class="dim">│</span>  <span class="highlight">A0  A1  A2</span>     <span class="dim">│</span> <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">│</span> <span class="dim"> program)</span> <span class="dim">│</span>    <span class="dim">│</span>  <span class="highlight">A3  A4  A5</span>     <span class="dim">│</span> <span class="dim">│</span>
<span class="dim">│</span>  <span class="dim">└──────────┘</span>    <span class="dim">└────────────────┘</span> <span class="dim">│</span>
<span class="dim">│</span>       <span class="dim">↓</span>                                     <span class="dim">│</span>
<span class="dim">│</span>  <strong>POWER:</strong> <span class="highlight">5V</span>  <span class="highlight">3.3V</span>  <span class="highlight">GND</span>  <span class="highlight">GND</span>  <strong>RESET</strong>   <span class="dim">│</span>
<span class="dim">└──────────────────────────────────────┘</span></div>
        </div>

        <!-- Arduino Core Functions -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:8px;color:var(--warning);">${tr.wiring.coreFunctionsTitle}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:12px;">${tr.wiring.coreFunctionsDesc}</p>

          <div style="display:grid;gap:8px;">
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--info);">
              <strong style="color:var(--info);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnSetup}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnSetupDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--info);">
              <strong style="color:var(--info);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnLoop}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnLoopDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--success);">
              <strong style="color:var(--success);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnPinMode}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnPinModeDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--success);">
              <strong style="color:var(--success);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnDigitalWrite}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnDigitalWriteDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--warning);">
              <strong style="color:var(--warning);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnDigitalRead}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnDigitalReadDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--warning);">
              <strong style="color:var(--warning);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnAnalogRead}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnAnalogReadDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--accent-light);">
              <strong style="color:var(--accent-light);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnDelay}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnDelayDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--accent-light);">
              <strong style="color:var(--accent-light);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnPulseIn}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnPulseInDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--f15bb5,#f15bb5);">
              <strong style="color:var(--f15bb5,#f15bb5);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnSerialBegin}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnSerialBeginDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--f15bb5,#f15bb5);">
              <strong style="color:var(--f15bb5,#f15bb5);font-family:var(--font-mono);font-size:0.875rem;">${tr.wiring.fnSerialPrint}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.fnSerialPrintDesc}</p>
            </div>
          </div>
        </div>

        <!-- Pin Types & Signals -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:8px;color:var(--success);">${tr.wiring.pinTypesTitle}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:12px;">${tr.wiring.pinTypesDesc}</p>
          <div class="lab-diagram"><strong>INPUT vs OUTPUT</strong>

<span class="highlight">OUTPUT (speak)</span>          <span class="highlight">INPUT (listen)</span>
┌──────────────┐          ┌──────────────┐
│ Arduino says  │          │ Arduino hears │
│ "HEY LED, ON!"│          │ "Is the button│
│              │          │  pressed?"    │
│ Pin sends out │          │ Pin reads in  │
│ 5V or 0V     │          │ HIGH or LOW   │
└──────────────┘          └──────────────┘

<span class="highlight">HIGH vs LOW</span>

  <strong>HIGH = ON</strong>              <strong>LOW = OFF</strong>
  ┌─────────┐            ┌─────────┐
  │ 5 volts │            │ 0 volts │
  │ 💡 ON   │            │ 💡 OFF  │
  │ 🔊 BEEP │            │ 🔊 quiet│
  └─────────┘            └─────────┘

<span class="highlight">Digital vs Analog Pins</span>

  Digital (0-13)         Analog (A0-A5)
  ┌──────────────┐      ┌──────────────┐
  │ Only HIGH/LOW│      │ 0 to 1023    │
  │ on or off    │      │ smooth range │
  │ LED, button  │      │ light sensor │
  └──────────────┘      └──────────────┘</div>
        </div>

        <!-- Wire Color Legend -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">${tr.wiring.wireLegendTitle}</h3>
          <div class="lab-wire-legend">
            <div class="lab-wire-item"><div class="lab-wire-dot" style="background:#e53170;"></div> ${tr.wiring.wirePower}</div>
            <div class="lab-wire-item"><div class="lab-wire-dot" style="background:#6b6d82;"></div> ${tr.wiring.wireGround}</div>
            <div class="lab-wire-item"><div class="lab-wire-dot" style="background:#ff8906;"></div> ${tr.wiring.wireSignal}</div>
          </div>
        </div>

        <!-- Component Descriptions -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">${tr.wiring.componentsTitle}</h3>
          <div class="lab-component">
            <div class="lab-component-name">💡 LED</div>
            <div class="lab-component-desc">${tr.wiring.ledDesc}</div>
          </div>
          <div class="lab-component">
            <div class="lab-component-name">⚡ Resistor (220Ω)</div>
            <div class="lab-component-desc">${tr.wiring.resistorDesc}</div>
          </div>
          <div class="lab-component">
            <div class="lab-component-name">🔊 Buzzer</div>
            <div class="lab-component-desc">${tr.wiring.buzzerDesc}</div>
          </div>
          <div class="lab-component">
            <div class="lab-component-name">👁️ Ultrasonic Sensor (HC-SR04)</div>
            <div class="lab-component-desc">${tr.wiring.sensorDesc}</div>
          </div>
          <div class="lab-component">
            <div class="lab-component-name">🔄 Servo Motor (SG90)</div>
            <div class="lab-component-desc">${tr.wiring.servoDesc}</div>
          </div>
        </div>

        <!-- Week 9 Wiring -->
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

        <!-- Week 10 Wiring -->
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

        <!-- Week 11 Wiring -->
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

        <!-- Sense → Decide → Act -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:8px;color:var(--warning);">${tr.wiring.senseDecideActTitle}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:12px;">${tr.wiring.senseDecideActDesc}</p>
          <div class="lab-diagram"><span class="highlight">🔄 The Robotics Loop</span>

<span class="dim">┌──────────┐</span>     <span class="dim">┌──────────┐</span>     <span class="dim">┌──────────┐</span>     <span class="dim">┌──────────┐</span>
<span class="dim">│</span>  <strong>SENS</strong><span class="dim">E</span>     <span class="dim">│</span>────▶<span class="dim">│</span>  <strong>DEC</strong><span class="dim">IDE</span>    <span class="dim">│</span>────▶<span class="dim">│</span>  <strong>AC</strong><span class="dim">T</span>      <span class="dim">│</span>────▶<span class="dim">│</span>  <strong>REPE</strong><span class="dim">AT</span>   <span class="dim">│</span>
<span class="dim">│</span> <span class="highlight">Read sensor</span> <span class="dim">│</span>     <span class="dim">│</span> <span class="highlight">if/else</span>   <span class="dim">│</span>     <span class="dim">│</span> <span class="highlight">LED, buzzer</span> <span class="dim">│</span>     <span class="dim">│</span> <span class="highlight">loop()</span>    <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">distance</span>   <span class="dim">│</span>     <span class="dim">│</span> <span class="dim">&lt; 10 cm?</span>  <span class="dim">│</span>     <span class="dim">│</span> <span class="dim">turn on</span>   <span class="dim">│</span>     <span class="dim">│</span> <span class="dim">back to</span>  <span class="dim">│</span>
<span class="dim">│</span> <span class="dim">button</span>     <span class="dim">│</span>     <span class="dim">│</span> <span class="dim">pressed?</span>   <span class="dim">│</span>     <span class="dim">│</span> <span class="dim">motor</span>     <span class="dim">│</span>     <span class="dim">│</span> <span class="highlight">SENSE</span>    <span class="dim">│</span>
<span class="dim">└──────────┘</span>     <span class="dim">└──────────┘</span>     <span class="dim">└──────────┘</span>     <span class="dim">└────┬─────┘</span>
                              <span class="dim">│</span>
                              <span class="dim">└──────── loop() runs ~10x/sec ────────┘</span></div>
        </div>

        <!-- Arduino vs Rust -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:8px;color:var(--accent-light);">${tr.wiring.arduinoVsRustTitle}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:12px;">${tr.wiring.arduinoVsRustDesc}</p>

          <div style="display:grid;gap:12px;">
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;">
              <strong style="color:var(--text-primary);font-size:0.875rem;">${tr.wiring.avrVar}</strong>
              <div class="lab-before-after" style="margin-top:8px;">
                <div class="lab-code-wrong">
                  <div class="lab-code-label" style="font-size:0.6875rem;">Arduino</div>
                  <div class="code-block" style="margin:0;"><div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">C++</span></div>
                    <div class="code-body"><code><span style="font-size:0.8125rem;">int hp = 100;
String name = "Sparky";</span></code></div>
                  </div>
                </div>
                <div class="lab-code-fixed">
                  <div class="lab-code-label" style="font-size:0.6875rem;">Rust</div>
                  <div class="code-block" style="margin:0;"><div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                    <div class="code-body"><code><span style="font-size:0.8125rem;">let hp = 100;
let name = "Sparky";</span></code></div>
                  </div>
                </div>
              </div>
            </div>

            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;">
              <strong style="color:var(--text-primary);font-size:0.875rem;">${tr.wiring.avrIf}</strong>
              <div class="lab-before-after" style="margin-top:8px;">
                <div class="lab-code-wrong">
                  <div class="lab-code-label" style="font-size:0.6875rem;">Arduino</div>
                  <div class="code-block" style="margin:0;"><div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">C++</span></div>
                    <div class="code-body"><code><span style="font-size:0.8125rem;">if (distance < 10) {
  digitalWrite(13, HIGH);
} else {
  digitalWrite(13, LOW);
}</span></code></div>
                  </div>
                </div>
                <div class="lab-code-fixed">
                  <div class="lab-code-label" style="font-size:0.6875rem;">Rust</div>
                  <div class="code-block" style="margin:0;"><div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                    <div class="code-body"><code><span style="font-size:0.8125rem;">if distance < 10 {
    led.turn_on();
} else {
    led.turn_off();
}</span></code></div>
                  </div>
                </div>
              </div>
            </div>

            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;">
              <strong style="color:var(--text-primary);font-size:0.875rem;">${tr.wiring.avrLoop}</strong>
              <div class="lab-before-after" style="margin-top:8px;">
                <div class="lab-code-wrong">
                  <div class="lab-code-label" style="font-size:0.6875rem;">Arduino</div>
                  <div class="code-block" style="margin:0;"><div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">C++</span></div>
                    <div class="code-body"><code><span style="font-size:0.8125rem;">void loop() {
  // repeats forever
}</span></code></div>
                  </div>
                </div>
                <div class="lab-code-fixed">
                  <div class="lab-code-label" style="font-size:0.6875rem;">Rust</div>
                  <div class="code-block" style="margin:0;"><div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                    <div class="code-body"><code><span style="font-size:0.8125rem;">loop {
    // repeats forever
}</span></code></div>
                  </div>
                </div>
              </div>
            </div>

            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;">
              <strong style="color:var(--text-primary);font-size:0.875rem;">${tr.wiring.avrFn}</strong>
              <div class="lab-before-after" style="margin-top:8px;">
                <div class="lab-code-wrong">
                  <div class="lab-code-label" style="font-size:0.6875rem;">Arduino</div>
                  <div class="code-block" style="margin:0;"><div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">C++</span></div>
                    <div class="code-body"><code><span style="font-size:0.8125rem;">void blink(int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(13, HIGH);
    delay(200);
    digitalWrite(13, LOW);
    delay(200);
  }
}</span></code></div>
                  </div>
                </div>
                <div class="lab-code-fixed">
                  <div class="lab-code-label" style="font-size:0.6875rem;">Rust</div>
                  <div class="code-block" style="margin:0;"><div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                    <div class="code-body"><code><span style="font-size:0.8125rem;">fn blink(times: u32) {
    for _ in 0..times {
        led.turn_on();
        thread::sleep(Duration::from_millis(200));
        led.turn_off();
        thread::sleep(Duration::from_millis(200));
    }
}</span></code></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Arduino Debugging Tips -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:8px;color:var(--error);">${tr.wiring.arduinoDebugTitle}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:12px;">${tr.wiring.arduinoDebugDesc}</p>

          <div style="display:grid;gap:8px;">
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--error);">
              <strong style="color:var(--error);font-size:0.875rem;">❌ ${tr.wiring.debugUpload}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.debugUploadDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--warning);">
              <strong style="color:var(--warning);font-size:0.875rem;">⚠️ ${tr.wiring.debugNoSerial}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.debugNoSerialDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--warning);">
              <strong style="color:var(--warning);font-size:0.875rem;">💡 ${tr.wiring.debugLedOff}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.debugLedOffDesc}</p>
            </div>
            <div style="padding:10px 12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--info);">
              <strong style="color:var(--info);font-size:0.875rem;">🔄 ${tr.wiring.debugServoJitter}</strong>
              <p style="font-size:0.8125rem;color:var(--text-secondary);margin-top:2px;">${tr.wiring.debugServoJitterDesc}</p>
            </div>
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
        <!-- Debugging Checklist -->
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

        <!-- Error Types with Before/After -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">${tr.debug.errorTypes}</h3>

          <!-- Missing Semicolon -->
          <div style="margin-bottom:20px;">
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--error);margin-bottom:8px;">
              <strong style="color:var(--error);">${tr.debug.missingSemi}</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${tr.debug.missingSemiDesc}</p>
            </div>
            <div class="lab-before-after">
              <div class="lab-code-wrong">
                <div class="lab-code-label">${tr.debug.wrong}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code><span style="color:var(--error);">let greeting = "Hello!"</span>
println!("{}", greeting);</code></div>
                </div>
              </div>
              <div class="lab-code-fixed">
                <div class="lab-code-label">${tr.debug.fixed}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code><span style="color:var(--success);">let greeting = "Hello!";</span>
println!("{}", greeting);</code></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Type Mismatch -->
          <div style="margin-bottom:20px;">
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--warning);margin-bottom:8px;">
              <strong style="color:var(--warning);">${tr.debug.typeMismatch}</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${tr.debug.typeMismatchDesc}</p>
            </div>
            <div class="lab-before-after">
              <div class="lab-code-wrong">
                <div class="lab-code-label">${tr.debug.wrong}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code><span style="color:var(--error);">let age: u32 = "five";</span></code></div>
                </div>
              </div>
              <div class="lab-code-fixed">
                <div class="lab-code-label">${tr.debug.fixed}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code><span style="color:var(--success);">let age: u32 = 5;</span></code></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Unused Variable -->
          <div style="margin-bottom:20px;">
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--info);margin-bottom:8px;">
              <strong style="color:var(--info);">${tr.debug.unusedVar}</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${tr.debug.unusedVarDesc}</p>
            </div>
            <div class="lab-before-after">
              <div class="lab-code-wrong">
                <div class="lab-code-label">${tr.debug.wrong}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code>fn main() {
    <span style="color:var(--error);">let mission_code = 42;</span>
    println!("Ready!");
}</code></div>
                </div>
              </div>
              <div class="lab-code-fixed">
                <div class="lab-code-label">${tr.debug.fixed}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code>fn main() {
    <span style="color:var(--success);">let mission_code = 42;</span>
    <span style="color:var(--success);">println!("Code: {}", mission_code);</span>
}</code></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mismatched Braces -->
          <div>
            <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--accent);margin-bottom:8px;">
              <strong style="color:var(--accent-light);">${tr.debug.mismatchedBraces}</strong>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${tr.debug.mismatchedBracesDesc}</p>
            </div>
            <div class="lab-before-after">
              <div class="lab-code-wrong">
                <div class="lab-code-label">${tr.debug.wrong}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code>fn main() {
    println!("Hi");
<span style="color:var(--error);">// missing closing }</span></code></div>
                </div>
              </div>
              <div class="lab-code-fixed">
                <div class="lab-code-label">${tr.debug.fixed}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code>fn main() {
    println!("Hi");
<span style="color:var(--success);">}</span></code></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Spot the Bug -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;">${tr.debug.spotBug}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">${tr.debug.spotBugDesc}</p>

          <div style="margin-bottom:16px;">
            <p style="font-size:0.875rem;color:var(--text-primary);font-weight:600;margin-bottom:8px;">${t({ en: I18N.ui.en.lab_bug_n, id: I18N.ui.id.lab_bug_n }).replace('{n}', 1)}</p>
            <div class="code-block" style="margin:0;">
              <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
              <div class="code-body"><code>let x = 5
let y = 10;
println!("{}", x + y);</code></div>
            </div>
            <details style="margin-top:8px;">
              <summary style="font-size:0.875rem;color:var(--accent-light);cursor:pointer;">${t({ en: "Reveal answer", id: "Tampilkan jawaban" })}</summary>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:8px;">${t({ en: "Missing semicolon after <code>let x = 5</code>. Add <code>;</code> at the end.", id: "Titik koma hilang setelah <code>let x = 5</code>. Tambah <code>;</code> di akhir." })}</p>
            </details>
          </div>

          <div style="margin-bottom:16px;">
            <p style="font-size:0.875rem;color:var(--text-primary);font-weight:600;margin-bottom:8px;">${t({ en: I18N.ui.en.lab_bug_n, id: I18N.ui.id.lab_bug_n }).replace('{n}', 2)}</p>
            <div class="code-block" style="margin:0;">
              <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
              <div class="code-body"><code>let count: i32 = "three";
println!("Count: {}", count);</code></div>
            </div>
            <details style="margin-top:8px;">
              <summary style="font-size:0.875rem;color:var(--accent-light);cursor:pointer;">${t({ en: "Reveal answer", id: "Tampilkan jawaban" })}</summary>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:8px;">${t({ en: "Type mismatch! <code>i32</code> expects a number, but you gave text. Change to <code>let count: i32 = 3;</code>", id: "Tipe tidak cocok! <code>i32</code> butuh angka, tapi kamu kasih teks. Ganti ke <code>let count: i32 = 3;</code>" })}</p>
            </details>
          </div>

          <div>
            <p style="font-size:0.875rem;color:var(--text-primary);font-weight:600;margin-bottom:8px;">${t({ en: I18N.ui.en.lab_bug_n, id: I18N.ui.id.lab_bug_n }).replace('{n}', 3)}</p>
            <div class="code-block" style="margin:0;">
              <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
              <div class="code-body"><code>fn main() {
    let items = vec!["a", "b", "c"];
    for item in items {
        println(item);
    }
}</code></div>
            </div>
            <details style="margin-top:8px;">
              <summary style="font-size:0.875rem;color:var(--accent-light);cursor:pointer;">${t({ en: "Reveal answer", id: "Tampilkan jawaban" })}</summary>
              <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:8px;">${t({ en: "<code>println</code> is missing the <code>!</code>. It should be <code>println!(\"{}\", item);</code>", id: "<code>println</code> kehilangan <code>!</code>. Seharusnya <code>println!(\"{}\", item);</code>" })}</p>
            </details>
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
              { term: "Variable", def: "A named box that holds a value. Created with let.", def_id: "Kotak bernama yang menyimpan nilai. Dibuat dengan let.", example: 'let hp = 100;' },
              { term: "Mutable (mut)", def: "Can be changed after creation. Add mut before the name.", def_id: "Bisa diubah setelah dibuat. Tambah mut sebelum nama.", example: 'let mut hp = 100;\nhp = 80; // OK!' },
              { term: "Function (fn)", def: "A reusable block of code. You call it by name.", def_id: "Blok kode yang bisa dipakai ulang. Dipanggil lewat nama.", example: 'fn greet() {\n    println!("Hi!");\n}\ngreet();' },
              { term: "Parameter", def: "Input values a function accepts. Shown inside parentheses.", def_id: "Nilai masukan fungsi. Ditampilkan di dalam tanda kurung.", example: 'fn add(a: i32, b: i32) {\n    println!("{}", a + b);\n}' },
              { term: "Return value", def: "What a function gives back. Shown with -> Type.", def_id: "Apa yang dikembalikan fungsi. Ditampilkan dengan -> Type.", example: 'fn double(x: i32) -> i32 {\n    x * 2\n}' },
              { term: "Struct", def: "A custom data type that groups related values together.", def_id: "Tipe data kustom yang mengelompokkan nilai terkait.", example: 'struct Robot {\n    name: String,\n    hp: u32,\n}' },
              { term: "Method", def: "A function that belongs to a struct. Uses &self.", def_id: "Fungsi yang milik struct. Pakai &self.", example: 'impl Robot {\n    fn introduce(&self) {\n        println!("{}", self.name);\n    }\n}' },
              { term: "Vector (Vec)", def: "An ordered list that can grow and shrink.", def_id: "Daftar berurutan yang bisa bertambah dan berkurang.", example: 'let mut v = vec![1, 2, 3];\nv.push(4);\nv.remove(0);' },
              { term: "Loop", def: "Repeats code. for = known times, while = until condition.", def_id: "Mengulang kode. for = jumlah diketahui, while = sampai kondisi.", example: 'for i in 1..=5 {\n    println!("{}", i);\n}' },
              { term: "Conditional", def: "if/else lets code make decisions based on true/false.", def_id: "if/else biarkan kode memutuskan berdasarkan true/false.", example: 'if hp > 50 {\n    println!("Healthy!");\n} else {\n    println!("Low HP!");\n}' },
              { term: "Compile", def: "Turn code into a program the computer can run.", def_id: "Ubah kode jadi program yang bisa dijalanin komputer.", example: '// Terminal:\n// rustc main.rs\n// ./main' },
              { term: "Borrow Checker", def: "Rust's rule-enforcer. Makes sure data ownership is correct.", def_id: "Penegak aturan Rust. Pastikan kepemilikan data benar.", example: 'let s1 = String::from("hi");\nlet s2 = &s1; // borrow, don\'t move' },
              { term: "Cargo", def: "Rust's project manager. Handles building and dependencies.", def_id: "Manajer proyek Rust. Urus build dan dependensi.", example: '// Terminal:\n// cargo new my-project\n// cargo run' },
              { term: "println!", def: "Prints text to the screen with placeholders {}.", def_id: "Cetak teks ke layar dengan placeholder {}.", example: 'let name = "Luna";\nprintln!("Hi, {}!", name);' },
              { term: "format!", def: "Creates a string from a template (like println but saves it).", def_id: "Bikin string dari template (seperti println tapi disimpan).", example: 'let msg = format!("Hi, {}!", "Luna");\n// msg = "Hi, Luna!"' },
              { term: "String vs &str", def: "String = owned text you can change. &str = borrowed text you can read.", def_id: "String = teks milik yang bisa diubah. &str = teks pinjaman yang bisa dibaca.", example: 'let owned = String::from("hello");\nlet borrowed: &str = "world";' },
              { term: "enum", def: "A type that can be one of several variants.", def_id: "Tipe yang bisa salah satu dari beberapa varian.", example: 'enum State {\n    Scanning,\n    Alarm,\n}' },
              { term: "match", def: "Like if/else but for enums and patterns. Exhaustive checking.", def_id: "Seperti if/else tapi untuk enum dan pola. Pemeriksaan menyeluruh.", example: 'match state {\n    State::Scanning => scan(),\n    State::Alarm => alert(),\n}' },
              { term: "clone()", def: "Creates an exact copy of data. Use when you need your own copy.", def_id: "Membuat salinan tepat dari data. Pakai saat butuh salinan sendiri.", example: 'let a = String::from("hi");\nlet b = a.clone(); // b is independent' },
              { term: "enumerate()", def: "Adds a counter to each item in a loop: (0, item), (1, item)...", def_id: "Menambah penghitung ke setiap item di loop: (0, item), (1, item)...", example: 'for (i, name) in names.iter().enumerate() {\n    println!("{}. {}", i+1, name);\n}' },
              { term: "Ownership", def: "Rust's #1 rule: every value has exactly ONE owner. When the owner goes away, the value is freed.", def_id: "Aturan #1 Rust: setiap nilai punya tepat SATU pemilik. Saat pemilik pergi, nilai dibebaskan.", example: 'let s1 = String::from("hi");\nlet s2 = s1; // s1 is MOVED\n// println!("{}", s1); // ERROR!' },
              { term: "Reference (&)", def: "Borrow a value without taking ownership. The & means 'I\'m just looking, not taking'.", def_id: "Meminjam nilai tanpa mengambil kepemilikan. & artinya 'aku hanya melihat, tidak mengambil'.", example: 'let name = String::from("Luna");\nlet len = count_len(&name);\nprintln!("{}", name); // still OK!' },
              { term: "Mutable reference (&mut)", def: "Borrow AND change a value. Only one &mut allowed at a time per value.", def_id: "Meminjam DAN mengubah nilai. Hanya satu &mut yang diizinkan per nilai.", example: 'let mut hp = 100;\ndamage(&mut hp, 20);\nprintln!("HP: {}", hp); // 80' },
              { term: "Slice", def: "A window into a collection — part of a string or vector, without copying.", def_id: "Jendela ke koleksi — bagian dari string atau vector, tanpa menyalin.", example: 'let word = &"hello"[0..3];\n// word = "hel"' },
              { term: "Trait", def: "A contract that says 'any type implementing me must have these methods'.", def_id: "Kontrak yang bilang 'setiap tipe yang mengimplementasiku harus punya method ini'.", example: 'trait Describable {\n    fn describe(&self) -> String;\n}' },
              { term: "Option", def: "A value that might exist (Some) or might not (None). Rust\'s way of saying 'maybe'.", def_id: "Nilai yang mungkin ada (Some) atau mungkin tidak (None). Cara Rust bilang 'mungkin'.", example: 'let first = names.first();\n// first is Option<&str>\nmatch first {\n    Some(n) => println!("{}", n),\n    None => println!("empty"),\n}' },
              { term: "Result", def: "An operation that might succeed (Ok) or fail (Err). Rust\'s way of handling errors.", def_id: "Operasi yang mungkin berhasil (Ok) atau gagal (Err). Cara Rust menangani error.", example: 'let file = std::fs::read("data.txt");\nmatch file {\n    Ok(data) => println!("Got {} bytes", data.len()),\n    Err(e) => println!("Error: {}", e),\n}' },
              { term: ".unwrap()", def: "Get the value inside an Option/Result, or crash if it\'s None/Err. Quick but risky.", def_id: "Ambil nilai di dalam Option/Result, atau crash kalau None/Err. Cepat tapi berisiko.", example: 'let name = Some("Luna");\nprintln!("{}", name.unwrap()); // "Luna"\n\nlet empty: Option<&str> = None;\n// empty.unwrap(); // CRASH!' },
              { term: "if let", def: "Shorthand for matching a single pattern. Cleaner than a full match block.", def_id: "Shorthand untuk mencocokkan satu pola. Lebih bersih dari blok match penuh.", example: 'if let Some(name) = first {\n    println!("Found: {}", name);\n}' },
              { term: "match guard", def: "An extra condition on a match arm. Like if/else inside a match.", def_id: "Kondisi tambahan di lengan match. Seperti if/else di dalam match.", example: 'match hp {\n    0 => println!("Dead!"),\n    n if n < 30 => println!("Low!"),\n    _ => println!("OK"),\n}' },
              { term: "&& and ||", def: "Logical AND (&&) and OR (||). Combine boolean conditions.", def_id: "Logika DAN (&&) atau (||). Menggabungkan kondisi boolean.", example: 'if hp > 0 && is_active {\n    println!("Ready!");\n}\nif race == "fast" || race == "brave" {\n    println!("Bonus!");\n}' },
              { term: ".len()", def: "Get the size of a collection (vector, string, slice). Returns a number.", def_id: "Dapatkan ukuran koleksi (vector, string, slice). Mengembalikan angka.", example: 'let items = vec!["a", "b", "c"];\nprintln!("{}", items.len()); // 3' },
              { term: ".push()", def: "Add an item to the end of a vector. The list grows by one.", def_id: "Tambah item ke akhir vector. Daftar bertambah satu.", example: 'let mut v = vec![1, 2];\nv.push(3);\n// v is now [1, 2, 3]' },
              { term: ".remove()", def: "Delete an item at a specific index from a vector. Items shift down.", def_id: "Hapus item pada indeks tertentu dari vector. Item bergeser ke bawah.", example: 'let mut v = vec!["a", "b", "c"];\nv.remove(1); // removes "b"\n// v is now ["a", "c"]' },
              { term: ".iter()", def: "Loop through every item in a collection without moving them.", def_id: "Loop melalui setiap item dalam koleksi tanpa memindahkan mereka.", example: 'let nums = vec![1, 2, 3];\nfor n in nums.iter() {\n    println!("{}", n);\n}' },
              { term: "String::from()", def: "Create an owned String from a text literal. Owned = you control its lifetime.", def_id: "Buat String milik dari literal teks. Milik = kamu mengontrol umurnya.", example: 'let name = String::from("Sparky");\n// name is owned, can be modified' },
            ].map(item => `
              <div style="padding:12px;background:var(--bg-elevated);border-radius:8px;">
                <strong style="color:var(--accent-light);">${t({ en: item.term, id: item.term })}</strong>
                <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">${t({ en: item.def, id: item.def_id })}</p>
                <div class="lab-term-example">${tr.terms.exampleLabel} <code>${item.example}</code></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `,

    analogies: `
      <div class="lab-section">
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:8px;">${tr.analogies.title}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">${tr.analogies.desc}</p>

          <div style="display:grid;gap:12px;">
            ${[
              {
                emoji: "📦",
                concept: { en: "Variable", id: "Variabel" },
                analogy: { en: "A labeled pocket in your backpack. The label (name) stays the same, but you can swap what's inside.", id: "Kantong berlabel di ranselmu. Label (nama) tetap sama, tapi kamu bisa ganti isinya." },
                code: 'let hp = 100;\n// Pocket labeled "hp" contains 100',
              },
              {
                emoji: "✏️",
                concept: { en: "mut (Mutable)", id: "mut (Mutable)" },
                analogy: { en: "Pencil vs. pen. With mut, it's pencil — you can erase and rewrite. Without mut, it's pen — permanent!", id: "Pensil vs. pulpen. Dengan mut, itu pensil — bisa dihapus dan ditulis ulang. Tanpa mut, itu pulpen — permanen!" },
                code: 'let mut hp = 100; // pencil\nhp = 80;          // erased & rewritten\n\nlet hp = 100;     // pen\n// hp = 80;       // ERROR! permanent',
              },
              {
                emoji: "🔀",
                concept: { en: "if / else (Conditionals)", id: "if/else (Kondisional)" },
                analogy: { en: "A fork in the road. IF the sign says 'left', go left. ELSE, go right. Only one path is taken.", id: "Percabangan jalan. Kalau papan tanda bilang 'kiri', belok kiri. Kalau tidak, belok kanan. Hanya satu jalan yang dilewati." },
                code: 'if choice == "left" {\n    // left path\n} else {\n    // right path\n}',
              },
              {
                emoji: "🔁",
                concept: { en: "for loop", id: "for loop" },
                analogy: { en: "Knocking on doors. You know there are 10 rooms. Knock on door 1, then 2, then 3... until you've knocked on all 10.", id: "Mengetuk pintu. Kamu tahu ada 10 ruangan. Ketuk pintu 1, lalu 2, lalu 3... sampai semua pintu diketuk." },
                code: 'for room in 1..=10 {\n    println!("Knock knock on room {}!", room);\n}',
              },
              {
                emoji: "🔃",
                concept: { en: "while loop", id: "while loop" },
                analogy: { en: "Waiting at a traffic light. WHILE it's red, you wait. The moment it turns green, you go! You don't know how long you'll wait.", id: "Menunggu lampu lalu lintas. SELAMA merah, kamu tunggu. Begitu hijau, kamu jalan! Kamu tidak tahu berapa lama menunggu." },
                code: 'while light == "red" {\n    wait();\n}\ngo();',
              },
              {
                emoji: "⚗️",
                concept: { en: "Function", id: "Fungsi" },
                analogy: { en: "A vending machine. Put coins in (parameters), press a button (call), get a snack out (return value). Same machine, different coins, different snacks.", id: "Mesin jual otomatis. Masukkan koin (parameter), tekan tombol (panggil), dapat camilan (nilai kembali). Mesin yang sama, koin berbeda, camilan berbeda." },
                code: 'fn vending(coin: i32) -> String {\n    if coin >= 5 {\n        format!("Got a snack!")\n    } else {\n        format!("Not enough coins!")\n    }\n}',
              },
              {
                emoji: "🏗️",
                concept: { en: "Struct", id: "Struct" },
                analogy: { en: "A character sheet in a board game. It groups your name, HP, speed, and abilities into one card. Every character uses the same template but has different values.", id: "Lembar karakter di papan permainan. Mengelompokkan nama, HP, kecepatan, dan kemampuan dalam satu kartu. Setiap karakter pakai template yang sama tapi nilai berbeda." },
                code: 'struct Cadet {\n    name: String,\n    hp: u32,\n    speed: u32,\n}',
              },
              {
                emoji: "📋",
                concept: { en: "Vector (Vec)", id: "Vector (Vec)" },
                analogy: { en: "A grocery list on a whiteboard. You can add items (push), erase items (remove), and count how many items you have (len). The list grows and shrinks.", id: "Daftar belanja di papan tulis. Bisa tambah item (push), hapus item (remove), dan hitung jumlah item (len). Daftar memuai dan menyusut." },
                code: 'let mut list = vec![];\nlist.push("milk");\nlist.push("eggs");\nlist.remove(0);',
              },
              {
                emoji: "🐛",
                concept: { en: "Debugging", id: "Debugging" },
                analogy: { en: "Being a detective. The error message is a clue. The line number is the crime scene. You investigate, find the suspect (bug), and fix the case.", id: "Menjadi detektif. Pesan error adalah petunjuk. Nomor baris adalah lokasi kejadian. Kamu menyelidiki, menemukan tersangka (bug), dan menyelesaikan kasus." },
                code: '// Error: missing `;` at line 3\n// Detective: check line 3\n// Found: let x = 5  (missing ;)',
              },
              {
                emoji: "🏗️",
                concept: { en: "Borrow Checker", id: "Borrow Checker" },
                analogy: { en: "Library book rules. You can READ a book anytime (immutable borrow). But only ONE person can WRITE in it at a time (mutable borrow). And you can't write while others are reading.", id: "Aturan buku perpustakaan. Bisa BACA buku kapan saja (pinjaman tidak berubah). Tapi hanya SATU orang yang bisa MENULIS di dalamnya pada satu waktu (pinjaman berubah). Dan tidak bisa menulis sementara orang lain sedang membaca." },
                code: 'let book = String::from("Rust 101");\nlet reader1 = &book;  // can read\nlet reader2 = &book;  // can also read\n// let writer = &mut book; // ERROR if readers exist!',
              },
              {
                emoji: "🔧",
                concept: { en: "Cargo", id: "Cargo" },
                analogy: { en: "A workshop organizer. It builds the shelves (folder structure), keeps the instruction manual (Cargo.toml), and hands you tools when you ask (dependencies).", id: "Pengorganisir bengkel. Membuat rak (struktur folder), menyimpan buku panduan (Cargo.toml), dan memberikan alat saat diminta (dependensi)." },
                code: '// cargo new my-project\n// Creates: my-project/\n//          ├── Cargo.toml\n//          └── src/main.rs',
              },
              {
                emoji: "⚡",
                concept: { en: "Method (&self)", id: "Method (&self)" },
                analogy: { en: "A button on a remote control. Each button belongs to YOUR remote (&self). When you press 'volume up', it changes YOUR TV, not someone else's.", id: "Tombol di remote. Setiap tombol milik remote-MU (&self). Saat tekan 'volume naik', itu mengubah TV-MU, bukan milik orang lain." },
                code: 'impl Robot {\n    fn repair(&mut self) {\n        self.hp = 100; // YOUR robot\n    }\n}',
              },
              {
                emoji: "🏷️",
                concept: { en: "String vs &str", id: "String vs &str" },
                analogy: { en: "Your own name badge vs. reading someone else's name tag. String = you OWN the badge and can change it. &str = you're just READING it — it belongs to someone else.", id: "Lencana namamu sendiri vs membaca name tag orang lain. String = kamu MEMILIKI lencana dan bisa mengubahnya. &str = kamu hanya MEMBACANYA — itu milik orang lain." },
                code: 'let owned = String::from("Luna");\nlet borrowed: &str = &owned;\n// owned can change, borrowed cannot',
              },
              {
                emoji: "🏠",
                concept: { en: "Ownership", id: "Ownership" },
                analogy: { en: "Only one person can hold the TV remote at a time. When you hand it to someone else, YOU no longer have it. That's a 'move' in Rust.", id: "Hanya satu orang yang bisa memegang remote TV pada satu waktu. Saat kamu menyerahkannya ke orang lain, KAMU tidak memilikinya lagi. Itulah 'move' dalam Rust." },
                code: 'let remote = String::from("remote");\nlet sibling = remote;\n// YOU lost the remote!',
              },
              {
                emoji: "👀",
                concept: { en: "Reference (&)", id: "Reference (&)" },
                analogy: { en: "Looking at someone's food without eating it. You can see it, describe it, but you don't own it. When you walk away, the food is still there.", id: "Melihat makanan orang lain tanpa memakannya. Kamu bisa melihat, mendeskripsikan, tapi tidak memilikinya. Saat kamu pergi, makanannya masih di sana." },
                code: 'let food = String::from("pizza");\nlet look = &food;\nprintln!("I see {}", look);\nprintln!("{}", food); // still there!',
              },
              {
                emoji: "🎁",
                concept: { en: "Option", id: "Option" },
                analogy: { en: "A gift box that might be empty. You won't know until you open it. Some(x) = there's a gift inside. None = it's empty. You must check before using the gift.", id: "Kotak hadiah yang mungkin kosong. Kamu tidak tahu sampai membukanya. Some(x) = ada hadiah di dalam. None = kosong. Kamu harus memeriksa sebelum memakai hadiah." },
                code: 'let gift: Option<i32> = Some(42);\nlet empty: Option<i32> = None;\n\nmatch gift {\n    Some(val) => println!("Got {}!", val),\n    None => println!("Empty box"),\n}',
              },
              {
                emoji: "📝",
                concept: { en: "Result", id: "Result" },
                analogy: { en: "A test score. You might pass (Ok) or fail (Err). Either way, you get a result with a reason. You have to handle both outcomes.", id: "Nilai ujian. Kamu mungkin lulus (Ok) atau gagal (Err). Dua-duanya memberikan hasil dengan alasan. Kamu harus menangani kedua hasil." },
                code: 'fn divide(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 {\n        Err("Cannot divide by zero!".into())\n    } else {\n        Ok(a / b)\n    }\n}',
              },
              {
                emoji: "📋",
                concept: { en: "Trait", id: "Trait" },
                analogy: { en: "A job description. 'Waiter' is a trait: any restaurant worker who serves food and takes orders implements the Waiter trait. Different people, same job contract.", id: "Deskripsi pekerjaan. 'Pelayan' adalah trait: setiap pekerja restoran yang menyajikan makanan dan menerima pesanan mengimplementasikan trait Pelayan. Orang berbeda, kontrak pekerjaan sama." },
                code: 'trait CanFly {\n    fn fly(&self);\n}\n\nstruct Bird;\nstruct Plane;\n\nimpl CanFly for Bird { ... }\nimpl CanFly for Plane { ... }',
              },
              {
                emoji: "🎰",
                concept: { en: "match", id: "match" },
                analogy: { en: "A vending machine with specific buttons. Press 'A1' → get chips. Press 'B3' → get soda. Press anything else → error. Every possible input must have an answer.", id: "Mesin jual otomatis dengan tombol spesifik. Tekan 'A1' → dapat keripik. Tekan 'B3' → dapat soda. Tekan selain itu → error. Setiap input harus punya jawaban." },
                code: 'match choice {\n    "A1" => "Got chips!",\n    "B3" => "Got soda!",\n    _    => "Invalid choice",\n}',
              },
              {
                emoji: "💡",
                concept: { en: "enum", id: "enum" },
                analogy: { en: "A light switch with multiple positions. It can only be ONE position at a time: Off, Low, Medium, or High. Never two at once.", id: "Saklar lampu dengan beberapa posisi. Hanya bisa SATU posisi pada satu waktu: Mati, Rendah, Sedang, atau Tinggi. Tidak pernah dua sekaligus." },
                code: 'enum Light {\n    Off,\n    Low,\n    Medium,\n    High,\n}',
              },
              {
                emoji: "📖",
                concept: { en: "Slice", id: "Slice" },
                analogy: { en: "Reading pages 10–20 of a book without copying them. You're looking at a WINDOW into the original book. The book stays on the shelf — you're just borrowing a view.", id: "Membaca halaman 10–20 buku tanpa menyalinnya. Kamu melihat JENDELA ke buku asli. Buku tetap di rak — kamu hanya meminjam tampilan." },
                code: 'let sentence = "Hello, world!";\nlet hello = &sentence[0..5];\n// hello = "Hello" — a slice of the original',
              },
              {
                emoji: "💓",
                concept: { en: "Arduino loop()", id: "Arduino loop()" },
                analogy: { en: "Your heart beating. It beats once (setup), then loops forever — boom-boom, boom-boom — without you telling it to. The Arduino's loop() is its heartbeat.", id: "Jantungmu berdetak. Detak sekali (setup), lalu loop selamanya — boom-boom, boom-boom — tanpa kamu menyuruhnya. loop() Arduino adalah detak jantungnya." },
                code: '// Heartbeat pattern:\nvoid setup() {\n    // one-time init\n}\nvoid loop() {\n    // boom-boom forever\n}',
              },
            ].map(item => `
              <div class="lab-analogy">
                <div class="lab-analogy-title">${item.emoji} ${t(item.concept)}</div>
                <p>${t(item.analogy)}</p>
                <div class="lab-term-example" style="margin-top:8px;"><code>${item.code}</code></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `,

    mistakes: `
      <div class="lab-section">
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:8px;">${tr.mistakes.title}</h3>
          <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">${tr.mistakes.desc}</p>
        </div>

        ${[
          {
            title: { en: "🔴 Forgetting quotes around strings", id: "🔴 Lupa tanda kutip untuk string" },
            wrong: 'let name = Sparky;',
            fixed: 'let name = "Sparky";',
            why: { en: "Rust thinks Sparky is a variable name. Text must wear quotes to be a string.", id: "Rust mengira Sparky adalah nama variabel. Teks harus pakai tanda kutip agar jadi string." },
            topic: "Variables",
          },
          {
            title: { en: "🔴 Missing semicolon", id: "🔴 Titik koma hilang" },
            wrong: 'let hp = 100\nprintln!("{}", hp);',
            fixed: 'let hp = 100;\nprintln!("{}", hp);',
            why: { en: "Every statement in Rust must end with ;. It's like a period at the end of a sentence.", id: "Setiap pernyataan dalam Rust harus diakhiri dengan ;. Seperti tanda titik di akhir kalimat." },
            topic: "Variables",
          },
          {
            title: { en: "🔴 Using = instead of == in conditions", id: "🔴 Pakai = bukan == di kondisi" },
            wrong: 'if choice = "left" {\n    println!("Going left!");\n}',
            fixed: 'if choice == "left" {\n    println!("Going left!");\n}',
            why: { en: "\"=\" means 'assign a value'. \"==\" means 'compare values'. In if conditions, you want to COMPARE, not assign.", id: "\"=\" artinya 'memberi nilai'. \"==\" artinya 'membandingkan nilai'. Di if, kamu ingin MEMBANDINGKAN, bukan memberi nilai." },
            topic: "Conditionals",
          },
          {
            title: { en: "🔴 Off-by-one in range", id: "🔴 Salah satu di range" },
            wrong: 'for i in 1..5 {\n    println!("{}", i);\n}\n// Prints 1, 2, 3, 4 — NOT 5!',
            fixed: 'for i in 1..=5 {\n    println!("{}", i);\n}\n// Prints 1, 2, 3, 4, 5 ✓',
            why: { en: "1..5 stops BEFORE 5 (exclusive). Use 1..=5 to INCLUDE 5 (inclusive). The = means 'include the end'.", id: "1..5 berhenti SEBELUM 5 (eksklusif). Pakai 1..=5 untuk MEMASUKKAN 5 (inklusif). Tanda = artinya 'masukkan angka akhir'." },
            topic: "Loops",
          },
          {
            title: { en: "🔴 Infinite loop", id: "🔴 Loop tak terbatas" },
            wrong: 'let mut x = 0;\nwhile x < 10 {\n    println!("{}", x);\n    // Forgot x += 1!\n}',
            fixed: 'let mut x = 0;\nwhile x < 10 {\n    println!("{}", x);\n    x += 1; // Don\'t forget!\n}',
            why: { en: "x never changes, so x < 10 is always true. The loop runs forever! Always make sure your while condition can become false.", id: "x tidak pernah berubah, jadi x < 10 selalu true. Loop jalan terus! Selalu pastikan kondisi while bisa jadi false." },
            topic: "Loops",
          },
          {
            title: { en: "🔴 Wrong function arguments", id: "🔴 Argumen fungsi salah" },
            wrong: 'fn greet(name: &str) {\n    println!("Hi, {}!", name);\n}\n\ngreet("Luna"); // WRONG!',
            fixed: 'fn greet(name: &str) {\n    println!("Hi, {}!", name);\n}\n\ngreet("Luna"); // OK!',
            why: { en: "Wait — this looks the same! The real mistake: greet(5) would fail because 5 is not a &str. Types must match the parameter.", id: "Tunggu — ini sama! Kesalahan nyata: greet(5) gagal karena 5 bukan &str. Tipe harus cocok dengan parameter." },
            topic: "Functions",
          },
          {
            title: { en: "🔴 Mutating an immutable variable", id: "🔴 Mengubah variabel immutable" },
            wrong: 'let items = vec!["a", "b"];\nitems.push("c"); // ERROR!',
            fixed: 'let mut items = vec!["a", "b"];\nitems.push("c"); // OK!',
            why: { en: "Without mut, the variable is frozen. You can READ it, but not CHANGE it. Add mut if you need to modify.", id: "Tanpa mut, variabel dibekukan. Bisa DIBACA, tapi tidak DIUBAH. Tambah mut jika perlu mengubah." },
            topic: "Variables",
          },
          {
            title: { en: "🔴 Using . (dot) instead of :: (double colon)", id: "🔴 Pakai . (dot) bukan :: (dua titik dua)" },
            wrong: 'let name = String.from("Hi");',
            fixed: 'let name = String::from("Hi");',
            why: { en: ":: is for things that belong to a TYPE (like String::from). . is for things that belong to a VALUE (like name.len()).", id: ":: untuk hal yang milik TIPE (seperti String::from). . untuk hal yang milik NILAI (seperti name.len())." },
            topic: "Functions",
          },
          {
            title: { en: "🔴 Forgetting & in println! for variables", id: "🔴 Lupa & di println! untuk variabel" },
            wrong: 'let s = String::from("hello");\nprintln!("{}", s); // might error\nprintln!("{}", &s); // safer',
            fixed: 'let s = String::from("hello");\nprintln!("{}", s); // actually OK here\n// But in functions, &s avoids moving:',
            why: { en: "println! borrows automatically, so this usually works. But passing a String to a function without & MOVES it — you can't use it after!", id: "println! meminjam otomatis, jadi biasanya berhasil. Tapi memberikan String ke fungsi tanpa & MEMINDAHKannya — tidak bisa dipakai lagi!" },
            topic: "Variables",
          },
          {
            title: { en: "🔴 Not handling Option/Result", id: "🔴 Tidak menangani Option/Result" },
            wrong: 'let first = names[0]; // panics if empty!',
            fixed: 'let first = names.first(); // returns Option\nmatch first {\n    Some(name) => println!("{}", name),\n    None => println!("No names!"),\n}',
            why: { en: "Accessing [0] on an empty vector crashes! .first() returns Option — it might have a value or it might be None. Always check!", id: "Mengakses [0] pada vector kosong crash! .first() mengembalikan Option — mungkin ada nilai atau None. Selalu periksa!" },
            topic: "Vectors",
          },
        ].map(m => `
          <div class="lab-mistake">
            <div class="lab-mistake-title">${t(m.title)}</div>
            <div class="lab-before-after">
              <div class="lab-code-wrong">
                <div class="lab-code-label">${tr.mistakes.wrong}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code>${m.wrong}</code></div>
                </div>
              </div>
              <div class="lab-code-fixed">
                <div class="lab-code-label">${tr.mistakes.fixed}</div>
                <div class="code-block">
                  <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><span class="code-lang">Rust</span></div>
                  <div class="code-body"><code>${m.fixed}</code></div>
                </div>
              </div>
            </div>
            <div class="lab-mistake-fix">
              <strong>${tr.debug.whyBroke}</strong>
              <p>${t(m.why)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `,
  };

  content.innerHTML = sections[section] || '';
};
