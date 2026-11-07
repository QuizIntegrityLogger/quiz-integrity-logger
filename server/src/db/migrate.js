/**
 * @file server/src/db/migrate.js
 * @description
 * Load and apply schema.sql through the shared connection. Export migration execution and
 * support the CLI without deleting existing data.
 *
 * The applied version is stored in SQLite's built-in user_version, so no extra table is needed.
 * To change the database later, add a new step at the END of MIGRATIONS with the next version
 * number. Never edit a step that has already been applied anywhere.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import db, { closeDb } from "./connection.js";

const schemaUrl = new URL("./schema.sql", import.meta.url);

export const MIGRATIONS = [
  {
    version: 1,
    name: "create initial tables",
    up: (conn) => conn.exec(fs.readFileSync(schemaUrl, "utf8")), // safe to repeat (IF NOT EXISTS)
  },
  // Example of a later step:
  // {
  //   version: 2,
  //   name: 'add quizzes.shuffle_questions',
  //   up: (conn) => conn.exec('ALTER TABLE quizzes ADD COLUMN shuffle_questions INTEGER NOT NULL DEFAULT 0'),
  // },
];

MIGRATIONS.forEach((m, i) => {
  if (m.version !== i + 1)
    throw new Error(
      `Migration versions must be 1, 2, 3... in order (found ${m.version}).`,
    );
});

export function migrate(conn = db) {
  const latest = MIGRATIONS.length;
  const from = conn.pragma("user_version", { simple: true });
  if (from > latest) {
    throw new Error(
      `The database is at version ${from}, newer than this code (${latest}). Update the server code.`,
    );
  }

  const applied = [];
  for (const step of MIGRATIONS.filter((m) => m.version > from)) {
    // The step and its version bump succeed or fail together.
    conn.transaction(() => {
      step.up(conn);
      conn.pragma(`user_version = ${step.version}`);
    })();
    applied.push(`${step.version}: ${step.name}`);
  }

  if (applied.length) console.log(`[migrate] applied ${applied.join(", ")}`);
  return { from, to: latest, applied };
}

// Support: npm run migrate
const isDirectRun =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isDirectRun) {
  try {
    const { applied, to } = migrate();
    if (!applied.length)
      console.log(`[migrate] database is up to date (version ${to})`);
    closeDb();
  } catch (err) {
    console.error("[migrate] failed:", err);
    closeDb();
    process.exit(1);
  }
}
