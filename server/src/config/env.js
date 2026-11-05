/**
 * @file server/src/config/env.js
 * @description
 * Validated server configuration shared by all backend modules.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export env.PORT, env.JWT_SECRET, env.CLIENT_ORIGIN, env.DB_PATH, env.NODE_ENV, and
 * env.SEED_DEMO.
 *
 * Acceptance criteria:
 * A missing secret stops startup and every backend module uses the same normalized
 * configuration.
 *
 * @todo Load dotenv before reading environment values. Export one validated env object; other
 *       modules import that object rather than reading process.env.
 *
 * @todo Validate PORT as an integer in the valid port range, use 4000 locally, and validate
 *       JWT_SECRET as a nonempty sufficiently long secret.
 *
 * @todo Validate CLIENT_ORIGIN as a complete http or https origin. Normalize it consistently
 *       without a path or trailing slash; reject a wildcard.
 *
 * @todo Resolve DB_PATH to an absolute path relative to the server directory, so scripts
 *       behave the same regardless of the caller working directory. Default to ./data/app.db.
 *
 * @todo Parse NODE_ENV and optional SEED_DEMO explicitly. The text false must become boolean
 *       false, not truthy merely because it is a string.
 *
 * @todo Do not print secret values in validation errors. Fail startup with variable names and
 *       short instructions when required settings are missing.
 *
 * @see dotenv
 *
 * @see zod or equivalent explicit validation
 *
 * @see Node path utilities
 *
 * @see server/.env.example
 */
