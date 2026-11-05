/**
 * @file server/src/routes/results.routes.js
 * @description
 * Teacher result and review decision routes.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Prefix: /api/results. All three endpoints are teacher only. Decision values saved by the UI:
 * cleared or needs_follow_up.
 *
 * Acceptance criteria:
 * A student and a different quiz teacher are both prevented from inspecting an attempt review.
 *
 * @todo Apply auth and requireRole teacher to every route.
 *
 * @todo Register GET /quiz/:quizId with results.controller.js listByQuiz.
 *
 * @todo Register GET /attempt/:attemptId with getAttemptReview.
 *
 * @todo Register PATCH /attempt/:attemptId/decision with saveDecision.
 *
 * @todo Keep all quiz ownership checks in the controller as well. Do not create a public or
 *       student integrity score route.
 *
 * @todo Use asyncHandler consistently and keep router code limited to routing and middleware
 *       order.
 *
 * @see server/src/controllers/results.controller.js
 *
 * @see auth
 *
 * @see requireRole
 *
 * @see asyncHandler
 */
