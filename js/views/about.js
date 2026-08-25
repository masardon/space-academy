// ============================================
// SPACE ACADEMY — About View
// ============================================

window.Views = window.Views || {};
Views.about = () => {
  const main = document.getElementById("mainContent");
  const t = (x) => I18N.t(x);
  const lang = I18N.lang();

  main.innerHTML = `
    <div class="view">
      <div class="section-header" style="margin-bottom:24px;">
        <h2>${t({ en: "About Space Academy", id: "Tentang Space Academy" })}</h2>
        <p>${t({ en: "Learn computational thinking through Rust", id: "Belajar berpikir komputasional lewat Rust" })}</p>
      </div>

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

      <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border-color);text-align:center;">
        <p style="font-size:0.75rem;color:var(--text-muted);">
          Space Academy v1.0 — ${new Date().getFullYear()}
        </p>
      </div>
    </div>
  `;
};