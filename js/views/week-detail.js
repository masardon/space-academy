// ============================================
// SPACE ACADEMY — Week Detail View
// ============================================

Views.weekDetail = (params) => {
  const weekNum = parseInt(params.id);
  const week = ACADEMY.weeks.find(w => w.week === weekNum);
  const main = document.getElementById("mainContent");
  const arc = getWeekArc(weekNum);
  const color = getWeekColor(weekNum);
  const pilotName = progress.getCurrentPilot();
  const pilotData = progress.getPilots()[pilotName];
  const isCompleted = pilotData?.weeksCompleted?.includes(weekNum);

  if (!week) {
    Router.navigate("missions");
    return;
  }

  // Build objectives HTML
  const objectivesHtml = week.objectives.map(o => `
    <div class="objective-item">
      <div class="objective-icon">${o.icon}</div>
      <div class="objective-content">
        <h4>${o.title}</h4>
        <p>${o.desc}</p>
      </div>
    </div>
  `).join("");

  // Build challenges HTML with checkboxes
  const checklistKey = `week_${weekNum}_checklist`;
  const checkData = progress.getChecklist(weekNum);
  const challengesHtml = week.challenges.map((c, i) => {
    const checked = checkData[i] || false;
    return `
      <li class="${checked ? 'done' : ''}">
        <input type="checkbox" ${checked ? 'checked' : ''}
          onchange="Views.toggleChallenge(${weekNum}, ${i}, this)"
          aria-label="Mark challenge complete">
        <span>${c}</span>
      </li>
    `;
  }).join("");

  // Syntax highlight the code
  const highlightedCode = syntaxHighlight(week.code);

  main.innerHTML = `
    <div class="view slide-in">
      <!-- Hero -->
      <div class="week-hero" style="--week-glow:${color}33;">
        <div class="week-arc-badge">
          <span>${arc?.emoji || "🚀"}</span>
          <span>${arc?.name || "Mission"}</span>
        </div>
        <div style="font-size:3rem;margin-bottom:8px;">${week.emoji}</div>
        <h1 class="week-hero-title" style="--week-color:${color};">
          Week ${String(week.week).padStart(2, '0')}: ${week.title}
        </h1>
        <p class="week-hero-desc">${week.mission}</p>
        <div style="display:flex;gap:8px;margin-top:20px;flex-wrap:wrap;">
          <span class="tag tag-concept">${week.badge}</span>
          <span class="tag tag-thinking">${week.thinking}</span>
          <span class="tag tag-output">⏱ ${week.time}</span>
          ${isCompleted ? '<span class="tag" style="background:var(--success-bg);color:var(--success);border-color:rgba(44,182,125,0.3);">✓ Completed</span>' : ''}
        </div>
      </div>

      <!-- Mission Brief -->
      <div class="mission-brief" style="--week-color:${color};--week-glow:${color}22;">
        <div class="mission-brief-title">📋 Mission Briefing</div>
        <div class="mission-brief-text">${week.hero}</div>
      </div>

      <!-- Learning Objectives -->
      <div style="padding:0 var(--space-6);">
        <h3 style="font-size:1rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Learning Objectives</h3>
      </div>
      <div class="objectives-list" style="border-top:1px solid rgba(127,90,240,0.08);">
        ${objectivesHtml}
      </div>

      <!-- Code Example -->
      <div style="padding:var(--space-6) var(--space-6) 0;">
        <h3 style="font-size:1rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">💻 Starter Code</h3>
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:12px;">
          This is the starting program. Parent types changes while kids predict what will happen.
        </p>
        <div class="code-block">
          <div class="code-header">
            <div class="code-dots"><span></span><span></span><span></span></div>
            <span class="code-lang">Rust</span>
            <button class="code-copy" onclick="Views.copyCode(this)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy
            </button>
          </div>
          <div class="code-body">
            <pre><code>${highlightedCode}</code></pre>
          </div>
        </div>
      </div>

      <!-- Challenges -->
      <div style="padding:var(--space-6);">
        <h3 style="font-size:1rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">🎯 Your Challenges</h3>
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">
          Complete these to earn your mission star. Check each off as you go!
        </p>
        <ul class="checklist">
          ${challengesHtml}
        </ul>
      </div>

      <!-- Hint -->
      <div style="padding:0 var(--space-6) var(--space-6);">
        <div class="info-box hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div><strong>Pro Tip:</strong> ${week.hint}</div>
        </div>
      </div>

      <!-- Next Week Tease -->
      ${week.nextTease ? `
      <div style="padding:0 var(--space-6) var(--space-6);">
        <div class="info-box tip" style="border-color:${color}44;background:${color}11;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <div><strong>Next Mission:</strong> ${week.nextTease}</div>
        </div>
      </div>
      ` : ''}

      <!-- Action Buttons -->
      <div class="complete-section" style="padding-top:8px;">
        <button class="btn btn-primary btn-large ${isCompleted ? '' : 'btn-complete'}"
                onclick="Views.completeWeek(${weekNum})"
                ${isCompleted ? 'disabled style="opacity:0.5;"' : ''}>
          ${isCompleted ? '✓ Mission Complete' : '🏁 Complete Mission'}
        </button>
        <div style="margin-top:16px;">
          ${weekNum > 1 ? `<button class="btn btn-ghost" onclick="Router.navigate('week',{id:'${weekNum - 1}'})" style="font-size:0.875rem;">← Previous Week</button>` : ''}
          ${weekNum < 12 ? `<button class="btn btn-ghost" onclick="Router.navigate('week',{id:'${weekNum + 1}'})" style="font-size:0.875rem;">Next Week →</button>` : ''}
        </div>
      </div>

      <div style="height:24px;"></div>
    </div>
  `;
};

Views.toggleChallenge = (weekNum, index, checkbox) => {
  const checked = !!checkbox.checked;
  progress.setCheckItem(weekNum, index, checked);
  const li = checkbox.closest('li');
  if (li) li.classList.toggle('done', checked);

  // Check if all challenges are done
  const week = ACADEMY.weeks.find(w => w.week === weekNum);
  const allDone = week.challenges.every((_, i) => progress.getChecklist(weekNum)[i]);
  if (allDone && !progress.getProgress().weeksCompleted.includes(weekNum)) {
    setTimeout(() => {
      showToast(`🎉 All challenges complete! Mission ${weekNum} unlocked!`, "success");
    }, 300);
  }
};

Views.completeWeek = (weekNum) => {
  progress.completeWeek(weekNum);
  showToast(`🏆 Mission ${weekNum} completed! +10 stars!`, "success");
  // Refresh the view
  Views.weekDetail({ id: String(weekNum) });
};

Views.copyCode = (btn) => {
  const codeBlock = btn.closest('.code-block').querySelector('code');
  const text = codeBlock.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
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
