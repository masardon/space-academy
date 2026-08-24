// Week 8 — Equipment Upgrade Day (Cargo & Projects)
LESSONS[8] = {
  bigIdea: {
    en: {
      title: "Cargo Is Your Robot Assistant",
      body: "Until now, every program was one loose file. Real projects are FOLDERS: code lives in src/main.rs, settings live in Cargo.toml, and one command — cargo run — builds AND runs everything.\n\nYou don't organize any of it by hand. You tell Cargo \"make me a project called X\" and it builds the whole structure. Real engineers keep tidy workspaces — Cargo does the tidying.",
    },
    id: {
      title: "Cargo Adalah Asisten Robotmu",
      body: "Sampai sekarang, setiap program hanyalah satu file lepas. Proyek sungguhan adalah FOLDER: kode tinggal di src/main.rs, pengaturan tinggal di Cargo.toml, dan satu perintah — cargo run — membangun SEKALIGUS menjalankan semuanya.\n\nKamu tidak merapikannya manual. Kamu berkata pada Cargo \"buatkan proyek bernama X\" dan ia membangun seluruh strukturnya. Insinyur sungguhan menjaga ruang kerja yang rapi — Cargo yang merapikannya.",
    },
  },

  wordWall: [
    { term: "Cargo", en: "Rust's project manager: builds, runs, and organizes.", id: "Manajer proyek Rust: membangun, menjalankan, dan merapikan." },
    { term: "Cargo.toml", en: "The project's recipe card: name, version, ingredients.", id: "Kartu resep proyek: nama, versi, bahan-bahan." },
    { term: "src/main.rs", en: "Where your code always lives in a Cargo project.", id: "Tempat kodemu selalu berada dalam proyek Cargo." },
    { term: "cargo new", en: "\"Build me a new project folder\" — one command, whole structure.", id: "\"Bangunkan aku folder proyek baru\" — satu perintah, struktur lengkap." },
    { term: "cargo run", en: "Compiles AND runs in one command. No more rustc juggling.", id: "Mengompilasi DAN menjalankan dalam satu perintah. Tak perlu lagi bermain rustc." },
    { term: "dependency", en: "Someone else's code your project uses — listed in Cargo.toml.", id: "Kode milik orang lain yang dipakai proyekmu — tercatat di Cargo.toml." },
  ],

  thinkSkill: {
    name: "Tool Selection",
    en: {
      hook: "You could cut paper with scissors held upside down. Why would you?",
      realLife: "Spoon, fork, whisk: same kitchen, different jobs. Choosing the right tool on PURPOSE — and knowing why — is a thinking skill, not just a habit.",
      codeLink: "rustc compiles one file, fine for week 1. But real projects need folders, settings, and extra libraries — that's Cargo's job. Today we stop holding the scissors upside down: cargo new to build, cargo run to launch.",
      tryIt: "Sometime today, pick a tool ON PURPOSE for a task and say out loud why it's the right one.",
    },
    id: {
      hook: "Kamu bisa memotong kertas dengan gunting terbalik. Tapi untuk apa?",
      realLife: "Sendok, garpu, pengocok telur: dapur yang sama, tugas berbeda. Memilih alat yang tepat dengan SEGENG — dan tahu alasannya — adalah keterampilan berpikir, bukan sekadar kebiasaan.",
      codeLink: "rustc mengompilasi satu file, cukup untuk minggu pertama. Tetapi proyek sungguhan butuh folder, pengaturan, dan pustaka tambahan — itu tugas Cargo. Hari ini kita berhenti memegang gunting terbalik: cargo new untuk membangun, cargo run untuk meluncurkan.",
      tryIt: "Someday hari ini, pilih sebuah alat dengan SEGENG untuk satu tugas dan ucapkan keras-keras mengapa itu yang paling tepat.",
    },
  },

  codeWalkthrough: [
    { line: "// After running: cargo new space-academy-week1", en: "One command builds the entire project: folder, recipe card, and a starter main.rs. Try it in the terminal!", id: "Satu perintah membangun seluruh proyek: folder, kartu resep, dan main.rs awal. Coba di terminal!" },
    { line: "// Inside src/main.rs:", en: "The magic address. In EVERY Cargo project, your code lives at src/main.rs — like every house having its kitchen.", id: "Alamat ajaibnya. Di SETIAP proyek Cargo, kodemu tinggal di src/main.rs — seperti setiap rumah punya dapur." },
    { line: "println!(\"Folder: space-academy-week1/\");", en: "This week's program just PROVES the upgrade happened — printing the new addresses like a housewarming card.", id: "Program minggu ini hanya MEMBUKTIKAN bahwa upgrade terjadi — mencetak alamat-alamat baru seperti kartu pindahan." },
    { line: "println!(\"Run with: cargo run\");", en: "The new daily habit: type cargo run inside the project folder and Cargo builds + runs it, no rustc needed.", id: "Kebiasaan baru sehari-hari: ketik cargo run di dalam folder proyek dan Cargo membangun + menjalankannya, tanpa rustc." },
  ],

  predictions: [
    {
      q: { en: "After cargo new my_project, where does YOUR code go?", id: "Setelah cargo new my_project, kodemu ditulis di mana?" },
      a: { en: "src/main.rs. Cargo even puts a \"Hello, world!\" there for you — replace it with your own code.", id: "src/main.rs. Cargo bahkan menaruh \"Hello, world!\" di sana untukmu — ganti dengan kodemu sendiri." },
    },
    {
      q: { en: "What do you think is inside Cargo.toml?", id: "Menurutmu apa isi Cargo.toml?" },
      a: { en: "The recipe card: the project's name, its version number, and (later) the libraries it depends on. Open it and read it — it's short!", id: "Kartu resep: nama proyek, nomor versinya, dan (nanti) pustaka-pustaka yang jadi dependensinya. Buka dan baca — pendek kok!" },
    },
    {
      q: { en: "What happens if you type cargo run in a folder that has no Cargo.toml?", id: "Apa yang terjadi jika kamu mengetik cargo run di folder tanpa Cargo.toml?" },
      a: { en: "An error: 'could not find Cargo.toml'. Cargo only works INSIDE a project folder — cd in first!", id: "Muncul error: 'could not find Cargo.toml'. Cargo hanya bekerja DI DALAM folder proyek — cd dulu!" },
    },
  ],

  challenges: [
    {
      text: { en: "Run these commands on the Chromebook: cargo new week1-stats && cd week1-stats", id: "Jalankan perintah ini di Chromebook: cargo new week1-stats && cd week1-stats" },
      hint: { en: "Type it exactly — the && means \"then\". First cargo builds the folder, then you step inside.", id: "Ketik persis — tanda && berarti \"lalu\". Pertama cargo membangun foldernya, lalu kamu masuk ke dalamnya." },
      success: { en: "You're inside week1-stats and can see src/ and Cargo.toml with ls.", id: "Kamu berada di dalam week1-stats dan bisa melihat src/ dan Cargo.toml dengan ls." },
    },
    {
      text: { en: "Open the generated Cargo.toml. What does each section mean? (Discuss with parent)", id: "Buka Cargo.toml yang dihasilkan. Apa arti setiap bagiannya? (Diskusikan dengan orang tua)" },
      hint: { en: "Three sections: package (who), dependencies (what it eats). Read it like a name tag + shopping list.", id: "Tiga bagian: package (siapa), dependencies (makannya apa). Baca seperti name tag + daftar belanja." },
      success: { en: "You can point at the project's name and version and say what they're for.", id: "Kamu bisa menunjuk nama dan versi proyek serta menjelaskan kegunaannya." },
    },
    {
      text: { en: "Put your Week 1 code into src/main.rs. Run cargo run. Same output, professional setup.", id: "Pindahkan kode minggu 1-mu ke src/main.rs. Jalankan cargo run. Keluaran sama, tatanan profesional." },
      hint: { en: "Copy everything from fn main() down. Replace Cargo's hello-world entirely.", id: "Salin semuanya mulai dari fn main() ke bawah. Ganti total hello-world bawaan Cargo." },
      success: { en: "cargo run prints Sparky's stats from inside a real project.", id: "cargo run mencetak stat Sparky dari dalam proyek sungguhan." },
    },
    {
      text: { en: "Create a second project: cargo new week2-portal. Compare the two folder structures.", id: "Buat proyek kedua: cargo new week2-portal. Bandingkan struktur kedua folder itu." },
      hint: { en: "Same skeleton, different name — that's the point. Every project is a tidy clone.", id: "Kerangka sama, nama berbeda — itulah intinya. Setiap proyek adalah klon yang rapi." },
      success: { en: "You can name the three things every Cargo project has.", id: "Kamu bisa menyebutkan tiga hal yang dimiliki setiap proyek Cargo." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "bash: cargo: command not found", id: "bash: cargo: command not found" },
      fix: { en: "Cargo isn't installed (or the terminal just opened before the install finished). Check with cargo --version; if missing, ask your parent to reinstall rustc and cargo.", id: "Cargo belum terpasang (atau terminal terbuka sebelum pemasangan selesai). Periksa dengan cargo --version; jika tidak ada, minta orang tua memasang ulang rustc dan cargo." },
    },
    {
      bug: { en: "error: could not find Cargo.toml in …", id: "error: could not find Cargo.toml in …" },
      fix: { en: "You're standing OUTSIDE the project. cd week1-stats first — cargo run only works inside the project folder.", id: "Kamu berdiri DI LUAR proyek. cd week1-stats dulu — cargo run hanya bekerja di dalam folder proyek." },
    },
    {
      bug: { en: "Edited the code… but nothing changed when running!", id: "Sudah mengubah kode… tetapi tidak ada yang berubah saat dijalankan!" },
      fix: { en: "You probably edited the wrong file. In a Cargo project the ONLY file that matters is src/main.rs — not a main.rs sitting in the top folder.", id: "Kemungkinan kamu mengedit file yang salah. Dalam proyek Cargo, SATU-SATUNYA file yang berpengaruh adalah src/main.rs — bukan main.rs di folder paling atas." },
    },
  ],

  quiz: [
    {
      q: { en: "Which file is a Cargo project's recipe card?", id: "File mana yang menjadi kartu resep proyek Cargo?" },
      options: [
        { en: "main.rs", id: "main.rs" },
        { en: "Cargo.toml", id: "Cargo.toml" },
        { en: "recipe.txt", id: "recipe.txt" },
        { en: "README", id: "README" },
      ],
      answer: 1,
      explain: { en: "Cargo.toml holds the name, version, and dependencies — the project's identity card and shopping list.", id: "Cargo.toml menyimpan nama, versi, dan dependensi — kartu identitas dan daftar belanja proyek." },
    },
    {
      q: { en: "What does cargo run do?", id: "Apa yang dilakukan cargo run?" },
      options: [
        { en: "Only builds", id: "Hanya membangun" },
        { en: "Builds AND runs, in one command", id: "Membangun DAN menjalankan, dalam satu perintah" },
        { en: "Deletes the project", id: "Menghapus proyek" },
        { en: "Uploads to the internet", id: "Mengunggah ke internet" },
      ],
      answer: 1,
      explain: { en: "Two jobs, one command. That's why professionals almost never type rustc by hand.", id: "Dua pekerjaan, satu perintah. Itulah mengapa profesional hampir tidak pernah mengetik rustc manual." },
    },
    {
      q: { en: "In a Cargo project, where does your code live?", id: "Dalam proyek Cargo, di mana kodemu tinggal?" },
      options: [
        { en: "src/main.rs", id: "src/main.rs" },
        { en: "Cargo.toml", id: "Cargo.toml" },
        { en: "code.txt", id: "code.txt" },
        { en: "Anywhere you like", id: "Di mana saja sesukamu" },
      ],
      answer: 0,
      explain: { en: "src/main.rs — every Cargo project, same address. Predictable structure is what makes tools powerful.", id: "src/main.rs — setiap proyek Cargo, alamat yang sama. Struktur yang bisa ditebak itulah yang membuat alat jadi hebat." },
    },
    {
      q: { en: "Choosing Cargo over loose files is an example of…", id: "Memilih Cargo daripada file lepas adalah contoh dari…" },
      options: [
        { en: "Decomposition", id: "Dekomposisi" },
        { en: "Tool selection", id: "Pemilihan alat" },
        { en: "Debugging", id: "Debugging" },
        { en: "Pattern recognition", id: "Pengenalan pola" },
      ],
      answer: 1,
      explain: { en: "Right tool, on purpose, for the job. That's this week's thinking skill — and a life skill too.", id: "Alat yang tepat, dengan sengaja, untuk tugasnya. Itulah keterampilan berpikir minggu ini — sekaligus keterampilan hidup." },
    },
  ],

  reflect: [
    { prompt: { en: "Which tool did you pick on purpose today, and why was it the right one?", id: "Alat apa yang kamu pilih dengan sengaja hari ini, dan mengapa itu yang tepat?" } },
    { prompt: { en: "Draw (or describe) the folder tree of a Cargo project from memory.", id: "Gambar (atau jelaskan) pohon folder proyek Cargo dari ingatanmu." } },
  ],

  parentCorner: {
    prep: [
      { en: "Before class: rustc and cargo installed, and test cargo new + cargo run once yourself.", id: "Sebelum kelas: rustc dan cargo terpasang, dan uji sendiri sekali cargo new + cargo run." },
      { en: "Draw the folder tree on paper so kids can point at it while running commands.", id: "Gambar pohon foldernya di kertas agar anak bisa menunjuknya sambil menjalankan perintah." },
    ],
    say: [
      { en: "\"Real engineers keep tidy workspaces — and they have robots do the tidying.\"", id: "\"Insinyur sungguhan menjaga ruang kerja yang rapi — dan mereka menyuruh robot yang merapikan.\"" },
      { en: "\"One command built ALL of this. Count the folders Cargo made.\"", id: "\"Satu perintah membangun SEMUA ini. Hitung folder yang dibuat Cargo.\"" },
      { en: "\"From today, we build like professionals: cargo new, code, cargo run.\"", id: "\"Mulai hari ini kita membangun seperti profesional: cargo new, koding, cargo run.\"" },
    ],
    ifStuck: {
      en: "Terminal trouble is usually location trouble. Draw the folder tree, put a toy rocket on the current folder, and move it while you type each cd. 'Where is the rocket standing?' answers most 'command not found' mysteries.",
      id: "Masalah terminal biasanya masalah lokasi. Gambar pohon foldernya, taruh mainan roket di folder saat ini, dan pindahkan roketnya sambil mengetik setiap cd. \"Di mana roket sedang berdiri?\" menjawab sebagian besar misteri 'command not found'.",
    },
  },
};
