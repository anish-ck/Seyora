import {
  pgTable,
  uuid,
  text,
  pgEnum,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const tripStatusEnum = pgEnum("trip_status", ["ACTIVE", "CLOSE"]);

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
  TripDuration: text("tripDuration").notNull(),
  cid: text("cid").notNull(),
  createAt: timestamp("createAt").defaultNow().notNull(),
  Triplocation: text("Triplocation").notNull(),
  status: tripStatusEnum("status").notNull(),
  tripEnd: integer("tripEnd").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
