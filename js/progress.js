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
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore corrupt data */ }
    return { pilots: {}, settings: {} };
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

  markCheckpoint(weekNum) {
    const pilot = this._getCurrentData();
    if (!pilot) return;
    pilot.checkpoint = weekNum;
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

  deletePilot(name) {
    delete this.data.pilots[name];
    if (this.data.currentPilot === name) {
      this.data.currentPilot = Object.keys(this.data.pilots)[0] || null;
    }
    this._save();
  }

  renamePilot(oldName, newName) {
    if (this.data.pilots[oldName]) {
      this.data.pilots[newName] = { ...this.data.pilots[oldName], name: newName };
      if (this.data.currentPilot === oldName) this.data.currentPilot = newName;
      delete this.data.pilots[oldName];
      this._save();
    }
  }
}

const progress = new ProgressTracker();
