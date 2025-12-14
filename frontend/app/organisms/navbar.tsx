"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <div className="flex fixed w-full items-center justify-between py-6 px-16 border-b bg-white">
        {/* <Image src={''} width={40} height={40} alt="logo"/> */}
        <text className="flex items-center justify-center gap-2">
          <span className="py-1 px-2 text-white bg-blue-600 rounded-sm font-bold">H</span>
          <text className="font-bold">HotelHub</text>
        </text>
        <div className="flex items-center gap-16">
          <NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                {[
                  { label: "Features", href: "/features" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "Login", href: "/login" },
                ].map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="px-3 py-2 text-sm font-medium hover:underline"
                      >
                        {item.label}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </NavigationMenu>
          <Button>Get Started</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
