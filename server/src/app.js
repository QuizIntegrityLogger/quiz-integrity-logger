/**
 * @file server/src/app.js
 * @description
 * Express middleware, API routing, health checks, and error handling.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: app. Public infrastructure route: GET /health. API prefix: /api. Error envelope
 * everywhere: error plus optional safe details.
 *
 * Acceptance criteria:
 * Allowed origin preflights succeed, disallowed origins cannot read responses, and unknown API
 * routes return JSON.
 *
 * @todo Create the app and export it consistently. Apply helmet, a CORS configuration for
 *       env.CLIENT_ORIGIN, the 1 MB JSON body limit, and morgan.
 *
 * @todo Allow the Authorization and Content-Type request headers, the methods used by the API,
 *       and OPTIONS preflight requests. Bearer token authentication does not need credentialed
 *       cookies.
 *
 * @todo Provide GET /health with a minimal health response. Mount routes/index.js at /api.
 *
 * @todo Add a JSON 404 response after routes. Install the four argument error handler last.
 *
 * @todo Keep request logs limited to method, route, status, and timing. Do not log
 *       Authorization values, passwords, full answer bodies, or event metadata.
 *
 * @todo Remember that CORS is a browser access control, not authorization. Every protected
 *       route still needs JWT verification and ownership checks.
 *
 * @todo Before a public release, plan bounded authentication and event request rates. Any
 *       extra dependency or middleware for that can be added during implementation; this file
 *       remains the integration point.
 *
 * @see server/src/config/env.js
 *
 * @see server/src/routes/index.js
 *
 * @see server/src/middleware/errorHandler.js
 */
