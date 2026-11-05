/**
 * @file server/src/scoring/rules/pasteShortAnswer.js
 * @description
 * Scoring rule for paste events in short answer fields.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Rule result: id, triggered, points, severity, reason, optional related_t_ms and
 * question_ids. Initial severity for a triggered scoring rule: medium.
 *
 * Acceptance criteria:
 * Zero pastes adds zero, one paste adds 10, and four pastes still add at most 30.
 *
 * @todo Export a pure evaluate function accepting features and the shared configuration. Read
 *       pasteCount that features.js has already limited to short answer questions.
 *
 * @todo Trigger when that count is greater than zero. Add 10 points per paste with an initial
 *       cap of 30.
 *
 * @todo Return id paste_short_answer, triggered, points, severity, a plain reason containing
 *       the count and cap, and related question/time references when available.
 *
 * @todo If not triggered, return zero points and a neutral explanation; keep the result shape
 *       identical.
 *
 * @todo Describe this as an observed paste event. A paste can come from allowed notes or
 *       assistive tools; do not label it proof of cheating or infer the source text.
 *
 * @todo Do not make database calls, read Date.now, or use clipboard text. Configuration
 *       changes belong in levels.js.
 *
 * @see server/src/scoring/features.js
 *
 * @see server/src/scoring/levels.js
 *
 * @see server/src/scoring/index.js
 */
