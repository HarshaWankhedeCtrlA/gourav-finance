"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#E8A33D] text-[#1C2321] py-2 px-4 text-center text-sm font-semibold relative z-50 flex items-center justify-center">
      <p>🎉 New: We now offer Housing Loans up to ₹1 Crore. <a href="/en/loans/housing" className="underline hover:text-[#0F4C5C]">Learn more</a></p>
      <button onClick={() => setIsVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}