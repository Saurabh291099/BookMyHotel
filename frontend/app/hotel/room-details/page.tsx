"use client";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WebsiteLayout } from "@/app/Layout/WebsiteLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Room } from '@/app/shared/api';
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";
import { GalleryCarousel } from "@/app/components/ui/hotel/GalleryCarousel";

export default function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const response = await fetch(`/api/rooms/${id}`);
        if (response.ok) {
          const data: Room = await response.json();
          setRoom(data);
        }
      } catch (error) {
        console.error('Error loading room:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadRoom();
    }
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!room || !bookingData.checkIn || !bookingData.checkOut) return;

    setBookingLoading(true);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room.id,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: 1,
          guestName: bookingData.guestName,
          guestEmail: bookingData.guestEmail,
          guestPhone: bookingData.guestPhone,
          specialRequests: bookingData.specialRequests
        })
      });

      if (response.ok) {
        const confirmation = await response.json();
        navigate(`/booking-confirmation?id=${confirmation.confirmationId}`);
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <WebsiteLayout showNav={true}>
        <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Skeleton className="h-96 w-full mb-8" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  if (!room) {
    return (
      <WebsiteLayout showNav={true}>
        <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-2xl font-bold text-slate-900">Room not found</h1>
            <p className="mt-2 text-slate-600">
              The room you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/rooms')} className="mt-4">
              Back to Rooms
            </Button>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  const nights = bookingData.checkIn && bookingData.checkOut
    ? Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = nights > 0 ? room.price * nights : 0;

  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="bg-slate-900 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Button variant="ghost" onClick={() => navigate('/rooms')} className="text-white hover:bg-slate-800 mb-4">
            ← Back to Rooms
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{room.name}</h1>
          <p className="mt-2 text-slate-300">${room.price} per night</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <GalleryCarousel images={room.images} title={room.name} support360={true} />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900">About this room</h2>
                <p className="mt-4 text-slate-600 leading-relaxed text-lg">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Booking Details
                </h3>

                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Check-in */}
                  <div>
                    <Label htmlFor="checkin">Check-in Date</Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  {/* Check-out */}
                  <div>
                    <Label htmlFor="checkout">Check-out Date</Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  {/* Guest Info */}
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={bookingData.guestName}
                      onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.guestEmail}
                      onChange={(e) => setBookingData({ ...bookingData, guestEmail: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.guestPhone}
                      onChange={(e) => setBookingData({ ...bookingData, guestPhone: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <textarea
                      id="requests"
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      rows={3}
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>

                  {/* Price Summary */}
                  {nights > 0 && (
                    <div className="space-y-2 border-t border-slate-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">${room.price} × {nights} night{nights !== 1 ? 's' : ''}</span>
                        <span className="font-semibold text-slate-900">${totalPrice}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-900">Total</span>
                          <span className="text-xl font-bold text-blue-600">${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={bookingLoading || !bookingData.checkIn || !bookingData.checkOut}
                    className="w-full mt-6"
                    size="lg"
                  >
                    {bookingLoading ? 'Booking...' : 'Complete Booking'}
                  </Button>
                </form>

                {/* Room Capacity */}
                <div className="mt-6 p-4 rounded-lg bg-slate-50">
                  <p className="text-sm text-slate-600">
                    <strong>Maximum Capacity:</strong> {room.maxGuests} guest{room.maxGuests !== 1 ? 's' : ''}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
