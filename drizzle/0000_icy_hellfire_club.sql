CREATE TYPE "public"."trip_status" AS ENUM('ACTIVE', 'CLOSE');--> statement-breakpoint
CREATE TABLE "Tourists" (
	"email" text NOT NULL,
	"tripDuration" text NOT NULL,
	"cid" text NOT NULL,
	"createAt" timestamp DEFAULT now() NOT NULL,
	"Triplocation" text NOT NULL,
	"status" "trip_status" NOT NULL,
	"tripEnd" integer NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Tourists_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Validators" (
	"email" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"createAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Validators_email_unique" UNIQUE("email"),
	CONSTRAINT "Validators_clerk_id_unique" UNIQUE("clerk_id")
);
