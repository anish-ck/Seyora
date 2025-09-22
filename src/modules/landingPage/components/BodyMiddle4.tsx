import { Button } from "@/components/ui/button";
import AccordionDetails from "./AccordionDetails";
import { ListFilterIcon } from "lucide-react";
import React from "react";

const BodyMiddle4 = () => {
  return (
    <div className="md:flex-row flex h-fit flex-col mb-6 w-full justify-between mt-7 items-start px-4">
      <div className="w-1/2 flex justify-center md:pl-10 md:justify-start">
        <img
          src="bodyMiddle4.jpg" // Replace with your image path
          alt="kycVerification"
          className="rounded-lg hover:scale-102 object-cover transition-all duration-300 w-[550px] h-[500px] shadow-lg"
        />
      </div>
      <div className="pl-10 flex-1 md:w-fit flex-col text-center md:justify-start md:text-start h-fit">
        <h1 className="text-2xl md:text-3xl pb-3 lg:text-5xl font-extrabold leading-tight">
          Enhanced <span className="text-blue-600">Admin</span> & Support
          Ecosystem
        </h1>
        <h3 className="flex gap-2.5 font-bold text-xl items-center">
          <ListFilterIcon />
          Features
        </h3>
        <div className="flex flex-col gap-y-5 py-5 items-start font-medium max-w-lg">
          <AccordionDetails
            title="Police & Tourism Command Center"
            description="Dashboard with heatmaps, alerts, digital ID access, and automated E-FIR generation for efficient management."
          />
          <AccordionDetails
            title="Multilingual Accessibility Hub"
            description="App supports 10+ Indian languages with voice/text assistance for elderly and disabled travelers"
          />
          <AccordionDetails
            title="Unbreakable Privacy Vault"
            description="End-to-end encryption and blockchain ensure tamper-proof travel and identity records"
          />
          <AccordionDetails
            title="Real-Time Verification for Authorities"
            description=" Auto-generated safety score based on travel patterns for enhanced security insights."
          />
        </div>
      </div>
    </div>
  );
};

export default BodyMiddle4;
