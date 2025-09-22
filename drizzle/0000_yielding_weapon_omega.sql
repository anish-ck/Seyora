CREATE TYPE "public"."role" AS ENUM('user', 'validator', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"email" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"wallet_address" text,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address")
);
