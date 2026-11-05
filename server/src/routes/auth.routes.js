/**
 * @file server/src/routes/auth.routes.js
 * @description
 * Public authentication routes and protected session lookup.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Full routes: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me. The first two
 * are public; me requires a bearer token.
 *
 * Acceptance criteria:
 * Register/login work without a token while me rejects an anonymous request.
 *
 * @todo Create the router and register POST /register and POST /login with their auth
 *       controller handlers.
 *
 * @todo Register GET /me with auth middleware before the me handler.
 *
 * @todo Use asyncHandler for asynchronous controller functions consistently.
 *
 * @todo Keep body validation and response construction in the controller. Add route level rate
 *       limiting here later if the public deployment requires it.
 *
 * @see server/src/controllers/auth.controller.js
 *
 * @see server/src/middleware/auth.js
 *
 * @see server/src/utils/asyncHandler.js
 */
