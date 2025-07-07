"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
export default function SideButton() {
  const [isVisible, setIsVisible] = useState(false);
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`z-[80] fixed right-4 bottom-4 transform transition-all duration-300 flex flex-col space-y-4 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <ArrowUp
          className="w-12 h-12 md:w-14 md:h-14 text-gray-700 p-2 rounded-lg bg-gray-300/60 border-2 border-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      </div>
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </>
  );
}
