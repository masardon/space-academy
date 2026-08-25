// ============================================
// SPACE ACADEMY — Welcome View
// ============================================

Views.welcome = () => {
  const pilot = progress.getCurrentPilot();
  const main = document.getElementById("mainContent");
  const t = (x) => I18N.t(x);

  if (pilot) {
    main.innerHTML = `
      <div class="view welcome-screen">
        <div class="welcome-logo">🚀</div>
        <h1 class="welcome-title" data-i18n="header_title">Space Academy</h1>
        <p class="welcome-subtitle">
          ${t({ en: "Welcome back", id: "Selamat datang kembali" })}, <strong>${escapeHtml(pilot)}</strong>!<br>
          ${t({ en: "Your missions await in the stars.", id: "Misi-misimu menunggu di angkasa." })}
        </p>
        <button class="btn btn-primary btn-large" onclick="Router.navigate('missions')">
          ${t({ en: "Resume Missions", id: "Lanjutkan Misi" })}
        </button>
        <div style="margin-top:24px;">
          <button class="btn btn-ghost" onclick="Router.navigate('pilot-select')" style="font-size:0.875rem;">
            ${t({ en: "Switch Pilot", id: "Ganti Pilot" })}
          </button>
        </div>
      </div>
    `;
  } else {
    main.innerHTML = `
      <div class="view welcome-screen">
        <div class="welcome-logo">🚀</div>
        <h1 class="welcome-title" data-i18n="header_title">Space Academy</h1>
        <p class="welcome-subtitle">
          ${t({ en: "Learn computational thinking through Rust", id: "Belajar berpikir komputasional lewat Rust" })} —<br>
          ${t({ en: "for kids who love to build, explore, and solve problems.", id: "untuk anak yang suka membangun, menjelajahi, dan memecahkan masalah." })}
        </p>
        <button class="btn btn-primary btn-large btn-full" onclick="Router.navigate('pilot-select')" style="max-width:320px;margin:0 auto;display:block;">
          ${t({ en: "🛸 Start Your Mission", id: "🛸 Mulai Misi Mu" })}
        </button>
        <p style="margin-top:32px;font-size:0.8125rem;color:var(--text-muted);line-height:1.6;">
          ${t({ en: "12 weeks · Ages 9+ · No experience needed", id: "12 minggu · Usia 9+ · Tidak perlu pengalaman" })}<br>
          ${t({ en: "Built for Android tablets & Chromebooks", id: "Dibuat untuk tablet Android & Chromebook" })}
        </p>
      </div>
    `;
  }
};
