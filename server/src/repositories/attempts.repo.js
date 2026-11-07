/**
 * @file server/src/repositories/attempts.repo.js
 * @description
 * Persist attempts and versioned answers, enforce deadlines, and prevent stale overwrites.
 * Coordinate accepted answer history and atomic finalization through the shared connection.
 */
