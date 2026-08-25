// Week 7 — The Glitch Protocol (Debugging)
LESSONS[7] = {
  bigIdea: {
    title: { en: "Errors Are Clues, Not Failures", id: "Error Adalah Petunjuk, Bukan Kegagalan" },
    body: { en: "The compiler isn't mad at you. It's the best detective partner in the world: it points at a LINE NUMBER and describes what confused it. Your job is to read the clue, fix ONE thing, and run again.\n\nEvery bug you fix makes you a better thinker. Professional programmers read errors all day long — the skill isn't avoiding errors, it's reading them fast.", id: "Compiler tidak sedang marah padamu. Ia adalah mitra detektif terbaik di dunia: menunjuk NOMOR BARIS dan menjelaskan apa yang membuatnya bingung. Tugasmu membaca petunjuknya, memperbaiki SATU hal, dan menjalankan lagi.\n\nSetiap bug yang kamu perbaiki menjadikanmu pemikir yang lebih baik. Programmer profesional membaca error sepanjang hari — keahliannya bukan menghindari error, melainkan membacanya dengan cepat." }
  },

  wordWall: [
    { term: "compiler", en: "The program that reads your code and builds the real program.", id: "Program yang membaca kodemu dan membangun program yang sesungguhnya." },
    { term: "error", en: "A problem that STOPS the program from being built.", id: "Masalah yang MENGHENTIKAN program dibangun." },
    { term: "warning", en: "A suspicion. The program still runs — but the compiler wants you to know.", id: "Sebuah kecurigaan. Program tetap berjalan — tetapi compiler ingin kamu tahu." },
    { term: "type mismatch", en: "You promised one kind of value and delivered another.", id: "Kamu menjanjikan satu jenis nilai tetapi menyerahkan yang lain." },
    { term: "statement", en: "One complete instruction. In Rust it ends with a semicolon.", id: "Satu perintah lengkap. Di Rust diakhiri titik koma." },
  ],

  thinkSkill: {
    name: "Diagnostic Reasoning",
    hook: { en: "Doctors don't panic at a cough. They ask questions, one at a time.", id: "Dokter tidak panik mendengar batuk. Mereka bertanya, satu per satu." },
    realLife: { en: "A bike won't ride. Is the chain off? Is the tire flat? Are the brakes stuck? You test ONE guess at a time — never all at once. Kicking the bike is not debugging. Checking things in order IS.", id: "Sepeda tidak bisa dikendarai. Rantainya lepas? Ban bocor? Rem macet? Kamu menguji SATU dugaan pada satu waktu — tidak pernah semuanya sekaligus. Menendang sepeda bukanlah debugging. Memeriksa secara berurutan barulah debugging." },
    codeLink: { en: "Rust's compiler is your checklist partner: it names the line and the problem. The ritual: read the FIRST error, go to that line, fix one thing, run again. Fixing the first error often reveals (or fixes) the next — errors travel in packs.", id: "Compiler Rust adalah mitra checklist-mu: ia menyebutkan baris dan masalahnya. Ritualnya: baca error PERTAMA, pergi ke baris itu, perbaiki satu hal, jalankan lagi. Memperbaiki error pertama sering kali memunculkan (atau sekaligus memperbaiki) error berikutnya — error berjalan berkelompok." },
    tryIt: { en: "The next time you see an error, read its first line OUT LOUD before touching any code.", id: "Lain kali kamu melihat error, bacalah baris pertamanya KERAS-KERAS sebelum menyentuh kode apa pun." }
  },

  codeWalkthrough: [
    { line: "let greeting = \"Hello, Cadet!\"", en: "GLITCH #1. Looks innocent — but where's the semicolon? A statement without its ; is a sentence without a period, and the compiler trips on the NEXT line.", id: "GLITCH #1. Terlihat tidak berbahaya — tapi mana titik komanya? Pernyataan tanpa ; adalah kalimat tanpa titik, dan compiler tersandung di BARIS BERIKUTNYA." },
    { line: "let age: u32 = \"five\";", en: "GLITCH #2. The label promises a u32 (a whole number) — but we stuffed TEXT inside. The pocket and its contents must match.", id: "GLITCH #2. Labelnya menjanjikan u32 (bilangan bulat) — tetapi kita menyumpal TEKS ke dalamnya. Kantong dan isinya harus cocok." },
    { line: "let mission_code = 42;", en: "GLITCH #3. A pocket that nobody ever reads. This one only earns a WARNING — the program runs, but the compiler is raising an eyebrow at you.", id: "GLITCH #3. Kantong yang tak pernah dibaca siapa pun. Ini hanya mendapat WARNING — program tetap berjalan, tetapi compiler mengangkat alis padamu." },
    { line: "println!(\"Ready for launch!\");", en: "The program runs fine — mission_code just sits there unused. Warnings don't stop the launch; errors do.", id: "Programnya berjalan baik — mission_code hanya tergeletak tak terpakai. Warning tidak membatalkan peluncuran; error iya." },
  ],

  predictions: [
    {
      q: { en: "Before running Glitch #1: how many errors will the compiler report?", id: "Sebelum menjalankan Glitch #1: berapa error yang akan dilaporkan compiler?" },
      a: { en: "Usually just one — 'expected ;, found println!'. But write a longer program with one missing semicolon and you may see a whole pack of errors. Fix the first; the pack often follows.", id: "Biasanya hanya satu — 'expected ;, found println!'. Tetapi pada program yang lebih panjang, satu titik koma hilang bisa memunculkan sekawanan error. Perbaiki yang pertama; kawannya biasanya ikut tumbang." },
    },
    {
      q: { en: "For Glitch #2, which LINE will the error point at?", id: "Untuk Glitch #2, error akan menunjuk BARIS mana?" },
      a: { en: "The let line itself — 'mismatched types: expected u32, found &str'. The crime happens where the promise is broken, not where the value is printed.", id: "Baris let-nya sendiri — 'mismatched types: expected u32, found &str'. Kejahatan terjadi di tempat janji dilanggar, bukan di tempat nilai dicetak." },
    },
    {
      q: { en: "Does Glitch #3 stop the program from running?", id: "Apakah Glitch #3 menghentikan program?" },
      a: { en: "No! It's a warning, not an error. The program runs and prints — Rust just politely mentions that mission_code is never used. Warnings are advice; errors are walls.", id: "Tidak! Itu warning, bukan error. Program berjalan dan mencetak — Rust hanya dengan sopan menyebut bahwa mission_code tak pernah dipakai. Warning adalah nasihat; error adalah tembok." },
    },
  ],

  challenges: [
    {
      text: { en: "Copy each program and try to run it. Read the error carefully.", id: "Salin setiap program dan coba jalankan. Baca errornya dengan teliti." },
      hint: { en: "Copy ONE glitch at a time — three separate files or three separate runs.", id: "Salin SATU glitch pada satu waktu — tiga file terpisah atau tiga kali jalan terpisah." },
      success: { en: "You saw all three error/warning messages with your own eyes.", id: "Kamu melihat ketiga pesan error/warning dengan matamu sendiri." },
    },
    {
      text: { en: "For Glitch #1: find the missing semicolon. What line does the error point to?", id: "Untuk Glitch #1: temukan titik koma yang hilang. Ke baris mana error menunjuk?" },
      hint: { en: "The error usually points at the line AFTER the crime scene.", id: "Error biasanya menunjuk ke baris SETELAH lokasi kejahatan." },
      success: { en: "Fixed with one ; and you can say why the error pointed at the next line.", id: "Berhasil diperbaiki dengan satu ; dan kamu bisa menjelaskan mengapa error menunjuk ke baris berikutnya." },
    },
    {
      text: { en: "For Glitch #2: the type doesn't match. Fix the value to match u32.", id: "Untuk Glitch #2: tipenya tidak cocok. Perbaiki nilainya agar cocok dengan u32." },
      hint: { en: "u32 means a whole NUMBER. What would \"five\" be if it were a number?", id: "u32 berarti BILANGAN bulat. Apa \"five\" jika ditulis sebagai angka?" },
      success: { en: "let age: u32 = 5; compiles and prints.", id: "let age: u32 = 5; berhasil dikompilasi dan tercetak." },
    },
    {
      text: { en: "For Glitch #3: the variable isn't used in the output. Add println! to use it.", id: "Untuk Glitch #3: variabelnya tidak dipakai dalam keluaran. Tambahkan println! untuk memakainya." },
      hint: { en: "Give the pocket a reader: println!(\"Mission code: {}\", mission_code);", id: "Berikan kantong itu pembaca: println!(\"Mission code: {}\", mission_code);" },
      success: { en: "The warning disappears and 42 prints.", id: "Warningnya hilang dan 42 tercetak." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "error[E0308]: mismatched types", id: "error[E0308]: mismatched types" },
      fix: { en: "You promised one type and delivered another. Go to the line number, find the let, make the value match the label's promise.", id: "Kamu menjanjikan satu tipe tetapi menyerahkan yang lain. Pergi ke nomor barisnya, temukan let-nya, samakan nilai dengan janji labelnya." },
    },
    {
      bug: { en: "expected `;`, found `println!`", id: "expected `;`, found `println!`" },
      fix: { en: "A semicolon is missing on the line BEFORE this one. The compiler trips where it finds two statements glued together.", id: "Titik koma hilang di baris SEBELUM baris ini. Compiler tersandung saat menemukan dua pernyataan yang menempel." },
    },
    {
      bug: { en: "warning: unused variable: `mission_code`", id: "warning: unused variable: `mission_code`" },
      fix: { en: "You built a pocket nobody reads. Either print it — or if it's truly not needed, rename it _mission_code to say \"I know, on purpose\".", id: "Kamu membuat kantong yang tak dibaca siapa pun. Cetak saja — atau jika memang tak dibutuhkan, ganti nama menjadi _mission_code untuk berkata \"aku tahu, memang sengaja\"." },
    },
  ],

  quiz: [
    {
      q: { en: "You see five errors at once. Which do you read first?", id: "Kamu melihat lima error sekaligus. Yang mana yang dibaca lebih dulu?" },
      options: [
        { en: "The longest one", id: "Yang paling panjang" },
        { en: "The FIRST one", id: "Yang PERTAMA" },
        { en: "The last one", id: "Yang terakhir" },
        { en: "None — close the laptop", id: "Tidak ada — tutup laptopnya" },
      ],
      answer: 1,
      explain: { en: "Errors travel in packs. Fix the first and the pack often collapses — the later ones were usually echoes.", id: "Error berjalan berkelompok. Perbaiki yang pertama dan kawannya sering runtuh — yang belakangan biasanya cuma gema." },
    },
    {
      q: { en: "A missing semicolon error usually points at…", id: "Error titik koma yang hilang biasanya menunjuk ke…" },
      options: [
        { en: "The exact spot where ; should go", id: "Titik tepat tempat ; seharusnya" },
        { en: "The line AFTER the missing semicolon", id: "Baris SETELAH titik koma yang hilang" },
        { en: "fn main()", id: "fn main()" },
        { en: "A random line", id: "Baris acak" },
      ],
      answer: 1,
      explain: { en: "The compiler trips when it meets the NEXT thing glued to the unfinished statement. Off-by-one-line is normal — check the line above too.", id: "Compiler tersandung saat bertemu BAGIAN BERIKUTNYA yang menempel pada pernyataan yang belum selesai. Meleset satu baris itu wajar — periksa juga baris di atasnya." },
    },
    {
      q: { en: "let age: u32 = \"five\"; is which kind of bug?", id: "let age: u32 = \"five\"; adalah bug jenis apa?" },
      options: [
        { en: "Missing semicolon", id: "Titik koma hilang" },
        { en: "Type mismatch", id: "Tipe tidak cocok" },
        { en: "Unused variable", id: "Variabel tak terpakai" },
        { en: "No bug — it runs fine", id: "Bukan bug — berjalan baik" },
      ],
      answer: 1,
      explain: { en: "The label promised a number; text moved in. In Rust, pockets and contents must match — always.", id: "Labelnya menjanjikan angka; teks yang pindah masuk. Di Rust, kantong dan isinya harus cocok — selalu." },
    },
    {
      q: { en: "What's the difference between a warning and an error?", id: "Apa bedanya warning dan error?" },
      options: [
        { en: "Warnings are for adults only", id: "Warning hanya untuk orang dewasa" },
        { en: "Warnings let the program run; errors stop it", id: "Warning membiarkan program berjalan; error menghentikannya" },
        { en: "There is no difference", id: "Tidak ada bedanya" },
        { en: "Errors are just suggestions", id: "Error hanya saran" },
      ],
      answer: 1,
      explain: { en: "Error = wall, the program won't build. Warning = raised eyebrow, it runs but the compiler has advice.", id: "Error = tembok, program tak bisa dibangun. Warning = angkat alis, program berjalan tetapi compiler punya nasihat." },
    },
    {
      q: { en: "What does 'mismatched types' mean?", id: "Apa arti 'mismatched types'?" },
      options: [
        { en: "Wrong number of semicolons", id: "Jumlah titik koma salah" },
        { en: "You promised one type, delivered another", id: "Menjanjikan satu tipe, mengirim yang lain" },
        { en: "Missing function", id: "Fungsi hilang" },
        { en: "Typo in variable name", id: "Salah ketik nama variabel" },
      ],
      answer: 1,
      explain: { en: "The compiler expected (say) u32 but found &str. Pocket label and contents must agree.", id: "Compiler harap (misal) u32 tapi dapat &str. Label kantong dan isinya harus sepakat." },
    },
    {
      q: { en: "If you see 5 errors, which do you fix first?", id: "Jika lihat 5 error, yang mana diperbaiki dulu?" },
      options: [
        { en: "The longest one", id: "Yang paling panjang" },
        { en: "The first one", id: "Yang pertama" },
        { en: "The last one", id: "Yang terakhir" },
        { en: "Pick randomly", id: "Pilih acak" },
      ],
      answer: 1,
      explain: { en: "Errors cascade. Fix the first and later ones often disappear — they were just echoes.", id: "Error berkelompok. Perbaiki yang pertama, yang belakangan sering hilang — cuma gema saja." },
    },
    {
      q: { en: "What does 'unused variable' warning suggest?", id: "Apa saran warning 'unused variable'?" },
      options: [
        { en: "Delete the variable", id: "Hapus variabelnya" },
        { en: "Prefix with _ to acknowledge intentionally unused", id: "Tambah awalan _ untuk akui sengaja tak dipakai" },
        { en: "Add a semicolon", id: "Tambah titik koma" },
        { en: "Change the type", id: "Ubah tipenya" },
      ],
      answer: 1,
      explain: { en: "Rust suggests: if truly unused, rename to _name — tells compiler \"I know, on purpose\".", id: "Rust sarankan: jika memang tak dipakai, ganti jadi _name — bilang ke compiler \"aku tahu, sengaja\"." },
    },
    {
      q: { en: "True or false: The compiler runs your code to find bugs.", id: "Benar/salah: Compiler menjalankan kodemu untuk cari bug." },
      options: [
        { en: "True", id: "Benar" },
        { en: "False", id: "Salah" },
      ],
      answer: 1,
      explain: { en: "Compiler ONLY reads your code (static analysis). It never runs it. Running = runtime, different phase!", id: "Compiler HANYA baca kode (analisis statis). Ia TIDAK PERNAH menjalankan. Menjalankan = runtime, fase beda!" },
    },
    {
      q: { en: "Which thinking skill is Week 7's focus?", id: "Keterampilan berpikir minggu 7 adalah?" },
      options: [
        { en: "Sequencing", id: "Sequencing" },
        { en: "Diagnostic Reasoning", id: "Penalaran Diagnostik" },
        { en: "Tool Selection", id: "Pemilihan Alat" },
        { en: "System Integration", id: "Integrasi Sistem" },
      ],
      answer: 1,
      explain: { en: "Week 7: read clues, test one hypothesis at a time. That's diagnostic reasoning — like a doctor!", id: "Minggu 7: baca petunjuk, uji satu dugaan. Itulah penalaran diagnostik — seperti dokter!" },
    },
    {
      q: { en: "What does 'expected struct, found ()' mean?", id: "Apa arti 'expected struct, found ()'?" },
      options: [
        { en: "Missing semicolon", id: "Titik koma hilang" },
        { en: "Function returned nothing (unit type)", id: "Fungsi kembalikan kosong (tipe unit)" },
        { en: "Wrong variable name", id: "Nama variabel salah" },
        { en: "Type mismatch", id: "Tipe tidak cocok" },
      ],
      answer: 1,
      explain: { en: "() is the unit type — 'nothing'. You probably forgot a return value or the last line has a semicolon.", id: "() adalah tipe unit — 'kosong'. Mungkin lupa nilai kembalian atau baris terakhir punya titik koma." },
    },
  ],

  reflect: [
    { prompt: { en: "Which glitch was the hardest to spot? What was the clue that cracked it?", id: "Glitch mana yang paling sulit ditemukan? Petunjuk apa yang membongkarnya?" } },
    { prompt: { en: "Finish this sentence: \"The compiler is like a helpful teammate because…\"", id: "Lengkapi kalimat ini: \"Compiler itu seperti rekan tim yang membantu karena…\"" } },
  ],

  parentCorner: {
    prep: [
      { en: "Have the three broken programs ready in separate files or tabs — kids should fix one at a time.", id: "Siapkan tiga program rusak di file atau tab terpisah — anak-anak memperbaikinya satu per satu." },
      { en: "Optional: print the debugging checklist from this lesson as a poster.", id: "Opsional: cetak checklist debugging dari pelajaran ini sebagai poster." },
    ],
    say: [
      { en: "\"The compiler is your robot sidekick. It wants you to win.\"", id: "\"Compiler adalah sidekick robotmu. Ia ingin kamu menang.\"" },
      { en: "\"Read me the first line of the error. Out loud. Now — which line number?\"", id: "\"Bacakan aku baris pertama errornya. Keras-keras. Sekarang — nomor baris berapa?\"" },
      { en: "\"You fixed it! Every bug you fix makes you a better thinker.\"", id: "\"Berhasil kamu perbaiki! Setiap bug yang kamu perbaiki menjadikanmu pemikir yang lebih baik.\"" },
    ],
    ifStuck: {
      en: "Do the error-reading ritual together, slowly: (1) read the first error aloud, (2) find the line number, (3) say what the compiler EXPECTED and what it FOUND. Nine times out of ten the fix appears before you finish the sentence.",
      id: "Lakukan ritual membaca error bersama, perlahan: (1) baca error pertama dengan suara, (2) temukan nomor barisnya, (3) katakan apa yang DIHARAPKAN compiler dan apa yang DITEMUKANNYA. Sembilan dari sepuluh kali, perbaikannya muncul sebelum kalimatmu selesai.",
    },
  },
};
