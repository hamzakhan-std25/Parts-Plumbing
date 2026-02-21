"use client";

import { useState, useEffect, useRef } from "react";

import SearchOverlay from '@/components/search/SearchOverlay';
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Search } from "lucide-react";

export default function Header() {

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 10; // Minimum scroll change to trigger hide/show

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY.current;

      // Only react if scroll difference exceeds threshold
      if (Math.abs(scrollDiff) > scrollThreshold) {
        if (scrollDiff > 0 && currentScrollY > 100) {
          // Scrolling down & past 100px → hide header
          setIsVisible(false);
        } else if (scrollDiff < 0) {
          // Scrolling up → show header
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Spacer to prevent content jump when header hides/shows */}
      <div className="h-0" />

      <header
        className={`
          sticky top-2 z-40 mx-2 rounded-xl border border-gray-200/70 bg-white/80 
          backdrop-blur-md shadow-sm transition-transform duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-[calc(100%+0.5rem)]"}
        `}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              className="rounded-full hover:scale-110 shadow-2xl transition-all w-auto"
              src="/icon.png"
              alt="KPK PLUMBING Logo"
              width={40}
              height={20}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-blue-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
            <a
              href="tel:+923359183182"
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <Phone size={22} />
            </a>

            {/* Hamburger Button (Mobile Only) */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl 
          transition-transform duration-300 ease-in-out transform
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-semibold py-2 border-b border-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t">
            <p className="text-xs text-gray-400">© 2024 KPK PLUMBING</p>
          </div>
        </div>
      </aside>


      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}