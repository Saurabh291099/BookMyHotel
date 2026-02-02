"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, Calendar, DollarSign, Users } from "lucide-react";

const chartData = [
  { name: "Mon", bookings: 12, revenue: 4200 },
  { name: "Tue", bookings: 19, revenue: 6800 },
  { name: "Wed", bookings: 15, revenue: 5200 },
  { name: "Thu", bookings: 22, revenue: 7800 },
  { name: "Fri", bookings: 28, revenue: 9800 },
  { name: "Sat", bookings: 32, revenue: 11200 },
  { name: "Sun", bookings: 25, revenue: 8900 },
];

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 73000 },
  { month: "Jun", revenue: 85000 },
];

export default function DashboardHome({params}: {params: {id: string}}) {
  return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your hotel performance overview
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: TrendingUp,
              label: "Occupancy Rate",
              value: "78%",
              change: "+5.2%",
            },
            {
              icon: Calendar,
              label: "Today's Bookings",
              value: "12",
              change: "+2 from yesterday",
            },
            {
              icon: DollarSign,
              label: "This Month Revenue",
              value: "₹85,000",
              change: "+12.5%",
            },
            {
              icon: Users,
              label: "Total Guests",
              value: "324",
              change: "+18 this month",
            },
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {kpi.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {kpi.value}
                    </p>
                    <p className="text-xs text-green-600 mt-2">{kpi.change}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Weekly Performance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Revenue Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Recent Bookings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Guest Name
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Check-in
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Check-out
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Rajesh Kumar",
                    checkIn: "2024-01-15",
                    checkOut: "2024-01-18",
                    amount: "₹12,000",
                    status: "Confirmed",
                  },
                  {
                    name: "Priya Singh",
                    checkIn: "2024-01-16",
                    checkOut: "2024-01-19",
                    amount: "₹15,000",
                    status: "Confirmed",
                  },
                  {
                    name: "Vikram Patel",
                    checkIn: "2024-01-17",
                    checkOut: "2024-01-20",
                    amount: "₹18,000",
                    status: "Pending",
                  },
                ].map((booking, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-slate-50">
                    <td className="py-3 px-4">{booking.name}</td>
                    <td className="py-3 px-4">{booking.checkIn}</td>
                    <td className="py-3 px-4">{booking.checkOut}</td>
                    <td className="py-3 px-4 font-semibold">{booking.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
  );
}
