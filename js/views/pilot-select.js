// ============================================
// SPACE ACADEMY — Pilot Select View
// ============================================

Views.pilotSelect = () => {
  const pilots = progress.getPilots();
  const main = document.getElementById("mainContent");

  const pilotCards = Object.values(pilots).map(p => `
    <div class="pilot-card" data-pilot="${escapeHtml(p.name)}">
      <div class="pilot-avatar">${p.avatar}</div>
      <div class="pilot-name">${escapeHtml(p.name)}</div>
      <div class="pilot-rank">${p.rank}</div>
      <div class="pilot-stats">
        <span><span class="pilot-stat-value">${p.weeksCompleted.length}</span> missions</span>
        <span><span class="pilot-stat-value">${p.totalStars}</span> ★</span>
      </div>
    </div>
  `).join("");

  main.innerHTML = `
    <div class="view">
      <div class="section-header text-center" style="padding-bottom:0;">
        <h2>Choose Your Pilot</h2>
        <p>Select a cadet to continue their journey</p>
      </div>
      <div class="pilot-grid" style="padding-top:32px;">
        ${pilotCards}
        <div class="pilot-card" onclick="Views.showNewPilotForm()" style="border-style:dashed;">
          <div class="pilot-avatar" style="font-size:2rem;color:var(--accent-light);">+</div>
          <div class="pilot-name">New Cadet</div>
          <div class="pilot-rank">Join the Academy</div>
        </div>
      </div>
    </div>
    <!-- New pilot modal -->
    <div id="newPilotModal" class="modal-overlay" onclick="Views.closeNewPilotModal(event)">
      <div class="modal">
        <div class="modal-header">
          <h3>New Cadet</h3>
          <button class="btn-icon" onclick="Views.closeNewPilotModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">Cadet Name</label>
            <input type="text" id="newPilotName" placeholder="Enter name..." maxlength="20"
              style="width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(127,90,240,0.2);background:var(--bg-elevated);color:var(--text-primary);font-size:1rem;outline:none;"
              onkeydown="if(event.key==='Enter')Views.createPilot()">
          </div>
          <button class="btn btn-primary btn-full" onclick="Views.createPilot()">
            🚀 Join Space Academy
          </button>
        </div>
      </div>
    </div>
  `;

  main.querySelectorAll(".pilot-card[data-pilot]").forEach(card => {
    card.addEventListener("click", () => Views.selectPilot(card.dataset.pilot));
  });
};

Views.selectPilot = (name) => {
  progress.setCurrentPilot(name);
  Router.navigate("missions");
};

Views.showNewPilotForm = () => {
  const modal = document.getElementById("newPilotModal");
  modal.style.display = "flex";
  setTimeout(() => document.getElementById("newPilotName").focus(), 100);
};

Views.closeNewPilotModal = (e) => {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById("newPilotModal").style.display = "none";
};

Views.createPilot = () => {
  const input = document.getElementById("newPilotName");
  const name = input.value.trim();
  if (!name) {
    input.style.borderColor = "var(--error)";
    input.focus();
    return;
  }
  progress.ensurePilot(name);
  progress.setCurrentPilot(name);
  document.getElementById("newPilotModal").style.display = "none";
  Router.navigate("missions");
  showToast(`Welcome to the Academy, Cadet ${name}!`, "success");
};
