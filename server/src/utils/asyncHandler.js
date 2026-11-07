/**
 * @file server/src/utils/asyncHandler.js
 * @description
 * Wrap controller execution and forward rejected asynchronous operations to the shared Express
 * error handler.
 */
export function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export default asyncHandler;