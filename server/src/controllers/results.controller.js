/**
 * @file server/src/controllers/results.controller.js
 * @description
 * Teacher result summaries, attempt evidence, and review decisions.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * GET /api/results/quiz/:quizId returns attempts. GET /api/results/attempt/:attemptId returns
 * quiz, attempt, student, questions, answers, result, and events. PATCH
 * /attempt/:attemptId/decision accepts decision.
 *
 * Acceptance criteria:
 * Only the owning teacher can inspect evidence or save a decision, and a decision leaves the
 * computed score unchanged.
 *
 * @todo Implement listByQuiz, getAttemptReview, and saveDecision. Require the teacher role and
 *       verify the quiz teacher_id for every quiz/attempt lookup.
 *
 * @todo Before listing results, finalize expired unfinished attempts for this quiz through the
 *       shared finalization flow. Active attempts show in progress status with no invented
 *       integrity score.
 *
 * @todo Return summaries with attempt id, safe student name, submitted_at, integrity_score,
 *       level, flag_count, decision, and confidence. Keep any academic MCQ total clearly
 *       separate.
 *
 * @todo For review, assemble quiz metadata, attempt, questions, student answers, result
 *       features/flags, and sorted events. Teachers may see the answer key on their own quiz
 *       review.
 *
 * @todo Decode stored JSON once and map database results.score to API integrity_score. Flags
 *       must include their actual observed numbers and optional related time/question ids.
 *
 * @todo Validate a decision of cleared or needs_follow_up, save reviewer and server time, and
 *       return the updated decision fields. Never let a decision request replace scoring
 *       features or points.
 *
 * @todo Include a plain explanation that the score is a rules based indicator requiring human
 *       review. Expose confidence and missing evidence caveats so low telemetry does not
 *       become a false accusation.
 *
 * @see server/src/repositories/results.repo.js
 *
 * @see server/src/repositories/attempts.repo.js
 *
 * @see server/src/repositories/quizzes.repo.js
 *
 * @see server/src/repositories/events.repo.js
 */
