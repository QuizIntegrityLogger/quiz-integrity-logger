/**
 * @file client/src/components/FlagList.jsx
 * @description
 * Rule explanations with optional links to timeline evidence.
 *
 * Responsibility: Kristine, teacher interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Props: flags array of id, severity, points, reason, optional related_t_ms/question_ids;
 * onJump(timeMs) is optional.
 *
 * Acceptance criteria:
 * The teacher can see why each rule triggered and jump to related evidence while confidence
 * notices remain distinct.
 *
 * @todo Accept flags and an optional onJump callback. Render the server triggered rule
 *       id/name, severity, points, and plain English reason.
 *
 * @todo Keep the observed numbers and thresholds visible. Do not replace the explanation with
 *       an unsupported accusation or generic suspicious label.
 *
 * @todo Display informational zero point flags such as too_short using a neutral style and a
 *       confidence label.
 *
 * @todo If a flag includes related_t_ms, offer a View event button that calls onJump with that
 *       time; related question ids may also be displayed.
 *
 * @todo For no flags, show a neutral No rules triggered message with the review page reminder
 *       that this does not prove misconduct was absent.
 *
 * @todo Render all reason text as escaped React content. Use stable flag ids as keys and
 *       accessible severity text rather than color only dots.
 *
 * @see client/src/pages/teacher/AttemptReview.jsx
 *
 * @see client/src/components/EventTimeline.jsx
 */
