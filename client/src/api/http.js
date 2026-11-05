/**
 * @file client/src/api/http.js
 * @description
 * HTTP requests, bearer authentication, response parsing, and session expiry.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * Exports: request(path, options), setUnauthorizedHandler(callback) or agreed equivalent.
 * Storage key: qil_token. Error fields: status, message, optional details.
 *
 * Acceptance criteria:
 * All API modules share consistent authorization and errors, including 204 responses and an
 * unavailable backend.
 *
 * @todo Read import.meta.env.VITE_API_URL, normalize its trailing slash, and fail with a
 *       useful setup message if it is missing. Do not read server process.env in browser code.
 *
 * @todo Export a request wrapper accepting path plus method, body, signal, keepalive, and an
 *       auth enabled option. Paths are relative to the API base, which already ends in /api.
 *
 * @todo When auth is enabled, read the current qil_token value from localStorage and add
 *       Authorization Bearer. Set Content-Type only for a JSON body.
 *
 * @todo Serialize the body, call fetch, and parse the response safely. A 204 returns no value;
 *       an HTML proxy error or empty body must not crash JSON parsing.
 *
 * @todo Throw an error carrying status, message, and optional safe details for unsuccessful
 *       responses. Treat network failure separately so the UI can retry.
 *
 * @todo Expose setUnauthorizedHandler or an equivalent small callback registration. On 401
 *       from a protected call, notify AuthContext to clear the session without importing React
 *       context here.
 *
 * @todo Allow login/register calls to disable auth handling so an invalid password can show
 *       its form error. A 403 does not automatically mean the session expired.
 *
 * @todo Pass keepalive through for the final small event flush. Do not log request tokens or
 *       answer bodies, and do not place the token in the URL.
 *
 * @see client/.env.example
 *
 * @see client/src/context/AuthContext.jsx
 *
 * @see all four domain API modules
 */
