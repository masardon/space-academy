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
      // Navigation
      nav_missions: "Missions",
      nav_lab: "Lab",
      nav_playground: "Playground",
      nav_profile: "Pilot",
      nav_settings: "Settings",
      nav_about: "About",

      // Header / common
      header_title: "Space Academy",
      btn_back: "Go back",
      btn_profile: "Select pilot",
      btn_settings: "Settings",
      progress_label: "Week {checkpoint}/12 · {completed} missions done",
      week_label: "Week {num}",

      // Lesson sections
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

      // Lesson content
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

      // Lab sections
      lab_cheatsheet: "Cheat Sheet",
      lab_wiring: "Wiring Guide",
      lab_debug: "Debug Guide",
      lab_terms: "Rust Terms",
      lab_search_placeholder: "Search cheat sheets, wiring, debug tips, terms...",

      // Playground
      pg_title: "Code Playground",
      pg_subtitle: "Write, run, and experiment with Rust code — right here in your browser.",
      pg_editor: "Editor",
      pg_output: "Output",
      pg_run: "Run Code",
      pg_format: "Format",
      pg_clear: "Clear",
      pg_copy: "Copy",
      pg_starter_title: "Starter Templates (click to load)",
      pg_week_label: "Week {num}",
      pg_blank: "Blank",

      // About
      about_title: "About Space Academy",
      about_subtitle: "Learn computational thinking through Rust",
      about_version: "Version",
      about_description: "A 12-week curriculum delivered as a progressive web app that runs directly in any browser — no server, no build step, no install required. Designed for Android tablets and Chromebooks.",
      about_features: "Features",
      about_feature_1: "12 complete weeks of Rust curriculum",
      about_feature_2: "Guided lesson system with 11 sections per week",
      about_feature_3: "Interactive quizzes with instant feedback",
      about_feature_4: "Reflection journal (Flight Log)",
      about_feature_5: "Bilingual: English + Bahasa Indonesia",
      about_feature_6: "Offline-ready via service worker",
      about_feature_7: "Installable PWA — add to home screen",
      about_credits: "Built with vanilla JavaScript, no frameworks",
      about_license: "Free for personal and educational use",

      // Settings
      settings_title: "Settings",
      settings_language: "Language",
      settings_language_en: "English",
      settings_language_id: "Bahasa Indonesia",
      settings_export: "Export Progress",
      settings_import: "Import Progress",
      settings_reset: "Reset All Data",
      settings_reset_confirm: "This will delete ALL pilots and progress. Continue?",

      // Profile
      profile_title: "Pilot Profile",
      profile_quiz_stars: "Quiz Stars",
      profile_flight_log: "Flight Log",
      profile_completed: "Completed Missions",
      profile_empty_reflections: "Your reflections will appear here after each lesson.",
      profile_empty_quiz: "Complete quizzes in lessons to earn stars.",

      // Toast messages
      toast_mission_complete: "Mission {num} completed! +10 stars!",
      toast_challenge_complete: "All challenges complete! Mission {num} unlocked!",
      toast_reflection_saved: "Saved to your Flight Log!",
      toast_quiz_stars: "+{num} stars!",
      toast_output_copied: "Output copied!",
      toast_editor_cleared: "Editor cleared",
      toast_output_cleared: "Output cleared",
    },
    id: {
      // Navigation
      nav_missions: "Misi",
      nav_lab: "Lab",
      nav_playground: "Taman Kode",
      nav_profile: "Pilot",
      nav_settings: "Pengaturan",
      nav_about: "Tentang",

      // Header / common
      header_title: "Space Academy",
      btn_back: "Kembali",
      btn_profile: "Pilih Pilot",
      btn_settings: "Pengaturan",
      progress_label: "Minggu {checkpoint}/12 · {completed} misi selesai",
      week_label: "Minggu {num}",

      // Lesson sections
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

      // Lesson content
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

      // Lab sections
      lab_cheatsheet: "Catatan Cepat",
      lab_wiring: "Panduan Wiring",
      lab_debug: "Panduan Debug",
      lab_terms: "Istilah Rust",
      lab_search_placeholder: "Cari catatan cepat, wiring, debug, istilah...",

      // Playground
      pg_title: "Taman Kode",
      pg_subtitle: "Tulis, jalankan, dan bereksperimen dengan kode Rust — langsung di browser.",
      pg_editor: "Editor",
      pg_output: "Keluaran",
      pg_run: "Jalankan Kode",
      pg_format: "Format",
      pg_clear: "Bersihkan",
      pg_copy: "Salin",
      pg_starter_title: "Template Starter (klik untuk memuat)",
      pg_week_label: "Minggu {num}",
      pg_blank: "Kosong",

      // About
      about_title: "Tentang Space Academy",
      about_subtitle: "Belajar berpikir komputasional lewat Rust",
      about_version: "Versi",
      about_description: "Kurikulum 12 minggu disajikan sebagai progressive web app yang berjalan langsung di browser manapun — tanpa server, tanpa build step, tanpa instalasi. Didesain untuk tablet Android dan Chromebook.",
      about_features: "Fitur",
      about_feature_1: "12 minggu kurikulum Rust lengkap",
      about_feature_2: "Sistem pelajaran terpandu 11 bagian per minggu",
      about_feature_3: "Kuis interaktif dengan umpan balik instan",
      about_feature_4: "Jurnal refleksi (Log Penerbangan)",
      about_feature_5: "Bilingual: English + Bahasa Indonesia",
      about_feature_6: "Siap offline lewat service worker",
      about_feature_7: "PWA — bisa dipasang ke layar utama",
      about_credits: "Dibangun dengan JavaScript murni, tanpa framework",
      about_license: "Gratis untuk penggunaan pribadi dan pendidikan",

      // Settings
      settings_title: "Pengaturan",
      settings_language: "Bahasa",
      settings_language_en: "English",
      settings_language_id: "Bahasa Indonesia",
      settings_export: "Ekspor Kemajuan",
      settings_import: "Impor Kemajuan",
      settings_reset: "Reset Semua Data",
      settings_reset_confirm: "Ini akan menghapus SEMUA pilot dan kemajuan. Lanjutkan?",

      // Profile
      profile_title: "Profil Pilot",
      profile_quiz_stars: "Bintang Kuis",
      profile_flight_log: "Log Penerbangan",
      profile_completed: "Misi yang Selesai",
      profile_empty_reflections: "Refleksimu akan muncul di sini setelah setiap pelajaran.",
      profile_empty_quiz: "Selesaikan kuis di pelajaran untuk dapat bintang.",

      // Toast messages
      toast_mission_complete: "Misi {num} selesai! +10 bintang!",
      toast_challenge_complete: "Semua tantangan selesai! Misi {num} terbuka!",
      toast_reflection_saved: "Tersimpan di Log Penerbanganmu!",
      toast_quiz_stars: "+{num} bintang!",
      toast_output_copied: "Keluaran disalin!",
      toast_editor_cleared: "Editor dibersihkan",
      toast_output_cleared: "Keluaran dibersihkan",
    },
  },
};
