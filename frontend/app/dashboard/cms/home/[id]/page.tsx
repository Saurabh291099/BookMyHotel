"use client";

import GenericForm, { FormField } from "@/app/components/HotelForm";
import { useParams } from "next/navigation";

export default function CMSHome() {
  const params = useParams();
  const hotelId = params.id as string;

  const hotelFields: FormField[] = [
    {
      name: "name",
      label: "Hotel Name",
      type: "text",
      placeholder: "Enter hotel name",
      required: true,
      gridCol: 1,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Enter city",
      required: true,
      gridCol: 1,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Enter street address",
      required: true,
      gridCol: 1,
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "Enter country",
      required: true,
      gridCol: 1,
    },
    {
      name: "rating",
      label: "Rating (0-5)",
      type: "number",
      placeholder: "Enter rating",
      min: 0,
      max: 5,
      step: 0.1,
      gridCol: 1,
    },
    {
      name: "imageUrl",
      label: "Image URL",
      type: "url",
      placeholder: "Enter image URL",
      gridCol: 1,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      rows: 4,
      gridCol: 2,
    },
  ];

  return (
    <GenericForm
      id={hotelId}
      fields={hotelFields}
      apiEndpoint="http://localhost:4000/hotels"
      title="Home Page"
      subtitle="Manage your hotel information"
      buttonText="Edit Hotel Info"
      showCurrentInfo={true}
      showConsoleHint={true}
    />
  );
}

