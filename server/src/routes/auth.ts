import { Hono } from "hono"
import { signup, login, forgot_password, new_password, get_profile } from "../controllers/auth";
import { authMiddleware } from "../utils/authMiddleware";

 const auth = new Hono();

auth.post("/signup", signup);
auth.post("/login", login);
auth.post("/forgot-password", forgot_password);
auth.post("/new-password", new_password);
auth.get("/profile/:userId?", authMiddleware, get_profile);

export default auth;
