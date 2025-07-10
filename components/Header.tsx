"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Menu, X, Send, Instagram, Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "ГОЛОВНА" },
    { href: "/aboutMe", label: "ПРО МЕНЕ" },
    { href: "/dyplomy", label: "ДИПЛОМИ" },
    { href: "/blog", label: "БЛОГ" },
    // { href: "/contact", label: "КОНТАКТИ" },
  ];

  const servicesLinks = [
    {
      href: "/consultation?type=individual",
      label: "Індивідуальне консультування",
    },
    { href: "/consultation?type=couple", label: "Парне консультування" },
    {
      href: "/consultation?type=child",
      label: "Робота з дітьми та підлітками",
    },
    { href: "/supervision", label: "Супервізія" },
  ];

  const socialLinks = [
    { href: "#", icon: Send, label: "Telegram" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Mail, label: "Email" },
  ];

  return (
    <header className="relative z-50">
      <div className="relative z-10">
        {/* Top bar with contact info */}
        {/* <div className="bg-red-500 backdrop-blur-sm hidden sm:block">
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

              <div className="flex items-center space-x-4 md:pr-1">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-white hover:text-red-200 transition-colors"
                    aria-label={social.label}
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div> */}

        {/* Main navigation */}
        <nav
          className={`${
            isNotHomePage ? "h-16" : "hidden"
          } md:block absolute w-full backdrop-blur-sm shadow-lg`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex md:justify-between justify-end items-center py-3">
              {/* Desktop navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-red-500 font-bold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Services dropdown - ВИПРАВЛЕНО з невидимим містом */}
                <div className="relative group">
                  <button className="text-white hover:text-red-500 font-bold transition-colors">
                    ПОСЛУГИ
                  </button>
                  {/* Невидимий міст - розширює hover область */}
                  <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-black/95 rounded-lg px-2 shadow-lg z-[9999]">
                      <div className="py-2">
                        {servicesLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block px-4 py-2 text-sm text-white hover:bg-red-500 hover:text-black transition-colors rounded-md"
                            onClick={() => {
                              toggleMenu();
                            }}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
                  onClick={() => {
                    router.push("/consultation");
                  }}
                >
                  ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
                </button>
              </div>

              {/* Mobile menu button */}
            </div>
          </div>
        </nav>
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-red-500 hover:text-red-600 bg-red-50 border-2 border-red-500 absolute top-3 right-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 z-20"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute md:hidden bg-white border-t pt-1 w-full">
            <div className="px-4 py-2 space-y-1 ">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-red-500 hover:bg-red-50 rounded-md "
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile services menu */}
              <div className="px-3 py-2">
                <div className="text-red-500 font-medium mb-2">ПОСЛУГИ</div>
                <div className="pl-4 space-y-1">
                  {servicesLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block py-1 text-sm text-gray-600 hover:text-red-500"
                      onClick={() => {
                        toggleMenu();
                      }}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2">
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => {
                    router.push("/consultation");
                    toggleMenu();
                  }}
                >
                  ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
                </button>
              </div>
            </div>

            {/* Mobile contact info */}
            <div className="bg-red-500 backdrop-blur-sm">
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
                        className="text-white hover:text-red-200 transition-colors"
                        aria-label={social.label}
                        onClick={() => {
                          toggleMenu();
                        }}
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
      </div>
    </header>
  );
};

export default Header;
