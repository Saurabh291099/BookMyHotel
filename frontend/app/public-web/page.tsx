import { Button } from "@/components/ui/button";
import Navbar from "../organisms/navbar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function PublicWeb() {
  const featuresCard = [
    {
      icon: "",
      title: "Booking Engine",
      description:
        "Integrated calendar and booking system for real-time reservations",
    },
    {
      icon: "",
      title: "Dashboard",
      description: "Monitor occupancy, revenue, and bookings at a glance",
    },
    {
      icon: "",
      title: "Payments",
      description: "Accept multiple payment methods securely and instantly",
    },
    {
      icon: "",
      title: "Staff Management",
      description: "Assign roles and manage your team efficiently",
    },
  ];

  const howWorksCard = [
    {
      icon: "",
      title: "Sign Up",
      description:
        "Create your account and basic hotel information",
    },
    {
      icon: "",
      title: "Customize",
      description: "Add rooms, pricing, and photos to your website",
    },
    {
      icon: "",
      title: "Go Live",
      description: "Start accepting bookings from guests worldwide",
    },
  ];
  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-slate-50 h-full">
        <div className="grid w-full h-full items-center justify-center">
          <div className="flex flex-col items-center justify-start gap-6 max-w-2xl px-4 text-center">
            <text className="border rounded-full p-2 px-6 text-blue-600 bg-blue-50 font-semibold bg-opacity-1">
              🎉 Join 1000+ hotels already using HotelHub
            </text>

            <h1 className="text-5xl font-bold">
              Create Your Hotel Website{" "}
              <span className="text-blue-700">in Minutes</span>
            </h1>
            <p>
              A complete platform for hotel owners to build websites, manage
              bookings, and grow their business. No coding required.
            </p>
            <Button>Get Started free</Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white h-auto py-16">
        <div className="w-full text-center max-w-7xl max-auto px-4">
          <h1 className="text-4xl font-bold">
            Powerful Features for Hotel Owners
          </h1>
          <p className="mt-3">
            Everything you need to run your hotel efficiently and increase
            bookings
          </p>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16">
            {featuresCard.map((data, i) => {
              return (
                <Card
                  className="w-full h-full min-h-[160px] flex flex-col text-start"
                  key={i}
                >
                  <CardHeader>
                    <CardTitle>{data.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardTitle className="mb-2">{data.title}</CardTitle>
                    <CardDescription>{data.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>



      <div className="flex items-center justify-center bg-slate-50 h-auto py-16">
        <div className="w-full text-center max-w-7xl max-auto px-4">
          <h1 className="text-4xl font-bold">
            How It Works
          </h1>
          <p className="mt-3">
            Everything you need to run your hotel efficiently and increase
            bookings
          </p>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-16">
            {howWorksCard.map((data, i) => {
              return (
                <Card
                  className="w-full h-full min-h-[160px] flex flex-col text-start"
                  key={i}
                >
                  <CardHeader>
                    <CardTitle>{data.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardTitle className="mb-2">{data.title}</CardTitle>
                    <CardDescription>{data.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
