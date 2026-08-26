#!/usr/bin/env node
// ============================================
// SPACE ACADEMY — License CLI Tool
// ============================================
// Generate, list, revoke, and validate licenses.
// Zero npm dependencies — uses only node:crypto and node:http.
//
// Usage:
//   node tools/license.js generate                          # Interactive
//   node tools/license.js generate --name Luna --tier engineer
//   node tools/license.js list
//   node tools/license.js list --tier engineer --status active
//   node tools/license.js revoke --key SA-EN-xxx-yyy
//   node tools/license.js validate --key SA-EN-xxx-yyy --name Luna
//
// Config via env vars or flags:
//   LICENSE_SERVER_URL   Server base URL (default: http://localhost:3000)
//   ADMIN_API_KEY        Admin API key (required for generate/list/revoke)

const crypto = require("node:crypto");
const http = require("node:http");
const https = require("node:https");
const readline = require("node:readline");

// --- Config ---
const HMAC_SECRET = process.env.LICENSE_HMAC_SECRET || "sa_license_2024_secret_key_32chars";
const TIERS = { explorer: 0, engineer: 1, commander: 2 };
const TIER_CODES = { explorer: "EX", engineer: "EN", commander: "CM" };
const TIER_NAMES = { EX: "explorer", EN: "engineer", CM: "commander" };
const TIER_LABELS = { explorer: "Explorer (Free — Weeks 1-2)", engineer: "Engineer (Weeks 1-8 + Lab)", commander: "Commander (Full access)" };

// --- Parse args ---
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = { command: null, flags: {} };
  let i = 0;
  if (args.length > 0 && !args[0].startsWith("-")) {
    parsed.command = args[i++];
  }
  while (i < args.length) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith("-") ? args[i + 1] : true;
      parsed.flags[key] = val;
      i += val === true ? 1 : 2;
    } else {
      i++;
    }
  }
  return parsed;
}

// --- HMAC key generation ---
function generateKey(pilotName, tier) {
  const tierCode = TIER_CODES[tier];
  const nameB64 = Buffer.from(pilotName).toString("base64url");
  const hmac = crypto.createHmac("sha256", HMAC_SECRET);
  hmac.update(`${pilotName.toLowerCase()}:${tier}`);
  const sig = hmac.digest("hex").slice(0, 16);
  return `SA-${tierCode}-${nameB64}-${sig}`;
}

// --- Local HMAC validation ---
function validateKeyLocally(key, pilotName) {
  const parts = key.split("-");
  if (parts.length !== 4 || parts[0] !== "SA") return { valid: false, error: "Invalid key format" };
  const tierCode = parts[1];
  const tier = TIER_NAMES[tierCode];
  if (!tier) return { valid: false, error: `Unknown tier code: ${tierCode}` };
  const expectedName = Buffer.from(parts[2], "base64url").toString("utf8");
  if (expectedName.toLowerCase() !== pilotName.toLowerCase()) {
    return { valid: false, error: `Key is for pilot "${expectedName}", not "${pilotName}"` };
  }
  const hmac = crypto.createHmac("sha256", HMAC_SECRET);
  hmac.update(`${pilotName.toLowerCase()}:${tier}`);
  const expectedSig = hmac.digest("hex").slice(0, 16);
  if (parts[3] !== expectedSig) {
    return { valid: false, error: "Invalid signature" };
  }
  return { valid: true, tier };
}

// --- HTTP helper ---
function httpRequest(method, urlStr, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const lib = url.protocol === "https:" ? https : http;
    const opts = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: { "Content-Type": "application/json", ...headers },
    };
    const req = lib.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// --- Interactive prompts ---
function createRL() {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function askTier(rl) {
  console.log("\n  License tier:\n");
  console.log("    1) Explorer  (Free — Weeks 1-2)");
  console.log("    2) Engineer  (Weeks 1-8 + Lab + Playground)");
  console.log("    3) Commander (Full access)\n");
  const answer = await ask(rl, "  > ");
  const tierMap = { "1": "explorer", "2": "engineer", "3": "commander" };
  const tier = tierMap[answer.trim()];
  if (!tier) {
    console.log("  Invalid choice. Please enter 1, 2, or 3.");
    return askTier(rl);
  }
  return tier;
}

// --- Commands ---
async function cmdGenerate(flags) {
  const serverUrl = flags.server || process.env.LICENSE_SERVER_URL || "http://localhost:3000";
  const apiKey = flags["api-key"] || process.env.ADMIN_API_KEY;

  let pilotName = flags.name;
  let tier = flags.tier;

  if (!pilotName || !tier) {
    const rl = createRL();
    if (!pilotName) pilotName = (await ask(rl, "\n  Pilot name: ")).trim();
    if (!tier) tier = await askTier(rl);
    rl.close();
  }

  if (!(tier in TIERS)) {
    console.error(`\n  Invalid tier: "${tier}". Must be: explorer, engineer, commander`);
    process.exit(1);
  }

  const key = generateKey(pilotName, tier);

  console.log(`\n  Key:    ${key}`);
  console.log(`  Tier:   ${tier.charAt(0).toUpperCase() + tier.slice(1)}`);
  console.log(`  Pilot:  ${pilotName}`);

  // Register with server
  if (apiKey) {
    try {
      console.log("\n  Registering with server...");
      const res = await httpRequest("POST", `${serverUrl}/api/licenses`, { key, tier, pilotName }, { "x-api-key": apiKey });
      if (res.status === 201) {
        console.log("  ✓ Registered with server.");
      } else if (res.status === 409) {
        console.log("  ⚠ Key already exists on server.");
      } else {
        console.log(`  ✗ Server error (${res.status}): ${JSON.stringify(res.body)}`);
      }
    } catch (e) {
      console.log(`  ✗ Could not reach server: ${e.message}`);
      console.log("  Key generated locally but not registered.");
    }
  } else {
    console.log("\n  (No ADMIN_API_KEY set — key generated locally only)");
    console.log("  Set LICENSE_SERVER_URL and ADMIN_API_KEY to register with server.");
  }

  console.log("");
}

async function cmdList(flags) {
  const serverUrl = flags.server || process.env.LICENSE_SERVER_URL || "http://localhost:3000";
  const apiKey = flags["api-key"] || process.env.ADMIN_API_KEY;

  if (!apiKey) {
    console.error("\n  ADMIN_API_KEY is required. Set it via env var or --api-key flag.");
    process.exit(1);
  }

  const params = new URLSearchParams();
  if (flags.tier) params.set("tier", flags.tier);
  if (flags.status) params.set("status", flags.status);
  const query = params.toString() ? `?${params}` : "";

  try {
    const res = await httpRequest("GET", `${serverUrl}/api/licenses${query}`, null, { "x-api-key": apiKey });
    if (res.status !== 200) {
      console.error(`\n  Server error (${res.status}): ${JSON.stringify(res.body)}`);
      process.exit(1);
    }

    const licenses = res.body.licenses || [];
    if (licenses.length === 0) {
      console.log("\n  No licenses found.\n");
      return;
    }

    console.log("\n  KEY                              TIER       PILOT       STATUS    CREATED");
    console.log("  " + "─".repeat(80));
    for (const l of licenses) {
      const keyShort = l.key.length > 32 ? l.key.slice(0, 32) + "..." : l.key.padEnd(32);
      const tier = l.tier.padEnd(10);
      const pilot = l.pilotName.padEnd(11);
      const status = l.status.padEnd(9);
      const created = l.createdAt ? l.createdAt.slice(0, 10) : "—";
      console.log(`  ${keyShort} ${tier} ${pilot} ${status} ${created}`);
    }

    const active = licenses.filter((l) => l.status === "active").length;
    const revoked = licenses.filter((l) => l.status === "revoked").length;
    console.log(`\n  Total: ${licenses.length} (${active} active, ${revoked} revoked)\n`);
  } catch (e) {
    console.error(`\n  Could not reach server: ${e.message}\n`);
    process.exit(1);
  }
}

async function cmdRevoke(flags) {
  const serverUrl = flags.server || process.env.LICENSE_SERVER_URL || "http://localhost:3000";
  const apiKey = flags["api-key"] || process.env.ADMIN_API_KEY;

  let key = flags.key;

  if (!key) {
    const rl = createRL();
    key = (await ask(rl, "\n  License key to revoke: ")).trim();
    rl.close();
  }

  if (!apiKey) {
    console.error("\n  ADMIN_API_KEY is required.");
    process.exit(1);
  }

  try {
    // First validate locally to show pilot info
    // We need pilot name — extract from key
    const parts = key.split("-");
    if (parts.length === 4 && parts[0] === "SA") {
      const pilotName = Buffer.from(parts[2], "base64url").toString("utf8");
      const tierCode = parts[1];
      const tier = TIER_NAMES[tierCode] || "unknown";
      console.log(`\n  Key:    ${key}`);
      console.log(`  Pilot:  ${pilotName}`);
      console.log(`  Tier:   ${tier}`);
    }

    const rl = createRL();
    const confirm = await ask(rl, "\n  Are you sure? (y/n): ");
    rl.close();

    if (confirm.toLowerCase() !== "y") {
      console.log("  Cancelled.\n");
      return;
    }

    const res = await httpRequest("POST", `${serverUrl}/api/licenses/revoke`, { key }, { "x-api-key": apiKey });
    if (res.status === 200) {
      console.log("  ✓ License revoked. The pilot will lose access on next validation.\n");
    } else if (res.status === 404) {
      console.log("  ✗ License not found on server.\n");
    } else {
      console.log(`  ✗ Server error (${res.status}): ${JSON.stringify(res.body)}\n`);
    }
  } catch (e) {
    console.error(`\n  Could not reach server: ${e.message}\n`);
    process.exit(1);
  }
}

function cmdValidate(flags) {
  const key = flags.key;
  const name = flags.name;

  if (!key || !name) {
    console.error("\n  --key and --name are required for local validation.");
    process.exit(1);
  }

  const result = validateKeyLocally(key, name);
  if (result.valid) {
    console.log(`\n  ✓ Valid license for "${name}" — tier: ${result.tier}\n`);
  } else {
    console.log(`\n  ✗ Invalid: ${result.error}\n`);
  }
}

function cmdHelp() {
  console.log(`
  Space Academy — License CLI

  Usage:
    node tools/license.js <command> [options]

  Commands:
    generate    Generate a license key and register with server
    list        List all licenses (requires server)
    revoke      Revoke a license (requires server)
    validate    Validate a key locally (HMAC check only)
    help        Show this help

  Options:
    --name <name>       Pilot name
    --tier <tier>       License tier: explorer, engineer, commander
    --key <key>         License key
    --server <url>      Server URL (env: LICENSE_SERVER_URL)
    --api-key <key>     Admin API key (env: ADMIN_API_KEY)

  Examples:
    node tools/license.js generate --name Luna --tier engineer
    node tools/license.js list --tier engineer
    node tools/license.js revoke --key SA-EN-xxx-yyy
    node tools/license.js validate --key SA-EN-xxx-yyy --name Luna
  `);
}

// --- Main ---
async function main() {
  const { command, flags } = parseArgs();

  switch (command) {
    case "generate":
      await cmdGenerate(flags);
      break;
    case "list":
      await cmdList(flags);
      break;
    case "revoke":
      await cmdRevoke(flags);
      break;
    case "validate":
      cmdValidate(flags);
      break;
    case "help":
    case undefined:
      cmdHelp();
      break;
    default:
      console.error(`\n  Unknown command: "${command}". Run with "help" for usage.\n`);
      process.exit(1);
  }
}

main().catch((e) => {
  console.error(`\n  Fatal error: ${e.message}\n`);
  process.exit(1);
});
