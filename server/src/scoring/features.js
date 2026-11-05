/**
 * @file server/src/scoring/features.js
 * @description
 * Deterministic measurements extracted from stored attempt evidence.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: extractFeatures({questions, answers, events, attempt}, config). Milliseconds are the
 * common unit. cvOfTimes is population standard deviation divided by mean for valid timing
 * samples; timingCoverage is validTimingCount divided by answeredCount, or zero when no
 * answers exist.
 *
 * Acceptance criteria:
 * The same snapshot always produces the same features, and repeated focus events or missing
 * timings do not inflate a score.
 *
 * Implementation notes:
 * Server verified correctness comes from accepted autosaves; debouncing means intermediate
 * edits may not have verified history. Capture this evidence limitation in missingEvidence.
 *
 * @todo Export extractFeatures with one input containing questions, answers, events, and
 *       attempt. Work only with the supplied values; do not read the clock, database, or
 *       environment.
 *
 * @todo Sort a copy of valid events by t_ms then id. Restrict times to the stored attempt
 *       interval, bounded by the deadline. Deduplicate event ids before counting and ignore
 *       unknown question ids.
 *
 * @todo Count paste events only when their question is short answer. Pair
 *       focus_lost/focus_gained transitions as a state machine so duplicate blur/visibility
 *       events do not double count one absence.
 *
 * @todo Compute totalAwayMs from paired absence intervals. If a final absence is open, close
 *       it at the fixed attempt cutoff and record that the interval was incomplete.
 *
 * @todo Accumulate active time across each question visit using question_view/question_leave.
 *       Close a visit on the next question view, focus loss, or final cutoff; resume only from
 *       a valid focus gain/view. Exclude away time and flag incomplete timing evidence.
 *
 * @todo Return perQuestionTimes entries with question_id, question_type, prompt_length,
 *       duration_ms or null, and answered. Do not turn missing durations into zero. Compute
 *       perQuestionMs, meanMs, medianMs, and cvOfTimes from valid answered question durations
 *       only.
 *
 * @todo Compute answerFlips as an integer count only from server_verified answer_change events
 *       where an existing incorrect MCQ answer changed to correct shortly after a completed
 *       focus loss interval. Return answerFlipEvents as the related question/time records.
 *       Unverified client changes cannot establish correctness.
 *
 * @todo Return questionCount, answeredCount, validTimingCount, pasteCount, focusLossCount,
 *       totalAwayMs, answerFlips, timingCoverage, missingEvidence, and a low confidence
 *       indication when evidence is insufficient.
 *
 * @todo Use fixed snapshot timestamps, safe empty array behavior, and a zero mean guard for
 *       coefficient of variation. Zero data means unavailable evidence, not an automatic
 *       confirmation of clean behavior or a penalty.
 *
 * @see server/src/scoring/index.js
 *
 * @see server/src/scoring/levels.js for agreed configuration
 *
 * @see server/src/tests/scoring.test.js
 */
