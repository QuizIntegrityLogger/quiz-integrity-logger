/**
 * @file server/src/routes/quizzes.routes.js
 * @description
 * Quiz read and management routes.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Prefix: /api/quizzes. Both roles: GET / and GET /:id with role appropriate projections.
 * Teacher: POST /, PUT /:id, DELETE /:id, GET /:id/attempts.
 *
 * Acceptance criteria:
 * Student quiz fetches contain no key, and all write requests require both teacher role and
 * ownership.
 *
 * @todo Apply auth to every route in this router.
 *
 * @todo Register GET / for role filtered list and GET /:id for the teacher builder or safe
 *       student quiz details.
 *
 * @todo Register POST /, PUT /:id, and DELETE /:id with requireRole teacher before the
 *       appropriate quiz controller handler.
 *
 * @todo Register GET /:id/attempts as teacher only and point it to attempts.controller.js
 *       listForQuiz.
 *
 * @todo Keep ownership checks in controllers even though the route already checks a role. Wrap
 *       asynchronous handlers consistently.
 *
 * @todo If you add literal paths later, place them before a conflicting /:id pattern. Keep one
 *       documented path for each action.
 *
 * @see server/src/controllers/quizzes.controller.js
 *
 * @see server/src/controllers/attempts.controller.js
 *
 * @see auth
 *
 * @see requireRole
 *
 * @see asyncHandler
 */
