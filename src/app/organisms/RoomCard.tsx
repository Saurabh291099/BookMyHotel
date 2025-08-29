import React from "react";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
// import Image from "next/image";
import Button from "../atoms/Button";
// import Swiper from "swiper";
import SwiperCard from "../molecules/SwiperCard";

interface RoomCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: Array<string>;
  buttons?: Array<{ label: string; onClick: () => void }>;
}

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  buttons,
}) => {
  return (
    <div className="flex justify-between bg-secondary-50 overflow-hidden">
      <div className="w-1/2 p-10">
        <Heading type="h2" className="text-2xl font-bold mb-4">
          {title}
        </Heading>

        <Heading type="h6" className="my-4">
          {subtitle}
        </Heading>

        <Text variant="body" className="text-lg mb-4">
          {description}
        </Text>

        {buttons && (
          <div className="flex space-x-4">
            {buttons.map((buttons, index) => {
              return <Button key={index} {...buttons} />;
            })}
          </div>
        )}
      </div>
      {imageSrc && (
      // <div className="flex items-center justify-center h-full w-full">
      //   <Image
      //     src={imageSrc}
      //     alt={title}
      //     width={500}
      //     height={300}
      //     className="fitted w-full h-full object-cover rounded-lg"
      //   />
      //   </div>

      <div className="w-1/2">
      <SwiperCard imageSrc={imageSrc} />
      </div>
      )}
    </div>
  );
};

export default RoomCard;
