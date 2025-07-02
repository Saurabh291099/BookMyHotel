import Heading from "@/app/atoms/Heading";
import Text from "@/app/atoms/Text";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdvertiseSection = () => {
  return (
    <>
      <div className="grid grid-cols-2 h-[100dvh] bg-gray-600 ">
        <div className="flex flex-col items-center justify-center">
          <Heading type="h1" className="text-4xl font-bold mb-4">
            Welcome to Our Advertise Section
          </Heading>
          <Text variant="body" className="text-lg mb-8">
            This is a simple website built with Next.js and Tailwind CSS.
          </Text>
          <Link href="/about" className="text-blue-500 hover:underline">
            Learn more about us
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Image
            width={300}
            height={300}
            src=""
            alt="Placeholder"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default AdvertiseSection;
