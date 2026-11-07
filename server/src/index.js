/**
 * @file server/src/index.js
 * @description
 * Run migrations and optional demo seeding before starting Express. Handle startup failures
 * and close the listener and database on shutdown.
 */
import { config } from "./config/env.js"; 
import app from "./app.js";
import { migrate } from "./db/migrate.js"; 
import { closeDb } from "./db/connection.js"; 

const SHUTDOWN_TIMEOUT_MS = 10_000;

let server = null;
let shuttingDown = false;

function closeServer() {
  return new Promise((resolve) => {
    if (!server) return resolve();
    server.close(() => resolve());
    server.closeIdleConnections?.();
  });
}

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`${signal} received, shutting down...`);

  const force = setTimeout(() => {
    console.error("Shutdown timed out, forcing exit.");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  force.unref();

  try {
    await closeServer();
    closeDb();
    console.log("Shutdown complete.");
    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
}

async function main() {
  await migrate();

  if (config.seedDemo) {
    const { seed } = await import("./db/seed.js");
    await seed();
    console.log("Demo data is ready.");
  }

  server = app.listen(config.port, () => {
    console.log(`API listening on port ${config.port} (${config.nodeEnv})`);
  });

  server.on("error", (err) => {
    console.error(
      err.code === "EADDRINUSE"
        ? `Port ${config.port} is already in use.`
        : err,
    );
    try {
      closeDb();
    } catch {

    }
    process.exit(1);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

main().catch((err) => {
  console.error("Startup failed:", err);
  try {
    closeDb();
  } catch {

  }
  process.exit(1);
});
