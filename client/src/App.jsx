/**
 * @file client/src/App.jsx
 * @description
 * Public routes and protected student and teacher routes.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser routes are separate from /api endpoints. Student Submitted gets its confirmation id
 * through a query string or navigation state, but never integrity results.
 *
 * Acceptance criteria:
 * Every listed URL renders the correct supplied page and a wrong role visitor is sent to their
 * own dashboard.
 *
 * @todo Create public routes /login and /register. Redirect authenticated users away from them
 *       to their role home after AuthContext finishes loading.
 *
 * @todo Wrap student routes in ProtectedRoute with role student: /student,
 *       /student/quiz/:id/consent, /student/attempt/:id, and /student/submitted.
 *
 * @todo Wrap teacher routes in ProtectedRoute with role teacher: /teacher, /teacher/quiz/new,
 *       /teacher/quiz/:id/edit, /teacher/quiz/:id/attempts, and /teacher/attempt/:id.
 *
 * @todo Map new/edit to the same QuizBuilder component. Route parameter id means quiz id on
 *       quiz paths and attempt id on attempt paths; keep that meaning explicit in each page.
 *
 * @todo Redirect / by the restored role, or to /login for an anonymous user. Add a small
 *       inline not found view or safe redirect without inventing another page file.
 *
 * @todo Render the shared Navbar where appropriate. Give the active quiz a focused layout and
 *       a deliberate leave/submit flow.
 *
 * @todo Do not depend on client guards to protect data. The server must enforce role and
 *       ownership independently.
 *
 * @see client/src/components/ProtectedRoute.jsx
 *
 * @see client/src/components/Navbar.jsx
 *
 * @see all ten files under client/src/pages
 */
