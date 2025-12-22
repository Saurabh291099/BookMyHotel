"use client";
import { useState, useEffect } from "react";
import { WebsiteLayout } from "../WebsiteLayout";
import { SearchResponse, Room } from "@/app/shared/api";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookingWidget,
  SearchData,
} from "@/app/components/ui/hotel/BookingWidget";
import { RoomCard } from "@/app/components/ui/hotel/RoomCard";
import { useSearchParams } from "next/navigation";
export default function Rooms() {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState<(Room & { availableCount: number })[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = searchParams.get("guests") ?? "2";
  const roomType = searchParams.get("roomType") ?? "";

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      try {
        if (checkIn && checkOut && guests) {
          const params = new URLSearchParams({
            checkIn,
            checkOut,
            guests,
            ...(roomType && { roomType }),
          });
          const response = await fetch(`/api/search?${params}`);
          const data: SearchResponse = await response.json();
          setRooms(data.rooms || []);
        } else {
          const response = await fetch("/api/rooms");
          const data = await response.json();
          setRooms(data.rooms || []);
        }
      } catch (error) {
        console.error("Error loading rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, [checkIn, checkOut, guests, roomType]);

  const handleSearch = (searchData: SearchData) => {
    const params = new URLSearchParams({
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString(),
      ...(searchData.roomType && { roomType: searchData.roomType }),
    });
    router.push(`/hotel/rooms?${params.toString()}`);
  };

  const handleBookRoom = (roomId: string) => {
    router.push(`/hotel/rooms/${roomId}`);
  };

  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Our Rooms & Suites
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Discover our collection of thoughtfully designed accommodations
          </p>
        </div>
      </div>

      {/* Search Widget */}
      <BookingWidget variant="compact" onSearch={handleSearch} />

      {/* Filters & Results */}
      <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Search Summary */}
          {checkIn && checkOut && (
            <div className="mb-8 rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-slate-600">
                Showing rooms available for {guests} guest
                {guests !== "1" ? "s" : ""} from{" "}
                {new Date(checkIn).toLocaleDateString()} to{" "}
                {new Date(checkOut).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate-600">
              Found <strong>{rooms.length}</strong> room
              {rooms.length !== 1 ? "s" : ""} matching your criteria
            </p>
          </div>

          {/* Room Grid */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} onBook={handleBookRoom} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-slate-600">
                No rooms available for your selected dates. Please try different
                dates.
              </p>
            </div>
          )}
        </div>
      </div>
    </WebsiteLayout>
  );
}
