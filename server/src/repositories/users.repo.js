/**
 * @file server/src/repositories/users.repo.js
 * @description
 * User persistence and safe user projections.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Exports: findByEmail, findById, createUser. Safe user shape: id, name, email, role,
 * created_at. Internal credential rows are never serialized directly.
 *
 * Acceptance criteria:
 * Registration and login use prepared statements, and auth/me never exposes password_hash.
 *
 * @todo Import the shared db connection and prepare parameterized statements. Put user table
 *       SQL here, not in controllers.
 *
 * @todo Implement findByEmail(normalizedEmail) for login and duplicate checks, findById(id)
 *       for authentication, and createUser with a precomputed password hash.
 *
 * @todo Normalize email consistently at input boundaries and enforce database uniqueness to
 *       handle two concurrent registrations.
 *
 * @todo Use explicit selected columns. Keep an internal lookup with password_hash for login
 *       and a safe user projection for responses.
 *
 * @todo Return inserted ids or plain objects, not the raw database result with unrelated
 *       internals. Translate only known constraints when the caller needs a 409.
 *
 * @todo Keep bcrypt work outside database transactions. The repository must never receive or
 *       store a plaintext password.
 *
 * @see server/src/db/connection.js
 *
 * @see server/src/controllers/auth.controller.js
 *
 * @see server/src/middleware/auth.js
 *
 * @see server/src/db/seed.js
 */
