// Week 4 — The Mission Control Panel (Functions)
LESSONS[4] = {
  bigIdea: {
    title: { en: "A Function Is a Machine with a Name", id: "Fungsi Adalah Mesin yang Punya Nama" },
    body: { en: "Picture a vending machine. You put something IN (a coin), the machine does its hidden work, and something comes OUT (a snack). A function works the same: inputs go in through slots called parameters, the machine runs its steps, and a result comes out — the return value.\n\nBest part: you give the machine a NAME. From then on, anyone can use it without knowing how the inside works.", id: "Bayangkan mesin penjual otomatis. Kamu memasukkan sesuatu (koin), mesin mengerjakan rahasianya, dan sesuatu keluar (camilan). Fungsi bekerja sama: masukan masuk lewat celah bernama parameter, mesin menjalankan langkah-langkahnya, dan hasil keluar — itulah nilai kembalian.\n\nBagian terbaiknya: kamu memberi mesin itu NAMA. Sejak saat itu, siapa pun bisa memakainya tanpa tahu cara kerja bagian dalamnya." }
  },

  wordWall: [
    { term: "fn", en: "Starts a function — \"build a machine with this name\".", id: "Memulai sebuah fungsi — \"bangun mesin dengan nama ini\"." },
    { term: "parameter", en: "An input slot. check_answer(question, correct, guess) has three slots.", id: "Celah masukan. check_answer(question, correct, guess) punya tiga celah." },
    { term: "return value", en: "What the machine hands back, promised by -> String.", id: "Apa yang dikembalikan mesin, dijanjikan lewat -> String." },
    { term: "call", en: "Pressing the machine's button: generate_question() runs it.", id: "Menekan tombol mesin: generate_question() menjalankannya." },
    { term: "format!", en: "Builds a new string from pieces — like println! but saves it instead of printing.", id: "Menyusun string baru dari potongan-potongan — seperti println! tetapi disimpan, tidak dicetak." },
    { term: "&str", en: "A piece of text being borrowed — string without quotes confusion: \"Luna\" is a &str.", id: "Sepenggal teks yang dipinjam — \"Luna\" adalah &str." },
  ],

  thinkSkill: {
    name: "Abstraction",
    hook: { en: "You use powerful machines every day without ever seeing their insides.", id: "Kamu memakai mesin-mesin hebat setiap hari tanpa pernah melihat bagian dalamnya." },
    realLife: { en: "Pressing play on a cartoon is ONE button. Inside, a hundred steps happen — you don't care. The button's name hides the details so your brain can think \"play\" instead of \"decode video frames\". Hiding details behind a simple name is abstraction.", id: "Menekan play pada kartun adalah SATU tombol. Di dalamnya, seratus langkah terjadi — kamu tidak peduli. Nama tombol menyembunyikan detail agar otakmu cukup berpikir \"putar\" alih-alih \"uraikan frame video\". Menyembunyikan detail di balik nama sederhana itulah abstraksi." },
    codeLink: { en: "generate_question() is a button labeled \"make me a question\". main() presses it without knowing how it works. When you wrap steps in a named function, you can THINK about it as one step instead of ten — that's how programmers stay sane in huge programs.", id: "generate_question() adalah tombol bertuliskan \"buatkan aku pertanyaan\". main() menekannya tanpa tahu cara kerjanya. Ketika kamu membungkus langkah-langkah dalam fungsi bernama, kamu bisa memikirkannya sebagai SATU langkah, bukan sepuluh — begitulah programmer tetap waras di program raksasa." },
    tryIt: { en: "Name three \"buttons\" you pressed today. For each: what does the name hide?", id: "Sebutkan tiga \"tombol\" yang kamu tekan hari ini. Untuk masing-masing: detail apa yang disembunyikan namanya?" }
  },

  codeWalkthrough: [
    { line: "fn generate_question() -> String", en: "Builds a machine named generate_question. The -> String is a PROMISE: this machine always hands back text.", id: "Membangun mesin bernama generate_question. -> String adalah JANJI: mesin ini selalu mengembalikan teks." },
    { line: "let a: u32 = 7;", en: "Ingredients stored inside the machine. Outsiders can't see them — pockets inside a function are private.", id: "Bahan-bahan yang disimpan di dalam mesin. Orang luar tidak bisa melihatnya — kantong di dalam fungsi bersifat privat." },
    { line: "format!(\"What is {a} + {b}?\")", en: "Builds the question text. Writing {a} inside the quotes drops the pocket's value straight in. The last line of a function is what it returns.", id: "Menyusun teks pertanyaan. Menulis {a} di dalam tanda kutip langsung memasukkan nilai kantongnya. Baris terakhir sebuah fungsi itulah yang dikembalikan." },
    { line: "fn check_answer(question: &str, correct: u32, guess: u32) -> String", en: "A machine with THREE input slots: a question, the right answer, and the player's guess.", id: "Mesin dengan TIGA celah masukan: pertanyaan, jawaban benar, dan tebakan pemain." },
    { line: "if guess == correct { ... } else { ... }", en: "The machine makes its own decision — its output message depends on comparing two inputs.", id: "Mesin membuat keputusannya sendiri — pesan keluarannya bergantung pada perbandingan dua masukan." },
    { line: "let q = generate_question();", en: "Press the button! The parentheses () mean \"run now\", and q catches whatever the machine hands back.", id: "Tekan tombolnya! Tanda kurung () berarti \"jalankan sekarang\", dan q menangkap apa pun yang dikembalikan mesin." },
    { line: "println!(\"{}\", check_answer(&q, 10, 10));", en: "Feed the question text (&q) plus two numbers into the slots — and print whatever comes out.", id: "Masukkan teks pertanyaan (&q) plus dua angka ke dalam celahnya — dan cetak apa pun yang keluar." },
  ],

  predictions: [
    {
      q: { en: "Change a from 7 to 12 in generate_question. The main still calls check_answer(&q, 10, 10). What does it print?", id: "Ubah a dari 7 menjadi 12 di generate_question. main masih memanggil check_answer(&q, 10, 10). Apa yang tercetak?" },
      a: { en: "\"✅ Correct! What is 12 + 3? = 10\" — which is nonsense! The machine only knows what we PASS it: we told it 10 was correct, so it believed us. Machines never double-check your facts.", id: "\"✅ Correct! What is 12 + 3? = 10\" — yang tidak masuk akal! Mesin hanya tahu apa yang kita BERIKAN: kita bilang 10 benar, jadi ia percaya. Mesin tidak pernah memeriksa ulang fakta kita." },
    },
    {
      q: { en: "check_answer(&q, 10, 5) — which slot is which?", id: "check_answer(&q, 10, 5) — celah mana yang mana?" },
      a: { en: "question = &q, correct = 10, guess = 5. The slots fill left to right — so the ❌ message says \"= 10, not 5\".", id: "question = &q, correct = 10, guess = 5. Celah diisi dari kiri ke kanan — jadi pesan ❌ berkata \"= 10, bukan 5\"." },
    },
    {
      q: { en: "What happens if you call greet(\"Luna\") but forget to catch the result with let?", id: "Apa yang terjadi jika kamu memanggil greet(\"Luna\") tetapi lupa menangkap hasilnya dengan let?" },
      a: { en: "The machine runs and hands back a beautiful welcome string… which falls on the floor. Nothing prints, nothing saves. Machines need someone to catch their output.", id: "Mesinnya berjalan dan mengembalikan string sapaan yang indah… yang jatuh ke lantai. Tidak ada yang tercetak, tidak ada yang tersimpan. Mesin butuh seseorang untuk menangkap keluarannya." },
    },
  ],

  challenges: [
    {
      text: { en: "Change the numbers inside generate_question(). What changes in the output?", id: "Ubah angka-angka di dalam generate_question(). Apa yang berubah pada keluarannya?" },
      hint: { en: "a and b are the machine's ingredients. Watch what stays broken — remember prediction #1!", id: "a dan b adalah bahan mesinnya. Perhatikan apa yang tetap rusak — ingat prediksi #1!" },
      success: { en: "A new question prints — and you can explain why the Correct/Wrong messages now tell a funny story.", id: "Pertanyaan baru tercetak — dan kamu bisa menjelaskan mengapa pesan Correct/Wrong kini bercerita lucu." },
    },
    {
      text: { en: "Call check_answer with different wrong guesses. See the ❌ message appear.", id: "Panggil check_answer dengan tebakan salah yang berbeda-beda. Lihat pesan ❌ muncul." },
      hint: { en: "The third slot is the guess. Try 0, 99, and 7.", id: "Celah ketiga adalah tebakan. Coba 0, 99, dan 7." },
      success: { en: "Three different guesses produce three different ❌ lines.", id: "Tiga tebakan berbeda menghasilkan tiga baris ❌ yang berbeda." },
    },
    {
      text: { en: "Write a new function: fn say_emoji(emoji: &str, count: u32) -> String that returns repeated emojis.", id: "Tulis fungsi baru: fn say_emoji(emoji: &str, count: u32) -> String yang mengembalikan emoji berulang." },
      hint: { en: "Inside: make a let mut result = String::new();, loop with for _ in 0..count, push the emoji in, then write result as the last line.", id: "Di dalamnya: buat let mut result = String::new();, loop dengan for _ in 0..count, tambahkan emoji, lalu tulis result sebagai baris terakhir." },
      success: { en: "Printing say_emoji(\"⭐\", 3) shows ⭐⭐⭐.", id: "Mencetak say_emoji(\"⭐\", 3) menampilkan ⭐⭐⭐." },
    },
    {
      text: { en: "Create a second question function: generate_subtraction_question(). Call both from main().", id: "Buat fungsi pertanyaan kedua: generate_subtraction_question(). Panggil keduanya dari main()." },
      hint: { en: "Copy the addition machine, change the + to −, pick new numbers. Two machines can live side by side.", id: "Salin mesin penjumlahan, ubah + menjadi −, pilih angka baru. Dua mesin bisa tinggal berdampingan." },
      success: { en: "main prints an addition question AND a subtraction question.", id: "main mencetak pertanyaan penjumlahan DAN pengurangan." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "check_answer(q, 10, 10); — \"expected &str, found String\"", id: "check_answer(q, 10, 10); — \"expected &str, found String\"" },
      fix: { en: "The slot wants a BORROWED piece of text. Hand it over with &: check_answer(&q, 10, 10). The & means \"here, look at mine\".", id: "Celahnya meminta SEPENGGAL teks pinjaman. Serahkan dengan &: check_answer(&q, 10, 10). Tanda & berarti \"nih, silakan lihat punyaku\"." },
    },
    {
      bug: { en: "fn SayHello() -> String { … }", id: "fn SayHello() -> String { … }" },
      fix: { en: "Rust style is snake_case: say_hello. Capital letters aren't wrong to the compiler, but every Rust programmer will frown at you.", id: "Gaya Rust adalah snake_case: say_hello. Huruf besar tidak salah di mata compiler, tapi semua programmer Rust akan mengernyit padamu." },
    },
    {
      bug: { en: "fn get_name() { \"Luna\" } — \"why does nothing print when I call it?\"", id: "fn get_name() { \"Luna\" } — \"kenapa tidak ada yang tercetak saat kupanggil?\"" },
      fix: { en: "Returning isn't printing! The machine hands back \"Luna\" — you must catch it (let name = get_name();) and print it yourself.", id: "Mengembalikan bukan mencetak! Mesin menyerahkan \"Luna\" — kamu harus menangkapnya (let name = get_name();) dan mencetaknya sendiri." },
    },
  ],

  quiz: [
    {
      q: { en: "What does -> String in fn generate_question() -> String promise?", id: "Apa yang dijanjikan -> String pada fn generate_question() -> String?" },
      options: [
        { en: "The function prints a string", id: "Fungsi mencetak sebuah string" },
        { en: "The function hands back text when called", id: "Fungsi mengembalikan teks saat dipanggil" },
        { en: "The function takes text as input", id: "Fungsi menerima teks sebagai masukan" },
        { en: "The function is named String", id: "Fungsi itu bernama String" },
      ],
      answer: 1,
      explain: { en: "-> describes what comes OUT. The last line of the machine is what it hands back.", id: "-> menjelaskan apa yang KELUAR. Baris terakhir mesin itulah yang dikembalikannya." },
    },
    {
      q: { en: "In check_answer(question, correct, guess), what are question, correct and guess?", id: "Dalam check_answer(question, correct, guess), apa itu question, correct, dan guess?" },
      options: [
        { en: "Return values", id: "Nilai kembalian" },
        { en: "Parameters — the machine's input slots", id: "Parameter — celah masukan mesin" },
        { en: "Comments", id: "Komentar" },
        { en: "Macros", id: "Makro" },
      ],
      answer: 1,
      explain: { en: "Parameters are the slots. Whoever CALLS the machine fills them, left to right.", id: "Parameter adalah celah-celahnya. Siapa pun yang MEMANGGIL mesin mengisinya, dari kiri ke kanan." },
    },
    {
      q: { en: "Why do programmers wrap code in named functions?", id: "Mengapa programmer membungkus kode dalam fungsi bernama?" },
      options: [
        { en: "To make the program longer", id: "Agar programnya lebih panjang" },
        { en: "So they can think of many steps as ONE step — abstraction", id: "Agar bisa memandang banyak langkah sebagai SATU langkah — abstraksi" },
        { en: "Because Rust forbids long main functions", id: "Karena Rust melarang main yang panjang" },
        { en: "To make the computer slower", id: "Agar komputernya lebih lambat" },
      ],
      answer: 1,
      explain: { en: "Naming a machine lets your brain treat it as a single button — that's abstraction, this week's superpower.", id: "Menamai mesin membuat otakmu memperlakukannya sebagai satu tombol — itulah abstraksi, kekuatan super minggu ini." },
    },
    {
      q: { en: "What's the difference between format! and println!?", id: "Apa bedanya format! dan println!?" },
      options: [
        { en: "format! is faster", id: "format! lebih cepat" },
        { en: "format! BUILDS a string; println! prints it to the screen", id: "format! MENYUSUN string; println! mencetaknya ke layar" },
        { en: "They are the same thing", id: "Keduanya sama saja" },
        { en: "println! only works inside functions", id: "println! hanya bekerja di dalam fungsi" },
      ],
      answer: 1,
      explain: { en: "format! is the factory; println! is the loudspeaker. Machines often build with format!, then someone else prints.", id: "format! adalah pabriknya; println! pengeras suaranya. Mesin sering membangun dengan format!, lalu pihak lain yang mencetak." },
    },
  ],

  reflect: [
    { prompt: { en: "If you could build ANY function machine, what would it do? Name it and list its input slots.", id: "Jika kamu bisa membangun mesin fungsi APA SAJA, apa yang dilakukannya? Beri nama dan sebutkan celah masukannya." } },
    { prompt: { en: "Explain abstraction to your rubber duck using the TV remote.", id: "Jelaskan abstraksi kepada bebek karetmu memakai remote TV." } },
  ],

  parentCorner: {
    prep: [
      { en: "Draw the machine diagram before class: slots on the left, box with the name, output arrow on the right.", id: "Gambar diagram mesin sebelum kelas: celah di kiri, kotak bernama, panah keluaran di kanan." },
      { en: "Run the starter once. Ask the kids to point at where the machine STARTS and what it HANDS BACK.", id: "Jalankan kode awal sekali. Minta anak menunjuk di mana mesin MULAI dan apa yang DIKEMBALIKANNYA." },
    ],
    say: [
      { en: "\"A function is a vending machine: inputs in, hidden work, snack out.\"", id: "\"Fungsi itu mesin penjual otomatis: masukan, kerja tersembunyi, camilan keluar.\"" },
      { en: "\"We never opened the machine to fix the question — we just pressed its button differently.\"", id: "\"Kita tidak pernah membuka mesin untuk memperbaiki pertanyaannya — kita hanya menekan tombolnya secara berbeda.\"" },
      { en: "\"Name this machine anything you like — good names make code readable.\"", id: "\"Namai mesin ini sesukamu — nama yang bagus membuat kode mudah dibaca.\"" },
    ],
    ifStuck: {
      en: "Draw the machine as a box with slots and label each slot with the parameter name. Then act out a call: parent hands the kid paper slips (\"Luna\", 10, 5) and the kid slides them into the slots in order, then reads out the returned message.",
      id: "Gambar mesinnya sebagai kotak dengan celah-celah, beri label setiap celah dengan nama parameternya. Lalu peragakan pemanggilan: orang tua menyerahkan kertas (\"Luna\", 10, 5) dan anak memasukkannya ke celah sesuai urutan, lalu membacakan pesan yang dikembalikan.",
    },
  },
};
