/**
 * @file client/src/components/QuestionCard.jsx
 * @description
 * Controlled MCQ and short answer input with question event callbacks.
 *
 * Responsibility: GF, student interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Controlled response: MCQ option id or short answer string. No answer_key or correctness
 * exists in student props.
 *
 * Acceptance criteria:
 * Both question types save correct response shapes, and mounting/typing creates accurate
 * nonduplicated visit/change events.
 *
 * @todo Accept question, response, onChange, onPaste, log, disabled, and saveStatus props.
 *       Questions use type mcq or short and options with stable id/text pairs.
 *
 * @todo Render the prompt and points. For MCQ, use one labelled radio group whose selected
 *       value is an option id; for short, use a labelled controlled textarea.
 *
 * @todo On actual input changes call onChange with question id and response. The
 *       parent/autosave hook owns answer change logging so this component must not duplicate
 *       it.
 *
 * @todo When the active question mounts, log question_view. When it leaves, log
 *       question_leave; use stable dependencies so typing does not create artificial visits.
 *
 * @todo Pass paste observations from the short answer textarea without blocking the paste. Log
 *       only length and question id, never the clipboard text.
 *
 * @todo Show saving/saved/error state near the response. Respect disabled during finalization
 *       and use readable labels, focus styles, and keyboard controls.
 *
 * @todo Render only the active question as a tracked card. Hidden mounted cards must not all
 *       fire question_view at quiz load.
 *
 * @see client/src/hooks/useAutosave.js
 *
 * @see client/src/hooks/useEventLogger.js
 *
 * @see client/src/pages/student/TakeQuiz.jsx
 */
