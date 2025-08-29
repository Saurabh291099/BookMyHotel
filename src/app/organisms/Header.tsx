"use client";

import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";
import { useState } from "react";

export interface HeaderProps {
  logoSrc: string;
  navBarItems: {
    label: string;
    href: string;
    isDropdown?: boolean;
    dropdownItems?: {
      label: string;
      href: string;
    }[];
  }[];
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <Image
            src={props.logoSrc}
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8 mr-2 cursor-pointer"
            onClick={props.onLogoClick}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {props.navBarItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Book Now Button */}
        <div className="hidden md:block">
          <Button label="Book Now" />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="p-4">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="mt-8">
              <ul className="flex flex-col space-y-4">
                {props.navBarItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block hover:underline"
                      onClick={toggleMobileMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8">
              <Button label="Book Now" />
            </div>
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header;
