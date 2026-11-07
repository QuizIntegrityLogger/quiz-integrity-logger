/**
 * @file server/src/utils/jwt.js
 * @description
 * Sign and verify expiring JWTs using the validated server secret.
 */
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { HttpError } from "../middleware/errorHandler.js";

const ALGORITHM = "HS256";
const EXPIRES_IN = "8h";

export function signToken(user) {
  return jwt.sign({ role: user.role }, config.jwtSecret, {
    algorithm: ALGORITHM,
    subject: String(user.id),
    expiresIn: EXPIRES_IN,
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret, { algorithms: [ALGORITHM] });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new HttpError(
        401,
        "Your session has expired. Please log in again.",
        { code: "TOKEN_EXPIRED" },
      );
    }
    throw new HttpError(401, "Invalid token.", { code: "INVALID_TOKEN" });
  }
}
