/**
 * @file server/src/routes/auth.routes.js
 * @description
 * Define POST /register, POST /login, and the protected GET /me endpoint under /api/auth.
 */
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { login, me, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/me", asyncHandler(me));

export default router;
