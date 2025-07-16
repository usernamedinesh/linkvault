import { Hono } from "hono"
import { signup, login, forgot_password, new_password } from "../controllers/auth";

 const auth = new Hono();

auth.post("/signup", signup);
auth.post("/login", login);
auth.post("/forgot-password", forgot_password);
auth.post("/new-password", new_password);

export default auth;
