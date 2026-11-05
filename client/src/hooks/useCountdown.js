/**
 * @file client/src/hooks/useCountdown.js
 * @description
 * Deadline display and a single expiry notification to the quiz page.
 *
 * Responsibility: GF, student interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Input timestamps: deadline_at and server_now from Express. Output is display state only.
 * onExpire enters the same idempotent submission flow as the button.
 *
 * Acceptance criteria:
 * Background tab delay cannot extend the deadline and repeated zero ticks do not create
 * repeated submissions.
 *
 * @todo Accept deadline_at, server_now, and onExpire. Parse UTC timestamps and refuse invalid
 *       timing data with a clear loading/error state.
 *
 * @todo Anchor remaining time to the server_now snapshot plus performance.now elapsed on this
 *       page. Do not rely on the student changing their local computer clock.
 *
 * @todo Update the display about once per second by recomputing the difference from the
 *       anchored deadline, not by subtracting one from a counter.
 *
 * @todo Clamp remaining time to zero. Call onExpire once using a ref guard even if a render or
 *       timer tick repeats.
 *
 * @todo Clean up the interval on unmount and rebase deliberately when a fresh server timing
 *       snapshot arrives.
 *
 * @todo Return remainingMs, a formatted minutes/seconds label, and expired. The server
 *       independently rejects late answers and decides finalization.
 *
 * @todo If the browser suspends the tab or the network fails, the display may lag. On resume,
 *       recompute and let TakeQuiz retry server submission rather than pretending it succeeded
 *       offline.
 *
 * @see client/src/pages/student/TakeQuiz.jsx
 *
 * @see start/get attempt API fields
 */
