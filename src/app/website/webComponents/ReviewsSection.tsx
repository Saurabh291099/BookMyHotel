import SectionHeader from "@/app/molecules/SectionHeader";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Heading from "@/app/atoms/Heading";
import Text from "@/app/atoms/Text";

interface ReviewsSectionProps {
  heading: string;
  description: string;
  imageSrc?: string;
  reviews?: { name: string; review: string; profilePic?: string }[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  heading = "What our customers say",
  description = "We are proud to have received numerous positive reviews from our satisfied customers. Here are just a few of the many testimonials we have received.",
  reviews,
}) => {
  return (
    <div className="h-auto w-full py-20">
      <SectionHeader title={heading} description={description} />

      <div className="flex items-center justify-center h-full w-full">
        <Swiper
          navigation={true}
          pagination={true}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {reviews?.map((reviewData, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center p-10 gap-6 h-auto w-full">
                <div className="w-20 h-20 rounded-full">
                  <Image
                    src={reviewData?.profilePic || ""}
                    alt={`Slide ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full fitted rounded-full"
                  />
                </div>
                <div className="max-w-2xl text-center">
                  <Heading type="h3">{reviewData.name}</Heading>
                  <Text variant="body">{reviewData.review}</Text>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewsSection;
