import dotenv from "dotenv";
import { Config } from "drizzle-kit";
dotenv.config({ path: ".env.local" });
export default {
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
