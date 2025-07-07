"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Menu,
  X,
  Facebook,
  Instagram,
  Mail,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "ГОЛОВНА" },
    { href: "/aboutMe", label: "ПРО МЕНЕ" },
    { href: "/dyplomy", label: "ДИПЛОМИ" },
    { href: "/blog", label: "БЛОГ" },
    { href: "/contact", label: "КОНТАКТИ" },
  ];

  const servicesLinks = [
    { href: "/individual", label: "Індивідуальне консультування" },
    { href: "/couple", label: "Парне консультування" },
    { href: "/children", label: "Робота з дітьми та підлітками" },
    { href: "/supervision", label: "Супервізія" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Mail, label: "Email" },
  ];

  return (
    <header className="relative">
      <div className="relative z-10">
        {/* Top bar with contact info */}
        <div className="bg-emerald-700 backdrop-blur-sm hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center py-3  text-white text-sm">
              <div className="flex items-center space-x-6 ">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>м. Київ вул. Бриса Гринченка, 2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+380987313541">+380 98 731 35 41</a>
                </div>
              </div>

              {/* Social media icons */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-white hover:text-emerald-200 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex md:justify-between justify-end items-center py-4">
              {/* Desktop navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-emerald-700 hover:text-emerald-600 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Services dropdown */}
                <div className="relative group">
                  <button className="text-emerald-700 hover:text-emerald-600 font-medium transition-colors">
                    ПОСЛУГИ
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2">
                      {servicesLinks.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
                  ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-emerald-700 hover:text-emerald-600 hover:bg-emerald-50"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-4 py-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-emerald-700 hover:bg-emerald-50 rounded-md"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile services menu */}
                <div className="px-3 py-2">
                  <div className="text-emerald-700 font-medium mb-2">
                    ПОСЛУГИ
                  </div>
                  <div className="pl-4 space-y-1">
                    {servicesLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block py-1 text-sm text-gray-600 hover:text-emerald-600"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="px-3 py-2">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
                    ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
                  </button>
                </div>
              </div>

              {/* Mobile contact info */}
              <div className="bg-emerald-700 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <div className="flex justify-between items-center py-3 text-white text-sm flex-col space-y-2">
                    <div className="flex items-center space-x-6 ">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>м. Київ вул. Бриса Гринченка, 2</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <a href="tel:+380987313541">+380 98 731 35 41</a>
                      </div>
                    </div>

                    {/* Mobile social media icons */}
                    <div className="flex items-center space-x-3">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className="text-white hover:text-emerald-200 transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
