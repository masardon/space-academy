// ============================================
// SPACE ACADEMY — Router
// ============================================

const Router = {
  currentView: "welcome",
  params: {},

  routes: {
    "": "welcome",
    "missions": "missions",
    "lab": "lab",
    "playground": "playground",
    "profile": "profile",
    "settings": "settings",
    "about": "about",
  },

  init() {
    window.addEventListener("popstate", () => this._handleRoute());
    window.addEventListener("hashchange", () => this._handleRoute());
    this._handleRoute();
  },

  async _handleRoute() {
    const hash = location.hash.slice(1) || "";
    const parts = hash.split("/");
    const view = parts[0] || "welcome";
    this.params = {};
    // Segments may be "id=3" (from navigate) or bare values like "week/3"
    for (let i = 1; i < parts.length; i++) {
      const eq = parts[i].indexOf("=");
      if (eq > -1) {
        this.params[parts[i].slice(0, eq)] = parts[i].slice(eq + 1);
      } else if (!this.params.id) {
        this.params.id = parts[i];
      }
    }
    this.currentView = view;
    await this._render();
  },

  navigate(view, params = {}) {
    let hash = `#${view}`;
    const paramParts = [];
    if (params.id) paramParts.push(`id=${params.id}`);
    if (params.sub) paramParts.push(`sub=${params.sub}`);
    if (params.week) paramParts.push(`week=${params.week}`);
    // Handle any additional params
    Object.keys(params).forEach(key => {
      if (!['id', 'sub', 'week'].includes(key)) {
        paramParts.push(`${key}=${params[key]}`);
      }
    });
    if (paramParts.length) hash += `/${paramParts.join('/')}`;
    location.hash = hash;
  },

  goBack() {
    history.back();
  },

  async _render() {
    const viewMap = {
      "welcome": Views.welcome,
      "pilot-select": Views.pilotSelect,
      "missions": Views.missions,
      "week": Views.weekDetail,
      "lab": Views.lab,
      "playground": Views.playground,
      "profile": Views.profile,
      "settings": Views.settings,
      "about": Views.about,
    };

    const renderFn = viewMap[this.currentView] || Views.welcome;

    // Gate lab and playground by license tier
    if (["lab", "playground"].includes(this.currentView)) {
      if (typeof License !== "undefined" && !License.canAccessView(this.currentView)) {
        // Show upgrade prompt, then update nav/header as usual
        Views.upgradeRequired(this.currentView);
        this._updateNav();
        return;
      }
    }

    // Pass params to views that support them (about, playground, etc.)
    if (['about', 'playground', 'week'].includes(this.currentView)) {
      await renderFn(this.params);
    } else {
      await renderFn();
    }

    this._updateNav();
  },

  _updateNav() {
    document.getElementById("btnBack").hidden =
      !["week", "settings"].includes(this.currentView);

    const bottomNav = document.getElementById("bottomNav");
    const isGuest = ["welcome", "pilot-select"].includes(this.currentView);
    bottomNav.hidden = isGuest;

    // Update nav active state
    document.querySelectorAll(".nav-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === this.currentView);
    });

    // Update progress bar
    const pilot = progress.getCurrentPilot();
    const progressBar = document.getElementById("progressBar");
    if (pilot && !isGuest) {
      const stats = progress.getProgress();
      progressBar.hidden = false;
      document.getElementById("progressFill").style.width = `${stats.percent}%`;
      document.getElementById("progressLabel").textContent =
        I18N.t(I18N.ui[I18N.lang()].progress_label || I18N.ui.en.progress_label)
          .replace("{checkpoint}", stats.checkpoint)
          .replace("{completed}", stats.completed);
    } else {
      progressBar.hidden = true;
    }

    // Update header title
    const titles = {
      "welcome": I18N.ui[I18N.lang()].hdr_welcome,
      "pilot-select": I18N.ui[I18N.lang()].hdr_pilot_select,
      "missions": I18N.ui[I18N.lang()].hdr_missions,
      "week": I18N.ui[I18N.lang()].hdr_week.replace("{num}", this.params.id || ""),
      "lab": I18N.ui[I18N.lang()].hdr_lab,
      "playground": I18N.ui[I18N.lang()].hdr_playground,
      "profile": I18N.ui[I18N.lang()].hdr_profile,
      "settings": I18N.ui[I18N.lang()].hdr_settings,
      "about": I18N.ui[I18N.lang()].hdr_about,
    };
    document.getElementById("headerTitle").textContent = titles[this.currentView] || I18N.ui[I18N.lang()].hdr_welcome;
  },
};
