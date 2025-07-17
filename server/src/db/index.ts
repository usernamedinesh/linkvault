// database connection

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!,
});

// Verify connection and run migrations
async function initDb() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ PostgreSQL connected successfully");

    const db = drizzle(pool, { schema });

    // Run migrations (production-safe, only applies existing ones)
    await migrate(db, { migrationsFolder: "drizzle/migrations" });
    console.log("✅ Migrations applied");

    return db;
  } catch (err) {
    console.error("❌ Database init failed:", err);
    process.exit(1);
  }
}

export const dbPromise = initDb();
export default dbPromise;
// have to use like this 
//import { dbPromise } from "./index";
