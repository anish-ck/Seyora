import { Button } from "@/components/ui/button";
import AccordionDetails from "./AccordionDetails";
import { ListFilterIcon } from "lucide-react";
import React from "react";

const BodyMiddle3 = () => {
  return (
    <div className="md:flex-row flex h-fit flex-col mb-6 w-full justify-between mt-7 items-start px-4">
      <div className="pl-10 flex-1 md:w-fit flex-col text-center md:justify-start md:text-start h-fit">
        <h1 className="text-2xl md:text-3xl pb-3 lg:text-5xl font-extrabold leading-tight">
          Advanced <span className="text-blue-600">Safety</span> &{" "}
          <span className="text-blue-600">Monitoring</span> Suite
        </h1>
        <h3 className="flex gap-2.5 font-bold text-xl items-center">
          <ListFilterIcon />
          Features
        </h3>
        <div className="flex flex-col gap-y-5 py-5 items-start font-medium max-w-lg">
          <AccordionDetails
            title="Geo-Fencing Protection"
            description="Alerts tourists with real-time warnings when entering high-risk zones, ensuring safety with smart boundary monitoring"
          />
          <AccordionDetails
            title="Instant Panic Response"
            description="One-tap panic button sends live location to police and emergency contacts for immediate assistance."
          />
          <AccordionDetails
            title="Real-Time Family Tracking"
            description="Optional feature allows families or law enforcement to monitor tourist locations in real-time for added security"
          />
          <AccordionDetails
            title="AI Distress Detection"
            description=" AI identifies unusual patterns, route deviations, or inactivity to flag potential distress and trigger alerts"
          />
        </div>
      </div>
      <div className="w-1/2 flex justify-center md:pl-10 md:justify-start">
        <img
          src="bodyMiddle3.jpg" // Replace with your image path
          alt="kycVerification"
          className="rounded-lg hover:scale-102 object-cover transition-all duration-300 w-[550px] h-[500px] shadow-lg"
        />
      </div>
    </div>  
  );
};

export default BodyMiddle3;
