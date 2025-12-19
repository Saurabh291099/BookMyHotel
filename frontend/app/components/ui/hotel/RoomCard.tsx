import { Room } from '@/app/shared/api';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, MapPin } from "lucide-react";
import Link from 'next/link';

interface RoomCardProps {
  room: Room & { availableCount?: number };
  onBook?: (roomId: string) => void;
}

export function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img
          src={room.images[0]}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {room.availableCount && room.availableCount > 0 && (
          <Badge className="absolute right-3 top-3 bg-green-500">
            {room.availableCount} Available
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {room.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(room.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-600">
            {room.rating} ({room.reviews} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">
          {room.description}
        </p>

        {/* Amenities Preview */}
        <div className="mt-4 flex flex-wrap gap-1">
          {room.amenities.slice(0, 3).map((amenity, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{room.amenities.length - 3} more
            </Badge>
          )}
        </div>

        {/* Max Guests */}
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <Users className="h-4 w-4" />
          <span>Up to {room.maxGuests} guests</span>
        </div>

        {/* Price and CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              ${room.price}
            </div>
            <p className="text-xs text-slate-500">per night</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href={`/rooms/${room.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            {onBook && (
              <Button
                size="sm"
                onClick={() => onBook(room.id)}
              >
                Book Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
