/**
 * @file client/src/api/results.api.js
 * @description
 * Teacher result, evidence review, and decision requests.
 *
 * Responsibility: Kristine, teacher interface development.
 * Implementation guide.
 *
 * Integration contract:
 * listByQuiz returns attempts. getAttempt returns quiz, attempt, student, questions, answers,
 * result, and events. saveDecision returns decision, reviewed_by, and reviewed_at.
 *
 * Acceptance criteria:
 * The review page can load all evidence and update a decision without modifying the computed
 * score.
 *
 * @todo Export listByQuiz, getAttempt, and saveDecision as thin wrappers around http.js.
 *
 * @todo listByQuiz calls GET /results/quiz/:quizId. Accept a signal for cancellation when the
 *       teacher changes pages.
 *
 * @todo getAttempt calls GET /results/attempt/:attemptId and returns the decoded review
 *       payload unchanged.
 *
 * @todo saveDecision patches /results/attempt/:attemptId/decision with a decision of cleared
 *       or needs_follow_up.
 *
 * @todo Keep UI sorting/filtering in the page for the initial small dataset. Never send
 *       recomputed score values from the browser.
 *
 * @todo Treat 403/404 as inaccessible evidence and show a clear page state. Do not reuse the
 *       teacher wrapper in a student confirmation page.
 *
 * @see client/src/api/http.js
 *
 * @see AttemptsList.jsx
 *
 * @see AttemptReview.jsx
 */
