import { db } from "@/db";
import { publicProcedure, CreateTRPCRouter } from "@/trpc/init";
import { pinata } from "@/web3/custodial/pinataUpload";
import { NFTcontract } from "@/web3/ownerWallet";
import z from "zod";

export const manageUserRouter = CreateTRPCRouter({
  getAllUsers: publicProcedure.query(async () => {
    const Neonusers: any[] = await db.query.Tourists.findMany();
    return Neonusers;
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
