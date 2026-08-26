// ============================================
// SPACE ACADEMY — Settings View
// ============================================

window.Views = window.Views || {};
Views.settings = () => {
  const pilots = progress.getPilots();
  const main = document.getElementById("mainContent");
  const t = (x) => I18N.t(x);

  const pilotItems = Object.values(pilots).map(p => `
    <div class="settings-item" role="button" tabindex="0" data-pilot="${escapeHtml(p.name)}">
      <div class="settings-item-left">
        <div class="settings-item-icon">${p.avatar}</div>
        <div class="settings-item-text">
          <h4>${escapeHtml(p.name)}</h4>
          <p>${p.rank} · ${p.weeksCompleted.length} ${t({ en: "missions", id: "misi" })}</p>
        </div>
      </div>
      <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  `).join('');

  main.innerHTML = `
    <div class="view">
      <div class="section-header">
        <h2>⚙️ ${t({ en: "Settings", id: "Pengaturan" })}</h2>
        <p>${t({ en: "Manage pilots and app preferences", id: "Kelola pilot dan preferensi aplikasi" })}</p>
      </div>

      <div class="settings-group">
        <div class="settings-group-title">${t({ en: "Pilots", id: "Pilot" })}</div>
        ${pilotItems}
        <div class="settings-item" onclick="Router.navigate('pilot-select')" style="border-radius:0 0 var(--radius-lg) var(--radius-lg);">
          <div class="settings-item-left">
            <div class="settings-item-icon" style="background:var(--accent);color:white;font-size:1rem;">+</div>
            <div class="settings-item-text">
              <h4>${t({ en: "Add New Pilot", id: "Tambah Pilot Baru" })}</h4>
              <p>${t({ en: "Register a new cadet", id: "Daftarkan kadet baru" })}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-group" style="padding-top:0;">
        <div class="settings-group-title">${t({ en: "Data", id: "Data" })}</div>
        <div class="settings-item" onclick="Views.exportData()">
          <div class="settings-item-left">
            <div class="settings-item-icon">📤</div>
            <div class="settings-item-text">
              <h4>${t({ en: "Export Progress", id: "Ekspor Kemajuan" })}</h4>
              <p>${t({ en: "Download progress as JSON", id: "Unduh kemajuan sebagai JSON" })}</p>
            </div>
          </div>
        </div>
        <div class="settings-item" onclick="Views.importDataPrompt()">
          <div class="settings-item-left">
            <div class="settings-item-icon">📥</div>
            <div class="settings-item-text">
              <h4>${t({ en: "Import Progress", id: "Impor Kemajuan" })}</h4>
              <p>${t({ en: "Restore from backup file", id: "Pulihkan dari file cadangan" })}</p>
            </div>
          </div>
        </div>
        <div class="settings-item" onclick="Views.resetAllData()" style="border-radius:0 0 var(--radius-lg) var(--radius-lg);">
          <div class="settings-item-left">
            <div class="settings-item-icon" style="background:var(--error-bg);color:var(--error);">🗑️</div>
            <div class="settings-item-text">
              <h4 style="color:var(--error);">${t({ en: "Reset All Data", id: "Reset Semua Data" })}</h4>
              <p>${t({ en: "Clear all progress and pilots", id: "Hapus semua kemajuan dan pilot" })}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-group" style="padding-top:0;">
        <div class="settings-group-title">${t({ en: "Language", id: "Bahasa" })}</div>
        <div class="lang-switch">
          <button class="lang-btn ${progress.getLang() === "en" ? "active" : ""}" onclick="Views.setLanguage('en')">${t({ en: "🇬🇧 English", id: "🇬🇧 English" })}</button>
          <button class="lang-btn ${progress.getLang() === "id" ? "active" : ""}" onclick="Views.setLanguage('id')">${t({ en: "🇮🇩 Bahasa Indonesia", id: "🇮🇩 Bahasa Indonesia" })}</button>
        </div>
      </div>

      <div class="settings-group" style="padding-top:0;">
        <div class="settings-group-title">${t({ en: "About", id: "Tentang" })}</div>
        <div class="settings-item" style="border-radius:var(--radius-lg) var(--radius-lg) 0 0;" role="button" tabindex="0" onclick="Router.navigate('about',{tab:'about'})">
          <div class="settings-item-left">
            <div class="settings-item-icon">🚀</div>
            <div class="settings-item-text">
              <h4>Space Academy — Rust for Kids</h4>
              <p>Version 1.0 · ${t({ en: "Computational Thinking Curriculum", id: "Kurikulum Berpikir Komputasional" })}</p>
            </div>
          </div>
          <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div class="settings-item" style="border-radius:0 0 var(--radius-lg) var(--radius-lg);border-bottom:none;" role="button" tabindex="0" onclick="Router.navigate('about',{tab:'howto'})">
          <div class="settings-item-left">
            <div class="settings-item-icon">💡</div>
            <div class="settings-item-text">
              <h4>${t({ en: "How to Use", id: "Cara Pakai" })}</h4>
              <p>${t({ en: "Each week = one mission. Follow the guide, do the challenges, earn stars!", id: "Setiap minggu = satu misi. Ikuti panduan, kerjakan tantangan, dapatkan bintang!" })}</p>
            </div>
          </div>
          <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      <div style="height:24px;"></div>
    </div>

    <!-- Import modal -->
    <div id="importModal" class="modal-overlay" style="display:none;" onclick="if(event.target===this)Views.importDataPrompt()">
      <div class="modal">
        <div class="modal-header">
          <h3>${t({ en: "Import Progress", id: "Impor Kemajuan" })}</h3>
          <button class="btn-icon" onclick="Views.importDataPrompt()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <p style="font-size:0.9375rem;color:var(--text-secondary);margin-bottom:16px;">${t({ en: "Paste your exported JSON data below:", id: "Tempel data JSON ekspor di bawah:" })}</p>
          <textarea id="importData" rows="6" placeholder='{"pilots":...}'
            style="width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(127,90,240,0.2);background:var(--bg-elevated);color:var(--text-primary);font-family:monospace;font-size:0.8125rem;resize:vertical;outline:none;"></textarea>
          <button class="btn btn-primary btn-full" style="margin-top:12px;" onclick="Views.importData()">${t({ en: "Import", id: "Impor" })}</button>
        </div>
      </div>
    </div>
  `;

  main.querySelectorAll(".settings-item[data-pilot]").forEach(item => {
    item.addEventListener("click", () => Views.switchPilot(item.dataset.pilot));
  });
};

Views.switchPilot = (name) => {
  progress.setCurrentPilot(name);
  Router.navigate("missions");
};

Views.setLanguage = (lang) => {
  progress.setLang(lang);
  // Update all UI strings that use data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const enText = I18N.ui.en[key];
    const idText = I18N.ui.id[key];
    const translation = I18N.t({ en: enText, id: idText });
    if (translation) el.textContent = translation;
  });
  // Update header title if on a view that uses i18n
  const headerTitle = document.getElementById('headerTitle');
  if (headerTitle && headerTitle.dataset.i18n) {
    const key = headerTitle.dataset.i18n;
    headerTitle.textContent = I18N.t({ en: I18N.ui.en[key], id: I18N.ui.id[key] });
  }
  // Re-render current view if it's settings (to update group titles etc.)
  if (Router.currentView === 'settings') {
    Views.settings();
  }
  showToast(I18N.t({ en: "Language set to English", id: "Bahasa diubah ke Indonesia" }), "success");
};

Views.exportData = () => {
  const data = localStorage.getItem("space_academy_progress");
  if (!data) {
    showToast("No progress data to export", "error");
    return;
  }
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `space-academy-progress-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Progress exported!", "success");
};

Views.importDataPrompt = () => {
  document.getElementById("importModal").style.display = "flex";
};

Views.importData = () => {
  try {
    const text = document.getElementById("importData").value.trim();
    progress.importData(JSON.parse(text));
    document.getElementById("importModal").style.display = "none";
    showToast("Progress imported successfully!", "success");
    Router.navigate("missions");
  } catch (e) {
    showToast("Invalid progress data", "error");
  }
};

Views.resetAllData = () => {
  if (confirm("Are you sure? This will delete ALL pilot progress. This cannot be undone.")) {
    if (confirm("Really? All missions, stars, and pilots will be erased.")) {
      progress.resetAll();
      showToast("All data reset", "success");
      Router.navigate("welcome");
    }
  }
};
