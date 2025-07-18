"use client";

import homeBgMobile from "@/public/link-tree-mob.jpg";
// import homeBgDesktop from "@/public/home-bg-desktop.jpg";
import homeBgDesktop from "@/public/link-tree-desk.jpg";
import Image from "next/image";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { useState } from "react";
import { Earth } from "lucide-react";
import { useRouter } from "next/navigation";
import SimpleModal from "@/components/Modal/SimpleModal";
import {
  FaViber,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
// import Link from "next/link";

export default function LinkTree() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const socialLinks = [
    {
      href: "https://viber.com/your_profile",
      icon: <FaViber className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Viber",
    },
    {
      href: "https://wa.me/+380997906110",
      icon: <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "WhatsApp",
    },
    {
      href: "https://t.me/olexandra_alexuk",
      icon: <FaTelegram className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Telegram",
    },
    {
      href: "https://www.instagram.com/your_profile",
      icon: <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Instagram",
    },
    {
      href: "https://www.tiktok.com/@your_profile",
      icon: <FaTiktok className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "TikTok",
    },
    {
      href: "https://www.linkedin.com/in/your_profile",
      icon: <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "LinkedIn",
    },
    {
      href: "https://www.youtube.com/@your_profile",
      icon: <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "YouTube",
    },
  ];

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center font-semibold">
        {/* Mobile Background */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={homeBgMobile}
            alt="Background Mobile"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </div>

        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={homeBgDesktop}
            alt="Background Desktop"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-xs mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-screen md:max-w-2xl md:py-12">
          {/* Main Content - Link Tree */}
          <div className="text-white text-center flex flex-col items-center gap-4">
            <div className="md:mb-4 mb-20">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 cursor-pointer"
                onClick={() => router.push(`/${currentLocale}`)}
              >
                {dict?.linkTree?.title || "Олександра Алексюк"}
              </h1>
              <h2 className="font-semibold text-sm sm:text-base md:text-lg">
                {dict?.linkTree?.subtitle || "Психолог та тренер"}
              </h2>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg">
                {dict?.homeBanner.description ||
                  "Працюю з дорослими, парами, дітьми та підлітками"}
              </h3>
            </div>

            {/* Social Links (Horizontal on Mobile) */}
            <div className="w-full flex flex-wrap justify-center gap-2 mt-24 md:mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-red-500 text-red-500 md:px-3 md:py-2 py-1 px-1.5 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-1 shadow-md md:hover:scale-105"
                >
                  {link.icon}
                  {/* {link.label} */}
                </a>
              ))}
            </div>

            <div className="w-full flex items-center justify-center gap-2 my-2">
              <div className="w-1/4 h-0.5 bg-white rounded-2xl"></div>
              <div>
                <Earth className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="w-1/4 h-0.5 bg-white rounded-2xl"></div>
            </div>

            {/* Social Links (Vertical with Labels) */}
            <div className="w-full flex flex-col gap-2">
              <button
                className="bg-transparent border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base md:text-base  transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-105"
                onClick={() => router.push(`/${currentLocale}`)}
              >
                {dict?.linkTree?.to_site || "Перейти на сайт"}
              </button>
              <a
                href="tel:+380997906110"
                className="bg-transparent border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base md:text-base  transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-105"
              >
                {dict?.footer.contact.phone || "+380 99 790 61 10"}
              </a>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base md:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-105"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>

            <button
              className="bg-transparent border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base md:text-base  transition-all duration-300 flex items-center justify-center gap-2 shadow-md mt-4 uppercase"
              onClick={() => setIsMenuOpen(true)}
            >
              {dict?.linkTree?.cta || "Зв’язатися"}
            </button>
          </div>
        </div>
      </section>
      <SimpleModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
