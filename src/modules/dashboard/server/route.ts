import { publicProcedure, CreateTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import axios from "axios";

export const tripStateRouter = CreateTRPCRouter({
  getCities: publicProcedure
    .input(z.object({ state_iso2: z.string() }))
    .query(async ({ input }) => {
      try {
        const res = await axios.get(
          `https://api.countrystatecity.in/v1/countries/IN/states/${input.state_iso2}/cities`,
          { headers: { "X-CSCAPI-KEY": process.env.COUNTRYSTATEAPI! } }
        );
        const stateArray: any[] = res.data;
        console.log("i got this for city", res.data)
        return stateArray;
      } catch (err: any) {
        console.error("getCities error:", err.response?.data || err.message);
        throw new Error("Failed to fetch cities");
      }
    }),
});
