/**
 * @file client/src/pages/student/Submitted.jsx
 * @description
 * Student submission confirmation and access to the dashboard.
 *
 * Responsibility: GF, student interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Browser route: /student/submitted?attemptId=... . Confirmation fields: attempt id, status,
 * submitted_at, safe quiz metadata.
 *
 * Acceptance criteria:
 * A direct refresh verifies the same submission and exposes only student safe fields.
 *
 * @todo Read attemptId from the query string and optionally use safe navigation state for the
 *       immediate confirmation view.
 *
 * @todo For a direct refresh, call attempts.api.get to verify the attempt belongs to this
 *       student and is submitted. Show loading and retry states.
 *
 * @todo Display a clear submitted confirmation, quiz title if available, and the server
 *       submitted_at in local display time.
 *
 * @todo If the attempt is still active, return to /student/attempt/:id. If the id is missing
 *       or inaccessible, offer a dashboard link without pretending a submission exists.
 *
 * @todo Show Back to dashboard. Do not call the teacher results API or render the concern
 *       score, flags, answer keys, or a cheating label.
 *
 * @todo Keep this page free of behavior logging, countdown, and autosave hooks.
 *
 * @see client/src/api/attempts.api.js
 *
 * @see react-router-dom
 *
 * @see client/src/styles/index.css
 */
