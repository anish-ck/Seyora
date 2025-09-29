import React, { Suspense } from "react";
import Image from "next/image";
import { CheckCircle, ListFilter, ListFilterIcon } from "lucide-react";
import AccordionDetails from "./AccordionDetails";

import { landingPageSections } from "../landingPageConstants";
import { HeroImageSkeleton } from "@/lib/suspenses";

const BodySectionWithImage = ({ id, num }: any) => {
  const body = landingPageSections[num];
  const isImageLeft = id % 2 === 0;
  const features = body.features;

  const ImageContent = () => (
    <div className="flex-1 flex justify-center">
      <Suspense fallback={<HeroImageSkeleton />}>
        <div className="relative">
          <Image src={landingPageSections[id].imagePath} alt="imageath" height={400} width={400} className="h-full w-full"/>
        </div>
      </Suspense>
    </div>
  );
  const TextContent = () => (
    <div className="flex-1 space-y-6">
      <div>
        <h2
          className="text-3xl lg:text-4xl font-extrabold leading-tight mb-6 text-white"
          dangerouslySetInnerHTML={{ __html: body.heading }}
        />
        <div className="flex items-center gap-3 mb-6">
          <ListFilter className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-purple-100">Features</h3>
        </div>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <AccordionDetails
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="px-6 lg:px-10 py-16">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 ${
            !isImageLeft ? "lg:flex-row-reverse" : ""
          }`}
        >
          <TextContent />
          <ImageContent />
        </div>
      </div>
    </section>
  );
};

export default BodySectionWithImage;
