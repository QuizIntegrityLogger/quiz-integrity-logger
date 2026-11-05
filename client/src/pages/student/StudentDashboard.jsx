/**
 * @file client/src/pages/student/StudentDashboard.jsx
 * @description
 * Available quizzes, resumable attempts, and submission history.
 *
 * Responsibility: GF, student interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser route: /student. Reads GET /api/quizzes and GET /api/attempts. Start uses quiz id;
 * Resume/confirmation uses attempt id.
 *
 * Acceptance criteria:
 * A student can distinguish new, resumable, and submitted work without seeing any teacher only
 * integrity result.
 *
 * @todo Load quizzes.api.list and attempts.api.listMine. Display loading, error/retry, and
 *       empty states for both sections.
 *
 * @todo For each quiz show title, instructions preview, time limit, and due date in the user
 *       local display time.
 *
 * @todo With no attempt, Start navigates to /student/quiz/:id/consent. Starting is never a
 *       direct navigation to an unconsented quiz.
 *
 * @todo For an active existing attempt, Resume navigates to /student/attempt/:attemptId. Use
 *       the server state, not localStorage, to decide whether a new attempt is allowed.
 *
 * @todo For submitted attempts show submitted time and a confirmation link such as
 *       /student/submitted?attemptId=5. Do not show integrity score, concern level, flags, or
 *       answer keys.
 *
 * @todo An overdue unfinished attempt may be finalized by the next authorized API access;
 *       refresh the list from the server after such a response.
 *
 * @todo Keep past attempts separate from open quiz choices, and use clear keyboard accessible
 *       action buttons with a responsive card/table layout.
 *
 * @see client/src/api/quizzes.api.js
 *
 * @see client/src/api/attempts.api.js
 *
 * @see react-router-dom
 *
 * @see styles/index.css
 */
