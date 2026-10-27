import type { Metadata } from "next";
import { Inter, Fraunces, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Providers from "@/components/providers";
import { Phone, MessageCircle } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-devanagari", display: "swap" });

export const metadata: Metadata = {
  title: "Gourav Finance | Trusted finance since 1996",
  description: "Secured business and home loans for families and enterprises across Haryana.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable} ${devanagari.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
            
            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
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

          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}