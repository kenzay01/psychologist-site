"use client";
import { MapPin, Phone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
// import BookingModal from "./Modal/Modal";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import {
  FaViber,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks = [
    {
      href: "https://viber.com/your_profile",
      icon: <FaViber className="w-6 h-6" />,
      label: "Viber",
    },
    {
      href: "https://wa.me/+380987313541",
      icon: <FaWhatsapp className="w-6 h-6" />,
      label: "WhatsApp",
    },
    {
      href: "https://t.me/admin_username",
      icon: <FaTelegram className="w-6 h-6" />,
      label: "Telegram",
    },
    {
      href: "https://www.instagram.com/your_profile",
      icon: <FaInstagram className="w-6 h-6" />,
      label: "Instagram",
    },
    {
      href: "https://www.tiktok.com/@your_profile",
      icon: <FaTiktok className="w-6 h-6" />,
      label: "TikTok",
    },
    {
      href: "https://www.linkedin.com/in/your_profile",
      icon: <FaLinkedin className="w-6 h-6" />,
      label: "LinkedIn",
    },
    {
      href: "https://www.youtube.com/@your_profile",
      icon: <FaYoutube className="w-6 h-6" />,
      label: "YouTube",
    },
  ];

  const navLinks = [
    { href: "/aboutMe", label: dict?.header.nav.aboutMe || "Про мене" },
    { href: "/dyplomy", label: dict?.header.nav.diplomas || "Дипломи" },
    { href: "/blog", label: dict?.header.nav.blog || "Блог" },
  ];

  const servicesLinks = [
    {
      href: "/consultation?type=individual",
      label:
        dict?.header.nav.servicesLinks.individual ||
        "Індивідуальна консультація",
    },
    {
      href: "/consultation?type=couple",
      label: dict?.header.nav.servicesLinks.couple || "Парна консультація",
    },
    {
      href: "/consultation?type=child",
      label: dict?.header.nav.servicesLinks.child || "Дитяча консультація",
    },
    {
      href: "/supervision",
      label: dict?.header.nav.servicesLinks.supervision || "Супервізія",
    },
  ];

  return (
    <>
      <footer className="bg-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col w-full">
          <div className="flex w-full justify-between flex-col md:flex-row">
            {/* Контакти */}
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-6 items-start mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{dict?.footer.contact.phone || "+380 67 123 45 67"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>
                  {dict?.footer.contact.email || "email@psychologist.com"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {dict?.footer.contact.address || "Онлайн та офлайн (м. Київ)"}
                </span>
              </div>
            </div>

            {/* Меню */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {dict?.footer.menu.title || "Меню:"}
              </h3>
              <ul className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={
                        link.href === "/"
                          ? `/${currentLocale}`
                          : `/${currentLocale}${link.href}`
                      }
                      className="text-white hover:text-red-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                {/* Services - mobile: static list, desktop: dropdown */}
                <li className="sm:relative group">
                  <button className="text-white hover:text-red-200 transition-colors">
                    {dict?.header.nav.services || "Послуги"}
                  </button>

                  {/* Mobile: Services shown directly */}
                  <div className="sm:hidden pl-4 mt-2 space-y-2">
                    {servicesLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={`/${currentLocale}${service.href}`}
                        className="block text-sm text-white hover:text-red-200 transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>

                  {/* Desktop: Dropdown */}
                  <div className="hidden sm:block absolute bottom-full left-0 w-64 pb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-black/50 backdrop-blur-md rounded-lg px-2 shadow-lg">
                      <div className="py-2">
                        {servicesLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={`/${currentLocale}${service.href}`}
                            className="block px-4 py-2 text-sm text-white hover:bg-red-500 transition-colors rounded-md"
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Соцмережі */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {dict?.footer.social.title || "Соцмережі:"}
              </h3>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-white hover:text-red-200 transition-colors"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Копірайт */}
          <div className="border-t border-red-400 pt-4">
            <p className="text-center text-red-100">
              {dict?.footer.copyright ||
                "© 2025 Олександра Алексюк | Політика конфіденційності"}
            </p>
          </div>
        </div>
      </footer>

      {/* <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </>
  );
}
