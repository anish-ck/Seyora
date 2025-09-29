import { tripStateRouter } from "@/modules/dashboard/server/route";
import {CreateTRPCRouter, publicProcedure} from "../init";
import {z} from "zod";
import { registerationRouter } from "@/modules/register/server/route";

export const appRouter = CreateTRPCRouter({
    tripRegister: tripStateRouter,
    registerationRouter: registerationRouter
});


export type AppRouter = typeof appRouter;