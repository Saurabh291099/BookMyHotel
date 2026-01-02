"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
  const isDashboard = pathname?.startsWith("/dashboard");
  const isStaff = pathname?.startsWith("/staff");
  const isAdmin = pathname?.startsWith("/admin");

  if (isDashboard || isStaff || isAdmin) {
    return <>{children}</>;
  }

  const navLinks = [
    { label: "Home", link: "/hotel" },
    { label: "About", link: "/hotel/about" },
    { label: "Rooms", link: "/hotel/rooms" },
    { label: "Amenities", link: "/hotel/amenities" },
    { label: "Offers", link: "/hotel/offers" },
    { label: "Gallery", link: "/hotel/gallery" },
    { label: "Events", link: "/hotel/events" },
    { label: "Local Guide", link: "/hotel/local-guide" },
    { label: "Contact", link: "/hotel/contact" },
     ];
  return (
    <div className="min-h-screen flex flex-col">
      {/* {showNav && (
        <nav className="bg-white border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="font-bold text-lg text-foreground">HotelHub</span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                {isHome && (
                  <>
                    <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
                      Features
                    </a>
                    <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
                      Pricing
                    </a>
                  </>
                )}
                <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Login
                </Link>
                <Link href="/auth/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>

              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden pb-4 space-y-2">
                {isHome && (
                  <>
                    <a
                      href="#features"
                      className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Features
                    </a>
                    <a
                      href="#pricing"
                      className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </a>
                  </>
                )}
                <Link
                  href="/auth/login"
                  className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      )} */}
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
                    <Link href="#features" className="hover:text-white transition">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="hover:text-white transition">
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
