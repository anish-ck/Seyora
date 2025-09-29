import { Button } from "@/components/ui/button";
import { Bot, CreditCard, IdCard, MoveRight, Siren } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { HeroImageSkeleton } from "@/lib/suspenses";
import { useRouter } from "next/navigation";

const BodyTop = () => {
  const router = useRouter();
  return (
    <section className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
            Empower Safe Travel
            <br />
            with <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Blockchain</span> NFTs
            <br />
            & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI</span> Alerts
          </h1>
          
          <div className="flex flex-col gap-4 mb-8 max-w-2xl mx-auto lg:mx-0">
            {[
              { icon: <CreditCard className="w-6 h-6 text-purple-400" />, text: "Trusted NFT IDs for secure tourist verification." },
              { icon: <Bot className="w-6 h-6 text-purple-400" />, text: "AI-driven alerts and geo-fencing for real-time safety." },
              { icon: <Siren className="w-6 h-6 text-purple-400" />, text: "Panic button with multilingual access for all travelers." }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-purple-500/20 hover:bg-white/10 transition-all duration-300">
                {item.icon}
                <p className="text-purple-100 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button onClick={() =>router.push("/dashboard") } className="px-8 py-4 text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              Dashboard
            </Button>
            <Button onClick={() => router.push("/analytics")} variant="outline" className="px-8 py-4 text-xl font-semibold text-purple-300 border-purple-400/50 hover:border-purple-400 hover:bg-purple-500/10 rounded-xl transition-all duration-300 flex items-center gap-2">
              <MoveRight className="w-6 h-6" />
              How it works
            </Button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <Suspense fallback={<HeroImageSkeleton />}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"></div>
              <Image src="/landingCard.png" alt="Landinf" height={400} width={500} className="w-full h-full" />
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
};
export default BodyTop;
