import {
  Globe2Icon,
  IdCard,
  PackageSearch,
  QrCode,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  UserRoundPenIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const BodyMiddle = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent py-2 px-4 mx-auto max-w-2xl hover:scale-105 transition-all duration-300 font-poppins">
        Features that make it special and powerful
      </p>
      <div className="flex justify-center md:justify-around mt-6 w-full">
        <div className="flex flex-col gap-y-3 w-[280px] sm:w-[320px] bg-gradient-to-b from-blue-600/10 to-blue-800/10 border border-blue-600/20 p-6 text-center font-poppins shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 items-center">
          <Sparkles className="w-6 h-6 text-blue-600 hover:scale-105 transition-all duration-300" />
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
            Tourist Experience Magic
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed text-wrap">
            show your KYC, and your digital NFT ID is ready. just a QR code in
            your pocket making your travel smooth, secure, and futuristic.
          </p>
        </div>
        <div className="flex flex-col gap-y-3 w-[280px] sm:w-[320px] bg-gradient-to-b from-blue-600/10 to-blue-800/10 border border-blue-600/20 p-6 text-center font-poppins shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 items-center">
          <ShieldCheck className="w-7 h-7 text-blue-600 hover:scale-110 transition-all duration-300" />
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
            Safety Meets Tech
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed text-wrap">
            Your trip’s got its own digital bodyguard—geo-fencing keeps you
            outta danger zones, and a panic button calls backup with just one
            tap.
          </p>
        </div>
        <div className="flex flex-col gap-y-3 w-[280px] sm:w-[320px] bg-gradient-to-b from-blue-600/10 to-blue-800/10 border border-blue-600/20 p-5 text-center font-poppins shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 items-center">
          <UserRoundPenIcon className="w-6 h-6 text-blue-600 hover:scale-105 transition-all duration-300" />
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
            Smart Officer Tools
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed text-wrap">
            Cops just scan your QR and boom—your trip details pop up. Plus, they
            get live heatmaps and even auto-missing reports, no paperwork drama
          </p>
        </div>
        <div className="flex flex-col gap-y-3 w-[280px] sm:w-[320px] bg-gradient-to-b from-blue-600/10 to-blue-800/10 border border-blue-600/20 p-5 text-center font-poppins shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 items-center">
          <Globe2Icon className="w-6 h-6 text-blue-600 hover:scale-105 transition-all duration-300" />
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
            Inclusive & Secure
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed text-wrap">
            No matter who you are or where you’re from, the app speaks your
            language and keeps you covered. With end-to-end encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BodyMiddle;
