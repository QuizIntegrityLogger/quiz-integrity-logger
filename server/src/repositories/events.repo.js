/**
 * @file server/src/repositories/events.repo.js
 * @description
 * Store validated event batches with stable retry ids and ordered reads. Deduplicate retries
 * and preserve correctness metadata derived only from accepted server answer saves.
 */
