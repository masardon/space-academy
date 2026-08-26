// ============================================
// SPACE ACADEMY — Missions View
// ============================================

window.Views = window.Views || {};
Views.missions = () => {
  const pilot = progress.getCurrentPilot();
  const main = document.getElementById("mainContent");
  const t = (x) => I18N.t(x);

  if (!pilot) {
    Router.navigate("welcome");
    return;
  }

  const stats = progress.getProgress();
  const completedWeeks = stats.completed;
  const checkpoint = stats.checkpoint;
  const stars = stats.stars;

  // Build week cards grouped by arc
  let html = `
    <div class="view">
      <!-- Hero -->
      <div class="section-header">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
          <span style="font-size:2rem;">${progress.getPilots()[pilot]?.avatar || "👩‍🚀"}</span>
          <div>
            <h2 style="margin:0;">${t({ en: "Cadet", id: "Kadet" })} ${escapeHtml(pilot)}</h2>
            <p style="margin:0;font-size:0.875rem;color:var(--text-muted);">${progress.getPilots()[pilot]?.rank || t({ en: "New Recruit", id: "ReKRUT Baru" })}</p>
          </div>
        </div>
        <div style="display:flex;gap:16px;margin-top:16px;">
          <div style="text-align:center;padding:8px 16px;background:var(--bg-card);border-radius:12px;">
            <div style="font-size:1.25rem;font-weight:800;color:var(--warning);">${stars}</div>
            <div style="font-size:0.6875rem;color:var(--text-muted);text-transform:uppercase;">${t({ en: "Stars", id: "Bintang" })}</div>
          </div>
          <div style="text-align:center;padding:8px 16px;background:var(--bg-card);border-radius:12px;">
            <div style="font-size:1.25rem;font-weight:800;color:var(--success);">${completedWeeks}/12</div>
            <div style="font-size:0.6875rem;color:var(--text-muted);text-transform:uppercase;">${t({ en: "Missions", id: "Misi" })}</div>
          </div>
          <div style="text-align:center;padding:8px 16px;background:var(--bg-card);border-radius:12px;">
            <div style="font-size:1.25rem;font-weight:800;color:var(--info);">${checkpoint}</div>
            <div style="font-size:0.6875rem;color:var(--text-muted);text-transform:uppercase;">${t({ en: "Current", id: "Saat Ini" })}</div>
          </div>
        </div>
      </div>
  `;

  // Group weeks by arc
  for (const arc of ACADEMY.arcs) {
    const arcWeeks = ACADEMY.weeks.filter(w => w.arc === arc.id);
    html += `
      <div style="padding:24px 24px 8px;display:flex;align-items:center;gap:12px;">
        <span style="width:4px;height:24px;border-radius:2px;background:${arc.color};flex-shrink:0;"></span>
        <div>
          <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:${arc.color};">${arc.name}</div>
          <div style="font-size:0.8125rem;color:var(--text-muted);">${arc.subtitle}</div>
        </div>
      </div>
      <div class="weeks-grid">
    `;

    for (const week of arcWeeks) {
      const pilotData = progress.getPilots()[pilot];
      const isCompleted = pilotData?.weeksCompleted?.includes(week.week);
      const isAccessible = week.week <= checkpoint + 1;
      const isLocked = !isCompleted && !isAccessible;
      const color = getWeekColor(week.week);

      html += `
        <div class="week-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}"
             style="--week-color:${color};--week-bg:${color}22;"
             ${isLocked ? `role="button" tabindex="0" onclick="Views.showLockedWeekToast(${week.week})"` : `role="button" tabindex="0" aria-label="${t({ en: "Open Week", id: "Buka Minggu" })} ${week.week}: ${week.title}" onclick="Router.navigate('week',{id:'${week.week}'})"`}>
          <div class="week-number">${t({ en: "Week", id: "Minggu" })} ${String(week.week).padStart(2, '0')}</div>
          <div style="font-size:1.5rem;margin-bottom:4px;">${week.emoji}</div>
          <div class="week-title">${week.title}</div>
          <div class="week-desc">${week.hero.slice(0, 80)}...</div>
          <div class="week-meta">
            <span class="week-badge" style="--week-color:${color};--week-bg:${color}22;">${week.badge}</span>
            <span class="week-meta-item">⏱ ${week.time}</span>
          </div>
        </div>
      `;
    }

    html += `</div>`;
  }

  html += `</div>`;
  main.innerHTML = html;
};

Views.showLockedWeekToast = (weekNum) => {
  const lang = I18N.lang();
  const pilot = progress.getCurrentPilot();
  const pilotData = progress.getPilots()[pilot];
  const checkpoint = Math.max(0, ...(pilotData?.weeksCompleted || []));

  // Check license tier first
  if (typeof License !== "undefined" && !License.canAccessWeek(weekNum)) {
    const currentTier = License.tier();
    const currentLabel = License.tierLabel(currentTier);
    const msg = lang === "id"
      ? `Minggu ${weekNum} membutuhkan tier Engineer atau lebih tinggi. Tier Anda: ${currentLabel}.`
      : `Week ${weekNum} requires Engineer tier or above. Your tier: ${currentLabel}.`;
    showToast(msg, "warning");
    return;
  }

  // Progress lock
  const msg = lang === "id"
    ? `Selesaikan misi sebelumnya terlebih dahulu.`
    : `Complete previous missions first.`;
  showToast(msg, "warning");
};
