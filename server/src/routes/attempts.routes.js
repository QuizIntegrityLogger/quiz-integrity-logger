/**
 * @file server/src/routes/attempts.routes.js
 * @description
 * Student attempt routes and nested behavior event routes.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Prefix: /api/attempts. Student only: POST /, GET /, GET /:id, PUT /:id/answers/:questionId,
 * POST /:id/events, POST /:id/submit.
 *
 * Acceptance criteria:
 * The quiz can start, resume, save, log, and submit using only routes already documented in
 * the client API layer.
 *
 * @todo Apply auth and requireRole student to the entire router.
 *
 * @todo Register POST / for consent based start/resume and GET / for the current student
 *       attempt history.
 *
 * @todo Register GET /:id to restore attempt state after navigation or page refresh.
 *
 * @todo Register PUT /:id/answers/:questionId for autosave and POST /:id/submit for idempotent
 *       submission.
 *
 * @todo Register POST /:id/events with events.controller.js. There is no separate event route
 *       file in the agreed structure.
 *
 * @todo Use the common async wrapper and let controllers validate ownership, deadlines,
 *       question membership, and request data.
 *
 * @see server/src/controllers/attempts.controller.js
 *
 * @see server/src/controllers/events.controller.js
 *
 * @see auth
 *
 * @see requireRole
 *
 * @see asyncHandler
 */
