CREATE TYPE "public"."role" AS ENUM('user', 'validator', 'admin');--> statement-breakpoint
CREATE TABLE "Tourists" (
	"email" text NOT NULL,
	"walletAddress" text,
	"createAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Tourists_email_unique" UNIQUE("email"),
	CONSTRAINT "Tourists_walletAddress_unique" UNIQUE("walletAddress")
);
--> statement-breakpoint
CREATE TABLE "Validators" (
	"email" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"user_role" "role" DEFAULT 'user' NOT NULL,
	"createAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Validators_email_unique" UNIQUE("email"),
	CONSTRAINT "Validators_clerk_id_unique" UNIQUE("clerk_id")
);
