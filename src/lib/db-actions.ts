import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface UpsertUserParams {
  clerkId: string;
  email: string;
  name: string;
  imageUri: string;
  walletAddress?: string; // walletAddress is now optional
}

export async function upsertUser({
  clerkId,
  email,
  name,
  imageUri,
  walletAddress,
}: UpsertUserParams) {
  // Check if user already exists
  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  if (existingUsers.length > 0) {
    // If user exists, update their details (except walletAddress if it's already set)
    if (walletAddress && !existingUsers[0].walletAddress) {
      await db
        .update(users)
        .set({ walletAddress, updatedAt: new Date() })
        .where(eq(users.clerkId, clerkId));
      return {
        message: "User updated with wallet address",
        user: { ...existingUsers[0], walletAddress },
      };
    }
    return { message: "User already exists", user: existingUsers[0] };
  }

  // Insert new user
  const newUser = await db
    .insert(users)
    .values({
      clerkId,
      email,
      name,
      imageUri,
      walletAddress: walletAddress || null, // Set to null if not provided
      role: "user", // Default role
      createAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return { message: "User created successfully", user: newUser[0] };
}
