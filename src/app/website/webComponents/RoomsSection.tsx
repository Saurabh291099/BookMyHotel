import SectionHeader from "@/app/molecules/SectionHeader";
import RoomCard from "@/app/organisms/RoomCard";
import React from "react";

interface RoomsSectionProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  roomsDetails?: {
    title: string;
    description: string;
    imageSrc: string;
    buttons: Array<{ label: string; onClick: () => void }>;
  }[];
  buttons?: Array<{ label: string; onClick: () => void }>;
}
const RoomsSection: React.FC<RoomsSectionProps> = () => {
  const buttons = [
    {
      label: "Book Now",
      onClick: () => {
        alert("Book Now clicked");
      },
    },
    {
      label: "View Details",
      onClick: () => {
        alert("View Details clicked");
      },
    },
  ];

  const imageSrc = [
    "/images/card.svg",
    "/images/card.svg",
    "/images/card.svg",
    "/images/card.svg",
  ];

  return (
    <>
      <div className="py-10">
        <SectionHeader
          title="Welcome to Our Rooms"
          description=" This is a simple website built with Next.js and Tailwind CSS."
        />

        <div className="flex items-center justify-center px-4">
          <RoomCard
            title="Superior Room"
            subtitle="Lorem Ipsum  |  1-3 persons  |  300sqft"
            description="Our Superior Rooms offer a blend of lavish comfort and breathtaking city vistas. With the capacity to accommodate up to three guests, each room features a bedroom area furnished with either a king-sized bed or two twin beds, along with a separate seating area complete with a sofa and tea table for added convenience. Perfectly decorated with modern amenities, our Superior Rooms provide a cozy and welcoming ambiance for a truly relaxing stay."
            imageSrc={imageSrc}
            buttons={buttons}
          />
        </div>



       
      </div>
    </>
  );
};

export default RoomsSection;
