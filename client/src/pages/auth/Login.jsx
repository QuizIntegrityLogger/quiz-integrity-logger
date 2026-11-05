/**
 * @file client/src/pages/auth/Login.jsx
 * @description
 * Login form and role based navigation after authentication.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser route: /login. Public API: POST /api/auth/login. AuthContext persists the token and
 * safe user.
 *
 * Acceptance criteria:
 * Each role logs in to its dashboard, invalid credentials show a form error, and no quiz
 * events are emitted.
 *
 * @todo Build a labelled email/password form with controlled values, a visible error region,
 *       loading state, and a link to /register.
 *
 * @todo Validate required values before submitting and call useAuth.login with the
 *       credentials. Do not call fetch directly.
 *
 * @todo Disable repeated submit while awaiting the response. Present the same safe invalid
 *       credentials message the server returns without revealing account existence.
 *
 * @todo After success, navigate students to /student and teachers to /teacher. A remembered
 *       return path is allowed only if it is local and appropriate for that role.
 *
 * @todo Keep passwords in temporary form state only. Use appropriate autocomplete fields and
 *       do not start behavior capture on this page.
 *
 * @todo Handle a sleeping/unavailable demo backend with a retry state while preserving entered
 *       email. Clear the password as appropriate after success.
 *
 * @see client/src/context/AuthContext.jsx
 *
 * @see react-router-dom
 *
 * @see client/src/styles/index.css
 */
