import { MiddlewareHandler } from "hono";
import { verify_token }  from "./token";

export const authMiddleware: MiddlewareHandler = async(c, next) => {
    let userId = c.req.param('userId'); // either from params or token

    if (!userId) {
        //then grab userId from the token  
        const authHeader = c.req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return c.json({message: "Missing or malform token"}, 401);
        }

        const token = authHeader.split(" ")[1];
        const decoded = verify_token(token);

        if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
            return c.json({message: "Invalid or expired token or userId not found in token" }, 401);
        }

        userId = decoded.userId;
    }

    //Attach user to context
    c.set("userId", userId);

    await next();
};
