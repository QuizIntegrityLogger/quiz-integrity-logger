/**
 * @file client/src/components/EventTimeline.jsx
 * @description
 * Chronological quiz behavior events and evidence selection.
 *
 * Responsibility: Kristine, teacher interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Props: events, selectedTimeMs, and optional onSelect. The timeline displays observed quiz
 * behavior in elapsed time order.
 *
 * Acceptance criteria:
 * Clicking a timed flag reveals the matching observation, and empty/large histories remain
 * readable.
 *
 * @todo Accept events, selectedTimeMs, and optional onSelect. Sort a copy by t_ms and id; do
 *       not mutate the API response.
 *
 * @todo Show elapsed mm:ss, event type, question reference, and safe metadata such as paste
 *       length or a verified answer change.
 *
 * @todo Use a compact vertical timeline with readable labels and icons. Differentiate focus
 *       transitions, question visits, paste/copy, and answer changes.
 *
 * @todo When selectedTimeMs changes after a flag click, highlight and scroll the nearest
 *       relevant event into view. Make selected rows keyboard reachable.
 *
 * @todo Expose incomplete intervals or unverified client metadata as observations with limited
 *       confidence. Do not show nonexistent clipboard contents or claim a destination website.
 *
 * @todo For long histories, group/filter event types or window the list during implementation
 *       without losing the raw time order. Provide an explicit empty evidence state.
 *
 * @see client/src/pages/teacher/AttemptReview.jsx
 *
 * @see client/src/components/FlagList.jsx
 *
 * @see styles/index.css
 */
