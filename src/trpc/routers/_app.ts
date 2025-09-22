import {CreateTRPCRouter, publicProcedure} from "../init";
import {z} from "zod";

export const appRouter = CreateTRPCRouter({
    hello: publicProcedure.input(z.object({name: z.string().optional()})).query(({input})=> {
        return {greeting: `hello nice to meet you ${input?.name ??"world"}`}
    }),
    orderPizza: publicProcedure.input(z.object({tapping: z.string()})).mutation(({input})=> {
        return {isToping: `pizza is with ${input.tapping ?? "nope"}`}
    })
});


export type AppRouter = typeof appRouter;