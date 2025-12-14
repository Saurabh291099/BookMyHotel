import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function CreateHotel() {
  const [formData, setFormData] = useState({
    hotelName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    subdomain: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual hotel creation
    navigate("/onboarding/success");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Your Hotel
            </h1>
            <p className="text-muted-foreground">
              Let's set up your hotel profile and get you online
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Logo Upload */}
              <div>
                <Label className="mb-4 block">Hotel Logo</Label>
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
                <Label htmlFor="hotelName" className="mb-2 block">
                  Hotel Name
                </Label>
                <Input
                  id="hotelName"
                  name="hotelName"
                  placeholder="e.g., Sunrise Beach Resort"
                  value={formData.hotelName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="mb-2 block">
                  Street Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="city" className="mb-2 block">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="mb-2 block">
                    State
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="mb-2 block">
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Subdomain */}
              <div>
                <Label htmlFor="subdomain" className="mb-2 block">
                  Website Subdomain
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="subdomain"
                    name="subdomain"
                    placeholder="myhotel"
                    value={formData.subdomain}
                    onChange={handleChange}
                    required
                    className="flex-1"
                  />
                  <div className="flex items-center px-4 bg-slate-100 rounded-lg border border-border">
                    <span className="text-sm text-muted-foreground">
                      .hotelhub.com
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Your hotel website will be available at{" "}
                  <span className="font-semibold text-foreground">
                    {formData.subdomain}.hotelhub.com
                  </span>
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Create Hotel & Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
