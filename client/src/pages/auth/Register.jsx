/**
 * @file client/src/pages/auth/Register.jsx
 * @description
 * Demo account registration and initial session creation.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser route: /register. API: POST /api/auth/register with name, email, password, role.
 * Roles are exactly student and teacher.
 *
 * Acceptance criteria:
 * A new account receives a safe session, duplicate email is handled, and role routing matches
 * the server response.
 *
 * @todo Build a labelled form for name, email, password, password confirmation, and the agreed
 *       student/teacher role selector for the class project demo.
 *
 * @todo Validate required fields, matching passwords, and the documented password length
 *       policy. Server validation remains authoritative.
 *
 * @todo Call useAuth.register with name, email, password, and role. Do not send password
 *       confirmation or a chosen database id.
 *
 * @todo Show duplicate email and field errors from the API. Disable repeated requests while
 *       loading.
 *
 * @todo After success, let AuthContext store the token and route the user to their role
 *       dashboard.
 *
 * @todo Explain role labels clearly. If the team later restricts teacher registration, update
 *       this form and auth.controller.js together rather than relying on a hidden client
 *       option.
 *
 * @todo Keep a link back to /login and do not retain password text outside the form or
 *       generate quiz behavior logs.
 *
 * @see client/src/context/AuthContext.jsx
 *
 * @see react-router-dom
 *
 * @see client/src/styles/index.css
 */
