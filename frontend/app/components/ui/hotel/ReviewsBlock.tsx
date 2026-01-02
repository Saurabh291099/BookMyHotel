import { Star, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
}

interface ReviewsBlockProps {
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  hotelName?: string;
}

export function ReviewsBlock({
  reviews = [
    {
      id: '1',
      author: 'Sarah Mitchell',
      rating: 5,
      text: 'Absolutely stunning location with impeccable service. The staff went above and beyond to make our stay memorable. We\'ll definitely be back!',
      date: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      author: 'James Chen',
      rating: 4,
      text: 'Beautiful historic hotel with modern amenities. The room was spacious and the breakfast was excellent. Minor: a bit noisy from the street.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: '3',
      author: 'Emma Thompson',
      rating: 5,
      text: 'The rooftop restaurant is incredible! Amazing food and the city views are breathtaking. Highly recommend for a special occasion.',
      date: '2024-01-08',
      verified: true
    }
  ],
  averageRating = 4.7,
  totalReviews = 342,
  hotelName = 'Heritage Boutique Hotel'
}: ReviewsBlockProps) {
  // JSON-LD Schema
  const reviewSchema = {
    '@context': 'https://schema.org/',
    '@type': 'AggregateRating',
    'ratingValue': averageRating.toString(),
    'bestRating': '5',
    'worstRating': '1',
    'ratingCount': totalReviews.toString(),
    'reviewCount': reviews.length.toString()
  };

  const itemReviewSchema = reviews.map(review => ({
    '@context': 'https://schema.org/',
    '@type': 'Review',
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': review.rating.toString()
    },
    'author': {
      '@type': 'Person',
      'name': review.author
    },
    'reviewBody': review.text,
    'datePublished': review.date
  }));

  return (
    <div className="w-full">
      {/* Schema markup */}
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
      {itemReviewSchema.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Average Rating Summary */}
      <div className="mb-8 rounded-lg bg-blue-50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">Guest Reviews</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              {averageRating.toFixed(1)} out of 5 stars
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Based on {totalReviews} verified guest reviews
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < Math.floor(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-lg border border-slate-200 p-4 transition-all hover:shadow-md"
          >
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.author}`}
                  alt={review.author}
                />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{review.author}</p>
                  {review.verified && (
                    <span className="text-xs font-medium text-green-600">✓ Verified Guest</span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-900">{review.rating} stars</span>
            </div>

            {/* Review Text */}
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600 mb-3">
          Showing {reviews.length} of {totalReviews} reviews
        </p>
        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50">
          <MessageCircle className="h-4 w-4" />
          View All Reviews
        </button>
      </div>
    </div>
  );
}
