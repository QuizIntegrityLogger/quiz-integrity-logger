/**
 * @file server/src/scoring/rules/tooShort.js
 * @description
 * Confidence notice for quizzes with too few questions.
 *
 * Responsibility: Jed Manaloto, backend development.
 * Implementation guide.
 *
 * Integration contract:
 * Rule id: too_short. points is always 0. severity is info. Threshold: questionCount < 5.
 *
 * Acceptance criteria:
 * A four question quiz shows the low confidence flag without increasing the integrity score.
 *
 * @todo Read questionCount and compare it with the initial minimum of five questions.
 *
 * @todo If the quiz has fewer than five questions, return triggered true with id too_short,
 *       points zero, and informational severity.
 *
 * @todo Write a reason stating the actual question count and that evidence is too limited for
 *       a strong interpretation.
 *
 * @todo For at least five questions, return triggered false and zero points.
 *
 * @todo Keep timing coverage or missing telemetry confidence separate from this question count
 *       rule. A longer quiz can still have poor evidence.
 *
 * @todo Make the teacher review display this as an information/confidence note, not as
 *       misconduct. The quiz builder should warn about the same sample limit.
 *
 * @see server/src/scoring/features.js
 *
 * @see server/src/scoring/levels.js
 *
 * @see client/src/pages/teacher/QuizBuilder.jsx
 *
 * @see client/src/components/FlagList.jsx
 */
