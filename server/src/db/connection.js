/**
 * @file server/src/db/connection.js
 * @description
 * Open one better-sqlite3 connection using the configured path. Create its directory and
 * enable WAL, foreign keys, and a suitable busy timeout.
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { config } from "../config/env.js";

fs.mkdirSync(path.dirname(config.dbPath), { recursive: true });

export const db = new Database(config.dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");

export function closeDb() {
  if (db.open) db.close();
}

export default db;
