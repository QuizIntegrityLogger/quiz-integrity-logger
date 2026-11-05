/**
 * @file server/src/index.js
 * @description
 * Server startup sequence and connection shutdown.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Process entry point: npm start. Health endpoint is GET /health, outside /api. Migrations run
 * at runtime so the Render disk is available.
 *
 * Acceptance criteria:
 * A fresh start creates an empty schema before /health responds, and startup failures do not
 * leave a partly running service.
 *
 * @todo Import the validated env object, app, the shared SQLite connection, and the exported
 *       migrate function. Keep the Express middleware definitions in app.js.
 *
 * @todo Run migrate before listening. If configuration, opening the database, or schema setup
 *       fails, log a useful startup error without secrets and exit with a nonzero status.
 *
 * @todo Run the seed function only when env.SEED_DEMO is true. Await any asynchronous password
 *       hashing before accepting requests. Never wipe tables on boot.
 *
 * @todo Listen using env.PORT and a host reachable by Render, normally 0.0.0.0. Store the
 *       returned server so it can be closed.
 *
 * @todo Handle shutdown signals by stopping new requests and closing the database after active
 *       requests drain. Keep all database calls on the one shared connection.
 *
 * @todo Keep this file small. Importing app.js in a future test must not start a listener or
 *       seed data.
 *
 * @see server/src/app.js
 *
 * @see server/src/config/env.js
 *
 * @see server/src/db/connection.js
 *
 * @see server/src/db/migrate.js
 *
 * @see server/src/db/seed.js
 */
