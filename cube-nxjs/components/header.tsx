"use client";

import { useState } from "react";
import Link from "next/link";
import { X} from "lucide-react";
import Navbar from "./navbar";
import Hamberger from "./icons/mobile-icons/Hamberger";
import Youtube from "./icons/mobile-icons/Youtube";
import Facebook from "./icons/mobile-icons/Facebook";
import Insta from "./icons/mobile-icons/Insta";
import Pinterest from "./icons/mobile-icons/Pinterest";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex justify-between container px-4">
        <Navbar />
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? null : <Hamberger />}
        </button>
      </div>

      {/* Full-screen Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 md:hidden">
          <div className="flex flex-col h-full">
            {/* Header with hamburger, logo, and close button */}
            <div className="flex items-center justify-end p-4 pt-6">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-6 pt-8">
              <div className="space-y-0">
                <Link
                  href="/"
                  className="block py-4 text-white text-lg border-b border-gray-600 hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="block py-4 text-white text-lg border-b border-gray-600 hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/projects"
                  className="block py-4 text-white text-lg border-b border-gray-600 hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  href="/about-us"
                  className="block py-4 text-white text-lg border-b border-gray-600 hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/resources"
                  className="block py-4 text-white text-lg border-b border-gray-600 hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Knowledge Center
                </Link>
                <Link
                  href="/careers"
                  className="block py-4 text-white text-lg border-b border-gray-600 hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Careers
                </Link>
                <Link
                  href="/contact-us"
                  className="block py-4 text-white text-lg border-b border-gray-600 hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact US
                </Link>
              </div>
            </nav>

            {/* Contact Button and Social Media */}
            <div className="px-6 pb-8 space-y-6">
              {/* Contact Button */}
              <Link
                href="/contact-us"
                className="block w-full bg-green-500 text-white text-center py-3 rounded-md font-medium hover:bg-green-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT US
              </Link>

              {/* Social Media Icons */}
              <div className="flex justify-center space-x-6">
                <span className="text-white text-sm mr-4">Follow Us</span>
                <Link
                  href="#"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  <Youtube />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  <Facebook />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  <Insta />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  <Pinterest />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
