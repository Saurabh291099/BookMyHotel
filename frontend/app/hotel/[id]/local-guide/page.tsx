"use client";
import { WebsiteLayout } from "../WebsiteLayout";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const attractions = [
  {
    category: "Historic Landmarks",
    items: [
      { name: "Cathedral of Saint James", distance: "0.2 km", type: "Religious Site" },
      { name: "Old Town Square", distance: "0.3 km", type: "Historic Plaza" },
      { name: "Medieval City Walls", distance: "0.5 km", type: "Historic Architecture" },
      { name: "Royal Palace Ruins", distance: "0.8 km", type: "Historic Site" }
    ]
  },
  {
    category: "Museums & Galleries",
    items: [
      { name: "City History Museum", distance: "0.4 km", type: "Museum" },
      { name: "Contemporary Art Gallery", distance: "0.6 km", type: "Art Gallery" },
      { name: "Local Crafts Museum", distance: "0.7 km", type: "Museum" },
      { name: "Photography Exhibition Center", distance: "0.9 km", type: "Gallery" }
    ]
  },
  {
    category: "Dining & Shopping",
    items: [
      { name: "Riverside Market", distance: "0.1 km", type: "Market" },
      { name: "Antique District", distance: "0.4 km", type: "Shopping" },
      { name: "Artisan Food Hall", distance: "0.3 km", type: "Food Market" },
      { name: "Designer Boutique Row", distance: "0.6 km", type: "Shopping" }
    ]
  },
  {
    category: "Parks & Recreation",
    items: [
      { name: "Riverside Park", distance: "0.1 km", type: "Park" },
      { name: "Botanical Gardens", distance: "1.2 km", type: "Garden" },
      { name: "Historic Walking Trail", distance: "0.5 km", type: "Trail" },
      { name: "Waterfront Promenade", distance: "0.2 km", type: "Recreation" }
    ]
  }
];

export default function LocalGuide() {
  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Local Guide
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Discover the hidden gems and must-see attractions near Heritage Boutique Hotel
          </p>
        </div>
      </div>

      {/* Neighborhoods */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore the City</h2>
          
          <div className="space-y-12">
            {attractions.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-slate-900 mb-6">{section.category}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item, itemIdx) => (
                    <Card key={itemIdx} className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.type}</p>
                          <p className="text-sm text-blue-600 mt-2">📍 {item.distance} away</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Neighborhood Guides */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Neighborhood Highlights</h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                name: "The Riverfront District",
                description: "Waterfront promenades, galleries, and fine dining restaurants. Perfect for evening strolls and romantic dinners.",
                highlights: ["River walks", "Art galleries", "Restaurants", "River cruises"]
              },
              {
                name: "Old Town Historic Quarter",
                description: "Cobblestone streets, historic architecture, and charming cafés. Experience the city's medieval past.",
                highlights: ["Historic sites", "Museums", "Cathedrals", "Traditional markets"]
              },
              {
                name: "Arts & Culture District",
                description: "Contemporary art galleries, theaters, and cultural institutions. The heartbeat of the city's creative scene.",
                highlights: ["Art galleries", "Theaters", "Music venues", "Creative studios"]
              },
              {
                name: "Market & Food Quarter",
                description: "Local markets, food halls, and artisan shops. Discover regional delicacies and crafts.",
                highlights: ["Food markets", "Artisan shops", "Street food", "Local crafts"]
              }
            ].map((neighborhood, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{neighborhood.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{neighborhood.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-900">Highlights:</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.highlights.map((highlight, hIdx) => (
                      <span key={hIdx} className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Concierge Services */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Personalized City Experiences</h2>
          <p className="text-slate-600 mb-6">
            Our concierge team offers curated city tours, restaurant reservations, and exclusive experiences tailored to your interests.
          </p>
          <a
            href="mailto:concierge@heritagehotel.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Request a City Experience
          </a>
        </div>
      </div>

      {/* Day Trip Ideas */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Day Trip Ideas</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Vineyard Tours", distance: "30 km", duration: "Full day" },
              { title: "Mountain Hiking", distance: "25 km", duration: "4-6 hours" },
              { title: "Lake District Cruise", distance: "40 km", duration: "Full day" },
              { title: "Coastal Village Visit", distance: "35 km", duration: "Full day" },
              { title: "Historic Castle Tour", distance: "20 km", duration: "3-4 hours" },
              { title: "Local Farm Experience", distance: "15 km", duration: "3 hours" }
            ].map((trip, idx) => (
              <Card key={idx} className="p-4">
                <h3 className="font-bold text-slate-900">{trip.title}</h3>
                <p className="text-xs text-slate-600 mt-2">📍 {trip.distance} from hotel</p>
                <p className="text-xs text-slate-600">⏱️ {trip.duration}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
