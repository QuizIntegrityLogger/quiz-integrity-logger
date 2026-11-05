/**
 * @file server/src/routes/index.js
 * @description
 * API router composition.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: root API router. Final prefixes are /api/auth, /api/quizzes, /api/attempts, and
 * /api/results.
 *
 * Acceptance criteria:
 * Every client wrapper points to exactly one documented endpoint with no repeated /api
 * segment.
 *
 * @todo Create an Express router and import auth, quizzes, attempts, and results route
 *       modules.
 *
 * @todo Mount them at /auth, /quizzes, /attempts, and /results. app.js mounts this router once
 *       at /api.
 *
 * @todo Do not duplicate /api in a child route or put database work here.
 *
 * @todo Keep /health in app.js outside the API router. Let unmatched requests continue to the
 *       common JSON 404 handler.
 *
 * @see server/src/routes/auth.routes.js
 *
 * @see server/src/routes/quizzes.routes.js
 *
 * @see server/src/routes/attempts.routes.js
 *
 * @see server/src/routes/results.routes.js
 *
 * @see server/src/app.js
 */
