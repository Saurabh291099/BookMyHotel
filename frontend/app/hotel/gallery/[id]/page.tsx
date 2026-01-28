import { WebsiteLayout } from "../../[id]/WebsiteLayout";
import { GalleryCarousel } from "@/app/components/ui/hotel/GalleryCarousel";
import { Card } from "@/components/ui/card";

const GALLERY_IMAGES = [
  "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg",
  "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
];

export default function GalleryPage() {
  return (
    <WebsiteLayout showNav={true}>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Photo Gallery</h1>
          <p className="mt-4 text-lg text-slate-200">
            Explore the rooms, amenities, and experiences that make this stay memorable.
          </p>
        </div>
      </div>

      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <GalleryCarousel images={GALLERY_IMAGES} title="Hotel Gallery" />
        </div>
      </div>

      <div className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Rooms & Suites",
                description: "Bright, modern rooms designed for comfort and calm.",
              },
              {
                title: "Dining Spaces",
                description: "Seasonal menus and inviting spaces to gather.",
              },
              {
                title: "Wellness & Spa",
                description: "A tranquil retreat to reset and recharge.",
              },
              {
                title: "Event Venues",
                description: "Flexible spaces for conferences and celebrations.",
              },
              {
                title: "Outdoor Areas",
                description: "Landscaped gardens and relaxing terraces.",
              },
              {
                title: "Local Experiences",
                description: "Curated moments to explore the destination.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}

