// ============================================
// SPACE ACADEMY — Settings View
// ============================================

Views.settings = () => {
  const pilots = progress.getPilots();
  const main = document.getElementById("mainContent");

  const pilotItems = Object.values(pilots).map(p => `
    <div class="settings-item" data-pilot="${escapeHtml(p.name)}">
      <div class="settings-item-left">
        <div class="settings-item-icon">${p.avatar}</div>
        <div class="settings-item-text">
          <h4>${escapeHtml(p.name)}</h4>
          <p>${p.rank} · ${p.weeksCompleted.length} missions</p>
        </div>
      </div>
      <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  `).join('');

  main.innerHTML = `
    <div class="view">
      <div class="section-header">
        <h2>⚙️ Settings</h2>
        <p>Manage pilots and app preferences</p>
      </div>

      <div class="settings-group">
        <div class="settings-group-title">Pilots</div>
        ${pilotItems}
        <div class="settings-item" onclick="Router.navigate('pilot-select')" style="border-radius:0 0 var(--radius-lg) var(--radius-lg);">
          <div class="settings-item-left">
            <div class="settings-item-icon" style="background:var(--accent);color:white;font-size:1rem;">+</div>
            <div class="settings-item-text">
              <h4>Add New Pilot</h4>
              <p>Register a new cadet</p>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-group" style="padding-top:0;">
        <div class="settings-group-title">Data</div>
        <div class="settings-item" onclick="Views.exportData()">
          <div class="settings-item-left">
            <div class="settings-item-icon">📤</div>
            <div class="settings-item-text">
              <h4>Export Progress</h4>
              <p>Download progress as JSON</p>
            </div>
          </div>
        </div>
        <div class="settings-item" onclick="Views.importDataPrompt()">
          <div class="settings-item-left">
            <div class="settings-item-icon">📥</div>
            <div class="settings-item-text">
              <h4>Import Progress</h4>
              <p>Restore from backup file</p>
            </div>
          </div>
        </div>
        <div class="settings-item" onclick="Views.resetAllData()" style="border-radius:0 0 var(--radius-lg) var(--radius-lg);">
          <div class="settings-item-left">
            <div class="settings-item-icon" style="background:var(--error-bg);color:var(--error);">🗑️</div>
            <div class="settings-item-text">
              <h4 style="color:var(--error);">Reset All Data</h4>
              <p>Clear all progress and pilots</p>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-group" style="padding-top:0;">
        <div class="settings-group-title">About</div>
        <div class="settings-item" style="border-radius:var(--radius-lg) var(--radius-lg) 0 0;">
          <div class="settings-item-left">
            <div class="settings-item-icon">🚀</div>
            <div class="settings-item-text">
              <h4>Space Academy — Rust for Kids</h4>
              <p>Version 1.0 · Computational Thinking Curriculum</p>
            </div>
          </div>
        </div>
        <div class="settings-item" style="border-radius:0 0 var(--radius-lg) var(--radius-lg);border-bottom:none;">
          <div class="settings-item-left">
            <div class="settings-item-icon">💡</div>
            <div class="settings-item-text">
              <h4>How to Use</h4>
              <p>Each week = one mission. Follow the guide, do the challenges, earn stars!</p>
            </div>
          </div>
        </div>
      </div>

      <div style="height:24px;"></div>
    </div>

    <!-- Import modal -->
    <div id="importModal" class="modal-overlay" style="display:none;" onclick="if(event.target===this)this.style.display='none'">      <div class="modal">
        <div class="modal-header">
          <h3>Import Progress</h3>
          <button class="btn-icon" onclick="document.getElementById('importModal').style.display='none'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <p style="font-size:0.9375rem;color:var(--text-secondary);margin-bottom:16px;">Paste your exported JSON data below:</p>
          <textarea id="importData" rows="6" placeholder='{"pilots":...}'
            style="width:100%;padding:12px;border-radius:12px;border:1px solid rgba(127,90,240,0.2);background:var(--bg-elevated);color:var(--text-primary);font-family:monospace;font-size:0.8125rem;resize:vertical;outline:none;"></textarea>
          <button class="btn btn-primary btn-full" style="margin-top:12px;" onclick="Views.importData()">Import</button>
        </div>
      </div>
    </div>

    <input type="file" id="fileInput" accept=".json" style="display:none;" onchange="Views.importFile(event)">
  `;

  main.querySelectorAll(".settings-item[data-pilot]").forEach(item => {
    item.addEventListener("click", () => Views.switchPilot(item.dataset.pilot));
  });
};

Views.switchPilot = (name) => {
  progress.setCurrentPilot(name);
  Router.navigate("missions");
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

Views.importFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      progress.importData(JSON.parse(e.target.result));
      showToast("Progress imported!", "success");
      Router.navigate("missions");
    } catch {
      showToast("Invalid file", "error");
    }
  };
  reader.readAsText(file);
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
