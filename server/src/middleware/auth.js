/**
 * @file server/src/middleware/auth.js
 * @description
 * Bearer token verification and authenticated request context.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Input: Authorization: Bearer followed by the token. Output: req.user with id, role, name,
 * and email if needed. Auth failure: 401 with a safe error.
 *
 * Acceptance criteria:
 * An expired token is rejected and a valid student token still cannot pass a teacher role
 * guard.
 *
 * @todo Read the Authorization header and require a Bearer token. Reject missing, malformed,
 *       expired, or invalid tokens with 401.
 *
 * @todo Use utils/jwt.js to verify the token signature and claims; do not use decode alone.
 *
 * @todo Load the subject user from users.repo.js. Reject removed users and use their current
 *       database role so a role change is not trusted only from an old token.
 *
 * @todo Set req.user to safe fields including integer id and role. Never attach password_hash
 *       to the object passed to a controller response.
 *
 * @todo Call next only after successful authentication. Keep quiz ownership and attempt
 *       ownership checks inside the appropriate controllers.
 *
 * @todo Forward unexpected repository failures to the central error handler rather than
 *       disguising every failure as a bad token.
 *
 * @see server/src/utils/jwt.js
 *
 * @see server/src/repositories/users.repo.js
 *
 * @see server/src/middleware/errorHandler.js
 */
