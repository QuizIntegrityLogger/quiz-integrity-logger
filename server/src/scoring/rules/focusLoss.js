/**
 * @file server/src/scoring/rules/focusLoss.js
 * @description
 * Scoring rule for focus loss counts and time away.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Rule id: focus_loss. Default thresholds: count >= 3 OR totalAwayMs >= 30000. Points are
 * bounded 0 to 20.
 *
 * Acceptance criteria:
 * Duplicate blur/visibility signals count once, a single brief loss adds zero, and a long
 * single absence adds at most the documented minimum.
 *
 * @todo Read focusLossCount and totalAwayMs from features. Do not count raw blur/visibility
 *       events yourself.
 *
 * @todo Use initial trigger thresholds of at least three focus loss intervals or at least
 *       30000 ms total away.
 *
 * @todo When triggered, add 5 points for each interval beyond the first, with a minimum
 *       contribution of 5 for the long away trigger and a maximum of 20.
 *
 * @todo Include the interval count, total away seconds, thresholds, and any incomplete
 *       interval caveat in the reason.
 *
 * @todo Return zero points if neither threshold is met. Keep a stable id focus_loss and the
 *       shared rule result shape.
 *
 * @todo Do not claim to know another tab destination. Operating system dialogs, accessibility
 *       tools, or browser behavior can produce the same observation.
 *
 * @see server/src/scoring/features.js
 *
 * @see server/src/scoring/levels.js
 */
