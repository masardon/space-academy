// ============================================
// SPACE ACADEMY — Week Detail View (lesson)
// ============================================
// Renders a full guided lesson when LESSONS[week] exists, and falls back to
// the classic mission view otherwise (used while content is being authored).

window.Views = window.Views || {};
const QuizState = {};

Views.weekDetail = (params) => {
  const weekNum = parseInt(params.id);
  const week = ACADEMY.weeks.find(w => w.week === weekNum);
  const main = document.getElementById("mainContent");

  if (!week) {
    Router.navigate("missions");
    return;
  }

  // Gate: check if pilot's license tier allows this week
  if (typeof License !== "undefined" && !License.canAccessWeek(weekNum)) {
    const t = I18N.t.bind(I18N);
    const ui = I18N.ui[I18N.lang()];
    const uiEn = I18N.ui.en;
    const color = getWeekColor(weekNum);
    const arc = getWeekArc(weekNum);
    main.innerHTML = `
      <div class="view slide-in">
        <div class="week-hero" style="--week-glow:${color}33;">
          <div class="week-arc-badge">
            <span>${arc?.emoji || "🚀"}</span>
            <span>${arc?.name || t({ en: uiEn.wd_arc_label, id: ui.wd_arc_label })}</span>
          </div>
          <div style="font-size:3rem;margin-bottom:8px;">${week.emoji}</div>
          <h1 class="week-hero-title" style="--week-color:${color};">
            ${t({ en: uiEn.week_label, id: ui.week_label }).replace('{num}', String(week.week).padStart(2, '0'))}: ${week.title}
          </h1>
          <p class="week-hero-desc">${week.mission}</p>
        </div>
        ${Views.upgradeRequired("week")}
      </div>
    `;
    return;
  }

  const lesson = (typeof LESSONS !== "undefined") ? LESSONS[weekNum] : null;
  const t = (x) => I18N.t(x);
  const color = getWeekColor(weekNum);
  const arc = getWeekArc(weekNum);
  const pilotName = progress.getCurrentPilot();
  const pilotData = progress.getPilots()[pilotName];
  const isCompleted = pilotData?.weeksCompleted?.includes(weekNum);

  if (lesson && !QuizState[weekNum]) {
    QuizState[weekNum] = { answered: {}, correct: 0 };
  }

  let html = `<div class="view slide-in">`;

  // ---- Story ----
  html += `
    <div class="week-hero" style="--week-glow:${color}33;" id="sec-story">
      <div class="week-arc-badge">
        <span>${arc?.emoji || "🚀"}</span>
        <span>${arc?.name || I18N.t({ en: I18N.ui.en.wd_arc_label, id: I18N.ui.id.wd_arc_label })}</span>
      </div>
      <div style="font-size:3rem;margin-bottom:8px;">${week.emoji}</div>
      <h1 class="week-hero-title" style="--week-color:${color};">
        ${I18N.t({ en: I18N.ui.en.week_label, id: I18N.ui.id.week_label }).replace('{num}', String(week.week).padStart(2, '0'))}: ${week.title}
      </h1>
      <p class="week-hero-desc">${week.mission}</p>
      <div style="display:flex;gap:8px;margin-top:20px;flex-wrap:wrap;">
        <span class="tag tag-concept">${week.badge}</span>
        <span class="tag tag-thinking">${week.thinking}</span>
        <span class="tag tag-output">⏱ ${week.time}</span>
        ${isCompleted ? `<span class="tag" style="background:var(--success-bg);color:var(--success);border-color:rgba(44,182,125,0.3);">${I18N.t({ en: I18N.ui.en.wd_completed, id: I18N.ui.id.wd_completed })}</span>` : ''}
      </div>
    </div>

    <div class="mission-brief" style="--week-color:${color};--week-glow:${color}22;">
      <div class="mission-brief-title">${I18N.t({ en: I18N.ui.en.wd_mission_briefing, id: I18N.ui.id.wd_mission_briefing })}</div>
      <div class="mission-brief-text">${week.hero}</div>
    </div>
  `;

  if (lesson) {
    // ---- You will learn (compact objectives) ----
    html += `
      <div class="lesson-section" id="sec-learn" style="padding-top:16px;">
        <div class="lesson-title">🎓 ${t(I18N.ui.youWillLearn)}</div>
        <div class="objectives-list" style="border-top:none;">
          ${week.objectives.map(o => `
            <div class="objective-item">
              <div class="objective-icon">${o.icon}</div>
              <div class="objective-content">
                <h4>${o.title}</h4>
                <p>${o.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    html += chipsHtml();

    // ---- Big Idea ----
    html += section("bigidea", "💡", t(I18N.ui.sec_bigidea), t(I18N.ui.bigIdeaIntro), `
      <div class="card bigidea-card" style="--week-color:${color};">
        <h3 class="bigidea-title">${t(lesson.bigIdea.title)}</h3>
        ${t(lesson.bigIdea.body).split("\n\n").map(p => `<p class="lesson-body">${p}</p>`).join("")}
      </div>
    `);

    // ---- Word Wall ----
    html += section("words", "🔤", t(I18N.ui.sec_words), "", `
      <div class="wordwall-grid">
        ${lesson.wordWall.map(w => `
          <div class="word-card">
            <div class="word-term">${escapeHtml(w.term)}</div>
            <div class="word-def">${t(w)}</div>
          </div>
        `).join("")}
      </div>
    `);

    // ---- Think Like a Coder ----
    html += section("think", "🧠", t(I18N.ui.sec_think), "", `
      <div class="card think-card" style="--week-color:${color};">
        <div class="think-badge">${week.thinking}</div>
        <p class="lesson-body think-hook">${t(lesson.thinkSkill.hook)}</p>
        <p class="lesson-body">${t(lesson.thinkSkill.realLife)}</p>
        <p class="lesson-body">${t(lesson.thinkSkill.codeLink)}</p>
        <div class="think-try">${t(lesson.thinkSkill.tryIt)}</div>
      </div>
    `);

    // ---- Read the Code Together ----
    html += section("code", "💻", t(I18N.ui.sec_code), t(I18N.ui.readCodeTitle), `
      <p class="section-intro">${t(I18N.ui.walkIntro)}</p>
      ${codeBlockHtml(week)}
      <div class="walkthrough">
        ${lesson.codeWalkthrough.map(w => `
          <div class="walk-row">
            <code class="walk-code">${syntaxHighlight(w.line)}</code>
            <p class="walk-def">${t(w)}</p>
          </div>
        `).join("")}
      </div>
    `);

    // ---- Predict & Run ----
    html += section("predict", "🔮", t(I18N.ui.sec_predict), t(I18N.ui.predictTitle), `
      <p class="section-intro">${t(I18N.ui.predictIntro)}</p>
      <div class="predict-list">
        ${lesson.predictions.map(p => `
          <div class="card predict-card">
            <p class="predict-q">🤔 ${t(p.q)}</p>
            <button class="reveal-btn" data-show-label="👀 ${escapeHtml(t(I18N.ui.showAnswer))}" data-hide-label="🙈 ${escapeHtml(t(I18N.ui.hideAnswer))}" onclick="Views.toggleReveal(this)">👀 ${t(I18N.ui.showAnswer)}</button>
            <div class="reveal-body" hidden>${t(p.a)}</div>
          </div>
        `).join("")}
      </div>
    `);
  } else {
    // Legacy objectives while lesson content is being authored
    html += `
      <div style="padding:0 var(--space-6);">
        <h3 style="font-size:1rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">${I18N.t({ en: I18N.ui.en.wd_learning_objectives, id: I18N.ui.id.wd_learning_objectives })}</h3>
      </div>
      <div class="objectives-list" style="border-top:1px solid rgba(127,90,240,0.08);">
        ${week.objectives.map(o => `
          <div class="objective-item">
            <div class="objective-icon">${o.icon}</div>
            <div class="objective-content">
              <h4>${o.title}</h4>
              <p>${o.desc}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // ---- Challenges (both modes) ----
  html += challengesSection(week, weekNum, lesson);

  if (lesson) {
    // ---- Bug Hunt ----
    html += section("bugs", "🐛", t(I18N.ui.sec_bugs), "", `
      <div class="predict-list">
        ${lesson.bugHunt.map(b => `
          <div class="card predict-card">
            <div class="bug-line"><span class="bug-tag">BUG</span><code class="bug-code">${escapeHtml(t(b.bug))}</code></div>
            <button class="reveal-btn" data-show-label="🔧 ${escapeHtml(t(I18N.ui.showAnswer))}" data-hide-label="🙈 ${escapeHtml(t(I18N.ui.hideAnswer))}" onclick="Views.toggleReveal(this)">🔧 ${t(I18N.ui.showAnswer)}</button>
            <div class="reveal-body" hidden>${t(b.fix)}</div>
          </div>
        `).join("")}
      </div>
    `);

    // ---- Quiz ----
    const best = progress.getQuizScore(weekNum);
    html += section("quiz", "📝", t(I18N.ui.sec_quiz), t(I18N.ui.quizIntro), `
      ${best ? `<div class="quiz-best">🏅 ${t(I18N.ui.quizBest)}: ${best.score}/${best.total || lesson.quiz.length}</div>` : ""}
      ${lesson.quiz.map((q, qi) => `
        <div class="quiz-q">
          <p class="quiz-q-text">${qi + 1}. ${t(q.q)}</p>
          ${q.options.map((opt, oi) => `
            <button class="quiz-option" onclick="Views.quizAnswer(${weekNum}, ${qi}, ${oi}, this)">${escapeHtml(t(opt))}</button>
          `).join("")}
          <div class="quiz-explain" hidden></div>
        </div>
      `).join("")}
      <div class="quiz-score" id="quizScore-${weekNum}" hidden></div>
    `);

    // ---- Reflect ----
    const saved = progress.getReflections(weekNum);
    html += section("reflect", "🪞", t(I18N.ui.sec_reflect), t(I18N.ui.reflectIntro), `
      <div class="reflect-list">
        ${lesson.reflect.map((r, ri) => `
          <div class="card reflect-card">
            <p class="reflect-prompt">${t(r.prompt)}</p>
            <textarea class="reflect-box" data-reflect="${weekNum}" rows="3" placeholder="${escapeHtml(t(r.prompt))}">${escapeHtml(saved[ri] || "")}</textarea>
          </div>
        `).join("")}
        <button class="btn btn-ghost btn-full" onclick="Views.saveReflection(${weekNum})">💾 ${t(I18N.ui.reflectSave)}</button>
      </div>
    `);

    // ---- Parent Corner ----
    html += section("parent", "👪", t(I18N.ui.sec_parent), t(I18N.ui.parentIntro), `
      <div class="parent-corner">
        <div class="parent-block">
          <div class="parent-block-title">✅ ${t(I18N.ui.parentPrep)}</div>
          <ul class="parent-list">
            ${lesson.parentCorner.prep.map(p => `<li>${t(p)}</li>`).join("")}
          </ul>
        </div>
        <div class="parent-block">
          <div class="parent-block-title">💬 ${t(I18N.ui.parentSay)}</div>
          <ul class="parent-list">
            ${lesson.parentCorner.say.map(s => `<li>${t(s)}</li>`).join("")}
          </ul>
        </div>
        <div class="parent-block">
          <div class="parent-block-title">🧭 ${t(I18N.ui.parentStuck)}</div>
          <p class="lesson-body">${t(lesson.parentCorner.ifStuck)}</p>
        </div>
      </div>
    `);
  } else {
    html += `
      <div style="padding:0 var(--space-6) 8px;">
        <div class="info-box tip">${t(I18N.ui.comingSoon)}</div>
      </div>
    `;
  }

  // ---- Next tease ----
  if (week.nextTease) {
    html += `
      <div style="padding:0 var(--space-6) var(--space-6);">
        <div class="info-box tip" style="border-color:${color}44;background:${color}11;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <div><strong>${I18N.t({ en: I18N.ui.en.wd_next_mission, id: I18N.ui.id.wd_next_mission })}</strong> ${week.nextTease}</div>
        </div>
      </div>
    `;
  }

  // ---- Actions ----
  html += `
    <div class="complete-section" style="padding-top:8px;">
      <button class="btn btn-primary btn-large ${isCompleted ? '' : 'btn-complete'}"
              onclick="Views.completeWeek(${weekNum})"
              ${isCompleted ? 'disabled style="opacity:0.5;"' : ''}>
        ${isCompleted ? I18N.t({ en: I18N.ui.en.wd_mission_complete, id: I18N.ui.id.wd_mission_complete }) : I18N.t({ en: I18N.ui.en.wd_complete_mission, id: I18N.ui.id.wd_complete_mission })}
      </button>
      <div style="margin-top:16px;">
        ${weekNum > 1 ? `<button class="btn btn-ghost" onclick="Router.navigate('week',{id:'${weekNum - 1}'})" style="font-size:0.875rem;">${I18N.t({ en: I18N.ui.en.wd_prev_week, id: I18N.ui.id.wd_prev_week })}</button>` : ''}
        ${weekNum < 12 ? `<button class="btn btn-ghost" onclick="Router.navigate('week',{id:'${weekNum + 1}'})" style="font-size:0.875rem;">${I18N.t({ en: I18N.ui.en.wd_next_week, id: I18N.ui.id.wd_next_week })}</button>` : ''}
      </div>
    </div>
    <div style="height:24px;"></div>
  `;

  html += `</div>`;
  main.innerHTML = html;

  // Keyboard navigation: ←/→ arrows to go to previous/next week
  document.addEventListener('keydown', Views.handleWeekKeydown);
};

Views.handleWeekKeydown = (e) => {
  // Only handle in week view
  if (Router.currentView !== 'week') return;
  const weekNum = parseInt(Router.params.id);
  if (!weekNum) return;
  
  if (e.key === 'ArrowLeft' && weekNum > 1) {
    e.preventDefault();
    Router.navigate('week', { id: String(weekNum - 1) });
  } else if (e.key === 'ArrowRight' && weekNum < 12) {
    e.preventDefault();
    Router.navigate('week', { id: String(weekNum + 1) });
  }
};

// ---------- section helpers ----------

function chipsHtml() {
  const items = [
    ["story", "📖"], ["learn", "🎓"], ["bigidea", "💡"], ["words", "🔤"], ["think", "🧠"],
    ["code", "💻"], ["predict", "🔮"], ["challenges", "🎯"], ["bugs", "🐛"], ["quiz", "📝"],
    ["reflect", "🪞"], ["parent", "👪"],
  ];
  return `<div class="section-chips">` + items.map(([id, icon]) =>
    `<button class="chip" onclick="document.getElementById('sec-${id}').scrollIntoView({behavior:'smooth'})">${icon} ${I18N.t(I18N.ui["sec_" + id])}</button>`
  ).join("") + `</div>`;
}

function section(id, icon, title, intro, body) {
  return `
    <div class="lesson-section" id="sec-${id}">
      <div class="lesson-title">${icon} ${title}</div>
      ${intro ? `<p class="section-intro">${intro}</p>` : ""}
      ${body}
    </div>
  `;
}

function codeBlockHtml(week) {
  return `
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots"><span></span><span></span><span></span></div>
        <span class="code-lang">Rust</span>
        <button class="code-copy" onclick="Views.copyCode(this)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          ${I18N.t({ en: I18N.ui.en.wd_copy, id: I18N.ui.id.wd_copy })}
        </button>
      </div>
      <div class="code-body">
        <pre><code>${syntaxHighlight(week.code)}</code></pre>
      </div>
    </div>
  `;
}

function challengesSection(week, weekNum, lesson) {
  const t = (x) => I18N.t(x);
  const checkData = progress.getChecklist(weekNum);
  const color = getWeekColor(weekNum);

  const items = (lesson ? lesson.challenges : week.challenges.map(c => ({ text: c }))).map((c, i) => {
    const checked = checkData[i] || false;
    const hintBtn = c.hint ? `
      <button class="reveal-btn" data-show-label="💡 ${escapeHtml(t(I18N.ui.hintLabel))}" data-hide-label="🙈 ${escapeHtml(t(I18N.ui.hideAnswer))}" onclick="event.stopPropagation(); Views.toggleReveal(this)">💡 ${t(I18N.ui.hintLabel)}</button>
      <div class="reveal-body" hidden>${t(c.hint)}</div>` : "";
    const success = c.success ? `<div class="success-criteria">✅ ${t(I18N.ui.successLooks)}: ${t(c.success)}</div>` : "";
    return `
      <li class="${checked ? 'done' : ''}">
        <input type="checkbox" ${checked ? 'checked' : ''}
          onchange="Views.toggleChallenge(${weekNum}, ${i}, this)"
          aria-label="Mark challenge complete">
        <div class="challenge-body">
          <span class="challenge-text">${t(c.text)}</span>
          ${hintBtn}
          ${success}
        </div>
      </li>
    `;
  }).join("");

  return `
    <div class="lesson-section" id="sec-challenges" style="padding-top:var(--space-6);">
      <div class="lesson-title">🎯 ${t(I18N.ui.sec_challenges)}</div>
      ${lesson ? "" : `<p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">${I18N.t({ en: I18N.ui.en.wd_challenges_intro, id: I18N.ui.id.wd_challenges_intro })}</p>`}
      <ul class="checklist">${items}</ul>
      <div class="info-box hint" style="margin-top:12px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div><strong>${I18N.t({ en: I18N.ui.en.wd_pro_tip, id: I18N.ui.id.wd_pro_tip })}</strong> ${week.hint}</div>
      </div>
    </div>
  `;
}

// ---------- interactions ----------

Views.toggleReveal = (btn) => {
  const body = btn.parentElement.querySelector(".reveal-body");
  const opening = body.hidden;
  body.hidden = !opening;
  btn.textContent = opening ? btn.dataset.hideLabel : btn.dataset.showLabel;
};

Views.toggleChallenge = (weekNum, index, checkbox) => {
  const checked = !!checkbox.checked;
  progress.setCheckItem(weekNum, index, checked);
  const li = checkbox.closest('li');
  if (li) li.classList.toggle('done', checked);

  // Micro-celebration for individual challenge
  if (checked) {
    Views.celebrate('challenge');
  }

  // Check if all challenges are done
  const week = ACADEMY.weeks.find(w => w.week === weekNum);
  const allDone = week.challenges.every((_, i) => progress.getChecklist(weekNum)[i]);
  if (allDone && !progress.getProgress().weeksCompleted.includes(weekNum)) {
    setTimeout(() => {
      showToast(`${I18N.t({ en: I18N.ui.en.wd_all_challenges_toast, id: I18N.ui.id.wd_all_challenges_toast }).replace('{num}', weekNum)}`, "success");
    }, 300);
  }
};

// Micro-celebration (confetti burst)
Views.celebrate = (type) => {
  const colors = ['#7f5af0', '#2cb67d', '#ff8906', '#3da9fc', '#e53170', '#00f5d4'];
  const container = document.getElementById('mainContent');
  if (!container) return;

  const count = type === 'week' ? 50 : 15;
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -10px;
      width: ${8 + Math.random() * 6}px;
      height: ${8 + Math.random() * 6}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      pointer-events: none;
      z-index: 9999;
      opacity: 0.9;
      transform: rotate(${Math.random() * 360}deg);
    `;
    document.body.appendChild(confetti);

    const fallDuration = 1500 + Math.random() * 1000;
    const drift = (Math.random() - 0.5) * 200;

    confetti.animate([
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 0.9 },
      { transform: `translate(${drift}px, ${window.innerHeight + 50}px) rotate(${720 + Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: fallDuration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
  }

  // Screen flash for week completion
  if (type === 'week') {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at center, rgba(127,90,240,0.3), transparent 70%);
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(flash);
    flash.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], {
      duration: 800,
      easing: 'ease-out'
    }).onfinish = () => flash.remove();
  }
};

Views.completeWeek = (weekNum) => {
  progress.completeWeek(weekNum);
  showToast(`${I18N.t({ en: I18N.ui.en.wd_mission_complete_toast, id: I18N.ui.id.wd_mission_complete_toast }).replace('{num}', weekNum)}`, "success");
  // Refresh the view
  Views.weekDetail({ id: String(weekNum) });
};

Views.quizAnswer = (weekNum, qi, oi, btn) => {
  const lesson = LESSONS[weekNum];
  const state = QuizState[weekNum];
  if (!lesson || state.answered[qi] !== undefined) return;

  const q = lesson.quiz[qi];
  const ok = oi === q.answer;
  state.answered[qi] = oi;
  if (ok) state.correct++;

  const wrap = btn.closest(".quiz-q");
  wrap.querySelectorAll(".quiz-option").forEach((b, idx) => {
    b.classList.add("locked");
    if (idx === q.answer) b.classList.add("correct");
    else if (idx === oi) b.classList.add("wrong");
  });

  const exp = wrap.querySelector(".quiz-explain");
  exp.hidden = false;
  exp.innerHTML = `<strong>${ok ? I18N.t(I18N.ui.correct) : I18N.t(I18N.ui.notQuite)}</strong> ${I18N.t(q.explain)}`;

  if (Object.keys(state.answered).length === lesson.quiz.length) {
    finishQuiz(weekNum, lesson, state);
  }
};

function finishQuiz(weekNum, lesson, state) {
  const t = (x) => I18N.t(x);
  const total = lesson.quiz.length;
  const res = progress.recordQuiz(weekNum, state.correct, total);
  const scoreEl = document.getElementById(`quizScore-${weekNum}`);
  if (scoreEl) {
    scoreEl.hidden = false;
    scoreEl.innerHTML = `🏅 ${t(I18N.ui.yourScore)}: ${state.correct}/${total}` +
      (res.gained > 0 ? ` · ⭐ +${res.gained}` : "");
  }
  if (res.gained > 0) {
    showToast(`⭐ +${res.gained} ${t(I18N.ui.starsToast)}`, "success");
  }
}

Views.saveReflection = (weekNum) => {
  const boxes = document.querySelectorAll(`textarea[data-reflect="${weekNum}"]`);
  const answers = Array.from(boxes).map(b => b.value.trim()).filter(Boolean);
  progress.saveReflections(weekNum, answers);
  showToast(I18N.t(I18N.ui.reflectSaved), "success");
};

Views.copyCode = (btn) => {
  const codeBlock = btn.closest('.code-block').querySelector('code');
  const text = codeBlock.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ${I18N.t({ en: I18N.ui.en.wd_copied, id: I18N.ui.id.wd_copied })}`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> ${I18N.t({ en: I18N.ui.en.wd_copy, id: I18N.ui.id.wd_copy })}`;
    }, 2000);
  });
};

// Simple syntax highlighter for Rust.
// Comments and strings are masked with placeholders first so later passes
// (keywords, numbers, macros, types) can never match inside them.
function syntaxHighlight(code) {
  // Escape HTML first
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const store = [];
  const mask = (wrapped) => {
    store.push(wrapped);
    // Index is wrapped in word chars so later \b-anchored passes
    // can't match the digits inside the placeholder.
    return `\x00M${store.length - 1}M\x00`;
  };

  // Comments and strings (order matters: comments before strings so
  // quote characters inside comments don't start a bogus string)
  html = html.replace(/\/\/[^\n]*/g, (m) => mask(`<span class="cm">${m}</span>`));
  html = html.replace(/"(?:[^"\\\n]|\\.)*"/g, (m) => mask(`<span class="str">${m}</span>`));

  // Keywords
  const keywords = ['fn', 'let', 'mut', 'if', 'else', 'for', 'while', 'in', 'return', 'struct', 'impl', 'enum', 'use', 'mod', 'pub', 'self', 'Self', 'true', 'false'];
  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  html = html.replace(kwRegex, '<span class="kw">$1</span>');

  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');

  // Macros (println!, format!, vec! etc.)
  html = html.replace(/\b([a-z_][a-z0-9_]*)!/g, '<span class="macro">$1!</span>');

  // Type names (including generics)
  html = html.replace(/\b(String|Vec|i32|u32|i64|f64|bool|char)\b/g, '<span class="ty">$1</span>');

  // Function calls
  html = html.replace(/\b([a-z_][a-z0-9_]*)\(/g, '<span class="fn">$1</span>(');

  // Restore masked comments/strings
  html = html.replace(/\x00M(\d+)M\x00/g, (_, i) => store[Number(i)]);

  return html;
}
