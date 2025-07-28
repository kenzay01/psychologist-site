"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
// import BookingModal from "./Modal/Modal";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
// import LanguageSwitcher from "./LanguageSwitcher";
import {
  FaViber,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import SimpleModal from "./Modal/SimpleModal";

const Header = () => {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const isNotHomePage =
    pathname !== `/${currentLocale}` && pathname !== `/${currentLocale}/`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: dict?.header.nav.home || "Головна" },
    { href: "/aboutMe", label: dict?.header.nav.aboutMe || "Про мене" },
    { href: "/dyplomy", label: dict?.header.nav.diplomas || "Дипломи" },
    { href: "/blogs", label: dict?.header.nav.blog || "Блог" },
  ];

  const servicesLinks = [
    {
      href: "/consultation?type=individual",
      label: dict?.header.nav.servicesLinks.individual,
    },
    {
      href: "/consultation?type=couple",
      label: dict?.header.nav.servicesLinks.couple,
    },
    {
      href: "/consultation?type=child",
      label: dict?.header.nav.servicesLinks.child,
    },
    { href: "/supervision", label: dict?.header.nav.servicesLinks.supervision },
  ];

  const allSocialLinks = [
    {
      href: "/linktree",
      icon: <FaViber className="w-6 h-6" />,
      label: "Viber",
    },
    {
      href: "/linktree",
      icon: <FaWhatsapp className="w-6 h-6" />,
      label: "WhatsApp",
    },
    {
      href: "/linktree",
      icon: <FaTelegram className="w-6 h-6" />,
      label: "Telegram",
    },
    {
      href: "/linktree",
      icon: <FaInstagram className="w-6 h-6" />,
      label: "Instagram",
    },
    {
      href: "/linktree",
      icon: <FaTiktok className="w-6 h-6" />,
      label: "TikTok",
    },
    {
      href: "/linktree",
      icon: <FaLinkedin className="w-6 h-6" />,
      label: "LinkedIn",
    },
    {
      href: "/linktree",
      icon: <FaYoutube className="w-6 h-6" />,
      label: "YouTube",
    },
  ];

  const socialLinks =
    currentLocale === "ru"
      ? allSocialLinks.filter(
          (link) =>
            ![
              "Telegram",
              "Instagram",
              "TikTok",
              "LinkedIn",
              "YouTube",
            ].includes(link.label)
        )
      : allSocialLinks;

  return (
    <>
      <header className="relative z-50">
        <div className="relative z-10">
          <nav
            className={`
    w-full
    ${isNotHomePage ? "bg-white/90 relative" : "bg-transparent absolute"}
    ${isNotHomePage ? "block h-16" : "hidden md:block"}
    backdrop-blur-sm transition-colors duration-300 top-0
  `}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex md:justify-between justify-end items-center py-3">
                {/* Desktop navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={
                        link.href === "/"
                          ? `/${currentLocale}`
                          : `/${currentLocale}${link.href}`
                      }
                      className={`${
                        isNotHomePage ? "text-black" : "text-white"
                      } hover:text-red-500 font-bold transition-colors`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Services dropdown */}
                  <div className="relative group">
                    <button
                      className={`${
                        isNotHomePage ? "text-black" : "text-white"
                      } hover:text-red-500 font-bold transition-colors`}
                    >
                      {dict?.header.nav.services || "Послуги"}
                    </button>
                    <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-black/50 backdrop-blur-md rounded-lg px-2 shadow-lg z-[9999]">
                        <div className="py-2">
                          {servicesLinks.map((service) => (
                            <Link
                              key={service.href}
                              href={`/${currentLocale}${service.href}`}
                              className="block px-4 py-2 text-sm text-white hover:bg-red-500 transition-colors rounded-md"
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

                  <Link
                    key={`/${currentLocale}/linktree`}
                    href={`/${currentLocale}/linktree`}
                    className={`${
                      isNotHomePage ? "text-black" : "text-white"
                    } hover:text-red-500 font-bold transition-colors`}
                  >
                    {dict?.header.nav.linkTree || "Контакти"}
                  </Link>
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex items-center justify-center space-x-4">
                  {/* <LanguageSwitcher currentLocale={currentLocale} /> */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md uppercase"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    {dict?.header.cta.bookConsultation || "Зв’язатися зі мною"}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-md ${
              isMenuOpen
                ? "text-black"
                : isNotHomePage
                ? "text-black"
                : "text-white"
            } absolute top-3 right-3 focus:outline-none z-20`}
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute md:hidden bg-white border-t w-full">
              <div className="px-4 py-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={
                      link.href === "/"
                        ? `/${currentLocale}`
                        : `/${currentLocale}${link.href}`
                    }
                    className="block px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile services menu */}
                <div className="px-3 py-2">
                  <div className="text-red-500 font-medium mb-2">
                    {dict?.header.nav.services}
                  </div>
                  <div className="pl-4 space-y-1">
                    {servicesLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={`/${currentLocale}${service.href}`}
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
                {/* <Link
                  key={`/${currentLocale}/linktree`}
                  href={`/${currentLocale}/linktree`}
                  className="block px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  {dict?.header.nav.linkTree || "Контакти"}
                </Link> */}

                <div>
                  <div className="px-3 py-2 flex justify-between items-center">
                    {/* <LanguageSwitcher currentLocale={currentLocale} /> */}
                    <div className="flex space-x-1.5">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={`/${currentLocale}${social.href}`}
                          // target="_blank"
                          // rel="noopener noreferrer"
                          className="text-gray-600 hover:text-red-500"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end items-center w-full px-3 py-1">
                    <a
                      href="tel:+380997906110"
                      className="text-red-500 hover:text-red-600 text-lg"
                    >
                      +380 99 790 61 10
                    </a>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors uppercase"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    {dict?.header.cta.bookConsultation}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
