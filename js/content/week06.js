// Week 6 — The Inventory System (Vectors)
LESSONS[6] = {
  bigIdea: {
    en: {
      title: "A Vector Is a Numbered Shopping List",
      body: "A Vec is a list that GROWS and SHRINKS. push adds to the end, remove takes one out and the rest shuffle up to fill the gap. Every item has a position number — an index.\n\nOne surprise to rule them all: computers start counting at ZERO. The first item is item 0. The last item is always len − 1.",
    },
    id: {
      title: "Vector Adalah Daftar Belanja Bernomor",
      body: "Vec adalah daftar yang BERTAMBAH dan BERKURANG. push menambah di ujung, remove mengambil satu dan sisanya bergeser mengisi kekosongan. Setiap item punya nomor posisi — indeks.\n\nSatu kejutan yang mengatur semuanya: komputer mulai menghitung dari NOL. Item pertama adalah item 0. Item terakhir selalu len − 1.",
    },
  },

  wordWall: [
    { term: "Vec<T>", en: "A growing list. The T is what's inside: Vec<String> holds text.", id: "Daftar yang bisa bertambah. T adalah isinya: Vec<String> menyimpan teks." },
    { term: "push", en: "Add an item to the END of the list.", id: "Menambah item di UJUNG daftar." },
    { term: "remove", en: "Take the item at an index OUT — everything after shifts up.", id: "Mengambil item pada suatu indeks — semua sesudahnya bergeser naik." },
    { term: "index", en: "An item's position number. Starts at 0!", id: "Nomor posisi sebuah item. Dimulai dari 0!" },
    { term: "enumerate", en: "Pairs every item with its index while looping.", id: "Memasangkan setiap item dengan indeksnya saat looping." },
    { term: "len", en: "How many items are in the list right now.", id: "Berapa banyak item dalam daftar saat ini." },
  ],

  thinkSkill: {
    name: "Sequencing",
    en: {
      hook: "Order is information.",
      realLife: "A bus queue is first-come-first-served. When someone leaves the middle of the queue, everyone behind shuffles forward — nobody keeps their old spot. One removal changes every position after it.",
      codeLink: "Vectors work exactly like that queue. push appends at the back; remove(1) takes the SECOND item and slides the rest up. After any removal, the later indexes all change — sequencing means tracking what happens to order, step by step.",
      tryIt: "Line up four toys. Say \"remove index 1\" — which toy leaves? Recount the indexes out loud.",
    },
    id: {
      hook: "Urutan adalah informasi.",
      realLife: "Antrean bus berdasarkan siapa-dulu-datang. Ketika seseorang keluar dari tengah antrean, semua di belakangnya bergeser maju — tidak ada yang mempertahankan posisi lamanya. Satu penghapusan mengubah semua posisi setelahnya.",
      codeLink: "Vector bekerja persis seperti antrean itu. push menambah di belakang; remove(1) mengambil item KEDUA dan menggeser sisanya ke atas. Setelah penghapusan apa pun, indeks-indeks setelahnya berubah — sequencing berarti melacak apa yang terjadi pada urutan, langkah demi langkah.",
      tryIt: "Bariskan empat mainan. Ucapkan \"hapus indeks 1\" — mainan mana yang keluar? Hitung ulang indeksnya sambil bersuara.",
    },
  },

  codeWalkthrough: [
    { line: "let mut inventory: Vec<String> = Vec::new();", en: "An empty list. The : Vec<String> says \"only text goes in this list\". mut is the permission slip to change it later.", id: "Daftar kosong. : Vec<String> berarti \"hanya teks yang boleh masuk\". mut adalah izin untuk mengubahnya nanti." },
    { line: "inventory.push(String::from(\"Energy Cell\"));", en: "push = join the END of the line. The locker now holds one item, at index 0.", id: "push = masuk ke UJUNG barisan. Lemari kini berisi satu item, di indeks 0." },
    { line: "for (index, item) in inventory.iter().enumerate()", en: "enumerate hands us PAIRS: each item together with its position number.", id: "enumerate menyerahkan PASANGAN: setiap item beserta nomor posisinya." },
    { line: "println!(\"  {}. {}\", index + 1, item);", en: "Humans count from 1, computers from 0 — the +1 is just for the display.", id: "Manusia menghitung dari 1, komputer dari 0 — +1 itu hanya untuk tampilan." },
    { line: "inventory.remove(1);", en: "Takes the item at index 1 (the SECOND one — Repair Kit) out. Data Chip slides from index 2 down to 1.", id: "Mengambil item di indeks 1 (yang KEDUA — Repair Kit). Data Chip bergeser dari indeks 2 turun ke 1." },
    { line: "println!(\"\\nTotal items: {}\", inventory.len());", en: "len counts what's left: 3 items pushed, 1 removed, 2 remain.", id: "len menghitung sisanya: 3 item dimasukkan, 1 dihapus, tersisa 2." },
  ],

  predictions: [
    {
      q: { en: "We call inventory.remove(1) TWICE in a row. What leaves the locker?", id: "Kita memanggil inventory.remove(1) DUA kali berturut-turut. Apa yang keluar dari lemari?" },
      a: { en: "First: Repair Kit (index 1). Then: Data Chip — because after the first removal it SLID DOWN into index 1! Removing the same index twice removes two different items.", id: "Pertama: Repair Kit (indeks 1). Lalu: Data Chip — karena setelah penghapusan pertama ia BERGESER ke indeks 1! Menghapus indeks yang sama dua kali menghapus dua item yang berbeda." },
    },
    {
      q: { en: "Push \"Shield Generator\" after the three items. What is inventory.len()?", id: "Push \"Shield Generator\" setelah tiga item. Berapa inventory.len()?" },
      a: { en: "4. Push always adds at the END — Shield Generator's index is 3 (even though it's the 4th item!).", id: "4. Push selalu menambah di UJUNG — indeks Shield Generator adalah 3 (padahal itu item keempat!)." },
    },
    {
      q: { en: "What if we try inventory.remove(99)?", id: "Bagaimana jika kita mencoba inventory.remove(99)?" },
      a: { en: "The program PANICS — a crash with the message 'removal index (is 99) should be < len'. Rust refuses to guess; there is no item 99, so it stops loudly instead of quietly breaking.", id: "Programnya PANIK — crash dengan pesan 'removal index (is 99) should be < len'. Rust menolak menebak; tidak ada item 99, jadi ia berhenti dengan keras alih-alih diam-diam rusak." },
    },
  ],

  challenges: [
    {
      text: { en: "Add three more items to the inventory. What does the numbered list look like?", id: "Tambahkan tiga item lagi ke inventaris. Seperti apa daftar bernomornya?" },
      hint: { en: "Copy a push line, change the text. They'll queue up at the end.", id: "Salin satu baris push, ganti teksnya. Semuanya mengantre di ujung." },
      success: { en: "Six items print, numbered 1-6, in the order you pushed them.", id: "Enam item tercetak, bernomor 1-6, sesuai urutan push-mu." },
    },
    {
      text: { en: "Remove the FIRST item (index 0). Watch the others shift up.", id: "Hapus item PERTAMA (indeks 0). Amati yang lain bergeser naik." },
      hint: { en: "The first item is index 0, not 1 — computers count from zero.", id: "Item pertama itu indeks 0, bukan 1 — komputer menghitung dari nol." },
      success: { en: "Energy Cell is gone and every other item moved up one index.", id: "Energy Cell hilang dan setiap item lain naik satu indeks." },
    },
    {
      text: { en: "Create a second vector called shared_locker. Push an item to inventory. Does shared_locker change?", id: "Buat vector kedua bernama shared_locker. Push satu item ke inventory. Apakah shared_locker ikut berubah?" },
      hint: { en: "Each vector owns its own list — pushing to one doesn't whisper to the other.", id: "Setiap vector memiliki daftarnya sendiri — push ke satu vector tidak membisikkan apa pun ke yang lain." },
      success: { en: "shared_locker stays empty: two lists, two separate owners.", id: "shared_locker tetap kosong: dua daftar, dua pemilik terpisah." },
    },
    {
      text: { en: "Try removing the word mut from let mut inventory. Watch the compiler complain. That's ownership talking!", id: "Coba hapus kata mut dari let mut inventory. Amati compiler protes. Itulah kepemilikan berbicara!" },
      hint: { en: "push and remove both CHANGE the list — frozen lists can't be changed.", id: "push dan remove sama-sama MENGUBAH daftar — daftar beku tidak bisa diubah." },
      success: { en: "You can explain why the compiler says 'cannot borrow as mutable'.", id: "Kamu bisa menjelaskan mengapa compiler berkata 'cannot borrow as mutable'." },
    },
  ],

  bugHunt: [
    {
      bug: { en: "inventory.push(\"Energy Cell\"); — \"expected String, found &str\"", id: "inventory.push(\"Energy Cell\"); — \"expected String, found &str\"" },
      fix: { en: "The list stores owned Strings. Hand it one: push(String::from(\"Energy Cell\")) or push(\"Energy Cell\".to_string()).", id: "Daftarnya menyimpan String milik sendiri. Serahkan: push(String::from(\"Energy Cell\")) atau push(\"Energy Cell\".to_string())." },
    },
    {
      bug: { en: "let last = inventory[5]; — with only 3 items — PANIC!", id: "let last = inventory[5]; — dengan hanya 3 item — PANIC!" },
      fix: { en: "Index out of bounds! Valid indexes are 0 to len-1. Check inventory.len() before reaching past the end.", id: "Indeks di luar batas! Indeks yang sah adalah 0 sampai len-1. Periksa inventory.len() sebelum meraih melewati ujung." },
    },
    {
      bug: { en: "let inventory = Vec::new(); inventory.push(…); — \"cannot borrow as mutable\"", id: "let inventory = Vec::new(); inventory.push(…); — \"cannot borrow as mutable\"" },
      fix: { en: "You froze the list with let. Give it the change-permission slip: let mut inventory.", id: "Kamu membekukan daftarnya dengan let. Berikan izin berubah: let mut inventory." },
    },
  ],

  quiz: [
    {
      q: { en: "What index does the FIRST item in a vector have?", id: "Indeks berapa yang dimiliki item PERTAMA dalam vector?" },
      options: [
        { en: "1", id: "1" },
        { en: "0", id: "0" },
        { en: "-1", id: "-1" },
        { en: "It has no index", id: "Tidak punya indeks" },
      ],
      answer: 1,
      explain: { en: "Zero! Computers start counting at 0. That's why the display code adds +1 for humans.", id: "Nol! Komputer mulai menghitung dari 0. Itulah mengapa kode tampilan menambah +1 untuk manusia." },
    },
    {
      q: { en: "What does push do?", id: "Apa yang dilakukan push?" },
      options: [
        { en: "Adds an item to the end", id: "Menambah item di ujung" },
        { en: "Adds an item to the start", id: "Menambah item di awal" },
        { en: "Deletes the last item", id: "Menghapus item terakhir" },
        { en: "Sorts the list", id: "Mengurutkan daftar" },
      ],
      answer: 0,
      explain: { en: "push = join the back of the queue. The new item's index is always len before the push.", id: "push = masuk ke belakang antrean. Indeks item baru selalu sebesar len sebelum push." },
    },
    {
      q: { en: "inventory.remove(1) removes which item?", id: "inventory.remove(1) menghapus item mana?" },
      options: [
        { en: "The first one", id: "Yang pertama" },
        { en: "The second one", id: "Yang kedua" },
        { en: "The one called \"1\"", id: "Yang bernama \"1\"" },
        { en: "All of them", id: "Semuanya" },
      ],
      answer: 1,
      explain: { en: "Index 1 = the second item. And everyone after it shuffles forward — order shifts!", id: "Indeks 1 = item kedua. Dan semua yang di belakangnya bergeser maju — urutan berubah!" },
    },
    {
      q: { en: "Why does the list need mut?", id: "Mengapa daftarnya butuh mut?" },
      options: [
        { en: "To make it print faster", id: "Agar mencetak lebih cepat" },
        { en: "Because push and remove CHANGE it", id: "Karena push dan remove MENGUBAHNYA" },
        { en: "All vectors need mut", id: "Semua vector butuh mut" },
        { en: "It doesn't — mut is optional decoration", id: "Tidak perlu — mut hiasan opsional" },
      ],
      answer: 1,
      explain: { en: "Frozen lists can't change. mut is the permission slip — Rust makes you SAY it before you may modify.", id: "Daftar beku tidak bisa berubah. mut adalah slip izinnya — Rust menyuruhmu MENGUCAPKannya sebelum boleh memodifikasi." },
    },
  ],

  reflect: [
    { prompt: { en: "Name three ordered lists from real life. What happens in each when one item leaves?", id: "Sebutkan tiga daftar berurutan dari kehidupan nyata. Apa yang terjadi pada masing-masing saat satu item keluar?" } },
    { prompt: { en: "Counting from 0 felt weird today. Explain to your duck why computers do it.", id: "Menghitung dari 0 terasa aneh hari ini. Jelaskan kepada bebekmu mengapa komputer melakukannya." } },
  ],

  parentCorner: {
    prep: [
      { en: "Four sticky notes in a row on the table = the vector. Write item names on them.", id: "Empat sticky note berjajar di meja = vector-nya. Tulis nama item di masing-masing." },
      { en: "Run the starter once so both inventory printouts show.", id: "Jalankan kode awal sekali agar kedua tampilan inventaris muncul." },
    ],
    say: [
      { en: "\"The first item is item zero. Say it with me: zero, one, two…\"", id: "\"Item pertama adalah item nol. Ucapkan bersamaku: nol, satu, dua…\"" },
      { en: "\"Watch what happens to the queue when the middle person leaves.\"", id: "\"Perhatikan yang terjadi pada antrean saat orang di tengah pergi.\"" },
      { en: "\"mut is you signing the permission slip to change the list.\"", id: "\"mut adalah kamu menandatangani izin untuk mengubah daftar.\"" },
    ],
    ifStuck: {
      en: "Play it physically: peel off sticky note number 1 (the second item) and slide the rest left. Recount indexes together after every move. Bodies get indexing faster than eyes do.",
      id: "Peragakan secara fisik: lepas sticky note nomor 1 (item kedua) dan geser sisanya ke kiri. Hitung ulang indeks bersama setiap langkah. Tubuh menangkap konsep indeks lebih cepat daripada mata.",
    },
  },
};
