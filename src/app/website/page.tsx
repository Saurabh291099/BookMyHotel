import React from "react";
import HeroBanner from "./webComponents/HeroBanner";
import AboutSection from "./webComponents/AboutSection";
import RoomsSection from "./webComponents/RoomsSection";
import ReviewsSection from "./webComponents/ReviewsSection";
import ContactSection from "./webComponents/ContactSection";
// import GallerySection from "./webComponents/GallerySection";
// import NearBySection from "./webComponents/NearByPlaceSection";
// import AdvertiseSection from "./webComponents/AdvertiseSection";

const Website = () => {

  const reviews = [
    
    {
      name: "John Doe",
      review: "This is a great product! Highly recommend it. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      profilePic: "/images/person.svg",
    },
    {
      name: "Jane Smith",
      review: "Excellent service and quality. Will buy again.",
      profilePic: "/images/person.svg",
    },
    {
      name: "Alice Johnson",
      review: "Very satisfied with my purchase. Thank you!",
      profilePic: "/images/person.svg",
    },
  ]
  return (
    <>
      <HeroBanner />

      <div className="container mx-auto">
        <AboutSection />

        <RoomsSection />

        <ReviewsSection
          heading="What our customers say"
          description="We are proud to have received numerous positive reviews from our satisfied customers. Here are just a few of the many testimonials we have received."
          reviews = {reviews}
        />
        {/* <GallerySection/>
     <NearBySection/>
     <AdvertiseSection/>  */}

     <ContactSection
        title="Contact Us"
        description="We would love to hear from you! If you have any questions or inquiries, please feel free to reach out to us."
        conatctDetails={[
          {
            address: "123 Main Street, Cityville",
            phone: "(123) 456-7890",
            email: "example@gmail.com",
          },
        ]}
        mapLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1234567890123!2d-122.4194156846814!3d37.7749292797598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c8c8c8c8c%3A0x123456789abcdef0!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sin!4v1634567890123"
      />
      </div>
    </>
  );
};

export default Website;
