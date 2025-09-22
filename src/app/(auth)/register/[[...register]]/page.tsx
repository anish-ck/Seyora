"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { EnterOtpForVerification } from "@/components/inputOtp";
import { formSchema, otpSchema } from "@/constant";

const Page = () => {
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [openOtp, SetOpenOtp] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authFlow, setAuthFlow] = useState<"sign-in" | "sign-up">("sign-in");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  if (!signInLoaded || !signUpLoaded) return null;

  async function onSubmit(value: z.infer<typeof formSchema>) {
    setLoading(true);
    setError("");
    setEmail(value.email);
    console.log("🚀 Starting auth process for email:", value.email);
    try {
      if (signIn) {
        try {
          console.log("📧 Attempting sign-in...");
          const signInResult = await signIn.create({
            identifier: value.email,
            strategy: "email_code",
          });
          console.log("✅ Sign-in successful:", signInResult);

          setLoading(false);
          setAuthFlow("sign-in");
          SetOpenOtp(true);
        } catch (error) {
          console.log("❌ Sign-in failed, trying sign-up:", error);
          if (signUp) {
            try {
              await signUp.requiredFields;
              const signUpResult = await signUp.create({
                emailAddress: value.email,
              });
              console.log("✅ Sign-in successful:", signUpResult);
              await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
              });
              setLoading(false);
              setAuthFlow("sign-up");
              SetOpenOtp(true);
            } catch (signUpError: any) {
              setError("Unable to send verification code. Please try again.");
              console.error("Auth error:", signUpError);
            }
          }
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Email submission error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpSubmit(value: z.infer<typeof otpSchema>) {
    setLoading(true);
    setError("");

    try {
      if (authFlow === "sign-in" && signIn) {
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: value.otpCode,
        });

        if (result.status === "complete") {
          window.location.href = "/dashboard";
        }
      } else if (authFlow === "sign-up" && signUp) {
        console.log("opt value", value.otpCode);
        const result = await signUp.attemptEmailAddressVerification({
          code: value.otpCode,
        });
        console.log("result status", result.status);
        if (result.status === "complete") {
          window.location.href = "/dashboard";
        }
      }
    } catch (error: any) {
      // Improved error handling for Clerk errors
      const errorMessage =
        error.errors?.[0]?.message ||
        error.message ||
        "Verification failed. Please try again.";
      setError(errorMessage);
      console.error("OTP verification error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleWithGoogleLogin = async () => {
    try {
      if (signIn) {
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/dashboard",
          redirectUrlComplete: "/dashboard",
        });
      }
      if (signUp) {
        await signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/dashboard",
          redirectUrlComplete: "/dashboard",
        });
      }
    } catch (error: any) {
      // Improved error handling for Clerk errors
      const errorMessage =
        error.errors?.[0]?.message ||
        error.message ||
        "Google authentication failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="relative isolate min-h-screen w-3/5 bg-slate-900">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80ff9a] to-[#3c89fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-20 sm:px-10 lg:px-14 min-h-screen">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-orbitron font-semibold tracking-tight text-white">
            Register Account
          </h1>
          <p className="mt-2 max-w-md text-base leading-relaxed text-slate-400">
            Begin your secure Web3 adventure today.
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
          {/* CRITICAL: Add Clerk CAPTCHA container */}
          <SignIn />
          {/* Display error message if any */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-base text-slate-300">
                      Email
                    </FormLabel>
                    {/* --- 3. GRADIENT-BORDER INPUT --- */}
                    {/* A parent div creates the gradient border effect on focus-within */}
                    <div className="relative mt-2 rounded-lg before:absolute before:inset-0 before:z-0 before:rounded-lg before:bg-gradient-to-r before:from-cyan-400 before:to-sky-600 before:opacity-0 before:transition-opacity before:duration-300 focus-within:before:opacity-100">
                      <FormControl>
                        <Input
                          className="relative z-10 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-white placeholder:text-slate-500 transition-colors duration-300 focus:border-transparent focus:outline-none"
                          placeholder="Enter your email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 bg-[length:200%_auto] px-4 py-3 font-bold cursor-pointer text-white shadow-lg transition-all duration-500 ease-in-out hover:bg-[position:100%_0] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Processing..." : "Sign-in"} <ArrowRight />
              </Button>
            </form>
          </Form>
          <div id="clerk-captcha" className="mb-4 size-7"></div>

          <Button
            onClick={handleWithGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="flex items-center justify-center gap-3 w-full px-4 py-1 bg-white border border-gray-300 rounded-lg mt-7 cursor-pointer transition-all hover:scale-102 duration-200 font-bold text-gray-700 text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Image src="/google.svg" alt="google" width={12} height={12} />
            {isLoading ? "Processing..." : "Continue with google"}
          </Button>

          <EnterOtpForVerification
            open={openOtp}
            onOpenChange={SetOpenOtp}
            handleOtp={handleOtpSubmit}
            email={email}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
