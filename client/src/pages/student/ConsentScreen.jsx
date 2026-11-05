/**
 * @file client/src/pages/student/ConsentScreen.jsx
 * @description
 * Quiz instructions, logging consent, and attempt creation.
 *
 * Responsibility: GF, student interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser route: /student/quiz/:id/consent. Start body: quiz_id, consent_given true. Response
 * supplies authoritative started_at/deadline_at/server_now.
 *
 * Acceptance criteria:
 * Decline logs nothing, a successful start uses the server attempt id, and retrying start does
 * not create another attempt.
 *
 * @todo Read quiz id from the URL and load quizzes.api.get. Handle unavailable, past due, and
 *       loading states before enabling Start.
 *
 * @todo Show title, full instructions, time limit, due date, and the fact that starting begins
 *       a server enforced countdown.
 *
 * @todo Render ConsentModal with controlled agreed/open/loading/error state. Keep the checkbox
 *       initially unchecked.
 *
 * @todo On explicit confirmation, call attempts.api.start with quiz_id and consent_given true.
 *       Prevent repeated submissions while waiting.
 *
 * @todo Use the returned attempt id for /student/attempt/:id. You may pass the initial payload
 *       in navigation state as a cache, but TakeQuiz must still support a direct refresh
 *       through get.
 *
 * @todo If the server returns the already existing submitted attempt, go to Submitted; if it
 *       returns an open attempt, resume it without creating a duplicate.
 *
 * @todo Cancel returns to /student. Do not initialize logger/countdown hooks or capture
 *       behavior before the server has accepted the consent/start request.
 *
 * @see client/src/api/quizzes.api.js
 *
 * @see client/src/api/attempts.api.js
 *
 * @see client/src/components/ConsentModal.jsx
 *
 * @see react-router-dom
 */
