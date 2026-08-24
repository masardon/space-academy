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
    "profile": "profile",
    "settings": "settings",
  },

  init() {
    window.addEventListener("popstate", () => this._handleRoute());
    this._handleRoute();
  },

  _handleRoute() {
    const hash = location.hash.slice(1) || "";
    const parts = hash.split("/");
    const view = parts[0] || "welcome";
    this.params = {};
    if (parts[1]) this.params.id = parts[1];
    if (parts[2]) this.params.sub = parts[2];
    this.currentView = view;
    this._render();
  },

  navigate(view, params = {}) {
    let hash = `#${view}`;
    if (params.id) hash += `/id=${params.id}`;
    if (params.sub) hash += `/sub=${params.sub}`;
    location.hash = hash;
  },

  goBack() {
    history.back();
  },

  _render() {
    const viewMap = {
      "welcome": Views.welcome,
      "pilot-select": Views.pilotSelect,
      "missions": Views.missions,
      "week": Views.weekDetail,
      "lab": Views.lab,
      "profile": Views.profile,
      "settings": Views.settings,
    };

    const renderFn = viewMap[this.currentView] || Views.welcome;
    renderFn(this.params);

    // Update nav state
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
        `Week ${stats.checkpoint}/12 · ${stats.completed} missions done`;
    } else {
      progressBar.hidden = true;
    }

    // Update header title
    const titles = {
      "welcome": "Space Academy",
      "pilot-select": "Choose Your Pilot",
      "missions": "Missions",
      "week": `Week ${this.params.id || ""}`,
      "lab": "Lab",
      "profile": "Pilot Profile",
      "settings": "Settings",
    };
    document.getElementById("headerTitle").textContent = titles[this.currentView] || "Space Academy";
  },
};
