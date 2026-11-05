/**
 * @file server/src/scoring/rules/evenRhythm.js
 * @description
 * Scoring rule for uniform timing across sufficient question samples.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Rule id: even_rhythm. Minimum valid sample size: 5. Initial maximum contribution: 10.
 * Severity: low.
 *
 * Acceptance criteria:
 * Four identical timings do not trigger, five qualifying timings can trigger, and a zero mean
 * is handled safely.
 *
 * @todo Require at least five valid answered question durations and a positive mean before
 *       considering cvOfTimes.
 *
 * @todo Use an initial trigger of coefficient of variation below 0.12 while mean active time
 *       is at most 15000 ms. Keep these values configurable.
 *
 * @todo If triggered, contribute 10 points with low severity and id even_rhythm. Otherwise
 *       contribute zero.
 *
 * @todo Include sample count, mean duration, observed CV, and the CV threshold in the reason
 *       so the teacher can inspect the comparison.
 *
 * @todo Treat evenly paced work as weak evidence that may have ordinary explanations. Do not
 *       call the student a bot or conclude that automation occurred.
 *
 * @todo Return a stable rule result object even when timing data is insufficient; put
 *       insufficient data handling in confidence, not extra penalty points.
 *
 * @see server/src/scoring/features.js
 *
 * @see server/src/scoring/levels.js
 */
