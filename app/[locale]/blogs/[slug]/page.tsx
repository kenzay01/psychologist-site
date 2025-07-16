"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import Image from "next/image";
// import Markdown from "@uiw/react-md-editor";
import MDEditor from "@uiw/react-md-editor";
import blogsData from "@/blogs.json";
import { notFound } from "next/navigation";

// interface Blog {
//   id: string;
//   slug: string;
//   title: { uk: string; ru: string };
//   excerpt: { uk: string; ru: string };
//   mainImage: string;
//   content: { uk: string; ru: string };
//   author: { uk: string; ru: string };
//   publishDate: string;
//   isPublished: boolean;
// }

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  const blog = blogsData.blogs.find(
    async (b) => b.slug === (await params).slug && b.isPublished
  );

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
          {/* <span>
            {dict?.blogPost?.author || "Автор"}: {blog.author[currentLocale]}
          </span> */}
          {/* <span className="mx-2">•</span> */}
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
          <MDEditor.Markdown
            source={blog.content[currentLocale]}
            // style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </div>
    </section>
  );
}
