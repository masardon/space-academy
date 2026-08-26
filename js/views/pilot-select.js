// ============================================
// SPACE ACADEMY — Pilot Select View
// ============================================

window.Views = window.Views || {};
Views.pilotSelect = async () => {
  const pilots = progress.getPilots();
  const main = document.getElementById("mainContent");
  const t = I18N.t.bind(I18N);
  const ui = I18N.ui[I18N.lang()];
  const uiEn = I18N.ui.en;

  const pilotCards = Object.values(pilots).map(p => {
    const tier = p.license?.tier || "explorer";
    const tierLabel = License.tierLabel(tier);
    const tierColor = License.tierColor(tier);
    return `
    <div class="pilot-card" role="button" tabindex="0" aria-label="${t({ en: uiEn.btn_profile, id: ui.btn_profile })} ${escapeHtml(p.name)}" data-pilot="${escapeHtml(p.name)}">
      <div class="pilot-avatar">${p.avatar}</div>
      <div class="pilot-name">${escapeHtml(p.name)}</div>
      <div class="pilot-rank">${p.rank}</div>
      <div class="pilot-tier-badge" style="background:${tierColor};">${tierLabel}</div>
      <div class="pilot-stats">
        <span><span class="pilot-stat-value">${p.weeksCompleted.length}</span> ${t({ en: uiEn.ps_missions_suffix, id: ui.ps_missions_suffix })}</span>
        <span><span class="pilot-stat-value">${p.totalStars}</span> ★</span>
      </div>
    </div>
  `}).join("");

  main.innerHTML = `
    <div class="view">
      <div class="section-header text-center" style="padding-bottom:0;">
        <h2>${t({ en: uiEn.ps_choose_pilot, id: ui.ps_choose_pilot })}</h2>
        <p>${t({ en: uiEn.ps_select_cadet, id: ui.ps_select_cadet })}</p>
      </div>
      <div class="pilot-grid" style="padding-top:32px;">
        ${pilotCards}
        <div class="pilot-card" role="button" tabindex="0" onclick="Views.showNewPilotForm()" style="border-style:dashed;">
          <div class="pilot-avatar" style="font-size:2rem;color:var(--accent-light);">+</div>
          <div class="pilot-name">${t({ en: uiEn.ps_new_cadet, id: ui.ps_new_cadet })}</div>
          <div class="pilot-rank">${t({ en: uiEn.ps_join_acadet, id: ui.ps_join_academy })}</div>
        </div>
      </div>
    </div>
    <!-- New pilot modal -->
    <div id="newPilotModal" class="modal-overlay" onclick="Views.closeNewPilotModal(event)">
      <div class="modal">
        <div class="modal-header">
          <h3>${t({ en: uiEn.ps_new_cadet, id: ui.ps_new_cadet })}</h3>
          <button class="btn-icon" onclick="Views.closeNewPilotModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">${t({ en: uiEn.ps_cadet_name, id: ui.ps_cadet_name })}</label>
            <input type="text" id="newPilotName" placeholder="${t({ en: uiEn.ps_enter_name, id: ui.ps_enter_name })}" maxlength="20"
              style="width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(127,90,240,0.2);background:var(--bg-elevated);color:var(--text-primary);font-size:1rem;outline:none;"
              onkeydown="if(event.key==='Enter')document.getElementById('newPilotLicense').focus()">
          </div>
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">${t({ en: uiEn.ps_license_key, id: ui.ps_license_key })}</label>
            <input type="text" id="newPilotLicense" placeholder="SA-XX-XXXX-XXXX" maxlength="60"
              style="width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(127,90,240,0.2);background:var(--bg-elevated);color:var(--text-primary);font-size:0.875rem;font-family:monospace;outline:none;"
              onkeydown="if(event.key==='Enter')Views.createPilot()">
            <p style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;">${t({ en: uiEn.ps_license_optional, id: ui.ps_license_optional })}</p>
            <p id="licenseError" style="font-size:0.75rem;color:var(--error);margin-top:6px;display:none;"></p>
          </div>
          <button class="btn btn-primary btn-full" onclick="Views.createPilot()">
            ${t({ en: uiEn.ps_join_btn, id: ui.ps_join_btn })}
          </button>
        </div>
      </div>
    </div>

    <!-- Update License Confirmation modal -->
    <div id="confirmUpdateLicenseModal" class="modal-overlay" style="display:none;" onclick="if(event.target===this)Views.closeConfirmUpdateLicense()">
      <div class="modal">
        <div class="modal-header">
          <h3>🔄 ${t({ en: uiEn.ps_update_license_title, id: ui.ps_update_license_title })}</h3>
          <button class="btn-icon" onclick="Views.closeConfirmUpdateLicense()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <p id="confirmUpdateLicenseMsg" style="font-size:0.9375rem;color:var(--text-secondary);margin-bottom:16px;"></p>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-ghost btn-full" onclick="Views.closeConfirmUpdateLicense()">
              ${t({ en: "Cancel", id: "Batal" })}
            </button>
            <button class="btn btn-primary btn-full" onclick="Views.confirmUpdateLicense()">
              ${t({ en: "Update License", id: "Update Lisensi" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  main.querySelectorAll(".pilot-card[data-pilot]").forEach(card => {
    card.addEventListener("click", () => Views.selectPilot(card.dataset.pilot));
  });
};

Views.selectPilot = async (name) => {
  progress.setCurrentPilot(name);
  await License.init();
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
  const errEl = document.getElementById("licenseError");
  if (errEl) errEl.style.display = "none";
};

Views.createPilot = async () => {
  const nameInput = document.getElementById("newPilotName");
  const licenseInput = document.getElementById("newPilotLicense");
  const errEl = document.getElementById("licenseError");
  const t = I18N.t.bind(I18N);
  const ui = I18N.ui[I18N.lang()];
  const uiEn = I18N.ui.en;

  const name = nameInput.value.trim();
  if (!name) {
    nameInput.style.borderColor = "var(--error)";
    nameInput.focus();
    return;
  }
  nameInput.style.borderColor = "";

  const licenseKey = licenseInput.value.trim();
  let license = { key: null, tier: "explorer", activatedAt: null };

  if (licenseKey) {
    // Check if this license key is already used by another pilot
    const pilots = progress.getPilots();
    const keyUsedBy = Object.values(pilots).find(
      p => p.license?.key && p.license.key.toLowerCase() === licenseKey.toLowerCase() && p.name.toLowerCase() !== name.toLowerCase()
    );
    if (keyUsedBy) {
      errEl.textContent = t({ en: uiEn.ps_license_already_used, id: ui.ps_license_already_used }).replace("{name}", keyUsedBy.name);
      errEl.style.display = "block";
      licenseInput.style.borderColor = "var(--error)";
      return;
    }

    // Validate license with server
    const result = await License.validate(licenseKey, name);
    if (!result.valid) {
      errEl.textContent = t({ en: uiEn.ps_license_invalid, id: ui.ps_license_invalid });
      errEl.style.display = "block";
      licenseInput.style.borderColor = "var(--error)";
      return;
    }
    license = { key: licenseKey, tier: result.tier, activatedAt: Date.now() };
    errEl.style.display = "none";
  }

  // Check if pilot already exists
  const pilots = progress.getPilots();
  const existingPilot = pilots[name];
  if (existingPilot && licenseKey) {
    const currentTier = existingPilot.license?.tier || "explorer";
    const tierOrder = { explorer: 0, engineer: 1, commander: 2 };
    // Prevent downgrade
    if (tierOrder[license.tier] < tierOrder[currentTier]) {
      const lang = I18N.lang();
      const currentLabel = License.tierLabel(currentTier);
      const newLabel = License.tierLabel(license.tier);
      const msg = lang === "id"
        ? `Tidak dapat downgrade ${name} dari ${currentLabel} ke ${newLabel}.`
        : `Cannot downgrade ${name} from ${currentLabel} to ${newLabel}.`;
      errEl.textContent = msg;
      errEl.style.display = "block";
      return;
    }
    // Different tier — show confirmation
    if (tierOrder[license.tier] !== tierOrder[currentTier]) {
      // Show confirmation modal
      const lang = I18N.lang();
      const currentLabel = License.tierLabel(currentTier);
      const newLabel = License.tierLabel(license.tier);
      const msg = lang === "id"
        ? `Pilot "${name}" sudah ada dengan tier ${currentLabel}. Update lisensi ke ${newLabel}?`
        : `Pilot "${name}" already exists with ${currentLabel} tier. Update license to ${newLabel}?`;
      document.getElementById("confirmUpdateLicenseMsg").textContent = msg;
      Views._pendingPilotData = { name, license };
      document.getElementById("confirmUpdateLicenseModal").style.display = "flex";
      return;
    }
  }

  progress.ensurePilot(name, license);
  progress.setCurrentPilot(name);
  document.getElementById("newPilotModal").style.display = "none";
  await License.init();
  Router.navigate("missions");
  showToast(t({ en: uiEn.ps_welcome_toast, id: ui.ps_welcome_toast }).replace("{name}", name), "success");
};

Views.closeConfirmUpdateLicense = () => {
  document.getElementById("confirmUpdateLicenseModal").style.display = "none";
  Views._pendingPilotData = null;
};

Views.confirmUpdateLicense = async () => {
  const t = I18N.t.bind(I18N);
  const uiEn = I18N.ui.en;
  const data = Views._pendingPilotData;
  if (!data) return;

  progress.updatePilotLicenseByName(data.name, data.license);
  progress.setCurrentPilot(data.name);
  document.getElementById("confirmUpdateLicenseModal").style.display = "none";
  document.getElementById("newPilotModal").style.display = "none";
  Views._pendingPilotData = null;
  await License.init();
  Router.navigate("missions");
  showToast(t({ en: uiEn.ps_welcome_toast, id: ui.ps_welcome_toast }).replace("{name}", data.name), "success");
};
