"use client";
import { DashboardLayout } from "../DashboardLayout";
import { Card } from "@/components/ui/card";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <Card className="p-6">
          <p className="text-muted-foreground">Settings page coming soon...</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
