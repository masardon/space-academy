// Week 3 — The Repeating Door (Loops)
LESSONS[3] = {
  bigIdea: {
    title: { en: "A Loop Is a Robot That Repeats", id: "Loop Adalah Robot yang Mengulang" },
    body: { en: "Instead of writing \"print a star\" five times, you tell a robot: \"do print-a-star, five rounds.\" You say WHAT to repeat and HOW MANY times — the robot handles the boredom.\n\n1..=5 means \"1 up to and including 5\" — five rounds. The two dots with an equals sign are the difference between 5 stars and 4.", id: "Alih-alih menulis \"cetak bintang\" lima kali, kamu memerintahkan robot: \"lakukan cetak-bintang, lima putaran.\" Kamu bilang APA yang diulang dan BERAPA kali — robot yang menanggung kebosanannya.\n\n1..=5 berarti \"1 sampai dengan 5\" — lima putaran. Dua titik dengan tanda sama dengan itulah bedanya antara 5 bintang dan 4." }
  },

  wordWall: [
    { term: "for loop", en: "Repeats code a known number of times: for _ in 1..=5.", id: "Mengulang kode sebanyak jumlah yang diketahui: for _ in 1..=5." },
    { term: "range", en: "How many rounds: 1..=5 counts 1,2,3,4,5. 1..5 stops at 4!", id: "Berapa banyak putaran: 1..=5 menghitung 1,2,3,4,5. 1..5 berhenti di 4!" },
    { term: "while loop", en: "Repeats as long as a condition stays true.", id: "Mengulang selama sebuah kondisi masih true." },
    { term: "_ (underscore)", en: "\"I don't care which round I'm on.\" Used when you don't need the counter.", id: "\"Saya tidak peduli putaran ke berapa.\" Dipakai saat kamu tidak butuh hitungannya." },
    { term: "nested loop", en: "A loop inside a loop — rows and columns, like a grid.", id: "Loop di dalam loop — baris dan kolom, seperti kisi-kisi." },
    { term: "print! vs println!", en: "print! stays on the same line. println! jumps to a new line after printing.", id: "print! tetap di baris yang sama. println! pindah ke baris baru setelah mencetak." },
  ],

  thinkSkill: {
    name: "Pattern Recognition",
    hook: { en: "Your brain is a pattern-finding machine — loops are what patterns look like in code.", id: "Otakmu adalah mesin pencari pola — loop adalah wujud pola di dalam kode." },
    realLife: { en: "Days of the week. Choruses in songs. Stairs on a staircase. You never ask \"which step comes next?\" because the pattern already told you. Spotting WHAT repeats — and HOW MANY times — is pattern recognition.", id: "Hari dalam seminggu. Reff lagu. Anak tangga. Kamu tidak pernah bertanya \"anak tangga berikutnya seperti apa?\" karena polanya sudah memberitahumu. Menemukan APA yang berulang — dan BERAPA kali — itulah pengenalan pola." },
    codeLink: { en: "When code repeats, a programmer never types it twice. Spot the pattern: \"print a star\" happens 5 times → wrap it in for _ in 1..=5. The repeating part goes INSIDE the loop; anything that changes each round (like the row number) gets its own pocket.", id: "Saat kode berulang, programmer tidak pernah mengetiknya dua kali. Temukan polanya: \"cetak bintang\" terjadi 5 kali → bungkus dengan for _ in 1..=5. Bagian yang berulang masuk KE DALAM loop; apa pun yang berubah setiap putaran (seperti nomor baris) mendapat kantongnya sendiri." },
    tryIt: { en: "Find three things around you that repeat. For each, say: what repeats, and how many times?", id: "Temukan tiga hal di sekitarmu yang berulang. Untuk masing-masing, katakan: apa yang berulang, dan berapa kali?" }
  },

  codeWalkthrough: [
    { line: "for _ in 1..=5 {", en: "Five rounds. The _ means \"I don't care which round\" — we just want five stars, not to know the round number.", id: "Lima putaran. Tanda _ berarti \"aku tidak peduli putaran ke berapa\" — kita hanya ingin lima bintang, bukan tahu nomor putarannya." },
    { line: "print!(\"⭐ \");", en: "print! (no ln) prints and STAYS on the same line — that's why the stars sit side by side.", id: "print! (tanpa ln) mencetak dan TETAP di baris yang sama — itu sebabnya bintang-bintang berjajar." },
    { line: "println!();", en: "Empty println! just moves to the next line — like pressing Enter.", id: "println! kosong hanya pindah ke baris berikutnya — seperti menekan Enter." },
    { line: "for number in 1..=5 {", en: "This time we DO care: number is 1 in round one, 2 in round two, and so on.", id: "Kali ini kita PEDULI: number bernilai 1 di putaran pertama, 2 di putaran kedua, dan seterusnya." },
    { line: "print!(\"{} \", number);", en: "Prints the round number first — that's the label at the start of each row.", id: "Mencetak nomor putaran lebih dulu — itulah label di awal setiap baris." },
    { line: "for _ in 0..number {", en: "A loop INSIDE a loop! Round one prints 0 rockets, round five prints 4 — the row grows with the number.", id: "Loop DI DALAM loop! Putaran pertama mencetak 0 roket, putaran kelima mencetak 4 — barisnya memanjang mengikuti number." },
    { line: "println!(\"\\nLoop complete! The robot knocked on {} doors.\", 5);", en: "\\n means \"new line first\". The {} gets filled with 5.", id: "\\n berarti \"pindah baris dulu\". Tanda {} diisi dengan 5." },
  ],

  predictions: [
    {
      q: { en: "Change the star loop from 1..=5 to 1..=10. What happens?", id: "Ubah loop bintang dari 1..=5 menjadi 1..=10. Apa yang terjadi?" },
      a: { en: "Ten stars in one row. One number changed, and the whole pattern stretched — that's the power of loops.", id: "Sepuluh bintang dalam satu baris. Satu angka berubah, dan seluruh pola ikut memanjang — itulah kekuatan loop." },
    },
    {
      q: { en: "Change the rocket loop from 0..number to 0..3. What happens to the rows?", id: "Ubah loop roket dari 0..number menjadi 0..3. Apa yang terjadi pada baris-barisnya?" },
      a: { en: "Every row after the first prints exactly 3 rockets. The rows stop growing because the inner loop forgot how to count with number.", id: "Setiap baris setelah baris pertama mencetak tepat 3 roket. Barisnya berhenti bertambah karena loop dalam lupa cara menghitung dengan number." },
    },
    {
      q: { en: "Swap print!(\"⭐ \") for println!(\"⭐ \") in the star loop. What happens?", id: "Tukar print!(\"⭐ \") menjadi println!(\"⭐ \") di loop bintang. Apa yang terjadi?" },
      a: { en: "Each star gets its own line! println! jumps to a new line after printing, so the row falls apart into a column.", id: "Setiap bintang mendapat baris sendiri! println! pindah ke baris baru setelah mencetak, jadi barisnya runtuh menjadi kolom." },
    },
  ],

  challenges: [
    {
      text: { en: "Change the star loop from 5 to 10. What doubles?", id: "Ubah loop bintang dari 5 menjadi 10. Apa yang berlipat?" },
      hint: { en: "One number inside 1..=5 changes. Nothing else.", id: "Satu angka di dalam 1..=5 berubah. Tidak ada yang lain." },
      success: { en: "One row with exactly 10 stars.", id: "Satu baris dengan tepat 10 bintang." },
    },
    {
      text: { en: "Change the rocket loop to print 😎 instead of 🚀.", id: "Ubah loop roket untuk mencetak 😎 alih-alih 🚀." },
      hint: { en: "Swap the emoji inside the inner loop's print!.", id: "Ganti emoji di dalam print! pada loop dalam." },
      success: { en: "The growing triangle is now made of sunglasses.", id: "Segitiga yang memanjang kini terbuat dari kacamata hitam." },
    },
    {
      text: { en: "Make a pattern that prints 3 rows of 4 hearts each: ❤️❤️❤️❤️", id: "Buat pola yang mencetak 3 baris berisi 4 hati: ❤️❤️❤️❤️" },
      hint: { en: "Outer loop 1..=3 (rows). Inner loop 0..4 (hearts). Don't forget the println!() after each row.", id: "Loop luar 1..=3 (baris). Loop dalam 0..4 (hati). Jangan lupa println!() setelah setiap baris." },
      success: { en: "Exactly 12 hearts in exactly 3 rows.", id: "Tepat 12 hati dalam tepat 3 baris." },
    },
    {
      text: { en: "Add a countdown using .rev(): what order do the numbers print in?", id: "Tambahkan hitung mundur dengan .rev(): dalam urutan apa angkanya tercetak?" },
      hint: { en: "for number in (1..=5).rev() — the parentheses matter.", id: "for number in (1..=5).rev() — tanda kurungnya penting." },
      success: { en: "It prints 5, 4, 3, 2, 1 — blastoff!", id: "Tercetak 5, 4, 3, 2, 1 — meluncur!" },
    },
  ],

  bugHunt: [
    {
      bug: { en: "for i in 1..5 { … } — \"I wanted 5 stars but got 4!\"", id: "for i in 1..5 { … } — \"Aku mau 5 bintang tapi hanya dapat 4!\"" },
      fix: { en: "1..5 is exclusive — it stops at 4. Add the equals sign: 1..=5. The = means \"including the last number\".", id: "1..5 bersifat eksklusif — berhenti di 4. Tambahkan tanda sama dengan: 1..=5. Tanda = berarti \"termasuk angka terakhir\"." },
    },
    {
      bug: { en: "for _ in 1..=5  print!(\"⭐ \");", id: "for _ in 1..=5  print!(\"⭐ \");" },
      fix: { en: "Missing braces! The thing a loop repeats must live inside { }. The loop needs to hug its code.", id: "Kurung kurawal hilang! Bagian yang diulang loop harus berada di dalam { }. Loop perlu memeluk kodenya." },
    },
    {
      bug: { en: "for _ in 1..=3 { println!(\"🚀\"); } — \"why is each rocket on its own line?\"", id: "for _ in 1..=3 { println!(\"🚀\"); } — \"kenapa setiap roket di baris sendiri?\"" },
      fix: { en: "println! presses Enter after printing. For side-by-side rockets use print!, then one println!() after the loop.", id: "println! menekan Enter setelah mencetak. Agar roket berjajar gunakan print!, lalu satu println!() setelah loop." },
    },
  ],

  quiz: [
    {
      q: { en: "How many rounds does for _ in 1..=5 run?", id: "Berapa putaran yang dijalankan for _ in 1..=5?" },
      options: [
        { en: "4", id: "4" },
        { en: "5", id: "5" },
        { en: "6", id: "6" },
        { en: "Forever", id: "Selamanya" },
      ],
      answer: 1,
      explain: { en: "1, 2, 3, 4, 5 — the = makes the range include the last number. Count on your fingers!", id: "1, 2, 3, 4, 5 — tanda = membuat rentang menyertakan angka terakhir. Hitung dengan jari!" },
    },
    {
      q: { en: "And how many rounds does for _ in 1..5 run?", id: "Lalu berapa putaran yang dijalankan for _ in 1..5?" },
      options: [
        { en: "5", id: "5" },
        { en: "4", id: "4" },
        { en: "0", id: "0" },
        { en: "10", id: "10" },
      ],
      answer: 1,
      explain: { en: "Without the =, the range stops BEFORE 5: only 1,2,3,4. This off-by-one surprise catches even professionals.", id: "Tanpa =, rentang berhenti SEBELUM 5: hanya 1,2,3,4. Kejutan off-by-one ini bahkan menjebak para profesional." },
    },
    {
      q: { en: "What does the _ in for _ in 1..=5 mean?", id: "Apa arti tanda _ dalam for _ in 1..=5?" },
      options: [
        { en: "The loop is broken", id: "Loop-nya rusak" },
        { en: "\"I don't need the round number\"", id: "\"Aku tidak butuh nomor putaran\"" },
        { en: "It counts backwards", id: "Itu menghitung mundur" },
        { en: "It means 5 times zero", id: "Itu berarti 5 kali nol" },
      ],
      answer: 1,
      explain: { en: "_ is how you say \"I'm ignoring this value\". When you DO care, give it a name: for number in …", id: "_ adalah cara berkata \"aku abaikan nilai ini\". Saat kamu PEDULI, beri nama: for number in …" },
    },
    {
      q: { en: "A loop inside a loop is called…", id: "Loop di dalam loop disebut…" },
      options: [
        { en: "A double loop", id: "Loop ganda" },
        { en: "A nested loop", id: "Loop bersarang" },
        { en: "A loop-ception", id: "Loop-ception" },
        { en: "A while loop", id: "Loop while" },
      ],
      answer: 1,
      explain: { en: "Nested loops build grids: the outer loop makes rows, the inner loop fills each row. Week 3's rocket triangle is one!", id: "Loop bersarang membangun kisi: loop luar membuat baris, loop dalam mengisi setiap baris. Segitiga roket di minggu 3 adalah contohnya!" },
    },
    {
      q: { en: "What does (1..=5).rev() produce?", id: "Apa yang dihasilkan (1..=5).rev()?" },
      options: [
        { en: "1, 2, 3, 4, 5", id: "1, 2, 3, 4, 5" },
        { en: "5, 4, 3, 2, 1", id: "5, 4, 3, 2, 1" },
        { en: "0, 1, 2, 3, 4", id: "0, 1, 2, 3, 4" },
        { en: "Error", id: "Error" },
      ],
      answer: 1,
      explain: { en: ".rev() reverses the range. Countdown: 5, 4, 3, 2, 1 — blastoff!", id: ".rev() membalik rentang. Hitung mundur: 5, 4, 3, 2, 1 — meluncur!" },
    },
    {
      q: { en: "In for number in 1..=5 { print!(\"{} \", number); }, what prints?", id: "Dalam for number in 1..=5 { print!(\"{} \", number); }, apa yang tercetak?" },
      options: [
        { en: "1 2 3 4 5", id: "1 2 3 4 5" },
        { en: "0 1 2 3 4", id: "0 1 2 3 4" },
        { en: "number number number number number", id: "number number number number number" },
        { en: "5 4 3 2 1", id: "5 4 3 2 1" },
      ],
      answer: 0,
      explain: { en: "number takes values 1, 2, 3, 4, 5 each round. print! keeps them on one line.", id: "number bernilai 1, 2, 3, 4, 5 tiap putaran. print! membuatnya tetap satu baris." },
    },
    {
      q: { en: "What happens if you forget the braces { } in a for loop?", id: "Apa yang terjadi jika lupa kurung kurawal { } di for loop?" },
      options: [
        { en: "Only the next line repeats", id: "Hanya baris berikutnya yang ulang" },
        { en: "Error", id: "Error" },
        { en: "Infinite loop", id: "Loop tak terbatas" },
        { en: "Nothing", id: "Tidak ada" },
      ],
      answer: 0,
      explain: { en: "Without braces, only the very next statement is the loop body. That's why { } hug the code!", id: "Tanpa kurung, hanya pernyataan BERIKUTNYA yang jadi badan loop. Itulah mengapa { } memeluk kode!" },
    },
    {
      q: { en: "True or false: while loops run a known number of times.", id: "Benar/salah: while loop berjalan jumlah putaran yang diketahui." },
      options: [
        { en: "True", id: "Benar" },
        { en: "False", id: "Salah" },
      ],
      answer: 1,
      explain: { en: "for loops = known count. while loops = run until condition becomes false. Different tools!", id: "for loop = jumlah diketahui. while loop = jalan sampai kondisi false. Alat berbeda!" },
    },
    {
      q: { en: "What does continue do in a loop?", id: "Apa yang dilakukan continue di loop?" },
      options: [
        { en: "Stops the loop entirely", id: "Menghentikan loop total" },
        { en: "Skips to the next round", id: "Lompat ke putaran berikutnya" },
        { en: "Repeats current round", id: "Ulangi putaran ini" },
        { en: "Does nothing", id: "Tidak apa-apa" },
      ],
      answer: 1,
      explain: { en: "continue means \"skip the rest of this round, go to next\". Useful for filtering!", id: "continue berarti \"lewati sisa putaran ini, ke putaran berikutnya\". Berguna untuk filter!" },
    },
    {
      q: { en: "Which thinking skill is Week 3's focus?", id: "Keterampilan berpikir minggu 3 adalah?" },
      options: [
        { en: "Conditional Reasoning", id: "Penalaran Kondisional" },
        { en: "Pattern Recognition", id: "Pengenalan Pola" },
        { en: "Sequencing", id: "Sequencing" },
        { en: "Abstraction", id: "Abstraksi" },
      ],
      answer: 1,
      explain: { en: "Week 3: spot what repeats, wrap it in a loop. That's pattern recognition!", id: "Minggu 3: temukan yang berulang, bungkus dengan loop. Itulah pengenalan pola!" },
    },
  ],

  reflect: [
    { prompt: { en: "Describe the pattern you made today. What repeats, and how many times?", id: "Ceritakan pola yang kamu buat hari ini. Apa yang berulang, dan berapa kali?" } },
    { prompt: { en: "Where else have you seen the same thing repeat over and over?", id: "Di mana lagi kamu pernah melihat hal yang sama berulang-ulang?" } },
  ],

  parentCorner: {
    prep: [
      { en: "Run the starter code once. Then draw the rocket triangle output on grid paper — kids match code to picture.", id: "Jalankan kode awal sekali. Lalu gambar hasil segitiga roket di kertas berpetak — anak-anak mencocokkan kode dengan gambar." },
      { en: "Have 10 small objects (coins, beans) for counting rounds with fingers and hands.", id: "Siapkan 10 benda kecil (koin, kacang) untuk menghitung putaran dengan jari dan tangan." },
    ],
    say: [
      { en: "\"Programmers never write the same line twice — that's the computer's job.\"", id: "\"Programmer tidak pernah menulis baris yang sama dua kali — itu tugas komputer.\"" },
      { en: "\"Count the rounds with me: how many times will this run?\"", id: "\"Hitung putarannya denganku: berapa kali ini akan berjalan?\"" },
      { en: "\"The = in 1..=5 is the difference between 5 stars and 4. Sneaky, right?\"", id: "\"Tanda = di 1..=5 adalah bedanya 5 bintang dan 4 bintang. Licik, kan?\"" },
    ],
    ifStuck: {
      en: "Count rounds on fingers: 1..=5 is five fingers, 1..5 is four. For nested loops, draw the grid on paper first and fill it in row by row — then read the code as \"for each row, for each seat in that row\".",
      id: "Hitung putaran dengan jari: 1..=5 adalah lima jari, 1..5 adalah empat. Untuk loop bersarang, gambar dulu kisi-kisinya di kertas dan isilah baris demi baris — lalu baca kodenya sebagai \"untuk setiap baris, untuk setiap kursi di baris itu\".",
    },
  },
};
