
import { Hono } from "hono"
import { create_link, get_link, update_link, delete_link } from "../controllers/link";

const link = new Hono();

link.post("/create-link", create_link);
link.get("/get-link", get_link);
link.delete("/delete-link", delete_link);
link.put("/update-link", update_link);

export default link;
