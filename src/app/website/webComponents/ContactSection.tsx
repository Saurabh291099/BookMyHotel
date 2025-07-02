import Heading from "@/app/atoms/Heading";

interface ContactSectionProps {
  title: string;
  description: string;
  conatctDetails: {
    address: string;
    phone: string;
    email: string;
  }[];
  mapLink: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({}) => {
  return (
    <>
      <Heading type="h2" className="text-center mb-8">
        Contact Us
      </Heading>
      <div className="grid grid-cols-2 w-full">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          <p className="text-gray-600">123 Main Street, Cityville</p>
          <p className="text-gray-600">Phone: (123) 456-7890</p>
          <p className="text-gray-600">Email: example@gmail.com</p>
        </div>
        <div className="mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1234567890123!2d-122.4194156846814!3d37.7749292797598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c8c8c8c8c%3A0x123456789abcdef0!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sin!4v1634567890123"
            width="600"
            height="600"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full h-[25rem]"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
