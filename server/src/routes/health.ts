import { Hono } from "hono"
import type { ApiResponse }  from "shared";

export const healthRouter = new Hono();

healthRouter.get("/", (c) => c.text("hello Hono!"));

healthRouter.get("/health", (c)  => {
    const res: ApiResponse = { message: "hello working ", success: true, status: 200 }
    return c.json(res);
})

