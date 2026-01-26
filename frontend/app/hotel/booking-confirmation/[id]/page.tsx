"use client";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, MapPin, Phone, Mail } from "lucide-react";
import { WebsiteLayout } from "../../[id]/WebsiteLayout";

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const confirmationId = searchParams.get('id') || 'CONF-' + Date.now();

  // Mock booking data - in a real app, this would come from the API response
  const booking = {
    confirmationId,
    status: 'confirmed',
    bookingDate: new Date().toISOString(),
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    nights: 3,
    roomName: 'Deluxe City View Suite',
    roomPrice: 350,
    totalPrice: 1050,
    guestName: 'John Doe',
    guestEmail: 'john@example.com',
    guestPhone: '+1 (555) 123-4567'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const message = `I just booked at Heritage Boutique Hotel! Confirmation: ${confirmationId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Heritage Boutique Hotel Booking',
        text: message,
        url: window.location.href
      });
    }
  };

  return (
    <WebsiteLayout showNav={true}>
      {/* Success Message */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Booking Confirmed!
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Your reservation at Heritage Boutique Hotel has been successfully confirmed.
          </p>
        </div>
      </div>

      {/* Confirmation Details */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Confirmation Number */}
          <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-slate-50">
            <p className="text-sm font-medium text-slate-600">Confirmation Number</p>
            <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">{booking.confirmationId}</p>
            <p className="text-xs text-slate-600 mt-2">
              A confirmation email has been sent to {booking.guestEmail}
            </p>
          </Card>

          {/* Booking Summary */}
          <div className="grid gap-6 sm:grid-cols-2 mb-8">
            {/* Guest Info */}
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Guest Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Name</p>
                  <p className="font-medium text-slate-900">{booking.guestName}</p>
                </div>
                <div>
                  <p className="text-slate-600">Email</p>
                  <p className="font-medium text-slate-900">{booking.guestEmail}</p>
                </div>
                <div>
                  <p className="text-slate-600">Phone</p>
                  <p className="font-medium text-slate-900">{booking.guestPhone}</p>
                </div>
              </div>
            </Card>

            {/* Stay Details */}
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Stay Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Check-In</p>
                  <p className="font-medium text-slate-900">
                    {new Date(booking.checkIn).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Check-Out</p>
                  <p className="font-medium text-slate-900">
                    {new Date(booking.checkOut).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Duration</p>
                  <p className="font-medium text-slate-900">{booking.nights} nights</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Room Details */}
          <Card className="p-6 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">Room Details</h3>
            <div className="border-t border-slate-200 pt-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium text-slate-900">{booking.roomName}</p>
                  <p className="text-sm text-slate-600 mt-1">Deluxe accommodation with city views</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900">${booking.roomPrice}</p>
                  <p className="text-xs text-slate-600">per night</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Price Summary */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-slate-50">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">${booking.roomPrice} × {booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
                <span className="font-medium text-slate-900">${booking.nights * booking.roomPrice}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between">
                <span className="font-semibold text-slate-900">Total Price</span>
                <span className="text-2xl font-bold text-blue-600">${booking.totalPrice}</span>
              </div>
              <p className="text-xs text-slate-600 pt-2">
                ✓ Taxes and fees included
              </p>
            </div>
          </Card>

          {/* Important Information */}
          <Card className="p-6 mb-8 border-l-4 border-l-blue-500">
            <h3 className="font-semibold text-slate-900 mb-4">Important Information</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Check-in is available from 3:00 PM</li>
              <li>✓ Check-out is at 11:00 AM</li>
              <li>✓ Your confirmation email contains your booking reference</li>
              <li>✓ You can modify or cancel your booking up to 48 hours before arrival</li>
              <li>✓ Early check-in/late check-out can be arranged subject to availability</li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button onClick={handlePrint} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Print Confirmation
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share Booking
            </Button>
            <Button onClick={() => navigate('/')} className="flex-1">
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">What's Next?</h2>
          
          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-slate-900 mb-2">Confirmation Email</h3>
              <p className="text-sm text-slate-600">Check your email for your booking details and hotel information</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">✈️</div>
              <h3 className="font-semibold text-slate-900 mb-2">Arrange Transfers</h3>
              <p className="text-sm text-slate-600">Contact our concierge to arrange airport transfers or other transportation</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="font-semibold text-slate-900 mb-2">Plan Activities</h3>
              <p className="text-sm text-slate-600">Browse our local guide and special experiences to plan your stay</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Hotel Contact */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Need Help?</h2>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <a href="tel:+15551234567" className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
              <Phone className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-slate-900">Call Us</p>
              <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
            </a>

            <a href="mailto:reservations@heritagehotel.com" className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
              <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-slate-900">Email</p>
              <p className="text-sm text-slate-600">reservations@heritagehotel.com</p>
            </a>

            <a href="/contact" className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
              <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-slate-900">Contact Page</p>
              <p className="text-sm text-slate-600">Visit our contact page</p>
            </a>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
