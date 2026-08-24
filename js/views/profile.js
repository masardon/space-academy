// ============================================
// SPACE ACADEMY — Profile View
// ============================================

Views.profile = () => {
  const pilotName = progress.getCurrentPilot();
  const pilot = progress.getPilots()[pilotName];
  const stats = progress.getProgress();
  const main = document.getElementById("mainContent");

  if (!pilot) {
    Router.navigate("welcome");
    return;
  }

  // Build week progress grid
  const weeksHtml = ACADEMY.weeks.map(w => {
    const done = pilot.weeksCompleted?.includes(w.week);
    const current = w.week === stats.checkpoint + 1;
    const locked = w.week > stats.checkpoint + 1;
    const color = getWeekColor(w.week);
    return `
      <div class="week-mini ${done ? 'done' : ''} ${locked ? 'locked' : ''}"
           style="--wc:${color};"
           ${!locked ? `onclick="Router.navigate('week',{id:'${w.week}'})"` : ''}>
        <div class="week-mini-num">${w.week}</div>
        <div class="week-mini-icon">${done ? '✓' : locked ? '🔒' : w.emoji}</div>
      </div>
    `;
  }).join('');

  main.innerHTML = `
    <div class="view">
      <div class="profile-header">
        <div class="profile-avatar">${pilot.avatar}</div>
        <div class="profile-name">${pilot.name}</div>
        <div class="profile-rank">${stats.rank}</div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${stats.completed}</div>
          <div class="stat-label">Missions</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.stars}</div>
          <div class="stat-label">Stars</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.percent}%</div>
          <div class="stat-label">Complete</div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div style="padding:0 var(--space-6) var(--space-6);">
        <div style="background:var(--bg-card);border-radius:var(--radius-md);padding:var(--space-4);">
          <div style="display:flex;justify-content:space-between;font-size:0.8125rem;color:var(--text-muted);margin-bottom:8px;">
            <span>Progress</span>
            <span>${stats.completed} of 12 missions</span>
          </div>
          <div style="height:8px;background:var(--bg-elevated);border-radius:var(--radius-full);overflow:hidden;">
            <div style="height:100%;width:${stats.percent}%;background:linear-gradient(90deg,var(--accent),var(--accent-light));border-radius:var(--radius-full);transition:width 0.5s ease;"></div>
          </div>
        </div>
      </div>

      <!-- Week Grid -->
      <div style="padding:0 var(--space-6);">
        <h3 style="font-size:0.875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Mission Map</h3>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;">
          ${weeksHtml}
        </div>
      </div>

      <!-- Completed Missions -->
      <div style="padding:var(--space-6);">
        <h3 style="font-size:0.875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Completed Missions</h3>
        ${stats.completed > 0 ? `
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${(stats.weeksCompleted || []).map(w => {
              const week = ACADEMY.weeks.find(wh => wh.week === w);
              return `
                <div class="card card-interactive" style="padding:12px 16px;display:flex;align-items:center;gap:12px;" onclick="Router.navigate('week',{id:'${w}'})">
                  <span style="font-size:1.5rem;">${week?.emoji || "📦"}</span>
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:0.9375rem;">Week ${w}: ${week?.title}</div>
                    <div style="font-size:0.8125rem;color:var(--text-muted);">${week?.badge}</div>
                  </div>
                  <span style="color:var(--success);font-size:1.25rem;">✓</span>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="empty-state" style="padding:24px;">
            <div style="font-size:2rem;margin-bottom:8px;">🌟</div>
            <p style="font-size:0.9375rem;color:var(--text-secondary);">No missions completed yet. Start your first mission!</p>
          </div>
        `}
      </div>

      <div style="height:24px;"></div>
    </div>
  `;
};
