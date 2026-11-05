/**
 * @file client/vite.config.js
 * @description
 * React build configuration and optional local API proxy.
 *
 * Responsibility: Shared frontend development.
 * Implementation guide.
 *
 * Integration contract:
 * Local client origin: http://localhost:5173. Build output: dist. Optional proxy affects
 * development only.
 *
 * Acceptance criteria:
 * React renders locally, hot reload works, and the API wrapper uses the intended base without
 * duplicated prefixes.
 *
 * @todo Create a Vite configuration using defineConfig and @vitejs/plugin-react. Keep the
 *       default source entry in index.html and build output in dist.
 *
 * @todo Use local port 5173 consistently with server CLIENT_ORIGIN. If Vite chooses another
 *       port, either make the port strict or deliberately update CORS.
 *
 * @todo The simplest agreed setup uses the absolute VITE_API_URL in .env, so the browser calls
 *       localhost:4000/api directly.
 *
 * @todo If the team prefers a dev proxy, forward /api to localhost:4000 and set the local
 *       client base to /api. Do not apply both approaches in a way that produces /api/api.
 *
 * @todo Keep the production API URL in the Vercel environment settings, not hardcoded in this
 *       file.
 *
 * @todo Do not configure Node only libraries or the SQLite connection in the client bundle.
 *
 * @see vite
 *
 * @see @vitejs/plugin-react
 *
 * @see client/.env.example
 *
 * @see client/src/api/http.js
 */
