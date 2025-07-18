import { Hono } from "hono";
import { cors } from "hono/cors";
import { healthRouter } from "./routes/health";
import routes from "./routes";
import { AppError } from "./utils/CustomError";

export const app = new Hono()
app.use(cors())

// Middleware: parse JSON safely
app.use('*', async (c, next) => {
  const type = c.req.header('content-type') || '';
  const method = c.req.method;

  if (['POST', 'PUT', 'PATCH'].includes(method) && type.includes('application/json')) {
    try {
      // Try parsing only if content-length is present and > 0
      const contentLength = Number(c.req.header('content-length') || '0');
      if (contentLength > 0) {
        const body = await c.req.json();
        c.set('body', body);
      }
    } catch (err) {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }
  }
  await next();
});

// Global error handler
app.onError((err, c) => {
  console.error('Global Error:', err);

  if (err instanceof AppError) {
    return c.json({
      success: false,
      message: err.message,
      status: err.status,
      details: err.details
    }, err.status);
  }

  return c.json({ success: false, message: 'Internal server error' }, 500);
});

// Route not found handler
app.notFound((c) => {
  return c.json({
    success: false,
    message: 'Route not found'
  }, 404);
});



app.route("/", healthRouter)
app.route("/api", routes)

export type AppType = typeof app;
export default app;
