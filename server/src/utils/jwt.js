/**
 * @file server/src/utils/jwt.js
 * @description
 * Session token signing and verification.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Exports: signToken(user), verifyToken(token). Lifetime: eight hours. Current role is loaded
 * from users.repo.js on authenticated requests.
 *
 * Acceptance criteria:
 * A signed token verifies, a modified token fails, and expiry is checked rather than merely
 * decoded.
 *
 * @todo Read the secret from env.js. Define the allowed signing algorithm explicitly and use
 *       the same algorithm when verifying.
 *
 * @todo Export signToken(user). Put the user id in the subject, include only required public
 *       claims, and set an eight hour expiry.
 *
 * @todo Export verifyToken(token). Verify signature, expiry, and subject shape, then return
 *       trusted parsed claims for auth.js.
 *
 * @todo Do not put passwords, password hashes, answers, or quiz answer keys in a token. A
 *       token payload is readable by its holder.
 *
 * @todo Keep invalid/expired token handling distinguishable from a server configuration
 *       failure. auth.js maps credential failures to 401.
 *
 * @todo Document that this initial project uses token expiry and client logout; immediate
 *       server side revocation would need an additional implementation policy.
 *
 * @see jsonwebtoken
 *
 * @see server/src/config/env.js
 *
 * @see server/src/middleware/auth.js
 *
 * @see server/src/controllers/auth.controller.js
 */
