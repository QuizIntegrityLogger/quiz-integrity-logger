/**
 * @file server/src/middleware/errorHandler.js
 * @description
 * Return consistent JSON errors for validation, access, conflicts, and server failures.
 * Preserve appropriate status codes without exposing secrets, SQL, or production stacks.
 */
