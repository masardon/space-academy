// ============================================
// SPACE ACADEMY — About View (with How to Use tab)
// ============================================

window.Views = window.Views || {};
Views.about = (params) => {
  const main = document.getElementById("mainContent");
  const t = (x) => I18N.t(x);
  const tab = params?.tab || 'about'; // 'about' or 'howto'

  main.innerHTML = `
    <div class="view">
      <div class="section-header" style="margin-bottom:24px;">
        <h2>${t({ en: "About Space Academy", id: "Tentang Space Academy" })}</h2>
        <p>${t({ en: "Learn computational thinking through Rust", id: "Belajar berpikir komputasional lewat Rust" })}</p>
      </div>

      <!-- Tab Navigation -->
      <div class="pills" style="margin-bottom:16px; justify-content:center;">
        <button class="pill ${tab === 'about' ? 'active' : ''}" 
                onclick="Router.navigate('about',{tab:'about'})"
                aria-label="${t({ en: "About", id: "Tentang" })}">${t({ en: "About", id: "Tentang" })}</button>
        <button class="pill ${tab === 'howto' ? 'active' : ''}" 
                onclick="Router.navigate('about',{tab:'howto'})"
                aria-label="${t({ en: "How to Use", id: "Cara Pakai" })}">${t({ en: "How to Use", id: "Cara Pakai" })}</button>
      </div>

      ${tab === 'about' ? `
      <!-- ABOUT TAB -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--accent-light);">${t({ en: "About", id: "Tentang" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);">${t({ en: "A 12-week curriculum delivered as a progressive web app that runs directly in any browser — no server, no build step, no install required. Designed for Android tablets and Chromebooks.", id: "Kurikulum 12 minggu disajikan sebagai progressive web app yang berjalan langsung di browser manapun — tanpa server, tanpa build step, tanpa instalasi. Didesain untuk tablet Android dan Chromebook." })}</p>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--success);">${t({ en: "Features", id: "Fitur" })}</h3>
        <ul style="display:grid;gap:8px;">
          <li>${t({ en: "12 complete weeks of Rust curriculum", id: "12 minggu kurikulum Rust lengkap" })}</li>
          <li>${t({ en: "Guided lesson system with 11 sections per week", id: "Sistem pelajaran terpandu 11 bagian per minggu" })}</li>
          <li>${t({ en: "Interactive quizzes with instant feedback", id: "Kuis interaktif dengan umpan balik instan" })}</li>
          <li>${t({ en: "Reflection journal (Flight Log)", id: "Jurnal refleksi (Log Penerbangan)" })}</li>
          <li>${t({ en: "Bilingual: English + Bahasa Indonesia", id: "Bilingual: English + Bahasa Indonesia" })}</li>
          <li>${t({ en: "Offline-ready via service worker", id: "Siap offline lewat service worker" })}</li>
          <li>${t({ en: "Installable PWA — add to home screen", id: "PWA — bisa dipasang ke layar utama" })}</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--warning);">${t({ en: "Built With", id: "Dibangun Dengan" })}</h3>
        <p style="font-size:0.875rem;color:var(--text-secondary);">${t({ en: "Vanilla JavaScript, no frameworks", id: "JavaScript murni, tanpa framework" })}</p>
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">HTML5, CSS3 (custom properties), ES6+ modules</p>
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">Service Worker for offline support</p>
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-top:4px;">localStorage for progress persistence</p>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--info);">${t({ en: "Credits", id: "Kredit" })}</h3>
        <ul style="font-size:0.875rem;color:var(--text-secondary);line-height:1.8;">
          <li>Curriculum design: Space Academy team</li>
          <li>Font: <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener">Inter</a> & <a href="https://fonts.google.com/specimen/JetBrains+Mono" target="_blank" rel="noopener">JetBrains Mono</a> via Google Fonts</li>
          <li>Icons: Inline SVG, emoji</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--f15bb5,#f15bb5);">${t({ en: "License", id: "Lisensi" })}</h3>
        <p style="font-size:0.875rem;color:var(--text-secondary);">${t({ en: "Free for personal and educational use. Build something awesome!", id: "Gratis untuk penggunaan pribadi dan pendidikan. Bangun hal yang menakjubkan!" })}</p>
      </div>
      ` : `
      <!-- HOW TO USE TAB -->
      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--accent-light);">${t({ en: "How to Use", id: "Cara Pakai" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);">${t({ en: "Getting started guide", id: "Panduan memulai" })}</p>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--accent-light);">${t({ en: "Getting Started", id: "Memulai" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);margin-bottom:12px;">${t({ en: "Welcome to Space Academy! Here's how to begin your journey:", id: "Selamat datang di Space Academy! Inilah cara memulai perjalananmu:" })}</p>
        <ul style="display:grid;gap:8px;color:var(--text-secondary);font-size:0.875rem;line-height:1.6;">
          <li>${t({ en: "Choose your pilot — enter your name and pick an avatar", id: "Pilih pilotmu — masukkan nama dan pilih avatar" })}</li>
          <li>${t({ en: "Start with Week 1 — each week builds on the previous one", id: "Mulai dari Minggu 1 — setiap minggu membangun yang sebelumnya" })}</li>
          <li>${t({ en: "Read the story, then try the code in the Playground", id: "Baca cerita, lalu coba kodenya di Playground" })}</li>
          <li>${t({ en: "Complete challenges to earn stars and unlock the next week", id: "Selesaikan tantangan untuk dapat bintang dan buka minggu berikutnya" })}</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--accent-light);">${t({ en: "Missions & Weeks", id: "Misi & Minggu" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);margin-bottom:12px;">${t({ en: "Each week is a mission with a story, code walkthrough, challenges, quiz, and reflection:", id: "Setiap minggu adalah misi dengan cerita, walkthrough kode, tantangan, kuis, dan refleksi:" })}</p>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);">${t({ en: "Story → Learn → Code Walkthrough → Predictions → Challenges → Bug Hunt → Quiz → Reflection → Parent Corner", id: "Cerita → Belajar → Walkthrough Kode → Prediksi → Tantangan → Berburu Bug → Kuis → Refleksi → Sudut Orang Tua" })}</p>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--success);">${t({ en: "Code Playground", id: "Taman Kode" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);margin-bottom:12px;">${t({ en: "Your interactive Rust lab — write, run, and experiment with code:", id: "Laboratorium Rust interaktifmu — tulis, jalankan, dan bereksperimen dengan kode:" })}</p>
        <ul style="display:grid;gap:8px;color:var(--text-secondary);font-size:0.875rem;line-height:1.6;">
          <li>${t({ en: "Type or paste Rust code in the editor panel", id: "Ketik atau tempel kode Rust di panel editor" })}</li>
          <li>${t({ en: "Click 'Starter Templates' for ready-to-run examples", id: "Klik 'Template Starter' untuk contoh siap jalan" })}</li>
          <li>${t({ en: "Use Week 1–8 buttons to load that week's starter code", id: "Gunakan tombol Minggu 1–8 untuk memuat kode starter minggu itu" })}</li>
          <li>${t({ en: "Press ▶ Run Code (or Ctrl+Enter) to see output", id: "Tekan ▶ Jalankan Kode (atau Ctrl+Enter) untuk lihat output" })}</li>
          <li>${t({ en: "Click Format to auto-indent your code", id: "Klik Format untuk auto-indent kodenya" })}</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--warning);">${t({ en: "Lab & References", id: "Lab & Referensi" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);margin-bottom:12px;">${t({ en: "Your reference library — open the Lab from bottom navigation:", id: "Pustaka referensimu — buka Lab dari navigasi bawah:" })}</p>
        <ul style="display:grid;gap:8px;color:var(--text-secondary);font-size:0.875rem;line-height:1.6;">
          <li>${t({ en: "Cheat Sheet — syntax for variables, loops, functions, structs, vectors", id: "Catatan Cepat — sintaks variabel, loop, fungsi, struct, vector" })}</li>
          <li>${t({ en: "Wiring Guide — Arduino diagrams for Weeks 9–11", id: "Panduan Wiring — diagram Arduino untuk Minggu 9–11" })}</li>
          <li>${t({ en: "Debug Guide — common errors and how to fix them", id: "Panduan Debug — error umum dan cara memperbaikinya" })}</li>
          <li>${t({ en: "Rust Terms — glossary of keywords and concepts", id: "Istilah Rust — glosarium kata kunci dan konsep" })}</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--info);">${t({ en: "Profile & Progress", id: "Profil & Kemajuan" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);margin-bottom:12px;">${t({ en: "Track your journey in the Profile tab:", id: "Lacak perjalananmu di tab Profil:" })}</p>
        <ul style="display:grid;gap:8px;color:var(--text-secondary);font-size:0.875rem;line-height:1.6;">
          <li>${t({ en: "Mission Map — visual grid of all 12 weeks", id: "Peta Misi — grid visual 12 minggu" })}</li>
          <li>${t({ en: "Stars, completion %, current rank", id: "Bintang, persentase selesai, pangkat saat ini" })}</li>
          <li>${t({ en: "Quiz Stars — up to 3 stars per week based on best score", id: "Bintang Kuis — hingga 3 bintang per minggu dari skor terbaik" })}</li>
          <li>${t({ en: "Flight Log — your written reflections saved per week", id: "Log Penerbangan — refleksi tertulismu yang tersimpan per minggu" })}</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--f15bb5,#f15bb5);">${t({ en: "Settings", id: "Pengaturan" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);margin-bottom:12px;">${t({ en: "Customize your experience:", id: "Atur pengalamanmu:" })}</p>
        <ul style="display:grid;gap:8px;color:var(--text-secondary);font-size:0.875rem;line-height:1.6;">
          <li>${t({ en: "Language — switch between English and Bahasa Indonesia", id: "Bahasa — ganti antara English dan Bahasa Indonesia" })}</li>
          <li>${t({ en: "Add/manage multiple pilots (e.g., siblings)", id: "Tambah/kelola beberapa pilot (misal: saudara)" })}</li>
          <li>${t({ en: "Export Progress — backup your data as JSON", id: "Ekspor Kemajuan — backup data sebagai JSON" })}</li>
          <li>${t({ en: "Import Progress — restore from backup file", id: "Impor Kemajuan — pulihkan dari file cadangan" })}</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--f15bb5,#f15bb5);">${t({ en: "Tips for Parents & Mentors", id: "Tips untuk Orang Tua & Pendamping" })}</h3>
        <p style="font-size:0.875rem;line-height:1.6;color:var(--text-secondary);margin-bottom:12px;">${t({ en: "How to support your young coder:", id: "Cara mendukung kodermu yang muda:" })}</p>
        <ul style="display:grid;gap:8px;color:var(--text-secondary);font-size:0.875rem;line-height:1.6;">
          <li>${t({ en: "Always predict FIRST — ask 'What do you think will happen?' before running code", id: "Selalu prediksi DULU — tanyakan 'Menurutmu apa yang akan terjadi?' sebelum jalankan kode" })}</li>
          <li>${t({ en: "Read errors together — the compiler is a helpful detective, not a judge", id: "Baca error bersama — compiler itu detektif pembantu, bukan hakim" })}</li>
          <li>${t({ en: "Celebrate the process — bugs are learning opportunities, not failures", id: "Rayakan prosesnya — bug adalah peluang belajar, bukan kegagalan" })}</li>
          <li>${t({ en: "Let them type — muscle memory builds intuition faster than watching", id: "Biarkan mereka mengetik — muscle memory membangun intuisi lebih cepat dari sekadar nonton" })}</li>
          <li>${t({ en: "Ask 'Why did that work?' — explaining out loud cements understanding", id: "Tanyakan 'Kenapa itu jalan?' — menjelaskan keras-keras menegaskan pemahaman" })}</li>
          <li>${t({ en: "Take breaks — 45 minutes coding, 15 minutes break keeps focus sharp", id: "Istirahatkan — 45 menit koding, 15 menit istirahat menjaga fokus tetap tajam" })}</li>
        </ul>
      </div>
      `
      }

      <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border-color);text-align:center;">
        <p style="font-size:0.75rem;color:var(--text-muted);">
          Space Academy v1.0 — ${new Date().getFullYear()}
        </p>
      </div>
    </div>
  `;
};