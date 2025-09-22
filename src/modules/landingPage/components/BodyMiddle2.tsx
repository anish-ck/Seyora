import { Button } from "@/components/ui/button";
import AccordionDetails from "./AccordionDetails";
import { ListFilterIcon } from "lucide-react";
import React from "react";

const BodyMiddle2 = () => {
  return (
    <div className="md:flex-row flex h-fit flex-col mb-6 w-full justify-between mt-7 items-start px-4">
      <div className="w-1/2 flex justify-center md:pl-10 md:justify-start">
        <img
          src="/kycVerification.png" // Replace with your image path
          alt="kycVerification"
          className="rounded-lg hover:scale-102 object-cover transition-all duration-300 w-[550px] h-[500px] shadow-lg"
        />
      </div>
      <div className="pl-10 flex-1 md:w-fit flex-col text-center md:justify-start md:text-start h-fit">
        <h1 className="text-2xl md:text-3xl pb-3 lg:text-5xl font-extrabold leading-tight">
          Seamless KYC <span className="text-blue-600">verification</span>{" "}
        </h1>
        <h3 className="flex gap-2.5 font-bold text-xl items-center">
          <ListFilterIcon />
          Features
        </h3>
        <div className="flex flex-col gap-y-5 py-5 items-start font-medium max-w-lg">
          <AccordionDetails
            title="Seamless Tourist Onboarding"
            description="Tourists register at airport/hotel/check-post by providing KYC (passport/Aadhaar) + trip details. Backend KYC service instantly verifies authenticity."
          />
          <AccordionDetails
            title="Blockchain-Powered Digital ID"
            description="A non-transferable ERC-721 soulbound NFT is minted post-verification. Holds Tourist ID, trip duration, emergency contacts, and encrypted KYC/itinerary stored on IPFS/Arweave"
          />
          <AccordionDetails
            title="TCustodial Wallet & QR Access"
            description="Tourists don’t need MetaMask. NFT is linked to a custodial wallet or Web3Auth login. The app generates a QR code for easy scanning by authorities"
          />
          <AccordionDetails
            title="Real-Time Verification for Authorities"
            description="Police/tourism officers scan the QR → fetch NFT from blockchain. Instantly checks: authenticity (NFT minted), validity (trip active), and identity (KYC hash match)."
          />
        </div>
      </div>
    </div>
  );
};

export default BodyMiddle2;
