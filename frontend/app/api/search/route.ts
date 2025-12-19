import { NextRequest, NextResponse } from 'next/server';
import { SearchResponse } from '@/app/shared/api';
import { MOCK_ROOMS } from './mock-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    const roomType = searchParams.get('roomType');

    // ✅ Validation
    if (!checkIn || !checkOut || !guests) {
      return NextResponse.json(
        { error: 'Missing required parameters: checkIn, checkOut, guests' },
        { status: 400 }
      );
    }

    const guestCount = Number(guests);
    if (isNaN(guestCount) || guestCount < 1) {
      return NextResponse.json(
        { error: 'Invalid guests count' },
        { status: 400 }
      );
    }

    // ✅ Filter rooms
    let results = MOCK_ROOMS.filter(
      room => room.maxGuests >= guestCount
    );

    if (roomType) {
      results = results.filter(room => room.id === roomType);
    }

    // ✅ Mock availability
    const resultsWithAvailability = results.map(room => ({
      ...room,
      availableCount: Math.floor(Math.random() * 3) + 1
    }));

    const response: SearchResponse = {
      rooms: resultsWithAvailability,
      totalResults: resultsWithAvailability.length
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
