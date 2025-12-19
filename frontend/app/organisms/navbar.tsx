"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  logo?: { logoUrl: string; logoLink: string };
  navItems?: { label: string; link: string }[];
}
const Navbar = ({ logo, navItems }: NavbarProps) => {
  return (
    <>
      <div className="flex fixed w-full items-center justify-between py-6 px-16 border-b bg-white">
        {logo && (
          <Image src={logo.logoUrl} width={40} height={40} alt="website-logo" />
        )}
        <text className="flex items-center justify-center gap-2">
          <span className="py-1 px-2 text-white bg-primary rounded-sm font-bold">
            H
          </span>
          <text className="font-bold">HotelHub</text>
        </text>
        <div className="flex items-center gap-16">
          <NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                {navItems?.map((item) => (
                  <NavigationMenuItem key={item.link}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.link}
                        className="px-3 py-2 text-sm font-medium hover:underline"
                      >
                        {item.label}
                      </Link>
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
