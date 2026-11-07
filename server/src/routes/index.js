/**
 * @file server/src/routes/index.js
 * @description
 * Mount the auth, quizzes, attempts, and results routers under the shared API prefix.
 */

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ name: "Quiz Integrity Logger API", status: "ok" });
});


export default router;
