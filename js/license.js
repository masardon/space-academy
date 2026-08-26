// ============================================
// SPACE ACADEMY — License Module
// ============================================
// Client-side license validation and feature gating.
// Validates licenses online against the backend server.

const License = {
  API_BASE: window.LICENSE_SERVER_URL || "https://your-app.zeabur.app/api",
  _tier: "explorer",
  _validated: false,

  // --- Tier constants ---
  TIERS: { explorer: 0, engineer: 1, commander: 2 },
  TIER_LABELS: { explorer: "Explorer", engineer: "Engineer", commander: "Commander" },
  TIER_COLORS: { explorer: "#9b59b6", engineer: "#3498db", commander: "#e67e22" },

  // --- Core: validate license with server ---
  async validate(key, pilotName) {
    try {
      const res = await fetch(`${this.API_BASE}/licenses/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, pilotName }),
      });
      if (!res.ok) return { valid: false, error: `Server error (${res.status})` };
      return await res.json();
    } catch (e) {
      return { valid: false, error: `Network error: ${e.message}` };
    }
  },

  // --- Initialize for current pilot (called on pilot selection) ---
  async init() {
    const pilot = progress.getCurrentPilotData
      ? progress.getCurrentPilotData()
      : null;
    if (!pilot) {
      this._tier = "explorer";
      this._validated = true;
      return;
    }
    const lic = pilot.license;
    if (!lic || !lic.key) {
      this._tier = lic?.tier || "explorer";
      this._validated = true;
      return;
    }
    const result = await this.validate(lic.key, pilot.name);
    if (result.valid) {
      this._tier = result.tier;
      this._validated = true;
    } else {
      this._tier = "explorer";
      this._validated = true;
      showToast(
        I18N.t({
          en: "License verification failed. Using Explorer tier.",
          id: "Verifikasi lisensi gagal. Menggunakan tier Explorer.",
        }),
        "error"
      );
    }
  },

  // --- Accessors ---
  getTier() {
    return this._tier;
  },

  getTierLevel(tier) {
    return this.TIERS[tier] ?? 0;
  },

  tierLabel(tier) {
    return this.TIER_LABELS[tier] || tier;
  },

  tierColor(tier) {
    return this.TIER_COLORS[tier] || "#9b59b6";
  },

  // --- Feature gating ---
  canAccessWeek(weekNum) {
    const level = this.getTierLevel(this._tier);
    if (level >= 2) return true;       // Commander: all weeks
    if (level >= 1) return weekNum <= 8; // Engineer: weeks 1-8
    return weekNum <= 2;                 // Explorer: weeks 1-2
  },

  canAccessLab() {
    return this.getTierLevel(this._tier) >= 0; // All tiers get lab
  },

  canAccessLabTab(tabId) {
    const level = this.getTierLevel(this._tier);
    // Explorer: cheatsheet, terms only
    // Engineer+: all tabs
    if (["cheatsheet", "terms"].includes(tabId)) return true;
    return level >= 1;
  },

  canAccessPlayground() {
    return this.getTierLevel(this._tier) >= 2; // Commander only
  },

  canAccessView(viewName) {
    if (viewName === "lab") return this.canAccessLab();
    if (viewName === "playground") return this.canAccessPlayground();
    return true;
  },

  // --- Helpers ---
  upgradeMessage(requiredTier) {
    const current = this.tierLabel(this._tier);
    const required = this.tierLabel(requiredTier);
    const lang = I18N.lang();
    if (lang === "id") {
      return `Fitur ini membutuhkan tier ${required}. Tier Anda saat ini: ${current}.`;
    }
    return `This feature requires ${required} tier. Your current tier: ${current}.`;
  },
};

// --- Upgrade prompt view ---
Views.upgradeRequired = (feature) => {
  const main = document.getElementById("mainContent");
  const tier = License.getTier();
  const tierLabel = License.tierLabel(tier);
  const tierColor = License.tierColor(tier);
  const lang = I18N.lang();

  let featureLabel, requiredTier;
  if (feature === "lab") {
    requiredTier = "engineer";
    featureLabel = lang === "id" ? "Lab" : "Lab";
  } else if (feature === "playground") {
    requiredTier = "commander";
    featureLabel = lang === "id" ? "Playground" : "Playground";
  } else {
    requiredTier = "engineer";
    featureLabel = feature;
  }

  const requiredLabel = License.tierLabel(requiredTier);

  main.innerHTML = `
    <div class="view" style="display:flex;align-items:center;justify-content:center;min-height:60vh;padding:var(--space-6);">
      <div class="upgrade-prompt">
        <div class="upgrade-prompt-icon">🔒</div>
        <h2 class="upgrade-prompt-title">${featureLabel}</h2>
        <p class="upgrade-prompt-desc">
          ${lang === "id"
            ? `Fitur ini membutuhkan tier <strong>${requiredLabel}</strong> atau lebih tinggi.`
            : `This feature requires <strong>${requiredLabel}</strong> tier or above.`}
        </p>
        <div class="upgrade-prompt-tier">
          <span class="tier-label-text">${lang === "id" ? "Tier Anda:" : "Your tier:"}</span>
          <span class="tier-badge" style="background:${tierColor};">${tierLabel}</span>
        </div>
        <p class="upgrade-prompt-hint">
          ${lang === "id"
            ? "Hubungi administrator untuk mengupgrade lisensi pilot Anda."
            : "Contact your administrator to upgrade your pilot's license."}
        </p>
      </div>
    </div>
  `;
};
