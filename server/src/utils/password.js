/**
 * @file server/src/utils/password.js
 * @description
 * Password hashing and credential comparison.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Exports: asynchronous hash(password) and compare(password, storedHash). Controller
 * validation defines the accepted password policy.
 *
 * Acceptance criteria:
 * The right password matches, a wrong password fails, and stored values are salted hashes.
 *
 * @todo Use bcryptjs and export hash(password) plus compare(password, storedHash). Choose
 *       asynchronous APIs for hashing to avoid unnecessary request blocking.
 *
 * @todo Choose a documented work factor suitable for the deployment, initially around 12, and
 *       use a unique generated salt through the library.
 *
 * @todo Validate password length at registration before hashing; start with at least eight
 *       characters and at most 72 UTF-8 bytes for bcrypt. Never silently truncate a long
 *       password.
 *
 * @todo Return only a hash or a comparison boolean. Never log the raw password or return the
 *       hash to a client.
 *
 * @todo Use the same helper in auth.controller.js and db/seed.js so demo and registered
 *       accounts authenticate identically.
 *
 * @see bcryptjs
 *
 * @see server/src/controllers/auth.controller.js
 *
 * @see server/src/db/seed.js
 */
