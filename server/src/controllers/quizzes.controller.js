/**
 * @file server/src/controllers/quizzes.controller.js
 * @description
 * Quiz discovery and management with teacher ownership enforcement.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * GET /api/quizzes returns quizzes. GET /:id, POST /, and PUT /:id return quiz. DELETE /:id
 * returns 204; POST / returns 201. Every student quiz response excludes answer_key.
 *
 * Acceptance criteria:
 * Teacher A cannot read/edit Teacher B quizzes, and editing cannot invalidate an existing
 * attempt.
 *
 * @todo Implement list, getOne, create, update, and remove. Validate integer route ids and
 *       every quiz/question field using Zod.
 *
 * @todo List own quizzes with counts for teachers. List available quizzes with safe attempt
 *       status for students; past attempt history comes from GET /api/attempts.
 *
 * @todo Add GET /api/quizzes/:id for both roles: teachers receive builder data only for their
 *       own quiz; students receive consent metadata such as instructions, time limit, and
 *       question count. Supply student prompts/options only through a started owned attempt,
 *       never answer keys.
 *
 * @todo For create/update, validate title, positive time limit, UTC due date, question count,
 *       nonempty prompts, allowed types, positive points, and unique stable option ids. Every
 *       MCQ key must match one option.
 *
 * @todo Assign teacher_id from req.user, not the request body. A student cannot create a quiz
 *       through this controller.
 *
 * @todo Use repository transactions to save quiz plus questions. Reject edits or deletion with
 *       409 after an attempt has started so historical scoring remains stable.
 *
 * @todo Return 404 for inaccessible quiz ids without revealing another teacher private
 *       content. Keep list counts and response names aligned with the client API wrapper.
 *
 * @see zod
 *
 * @see server/src/repositories/quizzes.repo.js
 *
 * @see server/src/repositories/attempts.repo.js
 */
