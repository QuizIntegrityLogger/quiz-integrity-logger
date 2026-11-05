/**
 * @file server/src/middleware/requireRole.js
 * @description
 * Route access checks for student and teacher roles.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: requireRole(role). Allowed values: student or teacher. Call after auth, before the
 * controller.
 *
 * Acceptance criteria:
 * Students get 403 on teacher routes and teachers get 403 on student attempt mutation routes.
 *
 * @todo Export requireRole(role) as a function returning Express middleware.
 *
 * @todo Require auth.js to run first. If req.user is absent return 401; if its role is
 *       different return 403.
 *
 * @todo Call next when the role matches. Keep role strings exactly student and teacher
 *       everywhere.
 *
 * @todo Apply the guard in route modules, then separately check ownership in controllers. A
 *       teacher role does not grant access to another teacher quiz.
 *
 * @todo Use the common error envelope so the HTTP wrapper can display role errors
 *       consistently.
 *
 * @see server/src/middleware/auth.js
 *
 * @see all protected route modules
 */
