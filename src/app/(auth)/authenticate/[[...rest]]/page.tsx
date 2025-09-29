"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSignIn,
  useSignUp,
  useClerk,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
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
import { ArrowRight, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { EnterOtpForVerification } from "@/components/inputOtp";
import { formSchema, otpSchema } from "@/lib/constant";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const {
    signIn,
    isLoaded: signInLoaded,
    setActive: setSignInActive,
  } = useSignIn();
  const {
    signUp,
    isLoaded: signUpLoaded,
    setActive: setSignUpActive,
  } = useSignUp();
  const { isSignedIn, signOut, sessionId } = useAuth();
  const [email, setEmail] = useState("");
  const [openOtp, setOpenOtp] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [authFlow, setAuthFlow] = useState<"sign-in" | "sign-up">("sign-in");
  const [otpTimeout, setOtpTimeout] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // OTP Timeout Logic (5 minutes)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (openOtp) {
      timer = setTimeout(() => {
        setOtpTimeout(true);
        setOpenOtp(false);
        toast.error("OTP verification timed out. Please try again.");
      }, 5 * 60 * 1000); // 5 minutes
    }
    return () => clearTimeout(timer);
  }, [openOtp]);

  if (!signInLoaded || !signUpLoaded) return null;

  // Email format validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  async function onSubmit(value: z.infer<typeof formSchema>) {
    console.log("onSubmit called with email:", value.email);
    if (!validateEmail(value.email)) {
      console.log("Invalid email address");
      toast.error("Please enter a valid email address.");
      return;
    }

    console.log("Setting loading to true and clearing error");
    setError("");
    setEmail(value.email);

    try {
      if (isSignedIn) {
        console.log("User is signed in, attempting sign out");
        await signOut();
      }

      if (signIn) {
        try {
          console.log("Attempting sign-in with email_code strategy");
          const signInResult = await signIn.create({
            identifier: value.email,
            strategy: "email_code",
          });
          console.log("Sign-in attempt result:", signInResult);
          setLoading(false);
          setAuthFlow("sign-in");
          setOpenOtp(true);
        } catch (error) {
          console.log("Sign-in error, attempting sign-up:", error);
          if (signUp) {
            try {
              console.log("Attempting sign-up with email:", value.email);
              const signUpResult = await signUp.create({
                emailAddress: value.email,
              });
              console.log("Sign-up attempt result:", signUpResult);
              await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
              });
              console.log("Email verification prepared");
              setLoading(false);
              setAuthFlow("sign-up");
              setOpenOtp(true);
            } catch (signUpError: any) {
              console.log("Sign-up error:", signUpError);
              const errorMessage =
                signUpError.errors?.[0]?.message ||
                "Failed to create account. Please try again.";
              toast.error(errorMessage);
            }
          }
        }
      }
    } catch (error: any) {
      console.log("General error in onSubmit:", error);
      const errorMessage =
        error.message || "Network error. Please check your connection.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      console.log("Setting loading to false in finally block");
      setLoading(false);
    }
  }

  async function handleOtpSubmit(value: z.infer<typeof otpSchema>) {
    console.log("handleOtpSubmit called with OTP:", value.otpCode);
    if (otpTimeout) {
      console.log("OTP has expired");
      toast.error("OTP has expired. Please request a new code.");
      return;
    }

    console.log("Setting loading to true and clearing error");
    setLoading(true);
    setError("");

    try {
      if (authFlow === "sign-in" && signIn) {
        console.log("Attempting sign-in OTP verification");
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: value.otpCode,
        });
        console.log("Sign-in OTP verification result:", result);

        if (result.status === "complete") {
          if (!setSignInActive) {
            console.log("Invalid session for sign-in");
            toast.error("Invalid session. Please try again.");
            return;
          }
          await setSignInActive({ session: result.createdSessionId });
          console.log("Redirecting to dashboard");
          await router.push("/dashboard");
        }
      } else if (authFlow === "sign-up" && signUp) {
        console.log("Attempting sign-up OTP verification");
        const result = await signUp.attemptEmailAddressVerification({
          code: value.otpCode,
        });
        console.log("Sign-up OTP verification result:", result);
        if (result.status === "complete") {
          if (!setSignUpActive) {
            console.log("Invalid session for sign-up");
            toast.error("Invalid session. Please try again.");
            return;
          }
          console.log(
            "Setting sign-up active with session:",
            result.createdSessionId
          );
          await setSignUpActive({ session: result.createdSessionId });
          console.log("Redirecting to dashboard");
          await router.push("/dashboard");
        }
      }
    } catch (error: any) {
      console.log("Error in handleOtpSubmit:", error);
      const errorMessage =
        error.errors?.[0]?.message ||
        error.message ||
        "Verification failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      console.log("Setting loading to false in finally block");
      setLoading(false);
    }
  }
  const handleWithGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      if (isSignedIn) {
        await signOut();
      }

      const redirectUrl = `${window.location.origin}/dashboard`; // full URL
      if (signIn) {
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl,
          redirectUrlComplete: redirectUrl,
        });
      } else if (signUp) {
        await signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl,
          redirectUrlComplete: redirectUrl,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.errors?.[0]?.message ||
        error.message ||
        "Google authentication failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen w-3/5 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Background decorative elements with purple theme */}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-indigo-600 opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
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
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-500 to-purple-600 opacity-15 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-20 sm:px-10 lg:px-14 min-h-screen">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-orbitron font-semibold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
            Register Account
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-purple-200/80">
            Begin your secure Web3 adventure today.
          </p>
        </div>

        {/* Main form container with Truvenia theme */}
        <div className="relative w-full max-w-md">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-600/50 p-[1px]">
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-purple-900/95 via-slate-900/95 to-purple-950/95 backdrop-blur-xl" />
          </div>

          {/* Form content */}
          <div className="relative z-10 p-8 rounded-3xl backdrop-blur-xl border border-purple-400/20 shadow-2xl shadow-purple-500/25">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300 text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-base text-purple-100">
                        Email Address
                      </FormLabel>
                      {/* Enhanced gradient border input */}
                      <div className="relative mt-3 group">
                        {/* Gradient border that appears on focus */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 p-[1px]">
                          <div className="w-full h-full rounded-xl bg-slate-900/90" />
                        </div>
                        <FormControl>
                          <Input
                            className="relative z-10 w-full rounded-xl border border-purple-500/30 bg-slate-900/80 backdrop-blur-sm px-4 py-3 text-white placeholder:text-purple-300/60 transition-all duration-300 focus:border-transparent focus:outline-none focus:shadow-lg focus:shadow-purple-500/25 hover:border-purple-400/50"
                            placeholder="Enter your email address"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-red-400 mt-1" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 bg-[length:200%_auto] px-6 py-3.5 font-bold cursor-pointer text-white shadow-lg shadow-purple-500/30 transition-all duration-500 ease-in-out hover:bg-[position:100%_0] hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Sign-in <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div id="clerk-captcha" className="mb-4 size-7"></div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
              <span className="px-4 text-sm text-purple-300/70 font-medium">
                or
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            </div>
            <div className="flex justify-center items-center w-full">
              <SignInButton
                forceRedirectUrl="http://localhost:3000/dashboard"
                withSignUp
              >
                <Button className="your-button-styles w-full">
                  <Image src="/google.svg" width={18} height={18} alt="00000" />{" "}
                  Continue with Google
                </Button>
              </SignInButton>
            </div>

            <EnterOtpForVerification
              open={openOtp}
              onOpenChange={setOpenOtp}
              handleOtp={handleOtpSubmit}
              email={email}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
