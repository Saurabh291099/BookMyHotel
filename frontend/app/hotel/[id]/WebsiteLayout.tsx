"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/app/organisms/navbar";

interface WebsiteLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export function WebsiteLayout({
  children,
  showNav = true,
}: WebsiteLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const isDashboard = pathname?.startsWith("/dashboard"); 
  const isStaff = pathname?.startsWith("/staff");
  const isAdmin = pathname?.startsWith("/admin");

  if (isDashboard || isStaff || isAdmin) {
    return <>{children}</>;
  }

  const navLinks = [
    { label: "Home", link: `/hotel/home/${hotelId}` },
    { label: "About", link: `/hotel/about/${hotelId}` },
    { label: "Rooms", link: `/hotel/rooms/${hotelId}` },
    { label: "Amenities", link: `/hotel/amenities/${hotelId}` },
    { label: "Offers", link: `/hotel/offers/${hotelId}` },
    { label: "Gallery", link: `/hotel/gallery/${hotelId}` },
    { label: "Events", link: `/hotel/events/${hotelId}` },
    { label: "Local Guide", link: `/hotel/local-guide/${hotelId}` },
    { label: "Contact", link: `/hotel/contact/${hotelId}` },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <Navbar navItems={navLinks} />
      </div>
      <main className="flex-1">{children}</main>

      {showNav && !isDashboard && (
        <footer className="bg-slate-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">H</span>
                  </div>
                  <span className="font-bold text-lg">HotelHub</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Create and manage your hotel website in minutes
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <Link
                      href="#features"
                      className="hover:text-white transition"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="hover:text-white transition"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition">
                      Integrations
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <Link href="#" className="hover:text-white transition">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <Link href="#" className="hover:text-white transition">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-400 text-sm">
                  © 2024 HotelHub. All rights reserved.
                </p>
                <div className="flex gap-6 text-slate-400 text-sm mt-4 md:mt-0">
                  <Link href="#" className="hover:text-white transition">
                    Twitter
                  </Link>
                  <Link href="#" className="hover:text-white transition">
                    LinkedIn
                  </Link>
                  <Link href="#" className="hover:text-white transition">
                    Facebook
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
