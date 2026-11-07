/**
 * @file client/vite.config.js
 * @description
 * Configure the React Vite plugin and local development port. Add an API proxy only if the
 * client uses a relative API base.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
});
