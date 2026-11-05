/**
 * @file server/src/scoring/index.js
 * @description
 * Integrity scoring orchestration and result persistence.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: compute(attemptId). Database results.score is API integrity_score. The orchestrator
 * is synchronous while using better-sqlite3 and joins an existing finalization transaction.
 *
 * Acceptance criteria:
 * A clean snapshot stays low, contributions cap at 100, duplicate calls keep one result, and
 * review decisions survive recomputation.
 *
 * @todo Export compute(attemptId). Load attempt, quiz questions, answers, and sorted events
 *       using repositories only; there is no raw SQL in this module.
 *
 * @todo Require a stored submission cutoff. Use submitted_at and deadline_at, never the
 *       current wall clock, when extracting features so repeated computation stays
 *       deterministic.
 *
 * @todo Call extractFeatures and all six rule functions using SCORING_CONFIG. Keep all rule
 *       evaluations for transparency and store triggered rules as flags.
 *
 * @todo Sum only nonnegative scoring contributions and clamp at 100. Call getLevel for the
 *       concern band. Preserve zero point informational flags.
 *
 * @todo Set confidence low for fewer than five questions or timing coverage below 0.80 or
 *       material missing evidence; otherwise use standard. This describes evidence quantity,
 *       not statistical certainty.
 *
 * @todo Include SCORING_VERSION, cutoff information, and confidence reasons in features_json.
 *       Store flags with id, points, severity, observed number reason, and optional related
 *       times/question ids.
 *
 * @todo Save through results.repo.js without changing a teacher decision. Use the caller
 *       finalization transaction so a score write failure cannot leave a submitted attempt
 *       without a result.
 *
 * @todo Return a normalized internal result. Controllers decide what is safe to expose;
 *       student submission endpoints do not serialize it.
 *
 * @todo Ensure rerunning identical stored evidence/configuration produces identical score,
 *       level, features, and flags. Preserve the existing computed_at for that snapshot.
 *
 * @see all five repositories as needed
 *
 * @see server/src/scoring/features.js
 *
 * @see server/src/scoring/levels.js
 *
 * @see six rules
 */
