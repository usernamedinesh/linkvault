import { Hono } from "hono";
import { cors } from "hono/cors";
import { healthRouter } from "./routes/health";
import routes from "./routes";

export const app = new Hono()


app.use('*', async (c, next) => {
  if (c.req.header('content-type')?.includes('application/json')) {
    const body = await c.req.json();
    c.set('body', body);
  }
  await next();
});
app.use(cors())


app.route("/", healthRouter)
app.route("/api", routes)

export default app;
