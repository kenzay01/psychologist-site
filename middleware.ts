import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n/config";

const CANONICAL_HOST = "alexandraaleksiuk.com";

function absoluteUrl(pathname: string, search = ""): string {
  // Never include internal Next/nginx upstream port (e.g. :3000)
  return `https://${CANONICAL_HOST}${pathname}${search}`;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostHeader = request.headers.get("host") ?? "";
  const host = hostHeader.split(":")[0].toLowerCase();

  // Critical: www → apex without leaking upstream port
  if (host === `www.${CANONICAL_HOST}`) {
    return NextResponse.redirect(absoluteUrl(pathname, search), 301);
  }

  // Skip locale handling for Next internals, API, and static/SEO assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.json" ||
    pathname === "/og-image.jpg" ||
    pathname === "/twitter-image.jpg" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Collapse any trailing slash (except "/") to avoid 301→308 chains
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return NextResponse.redirect(
      absoluteUrl(pathname.replace(/\/+$/, "") || "/", search),
      301
    );
  }

  const savedLocale = request.cookies.get("preferredLocale")?.value;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale =
      savedLocale && locales.includes(savedLocale as (typeof locales)[number])
        ? (savedLocale as (typeof locales)[number])
        : defaultLocale;

    // pathname "/" → "/uk" (no trailing slash)
    const suffix = pathname === "/" ? "" : pathname;
    return NextResponse.redirect(absoluteUrl(`/${locale}${suffix}`, search), 301);
  }

  // Pass pathname to generateMetadata for self-canonical
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
