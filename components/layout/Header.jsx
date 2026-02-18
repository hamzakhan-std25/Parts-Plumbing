
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

import { Menu, X, Phone, MessageCircle, Search } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/" },
    { name: "Contact", href: "/" },
  ];
  return (
    <>
    
      <header className="sticky top-0 z-40 w-full  bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
               <Image className=" rounded-full hover:scale-110 shadow-2xl transition-all w-auto"
              src="/icon.png" // Path to your image in the public directory
              alt="My Company Logo"
              width={40} // Set the desired width in pixels
              height={20} // Set the desired height in pixels
              priority // Use priority for images above the fold
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium hover:text-blue-600 transition ">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition">
              <Search size={20} /></a>
            {/* Phone Icon */}
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
      <aside className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-semibold py-2 border-b border-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t">
            <p className="text-xs text-gray-400">© 2024 Parts Plumbing Store</p>
          </div>
        </div>
      </aside>
    </>
  );
}
