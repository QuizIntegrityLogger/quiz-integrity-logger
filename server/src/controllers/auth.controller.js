/**
 * @file server/src/controllers/auth.controller.js
 * @description
 * Validate registration and login input, return a token with a safe user, and handle the
 * current-user request.
 */

import { HttpError, ValidationError } from "../middleware/errorHandler.js";

import {
  DUMMY_HASH,
  hashPassword,
  passwordProblem,
  verifyPassword,
} 

from "../utils/password.js";

import { signToken, verifyToken } from "../utils/jwt.js";
import {
  createUser,
  emailExists,
  findById,
  findForLogin,
  normalizeEmail,
  toSafeUser,
} 

from "../repositories/users.repo.js";

const ALLOW_TEACHER_SIGNUP = true;

const ROLES = ["student", "teacher"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bodyOf(req) {
  const body = req.body;
  return body && typeof body === "object" && !Array.isArray(body) ? body : {};
}

function validateRegistration(body) {
  const errors = [];

  const email =
    typeof body.email === "string" ? normalizeEmail(body.email) : "";
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.push({ field: "email", message: "Enter a valid email address." });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name || name.length > 100) {
    errors.push({
      field: "name",
      message: "Name is required (100 characters at most).",
    });
  }

  const passwordMessage = passwordProblem(body.password);
  if (passwordMessage)
    errors.push({ field: "password", message: passwordMessage });

  const role = body.role ?? "student";
  if (!ROLES.includes(role)) {
    errors.push({ field: "role", message: "Role must be student or teacher." });
  }

  if (errors.length)
    throw new ValidationError("Please fix the highlighted fields.", errors);
  if (role === "teacher" && !ALLOW_TEACHER_SIGNUP) {
    throw new HttpError(
      403,
      "Teacher accounts cannot be created through registration.",
    );
  }
  return { email, name, password: body.password, role };
}

const emailTaken = () =>
  new HttpError(409, "An account with that email already exists.", {
    code: "EMAIL_TAKEN",
  });

export async function register(req, res) {
  const { email, name, password, role } = validateRegistration(bodyOf(req));

  if (emailExists(email)) throw emailTaken();

  const passwordHash = await hashPassword(password);
  let user;
  try {
    user = createUser({ email, passwordHash, name, role });
  } catch (err) {

    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") throw emailTaken();
    throw err;
  }

  res.status(201).json({ token: signToken(user), user });
}

export async function login(req, res) {
  const body = bodyOf(req);
  if (
    typeof body.email !== "string" ||
    typeof body.password !== "string" ||
    !body.email.trim() ||
    !body.password
  ) {
    throw new ValidationError("Email and password are required.");
  }

  const row = findForLogin(body.email);

  const passwordOk = await verifyPassword(
    body.password,
    row ? row.password_hash : DUMMY_HASH,
  );
  if (!row || !passwordOk) {
    throw new HttpError(401, "Invalid email or password.", {
      code: "INVALID_CREDENTIALS",
    });
  }

  const user = toSafeUser(row);
  res.json({ token: signToken(user), user });
}

export function me(req, res) {
  const [scheme, token] = (req.get("Authorization") ?? "").split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new HttpError(401, "Authentication required.", {
      code: "AUTH_REQUIRED",
    });
  }

  const payload = verifyToken(token);
  const user = findById(Number(payload.sub));
  if (!user)
    throw new HttpError(401, "Invalid token.", { code: "INVALID_TOKEN" });

  res.json({ user });
}
