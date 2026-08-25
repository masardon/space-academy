// ============================================
// SPACE ACADEMY — Lesson Content
// ============================================
// One file per week. week01.js declares the LESSONS registry; every other
// week file appends to it (load order matters — see index.html).

const LESSONS = {};

LESSONS[1] = {
  bigIdea: {
    title: { en: "A Variable Is a Labeled Pocket", id: "Variabel Adalah Kantong Berlabel" },
    body: { en: "Imagine your backpack. It has a pocket with a label: WATER BOTTLE. Today a red bottle is inside. Tomorrow you might swap it for a blue one. The label stays the same — only the thing inside changes.\n\nIn code, let robot_hp = 100; makes a pocket labeled robot_hp and puts the number 100 inside. Whenever your program reads robot_hp, it looks in the pocket and finds 100.", id: "Bayangkan tas ranselmu. Ada kantong dengan label: AIR MINUM. Hari ini berisi botol merah. Besok kamu mungkin menggantinya dengan botol biru. Labelnya tetap sama — hanya isinya yang berubah.\n\nDalam kode, let robot_hp = 100; membuat kantong berlabel robot_hp dan mengisi angka 100 di dalamnya. Setiap kali programmu membaca robot_hp, program melihat ke dalam kantong dan menemukan 100." }
  },

  wordWall: [
    { term: "variable", en: "A labeled box that holds a value.", id: "Kotak berlabel yang menyimpan sebuah nilai." },
    { term: "value", en: "The thing inside a variable — a number, text, or true/false.", id: "Isi sebuah variabel — angka, teks, atau benar/salah." },
    { term: "string", en: "Text wearing quotes, like \"Sparky\".", id: "Teks yang memakai tanda kutip, seperti \"Sparky\"." },
    { term: "integer", en: "A whole number, like 100 or 7. No decimals allowed.", id: "Bilangan bulat, seperti 100 atau 7. Tanpa desimal." },
    { term: "boolean", en: "A value that is only ever true or false.", id: "Nilai yang hanya bisa benar (true) atau salah (false)." },
    { term: "println!", en: "A command that prints one line to the screen.", id: "Perintah yang menampilkan satu baris ke layar." },
  ],

  thinkSkill: {
    name: "Decomposition",
    hook: { en: "Big problems are just small problems wearing a disguise.", id: "Masalah besar hanyalah masalah-masalah kecil yang menyamar." },
    realLife: { en: "\"Clean your room!\" sounds huge. Break it up: make the bed → put toys in the box → hang your clothes. Four small jobs feel easy; one giant job feels impossible. That trick has a name: decomposition.", id: "\"Rapikan kamar!\" terdengar berat. Pecahkan: rapikan tempat tidur → masukkan mainan ke kotak → gantung baju. Empat pekerjaan kecil terasa mudah; satu pekerjaan raksasa terasa mustahil. Trik ini punya nama: dekomposisi." },
    codeLink: { en: "Programmers do the same. \"Make a robot profile\" breaks into four small parts: a name, health points, a speed level, and an on/off switch. Each small part becomes ONE line of code. Big problem → small parts → one line each. That is how all software is built.", id: "Programmer melakukan hal yang sama. \"Buat profil robot\" dipecah menjadi empat bagian kecil: nama, nyawa, kecepatan, dan saklar nyala/mati. Setiap bagian kecil menjadi SATU baris kode. Masalah besar → bagian kecil → satu baris untuk masing-masing. Begitulah semua perangkat lunak dibuat." },
    tryIt: { en: "Think of one big task (in real life or in code) and split it into 3–5 small steps. Say the steps out loud to your parent.", id: "Pikirkan satu tugas besar (di dunia nyata atau dalam kode) dan pecah menjadi 3–5 langkah kecil. Ucapkan langkah-langkah itu keras-keras kepada orang tuamu." }
  },

  codeWalkthrough: [
    { line: "fn main() {", en: "Every Rust program starts here. main is the front door of your program.", id: "Setiap program Rust dimulai di sini. main adalah pintu depan programmu." },
    { line: "let robot_name = \"Sparky\";", en: "let makes a new pocket. Label: robot_name. Value: the text \"Sparky\". Strings always wear quotes.", id: "let membuat kantong baru. Labelnya: robot_name. Isinya: teks \"Sparky\". String selalu memakai tanda kutip." },
    { line: "let robot_hp = 100;", en: "Another pocket. Numbers never wear quotes.", id: "Kantong lain. Angka tidak pernah memakai tanda kutip." },
    { line: "let robot_speed = 5;", en: "A speed pocket. One let line = one pocket.", id: "Kantong kecepatan. Satu baris let = satu kantong." },
    { line: "let is_active = true;", en: "A boolean pocket: only true or false, never quoted.", id: "Kantong boolean: hanya true atau false, tanpa tanda kutip." },
    { line: "println!(\"Welcome to Space Academy!\");", en: "Prints exactly this text. The ! means println is a macro — a super-command.", id: "Menampilkan teks ini persis. Tanda ! berarti println adalah makro — perintah super." },
    { line: "println!(\"Your robot sidekick is {}.\", robot_name);", en: "{} is an empty hole in the text. The pocket written after the comma drops its value into the hole.", id: "{} adalah lubang kosong di dalam teks. Kantong yang ditulis setelah koma memasukkan nilainya ke lubang itu." },
    { line: "println!(\"HP: {} | Speed: {} | Active: {}\", ...);", en: "Three holes, three pockets — filled left to right, in order.", id: "Tiga lubang, tiga kantong — diisi dari kiri ke kanan, sesuai urutan." },
  ],

  predictions: [
    {
      q: { en: "We change robot_speed from 5 to 50. What does the last line print?", id: "Kita mengubah robot_speed dari 5 menjadi 50. Apa yang dicetak baris terakhir?" },
      a: { en: "HP: 100 | Speed: 50 | Active: true — only the speed pocket changed. Everything else stays exactly the same.", id: "HP: 100 | Speed: 50 | Active: true — hanya kantong kecepatan yang berubah. Semua lainnya tetap persis sama." },
    },
    {
      q: { en: "We delete the quotes: let robot_name = Sparky; What happens?", id: "Kita menghapus tanda kutip: let robot_name = Sparky; Apa yang terjadi?" },
      a: { en: "Rust refuses to run! Text must wear quotes. Without them, the compiler looks for a POCKET named Sparky, can't find one, and reports an error.", id: "Rust menolak berjalan! Teks harus memakai tanda kutip. Tanpa itu, compiler mencari KANTONG bernama Sparky, tidak menemukannya, lalu melaporkan error." },
    },
    {
      q: { en: "We add let robot_power = 75; but never print it. What shows on screen?", id: "Kita menambah let robot_power = 75; tetapi tidak pernah mencetaknya. Apa yang muncul di layar?" },
      a: { en: "Nothing new! The pocket exists, but nobody looks inside it. Rust even warns you: 'unused variable'.", id: "Tidak ada yang baru! Kantongnya ada, tetapi tidak ada yang melihat isinya. Rust bahkan memperingatkanmu: 'unused variable'." },
    },
  ],

  challenges: [
    {
      text: { en: "Change robot_name to your own name. What prints?", id: "Ubah robot_name menjadi namamu sendiri. Apa yang tercetak?" },
      hint: { en: "Only change what is BETWEEN the quotes.", id: "Hanya ubah apa yang ada DI ANTARA tanda kutip." },
      success: { en: "The greeting line shows YOUR name.", id: "Baris sapaan menampilkan NAMAMU." },
    },
    {
      text: { en: "Change robot_hp from 100 to 50. Does anything else change?", id: "Ubah robot_hp dari 100 menjadi 50. Apakah hal lain ikut berubah?" },
      hint: { en: "Change one pocket, watch one line.", id: "Ubah satu kantong, amati satu baris." },
      success: { en: "Only the HP number changed; Speed and Active are untouched.", id: "Hanya angka HP yang berubah; Speed dan Active tidak tersentuh." },
    },
    {
      text: { en: "Change is_active from true to false. What happens to the output?", id: "Ubah is_active dari true menjadi false. Apa yang terjadi pada keluarannya?" },
      hint: { en: "true and false never wear quotes — they are booleans.", id: "true dan false tidak pernah memakai tanda kutip — itu boolean." },
      success: { en: "The last line prints Active: false.", id: "Baris terakhir mencetak Active: false." },
    },
    {
      text: { en: "Add a new variable: let robot_power = 75;. Print it in the last line.", id: "Tambahkan variabel baru: let robot_power = 75;. Cetak di baris terakhir." },
      hint: { en: "Copy a let line and rename it. Then add a fourth {} and robot_power to the last println!.", id: "Salin satu baris let lalu ganti namanya. Lalu tambahkan {} keempat dan robot_power ke println! terakhir." },
      success: { en: "The last line prints your new Power value.", id: "Baris terakhir mencetak nilai Power barumu." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "let robot name = \"Sparky\";", id: "let robot name = \"Sparky\";" },
      fix: { en: "Pocket labels can't contain spaces. Use robot_name — small letters with underscores (snake_case).", id: "Label kantong tidak boleh mengandung spasi. Gunakan robot_name — huruf kecil dengan garis bawah (snake_case)." },
    },
    {
      bug: { en: "let robot_hp = 100  (and then nothing happens)", id: "let robot_hp = 100  (lalu tidak terjadi apa-apa)" },
      fix: { en: "Missing semicolon. Every let line ends with ; — like a period at the end of a sentence.", id: "Titik koma hilang. Setiap baris let diakhiri ; — seperti titik di akhir kalimat." },
    },
    {
      bug: { en: "println!(\"HP: {}\", robothp);", id: "println!(\"HP: {}\", robothp);" },
      fix: { en: "Typo! The pocket is robot_hp. Rust is picky about spelling — robothp and robot_hp are two different pockets.", id: "Salah ketik! Kantongnya adalah robot_hp. Rust sangat teliti soal ejaan — robothp dan robot_hp adalah dua kantong yang berbeda." },
    },
  ],

  quiz: [
    {
      q: { en: "Which line creates a variable (a new pocket)?", id: "Baris mana yang membuat variabel (kantong baru)?" },
      options: [
        { en: "println!(\"Hi\");", id: "println!(\"Hi\");" },
        { en: "let robot_hp = 100;", id: "let robot_hp = 100;" },
        { en: "fn main() {", id: "fn main() {" },
        { en: "// robot_hp = 100", id: "// robot_hp = 100" },
      ],
      answer: 1,
      explain: { en: "let means \"make a new pocket\". println! prints, fn main opens the program, and // is a comment — a note for humans.", id: "let berarti \"buat kantong baru\". println! mencetak, fn main membuka program, dan // adalah komentar — catatan untuk manusia." },
    },
    {
      q: { en: "Which value is a string?", id: "Nilai mana yang merupakan string?" },
      options: [
        { en: "100", id: "100" },
        { en: "true", id: "true" },
        { en: "\"Sparky\"", id: "\"Sparky\"" },
        { en: "robot_name", id: "robot_name" },
      ],
      answer: 2,
      explain: { en: "Strings wear quotes. 100 is an integer, true is a boolean, and robot_name is a variable's label.", id: "String memakai tanda kutip. 100 adalah integer, true adalah boolean, dan robot_name adalah label sebuah variabel." },
    },
    {
      q: { en: "What does {} do inside println!?", id: "Apa fungsi {} di dalam println!?" },
      options: [
        { en: "Makes the program run faster", id: "Membuat program berjalan lebih cepat" },
        { en: "It's an empty hole that gets filled with a value", id: "Itu lubang kosong yang diisi dengan sebuah nilai" },
        { en: "Starts a comment", id: "Memulai sebuah komentar" },
        { en: "Nothing — it's just decoration", id: "Tidak ada — hanya hiasan" },
      ],
      answer: 1,
      explain: { en: "Each {} is a hole. The pockets listed after the comma fill the holes left to right.", id: "Setiap {} adalah lubang. Kantong yang ditulis setelah koma mengisi lubang-lubang itu dari kiri ke kanan." },
    },
    {
      q: { en: "Decomposition means…", id: "Dekomposisi berarti…" },
      options: [
        { en: "Typing faster", id: "Mengetik lebih cepat" },
        { en: "Breaking a big problem into small parts", id: "Memecah masalah besar menjadi bagian-bagian kecil" },
        { en: "Fixing bugs", id: "Memperbaiki bug" },
        { en: "Deleting old code", id: "Menghapus kode lama" },
      ],
      answer: 1,
      explain: { en: "Decomposition = break it down. It's the #1 thinking skill of this mission — and of all programming.", id: "Dekomposisi = memecah masalah. Ini keterampilan berpikir nomor satu di misi ini — dan di semua pemrograman." },
    },
  ],

  reflect: [
    { prompt: { en: "What surprised you today?", id: "Apa yang membuatmu terkejut hari ini?" } },
    { prompt: { en: "Explain variables to a rubber duck in one sentence. What did you say?", id: "Jelaskan variabel kepada bebek karet dalam satu kalimat. Apa yang kamu katakan?" } },
  ],

  parentCorner: {
    prep: [
      { en: "Open the week01 folder in VS Code and run the starter code once before the kids arrive.", id: "Buka folder week01 di VS Code dan jalankan kode awal satu kali sebelum anak-anak datang." },
      { en: "Paper + pencils on the table — predictions get written down BEFORE running.", id: "Kertas dan pensil di atas meja — tebakan ditulis SEBELUM program dijalankan." },
      { en: "Decide who types first (in gentle mode, that's you).", id: "Tentukan siapa yang mengetik lebih dulu (di mode lembut, itu kamu)." },
    ],
    say: [
      { en: "\"Today you become junior engineers at Space Academy. Your first mission: design a robot.\"", id: "\"Hari ini kamu menjadi insinyur muda di Space Academy. Misi pertamamu: mendesain sebuah robot.\"" },
      { en: "\"Before I change anything — what do YOU think will happen?\"", id: "\"Sebelumku mengubah apa pun — menurutmu apa yang akan terjadi?\"" },
      { en: "\"Great prediction! Let's test it and see.\"", id: "\"Prediksi yang bagus! Mari kita uji dan buktikan.\"" },
    ],
    ifStuck: {
      en: "Go back to the backpack picture. Ask: \"Which pocket are we changing?\" Draw the pockets on paper with their values inside. A child who can point at the right pocket can change the right line of code.",
      id: "Kembali ke gambar tas ransel. Tanyakan: \"Kantong mana yang ingin kita ubah?\" Gambar kantong-kantongnya di kertas beserta isinya. Anak yang bisa menunjuk kantong yang tepat bisa mengubah baris kode yang tepat.",
    },
  },
};
