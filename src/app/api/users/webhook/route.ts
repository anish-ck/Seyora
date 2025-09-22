import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
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
    console.log("handling user_created");
    const { data } = evt;
    await db
      .insert(users)
      .values({
        email: data.email_addresses[0].email_address,
        clerkId: data.id,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(), 
        imageUri: data.image_url,
      })
      .onConflictDoNothing();
  }

  if (evtType === "user.updated") {
    console.log("handling user updated");
    const { data } = evt;
    await db
      .update(users)
      .set({
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        imageUri: data.image_url,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkId, data.id));
  }

  if (evtType === "user.deleted") {
    console.log("handeling user deleted");
    const { data } = evt;
    if (!data.id)
      return new Response("Missing user ID for deletion", { status: 400 });
    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  return new Response("webhook recieved successfully", { status: 200 });
}
