"use client";
import { ReactNode, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  LayoutDashboard,
  DoorOpen,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Inbox,
  Briefcase,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // const pathname = usePathname();
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const sidebarLinks = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: `/dashboard/home/${hotelId}`,
    },
    { icon: DoorOpen, label: "Rooms", path: `/dashboard/rooms/${hotelId}` },
    {
      icon: Calendar,
      label: "CMS",
      // path: `/dashboard/cms/${hotelId}`,
      children: [
        {
          label: "Home",
          path: `/dashboard/cms/home/${hotelId}`,
        },
        {
          label: "About",
          path: `/dashboard/cms/about/${hotelId}`,
        },
        {
          label: "Rooms",
          path: `/dashboard/cms/rooms/${hotelId}`,
        },
        {
          label: "Amenities",
          path: `/dashboard/cms/amenities/${hotelId}`,
        },
        {
          label: "Offers",
          path: `/dashboard/cms/offers/${hotelId}`,
        },
        {
          label: "Gallery",
          path: `/dashboard/cms/gallery/${hotelId}`,
        },
        {
          label: "Events",
          path: `/dashboard/cms/events/${hotelId}`,
        },
        {
          label: "Local Guide",
          path: `/dashboard/cms/local-guide/${hotelId}`,
        },
        {
          label: "Contact",
          path: `/dashboard/cms/contact/${hotelId}`,
        },
      ],
    },
    {
      icon: Calendar,
      label: "Bookings",
      path: `/dashboard/bookings/${hotelId}`,
    },
    {
      icon: Calendar,
      label: "Booking Engine",
      path: `/dashboard/booking-engine/${hotelId}`,
    },
    { icon: Users, label: "Guests", path: `/dashboard/guests/${hotelId}` },
    { icon: Briefcase, label: "Staff", path: `/dashboard/staff/${hotelId}` },
    {
      icon: BarChart3,
      label: "Reports",
      path: `/dashboard/reports/${hotelId}`,
    },
    {
      icon: Settings,
      label: "Settings",
      path: `/dashboard/settings/${hotelId}`,
    },
  ];

  const viewWebsiteBtn = () => {
    window.open(`/hotel/home/${hotelId}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link
            href={`/dashboard/home/${hotelId}`}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden lg:block">
              HotelHub
            </span>
          </Link>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const hasChildren = Array.isArray(link.children);

            // CMS active if any child route is active
            const isActive = hasChildren
              ? link?.children?.some((child) => pathname === child.path)
              : pathname === link.path;

            // ---------------- NORMAL LINK ----------------
            if (!hasChildren) {
              return (
                <Link
                  key={link.path}
                  href={link.path || ""}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            }

            // ---------------- DROPDOWN (CMS) ----------------
            return (
              <div
                key={link.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-slate-100"
                }`}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link
                      href={link.path || "#"}
                      className="p-0 flex items-center gap-3 w-full"
                    >
                      <Icon size={20} />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {link.children?.map((child) => {
                      const childActive = pathname === child.path;
                      return (
                        <DropdownMenuItem>
                          <Link
                            key={child.path}
                            href={child.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`block px-3 py-2 w-full rounded-md text-sm transition ${
                              childActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-slate-100"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href="/Auth/Login">
              <LogOut size={20} />
              Logout
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={viewWebsiteBtn}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <Briefcase size={20} />
              View Website
            </Button>
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Inbox size={20} />
            </button>
            <button className="w-10 h-10 bg-primary rounded-full text-white font-bold flex items-center justify-center">
              A
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="p-6 md:p-8">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
