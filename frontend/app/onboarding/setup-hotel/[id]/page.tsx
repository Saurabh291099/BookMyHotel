"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Upload } from "lucide-react";

export default function SetupHotel() {
  const router = useRouter();
  const params = useParams();
  const [hotelId, setHotelId] = useState<string | null>(null);

  // Extract hotelId from params when they're available
  useEffect(() => {
    if (params?.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      setHotelId(id);
    }
  }, [params]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    description: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate hotelId exists
    if (!hotelId) {
      alert("Hotel ID is missing. Please refresh the page and try again.");
      return;
    }

    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Hotel name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Send as JSON instead of FormData (file upload will be implemented later)
      const updatePayload = {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        description: formData.description,
        // logo file upload will be handled separately
      };

      // Make sure hotelId is not null before making request
      if (!hotelId) {
        throw new Error("Hotel ID not found");
      }

      const response = await fetch(`http://localhost:4000/hotels/${hotelId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to setup hotel");
        return;
      }

      alert("Hotel setup completed successfully!");
      // Redirect to dashboard with hotel ID
      //   router.push(`/dashboard/home/${hotelId}`);
      window.open(`/dashboard/home/${hotelId}`, "_blank");
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while hotelId is being resolved
  if (!hotelId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading hotel setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Complete Your Hotel Setup
          </h1>
          <p className="text-muted-foreground">
            Add your hotel details to get started with your dashboard
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div>
              <Label className="mb-4 block">Hotel Logo (Optional)</Label>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-lg bg-slate-100 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Hotel logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <label>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition">
                      Upload Logo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      disabled={!hotelId}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG or GIF (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Hotel Name */}
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Hotel Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Sunrise Beach Resort"
                value={formData.name}
                onChange={handleChange}
                disabled={!hotelId}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="mb-2 block">
                Street Address *
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={handleChange}
                disabled={!hotelId}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.address}
                </p>
              )}
            </div>

            {/* City and Country */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="mb-2 block">
                  City *
                </Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!hotelId}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-destructive">{errors.city}</p>
                )}
              </div>
              <div>
                <Label htmlFor="country" className="mb-2 block">
                  Country *
                </Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="USA"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!hotelId}
                  className={errors.country ? "border-destructive" : ""}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.country}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="mb-2 block">
                Description (Optional)
              </Label>
              <textarea
                id="description"
                name="description"
                placeholder="Tell us about your hotel..."
                value={formData.description}
                onChange={handleChange}
                disabled={!hotelId}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading || !hotelId}
            >
              {loading ? "Setting up..." : "Complete Setup"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              * Required fields
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
