import { MiddlewareHandler } from "hono";
import { verify_token }  from "./token";

export const authMiddleware: MiddlewareHandler = async(c, next) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({message: "Missing or malform token"}, 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verify_token(token);

    if (!decoded) {
        return c.json({message: "Invalid or expired token" }, 401);
    }

    //Attach user to context
    c.set("user", decoded);

    await next();
};
