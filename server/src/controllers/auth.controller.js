/**
 * @file server/src/controllers/auth.controller.js
 * @description
 * Registration, login, and session restoration endpoints.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * POST /api/auth/register takes name, email, password, role and returns 201 with token and
 * user. POST /login returns 200 with token and user. GET /me returns user.
 *
 * Acceptance criteria:
 * Both roles can log in for the demo, invalid login uses 401, and all returned user fields are
 * safe.
 *
 * @todo Implement register, login, and me. Use Zod validation for name, email, password, and
 *       the allowed role values.
 *
 * @todo For the agreed class project workflow, registration can select student or teacher.
 *       Treat public teacher self registration as an explicit demo choice; a real school
 *       rollout should provision approved teachers through this same auth flow.
 *
 * @todo Normalize email, check accepted password byte length, hash with password.js, then
 *       create the user. Translate a unique email conflict to 409.
 *
 * @todo For login, load the credential row and compare the hash. Use the same generic invalid
 *       credentials response for an unknown email and a wrong password.
 *
 * @todo Return token plus a safe user for register/login. me uses req.user or a fresh safe
 *       repository projection and never returns a hash.
 *
 * @todo Keep client session storage outside this controller; the API does not set
 *       authentication cookies. Do not trust a client supplied id or role during protected
 *       requests.
 *
 * @todo Do not include real secrets or passwords in request logs, exception messages, or
 *       responses.
 *
 * @see zod
 *
 * @see server/src/repositories/users.repo.js
 *
 * @see server/src/utils/password.js
 *
 * @see server/src/utils/jwt.js
 */
