import { pgTable, uuid, text, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { Relation, relations } from "drizzle-orm";
import {
  createInsertSchema,
  createUpdateSchema,
  createSelectSchema,
} from "drizzle-zod";


export const Validators = pgTable("Validators", {
  email: text("email").unique().notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").unique().notNull(),
  name: text("name").notNull(),
  imageUri: text("image_url").notNull(),
  createAt: timestamp("createAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const Tourists = pgTable("Tourists", {
  email: text("email").unique().notNull(),
  walletAddress: text("walletAddress").unique(),
  createAt: timestamp("createAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export const insertUser = createInsertSchema(Validators);
export const updateUser = createUpdateSchema(Validators);
export const selectUser = createSelectSchema(Validators);
