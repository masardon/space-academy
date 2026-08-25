// Week 10 — The Sensor Eye (Ultrasonic Sensor: Feedback Loops)
LESSONS[10] = {
  bigIdea: {
    title: { en: "Sense → Decide → Act, Forever", id: "Rasa → Pikir → Bertindak, Selamanya" },
    body: { en: "The ultrasonic sensor is Sparky's ear: it shouts a sound pulse and times the echo, turning the world into a NUMBER — distance in centimeters.\n\nThen the oldest pattern in robotics takes over: READ the sensor, COMPARE to a threshold, REACT with light and sound. The loop runs about ten times a second, forever. That's a feedback loop — the same loop your eyes, brain, and feet run when walking a dark hallway.", id: "Sensor ultrasonik adalah telinga Sparky: ia menembakkan denyut suara dan menghitung waktu gema, mengubah dunia menjadi sebuah ANGKA — jarak dalam sentimeter.\n\nLalu pola tertua dalam dunia robotika mengambil alih: BACA sensor, BANDINGKAN dengan ambang batas, BEREAKSI dengan cahaya dan suara. Loop berjalan kurang lebih sepuluh kali per detik, selamanya. Itulah feedback loop — loop yang sama dengan matamu, otakmu, dan kakimu saat berjalan di lorong gelap." }
  },

  wordWall: [
    { term: "sensor", en: "A part that turns something physical into a number.", id: "Komponen yang mengubah sesuatu yang fisik menjadi angka." },
    { term: "TRIG / ECHO", en: "TRIG shouts the sound pulse; ECHO hears it bounce back.", id: "TRIG menembakkan denyut suara; ECHO mendengar pantulannya." },
    { term: "pulseIn", en: "Measures how long a pin stays HIGH — here, the echo's travel time.", id: "Mengukur berapa lama pin bertahan HIGH — di sini, waktu tempuh gema." },
    { term: "Serial Monitor", en: "A window showing live numbers from the board — the robot's diary.", id: "Jendela yang menampilkan angka langsung dari papan — buku harian robot." },
    { term: "threshold", en: "The decide-line: closer than 10 cm? Alarm. Farther? Silence.", id: "Garis keputusan: lebih dekat dari 10 cm? Alarm. Lebih jauh? Hening." },
    { term: "feedback loop", en: "Sense → decide → act → repeat. The loop that lets machines react.", id: "Rasa → pikir → bertindak → ulangi. Loop yang membuat mesin bisa bereaksi." },
  ],

  thinkSkill: {
    name: "Feedback Loops",
    hook: { en: "You are running two sensors, a processor, and four actuators right now. They're called eyes, brain, and hands.", id: "Saat ini kamu menjalankan dua sensor, satu pemroses, dan empat penggerak. Namanya mata, otak, dan tangan." },
    realLife: { en: "Walking in the dark: eyes sense → brain decides \"too close to the wall\" → feet steer. Constantly, without effort. Every living thing runs sense-decide-act loops — and so does every robot.", id: "Berjalan di kegelapan: mata merasakan → otak memutuskan \"terlalu dekat ke dinding\" → kaki mengarahkan. Terus-menerus, tanpa usaha. Setiap makhluk hidup menjalankan loop rasa-pikir-bertindak — begitu juga setiap robot." },
    codeLink: { en: "loop() reads distance, compares it to the threshold (10 cm), and reacts. Change 10 to 20 and the WHOLE personality of the robot changes — it startles from farther away. One number, one behavior change: that's parameterization.", id: "loop() membaca jarak, membandingkannya dengan ambang batas (10 cm), dan bereaksi. Ubah 10 menjadi 20 dan SELURUH kepribadian robot berubah — ia terkejut dari jarak lebih jauh. Satu angka, satu perubahan perilaku: itulah parameterisasi." },
    tryIt: { en: "Close your eyes and let a parent guide you across the room by voice only. You just became the actuator in their feedback loop.", id: "Tutup mata dan biarkan orang tua memandumu melintasi ruangan hanya dengan suara. Kamu baru saja menjadi penggerak dalam feedback loop mereka." }
  },

  codeWalkthrough: [
    { line: "const int trigPin = 2;", en: "Giving pins NAMES. From here on we say trigPin, not \"pin 2\" — code that reads like a story.", id: "Memberi pin NAMA. Mulai sekarang kita menyebut trigPin, bukan \"pin 2\" — kode yang terbaca seperti cerita." },
    { line: "pinMode(echoPin, INPUT);", en: "This pin LISTENS. Week 9's pins spoke (OUTPUT); the echo pin is an ear (INPUT).", id: "Pin ini MENDENGAR. Pin minggu 9 berbicara (OUTPUT); pin echo adalah telinga (INPUT)." },
    { line: "digitalWrite(trigPin, HIGH); delayMicroseconds(10);", en: "A shout lasting 10 MICROseconds — a thousand times shorter than delay(10). The sensor whispers in bat-language.", id: "Teriakan selama 10 MIKROdetik — seribu kali lebih pendek dari delay(10). Sensor ini berbisik dalam bahasa kelelawar." },
    { line: "duration = pulseIn(echoPin, HIGH);", en: "Stopwatch! pulseIn measures how many microseconds the echo took to come home.", id: "Stopwatch! pulseIn mengukur berapa mikrodetik gema butuh waktu untuk pulang." },
    { line: "distance = duration * 0.034 / 2;", en: "Sound-speed math: time turns into centimeters. Divided by 2 because the sound travels THERE and BACK.", id: "Matematika kecepatan suara: waktu berubah menjadi sentimeter. Dibagi 2 karena suara menempuh perjalanan PERGI dan PULANG." },
    { line: "if (distance < 10) {", en: "The DECIDE step. One comparison against the threshold — this single number is the robot's whole personality.", id: "Langkah PUTUSKAN. Satu perbandingan dengan ambang batas — angka tunggal ini adalah seluruh kepribadian robot." },
    { line: "Serial.print(\"Distance: \");", en: "Writing to the diary: the Serial Monitor shows live values so we can SEE the loop thinking.", id: "Menulis di buku harian: Serial Monitor menampilkan angka langsung agar kita bisa MELIHAT loop sedang berpikir." },
  ],

  predictions: [
    {
      q: { en: "Change the threshold from 10 to 20. What happens?", id: "Ubah ambang batas dari 10 menjadi 20. Apa yang terjadi?" },
      a: { en: "The alarm triggers from TWICE as far. You didn't add code or wire anything — one number changed the robot's comfort zone.", id: "Alarm terpicu dari jarak DUA KALI lebih jauh. Kamu tidak menambah kode atau kabel apa pun — satu angka mengubah zona nyaman robot." },
    },
    {
      q: { en: "Swap < for > in the comparison. What does the robot do now?", id: "Tukar < menjadi > pada perbandingannya. Apa yang dilakukan robot sekarang?" },
      a: { en: "A backwards robot! It alarms when things are FAR and goes quiet when something is close enough to touch. One flipped symbol inverts the whole personality.", id: "Robot terbalik! Ia beralarm saat benda JAUH dan hening saat sesuatu dekat sekali. Satu simbol terbalik membalikkan seluruh kepribadian." },
    },
    {
      q: { en: "Delete the delay(100) at the end. What happens to the Serial Monitor?", id: "Hapus delay(100) di bagian akhir. Apa yang terjadi pada Serial Monitor?" },
      a: { en: "The loop sprints — dozens of readings per second, numbers blurring together. Faster isn't better: the sensor needs time between shouts, and humans need time to read.", id: "Loopnya berlari — puluhan pembacaan per detik, angka-angka berbaur kabur. Cepat belum tentu baik: sensor butuh waktu antara teriakan, dan manusia butuh waktu untuk membaca." },
    },
  ],

  challenges: [
    {
      text: { en: "Open the Serial Monitor. Move your hand toward the sensor. What do the numbers do?", id: "Buka Serial Monitor. Gerakkan tanganmu mendekati sensor. Apa yang dilakukan angka-angkanya?" },
      hint: { en: "Tools → Serial Monitor, and set it to 9600 baud to match Serial.begin(9600).", id: "Tools → Serial Monitor, dan atur ke 9600 baud agar cocok dengan Serial.begin(9600)." },
      success: { en: "You watched distance shrink live as your hand approached — the robot's diary in action.", id: "Kamu melihat jarak menyusut secara langsung saat tanganmu mendekat — buku harian robot beraksi." },
    },
    {
      text: { en: "Change the threshold from 10 to 20. The alarm triggers from farther away. What changed?", id: "Ubah ambang batas dari 10 menjadi 20. Alarm terpicu dari lebih jauh. Apa yang berubah?" },
      hint: { en: "One character. Predict BEFORE uploading: closer or farther?", id: "Satu karakter. Tebak SEBELUM mengunggah: lebih dekat atau lebih jauh?" },
      success: { en: "You can explain how one number redrew the robot's comfort bubble.", id: "Kamu bisa menjelaskan bagaimana satu angka menggambar ulang gelembung nyaman robot." },
    },
    {
      text: { en: "Change it to 5. Now the alarm only triggers VERY close. Discuss: what is a 'good' threshold?", id: "Ubah menjadi 5. Kini alarm hanya terpicu saat SANGAT dekat. Diskusikan: apakah 'ambang batas' yang baik?" },
      hint: { en: "There's no perfect answer — it depends on the job. Parking sensor? Vacuum robot? Guard dog?", id: "Tidak ada jawaban sempurna — tergantung tugasnya. Sensor parkir? Robot penyedot debu? Anjing penjaga?" },
      success: { en: "You defended a threshold choice for a specific robot job.", id: "Kamu membela pilihan ambang batas untuk tugas robot tertentu." },
    },
    {
      text: { en: "Translate this if/else to Rust: if distance < 10 { led.on(); buzzer.on(); } else { … }", id: "Terjemahkan if/else ini ke Rust: if distance < 10 { led.on(); buzzer.on(); } else { … }" },
      hint: { en: "You wrote this exact shape in Week 2 — a condition, a true-branch, an else-branch.", id: "Kamu menulis bentuk yang persis ini di minggu 2 — sebuah kondisi, cabang true, cabang else." },
      success: { en: "The Arduino if and the Rust if are twins — you can prove it.", id: "if Arduino dan if Rust adalah kembar — kamu bisa membuktikannya." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "Distance always prints 0", id: "Jarak selalu tercetak 0" },
      fix: { en: "TRIG and ECHO are usually swapped, or a wire popped out. Check: TRIG→pin 2, ECHO→pin 3, and both pins match the const names.", id: "TRIG dan ECHO biasanya tertukar, atau kabelnya lepas. Periksa: TRIG→pin 2, ECHO→pin 3, dan kedua pin cocok dengan nama const." },
    },
    {
      bug: { en: "Numbers jump wildly (300, 2, 178, 0…)", id: "Angka melompat liar (300, 2, 178, 0…)" },
      fix: { en: "The sensor needs a FLAT target. Sound scatters off soft cloth or angled surfaces. Aim at a book or your palm, held flat.", id: "Sensor butuh sasaran yang DATAR. Suara tersebar di kain lembut atau permukaan miring. Bidik buku atau telapak tangan yang rata." },
    },
    {
      bug: { en: "The alarm never triggers, even up close", id: "Alarm tidak pernah terpicu, bahkan saat sangat dekat" },
      fix: { en: "Threshold too small, or the comparison got flipped. Print the distance first, THEN decide the threshold from real data — that's how engineers tune robots.", id: "Ambang batasnya terlalu kecil, atau perbandingannya terbalik. Cetak dulu jaraknya, BARU tentukan ambang batas dari data nyata — begitulah insinyur menyetel robot." },
    },
  ],

  quiz: [
    {
      q: { en: "How does the HC-SR04 measure distance?", id: "Bagaimana HC-SR04 mengukur jarak?" },
      options: [
        { en: "It takes a photo", id: "Memotret" },
        { en: "It times how long a sound pulse takes to bounce back", id: "Menghitung waktu denyut suara memantul kembali" },
        { en: "It guesses from the light", id: "Menebak dari cahaya" },
        { en: "It asks the object", id: "Bertanya pada benda" },
      ],
      answer: 1,
      explain: { en: "Bat-style: shout, listen, measure the echo's time, convert to centimeters.", id: "Gaya kelelawar: teriak, dengar, ukur waktu gema, ubah ke sentimeter." },
    },
    {
      q: { en: "In sense → decide → act, which line is the DECIDE?", id: "Dalam rasa → pikir → bertindak, baris mana yang PIKIR?" },
      options: [
        { en: "pulseIn(echoPin, HIGH);", id: "pulseIn(echoPin, HIGH);" },
        { en: "if (distance < 10)", id: "if (distance < 10)" },
        { en: "digitalWrite(ledPin, HIGH);", id: "digitalWrite(ledPin, HIGH);" },
        { en: "delay(100);", id: "delay(100);" },
      ],
      answer: 1,
      explain: { en: "The if against the threshold is the decision. pulseIn senses, digitalWrite acts.", id: "If terhadap ambang batas itulah keputusannya. pulseIn merasakan, digitalWrite bertindak." },
    },
    {
      q: { en: "What is a threshold?", id: "Apa itu ambang batas (threshold)?" },
      options: [
        { en: "The speed of sound", id: "Kecepatan suara" },
        { en: "The line the comparison checks against — the robot's comfort zone", id: "Garis yang dibandingkan — zona nyaman robot" },
        { en: "A kind of wire", id: "Sejenis kabel" },
        { en: "The loop's speed", id: "Kecepatan loop" },
      ],
      answer: 1,
      explain: { en: "One number decides when the robot reacts. Tuning it changes behavior — no new code needed.", id: "Satu angka menentukan kapan robot bereaksi. Menyetelnya mengubah perilaku — tanpa kode baru." },
    },
    {
      q: { en: "Why divide by 2 in distance = duration * 0.034 / 2?", id: "Mengapa dibagi 2 pada distance = duration * 0.034 / 2?" },
      options: [
        { en: "To make it faster", id: "Agar lebih cepat" },
        { en: "The sound travels there AND back — we only want the one-way distance", id: "Suara menempuh perjalanan pergi DAN pulang — kita hanya ingin jarak satu arah" },
        { en: "Because 0.034 is small", id: "Karena 0.034 kecil" },
        { en: "Rounding trick", id: "Trik pembulatan" },
      ],
      answer: 1,
      explain: { en: "The echo flies a round trip. Halving gives the distance to the object, not twice it.", id: "Gema menempuh perjalanan pulang-pergi. Dibagi dua memberi jarak ke benda, bukan dua kalinya." },
    },
    {
      q: { en: "What does pulseIn(echoPin, HIGH) measure?", id: "Apa yang diukur pulseIn(echoPin, HIGH)?" },
      options: [
        { en: "Voltage", id: "Tegangan" },
        { en: "Time in microseconds", id: "Waktu dalam mikrodetik" },
        { en: "Distance in cm", id: "Jarak dalam cm" },
        { en: "Sound volume", id: "Volume suara" },
      ],
      answer: 1,
      explain: { en: "pulseIn = stopwatch. Measures how long echoPin stays HIGH = echo travel time.", id: "pulseIn = stopwatch. Ukur berapa lama echoPin HIGH = waktu tempuh gema." },
    },
    {
      q: { en: "If distance prints 0 cm constantly, what's the most likely cause?", id: "Jika jarak tercetak 0 cm terus-menerus, penyebab paling mungkin?" },
      options: [
        { en: "Sensor broken", id: "Sensor rusak" },
        { en: "TRIG and ECHO wires swapped", id: "Kabel TRIG dan ECHO tertukar" },
        { en: "Code error", id: "Error kode" },
        { en: "Battery dead", id: "Baterai habis" },
      ],
      answer: 1,
      explain: { en: "Swapped TRIG/ECHO is the #1 cause of 0 readings. Check: TRIG→pin 2, ECHO→pin 3.", id: "TRIG/ECHO tertukar adalah penyebab #1 baca 0. Periksa: TRIG→pin 2, ECHO→pin 3." },
    },
    {
      q: { en: "What does Serial.begin(9600) do?", id: "Apa yang dilakukan Serial.begin(9600)?" },
      options: [
        { en: "Starts the sensor", id: "Memulai sensor" },
        { en: "Opens communication at 9600 baud", id: "Buka komunikasi 9600 baud" },
        { en: "Sets the threshold", id: "Atur ambang batas" },
        { en: "Calibrates the sensor", id: "Kalibrasi sensor" },
      ],
      answer: 1,
      explain: { en: "Serial.begin(speed) opens the USB serial port. Match baud in Serial Monitor or see garbage!", id: "Serial.begin(kecepatan) buka port serial USB. Cocokkan baud di Serial Monitor atau lihat sampah!" },
    },
    {
      q: { en: "True or false: The sensor measures distance with light.", id: "Benar/salah: Sensor mengukur jarak dengan cahaya." },
      options: [
        { en: "True", id: "Benar" },
        { en: "False", id: "Salah" },
      ],
      answer: 1,
      explain: { en: "HC-SR04 uses SOUND (ultrasonic), not light. Like a bat — shout, listen for echo!", id: "HC-SR04 pakai SUARA (ultrasonik), bukan cahaya. Seperti kelelawar — teriakan, dengar gema!" },
    },
    {
      q: { en: "Which thinking skill is Week 10's focus?", id: "Keterampilan berpikir minggu 10 adalah?" },
      options: [
        { en: "Tool Selection", id: "Pemilihan Alat" },
        { en: "System Integration", id: "Integrasi Sistem" },
        { en: "Feedback Loops", id: "Feedback Loops" },
        { en: "Algorithm Design", id: "Desain Algoritma" },
      ],
      answer: 2,
      explain: { en: "Week 10: sense → decide → act, repeat forever. That's a feedback loop — the robot's heartbeat!", id: "Minggu 10: rasa → pikir → bertindak, ulangi selamanya. Itulah feedback loop — detak jantung robot!" },
    },
    {
      q: { en: "What happens if you power the sensor with 3.3V instead of 5V?", id: "Apa jika sensor diberi daya 3.3V bukan 5V?" },
      options: [
        { en: "Works better", id: "Lebih baik" },
        { en: "May give unreliable readings", id: "Bisa bikin pembacaan tidak andal" },
        { en: "Breaks immediately", id: "Langsung rusak" },
        { en: "No difference", id: "Tidak beda" },
      ],
      answer: 1,
      explain: { en: "HC-SR04 spec = 5V. At 3.3V it might work but readings can be jumpy or zero. Use 5V for reliability!", id: "HC-SR04 spec = 5V. Di 3.3V mungkin jalan tapi bacaannya bisa lompat atau nol. Pakai 5V untuk andal!" },
    },
  ],

  reflect: [
    { prompt: { en: "Where else in real life have you noticed a sense → decide → act loop?", id: "Di mana lagi dalam kehidupan nyata kamu menyadari loop rasa → pikir → bertindak?" } },
    { prompt: { en: "If your robot guarded your bedroom door, what threshold would you pick? Why?", id: "Jika robotmu menjaga pintu kamarmu, ambang batas berapa yang kamu pilih? Mengapa?" } },
  ],

  parentCorner: {
    prep: [
      { en: "Wire HC-SR04 (VCC→5V, TRIG→2, ECHO→3, GND→GND) and keep week 9's LED/buzzer wired.", id: "Pasang HC-SR04 (VCC→5V, TRIG→2, ECHO→3, GND→GND) dan biarkan LED/buzzer minggu 9 tetap terpasang." },
      { en: "Open the Serial Monitor before class and wave your hand — first impression matters.", id: "Buka Serial Monitor sebelum kelas dan lambaikan tangan — kesan pertama itu penting." },
    ],
    say: [
      { en: "\"The robot is FEELING with sound, like a bat.\"", id: "\"Robot ini MERASA dengan suara, seperti kelelawar.\"" },
      { en: "\"Sense, decide, act — your eyes and feet do this every second.\"", id: "\"Rasa, pikir, bertindak — mata dan kakimu melakukannya setiap detik.\"" },
      { en: "\"We didn't add code to change its personality. We changed ONE number.\"", id: "\"Kami tidak menambah kode untuk mengubah kepribadiannya. Kami mengubah SATU angka.\"" },
    ],
    ifStuck: {
      en: "No readings at all? Play the wave test: open the Serial Monitor and move your flat palm slowly toward the sensor while counting down from 30 cm out loud. If numbers never move, it's wiring — check TRIG/ECHO swap first.",
      id: "Tidak ada pembacaan sama sekali? Mainkan uji lambaian: buka Serial Monitor dan dekatkan telapak tangan secara perlahan sambil menghitung mundur dari 30 cm. Jika angka tak kunjung bergerak, itu masalah kabel — periksa penukaran TRIG/ECHO lebih dulu.",
    },
  },
};
