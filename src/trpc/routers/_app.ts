import { tripStateRouter } from "@/modules/dashboard/server/route";
import {CreateTRPCRouter, publicProcedure} from "../init";
import {z} from "zod";
import { registerationRouter } from "@/modules/register/server/route";
import { manageUserRouter } from "@/modules/management/server/router";

export const appRouter = CreateTRPCRouter({
    tripRegister: tripStateRouter,
    registerationRouter: registerationRouter,
    manageusers: manageUserRouter
});


export type AppRouter = typeof appRouter;