import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dot, Equal } from "lucide-react";

const AccordionDetails = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState<string | undefined>(undefined);

  return (
    <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
      <AccordionItem
        value="item-1"
        onMouseEnter={() => setOpen("item-1")}
        onMouseLeave={() => setOpen(undefined)}
        className="border border-blue-200/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <AccordionTrigger className=" font-semibold w-xl text-blue-800 bg-gradient-to-r from-blue-100 to-blue-200 py-3 px-4 rounded-t-lg hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 transition-all duration-300 flex items-center justify-between">
          <span className="flex items-center gap-2"><Equal/>{title}</span>
        </AccordionTrigger>
        <AccordionContent className=" w-xl text-md flex items-center font-bold text-slate-700 bg-blue-200  py-4 px-6 rounded-b-lg">
         <Dot/> {description}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionDetails;
