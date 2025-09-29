"server-only"
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCallerFactory, createTRPCcontext } from "./init";
import { makeQueryClient } from "./queryClient";
import { appRouter } from "./routers/_app";
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const caller = createCallerFactory(appRouter)(async () => ({
  clerkUserId: null,
}));
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
);
