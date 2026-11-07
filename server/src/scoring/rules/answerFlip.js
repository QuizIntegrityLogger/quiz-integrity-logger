/**
 * @file server/src/scoring/rules/answerFlip.js
 * @description
 * Evaluate server verified incorrect to correct MCQ saves shortly after focus returns. Exclude
 * first correct answers, unverified claims, and changes outside the configured window.
 */
