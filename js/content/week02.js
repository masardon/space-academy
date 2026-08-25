// Week 2 — The Choice Portal (Conditionals)
LESSONS[2] = {
  bigIdea: {
    title: { en: "Every Choice Is a Fork in the Road", id: "Setiap Pilihan Adalah Persimpangan Jalan" },
    body: { en: "Your program just walked up to a fork in the road. if asks ONE question, the answer is always true or false, and the answer picks the path.\n\nOnly ONE branch ever runs. The moment a question answers true, its code runs and every other branch is skipped — like doors slamming shut behind you.", id: "Programmu baru saja berdiri di persimpangan jalan. if mengajukan SATU pertanyaan, jawabannya selalu true atau false, dan jawaban itulah yang memilih jalan.\n\nHanya SATU cabang yang pernah berjalan. Begitu ada pertanyaan yang menjawab true, kodenya berjalan dan semua cabang lain dilewati — seperti pintu yang tertutup di belakangmu." }
  },

  wordWall: [
    { term: "if", en: "Asks a question. Runs its code only when the answer is true.", id: "Mengajukan pertanyaan. Menjalankan kodenya hanya jika jawabannya true." },
    { term: "else", en: "The \"otherwise\" path — runs when every question above was false.", id: "Jalan \"jika tidak\" — berjalan ketika semua pertanyaan di atasnya false." },
    { term: "else if", en: "A second question, asked only if the first one was false.", id: "Pertanyaan kedua, diajukan hanya jika pertanyaan pertama false." },
    { term: "condition", en: "The question being checked, like choice == \"left\".", id: "Pertanyaan yang diperiksa, seperti choice == \"left\"." },
    { term: "==", en: "Compares two values: are they equal? (One = puts a value in; two == asks a question.)", id: "Membandingkan dua nilai: apakah sama? (Satu = memasukkan nilai; dua == mengajukan pertanyaan.)" },
  ],

  thinkSkill: {
    name: "Conditional Reasoning",
    hook: { en: "You already run if/else every single morning — you just never called it code.", id: "Kamu sebenarnya menjalankan if/else setiap pagi — kamu hanya belum menyebutnya kode." },
    realLife: { en: "Getting dressed: IF it's cold, wear a jacket. ELSE IF it's raining, take an umbrella. ELSE wear sunglasses. You check conditions, pick one path, and never wear all three at once.", id: "Berpakaian: IF dingin, pakai jaket. ELSE IF hujan, bawa payung. ELSE pakai kacamata hitam. Kamu memeriksa syarat, memilih satu jalan, dan tidak pernah memakai ketiganya sekaligus." },
    codeLink: { en: "In code, the question is a comparison: choice == \"left\" produces true or false. The branch that matches runs; ALL others are skipped. First match wins — so the ORDER of your questions matters.", id: "Dalam kode, pertanyaannya adalah perbandingan: choice == \"left\" menghasilkan true atau false. Cabang yang cocok berjalan; SEMUA cabang lain dilewati. Kecocokan pertama menang — jadi URUTAN pertanyaanmu penting." },
    tryIt: { en: "Write your morning as three if / else if / else rules on paper. Test them: what happens on a cold AND rainy day?", id: "Tulis pagimu sebagai tiga aturan if / else if / else di kertas. Uji: apa yang terjadi pada hari yang dingin DAN hujan?" }
  },

  codeWalkthrough: [
    { line: "let choice = \"left\";", en: "A pocket holding text. Change this one string and the whole story takes a different path.", id: "Kantong berisi teks. Ubah satu string ini dan seluruh cerita berjalan ke jalan yang berbeda." },
    { line: "if choice == \"left\" {", en: "Asks: is choice equal to \"left\"? Two equal signs ASK a question. (One equal sign would PUT a value in.)", id: "Menanyakan: apakah choice sama dengan \"left\"? Dua tanda sama dengan MENGAJUKAN pertanyaan. (Satu tanda akan MEMASUKKAN nilai.)" },
    { line: "println!(\"You enter the Crystal Caves.\");", en: "Runs ONLY when the answer was true. Otherwise the computer skips right past it.", id: "Berjalan HANYA jika jawabannya true. Jika tidak, komputer melewatkannya begitu saja." },
    { line: "} else if choice == \"right\" {", en: "This question is asked ONLY if the first one was false. Questions go top to bottom.", id: "Pertanyaan ini diajukan HANYA jika pertanyaan pertama false. Pertanyaan diperiksa dari atas ke bawah." },
    { line: "} else {", en: "The safety net. If NOTHING matched, this path always runs.", id: "Jaring pengaman. Jika TIDAK ADA yang cocok, jalan inilah yang berjalan." },
    { line: "}", en: "Closes the whole decision. Every { needs its matching }.", id: "Menutup seluruh keputusan. Setiap { butuh pasangan }." },
  ],

  predictions: [
    {
      q: { en: "Change choice to \"right\". Which lines print?", id: "Ubah choice menjadi \"right\". Baris mana yang tercetak?" },
      a: { en: "Only the Rocket Hangar lines. The Crystal Caves branch never even looks at them — its question answered false and the door closed.", id: "Hanya baris Rocket Hangar. Cabang Crystal Caves tidak pernah melihatnya — pertanyaannya menjawab false dan pintunya tertutup." },
    },
    {
      q: { en: "Change choice to \"up\". What prints?", id: "Ubah choice menjadi \"up\". Apa yang tercetak?" },
      a: { en: "The else safety net: \"That path is blocked by a wall of code!\" — no question matched, so the fallback runs.", id: "Jaring pengaman else: \"That path is blocked by a wall of code!\" — tidak ada pertanyaan yang cocok, jadi jalan cadangan yang berjalan." },
    },
    {
      q: { en: "What if we swap the \"left\" and \"right\" branches — does choice = \"left\" still work?", id: "Bagaimana jika cabang \"left\" dan \"right\" ditukar — apakah choice = \"left\" masih berfungsi?" },
      a: { en: "Yes! Only one branch can match \"left\", no matter where it sits. Order only matters when two questions could BOTH be true — then the first one written wins.", id: "Ya! Hanya satu cabang yang bisa cocok dengan \"left\", di mana pun posisinya. Urutan hanya penting jika dua pertanyaan BISA sama-sama true — yang ditulis lebih dulu yang menang." },
    },
  ],

  challenges: [
    {
      text: { en: "Change choice to \"right\". What happens?", id: "Ubah choice menjadi \"right\". Apa yang terjadi?" },
      hint: { en: "Only the text between the quotes changes.", id: "Hanya teks di antara tanda kutip yang berubah." },
      success: { en: "The Rocket Hangar ending prints; the caves are skipped.", id: "Akhir Rocket Hangar tercetak; Crystal Caves dilewati." },
    },
    {
      text: { en: "Change choice to \"up\". Watch the else trigger.", id: "Ubah choice menjadi \"up\". Amati else yang terpicu." },
      hint: { en: "\"up\" matches no question — so which branch catches it?", id: "\"up\" tidak cocok dengan pertanyaan mana pun — jadi cabang mana yang menangkapnya?" },
      success: { en: "The wall-of-code message prints.", id: "Pesan wall-of-code tercetak." },
    },
    {
      text: { en: "Add a third option: else if choice == \"up\" with your own ending.", id: "Tambahkan opsi ketiga: else if choice == \"up\" dengan akhir ciptaanmu sendiri." },
      hint: { en: "Copy an else if block, change the string and the println lines, and place it BEFORE the else.", id: "Salin satu blok else if, ubah string dan baris println-nya, lalu letakkan SEBELUM else." },
      success: { en: "Choosing \"up\" prints YOUR ending, and the else still catches everything else.", id: "Memilih \"up\" mencetak akhiranmu, dan else tetap menangkap sisanya." },
    },
    {
      text: { en: "Create a new story with at least 3 branches. What adventure do YOU want to tell?", id: "Buat cerita baru dengan minimal 3 cabang. Petualangan apa yang ingin kamu ceritakan?" },
      hint: { en: "Keep the same if / else if / else skeleton — swap the strings and the story lines.", id: "Pertahankan kerangka if / else if / else — ganti string dan baris ceritanya." },
      success: { en: "Three different choices lead to three different endings.", id: "Tiga pilihan berbeda mengarah ke tiga akhir yang berbeda." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "if choice = \"left\" {", id: "if choice = \"left\" {" },
      fix: { en: "One = PUTS a value into a pocket. To ASK a question you need two: choice == \"left\".", id: "Satu = MEMASUKKAN nilai ke kantong. Untuk MENGAJUKAN pertanyaan kamu butuh dua: choice == \"left\"." },
    },
    {
      bug: { en: "if choice == left {", id: "if choice == left {" },
      fix: { en: "No quotes! Now Rust hunts for a POCKET named left and can't find it. Text needs quotes: \"left\".", id: "Tidak ada tanda kutip! Sekarang Rust mencari KANTONG bernama left dan tidak menemukannya. Teks butuh tanda kutip: \"left\"." },
    },
    {
      bug: { en: "If choice == \"left\" {", id: "If choice == \"left\" {" },
      fix: { en: "Capital I! Rust is case-sensitive: If and if are different words. Keywords are always lowercase.", id: "Huruf I besar! Rust peka huruf besar/kecil: If dan if adalah kata yang berbeda. Kata kunci selalu huruf kecil." },
    },
  ],

  quiz: [
    {
      q: { en: "Which symbol ASKS \"are these two values equal?\"", id: "Simbol mana yang MENANYAKAN \"apakah dua nilai ini sama?\"" },
      options: [
        { en: "=", id: "=" },
        { en: "==", id: "==" },
        { en: "{}", id: "{}" },
        { en: "//", id: "//" },
      ],
      answer: 1,
      explain: { en: "== asks. = puts. One equal sign fills a pocket; two equal signs compare what's inside.", id: "== bertanya. = mengisi. Satu tanda sama dengan mengisi kantong; dua tanda membandingkan isinya." },
    },
    {
      q: { en: "In an if / else if / else chain, how many branches run?", id: "Dalam rantai if / else if / else, berapa cabang yang berjalan?" },
      options: [
        { en: "All the true ones", id: "Semua yang true" },
        { en: "Only the first match", id: "Hanya kecocokan pertama" },
        { en: "Always two", id: "Selalu dua" },
        { en: "None — it just checks", id: "Tidak ada — hanya memeriksa" },
      ],
      answer: 1,
      explain: { en: "First match wins, then the whole chain is skipped. Like doors: you walk through one, the rest close.", id: "Kecocokan pertama menang, lalu seluruh rantai dilewati. Seperti pintu: kamu melewati satu, sisanya tertutup." },
    },
    {
      q: { en: "choice == \"up\" produces what kind of value?", id: "choice == \"up\" menghasilkan nilai jenis apa?" },
      options: [
        { en: "A string", id: "Sebuah string" },
        { en: "A boolean — true or false", id: "Sebuah boolean — true atau false" },
        { en: "A loop", id: "Sebuah loop" },
        { en: "An error", id: "Sebuah error" },
      ],
      answer: 1,
      explain: { en: "Every condition boils down to one bit: true or false. That's the only answer if understands.", id: "Setiap kondisi bermuara pada satu hal: true atau false. Itulah satu-satunya jawaban yang dipahami if." },
    },
    {
      q: { en: "Where does a NEW else if branch belong?", id: "Di mana cabang else if yang BARU harus diletakkan?" },
      options: [
        { en: "After the final else", id: "Setelah else terakhir" },
        { en: "Before the final else", id: "Sebelum else terakhir" },
        { en: "Inside a println!", id: "Di dalam println!" },
        { en: "Anywhere — order never matters", id: "Di mana saja — urutan tidak penting" },
      ],
      answer: 1,
      explain: { en: "else is the safety net — it must be LAST, catching everything the questions above didn't.", id: "else adalah jaring pengaman — harus di PALING AKHIR, menangkap semua yang tidak tertangkap pertanyaan di atasnya." },
    },
  ],

  reflect: [
    { prompt: { en: "Describe the ending you invented in one sentence.", id: "Ceritakan akhir yang kamu ciptakan dalam satu kalimat." } },
    { prompt: { en: "Name one decision from your real life that works like if/else.", id: "Sebutkan satu keputusan dalam hidupmu yang bekerja seperti if/else." } },
  ],

  parentCorner: {
    prep: [
      { en: "Run the starter once with choice = \"left\" so the first run feels like magic.", id: "Jalankan kode awal sekali dengan choice = \"left\" agar percobaan pertama terasa seperti sulap." },
      { en: "Draw a fork in the road on paper: two arrows, one question mark.", id: "Gambar persimpangan di kertas: dua anak panah, satu tanda tanya." },
    ],
    say: [
      { en: "\"The computer asks exactly one kind of question: true, or false?\"", id: "\"Komputer hanya mengajukan satu jenis pertanyaan: true, atau false?\"" },
      { en: "\"You steer the story by changing ONE word. What should we try?\"", id: "\"Kamu mengarahkan cerita dengan mengubah SATU kata. Apa yang ingin kita coba?\"" },
      { en: "\"First match wins — so what happens if two questions could both be true?\"", id: "\"Kecocokan pertama menang — jadi apa yang terjadi jika dua pertanyaan bisa sama-sama true?\"" },
    ],
    ifStuck: {
      en: "Act it out. Kid stands at an imaginary fork; parent calls out the value of choice (\"left!\", \"up!\"); kid physically walks the branch that would run. Bodies learn branches faster than eyes do.",
      id: "Peragakan. Anak berdiri di persimpangan imajiner; orang tua menyebutkan nilai choice (\"left!\", \"up!\"); anak berjalan ke cabang yang akan berjalan. Tubuh mempelajari cabang lebih cepat daripada mata.",
    },
  },
};
