"use client";

import { useState, useEffect } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";
import { notFound } from "next/navigation";

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

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { slug } = await params;

        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");

        const data = await response.json();

        const foundBlog = data.blogs.find(
          (b: Blog) => b.slug === slug && b.isPublished
        );

        if (!foundBlog) {
          notFound();
          return;
        }

        setBlog(foundBlog);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog");
        setTimeout(() => setError(null), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [params, dict]);

  if (isLoading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          {dict?.blogs?.loading || "Завантаження..."}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.publishDate).toLocaleDateString(
    currentLocale,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <section className="py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {blog.title[currentLocale]}
        </h1>
        <div className="flex items-center text-gray-600 mb-6">
          {blog.author && (
            <>
              <span>
                {dict?.blogPost?.author || "Автор"}:{" "}
                {blog.author[currentLocale]}
              </span>
              <span className="mx-2">•</span>
            </>
          )}
          <span>
            {dict?.blogPost?.published || "Опубліковано"}: {formattedDate}
          </span>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <Image
            src={blog.mainImage}
            alt={blog.title[currentLocale]}
            className="w-full h-64 md:h-96 object-cover"
            quality={85}
            sizes="(max-width: 768px) 100vw, 800px"
            width={800}
            height={400}
          />
        </div>

        {/* Blog Content */}
        <div className="prose max-w-none">
          <MDEditor.Markdown source={blog.content[currentLocale]} />
        </div>
      </div>
    </section>
  );
}
