/**
 * @file server/src/scoring/rules/tooFastAnswers.js
 * @description
 * Scoring rule for unusually short measured answer durations.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Rule id: too_fast_answers. Strict comparison for fast time: duration below threshold.
 * Trigger also requires both minimum count and ratio.
 *
 * Acceptance criteria:
 * An incomplete session with missing timings cannot become suspicious merely because missing
 * durations were treated as zero.
 *
 * @todo Read perQuestionTimes and use only answered questions with valid positive active time
 *       measurements. Missing time is excluded and lowers confidence separately.
 *
 * @todo For the initial demo, set each MCQ fast threshold to prompt character count times 30
 *       ms, bounded between 2000 and 8000 ms. Set short answer threshold to characters times
 *       40 ms, bounded between 3000 and 10000 ms.
 *
 * @todo Count answers below their own threshold. Trigger only with at least three fast answers
 *       and a fast fraction of at least 0.60 among valid answered timings.
 *
 * @todo When triggered, contribute 5 points per fast answer capped at 30. Return id
 *       too_fast_answers and related question ids.
 *
 * @todo Explain the fast count, valid sample count, ratio, and threshold policy in the reason.
 *       State that short prompts or knowledgeable students may answer quickly.
 *
 * @todo Keep every threshold in SCORING_CONFIG and test values just below, at, and above the
 *       boundaries. These are demonstration defaults, not empirical limits of human speed.
 *
 * @see server/src/scoring/features.js
 *
 * @see server/src/scoring/levels.js
 */
