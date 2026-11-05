/**
 * @file server/src/scoring/rules/answerFlip.js
 * @description
 * Scoring rule for verified MCQ answer corrections after focus returns.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Rule id: answer_flip. Initial contribution: 10 each, capped at 20. Only verified MCQ history
 * is eligible.
 *
 * Acceptance criteria:
 * An initial correct answer, a short answer, or forged client correctness metadata never
 * triggers this rule.
 *
 * @todo Read the integer answerFlips and related answerFlipEvents extracted from server
 *       verified autosave history. Require a previous saved answer that was actually
 *       incorrect; a first correct answer is not a flip.
 *
 * @todo Use an initial window of 15000 ms after focus_gained, with a valid preceding
 *       focus_lost. Apply the same window in feature extraction.
 *
 * @todo Add 10 points per qualifying change with a maximum of 20, and return id answer_flip
 *       with related question ids and times.
 *
 * @todo Explain how many qualifying changes occurred and the window used. The sequence is a
 *       correlation for review; it does not establish why the student changed the answer.
 *
 * @todo Do not derive correctness from a boolean submitted to the events endpoint. Only the
 *       answer save transaction can enrich an event with trusted correctness metadata.
 *
 * @todo If saved answer history is missing or unverified, return zero contribution and allow
 *       confidence to describe the missing evidence rather than guessing.
 *
 * @see server/src/scoring/features.js
 *
 * @see server/src/scoring/levels.js
 *
 * @see server/src/repositories/attempts.repo.js
 *
 * @see server/src/repositories/events.repo.js
 */
