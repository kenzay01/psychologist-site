"use client";
// import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideButton from "@/components/SideButton";
import { usePathname } from "next/navigation";
// import { Locale } from "@/i18n/config";
export default function AppRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isLinktree = usePathname().includes("linktree");
  return (
    <div>
      {isLinktree || <Header />}
      {children}
      {isLinktree || <Footer />}
      <SideButton />
    </div>
  );
}
