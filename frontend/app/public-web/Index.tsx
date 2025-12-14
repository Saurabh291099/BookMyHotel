import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  CreditCard,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { Layout } from "../Layout/Layout";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br min-h-screen flex items-center justify-center bg-slate-50 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
              <p className="text-sm font-semibold text-primary">
                🎉 Join 1000+ hotels already using HotelHub
              </p>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Create Your Hotel Website
            <span className="block text-primary">in Minutes</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            A complete platform for hotel owners to build websites, manage bookings,
            and grow their business. No coding required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/signup">
              <Button size="lg" className="text-base px-8">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8">
              Watch Demo
            </Button>
          </div>

          {/* <div className="bg-white rounded-2xl border border-border shadow-sm p-1 inline-block">
            <div className="bg-slate-100 rounded-xl h-64 sm:h-80 md:h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Hotel Dashboard Preview</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Hotel Owners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run your hotel efficiently and increase
              bookings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: "Booking Engine",
                description:
                  "Integrated calendar and booking system for real-time reservations",
              },
              {
                icon: BarChart3,
                title: "Dashboard",
                description:
                  "Monitor occupancy, revenue, and bookings at a glance",
              },
              {
                icon: CreditCard,
                title: "Payments",
                description:
                  "Accept multiple payment methods securely and instantly",
              },
              {
                icon: Users,
                title: "Staff Management",
                description:
                  "Assign roles and manage your team efficiently",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-16 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your account and basic hotel information",
              },
              {
                step: "2",
                title: "Customize",
                description: "Add rooms, pricing, and photos to your website",
              },
              {
                step: "3",
                title: "Go Live",
                description: "Start accepting bookings from guests worldwide",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-1/2 h-1 bg-primary/20" />
                )}
                <div className="bg-white rounded-xl p-8 border border-border h-full">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your hotel needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "29",
                description: "Perfect for small hotels",
                features: [
                  "Up to 20 rooms",
                  "Basic booking engine",
                  "Email support",
                  "Single user account",
                  "Basic analytics",
                ],
              },
              {
                name: "Pro",
                price: "79",
                description: "For growing hotels",
                features: [
                  "Up to 100 rooms",
                  "Advanced booking engine",
                  "Priority support",
                  "Staff management",
                  "Advanced analytics",
                  "Payment integration",
                  "Custom domain",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large hotel chains",
                features: [
                  "Unlimited rooms",
                  "Custom features",
                  "Dedicated support",
                  "API access",
                  "Advanced security",
                  "Custom integrations",
                  "Multi-property support",
                ],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl border relative ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 shadow-lg scale-105"
                    : "border-border bg-white"
                } p-8 transition`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground text-sm">/month</span>
                  )}
                </div>

                <Button
                  className="w-full mb-8"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/auth/signup">Get Started</Link>
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-16 text-center">
            Loved by Hotel Owners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Owner, Sunrise Hotel",
                testimonial:
                  "HotelHub increased our bookings by 40% in the first month. Amazing platform!",
              },
              {
                name: "Priya Singh",
                role: "Manager, Palace Resort",
                testimonial:
                  "The booking engine is intuitive and our guests love the seamless experience.",
              },
              {
                name: "Vikram Patel",
                role: "Owner, Coastal Paradise",
                testimonial:
                  "Customer support is exceptional. They helped us set up everything in hours.",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                </div>
                <p className="text-foreground mb-4">{testimonial.testimonial}</p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Grow Your Hotel Business?
          </h2>
          <p className="text-lg mb-8 text-blue-50">
            Join thousands of hotels already using HotelHub to manage their
            business
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-slate-100 text-base px-8"
            >
              Create Your Hotel Website Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
