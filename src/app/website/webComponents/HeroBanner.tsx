import Heading from "@/app/atoms/Heading";
import Text from "@/app/atoms/Text";
import Link from "next/link";
import React from "react";

const HeroBanner = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-[calc(100dvh-5rem)] bg-no-repeat bg-cover bg-gray-300"
        style={{ backgroundImage: "url('/images/card.svg')" }}
      >
        <Heading type="h1" className="text-4xl font-bold mb-4">
          Welcome to Our Website
        </Heading>
        <Text variant="body" className="text-lg mb-8">
          This is a simple website built with Next.js and Tailwind CSS.
        </Text>
        <Link href="/about" className="text-blue-500 hover:underline">
          Learn more about us
        </Link>
      </div>
    </>
  );
};

export default HeroBanner;
