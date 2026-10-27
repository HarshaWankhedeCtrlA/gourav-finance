"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CookieBanner from "@/components/layout/CookieBanner";
import { Phone, MessageCircle } from "lucide-react";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // If we are in the admin panel, just render the children (no public bars/buttons)
  if (isAdmin) {
    return <>{children}</>;
  }

  // Otherwise, render the public layout with all the extras
  return (
    <>
      <AnnouncementBar />
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a 
          href="https://wa.me/911234567890" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center" 
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
        <a 
          href="tel:+911234567890" 
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center" 
          aria-label="Call Us"
        >
          <Phone size={24} />
        </a>
      </div>
      <CookieBanner />
    </>
  );
}