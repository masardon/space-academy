// ============================================
// SPACE ACADEMY — Progress Tracking
// ============================================

const STORAGE_KEY = "space_academy_progress";

class ProgressTracker {
  constructor() {
    this.data = this._load();
  }

  _load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this._migrate(data);
        return data;
      }
    } catch (e) { /* ignore corrupt data */ }
    return { pilots: {}, settings: {} };
  }

  // Fill in fields added by newer versions so old saved data keeps working.
  _migrate(data) {
    if (!data || typeof data !== "object") return;
    if (!data.pilots || typeof data.pilots !== "object") data.pilots = {};
    if (!data.settings || typeof data.settings !== "object") data.settings = {};
    for (const p of Object.values(data.pilots)) {
      if (!p || typeof p !== "object") continue;
      if (!Array.isArray(p.weeksCompleted)) p.weeksCompleted = [];
      if (!p.checklists || typeof p.checklists !== "object") p.checklists = {};
      if (!p.quizzes || typeof p.quizzes !== "object") p.quizzes = {};
      if (!p.reflections || typeof p.reflections !== "object") p.reflections = {};
      if (typeof p.rank !== "string") p.rank = "New Recruit";
      if (!Number.isInteger(p.checkpoint)) p.checkpoint = 0;
      if (!Number.isInteger(p.streak)) p.streak = 0;
      if (!Number.isInteger(p.totalStars)) p.totalStars = 0;
    }
  }

  _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  // Pilot management
  getPilots() {
    return this.data.pilots;
  }

  getCurrentPilot() {
    return this.data.currentPilot || null;
  }

  setCurrentPilot(name) {
    this.data.currentPilot = name;
    this._save();
  }

  ensurePilot(name) {
    if (!this.data.pilots[name]) {
      this.data.pilots[name] = {
        name,
        avatar: this._defaultAvatar(name),
        rank: "Cadet",
        weeksCompleted: [],
        checkpoint: 0, // Which week they're on
        streak: 0,
        totalStars: 0,
        quizzes: {},     // week -> { score, total, at }
        reflections: {}, // week -> [answers]
        createdAt: Date.now(),
      };
      this._save();
    }
    return this.data.pilots[name];
  }

  _defaultAvatar(name) {
    const avatars = ["👩‍🚀", "👨‍🚀", "🧑‍🚀", "👩🚒", "👨‍🔬", "🧝‍♀️", "🧙", "🦸", "🥷"];
    let hash = 0;
    for (const c of name) hash = ((hash << 5) - hash) + c.charCodeAt(0);
    return avatars[Math.abs(hash) % avatars.length];
  }

  // Week progress
  completeWeek(weekNum) {
    const pilot = this._getCurrentData();
    if (!pilot) return;
    if (!pilot.weeksCompleted.includes(weekNum)) {
      pilot.weeksCompleted.push(weekNum);
      pilot.weeksCompleted.sort((a, b) => a - b);
      pilot.totalStars += 10;
      pilot.streak += 1;
      if (weekNum > pilot.checkpoint) {
        pilot.checkpoint = weekNum;
      }
      this._updateRank(pilot);
      this._save();
    }
  }

  uncompleteWeek(weekNum) {
    const pilot = this._getCurrentData();
    if (!pilot) return;
    pilot.weeksCompleted = pilot.weeksCompleted.filter(w => w !== weekNum);
    pilot.totalStars = Math.max(0, pilot.totalStars - 10);
    pilot.streak = pilot.weeksCompleted.length;
    pilot.checkpoint = pilot.weeksCompleted.length > 0
      ? Math.max(...pilot.weeksCompleted)
      : 0;
    this._updateRank(pilot);
    this._save();
  }

  // Checklist per week
  getChecklist(weekNum) {
    const key = `week_${weekNum}_checklist`;
    const pilot = this._getCurrentData();
    if (!pilot) return {};
    const stored = pilot.checklists || {};
    return stored[key] || {};
  }

  setCheckItem(weekNum, item, checked) {
    const pilot = this._getCurrentData();
    if (!pilot) return;
    if (!pilot.checklists) pilot.checklists = {};
    const key = `week_${weekNum}_checklist`;
    if (!pilot.checklists[key]) pilot.checklists[key] = {};
    pilot.checklists[key][item] = checked;
    this._save();
  }

  // Quiz results (best score kept; stars awarded only for improvement)
  recordQuiz(weekNum, score, total) {
    const pilot = this._getCurrentData();
    if (!pilot) return { gained: 0 };
    if (!pilot.quizzes) pilot.quizzes = {};
    const prev = pilot.quizzes[weekNum];
    const best = prev ? Math.max(prev.score, score) : score;
    const gained = prev ? Math.max(0, best - prev.score) : score;
    pilot.quizzes[weekNum] = { score: best, total, at: Date.now() };
    pilot.totalStars += gained;
    this._save();
    return { gained, best };
  }

  getQuizScore(weekNum) {
    const pilot = this._getCurrentData();
    if (!pilot || !pilot.quizzes) return null;
    return pilot.quizzes[weekNum] || null;
  }

  // Reflections ("Flight Log")
  saveReflections(weekNum, answers) {
    const pilot = this._getCurrentData();
    if (!pilot) return;
    if (!pilot.reflections) pilot.reflections = {};
    pilot.reflections[weekNum] = answers;
    this._save();
  }

  getReflections(weekNum) {
    const pilot = this._getCurrentData();
    if (!pilot || !pilot.reflections) return [];
    return pilot.reflections[weekNum] || [];
  }

  // Language preference ("en" | "id")
  getLang() {
    return this.data.settings?.lang || "en";
  }

  setLang(lang) {
    if (!this.data.settings) this.data.settings = {};
    this.data.settings.lang = lang === "id" ? "id" : "en";
    this._save();
  }

  // Rank calculation
  _updateRank(pilot) {
    const completed = pilot.weeksCompleted.length;
    if (completed >= 12) pilot.rank = "Space Commander 🏆";
    else if (completed >= 10) pilot.rank = "Senior Engineer ⭐";
    else if (completed >= 8) pilot.rank = "Lead Cadet 🌟";
    else if (completed >= 6) pilot.rank = "Cadet First Class ✦";
    else if (completed >= 4) pilot.rank = "Cadet";
    else if (completed >= 2) pilot.rank = "Trainee";
    else pilot.rank = "New Recruit";
  }

  // Stats
  _getCurrentData() {
    const name = this.getCurrentPilot();
    if (!name) return null;
    return this.data.pilots[name];
  }

  getProgress() {
    const pilot = this._getCurrentData();
    if (!pilot) return { percent: 0, completed: 0, total: 12, stars: 0, rank: "New Recruit", streak: 0, checkpoint: 0, weeksCompleted: [] };
    return {
      percent: Math.round((pilot.weeksCompleted.length / 12) * 100),
      completed: pilot.weeksCompleted.length,
      total: 12,
      stars: pilot.totalStars,
      rank: pilot.rank,
      streak: pilot.streak,
      checkpoint: pilot.checkpoint,
      weeksCompleted: [...pilot.weeksCompleted],
    };
  }

  resetProgress() {
    const pilot = this._getCurrentData();
    if (!pilot) return;
    pilot.weeksCompleted = [];
    pilot.totalStars = 0;
    pilot.streak = 0;
    pilot.checkpoint = 0;
    pilot.checklists = {};
    this._updateRank(pilot);
    this._save();
  }

  // Replace all state from imported JSON. Throws on invalid shape.
  importData(data) {
    if (
      !data || typeof data !== "object" || Array.isArray(data) ||
      !data.pilots || typeof data.pilots !== "object" || Array.isArray(data.pilots)
    ) {
      throw new Error("Invalid progress data");
    }
    const pilots = {};
    for (const [name, p] of Object.entries(data.pilots)) {
      if (!p || typeof p !== "object") continue;
      pilots[name] = {
        name: typeof p.name === "string" && p.name ? p.name : name,
        avatar: typeof p.avatar === "string" ? p.avatar : this._defaultAvatar(name),
        rank: typeof p.rank === "string" ? p.rank : "New Recruit",
        weeksCompleted: Array.isArray(p.weeksCompleted)
          ? [...new Set(p.weeksCompleted.filter(n => Number.isInteger(n) && n >= 1 && n <= 12))].sort((a, b) => a - b)
          : [],
        checkpoint: Number.isInteger(p.checkpoint) ? Math.min(Math.max(p.checkpoint, 0), 12) : 0,
        streak: Number.isInteger(p.streak) ? p.streak : 0,
        totalStars: Number.isInteger(p.totalStars) ? p.totalStars : 0,
        createdAt: Number.isFinite(p.createdAt) ? p.createdAt : Date.now(),
        checklists: p.checklists && typeof p.checklists === "object" && !Array.isArray(p.checklists)
          ? p.checklists
          : {},
        quizzes: p.quizzes && typeof p.quizzes === "object" && !Array.isArray(p.quizzes)
          ? p.quizzes
          : {},
        reflections: p.reflections && typeof p.reflections === "object" && !Array.isArray(p.reflections)
          ? p.reflections
          : {},
      };
    }
    const current = typeof data.currentPilot === "string" && pilots[data.currentPilot]
      ? data.currentPilot
      : Object.keys(pilots)[0] || null;
    this.data = {
      pilots,
      settings: data.settings && typeof data.settings === "object" && !Array.isArray(data.settings)
        ? data.settings
        : {},
      currentPilot: current,
    };
    this._save();
  }

  // Wipe everything (storage AND in-memory state).
  resetAll() {
    this.data = { pilots: {}, settings: {} };
    localStorage.removeItem(STORAGE_KEY);
    this._save();
  }
}

const progress = new ProgressTracker();
