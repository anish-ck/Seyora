"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  return (
    <nav className="w-full px-6 lg:px-10 py-6 flex justify-between items-center relative z-50">
      <div className="flex justify-center items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Tourvenia
        </span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:block">
        <Button onClick={() =>router.push("/authenticate")} className="cursor-pointer text-xl px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
          Register
        </Button>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-purple-400"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl mx-4">
          <Button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl">
            Register
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
