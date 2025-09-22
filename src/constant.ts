import z from "zod";

export const formSchema = z.object({
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format")
      .min(5)
      .max(50),
  });
  
  export const otpSchema = z.object({
    otpCode: z
      .string()
      .min(6, "minimum 6 digit is required")
      .max(6, "minimum six digit is required"),
  });
  