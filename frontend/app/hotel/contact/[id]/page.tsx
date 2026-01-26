"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { MapSection } from "@/app/components/ui/hotel/MapSection";
import { WebsiteLayout } from "../../[id]/WebsiteLayout";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to your server
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <WebsiteLayout showNav={true}>
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            We'd love to hear from you. Contact us with any questions or to plan your stay.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="p-6 text-center">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
              <a href="tel:+15551234567" className="text-blue-600 hover:underline">
                +1 (555) 123-4567
              </a>
              <p className="text-xs text-slate-600 mt-2">24/7 Reservations</p>
            </Card>

            <Card className="p-6 text-center">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
              <a href="mailto:reservations@heritagehotel.com" className="text-blue-600 hover:underline">
                reservations@heritagehotel.com
              </a>
              <p className="text-xs text-slate-600 mt-2">Response within 24 hours</p>
            </Card>

            <Card className="p-6 text-center">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Address</h3>
              <p className="text-sm text-slate-600">
                123 Historic Riverfront Lane<br />
                Old Town District
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Hours</h3>
              <p className="text-xs text-slate-600">
                Front Desk: 24/7<br />
                Concierge: 7 AM - 11 PM
              </p>
            </Card>
          </div>

          {/* Contact Form & Map */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="bg-slate-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitted}
                  className="w-full"
                >
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-slate-50 rounded-lg p-6">
              <MapSection />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "How can I make a reservation?",
                a: "You can book directly through our website, call our reservations team at +1 (555) 123-4567, or email reservations@heritagehotel.com. Our team is available 24/7 to assist."
              },
              {
                q: "What is your cancellation policy?",
                a: "Most rates offer free cancellation up to 48 hours before arrival. Some special offers have different terms. Check your booking confirmation for specific details."
              },
              {
                q: "Do you offer airport transfers?",
                a: "Yes! We offer airport transfer services. Please request this during booking or contact the concierge at least 24 hours in advance."
              },
              {
                q: "Are pets allowed?",
                a: "We welcome pets in selected rooms for an additional fee. Please mention this when booking or contact us directly for more information."
              },
              {
                q: "Is breakfast included?",
                a: "Breakfast is complimentary in select room categories. Check your room description or booking confirmation for details."
              },
              {
                q: "How do I contact the concierge?",
                a: "Call the front desk at any time, or email concierge@heritagehotel.com. They're available from 7 AM to 11 PM daily."
              }
            ].map((faq, idx) => (
              <Card key={idx} className="p-4">
                <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-slate-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
