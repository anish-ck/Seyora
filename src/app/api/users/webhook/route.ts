import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { Validators } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  console.log("📌 Clerk Webhook Secret loaded?", !!WEBHOOK_SECRET);
  if (!WEBHOOK_SECRET) {
    return new Response("Error: Clerk signing secret missing", { status: 500 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  const headerList = await headers();
  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");
  if (!svixId || !svixSignature || !svixTimestamp) {
    return new Response("Error: missing svix headers", { status: 400 });
  }
  const body = await req.text();
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-signature": svixSignature,
      "svix-timestamp": svixTimestamp, // Fixed here
    }) as WebhookEvent;
  } catch (error) {
    console.error("❌ Could not verify webhook:", error);
    return new Response("Error verifying webhook", { status: 400 });
  }

  const evtType = evt.type;
  if (evtType === "user.created") {
    console.log("handling user_created event");

    try {
      const { data } = evt;
      console.log("creating custodial wallet...");

      
      console.log("inserting user into DB...");
      await db
        .insert(Validators)
        .values({
          email: data.email_addresses[0].email_address,
          clerkId: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUri: data.image_url,
        })
        .onConflictDoNothing();

      console.log("user inserted into DB successfully");
    } catch (err: any) {
      console.log("error handling user_created:", err);
    } finally {
      console.log("finished handling user_created event");
    }
  }

  if (evtType === "user.updated") {
    console.log("handling user_updated event");

    try {
      const { data } = evt;
      console.log("event data received:", data);

      console.log("updating user in DB...");
      const result = await db
        .update(Validators)
        .set({
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUri: data.image_url,
          updatedAt: new Date(),
        })
        .where(eq(Validators.clerkId, data.id));

      console.log("user update result:", result);
    } catch (err: any) {
      console.log("error handling user_updated:", err);
    } finally {
      console.log("finished handling user_updated event");
    }
  }

  if (evtType === "user.deleted") {
    console.log("handling user_deleted event");

    try {
      const { data } = evt;
      console.log("event data received:", data);

      if (!data.id) {
        console.log("missing user ID for deletion");
        return new Response("Missing user ID for deletion", { status: 400 });
      }

      console.log("deleting user from DB...");
      const result = await db.delete(Validators).where(eq(Validators.clerkId, data.id));
      console.log("user deletion result:", result);
    } catch (err: any) {
      console.log("error handling user_deleted:", err);
    } finally {
      console.log("finished handling user_deleted event");
    }
  }

  return new Response("webhook recieved successfully", { status: 200 });
}
