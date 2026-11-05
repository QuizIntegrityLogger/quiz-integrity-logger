/**
 * @file server/src/db/seed.js
 * @description
 * Optional demonstration users and a sample quiz.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Export: seed(). CLI: npm run seed. Optional boot behavior: env.SEED_DEMO true. This helps a
 * disposable demo restart; it does not preserve data.
 *
 * Acceptance criteria:
 * The sample can be created twice without duplicates or database resets, and no plaintext
 * password is stored.
 *
 * @todo Export an asynchronous seed function and support direct npm run seed execution without
 *       running automatically on import.
 *
 * @todo Run migrate first when used as a standalone command. Check for your known demo users
 *       by email and skip existing records rather than resetting the database.
 *
 * @todo Use password.js to hash the teacher and student demo passwords before the synchronous
 *       insert transaction. Use fictional names and addresses only.
 *
 * @todo Create one sample quiz owned by the demo teacher with five MCQ questions and two short
 *       answer questions. Include stable option ids, answer keys, order, and points.
 *
 * @todo Choose a relative future due date or leave due_at null so the sample is usable after
 *       the project is downloaded. Never seed a real quiz attempt as if it were a student
 *       response.
 *
 * @todo Put example account details in the implemented README only for the deliberate demo
 *       mode. index.js may call seed only when SEED_DEMO is enabled.
 *
 * @todo Make a second seed run leave existing answers, events, teacher decisions, and quizzes
 *       untouched.
 *
 * @see server/src/db/migrate.js
 *
 * @see server/src/repositories/users.repo.js
 *
 * @see server/src/repositories/quizzes.repo.js
 *
 * @see server/src/utils/password.js
 */
