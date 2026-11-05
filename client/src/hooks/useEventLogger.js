/**
 * @file client/src/hooks/useEventLogger.js
 * @description
 * Capture consented quiz events with stable ids and attempt relative timestamps. Batch
 * delivery, retry failed sends, deduplicate focus transitions, and clean up listeners without
 * recording clipboard text or raw keys.
 */
