"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { WebsiteLayout } from "../../[id]/WebsiteLayout";

const events = [
  {
    title: "Wine Pairing Dinner Series",
    date: "Every Friday",
    time: "7:00 PM - 10:00 PM",
    description: "Join our sommelier for an evening of exquisite wines paired with chef's special menu.",
    location: "Skyline Rooftop Restaurant",
    capacity: "30 guests"
  },
  {
    title: "Jazz Night",
    date: "Saturday Evenings",
    time: "8:00 PM - 11:00 PM",
    description: "Live jazz performances in the intimate Library Bar & Lounge.",
    location: "Library Bar & Lounge",
    capacity: "40 guests"
  },
  {
    title: "Sunday Brunch Celebration",
    date: "Every Sunday",
    time: "11:00 AM - 3:00 PM",
    description: "Elegant brunch with champagne, live acoustic music, and a lavish spread.",
    location: "Skyline Rooftop Restaurant",
    capacity: "80 guests"
  },
  {
    title: "Cooking Master Class",
    date: "Monthly (First Tuesday)",
    time: "3:00 PM - 6:00 PM",
    description: "Learn advanced culinary techniques directly from our award-winning chef.",
    location: "Chef's Kitchen",
    capacity: "12 guests"
  },
  {
    title: "Art Exhibition Opening",
    date: "Monthly (Third Saturday)",
    time: "6:00 PM - 9:00 PM",
    description: "Celebrate local artists with cocktails and appetizers in our gallery.",
    location: "Heritage Gallery",
    capacity: "60 guests"
  },
  {
    title: "Yoga & Wellness Retreat",
    date: "Seasonal Weekends",
    time: "7:00 AM - 9:00 AM",
    description: "Morning yoga session followed by wellness consultations and healthy breakfast.",
    location: "Wellness Center",
    capacity: "25 guests"
  }
];

export default function Events() {
  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Events & Experiences
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Curated events and special experiences throughout the year
          </p>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
                <div className="flex items-start gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{event.date}</p>
                    <p className="text-xs text-slate-600">{event.time}</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-grow">{event.description}</p>
                
                <div className="space-y-1 text-xs text-slate-600 mb-4 border-t border-slate-200 pt-4">
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Capacity:</strong> {event.capacity}</p>
                </div>
                
                <Button className="w-full">Learn More</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Private Events */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Private Events & Celebrations</h2>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Wedding Receptions</h3>
              <p className="text-slate-600 mb-4">
                Celebrate your special day in one of our elegant venues with our expert event planning team. We handle every detail from catering to décor.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Flexible venue options (30-200 guests)</li>
                <li>✓ Custom catering & bar services</li>
                <li>✓ Professional event coordination</li>
                <li>✓ Wedding night suite included</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Corporate Events</h3>
              <p className="text-slate-600 mb-4">
                From conferences to team-building retreats, we offer comprehensive facilities and services tailored to your corporate needs.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ State-of-the-art meeting facilities</li>
                <li>✓ High-speed internet & tech support</li>
                <li>✓ Customized catering packages</li>
                <li>✓ Group accommodation rates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="text-2xl font-bold">Plan Your Event</h2>
          <p className="mt-4 text-blue-100 mb-8">
            Our event planning team is ready to make your occasion unforgettable
          </p>
          <a
            href="mailto:events@heritagehotel.com"
            className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            Contact Event Planning
          </a>
        </div>
      </div>
    </WebsiteLayout>
  );
}
