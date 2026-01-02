import { NextRequest, NextResponse } from 'next/server';
import { ReservationRequest, ReservationResponse } from '@/app/shared/api';
import {
  generateConfirmationId,
  calculatePrice,
  getRoom
} from '../search/mock-data';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ReservationRequest;

    const {
      roomId,
      checkIn,
      checkOut,
      guests,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests
    } = body;

    // ✅ Validation
    if (
      !roomId ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !guestName ||
      !guestEmail ||
      !guestPhone
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const room = getRoom(roomId);
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    if (room.maxGuests < guests) {
      return NextResponse.json(
        { error: 'Room capacity exceeded' },
        { status: 400 }
      );
    }

    // ✅ Date calculation
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    if (nights <= 0) {
      return NextResponse.json(
        { error: 'Invalid check-in or check-out date' },
        { status: 400 }
      );
    }

    // ✅ Price + confirmation
    const totalPrice = calculatePrice(room.price, nights);
    const confirmationId = generateConfirmationId();

    const response: ReservationResponse = {
      confirmationId,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      checkIn,
      checkOut,
      totalPrice,
      room
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
