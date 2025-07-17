import { Hono } from "hono"
import { signup, login, forgot_password, new_password, get_profile } from "../controllers/auth";

 const auth = new Hono();

auth.post("/signup", signup);
auth.post("/login", login);
auth.post("/forgot-password", forgot_password);
auth.post("/new-password", new_password);
auth.get("/profile/:userId", get_profile);

export default auth;
