// ============================================
// SPACE ACADEMY — License Server
// ============================================
// Headless API for license validation.
// All admin operations (generate/list/revoke) are done via CLI tool.

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const DB_PATH = path.join(__dirname, "licenses.json");

// --- Middleware ---
app.use(cors({ origin: ALLOWED_ORIGIN === "*" ? true : ALLOWED_ORIGIN }));
app.use(express.json());

// --- Database helpers ---
function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

// --- Admin auth middleware ---
function requireAdmin(req, res, next) {
  if (!ADMIN_API_KEY) {
    return res.status(500).json({ error: "ADMIN_API_KEY not configured" });
  }
  const key = req.headers["x-api-key"];
  if (key !== ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// --- Public endpoints ---

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Validate a license (called by the PWA app)
app.post("/api/licenses/validate", (req, res) => {
  const { key, pilotName } = req.body;

  if (!key || !pilotName) {
    return res.status(400).json({ valid: false, error: "Missing key or pilotName" });
  }

  const licenses = readDB();
  const license = licenses.find(
    (l) => l.key === key && l.pilotName.toLowerCase() === pilotName.toLowerCase()
  );

  if (!license) {
    return res.json({ valid: false, error: "License not found" });
  }

  if (license.status !== "active") {
    return res.json({ valid: false, error: `License is ${license.status}` });
  }

  res.json({ valid: true, tier: license.tier });
});

// --- Admin endpoints (CLI tool calls these) ---

// Register a new license
app.post("/api/licenses", requireAdmin, (req, res) => {
  const { key, tier, pilotName } = req.body;

  if (!key || !tier || !pilotName) {
    return res.status(400).json({ error: "Missing key, tier, or pilotName" });
  }

  const validTiers = ["explorer", "engineer", "commander"];
  if (!validTiers.includes(tier)) {
    return res.status(400).json({ error: `Invalid tier. Must be: ${validTiers.join(", ")}` });
  }

  const licenses = readDB();

  // Check for duplicate key
  if (licenses.some((l) => l.key === key)) {
    return res.status(409).json({ error: "License key already exists" });
  }

  const license = {
    key,
    tier,
    pilotName,
    status: "active",
    createdAt: new Date().toISOString(),
  };

  licenses.push(license);
  writeDB(licenses);

  res.status(201).json({ success: true, license });
});

// List all licenses
app.get("/api/licenses", requireAdmin, (req, res) => {
  const licenses = readDB();
  const { tier, status } = req.query;

  let filtered = licenses;
  if (tier) filtered = filtered.filter((l) => l.tier === tier);
  if (status) filtered = filtered.filter((l) => l.status === status);

  res.json({ licenses: filtered, total: filtered.length });
});

// Revoke a license
app.post("/api/licenses/revoke", requireAdmin, (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ error: "Missing key" });
  }

  const licenses = readDB();
  const license = licenses.find((l) => l.key === key);

  if (!license) {
    return res.status(404).json({ error: "License not found" });
  }

  if (license.status === "revoked") {
    return res.json({ success: true, message: "License already revoked" });
  }

  license.status = "revoked";
  license.revokedAt = new Date().toISOString();
  writeDB(licenses);

  res.json({ success: true, license });
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`Space Academy License Server running on port ${PORT}`);
  console.log(`Admin API key: ${ADMIN_API_KEY ? "(configured)" : "(NOT SET)"}`);
  console.log(`CORS origin: ${ALLOWED_ORIGIN}`);
});
