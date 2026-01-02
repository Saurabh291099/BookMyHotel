import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MapSectionProps {
  address?: string;
  phone?: string;
  email?: string;
  hoursOfOperation?: {
    day: string;
    hours: string;
  }[];
  latitude?: number;
  longitude?: number;
  mapEmbedUrl?: string;
}

export function MapSection({
  address = '123 Historic Riverfront Lane, Old Town District',
  phone = '+1 (555) 123-4567',
  email = 'reservations@heritagehotel.com',
  hoursOfOperation = [
    { day: 'Monday - Friday', hours: '6:00 AM - 11:00 PM' },
    { day: 'Saturday - Sunday', hours: '7:00 AM - Midnight' },
    { day: '24/7 Front Desk', hours: 'Available' }
  ],
  latitude = 40.7128,
  longitude = -74.0060,
  mapEmbedUrl
}: MapSectionProps) {
  const defaultMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-4">
          {/* Address */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              <div>
                <p className="font-semibold text-slate-900">Location</p>
                <p className="mt-1 text-sm text-slate-600">{address}</p>
              </div>
            </div>
          </Card>

          {/* Phone */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              <div>
                <p className="font-semibold text-slate-900">Phone</p>
                <a href={`tel:${phone}`} className="mt-1 text-sm text-blue-600 hover:underline">
                  {phone}
                </a>
              </div>
            </div>
          </Card>

          {/* Email */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <a href={`mailto:${email}`} className="mt-1 text-sm text-blue-600 hover:underline">
                  {email}
                </a>
              </div>
            </div>
          </Card>

          {/* Hours */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
              <div className="w-full">
                <p className="font-semibold text-slate-900 mb-2">Hours</p>
                <div className="space-y-1">
                  {hoursOfOperation.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="text-slate-600">{item.day}</p>
                      <p className="text-slate-500 text-xs">{item.hours}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <div className="h-96 w-full overflow-hidden rounded-lg border border-slate-200">
            <iframe
              title="Hotel Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              src={mapEmbedUrl || defaultMapUrl}
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
