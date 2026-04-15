"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Hamberger from "./icons/mobile-icons/Hamberger";
import Youtube from "./icons/mobile-icons/Youtube";
import Facebook from "./icons/mobile-icons/Facebook";
import Insta from "./icons/mobile-icons/Insta";
import Pinterest from "./icons/mobile-icons/Pinterest";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "SERVICES", path: "/services" },
    { label: "PROJECTS", path: "/projects" },
    { label: "ABOUT US", path: "/about-us" },
    { label: "KNOWLEDGE CENTER", path: "/resources" },
    { label: "CAREERS", path: "/careers" },
    { label: "CONTACT US", path: "/contact-us" },
  ];

  return (
    <>
      {/* Original header - absolute over hero */}
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

      {/* Sticky navbar - appears on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-md shadow-sm transition-transform duration-300 ${
          isSticky ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-[60px] md:h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/cube-highway-logo.webp"
              alt="Cube Highways"
              width={40}
              height={30}
              className="object-contain"
            />
            <span className="hidden md:block text-[#1a2e35] text-sm font-medium tracking-[2px] uppercase">
              CUBE HIGHWAYS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-[#1a2e35] text-xs font-medium tracking-[2px] px-3 py-2 border transition-all duration-100 ${
                    isActive
                      ? "bg-accent/10 border-accent"
                      : "border-transparent hover:bg-accent/10 hover:border-accent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {isHomepage && (
              <a
                href="#rnd"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("rnd")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[#1a2e35] text-xs font-medium tracking-[2px] px-3 py-2 border border-transparent hover:bg-accent/10 hover:border-accent transition-all duration-100 cursor-pointer"
              >
                R&D
              </a>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#1a2e35] focus:outline-none"
          >
            <Hamberger />
          </button>
        </div>
      </div>
    </>
  );
}
