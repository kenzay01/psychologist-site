import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/adminBoard", "/*/adminBoard"],
    },
    sitemap: "https://alexandraaleksiuk.com/sitemap.xml",
    host: "https://alexandraaleksiuk.com",
  };
}
