
import { Hono } from "hono"
import { create_link, get_link, update_link, delete_link } from "../controllers/link";
import { authMiddleware } from "../utils/authMiddleware";

const link = new Hono();

link.post("/add-link/:userId?", authMiddleware, create_link);
link.get("/get-link/:userId?", authMiddleware, get_link);
link.delete("/delete-link", delete_link);
link.put("/update-link", update_link);

export default link;
