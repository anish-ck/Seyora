import { CreateTRPCRouter, publicProcedure } from "@/trpc/init";
import { NFTcontract } from "@/web3/ownerWallet";
import { number, z } from "zod";
import { pinata } from "@/web3/custodial/pinataUpload";
import { sepolia } from "thirdweb/chains";
import { client, wallet } from "@/web3/custodial/walletCreation";
import { TRPCError } from "@trpc/server";
import { db } from "@/db/index";
import axios from "axios";
import { eq } from "drizzle-orm";
import { Tourists } from "@/db/schema";

const sandBoxHost = "https://api.sandbox.co.in";
console.log("apikey is", !!process.env.DIGILOKER_API_KEY);
console.log("SECret key is", !!process.env.DIGILOKER_SECRET_KEY);
// Helper function for Sandbox authentication
const getSandboxAccessToken = async () => {
  try {
    const sessionResponse = await axios.post(
      `${sandBoxHost}/authenticate`,
      {}, // empty body
      {
        headers: {
          "x-api-key": process.env.DIGILOKER_API_KEY!.toString(),
          "x-api-secret": process.env.DIGILOKER_SECRET_KEY!.toString(),
          "x-api-version": "1.0.0",
          accept: "application/json",
        },
      }
    );
    console.log(
      "asession token response recieved here it is",
      sessionResponse.data
    );
    return sessionResponse.data.data.access_token;
  } catch (error: any) {
    console.error("Sandbox authentication failed:", error.message);
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Failed to authenticate with Sandbox API",
      cause: error,
    });
  }
};

export const registerationRouter = CreateTRPCRouter({
  checkEmailInDatabase: publicProcedure
    .input(z.object({ email: z.email() }))
    .mutation(async ({ input }) => {
      try {
        const existing = await db.query.Tourists.findFirst({
          where: eq(Tourists.email, input.email),
        });
        if (!existing) {
          return false;
        }
        return true;
      } catch (error) {
        console.error("DB check failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database lookup failed",
        });
      }
    }),

  verifyAdhaaarCard: publicProcedure
    .input(z.object({ adhaarNumber: z.number() }))
    .mutation(async ({ input }) => {
      const data = {
        "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.request",
        aadhaar_number: input.adhaarNumber.toString(),
        consent: "Y",
        reason: "we are making a web3 based tourist app",
      };

      // Step 1: Authenticate and get access token
      const accessToken = await getSandboxAccessToken();
      console.log("asession token response recieved here it is", accessToken);
      try {
        const result = await axios.post(
          `${sandBoxHost}/kyc/aadhaar/okyc/otp`,
          data,
          {
            headers: {
              "content-type": "application/json",
              authorization: accessToken,
              "x-api-key": process.env.DIGILOKER_API_KEY,
              "x-api-version": "1.0.0",
            },
          }
        );
        // console.log("if i got refernce ID", result.data.reference_id);
        const dataObject = result.data.data;
        return {
          refernceId: dataObject.reference_id,
          message: dataObject.message,
        };
      } catch (error: any) {
        console.error("Aadhaar OTP request failed:", error.message);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            error.response?.data?.message || "Failed to request Aadhaar OTP",
          cause: error,
        });
      }
    }),

  // sendAdhaarOtpForVerification: publicProcedure
  //   .input(z.object({ OTP: z.number(), refernceId: z.number() }))
  //   .mutation(async ({ input }) => {
  //     const body = {
  //       "@entity": "in.co.sandbox.kyc.aadhaar.okyc.request",
  //       reference_id: input.refernceId,
  //       otp: input.OTP,
  //     };
  //     const accessToken = await getSandboxAccessToken();
  //     // console.log("asession token response recieved here it is", accessToken);

  //     try {
  //       const optResponse = await axios.post(
  //         `${sandBoxHost}/kyc/aadhaar/okyc/otp/verify`,
  //         body,
  //         {
  //           headers: {
  //             "Proxy-Authorization": accessToken,
  //             "x-api-key": process.env.DIGILOKER_API_KEY!,
  //             "x-api-version": "1.0.0",
  //           },
  //         }
  //       );
  //       const otpResponseData = optResponse.data.data;
  //       return {
  //         status: otpResponseData.status,
  //         message: otpResponseData.message,
  //       };
  //     } catch (error: any) {
  //       console.error("Aadhaar OTP verification failed:", error.message);
  //       throw new TRPCError({
  //         code: "BAD_REQUEST",
  //         message:
  //           error.response?.data?.message || "Failed to verify Aadhaar OTP",
  //         cause: error,
  //       });
  //     }
  //   }),

  veriPanCard: publicProcedure
    .input(
      z.object({
        panNo: z.string().toUpperCase(),
        dob: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const accessToken = await getSandboxAccessToken();
      const body = {
        "@entity": "in.co.sandbox.kyc.pan_verification.request",
        pan: input.panNo,
        name_as_per_pan: input.name,
        date_of_birth: input.dob,
        consent: "y",
        reason:
          "i am making an tourist app based of web3 i need this for KYC verification",
      };
      try {
        const data = await axios.post(`${sandBoxHost}/kyc/pan/verify`, body, {
          headers: {
            authorization: accessToken,
            "x-api-key": process.env.DIGILOKER_API_KEY!,
            "x-accept-cache": true,
          },
        });
        return data.data.data;
      } catch (error: any) {
        console.error("PAN card verification failed:", error.message);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.response?.data?.message || "Failed to verify PAN card",
          cause: error,
        });
      }
    }),

  uploadJson: publicProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input }) => {
      const { cid } = await pinata.upload.public.json(input.data);
      const url = await pinata.gateways.public.convert(cid);
      return { cid, url };
    }),

  createWallet: publicProcedure
    .input(z.object({ email: z.email("Invalid email") }))
    .mutation(async ({ input }) => {
      try {
        const newUserWallet = await wallet.connect({
          chain: sepolia,
          strategy: "backend",
          walletSecret: input.email,
          client,
        });

        return {
          success: true,
          address: newUserWallet.address, // return wallet address
        };
      } catch (error: any) {
        console.error("Failed to create wallet:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create wallet",
        });
      }
    }),

  creditAnNftInHisWallet: publicProcedure
    .input(
      z.object({
        walletAddress: z
          .string()
          .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
        startTime: z.number().int().positive(),
        endTime: z.number().int().positive(),
        ipfsDataUri: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Call the mintTokenId function
        const transaction = await NFTcontract.mintTokenId(
          input.walletAddress,
          BigInt(input.startTime), // Convert to BigInt for uint256
          BigInt(input.endTime), // Convert to BigInt for uint256
          input.ipfsDataUri
        );

        // Wait for transaction confirmation

        const receipt = await transaction.wait();
        if (!receipt)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Transaction failed",
          });

        // Return relevant transaction details
        return {
          success: true,
          transactionHash: transaction.hash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString(),
        };
      } catch (error) {
        // Handle specific Ethers.js errors
        let errorMessage = "Failed to mint NFT";
        if (error instanceof Error) {
          errorMessage = error.message;
          if ("reason" in error) {
            errorMessage = (error as any).reason || errorMessage;
          }
        }
        throw new Error(`Minting failed: ${errorMessage}`);
      }
    }),

  storeInDAtaBase: publicProcedure
    .input(
      z.object({
        email: z.string(),
        tripduration: z.number(),
        location: z.string(),
        tripEnd: z.number(),
        cid: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await db.insert(Tourists).values({
          email: input.email,
          TripDuration: `${input.tripduration} days`,
          Triplocation: input.location,
          tripEnd: input.tripEnd,
          cid: input.cid,
          status: "ACTIVE",
        });
        return { success: true };
      } catch (err) {
        console.error("DB insert failed:", err);
        throw new Error("Failed to store tourist data");
      }
    }),
});
