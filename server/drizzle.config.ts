import {Config} from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle/migrations",
    driver: "pg",
    dbCredentials: { connectionString: process.env.DATABASE_URL! },
} satisfies Config;
