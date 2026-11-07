/**
 * @file server/src/config/env.js
 * @description
 * Load and validate all server environment settings in one module. Export normalized values
 * and fail startup when required configuration is missing.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const SERVER_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const NODE_ENVS = ["development", "production", "test"];
const MIN_SECRET_LENGTH = 32;

export class ConfigError extends Error {
  constructor(problems) {
    super(
      `Invalid server configuration:\n${problems.map((p) => `  - ${p}`).join("\n")}\n` +
        "Check server/.env against server/.env.example.",
    );
    this.name = "ConfigError";
    this.problems = problems;
  }
}

function loadDotEnv() {
  try {
    process.loadEnvFile(path.join(SERVER_ROOT, ".env"));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}

export function parseEnv(env = process.env) {
  const problems = [];
  const get = (name) => (env[name] ?? "").trim();

  const nodeEnv = get("NODE_ENV") || "development";
  if (!NODE_ENVS.includes(nodeEnv)) {
    problems.push(
      `NODE_ENV must be one of ${NODE_ENVS.join(", ")} (got "${nodeEnv}").`,
    );
  }

  const portRaw = get("PORT") || "4000";
  const port = Number(portRaw);
  if (!/^\d+$/.test(portRaw) || port < 1 || port > 65535) {
    problems.push(
      `PORT must be a whole number from 1 to 65535 (got "${portRaw}").`,
    );
  }

  const jwtSecret = get("JWT_SECRET");
  if (!jwtSecret) {
    problems.push(
      "JWT_SECRET is required. Generate one with: " +
        `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`,
    );
  } else if (jwtSecret.length < MIN_SECRET_LENGTH) {
    problems.push(
      `JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters long.`,
    );
  }

  let clientOrigin = "";
  const originRaw = get("CLIENT_ORIGIN");
  if (!originRaw) {
    problems.push(
      "CLIENT_ORIGIN is required (for example http://localhost:5173).",
    );
  } else {
    let url = null;
    try {
      url = new URL(originRaw);
    } catch {
      url = null;
    }
    const valid =
      url &&
      ["http:", "https:"].includes(url.protocol) &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash;
    if (valid)
      clientOrigin = url.origin;
    else
      problems.push(
        `CLIENT_ORIGIN must be one exact origin like https://example.com (got "${originRaw}").`,
      );
  }

  let dbPath = "";
  const dbRaw = get("DB_PATH");
  if (!dbRaw) {
    problems.push("DB_PATH is required (for example ./data/app.db).");
  } else {
    dbPath = path.isAbsolute(dbRaw)
      ? path.normalize(dbRaw)
      : path.resolve(SERVER_ROOT, dbRaw);
  }

  const seedRaw = get("SEED_DEMO").toLowerCase();
  let seedDemo = false;
  if (["true", "1", "yes"].includes(seedRaw)) seedDemo = true;
  else if (!["", "false", "0", "no"].includes(seedRaw)) {
    problems.push(
      `SEED_DEMO must be true or false when set (got "${seedRaw}").`,
    );
  }

  if (problems.length) throw new ConfigError(problems);

  return Object.freeze({
    nodeEnv,
    isProduction: nodeEnv === "production",
    port,
    jwtSecret,
    clientOrigin,
    dbPath,
    seedDemo,
  });
}

loadDotEnv();

export const config = (() => {
  try {
    return parseEnv();
  } catch (err) {
    if (err instanceof ConfigError) {
      console.error(`\n${err.message}\n`);
      process.exit(1);
    }
    throw err;
  }
})();
