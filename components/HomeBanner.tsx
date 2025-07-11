"use client";
// import bannerBg from "@/public/home-banner.jpg";
import homeBgMobile from "@/public/home-img.jpg";
import homeBgDesktop from "@/public/home-bg-desktop.jpg";
import Image from "next/image";
// import { Youtube, Instagram, Send } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import BookingModal from "./Modal/Modal";
export default function HomeBanner() {
  // const router = useRouter();
  // const socialLinks = [
  //   { href: "#", icon: Youtube, label: "YouTube", color: "bg-red-700" },
  //   { href: "#", icon: Instagram, label: "Instagram", color: "bg-pink-700" },
  //   { href: "#", icon: Send, label: "Telegram", color: "bg-blue-500" },
  // ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            // quality={85}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-end md:justify-center min-h-screen">
          {/* Main Content */}
          <div className="text-white md:text-start flex flex-col md:items-start md:justify-center items-center justify-end md:ml-48 ml-0 mb-8 mt-0 md:mt-24 md:mb-0">
            <div className="mb-8 md:mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold  mb-4">
                Олександра <br /> Алексюк
              </h1>
              <h2 className="font-semibold text-lg md:text-2xl lg:text-3xl mb-4">
                Психолог-сексолог, супервізор
              </h2>
              <p className="text-md md:text-xl lg:text-2xl max-w-2xl mx-auto">
                Працюю з дорослими, парами, дітьми та підлітками
              </p>
            </div>

            {/* Button */}
            <div className="mb-6 md:mb-12">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-8 md:text-xl md:px-12 py-3 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold shadow-md hover:scale-105 transition-all duration-300"
                onClick={() => {
                  setIsMenuOpen(true);
                }}
              >
                ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
              </button>
            </div>

            {/* Social Links */}
            {/* <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`${social.color} hover:scale-110 transition-all duration-300 p-3 md:p-4 rounded-full flex items-center justify-center shadow-lg`}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 md:w-6 md:h-6" />
              </a>
            ))}
          </div> */}
          </div>
        </div>
      </section>
      <BookingModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
