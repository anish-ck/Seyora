import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as Schema from "./schema";
config({ path: ".env.local" });
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not available");
}
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({client:sql,schema: Schema });
