/**
 * @file client/src/pages/teacher/QuizBuilder.jsx
 * @description
 * Quiz configuration and dynamic MCQ and short answer question editing.
 *
 * Responsibility: Kristine, teacher interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Create/update body: title, instructions, time_limit_min, due_at or null, questions. Each
 * question: type, prompt, points, sort_order, options for MCQ, answer_key for MCQ.
 *
 * Acceptance criteria:
 * A teacher can create a mixed quiz with correct option ids, see short quiz confidence
 * guidance, and cannot mutate a quiz with started attempts.
 *
 * @todo Use /teacher/quiz/new for create and /teacher/quiz/:id/edit for update. If id exists,
 *       load quizzes.api.get and initialize the form from the teacher safe builder payload.
 *
 * @todo Create fields for title, instructions, positive time_limit_min, and optional due
 *       date/time. Convert a local datetime control to UTC before sending it, and reverse that
 *       conversion for editing.
 *
 * @todo Maintain a question array with stable temporary UI keys, sort_order, type, prompt,
 *       points, and MCQ options. Add/remove questions with clear controls and keep at least
 *       one valid question.
 *
 * @todo MCQ questions require at least two nonempty options with stable ids and an answer_key
 *       matching one option id. Short answer questions use a textarea style prompt and have no
 *       automatic correctness key in this version.
 *
 * @todo Render add/remove/reorder controls carefully so changing an option does not
 *       accidentally change another question key. Keep numeric points and time values numeric
 *       in the payload.
 *
 * @todo Show an informational warning below five questions: integrity evidence will have low
 *       confidence. Do not prevent a legitimate short demo quiz solely for that reason.
 *
 * @todo Validate the complete form before create/update, then call the shared API wrapper.
 *       Show field errors and keep entered values on failure.
 *
 * @todo If any attempt has started, show the form as read only with the lock reason and a link
 *       back to attempts/dashboard; the server rejects stale edits too.
 *
 * @todo After a successful save, navigate to /teacher or its attempts path and show a brief
 *       success message. No database SQL or grading logic belongs in this form.
 *
 * @see client/src/api/quizzes.api.js
 *
 * @see react-router-dom
 *
 * @see styles/index.css
 */
