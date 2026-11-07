/**
 * @file server/src/app.js
 * @description
 * Configure Express middleware, exact origin CORS, JSON limits, API routing, and /health.
 * Export the app without listening and install the common error handler last.
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import apiRouter from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const JSON_LIMIT = "1mb";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) =>
      callback(null, origin === config.clientOrigin),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  }),
);

if (config.nodeEnv !== "test") {
  app.use(morgan(config.isProduction ? "combined" : "dev"));
}

app.use(express.json({ limit: JSON_LIMIT }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: Math.round(process.uptime()) });
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
