// Week 12 — Demo Day (Showcase & Metacognition)
LESSONS[12] = {
  bigIdea: {
    title: { en: "Explaining Is the Final Level of Knowing", id: "Menjelaskan Adalah Level Terakhir dari Paham" },
    body: { en: "Twelve weeks ago, a variable was a strange word. Today you can build machines that sense, decide, and act — and explain HOW.\n\nToday isn't about new code. It's about proving what you know by TEACHING it: show the robot, explain one piece of code, tell one bug story. If you can explain it, you own it.", id: "Dua belas minggu lalu, variabel adalah kata asing. Hari ini kamu bisa membangun mesin yang merasa, memutuskan, dan bertindak — serta menjelaskan CARANYA.\n\nHari ini bukan tentang kode baru. Ini tentang membuktikan apa yang kamu tahu dengan MENGAJARKANNYA: perlihatkan robotnya, jelaskan satu potongan kode, ceritakan satu kisah bug. Jika bisa menjelaskannya, kamu menguasainya." }
  },

  wordWall: [
    { term: "demo", en: "A live showing of what you built — short, prepared, confident.", id: "Peragaan langsung hasil buatanmu — singkat, terlatih, percaya diri." },
    { term: "reflection", en: "Looking back at your own journey to see how far you came.", id: "Menoleh ke belakang untuk melihat seberapa jauh perjalananmu." },
    { term: "portfolio", en: "Your collection of work — photos, code, stories. Proof you can build.", id: "Kumpulan karyamu — foto, kode, cerita. Bukti bahwa kamu bisa membangun." },
    { term: "Q&A", en: "Question and answer — the audience tests your understanding.", id: "Tanya jawab — audiens menguji pemahamanmu." },
  ],

  thinkSkill: {
    name: "Metacognition",
    hook: { en: "Thinking about your own thinking — the skill that upgrades all the other skills.", id: "Berpikir tentang cara berpikirmu sendiri — keterampilan yang meningkatkan semua keterampilan lain." },
    realLife: { en: "Athletes watch replays: what did I do well? what will I try next time? They're not being hard on themselves — they're coaching themselves.", id: "Atlet menonton ulangan pertandingan: apa yang sudah baik? apa yang akan kucoba lain kali? Mereka tidak sedang kejam pada diri sendiri — mereka melatih diri sendiri." },
    codeLink: { en: "Today you replay all twelve weeks: one concept you can explain, one bug you conquered, one thing you'd tell Week-1-you. Teaching an idea proves you understand it better than any test ever could.", id: "Hari ini kamu memutar ulang dua belas minggu: satu konsep yang bisa kamu jelaskan, satu bug yang kamu taklukkan, satu hal yang ingin kamu katakan kepada dirimu yang di minggu 1. Mengajarkan sebuah ide membuktikan pemahamanmu lebih baik daripada tes apa pun." },
    tryIt: { en: "Tell your rubber duck the ONE thing you're proudest of building. Out loud. That's your demo's heart.", id: "Katakan pada bebek karetmu SATU hal yang paling membanggakan untuk dibangun. Keras-keras. Itulah jantung demomu." }
  },

  codeWalkthrough: [
    { line: "println!(\"🏆 Space Academy Graduate 🏆\");", en: "The receipt of your journey. Every line below is a skill you actually used — not memorized.", id: "Struk perjalananmu. Setiap baris di bawahnya adalah keterampilan yang benar-benar kamu pakai — bukan sekadar dihafal." },
    { line: "println!(\"Missions completed: 12/12\");", en: "Twelve missions, twelve thinking skills: decomposition, conditionals, patterns, abstraction, modeling, sequencing, diagnostics, tooling, integration, feedback, algorithms — and today, metacognition.", id: "Dua belas misi, dua belas keterampilan berpikir: dekomposisi, kondisional, pola, abstraksi, pemodelan, urutan, diagnostik, perangkat, integrasi, feedback, algoritma — dan hari ini, metakognisi." },
    { line: "println!(\"  ✅ Variables & Data Types\");", en: "Week 1's labeled pockets grew into structs, vectors, and robots. Look how far the backpack metaphor traveled.", id: "Kantong berlabel dari minggu 1 tumbuh menjadi struct, vector, dan robot. Lihat seberapa jauh metafora ransel itu berjalan." },
    { line: "println!(\"Thank you, Space Academy!\");", en: "Programs end. The thinking doesn't. This is the last println of the course — the next code is yours.", id: "Program berakhir. Pola pikirnya tidak. Ini println terakhir dari kursus ini — kode berikutnya adalah milikmu." },
  ],

  predictions: [
    {
      q: { en: "Your demo is 3 minutes. Which minute will be the hardest?", id: "Demomu 3 menit. Menit mana yang paling sulit?" },
      a: { en: "For most people it's the middle — explaining the CODE. Fix: pick ONE line you truly understand and say what it does in one sentence. Short and true beats long and fuzzy.", id: "Bagi kebanyakan orang itu menit tengah — menjelaskan KODE. Solusinya: pilih SATU baris yang benar-benar kamu pahami dan katakan apa fungsinya dalam satu kalimat. Singkat dan benar mengalahkan panjang dan kabur." },
    },
    {
      q: { en: "What question might the audience ask that you should prepare for?", id: "Pertanyaan seperti apa yang mungkin diajukan audiens dan harusmu siapkan?" },
      a: { en: "The classic: \"why did you choose 15 (or 10) as the threshold?\" Have your answer ready: what you tested, what happened, why you picked the number. Engineers defend parameters with data.", id: "Yang klasik: \"kenapa memilih 15 (atau 10) sebagai ambang batas?\" Siapkan jawabanmu: apa yang diuji, apa yang terjadi, mengapa angka itu dipilih. Insinyur membela parameter dengan data." },
    },
    {
      q: { en: "The robot works today. Should you still mention a bug you fixed?", id: "Robotnya berfungsi hari ini. Perlukah kamu tetap menyebut bug yang pernah diperbaiki?" },
      a: { en: "ESPECIALLY then! Bug stories are the best part of any demo — they prove you can debug, not just type. \"The alarm was stuck on because the sensor stared at the table\" is an engineer's story.", id: "Justru saat itu! Kisah bug adalah bagian terbaik dari demo mana pun — membuktikan kamu bisa debugging, bukan hanya mengetik. \"Alarm menyala terus karena sensor menatap meja\" adalah kisah seorang insinyur." },
    },
  ],

  challenges: [
    {
      text: { en: "Practice your 3-minute presentation: show the robot, explain one code concept, share one bug you fixed.", id: "Latih presentasi 3 menitmu: perlihatkan robotnya, jelaskan satu konsep kode, ceritakan satu bug yang kamu perbaiki." },
      hint: { en: "Rehearse it twice: once to your duck, once to your parent with a timer.", id: "Latih dua kali: sekali untuk bebekmu, sekali untuk orang tuamu dengan timer." },
      success: { en: "Three parts, three minutes, no reading from paper.", id: "Tiga bagian, tiga menit, tanpa membaca dari kertas." },
    },
    {
      text: { en: "Write down the biggest challenge you faced and how you overcame it.", id: "Tulis tantangan terbesar yang kamu hadapi dan bagaimana kamu mengatasinya." },
      hint: { en: "Think of a bug, a loose wire, or a moment of frustration — and the exact step that fixed it.", id: "Ingat sebuah bug, kabel lepas, atau momen frustrasi — dan langkah tepat yang menyelesaikannya." },
      success: { en: "One honest paragraph in your Flight Log.", id: "Satu paragraf jujur di Log Penerbanganmu." },
    },
    {
      text: { en: "Think about what you'd build NEXT if you had more time. Sketch an idea.", id: "Pikirkan apa yang akan kamu bangun BERIKUTNYA jika ada lebih banyak waktu. Buat sketsa idenya." },
      hint: { en: "Start from behavior: what should it DO? Then ask what sensors and states it needs.", id: "Mulai dari perilakunya: apa yang harus DILAKUKAN? Lalu tanyakan sensor dan keadaan apa yang dibutuhkan." },
      success: { en: "A sketch with at least one new sensor or state named.", id: "Sebuah sketsa dengan minimal satu sensor atau keadaan baru yang disebutkan." },
    },
    {
      text: { en: "Take a photo of your robot and code for your portfolio.", id: "Ambil foto robot dan kodemu untuk portofoliomu." },
      hint: { en: "Photo the robot mid-scan AND the screen with your code — future-you will thank present-you.", id: "Foto robot saat memindai DAN layar dengan kodemu — dirimu di masa depan akan berterima kasih." },
      success: { en: "Two photos saved where you can find them next year.", id: "Dua foto tersimpan di tempat yang bisa kamu temukan tahun depan." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "Demo pitfall: talking too fast", id: "Jebakan demo: berbicara terlalu cepat" },
      fix: { en: "Nervous speed hides understanding. Fix: three sentences, then breathe. The pause after \"…and that's why the sensor needs delay\" is where your audience realizes you KNOW things.", id: "Kecepatan karena gugup menyembunyikan pemahaman. Solusinya: tiga kalimat, lalu tarik napas. Jeda setelah \"…dan itu sebabnya sensor butuh delay\" adalah saat audiens menyadari kamu MENGERTI." },
    },
    {
      bug: { en: "Demo pitfall: showing code without saying what it does", id: "Jebakan demo: memperlihatkan kode tanpa menjelaskan fungsinya" },
      fix: { en: "Code on screen means nothing to the audience. Fix: point at ONE line, say what it does, connect it to what they just SAW the robot do.", id: "Kode di layar tidak berarti apa-apa bagi audiens. Solusinya: tunjuk SATU baris, katakan fungsinya, hubungkan dengan yang barusan mereka LIHAT dilakukan robot." },
    },
    {
      bug: { en: "Demo pitfall: the robot misbehaves in front of everyone", id: "Jebakan demo: robotnya bermasalah di depan semua orang" },
      fix: { en: "It happens to professionals live on stage. Fix: rehearse once in the demo room, keep a spare battery/wire, and narrate the failure — \"ah, the classic loose wire!\" — then fix it live. Debugging in public is a FLEX.", id: "Itu terjadi pada profesional di panggung. Solusinya: latihan sekali di ruangan demo, siapkan baterai/kabel cadangan, dan narasikan kegagalannya — \"ah, kabel longgar klasik!\" — lalu perbaiki di tempat. Debugging di depan umum adalah kehebohan tersendiri." },
    },
  ],

  quiz: [
    {
      q: { en: "What are the three things every demo should include?", id: "Apa tiga hal yang harus ada di setiap demo?" },
      options: [
        { en: "Slides, snacks, music", id: "Slide, camilan, musik" },
        { en: "One code concept, one bug story, one lesson learned", id: "Satu konsep kode, satu kisah bug, satu pelajaran yang dipetik" },
        { en: "The whole 12-week curriculum", id: "Seluruh kurikulum 12 minggu" },
        { en: "Only the working robot", id: "Hanya robot yang berfungsi" },
      ],
      answer: 1,
      explain: { en: "Show + explain + reflect. That trio proves understanding better than any test.", id: "Perlihatkan + jelaskan + refleksikan. Trio itu membuktikan pemahaman lebih baik daripada tes apa pun." },
    },
    {
      q: { en: "Metacognition means…", id: "Metakognisi berarti…" },
      options: [
        { en: "Thinking about your own thinking", id: "Berpikir tentang cara berpikirmu sendiri" },
        { en: "Memorizing more syntax", id: "Menghafal lebih banyak sintaks" },
        { en: "Typing faster", id: "Mengetik lebih cepat" },
        { en: "Building bigger robots", id: "Membangun robot lebih besar" },
      ],
      answer: 0,
      explain: { en: "The replay skill: noticing what worked, what didn't, and what you'd do next. It upgrades everything else you learned.", id: "Keterampilan memutar ulang: menyadari apa yang berhasil, yang tidak, dan apa yang akan kamu lakukan berikutnya. Itu meningkatkan semua yang telah kamu pelajari." },
    },
    {
      q: { en: "Week 1's very first concept was…", id: "Konsep pertama di minggu 1 adalah…" },
      options: [
        { en: "Structs", id: "Struct" },
        { en: "Variables — labeled pockets holding values", id: "Variabel — kantong berlabel penyimpan nilai" },
        { en: "Servo motors", id: "Motor servo" },
        { en: "Cargo projects", id: "Proyek Cargo" },
      ],
      answer: 1,
      explain: { en: "let robot_name = \"Sparky\" — and every week since built on that one labeled pocket.", id: "let robot_name = \"Sparky\" — dan setiap minggu setelahnya dibangun di atas satu kantong berlabel itu." },
    },
    {
      q: { en: "What does the Rust compiler do when you make a mistake?", id: "Apa yang dilakukan compiler Rust saat kamu membuat kesalahan?" },
      options: [
        { en: "Deletes your project", id: "Menghapus proyekmu" },
        { en: "Gives up silently", id: "Menyerah diam-diam" },
        { en: "Points at a line and explains what confused it — a clue, not a failure", id: "Menunjuk sebuah baris dan menjelaskan apa yang membingungkannya — petunjuk, bukan kegagalan" },
        { en: "Guesses what you meant and runs anyway", id: "Menebak maksudmu dan tetap menjalankan" },
      ],
      answer: 2,
      explain: { en: "The detective partner from Week 7. You'll keep meeting it — and it will keep making you better.", id: "Mitra detektif dari minggu 7. Kamu akan terus bertemu dengannya — dan ia akan terus membuatmu lebih baik." },
    },
  ],

  reflect: [
    { prompt: { en: "What seemed impossible in Week 1 that feels normal now?", id: "Apa yang terasa mustahil di minggu 1 tetapi terasa biasa sekarang?" } },
    { prompt: { en: "What will you build next? Describe it like a mission briefing.", id: "Apa yang akan kamu bangun berikutnya? Jelaskan seperti misi baru." } },
  ],

  parentCorner: {
    prep: [
      { en: "Set up the demo station: robot, laptop with the code visible, and seats for the audience.", id: "Siapkan meja demo: robot, laptop dengan kode terlihat, dan kursi untuk audiens." },
      { en: "Print or write the graduation certificate — ceremony matters.", id: "Cetak atau tulis sertifikat kelulusan — upacaranya penting." },
      { en: "Invite the audience (family, friends) and tell them to ask questions.", id: "Undang audiens (keluarga, teman) dan minta mereka bertanya." },
    ],
    say: [
      { en: "\"Show us what it does — then tell us HOW it does it.\"", id: "\"Perlihatkan apa yang dilakukannya — lalu ceritakan BAGAIMANA caranya.\"" },
      { en: "\"What was the hardest bug? Tell us the story.\"", id: "\"Apa bug tersulitnya? Ceritakan kisahnya.\"" },
      { en: "\"You didn't just learn Rust — you learned to think like an engineer. That was always the mission.\"", id: "\"Kamu tidak hanya belajar Rust — kamu belajar berpikir seperti insinyur. Itu memang misinya sejak awal.\"" },
    ],
    ifStuck: {
      en: "If nerves freeze the demo, switch to interviewer mode: ask easy questions (\"what does this wire do?\") and let them answer one at a time. Confidence returns with the first answered question — then hand the stage back.",
      id: "Jika gugup membekukan demo, beralihlah ke mode pewawancara: ajukan pertanyaan mudah (\"kabel ini untuk apa?\") dan biarkan mereka menjawab satu per satu. Kepercayaan diri kembali dengan pertanyaan pertama yang terjawab — lalu kembalikan panggungnya.",
    },
  },
};
