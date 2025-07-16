import { Hono } from "hono"
import { signup, login } from "../controllers/auth";

 const auth = new Hono();

auth.post("/signup", signup);
auth.post("/login", login);

export default auth;
