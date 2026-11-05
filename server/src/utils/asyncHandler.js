/**
 * @file server/src/utils/asyncHandler.js
 * @description
 * Controller wrapper for forwarding rejected operations to Express.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: asyncHandler(controller). No request specific state, database calls, or response
 * formatting.
 *
 * Acceptance criteria:
 * A rejected controller operation reaches errorHandler once and the request does not hang.
 *
 * @todo Export a wrapper that accepts a controller and returns a request handler.
 *
 * @todo Resolve the controller return value and send any rejected promise to next. Preserve
 *       req, res, and next.
 *
 * @todo Choose this wrapper consistently across route modules. Synchronous errors should still
 *       reach Express; do not swallow errors or send a second response here.
 *
 * @todo Keep validation and business logic in controllers. This helper only manages error
 *       forwarding.
 *
 * @todo If you use an Express version with native promise handling, this wrapper may be
 *       redundant, but keep the agreed route style consistent.
 *
 * @see Express request handlers
 *
 * @see server/src/middleware/errorHandler.js
 */
