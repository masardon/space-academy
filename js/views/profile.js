// ============================================
// SPACE ACADEMY — Profile View
// ============================================

window.Views = window.Views || {};
Views.profile = () => {
  const pilotName = progress.getCurrentPilot();
  const pilot = progress.getPilots()[pilotName];
  const stats = progress.getProgress();
  const main = document.getElementById("mainContent");
  const t = I18N.t.bind(I18N);
  const ui = I18N.ui[I18N.lang()];
  const uiEn = I18N.ui.en;

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
           ${!locked ? `role="button" tabindex="0" aria-label="${t({ en: uiEn.hdr_week, id: ui.hdr_week }).replace('{num}', w.week)}" onclick="Router.navigate('week',{id:'${w.week}'})"` : ''}>
        <div class="week-mini-num">${w.week}</div>
        <div class="week-mini-icon">${done ? '✓' : locked ? '🔒' : w.emoji}</div>
      </div>
    `;
  }).join('');

  // Quiz Stars per week
  const quizStarsHtml = ACADEMY.weeks.map(w => {
    const quiz = progress.getQuizScore(w.week);
    const stars = quiz ? Math.min(3, Math.round((quiz.score / quiz.total) * 3)) : 0;
    const show = pilot.weeksCompleted?.includes(w.week) || (quiz && quiz.score > 0);
    if (!show) return '';
    return `
      <div class="quiz-star-row" style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:var(--bg-card);border-radius:var(--radius-md);margin-bottom:8px;">
        <span style="font-size:1.25rem;">${w.emoji}</span>
        <span style="flex:1;font-weight:500;">${t({ en: uiEn.week_label, id: ui.week_label }).replace('{num}', w.week)}: ${w.title}</span>
        <span style="display:flex;gap:4px;">
          ${Array.from({length: 3}, (_, i) => `
            <span style="color:${i < stars ? 'var(--accent)' : 'var(--text-muted)'};font-size:1.125rem;">★</span>
          `).join('')}
        </span>
        ${quiz ? `<span style="font-size:0.75rem;color:var(--text-muted);">${quiz.score}/${quiz.total}</span>` : ''}
      </div>
    `;
  }).join('');

  // Flight Log (Reflections)
  const reflectionsHtml = ACADEMY.weeks.map(w => {
    const reflections = progress.getReflections(w.week);
    if (!reflections || reflections.length === 0) return '';
    return `
      <div class="flight-log-entry" style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="font-size:1.25rem;">${w.emoji}</span>
          <span style="font-weight:600;">${t({ en: uiEn.week_label, id: ui.week_label }).replace('{num}', w.week)}: ${w.title}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${reflections.map((ans, i) => `
            <div style="background:var(--bg-card);border-radius:var(--radius-md);padding:12px;border-left:3px solid var(--accent);">
              <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">${t({ en: uiEn.prof_reflection_n, id: ui.prof_reflection_n }).replace('{n}', i + 1)}</div>
              <div style="white-space:pre-wrap;font-size:0.875rem;line-height:1.5;">${escapeHtml(ans)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  main.innerHTML = `
    <div class="view">
      <div class="profile-header">
        <div class="profile-avatar">${pilot.avatar}</div>
        <div class="profile-name">${escapeHtml(pilot.name)}</div>
        <div class="profile-rank">${stats.rank}</div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${stats.completed}</div>
          <div class="stat-label">${t({ en: uiEn.prof_missions, id: ui.prof_missions })}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.stars}</div>
          <div class="stat-label">${t({ en: uiEn.prof_stars, id: ui.prof_stars })}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.percent}%</div>
          <div class="stat-label">${t({ en: uiEn.prof_complete, id: ui.prof_complete })}</div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div style="padding:0 var(--space-6) var(--space-6);">
        <div style="background:var(--bg-card);border-radius:var(--radius-md);padding:var(--space-4);">
          <div style="display:flex;justify-content:space-between;font-size:0.8125rem;color:var(--text-muted);margin-bottom:8px;">
            <span>${t({ en: uiEn.prof_progress, id: ui.prof_progress })}</span>
            <span>${t({ en: uiEn.prof_progress_of, id: ui.prof_progress_of }).replace('{n}', stats.completed)}</span>
          </div>
          <div style="height:8px;background:var(--bg-elevated);border-radius:var(--radius-full);overflow:hidden;">
            <div style="height:100%;width:${stats.percent}%;background:linear-gradient(90deg,var(--accent),var(--accent-light));border-radius:var(--radius-full);transition:width 0.5s ease;"></div>
          </div>
        </div>
      </div>

      <!-- Week Grid -->
      <div style="padding:0 var(--space-6);">
        <h3 style="font-size:0.875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">${t({ en: uiEn.prof_mission_map, id: ui.prof_mission_map })}</h3>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;">
          ${weeksHtml}
        </div>
      </div>

      <!-- Quiz Stars -->
      <div style="padding:var(--space-6);">
        <h3 style="font-size:0.875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">${t({ en: uiEn.prof_quiz_stars, id: ui.prof_quiz_stars })}</h3>
        ${quizStarsHtml || `
          <div class="empty-state" style="padding:24px;">
            <div style="font-size:2rem;margin-bottom:8px;">⭐</div>
            <p style="font-size:0.9375rem;color:var(--text-secondary);">${t({ en: uiEn.prof_empty_quiz, id: ui.prof_empty_quiz })}</p>
          </div>
        `}
      </div>

      <!-- Flight Log (Reflections) -->
      <div style="padding:var(--space-6);">
        <h3 style="font-size:0.875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">${t({ en: uiEn.prof_flight_log, id: ui.prof_flight_log })}</h3>
        ${reflectionsHtml || `
          <div class="empty-state" style="padding:24px;">
            <div style="font-size:2rem;margin-bottom:8px;">📖</div>
            <p style="font-size:0.9375rem;color:var(--text-secondary);">${t({ en: uiEn.prof_empty_reflections, id: ui.prof_empty_reflections })}</p>
          </div>
        `}
      </div>

      <!-- Completed Missions -->
      <div style="padding:var(--space-6);">
        <h3 style="font-size:0.875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">${t({ en: uiEn.prof_completed_missions, id: ui.prof_completed_missions })}</h3>
        ${stats.completed > 0 ? `
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${(stats.weeksCompleted || []).map(w => {
              const week = ACADEMY.weeks.find(wh => wh.week === w);
              return `
                <div class="card card-interactive" role="button" tabindex="0" style="padding:12px 16px;display:flex;align-items:center;gap:12px;" onclick="Router.navigate('week',{id:'${w}'})">
                  <span style="font-size:1.5rem;">${week?.emoji || "📦"}</span>
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:0.9375rem;">${t({ en: uiEn.week_label, id: ui.week_label }).replace('{num}', w)}: ${week?.title}</div>
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
            <p style="font-size:0.9375rem;color:var(--text-secondary);">${t({ en: uiEn.prof_no_missions, id: ui.prof_no_missions })}</p>
          </div>
        `}
      </div>

      <div style="height:24px;"></div>
    </div>
  `;
};
