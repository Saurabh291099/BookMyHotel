"use client";
import { useState, useEffect } from "react";
import { WebsiteLayout } from "../../[id]/WebsiteLayout";
import { Offer } from '@/app/shared/api';
import { Skeleton } from "@/components/ui/skeleton";
import { OffersGrid } from "@/app/components/ui/hotel/OffersGrid";

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const response = await fetch('/api/offers');
        const data = await response.json();
        setOffers(data.offers || []);
      } catch (error) {
        console.error('Error loading offers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Special Offers
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Exclusive packages and deals designed for the perfect getaway
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          ) : (
            <OffersGrid offers={offers} />
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How Our Offers Work</h2>
          <div className="space-y-4 text-slate-600">
            <p>
              Our special offers are carefully curated to provide exceptional value. Each package includes premium amenities and exclusive experiences not available through standard bookings.
            </p>
            <p>
              All offers are subject to availability and blackout dates. Terms and conditions apply. For more information or to customize an offer, contact our reservations team at <a href="mailto:reservations@heritagehotel.com" className="text-blue-600 hover:underline">reservations@heritagehotel.com</a>.
            </p>
            <p>
              Early bird discounts are available for bookings made 30 days in advance. Multi-night stays receive additional discounts automatically applied at checkout.
            </p>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
