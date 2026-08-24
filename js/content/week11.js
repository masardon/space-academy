// Week 11 — Movement & Control (Servo & State)
LESSONS[11] = {
  bigIdea: {
    en: {
      title: "Robots Are State Machines",
      body: "Add a servo and Sparky gets a NECK: it points its sensor left and right, sweeping the room like a lighthouse. At every stop it runs the week-10 loop: sense → decide → act.\n\nWhat the robot is DOING right now is its STATE: SCANNING or ALARM. Naming states is how engineers reason about behavior — and it's exactly the enum you'll write in Rust one day.",
    },
    id: {
      title: "Robot Adalah Mesin Keadaan",
      body: "Tambahkan servo dan Sparky mendapat LEHER: ia mengarahkan sensornya ke kiri dan kanan, menyapu ruangan seperti mercusuar. Di setiap pemberhentian ia menjalankan loop minggu 10: rasa → pikir → bertindak.\n\nApa yang SEDANG dilakukan robot adalah KEADAANNYA: SCANNING atau ALARM. Menamai keadaan adalah cara insinyur menalar perilaku — dan itu persis enum yang suatu hari akan kamu tulis di Rust.",
    },
  },

  wordWall: [
    { term: "servo", en: "A motor that turns to an exact angle between 0° and 180°.", id: "Motor yang berputar ke sudut tepat antara 0° dan 180°." },
    { term: "attach(9)", en: "Tells the servo object which pin carries its orders (pin 9, the orange wire).", id: "Memberi tahu objek servo pin mana yang membawa perintahnya (pin 9, kabel oranye)." },
    { term: "state", en: "What the robot is currently doing: SCANNING or ALARM.", id: "Apa yang sedang dilakukan robot: SCANNING atau ALARM." },
    { term: "state machine", en: "A machine described by its states and the moves between them.", id: "Mesin yang dijelaskan lewat keadaan-keadaannya dan perpindahan antar-keadaan." },
    { term: "angle += 5", en: "Grow angle by 5 each round: 0, 5, 10 … 180.", id: "Menambah angle sebesar 5 setiap putaran: 0, 5, 10 … 180." },
    { term: "threshold", en: "The alarm line — 15 cm this week (was 10 last week).", id: "Garis alarm — 15 cm minggu ini (minggu lalu 10)." },
  ],

  thinkSkill: {
    name: "Algorithm Design",
    en: {
      hook: "A recipe is an algorithm you can eat.",
      realLife: "Brushing teeth: wet the brush → add paste → two minutes of circles → rinse. Precise steps, in an order that works EVERY time. That's an algorithm — and writing your own is algorithm design.",
      codeLink: "The scanning algorithm: point at angle → wait 30ms → measure → react → next angle … there and back, forever. The two for loops are the algorithm's skeleton; measureAndReact() is the heart it pumps at every stop.",
      tryIt: "Write the 5-step algorithm for making a sandwich. Then have your parent FOLLOW it literally — bugs in the algorithm become hilarious.",
    },
    id: {
      hook: "Resep adalah algoritma yang bisa kamu makan.",
      realLife: "Menyikat gigi: basahi sikat → beri pasta → dua menit berputar → bilas. Langkah yang presisi, dalam urutan yang selalu berhasil. Itulah algoritma — dan menulis algoritma sendiri adalah desain algoritma.",
      codeLink: "Algoritma pemindaian: arahkan ke sudut → tunggu 30 md → ukur → bereaksi → sudut berikutnya … bolak-balik, selamanya. Dua for loop adalah kerangka algoritmanya; measureAndReact() adalah jantung yang berdenyut di setiap pemberhentian.",
      tryIt: "Tulis algoritma 5 langkah membuat sandwich. Lalu minta orang tuamu MENGIKUTINYA secara harfiah — bug dalam algoritma jadi sangat lucu.",
    },
  },

  codeWalkthrough: [
    { line: "#include <Servo.h>", en: "Borrowing a library: servo code someone else already wrote. Week 8's dependencies, meeting real hardware.", id: "Meminjam pustaka: kode servo yang sudah ditulis orang lain. Dependensi dari minggu 8, bertemu perangkat keras nyata." },
    { line: "Servo scanner;", en: "A servo object with a NAME — like let scanner in Rust. We'll talk TO it.", id: "Objek servo dengan NAMA — seperti let scanner di Rust. Kita akan BERBICARA dengannya." },
    { line: "scanner.attach(9);", en: "In setup (runs once): the servo's orange wire listens on pin 9.", id: "Di setup (berjalan sekali): kabel oranye servo mendengarkan di pin 9." },
    { line: "for (int angle = 0; angle <= 180; angle += 5)", en: "The sweep: start at 0°, add 5 each round, stop at 180°. That's 37 stops per pass.", id: "Sapuan: mulai dari 0°, tambah 5 setiap putaran, berhenti di 180°. Ada 37 pemberhentian per putaran." },
    { line: "scanner.write(angle); delay(30);", en: "Point, then WAIT 30ms for the motor to arrive. Measuring while moving would measure the wrong direction.", id: "Arahkan, lalu TUNGGU 30 md agar motor sampai. Mengukur sambil bergerak berarti mengukur arah yang salah." },
    { line: "measureAndReact();", en: "A named machine (week 4!) doing sense → decide → act at every stop of the sweep.", id: "Mesin bernama (minggu 4!) yang melakukan rasa → pikir → bertindak di setiap pemberhentian sapuan." },
    { line: "if (distance < 15)", en: "The alarm line: 15 cm this week, 10 last week. Same code, different parameter — you already know how to tune it.", id: "Garis alarm: 15 cm minggu ini, 10 minggu lalu. Kode sama, parameter berbeda — kamu sudah tahu cara menyetelnya." },
  ],

  predictions: [
    {
      q: { en: "Change delay(30) to delay(0). What happens to the readings?", id: "Ubah delay(30) menjadi delay(0). Apa yang terjadi pada pembacaan?" },
      a: { en: "The servo can't keep up — it's still swinging when the sensor fires, so distances belong to angles that already flew past. Patience is part of the algorithm.", id: "Servonya tak sanggup mengikuti — ia masih berayun saat sensor menembak, sehingga jaraknya milik sudut yang sudah terlewat. Kesabaran adalah bagian dari algoritma." },
    },
    {
      q: { en: "Change the threshold from 15 to 100. What does the robot do?", id: "Ubah ambang batas dari 15 menjadi 100. Apa yang dilakukan robot?" },
      a: { en: "Almost everything in a room is closer than 100 cm — the alarm is basically ALWAYS on. Thresholds must match the room the robot lives in.", id: "Hampir semua benda di ruangan lebih dekat dari 100 cm — alarm praktis SELALU menyala. Ambang batas harus cocok dengan ruangan tempat robot tinggal." },
    },
    {
      q: { en: "Delete the second for loop (right-to-left). What does the robot do?", id: "Hapus for loop kedua (kanan-ke-kiri). Apa yang dilakukan robot?" },
      a: { en: "It sweeps left-to-right… then snaps instantly back to 0 and sweeps again. The smooth ping-pong becomes a saw. Both loops together make the motion feel alive.", id: "Ia menyapu kiri-ke-kanan… lalu melompat balik seketika ke 0 dan menyapu lagi. Ping-pong yang mulus berubah jadi gerigi gergaji. Kedua loop itulah yang membuat gerakannya terasa hidup." },
    },
  ],

  challenges: [
    {
      text: { en: "Watch the robot scan. At what angle does it detect the obstacle? Can you tell?", id: "Amati robot memindai. Pada sudut berapa ia mendeteksi halangan? Bisakah kamu memastikannya?" },
      hint: { en: "Put the Serial Monitor next to you and match the printed distance to the servo's position.", id: "Letakkan Serial Monitor di dekatmu dan cocokkan jarak tercetak dengan posisi servo." },
      success: { en: "You caught the detection angle — sensor + servo + serial working as one system.", id: "Kamu menangkap sudut deteksinya — sensor + servo + serial bekerja sebagai satu sistem." },
    },
    {
      text: { en: "Draw the state machine on paper: [SCANNING] → obstacle → [ALARM] → clear → [SCANNING]", id: "Gambar mesin keadaannya di kertas: [SCANNING] → halangan → [ALARM] → aman → [SCANNING]" },
      hint: { en: "Two boxes, two arrows. What event moves you from box to box?", id: "Dua kotak, dua panah. Peristiwa apa yang memindahkanmu antar kotak?" },
      success: { en: "Your diagram matches the code's behavior — you can trace it with a finger.", id: "Diagrammu cocok dengan perilaku kode — kamu bisa menelusurinya dengan jari." },
    },
    {
      text: { en: "How would you translate this to Rust? Think: enum RobotState { Scanning, Alarm } and a while loop.", id: "Bagaimana kamu menerjemahkannya ke Rust? Pikirkan: enum RobotState { Scanning, Alarm } dan sebuah while loop." },
      hint: { en: "Don't write it all — sketch it. What changes the state? What does each state DO?", id: "Tidak perlu menulis semuanya — buat sketsanya. Apa yang mengubah keadaan? Apa yang DILAKUKAN setiap keadaan?" },
      success: { en: "You connected the Arduino states to Rust enums — same idea, new clothes.", id: "Kamu menghubungkan keadaan Arduino dengan enum Rust — ide sama, pakaian baru." },
    },
    {
      text: { en: "What would you ADD to make this a real robot? (Extra sensors? Motors for wheels? A battery?)", id: "Apa yang akan kamu TAMBAHKAN agar ini menjadi robot sungguhan? (Sensor ekstra? Motor roda? Baterai?)" },
      hint: { en: "There's no wrong answer — engineers start from \"what should it DO?\" and work backwards.", id: "Tidak ada jawaban salah — insinyur mulai dari \"apa yang harus DILAKUKAN?\" lalu mundur selangkah demi selangkah." },
      success: { en: "You named additions AND what new states they would need.", id: "Kamu menyebutkan tambahan-tambahannya SEKALIGUS keadaan baru yang dibutuhkannya." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "The servo doesn't move at all", id: "Servo tidak bergerak sama sekali" },
      fix: { en: "Check the orange (signal) wire is on pin 9 AND the code says scanner.attach(9). Brown→GND, Red→5V, Orange→9.", id: "Periksa kabel oranye (sinyal) di pin 9 DAN kode menulis scanner.attach(9). Coklat→GND, Merah→5V, Oranye→9." },
    },
    {
      bug: { en: "The servo twitches and jitters", id: "Servo berkedut dan gemetar" },
      fix: { en: "Power hunger! Servos need steady 5V. Upload with the servo's load light, keep wires firm, and don't power it through flimsy jumpers.", id: "Rakus daya! Servo butuh 5V yang stabil. Unggah saat beban servo ringan, pastikan kabel kukuh, dan jangan beri daya lewat kabel jumper yang lemah." },
    },
    {
      bug: { en: "The alarm is stuck ON forever", id: "Alarm menyala terus-menerus" },
      fix: { en: "Something is permanently closer than 15 cm — often the sensor is staring at the TABLE. Lift the sensor or re-aim it; check the Serial Monitor to see what it sees.", id: "Ada yang selalu lebih dekat dari 15 cm — sering kali sensor menatap MEJA. Angkat atau arahkan ulang sensornya; periksa Serial Monitor untuk melihat apa yang dilihatnya." },
    },
  ],

  quiz: [
    {
      q: { en: "What angles can an SG90 servo turn to?", id: "Ke sudut berapa saja servo SG90 bisa berputar?" },
      options: [
        { en: "Any angle, spinning forever", id: "Sudut apa pun, berputar selamanya" },
        { en: "Between 0° and 180°", id: "Antara 0° dan 180°" },
        { en: "Only 90°", id: "Hanya 90°" },
        { en: "Between 0° and 360°", id: "Antara 0° dan 360°" },
      ],
      answer: 1,
      explain: { en: "Half a circle, exactly positioned. That's why servos are perfect for pointing things: heads, arms, sensors.", id: "Setengah lingkaran, posisinya presisi. Itulah mengapa servo sempurna untuk mengarahkan: kepala, lengan, sensor." },
    },
    {
      q: { en: "Why delay(30) after scanner.write(angle)?", id: "Mengapa ada delay(30) setelah scanner.write(angle)?" },
      options: [
        { en: "To save electricity", id: "Untuk menghemat listrik" },
        { en: "To give the motor time to ARRIVE before measuring", id: "Memberi waktu motor SAMPAI sebelum mengukur" },
        { en: "It's decoration", id: "Itu hanya hiasan" },
        { en: "To let the servo cool down", id: "Agar servo tidak panas" },
      ],
      answer: 1,
      explain: { en: "Measuring while swinging measures the wrong direction. Waiting is part of correct algorithm design.", id: "Mengukur sambil berayun berarti mengukur arah yang salah. Menunggu adalah bagian dari desain algoritma yang benar." },
    },
    {
      q: { en: "A state machine is…", id: "Mesin keadaan adalah…" },
      options: [
        { en: "A robot made of gears", id: "Robot dari gir" },
        { en: "A machine described by named states and the moves between them", id: "Mesin yang dijelaskan lewat keadaan bernama dan perpindahan antarnya" },
        { en: "The Arduino brand name", id: "Nama merek Arduino" },
        { en: "A very heavy computer", id: "Komputer yang sangat berat" },
      ],
      answer: 1,
      explain: { en: "SCANNING and ALARM are states; obstacles and clear paths are the moves. Diagram first, code second.", id: "SCANNING dan ALARM adalah keadaan; halangan dan jalan aman adalah perpindahannya. Diagram dulu, kode kemudian." },
    },
    {
      q: { en: "In Rust, how would you represent SCANNING and ALARM?", id: "Di Rust, bagaimana kamu mewakili SCANNING dan ALARM?" },
      options: [
        { en: "enum RobotState { Scanning, Alarm }", id: "enum RobotState { Scanning, Alarm }" },
        { en: "let state = \"probably fine\";", id: "let state = \"probably fine\";" },
        { en: "println!(\"state\");", id: "println!(\"state\");" },
        { en: "You can't — Rust can't do states", id: "Tidak bisa — Rust tak bisa membuat keadaan" },
      ],
      answer: 0,
      explain: { en: "An enum names every possible state, and the compiler makes you handle them all. Robots and Rust get along great.", id: "Enum menamai setiap keadaan yang mungkin, dan compiler memastikan kamu menangani semuanya. Robot dan Rust cocok sekali." },
    },
  ],

  reflect: [
    { prompt: { en: "Describe your robot's states in your own words. What is it 'feeling' in each?", id: "Jelaskan keadaan robotmu dengan kata-katamu sendiri. Apa yang dirasakannya di masing-masing keadaan?" } },
    { prompt: { en: "If you added ONE ability for Demo Day, what would it be — and what new state would it need?", id: "Jika kamu menambah SATU kemampuan untuk Demo Day, apa itu — dan keadaan baru apa yang dibutuhkannya?" } },
  ],

  parentCorner: {
    prep: [
      { en: "Add the servo (Red→5V, Brown→GND, Orange→9) and mount the sensor ON the servo horn if you can — the head-turn effect is worth it.", id: "Pasang servo (Merah→5V, Coklat→GND, Oranye→9) dan jika bisa pasangkan sensor pada sayap servo — efek kepala berputar sepadan dengan usahanya." },
      { en: "Have an obstacle ready (a book or box) that's easy to move around during the demo.", id: "Siapkan satu halangan (buku atau kotak) yang mudah dipindah-pindah saat demo." },
    ],
    say: [
      { en: "\"The robot has a neck now. It's LOOKING for trouble.\"", id: "\"Robotnya punya leher sekarang. Ia sedang MENCARI masalah.\"" },
      { en: "\"Two states: scanning and alarm. Which one is it in right now?\"", id: "\"Dua keadaan: scanning dan alarm. Sekarang ia berada di keadaan yang mana?\"" },
      { en: "\"You designed algorithms on paper — this machine is running yours.\"", id: "\"Kamu merancang algoritma di kertas — mesin ini menjalankan algoritma buatanmu.\"" },
    ],
    ifStuck: {
      en: "Be the obstacle yourself: move your hand slowly through the beam and freeze when the alarm fires. Then ask: \"which angle was I at?\" — connecting the physical moment to the sweep loop.",
      id: "Jadilah halangannya sendiri: gerakkan tanganmu perlahan melintasi sinar dan berhenti saat alarm menyala. Lalu tanyakan: \"tadi aku ada di sudut berapa?\" — menghubungkan momen fisik dengan loop sapuan.",
    },
  },
};
