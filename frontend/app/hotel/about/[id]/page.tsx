import { Card } from "@/components/ui/card";
import { WebsiteLayout } from "../../[id]/WebsiteLayout";

const HERO_IMAGE = 'https://images.pexels.com/photos/6743737/pexels-photo-6743737.jpeg';

export default function About() {
  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Over a century of hospitality, elegance, and unforgettable memories
          </p>
        </div>
      </div>

      {/* Main Story */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">A Legacy of Excellence</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Founded in 1923, Heritage Boutique Hotel has been a beacon of elegance and comfort for nearly a century. What began as the personal residence of a prominent merchant family transformed into one of the city's most distinguished hotels.
                </p>
                <p>
                  Our hotel sits majestically on the historic riverfront, embodying the architectural grandeur of our era while embracing modern amenities and services. Every detail—from the original marble staircases to the contemporary suites—reflects our commitment to preserving the past while creating tomorrow's memories.
                </p>
                <p>
                  Through decades of change, we have remained dedicated to the principles that define us: exceptional service, authentic charm, and the belief that travel should transform the soul.
                </p>
              </div>
            </div>
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src={HERO_IMAGE}
                alt="Heritage Boutique Hotel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Journey</h2>
          
          <div className="space-y-8">
            {[
              { year: "1923", title: "The Beginning", description: "Heritage House opens as a luxurious private residence, showcasing Belle Époque architecture." },
              { year: "1945", title: "Transformation", description: "Converted into a boutique hotel serving international travelers seeking authentic hospitality." },
              { year: "1967", title: "Renaissance", description: "Complete renovation preserves historic charm while introducing modern amenities." },
              { year: "1995", title: "Digital Age", description: "Hotel modernized with contemporary technology while maintaining cultural heritage." },
              { year: "2010", title: "Restoration", description: "Major restoration project returns the hotel to its original grandeur with sustainable practices." },
              { year: "2024", title: "The Present", description: "Heritage Boutique Hotel continues to set the standard for luxury, authenticity, and exceptional service." }
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  {idx < 5 && <div className="w-1 h-20 bg-blue-200 mt-2" />}
                </div>
                <div className="pb-8">
                  <p className="text-sm font-semibold text-blue-600">{milestone.year}</p>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{milestone.title}</h3>
                  <p className="text-slate-600 mt-2">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Values</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Authentic Hospitality",
                description: "We believe in genuine connections. Every guest is treated as family, with personalized attention to their needs."
              },
              {
                title: "Heritage & Preservation",
                description: "We honor our historic roots while embracing innovation, creating a bridge between past and future."
              },
              {
                title: "Excellence in Every Detail",
                description: "From service to cuisine, we maintain the highest standards in every aspect of the guest experience."
              },
              {
                title: "Sustainability",
                description: "We're committed to environmental responsibility, ensuring our legacy benefits future generations."
              },
              {
                title: "Community Connection",
                description: "We actively support local artisans, restaurants, and cultural institutions that make our city vibrant."
              },
              {
                title: "Continuous Improvement",
                description: "We listen to our guests and constantly evolve to exceed expectations while maintaining our character."
              }
            ].map((value, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Leadership Team</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Our experienced team combines decades of hospitality expertise with a passion for creating unforgettable experiences.
          </p>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Margaret von Neumann", title: "General Manager" },
              { name: "Claude Beaumont", title: "Executive Chef" },
              { name: "Sarah Mitchell", title: "Director of Guest Services" },
              { name: "James Chen", title: "Head of Operations" }
            ].map((member, idx) => (
              <Card key={idx} className="p-4 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-600">{member.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Recognition & Awards</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "⭐ 5-Star Award (International Rating)",
              "🏆 Best Boutique Hotel 2023",
              "👨‍🍳 Michelin-Recommended Restaurant",
              "🌱 Green Hospitality Leader",
              "💎 Luxury Travel Award 2022",
              "🎭 Cultural Heritage Award",
              "🛎️ Best Guest Service 2023",
              "🏛️ Historic Preservation Award"
            ].map((award, idx) => (
              <Card key={idx} className="p-4 text-center">
                <p className="text-sm font-semibold text-slate-900">{award}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
