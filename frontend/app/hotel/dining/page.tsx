"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WebsiteLayout } from "@/app/Layout/WebsiteLayout";

const DINING_IMAGE = 'https://images.pexels.com/photos/2291619/pexels-photo-2291619.jpeg';

const restaurants = [
  {
    name: "Skyline Rooftop Restaurant",
    description: "Our flagship fine dining establishment offering contemporary cuisine with panoramic city views. Award-winning chef creates seasonal menus highlighting local and international ingredients.",
    specialty: "Contemporary Fine Dining",
    hours: "Dinner: 6:00 PM - 11:00 PM | Sunday Brunch: 11:00 AM - 3:00 PM",
    seating: 80,
    dresscode: "Smart Casual (Jacket Recommended for Men)"
  },
  {
    name: "Riverside Café & Bar",
    description: "Casual all-day dining with stunning riverfront views. From morning cappuccinos to evening cocktails, our café offers a relaxed atmosphere perfect for any occasion.",
    specialty: "All-Day Casual Dining",
    hours: "6:00 AM - Midnight Daily",
    seating: 60,
    dresscode: "Casual"
  },
  {
    name: "Library Bar & Lounge",
    description: "An intimate setting surrounded by curated literary collections. Expert mixologists craft classic and innovative cocktails in this sophisticated retreat.",
    specialty: "Craft Cocktails & Wine",
    hours: "4:00 PM - Midnight Daily",
    seating: 40,
    dresscode: "Smart Casual"
  }
];

export default function Dining() {
  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="relative h-96 bg-slate-200 overflow-hidden">
        <img
          src={DINING_IMAGE}
          alt="Rooftop Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Culinary Excellence
              </h1>
              <p className="mt-4 text-lg text-slate-200 max-w-2xl">
                Experience award-winning cuisine in distinctive settings, from fine dining with city views to casual riverside cafés
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            {restaurants.map((restaurant, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 sm:p-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{restaurant.name}</h2>
                      <p className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {restaurant.specialty}
                      </p>
                      <p className="mt-4 text-slate-600 leading-relaxed">
                        {restaurant.description}
                      </p>
                      <div className="mt-6 space-y-2 text-sm">
                        <div>
                          <p className="font-semibold text-slate-900">Hours</p>
                          <p className="text-slate-600">{restaurant.hours}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Dress Code</p>
                          <p className="text-slate-600">{restaurant.dresscode}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Seating</p>
                          <p className="text-slate-600">{restaurant.seating} guests</p>
                        </div>
                      </div>
                      <Button className="mt-6">Make a Reservation</Button>
                    </div>
                    <div className="h-64 bg-slate-200 rounded-lg overflow-hidden hidden sm:block">
                      <img
                        src={DINING_IMAGE}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Special Experiences */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Special Dining Experiences</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Chef's Tasting Menu",
                description: "A curated 7-course journey through culinary artistry with optional wine pairings"
              },
              {
                title: "Private Dining",
                description: "Exclusive restaurant buyout or private room for special occasions and celebrations"
              },
              {
                title: "Cooking Classes",
                description: "Learn culinary techniques from our award-winning chefs in intimate group settings"
              },
              {
                title: "Wine Tasting Events",
                description: "Monthly sommelier-led tastings featuring wines from around the world"
              },
              {
                title: "Seasonal Festivals",
                description: "Theme-based dining celebrations highlighting regional cuisines and traditions"
              },
              {
                title: "In-Room Fine Dining",
                description: "Private chef-prepared meals delivered to your suite for ultimate luxury"
              }
            ].map((experience, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="font-bold text-slate-900 text-lg">{experience.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{experience.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Plan Your Dining Experience</h2>
          <p className="text-slate-600 mb-6">
            Contact our concierge to make reservations or arrange special dining experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Call Reservations
            </a>
            <a
              href="mailto:dining@heritagehotel.com"
              className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
