import { db } from "@/db";
import { publicProcedure, CreateTRPCRouter } from "@/trpc/init";
import { pinata } from "@/web3/custodial/pinataUpload";
import { NFTcontract } from "@/web3/ownerWallet";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const manageUserRouter = CreateTRPCRouter({
    getAllUsers: publicProcedure.query(async () => {
        try {
          const Neonusers: any[] = await db.query.Tourists.findMany();
          return Neonusers;
        } catch (error) {
          console.error("Failed to fetch users:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not fetch users",
            cause: error,
          });
        }
      }),
  updateTRipDate: publicProcedure
    .input(
      z.object({
        dataUri: z.string(),
        startTime: z.number(),
        newDate: z.number(),
        walletaddress: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const tokenId = await NFTcontract.getTokenByAddress(
          input.walletaddress
        );

        const tx = await NFTcontract.updateTouristData(
          tokenId,
          input.startTime,
          input.newDate,
          input.dataUri,
          true
        );
      } catch (error: any) {
        console.error(
          "❌ Failed to update tourist data:",
          error.message || error
        );
        throw error; // optional: rethrow for higher-level handling
      }
    }),

    getJsonFromPinata: publicProcedure.input(z.object({cid: z.string()})).mutation(async({input}) => {
        const pinataIPFS = pinata.gateways.public.get(input.cid);
        return pinataIPFS

    })
});
