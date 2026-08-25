// Week 9 — Lights and Sounds (Arduino: Hardware IO)
LESSONS[9] = {
  bigIdea: {
    title: { en: "Today Your Code Steps Off the Screen", id: "Hari Ini Kodemu Melangkah Keluar dari Layar" },
    body: { en: "Everything so far lived inside the computer. Today, code flows through real copper wires and becomes LIGHT and SOUND. The thinking is identical — turn on, wait, turn off — but the canvas is the physical world.\n\nTwo special functions rule every Arduino: setup() runs ONCE at power-up, and loop() runs FOREVER after. Your robot lives inside its loop.", id: "Sejauh ini semuanya hidup di dalam komputer. Hari ini, kode mengalir melalui kabel tembaga sungguhan dan menjadi CAHAYA dan BUNYI. Pola pikirnya identik — nyalakan, tunggu, matikan — tetapi kanvasnya adalah dunia fisik.\n\nDua fungsi istimewa menguasai setiap Arduino: setup() berjalan SEKALI saat dinyalakan, dan loop() berjalan SELAMANYA setelahnya. Robotmu hidup di dalam loop-nya." }
  },

  wordWall: [
    { term: "setup()", en: "Runs once at power-up: where you introduce your pins.", id: "Berjalan sekali saat dinyalakan: tempat memperkenalkan pin-pin." },
    { term: "loop()", en: "Runs forever after setup — the robot's heartbeat.", id: "Berjalan selamanya setelah setup — detak jantung robot." },
    { term: "pinMode", en: "Declares a pin as OUTPUT (speaks) or INPUT (listens).", id: "Menyatakan pin sebagai OUTPUT (berbicara) atau INPUT (mendengar)." },
    { term: "digitalWrite", en: "Flips a pin on (HIGH) or off (LOW).", id: "Membalik pin menjadi nyala (HIGH) atau mati (LOW)." },
    { term: "HIGH / LOW", en: "HIGH = about 5 volts flowing. LOW = off.", id: "HIGH = sekitar 5 volt mengalir. LOW = mati." },
    { term: "delay(ms)", en: "Pauses the program. 1000 ms = 1 second.", id: "Menghentikan program sejenak. 1000 ms = 1 detik." },
  ],

  thinkSkill: {
    name: "System Integration",
    hook: { en: "Today your code and electricity become one system.", id: "Hari ini kodemu dan listrik menjadi satu sistem." },
    realLife: { en: "A traffic light is a program made of light bulbs: green for 30 seconds, yellow for 3, red for 40 — repeat forever. Somebody wrote that loop, and millions of people obey it daily.", id: "Lampu lalu lintas adalah program dari bohlam: hijau 30 detik, kuning 3 detik, merah 40 detik — ulangi selamanya. Seseorang menulis loop itu, dan jutaan orang menaatinya setiap hari." },
    codeLink: { en: "digitalWrite is a switch; delay is a wait — the same on/off/wait thinking from weeks 1–8, now in copper. Integration means making separate pieces (LED + buzzer + code) behave as ONE machine. Each piece is simple; the system is the achievement.", id: "digitalWrite adalah saklar; delay adalah jeda — pola nyalakan/matikan/tunggu dari minggu 1–8 yang sama, kini lewat tembaga. Integrasi berarti menyatukan potongan-potongan (LED + buzzer + kode) agar berperilaku sebagai SATU mesin. Setiap potongan sederhana; sistemnya itulah pencapaiannya." },
    tryIt: { en: "Find one machine at home that repeats a light or sound pattern. Describe its loop: what happens, in what order, for how long?", id: "Temukan satu mesin di rumah yang mengulang pola cahaya atau suara. Jelaskan loop-nya: apa yang terjadi, dalam urutan apa, berapa lama?" }
  },

  codeWalkthrough: [
    { line: "void setup() {", en: "Runs exactly ONCE when the board gets power. Introductions happen here.", id: "Berjalan tepat SEKALI saat papan mendapat daya. Perkenalan terjadi di sini." },
    { line: "pinMode(13, OUTPUT);", en: "Pin 13 is declared a SPEAKER, not a listener. (It also has a built-in LED — free light!)", id: "Pin 13 dinyatakan sebagai PEMBICARA, bukan pendengar. (Pin ini juga punya LED bawaan — lampu gratis!)" },
    { line: "void loop() {", en: "After setup, this runs forever. When it reaches the bottom, it jumps back to the top. Forever.", id: "Setelah setup, ini berjalan selamanya. Saat mencapai bawah, ia melompat kembali ke atas. Selamanya." },
    { line: "digitalWrite(13, HIGH); delay(200);", en: "Switch pin 13 on, then freeze 200 milliseconds. On-off-on with waits = blinking.", id: "Nyalakan pin 13, lalu beku 200 milidetik. Nyala-mati-nyala dengan jeda = berkedip." },
    { line: "digitalWrite(13, HIGH); delay(200); digitalWrite(13, LOW); delay(300);", en: "The second gap is longer (300 vs 200) — that's the SOS rhythm hiding in the delays.", id: "Jeda keduanya lebih panjang (300 vs 200) — di sanalah ritme SOS bersembunyi di dalam delay." },
    { line: "digitalWrite(12, HIGH); digitalWrite(13, HIGH); digitalWrite(11, HIGH);", en: "Three switches flipped at once: both lights AND the buzzer. One command each, fired together.", id: "Tiga saklar dibalik sekaligus: kedua lampu DAN buzzer. Satu perintah masing-masing, ditembakkan bersama." },
    { line: "delay(500);", en: "Hold everything for half a second — then the LOW lines switch it all off.", id: "Tahan semuanya selama setengah detik — lalu baris-baris LOW mematikan semuanya." },
  ],

  predictions: [
    {
      q: { en: "Delete every LOW line from the loop. What do the LEDs do?", id: "Hapus semua baris LOW dari loop. Apa yang dilakukan LED?" },
      a: { en: "They stay on! The loop keeps switching them HIGH and never off. (The buzzer too — hope you like beeping.)", id: "Tetap menyala! Loop terus menyetel mereka HIGH dan tidak pernah mematikan. (Buzzer juga — semoga kamu suka bunyi bip.)" },
    },
    {
      q: { en: "Change every delay(200) to delay(1000). What happens to the pattern?", id: "Ubah semua delay(200) menjadi delay(1000). Apa yang terjadi pada polanya?" },
      a: { en: "Slow motion! Same pattern, five times slower. Timing IS the pattern — change the delays, change the dance.", id: "Gerak lambat! Pola yang sama, lima kali lebih lambat. Waktu ADALAH polanya — ubah delay, ubah tarianya." },
    },
    {
      q: { en: "Swap the pin numbers: pinMode(13…) becomes pinMode(12…) everywhere. What changes?", id: "Tukar nomor pinnya: pinMode(13…) menjadi pinMode(12…) di mana-mana. Apa yang berubah?" },
      a: { en: "The EXTERNAL LED now does the SOS blink and the built-in one joins the buzzer pattern. The code controls whatever is wired to that number — pins are just addresses.", id: "LED LUAR kini melakukan kedipan SOS dan yang bawaan mengikuti pola buzzer. Kode mengontrol apa pun yang tersambung ke nomor itu — pin hanyalah alamat." },
    },
  ],

  challenges: [
    {
      text: { en: "Change the delay values. Fast delays = frantic energy. Slow delays = dramatic.", id: "Ubah nilai delay-nya. Delay cepat = energi panik. Delay lambat = dramatis." },
      hint: { en: "Only the numbers inside delay() change. Try 50 and 800.", id: "Hanya angka di dalam delay() yang berubah. Coba 50 dan 800." },
      success: { en: "Two clearly different moods from the same code.", id: "Dua suasana yang jelas berbeda dari kode yang sama." },
    },
    {
      text: { en: "Design your OWN signal pattern. Parent implements it. Does it match your mental model?", id: "Rancang pola sinyalmu SENDIRI. Orang tua yang mewujudkannya. Apakah sesuai bayanganmu?" },
      hint: { en: "Describe it in words first: \"two short flashes, one long beep, pause\" — then translate to HIGH/LOW/delay lines.", id: "Jelaskan dengan kata-kata dulu: \"dua kilat pendek, satu bip panjang, jeda\" — lalu terjemahkan ke baris HIGH/LOW/delay." },
      success: { en: "Your words became wiring and light — and they matched (or you learned why not).", id: "Kata-katamu menjadi kabel dan cahaya — dan semuanya cocok (atau kamu tahu kenapa tidak)." },
    },
    {
      text: { en: "Compare this to Rust: digitalWrite = function call, delay = Thread::sleep. Same thinking, different language.", id: "Bandingkan dengan Rust: digitalWrite = pemanggilan fungsi, delay = Thread::sleep. Pola pikir sama, bahasa berbeda." },
      hint: { en: "Say each Arduino line as a Rust sentence. What would loop() be?", id: "Ucapkan setiap baris Arduino sebagai kalimat Rust. Apa padanan loop()?" },
      success: { en: "You translated at least three lines and spotted that loop() is a while-forever.", id: "Kamu menerjemahkan sedikitnya tiga baris dan menyadari loop() adalah while selamanya." },
    },
    {
      text: { en: "What would happen if you removed the LOW statements? (Answer: LEDs stay on forever!)", id: "Apa yang terjadi jika pernyataan LOW dihapus? (Jawaban: LED menyala selamanya!)" },
      hint: { en: "Test it for real — then add them back. Predict FIRST, run SECOND.", id: "Uji sungguhan — lalu kembalikan. Tebak DULU, jalankan KEDUA." },
      success: { en: "Your prediction matched reality (or you can explain the surprise).", id: "Tebakanmu sesuai kenyataan (atau kamu bisa menjelaskan kejutannya)." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "The external LED never lights", id: "LED luar tidak pernah menyala" },
      fix: { en: "Two usual suspects: the LED is backwards (long leg = positive, toward the pin side) or the resistor isn't connecting the row. Flip it, re-seat it, try again.", id: "Dua tersangka utama: LED terbalik (kaki panjang = positif, ke arah pin) atau resistornya tidak tersambung pada barisan itu. Balikkan, pasang ulang, coba lagi." },
    },
    {
      bug: { en: "Sketch won't upload to the board", id: "Sketch tidak mau terunggah ke papan" },
      fix: { en: "Check Tools → Port and Tools → Board (Arduino Uno). Still failing? The USB cable might be charge-only — you need a DATA cable.", id: "Periksa Tools → Port dan Tools → Board (Arduino Uno). Masih gagal? Kabel USB-nya mungkin khusus cas — kamu butuh kabel DATA." },
    },
    {
      bug: { en: "LED works but the buzzer is silent", id: "LED menyala tetapi buzzer bisu" },
      fix: { en: "Buzzer polarity or wrong pin: check that the buzzer's + goes toward pin 11 and pinMode(11, OUTPUT) is actually in setup().", id: "Polaritas buzzer atau salah pin: pastikan kutub + buzzer mengarah ke pin 11 dan pinMode(11, OUTPUT) benar-benar ada di setup()." },
    },
  ],

  quiz: [
    {
      q: { en: "Which function runs forever?", id: "Fungsi mana yang berjalan selamanya?" },
      options: [
        { en: "setup()", id: "setup()" },
        { en: "loop()", id: "loop()" },
        { en: "pinMode()", id: "pinMode()" },
        { en: "delay()", id: "delay()" },
      ],
      answer: 1,
      explain: { en: "setup() runs once; loop() repeats forever. Every Arduino robot lives inside its loop.", id: "setup() berjalan sekali; loop() mengulang selamanya. Setiap robot Arduino hidup di dalam loop-nya." },
    },
    {
      q: { en: "digitalWrite(pin, HIGH) means…", id: "digitalWrite(pin, HIGH) berarti…" },
      options: [
        { en: "Turn the pin on (~5 volts)", id: "Nyalakan pin (sekitar 5 volt)" },
        { en: "Turn the pin off", id: "Matikan pin" },
        { en: "Listen to the pin", id: "Mendengarkan pin" },
        { en: "Delete the pin", id: "Menghapus pin" },
      ],
      answer: 0,
      explain: { en: "HIGH = on, LOW = off. digitalWrite flips the switch; delay decides how long it stays.", id: "HIGH = nyala, LOW = mati. digitalWrite membalik saklarnya; delay menentukan berapa lama ia bertahan." },
    },
    {
      q: { en: "delay(1000) pauses for…", id: "delay(1000) menjeda selama…" },
      options: [
        { en: "1 second", id: "1 detik" },
        { en: "10 seconds", id: "10 detik" },
        { en: "1000 seconds", id: "1000 detik" },
        { en: "Forever", id: "Selamanya" },
      ],
      answer: 0,
      explain: { en: "Milliseconds: 1000 ms = 1 second. Timing is everything in hardware.", id: "Milidetik: 1000 ms = 1 detik. Waktu adalah segalanya di dunia perangkat keras." },
    },
    {
      q: { en: "In Rust terms, digitalWrite(13, HIGH) is closest to…", id: "Dalam istilah Rust, digitalWrite(13, HIGH) paling dekat dengan…" },
      options: [
        { en: "let pin = 13;", id: "let pin = 13;" },
        { en: "Calling a function with two arguments", id: "Memanggil fungsi dengan dua argumen" },
        { en: "A comment", id: "Sebuah komentar" },
        { en: "A struct definition", id: "Definisi struct" },
      ],
      answer: 1,
      explain: { en: "It's a function call: name + two inputs. Same machine-with-slots idea as Week 4 — different language.", id: "Itu pemanggilan fungsi: nama + dua masukan. Ide mesin-bercelah dari minggu 4 — bahasa yang berbeda." },
    },
  ],

  reflect: [
    { prompt: { en: "Describe the signal pattern you designed. What mood does it send?", id: "Jelaskan pola sinyal yang kamu rancang. Suasana apa yang disampaikannya?" } },
    { prompt: { en: "If you could automate one machine in your house with code, which one and why?", id: "Jika kamu bisa mengotomatiskan satu mesin di rumah dengan kode, yang mana dan mengapa?" } },
  ],

  parentCorner: {
    prep: [
      { en: "Wire the breadboard BEFORE class and test-upload once. Loose wires eat lesson time.", id: "Rakit breadboard SEBELUM kelas dan uji unggah sekali. Kabel longgar memakan waktu pelajaran." },
      { en: "Check the USB cable is a data cable (it makes a sound when the board connects).", id: "Pastikan kabel USB adalah kabel data (berbunyi saat papan tersambung)." },
    ],
    say: [
      { en: "\"Same thinking as weeks 1 to 8 — but today the output is REAL light and REAL sound.\"", id: "\"Pola pikir yang sama seperti minggu 1 sampai 8 — tetapi hari ini keluarannya cahaya dan suara SUNGGUHAN.\"" },
      { en: "\"setup is the introduction, loop is the heartbeat.\"", id: "\"setup adalah perkenalan, loop adalah detak jantung.\"" },
      { en: "\"Predict first: what will change if we slow the delays?\"", id: "\"Tebak dulu: apa yang berubah jika kita memperlambat delay-nya?\"" },
    ],
    ifStuck: {
      en: "Point at the physical part while reading its line: finger on the LED while saying digitalWrite(12, HIGH). Connect the code line to the thing it moves. Then swap roles — kid reads, parent's finger moves.",
      id: "Tunjuk bagian fisiknya sambil membaca barisnya: jari di LED saat mengucapkan digitalWrite(12, HIGH). Hubungkan baris kode dengan benda yang digerakkannya. Lalu bertukar peran — anak membaca, jari orang tua yang bergerak.",
    },
  },
};
