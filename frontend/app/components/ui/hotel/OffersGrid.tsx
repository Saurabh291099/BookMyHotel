
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Calendar } from "lucide-react";
import { Offer } from "@/app/shared/api";

interface OffersGridProps {
  offers: Offer[];
  onSelect?: (offerId: string) => void;
}

export function OffersGrid({ offers, onSelect }: OffersGridProps) {
  if (!offers.length) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No special offers available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <Card key={offer.id} className="overflow-hidden transition-all hover:shadow-lg">
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
            {/* Discount Badge */}
            <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-lg bg-orange-500 px-4 py-2 font-bold">
              <Zap className="h-4 w-4" />
              {offer.discount}% OFF
            </div>

            {/* Title */}
            <h3 className="pr-20 text-lg font-bold sm:text-xl">
              {offer.title}
            </h3>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {offer.description}
            </p>

            {/* Valid Dates */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="h-4 w-4" />
              <span>
                Valid {new Date(offer.validFrom).toLocaleDateString()} -{" "}
                {new Date(offer.validUntil).toLocaleDateString()}
              </span>
            </div>

            {/* Room Types */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-slate-600">Available for:</p>
              <div className="flex flex-wrap gap-1">
                {offer.roomTypes.map((roomType) => {
                  const roomNames: Record<string, string> = {
                    '1': 'Deluxe City View',
                    '2': 'Romantic River View',
                    '3': 'Family Suite'
                  };
                  return (
                    <Badge key={roomType} variant="secondary" className="text-xs">
                      {roomNames[roomType] || `Room ${roomType}`}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={() => onSelect?.(offer.id)}
              className="mt-6 w-full"
            >
              Learn More
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
