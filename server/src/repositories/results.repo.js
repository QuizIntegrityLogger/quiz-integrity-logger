/**
 * @file server/src/repositories/results.repo.js
 * @description
 * Integrity result persistence and teacher review decisions.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Exports: upsertResult, findByAttempt, listByQuiz, saveDecision. Result API uses
 * integrity_score; the underlying results.score column stores that value.
 *
 * Acceptance criteria:
 * A repeated score save keeps one row and preserves the teacher review decision.
 *
 * @todo Implement upsertResult, findByAttempt, listByQuiz, and saveDecision using prepared
 *       statements.
 *
 * @todo Enforce one result per attempt with the unique key. Save score, level, features_json,
 *       flags_json, and the first computed_at for a finalized snapshot.
 *
 * @todo Keep computed scoring fields separate from decision, reviewed_by, and reviewed_at.
 *       Recomputing identical evidence must never reset a teacher decision.
 *
 * @todo Decode JSON deliberately at the repository boundary or in one documented mapper;
 *       return arrays/objects to controllers rather than JSON strings inside JSON.
 *
 * @todo Join safe student names and submission timestamps for teacher tables. Require the
 *       owning teacher id for teacher facing queries; internal scoring reads stay separate
 *       from that external access path.
 *
 * @todo Validate the review decision against pending, cleared, and needs_follow_up; stamp the
 *       current teacher id and server time. A decision does not alter the integrity score.
 *
 * @todo Keep any academic MCQ total under a distinct name such as mcq_points_earned. Do not
 *       present the integrity score as a grade or calibrated cheating probability.
 *
 * @see server/src/db/connection.js
 *
 * @see server/src/scoring/index.js
 *
 * @see server/src/controllers/results.controller.js
 */
