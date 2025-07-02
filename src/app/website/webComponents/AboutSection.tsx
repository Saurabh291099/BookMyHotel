
import SectionHeader from "@/app/molecules/SectionHeader";
import Image from "next/image";
// import Link from "next/link";
import React from "react";

const AboutSection = () => {
  return (
    <>
      <div className="flex flex-col justify-center h-[100dvh]">
        

        <SectionHeader
          title="Global Icon of Indian Hospitality"
          description="Enter a realm of storied halls, sophisticated delights and
              unrivalled indulgence. Immerse yourself in the grandeur of luxury
              at our exquisite palaces, hotels, resorts and safaris."
        />

        <div className="flex items-center justify-center gap-4">
          <Image
            width={600}
            height={600}
            src="/images/card.svg"
            alt="Placeholder"
            className="rounded-lg shadow-lg"
          />{" "}
          <Image
            width={600}
            height={600}
            src="/images/card.svg"
            alt="Placeholder"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default AboutSection;
