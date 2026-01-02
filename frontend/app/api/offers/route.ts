import { NextResponse } from 'next/server';
import { Offer } from '@/app/shared/api';

const OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Historic Heart Stay',
    description:
      'Experience the soul of our historic city with complimentary local guided walking tours and exclusive access to cultural landmarks. Perfect for travelers seeking authentic connections with the destination.',
    discount: 15,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    roomTypes: ['1', '2', '3']
  },
  {
    id: '2',
    title: 'Culinary Getaway',
    description:
      'Indulge in our award-winning restaurant with a complimentary four-course tasting menu. Pair with optional wine pairings curated by our sommelier.',
    discount: 20,
    validFrom: '2024-02-01',
    validUntil: '2024-12-31',
    roomTypes: ['1', '2']
  }
];

export async function GET() {
  return NextResponse.json({ offers: OFFERS });
}
