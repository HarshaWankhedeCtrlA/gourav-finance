"use client";

import { useState, useEffect } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function DisclosuresPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/policies")
      .then((res) => res.json())
      .then((data) => {
        setPolicies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif text-primary mb-6">Regulatory Disclosures</h1>
        <p className="text-gray-600 mb-8">In compliance with RBI guidelines, our policies and disclosures are available for public viewing.</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Document Name</th>
                <th className="px-6 py-4 font-semibold">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">Loading documents...</td>
                </tr>
              ) : policies.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No documents uploaded yet. Please check back later.
                  </td>
                </tr>
              ) : (
                policies.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-ink">{p.title}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(p.updatedAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a 
                        href={p.pdfUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-primary text-xs font-semibold hover:underline"
                      >
                        View PDF (EN/HI)
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}