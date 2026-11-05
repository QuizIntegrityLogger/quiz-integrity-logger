/**
 * @file client/src/pages/teacher/AttemptsList.jsx
 * @description
 * Student attempt summaries, concern filters, and review navigation.
 *
 * Responsibility: Kristine, teacher interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser route: /teacher/quiz/:id/attempts. API: GET /api/results/quiz/:quizId. Alternative
 * existing quiz attempt endpoint uses the same summary contract.
 *
 * Acceptance criteria:
 * A teacher can filter/sort completed attempts, identify incomplete evidence, and open the
 * correct student review.
 *
 * @todo Read quiz id from the URL and call results.api.listByQuiz. Show quiz title through
 *       returned metadata or a separate quizzes.api.get call.
 *
 * @todo Render student name, status, submitted time, ScoreBadge, confidence, triggered flag
 *       count, teacher decision, and View review.
 *
 * @todo For in progress attempts show no numeric concern score. The backend may finalize
 *       expired attempts before returning this list.
 *
 * @todo Add sorting by integrity_score with missing values last and a Low/Medium/High filter.
 *       Keep informational flags and confidence wording clear.
 *
 * @todo View review navigates to /teacher/attempt/:attemptId, not to a quiz id. Support empty,
 *       no filter match, loading, and retry states.
 *
 * @todo Keep table headers sticky or the table horizontally scrollable on narrow screens. Use
 *       text labels for score bands and status rather than color alone.
 *
 * @todo Label this as integrity concern. If you add MCQ academic points, use a separate column
 *       name and do not mix short answer manual grading into this version.
 *
 * @see client/src/api/results.api.js
 *
 * @see client/src/api/quizzes.api.js
 *
 * @see client/src/components/ScoreBadge.jsx
 *
 * @see react-router-dom
 */
