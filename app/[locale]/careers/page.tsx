"use client";

import { useState, useEffect } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, Mail } from 'lucide-react';

export default function CareersPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/careers")
      .then((res) => res.json())
      .then((data) => {
        setCareers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-primary mb-4">Careers at Gourav Finance</h1>
          <p className="text-lg text-muted">Join a team that has been building trust since 1996.</p>
        </div>

        {/* Dynamic Job Listings */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {loading ? (
            <p className="col-span-2 text-center text-gray-500">Loading job openings...</p>
          ) : careers.length === 0 ? (
            <p className="col-span-2 text-center text-gray-500">No open positions at the moment. Please check back later.</p>
          ) : (
            careers.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-2">
                    <Briefcase size={14} /> {job.type}
                  </span>
                  <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <MapPin size={14} /> {job.location}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-6 flex-grow">{job.description}</p>
                
                {/* Corrected Button: Opens email to HR */}
                <a href={`mailto:hr@gouravfinance.com?subject=Application for ${job.title}`}>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                    Apply via Email
                  </Button>
                </a>
              </div>
            ))
          )}
        </div>

        {/* General CV Upload */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
          <h3 className="text-xl font-serif text-primary mb-2">Don't see a suitable role?</h3>
          <p className="text-muted mb-6 text-sm">Send your CV to <strong>hr@gouravfinance.com</strong> and we will contact you if a position opens up.</p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a href="mailto:hr@gouravfinance.com?subject=General CV Submission" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Mail size={16} className="mr-2" /> Email your CV
              </Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}