import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "shared/dist";
import { healthRouter } from "./routes/health";

export const app = new Hono()

.use(cors())

.route("/", healthRouter)

export default app;
