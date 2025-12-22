"use client";
import { DashboardLayout } from "../DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Rooms() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Rooms Management</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </Button>
        </div>

        <Card className="p-6">
          <p className="text-muted-foreground">Rooms management page coming soon...</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
