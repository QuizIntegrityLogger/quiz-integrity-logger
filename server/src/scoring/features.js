/**
 * @file server/src/scoring/features.js
 * @description
 * Extract deterministic counts, active question timing, away intervals, verified answer
 * corrections, and evidence coverage from a fixed attempt snapshot. Deduplicate events and
 * keep missing measurements distinct from zero.
 */
