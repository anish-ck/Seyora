"use client";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="w-full px-10 py-10 flex justify-between">
      <div>
        <div className="flex justify-center items-center gap-4">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
          <span className="text-4xl font-bold text-blue-600">Tourvenia</span>
        </div>
      </div>
      <div>
        <a href="/register">
          <Button
            className={cn(
              "text-2xl px-5 py-4  border-0 rounded-none hover:scale-105 font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            )}
          >
            Register
          </Button>
        </a>

      </div>
    </div>
  );
};

export default Navbar;
