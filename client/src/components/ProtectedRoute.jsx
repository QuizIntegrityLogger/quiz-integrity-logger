/**
 * @file client/src/components/ProtectedRoute.jsx
 * @description
 * Client route access based on restored authentication and role.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * Props: role plus children, or role with nested Outlet routes. Client convenience only;
 * server JWT/ownership checks remain mandatory.
 *
 * Acceptance criteria:
 * A protected refresh does not flash login, and a logged in student cannot render the teacher
 * review page.
 *
 * @todo Read useAuth and the current router location. Wait for loading before making any
 *       redirect.
 *
 * @todo If restoration has a network error, render a compact retry state rather than falsely
 *       treating the user as anonymous.
 *
 * @todo For no authenticated user, navigate to /login and optionally remember the original
 *       local route.
 *
 * @todo For a role mismatch, redirect students to /student and teachers to /teacher.
 *
 * @todo For a valid role, render children or Outlet according to the one route composition
 *       style chosen in App.jsx.
 *
 * @todo Avoid redirect loops by using replacement navigation and waiting for a settled
 *       session. A future return path after login must be a safe local path of the correct
 *       role.
 *
 * @see client/src/context/AuthContext.jsx
 *
 * @see react-router-dom
 *
 * @see client/src/App.jsx
 */
