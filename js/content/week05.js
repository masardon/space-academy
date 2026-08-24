// Week 5 — Design Your Character Creator (Structs)
LESSONS[5] = {
  bigIdea: {
    en: {
      title: "A Struct Is a Blueprint, Not the Thing Itself",
      body: "struct Cadet is not a cadet. It's the CARD TEMPLATE: a decision that every cadet must have a name, hp, speed, and species. The struct decides the FIELDS — each cadet you build fills in its own VALUES.\n\nOne blueprint, unlimited copies. Change the blueprint and every future cadet must follow the new rules.",
    },
    id: {
      title: "Struct Adalah Cetak Biru, Bukan Benda Itu Sendiri",
      body: "struct Cadet bukanlah seorang kadet. Itu adalah TEMPLATE KARTU: sebuah keputusan bahwa setiap kadet harus punya name, hp, speed, dan species. Struct menentukan FIELD-nya — setiap kadet yang kamu bangun mengisi NILAI-nya sendiri.\n\nSatu cetak biru, salinan tanpa batas. Ubah cetak birunya dan semua kadet berikutnya harus mengikuti aturan baru.",
    },
  },

  wordWall: [
    { term: "struct", en: "A blueprint that groups related fields together.", id: "Cetak biru yang mengelompokkan field yang berhubungan." },
    { term: "field", en: "One labeled slot in a struct: name, hp, speed…", id: "Satu slot berlabel dalam struct: name, hp, speed…" },
    { term: "instance", en: "One real cadet built from the blueprint — cadet1, cadet2.", id: "Satu kadet nyata yang dibangun dari cetak biru — cadet1, cadet2." },
    { term: "impl", en: "The garage where methods live — what every cadet CAN DO.", id: "Garasi tempat method tinggal — apa yang BISA dilakukan setiap kadet." },
    { term: "method", en: "A function attached to a struct, called with a dot: cadet1.introduce().", id: "Fungsi yang menempel pada struct, dipanggil dengan titik: cadet1.introduce()." },
    { term: "&self", en: "\"Whichever cadet I was called on.\" Inside cadet1.introduce(), self IS cadet1.", id: "\"Kadet mana yang dipanggil.\" Di dalam cadet1.introduce(), self ADALAH cadet1." },
  ],

  thinkSkill: {
    name: "Data Modeling",
    en: {
      hook: "Before you build a thing, you decide what it's MADE OF.",
      realLife: "Design a collectible card game: every card needs a name, a power number, and an element. You're not drawing any single card — you're deciding what EVERY card must have. That decision is data modeling.",
      codeLink: "struct Cadet is the card template: every cadet has name, hp, speed, species. The struct fixes the fields; each instance fills its own values. Good modelers ask: \"what does every one of these things HAVE, and what can every one of them DO?\"",
      tryIt: "Design a creature card for your pet or favorite animal: list its 4 fields (and what type each one is).",
    },
    id: {
      hook: "Sebelum membangun sesuatu, kamu memutuskan bahan penyusunnya.",
      realLife: "Mendesain game kartu koleksi: setiap kartu butuh nama, angka kekuatan, dan elemen. Kamu tidak menggambar satu kartu pun — kamu memutuskan apa yang DIMILIKI setiap kartu. Keputusan itulah pemodelan data.",
      codeLink: "struct Cadet adalah template kartunya: setiap kadet punya name, hp, speed, species. Struct menentukan field-nya; setiap instance mengisi nilainya sendiri. Pemodel yang baik bertanya: \"apa yang DIMILIKI semua benda ini, dan apa yang BISA dilakukan semua benda ini?\"",
      tryIt: "Rancang kartu makhluk untuk hewan peliharaanmu atau hewan favoritmu: tulis 4 field-nya (beserta tipe masing-masing).",
    },
  },

  codeWalkthrough: [
    { line: "struct Cadet {", en: "The blueprint begins. Everything until the closing } is a field declaration.", id: "Cetak biru dimulai. Semua sampai penutup } adalah deklarasi field." },
    { line: "name: String,", en: "A field = label + type. This one holds owned text. Note the comma — fields are a list!", id: "Field = label + tipe. Yang ini menyimpan teks milik sendiri. Perhatikan koma — field adalah sebuah daftar!" },
    { line: "impl Cadet {", en: "Short for \"implement\" — the garage where we attach abilities to every cadet.", id: "Singkatan dari \"implement\" — garasi tempat kita memasang kemampuan pada setiap kadet." },
    { line: "fn introduce(&self) {", en: "A method. &self means \"the cadet this was called on\" — so cadet1 and cadet2 introduce THEMSELVES.", id: "Sebuah method. &self berarti \"kadet yang dipanggil\" — jadi cadet1 dan cadet2 memperkenalkan DIRI MEREKA SENDIRI." },
    { line: "fn is_fresh(&self) -> bool {", en: "A method that answers a question: it promises to hand back true or false.", id: "Method yang menjawab pertanyaan: ia berjanji mengembalikan true atau false." },
    { line: "let cadet1 = Cadet { name: String::from(\"Luna\"), ... };", en: "Building an instance. The blueprint demands EVERY field — forget one and the compiler stops you.", id: "Membangun sebuah instance. Cetak biru menuntut SETIAP field — lupa satu, compiler menghentikanmu." },
    { line: "cadet1.introduce();", en: "Calling a method uses the dot: \"hey cadet1, introduce yourself!\". Inside the method, self becomes cadet1.", id: "Memanggil method memakai titik: \"hei cadet1, perkenalkan dirimu!\". Di dalam method, self menjadi cadet1." },
    { line: "println!(\"{}\", cadet2.battle_ready());", en: "Same method, different cadet, different answer — each instance carries its own values.", id: "Method yang sama, kadet berbeda, jawaban berbeda — setiap instance membawa nilainya sendiri." },
  ],

  predictions: [
    {
      q: { en: "Add a field power: u32 to the struct, but forget to give it to cadet2. What happens?", id: "Tambahkan field power: u32 ke struct, tetapi lupa memberikannya ke cadet2. Apa yang terjadi?" },
      a: { en: "The compiler refuses to build cadet2: \"missing field power\". Blueprints are strict — every instance must fill every field. That strictness saves you from half-built characters.", id: "Compiler menolak membangun cadet2: \"missing field power\". Cetak biru itu ketat — setiap instance harus mengisi setiap field. Ketatnya menyelamatkanmu dari karakter setengah jadi." },
    },
    {
      q: { en: "Change is_fresh from hp >= 100 to hp > 50. What happens to Zyx (hp 85)?", id: "Ubah is_fresh dari hp >= 100 menjadi hp > 50. Apa yang terjadi pada Zyx (hp 85)?" },
      a: { en: "Zyx suddenly counts as fresh! One comparison changed, and every cadet's answer changed with it — the logic lives in ONE place.", id: "Zyx tiba-tiba dihitung segar! Satu perbandingan berubah, dan jawaban semua kadet ikut berubah — logikanya hidup di SATU tempat." },
    },
    {
      q: { en: "After the battle, we write cadet1.hp = 20;. Why does Rust complain?", id: "Setelah pertempuran, kita menulis cadet1.hp = 20;. Mengapa Rust protes?" },
      a: { en: "cadet1 was built with let — frozen! To repair a cadet you must build it with let mut cadet1 = … Changeable needs permission.", id: "cadet1 dibangun dengan let — membeku! Untuk memperbaiki kadet kamu harus membangunnya dengan let mut cadet1 = …. Yang bisa berubah butuh izin." },
    },
  ],

  challenges: [
    {
      text: { en: "Add a new field: power: u32 to the struct. Update both cadets to include it.", id: "Tambahkan field baru: power: u32 ke struct. Perbarui kedua kadet agar menyertainya." },
      hint: { en: "Three places remember: the struct, cadet1, cadet2. The compiler will count them for you.", id: "Ingat tiga tempat: struct-nya, cadet1, cadet2. Compiler akan menghitungnya untukmu." },
      success: { en: "Program runs with the new field on both cadets.", id: "Program berjalan dengan field baru di kedua kadet." },
    },
    {
      text: { en: "Write a new method: fn damage(&mut self, amount: u32) that decreases HP.", id: "Tulis method baru: fn damage(&mut self, amount: u32) yang mengurangi HP." },
      hint: { en: "Inside: self.hp -= amount; — and remember the instance needs let mut to take damage!", id: "Di dalamnya: self.hp -= amount; — dan ingat, instance-nya butuh let mut agar bisa terluka!" },
      success: { en: "cadet1.damage(30); lowers the printed HP by 30.", id: "cadet1.damage(30); menurunkan HP yang tercetak sebesar 30." },
    },
    {
      text: { en: "Create a third cadet with your own name and species. Make them introduce themselves.", id: "Buat kadet ketiga dengan nama dan spesiesmu sendiri. Suruh mereka memperkenalkan diri." },
      hint: { en: "Copy a let cadet… block, rename it, fill every field, then call introduce().", id: "Salin blok let cadet…, ganti namanya, isi setiap field, lalu panggil introduce()." },
      success: { en: "Three cadets introduce themselves, each with their own stats.", id: "Tiga kadet memperkenalkan diri, masing-masing dengan statnya sendiri." },
    },
    {
      text: { en: "Change is_fresh to check hp > 50 instead of >= 100. What changes?", id: "Ubah is_fresh agar memeriksa hp > 50 alih-alih >= 100. Apa yang berubah?" },
      hint: { en: "Only ONE line of the blueprint's logic changes — watch every cadet's answer.", id: "Hanya SATU baris logika cetak biru yang berubah — amati jawaban semua kadet." },
      success: { en: "You can say which cadets flipped from not-fresh to fresh, and why.", id: "Kamu bisa menyebutkan kadet mana yang berubah dari tidak-segar menjadi segar, dan mengapa." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "let cadet3 = Cadet { name: String::from(\"Rio\") }; — \"missing field\"", id: "let cadet3 = Cadet { name: String::from(\"Rio\") }; — \"missing field\"" },
      fix: { en: "The blueprint demands EVERY field. hp, speed and species are missing — fill them all in.", id: "Cetak biru menuntut SETIAP field. hp, speed, dan species hilang — isi semuanya." },
    },
    {
      bug: { en: "cadet1.hp = 50; — \"cannot assign: not mutable\"", id: "cadet1.hp = 50; — \"cannot assign: not mutable\"" },
      fix: { en: "Frozen instance! Build it as let mut cadet1 = … when you plan to change it later.", id: "Instance beku! Bangun dengan let mut cadet1 = … jika kamu berencana mengubahnya nanti." },
    },
    {
      bug: { en: "fn introduce() { println!(\"{}\", self.name); } — \"cannot find self\"", id: "fn introduce() { println!(\"{}\", self.name); } — \"cannot find self\"" },
      fix: { en: "Methods need &self as their first parameter — that's HOW the method knows which cadet it belongs to.", id: "Method butuh &self sebagai parameter pertamanya — begitulah cara method tahu kadet siapa miliknya." },
    },
  ],

  quiz: [
    {
      q: { en: "What is a struct, really?", id: "Sebenarnya, apa itu struct?" },
      options: [
        { en: "A real cadet living in the computer", id: "Kadet nyata yang hidup di komputer" },
        { en: "A blueprint deciding what fields every instance must have", id: "Cetak biru yang menentukan field yang wajib dimiliki setiap instance" },
        { en: "A kind of loop", id: "Sejenis loop" },
        { en: "A comment for organizing code", id: "Komentar untuk merapikan kode" },
      ],
      answer: 1,
      explain: { en: "The struct is the card TEMPLATE. Instances are printed cards. Blueprint first, copies after.", id: "Struct adalah TEMPLATE kartunya. Instance adalah kartu-kartu tercetak. Cetak biru dulu, salinan belakangan." },
    },
    {
      q: { en: "Inside cadet2.introduce(), what is &self?", id: "Di dalam cadet2.introduce(), apa itu &self?" },
      options: [
        { en: "Every cadet at once", id: "Semua kadet sekaligus" },
        { en: "cadet2 — the instance the method was called on", id: "cadet2 — instance yang dipanggil methodnya" },
        { en: "The struct's blueprint", id: "Cetak biru struct-nya" },
        { en: "A new empty cadet", id: "Kadet kosong yang baru" },
      ],
      answer: 1,
      explain: { en: "self is \"whoever I was called on\". The same method code runs for every cadet, but self points to the one speaking.", id: "self adalah \"siapa pun yang dipanggil\". Kode method yang sama berjalan untuk setiap kadet, tetapi self menunjuk pada yang sedang bicara." },
    },
    {
      q: { en: "Two instances built from the same struct…", id: "Dua instance yang dibangun dari struct yang sama…" },
      options: [
        { en: "Share the same values", id: "Berbagi nilai yang sama" },
        { en: "Have the same fields but their own values", id: "Punya field yang sama tetapi nilai masing-masing" },
        { en: "Cannot exist together", id: "Tidak bisa bersama-sama" },
        { en: "Automatically change when the other changes", id: "Otomatis berubah saat yang lain berubah" },
      ],
      answer: 1,
      explain: { en: "Same shape, separate lives. cadet1's hp is cadet1's business.", id: "Bentuk sama, hidup terpisah. hp milik cadet1 adalah urusan cadet1." },
    },
    {
      q: { en: "You add a field to the struct. What must you update?", id: "Kamu menambah field ke struct. Apa yang harus diperbarui?" },
      options: [
        { en: "Nothing — instances adapt", id: "Tidak ada — instance menyesuaikan sendiri" },
        { en: "Every place that BUILDS an instance", id: "Setiap tempat yang MEMBANGUN instance" },
        { en: "Only the first instance", id: "Hanya instance pertama" },
        { en: "The impl block only", id: "Hanya blok impl" },
      ],
      answer: 1,
      explain: { en: "The compiler will list every incomplete instance for you — blueprints are strict on purpose.", id: "Compiler akan mendaftar setiap instance yang belum lengkap — cetak biru memang sengaja ketat." },
    },
  ],

  reflect: [
    { prompt: { en: "If you made a game character struct, what fields would it have? List them.", id: "Jika kamu membuat struct karakter game, field apa saja yang dimilikinya? Sebutkan." } },
    { prompt: { en: "Explain \"blueprint vs instance\" to your rubber duck using a cookie cutter.", id: "Jelaskan \"cetak biru vs instance\" kepada bebek karetmu memakai cetakan kuki." } },
  ],

  parentCorner: {
    prep: [
      { en: "Cut two paper 'cards' and one template card. The template lists field names; the cards get values.", id: "Potong dua 'kartu' kertas dan satu kartu template. Template memuat nama field; kartu-kartu diisi nilai." },
      { en: "Run the starter once so both introductions print.", id: "Jalankan kode awal sekali agar kedua perkenalan tercetak." },
    ],
    say: [
      { en: "\"The struct is the card DESIGN. Each cadet is a printed card.\"", id: "\"Struct adalah DESAIN kartunya. Setiap kadet adalah kartu yang tercetak.\"" },
      { en: "\"What can every cadet DO? That's the impl block — the ability list.\"", id: "\"Apa yang BISA dilakukan setiap kadet? Itulah blok impl — daftar kemampuannya.\"" },
      { en: "\"The compiler just protected us from a half-built cadet. Thank it!\"", id: "\"Compiler baru saja melindungi kita dari kadet setengah jadi. Ucapkan terima kasih padanya!\"" },
    ],
    ifStuck: {
      en: "Go hands-on: fill the paper template together, then copy it onto both cards with different values. Point at the paper while reading the struct, point at the cards while reading main().",
      id: "Gunakan tangan: isi template kertas bersama-sama, lalu salin ke kedua kartu dengan nilai berbeda. Tunjuk kertas saat membaca struct, tunjuk kartu-kartu saat membaca main().",
    },
  },
};
