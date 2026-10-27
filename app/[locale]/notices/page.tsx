"use client";

import { useState, useEffect } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Bell } from 'lucide-react';

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/notices")
      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-4">Public Notices</h1>
        <p className="text-gray-600 mb-10">Important updates and announcements for our customers.</p>

        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading notices...</p>
          ) : notices.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No notices published yet. Please check back later.</p>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex gap-4">
                <div className="mt-1 p-2 bg-[#E8A33D]/10 text-[#E8A33D] rounded-full h-fit">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 mb-1">
                    {new Date(notice.createdAt).toLocaleDateString("en-IN")}
                  </p>
                  <h3 className="text-lg font-semibold text-ink mb-2">{notice.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{notice.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}