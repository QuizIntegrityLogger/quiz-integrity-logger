/**
 * @file server/src/db/connection.js
 * @description
 * Shared SQLite connection and database settings.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: db. Local path: server/data/app.db after path resolution. Deployment path:
 * /var/data/app.db.
 *
 * Acceptance criteria:
 * Foreign key checks are enabled, migrations and repositories share this connection, and
 * restarting with the same disk preserves data.
 *
 * @todo Import the resolved DB_PATH from env.js. Create its parent directory recursively
 *       before opening the file.
 *
 * @todo Open one better-sqlite3 Database instance and export it. Do not open a new connection
 *       in every repository or request.
 *
 * @todo Enable WAL journal mode and foreign_keys on this connection. Choose a short busy
 *       timeout so brief write contention can be retried rather than immediately failing.
 *
 * @todo Keep SQL schema creation in migrate.js and application queries in repositories. This
 *       module only owns connection setup and lifecycle.
 *
 * @todo Use synchronous database operations directly; adding await does not make these
 *       operations asynchronous. Keep transactions short and never await inside a SQLite
 *       transaction callback.
 *
 * @todo Place the database and its WAL/SHM files under the same durable mount in deployment.
 *       Use a SQLite aware backup procedure after implementation rather than copying only the
 *       live .db file.
 *
 * @see better-sqlite3
 *
 * @see node:fs
 *
 * @see node:path
 *
 * @see server/src/config/env.js
 */
