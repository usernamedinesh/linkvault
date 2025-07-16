import { Hono } from "hono";
import auth from "./auth";
import link from "./link";

const routes = new Hono();

routes.route("/auth", auth);
routes.route("/link", link);

export default routes;
