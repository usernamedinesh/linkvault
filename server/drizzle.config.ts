import {Config} from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

POSTGRES_DB
export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle/migrations",
    driver: "pg",
    dbCredentials: {
        host: process.env.HOST!,
        port: process.env.DB_PORT!,
        user: process.env.POSTGRES_USER!,
        password: process.env.POSTGRES_PASSWORD!,
        database: process.env.POSTGRES_DB!,
    },
} satisfies Config;
