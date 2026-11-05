/**
 * @file client/src/pages/teacher/AttemptReview.jsx
 * @description
 * Attempt evidence, rule explanations, and the teacher review decision.
 *
 * Responsibility: Kristine, teacher interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser route: /teacher/attempt/:id. Local state includes selectedTimeMs and decision save
 * status. Review payload includes quiz, attempt, student, questions, answers, result, events.
 *
 * Acceptance criteria:
 * The teacher can trace each explanation to observed events and save a human decision with a
 * clear audit timestamp.
 *
 * @todo Read attempt id from the URL and load results.api.getAttempt. Render loading,
 *       inaccessible or missing, error/retry, and in progress states.
 *
 * @todo Keep a visible note that the rules based concern indicator is not proof and needs
 *       human interpretation. Display confidence and its reasons beside the concern score.
 *
 * @todo Show student name, quiz title, start/submission timestamps, ScoreBadge, and any
 *       academic MCQ points in a separately labelled area.
 *
 * @todo Render FlagList with the server reasons and an onJump handler that updates
 *       selectedTimeMs. Informational low confidence flags remain zero point notices.
 *
 * @todo Show a per question active time chart using features.perQuestionTimes. Mark missing
 *       measurements as unavailable; do not draw them as zero. Include a readable table or
 *       labels for accessibility.
 *
 * @todo Render EventTimeline with selectedTimeMs so clicking a flag highlights the related
 *       event.
 *
 * @todo Render the student final answers with question prompts. For MCQs the owning teacher
 *       can see the selected option and answer key; short answers are ungraded in this
 *       version.
 *
 * @todo Optionally show raw feature numbers and SCORING_VERSION in a collapsed transparency
 *       section. Render all supplied strings as ordinary escaped text.
 *
 * @todo Provide Cleared and Needs follow up actions. On click, call saveDecision, disable
 *       duplicate requests, and update reviewer/time on success without changing the computed
 *       score.
 *
 * @todo If saving the decision fails, keep the prior displayed decision and offer retry. Do
 *       not automatically fail a student or turn a flag into a grade penalty.
 *
 * @see client/src/api/results.api.js
 *
 * @see ScoreBadge.jsx
 *
 * @see FlagList.jsx
 *
 * @see EventTimeline.jsx
 *
 * @see optional recharts
 *
 * @see styles/index.css
 */
