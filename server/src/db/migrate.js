/**
 * @file server/src/db/migrate.js
 * @description
 * Initial schema creation and subsequent database migrations.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: migrate(). CLI: npm run migrate from server. index.js calls the same function.
 *
 * Acceptance criteria:
 * Running the initial migration twice preserves rows and yields the same tables and indexes.
 *
 * @todo Import the shared connection and locate schema.sql relative to this module with an URL
 *       conversion appropriate for ES modules, not the current working directory.
 *
 * @todo Read the schema as UTF-8, then execute it on the shared connection. Use a transaction
 *       for the initial schema operations when supported by the statements you write.
 *
 * @todo Export migrate so index.js can call it before listening. Also allow direct CLI
 *       execution for npm run migrate.
 *
 * @todo Use an explicit direct execution check so importing this module does not automatically
 *       run the migration twice.
 *
 * @todo Do not delete a database to apply schema changes. For later versions, add ordered
 *       version checks here, record a schema version, and back up existing data before
 *       upgrade.
 *
 * @todo Run against the persistent disk only at runtime; a Render build cannot prepare the
 *       runtime disk database.
 *
 * @see node:fs
 *
 * @see node:url
 *
 * @see server/src/db/connection.js
 *
 * @see server/src/db/schema.sql
 */
