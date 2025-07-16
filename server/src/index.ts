import { Hono } from "hono";
import { cors } from "hono/cors";
import { healthRouter } from "./routes/health";
import routes from "./routes";

export const app = new Hono()

.use(cors())

.route("/", healthRouter)
.route("/api", routes)

export default app;
