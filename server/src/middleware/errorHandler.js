/**
 * @file server/src/middleware/errorHandler.js
 * @description
 * Consistent HTTP error responses and safe diagnostic output.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Error response: error is a plain text message; optional details is a list of safe field
 * errors. Client code must handle an unavailable/non JSON backend too.
 *
 * Acceptance criteria:
 * A bad request, forbidden request, and unexpected error all use the same envelope without
 * exposing a stack or query.
 *
 * @todo Use the four argument Express error handler signature and install it after all routes
 *       in app.js.
 *
 * @todo Turn Zod validation failures into 400 with field level safe details. Handle malformed
 *       JSON and oversized bodies with appropriate 400 or 413 responses.
 *
 * @todo Honor known application statuses: 401, 403, 404, 409, and 422 where the documented
 *       contracts use them. Do not expose raw SQL or driver messages.
 *
 * @todo Map an expected duplicate email/attempt conflict to 409 at the relevant controller or
 *       repository boundary. Unexpected database errors stay generic 500.
 *
 * @todo If headers were already sent, forward to the next handler instead of trying to send a
 *       second response.
 *
 * @todo Log diagnostic details on the server with secrets and answer content removed. In
 *       production return a generic message for unanticipated 500 failures.
 *
 * @see zod
 *
 * @see server/src/app.js
 *
 * @see server/src/config/env.js
 *
 * @see controller errors
 */
