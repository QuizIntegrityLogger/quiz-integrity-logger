/**
 * @file server/src/scoring/levels.js
 * @description
 * Integrity concern bands and versioned rule configuration.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Exports: getLevel, SCORING_CONFIG, SCORING_VERSION. A higher integrity_score means more rule
 * triggered concern; it never means better academic performance.
 *
 * Acceptance criteria:
 * 29/30 and 59/60 boundary cases map correctly, and every rule uses the same documented
 * configuration.
 *
 * @todo Export getLevel(score): 0 through 29 is Low, 30 through 59 is Medium, and 60 through
 *       100 is High. Validate/clamp the score in the orchestrator before mapping.
 *
 * @todo Export a named scoring configuration and a version label. Put all numeric
 *       weights/thresholds here so rules, feature extraction, tests, and teacher explanations
 *       use one agreement.
 *
 * @todo Initial demo configuration: short answer paste adds 10 per occurrence capped at 30;
 *       focus loss points are capped at 20; too fast answer points are capped at 30; even
 *       rhythm contributes 10; answer flips add 10 each capped at 20.
 *
 * @todo Use the exact timing/count thresholds described in the individual rule guides. Keep
 *       minimum sample counts and missing evidence confidence rules visible here as well.
 *
 * @todo Treat these as starting heuristics for demonstration, not validated cheating
 *       probabilities. Calibrate against consented sample sessions and document any changed
 *       configuration version.
 *
 * @todo Keep confidence separate from Low/Medium/High: a score can be numerically Low while
 *       its evidence confidence is low too. Store the configuration version in features_json.
 *
 * @see server/src/scoring/index.js
 *
 * @see server/src/scoring/features.js
 *
 * @see server/src/scoring/rules/*.js
 *
 * @see client/src/components/ScoreBadge.jsx
 */
