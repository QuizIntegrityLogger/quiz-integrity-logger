/**
 * @file client/src/pages/teacher/TeacherDashboard.jsx
 * @description
 * Teacher quiz list and quiz management navigation.
 *
 * Responsibility: Kristine, teacher interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser route: /teacher. Server list contains only quizzes owned by this teacher, plus
 * question/attempt counts.
 *
 * Acceptance criteria:
 * A teacher can create a quiz, open its builder or attempts, and sees why an attempted quiz is
 * locked.
 *
 * @todo Load quizzes.api.list, which the server scopes to the authenticated teacher. Provide
 *       loading, retry, and no quizzes states.
 *
 * @todo Show each quiz title, time limit, due date, question count, attempt count, and any
 *       status indicating whether attempts have started.
 *
 * @todo Create navigates to /teacher/quiz/new; Edit to /teacher/quiz/:id/edit; View attempts
 *       to /teacher/quiz/:id/attempts.
 *
 * @todo Disable or explain Edit/Delete when attempts exist. The server must still enforce the
 *       lock if the dashboard state is stale.
 *
 * @todo For an empty quiz allowed to be deleted, ask for deliberate confirmation, call
 *       quizzes.api.remove, then update or refetch the list. Handle a server 409 without
 *       removing the row locally.
 *
 * @todo Use consistent card/table spacing, accessible action names, and responsive layout.
 *       Keep aggregate quiz counts separate from per attempt integrity concern.
 *
 * @see client/src/api/quizzes.api.js
 *
 * @see react-router-dom
 *
 * @see styles/index.css
 */
