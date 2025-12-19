import { NextResponse } from 'next/server';
import { Room } from '@/app/shared/api';

const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Deluxe City View Suite',
    description: 'Experience refined comfort in our Deluxe City View Suite, featuring a spacious king bed with premium Egyptian cotton linens, high ceilings, and floor-to-ceiling windows showcasing spectacular city skyline views. This 50-square-meter sanctuary includes a marble-appointed bathroom with rainfall shower, complimentary Wi-Fi, and a daily gourmet breakfast buffet. The elegant mid-century furnishings and warm ambient lighting create an atmosphere of sophisticated tranquility.',
    price: 350,
    maxGuests: 2,
    amenities: [
      'King Bed with Premium Linens',
      'Floor-to-Ceiling Windows with City View',
      'Marble Bathroom with Rainfall Shower',
      'Daily Gourmet Breakfast Included',
      'Free High-Speed Wi-Fi',
      'In-Room Climate Control',
      'Smart Television with Streaming',
      'Nightly Housekeeping Service'
    ],
    images: [
      'https://images.pexels.com/photos/12277300/pexels-photo-12277300.jpeg'
    ],
    rating: 4.8,
    reviews: 156
  },
  {
    id: '2',
    name: 'Romantic River View Room',
    description: 'Indulge in romance with views of the historic riverfront. This intimate 35-square-meter room features a queen bed, cozy sitting area, and a private balcony overlooking the water. Perfect for couples seeking a memorable escape.',
    price: 280,
    maxGuests: 2,
    amenities: [
      'Queen Bed with Premium Bedding',
      'Private River View Balcony',
      'Complimentary Wine & Cheese',
      'Luxury Bath Products',
      'Free Wi-Fi',
      'Flat-Screen TV',
      'Mini Bar',
      'Turndown Service'
    ],
    images: [
      'https://images.pexels.com/photos/6743737/pexels-photo-6743737.jpeg'
    ],
    rating: 4.7,
    reviews: 103
  },
  {
    id: '3',
    name: 'Family Suite',
    description: 'Ideal for families, our spacious Family Suite offers two separate bedroom areas with a connecting living space. This 70-square-meter accommodation includes two bathrooms and can accommodate up to four guests comfortably.',
    price: 450,
    maxGuests: 4,
    amenities: [
      'Two Queen Beds',
      'Living Area with Sofa Bed',
      'Two Full Bathrooms',
      'Kitchenette',
      'Family-Friendly Entertainment',
      'Extra Storage',
      'Daily Breakfast for Four',
      'Children\'s Welcome Gift'
    ],
    images: [
      'https://images.pexels.com/photos/12277300/pexels-photo-12277300.jpeg'
    ],
    rating: 4.6,
    reviews: 89
  }
];


// export async function GET() {
//   return NextResponse.json({ rooms: ROOMS });
// }


export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const room = ROOMS.find(r => r.id === params.id);

  if (!room) {
    return NextResponse.json(
      { error: 'Room not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(room);
}

