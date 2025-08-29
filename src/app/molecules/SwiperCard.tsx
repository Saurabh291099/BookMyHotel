import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Navigation , Pagination } from "swiper/modules";
import Image from "next/image";




interface SwiperCardProps {
  imageSrc: Array<string>;
}

const SwiperCard: React.FC<SwiperCardProps> = ({ imageSrc }) => {
  return (
    <div className="grid grid-cols-1 bg-secondary-50 h-full w-full overflow-hidden">
      {imageSrc && (
        <div className="flex items-center justify-center h-full w-full">
          <Swiper navigation={true} pagination={true} modules={[Navigation, Pagination]} className="mySwiper">

            {imageSrc?.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  width={500}
                  height={300}
                  className="fitted w-full h-full object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
            {/* <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default SwiperCard;
