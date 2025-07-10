"use client";
import { MapPin, Phone, Send, Instagram, MessageSquare } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks = [
    { href: "https://t.me/admin_username", icon: Send, label: "Telegram" },
    {
      href: "https://www.instagram.com/your_profile",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://wa.me/+380987313541",
      icon: MessageSquare,
      label: "WhatsApp",
    },
  ];

  return (
    <>
      <footer className="bg-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
          {/* Адреса та телефон */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 items-center ">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>м. Київ, вул. Григорія Сковороди, 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+380987313541">+380 98 731 35 41</a>
            </div>
          </div>

          {/* Соцмережі та кнопка */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 sm:items-center">
            {/* Соцмережі */}
            <div className="flex items-center justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-white hover:text-red-200 transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Кнопка "Записатися" */}
            <button
              className="w-full sm:w-auto bg-white hover:bg-red-100 text-red-500 px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
              onClick={() => setIsModalOpen(true)}
            >
              ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
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
