"use client";
import { Card } from "@/components/ui/card";
import { DashboardLayout } from "../DashboardLayout";

export default function BookingEngine() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Booking Engine Management</h1>
        <Card className="p-6">
          <p className="text-muted-foreground">Booking engine page coming soon...</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
