import type { Metadata } from "next";
import { locales } from "@/i18n/config";
// import { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import SideButton from "@/components/SideButton";
import Footer from "@/components/Footer";
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Психологічна допомога",
    description:
      "Психологічна допомога - ваш надійний партнер у подоланні життєвих труднощів.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <Header />
        {children}
        <Footer />
        {/* SideButton for mobile navigation */}
        <SideButton />
      </body>
    </html>
  );
}
