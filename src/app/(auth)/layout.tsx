import React from "react";
import { Globe } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden md:flex md:w-1/2 relative  bgAuthBlockchain">
        <div className="relative z-10 flex flex-col items-center mt-16 mb-16 px-8 lg:px-12 text-white">
          <div className="flex  gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-5xl font-orbitron font-extrabold tracking-tight hover:scale-105 text-white">
              Truvenia
            </h1>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
