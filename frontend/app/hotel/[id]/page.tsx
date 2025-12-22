"use client";
import { useState, useEffect } from "react";
import { WebsiteLayout } from "./WebsiteLayout";
import { BookingWidget, SearchData } from "@/app/components/ui/hotel/BookingWidget";
import { RoomCard } from "@/app/components/ui/hotel/RoomCard";
import { OffersGrid } from "@/app/components/ui/hotel/OffersGrid";
import { ReviewsBlock } from "@/app/components/ui/hotel/ReviewsBlock";
import { MapSection } from "@/app/components/ui/hotel/MapSection";
import { Room, Offer } from '@/app/shared/api';
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Hero } from "@/app/components/ui/hotel/Hero";
import Link from "next/link";

const HERO_IMAGE = 'https://images.pexels.com/photos/6743737/pexels-photo-6743737.jpeg';
const DINING_IMAGE = 'https://images.pexels.com/photos/2291619/pexels-photo-2291619.jpeg';

export default function HotelHome() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch('/api/rooms').then(res => res.json()),
      fetch('/api/offers').then(res => res.json())
    ]).then(([roomsData, offersData]) => {
      setRooms(roomsData.rooms || []);
      setOffers(offersData.offers || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSearch = (searchData: SearchData) => {
    const params = new URLSearchParams({
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString(),
      ...(searchData.roomType && { roomType: searchData.roomType })
    });
    router.push(`/hotel/rooms?${params.toString()}`);
  };

  const handleBookRoom = (roomId: string) => {
    router.push(`/hotel/rooms/${roomId}`);
  };

  return (
    <WebsiteLayout showNav={true}>
      {/* Hero Section */}
      <Hero
        title="Heritage Boutique Hotel - Where History Meets Luxury"
        subtitle="Experience the charm of a historic city with modern comfort. Boutique elegance awaits in our timeless sanctuary beside the riverfront."
        backgroundImage={HERO_IMAGE}
        primaryCta={{ label: "Book Your Stay", href: "#search" }}
        secondaryCta={{ label: "Explore Rooms", href: "/hotel/rooms" }}
        tertiaryCta={{ label: "Learn More", href: "#about" }}
      />

      {/* Search Widget */}
      <section id="search" className="relative -mt-16 z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-7xl">
          <BookingWidget variant="modal" onSearch={handleSearch} />
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Our Signature Rooms
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Thoughtfully designed spaces that blend historic charm with contemporary comfort
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms.slice(0, 3).map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBook={handleBookRoom}
                />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/hotel/rooms"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-slate-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Special Offers
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Exclusive packages and deals for your perfect getaway
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : (
            <OffersGrid offers={offers} />
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                A Legacy of Hospitality
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                For over a century, our historic hotel has welcomed guests from around the world. Nestled on the riverfront in the heart of the city's most charming district, we offer an authentic experience that honors the past while embracing modern luxuries.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Our commitment to personalized service, exceptional cuisine, and timeless elegance makes us the preferred choice for discerning travelers seeking more than just a place to stay—a destination in itself.
              </p>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Read Our Story
                </Link>
              </div>
            </div>
            <div className="relative h-96 bg-slate-200 rounded-lg overflow-hidden">
              <img
                src={DINING_IMAGE}
                alt="Hotel Rooftop Restaurant"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Preview */}
      <section className="bg-slate-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              World-Class Amenities
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need for an unforgettable stay
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🍽️', title: 'Fine Dining', desc: 'Award-winning rooftop restaurant with panoramic views' },
              { icon: '🏊', title: 'Spa & Wellness', desc: 'Full-service spa with traditional treatments' },
              { icon: '📚', title: 'Concierge', desc: '24/7 concierge for personalized recommendations' },
              { icon: '🎭', title: 'Cultural Events', desc: 'Curated local art exhibitions and live performances' }
            ].map((amenity, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{amenity.icon}</div>
                <h3 className="font-semibold text-slate-900 text-lg">{amenity.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{amenity.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/amenities"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Amenities
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Guest Reviews
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              See what our guests have to say about their stays
            </p>
          </div>

          <ReviewsBlock />
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-slate-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Visit Us
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Located in the heart of the historic city district
            </p>
          </div>

          <MapSection />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Experience Historic Luxury?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Book your perfect stay today and discover why guests return to Heritage Boutique Hotel
          </p>
          <button
            onClick={() => router.push('/hotel/rooms')}
            className="mt-8 inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Book Now
          </button>
        </div>
      </section>
    </WebsiteLayout>
  );
}
