import { z } from "zod";

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

export const colors = {
  primary: {
    purple: '#9333ea',
    pink: '#ec4899',
    cyan: '#06b6d4',
    blue: '#3b82f6',
  },
  background: {
    dark: '#0f172a',
    darker: '#020617',
    slate900: '#0f172a',
    slate800: '#1e293b',
  },
  text: {
    white: '#ffffff',
    purple100: '#f3e8ff',
    purple200: '#e9d5ff',
    purple300: '#d8b4fe',
    slate400: '#94a3b8',
    slate500: '#64748b',
  },
  border: {
    purple500: '#a855f7',
    purple400: '#c084fc',
  }
};