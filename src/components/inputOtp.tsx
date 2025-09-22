"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Shield, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { otpSchema } from "@/constant";

interface handleOtpProps {
  handleOtp: (value: z.infer<typeof otpSchema>) => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  isLoading?: boolean;
}

export const EnterOtpForVerification = ({
  handleOtp,
  open,
  onOpenChange,
  email,
  isLoading = false,
}: handleOtpProps) => {
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (otpValue.length !== 6) {
      setError("Please enter a complete 6-digit code");
      return;
    }

    setError("");
    try {
      await handleOtp({ otpCode: otpValue });
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    }
  };

  const handleClose = () => {
    setOtpValue("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-md border-0 bg-transparent p-0 shadow-none">
        {/* Backdrop with blur effect */}
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Main dialog container */}
        <div className="relative z-50 w-full max-w-md mx-auto">
          {/* Gradient background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-3xl blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl border border-white/10" />

          {/* Content */}
          <div className="relative p-8 space-y-6">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <DialogHeader className="space-y-4 text-center items-center">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Verify Your Email
              </DialogTitle>

              <div className="space-y-2">
                <p className="text-slate-400 text-sm">
                  We've sent a 6-digit verification code to
                </p>
                <div className="flex items-center justify-center gap-2 text-cyan-400 font-medium">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{email || "your email"}</span>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(value) => {
                    setOtpValue(value);
                    setError(""); // Clear error when user types
                  }}
                >
                  <InputOTPGroup className="gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-12 h-12 border-2 border-slate-600 bg-slate-800/50 text-white text-lg font-bold rounded-lg transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:bg-slate-700/50"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <div className="text-center">
                  <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-4">
                    {error}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={otpValue.length !== 6 || isLoading}
                  className="w-full h-12 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Verify Code
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>

              {/* Resend option */}
              <div className="text-center pt-2">
                <p className="text-slate-500 text-xs">
                  Didn't receive the code?{" "}
                  <button className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-200">
                    Resend
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
