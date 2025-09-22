import { pgTable, uuid, text, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { Relation, relations } from "drizzle-orm";
import {
  createInsertSchema,
  createUpdateSchema,
  createSelectSchema,
} from "drizzle-zod";

export const UserRole = pgEnum("role", ["user", "validator", "admin"]);

export const users = pgTable("users", {
  email: text("email").unique().notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").unique().notNull(),
  name: text("name").notNull(),
  imageUri: text("image_url").notNull(),
  role: UserRole("role").default("user").notNull(),
  walletAddress: text("wallet_address").unique(), // Made nullable
  createAt: timestamp("createAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const insertUser = createInsertSchema(users);
export const updateUser = createUpdateSchema(users);
export const selectUser = createSelectSchema(users);
