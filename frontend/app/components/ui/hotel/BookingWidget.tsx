import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Users, Search } from "lucide-react";

interface BookingWidgetProps {
  variant?: 'compact' | 'modal';
  onSearch?: (data: SearchData) => void;
}

export interface SearchData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType?: string;
}

export function BookingWidget({ variant = 'compact', onSearch }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('');

  const handleSearch = () => {
    if (checkIn && checkOut && guests) {
      onSearch?.({
        checkIn,
        checkOut,
        guests: parseInt(guests),
        roomType: roomType || undefined
      });
    }
  };

  if (variant === 'modal') {
    return (
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Find Your Perfect Stay</h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Check-in */}
          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-in
            </Label>
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Check-out */}
          <div className="space-y-2">
            <Label htmlFor="checkout" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-out
            </Label>
            <Input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Guests
            </Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger id="guests">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Room Type (optional) */}
          <div className="space-y-2">
            <Label htmlFor="roomtype">Room Type (optional)</Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger id="roomtype">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any type</SelectItem>
                <SelectItem value="1">Deluxe City View</SelectItem>
                <SelectItem value="2">Romantic River View</SelectItem>
                <SelectItem value="3">Family Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="mt-6 w-full"
          size="lg"
        >
          <Search className="mr-2 h-5 w-5" />
          Search Rooms
        </Button>
      </div>
    );
  }

  // Compact variant
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          {/* Check-in */}
          <div className="space-y-1">
            <Label htmlFor="compact-checkin" className="text-xs font-medium text-slate-600">
              Check-in
            </Label>
            <Input
              id="compact-checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* Check-out */}
          <div className="space-y-1">
            <Label htmlFor="compact-checkout" className="text-xs font-medium text-slate-600">
              Check-out
            </Label>
            <Input
              id="compact-checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* Guests */}
          <div className="space-y-1">
            <Label htmlFor="compact-guests" className="text-xs font-medium text-slate-600">
              Guests
            </Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger id="compact-guests" className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Room Type (optional) */}
          <div className="space-y-1">
            <Label htmlFor="compact-roomtype" className="text-xs font-medium text-slate-600">
              Room Type
            </Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger id="compact-roomtype" className="h-9 text-sm">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any type</SelectItem>
                <SelectItem value="1">Deluxe City View</SelectItem>
                <SelectItem value="2">Romantic River View</SelectItem>
                <SelectItem value="3">Family Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="h-9"
            size="sm"
          >
            <Search className="mr-1 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
