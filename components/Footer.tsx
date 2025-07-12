"use client";
import { MapPin, Phone } from "lucide-react";
import { useState } from "react";
import BookingModal from "./Modal/Modal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // if (loading) return null;

  return (
    <>
      <footer className="bg-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
          {/* Адреса та телефон */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{dict?.footer.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+380987313541">{dict?.footer.phone}</a>
            </div>
          </div>

          {/* Соцмережі та кнопка */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 sm:items-center">
            {/* Соцмережі */}
            <div className="flex items-center justify-center space-x-4">
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

            {/* Кнопка "Записатися" */}
            <button
              className="w-full sm:w-auto bg-white hover:bg-red-100 text-red-500 px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
              onClick={() => setIsModalOpen(true)}
            >
              {dict?.footer.cta.bookConsultation}
            </button>
          </div>
        </div>
      </footer>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
