"use client";
import { DashboardLayout } from "@/app/Layout/DashboardLayout";
import { Card } from "@/components/ui/card";

export default function Bookings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
        <Card className="p-6">
          <p className="text-muted-foreground">Bookings page coming soon...</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
