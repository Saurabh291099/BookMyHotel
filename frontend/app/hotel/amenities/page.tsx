"use client";
import { WebsiteLayout } from "@/app/Layout/WebsiteLayout";
import { Card } from "@/components/ui/card";

const amenities = [
  {
    category: "Room Amenities",
    items: [
      { name: "Premium Bedding", description: "Egyptian cotton linens and luxury pillows" },
      { name: "Marble Bathroom", description: "Full bathroom with rainfall shower and luxury toiletries" },
      { name: "Flat-Screen Television", description: "Smart TV with streaming services" },
      { name: "High-Speed Wi-Fi", description: "Complimentary throughout the hotel" },
      { name: "Climate Control", description: "Individual room temperature control" },
      { name: "Mini Bar", description: "Selection of beverages and snacks" },
      { name: "Work Desk", description: "Fully equipped for business guests" },
      { name: "Safe", description: "In-room safe for valuables" }
    ]
  },
  {
    category: "Dining & Beverage",
    items: [
      { name: "Rooftop Restaurant", description: "Award-winning cuisine with panoramic city views" },
      { name: "Café & Bar", description: "All-day dining and cocktail lounge" },
      { name: "Room Service", description: "24-hour in-room dining" },
      { name: "Breakfast Buffet", description: "Complimentary daily breakfast (selected rooms)" },
      { name: "Wine Selection", description: "Curated wine list from local and international vineyards" },
      { name: "Afternoon Tea", description: "Traditional tea service in the lounge" },
      { name: "Seasonal Menus", description: "Chef's specials based on local produce" },
      { name: "Dietary Accommodations", description: "Vegetarian, vegan, and allergen-free options" }
    ]
  },
  {
    category: "Wellness & Spa",
    items: [
      { name: "Full-Service Spa", description: "Treatments featuring organic products" },
      { name: "Massage Therapy", description: "Swedish, deep tissue, and hot stone massages" },
      { name: "Fitness Center", description: "Modern equipment and personalized training" },
      { name: "Yoga Classes", description: "Daily morning and evening sessions" },
      { name: "Sauna & Steam Room", description: "Relaxation and detoxification" },
      { name: "Indoor Pool", description: "Temperature-controlled year-round" },
      { name: "Wellness Consultations", description: "Personalized health and wellness guidance" },
      { name: "Beauty Services", description: "Haircare and beauty treatments" }
    ]
  },
  {
    category: "Guest Services",
    items: [
      { name: "24/7 Concierge", description: "Local recommendations and reservations" },
      { name: "Multilingual Staff", description: "Speaking 12+ languages" },
      { name: "Luggage Storage", description: "Safe storage before check-in and after checkout" },
      { name: "Turndown Service", description: "Evening room preparation service" },
      { name: "Dry Cleaning", description: "Express laundry service" },
      { name: "Airport Transfers", description: "Arranged upon request" },
      { name: "Business Center", description: "Printing, copying, and meeting facilities" },
      { name: "Pet-Friendly", description: "Designated rooms available with additional fee" }
    ]
  },
  {
    category: "Entertainment & Activities",
    items: [
      { name: "Cultural Tours", description: "Guided tours of historic landmarks" },
      { name: "Art Gallery", description: "Rotating local artist exhibitions" },
      { name: "Live Music", description: "Jazz performances in the lounge (weekends)" },
      { name: "Theater Tickets", description: "Arrangements through concierge" },
      { name: "City Walking Tours", description: "Curated neighborhood explorations" },
      { name: "Cooking Classes", description: "Learn from our award-winning chefs" },
      { name: "Wine Tasting Events", description: "Monthly sommelier-led events" },
      { name: "Library & Reading Room", description: "Curated collection and quiet retreat" }
    ]
  },
  {
    category: "Business Services",
    items: [
      { name: "Meeting Rooms", description: "Flexible spaces for events up to 200 guests" },
      { name: "Video Conferencing", description: "State-of-the-art technology" },
      { name: "High-Speed Internet", description: "Dedicated business-grade connections" },
      { name: "Executive Lounge", description: "Exclusive access for premium guests" },
      { name: "Printing & Copying", description: "Available at business center" },
      { name: "Event Planning", description: "Professional event coordination services" },
      { name: "Translation Services", description: "Professional interpreters available" },
      { name: "Catering Services", description: "Customized menus for events" }
    ]
  }
];

export default function Amenities() {
  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Amenities & Services
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            World-class facilities and services to enhance your stay
          </p>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-12">
            {amenities.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {section.category}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item, itemIdx) => (
                    <Card key={itemIdx} className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Special Requests</h2>
          <p className="text-slate-600 mb-6">
            Don't see what you're looking for? Our concierge team is available 24/7 to arrange special services and accommodations.
          </p>
          <a
            href="mailto:reservations@heritagehotel.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Concierge
          </a>
        </div>
      </div>
    </WebsiteLayout>
  );
}
