// ============================================
// SPACE ACADEMY — Welcome View
// ============================================

const Views = {};

Views.welcome = () => {
  const pilot = progress.getCurrentPilot();
  const main = document.getElementById("mainContent");

  if (pilot) {
    // Show continue option
    main.innerHTML = `
      <div class="view welcome-screen">
        <div class="welcome-logo">🚀</div>
        <h1 class="welcome-title">Space Academy</h1>
        <p class="welcome-subtitle">
          Welcome back, <strong>${escapeHtml(pilot)}</strong>!<br>
          Your missions await in the stars.
        </p>
        <button class="btn btn-primary btn-large" onclick="Router.navigate('missions')">
          Resume Missions
        </button>
        <div style="margin-top:24px;">
          <button class="btn btn-ghost" onclick="Router.navigate('pilot-select')" style="font-size:0.875rem;">
            Switch Pilot
          </button>
        </div>
      </div>
    `;
  } else {
    main.innerHTML = `
      <div class="view welcome-screen">
        <div class="welcome-logo">🚀</div>
        <h1 class="welcome-title">Space Academy</h1>
        <p class="welcome-subtitle">
          Learn computational thinking through Rust —<br>
          for kids who love to build, explore, and solve problems.
        </p>
        <button class="btn btn-primary btn-large btn-full" onclick="Router.navigate('pilot-select')" style="max-width:320px;margin:0 auto;display:block;">
          🛸 Start Your Mission
        </button>
        <p style="margin-top:32px;font-size:0.8125rem;color:var(--text-muted);line-height:1.6;">
          12 weeks · Ages 9+ · No experience needed<br>
          Built for Android tablets & Chromebooks
        </p>
      </div>
    `;
  }
};
