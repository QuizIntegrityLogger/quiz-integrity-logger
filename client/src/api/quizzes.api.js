/**
 * @file client/src/api/quizzes.api.js
 * @description
 * Quiz discovery and teacher management requests.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * The list request returns quizzes. Get, create, and update return quiz. Delete returns no
 * body. Student projections exclude answer_key.
 *
 * Acceptance criteria:
 * The same get wrapper supports the consent screen and edit form while the server controls
 * which fields each role receives.
 *
 * @todo Import request and export list, get, create, update, remove, and listAttempts. Use
 *       remove rather than the reserved word delete as a function name if needed.
 *
 * @todo list calls GET /quizzes and receives role filtered quizzes. get(id) calls GET
 *       /quizzes/:id for consent details or builder data.
 *
 * @todo create sends POST /quizzes; update sends PUT /quizzes/:id; remove sends DELETE
 *       /quizzes/:id and handles a 204 response.
 *
 * @todo listAttempts calls teacher only GET /quizzes/:id/attempts. The teacher results wrapper
 *       offers the same summary via /results/quiz/:id; pick one consistently in AttemptsList.
 *
 * @todo Pass a signal when pages need cancellation. Leave validation errors for the form to
 *       display and never infer permissions from hidden buttons alone.
 *
 * @see client/src/api/http.js
 *
 * @see ConsentScreen.jsx
 *
 * @see StudentDashboard.jsx
 *
 * @see TeacherDashboard.jsx
 *
 * @see QuizBuilder.jsx
 */
