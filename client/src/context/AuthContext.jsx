/**
 * @file client/src/context/AuthContext.jsx
 * @description
 * Authenticated user state, token storage, and session restoration.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * Exports: AuthProvider and useAuth. Context: user, token, loading, restoreError,
 * retryRestore, login, register, logout. Shared storage key: qil_token.
 *
 * Acceptance criteria:
 * A refresh restores the correct role, logout clears the session, and a temporary API outage
 * offers retry without misrouting the user.
 *
 * @todo Create AuthProvider and useAuth. Hold user, token, loading, and a session restore
 *       error/retry state.
 *
 * @todo Read the qil_token storage key at startup. If a token exists, call auth.api.me before
 *       marking the session ready; do not assume a decoded token is the current verified user.
 *
 * @todo Provide login and register actions that call the API and persist token plus safe user
 *       state. Do not persist passwords.
 *
 * @todo Provide logout to clear token/user/storage and route to login. Register the HTTP
 *       unauthorized callback on mount and remove it on cleanup to avoid circular imports.
 *
 * @todo A protected 401 expires the session. A network outage during restoration should offer
 *       retry and keep the token instead of pretending the password was invalid.
 *
 * @todo Use the role returned by the server for route decisions. Support storage changes from
 *       another tab if desired, without capturing behavior events on login pages.
 *
 * @todo While loading, let ProtectedRoute show a waiting state. Render user supplied content
 *       as ordinary React text because the bearer token is stored in browser accessible
 *       storage.
 *
 * @see client/src/api/auth.api.js
 *
 * @see client/src/api/http.js
 *
 * @see client/src/components/ProtectedRoute.jsx
 *
 * @see BrowserRouter
 */
