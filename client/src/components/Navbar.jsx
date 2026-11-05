/**
 * @file client/src/components/Navbar.jsx
 * @description
 * Role appropriate navigation and logout controls.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * Student navigation links to /student. Teacher navigation links to /teacher and optionally
 * /teacher/quiz/new. AuthProvider clears the session on logout.
 *
 * Acceptance criteria:
 * Navigation matches the current role and leaving an active quiz follows the agreed
 * save/confirmation flow.
 *
 * @todo Read the current safe user and logout action from useAuth.
 *
 * @todo Show the app name and the appropriate /student or /teacher dashboard link. A teacher
 *       may also get a Create quiz link.
 *
 * @todo Display the user name and role as ordinary React text, with an accessible logout
 *       button.
 *
 * @todo For an active quiz, coordinate logout/dashboard navigation with TakeQuiz so pending
 *       work is handled and the student sees a leave confirmation where appropriate.
 *
 * @todo Do not assume beforeunload intercepts React Router navigation. Pass a deliberate
 *       navigation guard/callback from the quiz layout or use a router supported blocking
 *       design during implementation.
 *
 * @todo Keep the layout compact on mobile and keyboard reachable. Do not display integrity
 *       scores or private teacher links to students.
 *
 * @see client/src/context/AuthContext.jsx
 *
 * @see client/src/App.jsx
 *
 * @see client/src/pages/student/TakeQuiz.jsx
 *
 * @see styles/index.css
 */
