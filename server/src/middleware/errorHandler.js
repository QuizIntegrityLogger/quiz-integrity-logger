/**
 * @file server/src/middleware/errorHandler.js
 * @description
 * Return consistent JSON errors for validation, access, conflicts, and server failures.
 * Preserve appropriate status codes without exposing secrets, SQL, or production stacks.
 *
 * Every error response looks like: { "error": { "code": "...", "message": "...", "details"?: ... } }
 */
import { STATUS_CODES } from "node:http";

const DEFAULT_CODES = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  413: "PAYLOAD_TOO_LARGE",
};

export class HttpError extends Error {
  constructor(status, message, { code, details } = {}) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code ?? DEFAULT_CODES[status] ?? "ERROR";
    this.details = details;
  }
}

export class ValidationError extends HttpError {
  constructor(message = "Some fields are invalid.", details) {
    super(400, message, { code: "VALIDATION_ERROR", details });
    this.name = "ValidationError";
  }
}

export function notFound(req, res) {
  res
    .status(404)
    .json({ error: { code: "NOT_FOUND", message: "Route not found." } });
}

function normalize(err) {
  if (err instanceof HttpError) {
    return {
      status: err.status,
      code: err.code,
      message: err.message,
      details: err.details,
    };
  }

  if (err?.type === "entity.parse.failed") {
    return {
      status: 400,
      code: "INVALID_JSON",
      message: "Request body is not valid JSON.",
    };
  }
  if (err?.type === "entity.too.large") {
    return {
      status: 413,
      code: "PAYLOAD_TOO_LARGE",
      message: "Request body is too large.",
    };
  }

  if (
    typeof err?.code === "string" &&
    err.code.startsWith("SQLITE_CONSTRAINT")
  ) {
    const duplicate = [
      "SQLITE_CONSTRAINT_UNIQUE",
      "SQLITE_CONSTRAINT_PRIMARYKEY",
    ].includes(err.code);
    return duplicate
      ? {
          status: 409,
          code: "CONFLICT",
          message:
            "That record already exists or conflicts with existing data.",
        }
      : {
          status: 400,
          code: "VALIDATION_ERROR",
          message: "The data breaks a database rule.",
        };
  }
  const status = err?.status ?? err?.statusCode;
  if (Number.isInteger(status) && status >= 400 && status < 500) {
    return {
      status,
      code: DEFAULT_CODES[status] ?? "BAD_REQUEST",
      message: STATUS_CODES[status] ?? "Bad request.",
    };
  }
  return {
    status: 500,
    code: "INTERNAL_ERROR",
    message: "Something went wrong on the server.",
  };
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const { status, code, message, details } = normalize(err);

  if (status >= 500) {
    console.error(
      `[error] ${req.method} ${req.originalUrl.split("?")[0]}`,
      err,
    );
  }

  res.status(status).json({
    error: {
      code,
      message: status >= 500 ? "Something went wrong on the server." : message,
      ...(details ? { details } : {}),
    },
  });
}
