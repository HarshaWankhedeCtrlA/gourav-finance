"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasConsented = localStorage.getItem("gourav_cookie_consent");
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("gourav_cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:p-6">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 max-w-3xl">
          <p>
            We use essential cookies to ensure the website functions properly. By continuing to use this site, you consent to our use of cookies as described in our{" "}
            <a href="/en/privacy" className="text-primary underline font-medium hover:text-primary/80">
              Privacy Policy
            </a>.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button onClick={acceptCookies} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white">
            Accept Essential Cookies
          </Button>
          <button onClick={() => setIsVisible(false)} className="p-2 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}