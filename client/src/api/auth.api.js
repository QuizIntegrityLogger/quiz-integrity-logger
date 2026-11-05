/**
 * @file client/src/api/auth.api.js
 * @description
 * Registration, login, and session restoration requests.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * register/login return token and user. me returns user. No wrapper path contains a second
 * /api.
 *
 * Acceptance criteria:
 * Both forms and session restoration use one consistent authentication API.
 *
 * @todo Import request from http.js. Export register, login, and me; do not duplicate
 *       fetch/header logic.
 *
 * @todo register sends name, email, password, and role to POST /auth/register with public auth
 *       handling.
 *
 * @todo login sends email and password to POST /auth/login with public auth handling.
 *
 * @todo me calls protected GET /auth/me. Leave storing/clearing the returned token to
 *       AuthContext.
 *
 * @todo Keep returned shapes unchanged so forms and context can share the same safe user
 *       model. Never store a raw password after the request.
 *
 * @see client/src/api/http.js
 *
 * @see client/src/context/AuthContext.jsx
 *
 * @see Login.jsx
 *
 * @see Register.jsx
 */
