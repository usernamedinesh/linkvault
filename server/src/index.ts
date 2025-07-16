import { Hono } from "hono";
import { cors } from "hono/cors";
import { healthRouter } from "./routes/health";
import routes from "./routes";
import { AppError } from "./utils/CustomError";

export const app = new Hono()


app.use('*', async (c, next) => {
  if (c.req.header('content-type')?.includes('application/json')) {
    try {
      const body = await c.req.json();
      c.set('body', body);
    } catch (err) {
      return c.json({ error: 'Invalid JSON' }, 400);
    }
  }
  await next();
});

app.onError((err, c) => {
    console.error("Global Error: ", err);
    if (err instanceof AppError) {
        return c.json({
            success: false,
            message: err.message,
            status: err.status,
            details: err.details,
        }, err.status);
    }
    return c.json({ success: false, message: "Internal server error"}, 500);
});

app.use(cors())


app.route("/", healthRouter)
app.route("/api", routes)

export default app;
