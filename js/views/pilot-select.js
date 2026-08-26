// ============================================
// SPACE ACADEMY — Pilot Select View
// ============================================

window.Views = window.Views || {};
Views.pilotSelect = () => {
  const pilots = progress.getPilots();
  const main = document.getElementById("mainContent");
  const t = I18N.t.bind(I18N);

  const pilotCards = Object.values(pilots).map(p => `
    <div class="pilot-card" role="button" tabindex="0" aria-label="${t(I18N.ui.en.btn_profile)} ${escapeHtml(p.name)}" data-pilot="${escapeHtml(p.name)}">
      <div class="pilot-avatar">${p.avatar}</div>
      <div class="pilot-name">${escapeHtml(p.name)}</div>
      <div class="pilot-rank">${p.rank}</div>
      <div class="pilot-stats">
        <span><span class="pilot-stat-value">${p.weeksCompleted.length}</span> ${t({ en: I18N.ui.en.ps_missions_suffix, id: I18N.ui.id.ps_missions_suffix })}</span>
        <span><span class="pilot-stat-value">${p.totalStars}</span> ★</span>
      </div>
    </div>
  `).join("");

  main.innerHTML = `
    <div class="view">
      <div class="section-header text-center" style="padding-bottom:0;">
        <h2>${t({ en: I18N.ui.en.ps_choose_pilot, id: I18N.ui.id.ps_choose_pilot })}</h2>
        <p>${t({ en: I18N.ui.en.ps_select_cadet, id: I18N.ui.id.ps_select_cadet })}</p>
      </div>
      <div class="pilot-grid" style="padding-top:32px;">
        ${pilotCards}
        <div class="pilot-card" role="button" tabindex="0" onclick="Views.showNewPilotForm()" style="border-style:dashed;">
          <div class="pilot-avatar" style="font-size:2rem;color:var(--accent-light);">+</div>
          <div class="pilot-name">${t({ en: I18N.ui.en.ps_new_cadet, id: I18N.ui.id.ps_new_cadet })}</div>
          <div class="pilot-rank">${t({ en: I18N.ui.en.ps_join_academy, id: I18N.ui.id.ps_join_academy })}</div>
        </div>
      </div>
    </div>
    <!-- New pilot modal -->
    <div id="newPilotModal" class="modal-overlay" onclick="Views.closeNewPilotModal(event)">
      <div class="modal">
        <div class="modal-header">
          <h3>${t({ en: I18N.ui.en.ps_new_cadet, id: I18N.ui.id.ps_new_cadet })}</h3>
          <button class="btn-icon" onclick="Views.closeNewPilotModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">${t({ en: I18N.ui.en.ps_cadet_name, id: I18N.ui.id.ps_cadet_name })}</label>
            <input type="text" id="newPilotName" placeholder="${t({ en: I18N.ui.en.ps_enter_name, id: I18N.ui.id.ps_enter_name })}" maxlength="20"
              style="width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(127,90,240,0.2);background:var(--bg-elevated);color:var(--text-primary);font-size:1rem;outline:none;"
              onkeydown="if(event.key==='Enter')Views.createPilot()">
          </div>
          <button class="btn btn-primary btn-full" onclick="Views.createPilot()">
            ${t({ en: I18N.ui.en.ps_join_btn, id: I18N.ui.id.ps_join_btn })}
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
  const t = I18N.t.bind(I18N);
  showToast(t({ en: I18N.ui.en.ps_welcome_toast, id: I18N.ui.id.ps_welcome_toast }).replace("{name}", name), "success");
};
