/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface DemoResponse {
  message: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviews: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validFrom: string;
  validUntil: string;
  roomTypes: string[];
}

export interface SearchRequest {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType?: string;
}

export interface SearchResponse {
  rooms: (Room & { availableCount: number })[];
  totalResults: number;
}

export interface ReservationRequest {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}

export interface ReservationResponse {
  confirmationId: string;
  status: 'confirmed' | 'pending';
  bookingDate: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  room: Room;
}
