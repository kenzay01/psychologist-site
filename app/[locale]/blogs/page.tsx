"use client";

import { useState, useEffect } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface Blog {
  id: string;
  slug: string;
  title: { uk: string; ru: string };
  excerpt: { uk: string; ru: string };
  content: { uk: string; ru: string };
  mainImage: string;
  author?: { uk: string; ru: string };
  isPublished: boolean;
  publishDate: string;
}

export default function BlogsList() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoadingBlogs(true);
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setSaveError("Failed to load blogs");
        setTimeout(() => setSaveError(null), 3000);
      } finally {
        setIsLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, [dict]);

  // Filter only published blogs
  const publishedBlogs = blogs.filter((blog) => blog.isPublished);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {dict?.blogs?.title || "Блог"}
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {dict?.blogs?.description ||
              "Ознайомтеся з корисними статтями та новинами"}
          </p>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {saveError}
          </div>
        )}

        {/* Loading State */}
        {isLoadingBlogs ? (
          <div className="text-center text-gray-600">
            {dict?.blogs?.loading || "Завантаження..."}
          </div>
        ) : publishedBlogs.length === 0 ? (
          <div className="text-center text-gray-600">
            {dict?.blogs?.noBlogs || "Немає опублікованих блогів"}
          </div>
        ) : (
          /* Blogs Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden hover:shadow-2xl hover:scale-[1.01] flex flex-col"
              >
                {/* Image Section */}
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={blog.mainImage}
                    alt={blog.title[currentLocale]}
                    className="w-full h-full object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={500}
                    height={300}
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {blog.title[currentLocale]}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-md mb-4 flex-1">
                    {blog.excerpt[currentLocale]}
                  </p>
                  <button
                    onClick={() =>
                      router.push(`/${currentLocale}/blogs/${blog.slug}`)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold text-base inline-flex items-center gap-2 justify-center hover:scale-102 transition-all duration-300 shadow-md"
                  >
                    {dict?.blogs?.cta?.learnMore || "Читати"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
