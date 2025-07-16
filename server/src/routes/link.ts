
import { Hono } from "hono"
import { create_link, get_link, update_link, delete_link } from "../controllers/link";

 const link = new Hono();

auth.post("/create-link", create_link);
auth.get("/get-link", get_link);
auth.delete("/delete-link", delete_link);
auth.put("/update-link", update_link);

export default link;
