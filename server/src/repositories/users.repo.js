/**
 * @file server/src/repositories/users.repo.js
 * @description
 * Prepared user queries with normalized unique emails. Every function returns a safe user
 * (id, email, name, role, created_at) except findForLogin, which also returns password_hash
 * and must only be used to check a password.
 */

import db from "../db/connection.js";

const statements = new Map();
function stmt(sql) {
  let s = statements.get(sql);
  if (!s) {
    s = db.prepare(sql);
    statements.set(sql, s);
  }
  return s;
}

const SAFE_COLUMNS = "id, email, name, role, created_at";

export function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

export function toSafeUser(row) {
  if (!row) return null;
  const { password_hash: _omitted, ...safe } = row;
  return safe;
}

export function createUser({ email, passwordHash, name, role }) {
  const info = stmt(
    "INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)",
  ).run(normalizeEmail(email), passwordHash, name, role);
  return findById(info.lastInsertRowid);
}

export function findById(id) {
  return stmt(`SELECT ${SAFE_COLUMNS} FROM users WHERE id = ?`).get(id) ?? null;
}

export function emailExists(email) {
  return Boolean(
    stmt("SELECT 1 FROM users WHERE email = ?").get(normalizeEmail(email)),
  );
}

export function findForLogin(email) {
  return (
    stmt(
      `SELECT ${SAFE_COLUMNS}, password_hash FROM users WHERE email = ?`,
    ).get(normalizeEmail(email)) ?? null
  );
}
