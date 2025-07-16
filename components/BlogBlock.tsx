"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function BlogsBlock() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const router = useRouter();

  // const blogs = [
  //   {
  //     id: 1,
  //     title: dict?.blogs?.title || "Останні статті та поради",
  //     image: "/blogs/blog_preview.jpg",
  //   },
  // ];

  return (
    <section className="py-4 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {dict?.blogs?.title || "Блог"}
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <div className="max-w-2xl mx-auto flex items-center justify-center">
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto flex-1">
              {dict?.blogs?.description ||
                "Ознайомтеся з корисними статтями та новинами"}
            </p>
            <button
              onClick={() => router.push(`/${currentLocale}/blogs`)}
              className="bg-red-500 hover:bg-red-600 text-white flex-1 px-6 w-full py-2 md:px-8 md:py-3 rounded-xl font-semibold text-base md:text-md inline-flex items-center gap-2 justify-between hover:scale-102 transition-all duration-300 shadow-md"
            >
              {dict?.blogs?.cta?.learnMore || "Дізнатися більше"}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
