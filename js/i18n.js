// ============================================
// SPACE ACADEMY — i18n (English / Bahasa Indonesia)
// ============================================
// Pair format: { en: "...", id: "..." } — I18N.t(pair) picks the active
// language, falling back to English when a translation is missing.

const I18N = {
  lang: () => progress.getLang(),

  t(pair) {
    if (!pair) return "";
    if (typeof pair === "string") return pair;
    return pair[this.lang()] || pair.en || "";
  },

  setLang(lang) {
    progress.setLang(lang);
  },

  ui: {
    en: {
      sec_story: "Story",
      sec_learn: "Learn",
      sec_bigidea: "Big Idea",
      sec_words: "Words",
      sec_think: "Think",
      sec_code: "Code",
      sec_predict: "Predict",
      sec_challenges: "Challenges",
      sec_bugs: "Bug Hunt",
      sec_quiz: "Quiz",
      sec_reflect: "Reflect",
      sec_parent: "Parents",
      youWillLearn: "You will learn",
      bigIdeaIntro: "The one thing to remember from this mission",
      readCodeTitle: "Read the Code Together",
      walkIntro: "One line at a time. Parent reads the line, kid guesses what it does, then check below.",
      predictTitle: "Say Your Guess Out Loud First!",
      predictIntro: "Wrong guesses grow your brain. Guess before you peek!",
      showAnswer: "Show answer",
      hideAnswer: "Hide answer",
      hintLabel: "Hint",
      successLooks: "Done when",
      quizIntro: "Pick an answer — you'll find out instantly!",
      quizBest: "Best",
      correct: "Correct!",
      notQuite: "Not quite…",
      yourScore: "Your score",
      starsToast: "stars!",
      reflectIntro: "Your answers are saved in your Flight Log.",
      reflectSave: "Save my answers",
      reflectSaved: "Saved to your Flight Log!",
      parentIntro: "For the grown-up running this session",
      parentPrep: "Prep (5 minutes before)",
      parentSay: "Things to say",
      parentStuck: "If your child gets stuck",
      comingSoon: "Full lesson guide coming soon — for now, run the mission below with your parent!",
    },
    id: {
      sec_story: "Cerita",
      sec_learn: "Belajar",
      sec_bigidea: "Ide Besar",
      sec_words: "Kata",
      sec_think: "Berpikir",
      sec_code: "Kode",
      sec_predict: "Prediksi",
      sec_challenges: "Tantangan",
      sec_bugs: "Berburu Bug",
      sec_quiz: "Kuis",
      sec_reflect: "Refleksi",
      sec_parent: "Orang Tua",
      youWillLearn: "Kamu akan belajar",
      bigIdeaIntro: "Satu hal yang harus diingat dari misi ini",
      readCodeTitle: "Membaca Kode Bersama",
      walkIntro: "Satu baris demi satu baris. Orang tua membaca barisnya, kamu menebak apa fungsinya, lalu periksa di bawah.",
      predictTitle: "Ucapkan Tebakanmu Lebih Dulu!",
      predictIntro: "Tebakan yang salah membuat otakmu bertumbuh. Tebak dulu, baru intip!",
      showAnswer: "Lihat jawaban",
      hideAnswer: "Sembunyikan",
      hintLabel: "Petunjuk",
      successLooks: "Selesai jika",
      quizIntro: "Pilih jawaban — hasilnya langsung terlihat!",
      quizBest: "Terbaik",
      correct: "Benar!",
      notQuite: "Belum tepat…",
      yourScore: "Skormu",
      starsToast: "bintang!",
      reflectIntro: "Jawabanmu tersimpan di Log Penerbanganmu.",
      reflectSave: "Simpan jawabanku",
      reflectSaved: "Tersimpan di Log Penerbanganmu!",
      parentIntro: "Untuk orang dewasa yang menemani sesi ini",
      parentPrep: "Persiapan (5 menit sebelum mulai)",
      parentSay: "Kalimat untuk diucapkan",
      parentStuck: "Jika anakmu macet",
      comingSoon: "Panduan pelajaran lengkap segera hadir — untuk sekarang, jalankan misi di bawah ini bersama orang tuamu!",
    },
  },
};
