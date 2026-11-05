/**
 * @file client/src/api/attempts.api.js
 * @description
 * Attempt creation, restoration, autosave, event delivery, and submission requests.
 *
 * Responsibility: GF, student interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Start and get return attempt, questions, answers, and server_now. saveAnswer returns answer
 * and applied. listMine returns attempts. sendEvents returns an acknowledgement. submit
 * returns attempt_id, submitted_at, and status.
 *
 * Acceptance criteria:
 * A page can reload an attempt, resume versions, and coordinate all pending writes before one
 * idempotent submit.
 *
 * @todo Export start, listMine, get, saveAnswer, sendEvents, and submit, all using http.js.
 *
 * @todo start posts quiz_id and consent_given true to /attempts. listMine gets /attempts;
 *       get(id) gets /attempts/:id for direct route restoration.
 *
 * @todo saveAnswer uses PUT /attempts/:id/answers/:questionId and sends response,
 *       client_version, and the matching change_event containing client_event_id and t_ms.
 *
 * @todo sendEvents posts an events array to /attempts/:id/events. Accept an optional keepalive
 *       flag and keep each final payload small.
 *
 * @todo submit posts to /attempts/:id/submit with no client supplied score or timestamp. Its
 *       response is a safe submission confirmation.
 *
 * @todo Return promises so TakeQuiz can await answer flush, event flush, and submit in order.
 *       Do not silently swallow errors or use sendBeacon for this bearer header API.
 *
 * @see client/src/api/http.js
 *
 * @see useEventLogger.js
 *
 * @see useAutosave.js
 *
 * @see ConsentScreen.jsx
 *
 * @see TakeQuiz.jsx
 *
 * @see StudentDashboard.jsx
 */
