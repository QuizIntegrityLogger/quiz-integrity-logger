/**
 * @file client/src/components/ScoreBadge.jsx
 * @description
 * Teacher integrity concern score and level display.
 *
 * Responsibility: Kristine, teacher interface development.
 * Implementation guide.
 *
 * Integration contract:
 * Props: score, level, optional confidence. score maps from API integrity_score, not
 * mcq_points_earned.
 *
 * Acceptance criteria:
 * Zero displays as 0/100, missing scores display as pending, and the badge meaning is clear
 * without color.
 *
 * @todo Accept score and level from the server. Use explicit null checks so the numeric value
 *       zero is rendered correctly.
 *
 * @todo Show a labelled pill with Low, Medium, or High concern and the score out of 100.
 *       Higher values mean more rule triggered concern.
 *
 * @todo Use green/amber/red as secondary cues while retaining readable text and adequate
 *       contrast. Never rely on color alone.
 *
 * @todo When no result exists for an active attempt, show In progress or Not computed instead
 *       of zero.
 *
 * @todo Keep confidence as a separate nearby label from the parent, or accept an optional
 *       confidence prop without changing the concern band.
 *
 * @todo Do not calculate levels locally from different thresholds or use a percent sign that
 *       implies a cheating probability. Academic points belong in a separately labelled
 *       element.
 *
 * @see client/src/pages/teacher/AttemptsList.jsx
 *
 * @see client/src/pages/teacher/AttemptReview.jsx
 *
 * @see server/src/scoring/levels.js
 */
