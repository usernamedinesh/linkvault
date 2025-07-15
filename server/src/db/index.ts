import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    host: process.env.HOST!,
    port: process.env.DB_PORT!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
});
export const db = drizzle(pool, { schema });
