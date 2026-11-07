/**
 * @file server/src/utils/password.js
 * @description
 * Hash and compare passwords with bcryptjs and enforce password length limits.
 */
import bcrypt from "bcryptjs";

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_BYTES = 72; 
const COST = 10;

export const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", COST);

export function passwordProblem(password) {
  if (typeof password !== "string") return "Password is required.";
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES) {
    return `Password must be at most ${MAX_PASSWORD_BYTES} bytes (emoji and non-English letters use more than one byte each).`;
  }
  return null;
}

export function hashPassword(password) {
  return bcrypt.hash(password, COST);
}

export async function verifyPassword(password, hash) {
  if (
    typeof password !== "string" ||
    Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES
  ) {
    return false;
  }
  return bcrypt.compare(password, hash);
}
