import type { Metadata } from "next";
import { Inter, Fraunces, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Providers from "@/components/providers"; // <-- Import the new wrapper
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
        <Providers> {/* <-- Use the wrapper here */}
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}