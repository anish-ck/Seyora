import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { db } from "@/db/index";
import { Validators } from "@/db/schema";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { rateLimit } from "@/lib/ratelimit";
export const createTRPCcontext = cache(async ({ req, res }: any) => {
  const { userId } = await getAuth(req, {
    secretKey: process.env.CLERK_SECRET_KEY!,
  });
  console.log("the userId is alwayd", userId);
  return { clerkUserId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCcontext>>;
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});
export const CreateTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const baseProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(async (opt) => {
  const { ctx } = opt;
  console.log("[protectedProducer] Context:", !!ctx);
  if (!ctx.clerkUserId) {
    console.log("userIs Not authorized");
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "no userId is avaialable",
    });
  }

  console.log(
    `[protectedProducer] Looking up user in DB with clerkId=${!!ctx.clerkUserId}`
  );

  const [user] = await db
    .select()
    .from(Validators)
    .where(eq(Validators.clerkId, ctx.clerkUserId))
    .limit(1);
  console.log("[protectedProducer] DB user result:", !!user);

  if (!user) {
    console.warn(
      `[protectedProducer] No matching user in DB for clerkId=${ctx.clerkUserId} → UNAUTHORIZED`
    );
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "no user found in database",
    });
  }

  const { success } = await rateLimit.limit(user.id);
  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }

  console.log("[protectedProducer] User authenticated:", !!user);
  return opt.next({
    ctx: {
      ...ctx,
    },
  });
});
